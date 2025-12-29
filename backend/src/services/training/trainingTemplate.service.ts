import trainingCatalog from "../../core/training/storage";
import { ITrainingTemplate } from "../../core/training/types";
import taskService from "../task/task.service";

class TrainingTemplateService {
  getById(id: string): ITrainingTemplate {
    const template = trainingCatalog.getById(id);
    if (!template) {
      throw new Error(`TrainingTemplate ${id} not found`);
    }
    return template;
  }

  validateTemplatesOnStartup() {
    const templates = trainingCatalog.getAll();

    for (const template of templates) {
      for (const taskId of template.taskIds) {
        taskService.getById(taskId); // выбросит ошибку если невалидно
      }
    }
  }

  // getCatalogView(): TrainingCatalogResponse {
  //   const templates = this.templateStorage.getAll();

  //   // UI-friendly группировка
  //   return buildCatalogFromTemplates(templates);
  // }
}

export default new TrainingTemplateService();
