import { alpha, createTheme } from "@mui/material/styles";
import type { PaletteMode } from "./types";

export function createAppTheme(mode: PaletteMode) {
  const isDark = mode === "dark";
  const backgroundDefault = isDark ? "#0f1116" : "#f5f7fb";
  const backgroundPaper = isDark ? "#151a26" : "#ffffff";
  const divider = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(15, 23, 42, 0.08)";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? "#5b6bff" : "#3f51ff",
      },
      background: {
        default: backgroundDefault,
        paper: backgroundPaper,
      },
      divider,
    },
    shape: {
      borderRadius: 14,
    },
    typography: {
      fontFamily: '"Inter", "Segoe UI", Arial, sans-serif',
      h2: {
        fontWeight: 800,
        letterSpacing: "-0.02em",
      },
      h3: {
        fontWeight: 800,
        letterSpacing: "-0.02em",
      },
      h4: {
        fontWeight: 800,
        letterSpacing: "-0.01em",
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            height: "100%",
            backgroundColor: backgroundDefault,
          },
          body: {
            background: isDark
              ? "radial-gradient(900px 500px at 20% -10%, rgba(91, 107, 255, 0.18), transparent 60%), radial-gradient(900px 500px at 80% 0%, rgba(61, 220, 151, 0.08), transparent 55%), #0f1116"
              : "radial-gradient(900px 500px at 20% -10%, rgba(79, 93, 255, 0.12), transparent 60%), radial-gradient(900px 500px at 80% 0%, rgba(61, 220, 151, 0.06), transparent 55%), #f5f7fb",
            color: isDark ? "#e6e9f2" : "#121826",
            margin: 0,
            minHeight: "100%",
            overflowX: "hidden",
          },
          "#root": {
            minHeight: "100%",
          },
          a: {
            color: "inherit",
            textDecoration: "none",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: alpha(backgroundPaper, isDark ? 0.7 : 0.9),
            backdropFilter: "blur(12px)",
            borderBottom: `1px solid ${divider}`,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            borderRadius: 16,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 12,
            fontWeight: 600,
          },
          contained: {
            boxShadow: "none",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            border: `1px solid ${divider}`,
            background: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(15, 23, 42, 0.04)",
            fontSize: 11,
            height: 24,
          },
        },
      },
    },
  });
}
