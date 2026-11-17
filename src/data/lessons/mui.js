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

  layout: {
    sections: [
      {
        type: "text",
        content:
          "Con Box, Stack e Typography sai già costruire qualsiasi interfaccia, ma MUI offre componenti pronti per i blocchi che ritornano in quasi tutte le app: una griglia responsive per dividere la pagina in pannelli, le card, le sezioni che si aprono e chiudono (Accordion), i menu a tendina, gli indicatori di caricamento. In questa lezione li usiamo per costruire la pagina di un'app per gestire le attività di un team: un riepilogo in alto, l'elenco delle attività raggruppate per categoria e un menu per scegliere il progetto.",
      },
      {
        type: "heading",
        content: "Grid: la griglia responsive a 12 colonne",
      },
      {
        type: "text",
        content:
          "Grid divide lo spazio orizzontale in **12 colonne**. Il contenitore si scrive `<Grid container>`; ogni elemento al suo interno è un `<Grid>` con la prop `size`, che dice quante colonne occupa. Come per `sx`, `size` accetta un oggetto di breakpoint: `size={{ xs: 12, md: 4 }}` significa \"12 colonne su 12 (tutta la larghezza) sul telefono, 4 su 12 (un terzo) da `md` in su\". `spacing={2}` mette 16px di spazio tra gli elementi, sia in orizzontale sia in verticale.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Tre pannelli affiancati su desktop, impilati su mobile",
        code: `import { Grid, Paper, Typography } from "@mui/material";

export default function SummaryPanels() {
  return (
    <Grid container spacing={2}>
      {/* Su mobile ogni pannello occupa 12 colonne: uno sotto l'altro.
          Da md in su ne occupa 4: tre pannelli affiancati (4 + 4 + 4 = 12) */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h6">Da fare</Typography>
          <Typography variant="h4">12</Typography>
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h6">In corso</Typography>
          <Typography variant="h4">5</Typography>
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper variant="outlined" sx={{ p: 2 }}>
          <Typography variant="h6">Completate</Typography>
          <Typography variant="h4">31</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}`,
      },
      {
        type: "list",
        items: [
          "Se la somma delle `size` di una riga supera 12, gli elementi in più vanno a capo nella riga successiva: con `size={{ xs: 6 }}` hai due elementi per riga.",
          "Puoi combinare più breakpoint: `size={{ xs: 12, sm: 6, lg: 3 }}` dà una colonna sul telefono, due sul tablet e quattro sugli schermi grandi.",
          "`size=\"grow\"` fa occupare all'elemento tutto lo spazio rimasto nella riga.",
        ],
      },
      {
        type: "info",
        content:
          "Nelle versioni recenti di MUI, `Grid` è la \"Grid v2\": gli elementi si scrivono `<Grid size={...}>`. In tutorial più vecchi trovi `<Grid item xs={12} md={4}>`: è la sintassi della vecchia versione, oggi non più supportata.",
      },
      {
        type: "subheading",
        content: "Paper outlined, Card e CardContent",
      },
      {
        type: "text",
        content:
          "Oltre all'ombra (`elevation`), Paper ha la variante `variant=\"outlined\"`: niente ombra, solo un bordo sottile. È lo stile più usato per i pannelli di una pagina ricca di contenuti, perché risulta più pulito. **Card** è un Paper specializzato per le schede: si compone con `CardContent` (il contenuto, con il padding giusto già impostato) e `CardActions` (la riga dei bottoni in fondo). Anche Card accetta `variant=\"outlined\"`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "La card di un'attività",
        code: `import { Card, CardContent, CardActions, Typography, Button } from "@mui/material";

export default function TaskCard({ title, description }) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Apri</Button>
        <Button size="small" color="error">Elimina</Button>
      </CardActions>
    </Card>
  );
}`,
      },
      {
        type: "heading",
        content: "Allineare gli elementi in una riga",
      },
      {
        type: "subheading",
        content: "Stack con useFlexGap e flexWrap",
      },
      {
        type: "text",
        content:
          "In una riga con tanti elementi (titolo, responsabile, stato, data) su uno schermo stretto lo spazio finisce. Con `sx={{ flexWrap: \"wrap\" }}` gli elementi vanno a capo invece di uscire dal bordo. Aggiungi anche `useFlexGap`: di default Stack crea lo spazio tra gli elementi con dei margini, mentre con `useFlexGap` usa la proprietà CSS `gap`. Il `gap` funziona bene anche quando gli elementi vanno a capo (i margini no) e non interferisce con i margini che imposti tu sui figli.",
      },
      {
        type: "subheading",
        content: "Il trucco ml: \"auto\"",
      },
      {
        type: "text",
        content:
          "In un contenitore flex, un margine `auto` si prende tutto lo spazio libero. Quindi `ml: \"auto\"` (margin-left automatico) su un elemento lo **spinge fino al bordo destro**, lasciando gli altri a sinistra. È il modo più semplice per avere, per esempio, il titolo a sinistra e la data a destra. Qui `useFlexGap` è importante: senza, Stack imposterebbe il proprio margine sui figli, sovrascrivendo il tuo `ml: \"auto\"`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Intestazione di un progetto: titolo a sinistra, data a destra",
        code: `import { Stack, Typography, Chip } from "@mui/material";

<Stack
  direction="row"
  spacing={3}
  useFlexGap
  sx={{ alignItems: "center", flexWrap: "wrap", mb: 1 }}
>
  <Typography variant="h6">Nuovo sito della biblioteca</Typography>
  <Chip label="In corso" color="info" size="small" />

  {/* ml: "auto" occupa tutto lo spazio libero a sinistra
      e spinge la data contro il bordo destro */}
  <Typography variant="caption" sx={{ ml: "auto", fontStyle: "italic" }}>
    Ultima modifica: 12/06/2026
  </Typography>
</Stack>`,
      },
      {
        type: "subheading",
        content: "Box con flexGrow: 1 come spaziatore",
      },
      {
        type: "text",
        content:
          "Un'alternativa a `ml: \"auto\"` è un Box vuoto con `sx={{ flexGrow: 1 }}`: in un contenitore flex cresce fino a occupare tutto lo spazio libero, separando ciò che sta prima da ciò che sta dopo. È comodo nelle barre in alto (header) per separare il logo dai bottoni. Nello stesso esempio vedi il **Divider verticale**: `orientation=\"vertical\"` lo trasforma in una linea verticale e `flexItem` gli fa prendere l'altezza della riga.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Una barra in alto con spaziatore, divisore verticale e Avatar",
        code: `import { Box, Stack, Typography, Divider, Avatar, Button } from "@mui/material";

<Stack direction="row" spacing={2} sx={{ alignItems: "center", px: 2, py: 1 }}>
  <Typography variant="h6">TeamBoard</Typography>

  {/* Spaziatore: spinge tutto ciò che segue verso destra */}
  <Box sx={{ flexGrow: 1 }} />

  <Button variant="text">Attività</Button>
  <Button variant="text">Calendario</Button>

  <Divider orientation="vertical" flexItem />

  {/* Avatar con le iniziali (o una foto con src) */}
  <Avatar sx={{ width: 32, height: 32, bgcolor: "secondary.main" }}>GR</Avatar>
</Stack>`,
      },
      {
        type: "text",
        content:
          "**Avatar** mostra l'immagine di un utente in un cerchio: con `src=\"/foto.jpg\"` e `alt=\"Giulia Rossi\"` mostra una foto, mentre se gli passi del testo come figlio mostra le iniziali. Le dimensioni si cambiano con `width` e `height` in `sx`.",
      },
      {
        type: "heading",
        content: "Chip con il colore preso da una mappa",
      },
      {
        type: "text",
        content:
          "Spesso il colore di un Chip dipende da un valore: lo stato di un'attività, la priorità di un ordine. Invece di una catena di `if` o di ternari annidati, scrivi un **oggetto mappa** che associa a ogni valore il colore di MUI, e leggilo con le parentesi quadre. Per i valori che non sono nella mappa, `??` fornisce un colore di riserva (`\"default\"`, il grigio).",
      },
      {
        type: "code",
        language: "javascript",
        title: "STATUS_COLORS: una mappa stato → colore",
        code: `import { Chip } from "@mui/material";

// Fuori dal componente: è una costante, non cambia mai
const STATUS_COLORS = {
  "Completato": "success",
  "In corso": "info",
  "In ritardo": "error",
};

export default function StatusChip({ status }) {
  return (
    <Chip
      label={status}
      // Uno stato sconosciuto (es. "Sospeso") non è nella mappa:
      // STATUS_COLORS["Sospeso"] è undefined e ?? usa "default"
      color={STATUS_COLORS[status] ?? "default"}
      size="small"
      sx={{ fontWeight: "bold" }}
    />
  );
}`,
      },
      {
        type: "info",
        content:
          "I colori accettati dalla prop `color` di Chip (e di Button) sono quelli della palette del tema: `\"default\"`, `\"primary\"`, `\"secondary\"`, `\"success\"`, `\"error\"`, `\"warning\"`, `\"info\"`. Nella prossima lezione vedrai come personalizzarli.",
      },
      {
        type: "subheading",
        content: "Typography annidate: etichetta in grassetto + valore",
      },
      {
        type: "text",
        content:
          "Per mostrare coppie come \"**Responsabile:** Giulia\" puoi mettere una Typography dentro un'altra. Attenzione però: Typography con `variant=\"body1\"` o `\"body2\"` renderizza un paragrafo `<p>`, e un `<p>` dentro un altro `<p>` non è HTML valido (React lo segnala in console). La soluzione è la prop **`component`**, che hai già visto su Box: `component=\"span\"` fa renderizzare alla Typography interna uno `<span>`, che può stare dentro un paragrafo.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Un piccolo componente riutilizzabile per etichetta e valore",
        code: `import { Typography } from "@mui/material";

function InfoRow({ label, value }) {
  return (
    <Typography variant="body2">
      <Typography component="span" variant="body2" color="primary" sx={{ fontWeight: "bold" }}>
        {label}:{" "}
      </Typography>
      {value}
    </Typography>
  );
}

// Uso
<InfoRow label="Responsabile" value="Giulia Rossi" />
<InfoRow label="Scadenza" value="30/06/2026" />`,
      },
      {
        type: "text",
        content:
          "La prop `component` funziona su quasi tutti i componenti MUI e cambia l'elemento renderizzato mantenendo lo stile: `<Button component=\"a\" href=\"/aiuto\">` è un link con l'aspetto di un bottone, `<TableContainer component={Paper}>` (visto nella lezione precedente) è un Paper. Puoi passare anche un componente React: nel modulo Next.js userai `<Button component={Link} href=\"/attivita\">` per avere un bottone che naviga tra le pagine con il `Link` di Next.js.",
      },
      {
        type: "heading",
        content: "Accordion: sezioni che si aprono e chiudono",
      },
      {
        type: "text",
        content:
          "Accordion mostra un'intestazione cliccabile (`AccordionSummary`) che apre e chiude un contenuto (`AccordionDetails`). È perfetto per elenchi lunghi divisi in gruppi: l'utente apre solo quelli che gli interessano. Le props più utili:",
      },
      {
        type: "list",
        items: [
          "`expandIcon={<ExpandMore />}` su AccordionSummary: l'icona a destra, che MUI ruota da sola quando l'Accordion si apre.",
          "`disableGutters`: di default un Accordion aperto si stacca dagli altri con un margine; con `disableGutters` restano attaccati, come in una lista.",
          "`variant=\"outlined\"`: bordo al posto dell'ombra, come per Paper.",
          "`slotProps={{ transition: { unmountOnExit: true } }}`: di default il contenuto di un Accordion chiuso viene comunque creato (solo nascosto). Con `unmountOnExit` viene creato solo quando lo apri e rimosso quando lo chiudi: con tanti Accordion pieni di tabelle la pagina resta veloce.",
          "Quando è aperto, l'Accordion e l'AccordionSummary ricevono la classe `Mui-expanded`: con `\"&.Mui-expanded\"` in `sx` puoi cambiare lo stile dell'intestazione aperta.",
        ],
      },
      {
        type: "code",
        language: "javascript",
        title: "Un Accordion per ogni categoria di attività",
        code: `import { Accordion, AccordionSummary, AccordionDetails, Typography, Stack } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

export default function CategoryAccordion({ category, tasks }) {
  return (
    <Accordion
      disableGutters
      variant="outlined"
      slotProps={{ transition: { unmountOnExit: true } }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        sx={{
          bgcolor: "grey.50",
          borderLeft: 4,
          borderLeftColor: "primary.main",
          "&:hover": { bgcolor: "grey.100" },
          // Stile dell'intestazione quando l'Accordion è aperto
          "&.Mui-expanded": { bgcolor: "grey.200" },
        }}
      >
        <Typography color="primary" sx={{ fontWeight: "bold" }}>
          {category} ({tasks.length})
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack spacing={1}>
          {tasks.map((task) => (
            <Typography key={task.id} variant="body2">{task.title}</Typography>
          ))}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}`,
      },
      {
        type: "text",
        content:
          "Un Accordion si gestisce da solo, ma puoi anche renderlo **controllato** con `expanded` e `onChange`. L'`onChange` riceve `(event, isExpanded)`: come per Autocomplete, il valore utile è il secondo. Così puoi, per esempio, tenere aperto un solo Accordion alla volta salvando nello stato quale è aperto.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Un solo Accordion aperto alla volta",
        code: `const [openCategory, setOpenCategory] = useState(null);

{categories.map((category) => (
  <Accordion
    key={category}
    disableGutters
    expanded={openCategory === category}
    onChange={(_, isExpanded) => setOpenCategory(isExpanded ? category : null)}
  >
    <AccordionSummary expandIcon={<ExpandMore />}>{category}</AccordionSummary>
    <AccordionDetails>...</AccordionDetails>
  </Accordion>
))}`,
      },
      {
        type: "heading",
        content: "Menu a tendina con anchorEl",
      },
      {
        type: "text",
        content:
          "Il componente Menu mostra un elenco di voci \"agganciato\" a un elemento della pagina (di solito il bottone che lo apre). Per sapere dove mostrarsi, Menu ha bisogno di quell'elemento: lo riceve nella prop `anchorEl` (elemento di ancoraggio). Lo schema è sempre lo stesso:",
      },
      {
        type: "list",
        items: [
          "Uno stato `const [anchorEl, setAnchorEl] = useState(null)`: `null` significa \"menu chiuso\".",
          "Al click sul bottone, `setAnchorEl(event.currentTarget)`: `event.currentTarget` è l'elemento su cui hai messo l'`onClick`, cioè il bottone stesso.",
          "`const open = Boolean(anchorEl)`: `Boolean(null)` è `false`, `Boolean(elemento)` è `true`. Così lo stesso stato dice sia **se** il menu è aperto sia **dove** mostrarlo.",
          "`onClose` (click fuori dal menu o tasto Esc) e la scelta di una voce rimettono lo stato a `null`.",
        ],
      },
      {
        type: "code",
        language: "javascript",
        title: "Scegliere il progetto da un menu",
        code: `import { useState } from "react";
import { Button, Menu, MenuItem, Divider } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";

const projects = ["Sito della biblioteca", "App delle ricette", "Negozio online"];

export default function ProjectSelector() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selected, setSelected] = useState(projects[0]);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSelect = (project) => {
    setSelected(project);
    handleClose();
  };

  return (
    <>
      <Button onClick={handleOpen} endIcon={<KeyboardArrowDown />}>
        {selected}
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {projects.map((project) => (
          <MenuItem
            key={project}
            // selected evidenzia la voce attualmente scelta
            selected={project === selected}
            onClick={() => handleSelect(project)}
          >
            {project}
          </MenuItem>
        ))}
        <Divider />
        <MenuItem onClick={handleClose}>+ Nuovo progetto</MenuItem>
      </Menu>
    </>
  );
}`,
      },
      {
        type: "warning",
        content:
          "Usa `event.currentTarget`, non `event.target`: se il bottone contiene un'icona e l'utente clicca proprio sull'icona, `event.target` è l'icona (l'elemento cliccato davvero), mentre `event.currentTarget` è sempre il bottone che ha l'`onClick`.",
      },
      {
        type: "heading",
        content: "CircularProgress: mostrare un caricamento",
      },
      {
        type: "text",
        content:
          "Mentre i dati arrivano dal server, mostra una rotella di caricamento invece di una pagina vuota. `CircularProgress` è proprio questo; con `size` ne cambi la dimensione. Lo schema tipico è un'uscita anticipata (*early return*) dal componente: se sta caricando, restituisci subito lo spinner.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Spinner centrato durante il caricamento",
        code: `import { Box, CircularProgress, Grid } from "@mui/material";

export default function TaskBoard({ loading, tasks }) {
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Grid container spacing={2}>
      {tasks.map((task) => (
        <Grid key={task.id} size={{ xs: 12, sm: 6, lg: 4 }}>
          <TaskCard title={task.title} description={task.description} />
        </Grid>
      ))}
    </Grid>
  );
}`,
      },
      {
        type: "tip",
        content:
          "Quando un valore (uno stato, una categoria) decide un colore o un'etichetta, raccogli le corrispondenze in un oggetto mappa con un valore di riserva: aggiungere un nuovo caso diventa una riga in più, invece di un altro ramo in un ternario.",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "Grid su schermi diversi",
        description:
          "Cosa vede l'utente su un telefono e su un monitor largo con questo codice?\n`<Grid container spacing={2}>\n  <Grid size={{ xs: 12, md: 6 }}>A</Grid>\n  <Grid size={{ xs: 12, md: 6 }}>B</Grid>\n  <Grid size={{ xs: 12, md: 6 }}>C</Grid>\n</Grid>`",
        difficulty: "medio",
        options: [
          "Su entrambi: A, B e C affiancati sulla stessa riga",
          "Telefono: A, B e C uno sotto l'altro. Monitor: A e B affiancati, C sotto da solo a metà larghezza",
          "Telefono: A, B e C affiancati. Monitor: uno sotto l'altro",
          "Errore: la somma delle size (18) supera le 12 colonne",
        ],
        correct: 1,
        explanation:
          "Le colonne sono 12. Su telefono (`xs`) ogni elemento ne occupa 12, cioè tutta la riga: sono impilati. Da `md` in su ognuno ne occupa 6, metà riga: A e B riempiono la prima riga e C, che non ci sta più, va a capo occupando metà della seconda. Superare 12 non è un errore: gli elementi in più vanno semplicemente a capo.",
      },
      {
        type: "multiple-choice",
        title: "La data a destra",
        description:
          "In uno `<Stack direction=\"row\" useFlexGap spacing={2}>` hai un titolo, un Chip e una data. Vuoi che la data stia attaccata al bordo destro, con titolo e Chip a sinistra. Cosa aggiungi alla data?",
        difficulty: "facile",
        options: [
          '`sx={{ textAlign: "right" }}`',
          '`sx={{ float: "right" }}`',
          '`sx={{ ml: "auto" }}`',
          '`sx={{ mr: 0 }}`',
        ],
        correct: 2,
        explanation:
          "In un contenitore flex, `ml: \"auto\"` assegna all'elemento un margine sinistro che occupa tutto lo spazio libero, spingendolo a destra. `textAlign` allinea il testo *dentro* l'elemento ma non lo sposta, `float` non ha effetto sugli elementi di un contenitore flex, e `mr: 0` toglie un margine che non c'è.",
      },
      {
        type: "multiple-choice",
        title: "Il colore di riserva",
        description:
          "Che cosa stampa questo codice?\n`const STATUS_COLORS = { \"Completato\": \"success\", \"In ritardo\": \"error\" };\nconsole.log(STATUS_COLORS[\"Sospeso\"] ?? \"default\");`",
        difficulty: "facile",
        options: [
          "`\"default\"`",
          "`undefined`",
          "`\"error\"`",
          "Un errore, perché la chiave non esiste",
        ],
        correct: 0,
        explanation:
          "Leggere una chiave che non esiste in un oggetto non dà errore: restituisce `undefined`. L'operatore `??` restituisce il valore di destra quando quello di sinistra è `null` o `undefined`, quindi il risultato è `\"default\"`. È così che il Chip di uno stato sconosciuto diventa grigio invece di rompere l'interfaccia.",
      },
      {
        type: "multiple-choice",
        title: "Aprire il menu",
        description:
          "Hai `const [anchorEl, setAnchorEl] = useState(null);` e `<Menu anchorEl={anchorEl} open={Boolean(anchorEl)} ...>`. Quale `onClick` sul bottone apre il menu nel punto giusto?",
        difficulty: "medio",
        options: [
          "`onClick={() => setAnchorEl(true)}`",
          "`onClick={(event) => setAnchorEl(event.target.value)}`",
          "`onClick={() => setAnchorEl(!anchorEl)}`",
          "`onClick={(event) => setAnchorEl(event.currentTarget)}`",
        ],
        correct: 3,
        explanation:
          "Menu ha bisogno dell'elemento a cui agganciarsi: `event.currentTarget` è il bottone che ha l'`onClick`. Con `true` (o `!anchorEl`, che vale `true`) `Boolean(anchorEl)` sarebbe vero e il menu si aprirebbe, ma senza sapere dove mostrarsi. `event.target.value` è il valore di un campo di input: per un bottone non ha senso.",
      },
      {
        type: "multiple-choice",
        title: "Typography dentro Typography",
        description:
          "Perché nella Typography interna si scrive `component=\"span\"`?\n`<Typography variant=\"body2\">\n  <Typography component=\"span\" sx={{ fontWeight: \"bold\" }}>Autore: </Typography>\n  Italo Calvino\n</Typography>`",
        difficulty: "medio",
        options: [
          "Perché senza, entrambe renderizzano un `<p>` e un paragrafo dentro un paragrafo non è HTML valido",
          "Perché `fontWeight` funziona solo sugli `<span>`",
          "Perché `component=\"span\"` rende il testo più piccolo",
          "Non serve: Typography annidate diventano automaticamente degli span",
        ],
        correct: 0,
        explanation:
          "Typography con varianti di testo come body1/body2 renderizza un `<p>`, e il browser non permette un `<p>` dentro un altro `<p>` (React lo segnala in console). `component=\"span\"` cambia solo l'elemento HTML generato, mantenendo lo stile di Typography. `fontWeight` funziona su qualsiasi elemento e `component` non cambia la dimensione del testo; MUI non converte nulla in automatico.",
      },
      {
        type: "code",
        title: "Chip colorati da una mappa",
        description:
          "Prepara la logica dei Chip di stato di una lista di attività (è JavaScript puro, senza React).\n- Crea l'oggetto `STATUS_COLORS` con `\"Completato\"` → `\"success\"`, `\"In corso\"` → `\"info\"` e `\"In ritardo\"` → `\"error\"`.\n- Scrivi `getChipColor(status)`, che restituisce il colore dalla mappa oppure `\"default\"` se lo stato non c'è (usa `??`).\n- Scrivi `buildChips(tasks)`: riceve un array di attività `{ title, status }` e restituisce un array di oggetti `{ label, color }`, dove `label` è lo stato e `color` il suo colore.",
        difficulty: "medio",
        starterCode: `// 1. La mappa stato -> colore
const STATUS_COLORS = {};

// 2. Il colore di uno stato, con "default" come riserva
function getChipColor(status) {

}

// 3. Da attività a dati dei Chip
function buildChips(tasks) {

}

const tasks = [
  { title: "Scrivere i test", status: "Completato" },
  { title: "Nuova home page", status: "In ritardo" },
  { title: "Correggere il login", status: "Sospeso" },
];
console.log(buildChips(tasks));`,
        solution: `// 1. La mappa stato -> colore
const STATUS_COLORS = {
  "Completato": "success",
  "In corso": "info",
  "In ritardo": "error",
};

// 2. Il colore di uno stato, con "default" come riserva
function getChipColor(status) {
  return STATUS_COLORS[status] ?? "default";
}

// 3. Da attività a dati dei Chip
function buildChips(tasks) {
  return tasks.map((task) => ({
    label: task.status,
    color: getChipColor(task.status),
  }));
}

const tasks = [
  { title: "Scrivere i test", status: "Completato" },
  { title: "Nuova home page", status: "In ritardo" },
  { title: "Correggere il login", status: "Sospeso" },
];
console.log(buildChips(tasks));`,
        validate: `if (!$equal(STATUS_COLORS, { "Completato": "success", "In corso": "info", "In ritardo": "error" })) return "STATUS_COLORS deve contenere esattamente \\"Completato\\": \\"success\\", \\"In corso\\": \\"info\\" e \\"In ritardo\\": \\"error\\"";
if (typeof getChipColor !== "function") return "Definisci la funzione getChipColor";
if (getChipColor("Completato") !== "success") return "getChipColor(\\"Completato\\") dovrebbe restituire \\"success\\"";
if (getChipColor("In corso") !== "info") return "getChipColor(\\"In corso\\") dovrebbe restituire \\"info\\"";
if (getChipColor("Sospeso") !== "default") return "Per uno stato non presente nella mappa (es. \\"Sospeso\\") getChipColor deve restituire \\"default\\"";
if (getChipColor(undefined) !== "default") return "Anche getChipColor(undefined) deve restituire \\"default\\"";
if (typeof buildChips !== "function") return "Definisci la funzione buildChips";
const r = buildChips([{ title: "A", status: "In ritardo" }, { title: "B", status: "Bozza" }]);
if (!Array.isArray(r)) return "buildChips deve restituire un array";
if (!$equal(r, [{ label: "In ritardo", color: "error" }, { label: "Bozza", color: "default" }])) return "buildChips deve restituire un oggetto { label, color } per ogni attività: con [{ status: \\"In ritardo\\" }, { status: \\"Bozza\\" }] ottieni " + $format(r);
if (!$equal(buildChips([]), [])) return "Con un array vuoto buildChips deve restituire []";
return true;`,
        solutionExplanation:
          "La mappa sostituisce una catena di `if`: `STATUS_COLORS[status]` legge il colore con la chiave contenuta nella variabile, e `??` interviene quando la chiave non c'è (il risultato è `undefined`). `buildChips` usa `map` per trasformare ogni attività nei dati del suo Chip; le parentesi tonde attorno a `{ ... }` servono perché la arrow function restituisca un oggetto. Nel componente basterà scrivere `<Chip label={chip.label} color={chip.color} />`.",
      },
      {
        type: "code",
        title: "Tre card in una griglia",
        description:
          "Completa `CourseGrid`, che mostra i corsi di una scuola in una griglia.\n- Un `Grid container` con `spacing={2}`.\n- Per ogni corso di `courses` (con `courses.map`), un `Grid` con `key={course.id}` e `size={{ xs: 12, md: 4 }}`.\n- Dentro ogni Grid una `Card` con `variant=\"outlined\"` che contiene un `CardContent` con il nome del corso (`course.name`) in una `Typography variant=\"h6\"`.",
        difficulty: "medio",
        mode: "static",
        starterCode: `import { Grid, Card, CardContent, Typography } from "@mui/material";

export default function CourseGrid({ courses }) {
  return (
    // Crea la griglia qui
    null
  );
}`,
        solution: `import { Grid, Card, CardContent, Typography } from "@mui/material";

export default function CourseGrid({ courses }) {
  return (
    <Grid container spacing={2}>
      {courses.map((course) => (
        <Grid key={course.id} size={{ xs: 12, md: 4 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">{course.name}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}`,
        validate: `const c = $codeNoComments;
if (!/<Grid[^>]*\\bcontainer\\b/.test(c)) return "Crea il contenitore della griglia con <Grid container ...>";
if (!/<Grid[^>]*\\bcontainer\\b[^>]*spacing=\\{\\s*2\\s*\\}|<Grid[^>]*spacing=\\{\\s*2\\s*\\}[^>]*\\bcontainer\\b/.test(c)) return "Aggiungi spacing={2} al Grid container";
const m = c.match(/courses\\.map\\(\\s*\\(?\\s*(\\w+)/);
if (!m) return "Genera un elemento per corso con courses.map((course) => ...)";
const v = m[1];
if (/<Grid[^>]*\\bitem\\b/.test(c) || /<Grid[^>]*\\bxs=\\{/.test(c)) return "Questa è la sintassi della vecchia Grid: usa <Grid size={{ xs: 12, md: 4 }}> senza item";
const items = c.match(/<Grid(?![^>]*\\bcontainer\\b)[^>]*>/g) || [];
const item = items.find((t) => /size=\\{\\{/.test(t));
if (!item) return "Dai a ogni Grid interno la prop size={{ xs: 12, md: 4 }}";
if (!/\\bxs\\s*:\\s*12\\b/.test(item) || !/\\bmd\\s*:\\s*4\\b/.test(item)) return "La size di ogni Grid interno deve essere { xs: 12, md: 4 }";
if (!new RegExp("key=\\\\{\\\\s*" + v + "\\\\.id\\\\s*\\\\}").test(item)) return "Aggiungi key={" + v + ".id} al Grid generato dal map";
if (!/<Card[^>]*variant=["']outlined["']/.test(c)) return "Usa una <Card variant=\\"outlined\\"> dentro ogni Grid";
if (!/<CardContent>/.test(c)) return "Metti il contenuto della card dentro <CardContent>";
if (!new RegExp("<Typography[^>]*variant=[\\"']h6[\\"'][^>]*>\\\\s*\\\\{\\\\s*" + v + "\\\\.name\\\\s*\\\\}").test(c)) return "Mostra il nome del corso in <Typography variant=\\"h6\\">{" + v + ".name}</Typography>";
return true;`,
        solutionExplanation:
          "Il `Grid container` organizza gli elementi in 12 colonne con 16px di spazio; ogni `Grid` generato da `map` occupa tutta la riga sul telefono (`xs: 12`) e un terzo da `md` in su (`md: 4`), quindi tre card per riga sugli schermi larghi. La `key` va sull'elemento più esterno restituito da `map`, cioè il Grid, non sulla Card.",
      },
      {
        type: "code",
        title: "Menu per ordinare i film",
        description:
          "Completa `SortMenu`, che permette di scegliere come ordinare un catalogo di film.\n- Crea lo stato `anchorEl` con `useState(null)` e calcola `const open = Boolean(anchorEl)`.\n- Il `Button` deve aprire il menu con `setAnchorEl(event.currentTarget)`.\n- Aggiungi un `Menu` con `anchorEl={anchorEl}`, `open={open}` e un `onClose` che rimette `anchorEl` a `null`.\n- Per ogni opzione di `SORT_OPTIONS` un `MenuItem` con `key`, `selected={option === sortBy}` e un `onClick` che chiama `setSortBy(option)` e chiude il menu.",
        difficulty: "difficile",
        mode: "static",
        starterCode: `import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

const SORT_OPTIONS = ["Titolo", "Anno", "Valutazione"];

export default function SortMenu() {
  const [sortBy, setSortBy] = useState("Titolo");
  // Stato del menu qui

  return (
    <>
      <Button>Ordina per: {sortBy}</Button>
      {/* Menu qui */}
    </>
  );
}`,
        solution: `import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

const SORT_OPTIONS = ["Titolo", "Anno", "Valutazione"];

export default function SortMenu() {
  const [sortBy, setSortBy] = useState("Titolo");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Button onClick={(event) => setAnchorEl(event.currentTarget)}>
        Ordina per: {sortBy}
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {SORT_OPTIONS.map((option) => (
          <MenuItem
            key={option}
            selected={option === sortBy}
            onClick={() => {
              setSortBy(option);
              handleClose();
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}`,
        validate: `const c = $codeNoComments;
if (!/const\\s*\\[\\s*anchorEl\\s*,\\s*setAnchorEl\\s*\\]\\s*=\\s*useState\\(\\s*null\\s*\\)/.test(c)) return "Crea lo stato del menu: const [anchorEl, setAnchorEl] = useState(null);";
if (!/const\\s+open\\s*=\\s*Boolean\\(\\s*anchorEl\\s*\\)/.test(c)) return "Calcola se il menu è aperto: const open = Boolean(anchorEl);";
if (!/setAnchorEl\\(\\s*\\w+\\.currentTarget\\s*\\)/.test(c)) return "Al click sul Button apri il menu con setAnchorEl(event.currentTarget)";
if (/setAnchorEl\\(\\s*\\w+\\.target\\s*\\)/.test(c)) return "Usa event.currentTarget invece di event.target";
if (!/<Button[^>]*onClick=/.test(c)) return "Aggiungi l'onClick al Button";
const menu = c.match(/<Menu\\b([^>]*)>/);
if (!menu) return "Aggiungi il componente <Menu>";
if (!/anchorEl=\\{\\s*anchorEl\\s*\\}/.test(menu[1])) return "Passa al Menu anchorEl={anchorEl}";
if (!/open=\\{\\s*open\\s*\\}/.test(menu[1])) return "Passa al Menu open={open}";
if (!/onClose=/.test(menu[1])) return "Aggiungi onClose al Menu";
if ((c.match(/setAnchorEl\\(\\s*null\\s*\\)/g) || []).length < 1) return "Per chiudere il menu rimetti lo stato a null: setAnchorEl(null)";
if (!/SORT_OPTIONS\\.map\\(/.test(c)) return "Genera le voci con SORT_OPTIONS.map((option) => ...)";
const item = c.match(/<MenuItem([\\s\\S]*?)<\\/MenuItem>/);
if (!item) return "Per ogni opzione crea un <MenuItem> che mostra il suo nome";
if (!/key=\\{/.test(item[1])) return "Aggiungi la key al MenuItem, es. key={option}";
if (!/selected=\\{\\s*(\\w+)\\s*===\\s*sortBy\\s*\\}|selected=\\{\\s*sortBy\\s*===\\s*\\w+\\s*\\}/.test(item[1])) return "Evidenzia la voce scelta con selected={option === sortBy}";
if (!/onClick=[\\s\\S]*setSortBy\\(/.test(item[1])) return "Nell'onClick del MenuItem chiama setSortBy(option)";
const onClick = item[1].slice(item[1].indexOf("onClick"));
if (!/setAnchorEl\\(\\s*null\\s*\\)|handleClose\\(|\\bclose\\w*\\(/i.test(onClick)) return "Dopo aver scelto un'opzione chiudi il menu (setAnchorEl(null))";
return true;`,
        solutionExplanation:
          "Un unico stato fa tutto: `anchorEl` è `null` quando il menu è chiuso e contiene il bottone quando è aperto, così `Boolean(anchorEl)` dice se mostrare il menu e `anchorEl` dice dove. `event.currentTarget` è sempre il bottone, anche se il click cade sul testo al suo interno. Scegliere una voce fa due cose: aggiorna `sortBy` (e quindi `selected` evidenzia la nuova voce) e chiude il menu.",
      },
    ],
  },

  theme: {
    sections: [
      {
        type: "text",
        content:
          "Finora hai personalizzato i componenti uno alla volta con `sx`. Funziona, ma in un'app vera lo stesso stile si ripete ovunque: tutti i bottoni senza maiuscole, tutti con gli angoli più arrotondati, lo stesso blu in cento punti. Il **tema** di MUI è il posto unico in cui decidere colori, caratteri, arrotondamenti e lo stile di default di ogni componente. Lo definisci una volta e tutta l'app lo usa: se cambi il colore primario nel tema, cambiano insieme bottoni, link, Chip e tutto ciò che usa `\"primary.main\"`.",
      },
      {
        type: "heading",
        content: "createTheme: definire il tema",
      },
      {
        type: "text",
        content:
          "`createTheme` riceve un oggetto con le tue scelte e restituisce un tema completo: tutto ciò che non specifichi prende il valore di default di MUI. Le sezioni principali sono `palette` (i colori), `typography` (i caratteri), `shape` (l'arrotondamento degli angoli) e `components` (lo stile dei singoli componenti, che vedremo tra poco). Il tema si scrive di solito in un file a parte, per esempio `theme.js`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "theme.js: palette, typography e shape",
        code: `import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2E7D32",        // il colore principale
      light: "#60AD5E",       // una versione più chiara (hover, sfondi)
      dark: "#005005",        // una versione più scura
      contrastText: "#ffffff" // il colore del testo sopra main
    },
    secondary: {
      main: "#F9A825",        // light e dark vengono calcolati da MUI
    },
    background: {
      default: "#F4F6F8",     // lo sfondo della pagina
      paper: "#ffffff",       // lo sfondo di Paper, Card, Menu...
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    fontSize: 14,                    // dimensione base in px
    h4: { fontWeight: 700 },         // personalizza una singola variante
    button: { textTransform: "none" } // niente MAIUSCOLE nei bottoni
  },
  shape: {
    borderRadius: 8, // default 4: è l'unità di borderRadius nella prop sx
  },
});

export default theme;`,
      },
      {
        type: "list",
        items: [
          "Ogni colore della palette ha quattro chiavi: `main`, `light`, `dark` e `contrastText`. Se dai solo `main`, MUI calcola le altre tre da solo.",
          "Oltre a `primary` e `secondary` esistono `error`, `warning`, `info` e `success`: sono i colori che hai usato con `color=\"success\"` su Chip e Button.",
          "`shape.borderRadius` cambia il significato di `borderRadius: 2` in `sx`: con 8, `borderRadius: 2` vale 16px.",
        ],
      },
      {
        type: "heading",
        content: "ThemeProvider e CssBaseline",
      },
      {
        type: "text",
        content:
          "Creare il tema non basta: bisogna darlo all'app. `ThemeProvider` funziona come il Provider di un Context (lo hai visto nel modulo React avanzato): avvolge l'app e rende il tema disponibile a tutti i componenti MUI al suo interno. Accanto si mette quasi sempre `CssBaseline`, un componente senza contenuto che applica una base di stili globali coerente con il tema: toglie il margine di default del `<body>`, imposta lo sfondo con `background.default` e il carattere della `typography`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Applicare il tema a tutta l'app",
        code: `import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Tutti i componenti qui dentro usano il tema */}
      <TaskBoard />
    </ThemeProvider>
  );
}`,
      },
      {
        type: "info",
        content:
          "Senza ThemeProvider i componenti MUI usano il tema di default (il blu `#1976d2` come primario). Nel modulo Next.js vedrai dove mettere ThemeProvider in un'app Next.js: va nel layout principale, così vale per tutte le pagine.",
      },
      {
        type: "heading",
        content: "Usare i colori del tema in sx",
      },
      {
        type: "text",
        content:
          "Hai già scritto `color: \"primary.main\"` o `bgcolor: \"background.paper\"` in `sx`: sono **percorsi** dentro `theme.palette`. Ora sai da dove vengono, e che seguono il tuo tema. Quando ti serve qualcosa di più di un colore pronto, una proprietà di `sx` può essere anche una **funzione** che riceve il tema e restituisce il valore: `bgcolor: (theme) => ...`. Dentro la funzione accedi a tutto: `theme.palette.primary.main`, `theme.shape.borderRadius`, `theme.spacing(2)` (che restituisce \"16px\").",
      },
      {
        type: "subheading",
        content: "alpha(): colori trasparenti dal tema",
      },
      {
        type: "text",
        content:
          "Per uno sfondo leggero che richiami il colore primario (righe evidenziate, intestazioni, hover) serve il colore con una certa trasparenza. Invece di scrivere a mano `rgba(46, 125, 50, 0.1)`, usa `alpha(colore, opacità)` di MUI: riceve un colore e un numero da 0 (trasparente) a 1 (pieno) e restituisce il colore trasparente. Combinato con la funzione `(theme) => ...`, lo sfondo segue il tema anche se un giorno cambi il primario.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Funzione del tema e alpha() in sx",
        code: `import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

<Box
  sx={{
    p: 2,
    borderLeft: 4,
    borderLeftColor: "primary.main", // percorso nella palette
    // Il primario al 8% di opacità: uno sfondo appena colorato
    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
    "&:hover": {
      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
    },
    borderRadius: (theme) => theme.shape.borderRadius + "px",
  }}
>
  <Typography color="primary">Attività in evidenza</Typography>
</Box>`,
      },
      {
        type: "heading",
        content: "components: lo stile di default dei componenti",
      },
      {
        type: "text",
        content:
          "La parte più potente del tema è `components`. Per ogni componente (con il nome preceduto da `Mui`: `MuiButton`, `MuiChip`, `MuiTextField`...) puoi definire:",
      },
      {
        type: "list",
        items: [
          "`defaultProps`: le props che il componente riceve se non le scrivi tu. Per esempio `disableRipple: true` toglie a tutti i bottoni l'effetto \"onda\" al click, e `size: \"small\"` li rende tutti piccoli. Se su un bottone scrivi `size=\"large\"`, vince la prop scritta.",
          "`styleOverrides`: gli stili CSS di una parte del componente. `root` è l'elemento esterno; molti componenti hanno anche altre parti (per Button `startIcon`, per Slider `thumb` e `track`...), con gli stessi nomi delle classi CSS `MuiSlider-thumb` che hai visto nei selettori di `sx`.",
          "`variants`: nuove varianti, che vedremo tra poco.",
        ],
      },
      {
        type: "code",
        language: "javascript",
        title: "defaultProps e styleOverrides per Button e Chip",
        code: `const theme = createTheme({
  palette: { primary: { main: "#2E7D32" } },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true, // nessun effetto onda al click
        size: "small",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { fontWeight: "bold" },
      },
    },
  },
});

// Ora in tutta l'app:
<Button variant="contained">Salva</Button>
// è già piccolo, senza maiuscole, arrotondato, in grassetto e senza ripple`,
      },
      {
        type: "subheading",
        content: "variants: varianti personalizzate",
      },
      {
        type: "text",
        content:
          "`variants` è un array di regole: ognuna ha `props` (quando si applica) e `style` (cosa applica). Se le props del componente corrispondono a quelle della regola, lo stile viene aggiunto. Puoi così modificare una combinazione esistente (es. solo i bottoni `variant: \"contained\"` con `color: \"primary\"`) oppure inventare una variante nuova, come `variant: \"toggle\"` per i bottoni di una barra di filtri.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Una variante esistente modificata e una nuova",
        code: `const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          // Solo i bottoni contained e primary
          props: { variant: "contained", color: "primary" },
          style: {
            boxShadow: "none",
            "&:hover": { boxShadow: "none" },
          },
        },
        {
          // Una variante tutta nuova
          props: { variant: "toggle" },
          style: {
            height: 30,
            minWidth: 90,
            fontWeight: "bold",
            border: "1px solid",
            borderColor: "#BDBDBD",
          },
        },
      ],
    },
  },
});

// Uso della nuova variante
<Button variant="toggle">Oggi</Button>
<Button variant="toggle">Settimana</Button>`,
      },
      {
        type: "info",
        content:
          "Le varianti nuove funzionano subito in JavaScript. Se il progetto usa TypeScript bisogna anche dichiararle (con la cosiddetta *module augmentation*, descritta nella documentazione di MUI), altrimenti `variant=\"toggle\"` viene segnalato come errore di tipo.",
      },
      {
        type: "subheading",
        content: "styleOverrides come funzione: theme e ownerState",
      },
      {
        type: "text",
        content:
          "Al posto di un oggetto, una parte di `styleOverrides` può essere una **funzione** che riceve `{ theme, ownerState }` e restituisce gli stili. `theme` è il tema stesso, utile per riusare i colori della palette. `ownerState` contiene le props e lo stato interno del componente che si sta disegnando: per esempio `ownerState.variant`, `ownerState.size`, oppure per Autocomplete `ownerState.focused` (il campo ha il focus) e `ownerState.value` (il valore scelto). Così uno stile può dipendere dallo stato del componente, in un unico punto per tutta l'app.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Stili che dipendono dal tema e dallo stato del componente",
        code: `import { createTheme, alpha } from "@mui/material/styles";

const theme = createTheme({
  palette: { primary: { main: "#2E7D32" } },
  components: {
    MuiChip: {
      styleOverrides: {
        // I Chip outlined hanno uno sfondo leggero del loro colore
        root: ({ theme, ownerState }) => ({
          fontWeight: "bold",
          ...(ownerState.variant === "outlined" &&
            ownerState.color !== "default" && {
              backgroundColor: alpha(theme.palette[ownerState.color].main, 0.08),
            }),
        }),
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        // Il campo di testo con lo sfondo di Paper e angoli più arrotondati
        inputRoot: ({ theme }) => ({
          borderRadius: 12,
          backgroundColor: theme.palette.background.paper,
        }),
        // Bordo colorato solo mentre il campo ha il focus
        root: ({ theme, ownerState }) => ({
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: ownerState.focused ? theme.palette.primary.main : undefined,
          },
        }),
      },
    },
  },
});`,
      },
      {
        type: "text",
        content:
          "Nota `theme.palette[ownerState.color]`: con le parentesi quadre leggi la chiave della palette che corrisponde al colore del Chip (\"success\", \"error\"...), proprio come leggevi `STATUS_COLORS[status]` nella lezione precedente. Lo spread condizionale `...(condizione && { ... })` è lo stesso che hai usato in `sx`.",
      },
      {
        type: "heading",
        content: "MuiCssBaseline: stili globali",
      },
      {
        type: "text",
        content:
          "Alcuni stili non riguardano un componente ma tutta la pagina: la barra di scorrimento, il colore del testo selezionato, i link. Si mettono in `components.MuiCssBaseline.styleOverrides`, che `CssBaseline` applica a tutto il documento. Anche qui puoi usare una funzione che riceve il tema (questa volta direttamente `theme`, senza graffe), così la scrollbar usa i colori della palette.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Una scrollbar sottile coerente con il tema",
        code: `import { createTheme, alpha } from "@mui/material/styles";

const theme = createTheme({
  palette: { primary: { main: "#2E7D32", light: "#60AD5E" } },
  components: {
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        "*::-webkit-scrollbar": { width: "6px", height: "6px" },
        "*::-webkit-scrollbar-track": { background: "transparent" },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: alpha(theme.palette.primary.light, 0.5),
          borderRadius: "999px",
        },
        "*::-webkit-scrollbar-thumb:hover": {
          backgroundColor: alpha(theme.palette.primary.main, 0.7),
        },
      }),
    },
  },
});`,
      },
      {
        type: "warning",
        content:
          "Gli stili di MuiCssBaseline funzionano solo se `<CssBaseline />` è dentro il ThemeProvider: è lui che li applica.",
      },
      {
        type: "heading",
        content: "Perché centralizzare gli stili nel tema",
      },
      {
        type: "list",
        items: [
          "**Coerenza**: ogni bottone, Chip o campo ha lo stesso aspetto senza doverlo ricordare ogni volta.",
          "**Meno codice ripetuto**: il componente contiene solo ciò che lo rende diverso dagli altri; `sx` resta corto e leggibile.",
          "**Modifiche in un punto solo**: cambiare il colore primario o l'arrotondamento è una riga nel tema, non una ricerca in cento file.",
          "**Stili legati al tema**: con `(theme) => ...` e `ownerState`, anche gli stili più complessi seguono la palette e lo stato del componente.",
        ],
      },
      {
        type: "text",
        content:
          "Una buona regola: se scrivi lo stesso `sx` su due o tre componenti dello stesso tipo, spostalo nel tema (`styleOverrides`, o una `variant` se vale solo per alcuni). Usa `sx` per ciò che è davvero specifico di quel punto della pagina, come margini e larghezze.",
      },
      {
        type: "tip",
        content:
          "Scrivi i colori in un solo posto, la palette del tema, e altrove riferisciti a loro (`\"primary.main\"`, `theme.palette.error.main`, `alpha(theme.palette.primary.main, 0.1)`) invece di copiare i codici esadecimali: il giorno in cui la grafica cambia, dovrai modificare una riga sola.",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "Dove nasce primary.main",
        description:
          "Con questo tema, di che colore è lo sfondo del Box?\n`const theme = createTheme({ palette: { primary: { main: \"#6A1B9A\" } } });\n\n<ThemeProvider theme={theme}>\n  <Box sx={{ bgcolor: \"primary.main\", p: 2 }} />\n</ThemeProvider>`",
        difficulty: "facile",
        options: [
          "Il blu di default di MUI, `#1976d2`",
          "`#6A1B9A`, il viola definito nel tema",
          "Trasparente: in sx i colori vanno scritti in esadecimale",
          "Nessuno: `\"primary.main\"` funziona solo sulla prop `color` dei Button",
        ],
        correct: 1,
        explanation:
          "`\"primary.main\"` è un percorso dentro `theme.palette`: il Box è dentro il ThemeProvider, quindi legge il tema personalizzato e usa `#6A1B9A`. Il blu `#1976d2` è il primario del tema di default, usato solo senza ThemeProvider. In `sx` i percorsi della palette funzionano su qualsiasi componente MUI, per qualsiasi proprietà di colore.",
      },
      {
        type: "multiple-choice",
        title: "defaultProps o prop scritta?",
        description:
          "Nel tema c'è `MuiButton: { defaultProps: { size: \"small\" } }`. Che dimensione hanno questi due bottoni?\n`<Button>Annulla</Button>\n<Button size=\"large\">Conferma</Button>`",
        difficulty: "medio",
        options: [
          "Entrambi small: il tema vince sempre",
          "Entrambi large: l'ultima prop scritta vale per tutti",
          "Annulla è small, Conferma è large",
          "Annulla è medium (il default di MUI), Conferma è large",
        ],
        correct: 2,
        explanation:
          "`defaultProps` fornisce il valore solo quando la prop non è scritta: Annulla riceve `size=\"small\"` dal tema. Su Conferma la prop `size=\"large\"` è scritta esplicitamente e ha la precedenza. Una prop scritta su un componente non influenza mai gli altri, e il default di MUI (medium) è sostituito dal tema.",
      },
      {
        type: "multiple-choice",
        title: "Uno sfondo trasparente dal tema",
        description:
          "Vuoi che lo sfondo di un'intestazione sia il colore primario del tema al 10% di opacità, e che segua il tema se il primario cambia. Quale `sx` è corretto?",
        difficulty: "medio",
        options: [
          '`sx={{ bgcolor: "rgba(46, 125, 50, 0.1)" }}`',
          '`sx={{ bgcolor: "primary.main", opacity: 0.1 }}`',
          '`sx={{ bgcolor: alpha("primary.main", 0.1) }}`',
          "`sx={{ bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1) }}`",
        ],
        correct: 3,
        explanation:
          "La funzione riceve il tema, ne legge il colore reale (`theme.palette.primary.main`) e `alpha` lo rende trasparente al 10%. Il valore `rgba` scritto a mano non segue il tema; `opacity: 0.1` rende trasparente l'intero elemento, testo compreso, non solo lo sfondo; `alpha` vuole un vero colore, non il percorso `\"primary.main\"` che solo `sx` sa interpretare.",
      },
      {
        type: "multiple-choice",
        title: "A cosa serve ownerState",
        description:
          "In `styleOverrides: { root: ({ theme, ownerState }) => ({ ... }) }`, che cosa contiene `ownerState`?",
        difficulty: "medio",
        options: [
          "Le props e lo stato interno del componente che si sta disegnando (es. `variant`, `size`, `focused`)",
          "Lo stato di Redux dell'applicazione",
          "Il valore di `useState` del componente padre",
          "Le proprietà CSS già applicate dal tema di default",
        ],
        correct: 0,
        explanation:
          "`ownerState` descrive il singolo componente che MUI sta disegnando: le sue props (`variant`, `color`, `size`...) e, per alcuni componenti, il loro stato interno (come `focused` per Autocomplete). Per questo permette stili diversi a seconda della variante o dello stato. Non ha accesso a Redux, né allo stato dei componenti padre, né agli stili CSS calcolati.",
      },
      {
        type: "code",
        title: "Il colore di uno stato dal tema",
        description:
          "Il tema è un normale oggetto JavaScript: qui ne usi una versione semplificata. Scrivi `getStatusColor(theme, status)` che restituisce il colore esadecimale da usare per lo stato di un ordine:\n- `\"Consegnato\"` → `theme.palette.success.main`\n- `\"In ritardo\"` → `theme.palette.error.main`\n- `\"In preparazione\"` → `theme.palette.warning.main`\n- qualsiasi altro stato → `theme.palette.grey[500]`\nUsa un oggetto mappa da stato a nome della palette (`\"success\"`, `\"error\"`, `\"warning\"`) e leggi la palette con le parentesi quadre. La funzione deve funzionare con qualsiasi tema con la stessa struttura.",
        difficulty: "medio",
        starterCode: `const theme = {
  palette: {
    success: { main: "#2E7D32" },
    error: { main: "#C62828" },
    warning: { main: "#EF6C00" },
    grey: { 500: "#9E9E9E" },
  },
};

function getStatusColor(theme, status) {
  // Scrivi qui la tua soluzione
}

console.log(getStatusColor(theme, "Consegnato"));
console.log(getStatusColor(theme, "Annullato"));`,
        solution: `const theme = {
  palette: {
    success: { main: "#2E7D32" },
    error: { main: "#C62828" },
    warning: { main: "#EF6C00" },
    grey: { 500: "#9E9E9E" },
  },
};

const STATUS_PALETTE = {
  "Consegnato": "success",
  "In ritardo": "error",
  "In preparazione": "warning",
};

function getStatusColor(theme, status) {
  const key = STATUS_PALETTE[status];
  if (!key) return theme.palette.grey[500];
  return theme.palette[key].main;
}

console.log(getStatusColor(theme, "Consegnato"));
console.log(getStatusColor(theme, "Annullato"));`,
        validate: `if (typeof getStatusColor !== "function") return "Definisci la funzione getStatusColor(theme, status)";
const other = {
  palette: {
    success: { main: "#00AA00" },
    error: { main: "#FF0000" },
    warning: { main: "#FFAA00" },
    grey: { 500: "#777777" },
  },
};
const cases = [
  ["Consegnato", "#00AA00"],
  ["In ritardo", "#FF0000"],
  ["In preparazione", "#FFAA00"],
  ["Annullato", "#777777"],
  [undefined, "#777777"],
];
for (const [status, expected] of cases) {
  const got = getStatusColor(other, status);
  if (got === undefined) return "getStatusColor(theme, " + $format(status) + ") restituisce undefined: ricordati il return (e il grigio per gli stati sconosciuti)";
  if (got !== expected) return "Con un tema diverso, getStatusColor(theme, " + $format(status) + ") dovrebbe restituire " + expected + " ma restituisce " + $format(got) + ". Leggi i colori dal parametro theme, non da valori scritti a mano";
}
if (getStatusColor(theme, "In ritardo") !== "#C62828") return "getStatusColor(theme, \\"In ritardo\\") dovrebbe restituire theme.palette.error.main";
return true;`,
        solutionExplanation:
          "La mappa `STATUS_PALETTE` traduce lo stato nel nome di un colore della palette, e `theme.palette[key].main` legge il colore con una chiave contenuta in una variabile. Se lo stato non è nella mappa, `key` è `undefined` e si restituisce il grigio. Poiché i colori vengono sempre letti dal parametro `theme`, la funzione segue qualsiasi tema: è lo stesso principio di `theme.palette[ownerState.color]` negli styleOverrides.",
      },
      {
        type: "code",
        title: "Unire un tema base con delle modifiche",
        description:
          "Molte app hanno un tema base e piccole varianti (per esempio per una sezione). Scrivi `mergeTheme(base, overrides)` che restituisce un **nuovo** oggetto tema:\n- `palette`: per ogni colore, unisci le chiavi di `base` e `overrides` (es. se `overrides` cambia solo `primary.main`, `primary.light` e `primary.dark` restano quelle della base). I colori presenti solo in uno dei due vanno mantenuti.\n- `shape`: unisci le chiavi con lo spread.\n- se `overrides` non ha `palette` o `shape`, restano quelli della base.\nNon modificare `base`.",
        difficulty: "difficile",
        starterCode: `const base = {
  palette: {
    primary: { main: "#1565C0", light: "#5E92F3", dark: "#003C8F" },
    secondary: { main: "#F9A825" },
  },
  shape: { borderRadius: 4 },
};

function mergeTheme(base, overrides) {
  // Scrivi qui la tua soluzione
}

const dark = mergeTheme(base, {
  palette: { primary: { main: "#0D47A1" }, background: { default: "#121212" } },
});
console.log(dark);`,
        solution: `const base = {
  palette: {
    primary: { main: "#1565C0", light: "#5E92F3", dark: "#003C8F" },
    secondary: { main: "#F9A825" },
  },
  shape: { borderRadius: 4 },
};

function mergeTheme(base, overrides) {
  const basePalette = base.palette ?? {};
  const overridePalette = overrides.palette ?? {};

  // Tutti i nomi di colore, della base e delle modifiche
  const colorNames = [
    ...Object.keys(basePalette),
    ...Object.keys(overridePalette),
  ];

  const palette = {};
  for (const name of colorNames) {
    palette[name] = { ...basePalette[name], ...overridePalette[name] };
  }

  return {
    ...base,
    ...overrides,
    palette,
    shape: { ...base.shape, ...overrides.shape },
  };
}

const dark = mergeTheme(base, {
  palette: { primary: { main: "#0D47A1" }, background: { default: "#121212" } },
});
console.log(dark);`,
        validate: `if (typeof mergeTheme !== "function") return "Definisci la funzione mergeTheme(base, overrides)";
const b = {
  palette: {
    primary: { main: "#111111", light: "#222222", dark: "#000000" },
    secondary: { main: "#333333" },
  },
  shape: { borderRadius: 4 },
};
const snapshot = JSON.stringify(b);
const r = mergeTheme(b, { palette: { primary: { main: "#999999" }, error: { main: "#FF0000" } }, shape: { borderRadius: 10 } });
if (!r || typeof r !== "object") return "mergeTheme deve restituire un oggetto";
if (JSON.stringify(b) !== snapshot) return "mergeTheme non deve modificare il tema base: crea nuovi oggetti con lo spread";
if (!r.palette || !r.palette.primary) return "Il risultato deve avere palette.primary";
if (r.palette.primary.main !== "#999999") return "palette.primary.main deve prendere il valore delle modifiche (#999999)";
if (r.palette.primary.light !== "#222222" || r.palette.primary.dark !== "#000000") return "palette.primary.light e dark devono restare quelli della base: unisci le chiavi di ogni colore con { ...base.palette.primary, ...overrides.palette.primary }";
if (!$equal(r.palette.secondary, { main: "#333333" })) return "I colori presenti solo nella base (secondary) devono restare nel risultato";
if (!$equal(r.palette.error, { main: "#FF0000" })) return "I colori presenti solo nelle modifiche (error) devono essere aggiunti al risultato";
if (!$equal(r.shape, { borderRadius: 10 })) return "shape.borderRadius deve prendere il valore delle modifiche (10)";
if (r.palette === b.palette || r.palette.primary === b.palette.primary) return "Crea nuovi oggetti per palette e per ogni colore, invece di riusare quelli della base";
const r2 = mergeTheme(b, {});
if (!r2 || !$equal(r2.palette, b.palette) || !$equal(r2.shape, b.shape)) return "Con overrides vuoto ({}), il risultato deve avere la stessa palette e la stessa shape della base";
const r3 = mergeTheme(b, { shape: { borderRadius: 0 } });
if (!$equal(r3.palette, b.palette) || r3.shape.borderRadius !== 0) return "Se overrides ha solo shape, la palette deve restare quella della base (e borderRadius: 0 va rispettato)";
return true;`,
        solutionExplanation:
          "Uno spread semplice `{ ...base, ...overrides }` non basta: sostituirebbe l'intero oggetto `palette` (e con lui `primary.light` e `primary.dark`). Per questo si scende di un livello: si raccolgono tutti i nomi di colore di entrambe le palette e, per ognuno, si uniscono le chiavi con `{ ...basePalette[name], ...overridePalette[name] }` (lo spread di `undefined` non aggiunge nulla). `?? {}` gestisce i casi in cui una palette manca. Ogni oggetto del risultato è nuovo, quindi la base resta intatta. `createTheme` di MUI fa un'unione profonda simile, a ogni livello.",
      },
      {
        type: "code",
        title: "Il tema dei bottoni",
        description:
          "Completa il tema in modo che tutti i bottoni dell'app abbiano lo stesso stile:\n- in `components.MuiButton.defaultProps` imposta `disableRipple: true`;\n- in `styleOverrides.root` imposta `textTransform: \"none\"` e `borderRadius: 8`;\n- in `variants` aggiungi una regola con `props: { variant: \"toggle\" }` e uno `style` con `fontWeight: \"bold\"`.",
        difficulty: "medio",
        mode: "static",
        starterCode: `import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#2E7D32" },
  },
  components: {
    // Personalizza MuiButton qui
  },
});

export default theme;`,
        solution: `import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#2E7D32" },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
      variants: [
        {
          props: { variant: "toggle" },
          style: {
            fontWeight: "bold",
          },
        },
      ],
    },
  },
});

export default theme;`,
        validate: `const c = $codeNoComments;
if (!/createTheme\\(/.test(c)) return "Il tema va creato con createTheme({ ... })";
if (!/MuiButton\\s*:\\s*\\{/.test(c)) return "Dentro components aggiungi la chiave MuiButton: { ... }";
if (!/defaultProps\\s*:\\s*\\{[^}]*disableRipple\\s*:\\s*true/.test(c)) return "In MuiButton aggiungi defaultProps: { disableRipple: true }";
const so = c.match(/styleOverrides\\s*:\\s*\\{\\s*root\\s*:\\s*\\{([^}]*)\\}/);
if (!so) return "In MuiButton aggiungi styleOverrides: { root: { ... } }";
if (!/textTransform\\s*:\\s*["']none["']/.test(so[1])) return "In styleOverrides.root imposta textTransform: \\"none\\"";
if (!/borderRadius\\s*:\\s*8\\b/.test(so[1])) return "In styleOverrides.root imposta borderRadius: 8";
if (!/variants\\s*:\\s*\\[/.test(c)) return "In MuiButton aggiungi l'array variants: [ ... ]";
if (!/props\\s*:\\s*\\{\\s*variant\\s*:\\s*["']toggle["']\\s*\\}/.test(c)) return "Nella regola di variants usa props: { variant: \\"toggle\\" }";
if (!/style\\s*:\\s*\\{[^}]*fontWeight\\s*:\\s*["']bold["']/.test(c)) return "Nella regola della variante toggle aggiungi style: { fontWeight: \\"bold\\" }";
return true;`,
        solutionExplanation:
          "`defaultProps` dà a ogni Button la prop `disableRipple` senza doverla scrivere, `styleOverrides.root` cambia lo stile dell'elemento esterno di tutti i bottoni, e la regola in `variants` si applica solo ai bottoni con `variant=\"toggle\"`. Da qui in poi `<Button variant=\"toggle\">Oggi</Button>` ha tutti e tre gli effetti, senza nessun `sx`.",
      },
    ],
  },
};
