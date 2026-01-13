import { TrainingsApi } from "../api/trainings.api.js";

export class TrainingsService {
  constructor(private trainingsApi: TrainingsApi) {}

  async getFirstTrainingTemplateId(): Promise<string> {
    const response = await this.trainingsApi.getCatalog();
    if (response.status !== 200) {
      throw new Error(`Unexpected status for trainings catalog: ${response.status}`);
    }

    const training = response.body.modules[0]?.sections[0]?.trainings[0];
    if (!training?.id) {
      throw new Error("No training templates available in catalog");
    }

    return training.id;
  }
}
