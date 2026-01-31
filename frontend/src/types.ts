export type Expectations = {
  count?: number;
  visible?: boolean;
  enabled?: boolean;
  text?: string | null;
  placeholder?: string | null;
};

export type UsageSpec = {
  method:
    | "getByText"
    | "getByRole"
    | "getByAltText"
    | "getByLabel"
    | "getByPlaceholder"
    | "getByTestId"
    | "getByTitle"
    | "locator"
    | "filter";
  argument?: {
    type: "string" | "regex";
    match?: "exact" | "partial";
    value?: string;
  };
  options?: Record<string, unknown>;
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
  usageSpec?: UsageSpec;
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

// Trainings catalog (templates grouped by section)
export type TrainingCatalogResponse = {
  catalog: TrainingCatalogSection[];
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
export type TrainingRunTaskStatus = "not_started" | "in_progress" | "passed" | "passed_with_notes" | "failed";

export type TrainingRunTask = {
  id: string;
  title: string;
  result: {
    status: TrainingRunTaskStatus;
    attempts: number;
    lastAttempt: {
      result: TaskResultPayload;
      explanation?: string[];
      payload?: string;
      createdAt: string;
    } | null;
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
  visible: boolean;
};

export type PlaygroundSubmitSuccess = {
  explanation?: string[];
  elements: PlaygroundElement[];
};

export type PlaygroundSubmitError = {
  error: string;
  details?: string;
};

export type PlaygroundSubmitResponse = PlaygroundSubmitSuccess | PlaygroundSubmitError;

export type PaletteMode = "light" | "dark";

export type BasePageProps = {
  themeMode: PaletteMode;
  onToggleTheme: () => void;
};
