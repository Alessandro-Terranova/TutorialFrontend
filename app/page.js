"use client";

import AppShell from "@/components/AppShell";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import LinearProgress from "@mui/material/LinearProgress";
import Link from "next/link";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { modules, getTotalLessons } from "@/data/modules";
import { useProgress } from "@/hooks/useProgress";

export default function HomePage() {
  const { getModuleProgress, getTotalProgress } = useProgress();
  const total = getTotalProgress(modules);
  const progressPercent = total.total > 0 ? Math.round((total.done / total.total) * 100) : 0;

  return (
    <AppShell>
      <Box sx={{ textAlign: "center", mb: 6, mt: 2 }}>
        <Typography variant="h3" fontWeight={800} gutterBottom>
          Impara il Frontend Development
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: "auto", mb: 3 }}>
          Un tutorial interattivo per padroneggiare CSS, JavaScript, React, Redux, Next.js e Material UI
          — tutto quello che serve per costruire applicazioni web moderne.
        </Typography>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 3 }}>
          <Chip label={`${modules.length} Moduli`} color="primary" variant="outlined" />
          <Chip label={`${getTotalLessons()} Lezioni`} color="secondary" variant="outlined" />
          <Chip label="Esercizi Interattivi" color="success" variant="outlined" />
        </Box>

        {total.done > 0 && (
          <Box sx={{ maxWidth: 400, mx: "auto" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
              <Typography variant="body2" fontWeight={600}>
                Progresso globale
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {total.done}/{total.total} lezioni ({progressPercent}%)
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progressPercent}
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>
        )}
      </Box>

      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        Percorso di Apprendimento
      </Typography>

      <Grid container spacing={3}>
        {modules.map((mod, idx) => {
          const progress = getModuleProgress(mod.id, mod.lessons);
          const allDone = progress.done === progress.total;
          const pct = progress.total > 0 ? Math.round((progress.done / progress.total) * 100) : 0;
          return (
            <Grid key={mod.id} size={{ xs: 12, sm: 6 }}>
              <Link
                href={`/lesson/${mod.id}/${mod.lessons[0].id}`}
                style={{ textDecoration: "none" }}
              >
                <Card
                  sx={{
                    height: "100%",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                    },
                    borderTop: `4px solid ${mod.color}`,
                  }}
                >
                  <CardActionArea sx={{ height: "100%", p: 0 }}>
                    <CardContent>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                        <Chip
                          label={`Modulo ${idx + 1}`}
                          size="small"
                          sx={{
                            bgcolor: mod.color,
                            color: mod.color === "#f7df1e" || mod.color === "#61dafb" ? "#000" : "#fff",
                            fontWeight: 600,
                            fontSize: 11,
                          }}
                        />
                        <Chip
                          label={`${mod.lessons.length} lezioni`}
                          size="small"
                          variant="outlined"
                          sx={{ fontSize: 11 }}
                        />
                        {allDone && (
                          <CheckCircleIcon sx={{ fontSize: 18, color: "#2ecc71", ml: "auto" }} />
                        )}
                      </Box>
                      <Typography variant="h6" fontWeight={700} gutterBottom>
                        {mod.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {mod.description}
                      </Typography>

                      {progress.done > 0 && (
                        <Box sx={{ mb: 1.5 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                            <Typography variant="caption" color="text.secondary">
                              {progress.done}/{progress.total} completate
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {pct}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={pct}
                            sx={{
                              height: 4,
                              borderRadius: 2,
                              bgcolor: "rgba(0,0,0,0.06)",
                              "& .MuiLinearProgress-bar": { bgcolor: mod.color },
                            }}
                          />
                        </Box>
                      )}

                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {mod.lessons.map((lesson) => (
                          <Chip
                            key={lesson.id}
                            label={lesson.title}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: 11 }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          );
        })}
      </Grid>

      <Box sx={{ mt: 6, p: 4, bgcolor: "#f0f4ff", borderRadius: 3, textAlign: "center" }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Come usare questo tutorial
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 500, mx: "auto" }}>
          Segui i moduli in ordine: parti dalle basi di CSS e JavaScript, poi passa a React e alle
          tecnologie avanzate. Ogni lezione ha spiegazioni con esempi di codice reali e
          esercizi interattivi per mettere in pratica quello che impari. Il tuo progresso viene salvato
          automaticamente nel browser.
        </Typography>
      </Box>
    </AppShell>
  );
}
