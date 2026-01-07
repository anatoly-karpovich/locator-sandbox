import { Box, Stack } from "@mui/material";
import { HeaderBar } from "../components/HeaderBar";
import { HeroSection } from "../components/home/HeroSection";
import { PlaywrightSection } from "../components/home/playwright/PlaywrightSection";
import { ToolsPanel } from "../components/home/ToolsPanel";
import { TipPanel } from "../components/home/TipPanel";
import { FormsSection } from "../components/home/FormsSection";
import { CenteredLayout } from "../components/layout/CenteredLayout";
// import { FutureToolsSection } from "../components/FutureToolsSection";
import type { BasePageProps } from "../types";

export default function HomePage({ themeMode, onToggleTheme }: BasePageProps) {
  return (
    <Box minHeight="100vh">
      <HeaderBar themeMode={themeMode} onToggleTheme={onToggleTheme} />

      <CenteredLayout
        sidebar={
          <Stack spacing={2}>
            <ToolsPanel />
            <TipPanel />
          </Stack>
        }
        sidebarWidth={260}
        contentWidth={1200}
      >
        <Stack spacing={4}>
          <HeroSection />
          <PlaywrightSection />
          <FormsSection />
        </Stack>
        {/* <FutureToolsSection /> */}
      </CenteredLayout>
    </Box>
  );
}
