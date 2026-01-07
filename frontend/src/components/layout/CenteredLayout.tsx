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
  minSidePadding = 16,
}: CenteredLayoutProps) {
  const leftOffset = `max(${minSidePadding}px, calc(25% - ${contentWidth / 4}px - ${sidebarWidth / 2}px))`;

  return (
    <Container maxWidth={false} sx={{ py: 6 }}>
      <Box sx={{ position: "relative" }}>
        {sidebar && (
          <>
            <Box
              component="aside"
              sx={{
                width: sidebarWidth,
                display: { xs: "none", md: "block" },
                position: "absolute",
                top: 0,
                left: leftOffset,
              }}
            >
              {sidebar}
            </Box>
            <Box component="aside" sx={{ display: { xs: "block", md: "none" }, mb: 4 }}>
              {sidebar}
            </Box>
          </>
        )}

        <Box component="main" sx={{ maxWidth: contentWidth, mx: "auto" }}>
          {children}
        </Box>
      </Box>
    </Container>
  );
}
