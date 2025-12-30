import { Router } from "express";
import { TrainingRunsController } from "../controllers";

const trainingsRunsRouter = Router();
const trainingsRunsController = new TrainingRunsController();

trainingsRunsRouter.post("/training-runs/start", trainingsRunsController.startTraining.bind(trainingsRunsController));
trainingsRunsRouter.post(
  "/training-runs/:trainingRunId/submit",
  trainingsRunsController.submitSolution.bind(trainingsRunsController)
);
trainingsRunsRouter.get(
  "/training-runs/:trainingRunId",
  trainingsRunsController.getRunById.bind(trainingsRunsController)
);

export default trainingsRunsRouter;
