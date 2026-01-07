import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PlaywrightModes from "./PlaywrightModes";
import { PlaywrightExamples } from "./PlaywrightExamples";

export function PlaywrightSection() {
  const navigate = useNavigate();

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
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="h3">Playwright</Typography>
            <Typography variant="body1" color="text.secondary" maxWidth={900} sx={{ mt: 1 }}>
              Locator thinking, not selector guessing. Train getBy*, locator(), filtering and chaining - from beginner
              drills to real-world challenges.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            <Button variant="contained" onClick={() => navigate("/playwright/trainings")}>
              Beginner trainings
            </Button>
            <Button variant="outlined" onClick={() => navigate("/playwright/playground")}>
              Playground
            </Button>
          </Stack>
        </Stack>

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
