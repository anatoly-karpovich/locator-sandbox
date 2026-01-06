import { injectable } from "inversify";
import { TaskId, TopicId, Difficulty } from "@core/tasks/types.js";
import { tasks } from "../db/tasks.js";
import { ITaskRepository } from "@repositories/types.js";

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
