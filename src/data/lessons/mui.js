export const lessons = {
  basics: {
    sections: [
      {
        type: "text",
        content:
          "Material UI (MUI) è una delle librerie di componenti React più popolari, basata sul Material Design di Google. Fornisce componenti pronti all'uso (bottoni, card, menu, tabelle, campi di input...), temi personalizzabili e un sistema di styling potente tramite la prop `sx`. Invece di scrivere da zero HTML e CSS per ogni elemento, componi l'interfaccia con componenti già curati e accessibili.",
      },
      {
        type: "heading",
        content: "Installazione e importazione",
      },
      {
        type: "code",
        language: "javascript",
        title: "Installazione e importazioni base",
        code: `// Installazione (da terminale, nella cartella del progetto)
// npm install @mui/material @emotion/react @emotion/styled
// Per le icone:
// npm install @mui/icons-material

// Importazione dei componenti: sempre da "@mui/material"
import {
  Box,
  Stack,
  Typography,
  Button,
  Paper,
  Chip,
  Divider,
} from "@mui/material";

// Importazione delle icone: da "@mui/icons-material"
import { ShoppingCart, Delete, ChevronLeft } from "@mui/icons-material";`,
      },
      {
        type: "text",
        content:
          "I componenti MUI si usano come qualsiasi altro componente React: li importi e li scrivi in JSX, passando props. Tutto ciò che hai imparato su props, `children`, stato ed eventi vale anche qui.",
      },
      {
        type: "subheading",
        content: "Box: il div universale di MUI",
      },
      {
        type: "text",
        content:
          "Box è il componente di layout fondamentale di MUI. Renderizza un `<div>`, ma accetta la prop `sx` per lo styling (la vedremo in dettaglio nella prossima lezione). È il componente più usato in assoluto: fa da contenitore praticamente per tutto.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Box: il mattone base del layout",
        code: `import { Box } from "@mui/material";

// Layout a due colonne: barra laterale + contenuto
<Box sx={{ display: "flex", height: "100%", bgcolor: "#f5f5f5" }}>
  <Box sx={{ width: 240, borderRight: "1px solid #e0e0e0" }}>
    Categorie
  </Box>
  <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
    Elenco dei prodotti
  </Box>
</Box>

// Box con la prop component per cambiare il tag HTML
<Box component="section" sx={{ p: 2 }}>
  Questo renderizza un <section>, non un <div>
</Box>`,
      },
      {
        type: "subheading",
        content: "Stack: flex container semplificato",
      },
      {
        type: "text",
        content:
          "Stack è una scorciatoia per il layout flex. Imposta automaticamente `display: flex` e `flexDirection: column` (di default). Supporta `direction`, `spacing` e `divider` come props dedicate. Il valore di `spacing` è un multiplo di 8px: `spacing={2}` corrisponde a uno spazio di 16px tra gli elementi.",
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
  <Chip label="Romanzo" />
  <Chip label="Giallo" />
  <Chip label="Fantasy" />
</Stack>

// Stack con divisore automatico tra gli elementi
<Stack spacing={2} divider={<Divider flexItem />}>
  <Typography>Capitolo 1</Typography>
  <Typography>Capitolo 2</Typography>
</Stack>`,
      },
      {
        type: "subheading",
        content: "Typography: testo con varianti semantiche",
      },
      {
        type: "text",
        content:
          "Typography gestisce tutto il testo con varianti predefinite che rispettano la gerarchia tipografica: h1-h6 per i titoli, body1/body2 per il testo normale, caption per i dettagli piccoli. Per esempio, un titolo di pagina può usare `variant=\"h4\"` e una descrizione `variant=\"body1\"`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Typography: le varianti più comuni",
        code: `// Titolo principale
<Typography variant="h4" sx={{ fontWeight: 600, color: "primary.main" }}>
  La mia libreria
</Typography>

// Testo normale
<Typography variant="body1">Hai 12 libri nella tua collezione.</Typography>

// Testo secondario / etichette
<Typography variant="body2" fontWeight="bold">
  Generi: Romanzo / Giallo / Fantasy
</Typography>

// Testo piccolo per i dettagli
<Typography variant="caption" sx={{ color: "text.secondary" }}>
  Ultimo aggiornamento: ieri
</Typography>

// Varianti disponibili: h1, h2, h3, h4, h5, h6,
// subtitle1, subtitle2, body1, body2, caption, overline`,
      },
      {
        type: "subheading",
        content: "Button: tre varianti fondamentali",
      },
      {
        type: "text",
        content:
          "Button supporta tre varianti: `contained` (sfondo pieno, azione primaria), `outlined` (solo bordo, azione secondaria) e `text` (solo testo, azione terziaria). Come un normale `<button>`, riceve l'evento `onClick`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Button: varianti e personalizzazione",
        code: `import { Button, ButtonGroup, IconButton } from "@mui/material";
import { ShoppingCart, Add, Remove, Delete } from "@mui/icons-material";

// Bottone primario con icona
<Button
  variant="contained"
  size="large"
  startIcon={<ShoppingCart />}
  onClick={handleAddToCart}
>
  Aggiungi al carrello
</Button>

// Bottone secondario
<Button variant="outlined" color="primary">Annulla</Button>

// Bottone testo
<Button variant="text" size="small">Dettagli</Button>

// Gruppo di bottoni con sole icone
<ButtonGroup size="small" variant="outlined">
  <IconButton onClick={handleIncrement}><Add /></IconButton>
  <IconButton onClick={handleDecrement}><Remove /></IconButton>
  <IconButton onClick={handleRemove}><Delete /></IconButton>
</ButtonGroup>`,
      },
      {
        type: "subheading",
        content: "Paper, Chip e Divider",
      },
      {
        type: "text",
        content:
          "Paper crea una superficie in rilievo (con ombra), perfetta per card e pannelli. Chip mostra tag o etichette compatte. Divider separa visivamente le sezioni.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Una card prodotto con Paper, Chip e Divider",
        code: `import { Paper, Chip, Divider, Typography } from "@mui/material";

<Paper
  elevation={0}
  sx={{
    p: 1.5,
    minWidth: 180,
    borderRadius: 2.5,
    boxShadow: "0px 4px 20px rgba(0,0,0,0.15)",
  }}
>
  <Typography variant="h6">Cuffie wireless</Typography>

  {/* Chip come etichetta */}
  <Chip
    label="Disponibile"
    size="small"
    color="success"
    sx={{ height: 20, fontSize: "0.75rem", fontWeight: 700 }}
  />

  {/* Divider per separare le sezioni */}
  <Divider sx={{ my: 1 }} />

  <Typography variant="caption">Spedizione gratuita in 2 giorni</Typography>
</Paper>`,
      },
      {
        type: "tip",
        content:
          "Box e Stack coprono quasi tutte le esigenze di layout: usa Stack quando devi solo impilare elementi con uno spazio regolare, Box quando ti serve più controllo. Per i testi usa sempre Typography con la variant adatta, così l'aspetto resta coerente in tutta l'app.",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "Componente di layout giusto",
        description:
          "Vuoi creare un contenitore flex con direzione colonna e uno spazio di 16px tra gli elementi. Qual è il modo più conciso?",
        difficulty: "facile",
        options: [
          '<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>',
          "<Stack spacing={2}>",
          '<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>',
          "Tutte le opzioni funzionano, ma Stack è la più concisa",
        ],
        correct: 3,
        explanation:
          "Tutte e tre producono lo stesso risultato visivo. Tuttavia Stack è la più concisa, perché imposta automaticamente display: flex e flexDirection: column. spacing={2} corrisponde a 16px (2 × 8px). Box richiede più proprietà in sx, e il div con style non sfrutta il tema di MUI.",
      },
      {
        type: "code",
        title: "Card con Paper e Typography",
        description:
          "Crea una card usando `Paper` con `elevation={3}` e padding di 24px (`sx={{ p: 3 }}`). Dentro, metti un titolo `Typography` con `variant=\"h5\"`, un testo `Typography` con `variant=\"body2\"` e un `Chip` con `label=\"Attivo\"`.",
        difficulty: "medio",
        mode: "static",
        starterCode: `import { Paper, Typography, Chip, Stack } from "@mui/material";

export default function StatusCard() {
  return (
    // Crea la card qui
    null
  );
}`,
        solution: `import { Paper, Typography, Chip, Stack } from "@mui/material";

export default function StatusCard() {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
      <Stack spacing={1}>
        <Typography variant="h5">Stato del servizio</Typography>
        <Typography variant="body2">Tutti i servizi sono operativi.</Typography>
        <Chip label="Attivo" color="success" size="small" />
      </Stack>
    </Paper>
  );
}`,
        validate: `const c = $codeNoComments;
if (!/<Paper[\\s>]/.test(c)) return "Usa il componente <Paper> come contenitore della card";
if (!/<Paper[^>]*elevation=\\{\\s*3\\s*\\}/.test(c)) return "Aggiungi elevation={3} al Paper";
if (!/<Paper[^>]*sx=\\{\\{[^}]*\\bp\\s*:\\s*3\\b/.test(c)) return "Aggiungi un padding di 24px al Paper con sx={{ p: 3 }}";
if (!/<Typography[^>]*variant=["']h5["']/.test(c)) return "Aggiungi un titolo <Typography variant=\\"h5\\">";
if (!/<Typography[^>]*variant=["']body2["']/.test(c)) return "Aggiungi un testo <Typography variant=\\"body2\\">";
if (!/<Chip[^>]*label=["']Attivo["']/.test(c)) return "Aggiungi un <Chip label=\\"Attivo\\" />";
if (!/<\\/Paper>/.test(c)) return "Ricordati di chiudere il Paper con </Paper>, mettendo gli altri elementi al suo interno";
return true;`,
        solutionExplanation:
          "`Paper` è la superficie della card: `elevation={3}` le dà l'ombra e `sx={{ p: 3 }}` aggiunge 3 × 8px = 24px di padding. Lo `Stack` interno mette uno spazio regolare tra titolo, testo e Chip senza dover scrivere margini a mano. Le due `Typography` usano varianti diverse per creare la gerarchia: `h5` per il titolo, `body2` per il testo.",
      },
      {
        type: "multiple-choice",
        title: "Variante di Button",
        description:
          "Per un'azione primaria importante (es. 'Salva' o 'Continua'), quale variante di Button è la più appropriata?",
        difficulty: "facile",
        options: [
          'variant="text"',
          'variant="outlined"',
          'variant="contained"',
          'variant="icon"',
        ],
        correct: 2,
        explanation:
          'variant="contained" ha lo sfondo pieno e la massima evidenza visiva, ideale per l\'azione principale. "outlined" è per le azioni secondarie, "text" per quelle terziarie. "icon" non esiste come variante: per le icone si usa IconButton.',
      },
      {
        type: "multiple-choice",
        title: "Cosa renderizza Box?",
        description:
          "Quale elemento HTML viene generato da questo codice?\n`<Box component=\"section\" sx={{ p: 2 }}>Novità</Box>`",
        difficulty: "facile",
        options: [
          "Un `<div>` con un attributo `component=\"section\"`",
          "Un `<section>` con 16px di padding",
          "Un `<Box>`: il browser lo mostra come elemento personalizzato",
          "Niente: `component` accetta solo componenti React, non stringhe",
        ],
        correct: 1,
        explanation:
          "Box renderizza un `<div>` per default, ma la prop `component` cambia il tag generato: qui diventa un `<section>`, e `p: 2` aggiunge 2 × 8px = 16px di padding. `component` non finisce nell'HTML come attributo, accetta sia stringhe (\"section\", \"span\"...) sia componenti React, e `<Box>` non arriva mai al browser: è un componente React che produce HTML normale.",
      },
    ],
  },

  "sx-prop": {
    sections: [
      {
        type: "text",
        content:
          "La prop `sx` è il sistema di styling di MUI: è simile all'attributo `style`, ma in più dà accesso al tema, offre scorciatoie per le spaziature, valori responsive e il supporto per pseudo-selettori CSS. È disponibile su tutti i componenti MUI.",
      },
      {
        type: "heading",
        content: "Sintassi base: oggetto CSS in camelCase",
      },
      {
        type: "text",
        content:
          "La prop `sx` accetta un oggetto con proprietà CSS in camelCase (`backgroundColor`, `borderRadius`...), proprio come `style`. A differenza di `style`, però, `sx` supporta il tema, le scorciatoie, i valori responsive e i selettori annidati.",
      },
      {
        type: "code",
        language: "javascript",
        title: "sx e style a confronto",
        code: `// Con style (CSS standard, nessun accesso al tema)
<div style={{ backgroundColor: "#f5f5f5", padding: "16px", borderRadius: "8px" }}>

// Con sx (accesso al tema, scorciatoie, responsive)
<Box sx={{ bgcolor: "#f5f5f5", p: 2, borderRadius: 2 }}>

// bgcolor = backgroundColor (scorciatoia MUI)
// p: 2 = padding: 16px (2 * 8px del tema)
// borderRadius: 2 = 2 * borderRadius del tema (4px) = 8px`,
      },
      {
        type: "text",
        content:
          "Con `sx` puoi anche usare i colori del tema scrivendoli come stringhe: `\"primary.main\"`, `\"text.secondary\"`, `\"grey.100\"`, `\"background.paper\"`. Se un domani cambi il colore primario del tema, tutti i componenti si aggiornano da soli.",
      },
      {
        type: "subheading",
        content: "Spacing: il sistema a multipli di 8px",
      },
      {
        type: "text",
        content:
          "In MUI, i valori numerici di spaziatura vengono moltiplicati per il fattore del tema (default: 8px). Quindi `p: 1` = 8px, `p: 2` = 16px, `m: 3` = 24px. Esistono scorciatoie per ogni direzione: m (margin), p (padding), mt (margin-top), px (padding sinistro + destro), ecc.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Scorciatoie di spaziatura",
        code: `// Scorciatoie complete
// m  = margin          p  = padding
// mt = marginTop       pt = paddingTop
// mr = marginRight     pr = paddingRight
// mb = marginBottom    pb = paddingBottom
// ml = marginLeft      pl = paddingLeft
// mx = margin left + right   px = padding left + right
// my = margin top + bottom   py = padding top + bottom

// Esempio: sezione di benvenuto di una pagina
<Box sx={{
  flex: 1,
  bgcolor: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  px: 4,   // 32px a sinistra e a destra
  py: 2,   // 16px sopra e sotto
  mb: 1,   // 8px di margine sotto
}}>`,
      },
      {
        type: "heading",
        content: "Valori responsive con i breakpoint",
      },
      {
        type: "text",
        content:
          "Qualsiasi proprietà di `sx` può accettare un oggetto con i breakpoint come chiavi: `xs` (da 0px), `sm` (da 600px), `md` (da 900px), `lg` (da 1200px), `xl` (da 1536px). MUI genera automaticamente le media query corrispondenti, in ottica mobile-first: il valore di `xs` vale ovunque, finché un breakpoint più grande non lo sovrascrive.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Layout responsive",
        code: `// Pagina di un negozio: filtri + prodotti
<Box sx={{
  minHeight: "100vh",
  display: "flex",
  // Su mobile: colonna, da md in su: riga
  flexDirection: { xs: "column", md: "row" },
  bgcolor: "grey.100",
}}>
  {/* Colonna dei filtri */}
  <Box sx={{
    width: { xs: "100%", md: 260 },
    p: { xs: 2, md: 4 },   // padding ridotto su mobile
  }}>
    Filtri
  </Box>

  {/* Colonna dei prodotti */}
  <Box sx={{
    flex: 1,
    p: { xs: 2, xl: 6 },   // padding extra su schermi grandi
    gap: { xs: 2, xl: 4 }, // gap più ampio su xl
  }}>
    Prodotti
  </Box>
</Box>`,
      },
      {
        type: "subheading",
        content: "Pseudo-selettori e selettori annidati",
      },
      {
        type: "text",
        content:
          'La prop sx supporta pseudo-selettori CSS come `"&:hover"`, `"&:focus"`, `"&.Mui-selected"` e selettori annidati come `"& .MuiChip-root"`. Il simbolo `&` rappresenta l\'elemento corrente. Questo permette di personalizzare anche le parti interne dei componenti MUI senza creare file CSS separati.',
      },
      {
        type: "code",
        language: "javascript",
        title: "Pseudo-selettori e selettori annidati",
        code: `// Voce di un menu con effetto hover
<Box sx={{
  cursor: "pointer",
  bgcolor: isSelected ? "rgba(25, 118, 210, 0.08)" : "transparent",
  transition: "all 0.2s ease",
  "&:hover": { bgcolor: "rgba(0,0,0,0.04)" },
}}>

// Selettori annidati per personalizzare i componenti MUI interni
<Box sx={{
  // Stile applicato a tutti i Chip contenuti nel Box
  "& .MuiChip-root": {
    fontWeight: "bold",
    borderRadius: 1,
  },
  bgcolor: "#f0f0f0",
  borderRadius: 3,
  p: 2,
  borderLeft: "4px solid",
  borderLeftColor: "primary.main",
}}>

// Personalizzazione della barra di scorrimento
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
        content: "sx condizionale con lo spread",
      },
      {
        type: "text",
        content:
          "Per stili semplici basta il ternario: `color: isActive ? \"white\" : \"text.primary\"`. Quando invece vuoi aggiungere un intero gruppo di proprietà solo se una condizione è vera, puoi usare lo spread dentro `sx`: `...(condizione && { ... })`. Se la condizione è falsa, `false` viene \"spalmato\" nell'oggetto senza aggiungere nulla; se è vera, vengono aggiunte tutte le proprietà dell'oggetto.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Card di un prodotto evidenziata quando è selezionata",
        code: `import { Paper, Typography } from "@mui/material";

export default function ProductCard({ name, price, isSelected, isOutOfStock }) {
  return (
    <Paper
      sx={{
        // Stili base (sempre applicati)
        p: 2,
        borderRadius: 2,
        border: "2px solid transparent",

        // Stili aggiunti solo se il prodotto è selezionato
        ...(isSelected && {
          borderColor: "primary.main",
          bgcolor: "rgba(25, 118, 210, 0.08)",
        }),

        // Stili aggiunti solo se il prodotto è esaurito
        ...(isOutOfStock && {
          opacity: 0.5,
          pointerEvents: "none",
        }),
      }}
    >
      <Typography variant="h6">{name}</Typography>
      <Typography
        variant="body2"
        sx={{ fontWeight: isSelected ? "bold" : "normal" }}
      >
        {price} €
      </Typography>
    </Paper>
  );
}`,
      },
      {
        type: "tip",
        content:
          "Preferisci i valori del tema (`p: 2`, `color: \"primary.main\"`, `bgcolor: \"grey.100\"`) ai valori scritti a mano come \"16px\" o \"#1976d2\": l'interfaccia resta coerente e cambiare il tema aggiorna tutto in un colpo solo.",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "Valore di spacing",
        description: "A quanti pixel corrisponde `p: 3` nella prop sx di MUI?",
        difficulty: "facile",
        options: ["3px", "12px", "24px", "30px"],
        correct: 2,
        explanation:
          "Il fattore di spaziatura di MUI è 8px per default. Quindi p: 3 = 3 × 8px = 24px. Allo stesso modo, m: 1 = 8px, p: 2 = 16px, gap: 0.5 = 4px.",
      },
      {
        type: "code",
        title: "Card responsive con sx",
        description:
          "Completa il `Box` in modo che:\n- su mobile (`xs`) abbia padding 16px e `flexDirection` `\"column\"`;\n- su desktop (`md`) abbia padding 32px e `flexDirection` `\"row\"`.\nUsa la scorciatoia `p` e i valori numerici del tema (16px = 2, 32px = 4).",
        difficulty: "medio",
        mode: "static",
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
        validate: `const c = $codeNoComments;
const padding = c.match(/\\bp\\s*:\\s*\\{([^}]*)\\}/);
if (!padding) return "Aggiungi un padding responsive con la scorciatoia p e un oggetto di breakpoint, es. p: { xs: ..., md: ... }";
if (!/\\bxs\\s*:\\s*2\\b/.test(padding[1])) return "Il padding su mobile deve essere 16px: usa xs: 2 dentro p";
if (!/\\bmd\\s*:\\s*4\\b/.test(padding[1])) return "Il padding su desktop deve essere 32px: usa md: 4 dentro p";
const dir = c.match(/flexDirection\\s*:\\s*\\{([^}]*)\\}/);
if (!dir) return "Aggiungi flexDirection con un oggetto di breakpoint, es. flexDirection: { xs: ..., md: ... }";
if (!/\\bxs\\s*:\\s*["']column["']/.test(dir[1])) return "Su mobile flexDirection deve essere \\"column\\": usa xs: \\"column\\"";
if (!/\\bmd\\s*:\\s*["']row["']/.test(dir[1])) return "Su desktop flexDirection deve essere \\"row\\": usa md: \\"row\\"";
return true;`,
        solutionExplanation:
          "Ogni proprietà di `sx` accetta un oggetto di breakpoint. Con l'approccio mobile-first, il valore di `xs` vale da 0px in su e quello di `md` lo sovrascrive da 900px in su: così la card è in colonna con 16px di padding sul telefono e in riga con 32px sullo schermo grande.",
      },
      {
        type: "multiple-choice",
        title: "Lo spread condizionale",
        description:
          "Con `isSelected` uguale a `false`, quali stili riceve il Paper?\n`<Paper sx={{ p: 2, ...(isSelected && { bgcolor: \"primary.main\", color: \"white\" }) }} />`",
        difficulty: "medio",
        options: [
          "Solo `p: 2`",
          "`p: 2`, `bgcolor` e `color`",
          "Nessuno: lo spread di `false` genera un errore",
          "`p: 2` e una proprietà `false: true`",
        ],
        correct: 0,
        explanation:
          "Con `isSelected` false, l'espressione `isSelected && {...}` vale `false`, e fare lo spread di `false` in un oggetto non aggiunge nessuna proprietà (e non dà errore). Resta quindi solo `p: 2`. Le proprietà `bgcolor` e `color` arrivano solo quando `isSelected` è true.",
      },
      {
        type: "multiple-choice",
        title: "Colorare i Chip interni",
        description:
          "Vuoi rendere in grassetto tutti i Chip contenuti in un Box, senza toccare i singoli Chip. Quale `sx` sul Box è corretto?",
        difficulty: "medio",
        options: [
          '`sx={{ Chip: { fontWeight: "bold" } }}`',
          '`sx={{ "&:hover": { fontWeight: "bold" } }}`',
          '`sx={{ ".Chip": { fontWeight: "bold" } }}`',
          '`sx={{ "& .MuiChip-root": { fontWeight: "bold" } }}`',
        ],
        correct: 3,
        explanation:
          "Ogni componente MUI ha una classe CSS del tipo `MuiNomeComponente-root`. Il selettore `\"& .MuiChip-root\"` significa \"gli elementi con classe MuiChip-root dentro l'elemento corrente\" (`&`). `Chip` come chiave verrebbe interpretato come una proprietà CSS inesistente, `.Chip` non è la classe usata da MUI, e `&:hover` cambia il Box stesso solo al passaggio del mouse.",
      },
      {
        type: "code",
        title: "Stili condizionali con lo spread",
        description:
          "Completa il componente `ActiveItem`:\n- nel `sx` del `Box`, usa lo spread condizionale `...(isActive && { ... })` per impostare `bgcolor: \"primary.main\"` quando `isActive` è true;\n- nel `sx` del `Typography`, usa il ternario per avere `fontWeight` `\"bold\"` se `isActive` è true e `\"normal\"` altrimenti.",
        difficulty: "difficile",
        mode: "static",
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
        validate: `const c = $codeNoComments;
const spread = c.match(/\\.\\.\\.\\s*\\(\\s*isActive\\s*&&\\s*\\{([\\s\\S]*?)\\}\\s*\\)/);
if (!spread) return "Nel sx del Box aggiungi lo spread condizionale: ...(isActive && { ... })";
if (!/bgcolor\\s*:\\s*["']primary\\.main["']/.test(spread[1])) return "Dentro lo spread condizionale imposta bgcolor: \\"primary.main\\"";
if (!/fontWeight\\s*:\\s*isActive\\s*\\?\\s*["']bold["']\\s*:\\s*["']normal["']/.test(c)) return "Nel sx del Typography imposta fontWeight con il ternario: fontWeight: isActive ? \\"bold\\" : \\"normal\\"";
return true;`,
        solutionExplanation:
          "Lo spread `...(isActive && { ... })` aggiunge un intero gruppo di stili solo quando la voce è attiva; essendo scritto dopo gli stili base, il suo `\"&:hover\"` sostituisce quello grigio. Per una singola proprietà con due valori possibili, come `fontWeight`, il ternario è più semplice e leggibile.",
      },
    ],
  },

  forms: {
    sections: [
      {
        type: "text",
        content:
          "MUI fornisce un ricco set di componenti per form e input: Select per i menu a tendina, TextField per il testo, Autocomplete per la selezione con ricerca, Checkbox e Switch per le scelte sì/no, e una serie di componenti per costruire tabelle. Si usano con lo stesso schema dei componenti controllati che conosci da React: un valore nello stato e un `onChange` che lo aggiorna.",
      },
      {
        type: "heading",
        content: "Select con MenuItem",
      },
      {
        type: "text",
        content:
          "Il componente Select crea un menu a tendina. Ogni opzione è un MenuItem con la sua prop `value`. Puoi avvolgere Select in un FormControl con InputLabel per avere un'etichetta che si sposta sopra il campo quando è selezionato un valore.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Select base con FormControl",
        code: `import { useState } from "react";
import {
  Select, MenuItem, FormControl, InputLabel, Box
} from "@mui/material";

export default function GenreFilter() {
  const [genre, setGenre] = useState("");

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth size="small">
        <InputLabel>Genere</InputLabel>
        <Select
          value={genre}
          label="Genere"
          onChange={(e) => setGenre(e.target.value)}
        >
          <MenuItem value="romanzo">Romanzo</MenuItem>
          <MenuItem value="giallo">Giallo</MenuItem>
          <MenuItem value="fantasy">Fantasy</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}`,
      },
      {
        type: "subheading",
        content: "TextField: input di testo",
      },
      {
        type: "text",
        content:
          "TextField è il componente universale per gli input di testo. Supporta le varianti `outlined` (default), `filled` e `standard`. Può essere su più righe (`multiline`), mostrare un testo di aiuto (`helperText`) e segnalare errori di validazione (`error`).",
      },
      {
        type: "code",
        language: "javascript",
        title: "Un form di contatto con TextField",
        code: `import { useState } from "react";
import { TextField, Stack } from "@mui/material";

export default function ContactForm() {
  const [name, setName] = useState("");
  const hasError = name.length > 0 && name.length < 3;

  return (
    <Stack spacing={2}>
      {/* Input base con validazione */}
      <TextField
        label="Nome"
        variant="outlined"
        size="small"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={hasError}
        helperText={hasError ? "Minimo 3 caratteri" : ""}
      />

      {/* Input su più righe */}
      <TextField
        label="Messaggio"
        multiline
        rows={3}
        variant="outlined"
      />

      {/* Input numerico */}
      <TextField
        label="Età"
        type="number"
        size="small"
        slotProps={{ htmlInput: { min: 0, step: 1 } }}
      />
    </Stack>
  );
}`,
      },
      {
        type: "subheading",
        content: "Autocomplete: selezione con ricerca",
      },
      {
        type: "text",
        content:
          "Autocomplete combina un TextField con un menu che si filtra mentre scrivi. Supporta la selezione singola e multipla (`multiple`), opzioni libere (`freeSolo`), raggruppamento e personalizzazione della visualizzazione. Riceve le opzioni in `options` e, con `getOptionLabel`, gli dici quale testo mostrare per ciascuna.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Autocomplete singolo e multiplo",
        code: `import { useState } from "react";
import { Autocomplete, TextField, Stack } from "@mui/material";

const cities = [
  { label: "Roma", value: "roma" },
  { label: "Milano", value: "milano" },
  { label: "Napoli", value: "napoli" },
  { label: "Torino", value: "torino" },
];

export default function CityPicker() {
  const [selectedCities, setSelectedCities] = useState([]);

  return (
    <Stack spacing={3}>
      {/* Autocomplete singolo */}
      <Autocomplete
        options={cities}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField {...params} label="Città di partenza" size="small" />
        )}
      />

      {/* Autocomplete multiplo: i valori scelti appaiono come Chip */}
      <Autocomplete
        multiple
        options={cities}
        getOptionLabel={(option) => option.label}
        value={selectedCities}
        onChange={(event, newValue) => setSelectedCities(newValue)}
        renderInput={(params) => (
          <TextField {...params} label="Città da visitare" size="small" />
        )}
      />
    </Stack>
  );
}`,
      },
      {
        type: "info",
        content:
          "Nota `renderInput={(params) => <TextField {...params} />}`: Autocomplete ti passa un oggetto `params` con tutte le props necessarie al campo di testo, e tu le \"spalmi\" sul TextField con lo spread. È lo stesso spread che conosci per gli oggetti, usato sulle props JSX.",
      },
      {
        type: "subheading",
        content: "Autocomplete multiplo come filtro",
      },
      {
        type: "text",
        content:
          "Un uso molto comune di Autocomplete `multiple` è il filtro: l'utente sceglie una o più categorie e la lista mostra solo gli elementi corrispondenti. Tre dettagli lo rendono comodo:",
      },
      {
        type: "list",
        items: [
          "`value` e `onChange` lo rendono **controllato**: il valore (un array) vive nello stato del componente. Attenzione: l'`onChange` di Autocomplete riceve due argomenti, `(event, newValue)`, e il nuovo valore è il **secondo**. Quando l'evento non ti serve, per convenzione lo chiami `_`: `onChange={(_, newValue) => ...}`.",
          "`limitTags={2}` mostra al massimo 2 Chip quando il campo non ha il focus, e al posto degli altri scrive \"+3\" (o quanti sono): il campo non cresce all'infinito.",
          "`placeholder` sul TextField è il testo grigio mostrato quando il campo è vuoto. Con un ternario puoi scrivere \"Tutti\" quando non è selezionato nulla: per un filtro, nessuna selezione significa infatti \"non escludere niente\". Quando ci sono dei Chip passi `undefined`, cioè nessun placeholder.",
        ],
      },
      {
        type: "code",
        language: "javascript",
        title: "Filtro per categorie con Autocomplete multiplo",
        code: `import { useState } from "react";
import { Autocomplete, TextField, Stack, Typography } from "@mui/material";

const categories = ["Informatica", "Casa", "Viaggi", "Sport", "Libri", "Giochi"];

export default function CategoryFilter() {
  // Lo stato è un array: all'inizio nessuna categoria scelta
  const [selected, setSelected] = useState([]);

  return (
    <Stack spacing={1} sx={{ width: 260 }}>
      <Typography variant="body2">Categorie</Typography>
      <Autocomplete
        multiple
        limitTags={2}
        size="small"
        options={categories}
        value={selected}
        // Il primo argomento (l'evento) non serve: lo chiamiamo _
        onChange={(_, newValue) => setSelected(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            // "Tutti" solo quando non c'è nessun Chip
            placeholder={selected.length === 0 ? "Tutti" : undefined}
          />
        )}
      />
      <Typography variant="caption">
        {selected.length === 0
          ? "Nessun filtro: vedi tutti i prodotti"
          : "Filtri attivi: " + selected.join(", ")}
      </Typography>
    </Stack>
  );
}`,
      },
      {
        type: "info",
        content:
          "Quando le opzioni sono semplici stringhe (come `categories` qui sopra), non serve `getOptionLabel`: Autocomplete mostra direttamente la stringa. Ti serve solo quando le opzioni sono oggetti.",
      },
      {
        type: "heading",
        content: "Slider: scegliere un valore numerico",
      },
      {
        type: "text",
        content:
          "Slider è una barra con un cursore da trascinare, perfetta per valori numerici in un intervallo (prezzo massimo, volume, percentuale). Le props principali:",
      },
      {
        type: "list",
        items: [
          "`min` e `max`: gli estremi dell'intervallo (default 0 e 100); `step` è il passo (default 1).",
          "`value` e `onChange`: come per Autocomplete, il nuovo valore è il **secondo** argomento: `onChange={(_, newValue) => setValue(newValue)}`.",
          "`valueLabelDisplay`: quando mostrare l'etichetta con il valore sopra il cursore: `\"off\"` (default, mai), `\"auto\"` (mentre lo trascini o al passaggio del mouse), `\"on\"` (sempre).",
          "`valueLabelFormat`: una funzione che riceve il numero e restituisce il testo da mostrare, es. `(v) => v + \" €\"`.",
          "`track`: la barra colorata. Di default (`\"normal\"`) colora la parte da `min` al cursore; con `track=\"inverted\"` colora quella dal cursore a `max`, utile quando il valore rappresenta un minimo (\"almeno 3 stelle\"); con `track={false}` non colora nulla.",
        ],
      },
      {
        type: "code",
        language: "javascript",
        title: "Filtri a cursore: prezzo massimo e valutazione minima",
        code: `import { useState } from "react";
import { Slider, Stack, Typography } from "@mui/material";

export default function PriceFilters() {
  const [maxPrice, setMaxPrice] = useState(200);
  const [minRating, setMinRating] = useState(3);

  return (
    <Stack spacing={3} sx={{ width: 260, pt: 3 }}>
      <Typography variant="body2">Prezzo massimo</Typography>
      <Slider
        value={maxPrice}
        onChange={(_, newValue) => setMaxPrice(newValue)}
        min={0}
        max={500}
        step={10}
        valueLabelDisplay="on"
        valueLabelFormat={(v) => v + " €"}
        aria-label="Prezzo massimo"
      />

      <Typography variant="body2">Valutazione minima</Typography>
      <Slider
        value={minRating}
        onChange={(_, newValue) => setMinRating(newValue)}
        min={1}
        max={5}
        valueLabelDisplay="auto"
        valueLabelFormat={(v) => v + " stelle"}
        // Coloriamo la parte "da qui in su": i valori accettati
        track="inverted"
        aria-label="Valutazione minima"
      />
    </Stack>
  );
}`,
      },
      {
        type: "info",
        content:
          "Lo Slider non ha un'etichetta testuale visibile come TextField: aggiungi `aria-label` così chi usa uno screen reader sa a cosa serve il cursore.",
      },
      {
        type: "heading",
        content: "Checkbox, Switch e FormControlLabel",
      },
      {
        type: "text",
        content:
          "Checkbox e Switch sono componenti di attivazione/disattivazione. FormControlLabel li avvolge aggiungendo un'etichetta cliccabile. Switch è ideale per impostazioni on/off, Checkbox per selezioni multiple da una lista.",
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

export default function NotificationSettings() {
  const [darkMode, setDarkMode] = useState(false);
  const [sounds, setSounds] = useState(true);
  const [channels, setChannels] = useState(["Email"]);

  const handleChannelToggle = (channel) => {
    setChannels((prev) =>
      prev.includes(channel)
        ? prev.filter((c) => c !== channel)
        : [...prev, channel]
    );
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Impostazioni</Typography>

      {/* Switch per le impostazioni on/off */}
      <FormControlLabel
        control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
        label="Tema scuro"
      />

      <FormControlLabel
        control={<Switch checked={sounds} onChange={() => setSounds(!sounds)} />}
        label="Suoni"
      />

      {/* Checkbox per la selezione multipla */}
      <Typography variant="subtitle2">Ricevi notifiche via</Typography>
      <FormGroup>
        {["Email", "SMS", "Push"].map((channel) => (
          <FormControlLabel
            key={channel}
            control={
              <Checkbox
                checked={channels.includes(channel)}
                onChange={() => handleChannelToggle(channel)}
                size="small"
              />
            }
            label={channel}
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
          "Le tabelle MUI usano un insieme di componenti strutturati: TableContainer (contenitore scorrevole), Table, TableHead (intestazione), TableBody (corpo), TableRow (riga) e TableCell (cella). Spesso TableContainer usa `component={Paper}` per avere lo sfondo in rilievo. Le righe si generano con `map` sull'array dei dati, ricordandosi la `key`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Tabella di prodotti",
        code: `import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Chip
} from "@mui/material";

const products = [
  { id: 1, name: "Tastiera", category: "Informatica", price: 49.9, inStock: true },
  { id: 2, name: "Lampada", category: "Casa", price: 24.5, inStock: false },
  { id: 3, name: "Zaino", category: "Viaggi", price: 39, inStock: true },
];

export default function ProductTable() {
  return (
    <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Prodotto</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Categoria</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">Prezzo (€)</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Disponibilità</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} hover>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell align="right">{product.price}</TableCell>
              <TableCell>
                <Chip
                  label={product.inStock ? "Disponibile" : "Esaurito"}
                  size="small"
                  color={product.inStock ? "success" : "warning"}
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
          "MUI fornisce anche DataGrid (@mui/x-data-grid) per tabelle avanzate con ordinamento, filtri, paginazione e modifica delle celle. Per tabelle semplici, i componenti Table di base sono sufficienti.",
      },
      {
        type: "tip",
        content:
          "Scegli il controllo in base al tipo di scelta: Switch per un'impostazione on/off, Checkbox per selezionare più voci, Select per sceglierne una da un elenco breve, Autocomplete quando le opzioni sono tante e conviene poterle cercare.",
      },
    ],
    exercises: [
      {
        type: "code",
        title: "Select controllato",
        description:
          "Crea un `Select` controllato con `useState` per scegliere la taglia di una maglietta, con tre `MenuItem` di valore `\"S\"`, `\"M\"` e `\"L\"`.\n- Collega il Select allo stato con `value` e aggiornalo in `onChange` con `e.target.value`.\n- Sotto il Select mostra il valore scelto dentro un `Typography`.",
        difficulty: "medio",
        mode: "static",
        starterCode: `import { useState } from "react";
import { Select, MenuItem, FormControl, InputLabel, Box, Typography } from "@mui/material";

export default function SizeSelect() {
  // Definisci lo stato

  return (
    <Box sx={{ p: 2 }}>
      {/* Crea il Select qui */}

      {/* Mostra il valore selezionato */}
    </Box>
  );
}`,
        solution: `import { useState } from "react";
import { Select, MenuItem, FormControl, InputLabel, Box, Typography } from "@mui/material";

export default function SizeSelect() {
  const [size, setSize] = useState("");

  return (
    <Box sx={{ p: 2 }}>
      <FormControl fullWidth size="small">
        <InputLabel>Taglia</InputLabel>
        <Select
          value={size}
          label="Taglia"
          onChange={(e) => setSize(e.target.value)}
        >
          <MenuItem value="S">S</MenuItem>
          <MenuItem value="M">M</MenuItem>
          <MenuItem value="L">L</MenuItem>
        </Select>
      </FormControl>
      <Typography sx={{ mt: 2 }}>
        Selezionata: {size || "nessuna"}
      </Typography>
    </Box>
  );
}`,
        validate: `const c = $codeNoComments;
const state = c.match(/const\\s*\\[\\s*(\\w+)\\s*,\\s*(\\w+)\\s*\\]\\s*=\\s*useState\\(/);
if (!state) return "Definisci lo stato con useState, es. const [size, setSize] = useState(\\"\\");";
const [, val, setter] = state;
if (!/<Select[\\s>]/.test(c)) return "Aggiungi il componente <Select>";
if (!new RegExp("<Select[^>]*value=\\\\{\\\\s*" + val + "\\\\s*\\\\}").test(c)) return "Collega il Select allo stato con value={" + val + "}";
if (!new RegExp("<Select[^>]*onChange=\\\\{[^}]*" + setter + "\\\\(\\\\s*\\\\w+\\\\.target\\\\.value\\\\s*\\\\)").test(c)) return "Nell'onChange del Select chiama " + setter + "(e.target.value)";
for (const s of ["S", "M", "L"]) {
  if (!new RegExp("<MenuItem[^>]*value=[\\"']" + s + "[\\"']").test(c)) return "Manca il MenuItem con value=\\"" + s + "\\"";
}
if (!new RegExp("<Typography[^>]*>[^<]*\\\\{[^}]*\\\\b" + val + "\\\\b[^}]*\\\\}").test(c)) return "Mostra il valore scelto dentro un Typography, es. <Typography>Selezionata: {" + val + "}</Typography>";
return true;`,
        solutionExplanation:
          "È lo schema del componente controllato: il valore mostrato dal Select arriva sempre dallo stato (`value={size}`) e ogni scelta passa da `onChange`, che legge `e.target.value` (il `value` del MenuItem cliccato) e aggiorna lo stato. Il `Typography` legge lo stesso stato, quindi si aggiorna da solo; `size || \"nessuna\"` mostra un testo di riserva finché lo stato è la stringa vuota.",
      },
      {
        type: "multiple-choice",
        title: "Componente per un'impostazione on/off",
        description:
          "Per un'impostazione on/off come 'Tema scuro', quale componente MUI è più appropriato?",
        difficulty: "facile",
        options: [
          "Checkbox",
          "Switch",
          "Radio",
          "Select con due opzioni",
        ],
        correct: 1,
        explanation:
          "Switch è progettato proprio per le impostazioni binarie on/off, con un riscontro visivo immediato. Checkbox è più adatto per selezioni multiple in una lista, Radio per scegliere una tra più opzioni. Un Select sarebbe eccessivo per una semplice scelta sì/no.",
      },
      {
        type: "code",
        title: "Tabella di libri",
        description:
          "Completa la tabella che riceve un array `books` di oggetti con i campi `id`, `title`, `author` e `pages`.\n- Aggiungi un `TableHead` con le intestazioni Titolo, Autore e Pagine.\n- Nel `TableBody` genera una `TableRow` per ogni libro con `books.map`, usando `key={book.id}` e la prop `hover`.\n- Allinea a destra la cella del numero di pagine con `align=\"right\"`.",
        difficulty: "difficile",
        mode: "static",
        starterCode: `import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from "@mui/material";

export default function BookTable({ books }) {
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

export default function BookTable({ books }) {
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Titolo</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Autore</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="right">Pagine</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id} hover>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell align="right">{book.pages}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}`,
        validate: `const c = $codeNoComments;
if (!/<TableHead>/.test(c)) return "Aggiungi l'intestazione con <TableHead> ... </TableHead>";
for (const h of ["Titolo", "Autore", "Pagine"]) {
  if (!new RegExp("<TableCell[^>]*>\\\\s*" + h + "\\\\s*</TableCell>").test(c)) return "Nell'intestazione manca la cella \\"" + h + "\\"";
}
if (!/<TableBody>/.test(c)) return "Aggiungi il corpo della tabella con <TableBody> ... </TableBody>";
const m = c.match(/books\\.map\\(\\s*\\(?\\s*(\\w+)/);
if (!m) return "Genera le righe con books.map((book) => ...)";
const b = m[1];
const row = c.match(/<TableRow([^>]*)>/g) || [];
const bodyRow = row.find((r) => new RegExp("key=\\\\{\\\\s*" + b + "\\\\.id\\\\s*\\\\}").test(r));
if (!bodyRow) return "Dai a ogni TableRow generata la prop key={" + b + ".id}";
if (!/\\bhover\\b/.test(bodyRow)) return "Aggiungi la prop hover alle TableRow del corpo";
for (const f of ["title", "author", "pages"]) {
  if (!new RegExp("\\\\{\\\\s*" + b + "\\\\." + f + "\\\\s*\\\\}").test(c)) return "Mostra il campo " + f + " in una cella: {" + b + "." + f + "}";
}
if (!new RegExp("<TableCell[^>]*align=[\\"']right[\\"'][^>]*>\\\\s*\\\\{\\\\s*" + b + "\\\\.pages\\\\s*\\\\}").test(c)) return "Allinea a destra la cella delle pagine: <TableCell align=\\"right\\">{" + b + ".pages}</TableCell>";
return true;`,
        solutionExplanation:
          "L'intestazione è fissa, quindi le sue celle si scrivono a mano; il corpo invece dipende dai dati e si genera con `books.map`, una `TableRow` per libro. La `key={book.id}` permette a React di riconoscere ogni riga quando l'array cambia, `hover` evidenzia la riga sotto il mouse e `align=\"right\"` allinea i numeri a destra, come si fa di solito per le colonne numeriche (anche nell'intestazione, così titolo e valori sono allineati).",
      },
      {
        type: "code",
        title: "Filtro per generi e durata",
        description:
          "Completa il componente `MovieFilters` di un catalogo di film.\n- Un `Autocomplete` con `multiple`, `limitTags={2}`, `options={genres}`, controllato dallo stato `selectedGenres` con `value` e `onChange={(_, newValue) => ...}`.\n- Nel suo `TextField`, un `placeholder` che vale `\"Tutti\"` quando `selectedGenres.length === 0` e `undefined` altrimenti.\n- Uno `Slider` controllato dallo stato `maxMinutes`, con `min={60}`, `max={240}`, `valueLabelDisplay=\"auto\"` e `valueLabelFormat` che aggiunge \" min\" al numero.",
        difficulty: "difficile",
        mode: "static",
        starterCode: `import { useState } from "react";
import { Autocomplete, TextField, Slider, Stack, Typography } from "@mui/material";

const genres = ["Commedia", "Dramma", "Fantascienza", "Animazione", "Horror"];

export default function MovieFilters() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [maxMinutes, setMaxMinutes] = useState(180);

  return (
    <Stack spacing={3} sx={{ width: 280 }}>
      <Typography variant="body2">Generi</Typography>
      {/* Autocomplete multiplo qui */}

      <Typography variant="body2">Durata massima</Typography>
      {/* Slider qui */}
    </Stack>
  );
}`,
        solution: `import { useState } from "react";
import { Autocomplete, TextField, Slider, Stack, Typography } from "@mui/material";

const genres = ["Commedia", "Dramma", "Fantascienza", "Animazione", "Horror"];

export default function MovieFilters() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [maxMinutes, setMaxMinutes] = useState(180);

  return (
    <Stack spacing={3} sx={{ width: 280 }}>
      <Typography variant="body2">Generi</Typography>
      <Autocomplete
        multiple
        limitTags={2}
        size="small"
        options={genres}
        value={selectedGenres}
        onChange={(_, newValue) => setSelectedGenres(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={selectedGenres.length === 0 ? "Tutti" : undefined}
          />
        )}
      />

      <Typography variant="body2">Durata massima</Typography>
      <Slider
        value={maxMinutes}
        onChange={(_, newValue) => setMaxMinutes(newValue)}
        min={60}
        max={240}
        valueLabelDisplay="auto"
        valueLabelFormat={(v) => v + " min"}
        aria-label="Durata massima"
      />
    </Stack>
  );
}`,
        validate: `const c = $codeNoComments;
const ac = c.match(/<Autocomplete([\\s\\S]*?)renderInput/);
if (!ac) return "Aggiungi un <Autocomplete> con le sue props e renderInput";
const a = ac[1];
if (!/\\bmultiple\\b/.test(a)) return "Aggiungi la prop multiple all'Autocomplete";
if (!/limitTags=\\{\\s*2\\s*\\}/.test(a)) return "Aggiungi limitTags={2} all'Autocomplete";
if (!/options=\\{\\s*genres\\s*\\}/.test(a)) return "Passa le opzioni con options={genres}";
if (!/value=\\{\\s*selectedGenres\\s*\\}/.test(a)) return "Rendi l'Autocomplete controllato con value={selectedGenres}";
if (!/onChange=\\{\\s*\\(\\s*\\w+\\s*,\\s*(\\w+)\\s*\\)\\s*=>\\s*\\{?\\s*setSelectedGenres\\(\\s*\\1\\s*\\)/.test(a)) return "Nell'onChange usa il SECONDO argomento: onChange={(_, newValue) => setSelectedGenres(newValue)}";
if (!/\\{\\s*\\.\\.\\.params\\s*\\}/.test(c)) return "Nel renderInput passa i params al TextField: <TextField {...params} />";
if (!/placeholder=\\{\\s*selectedGenres\\.length\\s*===?\\s*0\\s*\\?\\s*["']Tutti["']\\s*:\\s*undefined\\s*\\}/.test(c)) return "Sul TextField aggiungi placeholder={selectedGenres.length === 0 ? \\"Tutti\\" : undefined}";
const sl = c.match(/<Slider([\\s\\S]*?)\\/>/);
if (!sl) return "Aggiungi uno <Slider ... />";
const s = sl[1];
if (!/value=\\{\\s*maxMinutes\\s*\\}/.test(s)) return "Collega lo Slider allo stato con value={maxMinutes}";
if (!/onChange=\\{\\s*\\(\\s*\\w+\\s*,\\s*(\\w+)\\s*\\)\\s*=>\\s*\\{?\\s*setMaxMinutes\\(\\s*\\1\\s*\\)/.test(s)) return "Nell'onChange dello Slider usa il secondo argomento: onChange={(_, newValue) => setMaxMinutes(newValue)}";
if (!/min=\\{\\s*60\\s*\\}/.test(s) || !/max=\\{\\s*240\\s*\\}/.test(s)) return "Imposta min={60} e max={240} sullo Slider";
if (!/valueLabelDisplay=["']auto["']/.test(s)) return "Aggiungi valueLabelDisplay=\\"auto\\" allo Slider";
if (!/valueLabelFormat=\\{[\\s\\S]*min/.test(s)) return "Aggiungi valueLabelFormat con una funzione che aggiunge \\" min\\", es. valueLabelFormat={(v) => v + \\" min\\"}";
return true;`,
        solutionExplanation:
          "Entrambi i componenti sono controllati: il valore vive nello stato e `onChange` lo aggiorna. Sia Autocomplete sia Slider passano il nuovo valore come **secondo** argomento, per questo il primo (l'evento) si chiama `_`. Il `placeholder` condizionale dice all'utente che, senza generi scelti, il filtro non esclude nulla; `limitTags` evita che il campo si allunghi con tanti Chip.",
      },
      {
        type: "multiple-choice",
        title: "L'onChange di Autocomplete",
        description:
          "Questo Autocomplete multiplo non funziona: dopo aver scelto un'opzione, lo stato `tags` non contiene l'array delle scelte. Perché?\n`<Autocomplete multiple options={allTags} value={tags} onChange={(newValue) => setTags(newValue)} ... />`",
        difficulty: "medio",
        options: [
          "Manca `limitTags`, obbligatorio con `multiple`",
          "`value` deve essere una stringa, non un array",
          "Il primo argomento di `onChange` è l'evento: il nuovo valore è il secondo, quindi serve `(_, newValue) => setTags(newValue)`",
          "Bisogna usare `e.target.value` come per il Select",
        ],
        correct: 2,
        explanation:
          "L'`onChange` di Autocomplete (come quello di Slider) riceve `(event, newValue)`: qui `newValue` è in realtà l'evento, e lo stato riceve un oggetto evento invece dell'array. `limitTags` è facoltativo, con `multiple` il `value` è proprio un array, e `e.target.value` non contiene le opzioni scelte: funziona per Select e TextField, non per Autocomplete.",
      },
      {
        type: "multiple-choice",
        title: "Quale track?",
        description:
          "Uno Slider da 1 a 5 rappresenta la \"valutazione minima\" di un ristorante: con il cursore su 3 vuoi che la barra colorata copra i valori accettati, cioè da 3 a 5. Quale prop usi?",
        difficulty: "medio",
        options: [
          "`track={false}`",
          "`valueLabelDisplay=\"on\"`",
          "`track=\"normal\"`",
          "`track=\"inverted\"`",
        ],
        correct: 3,
        explanation:
          "`track=\"inverted\"` colora la parte dal cursore fino a `max`, cioè proprio i valori \"da 3 in su\". `track=\"normal\"` (il default) colorerebbe da 1 a 3, `track={false}` non colorerebbe nulla, e `valueLabelDisplay` decide solo quando mostrare l'etichetta con il numero, non la barra.",
      },
    ],
  },
};
