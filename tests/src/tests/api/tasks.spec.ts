import { test, expect } from "../../fixtures/index.js";
import { validateJsonSchema, tasksCatalogSchema, taskResponseSchema, errorResponseSchema, TestTag } from "../../data/index.js";

test.describe("[API] [Tasks]", () => {
  test("GET /tasks returns catalog list", { tag: [TestTag.POSITIVE, TestTag.SMOKE] }, async ({ tasksApi }) => {
    const response = await tasksApi.getAll();

    expect(response.status).toBe(200);
    validateJsonSchema(response.body, tasksCatalogSchema);
  });

  test("GET /tasks/:id returns task details for existing task", { tag: [TestTag.POSITIVE, TestTag.REGRESS] }, async ({ tasksApi, testContext }) => {
    const response = await tasksApi.getById(testContext.taskId);

    expect(response.status).toBe(200);
    const body = response.body;
    expect(body.task?.id).toBe(testContext.taskId);
    validateJsonSchema(response.body, taskResponseSchema);
  });

  test("GET /tasks/:id missing id returns 404", { tag: [TestTag.NEGATIVE, TestTag.REGRESS] }, async ({ tasksApi, testContext }) => {
    const response = await tasksApi.getById(testContext.missingId);

    expect(response.status).toBe(404);
    validateJsonSchema(response.body, errorResponseSchema);
  });
});
