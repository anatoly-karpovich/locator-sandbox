import { ModuleRepository } from "@repositories/module.repo.js";
import { SectionRepository } from "@repositories/section.repo.js";
import { TopicRepository } from "@repositories/topic.repo.js";
import { TaskRepository } from "@repositories/tasks.repo.js";
import { TrainingTemplateRepository } from "@repositories/trainingTemplates.repo.js";
import { TrainingRunsRepository } from "@repositories/trainingRuns.repo.js";
import {
  IModuleRepository,
  ISectionRepository,
  ITopicRepository,
  ITaskRepository,
  ITrainingTemplateRepository,
  ITrainingRunsRepository,
} from "@repositories/types.js";

export {
  ModuleRepository,
  IModuleRepository,
  SectionRepository,
  ISectionRepository,
  TopicRepository,
  ITopicRepository,
  TaskRepository,
  ITaskRepository,
  TrainingTemplateRepository,
  ITrainingTemplateRepository,
  TrainingRunsRepository,
  ITrainingRunsRepository,
};
export * from "@repositories/types.js";
