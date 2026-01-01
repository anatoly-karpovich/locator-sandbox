import { ITrainingTemplate } from "../../core/training/types";
import { TaskService } from "../task/task.service";
import { ModuleRepository, SectionRepository, TrainingTemplateRepository } from "../../repositories";
import { TrainingCatalogResponseDTO } from "../../dto/trainings.dto";

export class TrainingTemplateService {
  constructor(
    private taskService: TaskService = new TaskService(),
    private trainingTemplatesRepository: TrainingTemplateRepository = new TrainingTemplateRepository(),
    private modulesRepository: ModuleRepository = new ModuleRepository(),
    private sectionsRepository: SectionRepository = new SectionRepository()
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
        this.taskService.getById(taskId); // выбросит ошибку если невалидно
      }
    }
  }

  getCatalogView(): TrainingCatalogResponseDTO {
    const modules = this.modulesRepository.getAll();
    const templates = this.trainingTemplatesRepository.getAll();

    return {
      modules: modules.map((module) => {
        const sections = this.sectionsRepository.getByModuleId(module.id);

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
