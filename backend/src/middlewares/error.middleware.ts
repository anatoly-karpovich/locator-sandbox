import { NextFunction, Request, Response } from "express";
import { HTTP_CODES } from "@core/httpCodes.js";
import { ErrorResponseDTO } from "@dto/common.dto.js";
import { ResponseError } from "@errors/index.js";
import { logger } from "../core/logger/logger.js";

export function errorMiddleware(err: unknown, req: Request, res: Response<ErrorResponseDTO>, next: NextFunction) {
  const httpError = err instanceof ResponseError ? err : null;
  const status = httpError?.status ?? HTTP_CODES.SERVER_ERROR;
  const message =
    httpError?.message || (err instanceof Error ? err.message : typeof err === "string" ? err : "Unexpected error");

  logger.error({
    message: "Request failed",
    requestId: req.requestId,
    method: req.method,
    path: req.originalUrl,
    status,
    err: err instanceof Error ? err : { raw: err },
  });

  if (httpError?.errorType) {
    res.status(status).json({ error: httpError.errorType, details: message });
  } else {
    res.status(status).json({ error: message });
  }
}
