import { Request, Response } from "express";
import tasksService from "../tasks/tasks.service";
import { Module } from "../tasks/types";

export class TasksController {
  getById(req: Request, res: Response) {
    const id = +req.params.id;

    const task = tasksService.getById(id);

    if (!task) return res.status(404).json({ error: "Task not found" });

    return res.status(200).json({ task });
  }

  getByModule(req: Request, res: Response) {
    const module = req.params.module as Module;
    const tasks = tasksService.getByModule(module);

    return res.status(200).json({ tasks });
  }

  getAll(req: Request, res: Response) {
    const tasks = tasksService.getAllStructured();
    return res.status(200).json({ tasks });
  }
}
