import { inject, injectable } from "inversify";
import { Difficulty, Task, TaskId, TopicId } from "../../core/tasks/types";
import { ITaskRepository } from "../../repositories/tasks.repo";
import { TYPES } from "../../container/types";

export interface ITaskService {
  getById(taskId: TaskId): Task | undefined;
  getManyByIds(taskIds: TaskId[]): Task[];
  getByDifficulty(difficulty: Difficulty): Task[];
  getByTopic(topicId: TopicId): Task[];
  getAll(): Task[];
}

@injectable()
export class TaskService implements ITaskService {
  constructor(@inject(TYPES.TaskRepository) private taskRepository: ITaskRepository) {}

  getById(taskId: TaskId): Task | undefined {
    return this.taskRepository.getById(taskId);
  }

  getManyByIds(taskIds: TaskId[]): Task[] {
    return taskIds.map((id) => this.getById(id)).filter(Boolean) as Task[];
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
