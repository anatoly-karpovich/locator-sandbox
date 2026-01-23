import { CompareResult } from "@core/tasks/types.js";
import { ITrainingRun } from "@core/training/types.js";
import { z } from "zod";

// export interface StartFixedTrainingRequest {
//   trainingTemplateId: TrainingTemplateId;
// }

export const StartFixedTrainingRequestSchema = z.object({
  type: z.literal("fixed"),
  trainingTemplateId: z.string(),
})

export type StartFixedTrainingRequest = z.infer<typeof StartFixedTrainingRequestSchema>;

// export interface StartCustomTrainingRequest {
//   difficulty?: Difficulty;
//   scope?: {
//     module?: string;
//     section?: string;
//     topic?: string;
//   };
//   limit: number;
// }

export const StartCustomTrainingRequestSchema = z.object({
  type: z.literal("custom"),
  difficulty: z.literal(["beginner", "intermediate", "advanced"]).optional(),
  scope: z.object({
    module: z.string().optional(),
    section: z.string().optional(),
    topic: z.string().optional()
  }).optional(),
  limit: z.number(),
})

export type StartCustomTrainingRequest = z.infer<typeof StartCustomTrainingRequestSchema>

export type StartTrainingResponseDTO = ITrainingRun;

//export type StartTrainingRequestDTO = StartFixedTrainingRequest | StartCustomTrainingRequest;
export const StartTrainingRequestDTOSchema = z.discriminatedUnion("type", [StartFixedTrainingRequestSchema, StartCustomTrainingRequestSchema]);

export type StartTrainingRequestDTO = z.infer<typeof StartTrainingRequestDTOSchema>

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
