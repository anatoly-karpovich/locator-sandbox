export type Expectations = {
  count?: number;
  visible?: boolean;
  text?: string;
  hidden?: boolean;
  enabled?: boolean;
  editable?: boolean;
  checked?: boolean;
};

export type ExpectationsValues = Expectations[keyof Expectations];

export type ExpectationCheck = {
  key: keyof Expectations;
  expected: unknown;
  actual: unknown;
  passed: boolean;
};

export type Module = "Locator" | "GetBy" | "Filters&Relations";

export type Task = {
  module: Module;
  id: number;
  title: string;
  html: string;

  expectations: Expectations;

  context: {
    goal: "single" | "collection" | "nth";
    allowNth: boolean;
    preferRole: boolean;
  };

  heuristics?: string[];
};

export type ExecutionResult = {
  count: Expectations["count"];
  visible: Expectations["visible"];
  text: Expectations["text"];
  hidden: Expectations["hidden"];
  enabled: Expectations["enabled"];
  editable: Expectations["editable"];
  checked: Expectations["checked"];
};

export type CompareResult = {
  passed: boolean;
  checks: ExpectationCheck[];
};
