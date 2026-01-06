import { inject, injectable } from "inversify";
import { ModuleId, Task, SectionId, TopicId, Difficulty } from "../../core/tasks/types";
import { ITaskCatalogResponse } from "../../core/training/types";
import { ITopicRepository } from "../../repositories/topic.repo";
import { ISectionRepository } from "../../repositories/section.repo";
import { IModuleRepository } from "../../repositories/module.repo";
import { ITaskRepository } from "../../repositories/tasks.repo";
import { ITaskService } from "./task.service";
import { TYPES } from "../../container/types";

type TaskQueryFilter = {
  difficulty?: Difficulty;
  moduleId?: ModuleId;
  sectionId?: SectionId;
  topicId?: TopicId;
  limit?: number;
};

export interface ITaskAggregatedService {
  getCatalog(): ITaskCatalogResponse;
  query(filter: TaskQueryFilter): Task[];
  getByModule(moduleId: ModuleId): Task[];
  getBySection(sectionId: SectionId): Task[];
  getByTopic(topicId: TopicId): Task[];
}

@injectable()
export class TaskAggregatedService implements ITaskAggregatedService {
  constructor(
    @inject(TYPES.TaskService) private taskService: ITaskService,
    @inject(TYPES.SectionRepository) private sectionRepository: ISectionRepository,
    @inject(TYPES.ModuleRepository) private moduleRepository: IModuleRepository,
    @inject(TYPES.TaskRepository) private tasksRepository: ITaskRepository,
    @inject(TYPES.TopicRepository) private topicsRepository: ITopicRepository
  ) {}

  getCatalog(): ITaskCatalogResponse {
    const modules = this.moduleRepository.getAll();

    return {
      modules: modules.map((module) => {
        const sections = this.sectionRepository.getByModuleId(module.id);

        return {
          id: module.id,
          title: module.title,
          sections: sections.map((section) => {
            const topics = this.topicsRepository.getBySectionId(section.id);

            return {
              id: section.id,
              title: section.title,
              topics: topics.map((topic) => {
                const tasks = this.tasksRepository.getByTopic(topic.id);

                return {
                  id: topic.id,
                  title: topic.title,
                  taskCount: tasks.length,
                  difficulties: Array.from(new Set(tasks.map((t) => t.difficulty))),
                  hasUsageSpec: tasks.some((t) => Boolean(t.usageSpec)),
                };
              }),
            };
          }),
        };
      }),
    };
  }

  query(filter: TaskQueryFilter): Task[] {
    let tasks = this.tasksRepository.getAll();

    if (filter.difficulty) {
      tasks = tasks.filter((t) => t.difficulty === filter.difficulty);
    }

    if (filter.topicId) {
      tasks = tasks.filter((t) => t.topicId === filter.topicId);
    }

    if (filter.sectionId) {
      const topicIds = this.topicsRepository.getBySectionId(filter.sectionId).map((t) => t.id);

      tasks = tasks.filter((t) => topicIds.includes(t.topicId));
    }

    if (filter.moduleId) {
      const sectionIds = this.sectionRepository.getByModuleId(filter.moduleId).map((s) => s.id);

      const topicIds = this.topicsRepository.getBySectionId(sectionIds).map((t) => t.id);

      tasks = tasks.filter((t) => topicIds.includes(t.topicId));
    }

    if (filter.limit) {
      tasks = tasks.slice(0, filter.limit);
    }

    return tasks;
  }

  getByModule(moduleId: ModuleId): Task[] {
    const sectionIds = this.sectionRepository.getByModuleId(moduleId).map((s) => s.id);

    const topicIds = this.topicsRepository.getBySectionId(sectionIds).map((t) => t.id);

    return this.taskService.getAll().filter((task) => topicIds.includes(task.topicId));
  }

  getBySection(sectionId: SectionId): Task[] {
    const topicIds = this.topicsRepository.getBySectionId(sectionId).map((t) => t.id);

    return this.taskService.getAll().filter((task) => topicIds.includes(task.topicId));
  }

  getByTopic(topicId: TopicId): Task[] {
    return this.taskService.getByTopic(topicId);
  }
}
