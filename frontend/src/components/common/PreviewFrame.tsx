import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type PreviewFrameProps = {
  html: string;
  title: string;
  minHeight?: number;
};

export function PreviewFrame({ html, title, minHeight = 250 }: PreviewFrameProps) {
  const theme = useTheme();
  const previewBg = theme.palette.mode === "dark" ? "#0f1116" : "#edf0f7";
  const previewDoc = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      * { box-sizing: border-box; }
      html, body { margin: 0; padding: 0; background: ${previewBg}; }
      body { font-family: ${theme.typography.fontFamily}; color: ${theme.palette.text.primary}; }
      .preview-root { padding: 8px; min-height: ${minHeight}px; }
      .preview-root,
      .preview-root * {
        pointer-events: none;
      }
    </style>
  </head>
  <body>
    <div class="preview-root">${html || ""}</div>
  </body>
</html>`;

  return (
    <Box
      component="iframe"
      title={title}
      sandbox=""
      srcDoc={previewDoc}
      sx={{
        width: "100%",
        height: "100%",
        border: 0,
        display: "block",
        minHeight: `${minHeight}px`,
      }}
    />
  );
}
