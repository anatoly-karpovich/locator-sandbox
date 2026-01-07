import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { useMemo, useState } from "react";
import HomePage from "./pages/HomePage";
import TrainingRunPage from "./pages/playwright/TrainingRunPage";
import PlaygroundPage from "./pages/playwright/PlaygroundPage";
import PlaywrightTrainingsPage from "./pages/playwright/PlaywrightTrainingsPage";
import type { PaletteMode } from "./types";
import { createAppTheme } from "./theme";
import { AppProvider } from "./providers/AppProvider/AppProvider";

function App() {
  const [mode, setMode] = useState<PaletteMode>("light");

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  const toggleTheme = () => setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3} autoHideDuration={5000} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <AppProvider>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage themeMode={mode} onToggleTheme={toggleTheme} />} />
              <Route
                path="/playwright/playground"
                element={<PlaygroundPage themeMode={mode} onToggleTheme={toggleTheme} />}
              />
              <Route
                path="/playwright/training-run/:trainingRunId"
                element={<TrainingRunPage themeMode={mode} onToggleTheme={toggleTheme} />}
              />
              <Route
                path="/playwright/trainings"
                element={<PlaywrightTrainingsPage themeMode={mode} onToggleTheme={toggleTheme} />}
              />
              {/* <Route
              path="/playwright/challenges"
              element={<ChallengesPage themeMode={mode} onToggleTheme={toggleTheme} />}
            />
            <Route
              path="/playwright/custom"
              element={<CustomTrainingPage themeMode={mode} onToggleTheme={toggleTheme} />}
            /> */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
