import { Box, Chip, Stack, Typography } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";

type TaskInfoBarProps = {
  description: string;
  studyMaterials: {
    title: string;
    url: string;
  }[];
};

export function TaskInfoBar({ description, studyMaterials }: TaskInfoBarProps) {
  return (
    <Stack
      direction="row"
      spacing={3}
      sx={{
        bgcolor: "background.paper",
        borderRadius: 2,
        padding: 2,
        border: 1,
        borderColor: "divider",
        alignItems: "flex-start",
      }}
    >
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ marginBottom: 0.5, textTransform: "uppercase", fontSize: 11, letterSpacing: 0.5 }}
        >
          Description
        </Typography>
        <Typography variant="body1">{description || "No description available."}</Typography>
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ marginBottom: 0.5, textTransform: "uppercase", fontSize: 11, letterSpacing: 0.5 }}
        >
          Study Materials
        </Typography>
        {studyMaterials.length > 0 ? (
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {studyMaterials.map((material, idx) => (
              <Chip
                key={idx}
                icon={<MenuBookIcon fontSize="small" />}
                label={material.title}
                size="small"
                variant="outlined"
                clickable
                component="a"
                href={material.url.startsWith("http") ? material.url : undefined}
                target="_blank"
                rel="noopener noreferrer"
              />
            ))}
          </Stack>
        ) : (
          <Typography variant="body2" color="text.secondary">
            No study materials for this task.
          </Typography>
        )}
      </Box>
    </Stack>
  );
}

