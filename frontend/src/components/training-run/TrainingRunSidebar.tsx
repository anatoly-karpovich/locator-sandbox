import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import type { TrainingRunTopic } from "../../types";

type TrainingRunSidebarProps = {
  topics: TrainingRunTopic[];
  currentTaskId: string | null;
  completedTasks: Set<string>;
  onSelectTask: (taskId: string) => void;
};

export function TrainingRunSidebar({
  topics,
  currentTaskId,
  completedTasks,
  onSelectTask,
}: TrainingRunSidebarProps) {
  return (
    <Box sx={{ width: 280, padding: 2 }}>
      {topics.map((topic, topicIdx) => {
        const isCurrentTopic = (topic.tasks || []).some((t) => t.id === currentTaskId);
        return (
          <Accordion key={topic.id} defaultExpanded={topicIdx === 0 || isCurrentTopic}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography fontWeight={600}>{topic.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                {(topic.tasks || []).map((task) => {
                  const isDone = completedTasks.has(task.id);
                  const isActive = task.id === currentTaskId;
                  return (
                    <ListItem key={task.id} disablePadding>
                      <ListItemButton selected={isActive} onClick={() => onSelectTask(task.id)} sx={{ borderRadius: 1 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          {isDone ? (
                            <CheckCircleIcon color="success" fontSize="small" />
                          ) : (
                            <RadioButtonUncheckedIcon fontSize="small" />
                          )}
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
