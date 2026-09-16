"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { getAdjacentLessons } from "@/data/modules";
import { useProgress } from "@/hooks/useProgress";

export default function LessonLayout({ moduleId, lessonId, moduleTitle, lessonTitle, moduleColor, children }) {
  const { prev, next } = getAdjacentLessons(moduleId, lessonId);
  const { isCompleted, markCompleted, unmarkCompleted } = useProgress();
  const done = isCompleted(moduleId, lessonId);

  const handleToggle = () => {
    if (done) {
      unmarkCompleted(moduleId, lessonId);
    } else {
      markCompleted(moduleId, lessonId);
    }
  };

  const handleNext = () => {
    if (!done) markCompleted(moduleId, lessonId);
  };

  return (
    <Box>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 2 }}
      >
        <Link href="/" style={{ textDecoration: "none", color: "#666" }}>
          Home
        </Link>
        <Chip
          label={moduleTitle}
          size="small"
          sx={{ bgcolor: moduleColor, color: "#fff", fontWeight: 600, fontSize: 11 }}
        />
        <Typography color="text.primary" fontSize={14}>
          {lessonTitle}
        </Typography>
      </Breadcrumbs>

      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        {lessonTitle}
      </Typography>

      {children}

      <Box sx={{ mt: 5, mb: 2, display: "flex", justifyContent: "center" }}>
        <Button
          variant={done ? "outlined" : "contained"}
          color={done ? "success" : "primary"}
          size="large"
          startIcon={done ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
          onClick={handleToggle}
          sx={{ px: 4, py: 1.2 }}
        >
          {done ? "Completata!" : "Segna come completata"}
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 3,
          pt: 3,
          borderTop: "1px solid #e0e0e0",
        }}
      >
        {prev ? (
          <Link href={`/lesson/${prev.moduleId}/${prev.lessonId}`} style={{ textDecoration: "none" }}>
            <Button startIcon={<ArrowBackIcon />} variant="outlined">
              {prev.title}
            </Button>
          </Link>
        ) : (
          <Box />
        )}
        {next ? (
          <Link href={`/lesson/${next.moduleId}/${next.lessonId}`} style={{ textDecoration: "none" }}>
            <Button endIcon={<ArrowForwardIcon />} variant="contained" onClick={handleNext}>
              {next.title}
            </Button>
          </Link>
        ) : (
          <Link href="/" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="success" onClick={handleNext}>
              Tutorial Completato!
            </Button>
          </Link>
        )}
      </Box>
    </Box>
  );
}
