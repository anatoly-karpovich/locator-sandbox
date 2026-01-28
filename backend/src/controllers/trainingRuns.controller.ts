import { inject, injectable } from "inversify";
import { NextFunction, Request, Response } from "express";

import { ITrainingsRunService, ITrainingTemplateService } from "@services/index.js";
import { HTTP_CODES } from "@core/httpCodes.js";
import {
  StartFixedTrainingRequest,
  ITrainingSubmitSolutionRequestDTO,
  StartTrainingRequestDTO,
  StartTrainingResponseDTO,
  ITrainingsRunSubmitSolutionResponseDTO,
  GetTrainingRunResponseDTO,
} from "@dto/trainingRuns.dto.js";
import { ErrorResponseDTO } from "@dto/common.dto.js";
import { TrainingCatalogResponseDTO } from "@dto/trainings.dto.js";
import { TYPES } from "../container/types.js";
import { AstError, ResponseError } from "@errors/index.js";
import { ErrorType } from "../core/errorTypeEnum.js";

@injectable()
export class TrainingRunsController {
  constructor(
    @inject(TYPES.TrainingTemplateService) private trainingTemplateService: ITrainingTemplateService,
    @inject(TYPES.TrainingsRunService) private trainingsRunService: ITrainingsRunService
  ) { }
  async startTraining(
    req: Request<{}, {}, StartTrainingRequestDTO>,
    res: Response<StartTrainingResponseDTO | ErrorResponseDTO>,
    next: NextFunction
  ) {
    const dto = req.body;
    try {
      if (this.isFixedTrainingDTO(dto)) {
        const result = this.trainingsRunService.startFixedTraining(dto.trainingTemplateId);
        return res.status(HTTP_CODES.OK).json(result);
      } else {
        return next(new ResponseError(HTTP_CODES.BAD_REQUEST, "Not implemented"));
      }

      // return this.trainingService.startCustomTraining(dto);
    } catch (err) {
      return next(new ResponseError(HTTP_CODES.BAD_REQUEST, (err as Error).message));
    }
  }

  async submitSolution(
    req: Request<{ trainingRunId: string }, {}, ITrainingSubmitSolutionRequestDTO>,
    res: Response<ITrainingsRunSubmitSolutionResponseDTO | ErrorResponseDTO>,
    next: NextFunction
  ) {
    const dto = req.body;
    const trainingRunId = req.params.trainingRunId;
    try {
      const result = await this.trainingsRunService.handleSolution(trainingRunId, dto);
      return res.status(HTTP_CODES.OK).json(result);
    } catch (err) {
      if (err instanceof AstError) {
        return next(new ResponseError(HTTP_CODES.OK, err.message, ErrorType.AST_ERROR));
      }
      return next(new ResponseError(HTTP_CODES.BAD_REQUEST, (err as Error).message));
    }
  }

  async getRunById(
    req: Request<{ trainingRunId: string }, {}, {}>,
    res: Response<GetTrainingRunResponseDTO | ErrorResponseDTO>,
    next: NextFunction
  ) {
    const trainingRunId = req.params.trainingRunId;
    try {
      const result = await this.trainingsRunService.getRunById(trainingRunId);
      return res.status(HTTP_CODES.OK).json(result);
    } catch (err) {
      return next(new ResponseError(HTTP_CODES.BAD_REQUEST, (err as Error).message));
    }
  }

  getCatalog(req: Request, res: Response<TrainingCatalogResponseDTO>, next: NextFunction) {
    try {
      const catalog = this.trainingTemplateService.getCatalogView();
      return res.status(HTTP_CODES.OK).json(catalog);
    } catch (err) {
      return next(new ResponseError(HTTP_CODES.SERVER_ERROR, (err as Error).message));
    }
  }

  private isFixedTrainingDTO(dto: StartTrainingRequestDTO): dto is StartFixedTrainingRequest {
    return "trainingTemplateId" in dto;
  }
}
