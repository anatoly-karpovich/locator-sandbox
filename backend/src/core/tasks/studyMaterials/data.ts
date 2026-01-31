export const studyMaterials: Record<"locatorMethods" | "general", Record<string, { title: string; url: string }>> = {
  general: {
    regexInLocators: {
      title: "Using Regular Expressions in Playwright Locators",
      url: "https://playwright.dev/docs/locators#matching-by-text",
    },
    javaScriptRegex: {
      title: "JavaScript Regular Expressions (MDN)",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions",
    },
  },
  locatorMethods: {
    getByText: {
      title: "Locator method - getByText()",
      url: "https://playwright.dev/docs/api/class-locator#locator-get-by-text",
    },
    getByRole: {
      title: "Locator method - getByRole()",
      url: "https://playwright.dev/docs/api/class-locator#locator-get-by-role",
    },
    getByLabel: {
      title: "Locator method - getByLabel()",
      url: "https://playwright.dev/docs/api/class-locator#locator-get-by-label",
    },
    getByPlaceholder: {
      title: "Locator method - getByPlaceholder()",
      url: "https://playwright.dev/docs/api/class-locator#locator-get-by-placeholder",
    },
    getByAltText: {
      title: "Locator method - getByAltText()",
      url: "https://playwright.dev/docs/api/class-locator#locator-get-by-alt-text",
    },
    getByTestId: {
      title: "Locator method - getByTestId()",
      url: "https://playwright.dev/docs/api/class-locator#locator-get-by-test-id",
    },
    getByTitle: {
      title: "Locator method - getByTitle()",
      url: "https://playwright.dev/docs/api/class-locator#locator-get-by-title",
    },
    filter: {
      title: "Locator method - filter()",
      url: "https://playwright.dev/docs/api/class-locator#locator-filter",
    },
  },
};
