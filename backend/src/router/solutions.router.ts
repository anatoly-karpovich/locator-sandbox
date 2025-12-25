import { Router } from "express";
import { SolutionController } from "../controllers/solution.controller";
import { solutionsSubmitMiddleware } from "../middlewares/solutions.middleware";

const solutionsRouter = Router();
const solutionsController = new SolutionController();

solutionsRouter.post("/solutions", solutionsSubmitMiddleware, solutionsController.submit);

export default solutionsRouter;
