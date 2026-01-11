import { Box } from "@mui/material";
import { TrainingCard } from "./TrainingCard";
import type { TrainingCatalogItem } from "../../types";
import { APP_ROUTES } from "../../constants/routes";

type TrainingsGridProps = {
  trainings: TrainingCatalogItem[];
  onStart?: (templateId: string) => void;
  startingId?: string | null;
  isStarting?: boolean;
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

export function TrainingsGrid({ trainings, onStart, startingId, isStarting }: TrainingsGridProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(auto-fit, minmax(260px, 360px))",
        },
        gap: 2.5,
        justifyContent: { xs: "stretch", sm: "start" },
      }}
    >
      {trainings.map((training) => {
        const isActive = Boolean(isStarting) && startingId === training.id;
        const isDisabled = Boolean(isStarting) && startingId !== training.id;
        return (
          <TrainingCard
            key={training.id}
            id={training.id}
            title={training.title}
            description={training.description ?? ""}
            difficulty={mapDifficulty(training.difficulty)}
            tasksCount={training.taskCount}
            href={APP_ROUTES.PLAYWRIGHT_TRAINING_RUN(training.id)}
            isAdvanced={training.difficulty === "advanced"}
            onStart={onStart}
            isStarting={isActive}
            isDisabled={isDisabled}
          />
        );
      })}
    </Box>
  );
}
