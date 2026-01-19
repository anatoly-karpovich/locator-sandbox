import { test, expect } from "../../fixtures/api.fixture.js";
import { validateJsonSchema, errorResponseSchema, TestTag, HTTP_CODES } from "../../data/index.js";

const htmlLimit = 20000;
const payloadLimit = 500;

const buildLongString = (length: number) => "a".repeat(Math.max(0, length));
const buildLocatorPayload = (length: number) => {
  const prefix = "page.getByText('";
  const suffix = "')";
  const fillerLength = Math.max(0, length - prefix.length - suffix.length);
  return `${prefix}${buildLongString(fillerLength)}${suffix}`;
};

test.describe("[API] [Limits]", () => {
  test(
    "POST /playground/submit rejects html over limit",
    { tag: [TestTag.NEGATIVE, TestTag.REGRESS] },
    async ({ playgroundApi }) => {
      const response = await playgroundApi.submit({
        html: `<main>${buildLongString(htmlLimit + 1)}</main>`,
        payload: "page.getByText('Title')",
      });

      expect(response.status).toBe(HTTP_CODES.BAD_REQUEST);
      validateJsonSchema(response.body, errorResponseSchema);

      const message = (response.body as { error?: string }).error ?? "";
      expect(message).toBe(`HTML content exceeds ${htmlLimit} characters`);
    }
  );

  test(
    "POST /training-runs/:id/submit rejects payload over limit",
    { tag: [TestTag.NEGATIVE, TestTag.REGRESS] },
    async ({ trainingRunsApi, testContext }) => {
      const payload = buildLocatorPayload(payloadLimit + 1);
      const response = await trainingRunsApi.submitSolution(testContext.runId, {
        taskId: testContext.taskId,
        payload,
      });

      expect(response.status).toBe(HTTP_CODES.BAD_REQUEST);
      validateJsonSchema(response.body, errorResponseSchema);

      const message = (response.body as { error?: string }).error ?? "";
      expect(message).toBe(`Locator payload exceeds ${payloadLimit} characters`);
    }
  );
});
