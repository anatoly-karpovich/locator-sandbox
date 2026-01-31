import { CompareResult } from "@core/tasks/types.js";
import { ITrainingRun } from "@core/training/types.js";
import { z } from "zod";

// export interface StartFixedTrainingRequest {
//   trainingTemplateId: TrainingTemplateId;
// }

export const StartFixedTrainingRequestDTOSchema = z.object({
  trainingTemplateId: z.string(),
})

export type StartFixedTrainingRequestDTO = z.infer<typeof StartFixedTrainingRequestDTOSchema>;

// export interface StartCustomTrainingRequest {
//   difficulty?: Difficulty;
//   scope?: {
//     module?: string;
//     section?: string;
//     topic?: string;
//   };
//   limit: number;
// }

export const StartCustomTrainingRequestDTOSchema = z.object({
  difficulty: z.literal(["beginner", "intermediate", "advanced"]).optional(),
  scope: z.object({
    module: z.string().optional(),
    section: z.string().optional(),
    topic: z.string().optional()
  }).optional(),
  limit: z.number(),
})

export type StartCustomTrainingRequestDTO = z.infer<typeof StartCustomTrainingRequestDTOSchema>

export type StartTrainingResponseDTO = ITrainingRun;

export type GetTrainingRunResponseDTO = ITrainingRun;

// export interface ITrainingSubmitSolutionRequestDTO {
//   taskId: TaskId;
//   payload: string;
// }

export const ITrainingSubmitSolutionRequestDTOSchema = z.object({
  taskId: z.string(),
  payload: z.string(),
})

export type ITrainingSubmitSolutionRequestDTO = z.infer<typeof ITrainingSubmitSolutionRequestDTOSchema>;

export interface ITrainingsRunSubmitSolutionResponseDTO {
  result: CompareResult;
  explanation?: string[];
}
