import { Router } from "express";
import { TrainingsController } from "@controllers/index.js";
import { container, TYPES } from "../container/index.js";

const trainingsRouter = Router();
const trainingsController = container.get<TrainingsController>(TYPES.TrainingsController);

trainingsRouter.get("/trainings/catalog", trainingsController.getCatalog.bind(trainingsController));

export default trainingsRouter;
