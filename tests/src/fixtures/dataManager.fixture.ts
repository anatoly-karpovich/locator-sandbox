import type { TestInfo } from "@playwright/test";
import type { TrainingsApi } from "../api/trainings.api.js";
import type { TrainingRunsApi } from "../api/trainingRuns.api.js";
import { TrainingsService } from "../services/trainings.service.js";
import { TrainingRunsService } from "../services/trainingRuns.service.js";
import { DataManager, type TestContext } from "../core/dataManager.js";

type ContextArgs = {
  trainingsApi: TrainingsApi;
  trainingRunsApi: TrainingRunsApi;
  useFreshContext: boolean;
};

type Mode = "fresh" | "cached";

function getMode(useFreshContext: boolean): Mode {
  return useFreshContext ? "fresh" : "cached";
}

let cachedContext: TestContext | null = null;

export async function dataManagerFixture(
  { trainingsApi, trainingRunsApi, useFreshContext }: ContextArgs,
  use: (context: TestContext) => Promise<void>,
  _testInfo: TestInfo,
): Promise<void> {
  const mode = getMode(useFreshContext);

  if (mode === "cached" && cachedContext) {
    await use(cachedContext);
    return;
  }

  const trainingsService = new TrainingsService(trainingsApi);
  const trainingRunsService = new TrainingRunsService(trainingRunsApi);
  const manager = new DataManager(trainingsService, trainingRunsService);

  const context = await manager.createTestContext();

  const policy = {
    cached: {
      onReady: () => {
        cachedContext = context;
      },
      onFinally: async () => {
        console.log(`[DEBUG] Skipping cleanup for cached context`, { runId: context.runId });
      },
    },
    fresh: {
      onReady: () => {},
      onFinally: async () => {
        await manager.cleanup(context);
      },
    },
  }[mode];

  policy.onReady();

  try {
    await use(context);
  } finally {
    await policy.onFinally();
  }
}
