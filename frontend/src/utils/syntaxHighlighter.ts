const METHOD_NAMES = [
  "locator",
  "getByRole",
  "getByText",
  "getByLabel",
  "getByAltText",
  "getByPlaceholder",
  "getByTestId",
  "getByTitle",
  "count",
  "nth",
  "first",
  "last",
  "filter",
];

const NUMBER_REGEX = /^\d+\.?\d*$/;
const METHOD_PATTERN = `\\.(?:${METHOD_NAMES.join("|")})\\b`;
// Order matters: earlier patterns win when tokens overlap (comments/strings before regex)
const TOKEN_REGEX = new RegExp(
  [
    /\/\/[^\n]*/.source,
    /\/\*[\s\S]*?\*\//.source,
    /(["'`])(?:\\[\s\S]|.)*?\1/.source,
    /\/(?![*/])(?:\\[\s\S]|[^\\/\n])+\/[gimsuy]*/.source,
    METHOD_PATTERN,
    /\bpage\b/.source,
    /\b\d+\.?\d*\b/.source,
    /[{}[\]();,]/.source,
  ].join("|"),
  "g",
);

const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const wrapToken = (className: string, text: string) =>
  `<span class="${className}">${escapeHtml(text)}</span>`;

export const highlightLocatorSyntax = (codeText: string) => {
  if (!codeText) return "";
  TOKEN_REGEX.lastIndex = 0;

  let result = "";
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = TOKEN_REGEX.exec(codeText)) !== null) {
    // Emit plain text between tokens, then wrap the matched token.
    const token = match[0];
    const matchIndex = match.index ?? 0;

    if (matchIndex > lastIndex) {
      result += escapeHtml(codeText.slice(lastIndex, matchIndex));
    }

    if (token.startsWith("//") || token.startsWith("/*")) {
      result += wrapToken("token-comment", token);
    } else if (token.startsWith('"') || token.startsWith("'") || token.startsWith("`")) {
      result += wrapToken("token-string", token);
    } else if (token.startsWith("/")) {
      result += wrapToken("token-regex", token);
    } else if (token.startsWith(".")) {
      result += `.${wrapToken("token-method", token.slice(1))}`;
    } else if (token === "page") {
      result += wrapToken("token-page", token);
    } else if (NUMBER_REGEX.test(token)) {
      result += wrapToken("token-number", token);
    } else {
      result += wrapToken("token-punctuation", token);
    }

    lastIndex = matchIndex + token.length;
  }

  if (lastIndex < codeText.length) {
    result += escapeHtml(codeText.slice(lastIndex));
  }

  return result;
};
