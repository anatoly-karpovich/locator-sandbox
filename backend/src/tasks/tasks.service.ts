import { getByPlaceholderTasks } from "./getBy/getByPlaceholder";
import { getByTextTasks } from "./getBy/getByText";
import { Module, Task } from "./types";

class TasksService {
  private tasks: Task[] = [...getByTextTasks, ...getByPlaceholderTasks];

  getById(id: number) {
    return this.tasks.find((t) => t.id === id);
  }

  getByModule(module: Module) {
    return this.tasks.filter((t) => t.module === module);
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
