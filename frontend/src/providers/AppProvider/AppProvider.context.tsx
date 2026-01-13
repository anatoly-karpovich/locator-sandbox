import type { SnackbarKey } from "notistack";
import { createContext } from "react";
import type { PaletteMode } from "../../types";

export const AppContext = createContext<null | {
  test: boolean;
  showError: (err: unknown, fallback?: string) => SnackbarKey;
  themeMode: PaletteMode;
  toggleTheme: () => void;
}>(null);

AppContext.displayName = "AppContext";
