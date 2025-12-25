import type { ModuleConfig } from "./types";

export const modulesConfig: ModuleConfig[] = [
  {
    id: "GetBy",
    name: "getBy*",
    description: "Работа с getByText / getByRole и их опциями.",
    taskIds: [],
  },
  {
    id: "locator",
    name: "locator()",
    description: "Базовые селекторы через locator() и фильтры.",
    taskIds: [],
  },
  {
    id: "filters",
    name: "Filters & relations",
    description: "has / hasText, nth, first/last и композиции.",
    taskIds: [],
  },
];
