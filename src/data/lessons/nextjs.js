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
          "Perché nelle versioni recenti di Next.js params è una Promise e use() ne restituisce il valore risolto",
          "Perché use() sostituisce completamente useEffect",
          "Perché i Server Components richiedono use() per qualsiasi prop",
        ],
        correct: 1,
        explanation:
          "Da Next.js 15, i parametri delle route dinamiche (params) vengono passati come Promise. In un Server Component async si usa await params; in un Client Component, dove await non è disponibile nel corpo del componente, si usa l'hook use() di React 19.",
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
      },
    ],
  },
};
