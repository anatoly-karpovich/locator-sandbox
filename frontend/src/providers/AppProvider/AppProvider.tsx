import { type ReactNode, useEffect, useMemo, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppContext } from "./AppProvider.context";
import { useErrorSnackbar } from "../../hooks/useErrorSnackbar";
import type { PaletteMode } from "../../types";
import { createAppTheme } from "../../theme";

const SETTINGS_STORAGE_KEY = "automationSandbox.settings";
const DEFAULT_THEME: PaletteMode = "light";

type AppSettings = {
  theme?: PaletteMode;
};

const readSettings = (): AppSettings | null => {
  try {
    const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as AppSettings;
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
};

const writeSettings = (settings: AppSettings) => {
  try {
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // ignore storage errors
  }
};

const resolveInitialTheme = (): PaletteMode => {
  const settings = readSettings();
  const stored = settings?.theme;
  if (stored === "light" || stored === "dark") return stored;
  return DEFAULT_THEME;
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>(() => resolveInitialTheme());
  const test = true;
  const showError = useErrorSnackbar();
  const theme = useMemo(() => createAppTheme(mode), [mode]);
  const toggleTheme = () => setMode((prev) => (prev === "light" ? "dark" : "light"));

  useEffect(() => {
    const current = readSettings() ?? {};
    if (current.theme !== mode) {
      writeSettings({ ...current, theme: mode });
    }
  }, [mode]);

  const value = {
    test,
    showError,
    themeMode: mode,
    toggleTheme,
  };

  return (
    <AppContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppContext.Provider>
  );
}
