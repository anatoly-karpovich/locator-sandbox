import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

type TrainingRunLocatorInputProps = {
  locatorInput: string;
  onChange: (value: string) => void;
  onRun: () => void;
  isRunning: boolean;
  isDisabled: boolean;
};

export function TrainingRunLocatorInput({
  locatorInput,
  onChange,
  onRun,
  isRunning,
  isDisabled,
}: TrainingRunLocatorInputProps) {
  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="flex-start">
        <TextField
          fullWidth
          multiline
          minRows={1}
          placeholder="page.getByRole('heading', { name: 'Task 1' })"
          value={locatorInput}
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
