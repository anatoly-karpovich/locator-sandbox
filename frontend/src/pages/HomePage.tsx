import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardActions, CardContent, Container, Stack, Typography } from "@mui/material";
import { HeaderBar } from "../components/HeaderBar";
import type { ModuleConfig, TaskSummary } from "../types";

type HomePageProps = {
  modules: ModuleConfig[];
  tasks: TaskSummary[];
  loading: boolean;
  error: string | null;
};

const generateSessionId = () => crypto.randomUUID();

export default function HomePage({ modules, tasks, loading, error }: HomePageProps) {
  const navigate = useNavigate();

  const handleChoose = (module: ModuleConfig) => {
    const firstTaskId = module.taskIds.find((id) => tasks.some((t) => t.id === id)) ?? tasks[0]?.id;
    const sessionId = generateSessionId();
    navigate(`/session/${sessionId}`, { state: { moduleId: module.id, taskId: firstTaskId } });
  };

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
                Тренажер для практики Playwright Locator API. Отрабатывайте селекторы на подготовленных HTML примерах и
                смотрите, почему локаторы работают или нет.
              </Typography>
              {loading && (
                <Typography variant="body2" color="text.secondary">
                  Загружаем задачи...
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
            <Stack spacing={2}>
              {modules.map((module) => (
                <Card key={module.id} variant="outlined" sx={{ borderRadius: 2 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={700}>
                      {module.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {module.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ paddingX: 2, paddingBottom: 2 }}>
                    <Button variant="contained" disabled={!tasks.length} onClick={() => handleChoose(module)}>
                      Choose module
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </Stack>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
