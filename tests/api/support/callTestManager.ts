import type { TestInfo } from "@playwright/test";
import type { TrainingsApi } from "../apis/trainings.api.js";
import type { TrainingRunsApi } from "../apis/trainingRuns.api.js";
import { TestDataManager } from "./testManager.js";
import type { TestContext } from "./testManager.js";

type ContextArgs = {
  trainingsApi: TrainingsApi;
  trainingRunsApi: TrainingRunsApi;
  useFreshContext: boolean;
};

let cachedContext: TestContext | null = null;

export async function callTestManager(
  { trainingsApi, trainingRunsApi, useFreshContext }: ContextArgs,
  use: (context: TestContext) => Promise<void>,
  _testInfo: TestInfo,
): Promise<void> {
  if (!useFreshContext && cachedContext) {
    await use(cachedContext);
    return;
  }

  const manager = new TestDataManager(trainingsApi, trainingRunsApi);
  const context = await manager.prepare();

  if (!useFreshContext) {
    cachedContext = context;
  }

  await use(context);

  if (useFreshContext) {
    await manager.cleanup(context);
  } else {
    console.log(`[DEBUG] Skipping cleanup for cached context`, { runId: context.runId });
  }
}
