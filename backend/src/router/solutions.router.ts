import { Router } from "express";
import { SolutionController } from "../controllers";
import { solutionsSubmitMiddleware } from "../middlewares/solutions.middleware";
import { validateLocatorPayloadMiddleware } from "../middlewares/locatorPayload.middleware";

const solutionsRouter = Router();
const solutionsController = new SolutionController();

solutionsRouter.post(
  "/solutions",
  solutionsSubmitMiddleware,
  validateLocatorPayloadMiddleware,
  solutionsController.submit
);

export default solutionsRouter;
