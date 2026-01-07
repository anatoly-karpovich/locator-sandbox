import { useState } from "react";
import { Box, Button, CircularProgress, Paper, Stack, TextField, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { HeaderBar } from "../../components/HeaderBar";
import { submitPlayground } from "../../api";
import type { BasePageProps, PlaygroundSubmitResponse } from "../../types";
import { useApp } from "../../providers/AppProvider/AppProvider.hooks";
import { ResultSection } from "../../components/playground/ResultSection";
import { PlaygroundWorkspace } from "../../components/playground/PlaygroundWorkspace";

export default function PlaygroundPage({ themeMode, onToggleTheme }: BasePageProps) {
  const { showError } = useApp();
  const [html, setHtml] = useState("");
  const [payload, setPayload] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<PlaygroundSubmitResponse | null>(null);

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

  return (
    <Box minHeight="100vh">
      <HeaderBar themeMode={themeMode} onToggleTheme={onToggleTheme} />

      <Box sx={{ width: "100%", paddingX: 3, paddingY: 4 }}>
        <Stack spacing={2} marginBottom={3}>
          <Typography variant="h4" fontWeight={700}>
            Locator Playground
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Paste any HTML and try Playwright locators. See matched elements and optional usage explanations.
          </Typography>
        </Stack>

        <Stack spacing={3}>
          <PlaygroundWorkspace html={html} onHtmlChange={setHtml} />

          <Paper
            variant="outlined"
            sx={{ padding: 2, bgcolor: "background.paper", borderColor: "divider", boxShadow: { xs: "none", md: 0 } }}
          >
            <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="flex-start">
              <TextField
                fullWidth
                multiline
                minRows={1}
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
            <ResultSection result={result} />

            {result?.explanation && result.explanation.length > 0 && (
              <Paper
                variant="outlined"
                sx={{
                  padding: 2,
                  bgcolor: "background.paper",
                  borderColor: "divider",
                  boxShadow: { xs: "none", md: 0 },
                }}
              >
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
