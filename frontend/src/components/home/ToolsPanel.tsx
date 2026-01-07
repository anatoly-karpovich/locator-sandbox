import { alpha, useTheme } from "@mui/material/styles";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

type ToolItem = {
  label: string;
  href: string;
  status: "live" | "soon" | "info";
};

type QuickAction = {
  label: string;
  to: string;
};

const tools: ToolItem[] = [
  { label: "Playwright", href: "#playwright", status: "live" },
  { label: "Forms", href: "#forms", status: "soon" },
];

const quickActions: QuickAction[] = [
  { label: "Beginner trainings", to: "/playwright/trainings" },
  { label: "Playground", to: "/playwright/playground" },
];

export function ToolsPanel() {
  const theme = useTheme();
  const statusStyles = {
    live: {
      color: theme.palette.text.primary,
      borderColor: alpha("#3ddc97", 0.5),
      backgroundColor: alpha("#3ddc97", 0.08),
    },
    soon: {
      color: theme.palette.text.primary,
      borderColor: alpha("#ffcc66", 0.5),
      backgroundColor: alpha("#ffcc66", 0.08),
    },
    info: {
      color: theme.palette.text.primary,
      borderColor: alpha("#94a3b8", 0.5),
      backgroundColor: alpha("#94a3b8", 0.08),
    },
  } as const;

  return (
    <Box
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
        padding: 2,
      }}
    >
      <Stack spacing={1.5}>
        <Typography variant="caption" sx={{ letterSpacing: "0.2em", color: "text.secondary" }}>
          TOOLS
        </Typography>

        <Stack spacing={1}>
          {tools.map((tool) => (
            <Box
              key={tool.label}
              component="a"
              href={tool.href}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 10px",
                borderRadius: 2,
                border: "1px solid transparent",
                color: "text.secondary",
                transition: "0.15s ease",
                "&:hover": {
                  color: "text.primary",
                  borderColor: "divider",
                  backgroundColor: alpha("#5b6bff", 0.08),
                },
              }}
            >
              <Typography variant="body2">{tool.label}</Typography>
              <Chip label={tool.status} size="small" sx={statusStyles[tool.status]} />
            </Box>
          ))}
        </Stack>

        <Box sx={{ height: 8 }} />

        <Typography variant="caption" sx={{ letterSpacing: "0.2em", color: "text.secondary" }}>
          QUICK ACTIONS
        </Typography>

        <Stack spacing={0.5}>
          {quickActions.map((action) => (
            <Box
              key={action.label}
              component={RouterLink}
              to={action.to}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                padding: "6px 6px",
                borderRadius: 2,
                color: "text.secondary",
                transition: "0.15s ease",
                "&:hover": {
                  color: "text.primary",
                  backgroundColor: alpha("#5b6bff", 0.08),
                },
              }}
            >
              <span aria-hidden="true">→</span>
              <Typography variant="body2">{action.label}</Typography>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
