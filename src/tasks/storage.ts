import { Page } from "playwright";

const tasks = [
  {
    id: 1,
    title: "Task 1",
    html: "<h1>Task 1</h1>",
    check: async (page: Page, str: string) => {
      const locator = eval(str);
      const checks = {
        count: await locator.count(),
        textContent: await locator.textContent(),
        isVisible: await locator.isVisible(),
      };
      return checks;
    },
    expected: {
      count: 1,
      textContent: "Task 1",
      isVisible: true,
    },
  },
];
