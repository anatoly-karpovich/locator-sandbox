import { Box, Divider, Paper, Typography } from "@mui/material";

type PlaygroundPreviewSectionProps = {
  html: string;
};

export function PlaygroundPreviewSection({ html }: PlaygroundPreviewSectionProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        width: "100%",
        padding: 2,
        bgcolor: "background.paper",
        borderColor: "divider",
        minHeight: 320,
        maxHeight: 520,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: { xs: "none", md: 0 },
      }}
    >
      <Typography variant="h6" gutterBottom>
        UI preview
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box
        sx={{
          padding: 1,
          bgcolor: (theme) => (theme.palette.mode === "dark" ? "#0f1116" : "#edf0f7"),
          borderRadius: 1,
          border: "1px dashed",
          borderColor: "divider",
          minHeight: 250,
          maxHeight: 420,
          overflow: "auto",
          flex: 1,
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Paper>
  );
}
