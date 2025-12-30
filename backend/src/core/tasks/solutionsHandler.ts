import { Locator } from "playwright";
import { CompareResult, ExecutionResult, ExpectationCheck, Expectations, ExpectationsValues, Task } from "./types";
import { LocatorStateService } from "../locator/expect.service";

export class SolutionsHandler {
  constructor(private stateService: LocatorStateService = new LocatorStateService()) {}

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
