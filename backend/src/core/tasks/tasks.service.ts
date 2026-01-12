import { getByPlaceholderTasks } from "@core/tasks/getBy/getByPlaceholder.js";
import { getByRoleTasks } from "@core/tasks/getBy/getByRole.js";
import { getByTextTasks } from "@core/tasks/getBy/getByText.js";
import { Difficulty, Module, Task, TaskId } from "@core/tasks/types.js";

class TasksService {
  private tasks: Task[] = [
    ...getByTextTasks,
    ...getByPlaceholderTasks,
    ...getByRoleTasks,
  ];

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
