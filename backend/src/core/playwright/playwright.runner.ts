import { injectable } from "inversify";
import { chromium, Page } from "playwright";

export interface IPlaywrightRunner {
  run<T>(fn: (page: Page) => Promise<T>): Promise<T>;
}

@injectable()
export class PlaywrightRunner implements IPlaywrightRunner {
  async run<T>(fn: (page: Page) => Promise<T>): Promise<T> {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    try {
      return await fn(page);
    } finally {
      await page.close().catch(() => {});
      await browser.close().catch(() => {});
    }
  }
}
