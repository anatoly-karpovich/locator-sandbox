import { HTTP_CODES } from "../core/httpCodes";
import { Request, Response } from "express";
import { TrainingTemplateService } from "../services";

export class TrainingsController {
  constructor(private trainingTemplateService: TrainingTemplateService = new TrainingTemplateService()) {}
  getCatalog(req: Request, res: Response) {
    const catalog = this.trainingTemplateService.getCatalogView();
    return res.status(HTTP_CODES.OK).json(catalog);
  }
}
