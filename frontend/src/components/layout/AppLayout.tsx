import { Outlet } from "react-router-dom";
import { HeaderBar } from "../HeaderBar";
import { useApp } from "../../providers/AppProvider/AppProvider.hooks";

export function AppLayout() {
  const { themeMode, toggleTheme } = useApp();

  return (
    <>
      <HeaderBar themeMode={themeMode} onToggleTheme={toggleTheme} />
      <Outlet />
    </>
  );
}
