import taskService from "../../services/task/task.service";
import { Task } from "../tasks/types";
import { ITaskCatalogResponse } from "./types";

export class TaskCatalogService {
  getCatalog(): ITaskCatalogResponse {
    const tasks = taskService.query({});

    return this.buildTaskCatalog(tasks);
  }

  private buildTaskCatalog(tasks: Task[]): ITaskCatalogResponse {
    const modulesMap = new Map<string, any>();

    for (const task of tasks) {
      const { module, section, topic } = task.scope;

      if (!modulesMap.has(module)) {
        modulesMap.set(module, { name: module, sections: new Map() });
      }

      const moduleNode = modulesMap.get(module);

      if (!moduleNode.sections.has(section)) {
        moduleNode.sections.set(section, { name: section, topics: new Map() });
      }

      const sectionNode = moduleNode.sections.get(section);

      const topicName = topic ?? "default";
      if (!sectionNode.topics.has(topicName)) {
        sectionNode.topics.set(topicName, { name: topicName, tasks: [] });
      }

      sectionNode.topics.get(topicName).tasks.push({
        id: task.id,
        title: task.title,
        difficulty: task.difficulty,
        scope: task.scope,
        hasUsePreferences: Boolean(task.usageSpec),
      });
    }

    return {
      modules: Array.from(modulesMap.values()).map((m) => ({
        name: m.name,
        sections: Array.from(m.sections.values()).map((s: any) => ({
          name: s.name,
          topics: Array.from(s.topics.values()),
        })),
      })),
    };
  }
}
