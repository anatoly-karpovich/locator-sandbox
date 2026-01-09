import { test as base, expect } from "@playwright/test";
import { PlaywrightApiClient } from "./core/playwrightApiClient.js";
import { TasksApi } from "./apis/tasks.api.js";
import { TrainingsApi } from "./apis/trainings.api.js";
import { TrainingRunsApi } from "./apis/trainingRuns.api.js";
import { PlaygroundApi } from "./apis/playground.api.js";
import { registerApiSchemas } from "./data/index.js";
import { callTestManager } from "./support/callTestManager.js";
import type { TestContext } from "./support/testManager.js";

type ApiFixtures = {
  apiClient: PlaywrightApiClient;
  tasksApi: TasksApi;
  trainingsApi: TrainingsApi;
  trainingRunsApi: TrainingRunsApi;
  playgroundApi: PlaygroundApi;
  testContext: TestContext;
  useFreshContext: boolean;
};

registerApiSchemas();

const test = base.extend<ApiFixtures>({
  useFreshContext: [false, { option: true }],
  apiClient: async ({ request }, use) => {
    const client = new PlaywrightApiClient(request);
    await use(client);
  },
  tasksApi: async ({ apiClient }, use) => {
    await use(new TasksApi(apiClient));
  },
  trainingsApi: async ({ apiClient }, use) => {
    await use(new TrainingsApi(apiClient));
  },
  trainingRunsApi: async ({ apiClient }, use) => {
    await use(new TrainingRunsApi(apiClient));
  },
  playgroundApi: async ({ apiClient }, use) => {
    await use(new PlaygroundApi(apiClient));
  },
  testContext: callTestManager,
});

export { test, expect };
