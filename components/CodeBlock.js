"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

export default function CodeBlock({ code, language = "javascript", title }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ my: 2, borderRadius: 2, overflow: "hidden", border: "1px solid #e0e0e0" }}>
      {title && (
        <Box
          sx={{
            bgcolor: "#e8ecff",
            px: 2,
            py: 0.75,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="caption" fontWeight={600} color="primary">
            {title}
          </Typography>
          <Typography variant="caption" sx={{ color: "#999" }}>
            {language}
          </Typography>
        </Box>
      )}
      <Box sx={{ position: "relative" }}>
        <IconButton
          onClick={handleCopy}
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "#888",
            bgcolor: "rgba(255,255,255,0.1)",
            "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
          }}
        >
          {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
        </IconButton>
        <Box
          component="pre"
          sx={{
            bgcolor: "#1e1e2e",
            color: "#cdd6f4",
            p: 2.5,
            m: 0,
            overflow: "auto",
            fontSize: 13.5,
            lineHeight: 1.7,
            fontFamily: "'Fira Code', 'Consolas', monospace",
            "& .keyword": { color: "#cba6f7" },
            "& .string": { color: "#a6e3a1" },
            "& .number": { color: "#fab387" },
            "& .comment": { color: "#6c7086", fontStyle: "italic" },
            "& .function": { color: "#89b4fa" },
          }}
        >
          <code>{code}</code>
        </Box>
      </Box>
    </Box>
  );
}
