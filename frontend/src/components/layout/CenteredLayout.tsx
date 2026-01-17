import { Box, Container } from "@mui/material";

type CenteredLayoutProps = {
  sidebar?: React.ReactNode;
  children: React.ReactNode;
  contentWidth?: number;
  sidebarWidth?: number;
  minSidePadding?: number;
};

export function CenteredLayout({
  sidebar,
  children,
  contentWidth = 1200,
  sidebarWidth = 260,
  minSidePadding = 8,
}: CenteredLayoutProps) {
  return (
    <Container maxWidth={false} sx={{ py: 6, px: `${minSidePadding}px` }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        {sidebar && (
          <Box
            component="aside"
            sx={{
              width: { xs: "100%", md: sidebarWidth },
              flexShrink: 0,
            }}
          >
            {sidebar}
          </Box>
        )}

        <Box
          component="main"
          sx={{
            width: "100%",
            maxWidth: contentWidth,
            minWidth: 0,
          }}
        >
          {children}
        </Box>
      </Box>
    </Container>
  );
}
