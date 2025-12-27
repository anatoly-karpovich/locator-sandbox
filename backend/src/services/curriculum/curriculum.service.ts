// curriculum/curriculum.service.ts

import tasksService from "../../tasks/tasks.service";
import { curriculum } from "./curriculum.config";
import { SectionNode, TopicNode } from "./types";

type CurriculumQuery = {
  section?: string;
  module?: string;
  topic?: string;
  level?: string;
  includeTasks?: boolean;
};

class CurriculumService {
  getCurriculum(query: CurriculumQuery) {
    let sections = curriculum.sections;

    if (query.section) {
      sections = sections.filter((s) => s.id === query.section);
    }

    const resultSections = sections.map((section) => {
      let modules = section.modules;

      if (query.module) {
        modules = modules.filter((m) => m.id === query.module);
      }

      const mappedModules = modules.map((module) => {
        let topics = module.topics;

        if (query.topic) {
          topics = topics.filter((t) => t.id === query.topic);
        }

        if (query.level) {
          topics = topics.filter((t) => t.level === query.level);
        }

        const mappedTopics = topics.map((topic) =>
          query.includeTasks ? this.mapTopicWithTasks(topic) : this.mapTopicWithCounters(topic)
        );

        return {
          id: module.id,
          title: module.title,
          topics: mappedTopics,
        };
      });

      return {
        id: section.id,
        title: section.title,
        modules: mappedModules,
      };
    });

    return {
      version: curriculum.version,
      sections: resultSections,
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
