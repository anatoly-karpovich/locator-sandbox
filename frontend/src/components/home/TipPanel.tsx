import { Box, Stack, Typography } from "@mui/material";

export function TipPanel() {
  return (
    <Box
      sx={{
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
        padding: 2,
      }}
    >
      <Stack spacing={1.5}>
        <Typography variant="subtitle1" fontWeight={700}>
          Tip of the moment
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Prefer semantic locators when you want intent. Switch to structural locators when semantics are unstable.
          Your job is to pick the compromise you can maintain.
        </Typography>
        <Box component="ul" sx={{ margin: 0, paddingLeft: 2, color: "text.secondary", fontSize: 13 }}>
          <li>Intent vs structure</li>
          <li>Exact vs partial</li>
          <li>Collections reasoning</li>
          <li>Nested filtering</li>
          <li>Readable chaining</li>
          <li>Robustness trade-offs</li>
        </Box>
      </Stack>
    </Box>
  );
}
