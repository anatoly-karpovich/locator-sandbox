import { chromium } from "playwright";
import { injectable } from "inversify";
import { IBrowserManager, BrowserEntry, ContextLease } from "./types.js";
import { BrowserManagerError } from "@errors/index.js";
import { logger } from "@core/logger/logger.js";
import { readEnvNumber } from "@utils/env.js";

type QueueItem = {
  id: number;
  resolve: (lease: ContextLease) => void;
  reject: (err: Error) => void;
  timeoutId?: NodeJS.Timeout;
};

@injectable()
export class BrowserManager implements IBrowserManager {
  private browsers: BrowserEntry[] = [];
  private queue: QueueItem[] = [];
  private initialized = false;
  private shuttingDown = false;
  private queueCounter = 0;

  constructor(
    private readonly maxBrowsers = readEnvNumber("PLAYWRIGHT_MAX_BROWSERS", 2),
    private readonly maxContextsPerBrowser = readEnvNumber("PLAYWRIGHT_MAX_CONTEXTS_PER_BROWSER", 5),
    private readonly queueLimit = readEnvNumber("PLAYWRIGHT_QUEUE_LIMIT", 100),
    private readonly queueTimeoutMs = readEnvNumber("PLAYWRIGHT_QUEUE_TIMEOUT_MS", 5000),
    private readonly gracefulShutdownMs = readEnvNumber("PLAYWRIGHT_GRACEFUL_SHUTDOWN_MS", 5000)
  ) {}

  private getStats() {
    const totalActiveContexts = this.browsers.reduce((sum, b) => sum + b.activeContexts, 0);

    return {
      browsers: this.browsers.length,
      totalActiveContexts,
      queueLength: this.queue.length,
      maxBrowsers: this.maxBrowsers,
      maxContextsPerBrowser: this.maxContextsPerBrowser,
    };
  }

  async init() {
    if (this.initialized) {
      logger.debug({ message: "BrowserManager already initialized" });
      return;
    }

    this.initialized = true;
    this.shuttingDown = false;

    try {
      logger.info({
        message: "BrowserManager init started",
        maxBrowsers: this.maxBrowsers,
        maxContextsPerBrowser: this.maxContextsPerBrowser,
      });

      for (let i = 0; i < this.maxBrowsers; i++) {
        const browser = await chromium.launch();
        this.browsers.push({
          browser,
          activeContexts: 0,
        });
      }
      logger.info({ message: "BrowserManager init completed", browsers: this.browsers.length });
    } catch (err) {
      this.initialized = false;
      logger.error({ message: "BrowserManager init failed", err });
      throw err;
    }
  }

  async acquireContext(): Promise<ContextLease> {
    if (!this.initialized) {
      logger.warn({ message: "BrowserManager acquireContext before init" });
      throw new BrowserManagerError("NOT_INITIALIZED", "BrowserManager is not initialized");
    }

    if (this.shuttingDown) {
      logger.warn({ message: "BrowserManager acquireContext during shutdown" });
      throw new BrowserManagerError("SHUTTING_DOWN", "BrowserManager is shutting down");
    }

    const entry = this.findAvailableBrowser();

    if (entry) {
      logger.debug({ message: "BrowserManager lease granted", ...this.getStats() });
      return this.createLease(entry);
    }

    if (this.queue.length >= this.queueLimit) {
      logger.warn({ message: "BrowserManager queue limit reached", ...this.getStats() });
      throw new BrowserManagerError("QUEUE_FULL", "BrowserManager queue is full");
    }

    logger.debug({ message: "BrowserManager queued lease request", ...this.getStats() });
    return new Promise<ContextLease>((resolve, reject) => {
      const item: QueueItem = {
        id: ++this.queueCounter,
        resolve: (lease) => {
          if (item.timeoutId) {
            clearTimeout(item.timeoutId);
          }
          resolve(lease);
        },
        reject: (err) => {
          if (item.timeoutId) {
            clearTimeout(item.timeoutId);
          }
          reject(err);
        },
      };

      if (this.queueTimeoutMs > 0) {
        item.timeoutId = setTimeout(() => {
          const index = this.queue.findIndex((entry) => entry.id === item.id);
          if (index >= 0) {
            this.queue.splice(index, 1);
            logger.warn({ message: "BrowserManager queue wait timeout", ...this.getStats() });
            item.reject(new BrowserManagerError("QUEUE_TIMEOUT", "BrowserManager queue wait timeout"));
          }
        }, this.queueTimeoutMs);
      }

      this.queue.push(item);
    });
  }

  private findAvailableBrowser(): BrowserEntry | undefined {
    return this.browsers.find((b) => b.activeContexts < this.maxContextsPerBrowser);
  }

  private async createLease(entry: BrowserEntry): Promise<ContextLease> {
    entry.activeContexts++;

    let context: Awaited<ReturnType<typeof entry.browser.newContext>>;
    try {
      context = await entry.browser.newContext();
    } catch (err) {
      entry.activeContexts--;
      logger.error({ message: "BrowserManager failed to create context", err });
      throw new BrowserManagerError("CONTEXT_CREATE_FAILED", "Failed to create browser context", err);
    }
    let released = false;

    return {
      context,
      release: async () => {
        if (released) {
          logger.warn({ message: "BrowserManager lease released twice" });
          return;
        }

        released = true;

        try {
          await context.close();
        } finally {
          this.releaseContext(entry);
        }
      },
    };
  }

  private releaseContext(entry: BrowserEntry) {
    entry.activeContexts--;

    if (this.queue.length > 0) {
      this.fulfillQueue(entry);
    } else {
      logger.debug({ message: "BrowserManager lease released", ...this.getStats() });
    }
  }

  private async fulfillQueue(entry: BrowserEntry) {
    while (this.queue.length > 0 && !this.shuttingDown) {
      const next = this.queue.shift()!;
      logger.debug({ message: "BrowserManager dequeued lease request", ...this.getStats() });

      try {
        const lease = await this.createLease(entry);
        next.resolve(lease);
        return;
      } catch (err) {
        next.reject(err instanceof Error ? err : new Error("Failed to create browser context"));
      }
    }
  }

  async shutdown() {
    logger.info({ message: "BrowserManager shutdown started" });
    this.shuttingDown = true;
    for (const pending of this.queue) {
      pending.reject(new BrowserManagerError("SHUTTING_DOWN", "BrowserManager is shutting down"));
      if (pending.timeoutId) {
        clearTimeout(pending.timeoutId);
      }
    }

    const waitResult = await this.waitForIdle(this.gracefulShutdownMs);
    if (!waitResult) {
      logger.warn({ message: "BrowserManager graceful shutdown timeout", ...this.getStats() });
    }

    await Promise.all(this.browsers.map((b) => b.browser.close().catch(() => {})));
    this.browsers = [];
    this.queue = [];
    this.initialized = false;
    logger.info({ message: "BrowserManager shutdown completed" });
  }

  private async waitForIdle(timeoutMs: number) {
    if (timeoutMs <= 0) {
      return false;
    }

    const pollIntervalMs = 100;
    const endAt = Date.now() + timeoutMs;

    while (Date.now() < endAt) {
      const totalActiveContexts = this.browsers.reduce((sum, b) => sum + b.activeContexts, 0);
      if (totalActiveContexts === 0) {
        return true;
      }

      await new Promise<void>((resolve) => setTimeout(resolve, pollIntervalMs));
    }

    return false;
  }
}
