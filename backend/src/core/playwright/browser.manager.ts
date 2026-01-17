import { chromium } from "playwright";
import { injectable } from "inversify";
import { IBrowserManager, BrowserEntry, ContextLease } from "./types.js";
import { BrowserManagerError } from "@errors/index.js";

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

  async init() {
    if (this.initialized) {
      return;
    }

    this.initialized = true;
    this.shuttingDown = false;

    try {
      for (let i = 0; i < this.maxBrowsers; i++) {
        const browser = await chromium.launch();
        this.browsers.push({
          browser,
          activeContexts: 0,
        });
      }
    } catch (err) {
      this.initialized = false;
      throw err;
    }
  }

  async acquireContext(): Promise<ContextLease> {
    if (!this.initialized) {
      throw new BrowserManagerError("BrowserManager is not initialized");
    }

    if (this.shuttingDown) {
      throw new BrowserManagerError("BrowserManager is shutting down");
    }

    const entry = this.findAvailableBrowser();

    if (entry) {
      return this.createLease(entry);
    }

    return new Promise<ContextLease>((resolve, reject) => {
      this.queue.push({ resolve, reject });
    });
  }

  private findAvailableBrowser(): BrowserEntry | undefined {
    return this.browsers.find((b) => b.activeContexts < this.maxContextsPerBrowser);
  }

  private async createLease(entry: BrowserEntry): Promise<ContextLease> {
    entry.activeContexts++;

    const context = await entry.browser.newContext();
    let released = false;

    return {
      context,
      release: async () => {
        if (released) {
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
      this.createLease(entry).then(next.resolve).catch(next.reject);
    }
  }

  async shutdown() {
    this.shuttingDown = true;
    for (const pending of this.queue) {
      pending.reject(new BrowserManagerError("BrowserManager is shutting down"));
    }

    await Promise.all(this.browsers.map((b) => b.browser.close().catch(() => {})));
    this.browsers = [];
    this.queue = [];
    this.initialized = false;
  }
}
