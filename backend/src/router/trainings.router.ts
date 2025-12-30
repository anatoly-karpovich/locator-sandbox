import { Router } from "express";
import { TrainingsController } from "../controllers";

const trainingsRouter = Router();
const trainingsController = new TrainingsController();

trainingsRouter.get("/trainings/catalog", trainingsController.getCatalog.bind(trainingsController));

export default trainingsRouter;
