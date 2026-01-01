import { ITrainingsRunSubmitSolutionResponseDTO } from "./trainingRuns.dto";

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
