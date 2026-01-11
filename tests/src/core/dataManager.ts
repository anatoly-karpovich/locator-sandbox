import { TrainingsService } from "../services/trainings.service.js";
import { TrainingRunsService } from "../services/trainingRuns.service.js";

export type TestContext = {
  trainingTemplateId: string;
  runId: string;
  taskId: string;
  missingId: string;
};

export class DataManager {
  constructor(
    private trainingsService: TrainingsService,
    private trainingRunsService: TrainingRunsService,
  ) {}

  async createTestContext(): Promise<TestContext> {
    const trainingTemplateId = await this.trainingsService.getFirstTrainingTemplateId();
    const runContext = await this.trainingRunsService.createRunContext(trainingTemplateId);

    return {
      trainingTemplateId,
      runId: runContext.runId,
      taskId: runContext.taskId,
      missingId: "does-not-exist",
    };
  }

  async cleanup(context: TestContext): Promise<void> {
    console.log(`[DEBUG] Cleanup skipped: no delete endpoint`, {
      runId: context.runId,
    });
    // TODO: delete created training runs when delete endpoint is available.
  }
}
