import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { useMemo, useState } from "react";
import HomePage from "./pages/HomePage";
// import TrainingRunPage from "./pages/playwright/TrainingRunPage";
import PlaygroundPage from "./pages/playwright/PlaygroundPage";
import PlaywrightTrainingsPage from "./pages/playwright/PlaywrightTrainingsPage";
import type { PaletteMode } from "./types";
import { createAppTheme } from "./theme";
import { AppProvider } from "./providers/AppProvider/AppProvider";
import { APP_ROUTES } from "./constants/routes";

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
              <Route path={APP_ROUTES.HOME} element={<HomePage themeMode={mode} onToggleTheme={toggleTheme} />} />
              <Route
                path={APP_ROUTES.PLAYWRIGHT_PLAYGROUND}
                element={<PlaygroundPage themeMode={mode} onToggleTheme={toggleTheme} />}
              />
              {/* <Route
                path={APP_ROUTES.PLAYWRIGHT_TRAINING_RUN}
                element={<TrainingRunPage themeMode={mode} onToggleTheme={toggleTheme} />}
              /> */}
              <Route
                path={APP_ROUTES.PLAYWRIGHT_TRAININGS}
                element={<PlaywrightTrainingsPage themeMode={mode} onToggleTheme={toggleTheme} />}
              />
              {/* <Route
              path={APP_ROUTES.PLAYWRIGHT_CHALLENGES}
              element={<ChallengesPage themeMode={mode} onToggleTheme={toggleTheme} />}
            />
            <Route
              path={APP_ROUTES.PLAYWRIGHT_CUSTOM}
              element={<CustomTrainingPage themeMode={mode} onToggleTheme={toggleTheme} />}
            /> */}
              <Route path="*" element={<Navigate to={APP_ROUTES.HOME} />} />
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
