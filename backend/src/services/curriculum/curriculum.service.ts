// curriculum/curriculum.service.ts

import { curriculum } from "./curriculum.config";
import tasksService from "../../core/tasks/tasks.service";
import { ModuleNode, SectionNode, TopicNode } from "./types";

type CurriculumQuery = {
  module?: string; // locators
  section?: string; // getBy
  topic?: string; // getByText
  level?: string;
  includeTasks?: boolean;
};

class CurriculumService {
  getCurriculum(query: CurriculumQuery) {
    let modules = curriculum.modules;

    // фильтрация по module (верхний уровень)
    if (query.module) {
      modules = modules.filter((m) => m.id === query.module);
    }

    const mappedModules = modules.map((module) => {
      let sections = module.sections;

      // фильтрация по section
      if (query.section) {
        sections = sections.filter((s) => s.id === query.section);
      }

      const mappedSections = sections.map((section) => {
        let topics = section.topics;

        // фильтрация по topic
        if (query.topic) {
          topics = topics.filter((t) => t.id === query.topic);
        }

        // фильтрация по level
        if (query.level) {
          topics = topics.filter((t) => t.level === query.level);
        }

        const mappedTopics = topics.map((topic) =>
          query.includeTasks ? this.mapTopicWithTasks(topic) : this.mapTopicWithCounters(topic)
        );

        return {
          id: section.id,
          title: section.title,
          topics: mappedTopics,
        };
      });

      return {
        id: module.id,
        title: module.title,
        sections: mappedSections,
      };
    });

    return {
      version: curriculum.version,
      modules: mappedModules,
    };
  }

  private mapTopicWithCounters(topic: TopicNode) {
    return {
      id: topic.id,
      title: topic.title,
      level: topic.level,
      tasksCount: topic.taskIds.length,
    };
  }

  private mapTopicWithTasks(topic: TopicNode) {
    const tasks = tasksService.getByIds(topic.taskIds).map((task) => ({
      id: task.id,
      title: task.title,
    }));

    return {
      id: topic.id,
      title: topic.title,
      level: topic.level,
      tasks,
    };
  }
}

export default new CurriculumService();
