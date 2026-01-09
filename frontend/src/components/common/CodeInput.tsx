import { useMemo, useRef } from "react";
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
  const isDark = theme.palette.mode === "dark";
  const tokens = useMemo(
    () => ({
      background: isDark ? "#1e1e1e" : "#f8fafc",
      border: isDark ? "#333333" : "#d3dbe7",
      text: isDark ? "#d4d4d4" : "#1f2937",
      placeholder: isDark ? "#7a7a7a" : "#94a3b8",
      caret: isDark ? "#d4d4d4" : "#111827",
      keyword: isDark ? "#c586c0" : "#7c3aed",
      page: isDark ? "#569cd6" : "#2563eb",
      method: isDark ? "#dcdcaa" : "#b45309",
      string: isDark ? "#ce9178" : "#b91c1c",
      regex: isDark ? "#d16969" : "#ef4444",
      number: isDark ? "#b5cea8" : "#15803d",
      comment: isDark ? "#6a9955" : "#64748b",
      punctuation: isDark ? "#d4d4d4" : "#1f2937",
    }),
    [isDark],
  );

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
        color: tokens.text,
        "& .token-keyword": { color: tokens.keyword },
        "& .token-page": { color: tokens.page },
        "& .token-method": { color: tokens.method },
        "& .token-string": { color: tokens.string },
        "& .token-regex": { color: tokens.regex },
        "& .token-number": { color: tokens.number },
        "& .token-comment": { color: tokens.comment },
        "& .token-punctuation": { color: tokens.punctuation },
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
          background: tokens.background,
          border: `1px solid ${tokens.border}`,
          borderRadius: "6px",
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
          caretColor: tokens.caret,
          border: `1px solid ${tokens.border}`,
          borderRadius: "6px",
          outline: "none",
          resize: "none",
          zIndex: 2,
          overflow: "hidden",
          "&::placeholder": { color: tokens.placeholder },
        }}
      />
    </Box>
  );
}
