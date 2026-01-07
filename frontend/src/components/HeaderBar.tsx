import { AppBar, IconButton, Stack, Toolbar, Tooltip, Typography } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../constants/routes";

type HeaderBarProps = {
  themeMode?: "light" | "dark";
  onToggleTheme?: () => void;
};

export function HeaderBar({ themeMode, onToggleTheme }: HeaderBarProps) {
  const ThemeIcon = themeMode === "light" ? LightModeIcon : DarkModeIcon;
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{ height: 64, justifyContent: "center", boxShadow: "none", color: "text.primary", borderRadius: "0px" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Typography
            variant="h6"
            component="div"
            fontWeight={600}
            onClick={() => navigate(APP_ROUTES.HOME)}
            sx={{ cursor: "pointer" }}
          >
            Locator Sandbox
          </Typography>
          {onToggleTheme && themeMode && (
            <Tooltip title={themeMode === "light" ? "Switch to dark mode" : "Switch to light mode"}>
              <IconButton color="inherit" onClick={onToggleTheme} aria-label="Toggle theme" size="small">
                <ThemeIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
