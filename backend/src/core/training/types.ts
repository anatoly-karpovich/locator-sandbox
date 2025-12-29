import { Difficulty, TaskId } from "../tasks/types";

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
  source: "fixed" | "custom";
  // Откуда получен
  templateId?: TrainingTemplateId;
  // Конкретный набор задач
  tasks: { id: TaskId; title: string }[];
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

  // Главное — порядок и состав
  taskIds: TaskId[];

  // Классификация (для каталога / home page)
  scope: {
    module: string;
    section?: string;
    topic?: string;
  };

  difficulty: Difficulty;

  // version: number;

  // meta?: {
  //   estimatedTimeMinutes?: number;
  //   tags?: string[];
  // };

  createdAt: string;
  updatedAt: string;
}

interface ITaskCatalogItem {
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
  modules: Array<{
    name: string;
    sections: Array<{
      name: string;
      topics: Array<{
        name: string;
        tasks: ITaskCatalogItem[];
      }>;
    }>;
  }>;
}

export interface TrainingCatalogItem {
  id: TrainingTemplateId;
  title: string;
  description?: string;
  difficulty: string;
  scope: {
    module: string;
    section?: string;
  };
  taskCount: number;
}

export interface TrainingCatalogResponse {
  modules: Array<{
    name: string;
    sections: Array<{
      name: string;
      trainings: TrainingCatalogItem[];
    }>;
  }>;
}
