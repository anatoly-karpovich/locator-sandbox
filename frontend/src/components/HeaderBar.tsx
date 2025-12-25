import { AppBar, Toolbar, Typography } from "@mui/material";

type HeaderBarProps = {
  rightSlot?: React.ReactNode;
};

export function HeaderBar({ rightSlot }: HeaderBarProps) {
  return (
    <AppBar position="static" sx={{ height: 64, justifyContent: "center", boxShadow: "none" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" fontWeight={600}>
          Locator Sandbox
        </Typography>
        <div>{rightSlot}</div>
      </Toolbar>
    </AppBar>
  );
}
