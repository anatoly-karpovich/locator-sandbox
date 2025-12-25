import { Task } from "./types";

export const tasks: Task[] = [
  {
    id: 1,
    title: "Find main title",
    html: "<h1>Task 1</h1>",

    expectations: {
      count: 1,
      text: "Task 1",
    },

    context: {
      goal: "single",
      allowNth: false,
      preferRole: true,
    },

    heuristics: ["avoid-nth", "prefer-getByRole"],
  },
];

// const tasks = [
//   {
//     id: 1,
//     title: "Task 1",
//     html: "<h1>Task 1</h1>",
//     check: async (page: Page, str: string) => {
//       const locator = eval(str);
//       const checks = {
//         count: await locator.count(),
//         textContent: await locator.textContent(),
//         isVisible: await locator.isVisible(),
//       };
//       return checks;
//     },
//     expected: {
//       count: 1,
//       textContent: "Task 1",
//       isVisible: true,
//     },
//   },
// ];
