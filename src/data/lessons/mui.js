export const lessons = {
  basics: {
    sections: [
      {
        type: "text",
        content:
          "Material UI (MUI) e la libreria di componenti React più popolare, basata sul Material Design di Google. Fornisce componenti pronti all'uso, temi personalizzabili, e un sistema di styling potente tramite la prop `sx`. Nelle applicazioni enterprise, MUI e la base di tutta l'interfaccia.",
      },
      {
        type: "heading",
        content: "Installazione e Importazione",
      },
      {
        type: "code",
        language: "javascript",
        title: "Installazione e importazioni base",
        code: `// Installazione (gia inclusa nel progetto)
// npm install @mui/material @emotion/react @emotion/styled

// Importazione dei componenti - sempre da "@mui/material"
import {
  Box,
  Stack,
  Typography,
  Button,
  Paper,
  Grid,
  Chip,
  Divider,
} from "@mui/material";

// Importazione delle icone - da "@mui/icons-material"
import { Forward, ZoomIn, ChevronLeft } from "@mui/icons-material";`,
      },
      {
        type: "subheading",
        content: "Box: Il Div Universale di MUI",
      },
      {
        type: "text",
        content:
          "Box e il componente layout fondamentale di MUI. Renderizza un `<div>` ma accetta la prop `sx` per lo styling inline avanzato. E il componente più usato in un progetto React reale: wrappa praticamente tutto.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Box - Il building block del layout",
        code: `// Box con sx per il layout (pattern dal progetto)
<Box sx={{ display: "flex", height: "100%", bgcolor: "#f5f5f5" }}>
  <Box sx={{ width: 240, borderRight: "1px solid #e0e0e0" }}>
    Sidebar
  </Box>
  <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
    Contenuto principale
  </Box>
</Box>

// Box con prop component per cambiare il tag HTML
<Box component="section" sx={{ p: 2 }}>
  Questo renderizza un <section>, non un <div>
</Box>`,
      },
      {
        type: "subheading",
        content: "Stack: Flex Container Semplificato",
      },
      {
        type: "text",
        content:
          "Stack e un shortcut per il layout flex. Imposta automaticamente `display: flex` e `flexDirection: column` (di default). Supporta `direction`, `spacing` e `divider` come props dedicate.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Stack per layout rapidi",
        code: `// Stack verticale (default) con spaziatura
<Stack spacing={2}>
  <Button variant="contained">Primo</Button>
  <Button variant="outlined">Secondo</Button>
  <Button variant="text">Terzo</Button>
</Stack>

// Stack orizzontale con allineamento centrato
<Stack direction="row" spacing={1} alignItems="center">
  <Chip label="Tag 1" />
  <Chip label="Tag 2" />
  <Chip label="Tag 3" />
</Stack>

// Stack con divider automatico tra gli elementi
<Stack spacing={2} divider={<Divider flexItem />}>
  <Typography>Sezione 1</Typography>
  <Typography>Sezione 2</Typography>
</Stack>`,
      },
      {
        type: "subheading",
        content: "Typography: Testo con Varianti Semantiche",
      },
      {
        type: "text",
        content:
          "Typography gestisce tutto il testo con varianti predefinite che rispettano la gerarchia tipografica: h1-h6 per i titoli, body1/body2 per il testo, caption per i dettagli. Nel progetto, Typography con variant h4 e usato per il titolo principale, body1 per la versione.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Typography - Le varianti usate nel progetto",
        code: `// Titolo principale (da un'app reale)
<Typography variant="h4" sx={{ fontWeight: 600, color: "#D52B1E" }}>
  Dashboard App
</Typography>

// Testo informativo
<Typography variant="body1">Version 1.0.0</Typography>

// Testo secondario / etichette
<Typography variant="body2" fontWeight="bold">
  Periodo: Gen / Feb / Mar
</Typography>

// Testo piccolo per dettagli
<Typography variant="caption" sx={{ color: "text.secondary" }}>
  C.I. Number: 12345
</Typography>

// Varianti disponibili: h1, h2, h3, h4, h5, h6,
// subtitle1, subtitle2, body1, body2, caption, overline`,
      },
      {
        type: "subheading",
        content: "Button: Tre Varianti Fondamentali",
      },
      {
        type: "text",
        content:
          "Button supporta tre varianti: `contained` (sfondo pieno, azione primaria), `outlined` (solo bordo, azione secondaria) e `text` (solo testo, azione terziaria). Nel progetto, il bottone 'Continua' della Home usa variant='contained' con colore personalizzato.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Button - Varianti e personalizzazione",
        code: `import { Button, Typography } from "@mui/material";
import ForwardIcon from "@mui/icons-material/Forward";

// Bottone primario (da un'app reale)
<Button
  variant="contained"
  size="large"
  disableRipple
  onClick={handleContinue}
  sx={{ bgcolor: "#D52B1E" }}
>
  <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
    Continue <ForwardIcon />
  </Typography>
</Button>

// Bottone secondario
<Button variant="outlined" color="primary">Annulla</Button>

// Bottone testo
<Button variant="text" size="small">Dettagli</Button>

// Gruppo di bottoni icona (da un'app reale)
import { IconButton, ButtonGroup } from "@mui/material";
import { ZoomIn, ZoomOut, RestartAlt } from "@mui/icons-material";

<ButtonGroup size="small" variant="outlined">
  <IconButton onClick={handleZoomIn}><ZoomIn /></IconButton>
  <IconButton onClick={handleZoomOut}><ZoomOut /></IconButton>
  <IconButton onClick={handleResetZoom}><RestartAlt /></IconButton>
</ButtonGroup>`,
      },
      {
        type: "subheading",
        content: "Paper, Chip e Divider",
      },
      {
        type: "text",
        content:
          "Paper crea una superficie elevata (con ombra). Chip visualizza tag o etichette compatte. Divider separa visivamente le sezioni. Nel progetto, Paper e usato nel tooltip dei grafici e Chip per mostrare il batch selezionato.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Paper, Chip e Divider dal progetto",
        code: `import { Paper, Chip, Divider, Box, Typography } from "@mui/material";

// Paper nel tooltip del grafico (dal progetto)
<Paper
  elevation={0}
  sx={{
    p: 1.5,
    minWidth: 180,
    borderRadius: 2.5,
    boxShadow: "0px 4px 20px rgba(0,0,0,0.15)",
  }}
>
  {/* Chip come badge del batch */}
  <Chip
    label="Batch: ABC123"
    size="small"
    sx={{
      height: 20,
      fontSize: "0.75rem",
      fontWeight: 700,
      backgroundColor: "rgba(213, 43, 30, 0.1)",
      color: "#D52B1E",
      borderRadius: 1,
    }}
  />

  {/* Divider per separare le sezioni */}
  <Divider sx={{ my: 1 }} />

  <Typography variant="caption">Dettagli aggiuntivi...</Typography>
</Paper>`,
      },
      {
        type: "tip",
        content:
          "In un progetto React reale, Box e Stack sono i componenti layout più usati. Typography gestisce tutti i testi con variant (h4, h6, body1, body2, caption). Paper e Chip compaiono nel tooltip personalizzato dei grafici.",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "Componente Layout Giusto",
        description:
          "Vuoi creare un contenitore flex con direzione colonna e gap di 16px tra gli elementi. Qual e il modo più conciso?",
        difficulty: "facile",
        options: [
          '<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>',
          "<Stack spacing={2}>",
          '<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>',
          "Tutte le opzioni funzionano, ma Stack e la più concisa",
        ],
        correct: 3,
        explanation:
          "Tutte e tre producono lo stesso risultato visivo. Tuttavia, Stack e la più concisa perche imposta automaticamente display:flex e flexDirection:column. spacing={2} corrisponde a 16px (2 * 8px). Box richiede più proprieta sx, e div non supporta il sistema di tema MUI.",
      },
      {
        type: "code",
        title: "Card con Paper e Typography",
        description:
          "Crea una card usando Paper con elevation 3, padding di 24px (spacing 3), e un titolo h5 seguito da un testo body2 e un Chip con label 'Attivo'.",
        difficulty: "medio",
        starterCode: `import { Paper, Typography, Chip, Stack } from "@mui/material";

export default function StatusCard() {
  return (
    // Crea la card qui
  );
}`,
        solution: `import { Paper, Typography, Chip, Stack } from "@mui/material";

export default function StatusCard() {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Stack spacing={1}>
        <Typography variant="h5">Stato del Sistema</Typography>
        <Typography variant="body2">Tutti i servizi sono operativi.</Typography>
        <Chip label="Attivo" color="success" size="small" />
      </Stack>
    </Paper>
  );
}`,
        validate: `(code) => {
  return code.includes("Paper") && code.includes("elevation") && code.includes("Typography") && code.includes("Chip");
}`,
        testCode: "",
      },
      {
        type: "multiple-choice",
        title: "Variante di Button",
        description:
          "Per un'azione primaria importante (es. 'Salva' o 'Continua'), quale variante di Button e la più appropriata?",
        difficulty: "facile",
        options: [
          'variant="text"',
          'variant="outlined"',
          'variant="contained"',
          'variant="icon"',
        ],
        correct: 2,
        explanation:
          'variant="contained" ha lo sfondo pieno e la massima prominenza visiva, ideale per l\'azione principale. "outlined" e per azioni secondarie, "text" per azioni terziarie. "icon" non esiste come variante: per le icone si usa IconButton.',
      },
    ],
  },

  "sx-prop": {
    sections: [
      {
        type: "text",
        content:
          "La prop `sx` e il sistema di styling inline di MUI, potenziato con accesso al tema, shorthand per spaziature, valori responsive e supporto per pseudo-selettori CSS. E disponibile su tutti i componenti MUI e nelle applicazioni enterprise viene usata praticamente ovunque.",
      },
      {
        type: "heading",
        content: "Sintassi Base: Oggetto CSS in camelCase",
      },
      {
        type: "text",
        content:
          "La prop `sx` accetta un oggetto con proprieta CSS in camelCase. A differenza dell'attributo `style`, `sx` supporta il tema, shorthand, responsive values e selettori annidati.",
      },
      {
        type: "code",
        language: "javascript",
        title: "sx base vs style: le differenze",
        code: `// Con style (CSS standard, nessun accesso al tema)
<div style={{ backgroundColor: "#f5f5f5", padding: "16px", borderRadius: "8px" }}>

// Con sx (accesso al tema, shorthand, responsive)
<Box sx={{ bgcolor: "#f5f5f5", p: 2, borderRadius: 2 }}>

// bgcolor = backgroundColor (shorthand MUI)
// p: 2 = padding: 16px (2 * 8px del tema)
// borderRadius: 2 = borderRadius: "16px" (2 * 8px)`,
      },
      {
        type: "subheading",
        content: "Spacing: Il Sistema a Multipli di 8px",
      },
      {
        type: "text",
        content:
          "In MUI, i valori numerici di spaziatura vengono moltiplicati per il fattore del tema (default: 8px). Quindi `p: 1` = 8px, `p: 2` = 16px, `m: 3` = 24px. Esistono shorthand per ogni direzione: m (margin), p (padding), mt (margin-top), px (padding left+right), ecc.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Shorthand di spaziatura",
        code: `// Shorthand completi
// m  = margin          p  = padding
// mt = marginTop       pt = paddingTop
// mr = marginRight     pr = paddingRight
// mb = marginBottom    pb = paddingBottom
// ml = marginLeft      pl = paddingLeft
// mx = marginX (left+right)  px = paddingX (left+right)
// my = marginY (top+bottom)  py = paddingY (top+bottom)

// Esempio da un'app reale (Home page)
<Box sx={{
  flex: 1,
  bgcolor: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  p: { xs: 4, md: 10 },   // padding responsive
  pt: { xl: 5 },           // paddingTop solo su xl
}}>`,
      },
      {
        type: "heading",
        content: "Valori Responsive con Breakpoints",
      },
      {
        type: "text",
        content:
          "Qualsiasi proprieta sx puo accettare un oggetto con breakpoints come chiavi: `xs` (0px+), `sm` (600px+), `md` (900px+), `lg` (1200px+), `xl` (1536px+). MUI genera automaticamente le media query corrispondenti.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Layout responsive da un'app reale",
        code: `// Layout responsive della Home page
<Box sx={{
  minHeight: "100vh",
  display: "flex",
  // Su mobile: colonna, su desktop: riga
  flexDirection: { xs: "column", md: "row" },
  bgcolor: "grey.100",
}}>
  {/* Colonna sinistra */}
  <Box sx={{
    flex: 1,
    p: { xs: 4, md: 10 },  // Padding ridotto su mobile
  }}>
    Contenuto
  </Box>

  {/* Colonna destra */}
  <Box sx={{
    flex: 1,
    p: { xs: 4, xl: 10 },  // Padding extra su schermi grandi
    gap: { xs: 4, xl: 8 }, // Gap più ampio su xl
  }}>
    Filtri
  </Box>
</Box>`,
      },
      {
        type: "subheading",
        content: "Pseudo-selettori e Selettori Annidati",
      },
      {
        type: "text",
        content:
          'La prop sx supporta pseudo-selettori CSS come `"&:hover"`, `"&:focus"`, `"&.Mui-selected"` e selettori annidati come `"& .MuiChip-root"`. Questo permette di personalizzare componenti MUI interni senza creare classi CSS separate.',
      },
      {
        type: "code",
        language: "javascript",
        title: "Pseudo-selettori e selettori annidati dal progetto",
        code: `// Selettore hover (categoria sidebar nel progetto)
<Box sx={{
  cursor: "pointer",
  bgcolor: isFocused ? "rgba(25, 118, 210, 0.08)" : "transparent",
  transition: "all 0.2s ease",
  "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
}}>

// Selettori annidati per personalizzare componenti MUI interni
<Box sx={{
  // Personalizza tutti i Stack figli
  "& .MuiStack-root": {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  bgcolor: "#f0f0f0",
  borderRadius: 3,
  p: 2,
  borderLeft: "4px solid #D52B1E",
}}>

// Personalizzazione scrollbar (dal grafico)
<Box sx={{
  overflowX: "auto",
  "&::-webkit-scrollbar": { height: "8px" },
  "&::-webkit-scrollbar-track": { backgroundColor: "#f1f1f1" },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#bbbbbb",
    borderRadius: "4px",
    "&:hover": { backgroundColor: "#888888" },
  },
}}>`,
      },
      {
        type: "subheading",
        content: "Sx Condizionale con Spread",
      },
      {
        type: "text",
        content:
          "Un pattern potente e usare lo spread operator `...()` dentro sx per applicare stili condizionalmente. Nelle applicazioni enterprise, questo pattern e usato estensivamente per evidenziare punti selezionati nei grafici.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Sx condizionale con spread dal progetto",
        code: `// Pattern: spread condizionale in sx
<LineChart
  sx={{
    // Stili base (sempre applicati)
    [\`& .\${lineClasses.line}\`]: {
      stroke: styles.lineColor,
      strokeWidth: styles.lineWidth,
    },

    // Stili condizionali (solo quando un punto e selezionato)
    ...(selectedPoint !== null && {
      [\`& .\${axisClasses.bottom} .MuiChartsAxis-tickContainer:nth-of-type(\${
        selectedPoint.dataIndex + 1
      }) .MuiChartsAxis-tickLabel\`]: {
        fill: "darkorange !important",
        fontWeight: "bold !important",
      },
    }),

    // Spread con reduce per stili multipli dinamici
    ...areaSelectedIndices.reduce((acc, dataIdx) => {
      acc[\`& .\${axisClasses.bottom} .MuiChartsAxis-tickContainer:nth-of-type(\${
        dataIdx + 1
      }) .MuiChartsAxis-tickLabel\`] = {
        fill: "darkorange !important",
        fontWeight: "bold !important",
      };
      return acc;
    }, {}),
  }}
/>`,
      },
      {
        type: "tip",
        content:
          "Quasi ogni componente nel progetto usa sx per lo styling. Esempio reale: sx={{ display: 'flex', flexDirection: 'column', gap: 1, p: 2, bgcolor: 'background.paper', borderRadius: 2 }}. Il pattern spread condizionale e usato nei grafici per evidenziare dinamicamente i punti selezionati.",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "Valore di Spacing",
        description: "A quanti pixel corrisponde `p: 3` nella prop sx di MUI?",
        difficulty: "facile",
        options: ["3px", "12px", "24px", "30px"],
        correct: 2,
        explanation:
          "Il fattore di spaziatura di MUI e 8px per default. Quindi p: 3 = 3 * 8px = 24px. Allo stesso modo, m: 1 = 8px, p: 2 = 16px, gap: 0.5 = 4px.",
      },
      {
        type: "code",
        title: "Card Responsive con sx",
        description:
          "Crea un Box che: su mobile (xs) ha padding 16px e flexDirection column; su desktop (md) ha padding 32px e flexDirection row. Usa gli shorthand di spaziatura MUI.",
        difficulty: "medio",
        starterCode: `import { Box, Typography } from "@mui/material";

export default function ResponsiveCard() {
  return (
    <Box sx={{
      display: "flex",
      // Aggiungi padding e flexDirection responsive
    }}>
      <Typography>Elemento 1</Typography>
      <Typography>Elemento 2</Typography>
    </Box>
  );
}`,
        solution: `import { Box, Typography } from "@mui/material";

export default function ResponsiveCard() {
  return (
    <Box sx={{
      display: "flex",
      p: { xs: 2, md: 4 },
      flexDirection: { xs: "column", md: "row" },
      gap: 2,
    }}>
      <Typography>Elemento 1</Typography>
      <Typography>Elemento 2</Typography>
    </Box>
  );
}`,
        validate: `(code) => {
  return code.includes("xs:") && code.includes("md:") && code.includes("flexDirection");
}`,
        testCode: "",
      },
      {
        type: "code",
        title: "Stili Condizionali con Spread",
        description:
          "Completa il componente che cambia bgcolor e fontWeight del Typography quando `isActive` e true, usando lo spread condizionale in sx.",
        difficulty: "difficile",
        starterCode: `import { Box, Typography } from "@mui/material";

export default function ActiveItem({ label, isActive }) {
  return (
    <Box sx={{
      p: 1.5,
      borderRadius: 1,
      cursor: "pointer",
      "&:hover": { bgcolor: "grey.100" },
      // Aggiungi stili condizionali per isActive
    }}>
      <Typography sx={{
        // Aggiungi fontWeight condizionale
      }}>
        {label}
      </Typography>
    </Box>
  );
}`,
        solution: `import { Box, Typography } from "@mui/material";

export default function ActiveItem({ label, isActive }) {
  return (
    <Box sx={{
      p: 1.5,
      borderRadius: 1,
      cursor: "pointer",
      "&:hover": { bgcolor: "grey.100" },
      ...(isActive && {
        bgcolor: "primary.main",
        "&:hover": { bgcolor: "primary.dark" },
      }),
    }}>
      <Typography sx={{
        color: isActive ? "white" : "text.primary",
        fontWeight: isActive ? "bold" : "normal",
      }}>
        {label}
      </Typography>
    </Box>
  );
}`,
        validate: `(code) => {
  return code.includes("isActive") && (code.includes("...(" ) || code.includes("?"));
}`,
        testCode: "",
      },
    ],
  },

  forms: {
    sections: [
      {
        type: "text",
        content:
          "MUI fornisce un ricco set di componenti per form e input. In un progetto React reale, Select e usato per i filtri nella Home e nella sidebar, Autocomplete per la selezione multipla con ricerca, e le tabelle per mostrare dati strutturati.",
      },
      {
        type: "heading",
        content: "Select con MenuItem",
      },
      {
        type: "text",
        content:
          "Il componente Select crea un menu a tendina. Ogni opzione e un MenuItem. Puoi wrappare Select in un FormControl con InputLabel per avere un'etichetta flottante. Nel progetto, Select e usato nella Home per scegliere il sito e il tipo di analisi.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Select base e con FormControl",
        code: `import { useState } from "react";
import {
  Select, MenuItem, FormControl, InputLabel, Box
} from "@mui/material";

export default function SiteFilter() {
  const [site, setSite] = useState("");

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth size="small">
        <InputLabel>Sito</InputLabel>
        <Select
          value={site}
          label="Sito"
          onChange={(e) => setSite(e.target.value)}
        >
          <MenuItem value="LK1">Lilly Kinsale 1</MenuItem>
          <MenuItem value="LK2">Lilly Kinsale 2</MenuItem>
          <MenuItem value="IND">Indianapolis</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}`,
      },
      {
        type: "subheading",
        content: "TextField: Input di Testo",
      },
      {
        type: "text",
        content:
          "TextField e il componente universale per gli input di testo. Supporta le varianti `outlined` (default), `filled` e `standard`. Puo essere multiline, con helper text, errori di validazione e icone.",
      },
      {
        type: "code",
        language: "javascript",
        title: "TextField con varianti e validazione",
        code: `import { useState } from "react";
import { TextField, Stack } from "@mui/material";

export default function FormFields() {
  const [value, setValue] = useState("");
  const hasError = value.length > 0 && value.length < 3;

  return (
    <Stack spacing={2}>
      {/* Input base */}
      <TextField
        label="Nome batch"
        variant="outlined"
        size="small"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        error={hasError}
        helperText={hasError ? "Minimo 3 caratteri" : ""}
      />

      {/* Input multiline */}
      <TextField
        label="Note"
        multiline
        rows={3}
        variant="outlined"
      />

      {/* Input numerico */}
      <TextField
        label="Valore UCL"
        type="number"
        size="small"
        inputProps={{ min: 0, step: 0.1 }}
      />
    </Stack>
  );
}`,
      },
      {
        type: "subheading",
        content: "Autocomplete: Selezione con Ricerca",
      },
      {
        type: "text",
        content:
          "Autocomplete combina un TextField con un menu filtrato in tempo reale. Supporta selezione singola e multipla, opzioni libere (freeSolo), raggruppamento e renderizzazione personalizzata. Nel progetto, e usato per i filtri a selezione multipla con ricerca testuale.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Autocomplete singolo e multiplo",
        code: `import { useState } from "react";
import { Autocomplete, TextField, Chip, Stack } from "@mui/material";

const siti = [
  { label: "Kinsale 1", value: "LK1" },
  { label: "Kinsale 2", value: "LK2" },
  { label: "Indianapolis", value: "IND" },
  { label: "Fegersheim", value: "FEG" },
];

export default function AutocompleteExamples() {
  const [selectedSiti, setSelectedSiti] = useState([]);

  return (
    <Stack spacing={3}>
      {/* Autocomplete singolo */}
      <Autocomplete
        options={siti}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField {...params} label="Seleziona sito" size="small" />
        )}
      />

      {/* Autocomplete multiplo con Chip */}
      <Autocomplete
        multiple
        options={siti}
        getOptionLabel={(option) => option.label}
        value={selectedSiti}
        onChange={(event, newValue) => setSelectedSiti(newValue)}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              label={option.label}
              size="small"
              {...getTagProps({ index })}
              key={option.value}
            />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} label="Filtra siti" size="small" />
        )}
      />
    </Stack>
  );
}`,
      },
      {
        type: "heading",
        content: "Checkbox, Switch e FormControlLabel",
      },
      {
        type: "text",
        content:
          "Checkbox e Switch sono componenti di toggle. FormControlLabel li wrappa aggiungendo un'etichetta cliccabile. Switch e ideale per impostazioni on/off, Checkbox per selezioni multiple.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Checkbox e Switch con FormControlLabel",
        code: `import { useState } from "react";
import {
  Checkbox, Switch, FormControlLabel,
  FormGroup, Stack, Typography
} from "@mui/material";

export default function ToggleControls() {
  const [showGrid, setShowGrid] = useState(true);
  const [showLine, setShowLine] = useState(true);
  const [selectedLevels, setSelectedLevels] = useState(["Critique"]);

  const handleLevelToggle = (level) => {
    setSelectedLevels((prev) =>
      prev.includes(level)
        ? prev.filter((l) => l !== level)
        : [...prev, level]
    );
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Impostazioni Grafico</Typography>

      {/* Switch per toggle on/off */}
      <FormControlLabel
        control={<Switch checked={showGrid} onChange={() => setShowGrid(!showGrid)} />}
        label="Mostra griglia"
      />

      <FormControlLabel
        control={<Switch checked={showLine} onChange={() => setShowLine(!showLine)} />}
        label="Mostra linea"
      />

      {/* Checkbox per selezione multipla */}
      <Typography variant="subtitle2">Livelli di criticita</Typography>
      <FormGroup>
        {["Critique", "Majeur", "Mineur"].map((level) => (
          <FormControlLabel
            key={level}
            control={
              <Checkbox
                checked={selectedLevels.includes(level)}
                onChange={() => handleLevelToggle(level)}
                size="small"
              />
            }
            label={level}
          />
        ))}
      </FormGroup>
    </Stack>
  );
}`,
      },
      {
        type: "heading",
        content: "Tabelle MUI",
      },
      {
        type: "text",
        content:
          "Le tabelle MUI usano un set di componenti strutturati: TableContainer (wrapper scrollabile), Table, TableHead (intestazione), TableBody (corpo), TableRow (riga) e TableCell (cella). TableContainer spesso wrappa un Paper per l'elevazione.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Tabella completa con dati",
        code: `import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip
} from "@mui/material";

const rows = [
  { batch: "ABC001", site: "LK1", value: 2.5, status: "OK" },
  { batch: "ABC002", site: "LK2", value: 4.1, status: "Warning" },
  { batch: "ABC003", site: "IND", value: 1.8, status: "OK" },
];

export default function BatchTable() {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Batch</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Sito</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">Valore</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Stato</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.batch} hover>
              <TableCell>{row.batch}</TableCell>
              <TableCell>{row.site}</TableCell>
              <TableCell align="right">{row.value}</TableCell>
              <TableCell>
                <Chip
                  label={row.status}
                  size="small"
                  color={row.status === "OK" ? "success" : "warning"}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}`,
      },
      {
        type: "info",
        content:
          "MUI fornisce anche DataGrid (@mui/x-data-grid) per tabelle avanzate con ordinamento, filtro, paginazione e editing inline. Per tabelle semplici, i componenti Table base sono sufficienti.",
      },
      {
        type: "tip",
        content:
          "Nel progetto, Select e usato per filtri e navigazione, Autocomplete per selezione multipla con ricerca, Switch per toggle di configurazione. Le tabelle nella Home mostrano le opzioni disponibili per il sito selezionato.",
      },
    ],
    exercises: [
      {
        type: "code",
        title: "Select Controllato",
        description:
          "Crea un componente con un Select controllato (useState) che mostra tre opzioni di tipo analisi: 'CQA', 'CPP', 'IPC'. Mostra sotto il Select il valore selezionato con un Typography.",
        difficulty: "medio",
        starterCode: `"use client";
import { useState } from "react";
import { Select, MenuItem, FormControl, InputLabel, Box, Typography } from "@mui/material";

export default function AnalysisTypeSelect() {
  // Definisci lo stato e il handler

  return (
    <Box sx={{ p: 2 }}>
      {/* Crea il Select qui */}

      {/* Mostra il valore selezionato */}
    </Box>
  );
}`,
        solution: `"use client";
import { useState } from "react";
import { Select, MenuItem, FormControl, InputLabel, Box, Typography } from "@mui/material";

export default function AnalysisTypeSelect() {
  const [analysisType, setAnalysisType] = useState("");

  return (
    <Box sx={{ p: 2 }}>
      <FormControl fullWidth size="small">
        <InputLabel>Tipo Analisi</InputLabel>
        <Select
          value={analysisType}
          label="Tipo Analisi"
          onChange={(e) => setAnalysisType(e.target.value)}
        >
          <MenuItem value="CQA">CQA</MenuItem>
          <MenuItem value="CPP">CPP</MenuItem>
          <MenuItem value="IPC">IPC</MenuItem>
        </Select>
      </FormControl>
      <Typography sx={{ mt: 2 }}>
        Selezionato: {analysisType || "Nessuno"}
      </Typography>
    </Box>
  );
}`,
        validate: `(code) => {
  return code.includes("useState") && code.includes("Select") && code.includes("MenuItem") && code.includes("onChange");
}`,
        testCode: "",
      },
      {
        type: "multiple-choice",
        title: "Componente per Toggle",
        description:
          "Per un'impostazione on/off come 'Mostra griglia', quale componente MUI e più appropriato?",
        difficulty: "facile",
        options: [
          "Checkbox",
          "Switch",
          "Radio",
          "Select con due opzioni",
        ],
        correct: 1,
        explanation:
          "Switch e progettato specificamente per impostazioni binarie on/off con feedback visivo immediato. Checkbox e più adatto per selezioni multiple in una lista. Radio per scegliere una tra più opzioni. Select sarebbe eccessivo per un toggle binario.",
      },
      {
        type: "code",
        title: "Tabella con Dati Dinamici",
        description:
          "Completa la tabella che riceve un array di oggetti `data` (con campi `name`, `value`, `unit`) e li renderizza. Aggiungi hover sulle righe e allineamento a destra per i numeri.",
        difficulty: "difficile",
        starterCode: `import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from "@mui/material";

export default function DataTable({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        {/* Completa intestazione e corpo della tabella */}
      </Table>
    </TableContainer>
  );
}`,
        solution: `import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from "@mui/material";

export default function DataTable({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Nome</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">Valore</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Unita</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index} hover>
              <TableCell>{row.name}</TableCell>
              <TableCell align="right">{row.value}</TableCell>
              <TableCell>{row.unit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}`,
        validate: `(code) => {
  return code.includes("TableHead") && code.includes("TableBody") && code.includes("data.map") && code.includes("hover");
}`,
        testCode: "",
      },
    ],
  },
};
