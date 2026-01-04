import { Box, Stack, Typography } from "@mui/material";

export function TrainingsIntro() {
  return (
    <Box
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        p: 4,
        bgcolor: "background.paper",
      }}
    >
      <Stack spacing={2}>
        <Typography variant="h4" fontWeight={700}>
          Beginner trainings
        </Typography>

        <Typography color="text.secondary" maxWidth={720}>
          Guided practice focused on correct Playwright locator usage. Step-by-step tasks, hints, validation and
          explanations — designed to build intuition, not just make tests pass.
        </Typography>

        <Typography variant="body2" color="text.secondary">
          What to expect: semantic locators, strictness, exact vs partial matching, regex, filtering, collections and
          real-world trade-offs.
        </Typography>
      </Stack>
    </Box>
  );
}
