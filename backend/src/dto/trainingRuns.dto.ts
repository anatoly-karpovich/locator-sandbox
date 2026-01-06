import { CompareResult, Difficulty, TaskId } from "@core/tasks/types.js";
import { TrainingTemplateId, ITrainingRun } from "@core/training/types.js";

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
}

export type StartTrainingResponseDTO = ITrainingRun;

export type StartTrainingRequestDTO = StartFixedTrainingRequest | StartCustomTrainingRequest;

export interface ITrainingSubmitSolutionRequestDTO {
  taskId: TaskId;
  payload: string;
}

export interface ITrainingsRunSubmitSolutionResponseDTO {
  result: CompareResult;
  explanation?: string[];
}
