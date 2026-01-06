import { ModuleRepository } from "./module.repo";
import { SectionRepository } from "./section.repo";
import { TopicRepository } from "./topic.repo";
import { TaskRepository } from "./tasks.repo";
import { TrainingTemplateRepository } from "./trainingTemplates.repo";
import { TrainingRunsRepository } from "./trainingRuns.repo";
import {
  IModuleRepository,
  ISectionRepository,
  ITopicRepository,
  ITaskRepository,
  ITrainingTemplateRepository,
  ITrainingRunsRepository,
} from "./types";

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
export * from "./types";
