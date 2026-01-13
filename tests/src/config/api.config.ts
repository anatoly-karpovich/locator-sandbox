export const apiConfig = {
  baseUrl: process.env.API_BASE_URL ?? "http://localhost:3333/api",
  endpoints: {
    tasks: "/tasks",
    trainingsCatalog: "/trainings/catalog",
    trainingRunsStart: "/training-runs/start",
    trainingRuns: "/training-runs",
    playgroundSubmit: "/playground/submit",
  },
} as const;
