import { inject, injectable } from "inversify";
import { Locator } from "playwright";
import { CompareResult, ExpectationCheck, Expectations, ExpectationsValues, Task } from "./types";
import { LocatorStateHandler } from "../locator/locatorStateHandler";
import { TYPES } from "../../container/types";
import { ILocatorStateHandler, ISolutionsHandler } from "../types";

@injectable()
export class SolutionsHandler implements ISolutionsHandler {
  constructor(@inject(TYPES.LocatorStateHandler) private stateService: ILocatorStateHandler) {}

  async runTask(task: Task, locator: Locator) {
    const state = await this.stateService.getActual(locator, task.expectations);

    return this.compareWithExpectations(state, task.expectations);
  }

  compareWithExpectations(
    actual: Record<keyof Expectations, ExpectationsValues>,
    expected: Expectations
  ): CompareResult {
    const checks: ExpectationCheck[] = [];

    for (const key of Object.keys(expected) as (keyof Expectations)[]) {
      const expectedValue = expected[key];
      const actualValue = actual[key];
      const passed = actualValue === expectedValue;

      checks.push({
        key,
        expected: expectedValue,
        actual: actualValue,
        passed,
      });
    }

    return {
      passed: checks.every((c) => c.passed),
      checks,
    };
  }
}
