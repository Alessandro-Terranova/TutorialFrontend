export const lessons = {
  patterns: {
    sections: [
      {
        type: "text",
        content:
          "Questa lezione finale raccoglie alcuni pattern avanzati che ritroverai in quasi tutte le applicazioni React di medie e grandi dimensioni: aggiornare uno stato profondamente annidato, fondere configurazioni di default con delle personalizzazioni, gestire l'autenticazione con un provider e scrivere custom hook che combinano più concetti. Mettono insieme quello che hai imparato su JavaScript, React, Redux, MUI e Next.js.",
      },
      {
        type: "heading",
        content: "Stato profondamente annidato: path dinamici",
      },
      {
        type: "text",
        content:
          "Immagina di salvare in Redux le preferenze di un utente: tema, colori, notifiche, lingua... organizzate in un oggetto annidato su più livelli. Scrivere un reducer diverso per ogni singola impostazione diventa presto ingestibile. Un approccio elegante è usare una funzione generica che percorre l'oggetto seguendo un **array di chiavi** (il *path*).",
      },
      {
        type: "code",
        language: "javascript",
        title: "setNestedProperty - aggiornamento generico di oggetti annidati",
        code: `// Percorre (e se serve crea) l'oggetto annidato seguendo un array di chiavi,
// poi imposta il valore sull'ultima chiave del path.
// Es. pathKeys = ["aspetto", "colori", "primario"]
const setNestedProperty = (obj, pathKeys, value) => {
  let current = obj;

  for (let i = 0; i < pathKeys.length - 1; i++) {
    const key = pathKeys[i];
    if (!current[key]) current[key] = {};
    current = current[key];
  }

  const lastKey = pathKeys[pathKeys.length - 1];

  // Se il valore è un oggetto, lo fondiamo con quello esistente
  current[lastKey] =
    typeof value === "object" && value !== null && !Array.isArray(value)
      ? { ...current[lastKey], ...value }
      : value;
};

// Uso dentro una slice di Redux Toolkit (Immer permette la "mutazione")
const preferenzeSlice = createSlice({
  name: "preferenze",
  initialState: { aspetto: { tema: "chiaro", colori: { primario: "#1976d2" } } },
  reducers: {
    impostaPreferenza: (state, action) => {
      const { path, valore } = action.payload;
      setNestedProperty(state, path, valore);
    },
  },
});

// Un'unica action per qualsiasi impostazione:
dispatch(impostaPreferenza({ path: ["aspetto", "colori", "primario"], valore: "#e91e63" }));
dispatch(impostaPreferenza({ path: ["notifiche", "email"], valore: false }));`,
      },
      {
        type: "info",
        content:
          "Questo pattern può mutare direttamente l'oggetto perché vive dentro un reducer di Redux Toolkit, che usa Immer sotto il cofano: le \"mutazioni\" su state vengono intercettate e trasformate in aggiornamenti immutabili. Fuori da un reducer RTK, mutare un oggetto così andrebbe evitato: si usano copie con lo spread annidato oppure la libreria Immer in modo esplicito.",
      },
      {
        type: "heading",
        content: "Merge deep di configurazioni: default + override",
      },
      {
        type: "text",
        content:
          "Un altro pattern molto comune è fondere una configurazione di default con degli override (personalizzazioni), senza perdere le chiavi non sovrascritte. Lo spread `{ ...a, ...b }` lavora su un solo livello (*shallow*): se dentro c'è un oggetto annidato come `stile`, l'oggetto di `b` sostituirebbe per intero quello di `a`. Per questo gli oggetti annidati vanno fusi separatamente.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Merge deep parziale per la configurazione di un pulsante",
        code: `function mergeConfig(defaults, overrides) {
  return {
    ...defaults,
    ...overrides,
    stile: {
      ...defaults.stile,
      ...(overrides.stile || {}),
    },
    testi: {
      ...defaults.testi,
      ...(overrides.testi || {}),
    },
  };
}

const defaults = {
  variante: "contained",
  dimensione: "medium",
  stile: { colore: "blue", bordo: 2, arrotondato: true },
  testi: { etichetta: "Invia", caricamento: "Invio in corso..." },
};

const personalizzato = { variante: "outlined", stile: { colore: "red" } };

console.log(mergeConfig(defaults, personalizzato));
// { variante: "outlined", dimensione: "medium",
//   stile: { colore: "red", bordo: 2, arrotondato: true },
//   testi: { etichetta: "Invia", caricamento: "Invio in corso..." } }

// Con il solo spread shallow avremmo perso bordo e arrotondato:
console.log({ ...defaults, ...personalizzato }.stile); // { colore: "red" }`,
      },
      {
        type: "text",
        content:
          "Le parentesi in `...(overrides.stile || {})` servono a gestire il caso in cui l'override non contenga quella chiave: lo spread di `undefined` dentro un oggetto non genera errori, ma scrivere `|| {}` rende esplicita l'intenzione.",
      },
      {
        type: "heading",
        content: "Autenticazione con provider e Context",
      },
      {
        type: "text",
        content:
          "Nella maggior parte delle applicazioni l'autenticazione segue lo stesso schema: 1) un provider di autenticazione che avvolge l'intera app, 2) un Context React che espone lo stato della sessione, 3) un custom hook per leggere i dati dell'utente da qualsiasi componente. Qui vediamo il pattern generico, indipendente dal servizio usato (Auth0, Firebase, NextAuth...). L'oggetto `authClient` rappresenta la libreria del servizio scelto.",
      },
      {
        type: "code",
        language: "javascript",
        title: "AuthProvider generico con Context",
        code: `"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { CircularProgress, Box } from "@mui/material";

const AuthContext = createContext(null);

export function AuthProvider({ children, authClient }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ascolta i cambiamenti di sessione (login, logout, token scaduto...)
  useEffect(() => {
    authClient.onAuthStateChanged((authUser) => {
      setUser(authUser ? { name: authUser.displayName, email: authUser.email } : null);
      setLoading(false);
    });
  }, [authClient]);

  // Se, finito il caricamento, l'utente non è autenticato: vai al login
  useEffect(() => {
    if (!loading && !user) authClient.signInWithRedirect();
  }, [loading, user, authClient]);

  if (loading || !user) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve essere usato dentro AuthProvider");
  return ctx;
}`,
      },
      {
        type: "code",
        language: "javascript",
        title: "Uso nel layout dell'app",
        code: `// app/(area-riservata)/layout.js
import { AuthProvider } from "../../context/AuthContext";
import { authClient } from "../../lib/auth";

export default function AreaRiservataLayout({ children }) {
  return (
    <AuthProvider authClient={authClient}>
      {children}
    </AuthProvider>
  );
}

// In qualsiasi componente figlio (Client Component):
function SalutoUtente() {
  const { user } = useAuth();
  return <Typography>Ciao, {user.name}!</Typography>;
}`,
      },
      {
        type: "subheading",
        content: "Protezione delle rotte",
      },
      {
        type: "text",
        content:
          "Con il pattern AuthProvider proteggere le rotte diventa semplice: dato che il provider non renderizza i children finché l'utente non è autenticato, tutte le pagine sotto di esso sono automaticamente protette. Combinandolo con i route group di Next.js, basta mettere le pagine riservate (es. `/profilo`, `/ordini`) dentro `app/(area-riservata)/` e lasciare fuori quelle pubbliche (es. `/`, `/login`).",
      },
      {
        type: "heading",
        content: "Custom hook avanzato: Redux + useMemo + useRef",
      },
      {
        type: "text",
        content:
          "I custom hook più utili nelle applicazioni reali combinano più concetti: leggono dati da Redux, li trasformano con useMemo per evitare ricalcoli inutili e usano useRef per lavorare con elementi del DOM. Ecco un hook per il catalogo di un negozio online: restituisce i prodotti filtrati secondo i filtri attivi e una funzione per riportare la lista in cima quando i filtri cambiano.",
      },
      {
        type: "code",
        language: "javascript",
        title: "useProdottiFiltrati - hook composito",
        code: `"use client";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useRef } from "react";

function useProdottiFiltrati() {
  const prodotti = useSelector((state) => state.catalogo.prodotti);
  const filtri = useSelector((state) => state.filtri.attivi);
  // es. filtri = { categoria: "libri", disponibile: true }
  const listaRef = useRef(null);

  // Ricalcola il filtro solo quando cambiano prodotti o filtri
  const prodottiFiltrati = useMemo(() => {
    if (!prodotti) return [];
    return prodotti.filter((prodotto) =>
      Object.entries(filtri).every(
        ([chiave, valore]) => valore === "" || valore === null || prodotto[chiave] === valore
      )
    );
  }, [prodotti, filtri]);

  // Quando cambiano i filtri, riporta la lista in cima
  useEffect(() => {
    if (listaRef.current) listaRef.current.scrollTop = 0;
  }, [filtri]);

  return { prodottiFiltrati, listaRef };
}

// Uso nel componente:
function Catalogo() {
  const { prodottiFiltrati, listaRef } = useProdottiFiltrati();

  return (
    <Box ref={listaRef} sx={{ height: 400, overflow: "auto" }}>
      {prodottiFiltrati.map((p) => (
        <Typography key={p.id}>{p.nome}</Typography>
      ))}
    </Box>
  );
}`,
      },
      {
        type: "tip",
        content:
          "Un buon custom hook ha una responsabilità chiara, un nome che inizia con `use` e descrive cosa fa (useProdottiFiltrati, useAuth, useDebounce) e nasconde la complessità dei singoli hook React (useState, useEffect, useMemo, useRef) dietro un'interfaccia semplice.",
      },
    ],
    exercises: [
      {
        type: "code",
        title: "Merge deep di due livelli",
        description:
          "Scrivi una funzione `mergeConfig(base, override)` che fonde due oggetti con la forma `{ colore, impostazioni: { dimensione, opacita } }`. `override` può specificare solo alcuni campi, anche dentro `impostazioni`, oppure non contenere affatto `impostazioni`.\n\nIl risultato deve essere un **nuovo** oggetto: `base` e `override` non devono essere modificati.\n\nEsempio: `mergeConfig({ colore: \"blue\", impostazioni: { dimensione: 10, opacita: 1 } }, { impostazioni: { opacita: 0.5 } })` deve restituire `{ colore: \"blue\", impostazioni: { dimensione: 10, opacita: 0.5 } }`.",
        difficulty: "medio",
        mode: "js",
        starterCode: `function mergeConfig(base, override) {
  // Fondi i campi di primo livello e quelli dentro "impostazioni"
}

const base = { colore: "blue", impostazioni: { dimensione: 10, opacita: 1 } };
console.log(mergeConfig(base, { impostazioni: { opacita: 0.5 } }));
console.log(mergeConfig(base, { colore: "red" }));`,
        solution: `function mergeConfig(base, override) {
  return {
    ...base,
    ...override,
    impostazioni: {
      ...base.impostazioni,
      ...(override.impostazioni || {}),
    },
  };
}

const base = { colore: "blue", impostazioni: { dimensione: 10, opacita: 1 } };
console.log(mergeConfig(base, { impostazioni: { opacita: 0.5 } }));
console.log(mergeConfig(base, { colore: "red" }));`,
        validate: `if (typeof mergeConfig !== "function") return "Definisci la funzione mergeConfig(base, override)";
const b = { colore: "blue", impostazioni: { dimensione: 10, opacita: 1 } };
const r1 = mergeConfig(b, { impostazioni: { opacita: 0.5 } });
if (r1 === undefined) return "mergeConfig deve restituire (return) il nuovo oggetto";
if (!$equal(r1, { colore: "blue", impostazioni: { dimensione: 10, opacita: 0.5 } }))
  return "mergeConfig(base, { impostazioni: { opacita: 0.5 } }) dovrebbe dare { colore: \\"blue\\", impostazioni: { dimensione: 10, opacita: 0.5 } }, invece dà " + $format(r1) + ". Ricorda di fondere separatamente anche impostazioni";
if (!$equal(b, { colore: "blue", impostazioni: { dimensione: 10, opacita: 1 } }))
  return "mergeConfig ha modificato l'oggetto base: crea un nuovo oggetto con lo spread invece di mutarlo";
const r2 = mergeConfig(b, { colore: "red" });
if (!$equal(r2, { colore: "red", impostazioni: { dimensione: 10, opacita: 1 } }))
  return "Se override non contiene impostazioni, vanno mantenute quelle di base. mergeConfig(base, { colore: \\"red\\" }) dà " + $format(r2) + ". Suggerimento: ...(override.impostazioni || {})";
const r3 = mergeConfig(b, { colore: "green", impostazioni: { dimensione: 20, bordo: 1 } });
if (!$equal(r3, { colore: "green", impostazioni: { dimensione: 20, opacita: 1, bordo: 1 } }))
  return "Con override { colore: \\"green\\", impostazioni: { dimensione: 20, bordo: 1 } } il risultato non è corretto: " + $format(r3);
if (!$equal(b, { colore: "blue", impostazioni: { dimensione: 10, opacita: 1 } }))
  return "mergeConfig ha modificato l'oggetto base: crea un nuovo oggetto con lo spread invece di mutarlo";
if (r1 === b || r1.impostazioni === b.impostazioni)
  return "Il risultato deve essere un nuovo oggetto (anche impostazioni deve essere un nuovo oggetto), non lo stesso riferimento di base";
return true;`,
        solutionExplanation:
          "Il primo spread `...base, ...override` copia i campi di primo livello (quelli di override vincono). Poi `impostazioni` viene ricostruito a parte: prima le impostazioni di base, poi quelle di override. `override.impostazioni || {}` gestisce il caso in cui override non abbia impostazioni. Il risultato è un oggetto nuovo, anche al secondo livello, quindi base non viene mai toccato.",
      },
      {
        type: "multiple-choice",
        title: "Cosa stampa lo spread shallow?",
        description:
          "Cosa stampa questo codice?\n\nconst defaults = { tema: \"chiaro\", font: { size: 14, family: \"Arial\" } };\nconst override = { font: { size: 18 } };\nconsole.log({ ...defaults, ...override }.font);",
        difficulty: "medio",
        options: [
          "{ size: 18, family: \"Arial\" }",
          "{ size: 18 }",
          "{ size: 14, family: \"Arial\" }",
          "Un errore, perché non si possono fare due spread nello stesso oggetto",
        ],
        correct: 1,
        explanation:
          "Lo spread lavora su un solo livello: la chiave `font` di override sostituisce per intero l'oggetto `font` di defaults, quindi `family` si perde e resta `{ size: 18 }`. Per ottenere `{ size: 18, family: \"Arial\" }` bisogna fondere anche `font` separatamente (`font: { ...defaults.font, ...override.font }`). `{ size: 14, ... }` sarebbe il risultato se l'ordine degli spread fosse invertito, e fare più spread nello stesso oggetto è perfettamente lecito.",
      },
      {
        type: "multiple-choice",
        title: "Path dinamici in un reducer",
        description:
          "Perché il pattern `setNestedProperty(state, pathKeys, value)` è utile in un reducer con uno stato annidato a più livelli?",
        difficulty: "medio",
        options: [
          "Perché evita di scrivere un reducer per ogni singola combinazione di chiavi annidate, generalizzando l'aggiornamento con un array di chiavi",
          "Perché è l'unico modo per aggiornare oggetti annidati in JavaScript",
          "Perché rende il codice più lento ma più leggibile",
          "Perché Redux Toolkit lo richiede obbligatoriamente per gli stati annidati",
        ],
        correct: 0,
        explanation:
          "Senza un path dinamico servirebbe un reducer (o una action) diverso per ogni possibile combinazione di livelli annidati. Passando un array di chiavi come dato, la stessa funzione generica gestisce qualsiasi profondità e combinazione, riducendo drasticamente la duplicazione. Non è l'unico modo (si può sempre scrivere lo spread annidato a mano), non rallenta il codice in modo significativo e Redux Toolkit non lo richiede: è solo una scelta di design che riduce il codice ripetuto.",
      },
      {
        type: "multiple-choice",
        title: "Pattern AuthProvider",
        description:
          "Qual è il vantaggio principale di avvolgere l'app (o un route group) in un AuthProvider che non renderizza i children finché l'utente non è autenticato?",
        difficulty: "facile",
        options: [
          "Rende l'applicazione più veloce",
          "È richiesto da React per usare useContext",
          "Tutte le pagine sotto il provider sono automaticamente protette, senza bisogno di controlli in ogni componente",
          "Impedisce il rendering lato server",
        ],
        correct: 2,
        explanation:
          "Se AuthProvider rimanda al login quando user è null e renderizza i children solo quando l'utente è autenticato, nessun componente figlio può essere mostrato senza autenticazione. La logica di protezione è centralizzata in un unico punto. Non rende l'app più veloce (anzi, aggiunge un'attesa iniziale), useContext funziona con qualsiasi provider e non impedisce il rendering lato server: è puramente un modo per proteggere le pagine in un solo posto.",
      },
      {
        type: "multiple-choice",
        title: "useAuth fuori dal provider",
        description:
          "Un componente chiama `useAuth()` (l'hook della lezione) ma si trova in una pagina pubblica, FUORI da `<AuthProvider>`. Cosa succede?",
        difficulty: "medio",
        options: [
          "useAuth restituisce un utente vuoto `{ name: \"\" }`",
          "Il componente viene renderizzato normalmente e `user` vale undefined",
          "React reindirizza automaticamente alla pagina di login",
          "Viene lanciato l'errore \"useAuth deve essere usato dentro AuthProvider\"",
        ],
        correct: 3,
        explanation:
          "Fuori dal provider `useContext(AuthContext)` restituisce il valore di default passato a `createContext`, cioè `null`. L'hook controlla proprio questo caso e lancia un errore esplicito: meglio un messaggio chiaro subito che un `user.name` che esplode più avanti con un errore incomprensibile. Nessuno crea un utente vuoto, e il redirect al login lo fa l'AuthProvider, non React né l'hook.",
      },
    ],
  },
  dashboard: {
    sections: [
      {
        type: "text",
        content:
          "In quest'ultima lezione mettiamo insieme tutto quello che hai imparato costruendo, passo dopo passo, una pagina completa: la dashboard degli **ordini** di un negozio online. A sinistra una barra laterale con i filtri (stato dell'ordine, categoria, corriere, anno), in alto tre grafici riassuntivi, sotto una tabella modificabile con tutti gli ordini. In alto, una barra di navigazione per passare dalle altre sezioni (Ordini, Prodotti, Clienti).",
      },
      {
        type: "text",
        content:
          "Non introdurremo quasi nulla di nuovo: useremo HTTP con axios, Next.js App Router e route handler, MUI (Grid, Paper, Stack, Autocomplete), DataGrid e grafici di MUI X, useState, useEffect, useMemo e useCallback. La vera novità è **come organizzare** il codice perché resti leggibile quando la pagina cresce.",
      },
      {
        type: "heading",
        content: "Struttura delle cartelle",
      },
      {
        type: "code",
        language: "text",
        title: "Organizzazione del progetto",
        code: `src/app/
├── (app)/                    # route group: le pagine con header e navigazione
│   ├── layout.js             # header con la barra di navigazione
│   ├── ordini/page.js        # /ordini  → la nostra dashboard
│   ├── prodotti/page.js      # /prodotti
│   └── clienti/page.js       # /clienti
├── api/                      # route handler (il "backend" dentro Next.js)
│   └── ordini/
│       ├── route.js          # GET /api/ordini
│       ├── filtri/route.js   # GET /api/ordini/filtri
│       └── [id]/route.js     # PUT /api/ordini/42
├── components/               # componenti React riutilizzabili
│   ├── header/NavBar.js
│   ├── sidebar/Sidebar.js
│   ├── sidebar/MultiSelectFilter.js
│   └── ordini/
│       ├── OrdiniGrid.js     # DataGrid modificabile
│       └── OrdiniCharts.js   # grafici
├── lib/                      # chiamate HTTP verso le API
│   └── ordini.js
├── helpers/                  # logica pura: niente React, niente HTTP
│   ├── filterRows.js
│   └── contaPer.js
└── constants/                # mappe di configurazione
    ├── filtersMap.js
    └── navigation.js`,
      },
      {
        type: "list",
        items: [
          "`(app)/.../page.js` — la pagina **orchestra**: tiene lo stato (dati, filtri selezionati, caricamento) e passa ai componenti ciò che serve. Contiene poca logica propria.",
          "`components/` — mostrano i dati e notificano le azioni dell'utente tramite props (`onChange`, `onChanged`). Non sanno da dove arrivano i dati.",
          "`lib/` — l'unico posto che conosce gli URL e axios. Se un endpoint cambia, si modifica un solo file.",
          "`helpers/` — funzioni pure: ricevono dati e restituiscono dati, senza effetti collaterali. Sono le più facili da testare e riusare.",
          "`constants/` — mappe di configurazione (quali filtri esistono, a quale campo corrispondono, quali sezioni ha il menu). Cambiare la configurazione non richiede di toccare la logica.",
          "`api/` — i route handler che rispondono alle richieste HTTP del frontend.",
        ],
      },
      {
        type: "tip",
        content:
          "Quando una funzione non ha bisogno di React (nessun hook, nessun JSX), spostala in un file a parte come funzione pura. Diventa più semplice da leggere, da provare con un semplice console.log e da riusare in altre pagine.",
      },
      {
        type: "heading",
        content: "I dati: route handler e lib/",
      },
      {
        type: "text",
        content:
          "Ogni ordine è un oggetto piatto, cioè una riga della tabella: `{ id: 1, cliente: \"Marta\", categoria: \"Libri\", stato: \"Spedito\", corriere: \"Poste\", anno: 2025, totale: 34.5 }`. Il route handler restituisce l'elenco degli ordini e, su un secondo endpoint, le opzioni dei filtri; il file in `lib/` le richiede con axios.",
      },
      {
        type: "code",
        language: "javascript",
        title: "app/api/ordini/filtri/route.js",
        code: `import { leggiOrdini } from "@/src/server/database";

// GET /api/ordini/filtri → [{ label: "Stato", options: ["Consegnato", ...] }, ...]
export async function GET() {
  const ordini = await leggiOrdini();
  const valoriUnici = (campo) =>
    [...new Set(ordini.map((o) => String(o[campo])))].sort();

  return Response.json([
    { label: "Stato", options: valoriUnici("stato") },
    { label: "Categoria", options: valoriUnici("categoria") },
    { label: "Corriere", options: valoriUnici("corriere") },
    { label: "Anno", options: valoriUnici("anno") },
  ]);
}`,
      },
      {
        type: "code",
        language: "javascript",
        title: "lib/ordini.js - tutte le chiamate HTTP in un solo posto",
        code: `import axios from "axios";

const api = axios.create({ baseURL: "/api" });

export async function getOrdini() {
  const { data } = await api.get("/ordini");
  return data;
}

export async function getFiltriOrdini() {
  const { data } = await api.get("/ordini/filtri");
  return data;
}

export async function aggiornaOrdine(ordine) {
  const { data } = await api.put("/ordini/" + ordine.id, ordine);
  return data;
}`,
      },
      {
        type: "info",
        content:
          "Il percorso `@/src/...` usa l'alias `@/` configurato in `jsconfig.json` (vedi la lezione sulla configurazione di Next.js): evita catene di `../../..` e rende gli import uguali da qualsiasi file.",
      },
      {
        type: "heading",
        content: "La forma dei filtri selezionati",
      },
      {
        type: "text",
        content:
          "Lo stato dei filtri è un unico oggetto, `selected`, che associa a ogni **etichetta** di filtro l'array dei valori scelti: `{ \"Stato\": [\"Spedito\", \"Consegnato\"], \"Corriere\": [] }`. Un array vuoto (o un'etichetta assente) significa \"nessun filtro\": mostra tutto. Le etichette però sono pensate per l'utente, mentre le righe hanno dei campi: serve una mappa che dica a quale campo corrisponde ogni filtro.",
      },
      {
        type: "code",
        language: "javascript",
        title: "constants/filtersMap.js",
        code: `// Etichetta del filtro nella sidebar → campo della riga che filtra.
// Le etichette devono coincidere con quelle restituite da /api/ordini/filtri,
// altrimenti il filtro non ha alcun effetto.
export const ORDINI_FILTER_FIELDS = {
  "Stato": "stato",
  "Categoria": "categoria",
  "Corriere": "corriere",
  "Anno": "anno",
};`,
      },
      {
        type: "heading",
        content: "Il cuore della pagina: filterRows",
      },
      {
        type: "text",
        content:
          "Ora scriviamo il filtro come funzione pura, in `helpers/`. Riceve le righe, i filtri selezionati e la mappa etichetta → campo. Una riga resta solo se, **per ogni** filtro attivo (`every`), il valore del suo campo è **tra** quelli selezionati (`includes`). Prima di tutto scartiamo i filtri vuoti: se non ne resta nessuno, restituiamo le righe così come sono.",
      },
      {
        type: "code",
        language: "javascript",
        title: "helpers/filterRows.js",
        code: `export function filterRows(rows, selected, fields) {
  // Solo i filtri con almeno un valore selezionato
  const active = Object.entries(fields).filter(
    ([label]) => selected[label]?.length > 0
  );
  if (active.length === 0) return rows;

  return rows.filter((row) =>
    active.every(([label, field]) =>
      selected[label].includes(String(row[field]))
    )
  );
}

const ordini = [
  { id: 1, stato: "Spedito", corriere: "Poste", anno: 2025 },
  { id: 2, stato: "Consegnato", corriere: "Bartolini", anno: 2024 },
  { id: 3, stato: "Spedito", corriere: "Bartolini", anno: 2025 },
];
const fields = { "Stato": "stato", "Corriere": "corriere", "Anno": "anno" };

filterRows(ordini, {}, fields);                          // tutte e 3
filterRows(ordini, { "Stato": ["Spedito"] }, fields);    // id 1 e 3
filterRows(ordini, { "Stato": ["Spedito"], "Corriere": ["Bartolini"] }, fields); // id 3
filterRows(ordini, { "Anno": ["2024"], "Stato": [] }, fields);                    // id 2`,
      },
      {
        type: "list",
        items: [
          "`Object.entries(fields)` produce coppie `[etichetta, campo]`; il destructuring `([label]) =>` prende solo l'etichetta.",
          "`selected[label]?.length > 0`: l'optional chaining evita l'errore se per quell'etichetta non c'è ancora nulla in `selected`.",
          "Tra filtri diversi la logica è **E** (`every`: la riga deve soddisfarli tutti); dentro lo stesso filtro è **O** (`includes`: basta uno dei valori scelti).",
          "I filtri presenti in `selected` ma non in `fields` vengono ignorati: così la stessa sidebar può servire tabelle diverse, ognuna con la sua mappa.",
        ],
      },
      {
        type: "warning",
        content:
          "Le opzioni di un Autocomplete sono stringhe, ma alcuni campi delle righe sono numeri (`anno: 2025`). `[\"2025\"].includes(2025)` è `false`, perché `includes` usa il confronto stretto. Per questo il valore della riga viene convertito con `String(row[field])` prima del confronto.",
      },
      {
        type: "heading",
        content: "La sidebar: filtri multi-selezione controllati",
      },
      {
        type: "text",
        content:
          "Ogni filtro è un Autocomplete `multiple`. È un componente **controllato**: non ha stato proprio, riceve il valore (`value`) e comunica le modifiche (`onChange`). La sidebar riceve l'elenco dei filtri, l'oggetto `selected` e una sola funzione `onChange(label, values)`, che chiama indicando quale filtro è cambiato.",
      },
      {
        type: "code",
        language: "javascript",
        title: "components/sidebar/MultiSelectFilter.js",
        code: `"use client";
import { Autocomplete, TextField, Stack, Typography } from "@mui/material";

export default function MultiSelectFilter({ label, options, value, onChange }) {
  return (
    <Stack sx={{ width: 230, mt: 1 }}>
      <Typography variant="body2">{label}</Typography>
      <Autocomplete
        multiple
        size="small"
        limitTags={3}
        options={options}
        value={value}
        // Il primo argomento è l'evento: a noi serve solo il nuovo array
        onChange={(_, newValue) => onChange(newValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={value.length === 0 ? "Tutti" : undefined}
          />
        )}
      />
    </Stack>
  );
}`,
      },
      {
        type: "code",
        language: "javascript",
        title: "components/sidebar/Sidebar.js",
        code: `"use client";
import { Stack, Typography } from "@mui/material";
import MultiSelectFilter from "./MultiSelectFilter";

// filters: [{ label: "Stato", options: [...] }, ...]
// selected: { "Stato": ["Spedito"], ... }
export default function Sidebar({ filters, selected, onChange }) {
  return (
    <Stack sx={{ width: 260, pl: 2, borderRight: 1, borderColor: "divider" }}>
      <Typography color="primary" fontWeight="bold">Filtri</Typography>

      {filters.map(({ label, options }) => (
        <MultiSelectFilter
          key={label}
          label={label}
          options={options}
          value={selected[label] ?? []}
          onChange={(values) => onChange(label, values)}
        />
      ))}
    </Stack>
  );
}`,
      },
      {
        type: "text",
        content:
          "Nota `selected[label] ?? []`: all'inizio `selected` è vuoto, ma un Autocomplete `multiple` vuole sempre un array. E nota che la sidebar non sa nulla di ordini: potresti riusarla identica nella pagina Prodotti, passandole altri filtri.",
      },
      {
        type: "heading",
        content: "La pagina: stato e righe visibili",
      },
      {
        type: "code",
        language: "javascript",
        title: "app/(app)/ordini/page.js - lo stato",
        code: `"use client";
import { useState, useMemo, useCallback, useEffect } from "react";
import { filterRows } from "@/src/app/helpers/filterRows";
import { ORDINI_FILTER_FIELDS } from "@/src/app/constants/filtersMap";

export default function OrdiniPage() {
  const [ordini, setOrdini] = useState([]);    // tutte le righe ricevute
  const [filters, setFilters] = useState([]);  // opzioni dei filtri
  const [selected, setSelected] = useState({}); // valori scelti
  const [loading, setLoading] = useState(true);

  // Righe dopo i filtri: ricalcolate solo se cambiano dati o selezione
  const visibleRows = useMemo(
    () => filterRows(ordini, selected, ORDINI_FILTER_FIELDS),
    [ordini, selected]
  );

  // Aggiorna UN filtro lasciando intatti gli altri
  const handleFilterChange = useCallback((label, values) => {
    setSelected((current) => ({ ...current, [label]: values }));
  }, []);

  // ... caricamento dei dati e JSX (vedi sotto)
}`,
      },
      {
        type: "text",
        content:
          "`handleFilterChange` usa tre cose che conosci: l'**aggiornamento funzionale** (`current => ...`, così parte sempre dallo stato più recente), lo **spread** (copia tutti i filtri esistenti, senza mutare l'oggetto) e la **computed property** `[label]` (la chiave è il valore della variabile, es. \"Stato\"). Scrivere `setSelected({ [label]: values })` cancellerebbe tutti gli altri filtri. Grazie a `useCallback` senza dipendenze, la funzione resta la stessa a ogni render.",
      },
      {
        type: "info",
        content:
          "Lo stato contiene solo i dati \"di partenza\" (tutti gli ordini e la selezione); `visibleRows` è un **dato derivato** e quindi non va salvato in un altro useState: si calcola con useMemo. Così non può mai andare fuori sincrono rispetto agli ordini o ai filtri.",
      },
      {
        type: "heading",
        content: "Caricamento dei dati e ricaricamento silenzioso",
      },
      {
        type: "code",
        language: "javascript",
        title: "Caricamento con useCallback + useEffect",
        code: `import { getOrdini, getFiltriOrdini } from "@/src/app/lib/ordini";

// (dentro OrdiniPage)
const fetchFilters = useCallback(async () => {
  try {
    setFilters(await getFiltriOrdini());
  } catch (error) {
    // Se il ricaricamento fallisce, teniamo le opzioni che avevamo
    console.error("Errore nel caricare i filtri:", error.message);
  }
}, []);

const fetchData = useCallback(async ({ silent = false } = {}) => {
  if (!silent) setLoading(true);
  try {
    setOrdini(await getOrdini());
  } catch (error) {
    console.error("Errore nel caricare gli ordini:", error.message);
    // Al primo caricamento svuotiamo; in un ricaricamento silenzioso
    // teniamo le righe correnti invece di far sparire la tabella
    if (!silent) setOrdini([]);
  } finally {
    if (!silent) setLoading(false);
  }
}, []);

// Caricamento iniziale
useEffect(() => {
  fetchFilters();
  fetchData();
}, [fetchFilters, fetchData]);

// Chiamata dalla tabella dopo un salvataggio riuscito
const handleOrdiniChanged = useCallback(({ reloadRows = false } = {}) => {
  fetchFilters(); // un nuovo valore potrebbe aver aggiunto un'opzione
  if (reloadRows) fetchData({ silent: true });
}, [fetchFilters, fetchData]);`,
      },
      {
        type: "text",
        content:
          "Perché `useCallback`? Le funzioni sono nelle dipendenze di `useEffect`: senza useCallback sarebbero nuove a ogni render e l'effetto ripartirebbe di continuo. Il parametro `{ silent = false } = {}` usa destructuring con valori di default: si può chiamare `fetchData()` senza argomenti oppure `fetchData({ silent: true })`.",
      },
      {
        type: "text",
        content:
          "Il ricaricamento **silenzioso** serve dopo un salvataggio: i dati vanno aggiornati, ma non vogliamo mostrare lo spinner. Se `loading` tornasse `true`, la tabella mostrerebbe la schermata di caricamento e l'utente perderebbe il punto in cui si trovava (pagina corrente, scroll, larghezza delle colonne). Con `silent` le righe vengono semplicemente sostituite quando arrivano.",
      },
      {
        type: "warning",
        content:
          "Gestisci sempre il caso di errore. Se un ricaricamento fallisce (rete assente, server lento), non svuotare la tabella: l'utente vedrebbe sparire tutti i dati per un problema temporaneo. Meglio tenere i dati correnti e segnalare l'errore.",
      },
      {
        type: "heading",
        content: "La tabella avvisa la pagina: onChanged",
      },
      {
        type: "text",
        content:
          "La DataGrid modificabile vive in un suo componente. Quando una modifica viene salvata con successo, non ricarica i dati da sola (non sa come si fa, e non deve saperlo): chiama la prop `onChanged({ reloadRows: true })` e lascia decidere alla pagina.",
      },
      {
        type: "code",
        language: "javascript",
        title: "components/ordini/OrdiniGrid.js",
        code: `"use client";
import { DataGrid } from "@mui/x-data-grid";
import { aggiornaOrdine } from "@/src/app/lib/ordini";

const columns = [
  { field: "id", headerName: "N.", width: 70 },
  { field: "cliente", headerName: "Cliente", flex: 1 },
  { field: "categoria", headerName: "Categoria", width: 140 },
  {
    field: "stato", headerName: "Stato", width: 140, editable: true,
    type: "singleSelect", valueOptions: ["In preparazione", "Spedito", "Consegnato"],
  },
  { field: "corriere", headerName: "Corriere", width: 130 },
  { field: "totale", headerName: "Totale (€)", type: "number", width: 110 },
];

export default function OrdiniGrid({ rows, loading, onChanged }) {
  const processRowUpdate = async (newRow) => {
    const salvato = await aggiornaOrdine(newRow); // se fallisce, la riga torna com'era
    onChanged?.({ reloadRows: true });
    return salvato;
  };

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      loading={loading}
      processRowUpdate={processRowUpdate}
      onProcessRowUpdateError={(error) => console.error(error.message)}
      initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
      pageSizeOptions={[10, 25, 50]}
    />
  );
}`,
      },
      {
        type: "heading",
        content: "Il layout: grafici sopra, tabella sotto",
      },
      {
        type: "text",
        content:
          "Anche i grafici leggono `visibleRows`, così reagiscono ai filtri insieme alla tabella. Per prepararne i dati basta un altro helper puro: conta quante righe hanno ciascun valore di un campo.",
      },
      {
        type: "code",
        language: "javascript",
        title: "helpers/contaPer.js e i grafici",
        code: `// contaPer(righe, "stato") → { "Spedito": 2, "Consegnato": 1 }
export function contaPer(rows, field) {
  return rows.reduce((acc, row) => {
    acc[row[field]] = (acc[row[field]] ?? 0) + 1;
    return acc;
  }, {});
}

// components/ordini/OrdiniCharts.js
import { PieChart } from "@mui/x-charts/PieChart";

export function StatoPieChart({ rows }) {
  const data = Object.entries(contaPer(rows, "stato")).map(
    ([label, value], id) => ({ id, label, value })
  );
  return <PieChart series={[{ data, innerRadius: 40 }]} height={280} />;
}`,
      },
      {
        type: "code",
        language: "javascript",
        title: "app/(app)/ordini/page.js - il JSX",
        code: `return (
  <Stack direction="row" spacing={2} sx={{ width: "100%", p: 1 }}>
    <Sidebar filters={filters} selected={selected} onChange={handleFilterChange} />

    {/* minWidth: 0 permette alla colonna di restringersi accanto alla sidebar */}
    <Stack spacing={2} sx={{ flex: 1, minWidth: 0 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper variant="outlined" sx={{ p: 2, height: 320 }}>
            <StatoPieChart rows={visibleRows} />
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper variant="outlined" sx={{ p: 2, height: 320 }}>
            <CategoriaBarChart rows={visibleRows} />
          </Paper>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper variant="outlined" sx={{ p: 2, height: 320 }}>
            <IncassoLineChart rows={visibleRows} />
          </Paper>
        </Grid>
      </Grid>

      <OrdiniGrid rows={visibleRows} loading={loading} onChanged={handleOrdiniChanged} />
    </Stack>
  </Stack>
);`,
      },
      {
        type: "text",
        content:
          "`Grid size={{ xs: 12, md: 4 }}` fa sì che i tre pannelli stiano affiancati su schermi medi e grandi, e uno sotto l'altro su schermi piccoli. Tutti i componenti ricevono solo ciò che serve loro: la pagina tiene lo stato, i figli mostrano e notificano.",
      },
      {
        type: "heading",
        content: "Filtri a cascata",
      },
      {
        type: "text",
        content:
          "Un miglioramento molto apprezzato dagli utenti: le opzioni di ogni filtro mostrano solo i valori ancora possibili dati gli **altri** filtri. Se scelgo il corriere \"Poste\", nel filtro Categoria devono comparire solo le categorie che hanno almeno un ordine spedito con Poste. Il trucco: per calcolare le opzioni di un filtro, si filtrano le righe con tutti gli altri filtri, ignorando quello stesso (altrimenti, dopo aver scelto un valore, gli altri sparirebbero e non potresti più aggiungerli).",
      },
      {
        type: "code",
        language: "javascript",
        title: "helpers/cascadingOptions.js",
        code: `import { filterRows } from "./filterRows";

// → { "Stato": ["Consegnato", "Spedito"], "Corriere": ["Poste"], ... }
export function cascadingOptions(rows, selected, fields) {
  return Object.fromEntries(
    Object.entries(fields).map(([label, field]) => {
      // Tutti i filtri tranne questo
      const altri = { ...selected, [label]: [] };
      const righe = filterRows(rows, altri, fields);
      const valori = [...new Set(righe.map((row) => String(row[field])))].sort();
      return [label, valori];
    })
  );
}

// Nella pagina:
const opzioni = useMemo(
  () => cascadingOptions(ordini, selected, ORDINI_FILTER_FIELDS),
  [ordini, selected]
);
// La sidebar vuole [{ label, options }]
const cascadingFilters = useMemo(
  () => Object.entries(opzioni).map(([label, options]) => ({ label, options })),
  [opzioni]
);`,
      },
      {
        type: "list",
        items: [
          "`{ ...selected, [label]: [] }` crea una copia di `selected` in cui il filtro corrente è svuotato: `selected` resta intatto.",
          "`new Set(...)` elimina i valori ripetuti, lo spread `[...]` lo riconverte in array e `sort()` li ordina alfabeticamente.",
          "`Object.fromEntries` trasforma l'array di coppie `[etichetta, valori]` in un oggetto: è l'inverso di `Object.entries`.",
          "Tutto è dentro `useMemo`: il calcolo scorre tutte le righe per ogni filtro, quindi conviene rifarlo solo quando cambiano ordini o selezione.",
        ],
      },
      {
        type: "heading",
        content: "Navigazione tra le sezioni",
      },
      {
        type: "text",
        content:
          "Le sezioni dell'app sono una costante: aggiungere una pagina al menu significa aggiungere una riga all'array. La barra di navigazione, nel layout del route group `(app)`, usa `usePathname` per evidenziare la sezione attiva.",
      },
      {
        type: "code",
        language: "javascript",
        title: "constants/navigation.js e components/header/NavBar.js",
        code: `// constants/navigation.js — sezioni in ordine di visualizzazione
export const NAV_SECTIONS = [
  { label: "Ordini", href: "/ordini" },
  { label: "Prodotti", href: "/prodotti" },
  { label: "Clienti", href: "/clienti" },
];

// components/header/NavBar.js
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Stack, Box } from "@mui/material";
import { NAV_SECTIONS } from "@/src/app/constants/navigation";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <Stack direction="row">
      {NAV_SECTIONS.map(({ label, href }) => {
        const active = pathname === href;
        return (
          <Box
            key={href}
            component={Link}
            href={href}
            sx={{
              px: 2, py: 1,
              textDecoration: "none",
              color: "text.primary",
              fontWeight: active ? "bold" : "normal",
              borderBottom: 3,
              borderColor: active ? "primary.main" : "transparent",
            }}
          >
            {label}
          </Box>
        );
      })}
    </Stack>
  );
}`,
      },
      {
        type: "info",
        content:
          "`component={Link}` dice al Box di MUI di renderizzarsi come il Link di Next.js: ottieni la navigazione lato client di Next.js e lo stile con `sx` di MUI nello stesso elemento. Il bordo inferiore è sempre presente (trasparente quando il link non è attivo), così il testo non \"salta\" di qualche pixel quando cambi pagina.",
      },
      {
        type: "heading",
        content: "Riepilogo",
      },
      {
        type: "list",
        items: [
          "La pagina tiene lo stato minimo (dati, opzioni, selezione, caricamento); tutto il resto è derivato con useMemo.",
          "La logica (filtri, conteggi, opzioni a cascata) vive in funzioni pure dentro `helpers/`.",
          "Le chiamate HTTP stanno in `lib/`, le mappe di configurazione in `constants/`.",
          "I componenti sono controllati: ricevono valori e callback, non decidono da soli come caricare o salvare.",
          "Dopo un salvataggio si ricarica in modo silenzioso, e se qualcosa va storto si mantengono i dati correnti.",
        ],
      },
      {
        type: "tip",
        content:
          "Quando una pagina inizia a diventare lunga, chiediti per ogni pezzo: è stato, è un dato derivato, è logica pura, è una chiamata HTTP o è interfaccia? Ognuna di queste risposte ha il suo posto, e rispettarlo rende il codice facile da modificare anche dopo mesi.",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "Filtri vuoti",
        description:
          "Con le righe e i campi dell'esempio della lezione, cosa restituisce questa chiamata?\n\nfilterRows(ordini, { \"Stato\": [], \"Corriere\": [\"Poste\"] }, fields);",
        difficulty: "facile",
        options: [
          "Un array vuoto, perché nessun ordine ha uno stato tra quelli di `[]`",
          "Solo gli ordini con corriere \"Poste\"",
          "Tutti gli ordini, perché un filtro è vuoto",
          "Un errore, perché `[].includes(...)` non è valido",
        ],
        correct: 1,
        explanation:
          "`filterRows` scarta i filtri vuoti prima di filtrare: \"Stato\" con `[]` significa \"nessun vincolo\", quindi resta attivo solo \"Corriere\". Se i filtri vuoti non venissero scartati, `[].includes(...)` darebbe sempre `false` (non un errore) e la tabella sarebbe vuota: proprio il bug che vogliamo evitare. Tutti gli ordini si ottengono solo se TUTTI i filtri sono vuoti.",
      },
      {
        type: "multiple-choice",
        title: "Aggiornare un filtro",
        description:
          "`selected` vale `{ \"Stato\": [\"Spedito\"], \"Anno\": [\"2025\"] }`. L'utente sceglie \"Poste\" nel filtro Corriere e viene eseguito:\n\nsetSelected({ [label]: values });   // label = \"Corriere\", values = [\"Poste\"]\n\nQual è il problema?",
        difficulty: "medio",
        options: [
          "Nessuno: React fonde automaticamente il nuovo oggetto con quello precedente",
          "Le parentesi quadre non sono valide come chiave di un oggetto",
          "`selected` viene mutato direttamente",
          "I filtri Stato e Anno vengono persi: il nuovo stato è solo `{ \"Corriere\": [\"Poste\"] }`",
        ],
        correct: 3,
        explanation:
          "Il setter di useState sostituisce lo stato per intero, non lo fonde. Bisogna copiare i filtri esistenti: `setSelected(current => ({ ...current, [label]: values }))`. `[label]` è una computed property perfettamente valida (la chiave diventa \"Corriere\"), e l'oggetto passato è nuovo, quindi non c'è mutazione: il difetto è solo la perdita degli altri filtri.",
      },
      {
        type: "multiple-choice",
        title: "Numeri e stringhe",
        description:
          "Una riga ha `anno: 2025` (numero) e nel filtro Anno l'utente ha scelto `\"2025\"` (le opzioni dell'Autocomplete sono stringhe). Cosa succede se `filterRows` usa `selected[label].includes(row[field])` senza `String(...)`?",
        difficulty: "medio",
        options: [
          "La riga viene esclusa, perché `includes` confronta con `===` e `\"2025\" !== 2025`",
          "La riga viene inclusa, perché `includes` converte automaticamente i tipi",
          "Viene lanciato un TypeError",
          "La riga viene inclusa solo se l'anno è l'unico filtro attivo",
        ],
        correct: 0,
        explanation:
          "`includes` usa il confronto stretto (come `===`): un numero non è mai uguale a una stringa, quindi la riga sparisce senza alcun errore. È un bug silenzioso, ed è per questo che `filterRows` converte il valore della riga con `String(row[field])`. Il numero di filtri attivi non c'entra.",
      },
      {
        type: "multiple-choice",
        title: "Ricaricamento fallito",
        description:
          "Dopo un salvataggio la pagina chiama `fetchData({ silent: true })`, ma la richiesta fallisce per un problema di rete. Qual è il comportamento migliore?",
        difficulty: "medio",
        options: [
          "Svuotare la tabella con `setOrdini([])`, così l'utente capisce che c'è un problema",
          "Mostrare lo spinner finché la rete non torna",
          "Mantenere le righe correnti e registrare/segnalare l'errore",
          "Ricaricare l'intera pagina del browser",
        ],
        correct: 2,
        explanation:
          "I dati correnti sono ancora validi (al massimo un po' vecchi): farli sparire per un errore temporaneo è peggio che mostrare dati leggermente non aggiornati. Lo spinner non ha senso in un ricaricamento silenzioso e smonterebbe la tabella; ricaricare il browser farebbe perdere filtri e posizione. Svuotare la tabella ha senso solo se fallisce il primo caricamento, quando non c'è nulla da mostrare.",
      },
      {
        type: "multiple-choice",
        title: "Dove va questo codice?",
        description:
          "Devi scrivere una funzione che, dato l'elenco degli ordini, calcola il totale incassato per ogni categoria. Non usa hook né axios. Dove la metti?",
        difficulty: "facile",
        options: [
          "In `lib/`, insieme alle chiamate HTTP",
          "In `helpers/`, come funzione pura richiamata dalla pagina o dal grafico",
          "Direttamente dentro il JSX del grafico",
          "In `constants/`, perché il risultato non cambia",
        ],
        correct: 1,
        explanation:
          "È logica pura (dati in ingresso, dati in uscita), quindi va in `helpers/`: si può provare con un console.log e riusare. `lib/` è per le chiamate HTTP, `constants/` per le mappe di configurazione fisse (il totale invece dipende dagli ordini), e scriverla nel JSX la renderebbe illeggibile e non riutilizzabile.",
      },
      {
        type: "code",
        title: "Aggiornare la selezione senza mutarla",
        description:
          "Scrivi la funzione `updateSelected(selected, label, values)` che restituisce un **nuovo** oggetto uguale a `selected`, ma con la chiave `label` impostata a `values`. È la funzione che passeresti a `setSelected`.\n\nUsa lo spread e una computed property. `selected` non deve essere modificato.\n\nEsempio: `updateSelected({ Stato: [\"Spedito\"] }, \"Anno\", [\"2025\"])` → `{ Stato: [\"Spedito\"], Anno: [\"2025\"] }`.",
        difficulty: "facile",
        mode: "js",
        starterCode: `function updateSelected(selected, label, values) {
  // Restituisci un nuovo oggetto
}

const selected = { Stato: ["Spedito"] };
console.log(updateSelected(selected, "Anno", ["2025"]));
console.log(updateSelected(selected, "Stato", []));
console.log(selected); // deve restare { Stato: ["Spedito"] }`,
        solution: `function updateSelected(selected, label, values) {
  return { ...selected, [label]: values };
}

const selected = { Stato: ["Spedito"] };
console.log(updateSelected(selected, "Anno", ["2025"]));
console.log(updateSelected(selected, "Stato", []));
console.log(selected); // deve restare { Stato: ["Spedito"] }`,
        validate: `if (typeof updateSelected !== "function") return "Definisci la funzione updateSelected(selected, label, values)";
const s = { Stato: ["Spedito"], Corriere: ["Poste"] };
const r1 = updateSelected(s, "Anno", ["2025"]);
if (r1 === undefined) return "updateSelected deve restituire (return) il nuovo oggetto";
if (!$equal(r1, { Stato: ["Spedito"], Corriere: ["Poste"], Anno: ["2025"] }))
  return "Aggiungendo il filtro Anno gli altri devono restare: ottengo " + $format(r1);
if (!$equal(s, { Stato: ["Spedito"], Corriere: ["Poste"] }))
  return "updateSelected ha modificato l'oggetto selected: crea un nuovo oggetto con lo spread";
if (r1 === s) return "Devi restituire un oggetto nuovo, non lo stesso selected";
const r2 = updateSelected(s, "Stato", ["Consegnato", "Spedito"]);
if (!$equal(r2, { Stato: ["Consegnato", "Spedito"], Corriere: ["Poste"] }))
  return "Se il filtro esiste già, il suo valore va sostituito: ottengo " + $format(r2) + ". Usa una computed property [label]";
const r3 = updateSelected({}, "Categoria", []);
if (!$equal(r3, { Categoria: [] })) return "updateSelected({}, \\"Categoria\\", []) dovrebbe dare { Categoria: [] }, ottengo " + $format(r3);
return true;`,
      },
      {
        type: "code",
        title: "Implementa filterRows",
        description:
          "Scrivi `filterRows(rows, selected, fields)`:\n- `selected` associa a ogni etichetta di filtro un array di valori scelti (stringhe), es. `{ \"Stato\": [\"Spedito\"] }`;\n- `fields` associa a ogni etichetta il campo della riga, es. `{ \"Stato\": \"stato\" }`;\n- i filtri vuoti o assenti in `selected` vanno ignorati (se non ce n'è nessuno attivo restituisci `rows`);\n- una riga resta se, per **ogni** filtro attivo, il valore del suo campo (convertito in stringa) è **incluso** tra quelli scelti;\n- le etichette presenti in `selected` ma non in `fields` vanno ignorate.\n\nUsa `every` e `includes`.",
        difficulty: "medio",
        mode: "js",
        starterCode: `function filterRows(rows, selected, fields) {
  // 1. Trova i filtri attivi (in fields e con almeno un valore in selected)
  // 2. Tieni le righe che soddisfano tutti i filtri attivi
  return rows;
}

const ordini = [
  { id: 1, stato: "Spedito", corriere: "Poste", anno: 2025 },
  { id: 2, stato: "Consegnato", corriere: "Bartolini", anno: 2024 },
  { id: 3, stato: "Spedito", corriere: "Bartolini", anno: 2025 },
];
const fields = { "Stato": "stato", "Corriere": "corriere", "Anno": "anno" };

console.log(filterRows(ordini, { "Stato": ["Spedito"] }, fields));
console.log(filterRows(ordini, { "Anno": ["2024"], "Corriere": [] }, fields));`,
        solution: `function filterRows(rows, selected, fields) {
  const active = Object.entries(fields).filter(
    ([label]) => selected[label]?.length > 0
  );
  if (active.length === 0) return rows;

  return rows.filter((row) =>
    active.every(([label, field]) =>
      selected[label].includes(String(row[field]))
    )
  );
}

const ordini = [
  { id: 1, stato: "Spedito", corriere: "Poste", anno: 2025 },
  { id: 2, stato: "Consegnato", corriere: "Bartolini", anno: 2024 },
  { id: 3, stato: "Spedito", corriere: "Bartolini", anno: 2025 },
];
const fields = { "Stato": "stato", "Corriere": "corriere", "Anno": "anno" };

console.log(filterRows(ordini, { "Stato": ["Spedito"] }, fields));
console.log(filterRows(ordini, { "Anno": ["2024"], "Corriere": [] }, fields));`,
        validate: `if (typeof filterRows !== "function") return "Definisci la funzione filterRows(rows, selected, fields)";
const rows = [
  { id: 1, stato: "Spedito", corriere: "Poste", anno: 2025 },
  { id: 2, stato: "Consegnato", corriere: "Bartolini", anno: 2024 },
  { id: 3, stato: "Spedito", corriere: "Bartolini", anno: 2025 },
  { id: 4, stato: "In preparazione", corriere: "Poste", anno: 2024 },
];
const f = { "Stato": "stato", "Corriere": "corriere", "Anno": "anno" };
const ids = (r) => Array.isArray(r) ? r.map((x) => x.id) : r;
const r0 = filterRows(rows, {}, f);
if (!Array.isArray(r0) || r0.length !== 4) return "Senza filtri selezionati devono restare tutte le righe, ottengo " + $format(ids(r0));
const r1 = filterRows(rows, { "Stato": ["Spedito"] }, f);
if (!$equal(ids(r1), [1, 3])) return "Con Stato = [\\"Spedito\\"] mi aspetto gli id [1, 3], ottengo " + $format(ids(r1));
const r2 = filterRows(rows, { "Stato": ["Spedito", "Consegnato"] }, f);
if (!$equal(ids(r2), [1, 2, 3])) return "Dentro lo stesso filtro basta UNO dei valori (includes): con Stato = [\\"Spedito\\", \\"Consegnato\\"] mi aspetto [1, 2, 3], ottengo " + $format(ids(r2));
const r3 = filterRows(rows, { "Stato": ["Spedito"], "Corriere": ["Bartolini"] }, f);
if (!$equal(ids(r3), [3])) return "Filtri diversi devono valere TUTTI insieme (every): con Stato Spedito e Corriere Bartolini mi aspetto [3], ottengo " + $format(ids(r3));
const r4 = filterRows(rows, { "Stato": [], "Corriere": ["Poste"] }, f);
if (!$equal(ids(r4), [1, 4])) return "Un filtro con array vuoto va ignorato: con Stato = [] e Corriere = [\\"Poste\\"] mi aspetto [1, 4], ottengo " + $format(ids(r4));
const r5 = filterRows(rows, { "Anno": ["2024"] }, f);
if (!$equal(ids(r5), [2, 4])) return "anno è un numero ma i valori scelti sono stringhe: converti con String(row[field]). Con Anno = [\\"2024\\"] mi aspetto [2, 4], ottengo " + $format(ids(r5));
const r6 = filterRows(rows, { "Colore": ["Rosso"], "Stato": ["Consegnato"] }, f);
if (!$equal(ids(r6), [2])) return "Le etichette che non sono in fields vanno ignorate: con Colore (non in fields) e Stato Consegnato mi aspetto [2], ottengo " + $format(ids(r6));
const r7 = filterRows(rows, { "Stato": [], "Anno": [] }, f);
if (!Array.isArray(r7) || r7.length !== 4) return "Se tutti i filtri sono vuoti devono restare tutte le righe, ottengo " + $format(ids(r7));
const r8 = filterRows(rows, { "Corriere": ["Poste"], "Anno": ["2023"] }, f);
if (!$equal(ids(r8), [])) return "Con Corriere Poste e Anno 2023 non deve restare nessuna riga, ottengo " + $format(ids(r8));
if (rows.length !== 4) return "filterRows non deve modificare l'array rows";
if (!/\\.every\\(/.test($codeNoComments)) return "Usa every per richiedere che tutti i filtri attivi siano soddisfatti";
if (!/\\.includes\\(/.test($codeNoComments)) return "Usa includes per controllare se il valore è tra quelli scelti";
return true;`,
        solutionExplanation:
          "Prima si ricavano i filtri attivi partendo da `fields` (così le etichette sconosciute sono ignorate automaticamente) e scartando quelli senza valori, con `selected[label]?.length > 0` che funziona anche se l'etichetta manca. Se non ne resta nessuno si restituiscono le righe. Altrimenti `filter` tiene le righe per cui `every` filtro attivo contiene (`includes`) il valore del campo, convertito con `String` perché le opzioni sono stringhe e gli anni numeri.",
      },
      {
        type: "code",
        title: "Opzioni dei filtri a cascata",
        description:
          "Scrivi `cascadingOptions(rows, selected, fields)` che restituisce un oggetto `{ [etichetta]: valori[] }` con, per ogni etichetta di `fields`, i valori **unici**, convertiti in stringa e **ordinati** (`sort()`), del campo corrispondente, presi dalle righe che soddisfano tutti gli **altri** filtri (il filtro stesso va ignorato).\n\n`filterRows` è già pronta: usala. Ti serviranno anche `new Set`, lo spread e `Object.fromEntries`.\n\nEsempio: con Corriere = [\"Poste\"] selezionato, le opzioni di Stato sono solo gli stati degli ordini spediti con Poste, mentre le opzioni di Corriere restano tutti i corrieri.",
        difficulty: "difficile",
        mode: "js",
        starterCode: `function filterRows(rows, selected, fields) {
  const active = Object.entries(fields).filter(([label]) => selected[label]?.length > 0);
  if (active.length === 0) return rows;
  return rows.filter((row) =>
    active.every(([label, field]) => selected[label].includes(String(row[field])))
  );
}

function cascadingOptions(rows, selected, fields) {
  // Per ogni [label, field] di fields:
  //  1. filtra le righe con tutti i filtri TRANNE label
  //  2. prendi i valori unici di field, come stringhe, ordinati
}

const ordini = [
  { id: 1, stato: "Spedito", corriere: "Poste", anno: 2025 },
  { id: 2, stato: "Consegnato", corriere: "Bartolini", anno: 2024 },
  { id: 3, stato: "Spedito", corriere: "Bartolini", anno: 2025 },
  { id: 4, stato: "In preparazione", corriere: "Poste", anno: 2024 },
];
const fields = { "Stato": "stato", "Corriere": "corriere", "Anno": "anno" };

console.log(cascadingOptions(ordini, { "Corriere": ["Poste"] }, fields));`,
        solution: `function filterRows(rows, selected, fields) {
  const active = Object.entries(fields).filter(([label]) => selected[label]?.length > 0);
  if (active.length === 0) return rows;
  return rows.filter((row) =>
    active.every(([label, field]) => selected[label].includes(String(row[field])))
  );
}

function cascadingOptions(rows, selected, fields) {
  return Object.fromEntries(
    Object.entries(fields).map(([label, field]) => {
      const altri = { ...selected, [label]: [] };
      const righe = filterRows(rows, altri, fields);
      const valori = [...new Set(righe.map((row) => String(row[field])))].sort();
      return [label, valori];
    })
  );
}

const ordini = [
  { id: 1, stato: "Spedito", corriere: "Poste", anno: 2025 },
  { id: 2, stato: "Consegnato", corriere: "Bartolini", anno: 2024 },
  { id: 3, stato: "Spedito", corriere: "Bartolini", anno: 2025 },
  { id: 4, stato: "In preparazione", corriere: "Poste", anno: 2024 },
];
const fields = { "Stato": "stato", "Corriere": "corriere", "Anno": "anno" };

console.log(cascadingOptions(ordini, { "Corriere": ["Poste"] }, fields));`,
        validate: `if (typeof cascadingOptions !== "function") return "Definisci la funzione cascadingOptions(rows, selected, fields)";
const rows = [
  { id: 1, stato: "Spedito", corriere: "Poste", anno: 2025 },
  { id: 2, stato: "Consegnato", corriere: "Bartolini", anno: 2024 },
  { id: 3, stato: "Spedito", corriere: "Bartolini", anno: 2025 },
  { id: 4, stato: "In preparazione", corriere: "Poste", anno: 2024 },
  { id: 5, stato: "Consegnato", corriere: "Poste", anno: 2025 },
];
const f = { "Stato": "stato", "Corriere": "corriere", "Anno": "anno" };
const r0 = cascadingOptions(rows, {}, f);
if (r0 === undefined) return "cascadingOptions deve restituire (return) un oggetto";
const atteso0 = { "Stato": ["Consegnato", "In preparazione", "Spedito"], "Corriere": ["Bartolini", "Poste"], "Anno": ["2024", "2025"] };
if (!$equal(r0, atteso0)) return "Senza filtri mi aspetto tutti i valori unici, come stringhe e ordinati: " + $format(atteso0) + ", ottengo " + $format(r0);
const sel = { "Corriere": ["Poste"] };
const r1 = cascadingOptions(rows, sel, f);
const atteso1 = { "Stato": ["Consegnato", "In preparazione", "Spedito"], "Corriere": ["Bartolini", "Poste"], "Anno": ["2024", "2025"] };
if (!$equal(r1.Corriere, atteso1.Corriere)) return "Le opzioni di un filtro non devono dipendere dal filtro stesso: con Corriere = [\\"Poste\\"] le opzioni di Corriere devono restare [\\"Bartolini\\", \\"Poste\\"], ottengo " + $format(r1.Corriere);
if (!$equal(sel, { "Corriere": ["Poste"] })) return "cascadingOptions non deve modificare selected: crea una copia con lo spread";
const r2 = cascadingOptions(rows, { "Corriere": ["Bartolini"] }, f);
if (!$equal(r2.Stato, ["Consegnato", "Spedito"])) return "Con Corriere = [\\"Bartolini\\"] le opzioni di Stato devono essere [\\"Consegnato\\", \\"Spedito\\"], ottengo " + $format(r2.Stato);
if (!$equal(r2.Anno, ["2024", "2025"])) return "Con Corriere = [\\"Bartolini\\"] le opzioni di Anno devono essere [\\"2024\\", \\"2025\\"] (stringhe), ottengo " + $format(r2.Anno);
const r3 = cascadingOptions(rows, { "Stato": ["Consegnato"], "Anno": ["2025"] }, f);
const atteso3 = { "Stato": ["Consegnato", "Spedito"], "Corriere": ["Poste"], "Anno": ["2024", "2025"] };
if (!$equal(r3, atteso3)) return "Con Stato Consegnato e Anno 2025 mi aspetto " + $format(atteso3) + ", ottengo " + $format(r3);
return true;`,
        solutionExplanation:
          "`Object.entries(fields).map(...)` produce una coppia `[etichetta, valori]` per ogni filtro, e `Object.fromEntries` la trasforma nell'oggetto finale. Per ogni filtro si crea una copia di `selected` in cui quel filtro è svuotato (`{ ...selected, [label]: [] }`), così `filterRows` applica solo gli altri. Dalle righe rimaste si estraggono i valori del campo come stringhe, `new Set` toglie i duplicati, lo spread lo riporta ad array e `sort()` li ordina.",
      },
      {
        type: "code",
        title: "Collega la pagina degli ordini",
        description:
          "Completa la pagina `OrdiniPage`:\n- crea lo stato `selected` con `useState({})`;\n- calcola `visibleRows` con `useMemo` chiamando `filterRows(ordini, selected, ORDINI_FILTER_FIELDS)`, con dipendenze `[ordini, selected]`;\n- scrivi `handleFilterChange(label, values)` con `useCallback` che aggiorna `selected` in modo funzionale e immutabile: `setSelected(current => ({ ...current, [label]: values }))`;\n- passa a `Sidebar` le props `selected` e `onChange={handleFilterChange}`;\n- passa a `OrdiniGrid` le righe filtrate: `rows={visibleRows}`.",
        difficulty: "medio",
        mode: "static",
        starterCode: `"use client";
import { useState, useMemo, useCallback } from "react";
import { Stack } from "@mui/material";
import Sidebar from "@/src/app/components/sidebar/Sidebar";
import OrdiniGrid from "@/src/app/components/ordini/OrdiniGrid";
import { filterRows } from "@/src/app/helpers/filterRows";
import { ORDINI_FILTER_FIELDS } from "@/src/app/constants/filtersMap";
import { useOrdini } from "@/src/app/hooks/useOrdini";

export default function OrdiniPage() {
  const { ordini, filters, loading, reload } = useOrdini();
  // 1. stato selected

  // 2. visibleRows con useMemo

  // 3. handleFilterChange con useCallback

  return (
    <Stack direction="row" spacing={2} sx={{ p: 1 }}>
      <Sidebar filters={filters} />
      <Stack sx={{ flex: 1, minWidth: 0 }}>
        <OrdiniGrid rows={ordini} loading={loading} onChanged={reload} />
      </Stack>
    </Stack>
  );
}`,
        solution: `"use client";
import { useState, useMemo, useCallback } from "react";
import { Stack } from "@mui/material";
import Sidebar from "@/src/app/components/sidebar/Sidebar";
import OrdiniGrid from "@/src/app/components/ordini/OrdiniGrid";
import { filterRows } from "@/src/app/helpers/filterRows";
import { ORDINI_FILTER_FIELDS } from "@/src/app/constants/filtersMap";
import { useOrdini } from "@/src/app/hooks/useOrdini";

export default function OrdiniPage() {
  const { ordini, filters, loading, reload } = useOrdini();
  const [selected, setSelected] = useState({});

  const visibleRows = useMemo(
    () => filterRows(ordini, selected, ORDINI_FILTER_FIELDS),
    [ordini, selected]
  );

  const handleFilterChange = useCallback((label, values) => {
    setSelected((current) => ({ ...current, [label]: values }));
  }, []);

  return (
    <Stack direction="row" spacing={2} sx={{ p: 1 }}>
      <Sidebar filters={filters} selected={selected} onChange={handleFilterChange} />
      <Stack sx={{ flex: 1, minWidth: 0 }}>
        <OrdiniGrid rows={visibleRows} loading={loading} onChanged={reload} />
      </Stack>
    </Stack>
  );
}`,
        validate: `const c = $codeNoComments;
if (!/const\\s*\\[\\s*selected\\s*,\\s*setSelected\\s*\\]\\s*=\\s*useState\\(\\s*\\{\\s*\\}\\s*\\)/.test(c))
  return "Crea lo stato con const [selected, setSelected] = useState({})";
if (!/const\\s+visibleRows\\s*=\\s*useMemo\\(/.test(c))
  return "Calcola visibleRows con useMemo: const visibleRows = useMemo(() => ..., [...])";
if (!/filterRows\\(\\s*ordini\\s*,\\s*selected\\s*,\\s*ORDINI_FILTER_FIELDS\\s*\\)/.test(c))
  return "Dentro useMemo chiama filterRows(ordini, selected, ORDINI_FILTER_FIELDS)";
if (!/\\[\\s*(ordini\\s*,\\s*selected|selected\\s*,\\s*ordini)\\s*\\]/.test(c))
  return "Le dipendenze di useMemo devono essere [ordini, selected]";
if (!/handleFilterChange\\s*=\\s*useCallback\\(/.test(c))
  return "Definisci handleFilterChange con useCallback";
if (!/setSelected\\(\\s*\\(?\\s*(\\w+)\\s*\\)?\\s*=>\\s*\\(\\s*\\{\\s*\\.\\.\\.\\1\\s*,\\s*\\[\\s*label\\s*\\]\\s*:\\s*values\\s*\\}\\s*\\)\\s*\\)/.test(c))
  return "Aggiorna selected in modo funzionale: setSelected(current => ({ ...current, [label]: values }))";
if (!/<Sidebar[^>]*selected=\\{\\s*selected\\s*\\}/.test(c))
  return "Passa a Sidebar la prop selected={selected}";
if (!/<Sidebar[^>]*onChange=\\{\\s*handleFilterChange\\s*\\}/.test(c))
  return "Passa a Sidebar la prop onChange={handleFilterChange}";
if (!/<OrdiniGrid[^>]*rows=\\{\\s*visibleRows\\s*\\}/.test(c))
  return "La tabella deve mostrare le righe filtrate: rows={visibleRows}";
return true;`,
        solutionExplanation:
          "`selected` è l'unico stato nuovo: le righe filtrate sono un dato derivato e si calcolano con useMemo, che rifà il filtro solo quando cambiano `ordini` o `selected`. `handleFilterChange` usa l'aggiornamento funzionale con lo spread, così cambia un solo filtro senza perdere gli altri; useCallback lo mantiene stabile tra un render e l'altro. La sidebar è controllata dalla pagina (`selected` + `onChange`) e la tabella riceve `visibleRows` invece di tutti gli ordini.",
      },
    ],
  },
};
