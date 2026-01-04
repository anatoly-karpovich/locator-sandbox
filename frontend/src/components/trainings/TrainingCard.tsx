import { Box, Button, Stack, Typography, Chip } from "@mui/material";

type TrainingCardProps = {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  tasksCount: number;
  example?: string;
  href: string;
  isAdvanced?: boolean;
  onStart?: (templateId: string) => void;
};

export function TrainingCard({
  id,
  title,
  description,
  difficulty,
  tasksCount,
  example,
  href,
  isAdvanced,
  onStart,
}: TrainingCardProps) {
  const handleClick = () => {
    if (onStart) {
      onStart(id);
    }
  };

  return (
    <Box
      sx={{
        flex: "1 1 420px",
        maxWidth: 250,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        p: 3,
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Stack spacing={2} flexGrow={1}>
        <Typography variant="h6" fontWeight={700}>
          {title}
        </Typography>

        <Stack direction="row" spacing={1}>
          <Chip
            size="small"
            label={difficulty}
            color={difficulty === "Beginner" ? "success" : difficulty === "Intermediate" ? "warning" : "error"}
          />
          <Chip size="small" label={`~${tasksCount} tasks`} />
        </Stack>

        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>

        {example && (
          <Typography variant="caption" color="text.secondary">
            Example: <code>{example}</code>
          </Typography>
        )}
      </Stack>

      <Button
        variant={isAdvanced ? "outlined" : "contained"}
        sx={{ mt: 3, alignSelf: "flex-start" }}
        href={onStart ? undefined : href}
        onClick={handleClick}
      >
        {isAdvanced ? "Enter" : "Start training"}
      </Button>
    </Box>
  );
}
