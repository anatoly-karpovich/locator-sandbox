export type Expectations = {
  count?: number;
  visible?: boolean;
  enabled?: boolean;
  text?: string | null;
};

export type Task = {
  module: string;
  id: string;
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

export type TaskMap = Record<string, Task>;

export type TaskSummary = {
  id: string;
  title: string;
};

export type ModuleConfig = {
  id: string;
  name: string;
  description: string;
  taskIds: string[];
};

export type SubmitSolutionBody = {
  taskId: string;
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

// Trainings catalog (templates grouped by module/section)
export type TrainingCatalogResponse = {
  modules: TrainingCatalogModule[];
};

export type TrainingCatalogModule = {
  id: string;
  title: string;
  sections: TrainingCatalogSection[];
};

export type TrainingCatalogSection = {
  id: string;
  title: string;
  trainings: TrainingCatalogItem[];
};

export type TrainingCatalogItem = {
  id: string;
  title: string;
  description?: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  taskCount: number;
};

export type TrainingRunStatus = "not_started" | "in_progress" | "completed";
export type TrainingRunTaskStatus = "not_started" | "in_progress" | "passed" | "failed";

export type TrainingRunTask = {
  id: string;
  title: string;
  result: {
    status: TrainingRunTaskStatus;
    attempts: number;
  };
};

export type TrainingRunTopic = {
  id: string;
  title: string;
  tasks: TrainingRunTask[];
};

export type TrainingRun = {
  id: string;
  type: "template" | "custom";
  status: TrainingRunStatus;
  title?: string;
  templateId?: string;
  topics: TrainingRunTopic[];
  createdAt: string;
};

// Playground
export type PlaygroundSubmitRequest = {
  html: string;
  payload: string;
};

export type PlaygroundElement = {
  tagName: string;
  text: string | null;
  attributes: Record<string, string>;
};

export type PlaygroundSubmitResponse = {
  result: TaskResultPayload;
  explanation?: string[];
  elements: PlaygroundElement[];
};

export type PaletteMode = "light" | "dark";

export type BasePageProps = {
  themeMode: PaletteMode;
  onToggleTheme: () => void;
};
