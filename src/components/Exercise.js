"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Collapse from "@mui/material/Collapse";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import EditNoteIcon from "@mui/icons-material/EditNote";
import RichText from "@/components/RichText";

const RUN_TIMEOUT_MS = 5000;

const LOG_COLORS = {
  log: "#cdd6f4",
  info: "#89b4fa",
  warn: "#f9e2af",
  error: "#f38ba8",
};

// Esegue il codice in un Web Worker isolato (public/sandbox-worker.js):
// niente accesso alla pagina e un ciclo infinito viene interrotto dopo RUN_TIMEOUT_MS.
function runInSandbox(payload) {
  return new Promise((resolve) => {
    let worker;
    try {
      worker = new Worker("/sandbox-worker.js");
    } catch (err) {
      resolve({ logs: [], error: `Impossibile avviare la sandbox: ${err.message}`, passed: false });
      return;
    }
    const timer = setTimeout(() => {
      worker.terminate();
      resolve({
        logs: [],
        error: `Tempo scaduto: il codice ha impiegato più di ${RUN_TIMEOUT_MS / 1000} secondi. Hai forse scritto un ciclo infinito?`,
        passed: false,
      });
    }, RUN_TIMEOUT_MS);
    worker.onmessage = (event) => {
      clearTimeout(timer);
      worker.terminate();
      resolve(event.data);
    };
    worker.onerror = (event) => {
      clearTimeout(timer);
      worker.terminate();
      resolve({ logs: [], error: event.message || "Errore sconosciuto", passed: false });
    };
    worker.postMessage(payload);
  });
}

function ConsoleOutput({ result }) {
  const { logs = [], error } = result;
  return (
    <Box
      sx={{
        bgcolor: "#11111b",
        color: "#cdd6f4",
        borderRadius: 1,
        p: 1.5,
        mb: 1,
        fontFamily: "'Fira Code', 'Consolas', monospace",
        fontSize: 13,
        maxHeight: 360,
        overflow: "auto",
      }}
    >
      <Typography variant="caption" sx={{ color: "#6c7086", display: "block", mb: 0.5 }}>
        Console
      </Typography>
      {logs.length === 0 && !error && (
        <Box component="span" sx={{ color: "#6c7086", fontStyle: "italic" }}>
          Nessun output. Usa console.log(...) per stampare dei valori.
        </Box>
      )}
      {logs.map((line, i) => (
        <Box
          key={i}
          component="pre"
          sx={{
            m: 0,
            py: 0.25,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            color: LOG_COLORS[line.level] || LOG_COLORS.log,
            borderBottom: i < logs.length - 1 ? "1px solid #1e1e2e" : "none",
            fontFamily: "inherit",
          }}
        >
          {line.text}
        </Box>
      ))}
      {error && (
        <Box
          component="pre"
          sx={{ m: 0, mt: logs.length ? 1 : 0, whiteSpace: "pre-wrap", color: LOG_COLORS.error, fontFamily: "inherit" }}
        >
          {error}
        </Box>
      )}
    </Box>
  );
}

// Anteprima live per gli esercizi CSS: il CSS dell'utente viene applicato
// all'HTML dell'esercizio dentro un iframe isolato.
function CssPreview({ css, html }) {
  const doc = `<!doctype html><html><head><style>
body { font-family: -apple-system, 'Segoe UI', Roboto, sans-serif; margin: 12px; color: #222; }
</style><style>${css.replace(/<\/style/gi, "")}</style></head><body>${html}</body></html>`;
  return (
    <Box sx={{ mb: 1 }}>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 0.5 }}>
        Anteprima (si aggiorna mentre scrivi)
      </Typography>
      <Box
        component="iframe"
        title="Anteprima CSS"
        sandbox=""
        srcDoc={doc}
        sx={{ width: "100%", height: 220, border: "1px solid #e0e0e0", borderRadius: 1, bgcolor: "#fff", resize: "both", maxWidth: "100%", minWidth: 240 }}
      />
    </Box>
  );
}

