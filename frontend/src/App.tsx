import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import HomePage from "./pages/HomePage";
import SessionPage from "./pages/SessionPage";
import { fetchTasks } from "./api";
import type { ModuleConfig, TaskMap, TaskSummary } from "./types";
import { modulesConfig } from "./modules";

const theme = createTheme({
  palette: {
    background: {
      default: "#f5f5f5",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

function AppRoutes() {
  const location = useLocation();
  const [tasks, setTasks] = useState<TaskMap>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const tasksEmpty = Object.keys(tasks).length === 0;
    if (location.pathname !== "/" && !tasksEmpty) return;

    setLoading(true);
    fetchTasks()
      .then((data) => {
        setTasks(data);
        setError(null);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [location.pathname]);

  const modules: ModuleConfig[] = useMemo(() => {
    // attach task ids from backend to predefined modules list
    const grouped = modulesConfig.map((module) => ({
      ...module,
      taskIds: Object.values(tasks)
        .filter((t) => t.module === module.id)
        .map((t) => t.id)
        .sort((a, b) => a - b),
    }));
    return grouped;
  }, [tasks]);

  const taskList: TaskSummary[] = useMemo(
    () => Object.values(tasks).map((t) => ({ id: t.id, title: t.title })),
    [tasks]
  );

  return (
    <Routes>
      <Route path="/" element={<HomePage modules={modules} tasks={taskList} loading={loading} error={error} />} />
      <Route
        path="/session/:id"
        element={<SessionPage modules={modules} tasks={tasks} loading={loading} error={error} />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
