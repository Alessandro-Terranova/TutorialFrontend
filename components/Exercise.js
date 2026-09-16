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

function CodeExercise({ exercise }) {
  const [code, setCode] = useState(exercise.starterCode || "");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState(null);
  const [showSolution, setShowSolution] = useState(false);

  const runCode = () => {
    try {
      const logs = [];
      const mockConsole = { log: (...args) => logs.push(args.map(String).join(" ")) };
      const fn = new Function("console", code + "\n" + (exercise.testCode || ""));
      const result = fn(mockConsole);
      const logOutput = logs.join("\n");

      if (exercise.validate) {
        const testFn = new Function("console", "userCode", exercise.validate);
        const passed = testFn(mockConsole, code);
        if (passed) {
          setStatus("success");
          setOutput(logOutput || "Corretto!");
        } else {
          setStatus("error");
          setOutput(logOutput || "Non ancora corretto. Riprova!");
        }
      } else {
        setStatus("info");
        setOutput(logOutput || (result !== undefined ? String(result) : "Nessun output"));
      }
    } catch (err) {
      setStatus("error");
      setOutput(`Errore: ${err.message}`);
    }
  };

  return (
    <Box>
      <TextField
        multiline
        fullWidth
        minRows={4}
        maxRows={20}
        value={code}
        onChange={(e) => setCode(e.target.value)}
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
      <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
        <Button
          variant="contained"
          startIcon={<PlayArrowIcon />}
          onClick={runCode}
          size="small"
        >
          Esegui
        </Button>
        {exercise.solution && (
          <Button
            variant="outlined"
            startIcon={showSolution ? <VisibilityOffIcon /> : <VisibilityIcon />}
            onClick={() => setShowSolution(!showSolution)}
            size="small"
          >
            {showSolution ? "Nascondi" : "Soluzione"}
          </Button>
        )}
      </Box>
      {output && (
        <Alert severity={status || "info"} sx={{ mb: 1, fontFamily: "monospace", fontSize: 13 }}>
          <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{output}</pre>
        </Alert>
      )}
      {showSolution && exercise.solution && (
        <Box
          sx={{
            bgcolor: "#f0fdf4",
            border: "1px solid #bbf7d0",
            borderRadius: 2,
            p: 2,
            mt: 1,
          }}
        >
          <Typography variant="caption" fontWeight={600} color="success.main" gutterBottom>
            Soluzione:
          </Typography>
          <Box
            component="pre"
            sx={{
              bgcolor: "#1e1e2e",
              color: "#cdd6f4",
              p: 2,
              borderRadius: 1,
              fontSize: 13,
              fontFamily: "'Fira Code', 'Consolas', monospace",
              overflow: "auto",
              mt: 1,
            }}
          >
            {exercise.solution}
          </Box>
        </Box>
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
                sx={{
                  fontFamily: option.startsWith("`") ? "monospace" : "inherit",
                  fontSize: 14,
                }}
              >
                {option.replace(/`/g, "")}
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
          {isCorrect
            ? "Corretto!"
            : exercise.explanation || "Non corretto. Riprova!"}
        </Alert>
      )}
    </Box>
  );
}

export default function Exercise({ exercise, index }) {
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
          label={`Esercizio ${index}`}
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
        {exercise.description}
      </Typography>

      {exercise.type === "code" && <CodeExercise exercise={exercise} />}
      {exercise.type === "multiple-choice" && <MultipleChoice exercise={exercise} />}
    </Box>
  );
}
