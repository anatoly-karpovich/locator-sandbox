import { useContext } from "react";
import { AppContext } from "./AppProvider.context";

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext: Use only inside provider");
  }

  return context;
}
