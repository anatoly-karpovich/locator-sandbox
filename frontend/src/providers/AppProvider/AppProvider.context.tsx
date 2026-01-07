import type { SnackbarKey } from "notistack";
import { createContext } from "react";

export const AppContext = createContext<null | {
  test: boolean;
  showError: (err: unknown, fallback?: string) => SnackbarKey;
}>(null);

AppContext.displayName = "AppContext";
