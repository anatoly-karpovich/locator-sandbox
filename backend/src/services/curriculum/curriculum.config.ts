// curriculum/curriculum.data.ts

import { Curriculum } from "./types";

export const curriculum: Curriculum = {
  version: "2025-12-25",
  sections: [
    {
      id: "locators",
      title: "Locators",
      modules: [
        {
          id: "getBy",
          title: "getBy",
          topics: [
            {
              id: "getByText",
              title: "getByText",
              level: "beginner",
              taskIds: [1, 3, 4, 5, 6, 9, 10],
            },
            {
              id: "getByRole",
              title: "getByRole",
              level: "beginner",
              taskIds: [30, 31, 32],
            },
          ],
        },
        {
          id: "locator",
          title: "locator",
          topics: [
            {
              id: "locator-basic",
              title: "Basic locator usage",
              level: "beginner",
              taskIds: [100, 101],
            },
          ],
        },
      ],
    },
  ],
};
