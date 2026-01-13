import { Box, Stack, Typography } from "@mui/material";

export function TrainingsIntro() {
  return (
    <Box
      sx={{
        borderRadius: "var(--radius-lg)",
        border: "1px solid",
        borderColor: "divider",
        p: { xs: 3, md: 4 },
        bgcolor: "background.paper",
        position: "relative",
        overflow: "hidden",
        "&:before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(420px 220px at 10% 0%, rgba(91, 107, 255, 0.2), transparent 60%), radial-gradient(420px 220px at 85% 10%, rgba(61, 220, 151, 0.12), transparent 60%)",
          pointerEvents: "none",
        },
      }}
    >
      <Stack spacing={2} sx={{ position: "relative" }}>
        <Typography variant="h4">Beginner trainings</Typography>

        <Typography color="text.secondary" maxWidth={720}>
          Guided practice focused on correct Playwright locator usage. Step-by-step tasks, hints, validation and
          explanations - designed to build intuition, not just make tests pass.
        </Typography>

        <Typography variant="body2" color="text.secondary">
          What to expect: semantic locators, strictness, exact vs partial matching, regex, filtering, collections and
          real-world trade-offs.
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
            gap: 2,
            pt: 1,
          }}
        >
          {[
            {
              title: "Strict API usage",
              text: "Tasks validate that you used the intended Playwright method correctly.",
            },
            {
              title: "One concept at a time",
              text: "Each training focuses on a single API or pattern.",
            },
            {
              title: "Immediate feedback",
              text: "See if it works, and if it matches the goal.",
            },
          ].map((item) => (
            <Box
              key={item.title}
              sx={{
                borderRadius: "var(--radius-md)",
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.default",
                p: 2,
              }}
            >
              <Typography variant="subtitle2" fontWeight={700}>
                {item.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {item.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Stack>
    </Box>
  );
}
