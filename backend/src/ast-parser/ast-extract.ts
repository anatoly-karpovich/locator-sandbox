import * as t from "@babel/types";
import { RawCall } from "./types";
/**
 * -------------------------
 * AST extraction
 * -------------------------
 * Turns:
 *   page.locator("h1").nth(0).first()
 * into a chain of RawCall nodes.
 */
export function extractCallChain(node: t.Expression): RawCall[] {
  // We accept only a chain of CallExpressions where callee is MemberExpression with identifier property.
  // Example: (page.locator("h1")).nth(0)
  if (!t.isCallExpression(node)) {
    throw new Error("Expected a call expression like page.locator('h1')");
  }

  const callee = node.callee;
  if (!t.isMemberExpression(callee) || callee.computed) {
    throw new Error("Only member calls like obj.method(...) are allowed");
  }

  if (!t.isIdentifier(callee.property)) {
    throw new Error("Method name must be an identifier");
  }

  const method = callee.property.name;

  // Only allow normal args (no spread)
  const args: t.Expression[] = node.arguments.map((a) => {
    if (t.isSpreadElement(a)) throw new Error("Spread arguments are not allowed");
    if (!t.isExpression(a)) throw new Error("Unsupported argument type");
    return a;
  });

  const base = callee.object;
  if (!t.isExpression(base)) throw new Error("Unsupported callee base");

  // If base is another call, keep extracting
  const prev = t.isCallExpression(base) ? extractCallChain(base) : [];

  // Each link includes the base expression it’s called on
  return [...prev, { base, method, args }];
}