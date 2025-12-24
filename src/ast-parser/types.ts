import * as t from "@babel/types";

export type ReceiverKind = "page" | "locator";

export type Step =
  | { receiver: ReceiverKind; method: "locator"; args: [string, LocatorOptions?] }
  | { receiver: ReceiverKind; method: "first"; args: [] }
  | { receiver: ReceiverKind; method: "last"; args: [] }
  | { receiver: ReceiverKind; method: "nth"; args: [number] }
  | { receiver: ReceiverKind; method: "getByText"; args: [string, GetByTextOptions?] }
  | { receiver: ReceiverKind; method: "getByRole"; args: [string, GetByRoleOptions?] };

export type ParsedPlan = {
  root: "page";
  steps: Step[];
};

export type GetByTextOptions = {
  exact?: boolean;
};

export type GetByRoleOptions = {
  name?: string;
  exact?: boolean;
  checked?: boolean;
  pressed?: boolean;
  selected?: boolean;
  expanded?: boolean;
  includeHidden?: boolean;
  level?: number;
  disabled?: boolean;
};

export type RawCall = {
  // Base expression the method is called on (identifier or nested call)
  base: t.Expression;
  method: string;
  args: t.Expression[];
};

export type MethodSpec = {
  allowedReceivers: ReceiverKind[];
  nextReceiver: ReceiverKind; // receiver after applying this method
  buildStep: (
    receiver: ReceiverKind,
    args: t.Expression[],
    parseFromAst: (node: t.Expression) => ParsedPlan
  ) => Step;
}

export type Literal =
  | string
  | number
  | boolean
  | null
  | Literal[]
  | { [k: string]: Literal };

export type AllowedType =
  | "string"
  | "number"
  | "boolean"
  | "null"
  | "array"
  | "object";

export type SchemaAtom = `${AllowedType}${"" | "?"}`; // e.g. "boolean?" means optional

export type KeySchema = Record<string, SchemaAtom>;

export type LocatorText = string | RegExp;

export type LocatorOptions = {
  has?: ParsedPlan;
  hasNot?: ParsedPlan;
  hasText?: LocatorText;
  hasNotText?: LocatorText;
};