import { type ReactNode } from "react";
import { AppContext } from "./AppProvider.context";
import { useErrorSnackbar } from "../../hooks/useErrorSnackbar";

export function AppProvider({ children }: { children: ReactNode }) {
  const test = true;
  const showError = useErrorSnackbar();

  const value = {
    test,
    showError,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
