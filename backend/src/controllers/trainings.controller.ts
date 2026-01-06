import { inject, injectable } from "inversify";
import { HTTP_CODES } from "../core/httpCodes";
import { Request, Response } from "express";
import { ITrainingTemplateService } from "../services";
import { TrainingCatalogResponseDTO } from "../dto/trainings.dto";
import { ErrorResponseDTO } from "../dto/common.dto";
import { TYPES } from "../container/types";

@injectable()
export class TrainingsController {
  constructor(
    @inject(TYPES.TrainingTemplateService) private trainingTemplateService: ITrainingTemplateService
  ) {}
  getCatalog(req: Request, res: Response<TrainingCatalogResponseDTO | ErrorResponseDTO>) {
    try {
      const catalog = this.trainingTemplateService.getCatalogView();
      return res.status(HTTP_CODES.OK).json(catalog);
    } catch (err) {
      return res.status(HTTP_CODES.SERVER_ERROR).json({ error: (err as Error).message });
    }
  }
}
