import { Locator } from "playwright";
import { LocatorService } from "../core/locator/locator.service";
import { ExpectationCheck, CompareResult } from "../core/tasks/types";
import { PlaygroundSubmitRequestDTO, IPlaygroundSubmitResponseDTO } from "../dto/playground.dto";
import { PlaywrightRunner } from "../core/playwright/playwright.runner";

export class PlaygroundService {
  constructor(private readonly playwrightRunner = new PlaywrightRunner()) {}

  async submit(dto: PlaygroundSubmitRequestDTO): Promise<IPlaygroundSubmitResponseDTO> {
    return this.playwrightRunner.run(async (page) => {
      await page.setContent(dto.html);

      const locatorService = new LocatorService(page);
      const locator = locatorService.createLocator(dto.locator);

      const count = await locator.count();

      if (count === 0) {
        return this.buildNotFoundResult();
      }

      const visible = await locator.first().isVisible();
      const element = await this.buildElementInfo(locator);

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
        element,
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
      element: null,
      result,
      explanation: ["Element not found"],
    };
  }

  private async buildElementInfo(locator: Locator) {
    const first = locator.first();

    return first.evaluate((el) => {
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
  }
}
