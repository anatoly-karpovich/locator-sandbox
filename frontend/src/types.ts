export type Expectations = {
  count?: number;
  visible?: boolean;
  enabled?: boolean;
  text?: string | null;
};

export type Task = {
  module: string;
  id: number;
  title: string;
  description: string;
  studyMaterials: {
    title: string;
    url: string;
  }[];
  html: string;
  expectations: Expectations;
  heuristics?: string[];
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
      explanation?: string[];
    }
  | {
      stage: "task";
      presence: PresenceInfo;
      taskResult: TaskResultPayload;
      explanation?: string[];
    }
  | {
      isSuccess: boolean;
      result?: TaskResultPayload;
      ErrorMessage?: string;
      presence?: PresenceInfo;
      explanation?: string[];
    };

// Curriculum
export type CurriculumResponse = {
  version: string;
  modules: ModuleNode[];
};

export type ModuleNode = {
  id: string;
  title: string;
  sections: SectionNode[];
};

export type SectionNode = {
  id: string;
  title: string;
  topics: TopicNode[];
};

export type TopicNode = {
  id: string;
  title: string;
  level: "beginner" | "intermediate" | "advanced";
  tasksCount: number;
  tasks?: { id: number; title: string }[];
};
