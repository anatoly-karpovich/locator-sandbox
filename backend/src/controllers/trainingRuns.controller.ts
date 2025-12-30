import { Request, Response } from "express";
import {
  ITrainingSubmitSolutionRequest,
  StartCustomTrainingRequest,
  StartFixedTrainingRequest,
} from "../core/training/types";
import locatorExecutionService from "../services/locator/execute.service";
import taskService from "../services/task/task.service";
import trainingsRunService from "../services/training/trainingsRun.service";
import { HTTP_CODES } from "../data/httpCodes";
import trainingTemplateService from "../services/training/trainingTemplate.service";

export class TrainingRunsController {
  startTraining(req: Request<{}, {}, StartFixedTrainingRequest | StartCustomTrainingRequest>, res: Response) {
    const dto = req.body;
    try {
      if (this.isFixedTrainingDTO(dto)) {
        const result = trainingsRunService.startFixedTraining(dto.trainingTemplateId);
        return res.status(HTTP_CODES.OK).json(result);
      } else {
        return res.status(HTTP_CODES.OK).json({});
      }

      // return this.trainingService.startCustomTraining(dto);
    } catch (err) {
      return res.status(HTTP_CODES.BAD_REQUEST).json({ err });
    }
  }

  async submitSolution(req: Request<{ trainingRunId: string }, {}, ITrainingSubmitSolutionRequest>, res: Response) {
    const dto = req.body;
    const trainingRunId = req.params.trainingRunId;
    try {
      const result = await trainingsRunService.handleSolution(trainingRunId, dto);
      return res.status(HTTP_CODES.OK).json(result);
    } catch (err) {
      return res.status(HTTP_CODES.BAD_REQUEST).json({ error: (err as Error).message });
    }
  }

  async getRunById(req: Request<{ trainingRunId: string }, {}, {}>, res: Response) {
    const trainingRunId = req.params.trainingRunId;
    try {
      const result = await trainingsRunService.getRunById(trainingRunId);
      return res.status(HTTP_CODES.OK).json(result);
    } catch (err) {
      return res.status(HTTP_CODES.BAD_REQUEST).json({ error: (err as Error).message });
    }
  }

  getCatalog(req: Request, res: Response) {
    const catalog = trainingTemplateService.getCatalogView();
    return res.status(HTTP_CODES.OK).json(catalog);
  }

  private isFixedTrainingDTO(
    dto: StartFixedTrainingRequest | StartCustomTrainingRequest
  ): dto is StartFixedTrainingRequest {
    return "trainingTemplateId" in dto;
  }
}
