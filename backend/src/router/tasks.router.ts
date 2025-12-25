import { Router } from "express";
import { TasksController } from "../controllers/tasks.controller";

const tasksRouter = Router();
const tasksController = new TasksController();

tasksRouter.get("/tasks/:id", tasksController.getById);
tasksRouter.get("/tasks", tasksController.getAll);

export default tasksRouter;
