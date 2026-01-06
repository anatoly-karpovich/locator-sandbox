import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { PlaygroundSubmitRequestDTO, IPlaygroundSubmitResponseDTO } from "../dto/playground.dto";
import { IPlaygroundService } from "../services/playground.service";
import { ErrorResponseDTO } from "../dto/common.dto";
import { HTTP_CODES } from "../core/httpCodes";
import { TYPES } from "../container/types";

@injectable()
export class PlaygroundController {
  constructor(@inject(TYPES.PlaygroundService) private playgroundService: IPlaygroundService) {}
  async submit(
    req: Request<{}, {}, PlaygroundSubmitRequestDTO>,
    res: Response<IPlaygroundSubmitResponseDTO | ErrorResponseDTO>
  ) {
    const dto = req.body;
    try {
      const result = await this.playgroundService.submit(dto);
      return res.status(HTTP_CODES.OK).json(result);
    } catch (err) {
      return res.status(HTTP_CODES.BAD_REQUEST).json({ error: (err as Error).message });
    }
  }
}
