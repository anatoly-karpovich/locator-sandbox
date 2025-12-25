import { AppBar, Toolbar, Typography } from "@mui/material";

export function HeaderBar() {
  return (
    <AppBar position="static" sx={{ height: 64, justifyContent: "center", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" fontWeight={600}>
          Locator Sandbox
        </Typography>
        <div />
      </Toolbar>
    </AppBar>
  );
}
