import { Request, Response } from "express";

import trainingsRunService from "../services/training/trainingsRun.service";
import { HTTP_CODES } from "../data/httpCodes";
import trainingTemplateService from "../services/training/trainingTemplate.service";
import {
  StartFixedTrainingRequest,
  ITrainingSubmitSolutionRequestDTO,
  StartTrainingRequestDTO,
  StartTrainingResponseDTO,
  ITrainingsRunSubmitSolutionResponseDTO,
} from "../dto/trainingRuns.dto";
import { ErrorResponseDTO } from "../dto/common.dto";
import { TrainingCatalogResponseDTO } from "../dto/trainings.dto";

export class TrainingRunsController {
  startTraining(
    req: Request<{}, {}, StartTrainingRequestDTO>,
    res: Response<StartTrainingResponseDTO | ErrorResponseDTO>
  ) {
    const dto = req.body;
    try {
      if (this.isFixedTrainingDTO(dto)) {
        const result = trainingsRunService.startFixedTraining(dto.trainingTemplateId);
        return res.status(HTTP_CODES.OK).json(result);
      } else {
        return res.status(HTTP_CODES.BAD_REQUEST).json({ error: "Not implemented" });
      }

      // return this.trainingService.startCustomTraining(dto);
    } catch (err) {
      return res.status(HTTP_CODES.BAD_REQUEST).json({ error: (err as Error).message });
    }
  }

  async submitSolution(
    req: Request<{ trainingRunId: string }, {}, ITrainingSubmitSolutionRequestDTO>,
    res: Response<ITrainingsRunSubmitSolutionResponseDTO | ErrorResponseDTO>
  ) {
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

  getCatalog(req: Request, res: Response<TrainingCatalogResponseDTO>) {
    const catalog = trainingTemplateService.getCatalogView();
    return res.status(HTTP_CODES.OK).json(catalog);
  }

  private isFixedTrainingDTO(dto: StartTrainingRequestDTO): dto is StartFixedTrainingRequest {
    return "trainingTemplateId" in dto;
  }
}
