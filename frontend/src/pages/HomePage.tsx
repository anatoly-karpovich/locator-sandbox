import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardActions, CardContent, Container, Stack, Typography } from "@mui/material";
import { HeaderBar } from "../components/HeaderBar";
import { fetchTrainingsCatalog, startTrainingRun } from "../api";
import type { TrainingCatalogResponse, TrainingCatalogSection, TrainingCatalogModule } from "../types";

type SectionCardProps = {
  title: string;
  trainingsCount: number;
  tasksTotal: number;
  trainingTemplateId?: string;
  onStart: (trainingTemplateId: string) => void;
  disabled?: boolean;
};

const SectionCard = ({ title, trainingsCount, tasksTotal, trainingTemplateId, onStart, disabled }: SectionCardProps) => (
  <Card variant="outlined" sx={{ borderRadius: 2, height: "100%", display: "flex", flexDirection: "column" }}>
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography variant="h6" fontWeight={700}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Includes {trainingsCount} trainings, {tasksTotal} total tasks
      </Typography>
    </CardContent>
    <CardActions sx={{ paddingX: 2, paddingBottom: 2 }}>
      <Button variant="contained" onClick={() => trainingTemplateId && onStart(trainingTemplateId)} disabled={!trainingTemplateId || disabled}>
        Start section
      </Button>
    </CardActions>
  </Card>
);

export default function HomePage() {
  const navigate = useNavigate();
  const [data, setData] = useState<TrainingCatalogResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startingId, setStartingId] = useState<string | null>(null);

  useEffect(() => {
    fetchTrainingsCatalog()
      .then((res) => {
        setData(res);
        setError(null);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box minHeight="100vh" bgcolor="#f5f5f5">
      <HeaderBar />
      <Container sx={{ maxWidth: 1200, marginY: 8 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 4, md: 8 },
            alignItems: "flex-start",
          }}
        >
          <Box>
            <Stack spacing={2}>
              <Typography variant="h3" fontWeight={700}>
                Playwright Locator Sandbox
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Practice Playwright Locator API. Try selectors on prepared HTML samples and see why locators pass or fail.
              </Typography>
              {loading && (
                <Typography variant="body2" color="text.secondary">
                  Loading trainings...
                </Typography>
              )}
              {error && (
                <Typography variant="body2" color="error">
                  {error}
                </Typography>
              )}
            </Stack>
          </Box>
          <Box>
            <Stack spacing={3}>
              {!loading &&
                !error &&
                data?.modules.map((module: TrainingCatalogModule) => (
                  <Box key={module.id}>
                    <Typography variant="h6" fontWeight={700} sx={{ marginBottom: 1 }}>
                      {module.title}
                    </Typography>
                    <Stack spacing={2}>
                      {module.sections.map((section: TrainingCatalogSection) => {
                        const trainingsCount = section.trainings.length;
                        const tasksTotal = section.trainings.reduce((sum, t) => sum + t.taskCount, 0);
                        const primaryTraining = section.trainings[0];
                        return (
                          <SectionCard
                            key={section.id}
                            title={section.title}
                            trainingsCount={trainingsCount}
                            tasksTotal={tasksTotal}
                            trainingTemplateId={primaryTraining?.id}
                            disabled={!!startingId}
                            onStart={async (trainingTemplateId) => {
                              try {
                                setStartingId(trainingTemplateId);
                                const run = await startTrainingRun(trainingTemplateId);
                                navigate(`/training-run/${run.id}`);
                              } catch (e: any) {
                                setError(e?.message ?? "Failed to start training");
                              } finally {
                                setStartingId(null);
                              }
                            }}
                          />
                        );
                      })}
                    </Stack>
                  </Box>
                ))}
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
