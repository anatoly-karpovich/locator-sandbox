import { TopicId } from "../../core/tasks/types";
import { ITrainingSet } from "../../core/training/types";
import { topicsRepository } from "../../repositories";
import taskService from "../task/task.service";
import trainingTemplateService from "./trainingTemplate.service";

class TrainingService {
  startFixedTraining(templateId: string): ITrainingSet {
    const template = trainingTemplateService.getById(templateId);

    const tasks = taskService.getManyByIds(template.taskIds);

    // 1️⃣ группируем таски по topicId
    const tasksByTopic = new Map<TopicId, typeof tasks>();

    for (const task of tasks) {
      if (!tasksByTopic.has(task.topicId)) {
        tasksByTopic.set(task.topicId, []);
      }
      tasksByTopic.get(task.topicId)!.push(task);
    }

    // 2️⃣ собираем topics DTO
    const topics = Array.from(tasksByTopic.entries()).map(([topicId, topicTasks]) => {
      const topic = topicsRepository.getById(topicId);

      if (!topic) {
        throw new Error(`Topic ${topicId} not found for training`);
      }

      return {
        id: topic.id,
        title: topic.title,
        tasks: topicTasks.map((task) => ({
          id: task.id,
          title: task.title,
        })),
      };
    });

    return {
      id: String(Date.now()), // позже UUID
      type: "template",
      templateId: template.id,
      topics,
      createdAt: new Date().toISOString(),
    };
  }

  // startCustomTraining(params: { difficulty?: string; scope?: Partial<Task["scope"]>; limit: number }): ITrainingSet {
  //   const tasks = taskService.query({
  //     difficulty: params.difficulty,
  //     scope: params.scope,
  //     limit: params.limit,
  //   });

  //   if (tasks.length === 0) {
  //     throw new Error("No tasks found for given parameters");
  //   }

  //   return {
  //     id: generateUUID(),
  //     source: "custom",
  //     taskIds: tasks.map((t) => t.id),
  //     createdAt: new Date().toISOString(),
  //   };
  // }
}

export default new TrainingService();
