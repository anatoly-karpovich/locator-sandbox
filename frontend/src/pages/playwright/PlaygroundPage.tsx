import { useState } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { HeaderBar } from "../../components/HeaderBar";
import { submitPlayground } from "../../api";
import type { BasePageProps, PlaygroundSubmitResponse } from "../../types";
import { useApp } from "../../providers/AppProvider/AppProvider.hooks";
import { ResultSection } from "../../components/playground/ResultSection";
import { PlaygroundWorkspace } from "../../components/playground/PlaygroundWorkspace";
import { LocatorInput } from "../../components/common/LocatorInput";

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
            <LocatorInput
              value={payload}
              onChange={setPayload}
              onRun={handleRun}
              isRunning={isRunning}
              isDisabled={!html.trim() || !payload.trim() || isRunning}
              placeholder="page.getByRole('button', { name: 'Submit' })"
              minRows={1}
            />
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
