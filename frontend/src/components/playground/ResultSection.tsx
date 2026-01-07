import { Chip, Paper, Stack, Tooltip, Typography } from "@mui/material";
import type { PlaygroundElement, PlaygroundSubmitResponse } from "../../types";

type ResultSectionProps = {
  result: PlaygroundSubmitResponse | null;
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
            <Chip label={el.tagName} size="medium" sx={{ fontSize: 14 }} />
            <Chip label={el.visible ? "visible" : "hidden"} size="small" color={el.visible ? "success" : "warning"} />
            <Tooltip title={el.text ?? "-"} disableInteractive>
              <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: { xs: "100%", md: "70%" } }}>
                text: {el.text ?? "-"}
              </Typography>
            </Tooltip>
            {Object.entries(el.attributes).map(([k, v]) => (
              <Chip key={k} label={`${k}=${v}`} size="small" variant="outlined" sx={{ fontSize: 13 }} />
            ))}
          </Stack>
        </Paper>
      ))}
    </Stack>
  );
};

export function ResultSection({ result }: ResultSectionProps) {
  return (
    <Paper
      variant="outlined"
      sx={{ padding: 2, bgcolor: "background.paper", borderColor: "divider", boxShadow: { xs: "none", md: 0 } }}
    >
      <Stack direction="row" alignItems="center" spacing={1} marginBottom={1}>
        <Typography variant="h6">Matched elements</Typography>
      </Stack>
      {result ? (
        renderElements(result.elements)
      ) : (
        <Typography variant="body2" color="text.secondary">
          Run a locator to see matched elements.
        </Typography>
      )}
    </Paper>
  );
}
