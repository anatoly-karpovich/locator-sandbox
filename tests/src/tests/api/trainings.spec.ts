import { test, expect } from "../../fixtures/api.fixture.js";
import { validateJsonSchema, trainingsCatalogSchema, TestTag } from "../../data/index.js";

test.describe("[API] [Trainings]", () => {
  test("GET /trainings/catalog returns catalog list", { tag: [TestTag.POSITIVE, TestTag.SMOKE] }, async ({ trainingsApi }) => {
    const response = await trainingsApi.getCatalog();

    expect(response.status).toBe(200);
    validateJsonSchema(response.body, trainingsCatalogSchema);
  });
});
