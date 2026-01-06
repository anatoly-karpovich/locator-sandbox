import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress, Container, Stack, Typography } from "@mui/material";
import { fetchTrainingsCatalog, startTrainingRun } from "../../api";
import type { BasePageProps, TrainingCatalogResponse } from "../../types";
import { HeaderBar } from "../../components/HeaderBar";
import { WhatsNextBlock } from "../../components/common/WhatsNextBlock";
import { TrainingsIntro } from "../../components/trainings/TrainingsIntro";
import { TrainingsGrid } from "../../components/trainings/TrainingsGrid";
import { useErrorSnackbar } from "../../hooks/useErrorSnackbar";

export default function TrainingsPage({ themeMode, onToggleTheme }: BasePageProps) {
  const navigate = useNavigate();
  const [catalog, setCatalog] = useState<TrainingCatalogResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const showError = useErrorSnackbar();

  useEffect(() => {
    fetchTrainingsCatalog()
      .then(setCatalog)
      .catch((e) => {
        setError(e.message);
        showError(e, "Failed to load trainings");
      })
      .finally(() => setLoading(false));
  }, [showError]);

  const handleStart = async (templateId: string) => {
    try {
      const run = await startTrainingRun(templateId);
      navigate(`/playwright/training-run/${run.id}`);
    } catch (e: any) {
      setError(e?.message ?? "Failed to start training");
      showError(e, "Failed to start training");
    }
  };

  return (
    <Box minHeight="100vh" bgcolor="background.default">
      <HeaderBar
        themeMode={themeMode}
        onToggleTheme={onToggleTheme}
        rightSlot={
          <Button variant="text" color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
        }
      />

      <Container sx={{ py: 6 }}>
        <Stack spacing={4}>
          <TrainingsIntro />
          {loading && <CircularProgress />}
          {error && <Typography color="error">{error}</Typography>}

          {catalog?.modules.map((module) =>
            module.sections.map((section) => (
              <Box key={section.id} sx={{ mb: 2 }}>
                <Typography variant="h5" fontWeight={700} sx={{ mb: 1, px: { xs: 0, md: 1 } }}>
                  {module.title} / {section.title}
                </Typography>

                <TrainingsGrid trainings={section.trainings} onStart={handleStart} />
              </Box>
            ))
          )}
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
