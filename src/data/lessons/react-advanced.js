export const lessons = {
  "useref-usememo": {
    sections: [
      {
        type: "text",
        content:
          "In questa lezione esploreremo due hook avanzati di React: useRef e useMemo. Entrambi servono a ottimizzare le prestazioni e a gestire valori che devono persistere tra i render, ma funzionano in modi molto diversi.",
      },
      {
        type: "heading",
        content: "useRef: un contenitore mutabile e persistente",
      },
      {
        type: "text",
        content:
          "useRef restituisce un oggetto con una proprieta .current che persiste per tutta la vita del componente. A differenza di useState, modificare .current NON causa un re-render. Questo lo rende perfetto per conservare valori che cambiano spesso ma che non devono influenzare l'interfaccia.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Sintassi base di useRef",
        code: `import { useRef } from "react";

function MioComponente() {
  // Crea un ref con valore iniziale null
  const mioRef = useRef(null);

  // Leggere il valore
  console.log(mioRef.current); // null

  // Modificare il valore (NON causa re-render)
  mioRef.current = "nuovo valore";

  return <div>Componente con ref</div>;
}`,
      },
      {
        type: "subheading",
        content: "useRef per accedere a elementi DOM",
      },
      {
        type: "text",
        content:
          "L'uso più comune di useRef e ottenere un riferimento diretto a un elemento DOM. Passiamo il ref come attributo ref= a un elemento JSX, e React lo popola automaticamente con il nodo DOM corrispondente.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Riferimento a un elemento DOM - scroll container",
        code: `import { useRef } from "react";

function ScrollableChart() {
  const scrollContainerRef = useRef(null);

  const scrollToStart = () => {
    // Accediamo direttamente al nodo DOM
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  };

  return (
    <div>
      <button onClick={scrollToStart}>Torna all'inizio</button>
      <div
        ref={scrollContainerRef}
        style={{ overflowX: "auto", display: "flex" }}
      >
        {/* Contenuto scrollabile */}
      </div>
    </div>
  );
}`,
      },
      {
        type: "subheading",
        content: "useRef per valori mutabili (guardie e flag)",
      },
      {
        type: "text",
        content:
          "Un pattern molto potente e usare useRef come flag per controllare il flusso logico senza causare re-render. Questo e utile per prevenire chiamate API duplicate, gestire transizioni e tracciare stato interno.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Prevenire fetch duplicati con useRef",
        code: `import { useRef, useEffect, useState } from "react";

function UserProfile({ userId }) {
  const [profilo, setProfilo] = useState(null);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    const fetchProfilo = async () => {
      // Se stiamo gia facendo il fetch, esci subito
      if (isFetchingRef.current) return;

      isFetchingRef.current = true;
      try {
        const response = await fetch(\`/api/users/\${userId}\`);
        const data = await response.json();
        setProfilo(data);
      } catch (error) {
        console.error("Errore:", error);
      } finally {
        isFetchingRef.current = false;
      }
    };

    fetchProfilo();
  }, [userId]);

  return profilo ? <div>{profilo.nome}</div> : <div>Caricamento...</div>;
}`,
      },
      {
        type: "info",
        content:
          "useRef e come una scatola che puoi riempire con qualsiasi valore. La differenza fondamentale con useState: cambiare .current non notifica React, quindi non avviene nessun re-render.",
      },
      {
        type: "heading",
        content: "useMemo: memoizzare calcoli costosi",
      },
      {
        type: "text",
        content:
          "useMemo memorizza il risultato di una funzione e lo ricalcola solo quando le sue dipendenze cambiano. E utile per evitare calcoli pesanti ad ogni render.",
      },
      {
        type: "code",
        language: "javascript",
        title: "useMemo per filtrare e ordinare dati",
        code: `import { useMemo, useState } from "react";

function ListaFiltrata({ dati }) {
  const [filtro, setFiltro] = useState("");
  const [ordinamento, setOrdinamento] = useState("nome");

  // Senza useMemo: questo calcolo avviene ad OGNI render
  // Con useMemo: avviene solo quando dati, filtro o ordinamento cambiano
  const datiFiltrati = useMemo(() => {
    console.log("Ricalcolo dati filtrati...");
    return dati
      .filter((item) => item.nome.toLowerCase().includes(filtro.toLowerCase()))
      .sort((a, b) => a[ordinamento].localeCompare(b[ordinamento]));
  }, [dati, filtro, ordinamento]);

  return (
    <div>
      <input
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        placeholder="Filtra..."
      />
      <ul>
        {datiFiltrati.map((item) => (
          <li key={item.id}>{item.nome}</li>
        ))}
      </ul>
    </div>
  );
}`,
      },
      {
        type: "code",
        language: "javascript",
        title: "useMemo per mesi attivi e dati del grafico",
        code: `// Estrazione dei mesi unici per la finestra scorrevole
const allMonths = useMemo(() => {
  if (!data || data.length === 0) return [];

  const monthsSet = new Set();
  data.forEach((row) => {
    if (row.filling_dt) {
      const monthKey = row.filling_dt.substring(0, 7); // "YYYY-MM"
      monthsSet.add(monthKey);
    }
  });

  return Array.from(monthsSet).sort();
}, [data]);

// Mesi visibili nella finestra corrente (dipende dall'indice)
const activeTrimsterMonths = useMemo(() => {
  if (allMonths.length === 0) return [];
  return allMonths.slice(currentMonthIndex, currentMonthIndex + 3);
}, [allMonths, currentMonthIndex]);`,
      },
      {
        type: "subheading",
        content: "Quando NON usare useMemo",
      },
      {
        type: "list",
        items: [
          "Per operazioni semplici come somme o concatenazioni di stringhe: il costo della memoizzazione supera il beneficio.",
          "Quando il valore cambia ad ogni render comunque (le dipendenze cambiano sempre).",
          "Per la creazione di oggetti semplici come { color: 'red' }: e più leggibile senza useMemo.",
          "Come ottimizzazione prematura: prima verifica che ci sia un vero problema di prestazioni.",
        ],
      },
      {
        type: "warning",
        content:
          "useMemo non garantisce che il valore venga mantenuto per sempre. React potrebbe decidere di ricalcolarlo anche se le dipendenze non sono cambiate (ad esempio durante la garbage collection). Non usare useMemo per effetti collaterali.",
      },
      {
        type: "tip",
        content:
          "In un progetto React reale, useRef e usato per: container di scroll (scrollContainerRef), prevenire fetch duplicati (isFetchingRef), e guardie per le transizioni (isTransitioningRef, hasTriggeredEndRef). useMemo memoizza: mesi attivi, dati filtrati del grafico, indici di focus.",
      },
    ],
    exercises: [
      {
        type: "code",
        title: "Contatore con useRef",
        description:
          "Crea un contatore che tiene traccia di quante volte il componente e stato renderizzato usando useRef.\n\nScrivi una funzione contaRender che simula questo comportamento: riceve un oggetto ref e lo incrementa ogni volta che viene chiamata. La funzione deve restituire il valore aggiornato.",
        difficulty: "facile",
        starterCode: `// Simula un ref come farebbe React
const renderCountRef = { current: 0 };

function contaRender(ref) {
  // Incrementa ref.current e restituisci il nuovo valore

}

// Test
console.log(contaRender(renderCountRef)); // 1
console.log(contaRender(renderCountRef)); // 2
console.log(contaRender(renderCountRef)); // 3`,
        solution: `const renderCountRef = { current: 0 };

function contaRender(ref) {
  ref.current += 1;
  return ref.current;
}

console.log(contaRender(renderCountRef)); // 1
console.log(contaRender(renderCountRef)); // 2
console.log(contaRender(renderCountRef)); // 3`,
        validate: `try {
  const ref = { current: 0 };
  const fn = new Function("ref", userCode.match(/function contaRender[\\s\\S]*?\\n}/)?.[0]?.replace("function contaRender", "return function contaRender") + "")
  // Simpler: check if ref.current is 3 after the code runs
  return renderCountRef.current === 3;
} catch(e) { return false; }`,
        testCode: "",
      },
      {
        type: "multiple-choice",
        title: "Differenza tra useRef e useState",
        description:
          "Quale affermazione descrive correttamente la differenza tra useRef e useState?",
        difficulty: "facile",
        options: [
          "useRef e useState causano entrambi un re-render quando il valore cambia",
          "useRef mantiene il valore tra i render senza causare re-render; useState causa un re-render quando il valore cambia",
          "useState mantiene il valore tra i render; useRef resetta il valore ad ogni render",
          "useRef puo contenere solo riferimenti a elementi DOM; useState puo contenere qualsiasi valore",
        ],
        correct: 1,
        explanation:
          "useRef restituisce un oggetto { current: valore } che persiste tra i render. Modificare .current NON causa un re-render. useState invece notifica React del cambiamento, causando un nuovo render del componente.",
      },
      {
        type: "multiple-choice",
        title: "Quando usare useMemo",
        description:
          "In quale di questi scenari e più appropriato usare useMemo?",
        difficulty: "medio",
        options: [
          "Per memorizzare una stringa costante come const titolo = 'Dashboard'",
          "Per filtrare e ordinare un array di 10.000 elementi ogni volta che cambia un filtro",
          "Per creare un event handler come onClick={() => alert('cliccato')}",
          "Per salvare il valore di un input di testo",
        ],
        correct: 1,
        explanation:
          "useMemo e ideale per operazioni costose come filtrare e ordinare grandi quantita di dati. Il costo della memoizzazione si ripaga quando il calcolo e pesante e le dipendenze non cambiano ad ogni render. Per valori semplici o handler, useMemo aggiunge complessita senza beneficio.",
      },
    ],
  },

  "custom-hooks": {
    sections: [
      {
        type: "text",
        content:
          "I custom hooks sono funzioni JavaScript il cui nome inizia con 'use' e che possono chiamare altri hook di React al loro interno. Sono il meccanismo principale per estrarre e riutilizzare logica stateful tra componenti diversi.",
      },
      {
        type: "heading",
        content: "Cosa sono i Custom Hooks",
      },
      {
        type: "text",
        content:
          "Un custom hook e semplicemente una funzione che usa altri hook. Non e un componente: non restituisce JSX, ma valori (dati, funzioni, oggetti) che i componenti possono utilizzare. L'idea chiave e: se due componenti condividono la stessa logica, estraila in un hook.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Un semplice custom hook: useContatore",
        code: `import { useState } from "react";

// Custom hook: incapsula la logica del contatore
function useContatore(valoreIniziale = 0) {
  const [valore, setValore] = useState(valoreIniziale);

  const incrementa = () => setValore((v) => v + 1);
  const decrementa = () => setValore((v) => v - 1);
  const resetta = () => setValore(valoreIniziale);

  return { valore, incrementa, decrementa, resetta };
}

// Uso nel componente
function Contatore() {
  const { valore, incrementa, decrementa, resetta } = useContatore(0);

  return (
    <div>
      <p>Valore: {valore}</p>
      <button onClick={incrementa}>+</button>
      <button onClick={decrementa}>-</button>
      <button onClick={resetta}>Reset</button>
    </div>
  );
}`,
      },
      {
        type: "heading",
        content: "Regole dei Hooks",
      },
      {
        type: "list",
        items: [
          "Chiama gli hook solo al livello più alto della funzione, mai dentro condizioni, cicli o funzioni annidate.",
          "Chiama gli hook solo dentro componenti React o altri custom hooks.",
          "Il nome deve iniziare con 'use' (es. useContatore, useSession, useFetch).",
          "Ogni chiamata a un hook ha il proprio stato indipendente: se due componenti usano lo stesso hook, non condividono lo stato.",
        ],
      },
      {
        type: "warning",
        content:
          "Non chiamare mai un hook dentro un if o un for. React si affida all'ordine delle chiamate per associare lo stato interno. Cambiare l'ordine tra i render causa bug difficili da individuare.",
      },
      {
        type: "heading",
        content: "Estrarre logica riutilizzabile",
      },
      {
        type: "text",
        content:
          "Il vero potere dei custom hooks emerge quando la logica diventa complessa. Invece di duplicare codice tra componenti, lo estraiamo in un hook che puo combinare useState, useEffect, useRef, useMemo e qualsiasi altro hook.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Custom hook per fetch di dati",
        code: `import { useState, useEffect, useRef } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errore, setErrore] = useState(null);
  const isFetchingRef = useRef(false);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      if (isFetchingRef.current) return;
      isFetchingRef.current = true;

      setLoading(true);
      setErrore(null);

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Errore nella risposta");
        const json = await response.json();
        setData(json);
      } catch (err) {
        setErrore(err.message);
      } finally {
        setLoading(false);
        isFetchingRef.current = false;
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, errore };
}

// Uso nel componente - pulito e riutilizzabile
function ListaUtenti() {
  const { data, loading, errore } = useFetch("/api/utenti");

  if (loading) return <p>Caricamento...</p>;
  if (errore) return <p>Errore: {errore}</p>;
  return <ul>{data.map((u) => <li key={u.id}>{u.nome}</li>)}</ul>;
}`,
      },
      {
        type: "subheading",
        content: "Restituire valori dai Custom Hooks",
      },
      {
        type: "text",
        content:
          "Un custom hook puo restituire qualsiasi cosa: un singolo valore, un array (come useState), o un oggetto con più proprieta e funzioni. La convenzione più comune e restituire un oggetto quando ci sono molti valori, o un array quando ce ne sono pochi.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Hook dal progetto: useChartDataAndScroll",
        code: `import { useState, useMemo, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

export function useChartDataAndScroll(data = []) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  // Refs per gestire scroll e transizioni
  const scrollContainerRefs = useRef({});
  const isTransitioningRef = useRef(false);

  // Legge filtri di navigazione da Redux
  const { selectedAnalysisType, selectedPage } = useSelector(
    (state) => state.navigation
  );

  // Calcola i mesi visibili con useMemo
  const allMonths = useMemo(() => {
    if (!data || data.length === 0) return [];
    const monthsSet = new Set();
    data.forEach((row) => {
      if (row.filling_dt) monthsSet.add(row.filling_dt.substring(0, 7));
    });
    return Array.from(monthsSet).sort();
  }, [data]);

  const activeTrimsterMonths = useMemo(() => {
    return allMonths.slice(currentMonthIndex, currentMonthIndex + 3);
  }, [allMonths, currentMonthIndex]);

  // Funzioni di navigazione
  const handlePrevMonth = () => {
    if (currentMonthIndex > 0) setCurrentMonthIndex((prev) => prev - 1);
  };
  const handleNextMonth = () => {
    if (currentMonthIndex + 3 < allMonths.length)
      setCurrentMonthIndex((prev) => prev + 1);
  };

  // Restituisce un oggetto con tutto il necessario
  return {
    allMonths,
    activeTrimsterMonths,
    currentMonthIndex,
    isLoading,
    scrollContainerRefs,
    handlePrevMonth,
    handleNextMonth,
  };
}`,
      },
      {
        type: "info",
        content:
          "Nota come useChartDataAndScroll combina useState, useMemo, useRef e useSelector in un unico hook. Il componente che lo usa riceve un'interfaccia pulita senza dover conoscere i dettagli implementativi.",
      },
      {
        type: "tip",
        content:
          "Nel progetto, useChartDataAndScroll e un custom hook che incapsula tutta la logica di processing dati del grafico, time windowing e scroll sincronizzato. useSession() e un custom hook per accedere al contesto di sessione.",
      },
    ],
    exercises: [
      {
        type: "code",
        title: "Crea un custom hook useToggle",
        description:
          "Crea un custom hook chiamato useToggle che gestisce un valore booleano.\nDeve restituire un array con: il valore corrente, una funzione per invertirlo (toggle), e una funzione per impostarlo direttamente (setValue).",
        difficulty: "facile",
        starterCode: `function useToggle(valoreIniziale = false) {
  // Implementa il hook
  // Suggerimento: usa un semplice stato booleano

}

// Test
const [attivo, toggle, setAttivo] = useToggle(false);
console.log(attivo);  // false
toggle();
// Come verificheresti che toggle funziona?
// Suggerimento: simula lo stato con una variabile`,
        solution: `function useToggle(valoreIniziale = false) {
  let valore = valoreIniziale;

  const toggle = () => {
    valore = !valore;
    return valore;
  };

  const setValue = (nuovoValore) => {
    valore = nuovoValore;
    return valore;
  };

  return [valore, toggle, setValue];
}

// Test (versione semplificata senza React)
let [attivo, toggle, setAttivo] = useToggle(false);
console.log(attivo);         // false
console.log(toggle());       // true
console.log(toggle());       // false
console.log(setAttivo(true)); // true`,
        validate: `try {
  return userCode.includes("useToggle") && userCode.includes("return");
} catch(e) { return false; }`,
        testCode: "",
      },
      {
        type: "multiple-choice",
        title: "Regole dei Hooks",
        description:
          "Quale di queste e una violazione delle regole dei hooks?",
        difficulty: "medio",
        options: [
          "Chiamare useState dentro un custom hook chiamato useForm",
          "Chiamare useEffect dentro un if (condizione) nel corpo del componente",
          "Usare useSelector all'interno di un custom hook",
          "Restituire un oggetto da un custom hook",
        ],
        correct: 1,
        explanation:
          "Gli hook devono essere chiamati sempre allo stesso livello del componente o dell'hook, mai dentro condizioni, cicli o blocchi annidati. React dipende dall'ordine delle chiamate per gestire lo stato interno. Chiamare useEffect dentro un if violerebbe questo ordine.",
      },
      {
        type: "multiple-choice",
        title: "Vantaggi dei Custom Hooks",
        description:
          "Qual e il vantaggio principale di estrarre logica in un custom hook?",
        difficulty: "facile",
        options: [
          "I custom hooks rendono il codice più veloce a runtime",
          "I custom hooks permettono di condividere stato tra componenti",
          "I custom hooks permettono di riutilizzare logica stateful senza duplicare codice",
          "I custom hooks sostituiscono completamente la necessita di Redux",
        ],
        correct: 2,
        explanation:
          "I custom hooks estraggono logica riutilizzabile. Attenzione: non condividono stato tra componenti (ogni uso crea il proprio stato indipendente). Il vantaggio e evitare la duplicazione di logica complessa che coinvolge hook.",
      },
    ],
  },

  context: {
    sections: [
      {
        type: "text",
        content:
          "La Context API di React risolve un problema molto comune nelle applicazioni con molti livelli di componenti: il prop drilling. Vediamo cosa significa e come Context ci aiuta.",
      },
      {
        type: "heading",
        content: "Il problema: Prop Drilling",
      },
      {
        type: "text",
        content:
          "Il prop drilling avviene quando un dato deve passare attraverso molti livelli di componenti, anche se quelli intermedi non lo usano. Ad esempio, se l'username deve arrivare dal componente App fino a un bottone annidato 5 livelli sotto, ogni componente intermedio deve riceverlo come prop e passarlo al figlio.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Il problema del prop drilling",
        code: `// Senza Context: ogni componente intermedio deve passare username
function App() {
  const username = "Mario Rossi";
  return <Layout username={username} />;
}

function Layout({ username }) {
  // Layout non usa username, lo passa solo al figlio
  return <Sidebar username={username} />;
}

function Sidebar({ username }) {
  // Anche Sidebar non lo usa, lo passa solo al figlio
  return <UserMenu username={username} />;
}

function UserMenu({ username }) {
  // Solo qui viene usato realmente
  return <span>Ciao, {username}!</span>;
}`,
      },
      {
        type: "heading",
        content: "createContext e Provider",
      },
      {
        type: "text",
        content:
          "Context crea un canale diretto tra un componente fornitore (Provider) e qualsiasi componente discendente che vuole consumare quei dati, saltando tutti i livelli intermedi.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Creare un Context e il suo Provider",
        code: `import { createContext, useState, useEffect } from "react";

// 1. Creiamo il Context
const SessionContext = createContext(undefined);

// 2. Creiamo il Provider (un componente wrapper)
export const SessionProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Logica per ottenere i dati utente
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/user");
        const data = await response.json();
        setUsername(data.name);
        setProfilePhoto(data.photo);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // 3. Il Provider rende i dati disponibili a tutti i figli
  return (
    <SessionContext.Provider value={{ username, profilePhoto, loading }}>
      {children}
    </SessionContext.Provider>
  );
};`,
      },
      {
        type: "heading",
        content: "useContext: consumare il Context",
      },
      {
        type: "text",
        content:
          "Il hook useContext permette a qualsiasi componente discendente del Provider di accedere ai dati del Context, indipendentemente da quanti livelli di nesting ci siano.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Consumare il Context con useContext",
        code: `import { useContext } from "react";

function UserMenu() {
  // Accede direttamente ai dati - niente prop drilling!
  const { username, profilePhoto } = useContext(SessionContext);

  return (
    <div>
      <img src={profilePhoto} alt={username} />
      <span>{username}</span>
    </div>
  );
}`,
      },
      {
        type: "subheading",
        content: "Pattern: Custom Hook per il Context",
      },
      {
        type: "text",
        content:
          "Una best practice e creare un custom hook dedicato per ogni Context. Questo semplifica l'uso, aggiunge validazione e nasconde i dettagli implementativi.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Custom hook useSession",
        code: `import { createContext, useContext } from "react";

const SessionContext = createContext(undefined);

// Custom hook con validazione
export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error(
      "useSession deve essere usato dentro un SessionProvider"
    );
  }
  return context;
};

// Ora nei componenti basta scrivere:
function ProfiloUtente() {
  const { username, profilePhoto, accounts } = useSession();
  return <div>Benvenuto, {username}!</div>;
}`,
      },
      {
        type: "info",
        content:
          "Il throw new Error dentro useSession e un pattern difensivo: se un componente prova a usare il context fuori dal Provider, ottiene un errore chiaro invece di un undefined misterioso.",
      },
      {
        type: "heading",
        content: "Quando usare Context vs Redux",
      },
      {
        type: "list",
        items: [
          "Usa Context per dati che cambiano raramente: tema, lingua, sessione utente, autenticazione.",
          "Usa Redux per stato complesso e frequentemente aggiornato: filtri, dati dei grafici, navigazione.",
          "Context causa il re-render di TUTTI i consumatori quando il valore cambia, anche se usano solo una parte dei dati.",
          "Redux con useSelector permette di leggere solo la porzione di stato necessaria, ottimizzando i re-render.",
          "Possono coesistere: in un'applicazione enterprise, Context gestisce la sessione mentre Redux gestisce tutto il resto.",
        ],
      },
      {
        type: "tip",
        content:
          "Nel progetto, SessionContext fornisce profilePhoto, username e accounts a tutti i componenti senza passarli come props. La gerarchia e: Redux Provider > MSAL Provider > SessionProvider.",
      },
    ],
    exercises: [
      {
        type: "code",
        title: "Crea un ThemeContext",
        description:
          "Crea un semplice sistema di tema (chiaro/scuro) usando il pattern del Context.\n\nImplementa:\n1. Una variabile themeContext che simula il contesto (un oggetto)\n2. Una funzione useTheme che legge il contesto e lancia un errore se il valore e undefined\n3. Una funzione toggleTheme che cambia il tema tra 'chiaro' e 'scuro'",
        difficulty: "medio",
        starterCode: `// Simula un context (senza React)
let themeContext = { theme: "chiaro" };

function useTheme() {
  // Leggi themeContext e verifica che non sia undefined
  // Restituisci l'oggetto context

}

function toggleTheme() {
  // Cambia il tema tra "chiaro" e "scuro"

}

// Test
console.log(useTheme().theme); // "chiaro"
toggleTheme();
console.log(useTheme().theme); // "scuro"
toggleTheme();
console.log(useTheme().theme); // "chiaro"`,
        solution: `let themeContext = { theme: "chiaro" };

function useTheme() {
  if (!themeContext) {
    throw new Error("useTheme deve essere usato dentro un ThemeProvider");
  }
  return themeContext;
}

function toggleTheme() {
  themeContext.theme = themeContext.theme === "chiaro" ? "scuro" : "chiaro";
}

console.log(useTheme().theme); // "chiaro"
toggleTheme();
console.log(useTheme().theme); // "scuro"
toggleTheme();
console.log(useTheme().theme); // "chiaro"`,
        validate: `try {
  return userCode.includes("useTheme") && userCode.includes("toggleTheme") && userCode.includes("throw");
} catch(e) { return false; }`,
        testCode: "",
      },
      {
        type: "multiple-choice",
        title: "Context vs Props",
        description:
          "Quando e preferibile usare Context invece di passare props normalmente?",
        difficulty: "facile",
        options: [
          "Sempre, perche le props sono obsolete",
          "Quando un dato deve attraversare molti livelli di componenti che non lo usano direttamente",
          "Solo per gestire il tema dell'applicazione",
          "Quando si vogliono migliorare le prestazioni di rendering",
        ],
        correct: 1,
        explanation:
          "Context e utile quando i dati devono attraversare molti livelli intermedi che non li usano (prop drilling). Non sostituisce le props per comunicazione diretta genitore-figlio, e non migliora le prestazioni di per se (anzi, un uso eccessivo puo peggiorarle).",
      },
      {
        type: "multiple-choice",
        title: "Gerarchia dei Provider",
        description:
          "In un'applicazione enterprise, qual e l'ordine corretto dei Provider nel layout dell'applicazione?",
        difficulty: "difficile",
        options: [
          "SessionProvider > MSAL Provider > Redux Provider",
          "Redux Provider > MSAL Provider > SessionProvider",
          "MSAL Provider > SessionProvider > Redux Provider",
          "L'ordine dei Provider non ha importanza",
        ],
        correct: 1,
        explanation:
          "L'ordine e: Redux Provider (più esterno) > MSAL Provider > SessionProvider (più interno). Questo e necessario perche SessionProvider potrebbe aver bisogno di accedere allo stato Redux o MSAL, quindi deve trovarsi all'interno di quei Provider.",
      },
    ],
  },
};
