export const APP_ROUTES = {
  HOME: "/",
  PLAYWRIGHT_PLAYGROUND: "/playwright/playground",
  PLAYWRIGHT_TRAINING_RUN: "/playwright/training-run/:trainingRunId",
  PLAYWRIGHT_TRAININGS: "/playwright/trainings",
  PLAYWRIGHT_CHALLENGES: "/playwright/challenges",
} as const;

export type ROUTES = (typeof APP_ROUTES)[keyof typeof APP_ROUTES];
