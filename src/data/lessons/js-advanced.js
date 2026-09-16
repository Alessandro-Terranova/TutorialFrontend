export const lessons = {
  async: {
    sections: [
      {
        type: "text",
        content:
          "JavaScript è un linguaggio single-threaded, ma deve gestire operazioni che richiedono tempo: chiamate API, lettura di file, timer. Per questo esistono i meccanismi asincroni: callback, Promise e async/await.",
      },
      {
        type: "heading",
        content: "Callback e Callback Hell",
      },
      {
        type: "text",
        content:
          "Una callback è una funzione passata come argomento a un'altra funzione, che verrà invocata quando l'operazione asincrona è completata. È il meccanismo più antico, ma porta rapidamente al cosiddetto \"callback hell\" quando le operazioni dipendono l'una dall'altra.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Callback hell: operazioni annidate",
        code: `// Simulazione di chiamate asincrone con callback
function getUser(id, callback) {
  setTimeout(() => callback({ id, name: "Mario" }), 500);
}

function getOrders(userId, callback) {
  setTimeout(() => callback([{ id: 1, total: 49.99 }]), 500);
}

function getDetails(orderId, callback) {
  setTimeout(() => callback({ shipped: true }), 500);
}

// Callback hell: ogni operazione dipende dalla precedente
getUser(1, (user) => {
  getOrders(user.id, (orders) => {
    getDetails(orders[0].id, (details) => {
      console.log(details); // { shipped: true }
      // ...e se servisse un altro livello?
    });
  });
});`,
      },
      {
        type: "heading",
        content: "Promise: un approccio migliore",
      },
      {
        type: "text",
        content:
          "Una Promise rappresenta un valore che potrebbe non essere ancora disponibile. Ha tre stati: pending (in attesa), fulfilled (risolta con successo) e rejected (rifiutata con errore). Si crea con new Promise e si consuma con .then() e .catch().",
      },
      {
        type: "code",
        language: "javascript",
        title: "Creare e usare una Promise",
        code: `// Creare una Promise
function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: "Mario" });
      } else {
        reject(new Error("ID non valido"));
      }
    }, 500);
  });
}

// Consumare con .then e .catch
getUser(1)
  .then((user) => {
    console.log(user.name); // "Mario"
    return getOrders(user.id); // restituisce un'altra Promise
  })
  .then((orders) => {
    console.log(orders); // catena piatta, niente nesting!
  })
  .catch((error) => {
    console.error("Errore:", error.message);
  });`,
      },
      {
        type: "heading",
        content: "async/await: codice asincrono che sembra sincrono",
      },
      {
        type: "text",
        content:
          "async/await è zucchero sintattico sopra le Promise. Una funzione async restituisce sempre una Promise. All'interno, await mette in pausa l'esecuzione finché la Promise non si risolve, rendendo il codice lineare e leggibile.",
      },
      {
        type: "code",
        language: "javascript",
        title: "async/await in azione",
        code: `// Dichiarare una funzione async
async function loadUserData(id) {
  const user = await getUser(id);
  const orders = await getOrders(user.id);
  const details = await getDetails(orders[0].id);
  return details;
}

// Chiamare la funzione (restituisce una Promise)
loadUserData(1).then((details) => {
  console.log(details); // { shipped: true }
});`,
      },
      {
        type: "heading",
        content: "Gestione degli errori: try/catch/finally",
      },
      {
        type: "text",
        content:
          "Con async/await, gli errori si gestiscono con try/catch, esattamente come nel codice sincrono. Il blocco finally si esegue sempre, utile per nascondere spinner o resettare lo stato di caricamento.",
      },
      {
        type: "code",
        language: "javascript",
        title: "try/catch/finally con async",
        code: `async function fetchData(url) {
  let loading = true;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}\`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch fallita:", error.message);
    return null;
  } finally {
    loading = false;  // si esegue SEMPRE
    console.log("Caricamento completato");
  }
}`,
      },
      {
        type: "heading",
        content: "Promise.all: operazioni parallele",
      },
      {
        type: "text",
        content:
          "Quando hai operazioni indipendenti, non serve aspettarle una per volta. Promise.all esegue più Promise in parallelo e restituisce un array di risultati. Se anche una sola fallisce, tutto il blocco fallisce.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Promise.all per chiamate parallele",
        code: `// Sequenziale: ~3 secondi (1+1+1)
const users = await getUsers();
const products = await getProducts();
const config = await getConfig();

// Parallelo con Promise.all: ~1 secondo (il max dei tre)
const [users, products, config] = await Promise.all([
  getUsers(),
  getProducts(),
  getConfig(),
]);

// Se una fallisce, catch intercetta l'errore
try {
  const results = await Promise.all([fetchA(), fetchB()]);
} catch (err) {
  console.error("Almeno una richiesta è fallita:", err);
}`,
      },
      {
        type: "heading",
        content: "fetch API: chiamate HTTP",
      },
      {
        type: "text",
        content:
          "fetch è l'API nativa del browser per fare richieste HTTP. Restituisce una Promise che si risolve in un oggetto Response. Attenzione: fetch non lancia errore per status 404 o 500, bisogna controllare response.ok.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Esempio reale con fetch",
        code: `// GET con fetch
async function getApiData() {
  const response = await fetch("https://api.example.com/data");
  if (!response.ok) throw new Error("Errore nella richiesta");
  return response.json(); // .json() è anch'esso async
}

// POST con fetch
async function createItem(item) {
  const response = await fetch("https://api.example.com/items", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  return response.json();
}`,
      },
      {
        type: "tip",
        content:
          "In un progetto React reale, async/await è usato per l'autenticazione MSAL: `await instance.acquireTokenSilent(...)` e per chiamate fetch al Graph API di Microsoft.",
      },
      {
        type: "warning",
        content:
          "fetch non lancia errore automaticamente per status HTTP 4xx o 5xx. Controlla sempre response.ok o response.status prima di usare i dati.",
      },
    ],
    exercises: [
      {
        type: "code",
        title: "Catena di Promise con async/await",
        description:
          "Scrivi una funzione async chiamata 'elabora' che:\n1. Chiama getValore() (già definita, restituisce una Promise con il numero 10)\n2. Moltiplica il risultato per 3\n3. Restituisce il risultato finale (30)\n\nUsa async/await, non .then().",
        difficulty: "facile",
        starterCode: `// getValore è già definita:
// function getValore() { return Promise.resolve(10); }

async function elabora() {
  // scrivi qui
}`,
        solution: `async function elabora() {
  const valore = await getValore();
  return valore * 3;
}`,
        validate: `
function getValore() { return Promise.resolve(10); }
async function elabora() {
  ${"{"}
    // re-parse from user code
  ${"}"}
}
try {
  const fn = new Function("getValore", userCode + "\\nreturn elabora();");
  const p = fn(function() { return Promise.resolve(10); });
  return p instanceof Promise;
} catch(e) { return false; }`,
        testCode: "",
      },
      {
        type: "multiple-choice",
        title: "Comportamento di Promise.all",
        description:
          "Se passi 3 Promise a Promise.all e la seconda viene rifiutata (rejected), cosa succede?",
        difficulty: "medio",
        options: [
          "Restituisce i risultati delle Promise risolte e ignora quella rifiutata",
          "Aspetta che tutte finiscano e poi lancia l'errore",
          "Si rifiuta immediatamente con l'errore della Promise fallita",
          "Restituisce un array con undefined al posto della Promise rifiutata",
        ],
        correct: 2,
        explanation:
          "Promise.all ha un comportamento \"fail-fast\": appena una Promise viene rifiutata, l'intera Promise.all viene rifiutata con quell'errore, senza aspettare le altre.",
      },
      {
        type: "multiple-choice",
        title: "async e valore di ritorno",
        description: "Cosa restituisce una funzione dichiarata con async?",
        difficulty: "facile",
        options: [
          "Il valore restituito da return, come una funzione normale",
          "Sempre undefined",
          "Sempre una Promise, anche se si usa return con un valore semplice",
          "Un oggetto con proprietà value e done",
        ],
        correct: 2,
        explanation:
          "Una funzione async restituisce SEMPRE una Promise. Se fai `return 42`, il chiamante riceve `Promise.resolve(42)`. Per ottenere il valore, serve await o .then().",
      },
    ],
  },

  "data-structures": {
    sections: [
      {
        type: "text",
        content:
          "JavaScript moderno offre strutture dati oltre ad Array e Object. Set e Map risolvono problemi comuni in modo elegante: deduplicazione, lookup veloci per chiave, e iterazione ordinata.",
      },
      {
        type: "heading",
        content: "Set: collezione di valori unici",
      },
      {
        type: "text",
        content:
          "Un Set è una collezione che non ammette duplicati. Ogni valore può comparire al massimo una volta. È perfetto per deduplicare dati, verificare appartenenza, e gestire selezioni uniche.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Creare e usare un Set",
        code: `// Creare un Set
const colori = new Set();
colori.add("rosso");
colori.add("blu");
colori.add("rosso"); // ignorato, già presente!
console.log(colori.size); // 2

// Creare da un array
const numeri = new Set([1, 2, 3, 2, 1]);
console.log(numeri.size); // 3

// Metodi principali
colori.has("blu");    // true  - controllo veloce
colori.has("verde");  // false
colori.delete("blu"); // rimuove "blu"
colori.clear();       // svuota tutto`,
      },
      {
        type: "heading",
        content: "Deduplicare un array con Set",
      },
      {
        type: "text",
        content:
          "Il pattern più comune con Set è la deduplicazione di array. Si crea un Set dall'array (che rimuove i duplicati automaticamente) e poi si riconverte in array con lo spread operator o Array.from.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Pattern di deduplicazione",
        code: `const valori = ["sito_A", "sito_B", "sito_A", "sito_C", "sito_B"];

// Metodo 1: spread operator
const unici = [...new Set(valori)];
// ["sito_A", "sito_B", "sito_C"]

// Metodo 2: Array.from
const unici2 = Array.from(new Set(valori));

// Unire due array rimuovendo duplicati
const staticValues = ["All", "sito_A"];
const datasetValues = ["sito_A", "sito_B", "sito_C"];
const combined = [...new Set([...staticValues, ...datasetValues])];
// ["All", "sito_A", "sito_B", "sito_C"]`,
      },
      {
        type: "tip",
        content:
          "Nel progetto, new Set() è usato ovunque per deduplicare valori: `[...new Set([...staticValues, ...datasetValues])]`.",
      },
      {
        type: "heading",
        content: "Iterare un Set",
      },
      {
        type: "code",
        language: "javascript",
        title: "Iterazione con Set",
        code: `const tags = new Set(["urgente", "review", "bugfix"]);

// for...of
for (const tag of tags) {
  console.log(tag);
}

// forEach
tags.forEach((tag) => {
  console.log(tag);
});

// Convertire a array per usare map/filter
const upperTags = [...tags].map((t) => t.toUpperCase());
// ["URGENTE", "REVIEW", "BUGFIX"]`,
      },
      {
        type: "heading",
        content: "Map: coppie chiave-valore ordinate",
      },
      {
        type: "text",
        content:
          "Map è simile a un oggetto, ma con differenze importanti: le chiavi possono essere di qualsiasi tipo (non solo stringhe), mantiene l'ordine di inserimento, e ha un'API dedicata con metodi come get, set, has.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Map: creazione e utilizzo",
        code: `const userRoles = new Map();

// set(chiave, valore)
userRoles.set("mario", "admin");
userRoles.set("luigi", "editor");
userRoles.set("peach", "viewer");

// get, has, delete
console.log(userRoles.get("mario"));  // "admin"
console.log(userRoles.has("luigi"));  // true
console.log(userRoles.size);          // 3
userRoles.delete("peach");

// Creare da array di coppie
const config = new Map([
  ["theme", "dark"],
  ["lang", "it"],
  ["pageSize", 20],
]);

// Iterare
for (const [key, value] of config) {
  console.log(\`\${key}: \${value}\`);
}`,
      },
      {
        type: "subheading",
        content: "Quando usare Map invece di un oggetto?",
      },
      {
        type: "list",
        items: [
          "Le chiavi non sono stringhe (es. oggetti, numeri, DOM elements)",
          "Serve conoscere .size senza Object.keys().length",
          "Serve iterare nell'ordine di inserimento in modo garantito",
          "Le chiavi vengono aggiunte e rimosse frequentemente (Map è ottimizzato per questo)",
        ],
      },
      {
        type: "heading",
        content: "WeakRef: riferimenti deboli",
      },
      {
        type: "text",
        content:
          "WeakRef permette di tenere un riferimento a un oggetto senza impedire che venga raccolto dal garbage collector. È utile per cache e situazioni in cui non si vuole mantenere in vita un oggetto. Il valore potrebbe diventare undefined se il GC lo raccoglie.",
      },
      {
        type: "code",
        language: "javascript",
        title: "WeakRef: esempio di cache",
        code: `// WeakRef mantiene un riferimento \"debole\"
let oggettoPesante = { data: new Array(1000000) };
const ref = new WeakRef(oggettoPesante);

// Accedere al valore (potrebbe essere undefined)
const valore = ref.deref();
if (valore) {
  console.log("L'oggetto è ancora in memoria");
} else {
  console.log("L'oggetto è stato raccolto dal GC");
}

// Nota: nella pratica quotidiana WeakRef è usato raramente.
// È più comune usare WeakMap per cache legate a oggetti DOM.`,
      },
      {
        type: "info",
        content:
          "Set e Map sono iterabili con for...of. Per usare metodi come map() e filter(), converti prima in array con [...set] o Array.from(map).",
      },
    ],
    exercises: [
      {
        type: "code",
        title: "Deduplicare e contare",
        description:
          "Dato l'array 'dati', usa Set per:\n1. Creare un array 'unici' con i valori unici\n2. Assegnare a 'conteggio' il numero di valori unici\n\nStampa con console.log entrambi i risultati.",
        difficulty: "facile",
        starterCode: `const dati = ["mela", "banana", "mela", "arancia", "banana", "mela"];

// scrivi qui
const unici = // ...
const conteggio = // ...

console.log(unici);
console.log(conteggio);`,
        solution: `const dati = ["mela", "banana", "mela", "arancia", "banana", "mela"];

const unici = [...new Set(dati)];
const conteggio = unici.length;

console.log(unici);
console.log(conteggio);`,
        validate: `try {
  const fn = new Function("console", userCode);
  const logs = [];
  fn({ log: (...args) => logs.push(args.map(String).join(" ")) });
  return logs.length >= 2 && logs[1].trim() === "3";
} catch(e) { return false; }`,
        testCode: "",
      },
      {
        type: "code",
        title: "Unione senza duplicati",
        description:
          "Hai due array: 'siti1' e 'siti2'. Crea un array 'tuttiISiti' che contenga tutti i valori di entrambi, senza duplicati. Usa Set e spread operator.",
        difficulty: "medio",
        starterCode: `const siti1 = ["Milano", "Roma", "Napoli"];
const siti2 = ["Roma", "Firenze", "Milano", "Torino"];

// scrivi qui
const tuttiISiti = // ...

console.log(tuttiISiti);`,
        solution: `const siti1 = ["Milano", "Roma", "Napoli"];
const siti2 = ["Roma", "Firenze", "Milano", "Torino"];

const tuttiISiti = [...new Set([...siti1, ...siti2])];

console.log(tuttiISiti);`,
        validate: `try {
  const fn = new Function("console", userCode);
  const logs = [];
  fn({ log: (...args) => logs.push(args.map(String).join(" ")) });
  const result = logs[0];
  return result && result.includes("Milano") && result.includes("Torino") && result.includes("Firenze") && !result.includes("Roma,Roma") && !result.includes("Milano,Milano");
} catch(e) { return false; }`,
        testCode: "",
      },
      {
        type: "multiple-choice",
        title: "Set e valori duplicati",
        description:
          "Cosa stampa il seguente codice?\n\nconst s = new Set([1, '1', true, 1, '1']);\nconsole.log(s.size);",
        difficulty: "medio",
        options: ["`2` - i numeri e le stringhe vengono confrontati come stringhe", "`3` - Set usa confronto stretto (===), quindi 1, '1' e true sono diversi", "`5` - Set non rimuove nulla", "`1` - tutti i valori vengono considerati truthy e uguali"],
        correct: 1,
        explanation:
          "Set usa l'algoritmo SameValueZero (simile a ===). Il numero 1, la stringa '1' e il booleano true sono tre tipi diversi, quindi sono tre valori distinti. I duplicati di 1 e '1' vengono ignorati.",
      },
    ],
  },

  modules: {
    sections: [
      {
        type: "text",
        content:
          "JavaScript moderno usa i moduli ES per organizzare il codice in file separati, e offre operatori come optional chaining (?.) e nullish coalescing (??) per scrivere codice più sicuro e conciso.",
      },
      {
        type: "heading",
        content: "ES Modules: import e export",
      },
      {
        type: "text",
        content:
          "I moduli ES (ESM) permettono di esportare funzionalità da un file e importarle in un altro. Ogni file è un modulo con il proprio scope: le variabili non inquinano lo scope globale.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Named exports e imports",
        code: `// --- utils.js ---
// Named export: si esportano singole funzionalità
export function formatDate(date) {
  return date.toLocaleDateString("it-IT");
}

export const MAX_RETRIES = 3;

export function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// --- app.js ---
// Named import: si usano le graffe { }
import { formatDate, MAX_RETRIES } from "./utils.js";

// Si può rinominare con 'as'
import { calculateTotal as calcola } from "./utils.js";

// Importare tutto come namespace
import * as Utils from "./utils.js";
console.log(Utils.MAX_RETRIES); // 3`,
      },
      {
        type: "code",
        language: "javascript",
        title: "Default export",
        code: `// --- UserCard.js ---
// Default export: uno per file, senza nome
export default function UserCard({ name, role }) {
  return <div>{name} - {role}</div>;
}

// --- app.js ---
// Default import: senza graffe, nome a scelta
import UserCard from "./UserCard.js";
import MiaCard from "./UserCard.js"; // stesso componente, nome diverso

// Si possono combinare default e named
// --- config.js ---
export default { theme: "dark" };
export const VERSION = "2.0";

// --- app.js ---
import config, { VERSION } from "./config.js";`,
      },
      {
        type: "subheading",
        content: "Re-export: organizzare le esportazioni",
      },
      {
        type: "code",
        language: "javascript",
        title: "Re-export da un file indice",
        code: `// --- components/index.js ---
// Re-export: riesportare da altri moduli
export { default as Button } from "./Button.js";
export { default as Input } from "./Input.js";
export { formatDate, parseDate } from "./utils.js";

// --- app.js ---
// Un solo import per tutto il pacchetto
import { Button, Input, formatDate } from "./components";`,
      },
      {
        type: "heading",
        content: "Optional Chaining (?.)",
      },
      {
        type: "text",
        content:
          "L'operatore ?. permette di accedere a proprietà annidate senza rischiare errori se un valore intermedio è null o undefined. Invece di lanciare \"Cannot read property of undefined\", restituisce semplicemente undefined.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Optional chaining in pratica",
        code: `const user = {
  name: "Mario",
  address: {
    city: "Roma",
  },
};

// Senza optional chaining: rischio errore
// const zip = user.address.zip.code; // TypeError!

// Con optional chaining: safe access
const zip = user.address?.zip?.code; // undefined (nessun errore)
const city = user.address?.city;     // "Roma"

// Funziona anche con metodi
const result = user.getName?.();  // undefined (il metodo non esiste)

// E con array
const first = user.orders?.[0];  // undefined

// Chaining profondo (pattern da un'app reale)
const config = navigationByAnalysisType[analysisType]?.[page] ?? {};
const filterValues = state.filters[key]?.values ?? {};`,
      },
      {
        type: "heading",
        content: "Nullish Coalescing (??) vs OR (||)",
      },
      {
        type: "text",
        content:
          "L'operatore ?? restituisce il valore a destra solo se quello a sinistra è null o undefined. L'operatore || invece tratta come \"falsy\" anche 0, stringa vuota e false, il che spesso causa bug.",
      },
      {
        type: "code",
        language: "javascript",
        title: "?? vs || : la differenza cruciale",
        code: `// || tratta come falsy: null, undefined, 0, "", false, NaN
const a = 0 || 42;     // 42  (0 è falsy!)
const b = "" || "N/A";  // "N/A" (stringa vuota è falsy!)
const c = false || true; // true

// ?? reagisce SOLO a null e undefined
const d = 0 ?? 42;     // 0  (0 è un valore valido!)
const e = "" ?? "N/A";  // "" (stringa vuota è un valore valido!)
const f = null ?? 42;   // 42
const g = undefined ?? 42; // 42

// Caso pratico: impostazione con valore 0 che è valido
const pageSize = userPreference ?? 20;
// Se userPreference è 0, pageSize sarà 0 (corretto!)
// Con ||, pageSize sarebbe 20 (bug!)

// Pattern dal progetto
const groupBy = pageConfig.groupBy[0] ?? "individual";`,
      },
      {
        type: "warning",
        content:
          "Errore comune: usare || quando si intende ??. Se un valore 0 o stringa vuota è legittimo, usa ?? per non sovrascriverlo accidentalmente.",
      },
      {
        type: "heading",
        content: "Logical Assignment (??=, ||=, &&=)",
      },
      {
        type: "text",
        content:
          "Gli operatori di assegnamento logico combinano un controllo logico con l'assegnamento in una sola espressione. Sono molto utili per inizializzare valori mancanti.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Assegnamento logico",
        code: `// ??= assegna solo se il valore è null/undefined
let config = {};
config.theme ??= "light";
// equivale a: if (config.theme == null) config.theme = "light";
console.log(config.theme); // "light"

config.theme ??= "dark";
console.log(config.theme); // "light" (già assegnato, non cambia)

// ||= assegna se il valore è falsy
let count = 0;
count ||= 10;
console.log(count); // 10 (0 è falsy!)

// &&= assegna solo se il valore è truthy
let user = { name: "Mario" };
user.name &&= user.name.toUpperCase();
console.log(user.name); // "MARIO"

user.email &&= user.email.trim();
// non fa nulla perché user.email è undefined (falsy)`,
      },
      {
        type: "tip",
        content:
          "Nel progetto: `state.filters[key]?.values ?? {}` e `pageConfig.groupBy[0] ?? 'individual'` sono pattern comuni.",
      },
      {
        type: "info",
        content:
          "Optional chaining e nullish coalescing si usano spesso insieme: prima si accede in modo sicuro (?.), poi si fornisce un default (??). È un pattern potente per gestire dati incompleti da API.",
      },
    ],
    exercises: [
      {
        type: "code",
        title: "Accesso sicuro a dati annidati",
        description:
          "Dato l'oggetto 'response', estrai il nome della città usando optional chaining. Se non esiste, usa 'Sconosciuta' come valore di default con ??. Assegna il risultato a 'citta' e stampalo.",
        difficulty: "facile",
        starterCode: `const response = {
  data: {
    user: {
      name: "Luigi",
      // address non è presente!
    },
  },
};

// Estrai la città con ?. e ??
const citta = // ...

console.log(citta);`,
        solution: `const response = {
  data: {
    user: {
      name: "Luigi",
    },
  },
};

const citta = response.data?.user?.address?.city ?? "Sconosciuta";

console.log(citta);`,
        validate: `try {
  const fn = new Function("console", userCode);
  const logs = [];
  fn({ log: (...args) => logs.push(args.map(String).join(" ")) });
  return logs[0] === "Sconosciuta";
} catch(e) { return false; }`,
        testCode: "",
      },
      {
        type: "multiple-choice",
        title: "?? vs ||",
        description:
          "Qual è l'output del seguente codice?\n\nconst x = 0 ?? 99;\nconst y = 0 || 99;\nconsole.log(x, y);",
        difficulty: "medio",
        options: ["`0 0`", "`99 99`", "`0 99`", "`99 0`"],
        correct: 2,
        explanation:
          "?? restituisce il lato destro solo per null/undefined, quindi 0 ?? 99 dà 0. || restituisce il lato destro per qualsiasi valore falsy (incluso 0), quindi 0 || 99 dà 99.",
      },
      {
        type: "multiple-choice",
        title: "Import e Export",
        description:
          "Dato il file:\n\n// utils.js\nexport default function hello() {}\nexport const VERSION = '1.0';\n\nQuale import è corretto?",
        difficulty: "medio",
        options: [
          "`import { hello, VERSION } from './utils'`",
          "`import hello, { VERSION } from './utils'`",
          "`import { default as hello, VERSION } from './utils'`",
          "Sia la seconda che la terza opzione sono corrette",
        ],
        correct: 3,
        explanation:
          "Un default export si importa senza graffe (opzione 2) oppure con `{ default as nomeASscelta }` (opzione 3). Entrambe le sintassi sono valide. La prima opzione è sbagliata perché tratta 'hello' come named export.",
      },
    ],
  },
};
