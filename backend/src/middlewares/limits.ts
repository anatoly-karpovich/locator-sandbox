import { readEnvNumber } from "@utils/env.js";

export const PLAYGROUND_HTML_MAX_LENGTH = readEnvNumber("PLAYGROUND_HTML_MAX_LENGTH", 20000);
export const LOCATOR_PAYLOAD_MAX_LENGTH = readEnvNumber("LOCATOR_PAYLOAD_MAX_LENGTH", 500);
