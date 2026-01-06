import { inject, injectable } from "inversify";
import { Request, Response } from "express";

import { ITrainingsRunService, ITrainingTemplateService } from "@services/index.js";
import { HTTP_CODES } from "@core/httpCodes.js";
import {
  StartFixedTrainingRequest,
  ITrainingSubmitSolutionRequestDTO,
  StartTrainingRequestDTO,
  StartTrainingResponseDTO,
  ITrainingsRunSubmitSolutionResponseDTO,
} from "@dto/trainingRuns.dto.js";
import { ErrorResponseDTO } from "@dto/common.dto.js";
import { TrainingCatalogResponseDTO } from "@dto/trainings.dto.js";
import { TYPES } from "../container/types.js";

@injectable()
export class TrainingRunsController {
  constructor(
    @inject(TYPES.TrainingTemplateService) private trainingTemplateService: ITrainingTemplateService,
    @inject(TYPES.TrainingsRunService) private trainingsRunService: ITrainingsRunService
  ) {}
  startTraining(
    req: Request<{}, {}, StartTrainingRequestDTO>,
    res: Response<StartTrainingResponseDTO | ErrorResponseDTO>
  ) {
    const dto = req.body;
    try {
      if (this.isFixedTrainingDTO(dto)) {
        const result = this.trainingsRunService.startFixedTraining(dto.trainingTemplateId);
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
      const result = await this.trainingsRunService.handleSolution(trainingRunId, dto);
      return res.status(HTTP_CODES.OK).json(result);
    } catch (err) {
      return res.status(HTTP_CODES.BAD_REQUEST).json({ error: (err as Error).message });
    }
  }

  async getRunById(req: Request<{ trainingRunId: string }, {}, {}>, res: Response) {
    const trainingRunId = req.params.trainingRunId;
    try {
      const result = await this.trainingsRunService.getRunById(trainingRunId);
      return res.status(HTTP_CODES.OK).json(result);
    } catch (err) {
      return res.status(HTTP_CODES.BAD_REQUEST).json({ error: (err as Error).message });
    }
  }

  getCatalog(req: Request, res: Response<TrainingCatalogResponseDTO>) {
    const catalog = this.trainingTemplateService.getCatalogView();
    return res.status(HTTP_CODES.OK).json(catalog);
  }

  private isFixedTrainingDTO(dto: StartTrainingRequestDTO): dto is StartFixedTrainingRequest {
    return "trainingTemplateId" in dto;
  }
}
