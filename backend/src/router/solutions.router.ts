import { Router } from "express";
import { SolutionController } from "../controllers";
import { solutionsSubmitMiddleware } from "../middlewares/solutions.middleware";
import { validateLocatorPayloadMiddleware } from "../middlewares/locatorPayload.middleware";
import { container, TYPES } from "../container";

const solutionsRouter = Router();
const solutionsController = container.get<SolutionController>(TYPES.SolutionController);

solutionsRouter.post(
  "/solutions",
  solutionsSubmitMiddleware,
  validateLocatorPayloadMiddleware,
  solutionsController.submit.bind(solutionsController)
);

export default solutionsRouter;
