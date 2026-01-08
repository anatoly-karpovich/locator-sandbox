import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types.js";
import {
  TaskRepository,
  ModuleRepository,
  SectionRepository,
  TopicRepository,
  TrainingTemplateRepository,
  TrainingRunsRepository,
  ITaskRepository,
  IModuleRepository,
  ISectionRepository,
  ITopicRepository,
  ITrainingTemplateRepository,
  ITrainingRunsRepository,
} from "@repositories/index.js";
import {
  TaskService,
  ITaskService,
  TaskAggregatedService,
  ITaskAggregatedService,
  TrainingTemplateService,
  ITrainingTemplateService,
  TrainingsRunService,
  ITrainingsRunService,
  PlaygroundService,
  IPlaygroundService,
} from "@services/index.js";
import { PlaywrightRunner } from "@core/playwright/playwright.runner.js";
import { UsageSpecification } from "@core/usageSpec/usageSpecification.js";
import { LocatorExecutor } from "@core/locator/locatorExecutor.js";
import { LocatorStateHandler } from "@core/locator/locatorStateHandler.js";
import { SolutionsHandler } from "@core/tasks/solutionsHandler.js";
import { IPlaywrightRunner, IUsageSpecification, ILocatorExecutor, ILocatorStateHandler, ISolutionsHandler } from "@core/types.js";
import { TasksController, TrainingsController, TrainingRunsController, PlaygroundController } from "@controllers/index.js";

const container = new Container({
  defaultScope: "Singleton",
});

// repositories
container.bind<ITaskRepository>(TYPES.TaskRepository).to(TaskRepository);
container.bind<IModuleRepository>(TYPES.ModuleRepository).to(ModuleRepository);
container.bind<ISectionRepository>(TYPES.SectionRepository).to(SectionRepository);
container.bind<ITopicRepository>(TYPES.TopicRepository).to(TopicRepository);
container.bind<ITrainingTemplateRepository>(TYPES.TrainingTemplateRepository).to(TrainingTemplateRepository);
container.bind<ITrainingRunsRepository>(TYPES.TrainingRunsRepository).to(TrainingRunsRepository);

// core helpers
container.bind<IPlaywrightRunner>(TYPES.PlaywrightRunner).to(PlaywrightRunner);
container.bind<IUsageSpecification>(TYPES.UsageSpecification).to(UsageSpecification);
container.bind<ILocatorStateHandler>(TYPES.LocatorStateHandler).to(LocatorStateHandler);
container.bind<ISolutionsHandler>(TYPES.SolutionsHandler).to(SolutionsHandler);
container.bind<ILocatorExecutor>(TYPES.LocatorExecutor).to(LocatorExecutor);

// services
container.bind<ITaskService>(TYPES.TaskService).to(TaskService);
container.bind<ITaskAggregatedService>(TYPES.TaskAggregatedService).to(TaskAggregatedService);
container.bind<ITrainingTemplateService>(TYPES.TrainingTemplateService).to(TrainingTemplateService);
container.bind<ITrainingsRunService>(TYPES.TrainingsRunService).to(TrainingsRunService);
container.bind<IPlaygroundService>(TYPES.PlaygroundService).to(PlaygroundService);

// controllers
container.bind<TasksController>(TYPES.TasksController).to(TasksController);
container.bind<TrainingsController>(TYPES.TrainingsController).to(TrainingsController);
container.bind<TrainingRunsController>(TYPES.TrainingRunsController).to(TrainingRunsController);
container.bind<PlaygroundController>(TYPES.PlaygroundController).to(PlaygroundController);

export { container };
