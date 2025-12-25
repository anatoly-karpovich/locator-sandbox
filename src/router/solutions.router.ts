import { Router } from "express";
import { SolutionController } from "../controllers/solution.controller";

const solutionsRouter = Router();
const solutionsController = new SolutionController();

solutionsRouter.post("/solutions", solutionsController.submit);

export default solutionsRouter;
