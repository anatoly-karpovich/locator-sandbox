import { Difficulty, ModuleId, SectionId, TaskId, TopicId } from "../tasks/types";
import { TRAINING_RUN_STATUS, TRAINING_RUN_TASK_STATUS } from "./enums";

export type TrainingRunId = string; // UUID

export type TrainingRunType = "template" | "custom";

// export type TrainingTaskStatus = "not_started" | "in_progress" | "passed" | "failed";

export interface TrainingTaskResult {
  status: TRAINING_RUN_TASK_STATUS;
  attempts: number;
  // lastSubmittedAt?: string;

  // опционально, но очень полезно
  // lastResult?: {
  //   passed: boolean;
  //   executionPassed: boolean;
  //   usagePassed?: boolean;
  // };
}

export interface ITrainingRun {
  id: TrainingRunId;
  type: TrainingRunType;
  status: TRAINING_RUN_STATUS;
  title?: string;
  templateId?: TrainingTemplateId;

  topics: Array<{
    id: TopicId;
    title: string;
    tasks: Array<{
      id: TaskId;
      title: string;
      result: TrainingTaskResult;
    }>;
  }>;

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
  taskIds: TaskId[];

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
