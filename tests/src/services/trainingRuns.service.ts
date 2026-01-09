import { TrainingRunsApi } from "../api/trainingRuns.api.js";
import type { TrainingRunResponse } from "../data/types.js";

export type TrainingRunContext = {
  runId: string;
  taskId: string;
};

export class TrainingRunsService {
  constructor(private trainingRunsApi: TrainingRunsApi) {}

  async startTrainingRun(trainingTemplateId: string): Promise<TrainingRunResponse> {
    const response = await this.trainingRunsApi.startFixed(trainingTemplateId);
    if (response.status !== 200) {
      throw new Error(`Unexpected status for training run start: ${response.status}`);
    }

    return response.body;
  }

  extractRunContext(run: TrainingRunResponse): TrainingRunContext {
    const runId = run.id;
    const taskId = run.topics[0]?.tasks[0]?.id;

    if (!runId || !taskId) {
      throw new Error("No run id or tasks found in training run");
    }

    return { runId, taskId };
  }

  async createRunContext(trainingTemplateId: string): Promise<TrainingRunContext> {
    const run = await this.startTrainingRun(trainingTemplateId);
    return this.extractRunContext(run);
  }
}
