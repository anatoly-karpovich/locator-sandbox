import { Step } from "../ast-parser/types";
import { UsageCheckResult, UsageSpec } from "../tasks/types";
import { getArgumentType } from "../utils/getArgumentType";
import { isValidRegexSimple } from "../utils/isValidRegExp";

class UsageSpecification {
    private messages: Set<string> = new Set();

    public validate(steps: Step[], specs: UsageSpec): UsageCheckResult {
        const details: UsageCheckResult["details"] = {};

        const step = steps.find((step) => step.method === specs.method);
        if (!step) {
            details.method = {
                passed: false,
                expected: specs.method,
            }
            return { passed: false, details };
        }

        details.method = {
            passed: true,
            expected: specs.method,
            actual: step.method,
        };

        const actualArg = step.args[0];
        const actualArgType = getArgumentType(actualArg);
        const argTypePassed = actualArgType === specs.argument.type;

        details.argument = {
            passed: argTypePassed,
            expected: specs.argument.type,
            actual: actualArgType,
        };

        // if (specs.argument.match) {
        //     const isExactMatch = actualArg === true;

        //     if (specs.argument.match === "exact") {
        //         details.match = {
        //             passed: isExactMatch,
        //             expected: "exact",
        //             actual: options?.exact,
        //         };
        //     } else if (specs.argument.match === "partial") {
        //         details.match = {
        //             passed: !isExactMatch,
        //             expected: "partial",
        //             actual: isExactMatch ? "exact" : "partial",
        //         };
        //     }
        // }

        if (specs.options) {
            const actualOptions = step.args[1] as Record<string, unknown> | undefined;
            const optionsPassed = Object.entries(specs.options).every(([key, value]) => actualOptions?.[key] === value);
            details.options = {
                passed: optionsPassed,
                expected: specs.options,
                actual: actualOptions,
            };
        }

        const passed = Object.values(details).every((detail) => !!detail?.passed );

        return { passed, details };
    }

    public buildExplanation(result: UsageCheckResult): string[] {
        if (result.details.method && !result.details.method?.passed) {
            this.messages.add(`Expected method "${result.details.method?.expected}"`);
        }
        if (result.details.argument && !result.details.argument?.passed) {
            this.messages.add(`Expected argument type "${result.details.argument?.expected}", got "${result.details.argument?.actual}"`);
        }
        if (result.details.options && !result.details.options?.passed) {
            this.messages.add(`Expected options "${result.details.options?.expected}", got "${result.details.options?.actual}"`);
        }

        return Array.from(this.messages);
    }
}

export const usageSpecification = new UsageSpecification();