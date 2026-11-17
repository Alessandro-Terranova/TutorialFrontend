export const lessons = {
  async: {
    sections: [
      {
        type: "text",
        content:
          "Finora il codice che abbiamo scritto era **sincrono**: ogni istruzione viene eseguita dopo la precedente, una alla volta. JavaScript esegue una sola cosa per volta (è *single-threaded*), ma molte operazioni richiedono tempo: scaricare dati da un server, aspettare un timer, leggere un file. Se il programma restasse fermo ad aspettare, la pagina si bloccherebbe. Per questo esistono i meccanismi **asincroni**: callback, Promise e async/await.",
      },
      {
        type: "heading",
        content: "setTimeout: eseguire codice più tardi",
      },
      {
        type: "text",
        content:
          "`setTimeout(funzione, millisecondi)` chiede a JavaScript di eseguire una funzione dopo un certo tempo. Nel frattempo il resto del codice continua: `setTimeout` non mette in pausa il programma. È il modo più semplice per vedere il comportamento asincrono.",
      },
      {
        type: "code",
        language: "javascript",
        title: "L'ordine di esecuzione con setTimeout",
        code: `console.log("1. Inizio");

setTimeout(() => {
  console.log("3. Dopo un secondo");
}, 1000);

console.log("2. Fine del codice");

// Output:
// 1. Inizio
// 2. Fine del codice
// 3. Dopo un secondo`,
      },
      {
        type: "info",
        content:
          "Anche con `setTimeout(fn, 0)` la funzione viene eseguita *dopo* tutto il codice sincrono: JavaScript la mette in coda e la esegue solo quando ha finito il lavoro in corso.",
      },
      {
        type: "heading",
        content: "Callback e callback hell",
      },
      {
        type: "text",
        content:
          "Una callback è una funzione passata come argomento a un'altra funzione, che la invocherà quando l'operazione è completata (le hai già viste nella lezione sulle funzioni). È il meccanismo asincrono più antico, ma quando le operazioni dipendono l'una dall'altra porta rapidamente al cosiddetto \"callback hell\": funzioni annidate dentro funzioni, sempre più a destra.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Callback hell: operazioni annidate",
        code: `// Simulazione di operazioni lente con callback
function getUser(id, callback) {
  setTimeout(() => callback({ id: id, name: "Mario" }), 500);
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
          "Una **Promise** (promessa) è un oggetto che rappresenta un valore che arriverà in futuro. Ha tre stati: *pending* (in attesa), *fulfilled* (risolta con successo) e *rejected* (rifiutata con un errore).\n\nSi crea con `new Promise(...)`: la parola chiave `new` crea un nuovo oggetto di un tipo predefinito di JavaScript (la useremo anche per `Set`, `Map` ed `Error`). A `new Promise` si passa una funzione che riceve due callback: `resolve(valore)`, da chiamare in caso di successo, e `reject(errore)`, da chiamare in caso di fallimento.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Creare una Promise",
        code: `function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id: id, name: "Mario" });
      } else {
        // new Error crea un oggetto errore con un messaggio
        reject(new Error("ID non valido"));
      }
    }, 500);
  });
}`,
      },
      {
        type: "text",
        content:
          "Una Promise si consuma con `.then(callback)`, che riceve il valore quando la Promise viene risolta, e `.catch(callback)`, che riceve l'errore se viene rifiutata. Se dentro un `.then` restituisci un'altra Promise, il `.then` successivo aspetta anche quella: così le operazioni si mettono in fila in una catena piatta, senza annidamenti.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Consumare una Promise con .then e .catch",
        code: `function getOrders(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([{ id: 1, total: 49.99 }]), 500);
  });
}

getUser(1)
  .then((user) => {
    console.log(user.name); // "Mario"
    return getOrders(user.id); // restituisce un'altra Promise
  })
  .then((orders) => {
    console.log(orders); // [{ id: 1, total: 49.99 }]
  })
  .catch((error) => {
    // error.message contiene il testo passato a new Error
    console.log("Errore:", error.message);
  });

