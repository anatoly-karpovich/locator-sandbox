import { Box, Divider, Typography } from "@mui/material";

type TrainingRunHtmlSectionProps = {
  html: string;
};

export function TrainingRunHtmlSection({ html }: TrainingRunHtmlSectionProps) {
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
        boxShadow: { xs: "none", md: 0 },
      }}
    >
      <Typography variant="h6" gutterBottom>
        HTML code
      </Typography>
      <Divider sx={{ marginBottom: 2 }} />
      <Box
        component="pre"
        sx={{
          background: (theme) => (theme.palette.mode === "dark" ? "#0f1116" : "#f3f5fa"),
          color: (theme) => (theme.palette.mode === "dark" ? "#e3e8ff" : "#1f2937"),
          borderRadius: 1,
          padding: 2,
          fontFamily: "SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace",
          whiteSpace: "pre-wrap",
          maxHeight: 420,
          overflow: "auto",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        {html}
      </Box>
    </Box>
  );
}
