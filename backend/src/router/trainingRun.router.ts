import { Router } from "express";
import { TrainingRunsController } from "../controllers";
import { validateLocatorPayloadMiddleware } from "../middlewares/locatorPayload.middleware";

const trainingsRunsRouter = Router();
const trainingsRunsController = new TrainingRunsController();

trainingsRunsRouter.post("/training-runs/start", trainingsRunsController.startTraining.bind(trainingsRunsController));
trainingsRunsRouter.post(
  "/training-runs/:trainingRunId/submit",
  validateLocatorPayloadMiddleware,
  trainingsRunsController.submitSolution.bind(trainingsRunsController)
);
trainingsRunsRouter.get(
  "/training-runs/:trainingRunId",
  trainingsRunsController.getRunById.bind(trainingsRunsController)
);

export default trainingsRunsRouter;
