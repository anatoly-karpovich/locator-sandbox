import type { ModuleConfig } from "./types";

export const modulesConfig: ModuleConfig[] = [
  {
    id: "locator",
    name: "locator()",
    description: "Основы поиска элементов через locator() и базовые фильтры.",
    taskIds: [1],
  },
  {
    id: "get-by",
    name: "getBy*",
    description: "Работа с getByRole, getByText и связанными стратегиями.",
    taskIds: [],
  },
  {
    id: "filters",
    name: "Filters & relations",
    description: "Комбинации с has, hasText, nth, first/last.",
    taskIds: [],
  },
];
