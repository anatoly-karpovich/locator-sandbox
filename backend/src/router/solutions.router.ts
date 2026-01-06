import { Router } from "express";
import { SolutionController } from "@controllers/index.js";
import { solutionsSubmitMiddleware } from "@middlewares/solutions.middleware.js";
import { validateLocatorPayloadMiddleware } from "@middlewares/locatorPayload.middleware.js";
import { container, TYPES } from "../container/index.js";

const solutionsRouter = Router();
const solutionsController = container.get<SolutionController>(TYPES.SolutionController);

solutionsRouter.post(
  "/solutions",
  solutionsSubmitMiddleware,
  validateLocatorPayloadMiddleware,
  solutionsController.submit.bind(solutionsController)
);

export default solutionsRouter;
