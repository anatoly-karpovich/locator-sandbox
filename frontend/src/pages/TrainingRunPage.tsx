import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
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
import { TaskInfoBar } from "../components/tasks/TaskInfoBar";
import type { SolutionResponse, Task, TaskResultPayload, TrainingRun, TrainingRunTopic } from "../types";
import { submitTrainingRunSolution, fetchTask, fetchTrainingRun, HttpError } from "../api";

const CHECK_STATUS = {
  Pending: "Pending",
  Pass: "Passed",
  Fail: "Failed",
} as const;

type CheckStatus = (typeof CHECK_STATUS)[keyof typeof CHECK_STATUS];

type CheckState = {
  key: string;
  expected: unknown;
  actual: unknown;
  status: CheckStatus;
};

export default function TrainingRunPage() {
  const { trainingRunId } = useParams<{ trainingRunId: string }>();
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [run, setRun] = useState<TrainingRun | null>(null);
  const [topics, setTopics] = useState<TrainingRunTopic[]>([]);
  const [flatTaskIds, setFlatTaskIds] = useState<string[]>([]);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
  const [locatorInput, setLocatorInput] = useState("");
  const [solutionResult, setSolutionResult] = useState<SolutionResponse | null>(null);
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [checksState, setChecksState] = useState<CheckState[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [taskLoading, setTaskLoading] = useState(false);
  const [taskLoadError, setTaskLoadError] = useState<string | null>(null);
  const [currentTaskData, setCurrentTaskData] = useState<Task | null>(null);
  const [runLoading, setRunLoading] = useState(true);
  const [runLoadError, setRunLoadError] = useState<string | null>(null);

  const showError = (err: unknown, fallback = "Something went wrong") => {
    let message = fallback;
    if (err instanceof HttpError) {
      message = err.body || fallback;
      if (err.status >= 500) {
        message = "Server error. Please try again.";
      }
    } else if (err instanceof Error && err.message) {
      message = err.message;
    }
    return enqueueSnackbar(message, {
      variant: "error",
      action: (snackbarId) => (
        <Button color="inherit" size="small" onClick={() => closeSnackbar(snackbarId)}>
          Close
        </Button>
      ),
    });
  };

  // Fetch training run data
  useEffect(() => {
    if (!trainingRunId) return;
    setRunLoading(true);
    fetchTrainingRun(trainingRunId)
      .then((data) => {
        setRun(data);
        setTopics(data.topics);
        const orderedTaskIds = data.topics.flatMap((topic) => topic.tasks.map((t) => t.id));
        setFlatTaskIds(orderedTaskIds);
        if (orderedTaskIds.length > 0) {
          setCurrentTaskId(orderedTaskIds[0]);
        } else {
          setCurrentTaskId(null);
        }
        const passed = data.topics
          .flatMap((t) => t.tasks)
          .filter((t) => t.result.status === "passed")
          .map((t) => t.id);
        setCompletedTasks(new Set(passed));
        setRunLoadError(null);
      })
      .catch((err: any) => {
        setRunLoadError(err?.message ?? "Failed to load training run");
        showError(err, "Failed to load training run");
        setRun(null);
        setTopics([]);
        setFlatTaskIds([]);
        setCurrentTaskId(null);
      })
      .finally(() => setRunLoading(false));
  }, [trainingRunId]);

  const currentTaskIndex = useMemo(() => {
    if (!currentTaskId) return -1;
    return flatTaskIds.indexOf(currentTaskId);
  }, [flatTaskIds, currentTaskId]);

  const prevTaskId = currentTaskIndex > 0 ? flatTaskIds[currentTaskIndex - 1] : null;
  const nextTaskId =
    currentTaskIndex >= 0 && currentTaskIndex + 1 < flatTaskIds.length ? flatTaskIds[currentTaskIndex + 1] : null;

  // Load task lazily
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
        showError(err, "Failed to load task");
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

  // Initialize checks from expectations
  useEffect(() => {
    if (!currentTaskData) {
      setChecksState([]);
      return;
    }
    const baseChecks: CheckState[] = Object.entries(currentTaskData.expectations).map(([key, expected]) => ({
      key,
      expected,
      actual: null,
      status: CHECK_STATUS.Pending,
    }));
    setChecksState(baseChecks);
  }, [currentTaskData]);

  const handleSelectTask = (taskId: string) => {
    setCurrentTaskId(taskId);
    setSolutionResult(null);
    setLocatorInput("");
  };

  const refreshRun = async () => {
    if (!trainingRunId) return;
    try {
      const updated = await fetchTrainingRun(trainingRunId);
      setRun(updated);
      setTopics(updated.topics);
      const passed = updated.topics
        .flatMap((t) => t.tasks)
        .filter((t) => t.result.status === "passed")
        .map((t) => t.id);
      setCompletedTasks(new Set(passed));
    } catch {
      // silently ignore refresh errors
    }
  };

  const handleRun = async () => {
    if (!currentTaskId || taskLoading || taskLoadError || !trainingRunId) return;
    setSolutionResult(null);
    setIsRunning(true);
    try {
      const result = await submitTrainingRunSolution(trainingRunId, { taskId: currentTaskId, payload: locatorInput });
      setSolutionResult(result);
      updateChecksFromResult(result);

      const passed =
        ("taskResult" in result && result.taskResult?.passed) || ("result" in result && result.result?.passed) || false;
      if (passed) {
        setCompletedTasks((prev) => new Set([...prev, currentTaskId]));
        refreshRun();
      }
    } catch (e: any) {
      showError(e, "Failed to run locator");
      markAllChecksFailed();
    } finally {
      setIsRunning(false);
    }
  };

  const markAllChecksFailed = () => {
    setChecksState((prev) => prev.map((c) => ({ ...c, status: CHECK_STATUS.Fail, actual: null })));
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
        if (!found) return { ...check, status: CHECK_STATUS.Fail, actual: null };
        return {
          ...check,
          actual: found.actual ?? null,
          status: found.passed ? CHECK_STATUS.Pass : CHECK_STATUS.Fail,
        };
      })
    );
  };

  const handleNextTask = () => {
    if (!nextTaskId) return;
    handleSelectTask(nextTaskId);
  };

  const handlePrevTask = () => {
    if (!prevTaskId) return;
    handleSelectTask(prevTaskId);
  };

  const renderSidebarContent = () => (
    <Box sx={{ width: 280, padding: 2 }}>
      {topics.map((topic, topicIdx) => {
        const isCurrentTopic = (topic.tasks || []).some((t) => t.id === currentTaskId);
        return (
          <Accordion key={topic.id} defaultExpanded={topicIdx === 0 || isCurrentTopic}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>{topic.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                {(topic.tasks || []).map((task) => {
                  const isDone = completedTasks.has(task.id);
                  const isActive = task.id === currentTaskId;
                  return (
                    <ListItem key={task.id} disablePadding>
                      <ListItemButton
                        selected={isActive}
                        onClick={() => handleSelectTask(task.id)}
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
                {(topic.tasks || []).length === 0 && (
                  <ListItem>
                    <ListItemText primary="No tasks in this topic" primaryTypographyProps={{ variant: "body2" }} />
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
      <Stack direction="row" alignItems="center" spacing={2} marginBottom={1}>
        <Typography variant="h6">Checks</Typography>
      </Stack>
      <Stack spacing={1}>
        {checksState.map((check, idx) => (
          <Paper
            variant="outlined"
            key={`${check.key}-${idx}`}
            sx={{ padding: 1.5, display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}
          >
            <Chip
              label={
                check.status === CHECK_STATUS.Pass
                  ? CHECK_STATUS.Pass
                  : check.status === CHECK_STATUS.Fail
                  ? CHECK_STATUS.Fail
                  : CHECK_STATUS.Pending
              }
              color={
                check.status === CHECK_STATUS.Pass
                  ? "success"
                  : check.status === CHECK_STATUS.Fail
                  ? "error"
                  : "default"
              }
              size="small"
            />
            <Typography variant="body2" sx={{ minWidth: 100 }}>
              {check.key}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body2" color="text.secondary">
                expected: {String(check.expected)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                actual: {check.actual === null || check.actual === undefined ? "-" : String(check.actual)}
              </Typography>
            </Box>
          </Paper>
        ))}
        {checksState.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            No checks for current task.
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
            No explanations yet.
          </Typography>
        )}
      </Box>
    );
  };

  const totalTasks = flatTaskIds.length;
  const currentTaskLabel = currentTaskData?.title ?? "No task";

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
            <Button variant="outlined" onClick={handlePrevTask} disabled={!prevTaskId}>{`< Previous`}</Button>
            <Typography variant="subtitle1" fontWeight={600} sx={{ textAlign: "center", flexGrow: 1 }}>
              Task {currentTaskIndex >= 0 ? currentTaskIndex + 1 : "-"} / {totalTasks || "-"} - {currentTaskLabel}
            </Typography>
            <Button variant="outlined" onClick={handleNextTask} disabled={!nextTaskId}>{`Next >`}</Button>
          </Stack>

          {(runLoading || taskLoading) && <Typography>Loading task...</Typography>}
          {(taskLoadError || runLoadError) && (
            <Typography color="error" marginBottom={2}>
              {taskLoadError || runLoadError}
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

              <TaskInfoBar description={currentTaskData.description} studyMaterials={currentTaskData.studyMaterials} />

              <Stack spacing={2}>
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

          {!runLoading && !currentTaskData && !taskLoading && (
            <Typography color="text.secondary">No tasks to display. Check your training setup.</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