function CodeExercise({ exercise }) {
  const initialCode = exercise.starterCode || "";
  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState(null);
  const [running, setRunning] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [copied, setCopied] = useState(false);

  const copySolution = () => {
    navigator.clipboard?.writeText(exercise.solution);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  // mode:
  //  - "js" (default): il codice viene eseguito nella sandbox e si vede la console
  //  - "css": il CSS viene applicato a `exercise.previewHtml` in un'anteprima live
  //  - "static": codice React/JSX che non si può eseguire, si verifica solo il testo
  const mode = exercise.mode || "js";
  const isStatic = mode !== "js";

  const runCode = async () => {
    setRunning(true);
    const res = await runInSandbox({
      code,
      validate: exercise.validate || "",
      mode,
    });
    setResult(res);
    setRunning(false);
  };

  // Tab inserisce due spazi, Ctrl/Cmd+Invio esegue il codice
  const handleKeyDown = (e) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const el = e.target;
      const { selectionStart, selectionEnd } = el;
      setCode(code.slice(0, selectionStart) + "  " + code.slice(selectionEnd));
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = selectionStart + 2;
      });
    } else if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      runCode();
    }
  };

  let verdict = null;
  if (result && exercise.validate) {
    if (result.passed) {
      verdict = { severity: "success", text: "Corretto! Ottimo lavoro." };
    } else if (result.error && !isStatic) {
      verdict = { severity: "error", text: "Il codice ha generato un errore: correggilo e riprova." };
    } else {
      verdict = { severity: "warning", text: result.message || "Non ancora corretto. Rileggi la consegna e riprova!" };
    }
  }

  return (
    <Box>
      {mode === "static" && (
        <Alert severity="info" sx={{ mb: 1 }}>
          Questo codice usa React/JSX e non viene eseguito qui: il pulsante &quot;Verifica&quot; controlla che la
          struttura del codice sia corretta.
        </Alert>
      )}
      <TextField
        multiline
        fullWidth
        minRows={4}
        maxRows={24}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={handleKeyDown}
        slotProps={{ htmlInput: { spellCheck: false, autoCapitalize: "off", autoCorrect: "off" } }}
        sx={{
          mb: 1,
          "& .MuiInputBase-root": {
            fontFamily: "'Fira Code', 'Consolas', monospace",
            fontSize: 13,
            bgcolor: "#1e1e2e",
            color: "#cdd6f4",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#333",
          },
        }}
      />
      <Box sx={{ display: "flex", gap: 1, mb: 1, alignItems: "center", flexWrap: "wrap" }}>
        <Button variant="contained" startIcon={<PlayArrowIcon />} onClick={runCode} size="small" disabled={running}>
          {running ? "In esecuzione..." : isStatic ? "Verifica" : "Esegui"}
        </Button>
        <Button
          variant="text"
          startIcon={<RestartAltIcon />}
          onClick={() => {
            setCode(initialCode);
            setResult(null);
          }}
          size="small"
        >
          Ripristina
        </Button>
        {exercise.solution && (
          <Button
            variant={showSolution ? "contained" : "outlined"}
            color="success"
            startIcon={showSolution ? <VisibilityOffIcon /> : <VisibilityIcon />}
            onClick={() => setShowSolution(!showSolution)}
            size="small"
          >
            {showSolution ? "Nascondi soluzione" : "Mostra soluzione"}
          </Button>
        )}
        <Typography variant="caption" color="text.secondary" sx={{ ml: "auto" }}>
          Ctrl+Invio per {isStatic ? "verificare" : "eseguire"}
        </Typography>
      </Box>
      {mode === "css" && exercise.previewHtml && <CssPreview css={code} html={exercise.previewHtml} />}
      {result && !isStatic && <ConsoleOutput result={result} />}
      {verdict && (
        <Alert
          severity={verdict.severity}
          icon={verdict.severity === "success" ? <CheckCircleIcon /> : undefined}
          sx={{ mb: 1, whiteSpace: "pre-line" }}
        >
          <RichText text={verdict.text} />
        </Alert>
      )}
      {exercise.solution && (
        <Collapse in={showSolution} timeout={250} unmountOnExit>
          <Box
            sx={{
              mt: 2,
              borderRadius: 2,
              overflow: "hidden",
              border: "2px solid",
              borderColor: "success.main",
              boxShadow: "0 4px 16px rgba(46, 204, 113, 0.18)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1,
                bgcolor: "success.main",
                color: "#fff",
              }}
            >
              <LightbulbIcon fontSize="small" />
              <Typography variant="subtitle2" fontWeight={700} sx={{ flexGrow: 1 }}>
                Soluzione proposta
              </Typography>
              <Button
                size="small"
                startIcon={copied ? <CheckIcon /> : <ContentCopyIcon />}
                onClick={copySolution}
                sx={{ color: "#fff", "&:hover": { bgcolor: "rgba(255,255,255,0.15)" } }}
              >
                {copied ? "Copiata" : "Copia"}
              </Button>
              <Button
                size="small"
                startIcon={<EditNoteIcon />}
                onClick={() => {
                  setCode(exercise.solution);
                  setResult(null);
                }}
                sx={{ color: "#fff", "&:hover": { bgcolor: "rgba(255,255,255,0.15)" } }}
              >
                Usa nell&apos;editor
              </Button>
            </Box>
            <Box
              component="pre"
              sx={{
                bgcolor: "#1e1e2e",
                color: "#cdd6f4",
                p: 2,
                m: 0,
                fontSize: 13,
                lineHeight: 1.6,
                fontFamily: "'Fira Code', 'Consolas', monospace",
                overflow: "auto",
                maxHeight: 480,
              }}
            >
              {exercise.solution}
            </Box>
            {exercise.solutionExplanation && (
              <Box sx={{ px: 2, py: 1.5, bgcolor: "#f0fdf4" }}>
                <Typography variant="body2">
                  <RichText text={exercise.solutionExplanation} />
                </Typography>
              </Box>
            )}
          </Box>
        </Collapse>
      )}
    </Box>
  );
}

