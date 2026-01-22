import { ErrorType } from "../errorTypeEnum.js";

const forbiddenTagCases = [
  { name: "script", html: "<main><script>alert('x')</script></main>" },
  { name: "iframe", html: '<main><iframe src="/foo"></iframe></main>' },
  { name: "object", html: '<main><object data="/foo"></object></main>' },
  { name: "embed", html: '<main><embed src="/foo" /></main>' },
] as const;

const externalResourceCases = [
  { name: "src https", html: '<main><img src="https://example.com/a.png" /></main>' },
  { name: "href protocol-relative", html: '<main><a href="//example.com">link</a></main>' },
  { name: "src data", html: '<main><img src="data:image/png;base64,aaaa" /></main>' },
] as const;

const invalidPayloadCases = [
  {
    name: "empty payload",
    payload: "",
    error: ErrorType.AST_ERROR,
    details: "Syntax error. Please verify your expression is properly formatted.",
  },
  {
    name: "not starting with page",
    payload: "locator('h1')",
    error: ErrorType.AST_ERROR,
    details: "Only member calls like page.method(...) are allowed",
  },
  {
    name: "unsupported method",
    payload: "page.getByMagic('x')",
    error: ErrorType.AST_ERROR,
    details: "Unsupported method: getByMagic",
  },
  {
    name: "invalid arg type",
    payload: "page.locator(123)",
    error: ErrorType.AST_ERROR,
    details: "locator(selector) must be a string literal",
  },
  {
    name: "wrong arg count",
    payload: "page.getByText()",
    error: ErrorType.AST_ERROR,
    details: "getByText(text, options?) expects 1 or 2 args",
  },
  {
    name: "invalid options type",
    payload: "page.locator('h1', { hasText: 123 })",
    error: ErrorType.AST_ERROR,
    details: "locator(options).hasText must be a string literal or RegExp literal",
  },
  {
    name: "unsupported option key",
    payload: "page.locator('h1', { unknown: 'x' })",
    error: ErrorType.AST_ERROR,
    details: "locator(options): unsupported key: unknown",
  },
  {
    name: "invalid nth negative",
    payload: "page.nth(-1)",
    error: ErrorType.AST_ERROR,
    details: "Method nth is not allowed on page",
  },
  {
    name: "invalid nth float",
    payload: "page.locator('h1').nth(1.2)",
    error: ErrorType.AST_ERROR,
    details: "nth(index) must be a non-negative integer literal",
  },
] as const;

export { forbiddenTagCases, externalResourceCases, invalidPayloadCases };
