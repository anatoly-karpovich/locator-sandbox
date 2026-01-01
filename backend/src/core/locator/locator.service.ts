import { Locator, Page } from "playwright";
import { getStrictModeViolationElementCount } from "../../utils/throwStrictModeViolationError";

export class LocatorService {
  constructor(private page: Page) {}

  createLocator(locatorExpression: string): Locator {
    const page = this.page;
    // пока eval, потом AST+builder
    try {
      const locator = eval(locatorExpression);
      return locator;
    } catch (err) {
      throw new Error("Invalid locator expression");
    }
  }

  async checkPresence(locator: Locator, expectedCount?: number, timeout = 1000) {
    let count: number;
    try {
      await locator.waitFor({ state: "attached", timeout });
      count = await locator.count();

      return {
        attached: true,
        count,
      };
    } catch (e) {
      count = getStrictModeViolationElementCount(e);
      if (expectedCount && count === expectedCount) {
        return {
          attached: true,
          count,
        };
      }

      return {
        attached: false,
        count,
      };
    }
  }
}