function MultipleChoice({ exercise }) {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const isCorrect = Number(selected) === exercise.correct;

  return (
    <Box>
      <RadioGroup value={selected} onChange={(e) => { setSelected(e.target.value); setSubmitted(false); }}>
        {exercise.options.map((option, idx) => (
          <FormControlLabel
            key={idx}
            value={String(idx)}
            control={<Radio size="small" />}
            label={
              <Typography
                sx={{ fontSize: 14 }}
              >
                <RichText text={option} />
              </Typography>
            }
            sx={{
              border: "1px solid",
              borderColor: submitted
                ? idx === exercise.correct
                  ? "success.main"
                  : Number(selected) === idx
                  ? "error.main"
                  : "#e0e0e0"
                : "#e0e0e0",
              borderRadius: 2,
              m: 0.5,
              px: 1,
              bgcolor: submitted && idx === exercise.correct ? "#f0fdf4" : "transparent",
            }}
          />
        ))}
      </RadioGroup>
      <Button
        variant="contained"
        onClick={() => setSubmitted(true)}
        disabled={selected === null}
        size="small"
        sx={{ mt: 1 }}
      >
        Verifica
      </Button>
      {submitted && (
        <Alert severity={isCorrect ? "success" : "error"} sx={{ mt: 1 }}>
          <strong>{isCorrect ? "Corretto! " : "Non corretto. "}</strong>
          {exercise.explanation ? <RichText text={exercise.explanation} /> : !isCorrect && "Riprova!"}
        </Alert>
      )}
    </Box>
  );
}

export default function Exercise({ exercise, index, label = "Esercizio" }) {
  return (
    <Box
      sx={{
        border: "1px solid #e0e0e0",
        borderRadius: 3,
        p: 3,
        my: 3,
        bgcolor: "#fafbff",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
        <Chip
          label={`${label} ${index}`}
          size="small"
          color="primary"
          variant="outlined"
        />
        {exercise.difficulty && (
          <Chip
            label={exercise.difficulty}
            size="small"
            color={
              exercise.difficulty === "facile"
                ? "success"
                : exercise.difficulty === "medio"
                ? "warning"
                : "error"
            }
            variant="filled"
            sx={{ fontSize: 11 }}
          />
        )}
      </Box>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        {exercise.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, whiteSpace: "pre-line" }}>
        <RichText text={exercise.description} />
      </Typography>

      {exercise.type === "code" && <CodeExercise exercise={exercise} />}
      {exercise.type === "multiple-choice" && <MultipleChoice exercise={exercise} />}
    </Box>
  );
}
