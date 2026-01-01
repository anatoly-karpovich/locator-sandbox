import { Request, Response } from "express";
import tasksService from "../core/tasks/tasks.service";
import { Module } from "../core/tasks/types";
import { HTTP_CODES } from "../core/httpCodes";
import { TaskAggregatedService } from "../services";

export class TasksController {
  constructor(private taskAggregatedService: TaskAggregatedService = new TaskAggregatedService()) {}
  getById(req: Request, res: Response) {
    const id = req.params.id;

    const task = tasksService.getById(id);

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
