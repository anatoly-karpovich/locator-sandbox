import { Difficulty, ModuleId, SectionId, TaskId, TopicId } from "../tasks/types";

export interface StartFixedTrainingRequest {
  trainingTemplateId: TrainingTemplateId;
}

export interface StartCustomTrainingRequest {
  difficulty?: Difficulty;
  scope?: {
    module?: string;
    section?: string;
    topic?: string;
  };
  limit: number;
  // strategy?: "random" | "progressive";
}

export interface StartTrainingResponse {
  trainingSet: ITrainingSet;
}

export interface ITrainingSubmitSolutionRequest {
  trainingSetId: TrainingSetId;
  taskId: TaskId;
  payload: string; // locator code
}

export interface ITrainingSubmitSolutionResponse {
  success: boolean;

  execution: {
    attached: boolean;
    count?: number;
    text?: string;
    visible?: boolean;
  };

  usageValidation?: {
    method: { passed: boolean; message: string };
    argument: { passed: boolean; message: string };
    options?: { passed: boolean; message: string };
  };

  hints?: string[];
}

export type TrainingSetId = string; // UUID

export interface ITrainingSet {
  id: TrainingSetId;
  type: "template" | "custom";

  // Откуда получен
  templateId?: TrainingTemplateId;

  // UI-ready навигация
  topics: Array<{
    id: TopicId;
    title: string;
    tasks: Array<{
      id: TaskId;
      title: string;
    }>;
  }>;

  // Runtime-мета
  createdAt: string;

  // На будущее
  userId?: string;
}

export type TrainingTemplateId = string; // UUID

export interface ITrainingTemplate {
  id: TrainingTemplateId;

  title: string;
  description?: string;
  moduleId: ModuleId;
  sectionId: SectionId;
  // Главное — порядок и состав
  taskIds: TaskId[];

  // Классификация (для каталога / home page)
  // scope: {
  //   module: string;
  //   section?: string;
  //   topic?: string;
  // };

  difficulty: Difficulty;

  // version: number;

  // meta?: {
  //   estimatedTimeMinutes?: number;
  //   tags?: string[];
  // };

  createdAt: string;
  updatedAt: string;
}

export interface ITaskCatalogItem {
  id: string;
  title: string;

  difficulty: Difficulty;

  scope: {
    module: string;
    section: string;
    topic?: string;
  };

  hasUsePreferences: boolean;
}

export interface ITaskCatalogResponse {
  modules: {
    id: string;
    title: string;
    sections: {
      id: string;
      title: string;
      topics: {
        id: string;
        title: string;
        taskCount: number;
        difficulties: string[];
        hasUsageSpec: boolean;
      }[];
    }[];
  }[];
}

export interface TrainingCatalogItem {
  id: TrainingTemplateId;
  title: string;
  description?: string;
  difficulty: Difficulty;
  taskCount: number;
}

export interface TrainingCatalogResponse {
  modules: Array<{
    title: string;
    sections: Array<{
      title: string;
      trainings: TrainingCatalogItem[];
    }>;
  }>;
}
