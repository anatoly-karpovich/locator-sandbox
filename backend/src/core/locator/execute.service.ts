import { chromium } from "playwright";
import { CompareResult, ExpectationCheck, Expectations, Task } from "../tasks/types";
import { SolutionsHandler } from "../tasks/solutionsHandler";
import UsageSpecification from "../usageSpec/usageSpecification";
import { LocatorService } from "./locator.service";
import { AstParser } from "../ast-parser/AstParser";
import { AstError } from "../../error/astError";
import { ITrainingsRunSubmitSolutionResponseDTO } from "../../dto/trainingRuns.dto";
import { ParsedPlan } from "../ast-parser";

class LocatorExecutionService {
  async execute(task: Task, payload: string): Promise<ITrainingsRunSubmitSolutionResponseDTO> {
    const solutionHandler = new SolutionsHandler();
    const usageSpecification = new UsageSpecification();

    const solution: ITrainingsRunSubmitSolutionResponseDTO = {
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
        const steps = parsedPlan.steps;
        const usageResult = usageSpecification.validate(steps, task.usageSpec);
        solution.explanation = usageSpecification.buildExplanation(usageResult);
      }
    } catch (err) {
      if (err instanceof AstError) {
        return {
          ...solution,
          explanation: solution.explanation.concat([err.message]),
        };
      }
      throw err;
    }

    const browser = await chromium.launch(); // consider pooling
    const page = await browser.newPage();
    const locatorService = new LocatorService(page);

    try {
      await page.setContent(task.html);
      const locator = locatorService.createLocator(payload);
      const foundElement = await locatorService.checkPresence(locator, task.expectations.count);

      if (!foundElement.attached) {
        const compare = this.buildNotFoundResult(task.expectations, foundElement.count);
        return compare;
      }

      solution.result = await solutionHandler.runTask(task, locator);

      return solution;
    } catch (err) {
      throw err;
    } finally {
      await page.close();
      await browser.close();
    }
  }

  private buildNotFoundResult(expectations: Expectations, presenceCount: number): ITrainingsRunSubmitSolutionResponseDTO {
    const explanation: string[] = [];
    const checks: ExpectationCheck[] = [];
    const keys = Object.keys(expectations) as (keyof Expectations)[];

    for (const key of keys) {
      const expected = expectations[key];
      let actual: number | undefined = undefined;

      if (key === "count") {
        actual = presenceCount;
        if (actual !== expected && actual > (expected as number)) {
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

    if (explanation.length > 0) {
      return {
        result: compareResult,
        explanation,
      };
    }

    return {
      result: compareResult,
      explanation: ["Element not found"],
    };
  }
  // async execute(task: Task, payload: string) {
  //   const browser = await chromium.launch();
  //   const page = await browser.newPage();
  //   try {
  //     await page.setContent(task.html);
  //     const locator = eval(payload); // временно, пока AST → builder
  //     await locator.waitFor({ state: "attached", timeout: 1000 });
  //     return {
  //       attached: true,
  //       count: await locator.count(),
  //       text: await locator.textContent(),
  //       visible: await locator.isVisible(),
  //     };
  //   } catch {
  //     return {
  //       attached: true,
  //       count: 0,
  //       text: "",
  //       visible: false,
  //     };
  //   } finally {
  //     await page.close();
  //     await browser.close();
  //   }
  // }
}

export default new LocatorExecutionService();
