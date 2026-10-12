export const lessons = {
  "selectors": {
    sections: [
      {
        type: "text",
        content:
          "CSS (Cascading Style Sheets) e il linguaggio che definisce l'aspetto visivo delle pagine web. Se l'HTML e lo scheletro della pagina, il CSS e la pelle, i vestiti e il trucco. Ogni regola CSS e composta da un selettore (che indica quali elementi modificare) e un blocco di dichiarazioni (che specifica come modificarli).",
      },
      {
        type: "code",
        language: "css",
        title: "Anatomia di una regola CSS",
        code: `/* selettore { proprieta: valore; } */
h1 {
  color: #1976d2;
  font-size: 2rem;
  font-weight: 700;
}`,
      },
      {
        type: "heading",
        content: "Selettori fondamentali",
      },
      {
        type: "text",
        content:
          "I selettori sono il meccanismo con cui CSS identifica gli elementi HTML da stilizzare. Esistono diversi tipi di selettori, ognuno con un livello di specificita diverso.",
      },
      {
        type: "subheading",
        content: "Selettore di elemento, classe e ID",
      },
      {
        type: "code",
        language: "css",
        title: "I tre selettori base",
        code: `/* Selettore di elemento: seleziona TUTTI i <p> */
p {
  line-height: 1.6;
}

/* Selettore di classe: seleziona elementi con class="card" */
.card {
  background: #ffffff;
  border-radius: 8px;
  padding: 16px;
}

/* Selettore di ID: seleziona l'elemento con id="header" */
#header {
  position: sticky;
  top: 0;
}`,
      },
      {
        type: "warning",
        content:
          "L'ID deve essere unico nella pagina. Nella pratica moderna si preferiscono le classi perche sono riutilizzabili. Nei progetti React con MUI, lo styling avviene quasi sempre tramite la prop sx o styled-components, ma capire i selettori CSS resta fondamentale.",
      },
      {
        type: "subheading",
        content: "Selettori combinatori",
      },
      {
        type: "text",
        content:
          "I combinatori permettono di selezionare elementi in base alla loro posizione nell'albero HTML. Sono molto utili per stilizzare componenti annidati senza aggiungere classi extra.",
      },
      {
        type: "code",
        language: "css",
        title: "Combinatori: discendente, figlio, fratello",
        code: `/* Discendente (spazio): qualsiasi <span> dentro .sidebar */
.sidebar span {
  font-size: 14px;
}

/* Figlio diretto (>): solo i <li> figli diretti di .menu */
.menu > li {
  padding: 8px 16px;
}

/* Fratello adiacente (+): il <p> subito dopo un <h2> */
h2 + p {
  margin-top: 0;
  color: #666;
}

/* Fratello generale (~): tutti i <p> dopo un <h2> */
h2 ~ p {
  line-height: 1.8;
}`,
      },
      {
        type: "tip",
        content:
          "Nelle applicazioni React reali, la sidebar usa spesso combinatori discendenti nella prop sx di MUI per stilizzare elementi interni: sx={{ '& .MuiListItemText-root': { fontSize: 14 } }}. Il simbolo '&' in sx rappresenta l'elemento corrente, come in SASS.",
      },
      {
        type: "heading",
        content: "Proprieta CSS essenziali",
      },
      {
        type: "text",
        content:
          "Le proprieta CSS piu utilizzate si dividono in categorie: testo, colori, spaziatura e bordi. Vediamole con esempi pratici.",
      },
      {
        type: "code",
        language: "css",
        title: "Proprieta di testo e colore",
        code: `/* Colori e testo */
.title {
  color: #1976d2;            /* colore del testo */
  background: #f5f5f5;       /* colore di sfondo */
  background-color: rgba(0, 0, 0, 0.05); /* con trasparenza */
  font-size: 1.5rem;         /* dimensione del testo */
  font-weight: 600;          /* grassetto (100-900) */
  font-family: 'Roboto', sans-serif;
  text-align: center;        /* allineamento */
  text-transform: uppercase; /* trasforma il testo */
}`,
      },
      {
        type: "code",
        language: "css",
        title: "Spaziatura e bordi",
        code: `/* Spaziatura */
.card {
  margin: 16px;              /* spazio ESTERNO */
  margin-top: 8px;           /* singolo lato */
  padding: 24px;             /* spazio INTERNO */
  padding: 8px 16px;         /* verticale orizzontale */
  padding: 8px 16px 12px 16px; /* top right bottom left */
}

/* Bordi */
.card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;        /* angoli arrotondati */
  border-bottom: 2px solid #1976d2;
}`,
      },
      {
        type: "heading",
        content: "Il Box Model",
      },
      {
        type: "text",
        content:
          "Ogni elemento HTML e una \"scatola\" (box) composta da 4 strati concentrici: content (il contenuto), padding (spazio interno), border (bordo) e margin (spazio esterno). Capire il box model e cruciale perche determina come vengono calcolate le dimensioni.",
      },
      {
        type: "code",
        language: "css",
        title: "Box model e box-sizing",
        code: `/* Senza box-sizing: width = content only */
.box-default {
  width: 200px;
  padding: 20px;
  border: 2px solid black;
  /* Larghezza totale = 200 + 20*2 + 2*2 = 244px! */
}

/* Con box-sizing: width = content + padding + border */
.box-border {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 2px solid black;
  /* Larghezza totale = 200px (il content si adatta) */
}

/* Pratica comune: applicare a TUTTI gli elementi */
*, *::before, *::after {
  box-sizing: border-box;
}`,
      },
      {
        type: "info",
        content:
          "La regola box-sizing: border-box e quasi sempre presente nei reset CSS moderni. Next.js la include di default nel suo CSS base, quindi in un progetto React/Next.js non serve aggiungerla manualmente.",
      },
      {
        type: "heading",
        content: "La proprieta display",
      },
      {
        type: "text",
        content:
          "La proprieta display controlla come un elemento si comporta nel flusso della pagina. Ogni elemento HTML ha un valore display di default.",
      },
      {
        type: "code",
        language: "css",
        title: "Valori di display",
        code: `/* block: occupa tutta la larghezza, va a capo */
/* Elementi block di default: div, p, h1-h6, section */
.full-width {
  display: block;
}

/* inline: occupa solo lo spazio del contenuto, NON va a capo */
/* Elementi inline di default: span, a, strong, em */
.inline-tag {
  display: inline;
  /* ATTENZIONE: width e height non funzionano su inline! */
}

/* inline-block: inline ma accetta width/height */
.badge {
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #e91e63;
}

/* none: nasconde l'elemento completamente */
.hidden {
  display: none; /* non occupa spazio */
}`,
      },
      {
        type: "heading",
        content: "Unita di misura",
      },
      {
        type: "text",
        content:
          "CSS offre diverse unita di misura. La scelta dell'unita giusta e importante per creare layout che funzionano su schermi di dimensioni diverse.",
      },
      {
        type: "code",
        language: "css",
        title: "Unita di misura a confronto",
        code: `/* px - pixel: valore fisso, preciso */
.icon {
  width: 24px;
  height: 24px;
}

/* rem - relativo al font-size del root (<html>) */
/* Se html { font-size: 16px }, allora 1rem = 16px */
.title {
  font-size: 2rem;     /* = 32px */
  margin-bottom: 1rem; /* = 16px */
}

/* em - relativo al font-size del GENITORE */
.card-text {
  font-size: 0.875em;  /* 87.5% del genitore */
}

/* % - relativo al genitore */
.container {
  width: 80%;          /* 80% del genitore */
  max-width: 1200px;   /* ma non piu di 1200px */
}

/* vh/vw - viewport height/width */
.hero {
  height: 100vh;       /* tutta l'altezza dello schermo */
  width: 100vw;        /* tutta la larghezza */
}`,
      },
      {
        type: "tip",
        content:
          "MUI usa un sistema di spaziatura basato su multipli di 8px. Nella prop sx, i valori numerici per margin e padding vengono moltiplicati per il tema (default 8px): sx={{ p: 2 }} equivale a padding: 16px, sx={{ m: 3 }} equivale a margin: 24px.",
      },
      {
        type: "list",
        items: [
          "Usa rem per font-size: si adatta se l'utente cambia la dimensione base del browser",
          "Usa px per bordi, ombre e dettagli piccoli che devono restare fissi",
          "Usa % o vw/vh per layout fluidi e responsivi",
          "Usa em quando vuoi che un valore scali con il font-size del genitore",
        ],
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "Il Box Model",
        description:
          "Un elemento ha width: 300px, padding: 20px e border: 5px solid black. Senza box-sizing: border-box, qual e la larghezza totale dell'elemento?",
        difficulty: "facile",
        options: ["300px", "340px", "350px", "390px"],
        correct: 2,
        explanation:
          "Senza border-box, la larghezza totale = width + padding sinistro + padding destro + border sinistro + border destro = 300 + 20 + 20 + 5 + 5 = 350px. Il margin non conta nella larghezza dell'elemento.",
      },
      {
        type: "multiple-choice",
        title: "Selettori CSS",
        description:
          "Quale selettore seleziona SOLO i tag <li> che sono figli diretti di un elemento con classe .nav?",
        difficulty: "facile",
        options: [
          "`.nav li`",
          "`.nav > li`",
          "`.nav + li`",
          "`.nav ~ li`",
        ],
        correct: 1,
        explanation:
          "Il combinatore > seleziona solo i figli diretti. '.nav li' (spazio) selezionerebbe tutti i <li> discendenti a qualsiasi profondita. '+' seleziona il fratello adiacente e '~' i fratelli generali.",
      },
      {
        type: "code",
        title: "Calcola le dimensioni del box model",
        description:
          "Completa la funzione calcolaLarghezza che, dati width, padding e border, restituisce la larghezza totale dell'elemento SENZA box-sizing: border-box.\nRicorda: padding e border si applicano su entrambi i lati (sinistro e destro).",
        difficulty: "medio",
        starterCode: `function calcolaLarghezza(width, padding, border) {
  // Calcola la larghezza totale dell'elemento
  // considerando padding e border su ENTRAMBI i lati

}

// Test
console.log(calcolaLarghezza(200, 20, 2));  // 244
console.log(calcolaLarghezza(300, 10, 1));  // 322
console.log(calcolaLarghezza(100, 0, 5));   // 110`,
        solution: `function calcolaLarghezza(width, padding, border) {
  return width + (padding * 2) + (border * 2);
}

// Test
console.log(calcolaLarghezza(200, 20, 2));  // 244
console.log(calcolaLarghezza(300, 10, 1));  // 322
console.log(calcolaLarghezza(100, 0, 5));   // 110`,
        validate: `
const fn = new Function("width", "padding", "border", userCode.match(/\\{([\\s\\S]*?)\\}/)?.[1] || "");
try {
  const t1 = calcolaLarghezza(200, 20, 2) === 244;
  const t2 = calcolaLarghezza(300, 10, 1) === 322;
  const t3 = calcolaLarghezza(100, 0, 5) === 110;
  return t1 && t2 && t3;
} catch(e) { return false; }`,
        testCode: "",
      },
    ],
  },

  "flexbox": {
    sections: [
      {
        type: "text",
        content:
          "Flexbox (Flexible Box Layout) e un sistema di layout CSS progettato per distribuire spazio e allineare elementi in modo efficiente all'interno di un contenitore. Prima di Flexbox, centrare un elemento verticalmente era un incubo; ora basta una riga di codice.",
      },
      {
        type: "info",
        content:
          "Flexbox lavora su un asse principale (main axis) e un asse trasversale (cross axis). Per default l'asse principale è orizzontale (da sinistra a destra) e quello trasversale è verticale (dall'alto in basso).",
      },
      {
        type: "heading",
        content: "Attivare Flexbox",
      },
      {
        type: "text",
        content:
          "Per usare Flexbox, basta impostare display: flex sul contenitore genitore. Tutti i figli diretti diventano automaticamente \"flex items\" e si dispongono in riga.",
      },
      {
        type: "code",
        language: "css",
        title: "display: flex e flex-direction",
        code: `/* Il contenitore diventa un flex container */
.container {
  display: flex;
  /* I figli si dispongono in riga (default) */
}

/* flex-direction: cambia l'asse principale */
.column-layout {
  display: flex;
  flex-direction: column; /* dall'alto in basso */
}

.row-layout {
  display: flex;
  flex-direction: row;    /* da sinistra a destra (default) */
}

.reverse-layout {
  display: flex;
  flex-direction: row-reverse; /* da destra a sinistra */
}`,
      },
      {
        type: "tip",
        content:
          "In un progetto React/MUI, il layout principale usa spesso Flexbox tramite la prop sx: sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}. Quasi ogni componente MUI come Box e Stack usa Flexbox sotto il cofano.",
      },
      {
        type: "heading",
        content: "Allineamento: justify-content e align-items",
      },
      {
        type: "text",
        content:
          "justify-content allinea gli elementi lungo l'asse principale (orizzontale per row, verticale per column). align-items li allinea lungo l'asse trasversale. Sono le due proprieta Flexbox che userai di più.",
      },
      {
        type: "code",
        language: "css",
        title: "justify-content: distribuzione sull'asse principale",
        code: `/* Distribuisci gli elementi orizzontalmente */
.toolbar {
  display: flex;
  justify-content: flex-start;    /* all'inizio (default) */
  justify-content: flex-end;      /* alla fine */
  justify-content: center;        /* al centro */
  justify-content: space-between; /* spazio tra gli elementi */
  justify-content: space-around;  /* spazio intorno */
  justify-content: space-evenly;  /* spazio uguale ovunque */
}`,
      },
      {
        type: "code",
        language: "css",
        title: "align-items: allineamento sull'asse trasversale",
        code: `/* Allinea gli elementi verticalmente */
.navbar {
  display: flex;
  height: 64px;
  align-items: stretch;     /* allungati (default) */
  align-items: flex-start;  /* in alto */
  align-items: flex-end;    /* in basso */
  align-items: center;      /* al centro verticale */
  align-items: baseline;    /* allinea il testo */
}

/* Centrare perfettamente un elemento */
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}`,
      },
      {
        type: "code",
        language: "css",
        title: "align-self: allineamento individuale",
        code: `/* align-self sovrascrive align-items per un singolo elemento */
.container {
  display: flex;
  align-items: center;
}

.special-item {
  align-self: flex-end; /* solo questo va in basso */
}`,
      },
      {
        type: "heading",
        content: "La proprieta gap",
      },
      {
        type: "text",
        content:
          "La proprieta gap definisce lo spazio tra gli elementi flex. Prima di gap si usava margin sugli elementi figli, ma gap e molto piu pulito perche non aggiunge spazio extra prima del primo o dopo l'ultimo elemento.",
      },
      {
        type: "code",
        language: "css",
        title: "gap: spazio tra gli elementi",
        code: `/* gap: spazio uniforme tra tutti gli elementi */
.button-group {
  display: flex;
  gap: 8px;
}

/* gap differente per riga e colonna */
.grid-like {
  display: flex;
  flex-wrap: wrap;
  row-gap: 16px;
  column-gap: 8px;
  /* oppure shorthand: gap: 16px 8px; */
}`,
      },
      {
        type: "tip",
        content:
          "In MUI con la prop sx, gap accetta valori numerici che vengono moltiplicati per 8px (il tema di default): sx={{ display: 'flex', gap: 2 }} produce uno spazio di 16px tra gli elementi. Il componente Stack di MUI è fondamentalmente un Flexbox con gap integrato.",
      },
      {
        type: "heading",
        content: "flex-grow, flex-shrink e flex-basis",
      },
      {
        type: "text",
        content:
          "Queste tre proprieta controllano come i flex items crescono, si restringono e definiscono la loro dimensione iniziale. Insieme determinano il comportamento flessibile degli elementi.",
      },
      {
        type: "code",
        language: "css",
        title: "Proprieta dei flex items",
        code: `/* flex-grow: quanto l'elemento cresce rispetto agli altri */
.sidebar {
  flex-grow: 0;    /* non cresce, mantiene la sua dimensione */
  width: 250px;
}
.main-content {
  flex-grow: 1;    /* prende tutto lo spazio rimanente */
}

/* flex-shrink: quanto l'elemento si restringe */
.logo {
  flex-shrink: 0;  /* non si restringe mai */
  width: 120px;
}

/* flex-basis: dimensione iniziale prima di crescere/restringersi */
.column {
  flex-basis: 33.33%; /* parte da 1/3 della larghezza */
}

/* Shorthand: flex: grow shrink basis */
.item {
  flex: 1 0 auto;     /* cresce, non si restringe, dimensione automatica */
}
.equal-columns {
  flex: 1;             /* equivale a flex: 1 1 0% */
}`,
      },
      {
        type: "heading",
        content: "flex-wrap",
      },
      {
        type: "text",
        content:
          "Di default, i flex items cercano di stare tutti su una riga, anche se non c'e abbastanza spazio (si comprimono). Con flex-wrap: wrap gli elementi vanno a capo quando necessario, creando un comportamento simile a una griglia.",
      },
      {
        type: "code",
        language: "css",
        title: "flex-wrap: gestire il ritorno a capo",
        code: `/* Senza wrap: tutti su una riga (si comprimono) */
.no-wrap {
  display: flex;
  flex-wrap: nowrap; /* default */
}

/* Con wrap: vanno a capo quando non c'e spazio */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.card-grid > .card {
  flex: 0 1 300px; /* non cresce, si restringe, parte da 300px */
  /* Le card vanno a capo quando non entrano */
}

/* Esempio pratico: griglia di tag/chip */
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.tag {
  padding: 4px 12px;
  background: #e3f2fd;
  border-radius: 16px;
}`,
      },
      {
        type: "tip",
        content:
          "Nelle applicazioni React reali, una sezione filtri usa spesso flex-wrap per disporre i chip dei filtri attivi: quando sono troppi per una riga, vanno automaticamente a capo mantenendo uno spazio uniforme con gap.",
      },
      {
        type: "info",
        content:
          "Un pattern molto comune e il layout \"sidebar + contenuto\": la sidebar ha una larghezza fissa (flex-shrink: 0) e il contenuto principale ha flex-grow: 1 per occupare tutto lo spazio rimanente.",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "Centrare con Flexbox",
        description:
          "Quali due proprieta servono per centrare perfettamente un elemento sia orizzontalmente che verticalmente in un contenitore flex?",
        difficulty: "facile",
        options: [
          "`justify-content: center` e `align-items: center`",
          "`text-align: center` e `vertical-align: middle`",
          "`margin: auto` e `align-items: center`",
          "`justify-content: space-between` e `align-items: center`",
        ],
        correct: 0,
        explanation:
          "justify-content: center centra sull'asse principale e align-items: center centra sull'asse trasversale. Insieme, centrano l'elemento perfettamente in entrambe le direzioni.",
      },
      {
        type: "multiple-choice",
        title: "flex-direction e assi",
        description:
          "Se imposti flex-direction: column su un contenitore flex, cosa fa justify-content: center?",
        difficulty: "medio",
        options: [
          "Centra gli elementi orizzontalmente",
          "Centra gli elementi verticalmente",
          "Centra gli elementi in entrambe le direzioni",
          "Non ha alcun effetto con flex-direction: column",
        ],
        correct: 1,
        explanation:
          "Con flex-direction: column, l'asse principale diventa verticale. Siccome justify-content agisce sull'asse principale, centra gli elementi verticalmente. Per centrare orizzontalmente in questo caso, servirebbe align-items: center.",
      },
      {
        type: "code",
        title: "Simula un layout Flexbox",
        description:
          "Completa la funzione distribuisciSpazio che simula il comportamento di flex-grow.\nRiceve lo spazio totale disponibile, un array di dimensioni base degli elementi e un array di valori flex-grow.\nDeve restituire un array con le dimensioni finali di ogni elemento.\n\nLogica: lo spazio extra (totale - somma delle basi) viene distribuito proporzionalmente ai valori flex-grow.",
        difficulty: "difficile",
        starterCode: `function distribuisciSpazio(spazioTotale, basi, grows) {
  // 1. Calcola lo spazio rimanente (totale - somma basi)
  // 2. Calcola la somma dei flex-grow
  // 3. Distribuisci lo spazio extra proporzionalmente

}

// Test: 3 elementi in 600px
// Basi: [100, 100, 100] = 300px usati, 300px rimasti
// Grows: [1, 2, 0]
// Elemento 0: 100 + (300 * 1/3) = 200
// Elemento 1: 100 + (300 * 2/3) = 300
// Elemento 2: 100 + 0 = 100
console.log(distribuisciSpazio(600, [100, 100, 100], [1, 2, 0]));`,
        solution: `function distribuisciSpazio(spazioTotale, basi, grows) {
  const sommaBase = basi.reduce((sum, b) => sum + b, 0);
  const spazioExtra = spazioTotale - sommaBase;
  const sommaGrow = grows.reduce((sum, g) => sum + g, 0);

  return basi.map((base, i) => {
    if (sommaGrow === 0) return base;
    return base + (spazioExtra * grows[i]) / sommaGrow;
  });
}

console.log(distribuisciSpazio(600, [100, 100, 100], [1, 2, 0]));`,
        validate: `
try {
  const r1 = distribuisciSpazio(600, [100, 100, 100], [1, 2, 0]);
  const ok1 = Math.abs(r1[0] - 200) < 0.01 && Math.abs(r1[1] - 300) < 0.01 && Math.abs(r1[2] - 100) < 0.01;
  const r2 = distribuisciSpazio(400, [50, 50], [1, 1]);
  const ok2 = Math.abs(r2[0] - 200) < 0.01 && Math.abs(r2[1] - 200) < 0.01;
  return ok1 && ok2;
} catch(e) { return false; }`,
        testCode: "",
      },
    ],
  },

  "variables": {
    sections: [
      {
        type: "text",
        content:
          "Le variabili CSS (ufficialmente \"custom properties\") permettono di definire valori riutilizzabili nel foglio di stile. Funzionano come le variabili in un linguaggio di programmazione: definisci un valore una volta e lo riutilizzi ovunque. Se devi cambiarlo, lo modifichi in un solo punto.",
      },
      {
        type: "heading",
        content: "Definire e usare variabili CSS",
      },
      {
        type: "text",
        content:
          "Le variabili CSS si definiscono con il prefisso -- e si usano con la funzione var(). Sono case-sensitive e seguono le regole di ereditarieta del CSS: un figlio eredita le variabili del genitore.",
      },
      {
        type: "code",
        language: "css",
        title: "Sintassi delle variabili CSS",
        code: `:root {
  /* :root si applica a tutto il documento */
  --primary-color: #1976d2;
  --secondary-color: #e91e63;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --border-radius: 8px;
  --font-main: 'Roboto', sans-serif;
}

/* Usa le variabili con var() */
.button {
  background-color: var(--primary-color);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--border-radius);
  font-family: var(--font-main);
}

/* var() accetta un valore di fallback */
.card {
  color: var(--text-color, #333);
  /* Se --text-color non e definita, usa #333 */
}`,
      },
      {
        type: "tip",
        content:
          "In un tipico globals.css di un progetto Next.js, si definiscono variabili CSS per il tema chiaro e scuro: :root { --background: #ffffff; --foreground: #171717; }. Nel tema scuro con @media (prefers-color-scheme: dark), queste diventano --background: #0a0a0a e --foreground: #ededed.",
      },
      {
        type: "subheading",
        content: "Variabili con scope locale",
      },
      {
        type: "text",
        content:
          "Le variabili non devono per forza essere in :root. Puoi definirle su qualsiasi selettore e saranno accessibili solo a quell'elemento e ai suoi figli. Questo e utile per creare componenti con varianti.",
      },
      {
        type: "code",
        language: "css",
        title: "Variabili con scope e sovrascrizioni",
        code: `:root {
  --btn-bg: #1976d2;
  --btn-color: white;
  --btn-padding: 8px 16px;
}

.btn {
  background: var(--btn-bg);
  color: var(--btn-color);
  padding: var(--btn-padding);
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* Variante: sovrascriviamo solo la variabile */
.btn-danger {
  --btn-bg: #d32f2f;
}

.btn-success {
  --btn-bg: #2e7d32;
}

/* Componente con variabili locali */
.card {
  --card-padding: 16px;
  --card-radius: 8px;
  padding: var(--card-padding);
  border-radius: var(--card-radius);
}

.card.compact {
  --card-padding: 8px;
  --card-radius: 4px;
}`,
      },
      {
        type: "info",
        content:
          "Le variabili CSS sono reattive: se modifichi il valore di una variabile (ad esempio tramite JavaScript o una media query), tutti gli elementi che la usano si aggiornano automaticamente. Questo le rende perfette per implementare temi chiaro/scuro.",
      },
      {
        type: "heading",
        content: "Media queries e responsive design",
      },
      {
        type: "text",
        content:
          "Le media queries permettono di applicare stili diversi in base alle caratteristiche del dispositivo, principalmente la larghezza dello schermo. Sono il fondamento del responsive design: un sito che si adatta automaticamente a smartphone, tablet e desktop.",
      },
      {
        type: "code",
        language: "css",
        title: "Sintassi delle media queries",
        code: `/* Stili base (mobile first) */
.container {
  padding: 16px;
  font-size: 14px;
}

/* Tablet: da 768px in su */
@media (min-width: 768px) {
  .container {
    padding: 24px;
    font-size: 16px;
  }
}

/* Desktop: da 1024px in su */
@media (min-width: 1024px) {
  .container {
    padding: 32px;
    max-width: 1200px;
    margin: 0 auto; /* centra il contenitore */
  }
}

/* Si puo anche usare max-width */
@media (max-width: 600px) {
  .sidebar {
    display: none; /* nasconde la sidebar su mobile */
  }
}`,
      },
      {
        type: "subheading",
        content: "Breakpoint comuni",
      },
      {
        type: "list",
        items: [
          "320px - Smartphone piccoli",
          "480px - Smartphone grandi",
          "768px - Tablet",
          "1024px - Laptop / tablet orizzontale",
          "1200px - Desktop",
          "1536px - Desktop grandi",
        ],
      },
      {
        type: "tip",
        content:
          "MUI ha i suoi breakpoint integrati: xs (0px), sm (600px), md (900px), lg (1200px), xl (1536px). Nella prop sx puoi scrivere sx={{ p: { xs: 1, md: 3 } }} per avere padding diversi su mobile e desktop senza scrivere media queries manuali.",
      },
      {
        type: "heading",
        content: "Pattern responsive comuni",
      },
      {
        type: "text",
        content:
          "Vediamo alcuni pattern che si usano spesso per creare layout responsivi. L'approccio \"mobile first\" e considerato la best practice: si parte dagli stili per mobile e si aggiungono modifiche per schermi piu grandi.",
      },
      {
        type: "code",
        language: "css",
        title: "Combinare variabili CSS e media queries",
        code: `:root {
  --sidebar-width: 0px;
  --content-padding: 16px;
  --columns: 1;
}

@media (min-width: 768px) {
  :root {
    --sidebar-width: 250px;
    --content-padding: 24px;
    --columns: 2;
  }
}

@media (min-width: 1200px) {
  :root {
    --content-padding: 32px;
    --columns: 3;
  }
}

/* Gli stili usano le variabili: si adattano automaticamente */
.layout {
  display: flex;
}

.sidebar {
  width: var(--sidebar-width);
}

.main {
  flex: 1;
  padding: var(--content-padding);
}`,
      },
      {
        type: "code",
        language: "css",
        title: "Layout responsive con Flexbox",
        code: `/* Card che passano da colonna (mobile) a riga (desktop) */
.card-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media (min-width: 768px) {
  .card-container {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .card {
    flex: 0 1 calc(50% - 8px); /* 2 colonne */
  }
}

@media (min-width: 1200px) {
  .card {
    flex: 0 1 calc(33.33% - 11px); /* 3 colonne */
  }
}`,
      },
      {
        type: "subheading",
        content: "Media query per il tema scuro",
      },
      {
        type: "code",
        language: "css",
        title: "prefers-color-scheme: tema chiaro e scuro",
        code: `/* Come in un globals.css tipico */
:root {
  --background: #ffffff;
  --foreground: #171717;
  --card-bg: #f5f5f5;
  --border-color: #e0e0e0;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0a0a0a;
    --foreground: #ededed;
    --card-bg: #1a1a1a;
    --border-color: #333;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
}

.card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
}`,
      },
      {
        type: "warning",
        content:
          "prefers-color-scheme rileva la preferenza del sistema operativo dell'utente. Non permette all'utente di scegliere il tema nel sito. Per un toggle manuale, serve JavaScript per aggiungere/rimuovere una classe (ad esempio .dark) sul body.",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "Variabili CSS e fallback",
        description:
          "Dato questo CSS:\n:root { --main-color: blue; }\n.box { color: var(--accent-color, red); }\n\nDi che colore sara il testo di .box?",
        difficulty: "facile",
        options: [
          "Blu (blue)",
          "Rosso (red)",
          "Nero (il colore di default)",
          "Errore: la variabile non esiste",
        ],
        correct: 1,
        explanation:
          "La variabile --accent-color non e definita, quindi var() usa il valore di fallback specificato come secondo argomento: red. Se non ci fosse il fallback, il browser ignorerebbe la dichiarazione e userebbe il valore ereditato.",
      },
      {
        type: "multiple-choice",
        title: "Media queries e mobile first",
        description:
          "In un approccio \"mobile first\", quale media query e corretta per applicare stili a partire dalla larghezza tablet (768px)?",
        difficulty: "facile",
        options: [
          "`@media (max-width: 768px) { ... }`",
          "`@media (min-width: 768px) { ... }`",
          "`@media (width: 768px) { ... }`",
          "`@media screen and (device-width: 768px) { ... }`",
        ],
        correct: 1,
        explanation:
          "Mobile first significa partire dagli stili per schermi piccoli e poi sovrascriverli per schermi piu grandi con min-width. max-width farebbe il contrario (desktop first). min-width: 768px significa 'a partire da 768px di larghezza in su'.",
      },
      {
        type: "code",
        title: "Simula la risoluzione di variabili CSS",
        description:
          "Completa la funzione risolviVariabile che simula il comportamento di var() in CSS.\nRiceve un nome di variabile e un oggetto che mappa nomi di variabili ai loro valori.\nSe la variabile esiste, restituisce il suo valore.\nSe non esiste e c'e un fallback (terzo parametro), restituisce il fallback.\nSe non esiste e non c'e fallback, restituisce null.",
        difficulty: "medio",
        starterCode: `function risolviVariabile(nome, variabili, fallback) {
  // Simula il comportamento di CSS var()
  // 1. Cerca la variabile nell'oggetto variabili
  // 2. Se trovata, restituisci il suo valore
  // 3. Se non trovata e c'e un fallback, restituisci il fallback
  // 4. Altrimenti restituisci null

}

// Test
const tema = {
  "--primary": "#1976d2",
  "--background": "#ffffff",
  "--font-size": "16px"
};

console.log(risolviVariabile("--primary", tema));           // "#1976d2"
console.log(risolviVariabile("--accent", tema, "red"));     // "red"
console.log(risolviVariabile("--accent", tema));            // null
console.log(risolviVariabile("--background", tema, "pink"));// "#ffffff"`,
        solution: `function risolviVariabile(nome, variabili, fallback) {
  if (nome in variabili) {
    return variabili[nome];
  }
  if (fallback !== undefined) {
    return fallback;
  }
  return null;
}

const tema = {
  "--primary": "#1976d2",
  "--background": "#ffffff",
  "--font-size": "16px"
};

console.log(risolviVariabile("--primary", tema));
console.log(risolviVariabile("--accent", tema, "red"));
console.log(risolviVariabile("--accent", tema));
console.log(risolviVariabile("--background", tema, "pink"));`,
        validate: `
try {
  const t = { "--primary": "#1976d2", "--background": "#ffffff" };
  const t1 = risolviVariabile("--primary", t) === "#1976d2";
  const t2 = risolviVariabile("--accent", t, "red") === "red";
  const t3 = risolviVariabile("--accent", t) === null;
  const t4 = risolviVariabile("--background", t, "pink") === "#ffffff";
  return t1 && t2 && t3 && t4;
} catch(e) { return false; }`,
        testCode: "",
      },
    ],
  },
};
