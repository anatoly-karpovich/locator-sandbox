import { Locator } from "playwright";
import { inject, injectable } from "inversify";
import { LocatorHandler } from "@core/locator/locatorHandler.js";
import { PlaygroundSubmitRequestDTO, IPlaygroundSubmitResponseDTO } from "@dto/playground.dto.js";
import { AstParser } from "@core/ast-parser/index.js";
import { TYPES } from "../container/types.js";
import { IPlaygroundService } from "@services/types.js";
import { IPlaywrightRunner } from "@core/types.js";

const MAX_ELEMENTS_PREVIEW = 10;

@injectable()
export class PlaygroundService implements IPlaygroundService {
  constructor(@inject(TYPES.PlaywrightRunner) private readonly playwrightRunner: IPlaywrightRunner) {}

  async submit(dto: PlaygroundSubmitRequestDTO): Promise<IPlaygroundSubmitResponseDTO> {
    return this.playwrightRunner.run(async (page) => {
      await page.setContent(dto.html);

      const locatorService = new LocatorHandler(page);
      const parsedPlan = AstParser.parse(dto.payload);
      const locator = locatorService.createLocator(parsedPlan);

      const count = await locator.count();

      if (count === 0) {
        return this.buildNotFoundResult();
      }

      const elements = await this.buildElementsInfo(locator, count);

      return {
        elements,
      };
    });
  }

  private buildNotFoundResult(): IPlaygroundSubmitResponseDTO {
    return {
      elements: [],
      explanation: ["Element not found"],
    };
  }

  private async buildElementsInfo(
    locator: Locator,
    totalCount: number
  ): Promise<IPlaygroundSubmitResponseDTO["elements"]> {
    const limit = Math.min(totalCount, MAX_ELEMENTS_PREVIEW);
    const elements: IPlaygroundSubmitResponseDTO["elements"] = [];

    for (let i = 0; i < limit; i++) {
      const nth = locator.nth(i);
      const info = await nth.evaluate((el) => {
        const allowedAttrs = ["id", "class", "role", "data-testid", "name"];
        const attributes: Record<string, string> = {};

        for (const attr of el.attributes) {
          if (allowedAttrs.includes(attr.name)) {
            attributes[attr.name] = attr.value;
          }
        }

        return {
          tagName: el.tagName.toLowerCase(),
          text: el.textContent?.trim() || null,
          attributes,
        };
      });

      const visible = await nth.isVisible();

      elements.push({
        ...info,
        visible,
      });
    }

    return elements;
  }
}
