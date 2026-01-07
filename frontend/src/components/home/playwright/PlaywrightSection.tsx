import { Box, Stack, Typography } from "@mui/material";
import PlaywrightModes from "./PlaywrightModes";
import { PlaywrightExamples } from "./PlaywrightExamples";

export function PlaywrightSection() {
  return (
    <Box
      id="playwright"
      sx={{
        width: "100%",
        margin: 0,
        p: { xs: 3, md: 5 },
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <Stack spacing={4}>
        <Box>
          <Typography variant="h3">Playwright</Typography>
          <Typography variant="body1" color="text.secondary" maxWidth={900} sx={{ mt: 1 }}>
            Locator thinking, not selector guessing. Train getBy*, locator(), filtering and chaining - from beginner
            drills to real-world challenges.
          </Typography>
        </Box>

        <PlaywrightExamples />

        <Box
          sx={{
            borderRadius: 3,
            padding: 2,
            backgroundColor: "background.default",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="subtitle1" fontWeight={600}>
            What you'll practice
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
            Strictness, exact vs partial, regex edge cases, filtering, has/hasText, collections, and choosing between
            readable and stable solutions depending on constraints.
          </Typography>
        </Box>

        <PlaywrightModes />
      </Stack>
    </Box>
  );
}
