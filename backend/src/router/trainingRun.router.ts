import { Router } from "express";
import { TrainingRunsController } from "../controllers";
import { validateLocatorPayloadMiddleware } from "../middlewares/locatorPayload.middleware";
import { container, TYPES } from "../container";

const trainingsRunsRouter = Router();
const trainingsRunsController = container.get<TrainingRunsController>(TYPES.TrainingRunsController);

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
