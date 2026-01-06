import { Router } from "express";
import { TasksController } from "../controllers/tasks.controller";
import { container, TYPES } from "../container";

const tasksRouter = Router();
const tasksController = container.get<TasksController>(TYPES.TasksController);

tasksRouter.get("/tasks/:id", tasksController.getById.bind(tasksController));
tasksRouter.get("/tasks", tasksController.getAll.bind(tasksController));

export default tasksRouter;
