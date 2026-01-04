import { Box } from "@mui/material";
import { TrainingCard } from "./TrainingCard";

export function TrainingsGrid() {
  return (
    <Box display="flex" flexWrap="wrap" gap={3}>
      <TrainingCard
        title="GetBy"
        description="Practice Playwright semantic locators: partial vs exact, regex, visibility and strictness."
        difficulty="Beginner"
        tasksCount={12}
        example="getByText(/^Submit$/)"
        href="/playwright/trainings/getby"
      />

      <TrainingCard
        title="Locator API"
        description="Core locator chaining and options. Understand when CSS helps and when it hurts."
        difficulty="Beginner"
        tasksCount={10}
        example="locator('tr', { hasText: /Total/ })"
        href="/playwright/trainings/locator"
      />

      <TrainingCard
        title="Filtering"
        description="Master filter(), has, hasText and nested locators. Build robust queries."
        difficulty="Intermediate"
        tasksCount={14}
        example=".filter({ has: page.getByRole(...) })"
        href="/playwright/trainings/filter"
      />

      <TrainingCard
        title="Advanced"
        description="Bad markup, ambiguous matches, multiple valid solutions. Focus on maintainability."
        difficulty="Advanced"
        tasksCount={20}
        example="commit-worthy locator"
        href="/playwright/challenges"
        isAdvanced
      />
    </Box>
  );
}
