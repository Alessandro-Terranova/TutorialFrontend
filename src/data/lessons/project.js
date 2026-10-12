export const lessons = {
  patterns: {
    sections: [
      {
        type: "text",
        content:
          "Questa lezione raccoglie pattern avanzati comuni nelle applicazioni React enterprise: gestione di stato profondamente annidato, autenticazione basata su provider, e custom hook che combinano più concetti insieme. Sono pattern che incontrerai in qualsiasi progetto di media-grande dimensione.",
      },
      {
        type: "heading",
        content: "Stato Profondamente Annidato: Path Dinamici",
      },
      {
        type: "text",
        content:
          "Quando lo stato della tua applicazione e organizzato in un oggetto annidato a più livelli (es. configurazioni per tipo, pagina, sezione e campo), scrivere un reducer diverso per ogni combinazione diventa rapidamente ingestibile. Un approccio elegante e usare una funzione generica che naviga l'oggetto tramite un array di chiavi.",
      },
      {
        type: "code",
        language: "javascript",
        title: "setNestedProperty - aggiornamento generico di oggetti annidati",
        code: `// Naviga/crea l'oggetto annidato seguendo un array di chiavi,
// poi imposta il valore sull'ultima chiave del path.
// Es. pathKeys = ["settings", "theme", "colors", "primary"]
const setNestedProperty = (obj, pathKeys, value) => {
  let current = obj;

  for (let i = 0; i < pathKeys.length - 1; i++) {
    const key = pathKeys[i];
    if (!current[key]) current[key] = {};
    current = current[key];
  }

  const lastKey = pathKeys[pathKeys.length - 1];

  current[lastKey] =
    typeof value === "object" && value !== null && !Array.isArray(value)
      ? { ...current[lastKey], ...value }
      : value;
};

// Uso dentro un reducer di Redux Toolkit (Immer permette la mutazione)
setNestedProperty(
  state.config,
  ["settings", "theme", "colors", "primary"],
  "#1976d2"
);`,
      },
      {
        type: "info",
        content:
          "Questo pattern funziona in mutazione diretta perche vive dentro un reducer di Redux Toolkit, che usa Immer sotto il cofano: le 'mutazioni' su state sono in realta intercettate e trasformate in aggiornamenti immutabili. Fuori da un reducer RTK, mutare un oggetto cosi andrebbe evitato: si dovrebbe usare spread annidato o una libreria come Immer esplicitamente.",
      },
      {
        type: "heading",
        content: "Merge Deep di Configurazioni: Default + Override",
      },
      {
        type: "text",
        content:
          "Un pattern molto comune e fondere una configurazione di default con degli override specifici, senza perdere le chiavi non sovrascritte. Lo spread shallow (...a, ...b) funziona solo un livello: se dentro c'e un oggetto annidato come `styles`, va spreadato separatamente.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Merge deep parziale per configurazioni",
        code: `function mergeConfig(defaults, overrides) {
  return {
    ...defaults,
    ...overrides,
    styles: {
      ...defaults.styles,
      ...(overrides.styles || {}),
    },
    validation: {
      ...defaults.validation,
      ...(overrides.validation || {}),
    },
  };
}

// Esempio:
const defaults = {
  color: "blue",
  size: "md",
  styles: { lineWidth: 2, opacity: 1, shape: "circle" },
  validation: { min: 0, max: 100 },
};

const custom = { color: "red", styles: { opacity: 0.5 } };

mergeConfig(defaults, custom);
// => { color: "red", size: "md",
//      styles: { lineWidth: 2, opacity: 0.5, shape: "circle" },
//      validation: { min: 0, max: 100 } }`,
      },
      {
        type: "heading",
        content: "Autenticazione con Provider e Context",
      },
      {
        type: "text",
        content:
          "Nelle applicazioni enterprise, l'autenticazione segue quasi sempre lo stesso schema: 1) un provider di autenticazione che wrappa l'intera app, 2) un context React che espone lo stato di sessione, 3) un hook custom per accedere ai dati utente da qualsiasi componente. Qui vediamo il pattern generico, indipendente dal provider specifico (Auth0, Firebase, Azure AD, NextAuth...).",
      },
      {
        type: "code",
        language: "javascript",
        title: "AuthProvider generico con Context",
        code: `"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children, authClient }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authClient.onAuthStateChanged((authUser) => {
      setUser(authUser ? { name: authUser.displayName, email: authUser.email } : null);
      setLoading(false);
    });
  }, [authClient]);

  if (loading) return <div>Caricamento...</div>;
  if (!user) {
    authClient.signInWithRedirect();
    return null;
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
        code: `// app/layout.js
import { AuthProvider } from "@/context/AuthContext";
import { authClient } from "@/lib/auth";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider authClient={authClient}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

// In qualsiasi componente figlio:
function UserGreeting() {
  const { user } = useAuth();
  return <p>Ciao, {user.name}!</p>;
}`,
      },
      {
        type: "subheading",
        content: "Protezione delle Rotte",
      },
      {
        type: "text",
        content:
          "Con il pattern AuthProvider, proteggere le rotte diventa semplice: se AuthProvider non renderizza i children finche l'utente non e autenticato, tutte le pagine sotto di esso sono automaticamente protette. Per pagine pubbliche (es. /login), basta posizionarle fuori dal provider nel layout.",
      },
      {
        type: "heading",
        content: "Custom Hook Avanzato: Combinare Redux, useMemo e useRef",
      },
      {
        type: "text",
        content:
          "I custom hook più utili nelle applicazioni reali combinano più concetti: leggono dati da Redux, li trasformano con useMemo per evitare ricalcoli inutili, e coordinano elementi DOM tramite useRef. Ecco un esempio di hook che gestisce una lista scrollabile con sincronizzazione tra più pannelli.",
      },
      {
        type: "code",
        language: "javascript",
        title: "useFilteredDataAndScroll - hook composito",
        code: `import { useSelector } from "react-redux";
import { useMemo, useRef, useCallback } from "react";

function useFilteredDataAndScroll(dataKey) {
  const rawData = useSelector((state) => state.data[dataKey]);
  const filters = useSelector((state) => state.filters.active);
  const scrollRefs = useRef([]);

  const filteredData = useMemo(() => {
    if (!rawData) return [];
    return rawData.filter((item) =>
      Object.entries(filters).every(
        ([key, val]) => !val || item[key] === val
      )
    );
  }, [rawData, filters]);

  const registerScrollRef = useCallback((el) => {
    if (el && !scrollRefs.current.includes(el)) {
      scrollRefs.current.push(el);
    }
  }, []);

  const syncScroll = useCallback((scrollLeft) => {
    scrollRefs.current.forEach((el) => {
      if (el) el.scrollLeft = scrollLeft;
    });
  }, []);

  return { filteredData, registerScrollRef, syncScroll };
}`,
      },
      {
        type: "tip",
        content:
          "Un buon custom hook ha una responsabilita chiara, un nome che inizia con 'use' e descrive cosa fa (useFilteredData, useAuth, useDebounce), e nasconde la complessita dei singoli hook React (useState, useEffect, useMemo, useRef) dietro un'interfaccia semplice.",
      },
    ],
    exercises: [
      {
        type: "code",
        title: "Merge Deep di Due Livelli",
        description:
          "Scrivi una funzione mergeConfig(base, override) che fonde due oggetti con la stessa forma { color, settings: { size, opacity } }, dove override puo specificare solo alcuni campi, anche dentro 'settings'.",
        difficulty: "medio",
        starterCode: `function mergeConfig(base, override) {
  // Implementa il merge deep di un livello (settings)
}

// Test:
// mergeConfig({ color: "blue", settings: { size: 10, opacity: 1 } }, { settings: { opacity: 0.5 } })
// deve dare: { color: "blue", settings: { size: 10, opacity: 0.5 } }`,
        solution: `function mergeConfig(base, override) {
  return {
    ...base,
    ...override,
    settings: {
      ...base.settings,
      ...(override.settings || {}),
    },
  };
}`,
        validate: `(code) => {
  return code.includes("...base") && code.includes("settings") && code.includes("override.settings");
}`,
        testCode: "",
      },
      {
        type: "multiple-choice",
        title: "Path Dinamici in un Reducer",
        description:
          "Perche il pattern setNestedProperty(state, pathKeys, value) e utile in un reducer con stato annidato a più livelli?",
        difficulty: "medio",
        options: [
          "Perche evita di dover scrivere un case del reducer per ogni singola combinazione di chiavi annidate, generalizzando l'aggiornamento con un array di chiavi",
          "Perche e l'unico modo per aggiornare oggetti annidati in JavaScript",
          "Perche rende il codice più lento ma più leggibile",
          "Perche Redux Toolkit lo richiede obbligatoriamente per stati annidati",
        ],
        correct: 0,
        explanation:
          "Senza un path dinamico, servirebbe un reducer (o una action) diversa per ogni combinazione possibile di livelli annidati. Passando un array di chiavi come dato, la stessa funzione generica gestisce qualsiasi profondita e combinazione, riducendo drasticamente la duplicazione.",
      },
      {
        type: "multiple-choice",
        title: "Pattern AuthProvider",
        description:
          "Qual e il vantaggio principale di wrappare l'intera app in un AuthProvider che non renderizza i children finche l'utente non e autenticato?",
        difficulty: "facile",
        options: [
          "Tutte le pagine sotto il provider sono automaticamente protette senza bisogno di controlli in ogni componente",
          "Rende l'applicazione più veloce",
          "E richiesto da React per usare useContext",
          "Impedisce il rendering lato server",
        ],
        correct: 0,
        explanation:
          "Se AuthProvider redirige al login quando user e null e renderizza i children solo quando l'utente e autenticato, nessun componente figlio puo mai renderizzarsi senza autenticazione. Questo centralizza la logica di protezione in un unico punto.",
      },
    ],
  },
};
