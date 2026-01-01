import { Difficulty, TaskId, TopicId } from "../core/tasks/types";
import { tasks } from "../db/tasks";

export class TaskRepository {
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
