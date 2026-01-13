import { inject, injectable } from "inversify";
import { HTTP_CODES } from "@core/httpCodes.js";
import { NextFunction, Request, Response } from "express";
import { ITrainingTemplateService } from "@services/index.js";
import { TrainingCatalogResponseDTO } from "@dto/trainings.dto.js";
import { ErrorResponseDTO } from "@dto/common.dto.js";
import { TYPES } from "../container/types.js";
import { ResponseError } from "@errors/index.js";

@injectable()
export class TrainingsController {
  constructor(@inject(TYPES.TrainingTemplateService) private trainingTemplateService: ITrainingTemplateService) {}
  getCatalog(req: Request, res: Response<TrainingCatalogResponseDTO | ErrorResponseDTO>, next: NextFunction) {
    try {
      const catalog = this.trainingTemplateService.getCatalogView();
      return res.status(HTTP_CODES.OK).json(catalog);
    } catch (err) {
      return next(new ResponseError(HTTP_CODES.SERVER_ERROR, (err as Error).message));
    }
  }
}
