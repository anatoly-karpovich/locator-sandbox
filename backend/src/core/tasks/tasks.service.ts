import { getByPlaceholderTasks } from "./getBy/getByPlaceholder";
import { getByTextTasks } from "./getBy/getByText";
import { Difficulty, Module, Task, TaskId } from "./types";

class TasksService {
  private tasks: Task[] = [...getByTextTasks, ...getByPlaceholderTasks];

  getById(id: TaskId) {
    return this.tasks.find((t) => t.id === id);
  }

  getAll() {
    return this.tasks;
  }

  getByDifficulty(difficulty: Difficulty) {
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

export default new TasksService();
