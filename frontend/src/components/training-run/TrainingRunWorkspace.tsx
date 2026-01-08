import { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { TrainingRunHtmlSection } from "./TrainingRunHtmlSection";
import { TrainingRunPreviewSection } from "./TrainingRunPreviewSection";

type TrainingRunWorkspaceProps = {
  html: string;
};

export function TrainingRunWorkspace({ html }: TrainingRunWorkspaceProps) {
  const [splitPercent, setSplitPercent] = useState(50);
  const isDraggingRef = useRef(false);
  const splitContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current || !splitContainerRef.current) return;
      const rect = splitContainerRef.current.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const percent = (relativeX / rect.width) * 100;
      const clamped = Math.min(70, Math.max(30, percent));
      setSplitPercent(clamped);
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <Box
      ref={splitContainerRef}
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          md: `${splitPercent}% 10px ${100 - splitPercent}%`,
        },
        gap: { xs: 2, md: 0 },
        alignItems: "stretch",
      }}
    >
      <TrainingRunHtmlSection html={html} />

      <Box
        onMouseDown={(e) => {
          e.preventDefault();
          isDraggingRef.current = true;
        }}
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "stretch",
          justifyContent: "center",
          cursor: "col-resize",
          px: 0.5,
        }}
      >
        <Box
          sx={{
            width: 4,
            bgcolor: "divider",
            borderRadius: 2,
            alignSelf: "stretch",
            transition: "background-color 0.2s ease",
            "&:hover": {
              bgcolor: "text.secondary",
            },
          }}
        />
      </Box>

      <TrainingRunPreviewSection html={html} />
    </Box>
  );
}
