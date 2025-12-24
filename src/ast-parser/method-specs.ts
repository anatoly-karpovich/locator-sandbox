import { GET_BY_TEXT_KEYS, GET_BY_ROLE_KEYS } from "./options";
import { readLocatorOptions } from "./readLocatorOptions";
import { MethodSpec, Step, GetByTextOptions, GetByRoleOptions } from "./types";
import { assertArgCount, readString, readNonNegativeInt, readObjectLiteral } from "./validators";

/**
 * -------------------------
 * Extensibility Layer
 * -------------------------
 * Add methods by extending METHOD_SPECS.
 */
export const METHOD_SPECS: Record<string, MethodSpec> = {
  locator: {
    allowedReceivers: ["page", "locator"],
    nextReceiver: "locator",
  buildStep: (receiver, args, parseFromAst): Step => {
    if (args.length < 1 || args.length > 2) {
      throw new Error("locator(selector, options?) expects 1 or 2 args");
    }

    const selector = readString(args[0], "locator(selector)");
    const options = args[1]
      ? readLocatorOptions(args[1], parseFromAst, "locator(options)")
      : undefined;

    return { receiver, method: "locator", args: [selector, options] };
  },
  },

  first: {
    allowedReceivers: ["locator"],
    nextReceiver: "locator",
    buildStep: (receiver, args): Step => {
      assertArgCount("first", args, 0);
      return { receiver, method: "first", args: [] };
    },
  },

  last: {
    allowedReceivers: ["locator"],
    nextReceiver: "locator",
    buildStep: (receiver, args): Step => {
      assertArgCount("last", args, 0);
      return { receiver, method: "last", args: [] };
    },
  },

  nth: {
    allowedReceivers: ["locator"],
    nextReceiver: "locator",
    buildStep: (receiver, args): Step => {
      assertArgCount("nth", args, 1);
      const idx = readNonNegativeInt(args[0], "nth(index)");
      return { receiver, method: "nth", args: [idx] };
    },
  },

  getByText: {
    allowedReceivers: ["page", "locator"],
    nextReceiver: "locator",
    buildStep: (receiver, args): Step => {
      if (args.length < 1 || args.length > 2) {
        throw new Error("getByText(text, options?) expects 1 or 2 args");
      }
      const text = readString(args[0], "getByText(text)");
      const options = args[1] ? readObjectLiteral(args[1], GET_BY_TEXT_KEYS, "getByText(options)") : undefined;
      return { receiver, method: "getByText", args: [text, options as GetByTextOptions] };
    },
  },

  getByRole: {
    allowedReceivers: ["page", "locator"],
    nextReceiver: "locator",
    buildStep: (receiver, args): Step => {
      if (args.length < 1 || args.length > 2) {
        throw new Error("getByRole(role, options?) expects 1 or 2 args");
      }
      const role = readString(args[0], "getByRole(role)");
      const options = args[1] ? readObjectLiteral(args[1], GET_BY_ROLE_KEYS, "getByRole(options)") : undefined;
      return { receiver, method: "getByRole", args: [role, options as GetByRoleOptions] };
    },
  },
};