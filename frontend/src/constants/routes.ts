export const APP_ROUTES = {
  HOME: "/",
  PLAYWRIGHT_PLAYGROUND: "/playwright/playground",
  PLAYWRIGHT_TRAINING_RUN: (trainingRunId: string) => `/playwright/training-run/${trainingRunId}`,
  PLAYWRIGHT_TRAININGS: "/playwright/trainings",
  PLAYWRIGHT_CHALLENGES: "/playwright/challenges",
  PLAYWRIGHT_CUSTOM: "/playwright/custom",
};
