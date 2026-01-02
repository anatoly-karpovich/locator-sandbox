import { CompareResult, ExpectationCheck, Expectations, Task } from "../tasks/types";
import { SolutionsHandler } from "../tasks/solutionsHandler";
import { UsageSpecification } from "../usageSpec/usageSpecification";
import { LocatorService } from "./locator.service";
import { ITrainingsRunSubmitSolutionResponseDTO } from "../../dto/trainingRuns.dto";
import { PlaywrightRunner } from "../playwright/playwright.runner";
import { AstParser } from "../ast-parser/AstParser";
import { AstError } from "../../error/astError";
import { ParsedPlan } from "../ast-parser";

export class LocatorExecutionService {
  constructor(
    private readonly playwrightRunner: PlaywrightRunner = new PlaywrightRunner(),
    private readonly usageSpecification: UsageSpecification = new UsageSpecification()
  ) {}

  async execute(task: Task, payload: string): Promise<ITrainingsRunSubmitSolutionResponseDTO> {
    const solutionHandler = new SolutionsHandler();

    const baseSolution: ITrainingsRunSubmitSolutionResponseDTO = {
      result: {
        passed: false,
        checks: [],
      },
      explanation: [],
    };

    let parsedPlan: ParsedPlan;

    try {
      parsedPlan = AstParser.parse(payload);

      if (task.usageSpec) {
        const usageResult = this.usageSpecification.validate(parsedPlan.steps, task.usageSpec);
        baseSolution.explanation = this.usageSpecification.buildExplanation(usageResult);
      }
    } catch (err) {
      if (err instanceof AstError) {
        return {
          ...baseSolution,
          explanation: baseSolution.explanation.concat(err.message),
        };
      }
      throw err;
    }

    return this.playwrightRunner.run(async (page) => {
      await page.setContent(task.html);

      const locatorService = new LocatorService(page);
      const locator = locatorService.createLocator(parsedPlan);

      const presence = await locatorService.checkPresence(locator, task.expectations.count);

      if (!presence.attached) {
        return this.buildNotFoundResult(task.expectations, presence.count);
      }

      const result = await solutionHandler.runTask(task, locator);

      return {
        result,
        ...(baseSolution.explanation.length > 0 && {
          explanation: baseSolution.explanation,
        }),
      };
    });
  }

  private buildNotFoundResult(
    expectations: Expectations,
    presenceCount: number
  ): ITrainingsRunSubmitSolutionResponseDTO {
    const explanation: string[] = [];
    const checks: ExpectationCheck[] = [];
    const keys = Object.keys(expectations) as (keyof Expectations)[];

    for (const key of keys) {
      const expected = expectations[key];
      let actual: number | undefined = undefined;

      if (key === "count") {
        actual = presenceCount;
        if (expected !== undefined && typeof expected === "number" && actual > expected) {
          explanation.push(`Locator resolved to ${actual} elements`);
        }
      }

      checks.push({
        key,
        expected,
        actual,
        passed: actual === expected,
      });
    }

    const compareResult: CompareResult = {
      passed: false,
      checks,
    };

    return {
      result: compareResult,
      explanation: explanation.length > 0 ? explanation : ["Element not found"],
    };
  }
}
