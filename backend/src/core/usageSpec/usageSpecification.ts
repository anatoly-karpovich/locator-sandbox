import { Step } from "../ast-parser/types";
import { UsageCheckResult, UsageSpec } from "../tasks/types";
import { getArgumentType } from "../../utils/getArgumentType";

export default class UsageSpecification {
  private messages: Set<string> = new Set();

  public validate(steps: Step[], specs: UsageSpec): UsageCheckResult {
    const details: UsageCheckResult["details"] = {};

    const step = steps.find((step) => step.method === specs.method);
    if (!step) {
      details.method = { passed: false, expected: specs.method };
      return { passed: false, details };
    }

    details.method = {
      passed: true,
      expected: specs.method,
      actual: step.method,
    };

    const [inputArg, inputOptions] = step.args!;
    const actualArgType = getArgumentType(inputArg);

    details.argument = {
      passed: actualArgType === specs.argument.type,
      expected: specs.argument.type,
      actual: actualArgType,
    };

    if (specs.argument.match && specs.argument.value) {
      details.match = this.checkArgumentMatch(inputArg, specs.argument);
    }

    if (specs.options) {
      details.options = this.checkOptions(inputOptions, specs.options);
    }

    const passed = Object.values(details).every((detail) => detail?.passed);

    return { passed, details };
  }

  public buildExplanation(result: UsageCheckResult): string[] {
    if (result.details.method && !result.details.method?.passed) {
      this.messages.add(`Expected method "${result.details.method?.expected}"`);
    }
    if (result.details.argument && !result.details.argument?.passed) {
      this.messages.add(
        `Expected argument type "${result.details.argument?.expected}", got "${result.details.argument?.actual}" argument.`
      );
    }
    if (result.details.options && !result.details.options?.passed) {
      this.messages.add(
        `Expected options "${result.details.options?.expected}", got "${result.details.options?.actual}" options.`
      );
    }
    if (result.details.match && !result.details.match?.passed) {
      this.messages.add(
        `Expected value by "${result.details.match?.expected}" match, got "${result.details.match?.actual}" match.`
      );
    }

    const messages = Array.from(this.messages);
    this.clearMessages();

    return messages;
  }

  private checkArgumentMatch(actualArg: unknown, specArg: UsageSpec["argument"]): UsageCheckResult["details"]["match"] {
    const matchType = specArg.match!;
    const expectedValue = specArg.value;

    const passed =
      matchType === "exact"
        ? this.isExactMatch(actualArg, expectedValue)
        : this.isPartialMatch(actualArg, expectedValue);

    const actualMatch = !passed && matchType === "exact" ? "partial" : "exact";

    return { passed, expected: matchType, actual: actualMatch };
  }

  private isExactMatch(actual: unknown, expected: unknown): boolean {
    if (typeof actual === "string") return actual === expected;
    if (actual instanceof RegExp) return this.isRegexEqual(actual, expected);
    return false;
  }

  private isPartialMatch(actual: unknown, expected: unknown): boolean {
    if (typeof actual === "string" && typeof expected === "string") {
      return actual !== expected && expected.includes(actual);
    }
    if (actual instanceof RegExp) return this.isRegexEqual(actual, expected);
    return false;
  }

  private isRegexEqual(actual: RegExp, expected: unknown): boolean {
    return new RegExp(expected as string).toString() === actual.toString();
  }

  private checkOptions(
    actualOptions: unknown,
    expectedOptions: Record<string, unknown>
  ): UsageCheckResult["details"]["options"] {
    const opts = actualOptions as Record<string, unknown> | undefined;
    const passed = Object.entries(expectedOptions).every(([key, value]) => opts?.[key] === value);
    return {
      passed,
      expected: `{ ${Object.entries(expectedOptions)
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ")} }`,
      actual: `{ ${Object.entries(opts ?? {})
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ")} }`,
    };
  }

  private clearMessages() {
    this.messages.clear();
  }
}
