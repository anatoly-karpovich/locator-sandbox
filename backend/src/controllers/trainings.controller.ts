import { HTTP_CODES } from "../data/httpCodes";
import { Request, Response } from "express";
import trainingTemplateService from "../services/training/trainingTemplate.service";

export class TrainingsController {
  getCatalog(req: Request, res: Response) {
    const catalog = trainingTemplateService.getCatalogView();
    return res.status(HTTP_CODES.OK).json(catalog);
  }
}
