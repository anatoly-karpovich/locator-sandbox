import { Request, Response, NextFunction } from "express";
import { ErrorResponseDTO } from "@dto/common.dto.js";
import { HTTP_CODES } from "@core/httpCodes.js";
import { validateHtmlContent, HtmlValidationError } from "@core/validation/htmlValidator.js";
import { PlaygroundSubmitRequestDTO } from "@dto/playground.dto.js";

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
      return res.status(HTTP_CODES.BAD_REQUEST).json({
        error: err.message,
      });
    }

    return res.status(HTTP_CODES.SERVER_ERROR).json({
      error: "Unexpected HTML validation error",
    });
  }
}
