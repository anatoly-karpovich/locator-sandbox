import { apiConfig } from "../config/api.config.js";
import { IApiClient, IRequestOptions } from "../core/types.js";
import type { TrainingCatalogResponse } from "../data/types.js";

export class TrainingsApi {
  constructor(private apiClient: IApiClient) {}

  async getCatalog() {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseUrl,
      url: apiConfig.endpoints.trainingsCatalog,
      method: "get",
    };

    return await this.apiClient.send<TrainingCatalogResponse>(options);
  }
}
