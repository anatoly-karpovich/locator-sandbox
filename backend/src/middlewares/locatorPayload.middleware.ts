import { NextFunction, Request, Response } from "express";
import { ErrorResponseDTO } from "@dto/common.dto.js";
import { LocatorPayloadValidationError, validateLocatorPayload } from "@core/validation/payloadValidator.js";
import { HTTP_CODES } from "@core/httpCodes.js";
import { ITrainingSubmitSolutionRequestDTO } from "@dto/trainingRuns.dto.js";
import { PlaygroundSubmitRequestDTO } from "@dto/playground.dto.js";
import { ResponseError } from "@errors/index.js";
import { LOCATOR_PAYLOAD_MAX_LENGTH } from "@core/validation/limits.js";

export function validateLocatorPayloadMiddleware(
  req: Request<{}, {}, PlaygroundSubmitRequestDTO | ITrainingSubmitSolutionRequestDTO>,
  res: Response<ErrorResponseDTO>,
  next: NextFunction
) {
  const { payload } = req.body ?? {};

  try {
    if (payload.length > LOCATOR_PAYLOAD_MAX_LENGTH) {
      return next(
        new ResponseError(HTTP_CODES.BAD_REQUEST, `Locator payload exceeds ${LOCATOR_PAYLOAD_MAX_LENGTH} characters`)
      );
    }

    validateLocatorPayload(payload);
    next();
  } catch (err) {
    if (err instanceof LocatorPayloadValidationError) {
      return next(new ResponseError(HTTP_CODES.BAD_REQUEST, err.message));
    }

    return next(new ResponseError(HTTP_CODES.SERVER_ERROR, "Unexpected locator validation error"));
  }
}
