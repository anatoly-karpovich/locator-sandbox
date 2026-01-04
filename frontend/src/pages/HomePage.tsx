import { Box, Container } from "@mui/material";
import { HeaderBar } from "../components/HeaderBar";
import { HeroSection } from "../components/home/HeroSection";
import { PlaywrightSection } from "../components/home/playwright/PlaywrightSection";
import { FutureToolsSection } from "../components/FutureToolsSection";
import type { BasePageProps } from "../types";

export default function HomePage({ themeMode, onToggleTheme }: BasePageProps) {
  return (
    <Box minHeight="100vh" bgcolor="background.default">
      <HeaderBar themeMode={themeMode} onToggleTheme={onToggleTheme} />

      <Container sx={{ py: 6 }}>
        <HeroSection />
        <PlaywrightSection />
        <FutureToolsSection />
      </Container>
    </Box>
  );
}
