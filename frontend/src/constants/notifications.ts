import { LOCATOR_PAYLOAD_MAX_LENGTH, PLAYGROUND_HTML_MAX_LENGTH } from "./limits";

export const SNACKBAR_MESSAGES = {
  serverOverloaded: "Server is overloaded. Please try again in a minute.",
  failedRunLocator: "Failed to run locator",
  failedRunLocatorRetry: "Failed to run locator. Please try again",
  failedLoadTask: "Failed to load task",
  failedLoadTrainingRun: "Failed to load training run",
  serverErrorRetryLater: "Server error. Please try again later.",
  trainingRunNotFound: "Training run not found.",
  playgroundHtmlTooLong: `HTML preview is limited to ${PLAYGROUND_HTML_MAX_LENGTH} characters.`,
  locatorPayloadTooLong: `Locator payload is limited to ${LOCATOR_PAYLOAD_MAX_LENGTH} characters.`,
} as const;
