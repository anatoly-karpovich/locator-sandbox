export const TYPES = {
  // repositories
  TaskRepository: Symbol.for("TaskRepository"),
  ModuleRepository: Symbol.for("ModuleRepository"),
  SectionRepository: Symbol.for("SectionRepository"),
  TopicRepository: Symbol.for("TopicRepository"),
  TrainingTemplateRepository: Symbol.for("TrainingTemplateRepository"),
  TrainingRunsRepository: Symbol.for("TrainingRunsRepository"),

  // services
  TaskService: Symbol.for("TaskService"),
  TaskAggregatedService: Symbol.for("TaskAggregatedService"),
  TrainingTemplateService: Symbol.for("TrainingTemplateService"),
  TrainingsRunService: Symbol.for("TrainingsRunService"),
  PlaygroundService: Symbol.for("PlaygroundService"),
  LocatorExecutor: Symbol.for("LocatorExecutor"),
  PlaywrightRunner: Symbol.for("PlaywrightRunner"),
  BrowserManager: Symbol.for("BrowserManager"),
  UsageSpecification: Symbol.for("UsageSpecification"),
  SolutionsHandler: Symbol.for("SolutionsHandler"),
  LocatorStateHandler: Symbol.for("LocatorStateHandler"),

  // controllers
  TasksController: Symbol.for("TasksController"),
  TrainingsController: Symbol.for("TrainingsController"),
  TrainingRunsController: Symbol.for("TrainingRunsController"),
  PlaygroundController: Symbol.for("PlaygroundController"),
} as const;
