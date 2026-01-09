import { test, expect } from "../../fixtures/index.js";
import { validateJsonSchema, playgroundSubmitSchema, errorResponseSchema, TestTag } from "../../data/index.js";

test.describe("[API] [Playground]", () => {
  test("POST /playground/submit valid html returns elements", { tag: [TestTag.POSITIVE, TestTag.SMOKE] }, async ({ playgroundApi }) => {
    const response = await playgroundApi.submit({
      html: "<main><h1>Title</h1><p>Hello</p></main>",
      payload: "page.getByText('Title')",
    });

    expect(response.status).toBe(200);
    validateJsonSchema(response.body, playgroundSubmitSchema);
  });

  const forbiddenTagCases = [
    { name: "script", html: "<main><script>alert('x')</script></main>" },
    { name: "iframe", html: "<main><iframe src=\"/foo\"></iframe></main>" },
    { name: "object", html: "<main><object data=\"/foo\"></object></main>" },
    { name: "embed", html: "<main><embed src=\"/foo\" /></main>" },
  ];

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

  const externalResourceCases = [
    { name: "src https", html: "<main><img src=\"https://example.com/a.png\" /></main>" },
    { name: "href protocol-relative", html: "<main><a href=\"//example.com\">link</a></main>" },
    { name: "src data", html: "<main><img src=\"data:image/png;base64,aaaa\" /></main>" },
  ];

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

  const invalidPayloadCases = [
    { name: "empty payload", payload: "" },
    { name: "not starting with page", payload: "locator('h1')" },
    { name: "unsupported method", payload: "page.getByMagic('x')" },
    { name: "invalid arg type", payload: "page.locator(123)" },
    { name: "wrong arg count", payload: "page.getByText()" },
    { name: "invalid options type", payload: "page.locator('h1', { hasText: 123 })" },
    { name: "unsupported option key", payload: "page.locator('h1', { unknown: 'x' })" },
    { name: "invalid nth negative", payload: "page.nth(-1)" },
    { name: "invalid nth float", payload: "page.nth(1.2)" },
  ];

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
