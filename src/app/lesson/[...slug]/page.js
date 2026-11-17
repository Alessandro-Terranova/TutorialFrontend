"use client";

import { use, useState } from "react";
import AppShell from "@/components/AppShell";
import LessonLayout from "@/components/LessonLayout";
import CodeBlock from "@/components/CodeBlock";
import Exercise from "@/components/Exercise";
import RichText from "@/components/RichText";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { getLesson } from "@/data/modules";

import { lessons as cssLessons } from "@/data/lessons/css";
import { lessons as jsBasicsLessons } from "@/data/lessons/js-basics";
import { lessons as jsAdvancedLessons } from "@/data/lessons/js-advanced";
import { lessons as reactBasicsLessons } from "@/data/lessons/react-basics";
import { lessons as reactAdvancedLessons } from "@/data/lessons/react-advanced";
import { lessons as reduxLessons } from "@/data/lessons/redux";
import { lessons as nextjsLessons } from "@/data/lessons/nextjs";
import { lessons as muiLessons } from "@/data/lessons/mui";
import { lessons as muiXLessons } from "@/data/lessons/mui-x";
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
  "mui-x": muiXLessons,
  project: projectLessons,
};

function Section({ section }) {
  if (section.type === "text") {
    return (
      <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.8, whiteSpace: "pre-line" }}>
        <RichText text={section.content} />
      </Typography>
    );
  }
  if (section.type === "code") {
    return <CodeBlock code={section.code} language={section.language} title={section.title} />;
  }
  if (section.type === "heading") {
    return (
      <Typography variant="h5" fontWeight={600} sx={{ mt: 4, mb: 2 }}>
        <RichText text={section.content} />
      </Typography>
    );
  }
  if (section.type === "subheading") {
    return (
      <Typography variant="h6" fontWeight={600} sx={{ mt: 3, mb: 1.5 }}>
        <RichText text={section.content} />
      </Typography>
    );
  }
  if (section.type === "info") {
    return (
      <Alert severity="info" sx={{ my: 2 }}>
        <RichText text={section.content} />
      </Alert>
    );
  }
  if (section.type === "warning") {
    return (
      <Alert severity="warning" sx={{ my: 2 }}>
        <RichText text={section.content} />
      </Alert>
    );
  }
  if (section.type === "tip") {
    return (
      <Alert severity="success" sx={{ my: 2 }}>
        <strong>Consiglio pratico:</strong> <RichText text={section.content} />
      </Alert>
    );
  }
  if (section.type === "list") {
    return (
      <Box component="ul" sx={{ pl: 3, mb: 2, "& li": { mb: 0.5, lineHeight: 1.8 } }}>
        {section.items.map((item, i) => (
          <li key={i}>
            <Typography variant="body1"><RichText text={item} /></Typography>
          </li>
        ))}
      </Box>
    );
  }
  return null;
}

// Due tab: la teoria e gli esercizi (prima le domande a risposta multipla, poi quelli di codice).
function LessonTabs({ moduleId, lessonId, content }) {
  const [tab, setTab] = useState(0);
  const exercises = content.exercises || [];
  const quizzes = exercises.filter((ex) => ex.type === "multiple-choice");
  const codeExercises = exercises.filter((ex) => ex.type !== "multiple-choice");

  const goToExercises = () => {
    setTab(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 5,
          bgcolor: "background.default",
          borderBottom: 1,
          borderColor: "divider",
          mb: 3,
        }}
      >
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab icon={<MenuBookIcon />} iconPosition="start" label="Teoria" sx={{ fontWeight: 600, minHeight: 56 }} />
          <Tab
            icon={<FitnessCenterIcon />}
            iconPosition="start"
            label={`Esercizi (${exercises.length})`}
            disabled={exercises.length === 0}
            sx={{ fontWeight: 600, minHeight: 56 }}
          />
        </Tabs>
      </Box>

      {/* Le tab restano montate: il codice scritto negli esercizi non si perde cambiando tab */}
      <Box role="tabpanel" hidden={tab !== 0}>
        {content.sections.map((section, i) => (
          <Section key={i} section={section} />
        ))}
        {exercises.length > 0 && (
          <Box sx={{ mt: 5, textAlign: "center" }}>
            <Button variant="contained" size="large" endIcon={<ArrowForwardIcon />} onClick={goToExercises}>
              Mettiti alla prova: vai agli esercizi
            </Button>
          </Box>
        )}
      </Box>

      <Box role="tabpanel" hidden={tab !== 1}>
        {quizzes.length > 0 && (
          <>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
              Domande a risposta multipla
            </Typography>
            {quizzes.map((ex, i) => (
              <Exercise key={`${moduleId}/${lessonId}/q${i}`} exercise={ex} index={i + 1} label="Domanda" />
            ))}
          </>
        )}
        {codeExercises.length > 0 && (
          <>
            <Typography variant="h5" fontWeight={700} sx={{ mt: quizzes.length ? 5 : 0, mb: 1 }}>
              Esercizi di codice
            </Typography>
            {codeExercises.map((ex, i) => (
              <Exercise key={`${moduleId}/${lessonId}/c${i}`} exercise={ex} index={i + 1} />
            ))}
          </>
        )}
      </Box>
    </Box>
  );
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
        <LessonTabs key={`${moduleId}/${lessonId}`} moduleId={moduleId} lessonId={lessonId} content={lessonContent} />
      </LessonLayout>
    </AppShell>
  );
}
