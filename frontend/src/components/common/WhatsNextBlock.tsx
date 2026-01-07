import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

type WhatsNextItem = {
  title: string;
  description: string;
  actionLabel: string;
  route: string;
  disabled?: boolean;
};

type WhatsNextBlockProps = {
  title?: string;
  items: WhatsNextItem[];
};

export function WhatsNextBlock({ title = "What's next", items }: WhatsNextBlockProps) {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        p: 4,
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h6" fontWeight={700}>
          {title}
        </Typography>

        <Box display="flex" flexWrap="wrap" gap={3}>
          {items.map((item) => (
            <Box
              key={item.title}
              sx={{
                flex: "1 1 320px",
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
                p: 3,
                bgcolor: "background.default",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Stack spacing={1.5}>
                <Typography fontWeight={600}>{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </Stack>

              <Button
                variant="outlined"
                sx={{ mt: 2, alignSelf: "flex-start" }}
                onClick={() => navigate(item.route)}
                disabled={item.disabled}
              >
                {item.actionLabel}
              </Button>
            </Box>
          ))}
        </Box>
      </Stack>
    </Box>
  );
}
