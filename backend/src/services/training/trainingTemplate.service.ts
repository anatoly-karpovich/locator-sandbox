import { ITrainingTemplate } from "../../core/training/types";
import taskService from "../task/task.service";
import trainingTemplatesRepository from "../../repositories/trainingTemplates.repo";
import { modulesRepository, sectionsRepository } from "../../repositories";
import { TrainingCatalogResponseDTO } from "../../dto/trainings.dto";

class TrainingTemplateService {
  getById(id: string): ITrainingTemplate {
    const template = trainingTemplatesRepository.getById(id);
    if (!template) {
      throw new Error(`TrainingTemplate ${id} not found`);
    }
    return template;
  }

  validateTemplatesOnStartup() {
    const templates = trainingTemplatesRepository.getAll();

    for (const template of templates) {
      for (const taskId of template.taskIds) {
        taskService.getById(taskId); // выбросит ошибку если невалидно
      }
    }
  }

  getCatalogView(): TrainingCatalogResponseDTO {
    const modules = modulesRepository.getAll();
    const templates = trainingTemplatesRepository.getAll();

    return {
      modules: modules.map((module) => {
        const sections = sectionsRepository.getByModuleId(module.id);

        return {
          id: module.id,
          title: module.title,
          sections: sections.map((section) => {
            const sectionTemplates = templates.filter(
              (t) => t.moduleId === module.id && t.sectionId === section.id // см. примечание ниже
            );

            return {
              id: section.id,
              title: section.title,
              trainings: sectionTemplates.map((t) => ({
                id: t.id,
                title: t.title,
                description: t.description,
                difficulty: t.difficulty,
                taskCount: t.taskIds.length,
              })),
            };
          }),
        };
      }),
    };
  }
}

export default new TrainingTemplateService();
