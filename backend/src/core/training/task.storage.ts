import { getByPlaceholderTasks } from "../tasks/getBy/getByPlaceholder";
import { getByTextTasks } from "../tasks/getBy/getByText";
import { Task, TaskId, Module, Difficulty } from "../tasks/types";

class TaskStorage {
  private tasks: Task[] = [...getByTextTasks, ...getByPlaceholderTasks];

  getById(id: TaskId) {
    return this.tasks.find((t) => t.id === id);
  }

  getByModule(module: Module) {
    return this.tasks.filter((t) => t.scope.module === module);
  }

  getAll() {
    return this.tasks;
  }

  getByLevel(difficulty: Difficulty) {
    return this.tasks.filter((t) => t.difficulty === difficulty);
  }

  getByIds(ids: TaskId[]): Task[] {
    return ids.map((id) => this.getById(id)).filter(Boolean) as Task[];
  }

  getAllStructured() {
    const result = this.tasks.reduce((res, task) => {
      res[task.id] = task;
      return res;
    }, {} as Record<number, Task>);
    return result;
  }
}

export default new TaskStorage();
