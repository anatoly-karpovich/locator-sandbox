import { Difficulty, Task, TaskId, TopicId } from "../../core/tasks/types";
import taskRepository from "../../repositories/tasks.repo";

class TaskService {
  getById(taskId: TaskId): Task {
    const task = taskRepository.getById(taskId);
    return task;
  }

  getManyByIds(taskIds: TaskId[]): Task[] {
    return taskIds.map((id) => this.getById(id));
  }

  getByDifficulty(difficulty: Difficulty): Task[] {
    return taskRepository.getByDifficulty(difficulty);
  }

  getByTopic(topicId: TopicId): Task[] {
    return taskRepository.getByTopic(topicId);
  }

  getAll(): Task[] {
    return taskRepository.getAll();
  }
}

export default new TaskService();
