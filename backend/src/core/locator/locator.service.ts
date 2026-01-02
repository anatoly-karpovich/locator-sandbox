import { Locator, Page } from "playwright";
import { getStrictModeViolationElementCount } from "../../utils/throwStrictModeViolationError";
import { LocatorBuilder } from "./locator.builder";
import { AstParser } from "../ast-parser";

export class LocatorService {
  private locatorBuilder: LocatorBuilder;
  constructor(private page: Page) {
    this.locatorBuilder = new LocatorBuilder(page);
  }

  createLocator(locatorExpression: string): Locator {
    try {
      const plan = AstParser.parse(locatorExpression);
      const locator = this.locatorBuilder.build(plan);
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
