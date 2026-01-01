import { studyMaterials } from "../studyMaterials/data";
import { Task } from "../types";

export const getByRoleTasks: Task[] = [
  {
    id: "96ec0c8a-40ec-4d6b-8d1a-c269ad788909",
    title: "Find element by role",
    topicId: "3516b765-b3b9-42c1-bc6c-d67324b0d08c",
    difficulty: "beginner",
    description: "We use getByRole to find element by role 'button'",
    html: `
      <div class="dashboard">
        <header class="dashboard-header">
          <h2>Dashboard</h2>
          <button class="notification-btn">Hello</button>
        </header>
        <nav class="main-nav">
          <a class="nav-link">Home</a>
          <a class="nav-link">Profile</a>
        </nav>
      </div>
    `,
    expectations: {
      count: 1,
      text: "Hello",
      visible: true,
    },
    usageSpec: {
      method: "getByRole",
      argument: {
        type: "string",
      }
    },
    studyMaterials: [studyMaterials.locatorMethods.getByText],
  },
];