import { Box, Container, Stack } from "@mui/material";
import { HeaderBar } from "../components/HeaderBar";
import { HeroSection } from "../components/home/HeroSection";
import { PlaywrightSection } from "../components/home/playwright/PlaywrightSection";
import { ToolsPanel } from "../components/home/ToolsPanel";
import { TipPanel } from "../components/home/TipPanel";
import { FormsSection } from "../components/home/FormsSection";
// import { FutureToolsSection } from "../components/FutureToolsSection";
import type { BasePageProps } from "../types";

export default function HomePage({ themeMode, onToggleTheme }: BasePageProps) {
  return (
    <Box minHeight="100vh">
      <HeaderBar themeMode={themeMode} onToggleTheme={onToggleTheme} />

      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "minmax(260px, 1fr) minmax(0, 1200px) minmax(0, 1fr)",
            },
            gap: 3,
            alignItems: "start",
          }}
        >
          <Stack
            spacing={2}
            component="aside"
            sx={{
              gridColumn: { xs: "1 / -1", md: "1 / 2" },
              justifySelf: { md: "end" },
              width: { md: 260 },
            }}
          >
            <ToolsPanel />
            <TipPanel />
          </Stack>

          <Stack spacing={4} component="main" sx={{ gridColumn: { xs: "1 / -1", md: "2 / 3" } }}>
            <HeroSection />
            <PlaywrightSection />
            <FormsSection />
          </Stack>
        </Box>
        {/* <FutureToolsSection /> */}
      </Container>
    </Box>
  );
}
