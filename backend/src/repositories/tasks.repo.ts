import { injectable } from "inversify";
import { Difficulty, Task, TaskId, TopicId } from "../core/tasks/types";
import { tasks } from "../db/tasks";

export interface ITaskRepository {
  getAll(): Task[];
  getByTopic(topicId: TopicId): Task[];
  getById(id: TaskId): Task | undefined;
  getByDifficulty(difficulty: Difficulty): Task[];
}

@injectable()
export class TaskRepository implements ITaskRepository {
  private table = tasks;
  getAll() {
    return this.table;
  }

  getByTopic(topicId: TopicId) {
    return this.table.filter((task) => task.topicId === topicId);
  }

  getById(id: TaskId) {
    return this.table.find((task) => task.id === id);
  }

  getByDifficulty(difficulty: Difficulty) {
    return this.table.filter((task) => task.difficulty === difficulty);
  }
}
