import { Page, Locator } from "playwright";
import { Step } from "./ast-parser/types";
import { UsageCheckResult, UsageSpec, CompareResult, Expectations, ExpectationsValues, Task } from "./tasks/types";
import { ITrainingsRunSubmitSolutionResponseDTO } from "../dto/trainingRuns.dto";

export interface IPlaywrightRunner {
  run<T>(fn: (page: Page) => Promise<T>): Promise<T>;
}

export interface IUsageSpecification {
  validate(steps: Step[], specs: UsageSpec): UsageCheckResult;
  buildExplanation(result: UsageCheckResult): string[];
}

export interface ILocatorStateHandler
  extends Record<keyof Required<Expectations>, (locator: Locator) => Promise<ExpectationsValues>> {
  getActual(locator: Locator, expectations: Expectations): Promise<Record<keyof Expectations, ExpectationsValues>>;
}

export interface ISolutionsHandler {
  runTask(task: Task, locator: Locator): Promise<CompareResult>;
  compareWithExpectations(
    actual: Record<keyof Expectations, ExpectationsValues>,
    expected: Expectations
  ): CompareResult;
}

export interface ILocatorExecutor {
  execute(task: Task, payload: string): Promise<ITrainingsRunSubmitSolutionResponseDTO>;
}
