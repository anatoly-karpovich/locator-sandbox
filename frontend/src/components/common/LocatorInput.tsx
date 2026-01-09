import { useMemo } from "react";
import { Button, CircularProgress, Stack } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { highlightLocatorSyntax } from "../../utils/syntaxHighlighter";
import { CodeInput } from "./CodeInput";

type LocatorInputProps = {
  value: string;
  onChange: (value: string) => void;
  onRun: () => void;
  isRunning: boolean;
  isDisabled: boolean;
  placeholder?: string;
  minRows?: number;
};

export function LocatorInput({
  value,
  onChange,
  onRun,
  isRunning,
  isDisabled,
  placeholder = "page.getByRole('heading', { name: 'Task 1' })",
  minRows = 1,
}: LocatorInputProps) {
  const highlighted = useMemo(() => highlightLocatorSyntax(value), [value]);

  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="flex-start">
        <CodeInput
          value={value}
          onChange={onChange}
          highlightedHtml={highlighted}
          placeholder={placeholder}
          minRows={minRows}
        />
        <Stack spacing={1} alignItems="flex-start">
          <Button
            variant="contained"
            startIcon={isRunning ? <CircularProgress size={18} color="inherit" /> : <PlayArrowIcon />}
            sx={{ minWidth: 140 }}
            onClick={onRun}
            disabled={isDisabled}
          >
            {isRunning ? "Running..." : "Run"}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
