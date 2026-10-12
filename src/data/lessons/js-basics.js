export const lessons = {
  // ---------------------------------------------------------------------------
  // VARIABILI, TIPI E OPERATORI
  // ---------------------------------------------------------------------------
  "variables": {
    sections: [
      {
        type: "text",
        content:
          "Le variabili sono i mattoncini fondamentali di qualsiasi programma JavaScript. Servono a conservare valori (numeri, testi, oggetti...) per poterli riutilizzare. In JavaScript moderno abbiamo tre parole chiave: `let`, `const` e `var`.",
      },
      {
        type: "heading",
        content: "let, const e var",
      },
      {
        type: "text",
        content:
          "`const` dichiara una variabile il cui *binding* non può essere riassegnato. `let` invece permette la riassegnazione. `var` è la forma più vecchia: ha uno *scope* diverso (function scope anzichè block scope) e oggi si evita quasi sempre.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Dichiarazioni a confronto",
        code: `const siteName = "MyApp";      // non riassegnabile
let currentPage = "overview"; // riassegnabile
currentPage = "details";      // OK

// var ha function scope, NON block scope
if (true) {
  var leaked = "visibile fuori!";
  let blockScoped = "solo qui dentro";
}
console.log(leaked);      // "visibile fuori!"
// console.log(blockScoped); // ReferenceError`,
      },
      {
        type: "tip",
        content:
          "Nelle applicazioni React moderne, si usa sempre const per default e let solo quando serve riassegnare. Non troverai quasi mai var nel codice.",
      },
      {
        type: "heading",
        content: "Tipi primitivi",
      },
      {
        type: "text",
        content:
          "JavaScript ha sette tipi primitivi. I più comuni sono: `string` (testo), `number` (numeri interi e decimali), `boolean` (`true`/`false`), `null` (assenza intenzionale di valore) e `undefined` (valore non ancora assegnato).",
      },
      {
        type: "code",
        language: "javascript",
        title: "I tipi primitivi",
        code: `const name = "MyApp";          // string
const version = 3;             // number
const isActive = true;         // boolean
const nothing = null;          // null  (assenza intenzionale)
let notYet;                    // undefined (non assegnato)

console.log(typeof name);      // "string"
console.log(typeof version);   // "number"
console.log(typeof isActive);  // "boolean"
console.log(typeof nothing);   // "object"  (bug storico di JS!)
console.log(typeof notYet);    // "undefined"`,
      },
      {
        type: "warning",
        content:
          "`typeof null` restituisce `\"object\"`: è un bug storico di JavaScript mai corretto. Per controllare null usa `value === null`.",
      },
      {
        type: "heading",
        content: "Type coercion e confronti",
      },
      {
        type: "text",
        content:
          "JavaScript può convertire i tipi automaticamente (*coercion*). L'operatore `==` confronta *dopo* la coercion, mentre `===` confronta senza conversioni (strict equality). Usa sempre `===` per evitare sorprese.",
      },
      {
        type: "code",
        language: "javascript",
        title: "== vs === e coercion",
        code: `// Coercion implicita
console.log("5" == 5);    // true  (stringa convertita a numero)
console.log("5" === 5);   // false (tipi diversi)
console.log(0 == false);  // true
console.log(0 === false); // false
console.log(null == undefined);  // true
console.log(null === undefined); // false

// Attenzione a + con le stringhe
console.log("3" + 2);  // "32" (concatenazione!)
console.log("3" - 2);  // 1   (coercion a numero)`,
      },
      {
        type: "heading",
        content: "Operatori logici e ternario",
      },
      {
        type: "text",
        content:
          "Gli operatori logici `&&` (AND), `||` (OR) e `!` (NOT) non restituiscono solo `true`/`false`: restituiscono il primo valore che determina il risultato (*short-circuit evaluation*). L'operatore ternario `condizione ? valoreSeVero : valoreSeFalso` è una forma compatta di `if/else`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Operatori logici e ternario",
        code: `// Short-circuit: && restituisce il primo falsy, || il primo truthy
const user = null;
const displayName = user || "Ospite";   // "Ospite"
const isAdmin = user && user.role === "admin"; // null (short-circuit)

// Ternario
const range = "1y";
const label = range === "1y" ? "Ultimo anno" : "Intervallo personalizzato";
console.log(label); // "Ultimo anno"

// Valori "falsy": false, 0, "", null, undefined, NaN
console.log(!0);         // true
console.log(!!"hello");  // true  (doppio NOT per convertire a boolean)
console.log(!!0);        // false`,
      },
      {
        type: "info",
        content:
          "I valori *falsy* in JavaScript sono: `false`, `0`, `\"\"` (stringa vuota), `null`, `undefined` e `NaN`. Tutto il resto e *truthy*, inclusi `[]` e `{}`.",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "typeof e tipi",
        description: "Qual e il risultato di `typeof null`?",
        difficulty: "facile",
        options: [
          '"null"',
          '"object"',
          '"undefined"',
          "Lancia un errore",
        ],
        correct: 1,
        explanation:
          '`typeof null` restituisce `"object"`. E un bug storico di JavaScript presente fin dalla prima versione del linguaggio e mai corretto per motivi di compatibilita.',
      },
      {
        type: "code",
        title: "Strict equality",
        description:
          "Crea tre variabili: `a` con il numero 42, `b` con la stringa \"42\", e `isStrictEqual` che sia `true` se `a` e `b` sono strettamente uguali, `false` altrimenti. Usa `===`. Poi stampa `isStrictEqual` con `console.log`.",
        difficulty: "facile",
        starterCode: `// Dichiara le variabili qui sotto
`,
        solution: `const a = 42;
const b = "42";
const isStrictEqual = a === b;
console.log(isStrictEqual);`,
        testCode: "",
        validate: `
try {
  const logs = [];
  const _origLog = console.log;
  console.log = (...args) => logs.push(args.join(" "));
  // --- user code already executed above ---
  console.log = _origLog;
  return logs.includes("false");
} catch(e) { return false; }`,
      },
      {
        type: "code",
        title: "Ternario e logici",
        description:
          'Hai una variabile `score` (gia dichiarata). Crea una variabile `grade` usando l\'operatore ternario: se `score >= 60` assegna `"Promosso"`, altrimenti `"Bocciato"`. Poi crea `message` usando `||`: se `grade` e truthy usa `grade`, altrimenti `"Nessun risultato"`. Stampa `message`.',
        difficulty: "medio",
        starterCode: `const score = 75;
// Scrivi qui sotto
`,
        solution: `const score = 75;
const grade = score >= 60 ? "Promosso" : "Bocciato";
const message = grade || "Nessun risultato";
console.log(message);`,
        testCode: "",
        validate: `
try {
  const logs = [];
  const _origLog = console.log;
  console.log = (...args) => logs.push(args.join(" "));
  console.log = _origLog;
  return logs.includes("Promosso");
} catch(e) { return false; }`,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // FUNZIONI E ARROW FUNCTIONS
  // ---------------------------------------------------------------------------
  "functions": {
    sections: [
      {
        type: "text",
        content:
          "Le funzioni sono blocchi di codice riutilizzabili. In JavaScript ci sono diversi modi per definirle, ognuno con le proprie caratteristiche. Capire le differenze e essenziale per lavorare con React e con il codice moderno.",
      },
      {
        type: "heading",
        content: "Dichiarazioni vs espressioni",
      },
      {
        type: "text",
        content:
          'Una *function declaration* viene "sollevata" (hoisting): può essere chiamata anche prima della riga in cui è scritta. Una *function expression* assegnata a una variabile, invece, segue le regole di `const`/`let` e non è disponibile prima della sua definizione.',
      },
      {
        type: "code",
        language: "javascript",
        title: "Dichiarazione vs espressione",
        code: `// Function declaration (hoisted)
console.log(sum(2, 3)); // 5  - funziona!

function sum(a, b) {
  return a + b;
}

// Function expression (NON hoisted)
// console.log(multiply(2, 3)); // ReferenceError!

const multiply = function (a, b) {
  return a * b;
};
console.log(multiply(2, 3)); // 6`,
      },
      {
        type: "heading",
        content: "Arrow functions",
      },
      {
        type: "text",
        content:
          "Le arrow functions (`=>`) sono la forma più concisa e moderna. Se il corpo ha una sola espressione, il `return` e le graffe sono opzionali (*implicit return*). Sono la scelta predefinita nel codice React/Next.js.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Sintassi delle arrow functions",
        code: `// Forma completa
const add = (a, b) => {
  return a + b;
};

// Implicit return (una sola espressione)
const addShort = (a, b) => a + b;

// Un solo parametro: parentesi opzionali
const double = n => n * 2;

// Nessun parametro: parentesi obbligatorie
const greet = () => "Ciao!";

// Restituire un oggetto: servono le parentesi tonde
const makeUser = (name) => ({ name, role: "viewer" });`,
      },
      {
        type: "tip",
        content:
          "Nelle applicazioni React, le arrow functions sono usate ovunque: per callback, event handlers e anche per definire componenti. Esempio tipico: `const Filters = ({ analysisType, currentPage }) => { ... }`.",
      },
      {
        type: "heading",
        content: "Parametri e valori di default",
      },
      {
        type: "text",
        content:
          "Puoi assegnare valori di default ai parametri. Se il chiamante non li fornisce (o passa `undefined`), viene usato il default.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Parametri di default",
        code: `const buildKey = (analysisType, page = "overview") => {
  return analysisType + "/" + page;
};

console.log(buildKey("quality"));           // "quality/overview"
console.log(buildKey("quality", "details")); // "quality/details"

// Default con destructuring (pattern molto usato in React)
const Button = ({ label = "Click", disabled = false }) => {
  console.log(label, disabled);
};
Button({ label: "Salva" }); // "Salva" false`,
      },
      {
        type: "heading",
        content: "Callback: passare funzioni come argomenti",
      },
      {
        type: "text",
        content:
          "In JavaScript le funzioni sono valori: puoi passarle come argomenti ad altre funzioni. Questo pattern si chiama *callback* ed e alla base di `.map()`, `.filter()`, event handlers e molto altro.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Callback in azione",
        code: `const numbers = [1, 2, 3, 4, 5];

// La funzione passata a .filter() e un callback
const even = numbers.filter((n) => n % 2 === 0);
console.log(even); // [2, 4]

// Callback personalizzato
const applyToAll = (arr, callback) => arr.map(callback);

const doubled = applyToAll(numbers, (n) => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Event handler in React (concetto, non eseguibile qui)
// <Button onClick={() => dispatch(setFilterValue(payload))} />`,
      },
      {
        type: "heading",
        content: "IIFE (Immediately Invoked Function Expression)",
      },
      {
        type: "text",
        content:
          "Una IIFE e una funzione che viene definita e immediatamente eseguita. Si usa per isolare lo scope o per eseguire codice di inizializzazione senza inquinare il namespace globale.",
      },
      {
        type: "code",
        language: "javascript",
        title: "IIFE",
        code: `// IIFE classica
(function () {
  const secret = "invisibile fuori";
  console.log(secret); // "invisibile fuori"
})();
// console.log(secret); // ReferenceError

// IIFE con arrow function
const result = (() => {
  const base = 10;
  const multiplier = 3;
  return base * multiplier;
})();
console.log(result); // 30`,
      },
      {
        type: "info",
        content:
          "Le IIFE sono meno frequenti nel codice moderno grazie ai moduli ES, ma le trovi ancora per inizializzazione immediata o per creare scope isolati in contesti legacy.",
      },
      {
        type: "heading",
        content: "Riepilogo: quando usare cosa",
      },
      {
        type: "list",
        items: [
          "Arrow function: la scelta di default per callback, handler ed espressioni brevi",
          "Function declaration: utile quando serve l'hoisting o per funzioni helper esportate",
          "Function expression: rara, usata quando devi assegnare la funzione a una variabile ma preferisci la sintassi classica",
          "IIFE: per codice da eseguire immediatamente in uno scope isolato",
        ],
      },
    ],
    exercises: [
      {
        type: "code",
        title: "Prima arrow function",
        description:
          "Crea una arrow function `triple` che accetta un numero e restituisce il suo triplo usando l'implicit return. Poi stampa il risultato di `triple(7)`.",
        difficulty: "facile",
        starterCode: `// Scrivi la funzione triple qui
`,
        solution: `const triple = (n) => n * 3;
console.log(triple(7));`,
        testCode: "",
        validate: `
try {
  const logs = [];
  const _origLog = console.log;
  console.log = (...args) => logs.push(args.join(" "));
  console.log = _origLog;
  return logs.includes("21");
} catch(e) { return false; }`,
      },
      {
        type: "code",
        title: "Funzione con default e callback",
        description:
          "Crea una funzione `buildLabel` che accetta `name` (stringa) e `prefix` (stringa con default `\"Filtro\"`). Deve restituire `prefix + \": \" + name`. Poi crea un array `filters` con `[\"Sito\", \"Tipo\", \"Data\"]` e usa `.map()` con `buildLabel` per creare un nuovo array `labels`. Stampa `labels`.",
        difficulty: "medio",
        starterCode: `// Scrivi buildLabel, filters e labels qui
`,
        solution: `const buildLabel = (name, prefix = "Filtro") => prefix + ": " + name;
const filters = ["Sito", "Tipo", "Data"];
const labels = filters.map((f) => buildLabel(f));
console.log(labels);`,
        testCode: "",
        validate: `
try {
  const logs = [];
  const _origLog = console.log;
  console.log = (...args) => logs.push(args.join(" "));
  console.log = _origLog;
  const output = logs.join(" ");
  return output.includes("Filtro: Sito") && output.includes("Filtro: Tipo") && output.includes("Filtro: Data");
} catch(e) { return false; }`,
      },
      {
        type: "code",
        title: "Funzione di ordine superiore",
        description:
          "Crea una funzione `createMultiplier` che accetta un numero `factor` e restituisce una nuova arrow function che moltiplica il suo argomento per `factor`. Poi crea `double` usando `createMultiplier(2)` e `tenTimes` usando `createMultiplier(10)`. Stampa `double(5)` e `tenTimes(5)`.",
        difficulty: "difficile",
        starterCode: `// Scrivi createMultiplier, double e tenTimes qui
`,
        solution: `const createMultiplier = (factor) => (n) => n * factor;
const double = createMultiplier(2);
const tenTimes = createMultiplier(10);
console.log(double(5));
console.log(tenTimes(5));`,
        testCode: "",
        validate: `
try {
  const logs = [];
  const _origLog = console.log;
  console.log = (...args) => logs.push(args.join(" "));
  console.log = _origLog;
  return logs.includes("10") && logs.includes("50");
} catch(e) { return false; }`,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // ARRAY E METODI DEGLI ARRAY
  // ---------------------------------------------------------------------------
  "arrays": {
    sections: [
      {
        type: "text",
        content:
          "Gli array sono collezioni ordinate di valori. In un progetto React, sono il modo principale per gestire liste di dati: righe di tabelle, opzioni di filtri, serie di grafici. Imparare i metodi degli array e indispensabile.",
      },
      {
        type: "heading",
        content: "Creare e accedere agli array",
      },
      {
        type: "code",
        language: "javascript",
        title: "Basi degli array",
        code: `const sites = ["Milano", "Roma", "Napoli"];

console.log(sites[0]);      // "Milano" (primo elemento)
console.log(sites.length);  // 3
console.log(sites[sites.length - 1]); // "Napoli" (ultimo)

// Aggiungere e rimuovere
sites.push("Torino");  // aggiunge alla fine
sites.pop();            // rimuove dall'fine -> "Torino"
console.log(sites);     // ["Milano", "Roma", "Napoli"]`,
      },
      {
        type: "heading",
        content: ".map() - trasformare i dati",
      },
      {
        type: "text",
        content:
          "`.map()` crea un nuovo array trasformando ogni elemento. Non modifica l'array originale. In React, e il metodo più usato per trasformare dati in elementi JSX.",
      },
      {
        type: "code",
        language: "javascript",
        title: ".map() con esempi pratici",
        code: `const filters = ["site", "product", "date"];

// Trasformare ogni stringa in un oggetto
const filterObjects = filters.map((name) => ({
  id: name,
  label: name.toUpperCase(),
}));
console.log(filterObjects);
// [{ id: "site", label: "SITE" }, { id: "product", ... }, ...]

// map con indice (secondo parametro)
const numbered = filters.map((f, index) => index + ". " + f);
console.log(numbered); // ["0. site", "1. product", "2. date"]`,
      },
      {
        type: "heading",
        content: ".filter() - filtrare i dati",
      },
      {
        type: "text",
        content:
          "`.filter()` restituisce un nuovo array con solo gli elementi che soddisfano la condizione. Il callback deve restituire `true` o `false`.",
      },
      {
        type: "code",
        language: "javascript",
        title: ".filter() per filtrare dati",
        code: `const entries = [
  { site: "Milano", value: 95, date: "2024-01-15" },
  { site: "Roma", value: 42, date: "2024-02-20" },
  { site: "Milano", value: 88, date: "2024-03-10" },
  { site: "Napoli", value: 71, date: "2024-01-05" },
];

// Filtrare per sito
const milanoOnly = entries.filter((e) => e.site === "Milano");
console.log(milanoOnly.length); // 2

// Filtrare per date range (pattern comune)
const startDate = "2024-01-10";
const endDate = "2024-02-28";
const inRange = entries.filter(
  (e) => e.date >= startDate && e.date <= endDate
);
console.log(inRange.length); // 2

// Rimuovere valori undefined (pattern reale)
const values = [10, undefined, 30, undefined, 50];
const clean = values.filter((v) => v !== undefined);
console.log(clean); // [10, 30, 50]`,
      },
      {
        type: "tip",
        content:
          "Nelle applicazioni React, .map() e usato per rendering liste, .filter() per filtrare dati per date range, .reduce() per costruire oggetti di stili dinamici, .find() per localizzare configurazioni.",
      },
      {
        type: "heading",
        content: ".reduce() - accumulare valori",
      },
      {
        type: "text",
        content:
          "`.reduce()` attraversa l'array accumulando un risultato. Accetta un callback con `(accumulatore, elementoCorrente)` e un valore iniziale. E il metodo più versatile: puo fare tutto cio che fanno `.map()` e `.filter()`.",
      },
      {
        type: "code",
        language: "javascript",
        title: ".reduce() in pratica",
        code: `const numbers = [10, 20, 30, 40];

// Somma
const total = numbers.reduce((acc, n) => acc + n, 0);
console.log(total); // 100

// Costruire un oggetto (pattern comune per stili sx)
const styleEntries = [
  ["color", "red"],
  ["fontSize", "14px"],
  ["fontWeight", "bold"],
];
const styleObject = styleEntries.reduce((acc, [key, value]) => {
  acc[key] = value;
  return acc;
}, {});
console.log(styleObject);
// { color: "red", fontSize: "14px", fontWeight: "bold" }

// Contare il numero totale di lezioni per modulo
const modules = [
  { name: "CSS", lessons: 3 },
  { name: "JS", lessons: 5 },
  { name: "React", lessons: 4 },
];
const totalLessons = modules.reduce((sum, mod) => sum + mod.lessons, 0);
console.log(totalLessons); // 12`,
      },
      {
        type: "heading",
        content: ".find(), .findIndex(), .some(), .every()",
      },
      {
        type: "code",
        language: "javascript",
        title: "Ricerca e verifica",
        code: `const users = [
  { id: 1, name: "Alice", active: true },
  { id: 2, name: "Bob", active: false },
  { id: 3, name: "Clara", active: true },
];

// .find() restituisce il PRIMO elemento che soddisfa la condizione
const bob = users.find((u) => u.name === "Bob");
console.log(bob); // { id: 2, name: "Bob", active: false }

// .findIndex() restituisce l'INDICE
const bobIndex = users.findIndex((u) => u.name === "Bob");
console.log(bobIndex); // 1

// .some() -> almeno uno soddisfa la condizione?
const hasInactive = users.some((u) => !u.active);
console.log(hasInactive); // true

// .every() -> TUTTI soddisfano la condizione?
const allActive = users.every((u) => u.active);
console.log(allActive); // false`,
      },
      {
        type: "heading",
        content: ".sort(), .includes(), .slice() vs .splice()",
      },
      {
        type: "code",
        language: "javascript",
        title: "Ordinamento, ricerca e sotto-array",
        code: `// .sort() MODIFICA l'array originale!
const scores = [40, 10, 90, 25];
scores.sort((a, b) => a - b); // ordine crescente
console.log(scores); // [10, 25, 40, 90]
scores.sort((a, b) => b - a); // ordine decrescente
console.log(scores); // [90, 40, 25, 10]

// .includes() -> l'array contiene il valore?
const allowedSites = ["Milano", "Roma", "Napoli"];
console.log(allowedSites.includes("Roma"));    // true
console.log(allowedSites.includes("Torino"));  // false

// .slice() NON modifica l'originale (restituisce una copia parziale)
const first2 = allowedSites.slice(0, 2);
console.log(first2);        // ["Milano", "Roma"]
console.log(allowedSites);  // ["Milano", "Roma", "Napoli"] (invariato)

// .splice() MODIFICA l'originale (rimuove/inserisce)
const items = ["a", "b", "c", "d"];
items.splice(1, 2); // da indice 1, rimuovi 2 elementi
console.log(items); // ["a", "d"]`,
      },
      {
        type: "warning",
        content:
          "Attenzione: `.sort()` e `.splice()` modificano l'array originale (sono *mutating*). In React e Redux questo e un problema perche lo stato deve essere immutabile. Usa `.slice()` per copiare prima di ordinare: `[...arr].sort(...)` oppure `arr.slice().sort(...)`.",
      },
      {
        type: "heading",
        content: ".forEach() e concatenamento",
      },
      {
        type: "text",
        content:
          "`.forEach()` esegue una funzione per ogni elemento ma non restituisce nulla (a differenza di `.map()`). I metodi degli array si possono concatenare (*chaining*) per pipeline di trasformazione.",
      },
      {
        type: "code",
        language: "javascript",
        title: "forEach e chaining",
        code: `// forEach non restituisce un nuovo array
const names = ["Alice", "Bob"];
names.forEach((name) => console.log("Ciao, " + name));
// Ciao, Alice
// Ciao, Bob

// Chaining: filtrare, trasformare e ordinare in una pipeline
const data = [
  { name: "Sito A", score: 45 },
  { name: "Sito B", score: 92 },
  { name: "Sito C", score: 78 },
  { name: "Sito D", score: 33 },
];

const topSites = data
  .filter((d) => d.score >= 50)         // solo score >= 50
  .map((d) => d.name)                    // estrai solo il nome
  .sort();                               // ordine alfabetico
console.log(topSites); // ["Sito B", "Sito C"]`,
      },
      {
        type: "info",
        content:
          'Ricorda: `.map()` restituisce un nuovo array, `.forEach()` restituisce `undefined`. Se devi trasformare i dati, usa `.map()`. Se devi solo "fare qualcosa" per ogni elemento (es. logging), usa `.forEach()`.',
      },
    ],
    exercises: [
      {
        type: "code",
        title: "map e filter",
        description:
          'Hai un array `products`. Usa `.filter()` per tenere solo i prodotti con `price > 20`, poi `.map()` per estrarre solo il campo `name`. Salva il risultato in `expensiveNames` e stampalo.',
        difficulty: "facile",
        starterCode: `const products = [
  { name: "Penna", price: 2 },
  { name: "Zaino", price: 45 },
  { name: "Quaderno", price: 5 },
  { name: "Tablet", price: 350 },
  { name: "Matita", price: 1 },
];

// Scrivi qui
`,
        solution: `const products = [
  { name: "Penna", price: 2 },
  { name: "Zaino", price: 45 },
  { name: "Quaderno", price: 5 },
  { name: "Tablet", price: 350 },
  { name: "Matita", price: 1 },
];

const expensiveNames = products
  .filter((p) => p.price > 20)
  .map((p) => p.name);
console.log(expensiveNames);`,
        testCode: "",
        validate: `
try {
  const logs = [];
  const _origLog = console.log;
  console.log = (...args) => logs.push(JSON.stringify(args));
  console.log = _origLog;
  const output = logs.join(" ");
  return output.includes("Zaino") && output.includes("Tablet") && !output.includes("Penna");
} catch(e) { return false; }`,
      },
      {
        type: "code",
        title: "reduce per somma",
        description:
          "Usa `.reduce()` sull'array `orders` per calcolare il totale di tutti i campi `amount`. Salva il risultato in `totalAmount` e stampalo.",
        difficulty: "medio",
        starterCode: `const orders = [
  { id: 1, amount: 120 },
  { id: 2, amount: 85 },
  { id: 3, amount: 200 },
  { id: 4, amount: 55 },
];

// Scrivi qui
`,
        solution: `const orders = [
  { id: 1, amount: 120 },
  { id: 2, amount: 85 },
  { id: 3, amount: 200 },
  { id: 4, amount: 55 },
];

const totalAmount = orders.reduce((acc, order) => acc + order.amount, 0);
console.log(totalAmount);`,
        testCode: "",
        validate: `
try {
  const logs = [];
  const _origLog = console.log;
  console.log = (...args) => logs.push(args.join(" "));
  console.log = _origLog;
  return logs.includes("460");
} catch(e) { return false; }`,
      },
      {
        type: "code",
        title: "Pipeline completa: filter, map, sort",
        description:
          'Hai un array `students`. Filtra quelli con `grade >= 6`, trasformali in stringhe del tipo `"Nome: voto"` (es. `"Alice: 8"`), ordinale alfabeticamente e salva il risultato in `passing`. Stampa `passing`.',
        difficulty: "difficile",
        starterCode: `const students = [
  { name: "Davide", grade: 5 },
  { name: "Alice", grade: 8 },
  { name: "Carlo", grade: 6 },
  { name: "Beatrice", grade: 9 },
  { name: "Elena", grade: 4 },
];

// Scrivi qui
`,
        solution: `const students = [
  { name: "Davide", grade: 5 },
  { name: "Alice", grade: 8 },
  { name: "Carlo", grade: 6 },
  { name: "Beatrice", grade: 9 },
  { name: "Elena", grade: 4 },
];

const passing = students
  .filter((s) => s.grade >= 6)
  .map((s) => s.name + ": " + s.grade)
  .sort();
console.log(passing);`,
        testCode: "",
        validate: `
try {
  const logs = [];
  const _origLog = console.log;
  console.log = (...args) => logs.push(JSON.stringify(args));
  console.log = _origLog;
  const output = logs.join(" ");
  return output.includes("Alice: 8") && output.includes("Beatrice: 9") && output.includes("Carlo: 6") && !output.includes("Davide") && !output.includes("Elena");
} catch(e) { return false; }`,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // OGGETTI, DESTRUCTURING E SPREAD
  // ---------------------------------------------------------------------------
  "objects": {
    sections: [
      {
        type: "text",
        content:
          "Gli oggetti sono il modo fondamentale di rappresentare dati strutturati in JavaScript. In un progetto React/Redux, tutto e un oggetto: le props dei componenti, lo stato Redux, le configurazioni dei grafici, le risposte API.",
      },
      {
        type: "heading",
        content: "Object literals e accesso alle proprieta",
      },
      {
        type: "code",
        language: "javascript",
        title: "Creare e accedere agli oggetti",
        code: `// Object literal
const site = {
  name: "Milano",
  region: "Lombardia",
  active: true,
  score: 95,
};

// Dot notation
console.log(site.name);    // "Milano"

// Bracket notation (utile con chiavi dinamiche)
const key = "region";
console.log(site[key]);    // "Lombardia"

// Proprieta annidate
const config = {
  chart: {
    title: "Trend",
    styles: {
      color: "#1976d2",
      fontSize: "14px",
    },
  },
};
console.log(config.chart.styles.color); // "#1976d2"`,
      },
      {
        type: "heading",
        content: "Object.keys(), Object.values(), Object.entries()",
      },
      {
        type: "text",
        content:
          "Questi metodi statici di `Object` permettono di iterare sulle proprieta di un oggetto, trasformandole in array.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Iterare sugli oggetti",
        code: `const filterValues = {
  site: "Milano",
  product: "Farmaco A",
  status: "active",
};

// Chiavi
console.log(Object.keys(filterValues));
// ["site", "product", "status"]

// Valori
console.log(Object.values(filterValues));
// ["Milano", "Farmaco A", "active"]

// Coppie chiave-valore (array di array)
console.log(Object.entries(filterValues));
// [["site", "Milano"], ["product", "Farmaco A"], ["status", "active"]]

// Utile per iterare
Object.entries(filterValues).forEach(([key, value]) => {
  console.log(key + " = " + value);
});`,
      },
      {
        type: "heading",
        content: "Destructuring",
      },
      {
        type: "text",
        content:
          "Il destructuring permette di estrarre valori da oggetti (e array) in modo conciso. E uno dei pattern più usati nel JavaScript moderno e in React.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Destructuring semplice e annidato",
        code: `// Destructuring base
const action = { type: "SET_FILTER", payload: { key: "site", value: "Roma" } };
const { type, payload } = action;
console.log(type);    // "SET_FILTER"
console.log(payload); // { key: "site", value: "Roma" }

// Destructuring annidato
const { payload: { key, value } } = action;
console.log(key);   // "site"
console.log(value); // "Roma"

// Con valori di default
const { priority = "normal", payload: p } = action;
console.log(priority); // "normal" (non esiste, usa il default)

// Rinominare durante il destructuring
const { type: actionType } = action;
console.log(actionType); // "SET_FILTER"`,
      },
      {
        type: "tip",
        content:
          'Nelle applicazioni React, il destructuring e usato in ogni componente per estrarre props: ({ label, options, value, onChange }). Lo spread operator e usato per merge di configurazioni: { ...defaultStyles, ...custom }.',
      },
      {
        type: "heading",
        content: "Destructuring nei parametri di funzione",
      },
      {
        type: "text",
        content:
          "In React, i componenti ricevono un oggetto `props`. Invece di scrivere `props.label`, `props.value` ecc., si usa il destructuring direttamente nella firma della funzione.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Destructuring nei parametri (pattern React)",
        code: `// Senza destructuring
const FilterBadge = (props) => {
  console.log(props.label + ": " + props.value);
};

// Con destructuring (molto più leggibile)
const FilterBadgeV2 = ({ label, value, onRemove }) => {
  console.log(label + ": " + value);
};

// Pattern comune nelle applicazioni React
// const Filters = ({ analysisType, currentPage }) => { ... }

// Con default nei parametri
const Chip = ({ label = "N/A", color = "default" }) => {
  console.log(label, color);
};
Chip({ label: "Attivo" }); // "Attivo" "default"`,
      },
      {
        type: "heading",
        content: "Spread operator ({...obj})",
      },
      {
        type: "text",
        content:
          'Lo spread operator `...` "espande" le proprieta di un oggetto dentro un altro. E fondamentale in React/Redux per aggiornare lo stato in modo immutabile.',
      },
      {
        type: "code",
        language: "javascript",
        title: "Spread operator sugli oggetti",
        code: `const defaultStyles = {
  color: "black",
  fontSize: "12px",
  fontWeight: "normal",
};

const customStyles = {
  color: "blue",
  fontWeight: "bold",
};

// Merge: le proprieta di customStyles sovrascrivono quelle di defaultStyles
const finalStyles = { ...defaultStyles, ...customStyles };
console.log(finalStyles);
// { color: "blue", fontSize: "12px", fontWeight: "bold" }

// Copiare un oggetto (copia superficiale)
const copy = { ...defaultStyles };
copy.color = "red";
console.log(defaultStyles.color); // "black" (originale invariato)

// Aggiungere una proprieta (pattern Redux)
const state = { site: "Milano", page: "overview" };
const newState = { ...state, page: "details" };
console.log(newState); // { site: "Milano", page: "details" }`,
      },
      {
        type: "heading",
        content: "Computed property names",
      },
      {
        type: "text",
        content:
          "Le *computed property names* permettono di usare il valore di una variabile come chiave di un oggetto. Si usano le parentesi quadre `[]` nella definizione dell'oggetto.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Chiavi dinamiche",
        code: `const field = "site";
const val = "Milano";

// Chiave calcolata
const filter = { [field]: val };
console.log(filter); // { site: "Milano" }

// Pattern utile: costruire un oggetto da un form
const buildPayload = (key, value) => ({ [key]: value });
console.log(buildPayload("status", "active"));
// { status: "active" }

// Combinato con spread (pattern usato in reducer Redux)
const prevState = { site: "Milano", product: "Farmaco A" };
const updateField = "product";
const updateValue = "Farmaco B";
const nextState = { ...prevState, [updateField]: updateValue };
console.log(nextState);
// { site: "Milano", product: "Farmaco B" }`,
      },
      {
        type: "info",
        content:
          "Shorthand property: se la variabile ha lo stesso nome della chiave, puoi abbreviare. `{ name: name, age: age }` diventa `{ name, age }`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Shorthand properties",
        code: `const name = "MyApp";
const version = 3;
const active = true;

// Invece di { name: name, version: version, active: active }
const project = { name, version, active };
console.log(project); // { name: "MyApp", version: 3, active: true }`,
      },
    ],
    exercises: [
      {
        type: "code",
        title: "Destructuring base",
        description:
          'Hai un oggetto `user`. Usa il destructuring per estrarre `name` e `role` in variabili separate. Se `role` non esiste, usa il default `"viewer"`. Stampa entrambe.',
        difficulty: "facile",
        starterCode: `const user = {
  name: "Marco",
  email: "marco@example.com",
};

// Scrivi il destructuring qui
`,
        solution: `const user = {
  name: "Marco",
  email: "marco@example.com",
};

const { name, role = "viewer" } = user;
console.log(name);
console.log(role);`,
        testCode: "",
        validate: `
try {
  const logs = [];
  const _origLog = console.log;
  console.log = (...args) => logs.push(args.join(" "));
  console.log = _origLog;
  return logs.includes("Marco") && logs.includes("viewer");
} catch(e) { return false; }`,
      },
      {
        type: "code",
        title: "Spread e merge",
        description:
          'Hai `baseConfig` e `userConfig`. Crea `finalConfig` unendoli con lo spread operator (le proprieta di `userConfig` devono sovrascrivere quelle di `baseConfig`). Poi aggiungi la proprieta `timestamp` con valore `"2024-01-01"` nello stesso spread. Stampa `finalConfig`.',
        difficulty: "medio",
        starterCode: `const baseConfig = {
  theme: "light",
  language: "it",
  showHeader: true,
};

const userConfig = {
  theme: "dark",
  fontSize: 16,
};

// Scrivi qui
`,
        solution: `const baseConfig = {
  theme: "light",
  language: "it",
  showHeader: true,
};

const userConfig = {
  theme: "dark",
  fontSize: 16,
};

const finalConfig = { ...baseConfig, ...userConfig, timestamp: "2024-01-01" };
console.log(finalConfig);`,
        testCode: "",
        validate: `
try {
  const logs = [];
  const _origLog = console.log;
  console.log = (...args) => logs.push(JSON.stringify(args));
  console.log = _origLog;
  const output = logs.join(" ");
  return output.includes('"theme":"dark"') && output.includes('"language":"it"') && output.includes('"fontSize":16') && output.includes('"timestamp":"2024-01-01"');
} catch(e) { return false; }`,
      },
      {
        type: "code",
        title: "Object.entries + reduce",
        description:
          "Hai un oggetto `scores` con nomi come chiavi e punteggi come valori. Usa `Object.entries()` e `.reduce()` per calcolare la media dei punteggi. Salva il risultato in `average` e stampalo.",
        difficulty: "difficile",
        starterCode: `const scores = {
  Alice: 90,
  Bob: 75,
  Clara: 88,
  Davide: 67,
};

// Scrivi qui
`,
        solution: `const scores = {
  Alice: 90,
  Bob: 75,
  Clara: 88,
  Davide: 67,
};

const entries = Object.entries(scores);
const sum = entries.reduce((acc, [, score]) => acc + score, 0);
const average = sum / entries.length;
console.log(average);`,
        testCode: "",
        validate: `
try {
  const logs = [];
  const _origLog = console.log;
  console.log = (...args) => logs.push(args.join(" "));
  console.log = _origLog;
  return logs.includes("80");
} catch(e) { return false; }`,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // TEMPLATE LITERALS E STRINGHE
  // ---------------------------------------------------------------------------
  "strings": {
    sections: [
      {
        type: "text",
        content:
          "Le stringhe in JavaScript hanno molti metodi utili per manipolare testo. Con ES6 sono arrivati i *template literals* (backtick strings), che rendono l'interpolazione e le stringhe multilinea molto più semplici.",
      },
      {
        type: "heading",
        content: "Template literals e interpolazione",
      },
      {
        type: "text",
        content:
          "I template literals usano i backtick (`` ` ``) invece delle virgolette. All'interno, `${espressione}` inserisce il valore di qualsiasi espressione JavaScript.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Template literals",
        code: `const site = "Milano";
const page = "overview";

// Concatenazione classica (scomoda)
const urlOld = "/" + site + "/" + page;

// Template literal (molto meglio!)
const url = \`/\${site}/\${page}\`;
console.log(url); // "/Milano/overview"

// Qualsiasi espressione dentro \${}
const price = 19.99;
console.log(\`Prezzo: \${price.toFixed(0)} EUR\`); // "Prezzo: 20 EUR"
console.log(\`Doppio: \${price * 2} EUR\`);         // "Doppio: 39.98 EUR"

// Stringhe multilinea
const message = \`
  Benvenuto nell'applicazione.
  Sito selezionato: \${site}.
  Pagina corrente: \${page}.
\`;
console.log(message);`,
      },
      {
        type: "tip",
        content:
          "Nelle applicazioni React, i template literals sono usati per costruire URL: `/${site}/${analysisType}/${page}` e per valori CSS dinamici: `${value}rem`.",
      },
      {
        type: "heading",
        content: "Metodi di ricerca: .includes(), .startsWith(), .endsWith()",
      },
      {
        type: "code",
        language: "javascript",
        title: "Cercare nelle stringhe",
        code: `const filename = "report_2024_Q1.csv";

console.log(filename.includes("2024"));      // true
console.log(filename.includes("2025"));      // false

console.log(filename.startsWith("report"));  // true
console.log(filename.startsWith("data"));    // false

console.log(filename.endsWith(".csv"));      // true
console.log(filename.endsWith(".xlsx"));     // false

// Utile per filtrare array di stringhe
const files = ["data.csv", "report.csv", "image.png", "notes.txt"];
const csvFiles = files.filter((f) => f.endsWith(".csv"));
console.log(csvFiles); // ["data.csv", "report.csv"]`,
      },
      {
        type: "heading",
        content: ".split() e .join()",
      },
      {
        type: "text",
        content:
          "`.split()` divide una stringa in un array usando un separatore. `.join()` fa l'opposto: unisce un array in una stringa. Sono spesso usati insieme.",
      },
      {
        type: "code",
        language: "javascript",
        title: "split e join",
        code: `// split: stringa -> array
const path = "quality/details/overview";
const parts = path.split("/");
console.log(parts); // ["quality", "details", "overview"]

// join: array -> stringa
const tags = ["urgente", "bug", "frontend"];
const tagString = tags.join(", ");
console.log(tagString); // "urgente, bug, frontend"

// Pattern: trasformare un percorso
const key = "analysisType/page";
const [analysisType, page] = key.split("/");
console.log(analysisType); // "analysisType"
console.log(page);         // "page"

// Rimuovere spazi extra
const messy = "  ciao   mondo  ";
const clean = messy.split(/\\s+/).filter(Boolean).join(" ");
console.log(clean); // "ciao mondo"`,
      },
      {
        type: "heading",
        content: ".replace() e .substring() / .slice()",
      },
      {
        type: "code",
        language: "javascript",
        title: "Sostituzione e sotto-stringhe",
        code: `// .replace() sostituisce solo la PRIMA occorrenza
const text = "il gatto e sul tetto, il gatto dorme";
console.log(text.replace("gatto", "cane"));
// "il cane e sul tetto, il gatto dorme"

// .replaceAll() sostituisce TUTTE le occorrenze
console.log(text.replaceAll("gatto", "cane"));
// "il cane e sul tetto, il cane dorme"

// .substring(start, end) - estrae una porzione
const code = "ERR-404-NOT_FOUND";
console.log(code.substring(0, 3));  // "ERR"
console.log(code.substring(4, 7)); // "404"

// .slice() funziona come substring ma accetta indici negativi
const name = "Alessandro";
console.log(name.slice(0, 4));  // "Ales"
console.log(name.slice(-3));    // "dro" (ultimi 3 caratteri)

// Pattern comune: troncare nomi lunghi
const longName = "Alessandro Terranova";
const display = longName.length > 15
  ? longName.slice(0, 13) + "..."
  : longName;
console.log(display); // "Alessandro Te..."`,
      },
      {
        type: "heading",
        content: ".toLowerCase(), .toUpperCase(), .trim()",
      },
      {
        type: "code",
        language: "javascript",
        title: "Trasformazioni comuni",
        code: `const input = "  Ciao Mondo  ";

console.log(input.trim());          // "Ciao Mondo" (rimuove spazi)
console.log(input.toLowerCase());   // "  ciao mondo  "
console.log(input.toUpperCase());   // "  CIAO MONDO  "

// Confronto case-insensitive
const userInput = "Milano";
const expected = "milano";
console.log(userInput.toLowerCase() === expected); // true

// .trimStart() e .trimEnd() per un lato solo
const padded = "   test   ";
console.log(padded.trimStart()); // "test   "
console.log(padded.trimEnd());   // "   test"`,
      },
      {
        type: "heading",
        content: ".padStart() e .padEnd()",
      },
      {
        type: "text",
        content:
          "`.padStart()` e `.padEnd()` aggiungono caratteri di riempimento fino a raggiungere la lunghezza desiderata. Utili per formattare numeri e codici.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Padding delle stringhe",
        code: `// Formattare numeri con zeri iniziali
const month = 3;
const day = 7;
const dateStr = \`2024-\${String(month).padStart(2, "0")}-\${String(day).padStart(2, "0")}\`;
console.log(dateStr); // "2024-03-07"

// Allineare testo a destra
const items = [
  { name: "Mele", qty: 5 },
  { name: "Banane", qty: 12 },
  { name: "Arance", qty: 130 },
];
items.forEach((item) => {
  const qtyStr = String(item.qty).padStart(4, " ");
  console.log(item.name.padEnd(10, ".") + qtyStr);
});
// Mele......   5
// Banane....  12
// Arance.... 130`,
      },
      {
        type: "heading",
        content: "Conversione stringa-numero",
      },
      {
        type: "text",
        content:
          "Spesso i dati arrivano come stringhe (da input utente, URL, API) e devono essere convertiti in numeri. JavaScript offre diversi modi per farlo.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Da stringa a numero",
        code: `// parseInt: converte in intero (ignora la parte decimale)
console.log(parseInt("42"));      // 42
console.log(parseInt("42.7"));    // 42
console.log(parseInt("10px"));    // 10 (si ferma al primo non-numero)
console.log(parseInt("abc"));     // NaN

// parseFloat: mantiene i decimali
console.log(parseFloat("42.7"));  // 42.7
console.log(parseFloat("3.14"));  // 3.14

// Number(): conversione stretta (fallisce con caratteri extra)
console.log(Number("42"));     // 42
console.log(Number("42.7"));   // 42.7
console.log(Number("10px"));   // NaN (non tollera "px"!)
console.log(Number(""));       // 0

// Verifica se e un numero valido
console.log(isNaN(Number("abc")));  // true
console.log(isNaN(Number("42")));   // false

// Pattern comune: convertire il valore di un input
const inputValue = "14";
const fontSize = \`\${Number(inputValue)}rem\`; // "14rem"
console.log(fontSize);`,
      },
      {
        type: "info",
        content:
          'Usa `Number()` quando vuoi una conversione stretta. Usa `parseInt()`/`parseFloat()` quando la stringa potrebbe contenere unita (es. "14px"). Controlla sempre con `isNaN()` se il risultato e valido.',
      },
    ],
    exercises: [
      {
        type: "code",
        title: "Template literal e interpolazione",
        description:
          'Hai le variabili `site`, `analysisType` e `page`. Usa un template literal per creare la stringa `url` nel formato `"/{site}/{analysisType}/{page}"` (es. `"/Milano/quality/overview"`). Stampala.',
        difficulty: "facile",
        starterCode: `const site = "Milano";
const analysisType = "quality";
const page = "overview";

// Scrivi qui
`,
        solution: `const site = "Milano";
const analysisType = "quality";
const page = "overview";

const url = \`/\${site}/\${analysisType}/\${page}\`;
console.log(url);`,
        testCode: "",
        validate: `
try {
  const logs = [];
  const _origLog = console.log;
  console.log = (...args) => logs.push(args.join(" "));
  console.log = _origLog;
  return logs.includes("/Milano/quality/overview");
} catch(e) { return false; }`,
      },
      {
        type: "code",
        title: "split, map e join",
        description:
          'Hai una stringa `csvLine` con valori separati da virgola. Usa `.split(",")` per ottenere un array, `.map()` per applicare `.trim()` a ogni elemento e `.toUpperCase()`, poi `.join(" | ")` per riunirli. Salva il risultato in `formatted` e stampalo.',
        difficulty: "medio",
        starterCode: `const csvLine = " milano , roma , napoli , torino ";

// Scrivi qui
`,
        solution: `const csvLine = " milano , roma , napoli , torino ";

const formatted = csvLine
  .split(",")
  .map((city) => city.trim().toUpperCase())
  .join(" | ");
console.log(formatted);`,
        testCode: "",
        validate: `
try {
  const logs = [];
  const _origLog = console.log;
  console.log = (...args) => logs.push(args.join(" "));
  console.log = _origLog;
  return logs.includes("MILANO | ROMA | NAPOLI | TORINO");
} catch(e) { return false; }`,
      },
      {
        type: "code",
        title: "Formattazione data con padStart",
        description:
          'Hai le variabili `year`, `month` e `day` (numeri). Crea una stringa `dateFormatted` nel formato `"YYYY-MM-DD"` usando template literals e `.padStart(2, "0")` per mese e giorno. Stampa il risultato.',
        difficulty: "difficile",
        starterCode: `const year = 2024;
const month = 3;
const day = 7;

// Scrivi qui
`,
        solution: `const year = 2024;
const month = 3;
const day = 7;

const dateFormatted = \`\${year}-\${String(month).padStart(2, "0")}-\${String(day).padStart(2, "0")}\`;
console.log(dateFormatted);`,
        testCode: "",
        validate: `
try {
  const logs = [];
  const _origLog = console.log;
  console.log = (...args) => logs.push(args.join(" "));
  console.log = _origLog;
  return logs.includes("2024-03-07");
} catch(e) { return false; }`,
      },
    ],
  },
};
