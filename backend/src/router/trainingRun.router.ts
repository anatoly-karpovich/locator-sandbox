import { Router } from "express";
import { TrainingRunsController } from "@controllers/index.js";
import { validateLocatorPayloadMiddleware } from "@middlewares/locatorPayload.middleware.js";
import { container, TYPES } from "../container/index.js";
import { ITrainingSubmitSolutionRequestDTOSchema, StartCustomTrainingRequestDTOSchema, StartFixedTrainingRequestDTOSchema,  } from "@dto/trainingRuns.dto.js";
import { validateSchemaMiddleware } from "@middlewares/validateSchema.middleware.js";

const trainingsRunsRouter = Router();
const trainingsRunsController = container.get<TrainingRunsController>(TYPES.TrainingRunsController);

trainingsRunsRouter.post("/training-runs/start-fixed", validateSchemaMiddleware(StartFixedTrainingRequestDTOSchema), trainingsRunsController.startFixedTraining.bind(trainingsRunsController));
trainingsRunsRouter.post("/training-runs/start-custom", validateSchemaMiddleware(StartCustomTrainingRequestDTOSchema), trainingsRunsController.startCustomTraining.bind(trainingsRunsController));
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
