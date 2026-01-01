import { Locator, Page } from "playwright";
import { throwStrictModeViolationError } from "../../utils/throwStrictModeViolationError";

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

  async checkPresence(locator: Locator, timeout = 1000) {
    try {
      await locator.waitFor({ state: "attached", timeout });
      const count = await locator.count();

      return {
        attached: true,
        count,
      };
    } catch (e) {
      throwStrictModeViolationError(e);
      return {
        attached: false,
        count: null,
      };
    }
  }
}
