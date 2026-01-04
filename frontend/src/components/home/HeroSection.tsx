// components/home/HomeHero.tsx
import {
  Box,
  // Button,
  Stack,
  Typography,
} from "@mui/material";

export function HeroSection() {
  return (
    <Box
      sx={{
        p: { xs: 3, md: 5 },
        borderRadius: 3,
        bgcolor: "background.paper",
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h3" fontWeight={800}>
          Practice automation like an engineer
        </Typography>

        <Typography variant="body1" color="text.secondary" maxWidth={900}>
          This sandbox helps you train real-world test automation skills: stable locators, trade-offs, and intent-driven
          selection — not just “make it pass”.
        </Typography>

        {/* <Stack direction="row" spacing={2} flexWrap="wrap">
          <Button variant="contained" size="large">
            Open Playwright
          </Button>
          <Button variant="outlined" size="large">
            Why this exists
          </Button>
        </Stack> */}

        {/* Feature tiles */}
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
              title: "Guided → Advanced",
              text: "Beginner drills → no-hints challenges.",
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
