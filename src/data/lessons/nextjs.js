export const lessons = {
  "app-router": {
    sections: [
      {
        type: "text",
        content:
          "Next.js è un framework React che aggiunge funzionalità fondamentali per la produzione: Server-Side Rendering (SSR), Static Site Generation (SSG), routing basato su file, bundling ottimizzato e molto altro. Invece di configurare manualmente bundler, router e server, Next.js fornisce tutto pronto all'uso.",
      },
      {
        type: "heading",
        content: "L'App Router e il routing basato su file",
      },
      {
        type: "text",
        content:
          "A partire da Next.js 13, l'App Router (cartella `app/`) sostituisce il vecchio Pages Router. Ogni cartella dentro `app/` corrisponde a un segmento dell'URL, e ogni file `page.js` definisce il contenuto di quella rotta. Non servono configurazioni: la struttura delle cartelle **è** il routing.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Struttura tipica della cartella app/",
        code: `// Struttura del filesystem:
// app/
// ├── page.js             →  /
// ├── layout.js           →  layout root (avvolge tutte le pagine)
// ├── loading.js          →  interfaccia di caricamento globale
// ├── not-found.js        →  pagina 404 personalizzata
// ├── chi-siamo/
// │   └── page.js         →  /chi-siamo
// └── blog/
//     ├── page.js         →  /blog
//     └── [slug]/
//         └── page.js     →  /blog/il-mio-primo-articolo

// Esempio di page.js root (la Home):
export default function Home() {
  return <h1>Benvenuto nella Home</h1>;
}`,
      },
      {
        type: "subheading",
        content: "page.js: il cuore di ogni rotta",
      },
      {
        type: "text",
        content:
          "Il file `page.js` è l'unico file che rende una rotta accessibile pubblicamente. Se una cartella non contiene `page.js`, non sarà navigabile dall'utente. Ogni `page.js` esporta di default un componente React che rappresenta l'interfaccia di quella pagina.",
      },
      {
        type: "subheading",
        content: "layout.js: il wrapper condiviso",
      },
      {
        type: "text",
        content:
          "Il file `layout.js` definisce un involucro (wrapper) condiviso da tutte le pagine discendenti: riceve la pagina corrente come prop `children`. Il layout root (in `app/layout.js`) è obbligatorio e contiene i tag `<html>` e `<body>`. I layout non vengono ri-renderizzati quando si naviga tra pagine figlie, a vantaggio delle prestazioni.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Layout root di un'applicazione Next.js",
        code: `// app/layout.js - Layout root
import { Box } from "@mui/material";
import StoreProvider from "./StoreProvider"; // avvolge l'app nel <Provider> di Redux

export const metadata = {
  title: "Il mio blog",
  description: "Articoli su programmazione e dintorni",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it" style={{ height: "100%" }}>
      <body style={{ margin: 0, height: "100%" }}>
        <StoreProvider>
          <Box sx={{ height: "100%" }}>
            {children}
          </Box>
        </StoreProvider>
      </body>
    </html>
  );
}`,
      },
      {
        type: "info",
        content:
          "L'oggetto `metadata` esportato da un layout o da una pagina imposta il titolo e la descrizione della pagina (i tag `<title>` e `<meta>` nell'`<head>`): Next.js li legge e li inserisce automaticamente.",
      },
      {
        type: "subheading",
        content: "File speciali: loading.js, error.js, not-found.js",
      },
      {
        type: "list",
        items: [
          "`loading.js` — Mostra automaticamente un'interfaccia di caricamento mentre il contenuto della pagina viene preparato.",
          "`error.js` — Cattura gli errori che avvengono durante il rendering della rotta e mostra un'interfaccia di riserva (fallback). Deve avere `\"use client\"` in cima (vedremo cosa significa nella prossima lezione).",
          "`not-found.js` — Interfaccia personalizzata per le pagine 404. Si attiva chiamando la funzione `notFound()` oppure quando l'URL non corrisponde a nessuna rotta.",
        ],
      },
      {
        type: "subheading",
        content: "Route group: le parentesi tonde",
      },
      {
        type: "text",
        content:
          "Una cartella con il nome tra parentesi tonde, come `(negozio)`, crea un *route group*: serve a organizzare i file (e, se vuoi, a dare a quelle pagine un layout comune) senza aggiungere segmenti all'URL. Ad esempio `app/(negozio)/carrello/page.js` risponde all'URL `/carrello`, non a `/(negozio)/carrello`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Route group con un layout dedicato",
        code: `// app/
// ├── page.js                  →  /
// ├── (negozio)/
// │   ├── layout.js            →  layout con barra del carrello, solo per queste pagine
// │   ├── prodotti/page.js     →  /prodotti
// │   └── carrello/page.js     →  /carrello
// └── (account)/
//     ├── layout.js            →  layout con menu del profilo
//     └── profilo/page.js      →  /profilo`,
      },
      {
        type: "tip",
        content:
          "Usa i route group per separare aree dell'applicazione che hanno bisogno di layout diversi (es. area pubblica e area riservata), mantenendo URL brevi e puliti.",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "Ruolo di page.js",
        description:
          "Quale file rende una cartella navigabile come rotta nell'App Router di Next.js?",
        difficulty: "facile",
        options: ["layout.js", "page.js", "route.js", "index.js"],
        correct: 1,
        explanation:
          "Solo page.js rende una rotta pubblicamente accessibile. layout.js definisce un wrapper condiviso, route.js serve a creare endpoint API (non pagine) e index.js era usato nel vecchio Pages Router.",
      },
      {
        type: "multiple-choice",
        title: "Route group",
        description:
          "Cosa succede quando crei una cartella chiamata `(account)` dentro `app/`?",
        difficulty: "medio",
        options: [
          "Aggiunge '/account' all'URL",
          "Genera un errore perché le parentesi non sono valide",
          "Crea una rotta dinamica con parametro 'account'",
          "Crea un gruppo organizzativo senza influenzare l'URL",
        ],
        correct: 3,
        explanation:
          "Le parentesi tonde creano un route group: organizzano i file in cartelle logiche (eventualmente con un layout comune) senza aggiungere segmenti all'URL. app/(account)/profilo/page.js risponde a /profilo. Non è un errore (le parentesi sono un nome di cartella valido) e non è una rotta dinamica: quelle si scrivono con le parentesi quadre, come vedremo più avanti.",
      },
      {
        type: "multiple-choice",
        title: "Quale URL?",
        description:
          "Dato questo albero di file:\n``\napp/\n├── layout.js\n├── (negozio)/\n│   └── carrello/\n│       └── page.js\n└── componenti/\n    └── Bottone.js\n``\nQuale di questi URL mostra una pagina?",
        difficulty: "medio",
        options: [
          "/negozio/carrello",
          "/componenti/Bottone",
          "/carrello",
          "/(negozio)/carrello",
        ],
        correct: 2,
        explanation:
          "`(negozio)` è un route group e non compare nell'URL, quindi `app/(negozio)/carrello/page.js` risponde a `/carrello`. `/negozio/carrello` e `/(negozio)/carrello` non esistono proprio perché il gruppo è invisibile nell'URL. La cartella `componenti` non contiene un `page.js`: `Bottone.js` è un normale file di componente e non diventa una rotta.",
      },
      {
        type: "multiple-choice",
        title: "Il layout root",
        description:
          "Un collega scrive `app/layout.js` così:\n``\nexport default function RootLayout({ children }) {\n  return <main>{children}</main>;\n}\n``\nQual è il problema?",
        difficulty: "medio",
        options: [
          "Il layout root deve contenere i tag <html> e <body>",
          "Un layout non può ricevere children",
          "Il layout deve chiamarsi page.js",
          "Nessun problema: il layout root è facoltativo",
        ],
        correct: 0,
        explanation:
          "Il layout root è obbligatorio e deve restituire i tag `<html>` e `<body>`, dentro cui vengono poi inserite le pagine tramite `children`. Ricevere `children` è proprio il compito di un layout; `page.js` è un file diverso (il contenuto della rotta) e il layout root non è facoltativo.",
      },
      {
        type: "code",
        title: "Crea un layout con sidebar",
        description:
          "Completa il layout `app/(account)/layout.js`: deve restituire un `Box` con `display: \"flex\"` che contiene due `Box`:\n- una sidebar a sinistra con larghezza fissa `width: 240`;\n- il contenuto principale a destra con `flex: 1`, che mostra `{children}`.",
        difficulty: "medio",
        mode: "static",
        starterCode: `// app/(account)/layout.js
import { Box } from "@mui/material";

export default function AccountLayout({ children }) {
  // Completa il layout con sidebar + contenuto principale
}`,
        solution: `// app/(account)/layout.js
import { Box } from "@mui/material";

export default function AccountLayout({ children }) {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ width: 240, bgcolor: "#f5f5f5", borderRight: "1px solid #e0e0e0" }}>
        Menu del profilo
      </Box>
      <Box sx={{ flex: 1, overflow: "auto" }}>
        {children}
      </Box>
    </Box>
  );
}`,
        validate: `const c = $codeNoComments;
if (!/return\\s*\\(?\\s*<Box/.test(c)) return "Il layout deve restituire (return) un <Box> esterno";
if (!/display\\s*:\\s*["']flex["']/.test(c)) return "Il Box esterno deve avere sx={{ display: \\"flex\\" }}";
if (!/width\\s*:\\s*["']?240(px)?["']?/.test(c)) return "La sidebar deve avere una larghezza fissa: width: 240";
if (!/flex\\s*:\\s*["']?1["']?\\s*[,}]/.test(c)) return "Il contenuto principale deve occupare lo spazio rimanente con flex: 1";
if (!/\\{\\s*children\\s*\\}/.test(c)) return "Mostra le pagine figlie inserendo {children} nel Box del contenuto";
const boxes = c.match(/<Box\\b/g) || [];
if (boxes.length < 3) return "Servono tre Box: quello esterno, la sidebar e il contenuto principale";
return true;`,
        solutionExplanation:
          "Il Box esterno con `display: \"flex\"` mette i due figli uno accanto all'altro. La sidebar ha una larghezza fissa (240 pixel), mentre il contenuto con `flex: 1` occupa tutto lo spazio rimanente. `{children}` è il punto in cui Next.js inserisce la pagina corrente: navigando tra le pagine dentro `(account)` cambia solo quella parte, mentre la sidebar resta al suo posto.",
      },
    ],
  },

  "components-types": {
    sections: [
      {
        type: "text",
        content:
          "Next.js con l'App Router introduce una distinzione fondamentale: Server Components e Client Components. Capire quando usare l'uno o l'altro è essenziale per scrivere applicazioni performanti e corrette.",
      },
      {
        type: "heading",
        content: "Server Components: il default",
      },
      {
        type: "text",
        content:
          "Nell'App Router tutti i componenti sono Server Components per default. Vengono eseguiti solo sul server: il browser riceve HTML già renderizzato. Questo significa bundle più piccoli (il codice del componente non viene inviato al browser) e la possibilità di leggere dati direttamente da database, file e API interne. Un Server Component può anche essere una funzione `async` e usare `await` per caricare i dati prima di renderizzare.",
      },
      {
        type: "warning",
        content:
          "Nei Server Components NON puoi usare: useState, useEffect, useRef e gli altri hook React; event handler (onClick, onChange, ecc.); API del browser (window, document, localStorage); Context (useContext) e quindi nemmeno gli hook di Redux (useSelector, useDispatch).",
      },
      {
        type: "code",
        language: "javascript",
        title: "Esempio di Server Component",
        code: `// app/blog/page.js - Server Component (nessuna direttiva "use client")
import { Box, Typography } from "@mui/material";
import { getArticoli } from "../../lib/articoli"; // legge gli articoli dal database

// metadata è disponibile SOLO nei Server Components
export const metadata = {
  title: "Blog",
  description: "Tutti gli articoli",
};

export default async function BlogPage() {
  // Il codice gira sul server: possiamo attendere i dati prima del rendering
  const articoli = await getArticoli();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Articoli</Typography>
      {articoli.map((articolo) => (
        <Typography key={articolo.id}>{articolo.titolo}</Typography>
      ))}
    </Box>
  );
}`,
      },
      {
        type: "heading",
        content: 'Client Components: la direttiva "use client"',
      },
      {
        type: "text",
        content:
          'Per usare hook, stato, event handler o API del browser devi scrivere `"use client"` come prima riga del file. Questo trasforma il componente in un Client Component: viene eseguito (anche) nel browser e può gestire l\'interattività. Anche i componenti che usano Redux (`useSelector`, `useDispatch`) devono essere Client Components.',
      },
      {
        type: "code",
        language: "javascript",
        title: "Client Component con hook e interattività",
        code: `"use client";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { aggiungiAlCarrello } from "../store/carrelloSlice";

export default function BottoneCarrello({ prodotto }) {
  const dispatch = useDispatch();
  const numeroArticoli = useSelector((state) => state.carrello.prodotti.length);

  return (
    <Box sx={{ p: 2 }}>
      <Typography>Articoli nel carrello: {numeroArticoli}</Typography>
      <Button variant="contained" onClick={() => dispatch(aggiungiAlCarrello(prodotto))}>
        Aggiungi al carrello
      </Button>
    </Box>
  );
}`,
      },
      {
        type: "text",
        content:
          "Un Server Component può importare e renderizzare un Client Component: è il modo tipico di lavorare. La pagina (server) carica i dati e li passa come props ai piccoli componenti interattivi (client), come il bottone qui sopra.",
      },
      {
        type: "subheading",
        content: "Quando usare Server o Client",
      },
      {
        type: "list",
        items: [
          "Server Component: layout, pagine senza interattività, componenti che mostrano dati senza stato, accesso a database o API.",
          "Client Component: form, bottoni, filtri, qualsiasi componente con useState/useEffect, grafici interattivi, componenti collegati a Redux, navigazione da codice.",
        ],
      },
      {
        type: "subheading",
        content: "use() di React 19: leggere una Promise",
      },
      {
        type: "text",
        content:
          "Nelle versioni recenti di Next.js (15 e successive) le pagine ricevono i parametri dell'URL nella prop `params`, che però è una **Promise**. In un Server Component `async` basta scrivere `await params`. In un Client Component non si può usare `await` nel corpo del componente: React 19 offre l'hook `use()`, che \"scarta\" (unwrap) la Promise e restituisce il valore risolto.",
      },
      {
        type: "code",
        language: "javascript",
        title: "use() per i parametri di rotta",
        code: `"use client";
import { use } from "react";
import { Box, Typography } from "@mui/material";

// app/blog/[slug]/page.js  -  params è una Promise
export default function ArticoloPage({ params }) {
  const { slug } = use(params);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Articolo: {slug}</Typography>
    </Box>
  );
}

// Equivalente come Server Component:
// export default async function ArticoloPage({ params }) {
//   const { slug } = await params;
//   ...
// }`,
      },
      {
        type: "tip",
        content:
          'Mantieni Server Components il più possibile (layout e pagine) e aggiungi "use client" solo ai componenti che hanno davvero bisogno di interattività: meno JavaScript viene inviato al browser, più la pagina è veloce.',
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "Server vs Client Component",
        description: 'Quale di queste operazioni richiede obbligatoriamente "use client"?',
        difficulty: "facile",
        options: [
          "Esportare metadata",
          "Usare useState per gestire un filtro",
          "Caricare dati con await in una pagina",
          "Renderizzare HTML statico",
        ],
        correct: 1,
        explanation:
          'useState è un hook React che funziona solo nel browser. Qualsiasi componente che usa hook, event handler o API del browser deve avere "use client" in cima al file. Esportare metadata e usare await per caricare dati sono invece tipici dei Server Components.',
      },
      {
        type: "code",
        title: "Converti in Client Component",
        description:
          'Questo componente usa useState e onClick, ma manca la direttiva "use client". Aggiungila nel punto giusto per renderlo funzionante.',
        difficulty: "facile",
        mode: "static",
        starterCode: `import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <Box sx={{ p: 2, textAlign: "center" }}>
      <Typography variant="h5">Contatore: {count}</Typography>
      <Button variant="contained" onClick={() => setCount(count + 1)}>
        Incrementa
      </Button>
    </Box>
  );
}`,
        solution: `"use client";

import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <Box sx={{ p: 2, textAlign: "center" }}>
      <Typography variant="h5">Contatore: {count}</Typography>
      <Button variant="contained" onClick={() => setCount(count + 1)}>
        Incrementa
      </Button>
    </Box>
  );
}`,
        validate: `const c = $codeNoComments.trim();
if (!/["']use client["']/.test(c)) return 'Aggiungi la direttiva "use client"';
if (!/^["']use client["']\\s*;?/.test(c)) return '"use client" deve essere la PRIMA riga del file, prima degli import';
if (!/useState\\(\\s*0\\s*\\)/.test(c) || !/onClick/.test(c)) return "Non rimuovere il resto del componente: aggiungi solo la direttiva";
return true;`,
      },
      {
        type: "multiple-choice",
        title: "use() in React 19",
        description:
          "Perché in un Client Component di Next.js si scrive `const { slug } = use(params)`?",
        difficulty: "medio",
        options: [
          "Perché use() è più veloce di useEffect per leggere i parametri",
          "Perché use() sostituisce completamente useEffect",
          "Perché nelle versioni recenti di Next.js params è una Promise e use() ne restituisce il valore risolto",
          "Perché i Server Components richiedono use() per qualsiasi prop",
        ],
        correct: 2,
        explanation:
          "Da Next.js 15, i parametri delle route dinamiche (params) vengono passati come Promise. In un Server Component async si usa await params; in un Client Component, dove await non è disponibile nel corpo del componente, si usa l'hook use() di React 19. use() non ha niente a che vedere con la velocità né sostituisce useEffect, e i Server Components non ne hanno bisogno: possono usare direttamente await.",
      },
      {
        type: "multiple-choice",
        title: "Trova l'errore",
        description:
          "Questo file non ha la direttiva \"use client\":\n``\nimport { useState } from \"react\";\n\nexport default async function ProdottiPage() {\n  const prodotti = await getProdotti();\n  const [filtro, setFiltro] = useState(\"\");\n  return <ListaProdotti prodotti={prodotti} />;\n}\n``\nQual è il modo corretto di sistemarlo?",
        difficulty: "difficile",
        options: [
          "Aggiungere \"use client\" in cima e lasciare tutto com'è",
          "Togliere async e usare await solo dentro useState",
          "Spostare tutto in un useEffect",
          "Lasciare la pagina come Server Component che carica i dati e spostare useState in un Client Component figlio (ad esempio ListaProdotti con \"use client\")",
        ],
        correct: 3,
        explanation:
          "Una pagina senza \"use client\" è un Server Component: può essere `async` e caricare i dati con await, ma non può usare hook come useState. La soluzione tipica è dividere: la pagina (server) carica i dati e li passa come props a un piccolo Client Component che gestisce lo stato del filtro. Aggiungere solo \"use client\" non basta, perché nel corpo di un Client Component non si può usare await; await dentro useState non ha senso, e useEffect è anch'esso un hook, quindi non risolve il problema in un Server Component.",
      },
      {
        type: "multiple-choice",
        title: "Server o Client?",
        description:
          "Quale di questi componenti può restare un Server Component (senza \"use client\")?",
        difficulty: "facile",
        options: [
          "Una pagina che mostra l'elenco degli articoli letti dal database",
          "Un campo di ricerca che aggiorna i risultati mentre l'utente scrive",
          "Un bottone che aggiunge un prodotto al carrello di Redux",
          "Un componente che salva una preferenza in localStorage",
        ],
        correct: 0,
        explanation:
          "Mostrare dati senza interattività è il caso ideale per un Server Component: legge i dati sul server e invia al browser solo l'HTML. Il campo di ricerca ha bisogno di stato ed eventi (onChange), il bottone usa useDispatch di Redux e localStorage è un'API del browser: tutti e tre richiedono \"use client\".",
      },
    ],
  },

  "dynamic-routes": {
    sections: [
      {
        type: "text",
        content:
          "Le route dinamiche permettono di creare pagine il cui URL contiene segmenti variabili. Invece di creare una cartella per ogni possibile valore (un articolo, un prodotto, un utente...), si usa una sintassi speciale con le parentesi quadre.",
      },
      {
        type: "heading",
        content: "Segmenti dinamici: [param]",
      },
      {
        type: "text",
        content:
          "Una cartella con il nome tra parentesi quadre, come `[id]` o `[slug]`, definisce un segmento dinamico. Il valore presente nell'URL viene passato al componente di `page.js` dentro la prop `params`. Ad esempio, `app/blog/[slug]/page.js` gestisce URL come `/blog/ciao-mondo`, `/blog/guida-a-react`, ecc.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Segmento dinamico semplice",
        code: `// app/blog/[slug]/page.js
// URL: /blog/ciao-mondo  →  params = { slug: "ciao-mondo" }

export default async function ArticoloPage({ params }) {
  const { slug } = await params;

  return <h1>Stai leggendo: {slug}</h1>;
}`,
      },
      {
        type: "subheading",
        content: "Più segmenti dinamici",
      },
      {
        type: "text",
        content:
          "Puoi annidare più cartelle dinamiche: ogni segmento diventa una proprietà di `params`. Per un negozio online, `app/prodotti/[categoria]/[id]/page.js` risponde a URL come `/prodotti/libri/42`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Due segmenti dinamici annidati",
        code: `// app/prodotti/[categoria]/[id]/page.js
// URL: /prodotti/libri/42  →  params = { categoria: "libri", id: "42" }
import { notFound } from "next/navigation";
import { Box, Typography } from "@mui/material";
import { getProdotto } from "../../../../lib/prodotti";

export default async function ProdottoPage({ params }) {
  const { categoria, id } = await params;
  const prodotto = await getProdotto(id);

  // Se il prodotto non esiste mostriamo la pagina 404 (not-found.js)
  if (!prodotto) notFound();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="overline">{categoria}</Typography>
      <Typography variant="h4">{prodotto.nome}</Typography>
      <Typography>{prodotto.prezzo} €</Typography>
    </Box>
  );
}`,
      },
      {
        type: "subheading",
        content: "Catch-all routes: [...slug]",
      },
      {
        type: "text",
        content:
          "La sintassi `[...slug]` (con tre puntini) crea una rotta *catch-all*: cattura tutti i segmenti rimanenti dell'URL e li passa come **array**. È utile quando il numero di livelli è variabile, ad esempio per una documentazione: `/docs/react`, `/docs/react/hooks`, `/docs/react/hooks/use-state` sono gestiti tutti da un'unica `page.js`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Catch-all route per una documentazione",
        code: `// app/docs/[...slug]/page.js
// URL: /docs/react/hooks/use-state
// params = { slug: ["react", "hooks", "use-state"] }
import { Box, Stack, Typography } from "@mui/material";

export default async function DocsPage({ params }) {
  const { slug } = await params;
  const [sezione, ...resto] = slug;

  return (
    <Box sx={{ p: 4 }}>
      <Stack direction="row" spacing={1}>
        {slug.map((parte) => (
          <Typography key={parte}>{parte}</Typography>
        ))}
      </Stack>
      <Typography variant="h4">Sezione: {sezione}</Typography>
      <Typography>Livelli successivi: {resto.length}</Typography>
    </Box>
  );
}`,
      },
      {
        type: "text",
        content:
          "Le route dinamiche si combinano con i route group visti nella prima lezione: `app/(negozio)/prodotti/[categoria]/[id]/page.js` risponde ancora a `/prodotti/libri/42`, perché `(negozio)` non compare nell'URL.",
      },
      {
        type: "heading",
        content: "Navigazione: Link e useRouter",
      },
      {
        type: "text",
        content:
          "Next.js offre due modi principali per navigare: il componente `<Link>` (da `next/link`) per la navigazione dichiarativa, simile a un tag `<a>`, e l'hook `useRouter()` (da `next/navigation`) per la navigazione programmatica, cioè da codice JavaScript, ad esempio dopo il click su un bottone o l'invio di un form. `useRouter` è un hook, quindi si usa solo nei Client Components.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Link dichiarativo e navigazione programmatica",
        code: `"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Stack, Typography } from "@mui/material";

export default function Navigazione() {
  const router = useRouter();

  // Navigazione programmatica: utile dopo un'azione (es. invio di un form)
  const vaiAlProdotto = () => {
    const categoria = "libri";
    const id = 42;
    router.push(\`/prodotti/\${categoria}/\${id}\`);
  };

  return (
    <Stack spacing={2}>
      {/* Link dichiarativo: Next.js precarica la pagina in anticipo */}
      <Link href="/prodotti/libri">
        <Typography>Vai ai libri</Typography>
      </Link>

      {/* Navigazione programmatica */}
      <Button variant="contained" onClick={vaiAlProdotto}>
        Apri il prodotto 42
      </Button>
    </Stack>
  );
}`,
      },
      {
        type: "subheading",
        content: "usePathname: conoscere la rotta corrente",
      },
      {
        type: "text",
        content:
          "L'hook `usePathname()` restituisce il percorso corrente dell'URL (es. `\"/profilo/ordini\"`). È utilissimo per evidenziare il link attivo nella navigazione, applicare stili condizionali o eseguire logica basata sulla pagina corrente.",
      },
      {
        type: "code",
        language: "javascript",
        title: "usePathname per il link attivo nel menu",
        code: `"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Box, Typography } from "@mui/material";

const voci = [
  { label: "Profilo", href: "/profilo" },
  { label: "Ordini", href: "/profilo/ordini" },
  { label: "Impostazioni", href: "/profilo/impostazioni" },
];

export default function MenuProfilo() {
  const pathname = usePathname();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {voci.map((voce) => {
        const isActive = pathname === voce.href;
        return (
          <Link key={voce.href} href={voce.href} style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                p: 1,
                borderRadius: 1,
                bgcolor: isActive ? "primary.main" : "transparent",
                color: isActive ? "white" : "text.primary",
                fontWeight: isActive ? "bold" : "normal",
                "&:hover": { bgcolor: isActive ? "primary.dark" : "grey.100" },
              }}
            >
              {voce.label}
            </Typography>
          </Link>
        );
      })}
    </Box>
  );
}`,
      },
      {
        type: "subheading",
        content: "redirect(): reindirizzare prima ancora di mostrare la pagina",
      },
      {
        type: "text",
        content:
          "A volte una pagina non deve mostrare nulla, ma solo mandare l'utente altrove. La funzione `redirect()` di `next/navigation` fa proprio questo: si può chiamare in un Server Component (pagina o layout) e interrompe il rendering, rispondendo al browser con un reindirizzamento verso il percorso indicato. Come `notFound()`, non serve scrivere `return`: dopo `redirect()` il resto della funzione non viene eseguito.",
      },
      {
        type: "code",
        language: "javascript",
        title: "La root \"/\" che reindirizza a \"/prodotti\"",
        code: `// app/page.js  →  URL "/"
import { redirect } from "next/navigation";

export default function Home() {
  // Il negozio non ha una vera home: chi apre "/" finisce sull'elenco dei prodotti
  redirect("/prodotti");
}

// app/prodotti/page.js  →  URL "/prodotti"  (la pagina vera e propria)
// app/carrello/page.js  →  URL "/carrello"
// app/profilo/page.js   →  URL "/profilo"`,
      },
      {
        type: "text",
        content:
          "Perché non mettere direttamente il codice dell'elenco prodotti in `app/page.js`? Funzionerebbe, ma l'elenco avrebbe come indirizzo `/` invece di `/prodotti`. Con il redirect, invece, ogni sezione ha il proprio URL coerente (`/prodotti`, `/carrello`, `/profilo`): il menu può evidenziare la voce attiva confrontando `usePathname()` con `/prodotti`, i link condivisi sono chiari e, se un domani vorrai una vera home, ti basterà sostituire il redirect con una pagina senza spostare nulla.",
      },
      {
        type: "info",
        content:
          "`redirect()` va usato nei Server Components (o nel codice che gira sul server). In un Client Component, dopo un'azione dell'utente come il click su un bottone, si usa invece `router.push()` visto sopra.",
      },
      {
        type: "tip",
        content:
          "Preferisci `<Link>` per i normali collegamenti tra pagine (è accessibile e Next.js precarica la destinazione) e riserva `router.push()` ai casi in cui la navigazione dipende da un'azione o da una condizione nel codice.",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "Catch-all vs segmento singolo",
        description: "Qual è la differenza tra `[id]` e `[...slug]` nel routing di Next.js?",
        difficulty: "facile",
        options: [
          "Nessuna differenza, sono sinonimi",
          "[id] cattura un singolo segmento, [...slug] cattura tutti i segmenti rimanenti come array",
          "[...slug] è più veloce di [id]",
          "[id] funziona solo con numeri, [...slug] con qualsiasi stringa",
        ],
        correct: 1,
        explanation:
          "[id] cattura esattamente un segmento dell'URL (es. /prodotti/42 → id = '42'). [...slug] cattura uno o più segmenti come array (es. /docs/react/hooks → slug = ['react', 'hooks']).",
      },
      {
        type: "multiple-choice",
        title: "Cosa contiene params?",
        description:
          "Il file è `app/prodotti/[categoria]/[id]/page.js` e l'utente apre `/prodotti/libri/42`. Cosa stampa questo codice?\n``\nexport default async function ProdottoPage({ params }) {\n  const { categoria, id } = await params;\n  console.log(categoria, id, typeof id);\n  ...\n}\n``",
        difficulty: "medio",
        options: [
          "libri 42 number",
          "libri 42 string",
          "undefined undefined undefined",
          "[\"libri\", \"42\"] undefined undefined",
        ],
        correct: 1,
        explanation:
          "Ogni cartella dinamica diventa una proprietà di `params` con lo stesso nome: `categoria` vale \"libri\" e `id` vale \"42\". I valori presi dall'URL sono sempre **stringhe**, anche se sembrano numeri: per usarli come numeri va fatta una conversione (es. `Number(id)`). Non sono undefined, perché si è usato `await params`; un array si ottiene solo con una rotta catch-all `[...slug]`.",
      },
      {
        type: "multiple-choice",
        title: "Redirect o pagina nella root?",
        description:
          "Il tuo negozio ha le sezioni Prodotti, Carrello e Profilo, ma nessuna vera home. Qual è l'approccio migliore per la root `/`?",
        difficulty: "medio",
        options: [
          "Mettere `redirect(\"/prodotti\")` in `app/page.js` e la pagina dell'elenco in `app/prodotti/page.js`",
          "Copiare il codice dell'elenco prodotti sia in `app/page.js` sia in `app/prodotti/page.js`",
          "Mettere l'elenco prodotti in `app/page.js`, così l'indirizzo della sezione Prodotti è `/`",
          "Usare `router.push(\"/prodotti\")` in `app/page.js` senza \"use client\"",
        ],
        correct: 0,
        explanation:
          "Con `redirect()` chi apre `/` viene mandato subito a `/prodotti` e ogni sezione ha il proprio URL coerente, utile anche per evidenziare la voce attiva del menu. Mettere l'elenco nella root funziona, ma la sezione Prodotti avrebbe l'indirizzo `/`, diverso dallo schema delle altre; duplicare il codice crea due pagine identiche da mantenere. `useRouter` è un hook: senza \"use client\" non si può usare, e comunque in una pagina server il modo corretto è `redirect()`.",
      },
      {
        type: "multiple-choice",
        title: "Link o router.push?",
        description:
          "Quale situazione è più adatta a `router.push()` invece che a `<Link>`?",
        difficulty: "facile",
        options: [
          "Una voce del menu di navigazione verso /profilo",
          "Il titolo di un articolo che porta alla sua pagina",
          "Il logo in alto che riporta alla home",
          "Portare l'utente alla pagina dell'ordine dopo che l'invio del form è andato a buon fine",
        ],
        correct: 3,
        explanation:
          "La navigazione dopo l'invio di un form dipende da un'azione e dal suo esito: va decisa nel codice, quindi `router.push()`. Le voci di menu, i titoli e il logo sono normali collegamenti: con `<Link>` sono accessibili (si possono aprire in una nuova scheda) e Next.js precarica la destinazione.",
      },
      {
        type: "code",
        title: "Navigazione con useRouter",
        description:
          "Il componente `ApriProdotto` riceve le props `categoria` e `id`. Completa `handleNavigate` in modo che usi `router.push()` per andare alla rotta `/prodotti/{categoria}/{id}` (es. `/prodotti/libri/42`). Puoi costruire il percorso con un template literal o con la concatenazione.",
        difficulty: "medio",
        mode: "static",
        starterCode: `"use client";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

export default function ApriProdotto({ categoria, id }) {
  const router = useRouter();

  const handleNavigate = () => {
    // Completa la navigazione programmatica
  };

  return (
    <Button variant="contained" onClick={handleNavigate}>
      Vedi il prodotto
    </Button>
  );
}`,
        solution: `"use client";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

export default function ApriProdotto({ categoria, id }) {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(\`/prodotti/\${categoria}/\${id}\`);
  };

  return (
    <Button variant="contained" onClick={handleNavigate}>
      Vedi il prodotto
    </Button>
  );
}`,
        validate: `const c = $codeNoComments;
if (!/const\\s+router\\s*=\\s*useRouter\\(\\s*\\)/.test(c)) return "Ottieni il router con const router = useRouter()";
const m = c.match(/router\\.push\\(([\\s\\S]*?)\\)\\s*;?\\s*\\n/);
if (!m) return "Dentro handleNavigate chiama router.push(...) con il percorso";
const arg = m[1].replace(/\\s+/g, "");
const tpl = /^\`\\/prodotti\\/\\$\\{categoria\\}\\/\\$\\{id\\}\`$/.test(arg);
const concat = /^["']\\/prodotti\\/["']\\+categoria\\+["']\\/["']\\+id$/.test(arg);
if (!tpl && !concat) {
  if (!/categoria/.test(arg) || !/id/.test(arg)) return "Il percorso deve usare entrambe le props: categoria e id";
  return "Il percorso deve essere /prodotti/{categoria}/{id}, ad esempio \`/prodotti/\${categoria}/\${id}\`";
}
if (!/onClick=\\{\\s*handleNavigate\\s*\\}/.test(c)) return "Il Button deve chiamare handleNavigate al click (onClick={handleNavigate})";
return true;`,
        solutionExplanation:
          "`useRouter()` restituisce l'oggetto router, e `router.push(percorso)` naviga verso quel percorso senza ricaricare la pagina. Il percorso si costruisce a partire dalle props: con un template literal (`/prodotti/${categoria}/${id}` tra backtick) oppure con `\"/prodotti/\" + categoria + \"/\" + id` ottieni ad esempio `/prodotti/libri/42`, che viene gestito dalla rotta dinamica `app/prodotti/[categoria]/[id]/page.js`.",
      },
      {
        type: "code",
        title: "Link attivo con usePathname",
        description:
          "Completa il componente `NavLink`:\n- crea una costante `isActive` che vale `true` quando il `pathname` corrente è uguale all'`href` del link;\n- nell'`sx` del `Typography` usa `isActive` con l'operatore ternario per impostare `bgcolor` (`\"primary.main\"` se attivo, `\"transparent\"` altrimenti) e `color` (`\"white\"` se attivo, `\"text.primary\"` altrimenti).",
        difficulty: "difficile",
        mode: "static",
        starterCode: `"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Typography } from "@mui/material";

export default function NavLink({ href, label }) {
  const pathname = usePathname();
  // Determina se il link è attivo

  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Typography
        sx={{
          p: 1,
          borderRadius: 1,
          // Applica stili diversi in base a isActive
        }}
      >
        {label}
      </Typography>
    </Link>
  );
}`,
        solution: `"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Typography } from "@mui/material";

export default function NavLink({ href, label }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Typography
        sx={{
          p: 1,
          borderRadius: 1,
          bgcolor: isActive ? "primary.main" : "transparent",
          color: isActive ? "white" : "text.primary",
          fontWeight: isActive ? "bold" : "normal",
        }}
      >
        {label}
      </Typography>
    </Link>
  );
}`,
        validate: `const c = $codeNoComments;
if (!/const\\s+pathname\\s*=\\s*usePathname\\(\\s*\\)/.test(c)) return "Mantieni const pathname = usePathname()";
if (!/const\\s+isActive\\s*=\\s*(\\(?\\s*pathname\\s*===?\\s*href|\\(?\\s*href\\s*===?\\s*pathname)/.test(c)) return "Definisci const isActive = pathname === href";
if (!/bgcolor\\s*:\\s*isActive\\s*\\?\\s*["']primary\\.main["']\\s*:\\s*["']transparent["']/.test(c)) return 'Imposta bgcolor: isActive ? "primary.main" : "transparent"';
if (!/color\\s*:\\s*isActive\\s*\\?\\s*["']white["']\\s*:\\s*["']text\\.primary["']/.test(c)) return 'Imposta color: isActive ? "white" : "text.primary"';
return true;`,
        solutionExplanation:
          "`usePathname()` restituisce il percorso della pagina aperta, per esempio `\"/profilo/ordini\"`. Confrontandolo con `href` si ottiene un booleano, `isActive`, che poi guida gli stili con l'operatore ternario: colore primario e testo bianco per il link attivo, sfondo trasparente per gli altri. Poiché `usePathname` è un hook, il componente deve essere un Client Component (\"use client\").",
      },
    ],
  },

  "route-handlers": {
    sections: [
      {
        type: "text",
        content:
          "Finora ogni rotta di Next.js restituiva un'interfaccia: un `page.js` con un componente React. A volte però serve un indirizzo che restituisca **dati** invece di una pagina, per esempio l'elenco dei prodotti in formato JSON da caricare con una richiesta HTTP. Per questo Next.js offre i **Route Handlers**: piccole funzioni che girano sul server, ricevono una richiesta e restituiscono una risposta. In pratica permettono di scrivere delle API dentro la stessa applicazione Next.js.",
      },
      {
        type: "heading",
        content: "Il file route.js",
      },
      {
        type: "text",
        content:
          "Un Route Handler si definisce in un file `route.js` dentro la cartella `app/`, con le stesse regole delle pagine: il percorso delle cartelle diventa l'URL. Per convenzione si raccolgono tutti gli endpoint sotto `app/api/`, così il loro indirizzo comincia con `/api/` e non si confonde con quello delle pagine. Nella stessa cartella non possono esserci sia `page.js` sia `route.js`: un indirizzo è o una pagina o un endpoint.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Endpoint organizzati sotto app/api/",
        code: `// app/
// ├── page.js                      →  pagina  /
// ├── prodotti/page.js             →  pagina  /prodotti
// └── api/
//     ├── health/route.js          →  endpoint /api/health
//     ├── prodotti/route.js        →  endpoint /api/prodotti
//     └── prodotti/[id]/route.js   →  endpoint /api/prodotti/42`,
      },
      {
        type: "subheading",
        content: "Una funzione per ogni metodo HTTP",
      },
      {
        type: "text",
        content:
          "Dentro `route.js` non c'è un `export default`: si esporta una funzione per ogni **metodo HTTP** che l'endpoint accetta, con il nome del metodo in maiuscolo: `GET` (leggere), `POST` (creare), `PUT` (modificare), `DELETE` (eliminare). Se il client usa un metodo per cui non hai esportato nessuna funzione, Next.js risponde da solo con lo status `405 Method Not Allowed`. Ogni funzione può essere `async` e deve restituire un oggetto `Response`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "app/api/health/route.js: un endpoint di health check",
        code: `// GET /api/health
// Risponde sempre { status: "ok" }: serve a sapere se l'applicazione è attiva
// (lo usano ad esempio i servizi di monitoraggio o di deploy)
export async function GET() {
  return Response.json({ status: "ok" }, { status: 200 });
}`,
      },
      {
        type: "info",
        content:
          "`Request` e `Response` non sono invenzioni di Next.js: sono gli stessi oggetti standard usati da `fetch` nel browser. Il Route Handler riceve un `Request` (la richiesta del client) e restituisce un `Response` (la risposta).",
      },
      {
        type: "heading",
        content: "Leggere la richiesta: query param e body",
      },
      {
        type: "text",
        content:
          "La funzione riceve come primo argomento l'oggetto `Request`. La sua proprietà `url` è l'indirizzo completo in formato stringa (es. `\"http://localhost:3000/api/prodotti?categoria=libri\"`). Per leggere i **query param** (la parte dopo `?`) si crea un oggetto `URL` con `new URL(req.url)` e si usa `searchParams.get(\"nome\")`, che restituisce il valore come stringa, oppure `null` se il parametro manca. Per una richiesta `POST` o `PUT` il **body** JSON si legge con `await req.json()`, che restituisce l'oggetto JavaScript già convertito.",
      },
      {
        type: "code",
        language: "javascript",
        title: "URL e searchParams (JavaScript puro, funziona anche nel browser)",
        code: `const url = new URL("http://localhost:3000/api/prodotti?categoria=libri&pagina=2");

console.log(url.pathname);                      // "/api/prodotti"
console.log(url.searchParams.get("categoria")); // "libri"
console.log(url.searchParams.get("pagina"));    // "2"  (sempre una stringa!)
console.log(url.searchParams.get("ordine"));    // null (il parametro non c'è)`,
      },
      {
        type: "code",
        language: "javascript",
        title: "app/api/prodotti/route.js: GET con filtro e POST con body",
        code: `const prodotti = [
  { id: 1, nome: "Il nome della rosa", categoria: "libri", prezzo: 12 },
  { id: 2, nome: "Cuffie wireless", categoria: "elettronica", prezzo: 59 },
  { id: 3, nome: "Il piccolo principe", categoria: "libri", prezzo: 9 },
];

// GET /api/prodotti?categoria=libri
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const categoria = searchParams.get("categoria");

  const risultato = categoria
    ? prodotti.filter((p) => p.categoria === categoria)
    : prodotti;

  return Response.json(risultato);
}

// POST /api/prodotti   con body { "nome": "...", "categoria": "...", "prezzo": 10 }
export async function POST(req) {
  const nuovo = await req.json();

  if (!nuovo.nome) {
    return Response.json({ error: "Il nome è obbligatorio" }, { status: 400 });
  }

  const creato = { ...nuovo, id: prodotti.length + 1 };
  prodotti.push(creato);
  return Response.json(creato, { status: 201 });
}`,
      },
      {
        type: "text",
        content:
          "Un Route Handler può stare anche in una cartella dinamica, come una pagina. In `app/api/prodotti/[id]/route.js` la funzione riceve un secondo argomento con `params`, che anche qui è una Promise: si scrive `const { id } = await params`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "app/api/prodotti/[id]/route.js: PUT e DELETE",
        code: `// PUT /api/prodotti/42   → modifica il prodotto 42
export async function PUT(req, { params }) {
  const { id } = await params;          // "42" (stringa)
  const modifiche = await req.json();
  // ...salva le modifiche...
  return Response.json({ id: Number(id), ...modifiche });
}

// DELETE /api/prodotti/42   → elimina il prodotto 42
export async function DELETE(req, { params }) {
  const { id } = await params;
  // ...elimina il prodotto...
  return new Response(null, { status: 204 }); // 204: nessun contenuto da restituire
}`,
      },
      {
        type: "heading",
        content: "Costruire la risposta",
      },
      {
        type: "text",
        content:
          "Ci sono tre modi equivalenti per restituire JSON, che incontrerai tutti nel codice reale:",
      },
      {
        type: "list",
        items: [
          "`Response.json(dati, { status })` — il più breve: converte i dati in JSON e imposta da solo l'header `Content-Type: application/json`. Se ometti `status` vale 200.",
          "`new Response(JSON.stringify(dati), { status, headers })` — la forma \"manuale\": il body è una stringa che converti tu con `JSON.stringify`, e gli header li scrivi tu (ricordati `\"Content-Type\": \"application/json\"`).",
          "`NextResponse.json(dati, { status })` — importato da `next/server`: si usa come `Response.json`, ma l'oggetto `NextResponse` offre in più alcune comodità di Next.js (ad esempio per i cookie).",
        ],
      },
      {
        type: "code",
        language: "javascript",
        title: "Tre risposte equivalenti",
        code: `import { NextResponse } from "next/server";

// Dentro GET basta UNA di queste tre righe: producono la stessa risposta
export async function GET() {
  const dati = { status: "ok" };

  // 1. Response.json
  return Response.json(dati, { status: 200 });

  // 2. new Response con JSON.stringify e header espliciti
  // return new Response(JSON.stringify(dati), {
  //   status: 200,
  //   headers: { "Content-Type": "application/json" },
  // });

  // 3. NextResponse.json
  // return NextResponse.json(dati, { status: 200 });
}`,
      },
      {
        type: "heading",
        content: "Leggere gli header con headers()",
      },
      {
        type: "text",
        content:
          "Gli header della richiesta (ad esempio `Authorization`, che contiene il token dell'utente) si leggono con la funzione `headers()` importata da `next/headers`. Nelle versioni recenti di Next.js `headers()` è **asincrona**: restituisce una Promise, quindi si scrive `const reqHeaders = await headers()`. L'oggetto ottenuto ha un metodo `get(nome)` che non distingue maiuscole e minuscole (`get(\"authorization\")` e `get(\"Authorization\")` sono uguali) e restituisce `null` se l'header manca.",
      },
      {
        type: "code",
        language: "javascript",
        title: "app/api/profilo/route.js: leggere l'header Authorization",
        code: `import { headers } from "next/headers";

export async function GET() {
  const reqHeaders = await headers();
  const auth = reqHeaders.get("authorization"); // es. "Bearer abc123" oppure null

  if (!auth) {
    return Response.json({ error: "Accesso non autorizzato" }, { status: 401 });
  }

  return Response.json({ nome: "Giulia", ordini: 3 });
}`,
      },
      {
        type: "heading",
        content: "Il pattern proxy (Backend For Frontend)",
      },
      {
        type: "text",
        content:
          "Spesso i dati veri non stanno in Next.js ma in un **backend** separato (un altro server, magari scritto in un altro linguaggio). Il browser potrebbe chiamarlo direttamente, ma nascono due problemi: il backend ha un indirizzo diverso dall'app, quindi il browser applica le regole **CORS** e blocca la richiesta se il backend non è configurato per accettarla; e qualsiasi chiave segreta usata per parlare con il backend finirebbe nel codice del browser, visibile a chiunque.",
      },
      {
        type: "text",
        content:
          "La soluzione è il pattern **proxy** (detto anche *BFF*, Backend For Frontend): il browser chiama solo i Route Handler della propria app (`/api/prodotti`, stesso indirizzo, quindi niente CORS) e il Route Handler, che gira sul server, **inoltra** la richiesta al backend vero e restituisce la sua risposta. L'indirizzo del backend e gli eventuali segreti restano sul server.",
      },
      {
        type: "code",
        language: "text",
        title: "Il percorso di una richiesta",
        code: `Browser  ──GET /api/prodotti──▶  Route Handler (server Next.js)  ──GET /prodotti──▶  Backend
Browser  ◀──── stessa risposta ────  Route Handler  ◀──────── status + JSON ────────  Backend`,
      },
      {
        type: "text",
        content:
          "Per parlare con il backend usiamo axios, visto nella lezione sulle richieste HTTP. Conviene creare un'**istanza** con `axios.create({ baseURL })`: tutte le richieste fatte con quell'istanza useranno l'indirizzo base indicato, così nei Route Handler basta scrivere il percorso relativo. L'indirizzo arriva da una variabile d'ambiente, `process.env.API_URL` (le variabili d'ambiente sono l'argomento della prossima lezione).",
      },
      {
        type: "code",
        language: "javascript",
        title: "lib/backend.js: l'istanza axios usata solo sul server",
        code: `import axios from "axios";

// Es. API_URL=http://localhost:8080 → backend.get("/prodotti") chiama http://localhost:8080/prodotti
const backend = axios.create({ baseURL: process.env.API_URL });

export default backend;`,
      },
      {
        type: "code",
        language: "javascript",
        title: "app/api/prodotti/route.js: proxy verso il backend",
        code: `import { headers } from "next/headers";
import backend from "@/lib/backend"; // "@/" è un alias per la cartella src/ (lo vedremo nella prossima lezione)

// GET /api/prodotti?categoria=libri  →  GET <backend>/prodotti?categoria=libri
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const categoria = searchParams.get("categoria");

    // Inoltra l'header Authorization solo se il client l'ha inviato
    const reqHeaders = await headers();
    const auth = reqHeaders.get("authorization");
    const headersDaInoltrare = {};
    if (auth) {
      headersDaInoltrare["Authorization"] = auth;
    }

    const response = await backend.get("/prodotti", {
      params: { categoria },
      headers: headersDaInoltrare,
    });

    // Restituisce al browser dati e status del backend, senza modificarli
    return Response.json(response.data, { status: response.status });
  } catch (error) {
    console.error("Errore nella comunicazione con il backend:", error.message);

    const status = error.response ? error.response.status : 500;
    const body =
      error.response && error.response.data
        ? error.response.data
        : { error: error.message || "Errore di comunicazione con il backend" };

    return Response.json(body, { status });
  }
}`,
      },
      {
        type: "subheading",
        content: "Gestire gli errori del backend",
      },
      {
        type: "text",
        content:
          "Ricorda che axios **lancia un errore** quando il backend risponde con uno status di errore (4xx o 5xx). Nel `catch` ci sono quindi due casi da distinguere:",
      },
      {
        type: "list",
        items: [
          "**Il backend ha risposto con un errore** (es. 404 \"Prodotto non trovato\" o 400 \"Dati non validi\"): `error.response` esiste e contiene `status` e `data`. Il proxy li inoltra così come sono, perché il frontend ha bisogno di sapere cosa è andato storto.",
          "**Il backend non è raggiungibile** (spento, indirizzo sbagliato, rete assente): non c'è nessuna risposta, quindi `error.response` è `undefined`. Il proxy risponde `500` con un messaggio d'errore preso da `error.message` (es. `\"connect ECONNREFUSED\"`).",
        ],
      },
      {
        type: "code",
        language: "javascript",
        title: "POST inoltrato con il body",
        code: `import backend from "@/lib/backend";

// POST /api/ordini  →  POST <backend>/ordini, con lo stesso body
export async function POST(req) {
  try {
    const body = await req.json();
    const response = await backend.post("/ordini", body);
    return Response.json(response.data, { status: response.status });
  } catch (error) {
    const status = error.response ? error.response.status : 500;
    const body =
      error.response && error.response.data
        ? error.response.data
        : { error: error.message || "Errore di comunicazione con il backend" };
    return Response.json(body, { status });
  }
}`,
      },
      {
        type: "tip",
        content:
          "Quando la stessa gestione degli errori si ripete in molti Route Handler, spostala in una funzione di utilità (es. `toErrorResponse(error)`) e riusala ovunque: se un giorno cambi il formato dei messaggi d'errore, lo modifichi in un solo punto.",
      },
      {
        type: "heading",
        content: "Lato client: chiamare /api/...",
      },
      {
        type: "text",
        content:
          "Nel browser si raccolgono le chiamate in un file di funzioni, una per operazione, che usano percorsi **relativi** come `/api/prodotti`: il browser li invia allo stesso indirizzo da cui è stata caricata la pagina, cioè alla nostra app Next.js. I componenti non sanno nulla del backend vero: chiamano `getProducts()` e ricevono i dati.",
      },
      {
        type: "code",
        language: "javascript",
        title: "lib/api.js e un Client Component che lo usa",
        code: `// lib/api.js  (usato dai Client Components)
import axios from "axios";

const api = axios.create({ baseURL: "/api" });

export async function getProducts(categoria) {
  const response = await api.get("/prodotti", { params: { categoria } });
  return response.data;
}

export async function createOrder(ordine) {
  const response = await api.post("/ordini", ordine);
  return response.data;
}

// components/ListaProdotti.js
"use client";
import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";

export default function ListaProdotti() {
  const [prodotti, setProdotti] = useState([]);
  const [errore, setErrore] = useState(null);

  useEffect(() => {
    getProducts("libri")
      .then(setProdotti)
      .catch((err) => setErrore(err.response ? err.response.data.error : err.message));
  }, []);

  if (errore) return <p>Errore: {errore}</p>;
  return (
    <ul>
      {prodotti.map((p) => <li key={p.id}>{p.nome}</li>)}
    </ul>
  );
}`,
      },
      {
        type: "info",
        content:
          "I Route Handler servono al **browser**. Un Server Component gira già sul server: se deve caricare dei dati può chiamare direttamente il backend (o il database) senza passare da `/api/...`, risparmiando un passaggio.",
      },
      {
        type: "warning",
        content:
          "Un `route.js` è codice pubblico raggiungibile da chiunque conosca l'URL: controlla sempre i dati ricevuti (query param e body) e non restituire mai informazioni riservate senza verificare l'autorizzazione.",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "Metodo non gestito",
        description:
          "Il file `app/api/prodotti/route.js` esporta solo le funzioni `GET` e `POST`. Cosa succede se un client invia una richiesta `DELETE /api/prodotti`?",
        difficulty: "facile",
        options: [
          "Viene eseguita la funzione GET",
          "Viene mostrata la pagina 404 dell'app",
          "Next.js risponde automaticamente con lo status 405 Method Not Allowed",
          "Il server si blocca con un errore",
        ],
        correct: 2,
        explanation:
          "Ogni metodo HTTP corrisponde a una funzione esportata con lo stesso nome. Se la funzione per quel metodo non esiste, Next.js risponde da solo con 405 (metodo non consentito). GET non viene usata al posto di DELETE, la rotta esiste quindi non è un 404, e il server non si blocca.",
      },
      {
        type: "multiple-choice",
        title: "Il backend risponde con un errore",
        description:
          "Il proxy usa questa regola nel `catch`:\n``\nconst status = error.response ? error.response.status : 500;\n``\nIl backend risponde `404` con il body `{ message: \"Prodotto non trovato\" }`. Cosa riceve il browser se il body viene inoltrato con la regola vista nella lezione?",
        difficulty: "medio",
        options: [
          "Status 404 con body { message: \"Prodotto non trovato\" }",
          "Status 500 con body { error: \"Request failed with status code 404\" }",
          "Status 200 con body vuoto, perché il proxy ha gestito l'errore",
          "Nessuna risposta: l'errore di axios blocca il Route Handler",
        ],
        correct: 0,
        explanation:
          "Il backend ha risposto, quindi `error.response` esiste: lo status inoltrato è `error.response.status` (404) e il body è `error.response.data`. Il 500 con `error.message` si usa solo quando il backend non risponde affatto. Gestire l'errore nel `catch` non significa trasformarlo in un successo: il frontend deve sapere che il prodotto non esiste.",
      },
      {
        type: "multiple-choice",
        title: "Backend spento",
        description:
          "Il backend è spento e axios lancia un errore con `message: \"connect ECONNREFUSED\"`. Quanto vale `error.response`?",
        difficulty: "medio",
        options: [
          "Un oggetto con status 503",
          "Un oggetto con status 404",
          "La stringa \"connect ECONNREFUSED\"",
          "`undefined`, perché non è arrivata nessuna risposta: il proxy risponde 500",
        ],
        correct: 3,
        explanation:
          "`error.response` esiste solo se il backend ha effettivamente risposto. Se il server è irraggiungibile non c'è nessuna risposta, quindi `error.response` è `undefined` e la regola `error.response ? error.response.status : 500` restituisce 500. Il messaggio dell'errore sta in `error.message`, non in `error.response`.",
      },
      {
        type: "multiple-choice",
        title: "Perché un proxy?",
        description:
          "Perché il browser chiama `/api/prodotti` (un Route Handler) invece di chiamare direttamente `http://backend.interno:8080/prodotti`?",
        difficulty: "facile",
        options: [
          "Perché i Route Handler rendono le richieste più veloci",
          "Perché la richiesta va allo stesso indirizzo dell'app (niente problemi di CORS) e l'indirizzo del backend e i segreti restano sul server",
          "Perché il browser non sa fare richieste HTTP verso altri server",
          "Perché axios funziona solo dentro i Route Handler",
        ],
        correct: 1,
        explanation:
          "Il proxy esiste per due motivi: il browser parla solo con la propria app, quindi le regole CORS non si applicano, e tutto ciò che riguarda il backend (indirizzo, chiavi) resta nel codice server. Non è più veloce (anzi, aggiunge un passaggio), il browser sa chiamare altri server (ma con le restrizioni CORS), e axios funziona anche nel browser.",
      },
      {
        type: "multiple-choice",
        title: "Trova l'errore",
        description:
          "Questo Route Handler non riesce mai a leggere l'header:\n``\nimport { headers } from \"next/headers\";\n\nexport async function GET() {\n  const reqHeaders = headers();\n  const auth = reqHeaders.get(\"authorization\");\n  return Response.json({ auth });\n}\n``\nQual è il problema?",
        difficulty: "medio",
        options: [
          "Bisogna scrivere get(\"Authorization\") con la A maiuscola",
          "headers() va importata da \"next/server\"",
          "Manca await: headers() restituisce una Promise, quindi serve const reqHeaders = await headers()",
          "Response.json non accetta un oggetto",
        ],
        correct: 2,
        explanation:
          "Nelle versioni recenti di Next.js `headers()` è asincrona: senza `await`, `reqHeaders` è una Promise e non contiene i veri header. Il metodo `get` non distingue maiuscole e minuscole, `headers` si importa proprio da `next/headers` (da `next/server` si importa `NextResponse`) e `Response.json` accetta qualsiasi valore convertibile in JSON.",
      },
      {
        type: "code",
        title: "toErrorResponse: la risposta d'errore del proxy",
        description:
          "Scrivi la funzione `toErrorResponse(error)` che, dato l'errore lanciato da axios, restituisce un oggetto `{ status, body }` con la stessa regola vista nella lezione:\n- `status`: `error.response.status` se `error.response` esiste, altrimenti `500`;\n- `body`: `error.response.data` se esiste una risposta con dei dati, altrimenti un oggetto `{ error: messaggio }` dove `messaggio` è `error.message`, oppure `\"Errore di comunicazione con il backend\"` se `error.message` è vuoto.\n\nGli errori di prova sono oggetti normali che imitano quelli di axios.",
        difficulty: "medio",
        starterCode: `function toErrorResponse(error) {
  // 1. Calcola lo status
  // 2. Calcola il body
  // 3. Restituisci { status, body }
}

// Prove
console.log(toErrorResponse({
  message: "Request failed with status code 404",
  response: { status: 404, data: { message: "Prodotto non trovato" } },
}));
console.log(toErrorResponse({ message: "connect ECONNREFUSED" }));`,
        solution: `function toErrorResponse(error) {
  const status = error.response ? error.response.status : 500;
  const body =
    error.response && error.response.data
      ? error.response.data
      : { error: error.message || "Errore di comunicazione con il backend" };
  return { status, body };
}

// Prove
console.log(toErrorResponse({
  message: "Request failed with status code 404",
  response: { status: 404, data: { message: "Prodotto non trovato" } },
}));
console.log(toErrorResponse({ message: "connect ECONNREFUSED" }));`,
        validate: `if (typeof toErrorResponse !== "function") return "Definisci la funzione toErrorResponse(error)";
const r1 = toErrorResponse({ message: "Request failed with status code 404", response: { status: 404, data: { message: "Prodotto non trovato" } } });
if (!r1 || typeof r1 !== "object") return "toErrorResponse deve restituire un oggetto { status, body }";
if (r1.status !== 404) return "Se il backend ha risposto (error.response esiste), status deve essere error.response.status: qui 404";
if (!$equal(r1.body, { message: "Prodotto non trovato" })) return "Se il backend ha risposto con dei dati, il body deve essere error.response.data così com'è";
const r2 = toErrorResponse({ message: "connect ECONNREFUSED" });
if (r2.status !== 500) return "Se error.response non esiste (backend irraggiungibile), status deve essere 500";
if (!$equal(r2.body, { error: "connect ECONNREFUSED" })) return "Senza risposta dal backend il body deve essere { error: error.message }";
const r3 = toErrorResponse({ message: "", response: { status: 503 } });
if (r3.status !== 503) return "Con error.response = { status: 503 } lo status deve essere 503, anche se non ci sono dati";
if (!$equal(r3.body, { error: "Errore di comunicazione con il backend" })) return "Se mancano sia error.response.data sia error.message, il body deve essere { error: \\"Errore di comunicazione con il backend\\" }";
const r4 = toErrorResponse({ message: "Request failed", response: { status: 400, data: { campo: "prezzo", errore: "deve essere positivo" } } });
if (r4.status !== 400 || !$equal(r4.body, { campo: "prezzo", errore: "deve essere positivo" })) return "Controlla il caso con status 400: status e body devono essere quelli del backend";
return true;`,
        solutionExplanation:
          "Lo status dipende solo dall'esistenza di `error.response`: se c'è, il backend ha risposto e il suo status va inoltrato; se manca, il backend non è raggiungibile e si usa 500. Per il body serve un controllo in più (`error.response && error.response.data`), perché il backend può rispondere con un errore senza dati. Nel caso di riserva, `error.message || \"...\"` usa il messaggio di riserva quando `error.message` è una stringa vuota o manca.",
      },
      {
        type: "code",
        title: "Header da inoltrare",
        description:
          "Scrivi la funzione `buildForwardHeaders(reqHeaders)`. Riceve un oggetto `Headers` (lo stesso tipo restituito da `await headers()`, con il metodo `get(nome)` che restituisce il valore oppure `null`) e restituisce un oggetto normale con gli header da inoltrare al backend, **solo se presenti** nella richiesta:\n- `authorization` → chiave `Authorization`;\n- `accept-language` → chiave `Accept-Language`.\n\nSe un header manca, la sua chiave non deve comparire affatto nell'oggetto.",
        difficulty: "medio",
        starterCode: `function buildForwardHeaders(reqHeaders) {
  const result = {};
  // Aggiungi Authorization e Accept-Language solo se presenti
  return result;
}

// Prove: new Headers({...}) crea un oggetto Headers come quello di una richiesta
console.log(buildForwardHeaders(new Headers({ authorization: "Bearer abc123", "accept-language": "it-IT" })));
console.log(buildForwardHeaders(new Headers({})));`,
        solution: `function buildForwardHeaders(reqHeaders) {
  const result = {};

  const auth = reqHeaders.get("authorization");
  if (auth) {
    result["Authorization"] = auth;
  }

  const lingua = reqHeaders.get("accept-language");
  if (lingua) {
    result["Accept-Language"] = lingua;
  }

  return result;
}

// Prove: new Headers({...}) crea un oggetto Headers come quello di una richiesta
console.log(buildForwardHeaders(new Headers({ authorization: "Bearer abc123", "accept-language": "it-IT" })));
console.log(buildForwardHeaders(new Headers({})));`,
        validate: `if (typeof buildForwardHeaders !== "function") return "Definisci la funzione buildForwardHeaders(reqHeaders)";
const h1 = buildForwardHeaders(new Headers({ authorization: "Bearer abc123", "accept-language": "it-IT" }));
if (!h1 || typeof h1 !== "object") return "buildForwardHeaders deve restituire un oggetto";
if (h1.Authorization !== "Bearer abc123") return "Con l'header authorization presente, l'oggetto deve avere Authorization: \\"Bearer abc123\\" (leggilo con reqHeaders.get(\\"authorization\\"))";
if (h1["Accept-Language"] !== "it-IT") return "Con l'header accept-language presente, l'oggetto deve avere \\"Accept-Language\\": \\"it-IT\\"";
const h2 = buildForwardHeaders(new Headers({}));
if (Object.keys(h2).length !== 0) return "Se la richiesta non ha header, restituisci un oggetto vuoto {}: non aggiungere chiavi con valore null o undefined";
const h3 = buildForwardHeaders(new Headers({ Authorization: "Bearer xyz" }));
if (!$equal(h3, { Authorization: "Bearer xyz" })) return "Con solo l'header Authorization il risultato deve essere { Authorization: \\"Bearer xyz\\" }, senza Accept-Language";
const h4 = buildForwardHeaders(new Headers({ "Accept-Language": "en-US" }));
if (!$equal(h4, { "Accept-Language": "en-US" })) return "Con solo Accept-Language il risultato deve essere { \\"Accept-Language\\": \\"en-US\\" }";
return true;`,
        solutionExplanation:
          "`get` restituisce `null` quando l'header manca, e `null` è falsy: con `if (valore)` la chiave viene aggiunta solo se l'header c'è davvero. Il metodo `get` di `Headers` non distingue maiuscole e minuscole, quindi `get(\"authorization\")` trova anche un header inviato come `Authorization`. Così il backend riceve solo gli header utili, senza valori `null`.",
      },
      {
        type: "code",
        title: "Leggere i query param",
        description:
          "Scrivi la funzione `parseProductQuery(url)` che riceve un URL completo (stringa) e restituisce un oggetto `{ categoria, pagina, ricerca }`:\n- `categoria`: il parametro `categoria`, oppure `null` se manca;\n- `pagina`: il parametro `pagina` convertito in numero; se manca, non è un numero o è minore di 1, vale `1`;\n- `ricerca`: il parametro `q` senza spazi all'inizio e alla fine; se manca, stringa vuota `\"\"`.\n\nUsa `new URL(url).searchParams`.",
        difficulty: "medio",
        starterCode: `function parseProductQuery(url) {
  // Leggi categoria, pagina e q con searchParams.get(...)
}

console.log(parseProductQuery("http://localhost:3000/api/prodotti?categoria=libri&pagina=2&q=%20rosa%20"));
console.log(parseProductQuery("http://localhost:3000/api/prodotti"));`,
        solution: `function parseProductQuery(url) {
  const { searchParams } = new URL(url);

  const categoria = searchParams.get("categoria");

  const numero = Number(searchParams.get("pagina"));
  const pagina = numero >= 1 ? numero : 1;

  const q = searchParams.get("q");
  const ricerca = q ? q.trim() : "";

  return { categoria, pagina, ricerca };
}

console.log(parseProductQuery("http://localhost:3000/api/prodotti?categoria=libri&pagina=2&q=%20rosa%20"));
console.log(parseProductQuery("http://localhost:3000/api/prodotti"));`,
        validate: `if (typeof parseProductQuery !== "function") return "Definisci la funzione parseProductQuery(url)";
const base = "http://localhost:3000/api/prodotti";
const r1 = parseProductQuery(base + "?categoria=libri&pagina=2&q=%20rosa%20");
if (!r1 || typeof r1 !== "object") return "parseProductQuery deve restituire un oggetto { categoria, pagina, ricerca }";
if (r1.categoria !== "libri") return "categoria deve essere il valore del parametro categoria (qui \\"libri\\")";
if (r1.pagina !== 2) return "pagina deve essere un NUMERO: con pagina=2 deve valere 2, non \\"2\\" (usa Number(...))";
if (r1.ricerca !== "rosa") return "ricerca deve essere il parametro q senza spazi all'inizio e alla fine (usa trim): qui \\"rosa\\"";
const r2 = parseProductQuery(base);
if (r2.categoria !== null) return "Se il parametro categoria manca, categoria deve essere null";
if (r2.pagina !== 1) return "Se il parametro pagina manca, pagina deve valere 1";
if (r2.ricerca !== "") return "Se il parametro q manca, ricerca deve essere una stringa vuota \\"\\"";
if (parseProductQuery(base + "?pagina=abc").pagina !== 1) return "Se pagina non è un numero (es. pagina=abc), deve valere 1";
if (parseProductQuery(base + "?pagina=0").pagina !== 1) return "Se pagina è minore di 1 (es. pagina=0), deve valere 1";
if (parseProductQuery(base + "?pagina=7&categoria=elettronica").pagina !== 7) return "Con pagina=7 il risultato deve essere 7";
if (parseProductQuery(base + "?q=caff%C3%A8").ricerca !== "caffè") return "Con q=caff%C3%A8 ricerca deve valere \\"caffè\\": searchParams.get decodifica già i caratteri speciali";
return true;`,
        solutionExplanation:
          "`searchParams.get` restituisce sempre una stringa oppure `null`, e decodifica già i caratteri speciali dell'URL (`%20` diventa uno spazio). Per la pagina, `Number(...)` dà `NaN` con un valore non numerico e `0` con `null`: poiché sia `NaN >= 1` sia `0 >= 1` sono falsi, il ternario `numero >= 1 ? numero : 1` copre tutti i casi non validi in un colpo solo. Per `q` si controlla prima che esista, poi si applica `trim()`.",
      },
      {
        type: "code",
        title: "Scrivi un route.js con GET",
        description:
          "Completa `app/api/prodotti/route.js`: esporta una funzione `GET(req)` che:\n- legge il query param `categoria` con `new URL(req.url).searchParams.get(\"categoria\")`;\n- se `categoria` è presente filtra l'array `prodotti` per categoria, altrimenti usa tutti i prodotti;\n- restituisce il risultato con `Response.json(...)` (oppure `NextResponse.json(...)` importato da `next/server`).",
        difficulty: "medio",
        mode: "static",
        starterCode: `// app/api/prodotti/route.js
const prodotti = [
  { id: 1, nome: "Il nome della rosa", categoria: "libri", prezzo: 12 },
  { id: 2, nome: "Cuffie wireless", categoria: "elettronica", prezzo: 59 },
  { id: 3, nome: "Il piccolo principe", categoria: "libri", prezzo: 9 },
];

// Esporta qui la funzione GET
`,
        solution: `// app/api/prodotti/route.js
const prodotti = [
  { id: 1, nome: "Il nome della rosa", categoria: "libri", prezzo: 12 },
  { id: 2, nome: "Cuffie wireless", categoria: "elettronica", prezzo: 59 },
  { id: 3, nome: "Il piccolo principe", categoria: "libri", prezzo: 9 },
];

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const categoria = searchParams.get("categoria");

  const risultato = categoria
    ? prodotti.filter((p) => p.categoria === categoria)
    : prodotti;

  return Response.json(risultato, { status: 200 });
}`,
        validate: `const c = $codeNoComments;
if (/export\\s+default/.test(c)) return "In route.js non si usa export default: esporta una funzione con il nome del metodo, export async function GET(req)";
const m = c.match(/export\\s+(?:async\\s+)?function\\s+GET\\s*\\(\\s*([A-Za-z_$][\\w$]*)/);
if (!m) return "Esporta la funzione GET che riceve la richiesta: export async function GET(req) { ... }";
const r = m[1];
if (!new RegExp("new\\\\s+URL\\\\(\\\\s*" + r + "\\\\.url\\\\s*\\\\)").test(c)) return "Crea l'URL della richiesta con new URL(" + r + ".url)";
if (!/searchParams\\s*\\.\\s*get\\(\\s*["']categoria["']\\s*\\)/.test(c)) return "Leggi il parametro con searchParams.get(\\"categoria\\")";
if (!/prodotti\\s*\\.\\s*filter\\(/.test(c)) return "Filtra l'array con prodotti.filter(...) quando la categoria è presente";
if (!/\\.categoria\\s*===?\\s*categoria|categoria\\s*===?\\s*\\w+\\.categoria/.test(c)) return "Nel filter confronta la categoria del prodotto con quella richiesta (p.categoria === categoria)";
const usaNext = /NextResponse\\s*\\.\\s*json\\(/.test(c);
if (!/return\\s+(?:Response|NextResponse)\\s*\\.\\s*json\\(/.test(c)) return "Restituisci il risultato con return Response.json(...)";
if (usaNext && !/import\\s*\\{[^}]*NextResponse[^}]*\\}\\s*from\\s*["']next\\/server["']/.test(c)) return "Se usi NextResponse, importalo: import { NextResponse } from \\"next/server\\"";
return true;`,
        solutionExplanation:
          "Il nome della funzione esportata (`GET`) dice a Next.js quale metodo HTTP gestisce. `new URL(req.url)` trasforma l'indirizzo della richiesta in un oggetto da cui leggere i query param; se `categoria` è `null` (parametro assente) il ternario restituisce l'elenco completo. `Response.json` converte l'array in JSON e imposta da solo l'header `Content-Type`.",
      },
    ],
  },

  config: {
    sections: [
      {
        type: "text",
        content:
          "Un'applicazione Next.js reale non è fatta solo di pagine: c'è una parte di **configurazione** che decide da dove arrivano gli indirizzi dei server, quali font si usano, come si scrivono gli import e quali Provider avvolgono l'app. In questa lezione mettiamo insieme questi pezzi e vediamo come si organizza il layout root di un'app completa.",
      },
      {
        type: "heading",
        content: "Variabili d'ambiente e .env.local",
      },
      {
        type: "text",
        content:
          "Alcuni valori cambiano a seconda di dove gira l'app: l'indirizzo del backend è `http://localhost:8080` sul tuo computer e un altro in produzione; una chiave segreta non deve finire nel codice condiviso. Questi valori si mettono nelle **variabili d'ambiente**. Next.js le carica automaticamente dal file `.env.local` nella cartella principale del progetto (accanto a `package.json`, non dentro `src/`) e le rende disponibili come `process.env.NOME`.",
      },
      {
        type: "code",
        language: "text",
        title: ".env.local",
        code: `# Indirizzo del backend: letto solo dal server (Route Handler, Server Components)
API_URL=http://localhost:8080

# Chiave segreta per il servizio di pagamenti: MAI nel browser
PAGAMENTI_SECRET_KEY=sk_test_123456

# Valori pubblici: arrivano anche nel browser
NEXT_PUBLIC_NOME_NEGOZIO=Il mio negozio
NEXT_PUBLIC_NO_AUTH=true`,
      },
      {
        type: "list",
        items: [
          "Il file `.env.local` non va salvato su git (di solito è già nel `.gitignore`): ogni sviluppatore e ogni ambiente ha il proprio.",
          "I valori sono sempre **stringhe**: `NEXT_PUBLIC_NO_AUTH=true` diventa la stringa `\"true\"`, non il booleano `true`.",
          "Dopo aver modificato `.env.local` bisogna riavviare il server di sviluppo (`npm run dev`) perché le nuove variabili vengano lette.",
        ],
      },
      {
        type: "subheading",
        content: "process.env.X oppure NEXT_PUBLIC_X?",
      },
      {
        type: "text",
        content:
          "Per sicurezza, le variabili d'ambiente normali sono disponibili **solo sul server**: in un Route Handler o in un Server Component `process.env.API_URL` funziona, mentre nel browser vale `undefined`. Se una variabile deve essere letta anche dai Client Components, il suo nome deve cominciare con `NEXT_PUBLIC_`: al momento della build Next.js sostituisce `process.env.NEXT_PUBLIC_...` con il suo valore direttamente nel codice JavaScript inviato al browser.",
      },
      {
        type: "list",
        items: [
          "**Senza prefisso** (`API_URL`, `PAGAMENTI_SECRET_KEY`): segreti, indirizzi interni, tutto ciò che serve solo al server. È la scelta di default.",
          "**Con `NEXT_PUBLIC_`** (`NEXT_PUBLIC_NOME_NEGOZIO`): valori innocui che servono all'interfaccia, come un nome da mostrare o un flag. Chiunque apra il sito può leggerli negli strumenti del browser.",
        ],
      },
      {
        type: "warning",
        content:
          "Non mettere mai un segreto in una variabile `NEXT_PUBLIC_`: finirebbe scritto in chiaro nei file JavaScript scaricati dal browser. È uno dei motivi per cui si usa il proxy della lezione precedente: il Route Handler legge `process.env.API_URL` sul server, il browser chiama solo `/api/...`.",
      },
      {
        type: "info",
        content:
          "Poiché i valori `NEXT_PUBLIC_` vengono scritti nel codice durante la build, cambiarli dopo non ha effetto: se crei un'immagine Docker o un pacchetto di deploy, va costruito con i valori giusti per quell'ambiente. Le variabili senza prefisso, invece, vengono lette dal server quando parte, quindi possono cambiare tra un ambiente e l'altro senza rifare la build.",
      },
      {
        type: "subheading",
        content: "Flag di sviluppo: disattivare il login in locale",
      },
      {
        type: "text",
        content:
          "Un uso comune delle variabili pubbliche sono i **flag di sviluppo**: interruttori che cambiano il comportamento dell'app solo sul tuo computer. Ad esempio, se il login richiede un servizio esterno non disponibile in locale, puoi saltarlo con `NEXT_PUBLIC_NO_AUTH=true` nel `.env.local` di sviluppo (e non impostarlo in produzione). Attenzione al confronto: il valore è una stringa, quindi va confrontato con `\"true\"`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "components/ControlloAccesso.js",
        code: `"use client";
import { useSession } from "@/context/SessionContext";
import PaginaLogin from "./PaginaLogin";

// Confronto con la stringa "true": anche "false" sarebbe una stringa non vuota, quindi truthy!
const noAuth = process.env.NEXT_PUBLIC_NO_AUTH === "true";

export default function ControlloAccesso({ children }) {
  const { utente } = useSession();

  if (noAuth) return children;           // sviluppo: nessun login
  if (!utente) return <PaginaLogin />;    // utente non autenticato
  return children;
}`,
      },
      {
        type: "heading",
        content: "next.config.mjs e jsconfig.json",
      },
      {
        type: "text",
        content:
          "Nella cartella principale ci sono due file di configurazione. `next.config.mjs` contiene le opzioni di Next.js: in molti progetti resta quasi vuoto, ma ad esempio l'opzione `output: \"standalone\"` produce una build autonoma, comoda da copiare in un'immagine Docker. `jsconfig.json` invece configura l'editor e gli import: la sua opzione `paths` definisce degli **alias**.",
      },
      {
        type: "code",
        language: "javascript",
        title: "next.config.mjs",
        code: `/** @type {import('next').NextConfig} */
const nextConfig = {
  // Facoltativo: build autonoma, utile per il deploy con Docker
  output: "standalone",
};

export default nextConfig;`,
      },
      {
        type: "code",
        language: "json",
        title: "jsconfig.json: l'alias @/",
        code: `{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}`,
      },
      {
        type: "text",
        content:
          "Con questo alias `@/` significa \"la cartella `src/`\", da qualunque file tu stia scrivendo. Invece di contare i livelli con `../../../`, che si rompono appena sposti un file, scrivi sempre lo stesso percorso.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Import relativi e con alias",
        code: `// src/app/(negozio)/prodotti/[id]/page.js

// Senza alias: bisogna contare le cartelle
import { getProdotto } from "../../../../lib/prodotti";

// Con l'alias @/ (= src/): uguale in ogni file
import { getProdotto } from "@/lib/prodotti";`,
      },
      {
        type: "heading",
        content: "Font con next/font",
      },
      {
        type: "text",
        content:
          "Next.js ottimizza i font con `next/font`: i file del font vengono scaricati durante la build e serviti dalla tua app, senza richieste a server esterni e senza il \"salto\" del testo quando il font arriva in ritardo. Ci sono due varianti: `next/font/google` per i font di Google Fonts e `next/font/local` per un file di font che hai nel progetto. Entrambe si chiamano come funzioni, una volta sola, fuori dal componente.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Font Google e font locale come variabili CSS",
        code: `import { Inter } from "next/font/google";
import localFont from "next/font/local";

// Font di Google Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",       // nome della variabile CSS
});

// Font locale (file in src/app/fonts/)
const titoli = localFont({
  src: "./fonts/Titoli.woff2",
  variable: "--font-titoli",
  weight: "100 900",
});

// inter.variable e titoli.variable sono nomi di classi CSS che definiscono
// le variabili --font-inter e --font-titoli: si applicano all'<html>
// <html lang="it" className={inter.variable + " " + titoli.variable}>`,
      },
      {
        type: "text",
        content:
          "Con l'opzione `variable` il font diventa una **variabile CSS** (le hai viste nel modulo CSS), utilizzabile ovunque con `var(--font-inter)`: in un file CSS, oppure nel tema MUI, nella `fontFamily` della `typography`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "theme.js: usare il font nel tema MUI",
        code: `import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "var(--font-inter), Arial, sans-serif",
    h1: { fontFamily: "var(--font-titoli), serif" },
  },
});

export default theme;`,
      },
      {
        type: "heading",
        content: "Il layout root di un'app completa",
      },
      {
        type: "text",
        content:
          "Il layout root (`app/layout.js`) è il posto giusto per tutto ciò che è **condiviso da ogni pagina**: i font, il `metadata` con il titolo dell'app, l'header con la navigazione e i Provider. Come hai visto nella prima lezione, un layout non viene ridisegnato quando si naviga tra le pagine figlie: se l'header e il menu stanno nel layout, restano fermi e cambia solo `{children}`. Se invece li copiassi in ogni pagina, verrebbero ricreati a ogni cambio pagina (e perderebbero il loro stato, come un menu aperto).",
      },
      {
        type: "subheading",
        content: "Perché i Provider stanno in un Client Component",
      },
      {
        type: "text",
        content:
          "Il `<Provider store>` di Redux, il `ThemeProvider` di MUI e i Provider dei tuoi Context usano tutti il Context di React, che funziona solo nei **Client Components**. Il layout root però deve restare un Server Component, ad esempio per poter esportare `metadata` (disponibile solo nei Server Components). La soluzione è mettere tutti i Provider in un file a parte, `Providers.js`, con `\"use client\"` in cima, e usarlo nel layout per avvolgere `{children}`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "src/app/Providers.js",
        code: `"use client";

import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import store from "@/store/store";
import theme from "@/theme";
import { SessionProvider } from "@/context/SessionContext";

// Tutti i Provider dell'app in un solo Client Component
export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <SessionProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </SessionProvider>
    </Provider>
  );
}`,
      },
      {
        type: "info",
        content:
          "Le pagine passate come `children` a un Client Component **restano Server Components**: `\"use client\"` in `Providers.js` rende client solo quel file (e ciò che importa), non le pagine che riceve come `children`. Per questo avvolgere tutta l'app nei Provider non trasforma tutto in codice per il browser.",
      },
      {
        type: "subheading",
        content: "AppRouterCacheProvider: MUI e l'App Router",
      },
      {
        type: "text",
        content:
          "I componenti MUI generano il loro CSS mentre vengono renderizzati. Quando la pagina viene preparata sul server, quel CSS va raccolto e inserito nell'HTML, altrimenti il browser mostrerebbe per un istante la pagina senza stili. Se ne occupa `AppRouterCacheProvider` del pacchetto `@mui/material-nextjs`, importato dal percorso che corrisponde alla versione di Next.js (per Next.js 16: `@mui/material-nextjs/v16-appRouter`). Si mette nel layout root, appena dentro `<body>`, e avvolge tutto il resto.",
      },
      {
        type: "code",
        language: "javascript",
        title: "src/app/layout.js: il layout root completo",
        code: `import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import { Box, Stack, Typography } from "@mui/material";
import Providers from "./Providers";
import MenuPrincipale from "@/components/MenuPrincipale"; // Client Component con usePathname

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Il mio negozio",
  description: "Libri, musica ed elettronica",
};

export default function RootLayout({ children }) {
  return (
    <html lang="it" className={inter.variable} style={{ height: "100%" }}>
      <body style={{ margin: 0, height: "100%", display: "flex", flexDirection: "column" }}>
        <AppRouterCacheProvider>
          <Providers>
            {/* Header condiviso: non viene ridisegnato a ogni cambio pagina */}
            <Stack direction="row" spacing={2} sx={{ alignItems: "center", px: 2, py: 1, borderBottom: 1, borderColor: "divider" }}>
              <Typography variant="h6">{process.env.NEXT_PUBLIC_NOME_NEGOZIO}</Typography>
              <MenuPrincipale />
            </Stack>

            {/* Qui Next.js inserisce la pagina corrente */}
            <Box sx={{ flex: 1, overflow: "auto" }}>{children}</Box>
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}`,
      },
      {
        type: "text",
        content:
          "Riassumendo l'ordine, dall'esterno verso l'interno: `<html>` e `<body>` (obbligatori nel layout root), `AppRouterCacheProvider` (gli stili di MUI generati sul server), `Providers` (Redux, sessione, tema e `CssBaseline`), l'header condiviso e infine `{children}`, cioè la pagina.",
      },
      {
        type: "tip",
        content:
          "Tieni i Provider in un unico file client e il layout root il più semplice possibile: quando devi aggiungere un nuovo Context sai subito dove metterlo, e il layout resta un Server Component che può esportare `metadata`.",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "Variabile nel browser",
        description:
          "Nel `.env.local` c'è `API_URL=http://localhost:8080`. Un Client Component esegue `console.log(process.env.API_URL)`. Cosa stampa la console del browser?",
        difficulty: "facile",
        options: [
          "http://localhost:8080",
          "Un errore, perché process non esiste",
          "\"API_URL\"",
          "undefined, perché le variabili senza prefisso NEXT_PUBLIC_ sono disponibili solo sul server",
        ],
        correct: 3,
        explanation:
          "Solo le variabili che iniziano con `NEXT_PUBLIC_` vengono inserite nel codice inviato al browser. `API_URL` resta sul server, quindi nel Client Component vale `undefined` (senza errori: Next.js gestisce `process.env` anche nel browser). Per leggerla nel browser servirebbe il nome `NEXT_PUBLIC_API_URL`, ma per l'indirizzo di un backend è meglio usare un Route Handler come proxy.",
      },
      {
        type: "multiple-choice",
        title: "Il flag che non si spegne",
        description:
          "Nel `.env.local` c'è `NEXT_PUBLIC_NO_AUTH=false`, ma il login resta disattivato. Il codice è:\n``\nif (process.env.NEXT_PUBLIC_NO_AUTH) {\n  return children; // salta il login\n}\n``\nPerché?",
        difficulty: "medio",
        options: [
          "Perché le variabili NEXT_PUBLIC_ non si possono leggere nei Client Components",
          "Perché il valore è la stringa \"false\", che non è vuota ed è quindi truthy: bisogna confrontare con === \"true\"",
          "Perché bisogna scrivere NEXT_PUBLIC_NO_AUTH=0",
          "Perché i flag funzionano solo in produzione",
        ],
        correct: 1,
        explanation:
          "Le variabili d'ambiente sono sempre stringhe: \"false\" è una stringa non vuota, quindi nell'`if` vale come `true`. Il confronto corretto è `process.env.NEXT_PUBLIC_NO_AUTH === \"true\"`. Le variabili NEXT_PUBLIC_ si leggono proprio nei Client Components; con \"0\" il problema sarebbe identico (anche \"0\" è una stringa non vuota).",
      },
      {
        type: "multiple-choice",
        title: "Dove mettere i Provider",
        description:
          "Perché i Provider (Redux, ThemeProvider, Context) si mettono in un file `Providers.js` con \"use client\" invece di aggiungere \"use client\" direttamente a `app/layout.js`?",
        difficulty: "medio",
        options: [
          "Perché il layout root deve restare un Server Component (ad esempio per esportare metadata), mentre i Provider, che usano il Context, richiedono un Client Component",
          "Perché un layout non può contenere componenti di altre librerie",
          "Perché \"use client\" funziona solo nei file chiamati Providers.js",
          "Perché così i Provider vengono eseguiti solo sul server",
        ],
        correct: 0,
        explanation:
          "Il Context di React funziona solo nei Client Components, ma `metadata` si può esportare solo da un Server Component: separando i Provider in un file client, il layout resta server e le pagine passate come children restano Server Components. Il nome del file è libero, un layout può usare qualsiasi componente, e i Provider in un file \"use client\" girano anche nel browser.",
      },
      {
        type: "multiple-choice",
        title: "L'header condiviso",
        description:
          "Vuoi un header con il menu di navigazione su tutte le pagine, che non venga ricreato a ogni cambio pagina. Dove lo metti?",
        difficulty: "facile",
        options: [
          "In ogni page.js, copiandolo all'inizio di ciascuna",
          "In un Route Handler app/api/header/route.js",
          "Nel layout root, intorno a {children}",
          "Nel file next.config.mjs",
        ],
        correct: 2,
        explanation:
          "Il layout root avvolge tutte le pagine e non viene ridisegnato quando si naviga: l'header resta fermo e cambia solo `{children}`. Copiarlo in ogni pagina lo farebbe ricreare a ogni navigazione (e duplicherebbe il codice); un Route Handler restituisce dati, non interfaccia; `next.config.mjs` contiene solo opzioni di configurazione.",
      },
      {
        type: "multiple-choice",
        title: "Font come variabile CSS",
        description:
          "Hai definito `const inter = Inter({ subsets: [\"latin\"], variable: \"--font-inter\" })` e scritto `<html className={inter.variable}>`. Come usi il font nel tema MUI?",
        difficulty: "medio",
        options: [
          "fontFamily: \"inter.variable\"",
          "fontFamily: \"--font-inter\"",
          "fontFamily: inter",
          "fontFamily: \"var(--font-inter), sans-serif\"",
        ],
        correct: 3,
        explanation:
          "`inter.variable` è una classe che definisce la variabile CSS `--font-inter` sull'elemento `<html>` (e quindi su tutti i suoi discendenti). Una variabile CSS si legge con `var(--font-inter)`; aggiungere `sans-serif` dopo la virgola fornisce un font di riserva. Il nome della variabile da solo non è un valore valido per `font-family`, la stringa \"inter.variable\" è solo testo, e `inter` è un oggetto, non un nome di font.",
      },
      {
        type: "code",
        title: "Il flag NO_AUTH",
        description:
          "Scrivi la funzione `isAuthDisabled(env)` che riceve un oggetto con le variabili d'ambiente (come `process.env`) e restituisce il booleano `true` **solo** se `env.NEXT_PUBLIC_NO_AUTH` vale esattamente la stringa `\"true\"`; in tutti gli altri casi (variabile assente, `\"false\"`, stringa vuota...) restituisce `false`.",
        difficulty: "facile",
        starterCode: `function isAuthDisabled(env) {
  return Boolean(env.NEXT_PUBLIC_NO_AUTH); // attenzione: è davvero corretto?
}

console.log(isAuthDisabled({ NEXT_PUBLIC_NO_AUTH: "true" }));  // true
console.log(isAuthDisabled({ NEXT_PUBLIC_NO_AUTH: "false" })); // false
console.log(isAuthDisabled({}));                               // false`,
        solution: `function isAuthDisabled(env) {
  return env.NEXT_PUBLIC_NO_AUTH === "true";
}

console.log(isAuthDisabled({ NEXT_PUBLIC_NO_AUTH: "true" }));  // true
console.log(isAuthDisabled({ NEXT_PUBLIC_NO_AUTH: "false" })); // false
console.log(isAuthDisabled({}));                               // false`,
        validate: `if (typeof isAuthDisabled !== "function") return "Definisci la funzione isAuthDisabled(env)";
if (isAuthDisabled({ NEXT_PUBLIC_NO_AUTH: "true" }) !== true) return "Con NEXT_PUBLIC_NO_AUTH: \\"true\\" la funzione deve restituire true (il booleano)";
if (isAuthDisabled({ NEXT_PUBLIC_NO_AUTH: "false" }) !== false) return "Con NEXT_PUBLIC_NO_AUTH: \\"false\\" deve restituire false: ricorda che \\"false\\" è una stringa non vuota, quindi truthy. Confronta con === \\"true\\"";
if (isAuthDisabled({}) !== false) return "Se la variabile non c'è, la funzione deve restituire false (il booleano, non undefined)";
if (isAuthDisabled({ NEXT_PUBLIC_NO_AUTH: "" }) !== false) return "Con la stringa vuota deve restituire false";
if (isAuthDisabled({ NEXT_PUBLIC_NO_AUTH: "1" }) !== false) return "Con \\"1\\" deve restituire false: solo la stringa \\"true\\" disattiva il login";
return true;`,
        solutionExplanation:
          "Le variabili d'ambiente sono stringhe: `Boolean(\"false\")` è `true`, perché ogni stringa non vuota è truthy. Il confronto stretto `=== \"true\"` restituisce sempre un booleano ed è vero solo per il valore esatto previsto: qualsiasi altro valore, o l'assenza della variabile (`undefined`), lascia il login attivo, che è il comportamento più sicuro.",
      },
      {
        type: "code",
        title: "Cosa arriva nel browser?",
        description:
          "Scrivi la funzione `getPublicEnv(env)` che riceve un oggetto di variabili d'ambiente e restituisce un **nuovo** oggetto con solo le variabili il cui nome inizia con `\"NEXT_PUBLIC_\"`: sono quelle che Next.js rende visibili al browser. L'oggetto originale non deve essere modificato.",
        difficulty: "medio",
        starterCode: `function getPublicEnv(env) {
  // Restituisci un nuovo oggetto con solo le chiavi che iniziano con "NEXT_PUBLIC_"
}

const env = {
  API_URL: "http://localhost:8080",
  PAGAMENTI_SECRET_KEY: "sk_test_123",
  NEXT_PUBLIC_NOME_NEGOZIO: "Il mio negozio",
  NEXT_PUBLIC_NO_AUTH: "true",
};
console.log(getPublicEnv(env));`,
        solution: `function getPublicEnv(env) {
  const result = {};
  for (const [nome, valore] of Object.entries(env)) {
    if (nome.startsWith("NEXT_PUBLIC_")) {
      result[nome] = valore;
    }
  }
  return result;
}

const env = {
  API_URL: "http://localhost:8080",
  PAGAMENTI_SECRET_KEY: "sk_test_123",
  NEXT_PUBLIC_NOME_NEGOZIO: "Il mio negozio",
  NEXT_PUBLIC_NO_AUTH: "true",
};
console.log(getPublicEnv(env));`,
        validate: `if (typeof getPublicEnv !== "function") return "Definisci la funzione getPublicEnv(env)";
const input = { API_URL: "http://localhost:8080", PAGAMENTI_SECRET_KEY: "sk_test_123", NEXT_PUBLIC_NOME_NEGOZIO: "Il mio negozio", NEXT_PUBLIC_NO_AUTH: "true" };
const copia = { ...input };
const r = getPublicEnv(input);
if (!r || typeof r !== "object") return "getPublicEnv deve restituire un oggetto";
if ("API_URL" in r || "PAGAMENTI_SECRET_KEY" in r) return "Le variabili senza prefisso NEXT_PUBLIC_ (API_URL, PAGAMENTI_SECRET_KEY) non devono comparire nel risultato";
if (!$equal(r, { NEXT_PUBLIC_NOME_NEGOZIO: "Il mio negozio", NEXT_PUBLIC_NO_AUTH: "true" })) return "Il risultato deve contenere tutte e sole le variabili che iniziano con NEXT_PUBLIC_, con i loro valori";
if (!$equal(input, copia)) return "Non modificare l'oggetto originale: crea un nuovo oggetto con le chiavi pubbliche";
if (r === input) return "Restituisci un NUOVO oggetto, non quello ricevuto";
if (Object.keys(getPublicEnv({ SEGRETO: "x" })).length !== 0) return "Se non ci sono variabili pubbliche, il risultato deve essere un oggetto vuoto {}";
if (!$equal(getPublicEnv({ MY_NEXT_PUBLIC_X: "a", NEXT_PUBLIC_Y: "b" }), { NEXT_PUBLIC_Y: "b" })) return "Il nome deve INIZIARE con NEXT_PUBLIC_ (usa startsWith): MY_NEXT_PUBLIC_X non è pubblica";
return true;`,
        solutionExplanation:
          "`Object.entries` trasforma l'oggetto in un array di coppie `[nome, valore]`, che si scorre con `for...of` e il destructuring. `startsWith(\"NEXT_PUBLIC_\")` controlla l'inizio del nome (con `includes` passerebbe anche `MY_NEXT_PUBLIC_X`). Le chiavi scelte vengono copiate in un oggetto nuovo, così l'originale resta intatto. In alternativa si può usare `reduce` sulle coppie.",
      },
      {
        type: "code",
        title: "Il componente Providers",
        description:
          "Completa `src/app/Providers.js`, il Client Component che avvolge tutta l'app:\n- metti la direttiva `\"use client\"` come prima riga;\n- restituisci il `<Provider store={store}>` di Redux, che contiene il `<ThemeProvider theme={theme}>` di MUI;\n- dentro il `ThemeProvider` metti `<CssBaseline />` e poi `{children}`.",
        difficulty: "medio",
        mode: "static",
        starterCode: `import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import store from "@/store/store";
import theme from "@/theme";

export default function Providers({ children }) {
  // Avvolgi children nei Provider
  return children;
}`,
        solution: `"use client";

import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import store from "@/store/store";
import theme from "@/theme";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Provider>
  );
}`,
        validate: `const c = $codeNoComments.trim();
if (!/["']use client["']/.test(c)) return "Aggiungi la direttiva \\"use client\\": i Provider usano il Context e funzionano solo nei Client Components";
if (!/^["']use client["']/.test(c)) return "\\"use client\\" deve essere la PRIMA riga del file, prima degli import";
if (!/<Provider\\s+store=\\{\\s*store\\s*\\}\\s*>/.test(c)) return "Usa il Provider di Redux con lo store: <Provider store={store}>";
if (!/<ThemeProvider\\s+theme=\\{\\s*theme\\s*\\}\\s*>/.test(c)) return "Usa il ThemeProvider con il tema: <ThemeProvider theme={theme}>";
if (!/<CssBaseline\\s*\\/>/.test(c)) return "Aggiungi <CssBaseline /> dentro il ThemeProvider";
const iP = c.search(/<Provider\\b/), iT = c.search(/<ThemeProvider\\b/), iB = c.search(/<CssBaseline\\b/);
const iC = c.search(/>\\s*\\{\\s*children\\s*\\}\\s*</);
const fT = c.search(/<\\/ThemeProvider>/), fP = c.search(/<\\/Provider>/);
if (iC < 0) return "Inserisci {children} dentro il ThemeProvider";
if (fT < 0 || fP < 0) return "Chiudi i tag </ThemeProvider> e </Provider>";
if (!(iP < iT && iT < iB && iB < iC && iC < fT && fT < fP)) return "Controlla l'annidamento: <Provider> esterno, dentro <ThemeProvider>, dentro <CssBaseline /> e poi {children}";
return true;`,
        solutionExplanation:
          "`\"use client\"` in cima rende `Providers` un Client Component, l'unico posto dove i Provider basati sul Context possono funzionare. Il Provider di Redux sta all'esterno, così tutto ciò che c'è dentro (anche il tema) può usare lo store; `CssBaseline` sta dentro il `ThemeProvider`, così gli stili di base usano i colori e il font del tema. Il layout root userà poi `<Providers>{children}</Providers>`, e le pagine passate come children resteranno Server Components.",
      },
    ],
  },
};
