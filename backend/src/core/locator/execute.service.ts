import { chromium } from "playwright";
import { CompareResult, ExpectationCheck, Expectations, Task } from "../tasks/types";
import { SolutionsHandler } from "../tasks/solutionsHandler";
import { UsageSpecification } from "../usageSpec/usageSpecification";
import { LocatorService } from "./locator.service";
import { parsePlaywrightLocatorAst } from "../ast-parser/parser";
import { ITrainingsRunSubmitSolutionResponseDTO } from "../../dto/trainingRuns.dto";
import { PlaywrightRunner } from "../playwright/playwright.service";

export class LocatorExecutionService {
  constructor(
    private readonly playwrightRunner: PlaywrightRunner = new PlaywrightRunner(),
    private readonly usageSpecification: UsageSpecification = new UsageSpecification()
  ) {}

  async execute(task: Task, payload: string): Promise<ITrainingsRunSubmitSolutionResponseDTO> {
    const solutionHandler = new SolutionsHandler();

    return this.playwrightRunner.run(async (page) => {
      await page.setContent(task.html);

      const locatorService = new LocatorService(page);
      const locator = locatorService.createLocator(payload);

      const presence = await locatorService.checkPresence(locator);
      if (!presence.attached) {
        return this.buildNotFoundResult(task.expectations, presence.count);
      }

      const result = await solutionHandler.runTask(task, locator);
      let explanation: string[] | null = null;
      if (task.usageSpec) {
        const parsed = parsePlaywrightLocatorAst(payload);
        const steps = parsed.steps;
        const usageResult = this.usageSpecification.validate(steps, task.usageSpec);
        explanation = this.usageSpecification.buildExplanation(usageResult);
      }

      return {
        result,
        ...(explanation && { explanation }),
      };
    });
  }

  // async execute(task: Task, payload: string): Promise<ITrainingsRunSubmitSolutionResponseDTO> {
  //   const solutionHandler = new SolutionsHandler();

  //   const browser = await chromium.launch(); // consider pooling
  //   const page = await browser.newPage();

  //   const locatorService = new LocatorService(page);
  //   const usageSpecification = new UsageSpecification();

  //   let result: any = {
  //     text: "",
  //     count: 0,
  //     isVisible: false,
  //   };

  //   try {
  //     await page.setContent(task.html);
  //     const locator = locatorService.createLocator(payload);
  //     const isPresented = await locatorService.checkPresence(locator);
  //     if (!isPresented.attached) {
  //       const compare = this.buildNotFoundResult(task.expectations, isPresented.count);
  //       return compare;
  //     }

  //     result = await solutionHandler.runTask(task, locator);
  //     let explanation: string[] | null = null;
  //     if (task.usageSpec) {
  //       const parsed = parsePlaywrightLocatorAst(payload);
  //       const steps = parsed.steps;
  //       const usageResult = usageSpecification.validate(steps, task.usageSpec);
  //       explanation = usageSpecification.buildExplanation(usageResult);
  //     }

  //     return {
  //       result,
  //       ...(explanation && { explanation }),
  //     };
  //   } catch (err) {
  //     throw err;
  //   } finally {
  //     await page.close();
  //     await browser.close();
  //   }
  // }

  private buildNotFoundResult(
    expectations: Expectations,
    presenceCount: number | null
  ): ITrainingsRunSubmitSolutionResponseDTO {
    const checks: ExpectationCheck[] = [];
    const keys = Object.keys(expectations) as (keyof Expectations)[];

    for (const key of keys) {
      const expected = expectations[key];
      const actual = key === "count" ? presenceCount ?? 0 : null;
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
