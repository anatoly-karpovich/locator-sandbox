import { NextFunction, Request, Response } from "express";
import { ErrorResponseDTO } from "@dto/common.dto.js";
import { LocatorPayloadValidationError, validateLocatorPayload } from "@core/validation/payloadValidator.js";
import { HTTP_CODES } from "@core/httpCodes.js";
import { ITrainingSubmitSolutionRequestDTO } from "@dto/trainingRuns.dto.js";
import { PlaygroundSubmitRequestDTO } from "@dto/playground.dto.js";

export function validateLocatorPayloadMiddleware(
  req: Request<{}, {}, PlaygroundSubmitRequestDTO | ITrainingSubmitSolutionRequestDTO>,
  res: Response<ErrorResponseDTO>,
  next: NextFunction
) {
  const { payload } = req.body ?? {};

  try {
    validateLocatorPayload(payload);
    next();
  } catch (err) {
    if (err instanceof LocatorPayloadValidationError) {
      return res.status(HTTP_CODES.BAD_REQUEST).json({
        error: err.message,
      });
    }

    return res.status(HTTP_CODES.SERVER_ERROR).json({
      error: "Unexpected locator validation error",
    });
  }
}
