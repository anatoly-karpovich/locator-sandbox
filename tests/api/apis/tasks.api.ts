import { apiConfig } from "../apiConfig.js";
import { IApiClient, IRequestOptions } from "../core/types.js";
import type { TaskResponse, TasksCatalogResponse } from "../data/types.js";

export class TasksApi {
  constructor(private apiClient: IApiClient) {}

  async getAll() {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseUrl,
      url: apiConfig.endpoints.tasks,
      method: "get",
    };

    return await this.apiClient.send<TasksCatalogResponse>(options);
  }

  async getById(id: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseUrl,
      url: `${apiConfig.endpoints.tasks}/${id}`,
      method: "get",
    };

    return await this.apiClient.send<TaskResponse>(options);
  }
}
