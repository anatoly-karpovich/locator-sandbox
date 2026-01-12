import { parseExpression, ParseResult } from "@babel/parser";
import * as t from "@babel/types";
import { AstError } from "@errors/index.js";
import {
  ParsedPlan,
  ReceiverKind,
  Step,
  RawCall,
  MethodSpec,
  LocatorOptions,
  GetByAltTextOptions,
  GetByLabelOptions,
  GetByPlaceholderOptions,
  GetByTextOptions,
  GetByTitleOptions,
  GetByRoleOptions,
  GetByRoleArgument,
} from "@core/ast-parser/types.js";
import {
  GET_BY_ALT_TEXT_KEYS,
  GET_BY_LABEL_KEYS,
  GET_BY_PLACEHOLDER_KEYS,
  GET_BY_ROLE_KEYS,
  GET_BY_TEXT_KEYS,
  GET_BY_TITLE_KEYS,
} from "@core/ast-parser/options.js";
import {
  assertArgCount,
  readString,
  readNonNegativeInt,
  readObjectLiteral,
  readStringOrRegExp,
} from "@core/ast-parser/validators.js";

export class AstParser {
  /**
   * Parse a Playwright locator string into a ParsedPlan
   */
  static parse(input: string): ParsedPlan {
    let expr: ParseResult<t.Expression>;
    try {
      expr = parseExpression(input, {
        sourceType: "module",
        plugins: ["typescript"],
      });
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new AstError(
          "Syntax error. Please verify your expression is properly formatted."
        );
      }
    }

