import { studyMaterials } from "../core/tasks/studyMaterials/data";
import { Task } from "../core/tasks/types";

export const tasks: Task[] = [
  {
    id: "a5d6f5de-385f-4b50-abca-52370d3fb58a",
    title: "Find element by partial text match",
    topicId: "3516b765-b3b9-42c1-bc6c-d67324b0d08c",
    difficulty: "beginner",
    html: `
        <div class="container">
          <p>Welcome to the application</p>
        </div>
      `,
    expectations: {
      count: 1,
      text: "Welcome to the application",
      visible: true,
    },
    studyMaterials: [studyMaterials.locatorMethods.getByText],
    description: "We use getByText to find elements by partial text match.",
    usageSpec: {
      method: "getByText",
      argument: {
        type: "string",
        match: "partial",
        value: "Welcome to the application",
      },
    },
  },
  {
    id: "6cf7c8b5-0d3e-4238-9db6-ec981976acba",
    title: "Find element by exact text match",
    topicId: "3516b765-b3b9-42c1-bc6c-d67324b0d08c",
    difficulty: "beginner",
    description: "We use getByText to find element by exact text match with option 'exact'",
    html: `
      <ul class="menu">
        <li>Hello</li>
        <li>Hello World</li>
        <li>Hello Universe</li>
      </ul>
    `,
    expectations: {
      count: 1,
      text: "Hello",
      visible: true,
    },
    usageSpec: {
      method: "getByText",
      argument: {
        type: "string",
      },
      options: {
        exact: true,
      },
    },
    studyMaterials: [studyMaterials.locatorMethods.getByText],
  },
];
