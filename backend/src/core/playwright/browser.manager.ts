import { chromium } from "playwright";
import { injectable } from "inversify";
import { IBrowserManager, BrowserEntry, ContextLease } from "./types.js";
import { BrowserManagerError } from "@errors/index.js";
import { logger } from "@core/logger/logger.js";

@injectable()
export class BrowserManager implements IBrowserManager {
  private browsers: BrowserEntry[] = [];
  private queue: Array<{ resolve: (lease: ContextLease) => void; reject: (err: Error) => void }> = [];
  private initialized = false;
  private shuttingDown = false;

  constructor(
    private readonly maxBrowsers = 2,
    private readonly maxContextsPerBrowser = 5
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
      throw new BrowserManagerError("BrowserManager is not initialized");
    }

    if (this.shuttingDown) {
      logger.warn({ message: "BrowserManager acquireContext during shutdown" });
      throw new BrowserManagerError("BrowserManager is shutting down");
    }

    const entry = this.findAvailableBrowser();

    if (entry) {
      logger.info({ message: "BrowserManager lease granted", ...this.getStats() });
      return this.createLease(entry);
    }

    logger.info({ message: "BrowserManager queued lease request", ...this.getStats() });
    return new Promise<ContextLease>((resolve, reject) => {
      this.queue.push({ resolve, reject });
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
      throw err;
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
      const next = this.queue.shift()!;
      logger.info({ message: "BrowserManager dequeued lease request", ...this.getStats() });
      this.createLease(entry).then(next.resolve).catch(next.reject);
    } else {
      logger.info({ message: "BrowserManager lease released", ...this.getStats() });
    }
  }

  async shutdown() {
    logger.info({ message: "BrowserManager shutdown started" });
    this.shuttingDown = true;
    for (const pending of this.queue) {
      pending.reject(new BrowserManagerError("BrowserManager is shutting down"));
    }

    await Promise.all(this.browsers.map((b) => b.browser.close().catch(() => {})));
    this.browsers = [];
    this.queue = [];
    this.initialized = false;
    logger.info({ message: "BrowserManager shutdown completed" });
  }
}
