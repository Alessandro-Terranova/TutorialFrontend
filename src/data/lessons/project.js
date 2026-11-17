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
          "Senza un path dinamico servirebbe un reducer (o una action) diverso per ogni possibile combinazione di livelli annidati. Passando un array di chiavi come dato, la stessa funzione generica gestisce qualsiasi profondità e combinazione, riducendo drasticamente la duplicazione.",
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
          "Se AuthProvider rimanda al login quando user è null e renderizza i children solo quando l'utente è autenticato, nessun componente figlio può essere mostrato senza autenticazione. La logica di protezione è centralizzata in un unico punto.",
      },
    ],
  },
};
