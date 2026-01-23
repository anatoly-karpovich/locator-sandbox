import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";
import { HTTP_CODES } from "@core/httpCodes.js";

export function validateSchemaMiddleware(schema: z.ZodObject | z.ZodDiscriminatedUnion ) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      res.locals.parsedBody = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.issues.map((issue: any) => ({
          code: issue.code,
          element: issue.path.join("."),
          expected: issue.expected,
          message: issue.message,
        }));
        res
          .status(HTTP_CODES.BAD_REQUEST)
          .json({ error: "Validation error", details: errorMessages });
      } else {
        res
          .status(HTTP_CODES.SERVER_ERROR)
          .json({ error: "Internal Server Error" });
      }
    }
  };
}
