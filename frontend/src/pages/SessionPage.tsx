import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography,
  Chip,
  Paper,
} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { HeaderBar } from "../components/HeaderBar";
import type { ModuleConfig, SolutionResponse, Task, TaskMap, TaskResultPayload } from "../types";
import { submitSolution, fetchTask } from "../api";

type SessionPageProps = {
  modules: ModuleConfig[];
  tasks: TaskMap;
  loading: boolean;
  error: string | null;
};

type LocationState = {
  moduleId?: string;
  taskId?: number;
};

type CheckState = {
  key: string;
  expected: unknown;
  actual: unknown;
  status: "pending" | "pass" | "fail";
};

export default function SessionPage({ modules, tasks, loading, error }: SessionPageProps) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as LocationState | null) ?? {};

  const [currentModuleId, setCurrentModuleId] = useState<string | null>(state.moduleId ?? null);
  const [currentTaskId, setCurrentTaskId] = useState<number | null>(state.taskId ?? null);
  const [locatorInput, setLocatorInput] = useState("");
  const [solutionResult, setSolutionResult] = useState<SolutionResponse | null>(null);
  const [runError, setRunError] = useState<string | null>(null);
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());
  const [checksState, setChecksState] = useState<CheckState[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [taskLoading, setTaskLoading] = useState(false);
  const [taskLoadError, setTaskLoadError] = useState<string | null>(null);
  const [currentTaskData, setCurrentTaskData] = useState<Task | null>(null);

  const tasksAvailable = useMemo(() => Object.values(tasks).length > 0, [tasks]);

  useEffect(() => {
    if (!tasksAvailable || modules.length === 0) return;

    const fallbackModule = modules.find((m) => m.taskIds.length > 0) || modules[0];
    const targetModuleId = currentModuleId ?? state.moduleId ?? fallbackModule.id;
    if (!currentModuleId) {
      setCurrentModuleId(targetModuleId);
    }

    if (!currentTaskId) {
      const targetModule = modules.find((m) => m.id === targetModuleId) ?? fallbackModule;
      const firstTask = targetModule.taskIds.find((taskId) => tasks[taskId]) ?? Object.values(tasks)[0]?.id ?? null;
      setCurrentTaskId(state.taskId ?? firstTask ?? null);
    }
  }, [tasksAvailable, modules, tasks, state.moduleId, state.taskId, currentModuleId, currentTaskId]);

  const currentModule = modules.find((m) => m.id === currentModuleId) ?? (modules.length ? modules[0] : null);
  const currentTaskMeta: Task | undefined = currentTaskId ? tasks[currentTaskId] : undefined;

  const moduleTasks = currentModule
    ? ((currentModule.taskIds ?? []).map((id) => tasks[id]).filter(Boolean) as Task[])
    : [];
  const moduleProgressTotal = moduleTasks.length;
  const prevTaskId = useMemo(() => {
    if (!currentTaskMeta || moduleTasks.length === 0) return null;
    const idx = moduleTasks.findIndex((t) => t.id === currentTaskMeta.id);
    if (idx > 0) return moduleTasks[idx - 1].id;
    return null;
  }, [currentTaskMeta, moduleTasks]);
  const nextTaskId = useMemo(() => {
    if (!currentTaskMeta || moduleTasks.length === 0) return null;
    const idx = moduleTasks.findIndex((t) => t.id === currentTaskMeta.id);
    if (idx < 0 || idx + 1 >= moduleTasks.length) return null;
    return moduleTasks[idx + 1].id;
  }, [currentTaskMeta, moduleTasks]);

  useEffect(() => {
    if (!currentTaskId) {
      setCurrentTaskData(null);
      setChecksState([]);
      return;
    }
    let mounted = true;
    setTaskLoading(true);
    setTaskLoadError(null);
    fetchTask(currentTaskId)
      .then((task) => {
        if (!mounted) return;
        setCurrentTaskData(task);
      })
      .catch((err: any) => {
        if (!mounted) return;
        setTaskLoadError(err?.message ?? "Failed to load task");
        setCurrentTaskData(null);
      })
      .finally(() => {
        if (!mounted) return;
        setTaskLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [currentTaskId]);

  useEffect(() => {
    if (!currentTaskData) {
      setChecksState([]);
      return;
    }
    const baseChecks: CheckState[] = Object.entries(currentTaskData.expectations).map(([key, expected]) => ({
      key,
      expected,
      actual: null,
      status: "pending",
    }));
    setChecksState(baseChecks);
  }, [currentTaskData]);

  const handleSelectTask = (taskId: number, moduleId: string) => {
    setCurrentModuleId(moduleId);
    setCurrentTaskId(taskId);
    setSolutionResult(null);
    setRunError(null);
  };

  const handleRun = async () => {
    if (!currentTaskId || taskLoading || taskLoadError) return;
    setRunError(null);
    setSolutionResult(null);
    setIsRunning(true);
    try {
      const result = await submitSolution({ taskId: currentTaskId, payload: locatorInput });
      setSolutionResult(result);
      updateChecksFromResult(result);

      const passed =
        ("taskResult" in result && result.taskResult?.passed) || ("result" in result && result.result?.passed) || false;
      if (passed) {
        setCompletedTasks((prev) => new Set([...prev, currentTaskId]));
      }
    } catch (e: any) {
      setRunError(e.message ?? "Failed to run locator");
      markAllChecksFailed();
    } finally {
      setIsRunning(false);
    }
  };

  const markAllChecksFailed = () => {
    setChecksState((prev) => prev.map((c) => ({ ...c, status: "fail" })));
  };

  const updateChecksFromResult = (result: SolutionResponse) => {
    if (!currentTaskData) return;

    let checksPayload: TaskResultPayload["checks"] | undefined;
    if ("taskResult" in result && result.taskResult) checksPayload = result.taskResult.checks;
    if ("result" in result && result.result) checksPayload = result.result.checks;

    if (!checksPayload || checksPayload.length === 0) {
      markAllChecksFailed();
      return;
    }

    setChecksState((prev) =>
      prev.map((check) => {
        const found = checksPayload?.find((c) => c.key === check.key);
        if (!found) return { ...check, status: "fail" };
        return {
          ...check,
          actual: found.actual,
          status: found.passed ? "pass" : "fail",
        };
      })
    );
  };

  const goToTask = (taskId: number) => {
    setCurrentTaskId(taskId);
    setSolutionResult(null);
    setRunError(null);
    setLocatorInput("");
  };

  const handleNextTask = () => {
    if (!nextTaskId) return;
    goToTask(nextTaskId);
  };

  const handlePrevTask = () => {
    if (!prevTaskId) return;
    goToTask(prevTaskId);
  };

  const renderSidebarContent = () => (
    <Box sx={{ width: 280, padding: 2 }}>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Session {id}
      </Typography>
      {modules.map((module) => {
        const moduleTaskList = module.taskIds.map((tid) => tasks[tid]).filter(Boolean) as Task[];
        const total = moduleTaskList.length;
        const done = moduleTaskList.filter((t) => completedTasks.has(t.id)).length;

        return (
          <Accordion key={module.id} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box display="flex" flexDirection="column" width="100%">
                <Typography fontWeight={600}>{module.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {done} / {total || 0}
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                {moduleTaskList.map((task) => {
                  const isDone = completedTasks.has(task.id);
                  const isActive = task.id === currentTaskId;
                  return (
                    <ListItem key={task.id} disablePadding>
                      <ListItemButton
                        selected={isActive}
                        onClick={() => handleSelectTask(task.id, module.id)}
                        sx={{ borderRadius: 1 }}
                      >
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          {isDone ? (
                            <CheckCircleIcon color="success" fontSize="small" />
                          ) : (
                            <RadioButtonUncheckedIcon fontSize="small" />
                          )}
                        </ListItemIcon>
                        <ListItemText primary={task.title} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
                {moduleTaskList.length === 0 && (
                  <ListItem>
                    <ListItemText primary="Нет задач в этом модуле" primaryTypographyProps={{ variant: "body2" }} />
                  </ListItem>
                )}
              </List>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );

  const renderChecksPanel = () => (
    <Box sx={{ background: "#fff", borderRadius: 2, padding: 2, border: "1px solid #e0e0e0" }}>
      <Typography variant="h6" gutterBottom>
        Checks
      </Typography>
      <Stack spacing={1}>
        {checksState.map((check, idx) => (
          <Paper
            variant="outlined"
            key={`${check.key}-${idx}`}
            sx={{ padding: 1.5, display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}
          >
            <Chip
              label={check.status === "pass" ? "pass" : check.status === "fail" ? "fail" : "pending"}
              color={check.status === "pass" ? "success" : check.status === "fail" ? "error" : "default"}
              size="small"
            />
            <Typography variant="body2" sx={{ minWidth: 100 }}>
              {check.key}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              expected: {String(check.expected)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              actual: {check.actual === null || check.actual === undefined ? "-" : String(check.actual)}
            </Typography>
          </Paper>
        ))}
        {checksState.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            Нет проверок для этой задачи.
          </Typography>
        )}
      </Stack>
    </Box>
  );

  const renderExplanationPanel = () => {
    const explanations =
      (solutionResult && "explanation" in solutionResult && Array.isArray((solutionResult as any).explanation)
        ? (solutionResult as any).explanation
        : []) || [];

    return (
      <Box sx={{ background: "#fff", borderRadius: 2, padding: 2, border: "1px solid #e0e0e0" }}>
        <Typography variant="h6" gutterBottom>
          Explanation
        </Typography>
        {runError && (
          <Typography variant="body2" color="error" gutterBottom>
            {runError}
          </Typography>
        )}
        {explanations.length > 0 ? (
          <Stack spacing={0.5}>
            {explanations.map((line: string, idx: number) => (
              <Typography key={idx} variant="body2">
                {line}
              </Typography>
            ))}
          </Stack>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Пока нет объяснений.
          </Typography>
        )}
      </Box>
    );
  };

  return (
    <Box minHeight="100vh" bgcolor="#f5f5f5">
      <HeaderBar
        rightSlot={
          <Button variant="text" color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
        }
      />

      <Box display="grid" gridTemplateColumns="280px 1fr" height="calc(100vh - 64px)">
        <Box component="aside" sx={{ borderRight: "1px solid #e0e0e0", background: "#fff", overflow: "auto" }}>
          {renderSidebarContent()}
        </Box>

        <Box component="main" sx={{ padding: 3, overflow: "auto" }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom={3} spacing={2}>
            <Button variant="outlined" onClick={handlePrevTask} disabled={!prevTaskId}>
              ← Previous
            </Button>
            <Typography variant="subtitle1" fontWeight={600} sx={{ textAlign: "center", flexGrow: 1 }}>
              Task {currentTaskData?.id ?? currentTaskId ?? "-"} / {moduleProgressTotal || "-"} —{" "}
              {currentTaskData?.title ?? currentTaskMeta?.title ?? "Нет задачи"}
            </Typography>
            <Button variant="outlined" onClick={handleNextTask} disabled={!nextTaskId}>
              Next →
            </Button>
          </Stack>

          {(loading || taskLoading) && <Typography>Загружаем задачу...</Typography>}
          {(error || taskLoadError) && (
            <Typography color="error" marginBottom={2}>
              {error || taskLoadError}
            </Typography>
          )}

          {currentTaskData && !taskLoading && (
            <Stack spacing={3}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                  gap: 2,
                }}
              >
                <Box
                  sx={{ background: "#fff", borderRadius: 2, padding: 2, minHeight: 200, border: "1px solid #e0e0e0" }}
                >
                  <Typography variant="h6" gutterBottom>
                    UI preview
                  </Typography>
                  <Divider sx={{ marginBottom: 2 }} />
                  <Box
                    sx={{
                      padding: 1,
                      background: "#fafafa",
                      borderRadius: 1,
                      border: "1px dashed #e0e0e0",
                      minHeight: 160,
                    }}
                    dangerouslySetInnerHTML={{ __html: currentTaskData.html }}
                  />
                </Box>
                <Box
                  sx={{ background: "#fff", borderRadius: 2, padding: 2, minHeight: 200, border: "1px solid #e0e0e0" }}
                >
                  <Typography variant="h6" gutterBottom>
                    HTML code
                  </Typography>
                  <Divider sx={{ marginBottom: 2 }} />
                  <Box
                    component="pre"
                    sx={{
                      background: "#0b1021",
                      color: "#e3e8ff",
                      borderRadius: 1,
                      padding: 2,
                      fontFamily: "SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace",
                      whiteSpace: "pre-wrap",
                      maxHeight: 260,
                      overflow: "auto",
                    }}
                  >
                    {currentTaskData.html}
                  </Box>
                </Box>
              </Box>

              <Stack spacing={2}>
                <Typography variant="h6">Locator</Typography>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    placeholder="page.getByRole('heading', { name: 'Task 1' })"
                    value={locatorInput}
                    onChange={(e) => setLocatorInput(e.target.value)}
                  />
                  <Stack spacing={1}>
                    <Button
                      variant="contained"
                      startIcon={isRunning ? <CircularProgress size={18} color="inherit" /> : <PlayArrowIcon />}
                      sx={{ minWidth: 140 }}
                      onClick={handleRun}
                      disabled={!locatorInput.trim() || isRunning || taskLoading || !currentTaskId}
                    >
                      {isRunning ? "Running..." : "Run"}
                    </Button>
                  </Stack>
                </Stack>
              </Stack>

              {renderChecksPanel()}
              {renderExplanationPanel()}
            </Stack>
          )}

          {!loading && !currentTaskData && !taskLoading && (
            <Typography color="text.secondary">Нет задач для отображения. Проверьте настройки модулей.</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
