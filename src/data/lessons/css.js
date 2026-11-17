export const lessons = {
  "selectors": {
    sections: [
      {
        type: "text",
        content:
          "Una pagina web nasce da due linguaggi che lavorano insieme: l'**HTML**, che descrive il *contenuto* e la sua struttura (titoli, paragrafi, immagini, link...), e il **CSS** (Cascading Style Sheets), che ne definisce l'*aspetto* (colori, dimensioni, spaziature, disposizione). Se l'HTML è lo scheletro della pagina, il CSS è la pelle e i vestiti.",
      },
      {
        type: "heading",
        content: "Come HTML e CSS si collegano",
      },
      {
        type: "text",
        content:
          "L'HTML è fatto di **tag**: parole racchiuse tra parentesi angolari, come `<h1>` (titolo), `<p>` (paragrafo), `<a>` (link), `<img>` (immagine), `<ul>`/`<li>` (elenco e suoi elementi), `<div>` (contenitore generico) e `<span>` (porzione di testo). Quasi tutti i tag hanno un'apertura e una chiusura (`<p>...</p>`): l'insieme di tag e contenuto si chiama **elemento**. Gli elementi possono stare uno dentro l'altro (annidati), formando un albero: un elemento che ne contiene un altro è il suo *genitore*, quello contenuto è il *figlio*.",
      },
      {
        type: "text",
        content:
          "Dentro il tag di apertura si possono aggiungere degli **attributi**. Per il CSS i due più importanti sono `class` (un nome che si può dare a più elementi, anche più nomi separati da spazio) e `id` (un nome unico nella pagina). Servono a dire al CSS *quali* elementi stilizzare.",
      },
      {
        type: "code",
        language: "html",
        title: "Una piccola pagina HTML",
        code: `<!DOCTYPE html>
<html>
  <head>
    <title>Il mio negozio</title>
    <!-- Modo 1 (il più usato): collegare un file CSS esterno -->
    <link rel="stylesheet" href="style.css">

    <!-- Modo 2: scrivere il CSS direttamente nella pagina -->
    <style>
      h1 { color: #1976d2; }
    </style>
  </head>
  <body>
    <h1 id="titolo">Prodotti in offerta</h1>

    <div class="card">
      <h2>Cuffie wireless</h2>
      <p class="price">49,90 €</p>
      <a href="/carrello">Aggiungi al carrello</a>
    </div>

    <!-- Modo 3: attributo style sul singolo elemento (da evitare) -->
    <p style="color: gray;">Spedizione gratuita sopra i 30 €</p>
  </body>
</html>`,
      },
      {
        type: "list",
        items: [
          "`<link rel=\"stylesheet\" href=\"style.css\">` nel `<head>` collega un file CSS esterno: è il modo consigliato, perché lo stesso file può servire tutte le pagine del sito",
          "`<style>...</style>` contiene CSS valido solo per quella pagina",
          "L'attributo `style=\"...\"` applica stili a un solo elemento: comodo per una prova veloce, ma difficile da mantenere",
        ],
      },
      {
        type: "heading",
        content: "Anatomia di una regola CSS",
      },
      {
        type: "text",
        content:
          "Ogni regola CSS è composta da un **selettore** (che indica quali elementi modificare) e da un blocco di **dichiarazioni** tra parentesi graffe. Ogni dichiarazione è una coppia `proprietà: valore;` terminata dal punto e virgola. I commenti si scrivono tra `/*` e `*/`.",
      },
      {
        type: "code",
        language: "css",
        title: "Anatomia di una regola CSS",
        code: `/* selettore { proprietà: valore; } */
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
          "I selettori sono il meccanismo con cui il CSS identifica gli elementi HTML da stilizzare. Esistono diversi tipi di selettori, ognuno con un livello di *specificità* (priorità) diverso.",
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

/* Selettore di classe (punto): seleziona gli elementi con class="card" */
.card {
  background: #ffffff;
  border-radius: 8px;
  padding: 16px;
}

/* Selettore di ID (cancelletto): seleziona l'elemento con id="titolo" */
#titolo {
  text-align: center;
}

/* Più selettori separati da virgola condividono le stesse dichiarazioni */
h1, h2, h3 {
  font-family: Georgia, serif;
}

/* Pseudo-classe :hover: si applica quando il mouse è sopra l'elemento */
a:hover {
  text-decoration: underline;
}`,
      },
      {
        type: "warning",
        content:
          "L'ID deve essere unico nella pagina. Nella pratica moderna si preferiscono le classi perché sono riutilizzabili: la stessa classe `.card` può essere usata da tutte le schede di prodotto.",
      },
      {
        type: "subheading",
        content: "Selettori combinatori",
      },
      {
        type: "text",
        content:
          "I combinatori permettono di selezionare elementi in base alla loro posizione nell'albero HTML. Sono molto utili per stilizzare elementi annidati senza aggiungere classi extra.",
      },
      {
        type: "code",
        language: "css",
        title: "Combinatori: discendente, figlio, fratello",
        code: `/* Discendente (spazio): qualsiasi <span> dentro .sidebar, a qualsiasi profondità */
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

/* Fratello generale (~): tutti i <p> che seguono un <h2> */
h2 ~ p {
  line-height: 1.8;
}`,
      },
      {
        type: "tip",
        content:
          "Non annidare troppo i selettori (es. `.page .main .list .item span`): diventano fragili, perché basta cambiare la struttura dell'HTML per romperli. Spesso è meglio dare una classe all'elemento da stilizzare.",
      },
      {
        type: "subheading",
        content: "Cascata, specificità ed ereditarietà",
      },
      {
        type: "text",
        content:
          "Cosa succede se due regole impostano la stessa proprietà sullo stesso elemento? Vince quella con **specificità** più alta: un ID batte una classe, che a sua volta batte un selettore di elemento. A parità di specificità vince la regola scritta **per ultima** (è la \"cascata\" che dà il nome al CSS). Inoltre alcune proprietà, come `color` e `font-family`, vengono **ereditate**: se le imposti su un genitore, valgono anche per i suoi figli.",
      },
      {
        type: "code",
        language: "css",
        title: "Chi vince?",
        code: `p { color: black; }        /* specificità bassa (elemento) */
.price { color: green; }   /* vince sul selettore p (classe) */
#offerta { color: red; }   /* vince su tutto (ID) */

.price { color: orange; }  /* stessa specificità della .price sopra,
                              ma scritta dopo: vince questa */

/* Ereditarietà: tutto il testo dentro .card diventa blu scuro */
.card { color: #0d47a1; }`,
      },
      {
        type: "heading",
        content: "Proprietà CSS essenziali",
      },
      {
        type: "text",
        content:
          "Le proprietà CSS più utilizzate si dividono in categorie: testo, colori, spaziatura e bordi. I colori si possono scrivere per nome (`red`), in esadecimale (`#1976d2`) o con `rgb()`/`rgba()` (l'ultimo valore di `rgba` è la trasparenza, da 0 a 1).",
      },
      {
        type: "code",
        language: "css",
        title: "Proprietà di testo e colore",
        code: `.title {
  color: #1976d2;            /* colore del testo */
  background: #f5f5f5;       /* colore di sfondo */
  background-color: rgba(0, 0, 0, 0.05); /* sfondo con trasparenza */
  font-size: 1.5rem;         /* dimensione del testo */
  font-weight: 600;          /* spessore (100-900, 700 = grassetto) */
  font-family: 'Roboto', sans-serif; /* font, con alternativa */
  text-align: center;        /* allineamento */
  text-transform: uppercase; /* trasforma il testo in maiuscolo */
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
  padding: 8px 16px 12px 16px; /* sopra destra sotto sinistra */
}

/* Bordi */
.card {
  border: 1px solid #e0e0e0; /* spessore, stile, colore */
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
          "Ogni elemento HTML è una \"scatola\" (box) composta da 4 strati concentrici: content (il contenuto), padding (spazio interno), border (bordo) e margin (spazio esterno). Capire il box model è cruciale perché determina come vengono calcolate le dimensioni.",
      },
      {
        type: "code",
        language: "css",
        title: "Box model e box-sizing",
        code: `/* Senza box-sizing: width = solo il contenuto */
.box-default {
  width: 200px;
  padding: 20px;
  border: 2px solid black;
  /* Larghezza totale = 200 + 20*2 + 2*2 = 244px! */
}

/* Con border-box: width = contenuto + padding + border */
.box-border {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  border: 2px solid black;
  /* Larghezza totale = 200px (il contenuto si restringe) */
}

/* Pratica comune: applicarlo a TUTTI gli elementi (* = selettore universale) */
* {
  box-sizing: border-box;
}`,
      },
      {
        type: "info",
        content:
          "La regola `box-sizing: border-box` è quasi sempre presente nei \"reset CSS\" moderni (piccoli fogli di stile che si mettono all'inizio di un progetto per partire da una base coerente). Molti framework la includono già.",
      },
      {
        type: "heading",
        content: "La proprietà display",
      },
      {
        type: "text",
        content:
          "La proprietà `display` controlla come un elemento si comporta nel flusso della pagina. Ogni elemento HTML ha un valore `display` di default.",
      },
      {
        type: "code",
        language: "css",
        title: "Valori di display",
        code: `/* block: occupa tutta la larghezza, va a capo */
/* Elementi block di default: div, p, h1-h6, ul, li, section */
.full-width {
  display: block;
}

/* inline: occupa solo lo spazio del contenuto, NON va a capo */
/* Elementi inline di default: span, a, strong, em */
.inline-tag {
  display: inline;
  /* ATTENZIONE: width e height non funzionano su inline! */
}

/* inline-block: sta in riga ma accetta width/height */
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
        content: "Unità di misura",
      },
      {
        type: "text",
        content:
          "Il CSS offre diverse unità di misura. La scelta dell'unità giusta è importante per creare layout che funzionano su schermi di dimensioni diverse.",
      },
      {
        type: "code",
        language: "css",
        title: "Unità di misura a confronto",
        code: `/* px - pixel: valore fisso, preciso */
.icon {
  width: 24px;
  height: 24px;
}

/* rem - relativo al font-size della radice (<html>) */
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
  max-width: 1200px;   /* ma non più di 1200px */
}

/* vh/vw - percentuale dell'altezza/larghezza della finestra (viewport) */
.hero {
  height: 100vh;       /* tutta l'altezza dello schermo */
  width: 100vw;        /* tutta la larghezza */
}`,
      },
      {
        type: "tip",
        content:
          "Usa una scala di spaziature coerente, per esempio multipli di 8px (8, 16, 24, 32...). Un'interfaccia in cui margini e padding seguono sempre la stessa scala appare subito più ordinata.",
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
      {
        type: "info",
        content:
          "Più avanti nel corso vedrai che le librerie per costruire interfacce (come React e MUI) permettono di scrivere gli stili in altri modi, ma sotto il cofano è sempre CSS: selettori, proprietà e box model restano gli stessi.",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "Il Box Model",
        description:
          "Un elemento ha `width: 300px`, `padding: 20px` e `border: 5px solid black`. Senza `box-sizing: border-box`, qual è la larghezza totale dell'elemento?",
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
          "Quale selettore seleziona SOLO i tag `<li>` che sono figli diretti di un elemento con classe `nav`?",
        difficulty: "facile",
        options: [
          "`.nav li`",
          "`.nav > li`",
          "`.nav + li`",
          "`.nav ~ li`",
        ],
        correct: 1,
        explanation:
          "Il combinatore `>` seleziona solo i figli diretti. `.nav li` (spazio) selezionerebbe tutti i `<li>` discendenti a qualsiasi profondità. `+` seleziona il fratello adiacente e `~` i fratelli successivi.",
      },
      {
        type: "multiple-choice",
        title: "Specificità",
        description:
          "Un paragrafo è scritto così: `<p id=\"nota\" class=\"testo\">Ciao</p>`. Il CSS contiene:\n`#nota { color: red; }`\n`.testo { color: green; }`\n`p { color: blue; }`\nDi che colore sarà il testo?",
        difficulty: "medio",
        options: ["Blu", "Verde", "Rosso", "Nero"],
        correct: 2,
        explanation:
          "Il selettore di ID ha la specificità più alta, quindi vince `#nota` e il testo è rosso, anche se è scritto per primo. L'ordine conta solo a parità di specificità.",
      },
      {
        type: "code",
        mode: "css",
        title: "Stilizza la card di un prodotto",
        description:
          "Nell'anteprima c'è la scheda di un prodotto. Completa il CSS in modo che:\n- `.card` abbia `padding: 16px`, un bordo `1px solid #ddd` e `border-radius: 8px`\n- il prezzo (`.price`) abbia `color: #2e7d32` e `font-weight: 700`\n- il titolo `h2` dentro la card (selettore `.card h2`) abbia `font-size: 1.25rem`",
        difficulty: "facile",
        previewHtml: `<div class="card">
  <h2>Cuffie wireless</h2>
  <p class="description">Audio cristallino, 30 ore di autonomia e custodia inclusa.</p>
  <p class="price">49,90 €</p>
</div>`,
        starterCode: `.card {
  width: 260px;
  background: white;
  /* aggiungi padding, bordo e angoli arrotondati */
}

.card h2 {
  margin-top: 0;
  /* imposta la dimensione del testo */
}

.price {
  /* colore verde e grassetto */
}`,
        solution: `.card {
  width: 260px;
  background: white;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.card h2 {
  margin-top: 0;
  font-size: 1.25rem;
}

.price {
  color: #2e7d32;
  font-weight: 700;
}`,
        validate: `
const card = $cssRule(".card");
if (card.padding !== "16px") return "Imposta \`padding: 16px\` su \`.card\`";
if (card.border !== "1px solid #ddd") return "Aggiungi a \`.card\` il bordo \`border: 1px solid #ddd\`";
if (card["border-radius"] !== "8px") return "Arrotonda gli angoli di \`.card\` con \`border-radius: 8px\`";
const title = $cssRule(".card h2");
if (title["font-size"] !== "1.25rem") return "Imposta \`font-size: 1.25rem\` nella regola \`.card h2\`";
const price = $cssRule(".price");
if (price.color !== "#2e7d32") return "Colora il prezzo con \`color: #2e7d32\` nella regola \`.price\`";
if (price["font-weight"] !== "700" && price["font-weight"] !== "bold") return "Metti il prezzo in grassetto con \`font-weight: 700\`";
return true;`,
      },
      {
        type: "code",
        mode: "css",
        title: "Un menu di navigazione con i combinatori",
        description:
          "Il menu è un elenco `<ul class=\"menu\">`; una delle voci contiene un sottomenu. Scrivi il CSS in modo che:\n- `.menu` non abbia i pallini dell'elenco (`list-style: none`) e abbia `padding: 0`\n- solo le voci di primo livello (`<li>` **figli diretti** di `.menu`) abbiano `padding: 8px` e `border-bottom: 1px solid #eee`\n- tutti i link dentro il menu (selettore discendente `.menu a`) abbiano `color: #1976d2` e `text-decoration: none`\n- la classe `.active` abbia `font-weight: 700`",
        difficulty: "medio",
        previewHtml: `<ul class="menu">
  <li><a href="#" class="active">Home</a></li>
  <li><a href="#">Blog</a></li>
  <li>
    <a href="#">Categorie</a>
    <ul>
      <li><a href="#">Viaggi</a></li>
      <li><a href="#">Cucina</a></li>
    </ul>
  </li>
  <li><a href="#">Contatti</a></li>
</ul>`,
        starterCode: `.menu {
  width: 220px;
  /* togli i pallini e il padding */
}

/* voci di primo livello: scrivi il selettore con > */


/* tutti i link del menu: scrivi il selettore discendente */


/* voce attiva */
`,
        solution: `.menu {
  width: 220px;
  list-style: none;
  padding: 0;
}

/* voci di primo livello: scrivi il selettore con > */
.menu > li {
  padding: 8px;
  border-bottom: 1px solid #eee;
}

/* tutti i link del menu: scrivi il selettore discendente */
.menu a {
  color: #1976d2;
  text-decoration: none;
}

/* voce attiva */
.active {
  font-weight: 700;
}`,
        validate: `
const menu = $cssRule(".menu");
if (menu["list-style"] !== "none" && menu["list-style-type"] !== "none") return "Togli i pallini da \`.menu\` con \`list-style: none\`";
if (menu.padding !== "0" && menu.padding !== "0px") return "Imposta \`padding: 0\` su \`.menu\`";
const item = $cssRule(".menu > li");
if (Object.keys(item).length === 0) {
  if (Object.keys($cssRule(".menu li")).length > 0) return "\`.menu li\` seleziona anche le voci del sottomenu: usa il combinatore figlio \`.menu > li\`";
  return "Scrivi una regola con selettore \`.menu > li\` per le voci di primo livello";
}
if (item.padding !== "8px") return "Imposta \`padding: 8px\` nella regola \`.menu > li\`";
if (item["border-bottom"] !== "1px solid #eee") return "Aggiungi \`border-bottom: 1px solid #eee\` nella regola \`.menu > li\`";
const link = $cssRule(".menu a");
if (Object.keys(link).length === 0) return "Scrivi una regola con il selettore discendente \`.menu a\` per i link";
if (link.color !== "#1976d2") return "Imposta \`color: #1976d2\` nella regola \`.menu a\`";
if (link["text-decoration"] !== "none") return "Togli la sottolineatura con \`text-decoration: none\` nella regola \`.menu a\`";
const active = Object.assign({}, $cssRule(".active"), $cssRule("a.active"), $cssRule(".menu .active"), $cssRule(".menu a.active"));
if (active["font-weight"] !== "700" && active["font-weight"] !== "bold") return "Metti in grassetto la voce attiva: \`.active { font-weight: 700; }\`";
return true;`,
      },
    ],
  },

  "flexbox": {
    sections: [
      {
        type: "text",
        content:
          "Flexbox (Flexible Box Layout) è un sistema di layout CSS progettato per distribuire lo spazio e allineare elementi in modo efficiente all'interno di un contenitore. Prima di Flexbox, centrare un elemento verticalmente era un incubo; ora bastano poche righe di codice.",
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
          "Per usare Flexbox basta impostare `display: flex` sul contenitore genitore. Tutti i figli diretti diventano automaticamente \"flex item\" e si dispongono in riga.",
      },
      {
        type: "code",
        language: "html",
        title: "L'HTML di partenza",
        code: `<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>`,
      },
      {
        type: "code",
        language: "css",
        title: "display: flex e flex-direction",
        code: `/* Il contenitore diventa un flex container */
.container {
  display: flex;
  /* I figli (.item) si dispongono in riga (default) */
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
          "Ricorda che `display: flex` agisce solo sui figli **diretti** del contenitore: i \"nipoti\" non diventano flex item. Se ti serve disporre anche loro, rendi flex anche il loro genitore.",
      },
      {
        type: "heading",
        content: "Allineamento: justify-content e align-items",
      },
      {
        type: "text",
        content:
          "`justify-content` allinea gli elementi lungo l'asse principale (orizzontale per `row`, verticale per `column`). `align-items` li allinea lungo l'asse trasversale. Sono le due proprietà Flexbox che userai di più.",
      },
      {
        type: "code",
        language: "css",
        title: "justify-content: distribuzione sull'asse principale",
        code: `/* Valori possibili (se ne usa uno alla volta!) */
.toolbar {
  display: flex;
  justify-content: flex-start;    /* all'inizio (default) */
  justify-content: flex-end;      /* alla fine */
  justify-content: center;        /* al centro */
  justify-content: space-between; /* primo e ultimo ai bordi, spazio uguale tra gli altri */
  justify-content: space-around;  /* spazio intorno a ogni elemento */
  justify-content: space-evenly;  /* spazio uguale ovunque */
}`,
      },
      {
        type: "code",
        language: "css",
        title: "align-items: allineamento sull'asse trasversale",
        code: `/* Valori possibili (se ne usa uno alla volta!) */
.navbar {
  display: flex;
  height: 64px;
  align-items: stretch;     /* allungati per tutta l'altezza (default) */
  align-items: flex-start;  /* in alto */
  align-items: flex-end;    /* in basso */
  align-items: center;      /* al centro verticale */
  align-items: baseline;    /* allinea la linea di base del testo */
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
        type: "info",
        content:
          "Se nello stesso blocco scrivi più volte la stessa proprietà, vale l'ultima. Gli esempi qui sopra elencano tutti i valori solo per mostrarli: nel codice reale ne scegli uno.",
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
        content: "La proprietà gap",
      },
      {
        type: "text",
        content:
          "La proprietà `gap` definisce lo spazio tra gli elementi flex. Prima di `gap` si usava `margin` sugli elementi figli, ma `gap` è molto più pulito perché non aggiunge spazio extra prima del primo o dopo l'ultimo elemento.",
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
  flex-wrap: wrap;   /* vedi più sotto */
  row-gap: 16px;
  column-gap: 8px;
  /* oppure in forma abbreviata: gap: 16px 8px; */
}`,
      },
      {
        type: "tip",
        content:
          "Preferisci `gap` ai margini sui singoli figli per spaziare gli elementi di un contenitore flex: il codice è più corto e non devi gestire a mano il primo o l'ultimo elemento.",
      },
      {
        type: "heading",
        content: "flex-grow, flex-shrink e flex-basis",
      },
      {
        type: "text",
        content:
          "Queste tre proprietà, da applicare ai flex item (i figli), controllano come crescono, come si restringono e qual è la loro dimensione iniziale. Insieme determinano il comportamento \"flessibile\" degli elementi.",
      },
      {
        type: "code",
        language: "css",
        title: "Proprietà dei flex item",
        code: `/* flex-grow: quanto l'elemento cresce per riempire lo spazio libero */
.sidebar {
  flex-grow: 0;    /* non cresce, mantiene la sua dimensione */
  width: 250px;
}
.main-content {
  flex-grow: 1;    /* prende tutto lo spazio rimanente */
}

/* flex-shrink: quanto l'elemento si restringe se manca spazio */
.logo {
  flex-shrink: 0;  /* non si restringe mai */
  width: 120px;
}

/* flex-basis: dimensione iniziale prima di crescere/restringersi */
.column {
  flex-basis: 33.33%; /* parte da 1/3 della larghezza */
}

/* Forma abbreviata: flex: grow shrink basis */
.item {
  flex: 1 0 auto;     /* cresce, non si restringe, dimensione automatica */
}
.equal-columns {
  flex: 1;             /* equivale a flex: 1 1 0%: colonne tutte uguali */
}`,
      },
      {
        type: "text",
        content:
          "Lo spazio libero viene diviso in proporzione ai valori di `flex-grow`. Esempio: un contenitore largo 600px con tre elementi da 100px lascia 300px liberi. Se i `flex-grow` sono 1, 2 e 0, il primo riceve 1/3 dello spazio libero (100px, totale 200px), il secondo 2/3 (200px, totale 300px) e il terzo nulla (resta 100px).",
      },
      {
        type: "heading",
        content: "flex-wrap",
      },
      {
        type: "text",
        content:
          "Di default i flex item cercano di stare tutti su una riga, anche se non c'è abbastanza spazio (si comprimono). Con `flex-wrap: wrap` gli elementi vanno a capo quando necessario, creando un comportamento simile a una griglia.",
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

/* Con wrap: vanno a capo quando non c'è spazio */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.card-grid > .card {
  flex: 0 1 300px; /* non cresce, si restringe, parte da 300px */
  /* Le card vanno a capo quando non entrano */
}

/* Esempio pratico: elenco di tag di un articolo */
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
          "Per elenchi di lunghezza variabile (tag, filtri, miniature di una galleria) usa sempre `flex-wrap: wrap` insieme a `gap`: quando gli elementi sono troppi per una riga vanno a capo da soli, mantenendo una spaziatura uniforme.",
      },
      {
        type: "info",
        content:
          "Un pattern molto comune è il layout \"sidebar + contenuto\": la sidebar ha una larghezza fissa (`flex-shrink: 0`) e il contenuto principale ha `flex-grow: 1` per occupare tutto lo spazio rimanente.",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "Centrare con Flexbox",
        description:
          "Quali due proprietà servono per centrare perfettamente un elemento sia orizzontalmente sia verticalmente in un contenitore flex (con la direzione di default)?",
        difficulty: "facile",
        options: [
          "`justify-content: center` e `align-items: center`",
          "`text-align: center` e `vertical-align: middle`",
          "`margin: auto` e `align-items: center`",
          "`justify-content: space-between` e `align-items: center`",
        ],
        correct: 0,
        explanation:
          "`justify-content: center` centra sull'asse principale e `align-items: center` centra sull'asse trasversale. Insieme centrano l'elemento in entrambe le direzioni.",
      },
      {
        type: "multiple-choice",
        title: "flex-direction e assi",
        description:
          "Se imposti `flex-direction: column` su un contenitore flex, cosa fa `justify-content: center`?",
        difficulty: "medio",
        options: [
          "Centra gli elementi orizzontalmente",
          "Centra gli elementi verticalmente",
          "Centra gli elementi in entrambe le direzioni",
          "Non ha alcun effetto con flex-direction: column",
        ],
        correct: 1,
        explanation:
          "Con `flex-direction: column` l'asse principale diventa verticale. Siccome `justify-content` agisce sull'asse principale, centra gli elementi verticalmente. Per centrarli orizzontalmente, in questo caso, servirebbe `align-items: center`.",
      },
      {
        type: "multiple-choice",
        title: "Distribuire lo spazio con flex-grow",
        description:
          "Un contenitore flex è largo 500px e contiene due elementi con `flex-basis: 100px`. Il primo ha `flex-grow: 1`, il secondo `flex-grow: 3`. Quanto sarà largo il secondo elemento?",
        difficulty: "difficile",
        options: ["300px", "325px", "375px", "250px"],
        correct: 1,
        explanation:
          "Lo spazio libero è 500 - 100 - 100 = 300px, diviso in 1 + 3 = 4 parti da 75px. Il secondo elemento riceve 3 parti (225px) in aggiunta alla sua base di 100px: 100 + 225 = 325px. Il primo riceve una parte: 100 + 75 = 175px.",
      },
      {
        type: "code",
        mode: "css",
        title: "Una barra di navigazione",
        description:
          "Crea la barra di navigazione di un sito: il logo a sinistra e i link a destra, centrati verticalmente.\n- `.navbar`: `display: flex`, `justify-content: space-between` e `align-items: center`\n- `.links`: anche lei `display: flex`, con `gap: 16px` tra i link",
        difficulty: "facile",
        previewHtml: `<nav class="navbar">
  <div class="logo">Il mio blog</div>
  <div class="links">
    <a href="#">Home</a>
    <a href="#">Articoli</a>
    <a href="#">Chi sono</a>
  </div>
</nav>`,
        starterCode: `.navbar {
  height: 64px;
  padding: 0 16px;
  background: #1976d2;
  /* disponi logo e link ai due estremi, centrati in verticale */
}

.logo {
  color: white;
  font-weight: 700;
  font-size: 1.25rem;
}

.links {
  /* metti i link in riga con 16px di spazio tra loro */
}

.links a {
  color: white;
  text-decoration: none;
}`,
        solution: `.navbar {
  height: 64px;
  padding: 0 16px;
  background: #1976d2;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  color: white;
  font-weight: 700;
  font-size: 1.25rem;
}

.links {
  display: flex;
  gap: 16px;
}

.links a {
  color: white;
  text-decoration: none;
}`,
        validate: `
const nav = $cssRule(".navbar");
if (nav.display !== "flex") return "Rendi \`.navbar\` un contenitore flex con \`display: flex\`";
if (nav["justify-content"] !== "space-between") return "Usa \`justify-content: space-between\` su \`.navbar\` per spingere logo e link agli estremi";
if (nav["align-items"] !== "center") return "Centra verticalmente il contenuto di \`.navbar\` con \`align-items: center\`";
const links = $cssRule(".links");
if (links.display !== "flex") return "Anche \`.links\` deve avere \`display: flex\`";
if (links.gap !== "16px" && links["column-gap"] !== "16px") return "Aggiungi \`gap: 16px\` a \`.links\`";
return true;`,
      },
      {
        type: "code",
        mode: "css",
        title: "Layout sidebar + contenuto",
        description:
          "Costruisci il classico layout di un blog: una barra laterale a larghezza fissa e il contenuto che occupa tutto lo spazio rimanente.\n- `.layout`: `display: flex` e `gap: 16px`\n- `.sidebar`: `width: 180px` e `flex-shrink: 0` (non deve mai restringersi)\n- `.content`: `flex-grow: 1` (oppure `flex: 1`)",
        difficulty: "medio",
        previewHtml: `<div class="layout">
  <aside class="sidebar">
    <strong>Categorie</strong>
    <p>Viaggi</p>
    <p>Cucina</p>
    <p>Tecnologia</p>
  </aside>
  <main class="content">
    <h2>Il mio primo articolo</h2>
    <p>Benvenuto nel blog! Qui racconto i miei viaggi, le ricette che provo e le novità che scopro ogni settimana.</p>
  </main>
</div>`,
        starterCode: `.layout {
  /* contenitore flex con 16px di spazio */
}

.sidebar {
  background: #f1f5f9;
  padding: 12px;
  /* larghezza fissa che non si restringe */
}

.content {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  padding: 12px;
  /* occupa tutto lo spazio rimanente */
}`,
        solution: `.layout {
  display: flex;
  gap: 16px;
}

.sidebar {
  background: #f1f5f9;
  padding: 12px;
  width: 180px;
  flex-shrink: 0;
}

.content {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  padding: 12px;
  flex-grow: 1;
}`,
        validate: `
const layout = $cssRule(".layout");
if (layout.display !== "flex") return "Rendi \`.layout\` un contenitore flex con \`display: flex\`";
if (layout.gap !== "16px" && layout["column-gap"] !== "16px") return "Aggiungi \`gap: 16px\` a \`.layout\`";
const side = $cssRule(".sidebar");
if (side.width !== "180px" && side["flex-basis"] !== "180px") return "Dai alla \`.sidebar\` una larghezza fissa: \`width: 180px\`";
const sideFlex = (side.flex || "").split(" ");
if (side["flex-shrink"] !== "0" && !(sideFlex.length >= 2 && sideFlex[1] === "0") && side.flex !== "none") return "Impedisci alla \`.sidebar\` di restringersi con \`flex-shrink: 0\`";
const content = $cssRule(".content");
const grow = content["flex-grow"] || (content.flex || "").split(" ")[0];
if (!(parseFloat(grow) > 0)) return "Fai crescere \`.content\` con \`flex-grow: 1\` (o \`flex: 1\`)";
return true;`,
      },
      {
        type: "code",
        mode: "css",
        title: "Una galleria che va a capo",
        description:
          "Le foto della galleria devono disporsi in righe che vanno a capo quando non c'è più spazio.\n- `.gallery`: `display: flex`, `flex-wrap: wrap` e `gap: 8px`\n- `.photo`: `flex: 0 0 100px` (larghezza fissa di 100px, senza crescere né restringersi)",
        difficulty: "medio",
        previewHtml: `<div class="gallery">
  <div class="photo">Mare</div>
  <div class="photo">Montagna</div>
  <div class="photo">Città</div>
  <div class="photo">Lago</div>
  <div class="photo">Bosco</div>
  <div class="photo">Deserto</div>
  <div class="photo">Isola</div>
  <div class="photo">Collina</div>
  <div class="photo">Fiume</div>
  <div class="photo">Spiaggia</div>
</div>`,
        starterCode: `.gallery {
  /* flex, a capo, 8px di spazio */
}

.photo {
  height: 80px;
  background: #90caf9;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* larghezza fissa di 100px */
}`,
        solution: `.gallery {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.photo {
  height: 80px;
  background: #90caf9;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 100px;
}`,
        validate: `
const g = $cssRule(".gallery");
if (g.display !== "flex") return "Rendi \`.gallery\` un contenitore flex con \`display: flex\`";
if (g["flex-wrap"] !== "wrap" && !/\\bwrap\\b/.test(g["flex-flow"] || "")) return "Fai andare a capo le foto con \`flex-wrap: wrap\`";
if (g.gap !== "8px") return "Aggiungi \`gap: 8px\` a \`.gallery\`";
const p = $cssRule(".photo");
const ok = p.flex === "0 0 100px" || (p["flex-grow"] === "0" && p["flex-shrink"] === "0" && (p["flex-basis"] === "100px" || p.width === "100px"));
if (!ok) return "Imposta \`flex: 0 0 100px\` su \`.photo\`";
return true;`,
      },
    ],
  },

  "variables": {
    sections: [
      {
        type: "text",
        content:
          "Le variabili CSS (ufficialmente \"custom properties\") permettono di definire valori riutilizzabili nel foglio di stile. Definisci un valore una volta (per esempio il colore principale del sito) e lo riutilizzi ovunque. Se devi cambiarlo, lo modifichi in un solo punto.",
      },
      {
        type: "heading",
        content: "Definire e usare variabili CSS",
      },
      {
        type: "text",
        content:
          "Le variabili CSS si definiscono con il prefisso `--` e si usano con la funzione `var()`. Distinguono maiuscole e minuscole (`--Color` e `--color` sono diverse) e seguono le regole di ereditarietà del CSS: un elemento figlio vede le variabili definite sui suoi genitori.",
      },
      {
        type: "code",
        language: "css",
        title: "Sintassi delle variabili CSS",
        code: `:root {
  /* :root seleziona la radice del documento (<html>):
     le variabili definite qui valgono in tutta la pagina */
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

/* var() accetta un valore di riserva (fallback) */
.card {
  color: var(--text-color, #333);
  /* Se --text-color non è definita, usa #333 */
}`,
      },
      {
        type: "tip",
        content:
          "Raccogli in `:root` all'inizio del foglio di stile tutti i valori \"di design\" (colori, spaziature, raggi dei bordi, font). Avrai un unico punto da cui controllare l'aspetto dell'intero sito.",
      },
      {
        type: "subheading",
        content: "Variabili con scope locale",
      },
      {
        type: "text",
        content:
          "Le variabili non devono per forza stare in `:root`. Puoi definirle su qualsiasi selettore e saranno accessibili solo a quell'elemento e ai suoi figli. Questo è utile per creare varianti di uno stesso elemento cambiando solo il valore di una variabile.",
      },
      {
        type: "code",
        language: "css",
        title: "Variabili con scope e sovrascritture",
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
  cursor: pointer; /* mostra la "manina" al passaggio del mouse */
}

/* Variante: sovrascriviamo solo la variabile */
.btn-danger {
  --btn-bg: #d32f2f;
}

.btn-success {
  --btn-bg: #2e7d32;
}

/* Card con variabili locali */
.card {
  --card-padding: 16px;
  --card-radius: 8px;
  padding: var(--card-padding);
  border-radius: var(--card-radius);
}

/* .card.compact (senza spazio) = elemento che ha ENTRAMBE le classi */
.card.compact {
  --card-padding: 8px;
  --card-radius: 4px;
}`,
      },
      {
        type: "info",
        content:
          "Le variabili CSS sono \"vive\": se il valore di una variabile cambia (ad esempio dentro una media query, o più avanti tramite JavaScript), tutti gli elementi che la usano si aggiornano automaticamente. Questo le rende perfette per implementare temi chiaro/scuro.",
      },
      {
        type: "heading",
        content: "Media queries e responsive design",
      },
      {
        type: "text",
        content:
          "Le media queries permettono di applicare stili diversi in base alle caratteristiche del dispositivo, principalmente la larghezza dello schermo. Sono il fondamento del *responsive design*: un sito che si adatta automaticamente a smartphone, tablet e desktop. Le regole dentro `@media (...) { ... }` valgono solo quando la condizione è vera.",
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
    margin: 0 auto; /* auto a destra e sinistra: centra il contenitore */
  }
}

/* Si può anche usare max-width: "fino a 600px" */
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
        type: "text",
        content:
          "I *breakpoint* sono le larghezze in cui il layout cambia. Non esistono valori obbligatori, ma questi sono molto diffusi:",
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
          "Scegli pochi breakpoint (due o tre) e usali in modo coerente in tutto il foglio di stile. E decidili in base al contenuto: aggiungi un breakpoint dove il layout \"si rompe\", non per un modello specifico di telefono.",
      },
      {
        type: "heading",
        content: "Pattern responsive comuni",
      },
      {
        type: "text",
        content:
          "Vediamo alcuni pattern che si usano spesso per creare layout responsivi. L'approccio \"mobile first\" è considerato la buona pratica: si parte dagli stili per mobile e si aggiungono modifiche per schermi più grandi con `min-width`.",
      },
      {
        type: "code",
        language: "css",
        title: "Combinare variabili CSS e media queries",
        code: `:root {
  --sidebar-width: 0px;
  --content-padding: 16px;
}

@media (min-width: 768px) {
  :root {
    --sidebar-width: 250px;
    --content-padding: 24px;
  }
}

@media (min-width: 1200px) {
  :root {
    --content-padding: 32px;
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
    /* calc() fa calcoli tra unità diverse:
       metà della larghezza meno metà del gap */
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
        code: `:root {
  --background: #ffffff;
  --foreground: #171717;
  --card-bg: #f5f5f5;
  --border-color: #e0e0e0;
}

/* Vale quando il sistema operativo dell'utente usa il tema scuro */
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
          "`prefers-color-scheme` rileva la preferenza del sistema operativo dell'utente, ma non gli permette di scegliere il tema nel sito. Per un pulsante \"tema chiaro/scuro\" serve JavaScript, che aggiunge o rimuove una classe (ad esempio `.dark`) sul `<body>`: lo imparerai nei prossimi moduli.",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "Variabili CSS e fallback",
        description:
          "Dato questo CSS:\n`:root { --main-color: blue; }`\n`.box { color: var(--accent-color, red); }`\n\nDi che colore sarà il testo di `.box`?",
        difficulty: "facile",
        options: [
          "Blu (blue)",
          "Rosso (red)",
          "Nero (il colore di default)",
          "Errore: la variabile non esiste",
        ],
        correct: 1,
        explanation:
          "La variabile `--accent-color` non è definita, quindi `var()` usa il valore di fallback specificato come secondo argomento: red. Se non ci fosse il fallback, la dichiarazione non avrebbe effetto e il testo userebbe il colore ereditato.",
      },
      {
        type: "multiple-choice",
        title: "Media queries e mobile first",
        description:
          "In un approccio \"mobile first\", quale media query è corretta per applicare stili a partire dalla larghezza tablet (768px)?",
        difficulty: "facile",
        options: [
          "`@media (max-width: 768px) { ... }`",
          "`@media (min-width: 768px) { ... }`",
          "`@media (width: 768px) { ... }`",
          "`@media screen and (device-width: 768px) { ... }`",
        ],
        correct: 1,
        explanation:
          "Mobile first significa partire dagli stili per schermi piccoli e poi sovrascriverli per schermi più grandi con `min-width`. `max-width` farebbe il contrario (desktop first). `min-width: 768px` significa \"a partire da 768px di larghezza in su\".",
      },
      {
        type: "code",
        mode: "css",
        title: "Un tema con le variabili CSS",
        description:
          "I pulsanti di un negozio online devono usare un tema basato su variabili.\n- In `:root` definisci `--primary: #1976d2` e `--radius: 6px`\n- `.btn` deve usare `var(--primary)` come sfondo (`background` o `background-color`) e `var(--radius)` per `border-radius`\n- `.btn-danger` non deve ridefinire lo sfondo: deve solo sovrascrivere la variabile, con `--primary: #d32f2f`",
        difficulty: "medio",
        previewHtml: `<div class="product">
  <h3>Zaino da trekking</h3>
  <p>Capienza 30 litri, impermeabile.</p>
  <button class="btn">Aggiungi al carrello</button>
  <button class="btn btn-danger">Rimuovi</button>
</div>`,
        starterCode: `:root {
  /* definisci qui --primary e --radius */
}

.btn {
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  /* usa le variabili per sfondo e angoli */
}

.btn-danger {
  /* sovrascrivi solo la variabile --primary */
}`,
        solution: `:root {
  --primary: #1976d2;
  --radius: 6px;
}

.btn {
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  background: var(--primary);
  border-radius: var(--radius);
}

.btn-danger {
  --primary: #d32f2f;
}`,
        validate: `
const rootVars = $cssRule(":root");
if ((rootVars["--primary"] || "").toLowerCase() !== "#1976d2") return "Definisci in \`:root\` la variabile \`--primary: #1976d2\`";
if (rootVars["--radius"] !== "6px") return "Definisci in \`:root\` la variabile \`--radius: 6px\`";
const btn = $cssRule(".btn");
const bg = btn["background-color"] || btn.background || "";
if (!/var\\(\\s*--primary\\s*[,)]/.test(bg)) return "Usa \`var(--primary)\` come sfondo di \`.btn\`";
if (!/var\\(\\s*--radius\\s*[,)]/.test(btn["border-radius"] || "")) return "Usa \`var(--radius)\` per il \`border-radius\` di \`.btn\`";
const danger = Object.assign({}, $cssRule(".btn-danger"), $cssRule(".btn.btn-danger"));
if (danger.background || danger["background-color"]) return "In \`.btn-danger\` non ridefinire lo sfondo: sovrascrivi solo la variabile \`--primary\`";
if ((danger["--primary"] || "").toLowerCase() !== "#d32f2f") return "In \`.btn-danger\` sovrascrivi la variabile: \`--primary: #d32f2f\`";
return true;`,
      },
      {
        type: "code",
        mode: "css",
        title: "Card responsive con una media query",
        description:
          "Le card degli articoli di un blog devono stare in colonna su mobile e affiancate su schermi larghi (approccio mobile first).\n- `.cards`: `display: flex`, `flex-direction: column` e `gap: 16px`\n- dentro `@media (min-width: 600px)`, `.cards` deve avere `flex-direction: row`\n- sempre dentro la media query, `.card` deve avere `flex: 1`\n\nSuggerimento: trascina l'angolo in basso a destra dell'anteprima o allarga la finestra per vedere il cambiamento.",
        difficulty: "medio",
        previewHtml: `<div class="cards">
  <article class="card"><h3>Ricette d'autunno</h3><p>Zucca, castagne e funghi: tre idee per la cena.</p></article>
  <article class="card"><h3>Weekend in montagna</h3><p>Cosa mettere nello zaino per due giorni di trekking.</p></article>
  <article class="card"><h3>Libri del mese</h3><p>I cinque romanzi che non riuscivo a smettere di leggere.</p></article>
</div>`,
        starterCode: `.cards {
  /* mobile: card in colonna con 16px di spazio */
}

.card {
  background: #fff8e1;
  border: 1px solid #ffe082;
  border-radius: 8px;
  padding: 12px;
}

/* da 600px in su: card affiancate */
`,
        solution: `.cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.card {
  background: #fff8e1;
  border: 1px solid #ffe082;
  border-radius: 8px;
  padding: 12px;
}

/* da 600px in su: card affiancate */
@media (min-width: 600px) {
  .cards {
    flex-direction: row;
  }
  .card {
    flex: 1;
  }
}`,
        validate: `
const base = $cssRule(".cards");
if (base.display !== "flex") return "Rendi \`.cards\` un contenitore flex con \`display: flex\` (fuori dalla media query)";
if (base["flex-direction"] !== "column") return "Su mobile (fuori dalla media query) \`.cards\` deve avere \`flex-direction: column\`";
if (base.gap !== "16px" && base["row-gap"] !== "16px") return "Aggiungi \`gap: 16px\` a \`.cards\`";
const inMedia = function (sel) {
  const out = {};
  $cssRules.forEach(function (r) {
    if (r.selector === sel && r.media && /min-width:\\s*600px/.test(r.media)) Object.assign(out, r.decls);
  });
  return out;
};
const hasMedia = $cssRules.some(function (r) { return r.media && /min-width:\\s*600px/.test(r.media); });
if (!hasMedia) return "Scrivi una media query \`@media (min-width: 600px) { ... }\`";
if (inMedia(".cards")["flex-direction"] !== "row") return "Dentro la media query imposta \`.cards { flex-direction: row; }\`";
const card = inMedia(".card");
const grow = card["flex-grow"] || (card.flex || "").split(" ")[0];
if (!(parseFloat(grow) > 0)) return "Dentro la media query imposta \`.card { flex: 1; }\`";
return true;`,
      },
    ],
  },
};
