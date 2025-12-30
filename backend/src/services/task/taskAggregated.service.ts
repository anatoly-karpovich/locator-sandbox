import { ModuleId, Task, SectionId, TopicId, Difficulty } from "../../core/tasks/types";
import { ITaskCatalogResponse } from "../../core/training/types";
import { topicsRepository, sectionsRepository, modulesRepository, tasksRepository } from "../../repositories";
import taskService from "./task.service";

type TaskQueryFilter = {
  difficulty?: Difficulty;
  moduleId?: ModuleId;
  sectionId?: SectionId;
  topicId?: TopicId;
  limit?: number;
};

class TaskAggregatedService {
  getCatalog(): ITaskCatalogResponse {
    const modules = modulesRepository.getAll();

    return {
      modules: modules.map((module) => {
        const sections = sectionsRepository.getByModuleId(module.id);

        return {
          id: module.id,
          title: module.title,
          sections: sections.map((section) => {
            const topics = topicsRepository.getBySectionId(section.id);

            return {
              id: section.id,
              title: section.title,
              topics: topics.map((topic) => {
                const tasks = tasksRepository.getByTopic(topic.id);

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
    let tasks = tasksRepository.getAll();

    if (filter.difficulty) {
      tasks = tasks.filter((t) => t.difficulty === filter.difficulty);
    }

    if (filter.topicId) {
      tasks = tasks.filter((t) => t.topicId === filter.topicId);
    }

    if (filter.sectionId) {
      const topicIds = topicsRepository.getBySectionId(filter.sectionId).map((t) => t.id);

      tasks = tasks.filter((t) => topicIds.includes(t.topicId));
    }

    if (filter.moduleId) {
      const sectionIds = sectionsRepository.getByModuleId(filter.moduleId).map((s) => s.id);

      const topicIds = topicsRepository.getBySectionId(sectionIds).map((t) => t.id);

      tasks = tasks.filter((t) => topicIds.includes(t.topicId));
    }

    if (filter.limit) {
      tasks = tasks.slice(0, filter.limit);
    }

    return tasks;
  }

  getByModule(moduleId: ModuleId): Task[] {
    const sectionIds = sectionsRepository.getByModuleId(moduleId).map((s) => s.id);

    const topicIds = topicsRepository.getBySectionId(sectionIds).map((t) => t.id);

    return taskService.getAll().filter((task) => topicIds.includes(task.topicId));
  }

  getBySection(sectionId: SectionId): Task[] {
    const topicIds = topicsRepository.getBySectionId(sectionId).map((t) => t.id);

    return taskService.getAll().filter((task) => topicIds.includes(task.topicId));
  }

  getByTopic(topicId: TopicId): Task[] {
    return taskService.getByTopic(topicId);
  }
}

export default new TaskAggregatedService();
