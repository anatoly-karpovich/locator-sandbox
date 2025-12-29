import { Task, TaskId } from "../../core/tasks/types";
import taskStorage from "../../core/training/task.storage";

class TaskService {
  getById(taskId: TaskId): Task {
    const task = taskStorage.getById(taskId);
    if (!task) {
      throw new Error(`Task ${taskId} not found`);
    }
    return task;
  }

  getManyByIds(taskIds: TaskId[]): Task[] {
    return taskIds.map((id) => this.getById(id));
  }

  query(filter: { difficulty?: string; scope?: Partial<Task["scope"]>; limit?: number }): Task[] {
    let tasks = taskStorage.getAll();

    if (filter.difficulty) {
      tasks = tasks.filter((t) => t.difficulty === filter.difficulty);
    }

    if (filter.scope) {
      tasks = tasks.filter((t) =>
        Object.entries(filter.scope!).every(([key, value]) => t.scope[key as keyof Task["scope"]] === value)
      );
    }

    if (filter.limit) {
      tasks = tasks.slice(0, filter.limit);
    }

    return tasks;
  }
}

export default new TaskService();
