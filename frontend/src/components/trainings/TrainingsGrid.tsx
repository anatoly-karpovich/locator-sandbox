import { Box } from "@mui/material";
import { TrainingCard } from "./TrainingCard";
import type { TrainingCatalogItem } from "../../types";

type TrainingsGridProps = {
  trainings: TrainingCatalogItem[];
  onStart?: (templateId: string) => void;
};

function mapDifficulty(difficulty: "beginner" | "intermediate" | "advanced"): "Beginner" | "Intermediate" | "Advanced" {
  switch (difficulty) {
    case "beginner":
      return "Beginner";
    case "intermediate":
      return "Intermediate";
    case "advanced":
      return "Advanced";
  }
}

export function TrainingsGrid({ trainings, onStart }: TrainingsGridProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 2.5,
      }}
    >
      {trainings.map((training) => (
        <TrainingCard
          key={training.id}
          id={training.id}
          title={training.title}
          description={training.description ?? ""}
          difficulty={mapDifficulty(training.difficulty)}
          tasksCount={training.taskCount}
          href={`/playwright/training-run/${training.id}`}
          isAdvanced={training.difficulty === "advanced"}
          onStart={onStart}
        />
      ))}
    </Box>
  );
}
