import { ParsedPlan, LocatorOptions } from "./types";
import * as t from "@babel/types";

export function unwrap(node: t.Expression): t.Expression {
  // Babel sometimes wraps parentheses
  // @babel/types has ParenthesizedExpression
  // We unwrap it for easier checks.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const n: any = node;
  if (n && n.type === "ParenthesizedExpression") return unwrap(n.expression);
  return node;
}

export function readLocatorOptions(
  node: t.Expression,
  parseFromAst: (node: t.Expression) => ParsedPlan,
  ctx: string
): LocatorOptions {
  const unwrapped = unwrap(node);

  if (!t.isObjectExpression(unwrapped)) {
    throw new Error(`${ctx} must be an object literal`);
  }

  const out: LocatorOptions = {};

  for (const prop of unwrapped.properties) {
    if (!t.isObjectProperty(prop)) throw new Error(`${ctx}: only plain properties are allowed`);
    if (prop.computed) throw new Error(`${ctx}: computed keys are not allowed`);
    if (t.isSpreadElement(prop)) throw new Error(`${ctx}: object spread is not allowed`);

    const key =
      t.isIdentifier(prop.key) ? prop.key.name :
      t.isStringLiteral(prop.key) ? prop.key.value :
      (() => { throw new Error(`${ctx}: key must be identifier or string literal`); })();

    if (!t.isExpression(prop.value)) throw new Error(`${ctx}: unsupported value`);

    switch (key) {
      case "has":
        out.has = parseLocatorArg(prop.value, parseFromAst, `${ctx}.has`);
        break;

      case "hasNot":
        out.hasNot = parseLocatorArg(prop.value, parseFromAst, `${ctx}.hasNot`);
        break;

      case "hasText":
        out.hasText = readStringOrRegExp(prop.value, `${ctx}.hasText`);
        break;

      case "hasNotText":
        out.hasNotText = readStringOrRegExp(prop.value, `${ctx}.hasNotText`);
        break;

      default:
        throw new Error(`${ctx}: unsupported key: ${key}`);
    }
  }

  return out;
}

function readStringOrRegExp(node: t.Expression, ctx: string): string | RegExp {
  const n = unwrap(node);

  if (t.isStringLiteral(n)) return n.value;

  // Allow ONLY regex literal: /pattern/flags (no new RegExp(...))
  if (t.isRegExpLiteral(n)) {
    return new RegExp(n.pattern, n.flags);
  }

  throw new Error(`${ctx} must be a string literal or RegExp literal`);
}

function parseLocatorArg(
  node: t.Expression,
  parseFromAst: (node: t.Expression) => ParsedPlan,
  ctx: string
): ParsedPlan {
  const unwrapped = unwrap(node);

  // Require it to be a call chain like page.locator(...)
  if (!t.isCallExpression(unwrapped)) {
    throw new Error(`${ctx}: argument must be a locator expression like page.locator("...")`);
  }

  const plan = parseFromAst(unwrapped);

  // Ensure it produces a locator (in our whitelist, it always should)
  // But we can enforce "has at least one step" for sanity:
  if (plan.steps.length === 0) {
    throw new Error(`${ctx}: argument must produce a locator`);
  }

  return plan;
}
