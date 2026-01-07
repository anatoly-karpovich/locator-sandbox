import { Box, Button, Chip, Stack, Typography } from "@mui/material";

type PlaywrightModeCardProps = {
  title: string;
  subtitle: string;
  description: string;
  badges: string[];
  actionLabel: string;
  highlight?: boolean;
  isDisabled?: boolean;
  onClick: () => void;
};

export default function PlaywrightModeCard({
  title,
  subtitle,
  description,
  badges,
  actionLabel,
  highlight,
  isDisabled,
  onClick,
}: PlaywrightModeCardProps) {
  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: 3,
        borderRadius: 3,
        backgroundColor: "background.default",
        border: "1px solid",
        borderColor: highlight ? "primary.main" : "divider",
        boxShadow: highlight ? 8 : 0,
        transition: "0.15s ease",
        "&:hover": {
          boxShadow: 4,
          borderColor: "primary.main",
        },
      }}
    >
      <Stack spacing={1.2}>
        <Typography variant="h6" fontWeight={800}>
          {title}
        </Typography>

        <Typography variant="subtitle2" color="text.secondary">
          {subtitle}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>

        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ marginTop: 1 }}>
          {badges.map((badge) => (
            <Chip key={badge} label={badge} size="small" />
          ))}
        </Stack>
      </Stack>

      <Box sx={{ marginTop: "auto", paddingTop: 3 }}>
        <Button variant={highlight ? "contained" : "outlined"} fullWidth onClick={onClick} disabled={isDisabled}>
          {actionLabel}
        </Button>
      </Box>
    </Box>
  );
}
