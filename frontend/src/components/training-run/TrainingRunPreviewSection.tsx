import { Box, Divider, Typography } from "@mui/material";
import { PreviewFrame } from "../common/PreviewFrame";

type TrainingRunPreviewSectionProps = {
  html: string;
};

export function TrainingRunPreviewSection({ html }: TrainingRunPreviewSectionProps) {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: 2,
        padding: 2,
        minHeight: 320,
        maxHeight: 520,
        border: 1,
        borderColor: "divider",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: { xs: "none", md: 0 },
      }}
    >
      <Typography variant="h6" gutterBottom>
        UI preview
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Box
        sx={{
          padding: 1,
          bgcolor: (theme) => (theme.palette.mode === "dark" ? "#0f1116" : "#edf0f7"),
          borderRadius: 1,
          border: "1px dashed",
          borderColor: "divider",
          minHeight: 250,
          maxHeight: 420,
          overflow: "hidden",
          flex: 1,
        }}
      >
        <PreviewFrame html={html} title="UI preview" />
      </Box>
    </Box>
  );
}
