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
    ],
  },
};
