const forbiddenTagCases = [
  { name: "script", html: "<main><script>alert('x')</script></main>" },
  { name: "iframe", html: "<main><iframe src=\"/foo\"></iframe></main>" },
  { name: "object", html: "<main><object data=\"/foo\"></object></main>" },
  { name: "embed", html: "<main><embed src=\"/foo\" /></main>" },
] as const;

const externalResourceCases = [
  { name: "src https", html: "<main><img src=\"https://example.com/a.png\" /></main>" },
  { name: "href protocol-relative", html: "<main><a href=\"//example.com\">link</a></main>" },
  { name: "src data", html: "<main><img src=\"data:image/png;base64,aaaa\" /></main>" },
] as const;

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
] as const;

export { forbiddenTagCases, externalResourceCases, invalidPayloadCases };
