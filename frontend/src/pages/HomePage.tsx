import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardActions, CardContent, Container, Stack, Typography } from "@mui/material";
import { HeaderBar } from "../components/HeaderBar";
import { fetchCurriculum } from "../api";
import type { CurriculumResponse, ModuleNode } from "../types";

const generateSessionId = () => crypto.randomUUID();

type SectionCardProps = {
  moduleId: string;
  sectionId: string;
  title: string;
  topicsCount: number;
  tasksTotal: number;
  onStart: (moduleId: string, sectionId: string) => void;
};

const SectionCard = ({ moduleId, sectionId, title, topicsCount, tasksTotal, onStart }: SectionCardProps) => (
  <Card variant="outlined" sx={{ borderRadius: 2, height: "100%", display: "flex", flexDirection: "column" }}>
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography variant="h6" fontWeight={700}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Includes {topicsCount} topics, {tasksTotal} total tasks
      </Typography>
    </CardContent>
    <CardActions sx={{ paddingX: 2, paddingBottom: 2 }}>
      <Button variant="contained" onClick={() => onStart(moduleId, sectionId)}>
        Start section
      </Button>
    </CardActions>
  </Card>
);

export default function HomePage() {
  const navigate = useNavigate();
  const [data, setData] = useState<CurriculumResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCurriculum()
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
                  Loading curriculum...
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
                data?.modules.map((module: ModuleNode) => (
                  <Box key={module.id}>
                    <Typography variant="h6" fontWeight={700} sx={{ marginBottom: 1 }}>
                      {module.title}
                    </Typography>
                    <Stack spacing={2}>
                      {module.sections.map((section) => {
                        const topicsCount = section.topics.length;
                        const tasksTotal = section.topics.reduce((sum, t) => sum + t.tasksCount, 0);
                        return (
                          <SectionCard
                            key={section.id}
                            moduleId={module.id}
                            sectionId={section.id}
                            title={section.title}
                            topicsCount={topicsCount}
                            tasksTotal={tasksTotal}
                            onStart={(moduleId, sectionId) => {
                              const sessionId = generateSessionId();
                              navigate(`/session/${sessionId}`, { state: { moduleId, sectionId } });
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
