import { tasks } from "./storage";
import { Task } from "./types";

class TasksService {
  private tasks: Task[] = tasks;

  getById(id: number) {
    return this.tasks.find((t) => t.id === id);
  }

  getAll() {
    return this.tasks;
  }

  getAllStructured() {
    const result = this.tasks.reduce((res, task) => {
      res[task.id] = task;
      return res;
    }, {} as Record<number, Task>);
    return result;
  }
}

export default new TasksService();
