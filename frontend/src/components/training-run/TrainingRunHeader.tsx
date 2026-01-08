import { Button, Stack, Typography } from "@mui/material";

type TrainingRunHeaderProps = {
  currentTaskIndex: number;
  totalTasks: number;
  currentTaskLabel: string;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export function TrainingRunHeader({
  currentTaskIndex,
  totalTasks,
  currentTaskLabel,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}: TrainingRunHeaderProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" marginBottom={3} spacing={2}>
      <Button variant="outlined" onClick={onPrev} disabled={!hasPrev}>{`< Previous`}</Button>
      <Typography variant="subtitle1" fontWeight={600} sx={{ textAlign: "center", flexGrow: 1 }}>
        Task {currentTaskIndex >= 0 ? currentTaskIndex + 1 : "-"} / {totalTasks || "-"} - {currentTaskLabel}
      </Typography>
      <Button variant="outlined" onClick={onNext} disabled={!hasNext}>{`Next >`}</Button>
    </Stack>
  );
}
