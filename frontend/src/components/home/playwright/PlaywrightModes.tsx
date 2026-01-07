import { Box, Stack, Typography } from "@mui/material";
import PlaywrightModeCard from "./PlaywrightModeCard";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../../constants/routes";

export default function PlaywrightModes() {
  const navigate = useNavigate();
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} sx={{ marginBottom: 2 }}>
        Choose your mode
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} spacing={3} alignItems="stretch">
        <PlaywrightModeCard
          title="Beginner trainings"
          subtitle="Guided practice"
          description="Step-by-step tasks focused on correct Playwright locator usage and understanding semantic APIs."
          badges={["Beginner", "~40 tasks", "Hints enabled"]}
          actionLabel="Enter training"
          onClick={() => {
            navigate(APP_ROUTES.PLAYWRIGHT_TRAININGS);
          }}
        />

        <PlaywrightModeCard
          title="Challenges"
          subtitle="No hints. Real trade-offs"
          description="Realistic DOMs with multiple valid solutions. Your goal is to choose a locator you would be proud to commit."
          badges={["Advanced", "No hints", "Reasoning-focused"]}
          actionLabel="Enter challenges"
          isDisabled={true}
          onClick={() => {
            navigate(APP_ROUTES.PLAYWRIGHT_CHALLENGES);
          }}
        />

        <PlaywrightModeCard
          title="Playground"
          subtitle="Free exploration"
          description="Paste any HTML and test your locator instantly. Validate matches, visibility and why it passes or fails."
          badges={["Instant feedback", "No progress tracking"]}
          actionLabel="Open playground"
          onClick={() => {
            navigate(APP_ROUTES.PLAYWRIGHT_PLAYGROUND);
          }}
        />
      </Stack>
    </Box>
  );
}
