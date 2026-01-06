import { NextFunction, Request, Response } from "express";
import { SubmitSolutionDTO } from "@controllers/solution.controller.js";

export function solutionsSubmitMiddleware(req: Request<{}, SubmitSolutionDTO>, res: Response, next: NextFunction) {
  if (!req.body.taskId || !req.body.payload) return res.status(400).json({ error: "Invalid request body" });
  next();
}
