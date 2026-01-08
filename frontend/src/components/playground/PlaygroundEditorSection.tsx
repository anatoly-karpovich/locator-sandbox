import { Divider, Paper, TextField, Typography } from "@mui/material";

type PlaygroundEditorSectionProps = {
  html: string;
  onHtmlChange: (value: string) => void;
};

export function PlaygroundEditorSection({ html, onHtmlChange }: PlaygroundEditorSectionProps) {
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
        boxShadow: { xs: "none", md: 0 },
      }}
    >
      <Typography variant="h6" gutterBottom>
        HTML code
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <TextField
        fullWidth
        multiline
        minRows={12}
        maxRows={18}
        value={html}
        onChange={(e) => onHtmlChange(e.target.value)}
        placeholder="<div>Hello</div>"
        InputProps={{
          sx: {
            fontFamily: "SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace",
            bgcolor: (theme) => (theme.palette.mode === "dark" ? "#0f1116" : "#f3f5fa"),
            "& textarea": {
              whiteSpace: "pre",
              overflow: "auto",
              maxHeight: 420,
            },
          },
        }}
      />
    </Paper>
  );
}
