import * as t from "@babel/types";
import { AllowedType, KeySchema, Literal } from "./types";

export function assertArgCount(method: string, args: unknown[], expected: number) {
  if (args.length !== expected) {
    throw new Error(`${method}() expects exactly ${expected} argument(s)`);
  }
}

export function readString(node: t.Expression, ctx: string): string {
  if (t.isStringLiteral(node)) return node.value;
  throw new Error(`${ctx} must be a string literal`);
}

export function readRegExp(node: t.Expression, ctx: string): RegExp {
  if (t.isRegExpLiteral(node)) return new RegExp(node.pattern, node.flags);
  throw new Error(`${ctx} must be a RegExp literal`);
}

export function readStringOrRegExp(node: t.Expression, ctx: string): string | RegExp {
  if (t.isStringLiteral(node)) return node.value;
  if (t.isRegExpLiteral(node)) return new RegExp(node.pattern, node.flags);
  throw new Error(`${ctx} must be a string literal or RegExp literal`);
}

export function readNonNegativeInt(node: t.Expression, ctx: string): number {
  if (t.isNumericLiteral(node) && Number.isInteger(node.value) && node.value >= 0) {
    return node.value;
  }
  throw new Error(`${ctx} must be a non-negative integer literal`);
}

export function isTypeMatch(v: Literal, expected: AllowedType): boolean {
  switch (expected) {
    case "string": return typeof v === "string";
    case "number": return typeof v === "number";
    case "boolean": return typeof v === "boolean";
    case "null": return v === null;
    case "array": return Array.isArray(v);
    case "object": return typeof v === "object" && v !== null && !Array.isArray(v);
    default: return false;
  }
}

export function readObjectLiteral<T extends object>(
  node: t.Expression,
  schema: KeySchema,
  ctx: string
): T {
  const lit = readLiteral(node);
  if (lit === null || Array.isArray(lit) || typeof lit !== "object") {
    throw new Error(`${ctx} must be an object literal`);
  }

  // Validate no unknown keys + validate types
  for (const [k, v] of Object.entries(lit)) {
    const atom = schema[k];
    if (!atom) throw new Error(`${ctx} has unsupported key: ${k}`);

    const optional = atom.endsWith("?");
    const expected = (optional ? atom.slice(0, -1) : atom) as AllowedType;

    if (!isTypeMatch(v, expected)) {
      throw new Error(`${ctx}.${k} must be ${expected}`);
    }
  }

  // Optional: You can also enforce required keys by scanning schema for non-optional atoms.
  return lit as unknown as T;
}

function readLiteral(node: t.Expression): Literal {
  if (t.isStringLiteral(node)) return node.value;
  if (t.isNumericLiteral(node)) return node.value;
  if (t.isBooleanLiteral(node)) return node.value;
  if (t.isNullLiteral(node)) return null;

  if (t.isArrayExpression(node)) {
    const out: Literal[] = [];
    for (const el of node.elements) {
      if (!el) throw new Error("Sparse arrays are not allowed");
      if (t.isSpreadElement(el)) throw new Error("Spread in arrays is not allowed");
      if (!t.isExpression(el)) throw new Error("Unsupported array element");
      out.push(readLiteral(el));
    }
    return out;
  }

  if (t.isObjectExpression(node)) {
    const obj: Record<string, Literal> = {};
    for (const prop of node.properties) {
      if (!t.isObjectProperty(prop)) throw new Error("Only plain object properties are allowed");
      if (prop.computed) throw new Error("Computed keys are not allowed");
      if (t.isSpreadElement(prop)) throw new Error("Object spread is not allowed");

      const key =
        t.isIdentifier(prop.key) ? prop.key.name :
        t.isStringLiteral(prop.key) ? prop.key.value :
        (() => { throw new Error("Object key must be identifier or string literal"); })();

      if (!t.isExpression(prop.value)) throw new Error("Unsupported object value");
      obj[key] = readLiteral(prop.value);
    }
    return obj;
  }

  // Disallow RegExpLiteral, TemplateLiteral, Function, etc.
  throw new Error("Only literal arguments are allowed (string/number/boolean/null/object/array)");
}