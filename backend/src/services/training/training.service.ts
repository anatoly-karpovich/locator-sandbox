import { ITrainingSet } from "../../core/training/types";
import taskService from "../task/task.service";
import trainingTemplateService from "./trainingTemplate.service";

class TrainingService {
  startFixedTraining(templateId: string): ITrainingSet {
    const template = trainingTemplateService.getById(templateId);

    const tasks = taskService.getManyByIds(template.taskIds).map((el) => ({ id: el.id, title: el.title }));

    return {
      // id: generateUUID(),
      id: "asdsadasdas",
      source: "fixed",
      templateId: template.id,
      tasks,
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
