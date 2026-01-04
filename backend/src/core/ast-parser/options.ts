import { KeySchema } from "./types";

export const GET_BY_TEXT_KEYS: KeySchema = {
  exact: "boolean?",
};

export const GET_BY_ALT_TEXT_KEYS: KeySchema = {
  exact: "boolean?",
};

export const GET_BY_LABEL_KEYS: KeySchema = {
  exact: "boolean?",
};

export const GET_BY_PLACEHOLDER_KEYS: KeySchema = {
  exact: "boolean?",
};

export const GET_BY_ROLE_KEYS: KeySchema = {
  name: "string|regex?",
  exact: "boolean?",
  checked: "boolean?",
  pressed: "boolean?",
  selected: "boolean?",
  expanded: "boolean?",
  includeHidden: "boolean?",
  level: "number?",
  disabled: "boolean?",
};
