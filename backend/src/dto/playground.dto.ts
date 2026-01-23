import { ITrainingsRunSubmitSolutionResponseDTO } from "@dto/trainingRuns.dto.js";
import { z } from "zod";

// export interface PlaygroundSubmitRequestDTO {
//   html: string;
//   payload: string;
// }

export const PlaygroundSubmitRequestDTOSchema = z.object({
  html: z.string(),
  payload: z.string(),
});

export type PlaygroundSubmitRequestDTO = z.infer<typeof PlaygroundSubmitRequestDTOSchema>;

export interface IPlaygroundSubmitResponseDTO extends Pick<ITrainingsRunSubmitSolutionResponseDTO, "explanation"> {
  elements: {
    tagName: string;
    text: string | null;
    attributes: Record<string, string>;
    visible: boolean;
  }[];
}
