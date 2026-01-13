import { alpha, createTheme } from "@mui/material/styles";
import type { PaletteMode } from "./types";

export function createAppTheme(mode: PaletteMode) {
  const isDark = mode === "dark";
  const backgroundDefault = isDark ? "#0f1116" : "#eef1f6";
  const backgroundPaper = isDark ? "#151a26" : "#f6f8fc";
  const backgroundAlt = isDark ? "#121827" : "#edf0f7";
  const divider = isDark ? "rgba(255, 255, 255, 0.08)" : "#d8deea";

  return createTheme({
    palette: {
      mode,
      primary: {
        main: isDark ? "#5b6bff" : "#4f5dff",
      },
      text: {
        primary: isDark ? "#e6e9f2" : "#1f2937",
        secondary: isDark ? "#b6bed1" : "#5f6b7a",
      },
      background: {
        default: backgroundDefault,
        paper: backgroundPaper,
      },
      divider,
      code: {
        background: isDark ? "#1e1e1e" : "#f8fafc",
        border: isDark ? "#333333" : "#d3dbe7",
        text: isDark ? "#d4d4d4" : "#1f2937",
        placeholder: isDark ? "#7a7a7a" : "#94a3b8",
        caret: isDark ? "#d4d4d4" : "#111827",
        keyword: isDark ? "#c586c0" : "#7c3aed",
        page: isDark ? "#569cd6" : "#2563eb",
        method: isDark ? "#dcdcaa" : "#b45309",
        string: isDark ? "#ce9178" : "#b91c1c",
        regex: isDark ? "#d16969" : "#ef4444",
        number: isDark ? "#b5cea8" : "#15803d",
        comment: isDark ? "#6a9955" : "#64748b",
        punctuation: isDark ? "#d4d4d4" : "#1f2937",
      },
    },
    shape: {
      borderRadius: 18,
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
          ":root": {
            "--radius-lg": "42px",
            "--radius-md": "18px",
            "--radius-sm": "16px",
          },
          html: {
            height: "100%",
            backgroundColor: backgroundDefault,
          },
          body: {
            background: isDark
              ? "radial-gradient(900px 500px at 20% -10%, rgba(91, 107, 255, 0.18), transparent 60%), radial-gradient(900px 500px at 80% 0%, rgba(61, 220, 151, 0.08), transparent 55%), #0f1116"
              : "radial-gradient(1200px 700px at 25% -10%, rgba(79, 93, 255, 0.14), transparent 60%), radial-gradient(1000px 600px at 80% 0%, rgba(34, 197, 94, 0.08), transparent 55%), #eef1f6",
            color: isDark ? "#e6e9f2" : "#1f2937",
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
            borderRadius: "var(--radius-md)",
            boxShadow: isDark ? "none" : "0 10px 24px rgba(17, 24, 39, 0.06)",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            borderRadius: "var(--radius-md)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: "var(--radius-sm)",
            fontWeight: 600,
          },
          contained: {
            boxShadow: "none",
          },
          outlined: {
            borderColor: divider,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: ({ ownerState }) => {
            const isDefault = !ownerState.color || ownerState.color === "default";
            if (!isDefault) return {};
            return {
              borderRadius: 999,
              border: `1px solid ${divider}`,
              background: isDark ? "rgba(255, 255, 255, 0.04)" : backgroundAlt,
              fontSize: 11,
              height: 24,
            };
          },
        },
      },
      MuiSnackbarContent: {
        styleOverrides: {
          root: ({ theme }) => ({
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
            [theme.breakpoints.up("md")]: {
              width: "70vw",
              maxWidth: "70vw",
            },
            [theme.breakpoints.up("lg")]: {
              width: "45vw",
              maxWidth: "45vw",
            },
          }),
        },
      },
    },
  });
}
