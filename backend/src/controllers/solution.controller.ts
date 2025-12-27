import { Request, Response } from "express";
import { chromium } from "playwright";
import { LocatorService } from "../locator/locator.service";
import taskService from "../tasks/tasks.service";
import { SolutionsHandler } from "../tasks/solutionsHandler";
import { HTTP_CODES } from "../data/httpCodes";
import { parsePlaywrightLocatorAst } from "../ast-parser/parser";
import UsageSpecification from "../usageSpec/usageSpecification";

export type SubmitSolutionDTO = { payload: string; taskId: number };

export class SolutionController {
  async submit(req: Request<{}, SubmitSolutionDTO>, res: Response) {
    const { payload, taskId } = req.body;

    const solutionHandler = new SolutionsHandler();

    const task = taskService.getById(taskId);

    if (!task) return res.status(HTTP_CODES.NOT_FOUND).json({ error: "Task not found" });

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
      const parsed = parsePlaywrightLocatorAst(payload);
      const steps = parsed.steps;

      const locator = locatorService.createLocator(payload);

      const isPresented = await locatorService.checkPresence(locator);
      if (!isPresented.attached) throw new Error("Element not found");

      result = await solutionHandler.runTask(task, locator);
      const usageResult = usageSpecification.validate(steps, task.usageSpec);
      const usageExplanation = usageSpecification.buildExplanation(usageResult);

      res.status(HTTP_CODES.OK).json({
        IsSuccess: true,
        result,
        explanation: usageExplanation,
      });
    } catch (e: any) {
      let error = "";
      if (e.message.includes("locator.waitFor")) {
        error = "Element not found";
      } else {
        error = e.message ?? "Unknown error";
      }
      res.status(HTTP_CODES.BAD_REQUEST).json({ IsSuccess: false, ErrorMessage: error });
    } finally {
      await page.close().catch(() => {});
      await browser.close().catch(() => {});
    }
  }
}
