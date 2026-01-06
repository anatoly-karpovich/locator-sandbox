import { Router } from "express";
import { TrainingRunsController } from "@controllers/index.js";
import { validateLocatorPayloadMiddleware } from "@middlewares/locatorPayload.middleware.js";
import { container, TYPES } from "../container/index.js";

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
