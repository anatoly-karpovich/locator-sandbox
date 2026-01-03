import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { useMemo, useState } from "react";
import HomePage from "./pages/HomePage";
import TrainingRunPage from "./pages/TrainingRunPage";
import PlaygroundPage from "./pages/PlaygroundPage";

type PaletteMode = "light" | "dark";

function App() {
  const [mode, setMode] = useState<PaletteMode>("light");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === "light" ? "#f5f5f5" : "#0f1116",
            paper: mode === "light" ? "#fff" : "#1b1f26",
          },
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: (themeParam) => ({
              html: { backgroundColor: themeParam.palette.background.default },
              body: { backgroundColor: themeParam.palette.background.default, overflowX: "hidden" },
              "#root": { backgroundColor: themeParam.palette.background.default, overflowX: "hidden" },
            }),
          },
        },
      }),
    [mode]
  );

  const toggleTheme = () => setMode((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3} autoHideDuration={5000} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage themeMode={mode} onToggleTheme={toggleTheme} />} />
            <Route path="/playground" element={<PlaygroundPage themeMode={mode} onToggleTheme={toggleTheme} />} />
            <Route path="/training-run/:trainingRunId" element={<TrainingRunPage themeMode={mode} onToggleTheme={toggleTheme} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
