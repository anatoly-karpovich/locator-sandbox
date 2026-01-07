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

      <Container maxWidth={false} sx={{ py: 6 }}>
        <Box sx={{ position: "relative" }}>
          <Stack
            spacing={2}
            component="aside"
            sx={{
              width: 260,
              display: { xs: "none", md: "flex" },
              position: "absolute",
              top: 0,
              left: "calc(50% - 600px - 260px - 24px)",
            }}
          >
            <ToolsPanel />
            <TipPanel />
          </Stack>

          <Stack spacing={2} component="aside" sx={{ display: { xs: "flex", md: "none" }, mb: 4 }}>
            <ToolsPanel />
            <TipPanel />
          </Stack>

          <Stack spacing={4} component="main" sx={{ maxWidth: 1200, mx: "auto" }}>
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
