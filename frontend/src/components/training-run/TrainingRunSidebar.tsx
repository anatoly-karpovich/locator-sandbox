import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import type { TrainingRunTaskStatus } from "../../types";
import type { TrainingRunTopic } from "../../types";

type TrainingRunSidebarProps = {
  runTitle?: string;
  isCompleted: boolean;
  hasNotes: boolean;
  topics: TrainingRunTopic[];
  currentTaskId: string | null;
  onSelectTask: (taskId: string) => void;
};

export function TrainingRunSidebar({
  runTitle,
  isCompleted,
  hasNotes,
  topics,
  currentTaskId,
  onSelectTask,
}: TrainingRunSidebarProps) {
  return (
    <Box sx={{ width: 280, padding: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, marginBottom: 2 }}>
        <Typography fontWeight={700} variant="subtitle1">
          {runTitle || "Training Run"}
        </Typography>
        {isCompleted && <Chip label="Completed" color={hasNotes ? "warning" : "success"} size="small" />}
      </Box>
      {topics.map((topic, topicIdx) => {
        const isCurrentTopic = (topic.tasks || []).some((t) => t.id === currentTaskId);
        const allPassedLike = (topic.tasks || []).length > 0
          ? (topic.tasks || []).every((t) => t.result.status === "passed" || t.result.status === "passed_with_notes")
          : false;
        const hasNotes = (topic.tasks || []).some((t) => t.result.status === "passed_with_notes");
        const topicStatus = allPassedLike ? (hasNotes ? "Passed with notes" : "Passed") : null;
        return (
          <Accordion key={topic.id} defaultExpanded={topicIdx === 0 || isCurrentTopic}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography fontWeight={600}>{topic.title}</Typography>
                {topicStatus && (
                  <Tooltip title={topicStatus} placement="right" arrow disableInteractive>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <CheckCircleIcon color={topicStatus === "Passed" ? "success" : "warning"} fontSize="small" />
                    </Box>
                  </Tooltip>
                )}
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                {(topic.tasks || []).map((task) => {
                  const status: TrainingRunTaskStatus = task.result.status;
                  const isDone = status === "passed" || status === "passed_with_notes";
                  const hasNotes = status === "passed_with_notes";
                  const isActive = task.id === currentTaskId;
                  const isPending = status === "in_progress";
                  const statusLabel = isPending
                    ? "Pending"
                    : isDone
                    ? hasNotes
                      ? "Passed with notes"
                      : "Passed"
                    : "Not passed";
                  return (
                    <ListItem key={task.id} disablePadding>
                      <ListItemButton selected={isActive} onClick={() => onSelectTask(task.id)} sx={{ borderRadius: 1 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Tooltip title={statusLabel} placement="right" arrow disableInteractive>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              {isPending ? (
                                <RadioButtonCheckedIcon sx={{ color: "text.disabled" }} fontSize="small" />
                              ) : isDone ? (
                                <CheckCircleIcon color={hasNotes ? "warning" : "success"} fontSize="small" />
                              ) : (
                                <RadioButtonUncheckedIcon fontSize="small" />
                              )}
                            </Box>
                          </Tooltip>
                        </ListItemIcon>
                        <ListItemText primary={task.title} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
                {(topic.tasks || []).length === 0 && (
                  <ListItem>
                    <ListItemText primary="No tasks in this topic" primaryTypographyProps={{ variant: "body2" }} />
                  </ListItem>
                )}
              </List>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
}
