import * as t from "@babel/types";

export type ReceiverKind = "page" | "locator";

export type Step =
  | { receiver: ReceiverKind; method: "locator"; args: [string, LocatorOptions?] }
  | { receiver: ReceiverKind; method: "filter"; args: [LocatorOptions?] }
  | { receiver: ReceiverKind; method: "first"; args: [] }
  | { receiver: ReceiverKind; method: "last"; args: [] }
  | { receiver: ReceiverKind; method: "nth"; args: [number] }
  | { receiver: ReceiverKind; method: "getByText"; args: [string | RegExp, GetByTextOptions?] }
  | { receiver: ReceiverKind; method: "getByRole"; args: [GetByRoleArgument, GetByRoleOptions?] }
  | { receiver: ReceiverKind; method: "getByAltText"; args: [string | RegExp, GetByAltTextOptions?] }
  | { receiver: ReceiverKind; method: "getByLabel"; args: [string | RegExp, GetByLabelOptions?] }
  | { receiver: ReceiverKind; method: "getByPlaceholder"; args: [string | RegExp, GetByPlaceholderOptions?] }
  | { receiver: ReceiverKind; method: "getByTitle"; args: [string | RegExp, GetByTitleOptions?] }
  | { receiver: ReceiverKind; method: "getByTestId"; args: [string | RegExp] }

export type ParsedPlan = {
  root: "page";
  steps: Step[];
  errors: string[];
};

export interface ExactMatchOption {
  exact?: boolean;
}

export interface GetByAltTextOptions extends ExactMatchOption {}

export interface GetByLabelOptions extends ExactMatchOption {}

export interface GetByPlaceholderOptions extends ExactMatchOption {}

export interface GetByTitleOptions extends ExactMatchOption {}

export interface GetByTextOptions extends ExactMatchOption {}

export interface GetByRoleOptions extends ExactMatchOption {
  name?: string | RegExp;
  checked?: boolean;
  disabled?: boolean;
  pressed?: boolean;
  selected?: boolean;
  expanded?: boolean;
  includeHidden?: boolean;
  level?: number;
};

export type GetByRoleArgument = "alert" | "alertdialog" | "application" | "article" | "banner" | "blockquote" | "button" | "caption" | "cell" | "checkbox" | "code" | "columnheader" | "combobox" | "complementary" | "contentinfo" | "definition" | "deletion" | "dialog" | "directory" | "document" | "emphasis" | "feed" | "figure" | "form" | "generic" | "grid" | "gridcell" | "group" | "heading" | "img" | "insertion" | "link" | "list" | "listbox" | "listitem" | "log" | "main" | "marquee" | "math" | "meter" | "menu" | "menubar" | "menuitem" | "menuitemcheckbox" | "menuitemradio" | "navigation" | "none" | "note" | "option" | "paragraph" | "presentation" | "progressbar" | "radio" | "radiogroup" | "region" | "row" | "rowgroup" | "rowheader" | "scrollbar" | "search" | "searchbox" | "separator" | "slider" | "spinbutton" | "status" | "strong" | "subscript" | "superscript" | "switch" | "tab" | "table" | "tablist" | "tabpanel" | "term" | "textbox" | "time" | "timer" | "toolbar" | "tooltip" | "tree" | "treegrid" | "treeitem";

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
  | RegExp
  | { [k: string]: Literal };

export type AllowedType =
  | "string"
  | "number"
  | "boolean"
  | "null"
  | "array"
  | "object"
  | "string|regex";

export type SchemaAtom = `${AllowedType}${"" | "?"}`; // e.g. "boolean?" means optional

export type KeySchema = Record<string, SchemaAtom>;

export type LocatorText = string | RegExp;

export type LocatorOptions = {
  has?: ParsedPlan;
  hasNot?: ParsedPlan;
  hasText?: LocatorText;
  hasNotText?: LocatorText;
  visible?: boolean;
};
