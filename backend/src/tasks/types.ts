export type Expectations = {
  count?: number;
  visible?: boolean;
  text?: string;
};

export type ExpectationCheck = {
  key: keyof Expectations;
  expected: unknown;
  actual: unknown;
  passed: boolean;
};

export type Task = {
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
  count: number | null;
  visible?: boolean | null;
};

export type CompareResult = {
  passed: boolean;
  checks: ExpectationCheck[];
};
