import { Browser, BrowserContext } from "playwright";

export interface ContextLease {
  context: BrowserContext;
  release: () => Promise<void>;
}

export interface IBrowserManager {
  init(): Promise<void>;
  acquireContext(): Promise<ContextLease>;
  shutdown(): Promise<void>;
}

export type BrowserEntry = {
  browser: Browser;
  activeContexts: number;
};
