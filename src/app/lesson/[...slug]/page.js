"use client";

import { use } from "react";
import AppShell from "@/components/AppShell";
import LessonLayout from "@/components/LessonLayout";
import CodeBlock from "@/components/CodeBlock";
import Exercise from "@/components/Exercise";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { getLesson } from "@/data/modules";

import { lessons as cssLessons } from "@/data/lessons/css";
import { lessons as jsBasicsLessons } from "@/data/lessons/js-basics";
import { lessons as jsAdvancedLessons } from "@/data/lessons/js-advanced";
import { lessons as reactBasicsLessons } from "@/data/lessons/react-basics";
import { lessons as reactAdvancedLessons } from "@/data/lessons/react-advanced";
import { lessons as reduxLessons } from "@/data/lessons/redux";
import { lessons as nextjsLessons } from "@/data/lessons/nextjs";
import { lessons as muiLessons } from "@/data/lessons/mui";
import { lessons as projectLessons } from "@/data/lessons/project";

const allLessons = {
  css: cssLessons,
  "js-basics": jsBasicsLessons,
  "js-advanced": jsAdvancedLessons,
  "react-basics": reactBasicsLessons,
  "react-advanced": reactAdvancedLessons,
  redux: reduxLessons,
  nextjs: nextjsLessons,
  mui: muiLessons,
  project: projectLessons,
};

function Section({ section }) {
  if (section.type === "text") {
    return (
      <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8 }}>
        {section.content}
      </Typography>
    );
  }
  if (section.type === "code") {
    return <CodeBlock code={section.code} language={section.language} title={section.title} />;
  }
  if (section.type === "heading") {
    return (
      <Typography variant="h5" fontWeight={600} sx={{ mt: 4, mb: 2 }}>
        {section.content}
      </Typography>
    );
  }
  if (section.type === "subheading") {
    return (
      <Typography variant="h6" fontWeight={600} sx={{ mt: 3, mb: 1.5 }}>
        {section.content}
      </Typography>
    );
  }
  if (section.type === "info") {
    return (
      <Alert severity="info" sx={{ my: 2 }}>
        {section.content}
      </Alert>
    );
  }
  if (section.type === "warning") {
    return (
      <Alert severity="warning" sx={{ my: 2 }}>
        {section.content}
      </Alert>
    );
  }
  if (section.type === "tip") {
    return (
      <Alert severity="success" sx={{ my: 2 }}>
        <strong>Tip dal progetto:</strong> {section.content}
      </Alert>
    );
  }
  if (section.type === "list") {
    return (
      <Box component="ul" sx={{ pl: 3, mb: 2, "& li": { mb: 0.5, lineHeight: 1.8 } }}>
        {section.items.map((item, i) => (
          <li key={i}>
            <Typography variant="body1">{item}</Typography>
          </li>
        ))}
      </Box>
    );
  }
  return null;
}

export default function LessonPage({ params }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug || [];
  const [moduleId, lessonId] = slug;

  const lessonMeta = getLesson(moduleId, lessonId);
  if (!lessonMeta) {
    return (
      <AppShell>
        <Typography variant="h5">Lezione non trovata</Typography>
      </AppShell>
    );
  }

  const lessonContent = allLessons[moduleId]?.[lessonId];
  if (!lessonContent) {
    return (
      <AppShell>
        <Typography variant="h5">Contenuto non ancora disponibile</Typography>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <LessonLayout
        moduleId={moduleId}
        lessonId={lessonId}
        moduleTitle={lessonMeta.module.title}
        lessonTitle={lessonMeta.lesson.title}
        moduleColor={lessonMeta.module.color}
      >
        {lessonContent.sections.map((section, i) => (
          <Section key={i} section={section} />
        ))}

        {lessonContent.exercises?.length > 0 && (
          <Box sx={{ mt: 5 }}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
              Esercizi
            </Typography>
            {lessonContent.exercises.map((ex, i) => (
              <Exercise key={i} exercise={ex} index={i + 1} />
            ))}
          </Box>
        )}
      </LessonLayout>
    </AppShell>
  );
}
