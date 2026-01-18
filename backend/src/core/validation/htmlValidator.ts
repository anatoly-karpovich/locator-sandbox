import { parseHTML } from "linkedom";

export class HtmlValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HtmlValidationError";
  }
}

export function validateHtmlContent(html: string): void {
  const { document } = parseHTML(html);

  // 1️⃣ Forbidden tags
  const forbiddenTags = ["script", "iframe", "object", "embed"];

  for (const tag of forbiddenTags) {
    if (document.querySelector(tag)) {
      throw new HtmlValidationError(`Forbidden tag <${tag}>`);
    }
  }

  // 2️⃣ Inline event handlers
  const allElements = document.querySelectorAll("*");

  for (const el of allElements) {
    for (const attr of Array.from(el.attributes)) {
      if (attr.name.toLowerCase().startsWith("on")) {
        throw new HtmlValidationError(`Inline event handlers are not allowed (${attr.name})`);
      }
    }
  }

  // 3️⃣ External resources
  const urlAttrs = ["src", "href"];

  for (const el of allElements) {
    for (const attr of urlAttrs) {
      const value = el.getAttribute(attr);
      if (!value) continue;

      if (
        value.startsWith("http://") ||
        value.startsWith("https://") ||
        value.startsWith("//") ||
        value.startsWith("data:")
      ) {
        throw new HtmlValidationError(`External resources are not allowed (${attr}="${value}")`);
      }
    }
  }
}
