import { NextFunction, Request, Response } from "express";
import { ErrorResponseDTO } from "@dto/common.dto.js";
import { LocatorPayloadValidationError, validateLocatorPayload } from "@core/validation/payloadValidator.js";
import { HTTP_CODES } from "@core/httpCodes.js";
import { ITrainingSubmitSolutionRequestDTO } from "@dto/trainingRuns.dto.js";
import { PlaygroundSubmitRequestDTO } from "@dto/playground.dto.js";
import { ResponseError } from "@errors/index.js";

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
      return next(new ResponseError(HTTP_CODES.BAD_REQUEST, err.message));
    }

    return next(new ResponseError(HTTP_CODES.SERVER_ERROR, "Unexpected locator validation error"));
  }
}
