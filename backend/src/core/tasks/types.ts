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

export type UsageCheckResult = {
  passed: boolean;
  details: {
    method?: CheckDetail;
    argument?: CheckDetail;
    match?: CheckDetail;
    options?: CheckDetail;
  };
};

export type CheckDetail = {
  passed: boolean;
  expected: unknown;
  actual?: unknown;
};

export type UsageSpec = {
  method: "getByText" | "getByRole" | "locator";
  argument: {
    type: "string" | "regex";
    match?: "exact" | "partial";
    value?: string | RegExp;
  };
  options?: Record<string, unknown>;
};

export type TaskId = string; // UUID

export type Difficulty = "beginner" | "intermediate" | "advanced";

export type Task = {
  id: TaskId;
  title: string;
  description: string;
  scope: {
    module: string; // e.g. "locators"
    section: string; // e.g. "getBy"
    topic?: string; // e.g. "exact-match"
  };
  difficulty: Difficulty;
  studyMaterials: {
    title: string;
    url: string;
  }[];
  html: string;

  expectations: Expectations;
  usageSpec?: UsageSpec;
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
