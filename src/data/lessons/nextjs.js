export const lessons = {
  "app-router": {
    sections: [
      {
        type: "text",
        content:
          "Next.js e un framework React che aggiunge funzionalita fondamentali per la produzione: Server-Side Rendering (SSR), Static Site Generation (SSG), routing basato su file, bundling ottimizzato e molto altro. Invece di configurare manualmente webpack, router e server, Next.js fornisce tutto pronto all'uso.",
      },
      {
        type: "heading",
        content: "L'App Router e il Routing Basato su File",
      },
      {
        type: "text",
        content:
          "A partire da Next.js 13, l'App Router (cartella `app/`) sostituisce il vecchio Pages Router. Ogni cartella dentro `app/` corrisponde a un segmento dell'URL, e ogni file `page.js` definisce il contenuto di quella rotta. Non servono configurazioni: la struttura delle cartelle E il routing.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Struttura tipica della cartella app/",
        code: `// Struttura del filesystem:
// app/
// ├── page.js            →  /
// ├── layout.js           →  Layout root (wrappa tutte le pagine)
// ├── loading.js          →  Loading UI globale
// ├── not-found.js        →  Pagina 404 personalizzata
// └── (app)/
//     └── [...params]/
//         └── page.js     →  /site/analysisType/page

// Esempio di page.js root (la Home):
export default function Home() {
  return <h1>Benvenuto nella Home</h1>;
}`,
      },
      {
        type: "subheading",
        content: "page.js: Il Cuore di Ogni Rotta",
      },
      {
        type: "text",
        content:
          "Il file `page.js` e l'unico file che rende una rotta accessibile pubblicamente. Se una cartella non contiene `page.js`, non sara navigabile dall'utente. Ogni `page.js` esporta un componente React di default che rappresenta l'interfaccia di quella pagina.",
      },
      {
        type: "subheading",
        content: "layout.js: Il Wrapper Condiviso",
      },
      {
        type: "text",
        content:
          "Il file `layout.js` definisce un involucro (wrapper) che viene condiviso tra tutte le pagine discendenti. Il layout root (in `app/layout.js`) e obbligatorio e contiene i tag `<html>` e `<body>`. I layout non vengono ri-renderizzati quando si naviga tra pagine figlie, ottimizzando le prestazioni.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Layout root di un progetto Next.js",
        code: `// app/layout.js - Layout root del progetto
import { Box } from "@mui/material";
import ProviderWrapper from "./context/Provider";

export const metadata = {
  title: "Dashboard App",
  description: "La mia applicazione web",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body style={{ margin: 0, height: "100%" }}>
        <ProviderWrapper>
          <Box sx={{ height: "100%" }}>
            {children}
          </Box>
        </ProviderWrapper>
      </body>
    </html>
  );
}`,
      },
      {
        type: "subheading",
        content: "File Speciali: loading.js, error.js, not-found.js",
      },
      {
        type: "list",
        items: [
          "`loading.js` — Mostra un'interfaccia di caricamento automatica (Suspense boundary) mentre il contenuto della pagina viene caricato.",
          "`error.js` — Cattura errori runtime nella rotta e mostra un'interfaccia di fallback. Deve avere 'use client' in cima.",
          "`not-found.js` — Interfaccia personalizzata per le pagine 404. Si attiva con la funzione notFound() o per URL non corrispondenti.",
        ],
      },
      {
        type: "subheading",
        content: "Route Group: Le Parentesi Tonde (app)",
      },
      {
        type: "text",
        content:
          "Una cartella con nome tra parentesi, come `(app)`, crea un Route Group: organizza i file senza aggiungere segmenti all'URL. La cartella `(app)` in un progetto Next.js raggruppa le pagine della dashboard senza che '(app)' appaia nell'URL.",
      },
      {
        type: "tip",
        content:
          "Questo esempio usa Next.js 16 con App Router. La struttura e: / (Home) e /[site]/[analysisType]/[page] (Dashboard). Il route group (app) raggruppa le pagine della dashboard senza alterare l'URL.",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "Ruolo di page.js",
        description:
          "Quale file rende una cartella navigabile come rotta in Next.js App Router?",
        difficulty: "facile",
        options: [
          "layout.js",
          "page.js",
          "route.js",
          "index.js",
        ],
        correct: 1,
        explanation:
          "Solo page.js rende una rotta pubblicamente accessibile. layout.js definisce un wrapper condiviso, route.js gestisce le API Routes, e index.js era usato nel vecchio Pages Router.",
      },
      {
        type: "multiple-choice",
        title: "Route Group",
        description:
          "Cosa succede quando crei una cartella chiamata `(dashboard)` dentro `app/`?",
        difficulty: "medio",
        options: [
          "Aggiunge '/dashboard' all'URL",
          "Crea un gruppo organizzativo senza influenzare l'URL",
          "Genera un errore perche le parentesi non sono valide",
          "Crea una rotta dinamica con parametro 'dashboard'",
        ],
        correct: 1,
        explanation:
          "Le parentesi tonde creano un Route Group: organizzano i file in cartelle logiche senza aggiungere segmenti all'URL. In un progetto Next.js reale, (app) raggruppa le pagine della dashboard.",
      },
      {
        type: "code",
        title: "Crea un Layout con Sidebar",
        description:
          "Scrivi un layout.js che wrappa i children in un Box con display flex: una sidebar a sinistra (larghezza fissa 240px) e il contenuto principale a destra (flex: 1).",
        difficulty: "medio",
        starterCode: `// app/(dashboard)/layout.js
import { Box } from "@mui/material";

export default function DashboardLayout({ children }) {
  // Completa il layout con sidebar + contenuto principale
}`,
        solution: `// app/(dashboard)/layout.js
import { Box } from "@mui/material";

export default function DashboardLayout({ children }) {
  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Box sx={{ width: 240, bgcolor: "#f5f5f5", borderRight: "1px solid #e0e0e0" }}>
        Sidebar
      </Box>
      <Box sx={{ flex: 1, overflow: "auto" }}>
        {children}
      </Box>
    </Box>
  );
}`,
        validate: `(code) => {
  return code.includes("display") && code.includes("flex") && code.includes("children") && code.includes("240");
}`,
        testCode: "",
      },
    ],
  },

  "components-types": {
    sections: [
      {
        type: "text",
        content:
          "Next.js con l'App Router introduce una distinzione fondamentale: Server Components e Client Components. Capire quando usare l'uno o l'altro e essenziale per scrivere applicazioni performanti e corrette.",
      },
      {
        type: "heading",
        content: "Server Components: Il Default",
      },
      {
        type: "text",
        content:
          "In Next.js App Router, tutti i componenti sono Server Components per default. Vengono eseguiti solo sul server: il browser riceve HTML gia renderizzato. Questo significa bundle piu piccoli (il codice del componente non viene inviato al client) e la possibilita di accedere direttamente a database, filesystem e API interne.",
      },
      {
        type: "warning",
        content:
          "Nei Server Components NON puoi usare: useState, useEffect, useRef e qualsiasi hook React; event handler (onClick, onChange, ecc.); API del browser (window, document, localStorage); Context API (useContext).",
      },
      {
        type: "code",
        language: "javascript",
        title: "Esempio di Server Component (layout.js del progetto)",
        code: `// app/layout.js - Server Component (nessuna direttiva "use client")
// Puo' usare: metadata, import di font, accesso a dati server-side
import localFont from "next/font/local";
import { Box } from "@mui/material";
import ProviderWrapper from "./context/Provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

// metadata e disponibile SOLO nei Server Components
export const metadata = {
  title: "Dashboard App",
  description: "La mia applicazione web",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ height: "100%" }}>
      <body className={geistSans.variable} style={{ margin: 0, height: "100%" }}>
        <ProviderWrapper>
          <Box sx={{ height: "100%" }}>{children}</Box>
        </ProviderWrapper>
      </body>
    </html>
  );
}`,
      },
      {
        type: "heading",
        content: 'Client Components: La Direttiva "use client"',
      },
      {
        type: "text",
        content:
          'Per usare hook, stato, event handler o API del browser, devi aggiungere "use client" come prima riga del file. Questo trasforma il componente in un Client Component: viene eseguito (anche) nel browser e puo gestire interattivita.',
      },
      {
        type: "code",
        language: "javascript",
        title: "Client Component con hooks e interattivita",
        code: `"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";

export default function Home() {
  const router = useRouter();
  const selectedSite = useSelector(state => state.navigation.selectedSite);

  const handleContinue = () => {
    router.push("/" + selectedSite + "/analysis/overview");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4">Sito selezionato: {selectedSite}</Typography>
      <Button variant="contained" onClick={handleContinue}>
        Continua
      </Button>
    </Box>
  );
}`,
      },
      {
        type: "subheading",
        content: "Quando Usare Server vs Client",
      },
      {
        type: "list",
        items: [
          "Server Component: layout statici, pagine senza interattivita, componenti che mostrano dati senza stato, accesso a database/API.",
          "Client Component: form, bottoni, filtri, qualsiasi componente con useState/useEffect, grafici interattivi, Redux, router programmatico.",
        ],
      },
      {
        type: "subheading",
        content: "use() di React 19: Unwrapping delle Promise",
      },
      {
        type: "text",
        content:
          "React 19 introduce l'hook `use()` che permette di 'scartare' (unwrap) Promise e Context direttamente nel componente. In Next.js, i parametri delle route dinamiche vengono ora passati come Promise, e `use(params)` li risolve.",
      },
      {
        type: "code",
        language: "javascript",
        title: "use() per i parametri di rotta",
        code: `"use client";
import { use, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";

// In Next.js 15+ con React 19, params e una Promise
export default function DashboardPage({ params }) {
  const filteredParams = use(params);
  const [site, analysisType, currentPage] = filteredParams.params || [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSelectedSite(site));
    dispatch(setSelectedAnalysisType(analysisType));
    dispatch(setSelectedPage(currentPage));
  }, [site, analysisType, currentPage, dispatch]);

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      {/* ... contenuto dashboard ... */}
    </Box>
  );
}`,
      },
      {
        type: "tip",
        content:
          "Nel progetto, layout.js e un Server Component (nessun hook), mentre tutti i componenti interattivi hanno 'use client' in cima. Le pagine della dashboard usano use(params) di React 19 per leggere i parametri dall'URL.",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "Server vs Client Component",
        description:
          'Quale di queste operazioni richiede obbligatoriamente "use client"?',
        difficulty: "facile",
        options: [
          "Esportare metadata",
          "Usare useState per gestire un filtro",
          "Importare un font locale",
          "Renderizzare HTML statico",
        ],
        correct: 1,
        explanation:
          'useState e un hook React che funziona solo nel browser. Qualsiasi componente che usa hook, event handler o API del browser deve avere "use client" in cima al file.',
      },
      {
        type: "code",
        title: "Converti in Client Component",
        description:
          'Questo componente usa useState ma manca la direttiva "use client". Aggiungila e correggi il componente per renderlo funzionante.',
        difficulty: "facile",
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
        validate: `(code) => {
  const trimmed = code.trim();
  return trimmed.startsWith('"use client"') || trimmed.startsWith("'use client'");
}`,
        testCode: "",
      },
      {
        type: "multiple-choice",
        title: "use() in React 19",
        description:
          "Perche in un'applicazione Next.js reale si usa `use(params)` nella pagina dashboard?",
        difficulty: "medio",
        options: [
          "Perche use() e piu veloce di useEffect per leggere i parametri",
          "Perche in Next.js 15+ i params delle route dinamiche sono Promise e use() le risolve",
          "Perche use() sostituisce completamente useEffect",
          "Perche i Server Components richiedono use() per qualsiasi prop",
        ],
        correct: 1,
        explanation:
          "A partire da Next.js 15 con React 19, i parametri delle route dinamiche (params) vengono passati come Promise. L'hook use() di React 19 permette di scartare questa Promise direttamente nel componente.",
      },
    ],
  },

  "dynamic-routes": {
    sections: [
      {
        type: "text",
        content:
          "Le route dinamiche permettono di creare pagine il cui URL contiene segmenti variabili. Invece di creare una cartella per ogni possibile valore, si usa una sintassi speciale con le parentesi quadre.",
      },
      {
        type: "heading",
        content: "Segmenti Dinamici: [param]",
      },
      {
        type: "text",
        content:
          "Una cartella con il nome tra parentesi quadre, come `[id]` o `[site]`, definisce un segmento dinamico. Il valore dell'URL viene passato come prop `params` al componente page.js. Ad esempio, `app/products/[id]/page.js` gestisce URL come `/products/123`, `/products/abc`, ecc.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Segmento dinamico semplice",
        code: `// app/products/[id]/page.js
// URL: /products/42  →  params = { id: "42" }

"use client";
import { use } from "react";

export default function ProductPage({ params }) {
  const { id } = use(params);

  return <h1>Prodotto numero: {id}</h1>;
}`,
      },
      {
        type: "subheading",
        content: "Catch-All Routes: [...params]",
      },
      {
        type: "text",
        content:
          "La sintassi `[...params]` crea una rotta catch-all che cattura tutti i segmenti rimanenti dell'URL come array. Questo e un pattern comune per gestire URL come `/LK1/Analysis/Overview` con un'unica page.js.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Catch-all route in un progetto Next.js",
        code: `// app/(app)/[...params]/page.js
// URL: /LK1/CQA/Overview
// params.params = ["LK1", "CQA", "Overview"]

"use client";
import { use, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";
import SideBar from "../../components/sidebar/SideBar";
import Header from "../../components/header/Header";
import MainContent from "../../components/dashboard/MainContent";

export default function DashboardPage({ params }) {
  const filteredParams = use(params);
  const [site, analysisType, currentPage] = filteredParams.params || [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSelectedSite(site));
    dispatch(setSelectedAnalysisType(analysisType));
    dispatch(setSelectedPage(currentPage));
  }, [site, analysisType, currentPage, dispatch]);

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <SideBar analysisType={analysisType} currentPage={currentPage} />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header analysisType={analysisType} />
        <MainContent site={site} analysisType={analysisType} currentPage={currentPage} />
      </Box>
    </Box>
  );
}`,
      },
      {
        type: "subheading",
        content: "Route Groups: Organizzazione senza URL",
      },
      {
        type: "text",
        content:
          "Come visto nella lezione precedente, le cartelle tra parentesi tonde `(nome)` creano gruppi organizzativi. Nel progetto, `(app)` contiene le pagine della dashboard, separandole dalla Home che sta direttamente in `app/page.js`. L'URL risultante e `/LK1/CQA/Overview`, non `/(app)/LK1/CQA/Overview`.",
      },
      {
        type: "heading",
        content: "Navigazione: Link e useRouter",
      },
      {
        type: "text",
        content:
          "Next.js offre due modi principali per navigare: il componente `<Link>` per la navigazione dichiarativa (HTML-like) e l'hook `useRouter()` per la navigazione programmatica (da codice JavaScript).",
      },
      {
        type: "code",
        language: "javascript",
        title: "Link dichiarativo e navigazione programmatica",
        code: `"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Stack, Typography } from "@mui/material";

export default function Navigation() {
  const router = useRouter();

  // Navigazione programmatica: utile dopo un'azione (es. submit form)
  const handleNavigate = () => {
    const site = "LK1";
    const analysisType = "CQA";
    const firstPage = "Overview";
    router.push("/" + site + "/" + analysisType + "/" + firstPage);
  };

  return (
    <Stack spacing={2}>
      {/* Link dichiarativo: pre-fetching automatico */}
      <Link href="/LK1/CQA/Overview">
        <Typography>Vai alla Dashboard</Typography>
      </Link>

      {/* Navigazione programmatica */}
      <Button variant="contained" onClick={handleNavigate}>
        Continua
      </Button>
    </Stack>
  );
}`,
      },
      {
        type: "subheading",
        content: "usePathname: Conoscere la Rotta Corrente",
      },
      {
        type: "text",
        content:
          "L'hook `usePathname()` restituisce il percorso corrente dell'URL. E utilissimo per evidenziare il link attivo nella navigazione, applicare stili condizionali o eseguire logica basata sulla pagina corrente.",
      },
      {
        type: "code",
        language: "javascript",
        title: "usePathname per il link attivo nella sidebar",
        code: `"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Box, Typography } from "@mui/material";

const navItems = [
  { label: "Overview", href: "/LK1/CQA/Overview" },
  { label: "Dettaglio", href: "/LK1/CQA/Detail" },
  { label: "Trend", href: "/LK1/CQA/Trend" },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
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
              {item.label}
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
          "Nel progetto: /[...params]/page.js cattura site, analysisType e page come array. usePathname() e usato per evidenziare il link attivo nella navigazione laterale.",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "Catch-All vs Segmento Singolo",
        description:
          "Qual e la differenza tra `[id]` e `[...params]` nel routing di Next.js?",
        difficulty: "facile",
        options: [
          "Nessuna differenza, sono sinonimi",
          "[id] cattura un singolo segmento, [...params] cattura tutti i segmenti rimanenti come array",
          "[...params] e piu veloce di [id]",
          "[id] funziona solo con numeri, [...params] con qualsiasi stringa",
        ],
        correct: 1,
        explanation:
          "[id] cattura esattamente un segmento dell'URL (es. /products/42 -> id = '42'). [...params] cattura uno o piu segmenti come array (es. /LK1/CQA/Overview -> params = ['LK1', 'CQA', 'Overview']).",
      },
      {
        type: "code",
        title: "Navigazione con useRouter",
        description:
          "Scrivi una funzione handleNavigate che, dati `site`, `analysisType` e `page`, usa useRouter() per navigare alla rotta corretta. La rotta deve essere nel formato `/{site}/{analysisType}/{page}`.",
        difficulty: "medio",
        starterCode: `"use client";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

export default function NavigateButton({ site, analysisType, page }) {
  const router = useRouter();

  const handleNavigate = () => {
    // Completa la navigazione programmatica
  };

  return (
    <Button variant="contained" onClick={handleNavigate}>
      Vai alla Dashboard
    </Button>
  );
}`,
        solution: `"use client";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

export default function NavigateButton({ site, analysisType, page }) {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/" + site + "/" + analysisType + "/" + page);
  };

  return (
    <Button variant="contained" onClick={handleNavigate}>
      Vai alla Dashboard
    </Button>
  );
}`,
        validate: `(code) => {
  return code.includes("router.push") && (code.includes("site") && code.includes("analysisType") && code.includes("page"));
}`,
        testCode: "",
      },
      {
        type: "code",
        title: "Link Attivo con usePathname",
        description:
          "Completa il componente NavLink che applica uno stile diverso quando il link e attivo (cioe quando il pathname corrente corrisponde all'href del link).",
        difficulty: "difficile",
        starterCode: `"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Typography } from "@mui/material";

export default function NavLink({ href, label }) {
  const pathname = usePathname();
  // Determina se il link e attivo

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
        validate: `(code) => {
  return code.includes("usePathname") && code.includes("isActive") && code.includes("pathname");
}`,
        testCode: "",
      },
    ],
  },
};
