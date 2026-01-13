import { test as api } from "./api.fixture.js";
import { test as ui } from "./ui.fixture.js";
import { mergeTests, expect } from "@playwright/test";

const test = mergeTests(api, ui);

export { test, expect };