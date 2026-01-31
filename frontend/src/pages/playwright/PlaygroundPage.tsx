import { useState } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { submitPlayground, HttpError } from "../../api";
import type { PlaygroundSubmitResponse } from "../../types";
import { useApp } from "../../providers/AppProvider/AppProvider.hooks";
import { ResultSection } from "../../components/playground/ResultSection";
import { PlaygroundWorkspace } from "../../components/playground/PlaygroundWorkspace";
import { LocatorInput } from "../../components/common/LocatorInput";
import { SNACKBAR_MESSAGES } from "../../constants/notifications";
import { LOCATOR_PAYLOAD_MAX_LENGTH, PLAYGROUND_HTML_MAX_LENGTH } from "../../constants/limits";
import { useLimitedInput } from "../../hooks/useLimitedInput";

export default function PlaygroundPage() {
  const { showError } = useApp();
  const [html, setHtml] = useState("");
  const [payload, setPayload] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<PlaygroundSubmitResponse | null>(null);
  const handleHtmlChange = useLimitedInput({
    maxLength: PLAYGROUND_HTML_MAX_LENGTH,
    setValue: setHtml,
    onLimit: () => showError(new Error(SNACKBAR_MESSAGES.playgroundHtmlTooLong)),
  });
  const handlePayloadChange = useLimitedInput({
    maxLength: LOCATOR_PAYLOAD_MAX_LENGTH,
    setValue: setPayload,
    onLimit: () => showError(new Error(SNACKBAR_MESSAGES.locatorPayloadTooLong)),
  });

  const handleRun = async () => {
    if (!html.trim() || !payload.trim()) return;
    if (html.length > PLAYGROUND_HTML_MAX_LENGTH) {
      showError(new Error(SNACKBAR_MESSAGES.playgroundHtmlTooLong));
      return;
    }
    if (payload.length > LOCATOR_PAYLOAD_MAX_LENGTH) {
      showError(new Error(SNACKBAR_MESSAGES.locatorPayloadTooLong));
      return;
    }
    setIsRunning(true);
    setResult(null);
    try {
      const normalizedPayload = payload.replace(/;$/, "");
      const data = await submitPlayground({ html, payload: normalizedPayload });
      setResult(data);
    } catch (err) {
      if (err instanceof HttpError && err.status === 503) {
        showError(err, SNACKBAR_MESSAGES.serverOverloaded);
      } else {
        showError(err, SNACKBAR_MESSAGES.failedRunLocator);
      }
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <Box minHeight="100vh">
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
          <PlaygroundWorkspace html={html} onHtmlChange={handleHtmlChange} />

          <Paper
            variant="outlined"
            sx={{ padding: 2, bgcolor: "background.paper", borderColor: "divider", boxShadow: { xs: "none", md: 0 } }}
          >
            <LocatorInput
              value={payload}
              onChange={handlePayloadChange}
              onRun={handleRun}
              isRunning={isRunning}
              isDisabled={!html.trim() || !payload.trim() || isRunning}
              placeholder="page.getByRole('button', { name: 'Submit' })"
              minRows={1}
            />
          </Paper>

          <Stack spacing={2} marginBottom={4}>
            <ResultSection result={result} />

            {result && "explanation" in result && result?.explanation &&result.explanation.length > 0 && (
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
