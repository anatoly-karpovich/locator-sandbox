export const studyMaterials: Record<'locatorMethods', Record<string, { title: string, url: string }>> = {
    locatorMethods: {
        getByText: {
            title: "Locator method - getByText()",
            url: "https://playwright.dev/docs/api/class-locator#locator-get-by-text",
        },
        getByRole: {
            title: "Locator method - getByRole()",
            url: "https://playwright.dev/docs/api/class-locator#locator-get-by-role",
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
    },
};