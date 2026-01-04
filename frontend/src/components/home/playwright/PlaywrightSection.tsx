import { Box, Typography, Stack, Paper } from "@mui/material";
import PlaywrightModes from "./PlaywrightModes";

export function PlaywrightSection() {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        maxWidth: "90vw",
        margin: "0 auto",
        mt: 6,
        p: { xs: 3, md: 5 },
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <Box
        component="section"
        sx={{
          width: "100%",
          maxWidth: "90vw",
          margin: "0 auto",
          paddingY: 0,
        }}
      >
        {/* Header */}
        <Stack spacing={2} sx={{ marginBottom: 4 }}>
          <Typography variant="h3" fontWeight={800}>
            Playwright
          </Typography>

          <Typography variant="body1" color="text.secondary" maxWidth={900}>
            Train locator thinking, not selector guessing. Practice Playwright’s locator API from guided beginner drills
            to real-world challenges and free exploration.
          </Typography>
        </Stack>

        {/* Examples / tips placeholder */}
        <Box
          sx={{
            borderRadius: 3,
            padding: 3,
            marginBottom: 5,
            backgroundColor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="subtitle1" fontWeight={600}>
            What you’ll practice
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
            Semantic locators, strictness, partial vs exact matching, regex, filtering, collections, and choosing
            trade-offs you can maintain in real projects.
          </Typography>
        </Box>

        {/* Modes */}
        <PlaywrightModes />
      </Box>
    </Paper>
  );
}
