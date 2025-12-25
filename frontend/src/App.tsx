import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
  const [tasks, setTasks] = useState<TaskMap>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks()
      .then((data) => {
        setTasks(data);
        setError(null);
      })
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const modules: ModuleConfig[] = useMemo(() => modulesConfig, []);
  const taskList: TaskSummary[] = useMemo(
    () => Object.values(tasks).map((t) => ({ id: t.id, title: t.title })),
    [tasks]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage modules={modules} tasks={taskList} loading={loading} error={error} />} />
          <Route path="/session/:id" element={<SessionPage modules={modules} tasks={tasks} loading={loading} error={error} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
