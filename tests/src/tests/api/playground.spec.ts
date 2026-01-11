import { test, expect } from "../../fixtures/api.fixture.js";
import { validateJsonSchema, playgroundSubmitSchema, errorResponseSchema, TestTag } from "../../data/index.js";
import { forbiddenTagCases, externalResourceCases, invalidPayloadCases } from "../../data/cases/playgroundCases.js";

test.describe("[API] [Playground]", () => {
  test("POST /playground/submit valid html returns elements", { tag: [TestTag.POSITIVE, TestTag.SMOKE] }, async ({ playgroundApi }) => {
    const response = await playgroundApi.submit({
      html: "<main><h1>Title</h1><p>Hello</p></main>",
      payload: "page.getByText('Title')",
    });

    expect(response.status).toBe(200);
    validateJsonSchema(response.body, playgroundSubmitSchema);
  });

  for (const { name, html } of forbiddenTagCases) {
    test(
      `POST /playground/submit forbidden tag <${name}> returns 400`,
      { tag: [TestTag.NEGATIVE, TestTag.REGRESS] },
      async ({ playgroundApi }) => {
        const response = await playgroundApi.submit({
          html,
          payload: "page.getByText('x')",
        });

        expect(response.status).toBe(400);
        validateJsonSchema(response.body, errorResponseSchema);
      },
    );
  }

  test(
    "POST /playground/submit inline event handler returns 400",
    { tag: [TestTag.NEGATIVE, TestTag.REGRESS] },
    async ({ playgroundApi }) => {
      const response = await playgroundApi.submit({
        html: "<main><button onclick=\"alert('x')\">Click</button></main>",
        payload: "page.getByText('Click')",
      });

      expect(response.status).toBe(400);
      validateJsonSchema(response.body, errorResponseSchema);
    },
  );

  for (const { name, html } of externalResourceCases) {
    test(
      `POST /playground/submit external ${name} returns 400`,
      { tag: [TestTag.NEGATIVE, TestTag.REGRESS] },
      async ({ playgroundApi }) => {
        const response = await playgroundApi.submit({
          html,
          payload: "page.getByText('x')",
        });

        expect(response.status).toBe(400);
        validateJsonSchema(response.body, errorResponseSchema);
      },
    );
  }

  for (const { name, payload } of invalidPayloadCases) {
    test(
      `POST /playground/submit invalid payload - ${name} returns 400`,
      { tag: [TestTag.NEGATIVE, TestTag.REGRESS] },
      async ({ playgroundApi }) => {
        const response = await playgroundApi.submit({
          html: "<main><h1>Title</h1></main>",
          payload,
        });

        expect(response.status).toBe(400);
        validateJsonSchema(response.body, errorResponseSchema);
      },
    );
  }
});
