import { apiConfig } from "../config/api.config.js";
import { IApiClient, IRequestOptions } from "../core/types.js";
import type { ErrorResponse, TrainingRunResponse, TrainingRunSubmitResponse } from "../data/types.js";

type StartTrainingBody = {
  trainingTemplateId: string;
};

type SubmitSolutionBody = {
  taskId: string;
  payload: string;
};

export class TrainingRunsApi {
  constructor(private apiClient: IApiClient) {}

  async startFixed(trainingTemplateId: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseUrl,
      url: apiConfig.endpoints.trainingRunsStart,
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      data: { trainingTemplateId },
    };

    return await this.apiClient.send<TrainingRunResponse>(options);
  }

  async startWithBody(body: Partial<StartTrainingBody>) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseUrl,
      url: apiConfig.endpoints.trainingRunsStart,
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      data: body,
    };

    return await this.apiClient.send<TrainingRunResponse>(options);
  }

  async getById(trainingRunId: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseUrl,
      url: `${apiConfig.endpoints.trainingRuns}/${trainingRunId}`,
      method: "get",
    };

    return await this.apiClient.send<TrainingRunResponse>(options);
  }

  async submitSolution<T extends TrainingRunSubmitResponse | ErrorResponse = TrainingRunSubmitResponse>(
    trainingRunId: string,
    body: SubmitSolutionBody
  ) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseUrl,
      url: `${apiConfig.endpoints.trainingRuns}/${trainingRunId}/submit`,
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      data: body,
    };

    return await this.apiClient.send<T>(options);
  }
}
