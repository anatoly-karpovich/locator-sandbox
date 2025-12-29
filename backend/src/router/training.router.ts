import { Router } from "express";
import { TrainingController } from "../controllers/training.controller";

const trainingRouter = Router();
const trainingController = new TrainingController();

trainingRouter.post("/training/start", trainingController.startTraining.bind(trainingController));
trainingRouter.post("/training/submit", trainingController.submitSolution.bind(trainingController));

export default trainingRouter;
