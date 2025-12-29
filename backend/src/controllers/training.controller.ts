import { Request, Response } from "express";
import {
  ITrainingSubmitSolutionRequest,
  StartCustomTrainingRequest,
  StartFixedTrainingRequest,
} from "../core/training/types";
import locatorExecutionService from "../services/locator/execute.service";
import taskService from "../services/task/task.service";
import trainingService from "../services/training/training.service";
import { HTTP_CODES } from "../data/httpCodes";

export class TrainingController {
  startTraining(req: Request<{}, {}, StartFixedTrainingRequest | StartCustomTrainingRequest>, res: Response) {
    const dto = req.body;
    try {
      if (this.isFixedTrainingDTO(dto)) {
        const result = trainingService.startFixedTraining(dto.trainingTemplateId);
        return res.status(HTTP_CODES.OK).json(result);
      } else {
        return res.status(HTTP_CODES.OK).json({});
      }

      // return this.trainingService.startCustomTraining(dto);
    } catch (err) {
      return res.status(HTTP_CODES.BAD_REQUEST).json({ err });
    }
  }

  async submitSolution(req: Request<{}, {}, ITrainingSubmitSolutionRequest>, res: Response) {
    const dto = req.body;
    const task = taskService.getById(dto.taskId);
    if (!task) return res.status(HTTP_CODES.BAD_REQUEST).json({ error: "Task not found" });

    const execution = await locatorExecutionService.execute(task, dto.payload);

    return res.status(HTTP_CODES.OK).json(execution);
  }

  private isFixedTrainingDTO(
    dto: StartFixedTrainingRequest | StartCustomTrainingRequest
  ): dto is StartFixedTrainingRequest {
    return "trainingTemplateId" in dto;
  }
}
