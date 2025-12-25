import { Request, Response } from "express";
import { chromium } from "playwright";
import { LocatorService } from "../locator/locator.service";
import taskService from "../tasks/tasks.service";
import { SolutionsHandler } from "../tasks/solutionsHandler";

export type SubmitSolutionDTO = { payload: string; taskId: number };

export class SolutionController {
  async submit(req: Request<{}, SubmitSolutionDTO>, res: Response) {
    const { payload, taskId } = req.body;

    const solutionHandler = new SolutionsHandler();

    const task = taskService.getById(taskId);

    if (!task) return res.status(404).json({ error: "Task not found" });

    const browser = await chromium.launch(); // consider pooling
    const page = await browser.newPage();

    const locatorService = new LocatorService(page);

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

      res.status(200).json({
        isSuccess: true,
        result,
      });
    } catch (e: any) {
      let error = "";
      if (e.message.includes("locator.waitFor")) {
        error = "Element not found";
      } else {
        error = e.message ?? "Unknown error";
      }
      res.status(400).json({ IsSuccess: false, ErrorMessage: error });
    } finally {
      await page.close().catch(() => {});
      await browser.close().catch(() => {});
    }
  }
}
