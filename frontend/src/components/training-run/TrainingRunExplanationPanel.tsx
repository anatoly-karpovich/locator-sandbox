import { Box, Stack, Typography } from "@mui/material";

type TrainingRunExplanationPanelProps = {
  explanations: string[];
};

export function TrainingRunExplanationPanel({ explanations }: TrainingRunExplanationPanelProps) {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: "var(--radius-md)",
        padding: 2,
        border: 1,
        borderColor: "divider",
        boxShadow: { xs: "none", md: 0 },
      }}
    >
      <Typography variant="h6" gutterBottom>
        Explanation
      </Typography>
      {explanations.length > 0 ? (
        <Stack spacing={0.5}>
          {explanations.map((line, idx) => (
            <Typography key={idx} variant="body2">
              {line}
            </Typography>
          ))}
        </Stack>
      ) : (
        <Typography variant="body2" color="text.secondary">
          No explanations yet.
        </Typography>
      )}
    </Box>
  );
}
