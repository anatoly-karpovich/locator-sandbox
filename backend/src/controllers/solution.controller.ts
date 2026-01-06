import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { LocatorHandler } from "@core/locator/locatorHandler.js";
import { AstParser } from "@core/ast-parser/AstParser.js";
import { HTTP_CODES } from "@core/httpCodes.js";
import { ITaskService } from "@services/index.js";
import { TYPES } from "../container/types.js";
import { IPlaywrightRunner, IUsageSpecification, ISolutionsHandler } from "@core/types.js";

export type SubmitSolutionDTO = { payload: string; taskId: number };

@injectable()
export class SolutionController {
  constructor(
    @inject(TYPES.TaskService) private taskService: ITaskService,
    @inject(TYPES.SolutionsHandler) private solutionsHandler: ISolutionsHandler,
    @inject(TYPES.UsageSpecification) private usageSpecification: IUsageSpecification,
    @inject(TYPES.PlaywrightRunner) private playwrightRunner: IPlaywrightRunner
  ) {}

  async submit(req: Request<{}, SubmitSolutionDTO>, res: Response) {
    const { payload, taskId } = req.body;

    const task = this.taskService.getById(taskId);

    if (!task) return res.status(HTTP_CODES.NOT_FOUND).json({ error: "Task not found" });

    try {
      const { result, usageExplanation } = await this.playwrightRunner.run(async (page) => {
        await page.setContent(task.html);
        const parsed = AstParser.parse(payload);

        const locatorService = new LocatorHandler(page);
        const locator = locatorService.createLocator(parsed);

        const isPresented = await locatorService.checkPresence(locator);
        if (!isPresented.attached) throw new Error("Element not found");

        const executionResult = await this.solutionsHandler.runTask(task, locator);
        const usageResult = task.usageSpec
          ? this.usageSpecification.validate(parsed.steps, task.usageSpec)
          : undefined;
        const usageExplanation = usageResult ? this.usageSpecification.buildExplanation(usageResult) : [];

        return { result: executionResult, usageExplanation };
      });

      res.status(HTTP_CODES.OK).json({
        IsSuccess: true,
        result,
        explanation: usageExplanation,
      });
    } catch (e: any) {
      let error = "";
      if (e.message?.includes?.("locator.waitFor")) {
        error = "Element not found";
      } else {
        error = e.message ?? "Unknown error";
      }
      res.status(HTTP_CODES.BAD_REQUEST).json({ IsSuccess: false, ErrorMessage: error });
    }
  }
}
