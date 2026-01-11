import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import { fetchTrainingsCatalog, startTrainingRun } from "../../api";
import type { BasePageProps, TrainingCatalogResponse } from "../../types";
import { HeaderBar } from "../../components/HeaderBar";
import { WhatsNextBlock } from "../../components/common/WhatsNextBlock";
import { TrainingsIntro } from "../../components/trainings/TrainingsIntro";
import { TrainingsGrid } from "../../components/trainings/TrainingsGrid";
import { CenteredLayout } from "../../components/layout/CenteredLayout";
import { useApp } from "../../providers/AppProvider/AppProvider.hooks";
import { APP_ROUTES } from "../../constants/routes";

export default function TrainingsPage({ themeMode, onToggleTheme }: BasePageProps) {
  const navigate = useNavigate();
  const [catalogData, setCatalogData] = useState<TrainingCatalogResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { showError } = useApp();

  useEffect(() => {
    fetchTrainingsCatalog()
      .then(setCatalogData)
      .catch((e) => {
        setError(e.message);
        showError(e, "Failed to receive trainings. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [showError]);

  const handleStart = async (templateId: string) => {
    try {
      const run = await startTrainingRun(templateId);
      navigate(APP_ROUTES.PLAYWRIGHT_TRAINING_RUN(run.id));
    } catch (e: any) {
      setError(e?.message ?? "Failed to start training");
      showError(e, "Failed to start training");
    }
  };

  const sections = catalogData?.catalog ?? [];
  const showEmptyState = useMemo(() => loading || Boolean(error) || sections.length === 0, [loading, error, sections]);

  return (
    <Box minHeight="100vh">
      <HeaderBar themeMode={themeMode} onToggleTheme={onToggleTheme} />

      <CenteredLayout
        sidebarWidth={240}
        contentWidth={1200}
        sidebar={
          <Box
            sx={{
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              p: 2,
            }}
          >
            <Typography variant="caption" sx={{ letterSpacing: "0.2em", color: "text.secondary" }}>
              BEGINNER PATH
            </Typography>
            <Stack spacing={1} sx={{ mt: 1 }}>
              {showEmptyState ? (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  No trainings available.
                </Typography>
              ) : (
                sections.map((section) => (
                  <Box
                    key={section.id}
                    component="a"
                    href={`#section-${section.id}`}
                    sx={{
                      display: "block",
                      padding: "8px 10px",
                      borderRadius: 2,
                      border: "1px solid transparent",
                      color: "text.secondary",
                      transition: "0.15s ease",
                      "&:hover": {
                        color: "text.primary",
                        borderColor: "divider",
                        backgroundColor: "background.default",
                      },
                    }}
                  >
                    <Typography variant="body2">{section.title}</Typography>
                  </Box>
                ))
              )}
            </Stack>
          </Box>
        }
      >
        <Stack spacing={4}>
          <TrainingsIntro />

          {showEmptyState ? (
            <Box
              sx={{
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                p: { xs: 2, md: 3 },
              }}
            >
              <Typography variant="body2" color="text.secondary">
                No trainings available.
              </Typography>
            </Box>
          ) : (
            sections.map((section) => (
              <Box key={section.id} id={`section-${section.id}`} sx={{ mb: 2, scrollMarginTop: 96 }}>
                <Box
                  sx={{
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                    p: { xs: 2, md: 3 },
                  }}
                >
                  <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
                    {section.title}
                  </Typography>
                  <TrainingsGrid trainings={section.trainings} onStart={handleStart} />
                </Box>
              </Box>
            ))
          )}
          <WhatsNextBlock
            items={[
              {
                title: "Challenges",
                description: "No hints. Ambiguous DOMs. Multiple valid locators. Train decision-making, not syntax.",
                actionLabel: "Go to challenges",
                route: APP_ROUTES.PLAYWRIGHT_CHALLENGES,
                disabled: true,
              },
              {
                title: "Playground",
                description: "Paste your own HTML and test locators instantly. Validate matches and visibility.",
                actionLabel: "Open playground",
                route: APP_ROUTES.PLAYWRIGHT_PLAYGROUND,
              },
            ]}
          />
        </Stack>
      </CenteredLayout>
    </Box>
  );
}