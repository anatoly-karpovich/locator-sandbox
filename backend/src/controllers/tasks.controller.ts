import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { Module } from "@core/tasks/types.js";
import { HTTP_CODES } from "@core/httpCodes.js";
import { ITaskAggregatedService, ITaskService } from "@services/index.js";
import { TYPES } from "../container/types.js";

@injectable()
export class TasksController {
  constructor(
    @inject(TYPES.TaskAggregatedService) private taskAggregatedService: ITaskAggregatedService,
    @inject(TYPES.TaskService) private taskService: ITaskService
  ) {}
  getById(req: Request, res: Response) {
    const id = req.params.id;

    const task = this.taskService.getById(id);

    if (!task) return res.status(HTTP_CODES.NOT_FOUND).json({ error: "Task not found" });

    return res.status(HTTP_CODES.OK).json({ task });
  }

  getByModule(req: Request, res: Response) {
    const module = req.params.module as Module;
    const tasks = this.taskAggregatedService.getByModule(module);

    return res.status(HTTP_CODES.OK).json({ tasks });
  }

  getAll(req: Request, res: Response) {
    const tasks = this.taskAggregatedService.getCatalog();
    return res.status(HTTP_CODES.OK).json(tasks);
  }
}
