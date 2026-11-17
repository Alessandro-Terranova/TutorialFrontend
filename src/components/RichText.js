import { Fragment } from "react";
import Box from "@mui/material/Box";

// Rende la formattazione inline usata nei testi delle lezioni:
//   `codice`   **grassetto**   *corsivo*
// Tutto il resto viene mostrato come testo semplice (nessun HTML interpretato).
const TOKEN = /(``\s?[^`]+?\s?``|`[^`\n]+`|\*\*[^*\n]+\*\*|\*[^*\s][^*\n]*\*)/g;

export default function RichText({ text }) {
  if (typeof text !== "string" || text === "") return text ?? null;
  const parts = text.split(TOKEN);
  return parts.map((part, i) => {
    if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>;
    if (part.startsWith("``")) {
      return <InlineCode key={i}>{part.slice(2, -2).trim()}</InlineCode>;
    }
    if (part.startsWith("`")) {
      return <InlineCode key={i}>{part.slice(1, -1)}</InlineCode>;
    }
    if (part.startsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    return <em key={i}>{part.slice(1, -1)}</em>;
  });
}

function InlineCode({ children }) {
  return (
    <Box
      component="code"
      sx={{
        fontFamily: "'Fira Code', 'Consolas', monospace",
        fontSize: "0.88em",
        bgcolor: "rgba(67, 97, 238, 0.08)",
        color: "#3a0ca3",
        px: 0.6,
        py: 0.1,
        borderRadius: 0.75,
        whiteSpace: "pre-wrap",
      }}
    >
      {children}
    </Box>
  );
}
