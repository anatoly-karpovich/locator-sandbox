import { Page, Locator } from "playwright";
import { LocatorOptions, ParsedPlan, Step } from "../ast-parser";
import { LocatorBuilderError } from "../../error/locatorBuild.error";

export class LocatorBuilder {
  constructor(private readonly page: Page) {}

  build(plan: ParsedPlan): Locator {
    let receiver: Page | Locator = this.page;

    for (const step of plan.steps) {
      receiver = this.applyStep(receiver, step);
    }

    if (!this.isLocator(receiver)) {
      throw new LocatorBuilderError("LocatorBuilder did not produce a Locator");
    }

    return receiver;
  }

  private applyStep(receiver: Page | Locator, step: Step): Locator {
    switch (step.method) {
      case "locator":
        return receiver.locator(step.args[0], this.buildLocatorOptions(step.args[1]));

      case "first":
        this.assertLocator(receiver, "first");
        return receiver.first();

      case "last":
        this.assertLocator(receiver, "last");
        return receiver.last();

      case "nth":
        this.assertLocator(receiver, "nth");
        return receiver.nth(step.args[0]);

      case "getByText":
        return receiver.getByText(step.args[0], step.args[1]);

      case "getByRole":
        return receiver.getByRole(step.args[0], step.args[1]);

      case "getByAltText":
        return receiver.getByAltText(step.args[0], step.args[1]);

      case "getByLabel":
        return receiver.getByLabel(step.args[0], step.args[1]);

      case "getByPlaceholder":
        return receiver.getByPlaceholder(step.args[0], step.args[1]);

      case "getByTestId":
        return receiver.getByTestId(step.args[0]);

      default: {
        const _never: never = step;
        throw new LocatorBuilderError(`Unhandled step method: ${(step as any).method}`);
      }
    }
  }

  private buildLocatorOptions(options?: LocatorOptions) {
    if (!options) return undefined;

    return {
      ...(options.has && { has: this.build(options.has) }),
      ...(options.hasNot && { hasNot: this.build(options.hasNot) }),
      ...(options.hasText && { hasText: options.hasText }),
      ...(options.hasNotText && { hasNotText: options.hasNotText }),
    };
  }

  private assertLocator(receiver: Page | Locator, method: string): asserts receiver is Locator {
    if (!this.isLocator(receiver)) {
      throw new LocatorBuilderError(`${method}() can only be called on Locator`);
    }
  }

  private isLocator(obj: Page | Locator): obj is Locator {
    return typeof (obj as Locator).first === "function";
  }
}
