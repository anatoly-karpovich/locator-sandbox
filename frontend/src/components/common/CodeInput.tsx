import { useRef } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type CodeInputProps = {
  value: string;
  onChange: (value: string) => void;
  highlightedHtml: string;
  placeholder?: string;
  minRows?: number;
};

export function CodeInput({
  value,
  onChange,
  highlightedHtml,
  placeholder,
  minRows = 1,
}: CodeInputProps) {
  const theme = useTheme();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const preRef = useRef<HTMLPreElement | null>(null);
  const lineHeightPx = 24;
  const minHeightPx = Math.max(minRows, 1) * lineHeightPx + 32;

  const handleScroll = () => {
    if (!textareaRef.current || !preRef.current) return;
    preRef.current.scrollTop = textareaRef.current.scrollTop;
    preRef.current.scrollLeft = textareaRef.current.scrollLeft;
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        color: theme.palette.code.text,
        "& .token-keyword": { color: theme.palette.code.keyword },
        "& .token-page": { color: theme.palette.code.page },
        "& .token-method": { color: theme.palette.code.method },
        "& .token-playwright-method": { color: theme.palette.code.method },
        "& .token-string": { color: theme.palette.code.string },
        "& .token-regex": { color: theme.palette.code.regex },
        "& .token-number": { color: theme.palette.code.number },
        "& .token-comment": { color: theme.palette.code.comment },
        "& .token-punctuation": { color: theme.palette.code.punctuation },
        "& .token-function": { color: theme.palette.code.method },
        "& .token-operator": { color: theme.palette.code.punctuation },
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
          background: theme.palette.code.background,
          border: `1px solid ${theme.palette.code.border}`,
          borderRadius: "var(--radius-sm)",
          pointerEvents: "none",
          whiteSpace: "pre-wrap",
          overflowWrap: "anywhere",
          wordBreak: "break-word",
          overflow: "hidden",
        }}
      >
        <Box component="code" dangerouslySetInnerHTML={{ __html: highlightedHtml || "&#8203;" }} />
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
          caretColor: theme.palette.code.caret,
          border: `1px solid ${theme.palette.code.border}`,
          borderRadius: "var(--radius-sm)",
          outline: "none",
          resize: "none",
          zIndex: 2,
          overflow: "hidden",
          "&::placeholder": { color: theme.palette.code.placeholder },
        }}
      />
    </Box>
  );
}
