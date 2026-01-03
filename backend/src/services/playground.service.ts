import { Locator } from "playwright";
import { LocatorService } from "../core/locator/locator.service";
import { ExpectationCheck, CompareResult } from "../core/tasks/types";
import { PlaygroundSubmitRequestDTO, IPlaygroundSubmitResponseDTO } from "../dto/playground.dto";
import { PlaywrightRunner } from "../core/playwright/playwright.runner";
import { AstParser } from "../core/ast-parser";

const MAX_ELEMENTS_PREVIEW = 10;

export class PlaygroundService {
  constructor(private readonly playwrightRunner = new PlaywrightRunner()) {}

  async submit(dto: PlaygroundSubmitRequestDTO): Promise<IPlaygroundSubmitResponseDTO> {
    return this.playwrightRunner.run(async (page) => {
      await page.setContent(dto.html);

      const locatorService = new LocatorService(page);
      const parsedPlan = AstParser.parse(dto.payload);
      const locator = locatorService.createLocator(parsedPlan);

      const count = await locator.count();

      // 🔴 NOT FOUND
      if (count === 0) {
        return this.buildNotFoundResult();
      }

      // 🟢 FOUND
      const visible = await locator.first().isVisible();
      const elements = await this.buildElementsInfo(locator, count);

      const checks: ExpectationCheck[] = [
        {
          key: "count",
          expected: undefined,
          actual: count,
          passed: true,
        },
        {
          key: "visible",
          expected: undefined,
          actual: visible,
          passed: true,
        },
      ];

      const result: CompareResult = {
        passed: true,
        checks,
      };

      return {
        elements,
        result,
      };
    });
  }

  private buildNotFoundResult(): IPlaygroundSubmitResponseDTO {
    const checks: ExpectationCheck[] = [
      {
        key: "count",
        expected: undefined,
        actual: 0,
        passed: false,
      },
      {
        key: "visible",
        expected: undefined,
        actual: false,
        passed: false,
      },
    ];

    const result: CompareResult = {
      passed: false,
      checks,
    };

    return {
      elements: [],
      result,
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
      const info = await locator.nth(i).evaluate((el) => {
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

      elements.push(info);
    }

    return elements;
  }
}
