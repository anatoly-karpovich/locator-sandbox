import { Difficulty, Task, TaskId, TopicId, ModuleId, SectionId } from "@core/tasks/types.js";
import { modules } from "../db/modules.js";
import { sections } from "../db/sections.js";
import { topics } from "../db/topics.js";
import { trainings } from "../db/trainings.js";
import { ITrainingRun, TrainingRunId } from "@core/training/types.js";

export interface ITaskRepository {
  getAll(): Task[];
  getByTopic(topicId: TopicId): Task[];
  getById(id: TaskId): Task | undefined;
  getByDifficulty(difficulty: Difficulty): Task[];
}

export interface IModuleRepository {
  getById(id: ModuleId): typeof modules[number] | undefined;
  getAll(): typeof modules;
}

export interface ISectionRepository {
  getById(id: SectionId): typeof sections[number] | undefined;
  getByModuleId(moduleId: SectionId): typeof sections;
  getAll(): typeof sections;
}

export interface ITopicRepository {
  getById(id: TopicId): typeof topics[number] | undefined;
  getBySectionId(sectionId: SectionId | SectionId[]): typeof topics;
  getAll(): typeof topics;
}

export interface ITrainingTemplateRepository {
  getAll(): typeof trainings;
  getById(id: string): typeof trainings[number] | undefined;
}

export interface ITrainingRunsRepository {
  create(run: Omit<ITrainingRun, "id">): ITrainingRun;
  update(runId: TrainingRunId, run: ITrainingRun): ITrainingRun | null;
  getById(id: TrainingRunId): ITrainingRun | null;
  getAll(): ITrainingRun[];
}
