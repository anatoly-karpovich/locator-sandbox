import { Router } from "express";
import { TrainingRunsController } from "@controllers/index.js";
import { validateLocatorPayloadMiddleware } from "@middlewares/locatorPayload.middleware.js";
import { container, TYPES } from "../container/index.js";
import { ITrainingSubmitSolutionRequestDTOSchema, StartTrainingRequestDTOSchema } from "@dto/trainingRuns.dto.js";
import { validateSchemaMiddleware } from "@middlewares/validateSchema.middleware.js";

const trainingsRunsRouter = Router();
const trainingsRunsController = container.get<TrainingRunsController>(TYPES.TrainingRunsController);

trainingsRunsRouter.post("/training-runs/start", validateSchemaMiddleware(StartTrainingRequestDTOSchema), trainingsRunsController.startTraining.bind(trainingsRunsController));
trainingsRunsRouter.post(
  "/training-runs/:trainingRunId/submit",
  validateSchemaMiddleware(ITrainingSubmitSolutionRequestDTOSchema),
  validateLocatorPayloadMiddleware,
  trainingsRunsController.submitSolution.bind(trainingsRunsController)
);
trainingsRunsRouter.get(
  "/training-runs/:trainingRunId",
  trainingsRunsController.getRunById.bind(trainingsRunsController)
);

export default trainingsRunsRouter;
