import { tasks } from "./storage";
import { Task } from "./types";

export class TasksService {
  private tasks: Task[] = tasks;

  getById(id: number) {
    return this.tasks.find((t) => t.id === id);
  }

  getAll() {
    return this.tasks;
  }
}
