export type Expectations = {
  count?: number;
  visible?: boolean;
  text?: string | null;
};

export type Task = {
  id: number;
  title: string;
  html: string;
  expectations: Expectations;
};

export type TaskMap = Record<number, Task>;

export type TaskSummary = {
  id: number;
  title: string;
};

export type ModuleConfig = {
  id: string;
  name: string;
  description: string;
  taskIds: number[];
};

export type SubmitSolutionBody = {
  taskId: number;
  payload: string;
};

export type PresenceInfo = {
  attached: boolean;
  count: number | null;
};

export type CheckResult = {
  key: string;
  expected: unknown;
  actual: unknown;
  passed: boolean;
};

export type TaskResultPayload = {
  passed: boolean;
  checks: CheckResult[];
};

export type SolutionResponse =
  | {
      stage: "presence";
      presence: PresenceInfo;
    }
  | {
      stage: "task";
      presence: PresenceInfo;
      taskResult: TaskResultPayload;
    }
  | {
      isSuccess: boolean;
      result?: TaskResultPayload;
      ErrorMessage?: string;
      presence?: PresenceInfo;
    };
