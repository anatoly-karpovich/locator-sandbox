import { Router } from "express";
import { TrainingsController } from "../controllers";
import { container, TYPES } from "../container";

const trainingsRouter = Router();
const trainingsController = container.get<TrainingsController>(TYPES.TrainingsController);

trainingsRouter.get("/trainings/catalog", trainingsController.getCatalog.bind(trainingsController));

export default trainingsRouter;
