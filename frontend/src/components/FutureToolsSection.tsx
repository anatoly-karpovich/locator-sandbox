import { Paper, Typography } from "@mui/material";

export function FutureToolsSection() {
  return (
    <Paper variant="outlined" sx={{ mt: 4, p: 4, borderRadius: "var(--radius-lg)" }}>
      <Typography variant="h5" fontWeight={700}>
        More tools coming
      </Typography>

      <Typography color="text.secondary" mt={1}>
        Cypress component testing, API sandbox and more — all built around practical automation mindset.
      </Typography>
    </Paper>
  );
}
