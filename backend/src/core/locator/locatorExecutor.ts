import { inject, injectable } from "inversify";
import { CompareResult, ExpectationCheck, Expectations, Task } from "@core/tasks/types.js";
import { LocatorHandler } from "@core/locator/locatorHandler.js";
import { ITrainingsRunSubmitSolutionResponseDTO } from "@dto/trainingRuns.dto.js";
import { AstParser } from "@core/ast-parser/AstParser.js";
import { AstError } from "@errors/index.js";
import { ParsedPlan } from "@core/ast-parser/index.js";
import { TYPES } from "../../container/types.js";
import { ILocatorExecutor, IPlaywrightRunner, IUsageSpecification, ISolutionsHandler } from "@core/types.js";

@injectable()
export class LocatorExecutor implements ILocatorExecutor {
  constructor(
    @inject(TYPES.PlaywrightRunner) private readonly playwrightRunner: IPlaywrightRunner,
    @inject(TYPES.UsageSpecification) private readonly usageSpecification: IUsageSpecification,
    @inject(TYPES.SolutionsHandler) private readonly solutionHandler: ISolutionsHandler
  ) {}

  async execute(task: Task, payload: string): Promise<ITrainingsRunSubmitSolutionResponseDTO> {
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

      const locatorService = new LocatorHandler(page);
      const locator = locatorService.createLocator(parsedPlan);

      const presence = await locatorService.checkPresence(locator, task.expectations.count);

      if (!presence.attached) {
        return this.buildNotFoundResult(task.expectations, presence.count);
      }

      const result = await this.solutionHandler.runTask(task, locator);

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

