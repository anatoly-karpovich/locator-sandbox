import { useMemo, useRef } from "react";
import { Box, Button, CircularProgress, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { highlightLocatorSyntax } from "../../utils/syntaxHighlighter";

type LocatorInputProps = {
  value: string;
  onChange: (value: string) => void;
  onRun: () => void;
  isRunning: boolean;
  isDisabled: boolean;
  placeholder?: string;
  minRows?: number;
};


export function LocatorInput({
  value,
  onChange,
  onRun,
  isRunning,
  isDisabled,
  placeholder = "page.getByRole('heading', { name: 'Task 1' })",
  minRows = 1,
}: LocatorInputProps) {
  const theme = useTheme();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const preRef = useRef<HTMLPreElement | null>(null);
  const highlighted = useMemo(() => highlightLocatorSyntax(value), [value]);
  const lineHeightPx = 24;
  const minHeightPx = Math.max(minRows, 1) * lineHeightPx + 32;
  const palette = theme.palette.code;

  const handleScroll = () => {
    if (!textareaRef.current || !preRef.current) return;
    preRef.current.scrollTop = textareaRef.current.scrollTop;
    preRef.current.scrollLeft = textareaRef.current.scrollLeft;
  };

  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="flex-start">
        <Box
          sx={{
            position: "relative",
            width: "100%",
            color: palette.text,
            "& .token-keyword": { color: palette.keyword },
            "& .token-page": { color: palette.page },
            "& .token-method": { color: palette.method },
            "& .token-string": { color: palette.string },
            "& .token-regex": { color: palette.regex },
            "& .token-number": { color: palette.number },
            "& .token-comment": { color: palette.comment },
            "& .token-punctuation": { color: palette.punctuation },
          }}
        >
          <Box
            component="pre"
            ref={preRef}
            aria-hidden="true"
            sx={{
              margin: 0,
              padding: "16px",
              width: "100%",
              minHeight: `${minHeightPx}px`,
              boxSizing: "border-box",
              fontFamily: '"JetBrains Mono", "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
              fontSize: "15px",
              lineHeight: 1.6,
              tabSize: 2,
              background: palette.background,
              border: `1px solid ${palette.border}`,
              borderRadius: "6px",
              pointerEvents: "none",
              whiteSpace: "pre-wrap",
              overflowWrap: "anywhere",
              wordBreak: "break-word",
              overflow: "hidden",
            }}
          >
            <Box component="code" dangerouslySetInnerHTML={{ __html: highlighted || "&#8203;" }} />
          </Box>
          <Box
            component="textarea"
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onScroll={handleScroll}
            placeholder={placeholder}
            spellCheck={false}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              margin: 0,
              padding: "16px",
              width: "100%",
              height: "100%",
              minHeight: `${minHeightPx}px`,
              boxSizing: "border-box",
              fontFamily: '"JetBrains Mono", "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
              fontSize: "15px",
              lineHeight: 1.6,
              tabSize: 2,
              whiteSpace: "pre-wrap",
              overflowWrap: "anywhere",
              wordBreak: "break-word",
              background: "transparent",
              color: "transparent",
              caretColor: palette.caret,
              border: `1px solid ${palette.border}`,
              borderRadius: "6px",
              outline: "none",
              resize: "none",
              zIndex: 2,
              overflow: "hidden",
              "&::placeholder": { color: palette.placeholder },
            }}
          />
        </Box>
        <Stack spacing={1} alignItems="flex-start">
          <Button
            variant="contained"
            startIcon={isRunning ? <CircularProgress size={18} color="inherit" /> : <PlayArrowIcon />}
            sx={{ minWidth: 140 }}
            onClick={onRun}
            disabled={isDisabled}
          >
            {isRunning ? "Running..." : "Run"}
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
}
