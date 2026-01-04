import { Box, Container, Stack } from "@mui/material";

import { TrainingsIntro } from "../../components/trainings/TrainingsIntro";
import { WhatsNextBlock } from "../../components/common/WhatsNextBlock";
import { HeaderBar } from "../../components/HeaderBar";
import { TrainingsGrid } from "../../components/trainings/TrainingsGrid";
import type { BasePageProps } from "../../types";

export default function PlaywrightTrainingsPage({ themeMode, onToggleTheme }: BasePageProps) {
  return (
    <Box minHeight="100vh" bgcolor="background.default">
      <HeaderBar themeMode={themeMode} onToggleTheme={onToggleTheme} />

      <Container
        maxWidth={false}
        sx={{
          width: "90%",
          maxWidth: 1400,
          py: 6,
        }}
      >
        <Stack spacing={6}>
          <TrainingsIntro />

          <TrainingsGrid />

          <WhatsNextBlock
            items={[
              {
                title: "Challenges",
                description: "No hints. Ambiguous DOMs. Multiple valid locators. Train decision-making, not syntax.",
                actionLabel: "Go to challenges",
                href: "/playwright/challenges",
              },
              {
                title: "Playground",
                description: "Paste your own HTML and test locators instantly. Validate matches and visibility.",
                actionLabel: "Open playground",
                href: "/playwright/playground",
              },
            ]}
          />
        </Stack>
      </Container>
    </Box>
  );
}
