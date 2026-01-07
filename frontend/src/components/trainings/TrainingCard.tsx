import { Box, Button, Stack, Typography, Chip } from "@mui/material";
import { alpha } from "@mui/material/styles";

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
        minWidth: 240,
        maxWidth: { xs: "100%", sm: 360 },
        width: { xs: "100%", sm: "auto" },
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        p: 3,
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
        minHeight: 220,
        boxShadow: 0,
        transition: "0.15s ease",
        "&:hover": {
          borderColor: "primary.main",
          boxShadow: 4,
        },
      }}
    >
      <Stack spacing={1.5} flexGrow={1}>
        <Typography variant="h6" fontWeight={700}>
          {title}
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip
            size="small"
            label={difficulty}
            sx={{
              borderRadius: 999,
              border: "1px solid",
              borderColor:
                difficulty === "Beginner"
                  ? alpha("#3ddc97", 0.6)
                  : difficulty === "Intermediate"
                  ? alpha("#ffcc66", 0.6)
                  : alpha("#ff6b6b", 0.6),
              color:
                difficulty === "Beginner"
                  ? "#baf2dd"
                  : difficulty === "Intermediate"
                  ? "#ffe3a6"
                  : "#ffb3b3",
              backgroundColor:
                difficulty === "Beginner"
                  ? alpha("#3ddc97", 0.1)
                  : difficulty === "Intermediate"
                  ? alpha("#ffcc66", 0.1)
                  : alpha("#ff6b6b", 0.1),
            }}
          />
          <Chip size="small" label={`~${tasksCount} tasks`} />
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ wordBreak: "break-word" }}>
          {description}
        </Typography>

        {example && (
          <Typography variant="caption" color="text.secondary">
            Example: <code>{example}</code>
          </Typography>
        )}
      </Stack>

      <Box sx={{ pt: 2 }}>
        <Button
          fullWidth
          variant={isAdvanced ? "outlined" : "contained"}
          href={onStart ? undefined : href}
          onClick={handleClick}
        >
          {isAdvanced ? "Enter" : "Start training"}
        </Button>
      </Box>
    </Box>
  );
}
