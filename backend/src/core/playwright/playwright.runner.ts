import { inject, injectable } from "inversify";
import { Page } from "playwright";
import { IPlaywrightRunner } from "@core/types.js";
import { IBrowserManager } from "./types.js";
import { TYPES } from "../../container/types.js";

// @injectable()
// export class PlaywrightRunner implements IPlaywrightRunner {
//   async run<T>(fn: (page: Page) => Promise<T>): Promise<T> {
//     const browser = await chromium.launch();
//     const page = await browser.newPage();

//     try {
//       return await fn(page);
//     } finally {
//       await page.close().catch(() => {});
//       await browser.close().catch(() => {});
//     }
//   }
// }

@injectable()
export class PlaywrightRunner implements IPlaywrightRunner {
  constructor(@inject(TYPES.BrowserManager) private readonly browserManager: IBrowserManager) {}

  async run<T>(fn: (page: Page) => Promise<T>): Promise<T> {
    const lease = await this.browserManager.acquireContext();
    const page = await lease.context.newPage();

    try {
      return await fn(page);
    } finally {
      await page.close().catch(() => {});
      await lease.release();
    }
  }
}
