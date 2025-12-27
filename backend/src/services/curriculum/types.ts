// curriculum/types.ts

export type Curriculum = {
  version: string;
  modules: ModuleNode[];
};

export type ModuleNode = {
  id: string; // "locators"
  title: string; // "Locators"
  sections: SectionNode[];
};

export type SectionNode = {
  id: string; // "getBy"
  title: string; // "getBy"
  topics: TopicNode[];
};

export type TopicNode = {
  id: string; // "getByText"
  title: string; // "getByText"
  level: "beginner" | "intermediate" | "advanced";
  taskIds: number[];
};
