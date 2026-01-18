import { AstParser } from "@core/ast-parser/index.js";
import { ParsedPlan } from "@core/ast-parser/types.js";
import { LOCATOR_PAYLOAD_MAX_LENGTH } from "./limits.js";

export class LocatorPayloadValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LocatorPayloadValidationError";
  }
}

export function validateLocatorPayload(payload: string): ParsedPlan {
  if (payload.length > LOCATOR_PAYLOAD_MAX_LENGTH) {
    throw new LocatorPayloadValidationError(`Locator payload exceeds ${LOCATOR_PAYLOAD_MAX_LENGTH} characters`);
  }

  try {
    return AstParser.parse(payload);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid locator expression";

    throw new LocatorPayloadValidationError(message);
  }
}
