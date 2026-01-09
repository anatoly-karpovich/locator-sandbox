import { TrainingsApi } from "../apis/trainings.api.js";
import { TrainingRunsApi } from "../apis/trainingRuns.api.js";

export type TestContext = {
  trainingTemplateId: string;
  runId: string;
  taskId: string;
  missingId: string;
};

export class TestDataManager {
  constructor(
    private trainingsApi: TrainingsApi,
    private trainingRunsApi: TrainingRunsApi,
  ) {}

  async prepare(): Promise<TestContext> {
    const trainingTemplateId = await this.getTrainingTemplateId();
    const startResponse = await this.trainingRunsApi.startFixed(trainingTemplateId);

    if (startResponse.status !== 200) {
      throw new Error(`Unexpected status for training run start: ${startResponse.status}`);
    }

    const runId = startResponse.body.id;
    const taskId = startResponse.body.topics[0]?.tasks[0]?.id;
    
    if (!runId || !taskId) {
      throw new Error("No run id or tasks found in training run");
    }

    return {
      trainingTemplateId,
      runId,
      taskId,
      missingId: "does-not-exist",
    };
  }

  async cleanup(context: TestContext): Promise<void> {
    console.log(`[DEBUG] Cleanup skipped: no delete endpoint`, {
      runId: context.runId,
    });
    // TODO: delete created training runs when delete endpoint is available.
  }

  private async getTrainingTemplateId(): Promise<string> {
    const response = await this.trainingsApi.getCatalog();
    if (response.status !== 200) {
      throw new Error(`Unexpected status for trainings catalog: ${response.status}`);
    }

    const training = response.body.modules[0]?.sections[0]?.trainings[0]; // TODO: find a better way to get exact training
    if (!training?.id) {
      throw new Error("No training templates available in catalog");
    }

    return training.id;
  }
}
