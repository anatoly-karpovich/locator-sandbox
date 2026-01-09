import { test, expect } from "../../fixtures/index.js";
import {
  validateJsonSchema,
  trainingRunResponseSchema,
  trainingRunSubmitSchema,
  errorResponseSchema,
  TestTag,
} from "../../data/index.js";

test.describe("[API] [TrainingRuns]", () => {
  test("POST /training-runs/start returns run for template id", { tag: [TestTag.POSITIVE, TestTag.SMOKE] }, async ({ trainingRunsApi, testContext }) => {
    const response = await trainingRunsApi.startFixed(testContext.trainingTemplateId);

    expect(response.status).toBe(200);
    const body = response.body;
    expect(body.id).toBeTruthy();
    validateJsonSchema(response.body, trainingRunResponseSchema);
  });

  test("GET /training-runs/:id returns run by id", { tag: [TestTag.POSITIVE, TestTag.REGRESS] }, async ({ trainingRunsApi, testContext }) => {
    const response = await trainingRunsApi.getById(testContext.runId);
    const body = response.body;

    expect(response.status).toBe(200);
    expect(body.id).toBe(testContext.runId);
    validateJsonSchema(response.body, trainingRunResponseSchema);
  });

  test("POST /training-runs/start unsupported body returns 400", { tag: [TestTag.NEGATIVE, TestTag.REGRESS] }, async ({ trainingRunsApi }) => {
    const response = await trainingRunsApi.startWithBody({});

    expect(response.status).toBe(400);
    validateJsonSchema(response.body, errorResponseSchema);
  });

  test("POST /training-runs/:id/submit missing run returns 400", { tag: [TestTag.NEGATIVE, TestTag.REGRESS] }, async ({ trainingRunsApi, testContext }) => {
    const response = await trainingRunsApi.submitSolution(testContext.missingId, {
      taskId: testContext.missingId,
      payload: "page.getByText('Welcome to the application')",
    });

    expect(response.status).toBe(400);
    validateJsonSchema(response.body, errorResponseSchema);
  });

  test.describe("[Submit]", () => {
    test.use({ useFreshContext: true });

    test("POST /training-runs/:id/submit invalid payload returns 400", { tag: [TestTag.NEGATIVE, TestTag.REGRESS] }, async ({ trainingRunsApi, testContext }) => {
      const response = await trainingRunsApi.submitSolution(testContext.runId, {
        taskId: testContext.taskId,
        payload: "page.getByText(",
      });

      expect(response.status).toBe(400);
      validateJsonSchema(response.body, errorResponseSchema);
    });

    test("POST /training-runs/:id/submit valid payload returns evaluation result", { tag: [TestTag.POSITIVE, TestTag.SMOKE] }, async ({ trainingRunsApi, testContext }) => {
      const response = await trainingRunsApi.submitSolution(testContext.runId, {
        taskId: testContext.taskId,
        payload: "page.getByText('Welcome to the application')",
      });

      expect(response.status).toBe(200);
      validateJsonSchema(response.body, trainingRunSubmitSchema);
    });
  });
});
