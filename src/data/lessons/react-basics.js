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
        type: "text",
        content:
          "Di solito ogni componente vive in un proprio file e viene esportato con `export default`, così da poterlo importare dove serve (come visto nella lezione sui moduli).",
      },
      {
        type: "code",
        language: "javascript",
        title: "Un componente per file",
        code: `// File: Welcome.js
export default function Welcome() {
  return <h1>Benvenuto nell'applicazione!</h1>;
}

// File: App.js
import Welcome from "./Welcome";

export default function App() {
  return <Welcome />;
}`,
      },
      {
        type: "info",
        content:
          "Nel modulo Next.js vedrai che alcuni componenti richiedono la direttiva `\"use client\"` in cima al file. Per ora non serve: concentrati su React.",
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

// Soluzione 2: Fragment esplicito
// (accetta l'attributo key, utile nelle liste che vedremo tra poco)
import { Fragment } from "react";

function Recipe() {
  return (
    <Fragment>
      <h2>Pasta al pomodoro</h2>
      <p>Pronta in 20 minuti</p>
    </Fragment>
  );
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
        code: `const user = {
  name: "Giulia",
  role: "admin",
  joinYear: 2020,
  email: "giulia@example.com",
  tags: ["libri", "musica", "viaggi"],
};

function formatName(name) {
  return name.toUpperCase();
}

function UserCard() {
  const isAdmin = user.role === "admin";
  const currentYear = 2025;

  return (
    <div>
      {/* Variabile */}
      <h2>{user.name}</h2>

      {/* Espressione */}
      <p>Registrata da {currentYear - user.joinYear} anni</p>

      {/* Ternario per rendering condizionale */}
      <span>{isAdmin ? "Amministratore" : "Utente"}</span>

      {/* && per mostrare/nascondere */}
      {user.email && <p>Email: {user.email}</p>}

      {/* Chiamata a funzione */}
      <p>{formatName(user.name)}</p>

      {/* map per le liste */}
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
          "Perché 'class' è una parola riservata in JavaScript (usata per le classi ES6)",
          "È una convenzione di React senza motivo tecnico",
          "Perché className è più veloce da elaborare",
          "Perché funziona solo nei browser moderni",
        ],
        correct: 0,
        explanation:
          "In JavaScript, 'class' è una parola riservata usata per dichiarare classi ES6. Siccome JSX viene trasformato in JavaScript, si usa 'className' per evitare conflitti. Lo stesso vale per 'htmlFor' al posto di 'for'.",
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
      {
        type: "multiple-choice",
        title: "Nome dei componenti",
        description:
          "Hai scritto `function movieCard() { return <div>Film</div>; }` e lo usi come `<movieCard />`, ma sulla pagina non compare nulla di ciò che ti aspetti. Perché?",
        difficulty: "medio",
        options: [
          "Perché un componente deve sempre ricevere almeno una prop",
          "Perché i componenti devono essere scritti come arrow function",
          "Perché il nome di un componente deve iniziare con la lettera maiuscola: con la minuscola React lo tratta come un tag HTML sconosciuto",
          "Perché manca un Fragment attorno al div",
        ],
        correct: 2,
        explanation:
          "React distingue i componenti dai tag HTML nativi grazie alla maiuscola iniziale. `<movieCard />` viene interpretato come un elemento HTML chiamato \"moviecard\", che non esiste. Rinominandolo `MovieCard` e usando `<MovieCard />`, React chiama la tua funzione.",
      },
      {
        type: "code",
        mode: "static",
        title: "Il tuo primo componente",
        description:
          "Crea un componente `BookCard` che restituisce un `<div>` con classe CSS `book-card` contenente:\n- un `<h2>` con il titolo \"Il piccolo principe\"\n- un `<p>` con l'autore \"Antoine de Saint-Exupéry\"\n\nRicorda: in JSX la classe si scrive con `className` e serve un unico elemento radice.",
        difficulty: "facile",
        starterCode: `function BookCard() {
  // restituisci qui il JSX
}`,
        solution: `function BookCard() {
  return (
    <div className="book-card">
      <h2>Il piccolo principe</h2>
      <p>Antoine de Saint-Exupéry</p>
    </div>
  );
}`,
        validate: `const c = $codeNoComments;
if (!/function\\s+BookCard\\s*\\(|const\\s+BookCard\\s*=/.test(c)) return "Definisci un componente chiamato BookCard (con la B maiuscola).";
if (!/\\breturn\\b/.test(c)) return "Il componente deve restituire il JSX con return.";
if (/<div[^>]*\\sclass\\s*=/.test(c)) return "In JSX non si usa class: usa className.";
if (!/<div[^>]*className\\s*=\\s*["']book-card["'][^>]*>/.test(c)) return "Il div radice deve avere className=\\"book-card\\".";
if (!/<h2[^>]*>\\s*Il piccolo principe\\s*<\\/h2>/.test(c)) return "Aggiungi un <h2> con il testo \\"Il piccolo principe\\".";
if (!/<p[^>]*>\\s*Antoine de Saint-Exup[ée]ry\\s*<\\/p>/.test(c)) return "Aggiungi un <p> con il testo \\"Antoine de Saint-Exupéry\\".";
if (!/<\\/div>/.test(c)) return "Ricordati di chiudere il <div> con </div>.";
return true;`,
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
function ProductItem({ name, price, onAddToCart }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{price} €</p>
      {/* onClick riceve una funzione che React chiama al click */}
      <button onClick={() => onAddToCart(name)}>
        Aggiungi al carrello
      </button>
    </div>
  );
}

// Componente genitore: decide cosa fare quando si clicca
function Shop() {
  const handleAddToCart = (productName) => {
    console.log("Aggiunto al carrello:", productName);
  };

  return (
    <>
      <ProductItem name="Maglietta" price={15} onAddToCart={handleAddToCart} />
      <ProductItem name="Zaino" price={40} onAddToCart={handleAddToCart} />
    </>
  );
}`,
      },
      {
        type: "heading",
        content: "Componenti riutilizzabili: il genitore decide cosa fare",
      },
      {
        type: "text",
        content:
          "Le callback props rendono un componente davvero riutilizzabile: il figlio si occupa solo di mostrare l'interfaccia e di avvisare quando succede qualcosa, mentre è il genitore a decidere cosa fare. Lo stesso componente può così essere usato in contesti diversi. Nel gestore `onChange` di un `<select>` o di un `<input>`, React passa un oggetto evento: il valore scelto si legge con `e.target.value`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Un menu a tendina generico",
        code: `// Il componente non sa COSA succederà quando l'utente sceglie:
// si limita a chiamare onSelect con il valore scelto
function SelectMenu({ label, options, onSelect }) {
  return (
    <label>
      {label}
      <select onChange={(e) => onSelect(e.target.value)}>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </label>
  );
}

// Il genitore decide cosa fare in ciascun caso
function MovieFilters() {
  const handleGenre = (genre) => console.log("Genere scelto:", genre);
  const handleYear = (year) => console.log("Anno scelto:", year);

  return (
    <>
      <SelectMenu label="Genere" options={["Commedia", "Drammatico", "Animazione"]} onSelect={handleGenre} />
      <SelectMenu label="Anno" options={["2023", "2024", "2025"]} onSelect={handleYear} />
    </>
  );
}`,
      },
      {
        type: "tip",
        content:
          "Dai alle callback props nomi che iniziano con `on` (onSelect, onSave, onDelete): rende subito chiaro che si tratta di funzioni da chiamare quando accade qualcosa.",
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
          "`function User(props.name, props.age, props.isActive) { ... }`",
          "`function User([name, age, isActive]) { ... }`",
          "`function User({ name, age, isActive }) { ... }`",
        ],
        correct: 3,
        explanation:
          "Le props sono un singolo oggetto, quindi si usa il destructuring di oggetto con le graffe {}. La prima opzione tratterebbe name, age e isActive come tre parametri separati, non come proprietà di un oggetto.",
      },
      {
        type: "multiple-choice",
        title: "Il pattern callback",
        description:
          "In questo codice, come fa il componente ProductItem a comunicare al genitore quale prodotto è stato aggiunto?\n\nfunction Shop() {\n  return <ProductItem name=\"Zaino\" onAddToCart={(name) => console.log(name)} />;\n}",
        difficulty: "medio",
        options: [
          "ProductItem chiama la funzione ricevuta come prop 'onAddToCart', passandole il nome del prodotto",
          "ProductItem modifica direttamente le variabili di Shop",
          "ProductItem emette un evento DOM personalizzato che Shop ascolta",
          "ProductItem restituisce il nome del prodotto con return",
        ],
        correct: 0,
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
      {
        type: "code",
        mode: "static",
        title: "Un componente con props",
        description:
          "Completa il componente `MovieCard`:\n- ricevi le props `title` e `year` con il destructuring nei parametri, dando a `year` il valore di default `2024`\n- restituisci un `<div>` con un `<h3>` che mostra `{title}` e un `<p>` che mostra `{year}`\n\nPoi, in `App`, usa `<MovieCard />` passando `title=\"Inception\"` e `year={2010}`.",
        difficulty: "medio",
        starterCode: `function MovieCard(props) {
  return <div></div>;
}

function App() {
  return <div>{/* usa MovieCard qui */}</div>;
}`,
        solution: `function MovieCard({ title, year = 2024 }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{year}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <MovieCard title="Inception" year={2010} />
    </div>
  );
}`,
        validate: `const c = $codeNoComments;
if (!/function\\s+MovieCard\\s*\\(\\s*\\{[^}]*\\}\\s*\\)|MovieCard\\s*=\\s*\\(\\s*\\{[^}]*\\}\\s*\\)\\s*=>/.test(c)) return "Usa il destructuring nei parametri: function MovieCard({ title, year = 2024 }).";
if (!/\\{[^}]*\\btitle\\b[^}]*\\}\\s*\\)/.test(c)) return "Estrai la prop title nel destructuring dei parametri.";
if (!/\\byear\\s*=\\s*2024\\b/.test(c)) return "Dai a year il valore di default 2024: year = 2024.";
if (!/<h3[^>]*>\\s*\\{\\s*title\\s*\\}\\s*<\\/h3>/.test(c)) return "Mostra il titolo dentro un <h3>: <h3>{title}</h3>.";
if (!/<p[^>]*>\\s*\\{\\s*year\\s*\\}\\s*<\\/p>/.test(c)) return "Mostra l'anno dentro un <p>: <p>{year}</p>.";
const use = c.match(/<MovieCard\\b[^>]*\\/?>/);
if (!use) return "In App usa il componente: <MovieCard ... />.";
if (!/title\\s*=\\s*["']Inception["']/.test(use[0])) return "Passa la prop title=\\"Inception\\" (stringa tra virgolette).";
if (/year\\s*=\\s*["']/.test(use[0])) return "year è un numero: passalo con le graffe, year={2010}.";
if (!/year\\s*=\\s*\\{\\s*2010\\s*\\}/.test(use[0])) return "Passa la prop year={2010}.";
return true;`,
        solutionExplanation:
          "Le props arrivano come un unico oggetto: con il destructuring nei parametri `{ title, year = 2024 }` si estraggono subito e si assegna un default a `year`, usato solo quando la prop non viene passata. In `App` le stringhe si passano tra virgolette (`title=\"Inception\"`), mentre numeri e altre espressioni JavaScript vanno tra graffe (`year={2010}`): scrivendo `year=\"2010\"` si passerebbe la stringa, non il numero.",
      },
    ],
  },

  usestate: {
    sections: [
      {
        type: "text",
        content:
          "useState è l'hook fondamentale di React per gestire lo stato locale di un componente. Lo stato è un dato che, quando cambia, causa il re-rendering del componente per riflettere il nuovo valore nell'interfaccia.",
      },
      {
        type: "heading",
        content: "Importare e usare useState",
      },
      {
        type: "code",
        language: "javascript",
        title: "Sintassi base di useState",
        code: `import { useState } from "react";

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
  // React non aggiorna 'count' subito: il nuovo valore sarà disponibile
  // solo al rendering successivo. Con la funzione, ogni aggiornamento
  // parte dall'ultimo valore reale.

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
      {/* e.target.value contiene il testo digitato nell'input */}
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
  // (Date.now() restituisce un numero sempre diverso: lo usiamo come id)
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
        code: `function MusicPlayer() {
  // Ogni useState è indipendente
  const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [volume, setVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlaylist = () => {
    setIsPlaylistOpen((prev) => !prev); // toggle booleano
  };

  return (
    <div>
      <button onClick={togglePlaylist}>
        {isPlaylistOpen ? "Chiudi" : "Apri"} playlist
      </button>
      {isPlaylistOpen && <ul><li>Canzone 1</li><li>Canzone 2</li></ul>}
      <p>{currentSong ? "In ascolto: " + currentSong : "Nessun brano selezionato"}</p>
      <p>Volume: {volume}</p>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? "Pausa" : "Play"}
      </button>
    </div>
  );
}`,
      },
      {
        type: "tip",
        content:
          "Usa useState per lo stato locale dell'interfaccia: un pannello aperto o chiuso, l'elemento selezionato, il testo di un campo. Tieni ogni variabile di stato il più semplice possibile.",
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
          "Subito dopo un altro useState, sempre al livello più alto",
          "Prima di qualsiasi logica condizionale nel componente",
          "Dentro un blocco if, per creare stato solo quando serve",
        ],
        correct: 3,
        explanation:
          "Gli hook (useState, useEffect, ecc.) non possono essere chiamati dentro condizioni, cicli o funzioni annidate. React traccia gli hook per la loro posizione nell'ordine di chiamata: se un hook viene saltato a causa di un if, l'ordine cambia e React non riesce a collegare gli stati correttamente.",
      },
      {
        type: "code",
        title: "Aggiornamenti immutabili di una lista di cose da fare",
        description:
          "Scrivi tre funzioni che aggiornano una lista di todo SENZA modificare l'array originale (come si fa con lo stato di React). Ogni todo è un oggetto `{ id, text, done }`.\n\n- `addTodo(todos, todo)`: restituisce un nuovo array con `todo` aggiunto in fondo (usa lo spread)\n- `removeTodo(todos, id)`: restituisce un nuovo array senza il todo con quell'id (usa filter)\n- `toggleTodo(todos, id)`: restituisce un nuovo array in cui il todo con quell'id ha `done` invertito; il todo modificato deve essere un NUOVO oggetto (usa map e lo spread)\n\nNon usare push, splice o assegnamenti come `todo.done = ...`.",
        difficulty: "medio",
        starterCode: `const todos = [
  { id: 1, text: "Fare la spesa", done: false },
  { id: 2, text: "Studiare React", done: true },
];

function addTodo(todos, todo) {
  // restituisci un nuovo array
}

function removeTodo(todos, id) {
  // restituisci un nuovo array
}

function toggleTodo(todos, id) {
  // restituisci un nuovo array
}

console.log(toggleTodo(todos, 1));`,
        solution: `const todos = [
  { id: 1, text: "Fare la spesa", done: false },
  { id: 2, text: "Studiare React", done: true },
];

function addTodo(todos, todo) {
  return [...todos, todo];
}

function removeTodo(todos, id) {
  return todos.filter((t) => t.id !== id);
}

function toggleTodo(todos, id) {
  return todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
}

console.log(toggleTodo(todos, 1));`,
        validate: `if (typeof addTodo !== "function") return "Definisci la funzione addTodo.";
if (typeof removeTodo !== "function") return "Definisci la funzione removeTodo.";
if (typeof toggleTodo !== "function") return "Definisci la funzione toggleTodo.";
const make = () => [
  { id: 1, text: "A", done: false },
  { id: 2, text: "B", done: true },
  { id: 3, text: "C", done: false },
];
const snapshot = JSON.stringify(make());

let list = make();
const nuovo = { id: 4, text: "D", done: false };
const added = addTodo(list, nuovo);
if (!Array.isArray(added)) return "addTodo deve restituire un array.";
if (added === list) return "addTodo deve restituire un NUOVO array, non quello originale.";
if (JSON.stringify(list) !== snapshot) return "addTodo non deve modificare l'array originale (niente push).";
if (!$equal(added, [...make(), nuovo])) return "addTodo deve aggiungere il nuovo todo in fondo alla lista.";
if (!$equal(addTodo([], nuovo), [nuovo])) return "addTodo su una lista vuota deve restituire [todo].";

list = make();
const removed = removeTodo(list, 2);
if (!Array.isArray(removed)) return "removeTodo deve restituire un array.";
if (removed === list || JSON.stringify(list) !== snapshot) return "removeTodo non deve modificare l'array originale: usa filter.";
if (!$equal(removed, [make()[0], make()[2]])) return "removeTodo(todos, 2) deve togliere solo il todo con id 2.";
if (!$equal(removeTodo(make(), 99), make())) return "Se l'id non esiste, removeTodo deve restituire tutti i todo.";

list = make();
const toggled = toggleTodo(list, 1);
if (!Array.isArray(toggled)) return "toggleTodo deve restituire un array.";
if (toggled === list || JSON.stringify(list) !== snapshot) return "toggleTodo non deve modificare l'array o gli oggetti originali: crea un nuovo oggetto con { ...todo, done: !todo.done }.";
if (toggled.length !== 3 || toggled[0].done !== true || toggled[0].text !== "A") return "toggleTodo(todos, 1) deve invertire done del todo con id 1 (da false a true).";
if (toggled[0] === list[0]) return "Il todo modificato deve essere un nuovo oggetto (usa lo spread).";
if (toggled[1].done !== true || toggled[2].done !== false) return "toggleTodo deve lasciare invariati gli altri todo.";
if (toggleTodo(make(), 2)[1].done !== false) return "toggleTodo(todos, 2) deve portare done da true a false.";
return true;`,
        solutionExplanation:
          "Ogni funzione restituisce un array nuovo e lascia intatto quello ricevuto, come richiede lo stato di React. Lo spread `[...todos, todo]` copia gli elementi e aggiunge quello nuovo in fondo; `filter` tiene tutti i todo tranne quello da rimuovere; `map` restituisce lo stesso oggetto per i todo che non cambiano e un NUOVO oggetto `{ ...t, done: !t.done }` per quello da modificare, così React vede un riferimento diverso e aggiorna la pagina.",
      },
      {
        type: "code",
        mode: "static",
        title: "Un interruttore con useState",
        description:
          "Completa il componente `LikeButton`:\n- importa `useState` da \"react\"\n- crea uno stato `liked` con valore iniziale `false` (setter `setLiked`)\n- al click sul `<button>` inverti il valore usando la forma funzionale: `setLiked((prev) => !prev)`\n- dentro il bottone mostra \"Mi piace\" se `liked` è true, altrimenti \"Metti mi piace\" (usa il ternario)",
        difficulty: "facile",
        starterCode: `function LikeButton() {
  return <button>Metti mi piace</button>;
}`,
        solution: `import { useState } from "react";

function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <button onClick={() => setLiked((prev) => !prev)}>
      {liked ? "Mi piace" : "Metti mi piace"}
    </button>
  );
}`,
        validate: `const c = $codeNoComments;
if (!/import\\s*\\{[^}]*\\buseState\\b[^}]*\\}\\s*from\\s*["']react["']/.test(c)) return "Importa useState: import { useState } from \\"react\\";";
if (!/const\\s*\\[\\s*liked\\s*,\\s*setLiked\\s*\\]\\s*=\\s*useState\\(\\s*false\\s*\\)/.test(c)) return "Crea lo stato con: const [liked, setLiked] = useState(false);";
if (!/<button[^>]*onClick\\s*=\\s*\\{/.test(c)) return "Aggiungi un gestore onClick al <button>.";
if (!/setLiked\\(\\s*\\(?\\s*(\\w+)\\s*\\)?\\s*=>\\s*!\\s*\\1\\s*\\)/.test(c)) return "Nel click usa la forma funzionale: setLiked((prev) => !prev).";
if (!/\\{\\s*liked\\s*\\?\\s*["']Mi piace["']\\s*:\\s*["']Metti mi piace["']\\s*\\}/.test(c)) return "Mostra il testo con il ternario: {liked ? \\"Mi piace\\" : \\"Metti mi piace\\"}.";
return true;`,
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
  useEffect(() => {
    console.log("Eseguito solo una volta, al mount");
  }, []);

  // 3. Con dipendenze: esegue al mount E quando una dipendenza cambia
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("Count è cambiato:", count);
    // document.title è il titolo mostrato nella scheda del browser
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
        code: `import { useState, useEffect } from "react";

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
          "Quando si passa un array di dipendenze, useEffect riesegue la callback ogni volta che uno dei valori nell'array cambia (React confronta il valore nuovo con il precedente, in modo simile a ===). È il modo per reagire ai cambiamenti di props o state.",
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
  const [category, setCategory] = useState("tutti");
  const [page, setPage] = useState(1);

  useEffect(() => {
    console.log("Carico la pagina " + page + " della categoria " + category);
  }, [category, page]); // riesegue se cambia category O page
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
  // window.innerWidth è la larghezza della finestra del browser
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Setup: addEventListener registra una funzione che il browser
    // chiama ogni volta che la finestra viene ridimensionata
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
    // clearTimeout annulla un setTimeout non ancora scattato
    const timer = setTimeout(() => setVisible(false), duration);

    // Se il componente si smonta prima del timeout, cancellalo
    return () => clearTimeout(timer);
  }, [duration]);

  return visible ? <div className="notification">{message}</div> : null;
}`,
      },
      {
        type: "heading",
        content: "Pattern comune: sincronizzare lo stato con il browser",
      },
      {
        type: "text",
        content:
          "Un uso frequente di useEffect è tenere allineato qualcosa che sta fuori da React con lo stato del componente. Un esempio classico è `localStorage`: uno spazio del browser in cui salvare stringhe che restano disponibili anche dopo aver ricaricato la pagina. Si legge con `localStorage.getItem(chiave)` e si scrive con `localStorage.setItem(chiave, valore)`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Salvare una preferenza in localStorage",
        code: `import { useState, useEffect } from "react";

function ThemeSwitcher() {
  // Valore iniziale: quello salvato, oppure "chiaro" se non c'è nulla
  const [theme, setTheme] = useState(localStorage.getItem("theme") ?? "chiaro");

  // Ogni volta che theme cambia: salvalo e aggiorna il titolo della scheda
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.title = "Tema: " + theme;
  }, [theme]);

  return (
    <button onClick={() => setTheme(theme === "chiaro" ? "scuro" : "chiaro")}>
      Passa al tema {theme === "chiaro" ? "scuro" : "chiaro"}
    </button>
  );
}`,
      },
      {
        type: "tip",
        content:
          "Usa useEffect solo per sincronizzare il componente con qualcosa di esterno (browser, server, timer). Se un valore si può calcolare da props o state durante il rendering, calcolalo direttamente senza effetti.",
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
          "Mettere un oggetto/array creato nel componente tra le dipendenze: riesegue ad ogni render perché {} !== {} (nella prossima lezione vedrai useMemo per evitarlo)",
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
          "Ad ogni re-rendering del componente",
          "Una sola volta, quando il componente viene montato nel DOM",
          "Solo quando il componente viene smontato",
        ],
        correct: 2,
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
          "Prima di ogni esecuzione dell'effetto (tranne la prima) e quando il componente si smonta",
          "Solo quando il componente si smonta dal DOM",
          "Solo quando cambiano le dipendenze",
          "Subito dopo ogni esecuzione dell'effetto",
        ],
        correct: 0,
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
      {
        type: "code",
        mode: "static",
        title: "Un timer con cleanup",
        description:
          "Completa il componente `Stopwatch`, che conta i secondi trascorsi:\n- importa `useState` e `useEffect` da \"react\"\n- crea lo stato `seconds` con valore iniziale `0`\n- in un `useEffect` con array di dipendenze vuoto `[]`, avvia `setInterval` (che esegue una funzione ripetutamente) salvandolo in una costante `id`: ogni `1000` ms aggiorna i secondi con `setSeconds((prev) => prev + 1)`\n- restituisci dall'effetto una funzione di cleanup che chiama `clearInterval(id)`\n- mostra i secondi in un `<p>`: `<p>Secondi: {seconds}</p>`",
        difficulty: "medio",
        starterCode: `function Stopwatch() {
  return <p>Secondi: 0</p>;
}`,
        solution: `import { useState, useEffect } from "react";

function Stopwatch() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return <p>Secondi: {seconds}</p>;
}`,
        validate: `const c = $codeNoComments;
const imp = c.match(/import\\s*\\{([^}]*)\\}\\s*from\\s*["']react["']/);
if (!imp || !/\\buseState\\b/.test(imp[1]) || !/\\buseEffect\\b/.test(imp[1])) return "Importa entrambi gli hook: import { useState, useEffect } from \\"react\\";";
if (!/const\\s*\\[\\s*seconds\\s*,\\s*setSeconds\\s*\\]\\s*=\\s*useState\\(\\s*0\\s*\\)/.test(c)) return "Crea lo stato con: const [seconds, setSeconds] = useState(0);";
if (!/useEffect\\(\\s*\\(\\s*\\)\\s*=>/.test(c)) return "Chiama useEffect passando una arrow function: useEffect(() => { ... }, []).";
if (!/const\\s+id\\s*=\\s*setInterval\\(/.test(c)) return "Dentro l'effetto salva l'intervallo: const id = setInterval(...).";
if (!/setSeconds\\(\\s*\\(?\\s*(\\w+)\\s*\\)?\\s*=>\\s*\\1\\s*\\+\\s*1\\s*\\)/.test(c)) return "Aggiorna i secondi con la forma funzionale: setSeconds((prev) => prev + 1).";
if (!/,\\s*1000\\s*\\)/.test(c)) return "L'intervallo deve essere di 1000 millisecondi.";
if (!/return\\s*\\(\\s*\\)\\s*=>\\s*\\{?\\s*clearInterval\\(\\s*id\\s*\\)/.test(c)) return "Restituisci dall'effetto la funzione di cleanup: return () => clearInterval(id);";
if (!/\\}\\s*,\\s*\\[\\s*\\]\\s*\\)/.test(c)) return "Passa un array di dipendenze vuoto [] come secondo argomento di useEffect.";
if (!/<p[^>]*>\\s*Secondi:\\s*\\{\\s*seconds\\s*\\}\\s*<\\/p>/.test(c)) return "Mostra i secondi: <p>Secondi: {seconds}</p>.";
return true;`,
        solutionExplanation:
          "L'array vuoto `[]` fa partire l'effetto una sola volta, dopo il primo render. `setInterval` restituisce un id che la funzione di cleanup usa con `clearInterval`: quando il componente viene smontato il timer si ferma, invece di continuare a girare in background. La forma funzionale `setSeconds((prev) => prev + 1)` è indispensabile: l'effetto viene eseguito una volta sola, quindi una variabile `seconds` letta al suo interno resterebbe sempre 0.",
      },
    ],
  },
};
