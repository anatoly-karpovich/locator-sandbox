import { parseExpression } from "@babel/parser";
import * as t from "@babel/types";
import { extractCallChain } from "./ast-extract";
import { ParsedPlan, ReceiverKind, Step } from "./types";
import { METHOD_SPECS } from "./method-specs";

export function parsePlaywrightLocatorAst(input: string): ParsedPlan {
  const expr = parseExpression(input, {
    sourceType: "module",
    plugins: ["typescript"],
  });
    const rawCalls = extractCallChain(expr);
  // rawCalls comes out inner->outer; we reverse to apply left->right
  const calls = rawCalls;

  if (calls.length === 0) throw new Error("Empty expression");

  // Base must be Identifier("page")
  if (!t.isIdentifier(calls[0].base) || calls[0].base.name !== "page") {
    console.log("Expression must start with `page`");
  }

  let receiver: ReceiverKind = "page";
  const steps: Step[] = [];

  // Each call describes `.method(args...)` applied on previous value
  for (const call of calls) {
    const methodName = call.method;
    const spec = METHOD_SPECS[methodName];
    if (!spec) {
      throw new Error(`Unsupported method: ${methodName}`);
    }

    // Ensure method allowed on current receiver kind
    if (!spec.allowedReceivers.includes(receiver)) {
      throw new Error(`Method ${methodName} is not allowed on ${receiver}`);
    }

    // Validate & coerce args
    const step = spec.buildStep(receiver, call.args);

    steps.push(step);

    // Update receiver for next link in chain:
    // - locator/getBy* produce a Locator; first/last/nth keep Locator
    receiver = spec.nextReceiver;
  }

  // First "call" in the chain is the base identifier reference, not a method call.
  // Our extractCallChain includes base on each link; the first link has base=page and method=first method called.
  // So steps are correct as built above.

  return { root: "page", steps };
}
console.log(JSON.stringify(parsePlaywrightLocatorAst('page.locator(\'h1\', { has: page.getByRole(\'button\', { exact: true }) })'), null, 2));