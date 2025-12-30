import { chromium } from "playwright";
import { CompareResult, Task } from "../../core/tasks/types";
import { SolutionsHandler } from "../../core/tasks/solutionsHandler";
import UsageSpecification from "../usageSpec/usageSpecification";
import { LocatorService } from "./locator.service";
import { parsePlaywrightLocatorAst } from "../../core/ast-parser/parser";

class LocatorExecutionService {
  async execute(task: Task, payload: string): Promise<{ result: CompareResult; explanation?: string[] }> {
    const solutionHandler = new SolutionsHandler();

    const browser = await chromium.launch(); // consider pooling
    const page = await browser.newPage();

    const locatorService = new LocatorService(page);
    const usageSpecification = new UsageSpecification();

    let result: any = {
      text: "",
      count: 0,
      isVisible: false,
    };

    try {
      await page.setContent(task.html);
      const locator = locatorService.createLocator(payload);
      const isPresented = await locatorService.checkPresence(locator);
      if (!isPresented.attached) throw new Error("Element not found");

      result = await solutionHandler.runTask(task, locator);
      let explanation: string[] | null = null;
      if (task.usageSpec) {
        const parsed = parsePlaywrightLocatorAst(payload);
        const steps = parsed.steps;
        const usageResult = usageSpecification.validate(steps, task.usageSpec);
        explanation = usageSpecification.buildExplanation(usageResult);
      }

      return {
        result,
        ...(explanation && { explanation }),
      };
    } catch (err) {
      throw err;
    } finally {
      await page.close();
      await browser.close();
    }
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
