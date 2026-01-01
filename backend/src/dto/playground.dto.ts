import { ITrainingsRunSubmitSolutionResponseDTO } from "./trainingRuns.dto";

export interface PlaygroundSubmitRequestDTO {
  html: string;
  locator: string;
}

export interface IPlaygroundSubmitResponseDTO extends ITrainingsRunSubmitSolutionResponseDTO {
  element: {
    tagName: string;
    text: string | null;
    attributes: Record<string, string>;
  } | null;
}
