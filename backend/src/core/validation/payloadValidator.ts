import { AstParser } from "../ast-parser";
import { ParsedPlan } from "../ast-parser/types";

export class LocatorPayloadValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LocatorPayloadValidationError";
  }
}

export function validateLocatorPayload(payload: string): ParsedPlan {
  try {
    return AstParser.parse(payload);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid locator expression";

    throw new LocatorPayloadValidationError(message);
  }
}
