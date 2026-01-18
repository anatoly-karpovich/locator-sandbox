import { inject, injectable } from "inversify";
import { Page } from "playwright";
import { IPlaywrightRunner } from "@core/types.js";
import { IBrowserManager } from "./types.js";
import { TYPES } from "../../container/types.js";
import { BrowserManagerError } from "@errors/index.js";
import { logger } from "@core/logger/logger.js";
import { readEnvNumber } from "@utils/env.js";
import { sleep } from "@utils/sleep.js";
import { ResponseError } from "@errors/index.js";
import { HTTP_CODES } from "@core/httpCodes.js";

@injectable()
export class PlaywrightRunner implements IPlaywrightRunner {
  constructor(@inject(TYPES.BrowserManager) private readonly browserManager: IBrowserManager) {}

  async run<T>(fn: (page: Page) => Promise<T>): Promise<T> {
    let lease;
    try {
      lease = await this.acquireWithRetry();
    } catch (err) {
      if (err instanceof BrowserManagerError && (err.code === "QUEUE_FULL" || err.code === "SHUTTING_DOWN")) {
        throw new ResponseError(HTTP_CODES.SERVICE_UNAVAILABLE, "Browser capacity is temporarily unavailable");
      }

      throw err;
    }
    const page = await lease.context.newPage();

    try {
      return await fn(page);
    } finally {
      await page.close().catch(() => {});
      await lease.release();
    }
  }

  private async acquireWithRetry() {
    const maxDurationMs = readEnvNumber("PLAYWRIGHT_RETRY_TOTAL_MS", 10000);
    const initialDelayMs = readEnvNumber("PLAYWRIGHT_RETRY_INITIAL_DELAY_MS", 50);
    const maxDelayMs = readEnvNumber("PLAYWRIGHT_RETRY_MAX_DELAY_MS", 1000);

    const start = Date.now();
    let prev = 0;
    let curr = initialDelayMs;
    let attempt = 0;

    while (true) {
      try {
        return await this.browserManager.acquireContext();
      } catch (err) {
        if (!this.isRetryableError(err)) {
          throw err;
        }

        const elapsed = Date.now() - start;
        if (elapsed >= maxDurationMs) {
          logger.error({ message: "PlaywrightRunner acquire retry exhausted", err });
          throw err;
        }

        const delay = Math.min(curr, maxDelayMs);
        const jitterMs = Math.min(25, Math.floor(delay * 0.1));
        const totalDelay = delay + (jitterMs > 0 ? Math.floor(Math.random() * (jitterMs + 1)) : 0);
        attempt += 1;
        logger.warn({
          message: "PlaywrightRunner acquire retry scheduled",
          attempt,
          delayMs: totalDelay,
          baseDelayMs: delay,
        });
        await sleep(totalDelay);
        const next = prev + curr;
        prev = curr;
        curr = next;
      }
    }
  }

  private isRetryableError(err: unknown) {
    if (err instanceof BrowserManagerError) {
      return err.code === "QUEUE_TIMEOUT" || err.code === "CONTEXT_CREATE_FAILED";
    }

    return false;
  }
}
