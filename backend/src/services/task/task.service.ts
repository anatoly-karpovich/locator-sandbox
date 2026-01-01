import { Difficulty, Task, TaskId, TopicId } from "../../core/tasks/types";
import { TaskRepository } from "../../repositories/tasks.repo";

export class TaskService {
  constructor(private taskRepository: TaskRepository = new TaskRepository()) {}
  getById(taskId: TaskId): Task {
    const task = this.taskRepository.getById(taskId);
    return task;
  }

  getManyByIds(taskIds: TaskId[]): Task[] {
    return taskIds.map((id) => this.getById(id));
  }

  getByDifficulty(difficulty: Difficulty): Task[] {
    return this.taskRepository.getByDifficulty(difficulty);
  }

  getByTopic(topicId: TopicId): Task[] {
    return this.taskRepository.getByTopic(topicId);
  }

  getAll(): Task[] {
    return this.taskRepository.getAll();
  }
}
