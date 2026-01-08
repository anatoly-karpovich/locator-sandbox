import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import { CHECK_STATUS } from "./types";
import type { CheckState } from "./types";

type ChecksSummaryStatus = "Passed" | "Passed with notes" | "Failed" | "Pending";

type TrainingRunChecksPanelProps = {
  checks: CheckState[];
  summaryStatus?: ChecksSummaryStatus;
  isRunning: boolean;
};

const getSummaryColor = (status: ChecksSummaryStatus) => {
  if (status === "Pending") return "default" as const;
  if (status === "Passed") return "success" as const;
  if (status === "Passed with notes") return "warning" as const;
  return "error" as const;
};

export function TrainingRunChecksPanel({ checks, summaryStatus, isRunning }: TrainingRunChecksPanelProps) {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: 2,
        padding: 2,
        border: 1,
        borderColor: "divider",
        boxShadow: { xs: "none", md: 0 },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={2} marginBottom={1}>
        <Typography variant="h6">Checks</Typography>
        {summaryStatus && <Chip label={summaryStatus} color={getSummaryColor(summaryStatus)} size="small" />}
      </Stack>
      <Stack spacing={1}>
        {checks.map((check, idx) => (
          <Paper
            variant="outlined"
            key={`${check.key}-${idx}`}
            sx={{ padding: 1.5, display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}
          >
            <Chip
              label={
                isRunning
                  ? CHECK_STATUS.Pending
                  : check.status === CHECK_STATUS.Pass
                  ? CHECK_STATUS.Pass
                  : check.status === CHECK_STATUS.Fail
                  ? CHECK_STATUS.Fail
                  : CHECK_STATUS.Pending
              }
              color={
                isRunning
                  ? "default"
                  : check.status === CHECK_STATUS.Pass
                  ? "success"
                  : check.status === CHECK_STATUS.Fail
                  ? "error"
                  : "default"
              }
              size="small"
            />
            <Typography variant="body2" sx={{ minWidth: 100 }}>
              {check.key}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body2" color="text.secondary">
                expected: {String(check.expected)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                actual: {check.actual === null || check.actual === undefined ? "-" : String(check.actual)}
              </Typography>
            </Box>
          </Paper>
        ))}
        {checks.length === 0 && (
          <Typography variant="body2" color="text.secondary">
            No checks for current task.
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