    return AstParser.parseFromAst(expr);
  }

  /**
   * Parse a Playwright locator from an already-parsed AST expression
   */
  static parseFromAst(node: t.Expression): ParsedPlan {
    const rawCalls = AstParser.extractCallChain(node);
    const calls = rawCalls;

    if (calls.length === 0) throw new AstError("Empty expression");

    if (!t.isIdentifier(calls[0].base) || calls[0].base.name !== "page") {
      throw new AstError("Expression must start with `page`");
    }

    let receiver: ReceiverKind = "page";
    const steps: Step[] = [];

    // Each call describes `.method(args...)` applied on previous value
    for (const call of calls) {
      const methodName = call.method;
      const spec = AstParser.METHOD_SPECS[methodName];
      if (!spec) {
        throw new AstError(`Unsupported method: ${methodName}`);
      }

      // Ensure method allowed on current receiver kind
      if (!spec.allowedReceivers.includes(receiver)) {
        throw new AstError(
          `Method ${methodName} is not allowed on ${receiver}`
        );
      }

      const step = spec.buildStep(receiver, call.args, AstParser.parseFromAst);

      steps.push(step);
      receiver = spec.nextReceiver;
    }

    return { root: "page", steps, errors: [] };
  }

  /**
   * Extract a chain of method calls from an AST node
   * Turns: page.locator("h1").nth(0).first()
   * into a chain of RawCall nodes.
   */
  private static extractCallChain(node: t.Expression): RawCall[] {
    if (!t.isCallExpression(node)) {
      throw new AstError("Expected a call expression like page.method(...)");
    }

    const callee = node.callee;
    if (!t.isMemberExpression(callee) || callee.computed) {
      throw new AstError("Only member calls like page.method(...) are allowed");
    }

    if (!t.isIdentifier(callee.property)) {
      throw new AstError("Method name must be an identifier");
    }

    const method = callee.property.name;

    const args: t.Expression[] = node.arguments.map((a) => {
      if (t.isSpreadElement(a))
        throw new AstError("Spread arguments are not allowed");
      if (!t.isExpression(a)) throw new AstError("Unsupported argument type");
      return a;
    });

    const base = callee.object;
    if (!t.isExpression(base)) throw new AstError("Unsupported callee base");

    const prev = t.isCallExpression(base)
      ? AstParser.extractCallChain(base)
      : [];

    return [...prev, { base, method, args }];
  }

  /**
   * Unwrap parenthesized expressions
   */
  private static unwrap(node: t.Expression): t.Expression {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const n: any = node;
    if (n && n.type === "ParenthesizedExpression")
      return AstParser.unwrap(n.expression);
    return node;
  }

  /**
   * Read locator options from an AST node
   */
  private static readLocatorOptions(
    node: t.Expression,
    parseFromAst: (node: t.Expression) => ParsedPlan,
    ctx: string
  ): LocatorOptions {
    const unwrapped = AstParser.unwrap(node);

    if (!t.isObjectExpression(unwrapped)) {
      throw new AstError(`${ctx} must be an object literal`);
    }

    const out: LocatorOptions = {};

    for (const prop of unwrapped.properties) {
      if (!t.isObjectProperty(prop))
        throw new AstError(`${ctx}: only plain properties are allowed`);
      if (prop.computed)
        throw new AstError(`${ctx}: computed keys are not allowed`);
      if (t.isSpreadElement(prop))
        throw new AstError(`${ctx}: object spread is not allowed`);

      const key = t.isIdentifier(prop.key)
        ? prop.key.name
        : t.isStringLiteral(prop.key)
        ? prop.key.value
        : (() => {
            throw new AstError(
              `${ctx}: key must be identifier or string literal`
            );
          })();

      if (!t.isExpression(prop.value))
        throw new AstError(`${ctx}: unsupported value`);

      switch (key) {
        case "has":
          out.has = AstParser.parseLocatorArg(
            prop.value,
            parseFromAst,
            `${ctx}.has`
          );
          break;

        case "hasNot":
          out.hasNot = AstParser.parseLocatorArg(
            prop.value,
            parseFromAst,
            `${ctx}.hasNot`
          );
          break;

        case "hasText":
          out.hasText = AstParser.readStringOrRegExpLocal(
            prop.value,
            `${ctx}.hasText`
          );
          break;

        case "hasNotText":
          out.hasNotText = AstParser.readStringOrRegExpLocal(
            prop.value,
            `${ctx}.hasNotText`
          );
          break;

        default:
          throw new AstError(`${ctx}: unsupported key: ${key}`);
      }
    }

    return out;
  }

  /**
   * Read a string or RegExp from an AST node (local version with unwrap)
   */
  private static readStringOrRegExpLocal(
    node: t.Expression,
    ctx: string
  ): string | RegExp {
    const n = AstParser.unwrap(node);

    if (t.isStringLiteral(n)) return n.value;

    if (t.isRegExpLiteral(n)) {
      return new RegExp(n.pattern, n.flags);
    }

    throw new AstError(`${ctx} must be a string literal or RegExp literal`);
  }

  /**
   * Parse a locator argument (for has/hasNot options)
   */
  private static parseLocatorArg(
    node: t.Expression,
    parseFromAst: (node: t.Expression) => ParsedPlan,
    ctx: string
  ): ParsedPlan {
    const unwrapped = AstParser.unwrap(node);
    if (!t.isCallExpression(unwrapped))
      throw new AstError(
        `${ctx}: argument must be a locator expression like page.locator("...")`
      );

    const plan = parseFromAst(unwrapped);
    if (plan.steps.length === 0)
      throw new AstError(`${ctx}: argument must produce a locator`);

    return plan;
  }

  /**
   * Method specifications defining allowed receivers and how to build steps
   */
  private static readonly METHOD_SPECS: Record<string, MethodSpec> = {
    locator: {
      allowedReceivers: ["page", "locator"],
      nextReceiver: "locator",
      buildStep: (receiver, args, parseFromAst): Step => {
        assertArgCount("locator", args, [1, 2]);

        const selector = readString(args[0], "locator(selector)");
        const options = args[1]
          ? AstParser.readLocatorOptions(
              args[1],
              parseFromAst,
              "locator(options)"
            )
          : undefined;

        return { receiver, method: "locator", args: [selector, options] };
      },
    },

    first: {
      allowedReceivers: ["locator"],
      nextReceiver: "locator",
      buildStep: (receiver, args): Step => {
        assertArgCount("first", args, [0, 0]);
        return { receiver, method: "first", args: [] };
      },
    },

    last: {
      allowedReceivers: ["locator"],
      nextReceiver: "locator",
      buildStep: (receiver, args): Step => {
        assertArgCount("last", args, [0, 0]);
        return { receiver, method: "last", args: [] };
      },
    },

    nth: {
      allowedReceivers: ["locator"],
      nextReceiver: "locator",
      buildStep: (receiver, args): Step => {
        assertArgCount("nth", args, [1, 1]);
        const idx = readNonNegativeInt(args[0], "nth(index)");
        return { receiver, method: "nth", args: [idx] };
      },
    },

    getByText: {
      allowedReceivers: ["page", "locator"],
      nextReceiver: "locator",
      buildStep: (receiver, args): Step => {
        assertArgCount("getByText", args, [1, 2]);

        const text = readStringOrRegExp(args[0], "getByText(text)");
        const options = args[1]
          ? readObjectLiteral(args[1], GET_BY_TEXT_KEYS, "getByText(options)")
          : undefined;
        return {
          receiver,
          method: "getByText",
          args: [text as string | RegExp, options as GetByTextOptions],
        };
      },
    },

    getByRole: {
      allowedReceivers: ["page", "locator"],
      nextReceiver: "locator",
      buildStep: (receiver, args): Step => {
        assertArgCount("getByRole", args, [1, 2]);
        const role = readString(
          args[0],
          "getByRole(role)"
        ) as GetByRoleArgument;
        const options = args[1]
          ? readObjectLiteral(args[1], GET_BY_ROLE_KEYS, "getByRole(options)")
          : undefined;
        return {
          receiver,
          method: "getByRole",
          args: [role, options as GetByRoleOptions],
        };
      },
    },

    getByAltText: {
      allowedReceivers: ["page", "locator"],
      nextReceiver: "locator",
      buildStep: (receiver, args): Step => {
        assertArgCount("getByAltText", args, [1, 2]);

        const altText = readStringOrRegExp(args[0], "getByAltText(altText)");
        const options = args[1]
          ? readObjectLiteral(
              args[1],
              GET_BY_ALT_TEXT_KEYS,
              "getByAltText(options)"
            )
          : undefined;
        return {
          receiver,
          method: "getByAltText",
          args: [altText as string | RegExp, options as GetByAltTextOptions],
        };
      },
    },

    getByLabel: {
      allowedReceivers: ["page", "locator"],
      nextReceiver: "locator",
      buildStep: (receiver, args): Step => {
        assertArgCount("getByLabel", args, [1, 2]);

        const label = readStringOrRegExp(args[0], "getByLabel(label)");
        const options = args[1]
          ? readObjectLiteral(args[1], GET_BY_LABEL_KEYS, "getByLabel(options)")
          : undefined;
        return {
          receiver,
          method: "getByLabel",
          args: [label as string | RegExp, options as GetByLabelOptions],
        };
      },
    },

    getByPlaceholder: {
      allowedReceivers: ["page", "locator"],
      nextReceiver: "locator",
      buildStep: (receiver, args): Step => {
        assertArgCount("getByPlaceholder", args, [1, 2]);

        const placeholder = readStringOrRegExp(
          args[0],
          "getByPlaceholder(placeholder)"
        );
        const options = args[1]
          ? readObjectLiteral(
              args[1],
              GET_BY_PLACEHOLDER_KEYS,
              "getByPlaceholder(options)"
            )
          : undefined;
        return {
          receiver,
          method: "getByPlaceholder",
          args: [
            placeholder as string | RegExp,
            options as GetByPlaceholderOptions,
          ],
        };
      },
    },

    getByTitle: {
      allowedReceivers: ["page", "locator"],
      nextReceiver: "locator",
      buildStep: (receiver, args): Step => {
        assertArgCount("getByTitle", args, [1, 2]);

        const title = readStringOrRegExp(args[0], "getByTitle(title)");
        const options = args[1]
          ? readObjectLiteral(args[1], GET_BY_TITLE_KEYS, "getByTitle(options)")
          : undefined;
        return {
          receiver,
          method: "getByTitle",
          args: [title as string | RegExp, options as GetByTitleOptions],
        };
      },
    },

    getByTestId: {
      allowedReceivers: ["page", "locator"],
      nextReceiver: "locator",
      buildStep: (receiver, args): Step => {
        assertArgCount("getByTestId", args, 1);

        const testId = readStringOrRegExp(args[0], "getByTestId(testId)");
        return {
          receiver,
          method: "getByTestId",
          args: [testId as string | RegExp],
        };
      },
    },
  };
}
