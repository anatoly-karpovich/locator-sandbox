import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import { fetchTrainingsCatalog, startTrainingRun } from "../../api";
import type { TrainingCatalogResponse } from "../../types";
import { WhatsNextBlock } from "../../components/common/WhatsNextBlock";
import { TrainingsIntro } from "../../components/trainings/TrainingsIntro";
import { TrainingsGrid } from "../../components/trainings/TrainingsGrid";
import { CenteredLayout } from "../../components/layout/CenteredLayout";
import { useApp } from "../../providers/AppProvider/AppProvider.hooks";
import { APP_ROUTES } from "../../constants/routes";

export default function TrainingsPage() {
  const navigate = useNavigate();
  const [catalogData, setCatalogData] = useState<TrainingCatalogResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [catalogError, setCatalogError] = useState<string | null>(null);
  const [startingId, setStartingId] = useState<string | null>(null);
  const { showError } = useApp();

  const fetchCatalog = useCallback(() => {
    setLoading(true);
    return fetchTrainingsCatalog()
      .then((data) => {
        setCatalogData(data);
        setCatalogError(null);
      })
      .catch((e) => {
        setCatalogError(e.message);
        showError(e, "Failed to receive trainings. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [showError]);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      fetchCatalog();
    }, 0);
    return () => window.clearTimeout(timerId);
  }, [fetchCatalog]);

  const handleStart = async (templateId: string) => {
    if (startingId) return;
    setStartingId(templateId);
    try {
      const run = await startTrainingRun(templateId);
      navigate(APP_ROUTES.PLAYWRIGHT_TRAINING_RUN(run.id));
    } catch (e: any) {
      setStartingId(null);
      showError(e, "Failed to start training");
      void fetchCatalog();
    }
  };

  const sections = catalogData?.catalog ?? [];
  const showEmptyState = useMemo(
    () => loading || Boolean(catalogError) || sections.length === 0,
    [loading, catalogError, sections]
  );

  return (
    <Box minHeight="100vh">
      <CenteredLayout
        sidebarWidth={240}
        contentWidth={1200}
        sidebar={
          <Box
            sx={{
              borderRadius: "var(--radius-lg)",
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
                      borderRadius: "var(--radius-md)",
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
                borderRadius: "var(--radius-lg)",
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
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid",
                    borderColor: "divider",
                    bgcolor: "background.paper",
                    p: { xs: 2, md: 3 },
                  }}
                >
                  <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
                    {section.title}
                  </Typography>
                <TrainingsGrid
                  trainings={section.trainings}
                  onStart={handleStart}
                  startingId={startingId}
                  isStarting={Boolean(startingId)}
                />
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