getUser(-5).catch((error) => console.log(error.message)); // "ID non valido"`,
      },
      {
        type: "tip",
        content:
          "Per creare al volo una Promise già risolta puoi usare `Promise.resolve(valore)`; per una già rifiutata `Promise.reject(errore)`. Sono comodi per i test e per simulare dati.",
      },
      {
        type: "heading",
        content: "async/await: codice asincrono che sembra sincrono",
      },
      {
        type: "text",
        content:
          "`async`/`await` è una sintassi più comoda costruita sopra le Promise. Una funzione dichiarata con `async` restituisce **sempre** una Promise. Al suo interno, `await` mette in pausa la funzione finché la Promise non si risolve e restituisce direttamente il valore: il codice diventa lineare e leggibile, come se fosse sincrono.",
      },
      {
        type: "code",
        language: "javascript",
        title: "async/await in azione",
        code: `function getDetails(orderId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ shipped: true }), 500);
  });
}

// Le stesse operazioni di prima, senza annidamenti
async function loadUserData(id) {
  const user = await getUser(id);
  const orders = await getOrders(user.id);
  const details = await getDetails(orders[0].id);
  return details;
}

// Chiamare la funzione restituisce una Promise
loadUserData(1).then((details) => {
  console.log(details); // { shipped: true }
});

// Oppure, dentro un'altra funzione async (o in un modulo):
// const details = await loadUserData(1);`,
      },
      {
        type: "warning",
        content:
          "`await` si può usare solo dentro una funzione `async` (oppure al livello più esterno di un modulo ES). Dimenticare `await` è un errore comune: senza, ottieni la Promise e non il valore.",
      },
      {
        type: "heading",
        content: "Gestione degli errori: try/catch/finally",
      },
      {
        type: "text",
        content:
          "Il costrutto `try { ... } catch (error) { ... }` permette di \"provare\" a eseguire del codice e, se si verifica un errore, di gestirlo nel blocco `catch` invece di interrompere il programma. Con `throw new Error(\"messaggio\")` puoi lanciare tu stesso un errore. Il blocco opzionale `finally` viene eseguito **sempre**, sia in caso di successo sia di errore: è utile, ad esempio, per nascondere un indicatore di caricamento.\n\nCon async/await, una Promise rifiutata dentro un `await` si comporta proprio come un errore lanciato: si gestisce con try/catch, come nel codice sincrono.",
      },
      {
        type: "code",
        language: "javascript",
        title: "try/catch/finally con async",
        code: `async function mostraUtente(id) {
  let loading = true;
  try {
    const user = await getUser(id); // se viene rifiutata, si salta al catch
    console.log("Utente:", user.name);
  } catch (error) {
    console.log("Qualcosa è andato storto:", error.message);
  } finally {
    loading = false; // si esegue SEMPRE
    console.log("Caricamento completato");
  }
}

mostraUtente(1);  // "Utente: Mario", poi "Caricamento completato"
mostraUtente(-1); // "Qualcosa è andato storto: ID non valido", poi "Caricamento completato"`,
      },
      {
        type: "heading",
        content: "Promise.all: operazioni in parallelo",
      },
      {
        type: "text",
        content:
          "Quando le operazioni sono indipendenti tra loro, non serve aspettarle una per volta. `Promise.all([...])` riceve un array di Promise, le lascia procedere in parallelo e restituisce una Promise che si risolve con l'array dei risultati, nello stesso ordine. Se anche una sola viene rifiutata, l'intera `Promise.all` viene rifiutata subito.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Promise.all per operazioni parallele",
        code: `function attendi(ms, valore) {
  return new Promise((resolve) => setTimeout(() => resolve(valore), ms));
}

async function caricaPagina() {
  // In sequenza: circa 3 secondi (1 + 1 + 1)
  const film1 = await attendi(1000, "Matrix");
  const film2 = await attendi(1000, "Inception");
  const film3 = await attendi(1000, "Interstellar");

  // In parallelo con Promise.all: circa 1 secondo
  const [a, b, c] = await Promise.all([
    attendi(1000, "Matrix"),
    attendi(1000, "Inception"),
    attendi(1000, "Interstellar"),
  ]);
  console.log(a, b, c); // Matrix Inception Interstellar

  // Se una fallisce, il catch intercetta l'errore
  try {
    await Promise.all([attendi(500, "ok"), Promise.reject(new Error("Rete assente"))]);
  } catch (err) {
    console.log("Almeno un'operazione è fallita:", err.message);
  }
}`,
      },
      {
        type: "heading",
        content: "fetch: richieste HTTP",
      },
      {
        type: "text",
        content:
          "`fetch` è la funzione nativa del browser per fare richieste HTTP, cioè chiedere dati a un server. Restituisce una Promise che si risolve in un oggetto *Response*; per leggerne il contenuto in formato JSON si usa `response.json()`, che restituisce a sua volta una Promise. Attenzione: `fetch` non viene rifiutata per risposte di errore come 404 o 500, bisogna controllare `response.ok`.\n\nNegli esercizi di questo tutorial non possiamo contattare server reali, quindi gli esempi con `fetch` sono solo illustrativi: negli esercizi simuleremo le richieste con Promise e `setTimeout`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Esempio con fetch (illustrativo)",
        code: `// GET: leggere dati
async function getProdotti() {
  const response = await fetch("https://api.example.com/prodotti");
  if (!response.ok) {
    throw new Error("Errore HTTP " + response.status);
  }
  return response.json(); // anche .json() restituisce una Promise
}

// POST: inviare dati
// JSON.stringify trasforma un oggetto in testo JSON
async function creaProdotto(prodotto) {
  const response = await fetch("https://api.example.com/prodotti", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(prodotto),
  });
  return response.json();
}`,
      },
      {
        type: "tip",
        content:
          "Gestisci sempre i tre casi di un'operazione asincrona: *caricamento in corso*, *successo* ed *errore*. Un'interfaccia che mostra uno spinner e un messaggio d'errore chiaro è molto più usabile di una che resta vuota.",
      },
      {
        type: "warning",
        content:
          "`fetch` non lancia errori automaticamente per status HTTP 4xx o 5xx. Controlla sempre `response.ok` o `response.status` prima di usare i dati.",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "Ordine di esecuzione",
        description:
          'Cosa stampa questo codice, e in che ordine?\n\nconsole.log("A");\nsetTimeout(() => console.log("B"), 0);\nconsole.log("C");',
        difficulty: "facile",
        options: ["`A B C`", "`A C B`", "`B A C`", "`A C` (B non viene mai stampato)"],
        correct: 1,
        explanation:
          "Anche con un ritardo di 0 millisecondi, la funzione passata a `setTimeout` viene eseguita solo dopo che tutto il codice sincrono è terminato. Quindi prima `A`, poi `C`, infine `B`.",
      },
      {
        type: "code",
        title: "Il primo await",
        description:
          "La funzione `getValore()` (già scritta nel codice) restituisce una Promise che, dopo mezzo secondo, si risolve con il numero 10.\n\nScrivi una funzione async chiamata `elabora` che:\n1. aspetta il valore di `getValore()` con `await`\n2. restituisce quel valore moltiplicato per 3\n\nUsa async/await, non `.then()`.",
        difficulty: "facile",
        starterCode: `function getValore() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(10), 500);
  });
}

async function elabora() {
  // scrivi qui
}

elabora().then((risultato) => console.log(risultato));`,
        solution: `function getValore() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(10), 500);
  });
}

async function elabora() {
  const valore = await getValore();
  return valore * 3;
}

elabora().then((risultato) => console.log(risultato));`,
        validate: `if (typeof elabora !== "function") return "Definisci la funzione async elabora";
const p = elabora();
if (!(p instanceof Promise)) return "elabora deve essere dichiarata con async (deve restituire una Promise)";
const risultato = await p;
if (risultato !== 30) return "elabora() dovrebbe restituire 30, invece restituisce " + $format(risultato);
if (!/await\\s+getValore\\s*\\(/.test($codeNoComments)) return "Usa await getValore() per ottenere il valore";
if ($codeNoComments.includes(".then(getValore") || /getValore\\(\\)\\s*\\.then/.test($codeNoComments)) return "Usa await invece di .then()";
return true;`,
      },
      {
        type: "code",
        title: "Creare una Promise con setTimeout",
        description:
          "Scrivi una funzione `attendi(ms, valore)` che restituisce una **nuova Promise** che, dopo `ms` millisecondi (usa `setTimeout`), si risolve con `valore`.\n\nEsempio: `await attendi(300, \"ciao\")` restituisce `\"ciao\"` dopo 300 ms.",
        difficulty: "medio",
        starterCode: `function attendi(ms, valore) {
  // restituisci una new Promise...
}

attendi(300, "ciao").then((v) => console.log(v));`,
        solution: `function attendi(ms, valore) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(valore), ms);
  });
}

attendi(300, "ciao").then((v) => console.log(v));`,
        validate: `if (typeof attendi !== "function") return "Definisci la funzione attendi";
const p = attendi(200, "pizza");
if (!(p instanceof Promise)) return "attendi deve restituire una Promise (return new Promise(...))";
const inizio = Date.now();
const v = await p;
if (v !== "pizza") return "attendi(200, \\"pizza\\") dovrebbe risolversi con \\"pizza\\", invece ho ottenuto " + $format(v);
const v2 = await attendi(10, 42);
if (v2 !== 42) return "attendi(10, 42) dovrebbe risolversi con 42";
const t0 = Date.now();
await attendi(150, "x");
if (Date.now() - t0 < 120) return "La Promise si risolve troppo presto: usa setTimeout con ms millisecondi";
return true;`,
        solutionExplanation:
          "`new Promise` riceve una funzione con `resolve`: chiamandolo dentro `setTimeout` la Promise si risolve solo dopo `ms` millisecondi, con il valore passato a `resolve`.",
      },
      {
        type: "code",
        title: "Gestire gli errori con try/catch",
        description:
          "La funzione `caricaProdotto(id)` (già scritta) simula una richiesta al server: per id positivi si risolve con un prodotto `{ id, nome }`, altrimenti viene rifiutata con un errore.\n\nScrivi una funzione async `nomeProdotto(id)` che:\n- restituisce il `nome` del prodotto se il caricamento riesce\n- restituisce la stringa `\"Prodotto non trovato\"` se la Promise viene rifiutata\n\nUsa `try/catch`.",
        difficulty: "medio",
        starterCode: `function caricaProdotto(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id: id, nome: "Prodotto " + id });
      } else {
        reject(new Error("Prodotto inesistente"));
      }
    }, 300);
  });
}

async function nomeProdotto(id) {
  // scrivi qui
}

nomeProdotto(7).then((n) => console.log(n));
nomeProdotto(-1).then((n) => console.log(n));`,
        solution: `function caricaProdotto(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id: id, nome: "Prodotto " + id });
      } else {
        reject(new Error("Prodotto inesistente"));
      }
    }, 300);
  });
}

async function nomeProdotto(id) {
  try {
    const prodotto = await caricaProdotto(id);
    return prodotto.nome;
  } catch (error) {
    return "Prodotto non trovato";
  }
}

nomeProdotto(7).then((n) => console.log(n));
nomeProdotto(-1).then((n) => console.log(n));`,
        validate: `if (typeof nomeProdotto !== "function") return "Definisci la funzione async nomeProdotto";
const ok = await nomeProdotto(7);
if (ok !== "Prodotto 7") return "nomeProdotto(7) dovrebbe restituire \\"Prodotto 7\\", invece restituisce " + $format(ok);
const ok2 = await nomeProdotto(3);
if (ok2 !== "Prodotto 3") return "nomeProdotto(3) dovrebbe restituire \\"Prodotto 3\\"";
let ko;
try {
  ko = await nomeProdotto(-1);
} catch (e) {
  return "nomeProdotto(-1) non deve lanciare errori: intercettalo con try/catch";
}
if (ko !== "Prodotto non trovato") return "nomeProdotto(-1) dovrebbe restituire \\"Prodotto non trovato\\", invece restituisce " + $format(ko);
if (!/try\\s*\\{/.test($codeNoComments) || !/catch\\s*\\(/.test($codeNoComments)) return "Usa un blocco try/catch";
return true;`,
        solutionExplanation:
          "`await` dentro `try` trasforma una Promise rifiutata in un errore lanciato: il `catch` lo intercetta e restituisce il messaggio di ripiego, così chi chiama `nomeProdotto` riceve sempre una stringa.",
      },
      {
        type: "code",
        title: "Caricamento in parallelo con Promise.all",
        description:
          "La funzione `caricaFilm(id)` (già scritta) impiega 300 ms per restituire il titolo di un film.\n\nScrivi una funzione async `caricaTitoli(ids)` che riceve un array di id e restituisce l'array dei titoli, caricandoli **in parallelo** con `Promise.all`.\n\nSuggerimento: con `ids.map(...)` puoi trasformare l'array di id in un array di Promise.",
        difficulty: "difficile",
        starterCode: `const catalogo = { 1: "Matrix", 2: "Inception", 3: "Interstellar", 4: "Up" };

function caricaFilm(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(catalogo[id]), 300);
  });
}

async function caricaTitoli(ids) {
  // scrivi qui
}

caricaTitoli([1, 2, 3]).then((titoli) => console.log(titoli));`,
        solution: `const catalogo = { 1: "Matrix", 2: "Inception", 3: "Interstellar", 4: "Up" };

function caricaFilm(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(catalogo[id]), 300);
  });
}

async function caricaTitoli(ids) {
  const titoli = await Promise.all(ids.map((id) => caricaFilm(id)));
  return titoli;
}

caricaTitoli([1, 2, 3]).then((titoli) => console.log(titoli));`,
        validate: `if (typeof caricaTitoli !== "function") return "Definisci la funzione async caricaTitoli";
if (!$codeNoComments.includes("Promise.all")) return "Usa Promise.all per caricare i film in parallelo";
const t0 = Date.now();
const r = await caricaTitoli([1, 2, 3]);
const durata = Date.now() - t0;
if (!$equal(r, ["Matrix", "Inception", "Interstellar"])) return "caricaTitoli([1, 2, 3]) dovrebbe restituire [\\"Matrix\\", \\"Inception\\", \\"Interstellar\\"], invece restituisce " + $format(r);
if (durata > 750) return "I film vengono caricati uno alla volta: passali tutti insieme a Promise.all";
const r2 = await caricaTitoli([4, 1]);
if (!$equal(r2, ["Up", "Matrix"])) return "caricaTitoli([4, 1]) dovrebbe restituire [\\"Up\\", \\"Matrix\\"]";
const r3 = await caricaTitoli([]);
if (!$equal(r3, [])) return "caricaTitoli([]) dovrebbe restituire un array vuoto";
return true;`,
        solutionExplanation:
          "`ids.map(...)` avvia subito tutte le richieste e produce un array di Promise; `Promise.all` le aspetta insieme e restituisce i risultati nello stesso ordine degli id. Il tempo totale è quello della richiesta più lenta, non la somma.",
      },
      {
        type: "multiple-choice",
        title: "Comportamento di Promise.all",
        description:
          "Se passi 3 Promise a `Promise.all` e la seconda viene rifiutata (rejected), cosa succede?",
        difficulty: "medio",
        options: [
          "Restituisce i risultati delle Promise risolte e ignora quella rifiutata",
          "Aspetta che tutte finiscano e poi lancia l'errore",
          "Viene rifiutata subito con l'errore della Promise fallita",
          "Restituisce un array con undefined al posto della Promise rifiutata",
        ],
        correct: 2,
        explanation:
          "`Promise.all` ha un comportamento \"fail-fast\": appena una Promise viene rifiutata, l'intera `Promise.all` viene rifiutata con quell'errore, senza aspettare le altre.",
      },
      {
        type: "multiple-choice",
        title: "async e valore di ritorno",
        description: "Cosa restituisce una funzione dichiarata con `async`?",
        difficulty: "facile",
        options: [
          "Il valore restituito da return, come una funzione normale",
          "Sempre undefined",
          "Sempre una Promise, anche se si usa return con un valore semplice",
          "Un oggetto con le proprietà value e done",
        ],
        correct: 2,
        explanation:
          "Una funzione async restituisce SEMPRE una Promise. Se fai `return 42`, il chiamante riceve una Promise che si risolve con 42. Per ottenere il valore servono `await` o `.then()`.",
      },
    ],
  },

  "data-structures": {
    sections: [
      {
        type: "text",
        content:
          "Oltre ad array e oggetti, JavaScript offre altre due strutture dati molto utili: **Set** e **Map**. Risolvono in modo elegante problemi comuni come eliminare i duplicati, controllare velocemente se un valore è presente e associare valori a chiavi di qualsiasi tipo.",
      },
      {
        type: "heading",
        content: "Set: collezione di valori unici",
      },
      {
        type: "text",
        content:
          "Un Set è una collezione che non ammette duplicati: ogni valore può comparire al massimo una volta. Si crea con `new Set()` (vuoto) oppure `new Set(array)` partendo da un array. È perfetto per deduplicare dati, verificare l'appartenenza e gestire selezioni (es. i prodotti selezionati in una lista).",
      },
      {
        type: "code",
        language: "javascript",
        title: "Creare e usare un Set",
        code: `// Creare un Set vuoto e aggiungere valori
const colori = new Set();
colori.add("rosso");
colori.add("blu");
colori.add("rosso"); // ignorato, già presente!
console.log(colori.size); // 2

// Creare da un array
const numeri = new Set([1, 2, 3, 2, 1]);
console.log(numeri); // Set(3) { 1, 2, 3 }

// Metodi principali
console.log(colori.has("blu"));   // true  - controllo veloce
console.log(colori.has("verde")); // false
colori.delete("blu"); // rimuove "blu"
colori.clear();       // svuota tutto
console.log(colori.size); // 0`,
      },
      {
        type: "info",
        content:
          "Un Set confronta i valori come `===`: il numero `1` e la stringa `\"1\"` sono valori diversi. Due oggetti con lo stesso contenuto, invece, sono comunque due oggetti distinti, quindi un Set li conserva entrambi.",
      },
      {
        type: "heading",
        content: "Deduplicare un array con Set",
      },
      {
        type: "text",
        content:
          "L'uso più comune di Set è eliminare i duplicati da un array: si crea un Set dall'array (che scarta i doppioni) e poi lo si riconverte in array con lo spread operator `[...set]` oppure con `Array.from(set)`, che crea un array a partire da qualsiasi collezione iterabile.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Pattern di deduplicazione",
        code: `const generi = ["rock", "pop", "rock", "jazz", "pop"];

// Metodo 1: spread operator
const unici = [...new Set(generi)];
console.log(unici); // ["rock", "pop", "jazz"]

// Metodo 2: Array.from
const unici2 = Array.from(new Set(generi));

// Unire due array rimuovendo i duplicati
const playlistA = ["Imagine", "Yesterday"];
const playlistB = ["Yesterday", "Let It Be", "Imagine"];
const tutte = [...new Set([...playlistA, ...playlistB])];
console.log(tutte); // ["Imagine", "Yesterday", "Let It Be"]`,
      },
      {
        type: "tip",
        content:
          "`[...new Set(array)]` è il modo più rapido e leggibile per ottenere i valori unici di un array di primitivi: preferiscilo a cicli scritti a mano con `includes`.",
      },
      {
        type: "heading",
        content: "Iterare un Set",
      },
      {
        type: "code",
        language: "javascript",
        title: "Iterazione con Set",
        code: `const tags = new Set(["urgente", "lavoro", "casa"]);

// for...of
for (const tag of tags) {
  console.log(tag);
}

// forEach
tags.forEach((tag) => {
  console.log(tag);
});

// Un Set non ha map/filter: convertilo prima in array
const maiuscoli = [...tags].map((t) => t.toUpperCase());
console.log(maiuscoli); // ["URGENTE", "LAVORO", "CASA"]`,
      },
      {
        type: "heading",
        content: "Map: coppie chiave-valore",
      },
      {
        type: "text",
        content:
          "Una Map è simile a un oggetto, ma con alcune differenze importanti: le chiavi possono essere di qualsiasi tipo (numeri, oggetti..., non solo stringhe), mantiene l'ordine di inserimento e ha metodi dedicati: `set(chiave, valore)`, `get(chiave)`, `has(chiave)`, `delete(chiave)` e la proprietà `size`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Map: creazione e utilizzo",
        code: `const ruoli = new Map();

// set(chiave, valore)
ruoli.set("mario", "admin");
ruoli.set("luigi", "editor");
ruoli.set("peach", "lettore");

// get, has, delete, size
console.log(ruoli.get("mario")); // "admin"
console.log(ruoli.has("luigi")); // true
console.log(ruoli.get("toad"));  // undefined (chiave assente)
console.log(ruoli.size);         // 3
ruoli.delete("peach");

// Creare da un array di coppie [chiave, valore]
const impostazioni = new Map([
  ["tema", "scuro"],
  ["lingua", "it"],
  ["elementiPerPagina", 20],
]);

// Iterare: ogni elemento è una coppia [chiave, valore]
for (const [chiave, valore] of impostazioni) {
  console.log(\`\${chiave}: \${valore}\`);
}

// Le chiavi possono essere numeri (o perfino oggetti)
const voti = new Map([[1, "insufficiente"], [10, "eccellente"]]);
console.log(voti.get(10)); // "eccellente"`,
      },
      {
        type: "subheading",
        content: "Esempio: contare le occorrenze",
      },
      {
        type: "code",
        language: "javascript",
        title: "Contare quante volte compare ogni valore",
        code: `const voti = ["A", "B", "A", "C", "A", "B"];
const conteggi = new Map();

for (const voto of voti) {
  // se la chiave non c'è ancora, get restituisce undefined
  const attuale = conteggi.has(voto) ? conteggi.get(voto) : 0;
  conteggi.set(voto, attuale + 1);
}

console.log(conteggi); // Map(3) { "A" => 3, "B" => 2, "C" => 1 }

// Da Map a oggetto (Object.fromEntries fa l'inverso di Object.entries) e viceversa
const oggetto = Object.fromEntries(conteggi); // { A: 3, B: 2, C: 1 }
const diNuovoMap = new Map(Object.entries(oggetto));`,
      },
      {
        type: "subheading",
        content: "Quando usare Map invece di un oggetto?",
      },
      {
        type: "list",
        items: [
          "Le chiavi non sono stringhe (es. numeri o oggetti)",
          "Ti serve conoscere il numero di elementi con `.size`, senza `Object.keys(obj).length`",
          "Ti serve iterare in modo garantito nell'ordine di inserimento",
          "Le chiavi vengono aggiunte e rimosse spesso (Map è ottimizzata per questo)",
          "Per dati strutturati con chiavi fisse (es. un utente con nome ed email) un normale oggetto resta la scelta più semplice",
        ],
      },
      {
        type: "info",
        content:
          "Set e Map sono iterabili con `for...of`. Per usare metodi come `map()` e `filter()`, convertili prima in array con `[...set]` o `Array.from(map)`.",
      },
    ],
    exercises: [
      {
        type: "code",
        title: "Deduplicare e contare",
        description:
          "Dato l'array `frutti`, usa un Set per:\n1. creare un array `unici` con i valori senza duplicati (nello stesso ordine di prima apparizione)\n2. assegnare a `conteggio` il numero di valori unici\n\nStampa entrambi con console.log.",
        difficulty: "facile",
        starterCode: `const frutti = ["mela", "banana", "mela", "arancia", "banana", "mela"];

// scrivi qui
const unici = [];
const conteggio = 0;

console.log(unici);
console.log(conteggio);`,
        solution: `const frutti = ["mela", "banana", "mela", "arancia", "banana", "mela"];

const unici = [...new Set(frutti)];
const conteggio = unici.length;

console.log(unici);
console.log(conteggio);`,
        validate: `if (!Array.isArray(unici)) return "unici deve essere un array (usa [...new Set(...)] o Array.from)";
if (!$equal(unici, ["mela", "banana", "arancia"])) return "unici dovrebbe essere [\\"mela\\", \\"banana\\", \\"arancia\\"], invece è " + $format(unici);
if (conteggio !== 3) return "conteggio dovrebbe essere 3, invece è " + $format(conteggio);
if (!$codeNoComments.includes("new Set")) return "Usa new Set per eliminare i duplicati";
if (!$logs.includes("3")) return "Stampa conteggio con console.log";
return true;`,
      },
      {
        type: "code",
        title: "Unione senza duplicati",
        description:
          "Hai due array di città: `viaggi2023` e `viaggi2024`. Scrivi una funzione `unisci(a, b)` che restituisce un array con tutte le città di entrambi, senza duplicati, nell'ordine in cui compaiono (prima quelle di `a`, poi le nuove di `b`). Usa Set e lo spread operator.",
        difficulty: "medio",
        starterCode: `const viaggi2023 = ["Milano", "Roma", "Napoli"];
const viaggi2024 = ["Roma", "Firenze", "Milano", "Torino"];

function unisci(a, b) {
  // scrivi qui
}

console.log(unisci(viaggi2023, viaggi2024));`,
        solution: `const viaggi2023 = ["Milano", "Roma", "Napoli"];
const viaggi2024 = ["Roma", "Firenze", "Milano", "Torino"];

function unisci(a, b) {
  return [...new Set([...a, ...b])];
}

console.log(unisci(viaggi2023, viaggi2024));`,
        validate: `if (typeof unisci !== "function") return "Definisci la funzione unisci";
const r = unisci(["Milano", "Roma", "Napoli"], ["Roma", "Firenze", "Milano", "Torino"]);
if (!$equal(r, ["Milano", "Roma", "Napoli", "Firenze", "Torino"])) return "Con i due array dell'esempio mi aspetto [\\"Milano\\", \\"Roma\\", \\"Napoli\\", \\"Firenze\\", \\"Torino\\"], invece ho ottenuto " + $format(r);
if (!$equal(unisci([], ["a", "a"]), ["a"])) return "unisci([], [\\"a\\", \\"a\\"]) dovrebbe restituire [\\"a\\"]: anche i duplicati dentro lo stesso array vanno eliminati";
if (!$equal(unisci([1, 2], [2, 3]), [1, 2, 3])) return "unisci([1, 2], [2, 3]) dovrebbe restituire [1, 2, 3]";
if (!$codeNoComments.includes("new Set")) return "Usa new Set per eliminare i duplicati";
return true;`,
        solutionExplanation:
          "Lo spread `[...a, ...b]` concatena i due array mantenendo l'ordine; il Set scarta i valori già visti (tenendo la prima apparizione) e lo spread esterno lo riconverte in array.",
      },
      {
        type: "code",
        title: "Contare le parole con Map",
        description:
          "Scrivi una funzione `contaParole(parole)` che riceve un array di stringhe e restituisce una **Map** in cui ogni chiave è una parola e il valore è il numero di volte in cui compare.\n\nEsempio: `contaParole([\"ciao\", \"mondo\", \"ciao\"])` → `Map(2) { \"ciao\" => 2, \"mondo\" => 1 }`.",
        difficulty: "medio",
        starterCode: `function contaParole(parole) {
  const conteggi = new Map();
  // scrivi qui
  return conteggi;
}

console.log(contaParole(["ciao", "mondo", "ciao"]));`,
        solution: `function contaParole(parole) {
  const conteggi = new Map();
  for (const parola of parole) {
    const attuale = conteggi.has(parola) ? conteggi.get(parola) : 0;
    conteggi.set(parola, attuale + 1);
  }
  return conteggi;
}

console.log(contaParole(["ciao", "mondo", "ciao"]));`,
        validate: `if (typeof contaParole !== "function") return "Definisci la funzione contaParole";
const r = contaParole(["ciao", "mondo", "ciao"]);
if (!(r instanceof Map)) return "contaParole deve restituire una Map (new Map())";
if (!$equal(r, new Map([["ciao", 2], ["mondo", 1]]))) return "contaParole([\\"ciao\\", \\"mondo\\", \\"ciao\\"]) dovrebbe restituire Map { \\"ciao\\" => 2, \\"mondo\\" => 1 }, invece restituisce " + $format(r);
const r2 = contaParole(["a", "b", "a", "a", "c"]);
if (!$equal(r2, new Map([["a", 3], ["b", 1], ["c", 1]]))) return "Con [\\"a\\", \\"b\\", \\"a\\", \\"a\\", \\"c\\"] mi aspetto Map { \\"a\\" => 3, \\"b\\" => 1, \\"c\\" => 1 }, invece ho " + $format(r2);
const r3 = contaParole([]);
if (!(r3 instanceof Map) || r3.size !== 0) return "Con un array vuoto contaParole deve restituire una Map vuota";
return true;`,
        solutionExplanation:
          "Per ogni parola si legge il conteggio attuale (0 se la chiave non esiste ancora) e si salva il valore incrementato con `set`, che sovrascrive la coppia esistente.",
      },
      {
        type: "multiple-choice",
        title: "Set e valori duplicati",
        description:
          "Cosa stampa il seguente codice?\n\nconst s = new Set([1, '1', true, 1, '1']);\nconsole.log(s.size);",
        difficulty: "medio",
        options: [
          "`2` - i numeri e le stringhe vengono confrontati come stringhe",
          "`3` - Set confronta i valori come ===, quindi 1, '1' e true sono diversi",
          "`5` - Set non rimuove nulla",
          "`1` - tutti i valori sono truthy e vengono considerati uguali",
        ],
        correct: 1,
        explanation:
          "Set confronta i valori in modo stretto (come `===`). Il numero 1, la stringa '1' e il booleano true sono di tre tipi diversi, quindi sono tre valori distinti. I duplicati di 1 e di '1' vengono ignorati.",
      },
      {
        type: "multiple-choice",
        title: "Leggere da una Map",
        description:
          "Cosa stampa questo codice?\n\nconst m = new Map([[\"a\", 1], [\"b\", 2]]);\nm.set(\"a\", 5);\nconsole.log(m.size, m.get(\"a\"));",
        difficulty: "facile",
        options: ["`3 1`", "`2 5`", "`3 5`", "`2 1`"],
        correct: 1,
        explanation:
          "`set` con una chiave già esistente sovrascrive il valore invece di aggiungere una nuova coppia: la Map contiene ancora 2 chiavi e `get(\"a\")` restituisce 5.",
      },
      {
        type: "multiple-choice",
        title: "Set con oggetti",
        description:
          "Cosa stampa questo codice?\n\nconst carrello = new Set();\ncarrello.add({ id: 1 });\ncarrello.add({ id: 1 });\nconst p = { id: 2 };\ncarrello.add(p);\ncarrello.add(p);\nconsole.log(carrello.size);",
        difficulty: "difficile",
        options: [
          "`2` - gli oggetti con lo stesso contenuto vengono considerati uguali",
          "`4` - un Set non elimina mai gli oggetti duplicati",
          "`1` - tutti gli oggetti vengono considerati lo stesso valore",
          "`3` - i due `{ id: 1 }` sono oggetti distinti, mentre `p` è lo stesso oggetto aggiunto due volte",
        ],
        correct: 3,
        explanation:
          "Set confronta come `===`: due oggetti scritti separatamente sono due oggetti diversi anche se hanno lo stesso contenuto, quindi `{ id: 1 }` viene conservato due volte. La variabile `p`, invece, punta sempre allo stesso oggetto: la seconda `add(p)` viene ignorata. Totale: 3. Non è 2 (il contenuto non conta), né 4 (i riferimenti identici vengono scartati), né 1.",
      },
    ],
  },

  modules: {
    sections: [
      {
        type: "text",
        content:
          "Quando un'applicazione cresce, tenere tutto il codice in un solo file diventa ingestibile. I **moduli ES** permettono di dividere il codice in file separati che si scambiano funzionalità. In questa lezione vediamo anche alcuni operatori moderni, *optional chaining* (`?.`) e *nullish coalescing* (`??`), per scrivere codice più sicuro e conciso.",
      },
      {
        type: "heading",
        content: "ES Modules: import ed export",
      },
      {
        type: "text",
        content:
          "Con `export` un file rende disponibili all'esterno funzioni, variabili o oggetti; con `import` un altro file li utilizza. Ogni file è un modulo con il proprio scope: le variabili non esportate restano private e non \"inquinano\" lo scope globale.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Named export e import",
        code: `// --- utils.js ---
// Named export: si esportano singole funzionalità, ognuna col suo nome
export function formattaPrezzo(prezzo) {
  return prezzo.toFixed(2) + " €";
}

export const IVA = 0.22;

export function calcolaTotale(prodotti) {
  return prodotti.reduce((somma, p) => somma + p.prezzo, 0);
}

const segreto = 42; // non esportato: visibile solo in utils.js

// --- app.js ---
// Named import: si usano le graffe { } con gli stessi nomi
import { formattaPrezzo, IVA } from "./utils.js";

// Si può rinominare con "as"
import { calcolaTotale as totale } from "./utils.js";

// Importare tutto come un unico oggetto (namespace)
import * as Utils from "./utils.js";
console.log(Utils.IVA); // 0.22`,
      },
      {
        type: "code",
        language: "javascript",
        title: "Default export",
        code: `// --- saluta.js ---
// Default export: al massimo uno per file
export default function saluta(nome) {
  return "Ciao, " + nome + "!";
}

// --- app.js ---
// Default import: senza graffe, con un nome a scelta
import saluta from "./saluta.js";
import ciao from "./saluta.js"; // stessa funzione, nome diverso

// Si possono combinare default e named export
// --- config.js ---
export default { tema: "scuro" };
export const VERSIONE = "2.0";

// --- app.js ---
import config, { VERSIONE } from "./config.js";`,
      },
      {
        type: "subheading",
        content: "Re-export: un unico punto di accesso",
      },
      {
        type: "code",
        language: "javascript",
        title: "Re-export da un file indice",
        code: `// --- utils/index.js ---
// Riesportare ciò che è definito in altri moduli
export { default as saluta } from "./saluta.js";
export { formattaPrezzo, calcolaTotale } from "./prezzi.js";

// --- app.js ---
// Un solo import per tutta la cartella
import { saluta, formattaPrezzo } from "./utils";`,
      },
      {
        type: "info",
        content:
          "Nel browser un file diventa un modulo se caricato con `<script type=\"module\">`. Nei progetti React e Next.js, invece, import ed export vengono gestiti automaticamente dagli strumenti di build: li userai in ogni file. Nota: gli esercizi di questo tutorial vengono eseguiti in un unico file, quindi qui import ed export si possono solo scrivere, non eseguire.",
      },
      {
        type: "heading",
        content: "Optional chaining (?.)",
      },
      {
        type: "text",
        content:
          "Leggere una proprietà di `undefined` o `null` causa un errore (`TypeError: Cannot read properties of undefined`). L'operatore `?.` permette di accedere a proprietà annidate in sicurezza: se il valore a sinistra è `null` o `undefined`, l'espressione si ferma e restituisce semplicemente `undefined`, senza errori.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Optional chaining in pratica",
        code: `const utente = {
  nome: "Mario",
  indirizzo: {
    citta: "Roma",
  },
};

// Senza optional chaining: errore!
// const tel = utente.contatti.telefono; // TypeError

// Con optional chaining: accesso sicuro
const telefono = utente.contatti?.telefono; // undefined (nessun errore)
const citta = utente.indirizzo?.citta;      // "Roma"

// Funziona anche con le funzioni salvate in una proprietà:
// la chiama solo se esiste
const risultato = utente.saluta?.(); // undefined

// E con l'accesso tramite [] (array o chiavi dinamiche)
const primoOrdine = utente.ordini?.[0]; // undefined

// Insieme a ?? per avere un valore di default
const lingua = utente.preferenze?.lingua ?? "it"; // "it"`,
      },
      {
        type: "heading",
        content: "Nullish coalescing (??) vs OR (||)",
      },
      {
        type: "text",
        content:
          "L'operatore `??` restituisce il valore a destra solo se quello a sinistra è `null` o `undefined`. L'operatore `||` invece passa al valore di destra per qualsiasi valore *falsy*, quindi anche per `0`, stringa vuota e `false`: questo spesso causa bug quando quei valori sono legittimi.",
      },
      {
        type: "code",
        language: "javascript",
        title: "?? vs || : la differenza cruciale",
        code: `// || reagisce a tutti i falsy: null, undefined, 0, "", false, NaN
const a = 0 || 42;       // 42  (0 è falsy!)
const b = "" || "N/D";   // "N/D" (stringa vuota è falsy!)
const c = false || true; // true

// ?? reagisce SOLO a null e undefined
const d = 0 ?? 42;         // 0  (0 è un valore valido!)
const e = "" ?? "N/D";     // "" (stringa vuota è un valore valido!)
const f = null ?? 42;      // 42
const g = undefined ?? 42; // 42

// Caso pratico: il volume scelto dall'utente può essere 0
const preferenze = { volume: 0 };
const volume1 = preferenze.volume ?? 50; // 0  (corretto!)
const volume2 = preferenze.volume || 50; // 50 (bug: l'utente aveva scelto 0)`,
      },
      {
        type: "warning",
        content:
          "Errore comune: usare `||` quando si intende `??`. Se `0`, `false` o una stringa vuota sono valori legittimi, usa `??` per non sovrascriverli accidentalmente.",
      },
      {
        type: "heading",
        content: "Assegnamento logico (??=, ||=, &&=)",
      },
      {
        type: "text",
        content:
          "Gli operatori di assegnamento logico combinano un controllo con un assegnamento in una sola espressione. Sono molto utili per inizializzare valori mancanti.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Assegnamento logico",
        code: `// ??= assegna solo se il valore è null o undefined
const config = {};
config.tema ??= "chiaro";
// equivale a: if (config.tema === null || config.tema === undefined) config.tema = "chiaro";
console.log(config.tema); // "chiaro"

config.tema ??= "scuro";
console.log(config.tema); // "chiaro" (già assegnato, non cambia)

// ||= assegna se il valore è falsy
let quantita = 0;
quantita ||= 10;
console.log(quantita); // 10 (0 è falsy!)

// &&= assegna solo se il valore è truthy
const utente = { nome: "Mario" };
utente.nome &&= utente.nome.toUpperCase();
console.log(utente.nome); // "MARIO"

utente.email &&= utente.email.trim();
// non fa nulla perché utente.email è undefined (falsy)`,
      },
      {
        type: "tip",
        content:
          "Quando leggi dati che arrivano da un server o da un form, non dare mai per scontato che ogni campo esista: combina `?.` per accedere in sicurezza e `??` per fornire un valore di default sensato.",
      },
    ],
    exercises: [
      {
        type: "code",
        title: "Accesso sicuro a dati annidati",
        description:
          "Scrivi una funzione `getCitta(risposta)` che restituisce la città dell'utente, cioè `risposta.dati.utente.indirizzo.citta`. Qualunque livello può mancare (anche `risposta` stessa può essere `undefined`): in quel caso restituisci `\"Sconosciuta\"`.\n\nUsa optional chaining (`?.`) e nullish coalescing (`??`).",
        difficulty: "facile",
        starterCode: `function getCitta(risposta) {
  // scrivi qui
}

const conCitta = { dati: { utente: { nome: "Anna", indirizzo: { citta: "Torino" } } } };
const senzaIndirizzo = { dati: { utente: { nome: "Luigi" } } };

console.log(getCitta(conCitta));       // "Torino"
console.log(getCitta(senzaIndirizzo)); // "Sconosciuta"`,
        solution: `function getCitta(risposta) {
  return risposta?.dati?.utente?.indirizzo?.citta ?? "Sconosciuta";
}

const conCitta = { dati: { utente: { nome: "Anna", indirizzo: { citta: "Torino" } } } };
const senzaIndirizzo = { dati: { utente: { nome: "Luigi" } } };

console.log(getCitta(conCitta));       // "Torino"
console.log(getCitta(senzaIndirizzo)); // "Sconosciuta"`,
        validate: `if (typeof getCitta !== "function") return "Definisci la funzione getCitta";
const casi = [
  [{ dati: { utente: { indirizzo: { citta: "Torino" } } } }, "Torino"],
  [{ dati: { utente: { indirizzo: { citta: "Bari" } } } }, "Bari"],
  [{ dati: { utente: { nome: "Luigi" } } }, "Sconosciuta"],
  [{ dati: {} }, "Sconosciuta"],
  [{}, "Sconosciuta"],
  [undefined, "Sconosciuta"],
];
for (const [input, atteso] of casi) {
  let r;
  try {
    r = getCitta(input);
  } catch (e) {
    return "getCitta(" + $format(input) + ") lancia un errore: usa ?. a ogni livello, anche su risposta";
  }
  if (r !== atteso) return "getCitta(" + $format(input) + ") dovrebbe restituire " + $format(atteso) + ", invece restituisce " + $format(r);
}
if (!$codeNoComments.includes("?.")) return "Usa l'optional chaining (?.)";
if (!$codeNoComments.includes("??")) return "Usa ?? per il valore di default";
return true;`,
      },
      {
        type: "code",
        title: "Il volume a zero",
        description:
          "Scrivi una funzione `getVolume(preferenze)` che restituisce `preferenze.volume`, oppure `50` se il volume non è impostato (`null` o `undefined`).\n\nAttenzione: `0` è un volume valido (audio disattivato) e deve essere restituito così com'è.",
        difficulty: "facile",
        starterCode: `function getVolume(preferenze) {
  return preferenze.volume || 50;
}

console.log(getVolume({ volume: 80 })); // 80
console.log(getVolume({}));             // 50
console.log(getVolume({ volume: 0 }));  // 0`,
        solution: `function getVolume(preferenze) {
  return preferenze.volume ?? 50;
}

console.log(getVolume({ volume: 80 })); // 80
console.log(getVolume({}));             // 50
console.log(getVolume({ volume: 0 }));  // 0`,
        validate: `if (typeof getVolume !== "function") return "Definisci la funzione getVolume";
if (getVolume({ volume: 80 }) !== 80) return "getVolume({ volume: 80 }) dovrebbe restituire 80";
if (getVolume({}) !== 50) return "getVolume({}) dovrebbe restituire 50";
if (getVolume({ volume: null }) !== 50) return "getVolume({ volume: null }) dovrebbe restituire 50";
if (getVolume({ volume: 0 }) !== 0) return "getVolume({ volume: 0 }) dovrebbe restituire 0: || tratta 0 come falsy, quale operatore reagisce solo a null e undefined?";
return true;`,
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
          "`??` restituisce il lato destro solo per null/undefined, quindi `0 ?? 99` dà 0. `||` restituisce il lato destro per qualsiasi valore falsy (incluso 0), quindi `0 || 99` dà 99.",
      },
      {
        type: "code",
        mode: "static",
        title: "Scrivere export e import",
        description:
          "In questo editor simuliamo due file separati con dei commenti (il codice non viene eseguito, viene solo controllato).\n\nNel file `matematica.js`:\n1. esporta con un **named export** una funzione `somma(a, b)`\n2. esporta come **default export** una funzione `moltiplica(a, b)`\n\nNel file `app.js` importa entrambe con un'unica riga di import da `\"./matematica.js\"`.",
        difficulty: "medio",
        starterCode: `// --- matematica.js ---
function somma(a, b) {
  return a + b;
}

function moltiplica(a, b) {
  return a * b;
}

// --- app.js ---
// importa qui somma e moltiplica

console.log(somma(2, 3), moltiplica(2, 3));`,
        solution: `// --- matematica.js ---
export function somma(a, b) {
  return a + b;
}

export default function moltiplica(a, b) {
  return a * b;
}

// --- app.js ---
import moltiplica, { somma } from "./matematica.js";

console.log(somma(2, 3), moltiplica(2, 3));`,
        validate: `const c = $codeNoComments;
const namedSomma = /export\\s+(function\\s+somma\\b|const\\s+somma\\b)/.test(c) || /export\\s*\\{[^}]*\\bsomma\\b[^}]*\\}/.test(c);
if (!namedSomma) return "Esporta somma con un named export: export function somma(a, b) { ... }";
if (/export\\s+default\\s+(function\\s+)?somma\\b/.test(c)) return "somma deve essere un named export, non il default";
if (!/export\\s+default\\s+(function\\s+)?moltiplica\\b/.test(c)) return "Esporta moltiplica come default: export default function moltiplica(a, b) { ... }";
if (!/import\\s+moltiplica\\s*,\\s*\\{\\s*somma\\s*\\}\\s*from\\s*["']\\.\\/matematica(\\.js)?["']/.test(c)) return "Importa entrambe in una sola riga: il default senza graffe, il named tra graffe (import moltiplica, { somma } from \\"./matematica.js\\")";
return true;`,
        solutionExplanation:
          "Il default export si importa senza graffe (con un nome a scelta), i named export tra graffe con il loro nome: nella stessa riga il default viene sempre per primo, seguito dalla virgola e dalle graffe.",
      },
      {
        type: "multiple-choice",
        title: "Import e export",
        description:
          "Dato il file:\n\n// utils.js\nexport default function hello() {}\nexport const VERSION = '1.0';\n\nQuale import è corretto?",
        difficulty: "medio",
        options: [
          "`import { hello, VERSION } from './utils'`",
          "`import hello, { VERSION } from './utils'`",
          "`import { default as hello, VERSION } from './utils'`",
          "Sia la seconda sia la terza opzione sono corrette",
        ],
        correct: 3,
        explanation:
          "Un default export si importa senza graffe (opzione 2) oppure con `{ default as nomeAScelta }` (opzione 3). Entrambe le sintassi sono valide. La prima opzione è sbagliata perché tratta `hello` come un named export.",
      },
      {
        type: "multiple-choice",
        title: "Optional chaining e array",
        description:
          "Cosa stampa questo codice?\n\nconst utente = { nome: \"Anna\", ordini: [] };\nconsole.log(utente.ordini?.[0]?.totale ?? \"Nessun ordine\");",
        difficulty: "medio",
        options: [
          "`\"Nessun ordine\"`",
          "`undefined`",
          "Un TypeError, perché l'array è vuoto",
          "`[]`",
        ],
        correct: 0,
        explanation:
          "`utente.ordini` esiste ed è un array vuoto, quindi `[0]` vale `undefined`; il secondo `?.` si ferma senza errori e restituisce `undefined`, e `??` lo sostituisce con \"Nessun ordine\". Non viene stampato `undefined` grazie a `??`, non c'è alcun TypeError grazie a `?.`, e `[]` non è mai il risultato perché si legge un elemento, non l'array.",
      },
    ],
  },

  "dates-json": {
    sections: [
      {
        type: "text",
        content:
          "Quasi ogni applicazione lavora con delle date: la scadenza di un'attività, il giorno di un evento in calendario, la data di un ordine. Dal server le date arrivano quasi sempre come **stringhe** dentro dati in formato **JSON**, e tocca a noi mostrarle, ordinarle e validarle. In questa lezione vediamo l'oggetto `Date` di JavaScript e i suoi limiti, come lavorare comodamente con le date in formato stringa, come usare JSON e qualche tecnica per trasformare e raggruppare oggetti. Infine scopriamo cos'è **npm** e usiamo la nostra prima libreria esterna: **dayjs**.",
      },
      {
        type: "heading",
        content: "L'oggetto Date",
      },
      {
        type: "text",
        content:
          "`Date` è l'oggetto nativo di JavaScript per rappresentare un istante nel tempo. `new Date()` crea la data e l'ora attuali; `new Date(\"2026-06-01\")` crea una data partendo da una stringa; `new Date(anno, mese, giorno)` la crea partendo dai numeri. Per leggerne le parti si usano metodi come `getFullYear()`, `getMonth()`, `getDate()` (il giorno del mese) e `getDay()` (il giorno della settimana, da 0 = domenica a 6 = sabato).",
      },
      {
        type: "code",
        language: "javascript",
        title: "Creare e leggere una Date",
        code: `const adesso = new Date(); // data e ora di questo momento

const concerto = new Date(2026, 5, 20); // 20 giugno 2026 (attenzione al mese!)
console.log(concerto.getFullYear()); // 2026
console.log(concerto.getMonth());    // 5  -> i mesi partono da 0: 5 = giugno
console.log(concerto.getDate());     // 20
console.log(concerto.getDay());      // 6  -> sabato

// Confrontare due date: getTime() restituisce i millisecondi dal 1/1/1970
const inizio = new Date(2026, 5, 1);
console.log(concerto.getTime() > inizio.getTime()); // true

// Differenza in giorni
const giorni = (concerto.getTime() - inizio.getTime()) / (1000 * 60 * 60 * 24);
console.log(giorni); // 19`,
      },
      {
        type: "warning",
        content:
          "Nel costruttore `new Date(anno, mese, giorno)` e in `getMonth()` i mesi vanno da **0 (gennaio) a 11 (dicembre)**, mentre i giorni partono da 1. È una delle fonti di bug più comuni: per scrivere \"giugno\" devi passare 5.",
      },
      {
        type: "subheading",
        content: "I limiti di Date",
      },
      {
        type: "text",
        content:
          "`Date` ha alcuni comportamenti che sorprendono. Se gli passi un giorno che non esiste, non segnala nessun errore: \"corregge\" la data in silenzio spostandosi nel mese successivo. Se la stringa non è una data, crea una *Invalid Date*, il cui `getTime()` vale `NaN`. Inoltre lavora sempre con un orario e un fuso orario, anche quando a te interessa solo il giorno.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Comportamenti da conoscere",
        code: `// Il 31 febbraio non esiste: Date lo trasforma nel 3 marzo, senza errori
const d = new Date(2026, 1, 31);
console.log(d.getMonth(), d.getDate()); // 2 3  -> 3 marzo

// Una stringa che non è una data produce una "Invalid Date"
const sbagliata = new Date("ciao");
console.log(sbagliata.getTime());        // NaN
console.log(isNaN(sbagliata.getTime())); // true -> così si riconosce

// Le Date sono oggetti: === confronta il riferimento, non il giorno
console.log(new Date(2026, 0, 1) === new Date(2026, 0, 1)); // false`,
      },
      {
        type: "info",
        content:
          "`new Date(\"2026-06-01\")` interpreta la stringa come mezzanotte nel fuso orario UTC (quello di riferimento di Greenwich). Mostrata in un fuso orario \"indietro\", come quello di New York, la stessa data diventa il 31 maggio. Per questo molte applicazioni conservano le date che non hanno bisogno dell'ora come semplici stringhe e le trasformano solo quando devono mostrarle.",
      },
      {
        type: "heading",
        content: "Date come stringhe ISO",
      },
      {
        type: "text",
        content:
          "Il formato standard per scambiare date è **ISO 8601**: `\"yyyy-MM-dd\"`, cioè anno di 4 cifre, mese di 2 cifre e giorno di 2 cifre, separati da trattini (es. `\"2026-06-01\"`). Ha una proprietà preziosa: siccome va dall'unità più grande (l'anno) alla più piccola (il giorno) e ogni parte ha sempre lo stesso numero di cifre, **l'ordine alfabetico delle stringhe coincide con l'ordine cronologico**. Puoi quindi confrontarle con `<` e `>` e ordinarle come normali stringhe, senza creare nessuna Date.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Confrontare e ordinare stringhe ISO",
        code: `console.log("2026-03-15" < "2026-11-02"); // true: marzo viene prima di novembre
console.log("2025-12-31" < "2026-01-01"); // true: conta prima l'anno

const scadenze = ["2026-11-02", "2026-03-15", "2025-12-31"];
const ordinate = [...scadenze].sort();
console.log(ordinate); // ["2025-12-31", "2026-03-15", "2026-11-02"]

// Le attività scadute: la data di scadenza viene prima di oggi
const oggi = "2026-06-01";
const scadute = scadenze.filter((data) => data < oggi);
console.log(scadute); // ["2026-03-15", "2025-12-31"]`,
      },
      {
        type: "warning",
        content:
          "Il trucco funziona solo se tutte le stringhe hanno lo stesso formato con gli zeri iniziali. `\"2026-6-1\"` contro `\"2026-10-01\"` dà un risultato sbagliato, e il formato italiano `\"dd/MM/yyyy\"` non si ordina mai correttamente come stringa: `\"02/03/2027\" < \"10/01/2026\"` è true, anche se il 2027 viene dopo!",
      },
      {
        type: "subheading",
        content: "Formattare una data per l'utente",
      },
      {
        type: "text",
        content:
          "All'utente italiano vogliamo mostrare `\"01/06/2026\"`, non `\"2026-06-01\"`. Con una stringa ISO basta dividerla con `split(\"-\")` e ricomporre le parti in un altro ordine. Partendo invece da una Date, si leggono le parti con i metodi `get...` e si aggiungono gli zeri mancanti con `padStart`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Da ISO a gg/mm/aaaa e viceversa",
        code: `// Da "2026-06-01" a "01/06/2026"
function formatDate(iso) {
  if (!iso) return ""; // nessuna data: stringa vuota
  const [anno, mese, giorno] = iso.split("-");
  return giorno + "/" + mese + "/" + anno;
}
console.log(formatDate("2026-06-01")); // "01/06/2026"

// Da "15/05/2026" a "2026-05-15" (per esempio prima di inviarla al server)
function toIsoDate(testo) {
  const [giorno, mese, anno] = testo.split("/");
  return anno + "-" + mese + "-" + giorno;
}
console.log(toIsoDate("15/05/2026")); // "2026-05-15"

// Da una Date alla stringa ISO del giorno
function dateToIso(data) {
  const mese = String(data.getMonth() + 1).padStart(2, "0"); // +1 perché parte da 0
  const giorno = String(data.getDate()).padStart(2, "0");
  return \`\${data.getFullYear()}-\${mese}-\${giorno}\`;
}
console.log(dateToIso(new Date(2026, 0, 5))); // "2026-01-05"`,
      },
      {
        type: "heading",
        content: "Ordinare stringhe con localeCompare",
      },
      {
        type: "text",
        content:
          "Senza funzione di confronto, `sort()` confronta i codici dei caratteri: tutte le maiuscole vengono prima delle minuscole e le lettere accentate finiscono in fondo. Per ordinare testi in modo naturale si usa `a.localeCompare(b)`, che restituisce un numero negativo se `a` viene prima di `b`, positivo se viene dopo e 0 se sono equivalenti: proprio ciò che si aspetta la funzione di confronto di `sort`. Funziona anche con le stringhe ISO.",
      },
      {
        type: "code",
        language: "javascript",
        title: "sort() contro localeCompare",
        code: `const titoli = ["zucchine al forno", "Arancini", "éclair", "biscotti"];

console.log([...titoli].sort());
// ["Arancini", "biscotti", "zucchine al forno", "éclair"]  -> "é" finisce in fondo

console.log([...titoli].sort((a, b) => a.localeCompare(b)));
// ["Arancini", "biscotti", "éclair", "zucchine al forno"]  -> ordine naturale

// Array di oggetti: si confronta la proprietà che interessa
const eventi = [
  { titolo: "Mostra", data: "2026-07-10" },
  { titolo: "Concerto", data: "2026-06-20" },
];
const perData = [...eventi].sort((a, b) => a.data.localeCompare(b.data));
console.log(perData.map((e) => e.titolo)); // ["Concerto", "Mostra"]

// Ordine decrescente: basta invertire a e b
const piuRecenti = [...eventi].sort((a, b) => b.data.localeCompare(a.data));`,
      },
      {
        type: "subheading",
        content: "Valori mancanti nell'ordinamento",
      },
      {
        type: "text",
        content:
          "Se a un elemento manca la proprietà, `a.data.localeCompare(...)` lancia un errore perché `undefined` non ha metodi. La soluzione è sostituire il valore mancante con un **default** grazie a `??`. Il default si sceglie in base a dove vuoi mettere gli elementi incompleti: `\"9999\"` viene dopo qualsiasi data ISO (quindi in fondo), `\"\"` viene prima di tutto (quindi in cima).",
      },
      {
        type: "code",
        language: "javascript",
        title: "Default per i valori mancanti",
        code: `const attivita = [
  { titolo: "Pagare le bollette", scadenza: "2026-06-30" },
  { titolo: "Riordinare la cantina" }, // nessuna scadenza
  { titolo: "Rinnovare l'abbonamento", scadenza: "2026-06-05" },
];

// Le attività senza scadenza finiscono in fondo
const ordinate = [...attivita].sort((a, b) =>
  (a.scadenza ?? "9999").localeCompare(b.scadenza ?? "9999")
);
console.log(ordinate.map((a) => a.titolo));
// ["Rinnovare l'abbonamento", "Pagare le bollette", "Riordinare la cantina"]

// Per i nomi mancanti, invece, una stringa vuota li porta in cima
const contatti = [{ nome: "Luca" }, {}, { nome: "Anna" }];
contatti.sort((a, b) => (a.nome ?? "").localeCompare(b.nome ?? ""));`,
      },
      {
        type: "heading",
        content: "JSON: stringify e parse",
      },
      {
        type: "text",
        content:
          "**JSON** (*JavaScript Object Notation*) è un formato di testo per rappresentare dati: assomiglia molto agli oggetti JavaScript, ma le chiavi sono sempre tra virgolette doppie e i valori possono essere solo stringhe, numeri, booleani, `null`, array e oggetti. È il formato con cui client e server si scambiano i dati. `JSON.stringify(valore)` trasforma un valore in testo JSON; `JSON.parse(testo)` fa il contrario e ricostruisce il valore.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Da oggetto a testo e ritorno",
        code: `const ordine = { id: 7, prodotti: ["penna", "quaderno"], pagato: false };

const testo = JSON.stringify(ordine);
console.log(testo); // '{"id":7,"prodotti":["penna","quaderno"],"pagato":false}'
console.log(typeof testo); // "string"

// Il terzo argomento indenta il risultato: comodo per leggerlo
console.log(JSON.stringify(ordine, null, 2));

const copia = JSON.parse(testo);
console.log(copia.prodotti[1]); // "quaderno"

// Cosa si perde: undefined e funzioni spariscono, le Date diventano stringhe
const evento = { titolo: "Festa", note: undefined, quando: new Date("2026-06-01") };
console.log(JSON.stringify(evento)); // '{"titolo":"Festa","quando":"2026-06-01T00:00:00.000Z"}'

// Un testo non valido fa lanciare un errore a JSON.parse
try {
  JSON.parse("{ id: 7 }"); // chiave senza virgolette: non è JSON
} catch (error) {
  console.log("JSON non valido");
}`,
      },
      {
        type: "subheading",
        content: "Confrontare due oggetti con JSON.stringify",
      },
      {
        type: "text",
        content:
          "Due oggetti diversi non sono mai `===`, anche con lo stesso contenuto. Per sapere se due oggetti *semplici* (solo stringhe, numeri, booleani, array e oggetti annidati) contengono gli stessi dati, un trucco veloce è confrontare le loro versioni in JSON. Si usa spesso per capire se l'utente ha davvero modificato una riga prima di salvarla.",
      },
      {
        type: "code",
        language: "javascript",
        title: "È cambiato qualcosa?",
        code: `const originale = { titolo: "Spesa", fatto: false };
const modificato = { titolo: "Spesa", fatto: false };

console.log(originale === modificato); // false: due oggetti distinti
console.log(JSON.stringify(originale) === JSON.stringify(modificato)); // true

function isCambiato(prima, dopo) {
  return JSON.stringify(prima) !== JSON.stringify(dopo);
}
console.log(isCambiato(originale, { titolo: "Spesa", fatto: true })); // true`,
      },
      {
        type: "warning",
        content:
          "Il trucco ha dei limiti: dipende dall'**ordine delle chiavi** (`{ a: 1, b: 2 }` e `{ b: 2, a: 1 }` danno stringhe diverse), ignora le proprietà con valore `undefined` (quindi `{ a: undefined }` risulta uguale a `{}`) e non gestisce Map, Set e funzioni. Usalo solo per oggetti semplici costruiti sempre nello stesso modo.",
      },
      {
        type: "heading",
        content: "Trasformare oggetti con Object.fromEntries",
      },
      {
        type: "text",
        content:
          "Gli array hanno `map` e `filter`, gli oggetti no. Ma possiamo passare per un array: `Object.entries(obj)` restituisce le coppie `[chiave, valore]`, su cui usiamo `map` o `filter`, e poi `Object.fromEntries(coppie)` ricostruisce un oggetto. `Object.fromEntries` accetta qualsiasi array di coppie, quindi si può usare anche per costruire un oggetto partendo da un elenco di chiavi.",
      },
      {
        type: "code",
        language: "javascript",
        title: "entries, map, fromEntries",
        code: `const prezzi = { penna: 1.5, quaderno: 3, zaino: 25 };

// Applicare uno sconto del 10% a tutti i prezzi
const scontati = Object.fromEntries(
  Object.entries(prezzi).map(([prodotto, prezzo]) => [prodotto, prezzo * 0.9])
);
console.log(scontati); // { penna: 1.35, quaderno: 2.7, zaino: 22.5 }

// Tenere solo i prodotti sotto i 10 euro
const economici = Object.fromEntries(
  Object.entries(prezzi).filter(([, prezzo]) => prezzo < 10)
);
console.log(economici); // { penna: 1.5, quaderno: 3 }

// Costruire un oggetto da un elenco di campi: i campi vuoti del form diventano null
const CAMPI = ["nome", "email", "telefono"];
const form = { nome: "Anna", email: "anna@example.com", telefono: "", extra: "x" };
const body = Object.fromEntries(CAMPI.map((campo) => [campo, form[campo] === "" ? null : form[campo]]));
console.log(body); // { nome: "Anna", email: "anna@example.com", telefono: null }`,
      },
      {
        type: "subheading",
        content: "Raggruppare con ??=",
      },
      {
        type: "text",
        content:
          "Un'operazione frequente è raggruppare gli elementi di un array per una loro proprietà: gli eventi per mese, i libri per autore, gli ordini per stato. L'operatore `??=` (visto nella lezione sui moduli) lo rende molto compatto: `gruppi[chiave] ??= []` crea l'array solo se non esiste ancora, e l'intera espressione **restituisce il valore della proprietà**, quindi possiamo chiamarci sopra subito `.push(...)`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Eventi raggruppati per mese",
        code: `const eventi = [
  { titolo: "Concerto", data: "2026-06-20" },
  { titolo: "Mostra", data: "2026-07-10" },
  { titolo: "Cinema all'aperto", data: "2026-06-28" },
];

const perMese = {};
for (const evento of eventi) {
  const mese = evento.data.slice(0, 7); // "2026-06"
  (perMese[mese] ??= []).push(evento.titolo);
}
console.log(perMese);
// { "2026-06": ["Concerto", "Cinema all'aperto"], "2026-07": ["Mostra"] }

// Lo stesso schema funziona con un Set, per evitare i doppioni
const luoghiPerCitta = {};
(luoghiPerCitta["Roma"] ??= new Set()).add("Auditorium");

// E con Object.fromEntries si ottiene un riepilogo
const conteggio = Object.fromEntries(
  Object.entries(perMese).map(([mese, titoli]) => [mese, titoli.length])
);
console.log(conteggio); // { "2026-06": 2, "2026-07": 1 }`,
      },
      {
        type: "heading",
        content: "npm e i pacchetti",
      },
      {
        type: "text",
        content:
          "Non serve scrivere tutto da zero: esistono migliaia di **pacchetti** (o librerie), cioè moduli scritti da altri sviluppatori e pubblicati online. **npm** (*Node Package Manager*) è lo strumento che li scarica e li tiene aggiornati. Si usa dal terminale, nella cartella del progetto: `npm install nome-pacchetto` scarica il pacchetto nella cartella `node_modules` e lo annota nel file `package.json`, l'elenco delle dipendenze del progetto. Da quel momento lo si usa con un normale `import` (come visto nella lezione sui moduli), indicando il nome del pacchetto al posto del percorso di un file.",
      },
      {
        type: "code",
        language: "bash",
        title: "Installare un pacchetto (nel terminale)",
        code: `npm install dayjs

# package.json ora contiene, tra le dipendenze:
#   "dependencies": { "dayjs": "^1.11.13" }

# Su un altro computer, per installare tutte le dipendenze elencate:
npm install`,
      },
      {
        type: "info",
        content:
          "La cartella `node_modules` può diventare enorme e non va condivisa né salvata nel controllo di versione: basta `package.json`, perché chiunque può ricreare `node_modules` con `npm install`.",
      },
      {
        type: "heading",
        content: "La libreria dayjs",
      },
      {
        type: "text",
        content:
          "**dayjs** è una libreria piccola e molto diffusa che rende semplici le operazioni sulle date. `dayjs()` crea la data attuale, `dayjs(\"2026-06-01\")` interpreta una stringa ISO; il risultato ha metodi come `format`, `add`, `subtract`, `isBefore`, `isAfter`, `diff` e `isValid`. Gli oggetti dayjs sono **immutabili**: `add` non modifica la data originale, ne restituisce una nuova. Nel formato i segnaposto sono `YYYY` (anno), `MM` (mese), `DD` (giorno), `HH` (ore) e `mm` (minuti).",
      },
      {
        type: "code",
        language: "javascript",
        title: "dayjs in pratica (illustrativo)",
        code: `import dayjs from "dayjs";

const concerto = dayjs("2026-06-20");

console.log(concerto.format("DD/MM/YYYY"));       // "20/06/2026"
console.log(concerto.format("YYYY-MM-DD HH:mm")); // "2026-06-20 00:00"

const promemoria = concerto.subtract(7, "day");   // una settimana prima
console.log(promemoria.format("DD/MM/YYYY"));     // "13/06/2026"
console.log(concerto.format("DD/MM/YYYY"));       // "20/06/2026": non è cambiata

console.log(concerto.isBefore("2026-07-01"));     // true
console.log(concerto.diff("2026-06-01", "day"));  // 19

// Utile per mostrare una data che potrebbe mancare
const formatDate = (value) => (value ? dayjs(value).format("DD/MM/YYYY") : "");`,
      },
      {
        type: "subheading",
        content: "Validare una data con il parsing stretto",
      },
      {
        type: "text",
        content:
          "Per interpretare date in un formato diverso da ISO, come quello italiano scritto dall'utente in un form, serve il **plugin** `customParseFormat`: si importa e si registra una volta con `dayjs.extend(...)`. Poi si passa il formato come secondo argomento: `dayjs(\"15/05/2026\", \"DD/MM/YYYY\")`. Il terzo argomento `true` attiva il **parsing stretto**: la stringa deve rispettare esattamente il formato e la data deve esistere. Senza di esso dayjs si comporta come Date e trasforma il 31/02 nel 3 marzo.",
      },
      {
        type: "code",
        language: "javascript",
        title: "isValidDate con dayjs (illustrativo)",
        code: `import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat); // una sola volta, in cima al file

// Senza parsing stretto: la data impossibile viene "corretta"
console.log(dayjs("31/02/2026", "DD/MM/YYYY").isValid()); // true (diventa il 3 marzo!)

// Con parsing stretto: la data impossibile viene rifiutata
const isValidDate = (value) => dayjs(value, "DD/MM/YYYY", true).isValid();

console.log(isValidDate("15/05/2026")); // true
console.log(isValidDate("31/02/2026")); // false
console.log(isValidDate("5/5/2026"));   // false: mancano gli zeri
console.log(isValidDate("ciao"));       // false`,
      },
      {
        type: "info",
        content:
          "Gli esercizi di questo tutorial vengono eseguiti senza librerie esterne: per questo gli esempi con dayjs sono illustrativi, e negli esercizi realizzerai le stesse funzioni in JavaScript puro. In un vero progetto, dopo `npm install dayjs`, il codice qui sopra funziona così com'è.",
      },
      {
        type: "tip",
        content:
          "Conserva e confronta le date nel formato ISO `\"yyyy-MM-dd\"` e trasformale nel formato dell'utente solo nel momento in cui le mostri. Fai il contrario quando l'utente le inserisce: valida subito il testo e convertilo in ISO prima di salvarlo o inviarlo al server.",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "Il mese di una Date",
        description:
          "Cosa stampa questo codice?\n\nconst d = new Date(2026, 0, 15);\nconsole.log(d.getMonth(), d.getDate());",
        difficulty: "facile",
        options: ["`1 15`", "`0 15`", "`1 14`", "`0 14`"],
        correct: 1,
        explanation:
          "In `Date` i mesi partono da 0: il secondo argomento `0` indica gennaio e `getMonth()` restituisce di nuovo `0`. I giorni, invece, partono da 1, quindi `getDate()` restituisce 15. Le opzioni con `1` confondono il mese con il numero \"umano\" di gennaio, quelle con `14` applicano per sbaglio lo stesso spostamento ai giorni.",
      },
      {
        type: "multiple-choice",
        title: "Ordinare le date",
        description:
          "Quale di questi array viene ordinato in ordine cronologico da un semplice `.sort()`?",
        difficulty: "medio",
        options: [
          "`[\"10/01/2026\", \"02/03/2027\", \"25/12/2025\"]`",
          "`[\"2026-6-1\", \"2026-10-15\", \"2026-2-3\"]`",
          "`[\"1 marzo 2026\", \"15 gennaio 2026\", \"3 febbraio 2026\"]`",
          "`[\"2026-10-15\", \"2026-02-03\", \"2025-12-25\"]`",
        ],
        correct: 3,
        explanation:
          "Solo il formato ISO `yyyy-MM-dd` con gli zeri iniziali ha l'ordine alfabetico uguale a quello cronologico, perché va dall'anno al giorno con parti di lunghezza fissa. Il formato `dd/MM/yyyy` confronta prima i giorni, le date senza zeri fanno finire `\"2026-10-15\"` prima di `\"2026-2-3\"` (il carattere \"1\" viene prima di \"2\"), e i nomi dei mesi vengono ordinati alfabeticamente.",
      },
      {
        type: "multiple-choice",
        title: "Confronto con JSON.stringify",
        description:
          "Cosa stampa questo codice?\n\nconst a = { nome: \"Anna\", eta: 30 };\nconst b = { eta: 30, nome: \"Anna\" };\nconsole.log(a === b, JSON.stringify(a) === JSON.stringify(b));",
        difficulty: "medio",
        options: ["`false false`", "`false true`", "`true true`", "`true false`"],
        correct: 0,
        explanation:
          "`a === b` è false perché sono due oggetti distinti. Anche il confronto in JSON è false: `JSON.stringify` scrive le chiavi nell'ordine in cui sono state create, quindi produce `'{\"nome\":\"Anna\",\"eta\":30}'` e `'{\"eta\":30,\"nome\":\"Anna\"}'`, due stringhe diverse. È proprio uno dei limiti del trucco: funziona solo se gli oggetti sono costruiti con le chiavi nello stesso ordine.",
      },
      {
        type: "multiple-choice",
        title: "Raggruppare con ??=",
        description:
          "Cosa stampa questo codice?\n\nconst gruppi = {};\nfor (const libro of [\"Dune\", \"Emma\", \"Dracula\"]) {\n  (gruppi[libro[0]] ??= []).push(libro);\n}\nconsole.log(gruppi);",
        difficulty: "difficile",
        options: [
          "`{ D: [\"Dracula\"], E: [\"Emma\"] }`",
          "`{ D: \"Dracula\", E: \"Emma\" }`",
          "`{ D: [\"Dune\", \"Dracula\"], E: [\"Emma\"] }`",
          "Un errore, perché `gruppi.D` all'inizio è undefined",
        ],
        correct: 2,
        explanation:
          "`gruppi[libro[0]] ??= []` crea l'array vuoto solo la prima volta che incontra una lettera e, in ogni caso, restituisce l'array salvato in quella proprietà: `push` aggiunge quindi il libro all'array giusto. \"Dune\" e \"Dracula\" finiscono entrambi sotto `D`. Non viene sovrascritto nulla (`??=` assegna solo se il valore è null o undefined), i valori sono array e non stringhe, e non c'è errore proprio perché `??=` crea l'array mancante.",
      },
      {
        type: "multiple-choice",
        title: "Validare con dayjs",
        description:
          "Vuoi che `isValid` rifiuti le date impossibili scritte dall'utente, come `\"31/02/2026\"`. Dopo aver registrato il plugin `customParseFormat`, quale istruzione usi?",
        difficulty: "medio",
        options: [
          "`dayjs(\"31/02/2026\").isValid()`",
          "`dayjs(\"31/02/2026\", \"DD/MM/YYYY\").isValid()`",
          "`dayjs(\"31/02/2026\", \"DD/MM/YYYY\", true).isValid()`",
          "`dayjs(\"31/02/2026\").format(\"DD/MM/YYYY\") !== \"\"`",
        ],
        correct: 2,
        explanation:
          "Solo con il terzo argomento `true` (parsing stretto) dayjs controlla che la stringa rispetti esattamente il formato e che la data esista, restituendo `false`. Senza `true` la data viene \"corretta\" nel 3 marzo e risulta valida; senza formato dayjs non sa interpretare `gg/mm/aaaa`; e `format` restituisce sempre una stringa non vuota (al massimo \"Invalid Date\"), quindi non serve a validare.",
      },
      {
        type: "code",
        title: "Formattare una data",
        description:
          "Scrivi una funzione `formatDate(iso)` che riceve una data in formato ISO `\"yyyy-MM-dd\"` e la restituisce nel formato italiano `\"dd/MM/yyyy\"`.\n\nSe la data manca (`null`, `undefined` o stringa vuota) deve restituire una stringa vuota `\"\"`.\n\nEsempio: `formatDate(\"2026-06-01\")` → `\"01/06/2026\"`.",
        difficulty: "facile",
        starterCode: `function formatDate(iso) {
  // scrivi qui
}

console.log(formatDate("2026-06-01")); // "01/06/2026"
console.log(formatDate(null));         // ""`,
        solution: `function formatDate(iso) {
  if (!iso) return "";
  const [anno, mese, giorno] = iso.split("-");
  return giorno + "/" + mese + "/" + anno;
}

console.log(formatDate("2026-06-01")); // "01/06/2026"
console.log(formatDate(null));         // ""`,
        validate: `if (typeof formatDate !== "function") return "Definisci la funzione formatDate";
const casi = [["2026-06-01", "01/06/2026"], ["2025-12-31", "31/12/2025"], ["2026-02-09", "09/02/2026"]];
for (const [input, atteso] of casi) {
  const r = formatDate(input);
  if (r !== atteso) return "formatDate(" + $format(input) + ") dovrebbe restituire " + $format(atteso) + ", invece restituisce " + $format(r) + ". Suggerimento: split(\\"-\\") e ricomponi le parti";
}
for (const vuoto of [null, undefined, ""]) {
  let r;
  try {
    r = formatDate(vuoto);
  } catch (e) {
    return "formatDate(" + $format(vuoto) + ") lancia un errore: controlla prima se la data manca";
  }
  if (r !== "") return "formatDate(" + $format(vuoto) + ") dovrebbe restituire una stringa vuota, invece restituisce " + $format(r);
}
return true;`,
      },
      {
        type: "code",
        title: "Validare una data gg/mm/aaaa",
        description:
          "Scrivi una funzione `isValidDate(testo)` che restituisce `true` se `testo` è una data esistente nel formato `\"gg/mm/aaaa\"` (giorno e mese di 2 cifre, anno di 4), altrimenti `false`.\n\nSuggerimenti:\n1. dividi il testo con `split(\"/\")` e controlla che ci siano 3 parti con le lunghezze giuste\n2. converti le parti in numeri e crea `new Date(anno, mese - 1, giorno)`\n3. la data esiste solo se `getFullYear()`, `getMonth()` e `getDate()` restituiscono gli stessi numeri: per il 31/02 Date si sposta a marzo e il controllo fallisce.\n\nEsempi: `\"15/05/2026\"` → true, `\"31/02/2026\"` → false, `\"ciao\"` → false.",
        difficulty: "medio",
        starterCode: `function isValidDate(testo) {
  // scrivi qui
  return true;
}

console.log(isValidDate("15/05/2026")); // true
console.log(isValidDate("31/02/2026")); // false
console.log(isValidDate("ciao"));       // false`,
        solution: `function isValidDate(testo) {
  const parti = testo.split("/");
  if (parti.length !== 3) return false;
  const [g, m, a] = parti;
  if (g.length !== 2 || m.length !== 2 || a.length !== 4) return false;

  const giorno = Number(g);
  const mese = Number(m);
  const anno = Number(a);
  const data = new Date(anno, mese - 1, giorno);

  return (
    data.getFullYear() === anno &&
    data.getMonth() === mese - 1 &&
    data.getDate() === giorno
  );
}

console.log(isValidDate("15/05/2026")); // true
console.log(isValidDate("31/02/2026")); // false
console.log(isValidDate("ciao"));       // false`,
        validate: `if (typeof isValidDate !== "function") return "Definisci la funzione isValidDate";
const casi = [
  ["15/05/2026", true, ""],
  ["01/01/2025", true, ""],
  ["31/12/2026", true, ""],
  ["29/02/2024", true, " (il 2024 è bisestile)"],
  ["31/02/2026", false, " (febbraio non ha 31 giorni)"],
  ["29/02/2026", false, " (il 2026 non è bisestile)"],
  ["31/04/2026", false, " (aprile ha 30 giorni)"],
  ["00/01/2026", false, " (il giorno 0 non esiste)"],
  ["12/13/2026", false, " (il mese 13 non esiste)"],
  ["ciao", false, ""],
  ["", false, ""],
  ["5/05/2026", false, " (il giorno deve avere 2 cifre)"],
  ["2026-05-15", false, " (il formato deve essere gg/mm/aaaa)"],
  ["ab/cd/efgh", false, ""],
];
for (const [input, atteso, nota] of casi) {
  let r;
  try {
    r = isValidDate(input);
  } catch (e) {
    return "isValidDate(" + $format(input) + ") lancia un errore: " + e.message;
  }
  if (r !== atteso) return "isValidDate(" + $format(input) + ") dovrebbe restituire " + atteso + nota + ", invece restituisce " + $format(r);
}
return true;`,
        solutionExplanation:
          "Il controllo sulle lunghezze scarta i formati sbagliati. Poi si sfrutta proprio il limite di Date: per una data impossibile, come il 31/02, Date non dà errore ma si sposta nel mese successivo, quindi giorno e mese letti con `getDate()` e `getMonth()` non coincidono più con quelli scritti. Se le parti non sono numeri, `Number` restituisce `NaN`, la data non è valida e anche `getFullYear()` vale `NaN`, che non è uguale a nessun numero.",
      },
      {
        type: "code",
        title: "Eventi raggruppati per mese",
        description:
          "Scrivi due funzioni:\n1. `raggruppaPerMese(eventi)`: riceve un array di eventi `{ titolo, data }` (data in formato `\"yyyy-MM-dd\"`) e restituisce un oggetto che ha come chiavi i mesi (`\"yyyy-MM\"`, cioè i primi 7 caratteri della data) e come valori gli array dei titoli di quel mese, nell'ordine originale. Usa `??=`.\n2. `contaPerMese(gruppi)`: riceve l'oggetto prodotto dalla prima funzione e restituisce un oggetto con gli stessi mesi e, come valore, il numero di eventi. Usa `Object.entries`, `map` e `Object.fromEntries`.",
        difficulty: "difficile",
        starterCode: `const eventi = [
  { titolo: "Concerto", data: "2026-06-20" },
  { titolo: "Mostra", data: "2026-07-10" },
  { titolo: "Cinema all'aperto", data: "2026-06-28" },
];

function raggruppaPerMese(eventi) {
  const gruppi = {};
  // scrivi qui
  return gruppi;
}

function contaPerMese(gruppi) {
  // scrivi qui
}

const gruppi = raggruppaPerMese(eventi);
console.log(gruppi);
console.log(contaPerMese(gruppi));`,
        solution: `const eventi = [
  { titolo: "Concerto", data: "2026-06-20" },
  { titolo: "Mostra", data: "2026-07-10" },
  { titolo: "Cinema all'aperto", data: "2026-06-28" },
];

function raggruppaPerMese(eventi) {
  const gruppi = {};
  for (const evento of eventi) {
    const mese = evento.data.slice(0, 7);
    (gruppi[mese] ??= []).push(evento.titolo);
  }
  return gruppi;
}

function contaPerMese(gruppi) {
  return Object.fromEntries(
    Object.entries(gruppi).map(([mese, titoli]) => [mese, titoli.length])
  );
}

const gruppi = raggruppaPerMese(eventi);
console.log(gruppi);
console.log(contaPerMese(gruppi));`,
        validate: `if (typeof raggruppaPerMese !== "function") return "Definisci la funzione raggruppaPerMese";
if (typeof contaPerMese !== "function") return "Definisci la funzione contaPerMese";
const input = [
  { titolo: "Concerto", data: "2026-06-20" },
  { titolo: "Mostra", data: "2026-07-10" },
  { titolo: "Cinema all'aperto", data: "2026-06-28" },
  { titolo: "Capodanno", data: "2025-12-31" },
];
const g = raggruppaPerMese(input);
const atteso = { "2026-06": ["Concerto", "Cinema all'aperto"], "2026-07": ["Mostra"], "2025-12": ["Capodanno"] };
if (!$equal(g, atteso)) return "raggruppaPerMese con 4 eventi dovrebbe restituire " + $format(atteso) + ", invece restituisce " + $format(g);
if (!$equal(raggruppaPerMese([]), {})) return "Con un array vuoto raggruppaPerMese deve restituire {}";
if (!/\\?\\?=/.test($codeNoComments)) return "Usa ??= per creare l'array del mese solo quando serve";
const c = contaPerMese(atteso);
if (!$equal(c, { "2026-06": 2, "2026-07": 1, "2025-12": 1 })) return "contaPerMese dovrebbe restituire { \\"2026-06\\": 2, \\"2026-07\\": 1, \\"2025-12\\": 1 }, invece restituisce " + $format(c);
if (!$equal(contaPerMese({ "2026-01": ["a", "b", "c"] }), { "2026-01": 3 })) return "contaPerMese({ \\"2026-01\\": [\\"a\\", \\"b\\", \\"c\\"] }) dovrebbe restituire { \\"2026-01\\": 3 }";
if (!$equal(contaPerMese({}), {})) return "contaPerMese({}) dovrebbe restituire {}";
if (!/Object\\.fromEntries\\(/.test($codeNoComments)) return "In contaPerMese usa Object.fromEntries per ricostruire l'oggetto";
return true;`,
        solutionExplanation:
          "`(gruppi[mese] ??= [])` crea l'array solo la prima volta che si incontra un mese e restituisce comunque l'array di quel mese, su cui si fa `push`. In `contaPerMese` l'oggetto diventa un array di coppie `[mese, titoli]`, `map` trasforma ogni coppia in `[mese, numero]` e `Object.fromEntries` ricostruisce l'oggetto.",
      },
      {
        type: "code",
        title: "Ordinare gli eventi per data",
        description:
          "Scrivi una funzione `ordinaEventi(eventi)` che restituisce un **nuovo** array (senza modificare quello originale) con gli eventi ordinati per `data` crescente, usando `localeCompare`.\n\nAlcuni eventi non hanno ancora una data: devono finire **in fondo**. Se due eventi hanno la stessa data (o sono entrambi senza data), ordinali per `titolo` in ordine alfabetico.",
        difficulty: "medio",
        starterCode: `const eventi = [
  { titolo: "Mostra", data: "2026-07-10" },
  { titolo: "Torneo di scacchi" },
  { titolo: "Concerto", data: "2026-06-20" },
  { titolo: "Aperitivo", data: "2026-06-20" },
];

function ordinaEventi(eventi) {
  // scrivi qui
  return eventi;
}

console.log(ordinaEventi(eventi).map((e) => e.titolo));`,
        solution: `const eventi = [
  { titolo: "Mostra", data: "2026-07-10" },
  { titolo: "Torneo di scacchi" },
  { titolo: "Concerto", data: "2026-06-20" },
  { titolo: "Aperitivo", data: "2026-06-20" },
];

function ordinaEventi(eventi) {
  return [...eventi].sort((a, b) => {
    const perData = (a.data ?? "9999").localeCompare(b.data ?? "9999");
    if (perData !== 0) return perData;
    return a.titolo.localeCompare(b.titolo);
  });
}

console.log(ordinaEventi(eventi).map((e) => e.titolo));`,
        validate: `if (typeof ordinaEventi !== "function") return "Definisci la funzione ordinaEventi";
const input = [
  { titolo: "Mostra", data: "2026-07-10" },
  { titolo: "Torneo di scacchi" },
  { titolo: "Concerto", data: "2026-06-20" },
  { titolo: "Biblioteca aperta" },
  { titolo: "Aperitivo", data: "2026-06-20" },
  { titolo: "Capodanno", data: "2025-12-31" },
];
const copia = input.map((e) => ({ ...e }));
let r;
try {
  r = ordinaEventi(input);
} catch (e) {
  return "ordinaEventi lancia un errore (" + e.message + "): per gli eventi senza data usa un default con ??";
}
if (!Array.isArray(r)) return "ordinaEventi deve restituire un array";
if (!$equal(input, copia)) return "Non modificare l'array originale: ordina una copia ([...eventi])";
const titoli = r.map((e) => e.titolo);
const atteso = ["Capodanno", "Aperitivo", "Concerto", "Mostra", "Biblioteca aperta", "Torneo di scacchi"];
if (!$equal(titoli, atteso)) return "Mi aspetto i titoli in quest'ordine: " + $format(atteso) + ", invece ottengo " + $format(titoli);
if (!$equal(ordinaEventi([]), [])) return "Con un array vuoto ordinaEventi deve restituire []";
if (!/localeCompare\\(/.test($codeNoComments)) return "Usa localeCompare per confrontare le stringhe";
return true;`,
        solutionExplanation:
          "`[...eventi]` crea una copia, così `sort` non modifica l'array originale. Il default `\"9999\"` viene dopo qualsiasi data ISO, quindi gli eventi senza data finiscono in fondo. Quando `localeCompare` sulle date restituisce 0 (date uguali, o entrambe mancanti) si passa al confronto sui titoli.",
      },
      {
        type: "code",
        mode: "static",
        title: "Le stesse funzioni con dayjs",
        description:
          "In un progetto reale useresti dayjs (questo codice non viene eseguito, viene solo controllato).\n\n1. Importa `dayjs` da `\"dayjs\"` e il plugin `customParseFormat` da `\"dayjs/plugin/customParseFormat\"`\n2. Registra il plugin con `dayjs.extend`\n3. Completa `formatDate(value)`: restituisce la data nel formato `\"DD/MM/YYYY\"`, oppure `\"\"` se `value` manca\n4. Completa `isValidDate(value)`: usa il parsing stretto con il formato `\"DD/MM/YYYY\"` e `isValid()`",
        difficulty: "medio",
        starterCode: `// importa qui dayjs e il plugin

// registra qui il plugin

const formatDate = (value) => {
  // scrivi qui
};

const isValidDate = (value) => {
  // scrivi qui
};`,
        solution: `import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const formatDate = (value) => (value ? dayjs(value).format("DD/MM/YYYY") : "");

const isValidDate = (value) => dayjs(value, "DD/MM/YYYY", true).isValid();`,
        validate: `const c = $codeNoComments;
if (!/import\\s+dayjs\\s+from\\s+["']dayjs["']/.test(c)) return "Importa dayjs: import dayjs from \\"dayjs\\";";
const plugin = /import\\s+(\\w+)\\s+from\\s+["']dayjs\\/plugin\\/customParseFormat(\\.js)?["']/.exec(c);
if (!plugin) return "Importa il plugin: import customParseFormat from \\"dayjs/plugin/customParseFormat\\";";
if (!new RegExp("dayjs\\\\.extend\\\\(\\\\s*" + plugin[1] + "\\\\s*\\\\)").test(c)) return "Registra il plugin con dayjs.extend(" + plugin[1] + ")";
if (!/\\.format\\(\\s*["']DD\\/MM\\/YYYY["']\\s*\\)/.test(c)) return "In formatDate usa .format(\\"DD/MM/YYYY\\")";
if (!/["']{2}/.test(c)) return "formatDate deve restituire \\"\\" quando value manca (es. con un ternario: value ? ... : \\"\\")";
if (!/dayjs\\(\\s*\\w+\\s*,\\s*["']DD\\/MM\\/YYYY["']\\s*,\\s*true\\s*\\)/.test(c)) return "In isValidDate passa il formato e true per il parsing stretto: dayjs(value, \\"DD/MM/YYYY\\", true)";
if (!/\\.isValid\\(\\s*\\)/.test(c)) return "Chiama .isValid() per sapere se la data è valida";
return true;`,
      },
    ],
  },

  http: {
    sections: [
      {
        type: "text",
        content:
          "Quasi tutti i dati che un'applicazione mostra, come i prodotti di un negozio, i libri di una biblioteca o le attività di un team, vivono su un **server**. Il frontend li chiede e li modifica tramite **richieste HTTP**. In questa lezione vediamo come è fatta una richiesta, come costruire gli URL con i parametri, come usare `fetch` e la libreria **axios**, e come organizzare le chiamate in piccole funzioni riutilizzabili che gestiscono bene gli errori.",
      },
      {
        type: "heading",
        content: "Cos'è HTTP",
      },
      {
        type: "text",
        content:
          "**HTTP** è il protocollo con cui un *client* (il browser, la nostra app) e un *server* si parlano: il client invia una **richiesta** e il server risponde con una **risposta**. Una richiesta contiene un **metodo** (cosa vogliamo fare), un **URL** (su quale risorsa), degli **header** (informazioni aggiuntive, come il formato dei dati) e, a volte, un **body** con i dati da inviare. La risposta contiene uno **status code** (com'è andata), degli header e un body con i dati richiesti.",
      },
      {
        type: "subheading",
        content: "I metodi principali",
      },
      {
        type: "list",
        items: [
          "**GET**: leggere dati, senza modificarli (es. l'elenco dei prodotti). Non ha body: i parametri vanno nell'URL",
          "**POST**: creare una nuova risorsa (es. un nuovo ordine), i dati vanno nel body",
          "**PUT**: aggiornare una risorsa esistente (es. modificare il prezzo di un prodotto), i dati vanno nel body. Esiste anche **PATCH**, pensato per aggiornare solo alcuni campi",
          "**DELETE**: eliminare una risorsa (es. togliere un prodotto dal catalogo)",
        ],
      },
      {
        type: "subheading",
        content: "Gli status code",
      },
      {
        type: "text",
        content:
          "Lo status code è un numero di tre cifre: la prima cifra indica la categoria. **2xx** significa successo, **4xx** un errore nella richiesta (colpa del client), **5xx** un errore del server.",
      },
      {
        type: "list",
        items: [
          "`200 OK`: tutto bene, nel body ci sono i dati",
          "`201 Created`: risorsa creata (tipico risultato di una POST)",
          "`204 No Content`: tutto bene, ma senza body (tipico di una DELETE)",
          "`400 Bad Request`: dati inviati non validi",
          "`401 Unauthorized` / `403 Forbidden`: non sei autenticato / non hai i permessi",
          "`404 Not Found`: la risorsa non esiste",
          "`500 Internal Server Error`: qualcosa si è rotto sul server",
        ],
      },
      {
        type: "code",
        language: "http",
        title: "Com'è fatta una richiesta e la sua risposta",
        code: `POST /api/ordini HTTP/1.1
Host: shop.example.com
Content-Type: application/json

{ "prodottoId": 7, "quantita": 2 }

--- risposta del server ---

HTTP/1.1 201 Created
Content-Type: application/json

{ "id": 1042, "prodottoId": 7, "quantita": 2, "stato": "in preparazione" }`,
      },
      {
        type: "info",
        content:
          "Il body viaggia come testo, e il formato più usato è JSON (visto nella lezione precedente): il client trasforma l'oggetto in testo con `JSON.stringify` e indica il formato con l'header `Content-Type: application/json`; chi riceve lo ritrasforma in oggetto con `JSON.parse`.",
      },
      {
        type: "heading",
        content: "URL e query string",
      },
      {
        type: "text",
        content:
          "Le richieste GET non hanno body: i parametri, come filtri, ricerca o pagina, si aggiungono all'URL nella **query string**, la parte dopo il `?`, formata da coppie `chiave=valore` separate da `&`. Es. `/prodotti?categoria=libri&page=2`. Spazi e caratteri speciali vanno codificati, quindi scriverla a mano è scomodo e facile da sbagliare. `URLSearchParams` lo fa per noi.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Costruire una query string con URLSearchParams",
        code: `const params = new URLSearchParams({ q: "harry potter", page: 2 });
console.log(params.toString()); // "q=harry+potter&page=2" -> lo spazio è codificato

// Si possono aggiungere, modificare e togliere parametri
params.append("ordine", "prezzo");
params.set("page", 3);
params.delete("q");
console.log(params.toString()); // "page=3&ordine=prezzo"

// Leggere da una query string esistente
const letti = new URLSearchParams("categoria=libri&page=2");
console.log(letti.get("categoria")); // "libri"
console.log(letti.get("autore"));    // null: il parametro non c'è
console.log(letti.has("page"));      // true

const url = "/prodotti?" + new URLSearchParams({ categoria: "libri" });
console.log(url); // "/prodotti?categoria=libri"`,
      },
      {
        type: "code",
        language: "javascript",
        title: "Leggere un URL completo con new URL",
        code: `const url = new URL("https://shop.example.com/prodotti?categoria=libri&page=3");

console.log(url.hostname); // "shop.example.com"
console.log(url.pathname); // "/prodotti"
console.log(url.searchParams.get("categoria")); // "libri"

// searchParams.get restituisce sempre una stringa (o null)
const pagina = Number(url.searchParams.get("page") ?? 1);
console.log(pagina + 1); // 4

// searchParams si può anche modificare
url.searchParams.set("page", 4);
console.log(url.toString()); // "https://shop.example.com/prodotti?categoria=libri&page=4"`,
      },
      {
        type: "warning",
        content:
          "`searchParams.get` restituisce sempre una **stringa**, oppure `null` se il parametro manca. `\"3\" + 1` dà `\"31\"`: converti con `Number(...)` prima di fare calcoli, e usa `??` per un valore di default.",
      },
      {
        type: "heading",
        content: "fetch",
      },
      {
        type: "text",
        content:
          "Nella lezione sull'asincronia abbiamo visto `fetch`, la funzione nativa del browser per le richieste HTTP. Ricapitolando: `await fetch(url)` restituisce un oggetto *Response*; `response.ok` è `true` se lo status è 2xx; `response.status` contiene lo status code; `await response.json()` legge il body e lo trasforma da JSON a oggetto. Per inviare dati si passano `method`, `headers` e `body` (trasformato in testo con `JSON.stringify`).",
      },
      {
        type: "code",
        language: "javascript",
        title: "GET e PUT con fetch (illustrativo)",
        code: `async function getProducts(categoria) {
  const query = new URLSearchParams({ categoria });
  const response = await fetch("https://shop.example.com/api/prodotti?" + query);

  if (!response.ok) {
    // fetch non lancia errori per 404 o 500: lo facciamo noi
    throw new Error("Errore HTTP " + response.status);
  }
  return response.json();
}

async function updateProduct(id, modifiche) {
  const response = await fetch("https://shop.example.com/api/prodotti/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(modifiche),
  });
  if (!response.ok) throw new Error("Errore HTTP " + response.status);
  return response.json();
}`,
      },
      {
        type: "warning",
        content:
          "La Promise di `fetch` viene rifiutata solo se la richiesta non arriva al server (rete assente, indirizzo sbagliato). Con una risposta 404 o 500 viene **risolta** normalmente: se non controlli `response.ok`, il tuo codice proverà a usare il messaggio d'errore del server come se fossero i dati.",
      },
      {
        type: "heading",
        content: "La libreria axios",
      },
      {
        type: "text",
        content:
          "**axios** è una libreria (si installa con `npm install axios`) che semplifica le richieste HTTP. Rispetto a `fetch`: trasforma automaticamente il body in JSON e la risposta in oggetto; i dati della risposta si trovano in `response.data`; i parametri della query string si passano nell'opzione `params`; e, soprattutto, **la Promise viene rifiutata anche quando lo status non è 2xx**, quindi gli errori finiscono sempre nel `catch`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "I metodi di axios (illustrativo)",
        code: `import axios from "axios";

// GET con parametri: axios costruisce "/api/prodotti?categoria=libri&page=2"
const response = await axios.get("/api/prodotti", {
  params: { categoria: "libri", page: 2 },
});
console.log(response.status); // 200
console.log(response.data);   // l'array dei prodotti, già trasformato da JSON

// POST: il secondo argomento è il body (axios lo trasforma in JSON)
const creato = await axios.post("/api/ordini", { prodottoId: 7, quantita: 2 });
console.log(creato.data.id); // 1042

// PUT e DELETE
await axios.put("/api/prodotti/7", { prezzo: 12.5 });
await axios.delete("/api/prodotti/7");`,
      },
      {
        type: "subheading",
        content: "Gestire gli errori con axios",
      },
      {
        type: "text",
        content:
          "Quando la richiesta fallisce, l'errore ricevuto nel `catch` ha una proprietà `response` **solo se il server ha risposto**: in quel caso `error.response.status` contiene lo status code e `error.response.data` il body inviato dal server (spesso con un messaggio d'errore). Se invece il server non è raggiungibile, `error.response` è `undefined`. Per questo si legge con l'optional chaining: `error.response?.status`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Leggere un errore di axios (illustrativo)",
        code: `try {
  const response = await axios.get("/api/prodotti/999");
  console.log(response.data);
} catch (error) {
  const status = error.response?.status; // 404, oppure undefined se la rete non c'è
  const messaggioServer = error.response?.data?.error; // es. "Prodotto non trovato"

  if (status === 404) {
    console.log("Il prodotto non esiste");
  } else if (status === undefined) {
    console.log("Server non raggiungibile: " + error.message);
  } else {
    console.log("Errore " + status + ": " + (messaggioServer ?? error.message));
  }
}`,
      },
      {
        type: "subheading",
        content: "Un'istanza con axios.create",
      },
      {
        type: "text",
        content:
          "Ripetere l'indirizzo del server in ogni chiamata è scomodo. `axios.create({ baseURL })` crea un'**istanza** di axios già configurata: gli URL delle chiamate diventano relativi a `baseURL`. Di solito la si crea una volta in un file dedicato e la si esporta.",
      },
      {
        type: "code",
        language: "javascript",
        title: "api.js: un'istanza condivisa (illustrativo)",
        code: `// --- api.js ---
import axios from "axios";

const api = axios.create({
  baseURL: "https://shop.example.com/api",
  timeout: 10000, // dopo 10 secondi la richiesta viene considerata fallita
});

export default api;

// --- in un altro file ---
import api from "./api.js";

const response = await api.get("/prodotti"); // -> https://shop.example.com/api/prodotti`,
      },
      {
        type: "heading",
        content: "Organizzare le chiamate in funzioni dedicate",
      },
      {
        type: "text",
        content:
          "Invece di spargere chiamate ad axios in tutta l'applicazione, conviene scrivere una piccola funzione per ogni operazione: `getProducts`, `updateProduct`, `deleteProduct`... Ognuna sa quale URL e quale metodo usare, restituisce direttamente i dati (`response.data`) e, in caso di errore, **rilancia un errore con un messaggio leggibile**. Chi la chiama non deve sapere nulla di HTTP: riceve i dati oppure un errore, e decide lui cosa mostrare all'utente.",
      },
      {
        type: "code",
        language: "javascript",
        title: "lib/products.js (illustrativo)",
        code: `import api from "../api.js";

export async function getProducts(categoria) {
  try {
    const response = await api.get("/prodotti", { params: { categoria } });
    return response.data;
  } catch (error) {
    // Il messaggio del server, se c'è, altrimenti quello generico dell'errore
    const message = error.response?.data?.error ?? error.message;
    throw new Error("Caricamento fallito: " + message);
  }
}

export async function updateProduct(id, modifiche) {
  try {
    const response = await api.put("/prodotti/" + id, modifiche);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.error ?? error.message;
    throw new Error("Aggiornamento fallito: " + message);
  }
}`,
      },
      {
        type: "code",
        language: "javascript",
        title: "Chi chiama decide cosa mostrare",
        code: `import { getProducts } from "./lib/products.js";

async function mostraCatalogo() {
  let caricamento = true;
  try {
    const prodotti = await getProducts("libri");
    console.log("Trovati " + prodotti.length + " prodotti");
  } catch (error) {
    // error.message è già leggibile: "Caricamento fallito: Server non disponibile"
    console.log(error.message);
  } finally {
    caricamento = false;
  }
}`,
      },
      {
        type: "info",
        content:
          "Negli esercizi non possiamo contattare server reali e axios non è disponibile: per questo useremo `fakeAxios` e `fakeFetch`, piccole funzioni già scritte che si comportano come quelle vere restituendo una Promise risolta (o rifiutata) dopo qualche millisecondo con `setTimeout`.",
      },
      {
        type: "tip",
        content:
          "Tieni ogni chiamata HTTP in una funzione con un nome chiaro e un messaggio d'errore comprensibile. Se l'indirizzo o il formato di una risposta cambiano, modificherai un solo punto, e potrai mostrare all'utente un messaggio utile invece di un generico \"Request failed with status code 500\".",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "fetch e il 404",
        description:
          "Il server risponde con status 404. Cosa succede con questo codice?\n\nconst response = await fetch(\"/api/prodotti/999\");\nconst dati = await response.json();\nconsole.log(dati);",
        difficulty: "medio",
        options: [
          "`fetch` viene rifiutata e l'errore va gestito con try/catch",
          "`fetch` restituisce `null` e viene stampato `null`",
          "`fetch` viene risolta normalmente: `response.ok` è false e viene stampato il body d'errore del server come se fossero i dati",
          "`response.json()` lancia sempre un errore se lo status è 404",
        ],
        correct: 2,
        explanation:
          "`fetch` viene rifiutata solo per problemi di rete: una risposta 404 è comunque una risposta, quindi la Promise si risolve con `response.ok === false` e `response.status === 404`. Se non lo controlli, usi il body d'errore (per esempio `{ error: \"Non trovato\" }`) come se fossero i dati. `fetch` non restituisce mai `null`, e `response.json()` funziona anche con un 404, purché il body sia JSON.",
      },
      {
        type: "multiple-choice",
        title: "Metodo e status",
        description:
          "L'utente compila il form \"Nuovo ordine\" e lo invia. Quale coppia metodo/status descrive una richiesta andata a buon fine?",
        difficulty: "facile",
        options: [
          "`POST` e `201 Created`",
          "`GET` e `200 OK`",
          "`PUT` e `404 Not Found`",
          "`DELETE` e `204 No Content`",
        ],
        correct: 0,
        explanation:
          "Per creare una nuova risorsa si usa `POST`, e il server risponde tipicamente `201 Created`. `GET` serve a leggere (e non ha body per inviare l'ordine), `PUT` aggiorna una risorsa esistente e 404 indica comunque un errore, `DELETE` elimina.",
      },
      {
        type: "multiple-choice",
        title: "Leggere i parametri dell'URL",
        description:
          "Cosa stampa questo codice?\n\nconst url = new URL(\"https://shop.example.com/prodotti?page=3\");\nconst page = url.searchParams.get(\"page\");\nconsole.log(page + 1, url.searchParams.get(\"ordine\"));",
        difficulty: "medio",
        options: [
          "`4 undefined`",
          "`4 null`",
          "`\"31\" undefined`",
          "`31 null`",
        ],
        correct: 3,
        explanation:
          "`searchParams.get` restituisce sempre una stringa: `\"3\" + 1` è una concatenazione e dà `\"31\"` (la console stampa la stringa senza virgolette). Per un parametro assente restituisce `null`, non `undefined`. Per ottenere 4 bisognerebbe convertire prima: `Number(page) + 1`.",
      },
      {
        type: "multiple-choice",
        title: "Errori di axios",
        description:
          "Il computer dell'utente è offline e una chiamata `axios.get(...)` fallisce. Nel `catch`, quale istruzione legge lo status senza rischiare un nuovo errore?",
        difficulty: "medio",
        options: [
          "`error.status`",
          "`error.response?.status`",
          "`error.response.status`",
          "`response.status`",
        ],
        correct: 1,
        explanation:
          "Se il server non ha risposto, `error.response` è `undefined`: `error.response.status` lancerebbe un TypeError dentro il catch, mentre `error.response?.status` restituisce semplicemente `undefined`. Lo status non è una proprietà diretta dell'errore, e `response` non esiste nel catch perché l'assegnamento `const response = await ...` non è mai avvenuto.",
      },
      {
        type: "code",
        title: "Costruire e leggere gli URL",
        description:
          "Scrivi due funzioni:\n1. `costruisciUrl(filtri)`: riceve un oggetto di filtri e restituisce `\"/prodotti\"` seguito dalla query string costruita con `URLSearchParams`. I filtri con valore `null`, `undefined` o stringa vuota vanno **esclusi**; se non resta nessun filtro restituisce solo `\"/prodotti\"` (senza `?`).\n   Es. `costruisciUrl({ categoria: \"libri\", autore: \"\", page: 2 })` → `\"/prodotti?categoria=libri&page=2\"`\n2. `leggiPagina(indirizzo)`: riceve un URL completo e restituisce il parametro `page` come **numero**, oppure `1` se manca. Usa `new URL(...)` e `searchParams.get`.\n   Es. `leggiPagina(\"https://shop.example.com/prodotti?page=3\")` → `3`",
        difficulty: "medio",
        starterCode: `function costruisciUrl(filtri) {
  // scrivi qui
  return "/prodotti";
}

function leggiPagina(indirizzo) {
  // scrivi qui
}

console.log(costruisciUrl({ categoria: "libri", autore: "", page: 2 }));
console.log(leggiPagina("https://shop.example.com/prodotti?page=3"));`,
        solution: `function costruisciUrl(filtri) {
  const validi = Object.fromEntries(
    Object.entries(filtri).filter(([, valore]) => valore !== null && valore !== undefined && valore !== "")
  );
  const query = new URLSearchParams(validi).toString();
  return query ? "/prodotti?" + query : "/prodotti";
}

function leggiPagina(indirizzo) {
  const url = new URL(indirizzo);
  return Number(url.searchParams.get("page") ?? 1);
}

console.log(costruisciUrl({ categoria: "libri", autore: "", page: 2 }));
console.log(leggiPagina("https://shop.example.com/prodotti?page=3"));`,
        validate: `if (typeof costruisciUrl !== "function") return "Definisci la funzione costruisciUrl";
if (typeof leggiPagina !== "function") return "Definisci la funzione leggiPagina";
const casi = [
  [{ categoria: "libri", autore: "", page: 2 }, "/prodotti?categoria=libri&page=2"],
  [{ q: "harry potter" }, "/prodotti?q=harry+potter"],
  [{ categoria: null, page: undefined }, "/prodotti"],
  [{}, "/prodotti"],
  [{ page: 0, disponibile: false }, "/prodotti?page=0&disponibile=false"],
];
for (const [input, atteso] of casi) {
  const r = costruisciUrl(input);
  if (r !== atteso) return "costruisciUrl(" + $format(input) + ") dovrebbe restituire " + $format(atteso) + ", invece restituisce " + $format(r);
}
if (!/URLSearchParams/.test($codeNoComments)) return "Usa URLSearchParams per costruire la query string";
const pagine = [
  ["https://shop.example.com/prodotti?page=3", 3],
  ["https://shop.example.com/prodotti?categoria=libri&page=12", 12],
  ["https://shop.example.com/prodotti?categoria=libri", 1],
  ["https://shop.example.com/prodotti", 1],
];
for (const [input, atteso] of pagine) {
  const r = leggiPagina(input);
  if (r !== atteso) return "leggiPagina(" + $format(input) + ") dovrebbe restituire il numero " + atteso + ", invece restituisce " + $format(r) + (typeof r === "string" ? " (una stringa: convertila con Number)" : "");
}
if (!/new\\s+URL\\(/.test($codeNoComments)) return "In leggiPagina usa new URL(indirizzo) e searchParams.get";
return true;`,
        solutionExplanation:
          "Con `Object.entries`, `filter` e `Object.fromEntries` si tolgono i filtri vuoti (attenzione: `0` e `false` sono valori validi, quindi non basta un controllo truthy). `URLSearchParams` codifica la query string; se è vuota non si aggiunge il `?`. In `leggiPagina`, `searchParams.get` restituisce una stringa o `null`: `?? 1` fornisce il default e `Number` converte.",
      },
      {
        type: "code",
        title: "Un prodotto con fakeFetch",
        description:
          "`fakeFetch(url)` (già scritta) si comporta come `fetch`: dopo 200 ms si risolve con un oggetto `{ ok, status, json() }`. Per `\"/api/prodotti/1\"` e `\"/api/prodotti/2\"` lo status è 200, per gli altri id è 404.\n\nScrivi una funzione async `getProduct(id)` che:\n- chiama `fakeFetch(\"/api/prodotti/\" + id)`\n- se `response.ok` è false lancia `new Error(\"Errore HTTP \" + status)` (es. `\"Errore HTTP 404\"`)\n- altrimenti restituisce il prodotto letto con `await response.json()`",
        difficulty: "medio",
        starterCode: `const catalogo = {
  1: { id: 1, nome: "Penna", prezzo: 1.5 },
  2: { id: 2, nome: "Quaderno", prezzo: 3 },
};

function fakeFetch(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const id = url.split("/").pop();
      const prodotto = catalogo[id];
      const status = prodotto ? 200 : 404;
      resolve({
        ok: status === 200,
        status: status,
        json: () => Promise.resolve(prodotto ?? { error: "Prodotto non trovato" }),
      });
    }, 200);
  });
}

async function getProduct(id) {
  const response = await fakeFetch("/api/prodotti/" + id);
  // scrivi qui
}

getProduct(1).then((p) => console.log(p));
getProduct(99).catch((error) => console.log(error.message));`,
        solution: `const catalogo = {
  1: { id: 1, nome: "Penna", prezzo: 1.5 },
  2: { id: 2, nome: "Quaderno", prezzo: 3 },
};

function fakeFetch(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const id = url.split("/").pop();
      const prodotto = catalogo[id];
      const status = prodotto ? 200 : 404;
      resolve({
        ok: status === 200,
        status: status,
        json: () => Promise.resolve(prodotto ?? { error: "Prodotto non trovato" }),
      });
    }, 200);
  });
}

async function getProduct(id) {
  const response = await fakeFetch("/api/prodotti/" + id);
  if (!response.ok) {
    throw new Error("Errore HTTP " + response.status);
  }
  return response.json();
}

getProduct(1).then((p) => console.log(p));
getProduct(99).catch((error) => console.log(error.message));`,
        validate: `if (typeof getProduct !== "function") return "Definisci la funzione async getProduct";
const p1 = await getProduct(1);
if (!$equal(p1, { id: 1, nome: "Penna", prezzo: 1.5 })) return "getProduct(1) dovrebbe restituire il prodotto { id: 1, nome: \\"Penna\\", prezzo: 1.5 }, invece restituisce " + $format(p1) + ". Hai usato await response.json()?";
const p2 = await getProduct(2);
if (!$equal(p2, { id: 2, nome: "Quaderno", prezzo: 3 })) return "getProduct(2) dovrebbe restituire il Quaderno";
for (const id of [99, 7]) {
  let errore = null;
  let risultato;
  try {
    risultato = await getProduct(id);
  } catch (e) {
    errore = e;
  }
  if (!errore) return "getProduct(" + id + ") dovrebbe lanciare un errore (status 404), invece restituisce " + $format(risultato) + ". Controlla response.ok";
  if (errore.message !== "Errore HTTP 404") return "Il messaggio dell'errore dovrebbe essere \\"Errore HTTP 404\\", invece è " + $format(errore.message);
}
return true;`,
        solutionExplanation:
          "Come `fetch`, `fakeFetch` si risolve anche con un 404: tocca a noi controllare `response.ok` e lanciare un errore con `throw`. Dentro una funzione async, `throw` rifiuta la Promise restituita, quindi chi chiama `getProduct` può gestire il problema con `catch`.",
      },
      {
        type: "code",
        title: "Funzioni dedicate con fakeAxios",
        description:
          "`fakeAxios` (già scritto) imita axios: `fakeAxios.get(url, { params })` e `fakeAxios.put(url, body)` restituiscono una Promise che si risolve con `{ status, data }`, oppure viene rifiutata con un errore che, se il server ha risposto, ha `error.response = { status, data: { error } }`. Con la categoria `\"offline\"` simula invece un server irraggiungibile: l'errore ha solo `message` (`\"Network Error\"`) e nessun `response`.\n\nScrivi due funzioni async:\n1. `getProducts(categoria)`: chiama `fakeAxios.get(\"/prodotti\", { params: { categoria } })` e restituisce `response.data`\n2. `updateProduct(id, modifiche)`: chiama `fakeAxios.put(\"/prodotti/\" + id, modifiche)` e restituisce `response.data`\n\nIn caso di errore devono rilanciare un nuovo errore con messaggio `\"Caricamento fallito: \" + message` (per getProducts) o `\"Aggiornamento fallito: \" + message` (per updateProduct), dove `message` è il messaggio del server (`error.response?.data?.error`) oppure, se manca, `error.message`.",
        difficulty: "difficile",
        starterCode: `const prodotti = [
  { id: 1, nome: "Dune", categoria: "libri", prezzo: 12 },
  { id: 2, nome: "Cuffie", categoria: "elettronica", prezzo: 49 },
  { id: 3, nome: "Emma", categoria: "libri", prezzo: 9 },
];

function httpError(status, messaggio) {
  const error = new Error("Request failed with status code " + status);
  error.response = { status: status, data: { error: messaggio } };
  return error;
}

const fakeAxios = {
  get(url, config) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const categoria = config?.params?.categoria;
        if (categoria === "offline") return reject(new Error("Network Error"));
        if (url !== "/prodotti") return reject(httpError(404, "Indirizzo inesistente"));
        if (categoria === "errore") return reject(httpError(500, "Server non disponibile"));
        const data = prodotti.filter((p) => !categoria || p.categoria === categoria);
        resolve({ status: 200, data: data });
      }, 200);
    });
  },
  put(url, body) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const id = Number(url.split("/").pop());
        const prodotto = prodotti.find((p) => p.id === id);
        if (!prodotto) return reject(httpError(404, "Prodotto " + id + " non trovato"));
        if (body.prezzo !== undefined && body.prezzo < 0) return reject(httpError(400, "Il prezzo non può essere negativo"));
        resolve({ status: 200, data: { ...prodotto, ...body } });
      }, 200);
    });
  },
};

async function getProducts(categoria) {
  // scrivi qui
}

async function updateProduct(id, modifiche) {
  // scrivi qui
}

getProducts("libri").then((lista) => console.log(lista));
updateProduct(99, { prezzo: 10 }).catch((error) => console.log(error.message));`,
        solution: `const prodotti = [
  { id: 1, nome: "Dune", categoria: "libri", prezzo: 12 },
  { id: 2, nome: "Cuffie", categoria: "elettronica", prezzo: 49 },
  { id: 3, nome: "Emma", categoria: "libri", prezzo: 9 },
];

function httpError(status, messaggio) {
  const error = new Error("Request failed with status code " + status);
  error.response = { status: status, data: { error: messaggio } };
  return error;
}

const fakeAxios = {
  get(url, config) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const categoria = config?.params?.categoria;
        if (categoria === "offline") return reject(new Error("Network Error"));
        if (url !== "/prodotti") return reject(httpError(404, "Indirizzo inesistente"));
        if (categoria === "errore") return reject(httpError(500, "Server non disponibile"));
        const data = prodotti.filter((p) => !categoria || p.categoria === categoria);
        resolve({ status: 200, data: data });
      }, 200);
    });
  },
  put(url, body) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const id = Number(url.split("/").pop());
        const prodotto = prodotti.find((p) => p.id === id);
        if (!prodotto) return reject(httpError(404, "Prodotto " + id + " non trovato"));
        if (body.prezzo !== undefined && body.prezzo < 0) return reject(httpError(400, "Il prezzo non può essere negativo"));
        resolve({ status: 200, data: { ...prodotto, ...body } });
      }, 200);
    });
  },
};

async function getProducts(categoria) {
  try {
    const response = await fakeAxios.get("/prodotti", { params: { categoria } });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.error ?? error.message;
    throw new Error("Caricamento fallito: " + message);
  }
}

async function updateProduct(id, modifiche) {
  try {
    const response = await fakeAxios.put("/prodotti/" + id, modifiche);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.error ?? error.message;
    throw new Error("Aggiornamento fallito: " + message);
  }
}

getProducts("libri").then((lista) => console.log(lista));
updateProduct(99, { prezzo: 10 }).catch((error) => console.log(error.message));`,
        validate: `if (typeof getProducts !== "function") return "Definisci la funzione async getProducts";
if (typeof updateProduct !== "function") return "Definisci la funzione async updateProduct";
async function errore(promessa) {
  try {
    const r = await promessa;
    return { ok: true, r: r };
  } catch (e) {
    return { ok: false, e: e };
  }
}
const libri = await errore(getProducts("libri"));
if (!libri.ok) return "getProducts(\\"libri\\") non dovrebbe fallire, invece lancia: " + libri.e.message + ". Hai passato { params: { categoria } } come secondo argomento?";
if (!Array.isArray(libri.r) || !$equal(libri.r.map((p) => p.nome), ["Dune", "Emma"])) return "getProducts(\\"libri\\") dovrebbe restituire i due libri (response.data), invece restituisce " + $format(libri.r);
const elettr = await errore(getProducts("elettronica"));
if (!elettr.ok || !$equal(elettr.r.map((p) => p.nome), ["Cuffie"])) return "getProducts(\\"elettronica\\") dovrebbe restituire solo le Cuffie: passa la categoria in params";
const e500 = await errore(getProducts("errore"));
if (e500.ok) return "getProducts(\\"errore\\") dovrebbe lanciare un errore";
if (e500.e.message !== "Caricamento fallito: Server non disponibile") return "Con il server in errore mi aspetto il messaggio \\"Caricamento fallito: Server non disponibile\\", invece è " + $format(e500.e.message) + ". Usa error.response?.data?.error";
const off = await errore(getProducts("offline"));
if (off.ok) return "getProducts(\\"offline\\") dovrebbe lanciare un errore";
if (off.e.message !== "Caricamento fallito: Network Error") return "Senza rete error.response non esiste: mi aspetto \\"Caricamento fallito: Network Error\\", invece è " + $format(off.e.message) + ". Usa ?. e ?? error.message";
const upd = await errore(updateProduct(3, { prezzo: 7 }));
if (!upd.ok) return "updateProduct(3, { prezzo: 7 }) non dovrebbe fallire, invece lancia: " + upd.e.message;
if (!$equal(upd.r, { id: 3, nome: "Emma", categoria: "libri", prezzo: 7 })) return "updateProduct(3, { prezzo: 7 }) dovrebbe restituire il prodotto aggiornato (response.data), invece restituisce " + $format(upd.r);
const u404 = await errore(updateProduct(99, { prezzo: 10 }));
if (u404.ok) return "updateProduct(99, ...) dovrebbe lanciare un errore";
if (u404.e.message !== "Aggiornamento fallito: Prodotto 99 non trovato") return "Mi aspetto \\"Aggiornamento fallito: Prodotto 99 non trovato\\", invece è " + $format(u404.e.message);
const u400 = await errore(updateProduct(1, { prezzo: -5 }));
if (u400.ok || u400.e.message !== "Aggiornamento fallito: Il prezzo non può essere negativo") return "updateProduct(1, { prezzo: -5 }) dovrebbe fallire con \\"Aggiornamento fallito: Il prezzo non può essere negativo\\"";
return true;`,
        solutionExplanation:
          "Ogni funzione nasconde i dettagli di HTTP: restituisce direttamente `response.data` e, nel `catch`, costruisce un messaggio leggibile. `error.response?.data?.error` legge il messaggio del server senza errori anche quando `response` non esiste (rete assente); in quel caso `??` ripiega su `error.message`. Rilanciando con `throw new Error(...)`, chi chiama la funzione riceve un errore chiaro e decide cosa mostrare.",
      },
    ],
  },
};
