import { apiConfig } from "../config/api.config.js";
import { IApiClient, IRequestOptions } from "../core/types.js";
import type { PlaygroundSubmitResponse } from "../data/types.js";

type PlaygroundBody = {
  html: string;
  payload: string;
};

export class PlaygroundApi {
  constructor(private apiClient: IApiClient) {}

  async submit(body: PlaygroundBody) {
    const options: IRequestOptions = {
      baseURL: apiConfig.baseUrl,
      url: apiConfig.endpoints.playgroundSubmit,
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      data: body,
    };

    return await this.apiClient.send<PlaygroundSubmitResponse>(options);
  }
}
