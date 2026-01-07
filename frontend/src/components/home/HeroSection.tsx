import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        p: { xs: 3, md: 5 },
        borderRadius: 3,
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        position: "relative",
        overflow: "hidden",
        "&:before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(500px 260px at 15% 0%, rgba(91, 107, 255, 0.18), transparent 60%), radial-gradient(420px 220px at 85% 10%, rgba(61, 220, 151, 0.12), transparent 60%)",
          pointerEvents: "none",
        },
      }}
    >
      <Stack spacing={3} sx={{ position: "relative" }}>
        <Typography variant="h3">Practice automation like an engineer</Typography>

        <Typography variant="body1" color="text.secondary" maxWidth={900}>
          Documentation shows what is possible. DevTools shows what works once. This sandbox trains what actually
          matters in real projects: stable locators, trade-offs, and intent-driven selection.
        </Typography>

        <Stack direction="row" spacing={2} flexWrap="wrap">
          <Button variant="contained" size="large" onClick={() => navigate("/playwright/trainings")}>
            Open Playwright
          </Button>
          <Button variant="outlined" size="large" onClick={() => navigate("/playwright/playground")}>
            Jump to Playground
          </Button>
        </Stack>

        <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
          {[
            {
              title: "Real DOMs",
              text: "Nested markup, collections, unstable layouts.",
            },
            {
              title: "Trade-offs",
              text: "Readable vs stable vs maintainable locators.",
            },
            {
              title: "Guided and advanced",
              text: "Beginner drills and no-hints challenges.",
            },
            {
              title: "Sandbox mode",
              text: "Paste HTML and test locators instantly.",
            },
          ].map((item) => (
            <Box
              key={item.title}
              sx={{
                flex: "1 1 220px",
                p: 2,
                borderRadius: 2,
                bgcolor: "background.default",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Typography fontWeight={700}>{item.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {item.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Stack>
    </Box>
  );
}
