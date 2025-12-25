import { Request, Response } from "express";
import tasksService from "../tasks/tasks.service";

export class TasksController {
  getById(req: Request, res: Response) {
    const id = +req.params.id;

    const task = tasksService.getById(id);

    if (!task) return res.status(404).json({ error: "Task not found" });

    return res.status(200).json({ task });
  }

  getAll(req: Request, res: Response) {
    const tasks = tasksService.getAllStructured();
    return res.status(200).json({ tasks });
  }
}
