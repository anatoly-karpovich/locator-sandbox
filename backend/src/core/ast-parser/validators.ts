import * as t from "@babel/types";
import { AllowedType, KeySchema, Literal } from "@core/ast-parser/types.js";
import { AstError } from "@errors/index.js";

export function assertArgCount(method: string, args: unknown[], countConstraint: [number, number] | number) {
  if (!isValidArgumentCount(args, countConstraint)) {
    const errorMessage = MAP_ERROR_MESSAGE_TO_LOCATOR_BASED_METHOD[method];
    throw new AstError(errorMessage);
  }
}

const isValidArgumentCount = (args: unknown[], countConstraint: [number, number] | number): boolean => {
  if (Array.isArray(countConstraint)) {
    const [min, max] = countConstraint;
    if (!Number.isInteger(min) || !Number.isInteger(max)) throw new Error("Invalid count constraint");
    if (min > max) throw new Error("Invalid count constraint");

    return args.length >= min && args.length <= max;
  }
  return args.length === countConstraint;
};

export const MAP_ERROR_MESSAGE_TO_LOCATOR_BASED_METHOD = {
  getByText: "getByText(text, options?) expects 1 or 2 args",
  getByRole: "getByRole(role, options?) expects 1 or 2 args",
  getByAltText: "getByAltText(altText, options?) expects 1 or 2 args",
  getByLabel: "getByLabel(label, options?) expects 1 or 2 args",
  getByPlaceholder: "getByPlaceholder(placeholder, options?) expects 1 or 2 args",
  getByTestId: "getByTestId(testId) expects 1 argument",
  locator: "locator(selector, options?) expects 1 or 2 args",
  first: "first() expects 0 arguments",
  last: "last() expects 0 arguments",
  nth: "nth(index) expects 1 argument",
};

export function readString(node: t.Expression, ctx: string): string {
  if (t.isStringLiteral(node)) return node.value;
  throw new AstError(`${ctx} must be a string literal`);
}

export function readRegExp(node: t.Expression, ctx: string): RegExp {
  if (t.isRegExpLiteral(node)) return new RegExp(node.pattern, node.flags);
  throw new AstError(`${ctx} must be a RegExp literal`);
}

export function readStringOrRegExp(node: t.Expression, ctx: string): string | RegExp {
  if (t.isStringLiteral(node)) return node.value;
  if (t.isRegExpLiteral(node)) return new RegExp(node.pattern, node.flags);
  throw new AstError(`${ctx} must be a string literal or RegExp literal`);
}

export function readNonNegativeInt(node: t.Expression, ctx: string): number {
  if (t.isNumericLiteral(node) && Number.isInteger(node.value) && node.value >= 0) {
    return node.value;
  }
  throw new AstError(`${ctx} must be a non-negative integer literal`);
}

export function isTypeMatch(v: Literal, expected: AllowedType): boolean {
  switch (expected) {
    case "string":
    case "string|regex":
      return typeof v === "string"; // in case of regex, it will be converted to string in readLiteral
    case "number":
      return typeof v === "number";
    case "boolean":
      return typeof v === "boolean";
    case "null":
      return v === null;
    case "array":
      return Array.isArray(v);
    case "object":
      return typeof v === "object" && v !== null && !Array.isArray(v);
    default:
      return false;
  }
}

export function readObjectLiteral<T extends object>(node: t.Expression, schema: KeySchema, ctx: string): T {
  const lit = readLiteral(node);
  if (lit === null || Array.isArray(lit) || typeof lit !== "object") {
    throw new AstError(`${ctx} must be an object literal`);
  }

  // Validate no unknown keys + validate types
  for (const [k, v] of Object.entries(lit)) {
    const atom = schema[k];
    if (!atom) throw new AstError(`${ctx} has unsupported key: ${k}`);

    const optional = atom.endsWith("?");
    const expected = (optional ? atom.slice(0, -1) : atom) as AllowedType;

    if (!isTypeMatch(v, expected)) {
      throw new AstError(`${ctx}.${k} must be ${expected}`);
    }
  }

  // Optional: You can also enforce required keys by scanning schema for non-optional atoms.
  return lit as unknown as T;
}

function readLiteral(node: t.Expression): Literal {
  if (t.isStringLiteral(node)) return node.value;
  if (t.isNumericLiteral(node)) return node.value;
  if (t.isBooleanLiteral(node)) return node.value;
  if (t.isRegExpLiteral(node)) return new RegExp(node.pattern, node.flags).toString();
  if (t.isNullLiteral(node)) return null;

  if (t.isArrayExpression(node)) {
    const out: Literal[] = [];
    for (const el of node.elements) {
      if (!el) throw new AstError("Sparse arrays are not allowed");
      if (t.isSpreadElement(el)) throw new AstError("Spread in arrays is not allowed");
      if (!t.isExpression(el)) throw new AstError("Unsupported array element");
      out.push(readLiteral(el));
    }
    return out;
  }

  if (t.isObjectExpression(node)) {
    const obj: Record<string, Literal> = {};
    for (const prop of node.properties) {
      if (!t.isObjectProperty(prop)) throw new AstError("Only plain object properties are allowed");
      if (prop.computed) throw new AstError("Computed keys are not allowed");
      if (t.isSpreadElement(prop)) throw new AstError("Object spread is not allowed");

      const key = t.isIdentifier(prop.key)
        ? prop.key.name
        : t.isStringLiteral(prop.key)
        ? prop.key.value
        : (() => {
            throw new AstError("Object key must be identifier or string literal");
          })();

      if (!t.isExpression(prop.value)) throw new AstError("Unsupported object value");
      obj[key] = readLiteral(prop.value);
    }
    return obj;
  }

  // Disallow TemplateLiteral, Function, etc.
  throw new AstError("Only literal arguments are allowed (string/number/boolean/null/object/array)");
}

