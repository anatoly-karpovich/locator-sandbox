import { Box, Chip, Stack, Typography } from "@mui/material";

export function FormsSection() {
  return (
    <Box
      id="forms"
      sx={{
        borderRadius: "var(--radius-lg)",
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
        padding: { xs: 3, md: 5 },
      }}
    >
      <Stack spacing={2}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="h4">Forms</Typography>
          <Chip label="Soon" size="small" />
        </Stack>
        <Typography variant="body1" color="text.secondary">
          Forms training is coming next. The plan is to cover form state, validation edge cases, and reliable input
          strategies across dynamic UIs.
        </Typography>
      </Stack>
    </Box>
  );
}
