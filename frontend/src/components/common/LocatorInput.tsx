import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

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
  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="flex-start">
        <TextField
          fullWidth
          multiline
          minRows={minRows}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
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
