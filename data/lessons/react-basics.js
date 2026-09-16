export const lessons = {
  components: {
    sections: [
      {
        type: "text",
        content:
          "React è una libreria JavaScript per costruire interfacce utente. Invece di manipolare il DOM direttamente, si descrive l'UI come funzioni che restituiscono elementi, e React si occupa di aggiornare il DOM in modo efficiente quando i dati cambiano.",
      },
      {
        type: "heading",
        content: "JSX: HTML dentro JavaScript",
      },
      {
        type: "text",
        content:
          "JSX è un'estensione della sintassi JavaScript che assomiglia a HTML, ma in realtà viene trasformato in chiamate JavaScript. Permette di descrivere l'interfaccia in modo dichiarativo, mescolando markup e logica nello stesso file.",
      },
      {
        type: "code",
        language: "javascript",
        title: "JSX: sembra HTML, è JavaScript",
        code: `// Questo JSX...
const element = <h1 className="title">Ciao mondo!</h1>;

// ...viene trasformato dal compilatore in:
const element = React.createElement("h1", { className: "title" }, "Ciao mondo!");

// Attenzione alle differenze con HTML:
// - className invece di class
// - htmlFor invece di for
// - camelCase per attributi: onClick, onChange, tabIndex
// - I tag devono essere sempre chiusi: <img /> <br /> <input />`,
      },
      {
        type: "heading",
        content: "Componenti come funzioni",
      },
      {
        type: "text",
        content:
          "Un componente React è semplicemente una funzione che restituisce JSX. Il nome deve iniziare con lettera maiuscola per distinguerlo dai tag HTML nativi. Ogni componente è un mattoncino riusabile dell'interfaccia.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Creare un componente",
        code: `// Un componente è una funzione che restituisce JSX
function Welcome() {
  return <h1>Benvenuto nell'applicazione!</h1>;
}

// Arrow function (equivalente)
const Welcome = () => {
  return <h1>Benvenuto nell'applicazione!</h1>;
};

// Usare il componente come un tag HTML
function App() {
  return (
    <div>
      <Welcome />
      <Welcome />
    </div>
  );
}`,
      },
      {
        type: "heading",
        content: "\"use client\" in Next.js",
      },
      {
        type: "text",
        content:
          "In Next.js con App Router, i componenti sono Server Components per default. Se un componente ha bisogno di interattività (useState, useEffect, onClick, etc.), deve dichiarare \"use client\" in cima al file. Senza questa direttiva, React non permetterà l'uso degli hook.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Componente interattivo con \"use client\"",
        code: `"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Contatore: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Incrementa
      </button>
    </div>
  );
}

// Senza "use client" in cima, questo componente darebbe errore
// perché useState è un hook che richiede il client.`,
      },
      {
        type: "tip",
        content:
          "In un progetto React reale con Next.js App Router, ogni componente interattivo inizia con 'use client'.",
      },
      {
        type: "heading",
        content: "Fragments: restituire più elementi",
      },
      {
        type: "text",
        content:
          "Un componente può restituire un solo elemento radice. Per restituire più elementi senza aggiungere un div inutile al DOM, si usano i Fragments: <React.Fragment> o la sintassi abbreviata <>...</>.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Fragments per evitare div inutili",
        code: `// Problema: serve un unico elemento radice
// Questo darebbe errore:
// return (
//   <h1>Titolo</h1>
//   <p>Paragrafo</p>
// );

// Soluzione 1: Fragment abbreviato
function Info() {
  return (
    <>
      <h1>Titolo</h1>
      <p>Paragrafo</p>
    </>
  );
}

// Soluzione 2: Fragment con key (utile nelle liste)
import { Fragment } from "react";

function ItemList({ items }) {
  return items.map((item) => (
    <Fragment key={item.id}>
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </Fragment>
  ));
}`,
      },
      {
        type: "heading",
        content: "Espressioni JavaScript in JSX",
      },
      {
        type: "text",
        content:
          "Dentro JSX si possono inserire espressioni JavaScript usando le parentesi graffe {}. Qualsiasi espressione valida funziona: variabili, calcoli, chiamate a funzioni, operatori ternari.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Espressioni dentro JSX",
        code: `function UserCard({ user }) {
  const isAdmin = user.role === "admin";

  return (
    <div>
      {/* Variabile */}
      <h2>{user.name}</h2>

      {/* Espressione */}
      <p>Registrato da {new Date().getFullYear() - user.joinYear} anni</p>

      {/* Ternario per rendering condizionale */}
      <span>{isAdmin ? "Amministratore" : "Utente"}</span>

      {/* && per mostrare/nascondere */}
      {user.email && <p>Email: {user.email}</p>}

      {/* Chiamata a funzione */}
      <p>{formatDate(user.createdAt)}</p>

      {/* Array.map per liste */}
      <ul>
        {user.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </div>
  );
}`,
      },
      {
        type: "warning",
        content:
          "In JSX non si possono usare statement (if, for, while). Si usano espressioni: ternario (? :), && per condizioni, e .map() per le liste. Gli statement vanno fuori dal return.",
      },
      {
        type: "info",
        content:
          "Ogni elemento in una lista mappata con .map() deve avere una prop 'key' unica. React la usa per tracciare quale elemento è cambiato, aggiunto o rimosso.",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "JSX e className",
        description:
          "Perché in JSX si usa 'className' invece di 'class' per le classi CSS?",
        difficulty: "facile",
        options: [
          "È una convenzione di React senza motivo tecnico",
          "Perché 'class' è una parola riservata in JavaScript (usata per le classi ES6)",
          "Perché className è più veloce da elaborare",
          "Perché funziona solo nei browser moderni",
        ],
        correct: 1,
        explanation:
          "In JavaScript, 'class' è una parola riservata usata per dichiarare classi ES6. Siccome JSX viene trasformato in JavaScript, si usa 'className' per evitare conflitti. Lo stesso vale per 'htmlFor' al posto di 'for'.",
      },
      {
        type: "multiple-choice",
        title: "\"use client\" e Server Components",
        description:
          "In un progetto Next.js con App Router, quando è necessario aggiungere \"use client\" in cima a un file componente?",
        difficulty: "medio",
        options: [
          "Sempre, in ogni componente",
          "Solo quando il componente usa hook (useState, useEffect) o gestori di eventi (onClick, onChange)",
          "Solo quando il componente fa chiamate API",
          "Solo quando il componente importa altri componenti",
        ],
        correct: 1,
        explanation:
          "In Next.js App Router, i componenti sono Server Components per default: vengono renderizzati sul server e non possono usare hook o interattività. \"use client\" li rende Client Components, abilitando hook, eventi e API del browser.",
      },
      {
        type: "multiple-choice",
        title: "Rendering condizionale in JSX",
        description:
          "Qual è il modo corretto di mostrare un messaggio solo se 'errore' è diverso da null?",
        difficulty: "facile",
        options: [
          "`if (errore) { <p>{errore}</p> }`",
          "`{errore && <p>{errore}</p>}`",
          "`{errore ? <p>{errore}</p>}`",
          "`<p if={errore}>{errore}</p>`",
        ],
        correct: 1,
        explanation:
          "In JSX non si possono usare statement come if. L'operatore && è il pattern standard per il rendering condizionale: se 'errore' è truthy, React renderizza il <p>, altrimenti non mostra nulla.",
      },
    ],
  },

  props: {
    sections: [
      {
        type: "text",
        content:
          "Le props (abbreviazione di properties) sono il meccanismo con cui i componenti React ricevono dati dal componente genitore. Funzionano come gli argomenti di una funzione: il genitore passa i dati, il figlio li riceve e li usa.",
      },
      {
        type: "heading",
        content: "Passare props a un componente",
      },
      {
        type: "text",
        content:
          "Le props si passano come attributi sul tag del componente. Il componente figlio le riceve come un unico oggetto, il primo parametro della funzione.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Props: passaggio e ricezione",
        code: `// Componente che riceve props
function Greeting(props) {
  return <h1>Ciao, {props.name}! Hai {props.age} anni.</h1>;
}

// Passare props al componente
function App() {
  return (
    <div>
      <Greeting name="Mario" age={30} />
      <Greeting name="Luigi" age={28} />
    </div>
  );
}

// Stringhe: con le virgolette "..."
// Numeri, booleani, espressioni: con le graffe {...}`,
      },
      {
        type: "heading",
        content: "Destructuring delle props",
      },
      {
        type: "text",
        content:
          "Nella pratica, quasi nessuno scrive 'props.name'. Si usa il destructuring direttamente nei parametri della funzione per estrarre solo le proprietà necessarie.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Destructuring nei parametri",
        code: `// Invece di: function Card(props) { ... props.title ... }
// Si fa il destructuring direttamente:
function Card({ title, description, imageUrl }) {
  return (
    <div>
      <img src={imageUrl} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

// È lo stesso di scrivere:
function Card(props) {
  const { title, description, imageUrl } = props;
  // ...
}`,
      },
      {
        type: "heading",
        content: "Valori di default per le props",
      },
      {
        type: "text",
        content:
          "Si possono specificare valori di default per le props usando la sintassi di default del destructuring. Se il genitore non passa quella prop, verrà usato il valore di default.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Props con valori di default",
        code: `function Button({ label = "Click", variant = "primary", size = "medium" }) {
  return (
    <button className={\`btn btn-\${variant} btn-\${size}\`}>
      {label}
    </button>
  );
}

// Tutti i valori di default
<Button />
// Renderizza: <button class="btn btn-primary btn-medium">Click</button>

// Override parziale
<Button label="Salva" variant="success" />
// Renderizza: <button class="btn btn-success btn-medium">Salva</button>`,
      },
      {
        type: "heading",
        content: "La prop children",
      },
      {
        type: "text",
        content:
          "Tutto ciò che si mette tra il tag di apertura e chiusura di un componente viene passato come prop speciale 'children'. È il pattern per creare componenti wrapper o layout.",
      },
      {
        type: "code",
        language: "javascript",
        title: "children: componenti wrapper",
        code: `// Componente wrapper che usa children
function Card({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

// Uso: il contenuto tra i tag diventa 'children'
function App() {
  return (
    <Card title="Profilo utente">
      <p>Nome: Mario Rossi</p>
      <p>Email: mario@example.com</p>
      <button>Modifica</button>
    </Card>
  );
}

// children può essere qualsiasi JSX:
// testo, elementi, altri componenti, o anche nulla`,
      },
      {
        type: "heading",
        content: "Funzioni come props (callback pattern)",
      },
      {
        type: "text",
        content:
          "Le props non servono solo per passare dati verso il basso: passando una funzione come prop, il componente figlio può comunicare verso l'alto col genitore. È il pattern fondamentale per gestire eventi e aggiornare lo stato del genitore.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Callback props per comunicazione figlio -> genitore",
        code: `// Componente figlio: riceve una funzione come prop
function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={() => onSearch(query)}>
        Cerca
      </button>
    </div>
  );
}

// Componente genitore: passa la funzione
function App() {
  const handleSearch = (searchText) => {
    console.log("Ricerca:", searchText);
    // qui si potrebbe fare una chiamata API
  };

  return <SearchBar onSearch={handleSearch} />;
}`,
      },
      {
        type: "heading",
        content: "Passare action creator Redux come props",
      },
      {
        type: "text",
        content:
          "Un pattern avanzato molto comune nei progetti reali è passare action creator di Redux come props. Questo rende il componente figlio riutilizzabile: non ha bisogno di sapere quale azione specifica dispatchare, lo decide il genitore.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Redux action creator come prop",
        code: `// Il componente riceve l'action creator come prop
function SiteFilter({ options, selectedValue, reduxAction }) {
  const dispatch = useDispatch();

  const handleChange = (newValue) => {
    dispatch(reduxAction(newValue));
  };

  return (
    <select value={selectedValue} onChange={(e) => handleChange(e.target.value)}>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}

// Il genitore decide QUALE azione Redux usare
import { setSelectedSite } from "@/redux/filtersSlice";
import { setSelectedRegion } from "@/redux/filtersSlice";

function Filters() {
  return (
    <>
      <SiteFilter reduxAction={setSelectedSite} />
      <SiteFilter reduxAction={setSelectedRegion} />
    </>
  );
}`,
      },
      {
        type: "tip",
        content:
          "Nel progetto, il componente HomeFilter riceve un'action creator Redux come prop: `reduxAction={setSelectedSite}`.",
      },
      {
        type: "warning",
        content:
          "Le props sono read-only: un componente non deve mai modificare le props ricevute. Se hai bisogno di un valore che cambia, usa lo state (useState).",
      },
      {
        type: "info",
        content:
          "Il flusso dei dati in React è unidirezionale: le props scendono dal genitore ai figli. Per far risalire informazioni, si passano funzioni callback come props.",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "Destructuring delle props",
        description:
          "Qual è la forma corretta di destructuring per un componente che riceve 'name', 'age' e 'isActive'?",
        difficulty: "facile",
        options: [
          "`function User(name, age, isActive) { ... }`",
          "`function User({ name, age, isActive }) { ... }`",
          "`function User([name, age, isActive]) { ... }`",
          "`function User(props.name, props.age, props.isActive) { ... }`",
        ],
        correct: 1,
        explanation:
          "Le props sono un singolo oggetto, quindi si usa il destructuring di oggetto con le graffe {}. La prima opzione tratterebbe name, age e isActive come tre parametri separati, non come proprietà di un oggetto.",
      },
      {
        type: "multiple-choice",
        title: "Il pattern callback",
        description:
          "In questo codice, come fa il componente SearchBar a comunicare al genitore cosa ha cercato l'utente?\n\nfunction App() {\n  return <SearchBar onSearch={(text) => console.log(text)} />;\n}",
        difficulty: "medio",
        options: [
          "SearchBar modifica direttamente lo state di App",
          "SearchBar chiama la funzione ricevuta come prop 'onSearch', passandole il testo cercato",
          "SearchBar emette un evento DOM personalizzato che App ascolta",
          "SearchBar usa useContext per condividere i dati con App",
        ],
        correct: 1,
        explanation:
          "Il pattern callback è il modo standard per la comunicazione figlio -> genitore in React. Il genitore passa una funzione come prop, e il figlio la invoca quando serve, passando i dati come argomento.",
      },
      {
        type: "multiple-choice",
        title: "Props e immutabilità",
        description:
          "Cosa succede se un componente figlio prova a modificare una prop ricevuta?",
        difficulty: "medio",
        options: [
          "La prop viene aggiornata e il componente genitore si ri-renderizza",
          "Funziona ma è sconsigliato per motivi di performance",
          "React lancia un errore o il comportamento è imprevedibile: le props sono read-only",
          "La modifica funziona solo nel componente figlio, senza effetti sul genitore",
        ],
        correct: 2,
        explanation:
          "Le props in React sono read-only. Modificarle direttamente viola il principio del flusso unidirezionale dei dati e può causare bug difficili da trovare. Per valori che cambiano, si usa lo state.",
      },
    ],
  },

  usestate: {
    sections: [
      {
        type: "text",
        content:
          "useState è il hook fondamentale di React per gestire lo stato locale di un componente. Lo stato è un dato che, quando cambia, causa il re-rendering del componente per riflettere il nuovo valore nell'interfaccia.",
      },
      {
        type: "heading",
        content: "Importare e usare useState",
      },
      {
        type: "code",
        language: "javascript",
        title: "Sintassi base di useState",
        code: `"use client";
import { useState } from "react";

function Counter() {
  // useState restituisce un array di 2 elementi:
  // [valoreAttuale, funzionePerAggiornarlo]
  const [count, setCount] = useState(0); // 0 è il valore iniziale

  return (
    <div>
      <p>Contatore: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(count - 1)}>-1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}`,
      },
      {
        type: "info",
        content:
          "Il nome della variabile e del setter è libero, ma la convenzione è [qualcosa, setQualcosa]. React non impone questa convenzione, ma rende il codice più leggibile.",
      },
      {
        type: "heading",
        content: "Aggiornamento: valore diretto vs funzione",
      },
      {
        type: "text",
        content:
          "Lo stato si può aggiornare passando un valore diretto oppure una funzione. La funzione riceve il valore precedente come argomento ed è essenziale quando l'aggiornamento dipende dal valore corrente.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Due modi di aggiornare lo stato",
        code: `function Counter() {
  const [count, setCount] = useState(0);

  // Modo 1: valore diretto
  // Funziona per aggiornamenti che non dipendono dal valore precedente
  const reset = () => setCount(0);

  // Modo 2: funzione (riceve il valore precedente)
  // NECESSARIO quando l'aggiornamento dipende dallo stato attuale
  const increment = () => setCount((prev) => prev + 1);

  // Perché la funzione è importante?
  // Se clicchi molto velocemente con il valore diretto, puoi perdere aggiornamenti.
  // Con la funzione, ogni aggiornamento parte dall'ultimo valore reale.

  // Esempio: questo potrebbe NON dare +3
  const addThreeBuggy = () => {
    setCount(count + 1); // tutti e tre leggono lo stesso 'count'
    setCount(count + 1);
    setCount(count + 1);
  };

  // Questo dà SEMPRE +3
  const addThreeCorrect = () => {
    setCount((prev) => prev + 1); // prev è sempre aggiornato
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  };

  return (/* ... */);
}`,
      },
      {
        type: "heading",
        content: "Stato con oggetti",
      },
      {
        type: "text",
        content:
          "Quando lo stato è un oggetto, non si possono modificare le proprietà direttamente. Si deve creare un NUOVO oggetto con lo spread operator, sovrascrivendo solo le proprietà che cambiano. React confronta i riferimenti, non il contenuto.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Aggiornare oggetti nello stato",
        code: `function UserForm() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: 0,
  });

  // SBAGLIATO: mutare direttamente l'oggetto
  // user.name = "Mario"; // React non rileva il cambiamento!

  // CORRETTO: creare un nuovo oggetto con spread
  const updateName = (name) => {
    setUser({ ...user, name: name });
    // equivale a: setUser({ name: name, email: user.email, age: user.age })
  };

  // Con la forma funzionale (più sicuro)
  const updateEmail = (email) => {
    setUser((prev) => ({ ...prev, email }));
  };

  return (
    <form>
      <input
        value={user.name}
        onChange={(e) => updateName(e.target.value)}
      />
      <input
        value={user.email}
        onChange={(e) => updateEmail(e.target.value)}
      />
    </form>
  );
}`,
      },
      {
        type: "heading",
        content: "Stato con array",
      },
      {
        type: "code",
        language: "javascript",
        title: "Aggiornare array nello stato",
        code: `function TodoList() {
  const [todos, setTodos] = useState([]);

  // Aggiungere un elemento
  const addTodo = (text) => {
    setTodos((prev) => [...prev, { id: Date.now(), text, done: false }]);
  };

  // Rimuovere un elemento (filter crea un nuovo array)
  const removeTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Aggiornare un elemento (map crea un nuovo array)
  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  // MAI usare push, pop, splice, sort direttamente!
  // Tutti mutano l'array originale.
  // Usare: spread, filter, map, slice (senza la 'p').
}`,
      },
      {
        type: "heading",
        content: "Più variabili di stato",
      },
      {
        type: "text",
        content:
          "Un componente può avere quante variabili di stato servono. È spesso meglio avere più useState separati piuttosto che un unico oggetto complesso, a meno che le proprietà cambino sempre insieme.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Stato multiplo in un componente",
        code: `function Dashboard() {
  // Ogni useState è indipendente
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [zoomRange, setZoomRange] = useState({ min: 0, max: 100 });
  const [isLoading, setIsLoading] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); // toggle booleano
  };

  return (
    <div>
      <button onClick={toggleSidebar}>
        {isSidebarOpen ? "Chiudi" : "Apri"} sidebar
      </button>
      {isSidebarOpen && <Sidebar />}
      {isLoading ? <Spinner /> : <Chart data={data} />}
    </div>
  );
}`,
      },
      {
        type: "tip",
        content:
          "Nel progetto, useState gestisce lo stato locale: sidebar aperta/chiusa, punto selezionato nel grafico, range di zoom.",
      },
      {
        type: "subheading",
        content: "Lo stato è per istanza del componente",
      },
      {
        type: "text",
        content:
          "Se si renderizzano due istanze dello stesso componente, ognuna ha il proprio stato indipendente. Cambiare lo stato di una non influenza l'altra. Questo è uno dei principi fondamentali di React.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Stato isolato per istanza",
        code: `function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount((c) => c + 1)}>
      Cliccato {count} volte
    </button>
  );
}

// Due istanze con stato INDIPENDENTE
function App() {
  return (
    <>
      <Counter /> {/* ha il suo count = 0 */}
      <Counter /> {/* ha il suo count = 0, separato */}
    </>
  );
  // Cliccare su uno non cambia l'altro!
}`,
      },
      {
        type: "warning",
        content:
          "Non chiamare useState dentro if, for o funzioni annidate. Gli hook devono essere chiamati sempre nello stesso ordine, al livello più alto del componente. React traccia gli hook per posizione.",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "Aggiornamento basato su stato precedente",
        description:
          "Qual è il modo corretto di incrementare un contatore che dipende dal valore precedente?",
        difficulty: "facile",
        options: [
          "`setCount(count + 1)`",
          "`setCount((prev) => prev + 1)`",
          "`count = count + 1`",
          "Entrambe le prime due opzioni funzionano sempre allo stesso modo",
        ],
        correct: 1,
        explanation:
          "Quando l'aggiornamento dipende dal valore precedente, la forma funzionale `setCount((prev) => prev + 1)` è più sicura. La forma diretta `setCount(count + 1)` può perdere aggiornamenti se ci sono più set nello stesso ciclo di rendering, perché tutti leggono lo stesso valore di 'count'.",
      },
      {
        type: "multiple-choice",
        title: "Aggiornare un oggetto nello stato",
        description:
          "Hai `const [user, setUser] = useState({ name: 'Mario', age: 30 })`. Come aggiorni solo il nome?",
        difficulty: "medio",
        options: [
          "`user.name = 'Luigi'`",
          "`setUser({ name: 'Luigi' })`",
          "`setUser({ ...user, name: 'Luigi' })`",
          "`setUser((prev) => { prev.name = 'Luigi'; return prev; })`",
        ],
        correct: 2,
        explanation:
          "Bisogna creare un NUOVO oggetto con spread, sovrascrivendo solo la proprietà che cambia. L'opzione 1 muta direttamente (React non rileva il cambiamento). L'opzione 2 perde la proprietà 'age'. L'opzione 4 muta l'oggetto originale e restituisce lo stesso riferimento.",
      },
      {
        type: "multiple-choice",
        title: "Dove chiamare useState",
        description:
          "Quale di queste posizioni per useState causerebbe un errore?",
        difficulty: "difficile",
        options: [
          "Al livello più alto della funzione componente, prima del return",
          "Dentro un blocco if, per creare stato solo quando serve",
          "In un custom hook, al livello più alto del hook",
          "Prima di qualsiasi logica condizionale nel componente",
        ],
        correct: 1,
        explanation:
          "Gli hook (useState, useEffect, etc.) non possono essere chiamati dentro condizioni, cicli o funzioni annidate. React traccia gli hook per la loro posizione nell'ordine di chiamata: se un hook viene saltato a causa di un if, l'ordine cambia e React non riesce a collegare gli stati correttamente.",
      },
    ],
  },

  useeffect: {
    sections: [
      {
        type: "text",
        content:
          "useEffect è l'hook per gestire i side effects: operazioni che interagiscono con il mondo esterno al componente. Chiamate API, sottoscrizioni a eventi, manipolazione del DOM, timer: tutto ciò che non è puro rendering va in useEffect.",
      },
      {
        type: "heading",
        content: "Sintassi di useEffect",
      },
      {
        type: "text",
        content:
          "useEffect accetta due argomenti: una funzione callback (l'effetto da eseguire) e un array di dipendenze (opzionale) che determina QUANDO l'effetto deve rieseguirsi.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Le tre forme di useEffect",
        code: `import { useEffect } from "react";

function MyComponent() {
  // 1. Senza array di dipendenze: esegue ad OGNI rendering
  //    (usato raramente, può causare loop infiniti)
  useEffect(() => {
    console.log("Eseguito ad ogni render");
  });

  // 2. Array vuoto []: esegue SOLO al mount (primo rendering)
  //    Equivalente a componentDidMount nelle classi
  useEffect(() => {
    console.log("Eseguito solo una volta, al mount");
  }, []);

  // 3. Con dipendenze: esegue al mount E quando una dipendenza cambia
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("Count è cambiato:", count);
    document.title = \`Contatore: \${count}\`;
  }, [count]); // riesegue solo quando 'count' cambia

  return (/* ... */);
}`,
      },
      {
        type: "heading",
        content: "Array di dipendenze vuoto: eseguire al mount",
      },
      {
        type: "text",
        content:
          "Il pattern più comune è useEffect con array vuoto [] per eseguire codice una sola volta quando il componente appare nel DOM. È perfetto per fetch iniziali, setup di event listener, o lettura di dati iniziali.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Fetch dei dati al mount",
        code: `"use client";
import { useState, useEffect } from "react";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Definire la funzione async dentro useEffect
    // (useEffect NON può essere async direttamente)
    async function fetchUsers() {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []); // [] = solo al mount

  if (loading) return <p>Caricamento...</p>;
  if (error) return <p>Errore: {error}</p>;

  return (
    <ul>
      {users.map((u) => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}`,
      },
      {
        type: "warning",
        content:
          "useEffect NON può essere una funzione async. La callback deve essere sincrona. Se serve async/await, si definisce una funzione async all'interno e la si chiama subito.",
      },
      {
        type: "heading",
        content: "Dipendenze che attivano il re-run",
      },
      {
        type: "text",
        content:
          "Quando si passa un array di dipendenze, useEffect riesegue la callback ogni volta che uno dei valori nell'array cambia (confronto con Object.is). È il modo per reagire ai cambiamenti di props o state.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Effetto che risponde a cambiamenti",
        code: `function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);

  // Riesegue quando productId cambia
  useEffect(() => {
    async function loadProduct() {
      const res = await fetch(\`/api/products/\${productId}\`);
      const data = await res.json();
      setProduct(data);
    }
    loadProduct();
  }, [productId]); // dipendenza: quando cambia, rifai il fetch

  // Esempio con più dipendenze
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchResults(filters, page);
  }, [filters, page]); // riesegue se cambia filters O page
}`,
      },
      {
        type: "heading",
        content: "Cleanup: pulizia degli effetti",
      },
      {
        type: "text",
        content:
          "La funzione restituita da useEffect è il cleanup: viene eseguita quando il componente si smonta O prima che l'effetto riesegua con nuove dipendenze. È essenziale per evitare memory leak con timer, listener o sottoscrizioni.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Cleanup function",
        code: `function WindowSize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Setup: aggiungere il listener
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Cleanup: rimuovere il listener quando il componente si smonta
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // solo al mount/unmount

  return <p>Larghezza: {width}px</p>;
}

// Cleanup con timer
function Notification({ message, duration = 3000 }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);

    // Se il componente si smonta prima del timeout, cancellalo
    return () => clearTimeout(timer);
  }, [duration]);

  return visible ? <div className="notification">{message}</div> : null;
}`,
      },
      {
        type: "heading",
        content: "Pattern comune: sincronizzare URL con lo stato",
      },
      {
        type: "text",
        content:
          "Un pattern frequente nelle applicazioni reali è usare useEffect per sincronizzare i parametri dell'URL con lo stato dell'applicazione. Quando un utente arriva direttamente a un URL, useEffect legge i parametri e aggiorna lo store.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Sincronizzare URL e Redux",
        code: `"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setSelectedSite, setDateRange } from "@/redux/filtersSlice";

function PageWithUrlSync() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  // Al mount: leggi i parametri URL e aggiorna Redux
  useEffect(() => {
    const site = searchParams.get("site");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    if (site) dispatch(setSelectedSite(site));
    if (from && to) dispatch(setDateRange({ from, to }));
  }, [searchParams, dispatch]);

  return (/* ... */);
}`,
      },
      {
        type: "tip",
        content:
          "Nel progetto, useEffect sincronizza i parametri URL con Redux: quando l'utente naviga direttamente a un URL, useEffect legge i params e li dispatcha allo store.",
      },
      {
        type: "subheading",
        content: "Errori comuni con useEffect",
      },
      {
        type: "list",
        items: [
          "Dimenticare l'array di dipendenze: l'effetto esegue ad ogni render, possibile loop infinito",
          "Dimenticare una dipendenza nell'array: l'effetto usa valori stale (non aggiornati)",
          "Mettere un oggetto/array nelle dipendenze senza memo: riesegue ad ogni render perché {} !== {}",
          "Non fare il cleanup: memory leak con listener, timer, sottoscrizioni",
          "Rendere useEffect async: non è supportato, definire la funzione async all'interno",
        ],
      },
      {
        type: "info",
        content:
          "Regola d'oro: se l'effetto usa un valore da props o state, quel valore deve essere nell'array di dipendenze. Il linter ESLint react-hooks/exhaustive-deps ti avvisa se dimentichi una dipendenza.",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "Array di dipendenze vuoto",
        description:
          "Quando si passa un array vuoto [] come secondo argomento di useEffect, quante volte viene eseguito l'effetto?",
        difficulty: "facile",
        options: [
          "Mai",
          "Una sola volta, quando il componente viene montato nel DOM",
          "Ad ogni re-rendering del componente",
          "Solo quando il componente viene smontato",
        ],
        correct: 1,
        explanation:
          "Un array di dipendenze vuoto [] dice a React: \"questo effetto non dipende da nessun valore, eseguilo solo al mount\". L'effetto viene eseguito una sola volta dopo il primo rendering.",
      },
      {
        type: "multiple-choice",
        title: "Cleanup function",
        description:
          "Quando viene eseguita la funzione restituita da useEffect (il cleanup)?",
        difficulty: "medio",
        options: [
          "Solo quando il componente si smonta dal DOM",
          "Prima di ogni esecuzione dell'effetto (tranne la prima) e quando il componente si smonta",
          "Solo quando cambiano le dipendenze",
          "Subito dopo ogni esecuzione dell'effetto",
        ],
        correct: 1,
        explanation:
          "Il cleanup viene eseguito in due momenti: (1) prima che l'effetto riesegua con nuove dipendenze (per pulire il vecchio effetto) e (2) quando il componente si smonta dal DOM. Non viene eseguito dopo la prima esecuzione dell'effetto, ma prima della seconda.",
      },
      {
        type: "multiple-choice",
        title: "useEffect e async",
        description:
          "Quale di questi è il modo CORRETTO di fare una chiamata async in useEffect?",
        difficulty: "difficile",
        options: [
          "`useEffect(async () => { const data = await fetch('/api'); }, [])`",
          "`useEffect(() => { fetch('/api').then(res => res.json()).then(setData); }, [])`",
          "`useEffect(() => { async function load() { const data = await fetch('/api'); } load(); }, [])`",
          "Sia la seconda che la terza opzione sono corrette",
        ],
        correct: 3,
        explanation:
          "useEffect non supporta callback async (opzione 1) perché il cleanup deve essere una funzione, non una Promise. Si può usare .then() (opzione 2) o definire una funzione async interna e invocarla (opzione 3). Entrambi gli approcci sono validi e comuni.",
      },
    ],
  },
};
