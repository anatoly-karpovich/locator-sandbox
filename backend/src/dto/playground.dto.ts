import { ITrainingsRunSubmitSolutionResponseDTO } from "@dto/trainingRuns.dto.js";

export interface PlaygroundSubmitRequestDTO {
  html: string;
  payload: string;
}

export interface IPlaygroundSubmitResponseDTO extends ITrainingsRunSubmitSolutionResponseDTO {
  elements: {
    tagName: string;
    text: string | null;
    attributes: Record<string, string>;
  }[];
}
