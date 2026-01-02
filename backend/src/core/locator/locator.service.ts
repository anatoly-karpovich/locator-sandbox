import { Locator, Page } from "playwright";
import { getStrictModeViolationElementCount } from "../../utils/throwStrictModeViolationError";
import { LocatorBuilder } from "./locator.builder";
import { AstParser, ParsedPlan } from "../ast-parser";

export class LocatorService {
  private locatorBuilder: LocatorBuilder;
  constructor(private page: Page) {
    this.locatorBuilder = new LocatorBuilder(page);
  }

  createLocator(parsedASTPlan: ParsedPlan): Locator {
    return this.locatorBuilder.build(parsedASTPlan);
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
