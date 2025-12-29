// curriculum/curriculum.controller.ts

import { Request, Response } from "express";
import { HTTP_CODES } from "../data/httpCodes";
import curriculumService from "../services/curriculum/curriculum.service";

export class CurriculumController {
  get(req: Request, res: Response) {
    const { section, module, topic, level, includeTasks } = req.query;

    const data = curriculumService.getCurriculum({
      module: module as string | undefined,
      section: section as string | undefined,
      topic: topic as string | undefined,
      level: level as string | undefined,
      includeTasks: includeTasks === "true",
    });

    return res.status(HTTP_CODES.OK).json(data);
  }
}
