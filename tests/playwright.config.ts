import { defineConfig } from "@playwright/test";

export default defineConfig({
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [["html"]],
  projects: [
    {
      name: "api",
      testDir: "./api",
      use: {
        baseURL: process.env.API_BASE_URL ?? "http://localhost:3333/api",
      },
    },
    {
      name: "ui",
      testDir: "./ui",
      use: {
        baseURL: process.env.UI_BASE_URL ?? "http://localhost:5173",
      },
    },
  ],
});
