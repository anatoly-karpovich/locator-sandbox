import { Request, Response, NextFunction } from "express";
import { ErrorResponseDTO } from "@dto/common.dto.js";
import { HTTP_CODES } from "@core/httpCodes.js";
import { validateHtmlContent, HtmlValidationError } from "@core/validation/htmlValidator.js";
import { PlaygroundSubmitRequestDTO } from "@dto/playground.dto.js";
import { ResponseError } from "@errors/index.js";

export function validateHtmlContentMiddleware(
  req: Request<{}, {}, PlaygroundSubmitRequestDTO>,
  res: Response<ErrorResponseDTO>,
  next: NextFunction
) {
  const { html } = req.body ?? {};

  try {
    validateHtmlContent(html);
    next();
  } catch (err) {
    if (err instanceof HtmlValidationError) {
      return next(new ResponseError(HTTP_CODES.BAD_REQUEST, err.message));
    }

    return next(new ResponseError(HTTP_CODES.SERVER_ERROR, "Unexpected HTML validation error"));
  }
}

