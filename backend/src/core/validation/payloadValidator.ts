import { AstParser } from "@core/ast-parser/index.js";
import { ParsedPlan } from "@core/ast-parser/types.js";
import { AstError } from "../../errors/astError.js";

export function validateLocatorPayload(payload: string): ParsedPlan {
  try {
    return AstParser.parse(payload);
  } catch (err) {
    if (err instanceof AstError) throw err;

    throw err;
  }
}
