export type ErrorResponse = {
  error: string;
};

export type TaskCatalogTopic = {
  id: string;
  title: string;
  taskCount: number;
  difficulties: string[];
  hasUsageSpec: boolean;
};

export type TaskCatalogSection = {
  id: string;
  title: string;
  topics: TaskCatalogTopic[];
};

export type TaskCatalogModule = {
  id: string;
  title: string;
  sections: TaskCatalogSection[];
};

export type TasksCatalogResponse = {
  modules: TaskCatalogModule[];
};

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

export type Expectations = {
  count?: number;
  visible?: boolean;
  text?: string;
  hidden?: boolean;
  enabled?: boolean;
  editable?: boolean;
  checked?: boolean;
};

export type TaskStudyMaterial = {
  title: string;
  url: string;
};

export type TaskUsageSpec = {
  method: string;
  argument?: {
    type: "string" | "regex";
  };
  options?: Record<string, unknown>;
};

export type TaskResponse = {
  task: {
    id: string;
    title: string;
    description: string;
    topicId: string;
    difficulty: string;
    studyMaterials: TaskStudyMaterial[];
    html: string;
    expectations: Expectations;
    usageSpec?: TaskUsageSpec;
    heuristics?: string[];
  };
};

export type TrainingRunTaskResult = {
  status: string;
  attempts: number;
  lastAttempt: {
    result: {
      passed: boolean;
      checks: Array<{
        key: string;
        expected: unknown;
        actual?: unknown;
        passed: boolean;
      }>;
    };
    explanation?: string[];
    payload?: string;
    createdAt: string;
  } | null;
};

export type TrainingRunResponse = {
  id: string;
  type: string;
  status: string;
  title?: string;
  templateId?: string;
  createdAt: string;
  userId?: string;
  topics: Array<{
    id: string;
    title: string;
    tasks: Array<{
      id: string;
      title: string;
      result: TrainingRunTaskResult;
    }>;
  }>;
};

export type TrainingRunSubmitResponse = {
  result: {
    passed: boolean;
    checks: Array<{
      key: string;
      expected: unknown;
      actual?: unknown;
      passed: boolean;
    }>;
  };
  explanation?: string[];
};

export type PlaygroundSubmitResponse = {
  explanation?: string[];
  elements: Array<{
    tagName: string;
    text: string | null;
    attributes: Record<string, string>;
    visible: boolean;
  }>;
};
