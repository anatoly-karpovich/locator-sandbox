import { inject, injectable } from "inversify";
import { ITrainingTemplate } from "@core/training/types.js";
import { ITaskService } from "@services/types.js";
import { ISectionRepository, ITrainingTemplateRepository } from "@repositories/index.js";
import { TrainingCatalogResponseDTO } from "@dto/trainings.dto.js";
import { TYPES } from "../../container/types.js";
import { ITrainingTemplateService } from "@services/types.js";

@injectable()
export class TrainingTemplateService implements ITrainingTemplateService {
  constructor(
    @inject(TYPES.TaskService) private taskService: ITaskService,
    @inject(TYPES.TrainingTemplateRepository) private trainingTemplatesRepository: ITrainingTemplateRepository,
    @inject(TYPES.SectionRepository) private sectionsRepository: ISectionRepository
  ) {}

  getById(id: string): ITrainingTemplate {
    const template = this.trainingTemplatesRepository.getById(id);
    if (!template) {
      throw new Error(`TrainingTemplate ${id} not found`);
    }
    return template;
  }

  validateTemplatesOnStartup() {
    const templates = this.trainingTemplatesRepository.getAll();

    for (const template of templates) {
      for (const taskId of template.taskIds) {
        this.taskService.getById(taskId);
      }
    }
  }

  getCatalogView(): TrainingCatalogResponseDTO {
    const sections = this.sectionsRepository.getAll();
    const templates = this.trainingTemplatesRepository.getAll();

    return {
      trainings: sections.map((section) => {
        const sectionTemplates = templates.filter((t) => t.sectionId === section.id);

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
  }
}