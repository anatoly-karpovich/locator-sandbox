// curriculum/curriculum.data.ts

import { Curriculum } from "./types";

export const curriculum: Curriculum = {
  version: "2025-12-25",
  modules: [
    {
      id: "locators",
      title: "Locators",
      sections: [
        {
          id: "getBy",
          title: "getBy",
          topics: [
            {
              id: "getByText",
              title: "getByText",
              level: "beginner",
              taskIds: ["a5d6f5de-385f-4b50-abca-52370d3fb58a", "6cf7c8b5-0d3e-4238-9db6-ec981976acba"],
            },
            {
              id: "getByRole",
              title: "getByRole",
              level: "beginner",
              taskIds: [],
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
              taskIds: [],
            },
          ],
        },
      ],
    },
  ],
};
