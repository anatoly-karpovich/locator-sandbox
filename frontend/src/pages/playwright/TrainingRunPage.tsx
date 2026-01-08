import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import { HeaderBar } from "../../components/HeaderBar";
import { TaskInfoBar } from "../../components/tasks/TaskInfoBar";
import type { BasePageProps, SolutionResponse, Task, TaskResultPayload, TrainingRun, TrainingRunTopic } from "../../types";
import { submitTrainingRunSolution, fetchTask, fetchTrainingRun } from "../../api";
import { useApp } from "../../providers/AppProvider/AppProvider.hooks";
import { CHECK_STATUS } from "../../components/training-run/types";
import type { CheckState } from "../../components/training-run/types";
import { TrainingRunSidebar } from "../../components/training-run/TrainingRunSidebar";
import { TrainingRunHeader } from "../../components/training-run/TrainingRunHeader";
import { TrainingRunWorkspace } from "../../components/training-run/TrainingRunWorkspace";
import { LocatorInput } from "../../components/common/LocatorInput";
import { TrainingRunChecksPanel } from "../../components/training-run/TrainingRunChecksPanel";
import { TrainingRunExplanationPanel } from "../../components/training-run/TrainingRunExplanationPanel";

export default function TrainingRunPage({ themeMode, onToggleTheme }: BasePageProps) {
  const { trainingRunId } = useParams<{ trainingRunId: string }>();
  const { showError } = useApp();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const totalTasks = flatTaskIds.length;
  const currentTaskLabel = currentTaskData?.title ?? "No task";
  const explanations =
    (solutionResult && "explanation" in solutionResult && Array.isArray((solutionResult as any).explanation)
      ? (solutionResult as any).explanation
      : []) || [];

  return (
    <Box minHeight="100vh">
      <HeaderBar themeMode={themeMode} onToggleTheme={onToggleTheme} />

      <Box display="grid" gridTemplateColumns="280px 1fr" height="calc(100vh - 64px)">
        <Box
          component="aside"
          sx={{ borderRight: 1, borderColor: "divider", bgcolor: "background.paper", overflow: "auto" }}
        >
          <TrainingRunSidebar
            topics={topics}
            currentTaskId={currentTaskId}
            completedTasks={completedTasks}
            onSelectTask={handleSelectTask}
          />
        </Box>

        <Box component="main" sx={{ padding: 3, overflow: "auto" }}>
          <TrainingRunHeader
            currentTaskIndex={currentTaskIndex}
            totalTasks={totalTasks}
            currentTaskLabel={currentTaskLabel}
            hasPrev={!!prevTaskId}
            hasNext={!!nextTaskId}
            onPrev={handlePrevTask}
            onNext={handleNextTask}
          />

          {(runLoading || taskLoading) && <Typography>Loading task...</Typography>}
          {(taskLoadError || runLoadError) && (
            <Typography color="error" marginBottom={2}>
              {taskLoadError || runLoadError}
            </Typography>
          )}

          {currentTaskData && !taskLoading && (
            <Stack spacing={3}>
              <TrainingRunWorkspace html={currentTaskData.html} />

              <TaskInfoBar description={currentTaskData.description} studyMaterials={currentTaskData.studyMaterials} />

              <LocatorInput
                value={locatorInput}
                onChange={setLocatorInput}
                onRun={handleRun}
                isRunning={isRunning}
                isDisabled={!locatorInput.trim() || isRunning || taskLoading || !currentTaskId}
                placeholder="page.getByRole('heading', { name: 'Task 1' })"
                minRows={1}
              />

              <TrainingRunChecksPanel checks={checksState} />
              <TrainingRunExplanationPanel explanations={explanations} />
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
