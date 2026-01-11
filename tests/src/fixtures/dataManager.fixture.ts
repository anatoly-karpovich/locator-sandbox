import type { TestInfo } from "@playwright/test";
import type { TrainingsApi } from "../api/trainings.api.js";
import type { TrainingRunsApi } from "../api/trainingRuns.api.js";
import { TrainingsService } from "../services/trainings.service.js";
import { TrainingRunsService } from "../services/trainingRuns.service.js";
import { DataManager, type TestContext } from "../core/dataManager.js";

type ContextArgs = {
  trainingsApi: TrainingsApi;
  trainingRunsApi: TrainingRunsApi;
};

export async function dataManagerFixture(
  { trainingsApi, trainingRunsApi }: ContextArgs,
  use: (context: TestContext) => Promise<void>,
  _testInfo: TestInfo,
): Promise<void> {
  const trainingsService = new TrainingsService(trainingsApi);
  const trainingRunsService = new TrainingRunsService(trainingRunsApi);
  const manager = new DataManager(trainingsService, trainingRunsService);

  const context = await manager.createTestContext();

  try {
    await use(context);
  } finally {
    await manager.cleanup(context);
  }
}
