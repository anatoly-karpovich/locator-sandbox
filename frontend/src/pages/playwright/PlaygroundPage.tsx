import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Chip, CircularProgress, Divider, Paper, Stack, TextField, Tooltip, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useSnackbar } from "notistack";
import { HeaderBar } from "../../components/HeaderBar";
import { submitPlayground, HttpError } from "../../api";
import type { BasePageProps, PlaygroundElement, PlaygroundSubmitResponse } from "../../types";

export default function PlaygroundPage({ themeMode, onToggleTheme }: BasePageProps) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [html, setHtml] = useState("");
  const [payload, setPayload] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<PlaygroundSubmitResponse | null>(null);

  const showError = (err: unknown, fallback = "Something went wrong") => {
    let message = fallback;
    if (err instanceof HttpError) {
      message = err.body || fallback;
      if (err.status >= 500) message = "Server error. Please try again.";
    } else if (err instanceof Error && err.message) {
      message = err.message;
    }
    enqueueSnackbar(message, {
      variant: "error",
      action: (key) => (
        <Button color="inherit" size="small" onClick={() => closeSnackbar(key)}>
          Close
        </Button>
      ),
    });
  };

  const handleRun = async () => {
    if (!html.trim() || !payload.trim()) return;
    setIsRunning(true);
    setResult(null);
    try {
      const data = await submitPlayground({ html, payload });
      setResult(data);
    } catch (err) {
      showError(err, "Failed to run locator");
    } finally {
      setIsRunning(false);
    }
  };

  const renderElements = (elements: PlaygroundElement[]) => {
    if (elements.length === 0) {
      return (
        <Typography variant="body2" color="text.secondary">
          No elements found.
        </Typography>
      );
    }
    return (
      <Stack spacing={1}>
        {elements.map((el, idx) => (
            <Paper
              key={`${el.tagName}-${idx}`}
              variant="outlined"
              sx={{ padding: 1.5, bgcolor: "background.paper", borderColor: "divider" }}
            >
              <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                <Chip label={el.tagName} size="small" />
                <Tooltip title={el.text ?? "-"} disableInteractive>
                  <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: { xs: "100%", md: "70%" } }}>
                    text: {el.text ?? "-"}
                  </Typography>
                </Tooltip>
                {Object.entries(el.attributes).map(([k, v]) => (
                  <Chip key={k} label={`${k}=${v}`} size="small" variant="outlined" />
                ))}
              </Stack>
            </Paper>
        ))}
      </Stack>
    );
  };

  const renderChecks = () => {
    return (
      <Paper variant="outlined" sx={{ padding: 2, bgcolor: "background.paper", borderColor: "divider" }}>
        <Typography variant="h6" gutterBottom>
          Checks
        </Typography>
        <Stack spacing={1}>
          {result?.result.checks.map((check, idx) => (
            <Paper
              variant="outlined"
              key={`${check.key}-${idx}`}
              sx={{ padding: 1.25, display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}
            >
              <Chip
                label={check.passed ? "Passed" : "Failed"}
                color={check.passed ? "success" : "error"}
                size="small"
              />
              <Typography variant="body2" sx={{ minWidth: 100 }}>
                {check.key}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                expected: {String(check.expected)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                actual: {check.actual === null || check.actual === undefined ? "-" : String(check.actual)}
              </Typography>
            </Paper>
          )) || (
            <Typography variant="body2" color="text.secondary">
              No checks yet. Run a locator to see results.
            </Typography>
          )}
        </Stack>
      </Paper>
    );
  };

  return (
    <Box minHeight="100vh" sx={{ bgcolor: "background.default" }}>
      <HeaderBar
        themeMode={themeMode}
        onToggleTheme={onToggleTheme}
        rightSlot={
          <Button variant="text" color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
        }
      />

      <Box sx={{ width: "100%", paddingX: 3, paddingY: 4 }}>
        <Stack spacing={2} marginBottom={3}>
          <Typography variant="h4" fontWeight={700}>
            Locator Playground
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Paste any HTML and try Playwright locators. See matched elements, expectation checks, and optional usage
            explanations.
          </Typography>
        </Stack>

        <Stack spacing={3}>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="stretch">
            <Paper
              variant="outlined"
              sx={{
                flex: 1,
                padding: 2,
                bgcolor: "background.paper",
                borderColor: "divider",
                minHeight: 320,
                maxHeight: 520,
                overflow: "hidden",
              }}
            >
              <Typography variant="h6" gutterBottom>
                HTML code
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <TextField
                fullWidth
                multiline
                minRows={12}
                maxRows={18}
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                placeholder="<div>Hello</div>"
                InputProps={{
                  sx: {
                    fontFamily: "SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace",
                    "& textarea": {
                      whiteSpace: "pre",
                      overflow: "auto",
                      maxHeight: 420,
                    },
                  },
                }}
              />
            </Paper>

            <Paper
              variant="outlined"
              sx={{
                flex: 1,
                padding: 2,
                bgcolor: "background.paper",
                borderColor: "divider",
                minHeight: 320,
                maxHeight: 520,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" gutterBottom>
                UI preview
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Box
                sx={{
                  padding: 1,
                  bgcolor: "background.default",
                  borderRadius: 1,
                  border: "1px dashed",
                  borderColor: "divider",
                  minHeight: 250,
                  maxHeight: 420,
                  overflow: "auto",
                  flex: 1,
                }}
                dangerouslySetInnerHTML={{ __html: html }}
              />
            </Paper>
          </Stack>

          <Paper variant="outlined" sx={{ padding: 2, bgcolor: "background.paper", borderColor: "divider" }}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="flex-start">
              <TextField
                fullWidth
                multiline
                minRows={3}
                placeholder="page.getByRole('button', { name: 'Submit' })"
                value={payload}
                onChange={(e) => setPayload(e.target.value)}
                sx={{ flex: 1 }}
              />
              <Stack spacing={1} justifyContent="flex-start" alignItems={{ xs: "stretch", md: "flex-start" }}>
                <Button
                  variant="contained"
                  startIcon={isRunning ? <CircularProgress size={18} color="inherit" /> : <PlayArrowIcon />}
                  sx={{ minWidth: 140 }}
                  onClick={handleRun}
                  disabled={!html.trim() || !payload.trim() || isRunning}
                >
                  {isRunning ? "Running..." : "Run"}
                </Button>
              </Stack>
            </Stack>
          </Paper>

          <Stack spacing={2} marginBottom={4}>
            <Paper variant="outlined" sx={{ padding: 2, bgcolor: "background.paper", borderColor: "divider" }}>
              <Stack direction="row" alignItems="center" spacing={1} marginBottom={1}>
                <Typography variant="h6">Result</Typography>
                <Chip
                  label={result ? (result.result.passed ? "Passed" : "Failed") : "Pending"}
                  color={!result ? "default" : result.result.passed ? "success" : "error"}
                  size="small"
                />
              </Stack>
              <Typography variant="subtitle2" gutterBottom>
                Matched elements
              </Typography>
              {result ? (
                renderElements(result.elements)
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Run a locator to see matched elements.
                </Typography>
              )}
            </Paper>

            {renderChecks()}

            {result?.explanation && result.explanation.length > 0 && (
              <Paper variant="outlined" sx={{ padding: 2, bgcolor: "background.paper", borderColor: "divider" }}>
                <Typography variant="h6" gutterBottom>
                  Explanation
                </Typography>
                <Stack spacing={0.5}>
                  {result.explanation.map((line, idx) => (
                    <Typography key={idx} variant="body2">
                      {line}
                    </Typography>
                  ))}
                </Stack>
              </Paper>
            )}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
