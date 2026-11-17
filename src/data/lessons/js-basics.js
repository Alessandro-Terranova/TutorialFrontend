export const lessons = {
  // ---------------------------------------------------------------------------
  // VARIABILI, TIPI E OPERATORI
  // ---------------------------------------------------------------------------
  "variables": {
    sections: [
      {
        type: "text",
        content:
          "Le variabili sono i mattoncini fondamentali di qualsiasi programma JavaScript. Servono a conservare valori (numeri, testi, valori vero/falso...) per poterli riutilizzare. In JavaScript moderno abbiamo tre parole chiave per dichiararle: `let`, `const` e `var`.",
      },
      {
        type: "heading",
        content: "console.log: vedere i valori",
      },
      {
        type: "text",
        content:
          "`console.log(...)` stampa nella console uno o più valori. È lo strumento più semplice per capire cosa sta facendo il tuo codice: negli esercizi lo userai continuamente. Puoi passargli più valori separati da virgola.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Il primo console.log",
        code: `console.log("Ciao, mondo!");   // Ciao, mondo!
console.log(42);               // 42
console.log("Totale:", 10);    // Totale: 10

// Tutto ciò che segue // è un commento: JavaScript lo ignora`,
      },
      {
        type: "heading",
        content: "let, const e var",
      },
      {
        type: "text",
        content:
          "`const` dichiara una variabile che non può essere riassegnata. `let` invece permette la riassegnazione. `var` è la forma più vecchia: ha uno *scope* diverso (function scope anziché block scope) e oggi si evita quasi sempre. Un *blocco* è una porzione di codice racchiusa tra parentesi graffe `{ }`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Dichiarazioni a confronto",
        code: `const appName = "MyApp";       // non riassegnabile
let currentPage = "home";      // riassegnabile
currentPage = "carrello";      // OK
// appName = "Altro";          // TypeError: assignment to constant variable

// var ha function scope, NON block scope
{
  var leaked = "visibile fuori!";
  let blockScoped = "solo qui dentro";
}
console.log(leaked);      // "visibile fuori!"
// console.log(blockScoped); // ReferenceError`,
      },
      {
        type: "tip",
        content:
          "Usa `const` per default e `let` solo quando devi davvero riassegnare la variabile. Evita `var`: nel codice moderno non serve più.",
      },
      {
        type: "heading",
        content: "Tipi primitivi",
      },
      {
        type: "text",
        content:
          "JavaScript ha sette tipi primitivi. I più comuni sono: `string` (testo, tra virgolette), `number` (numeri interi e decimali), `boolean` (`true`/`false`), `null` (assenza intenzionale di valore) e `undefined` (valore non ancora assegnato). L'operatore `typeof` restituisce il tipo di un valore.",
      },
      {
        type: "code",
        language: "javascript",
        title: "I tipi primitivi",
        code: `const productName = "Zaino";   // string
const price = 39.9;            // number
const inStock = true;          // boolean
const coupon = null;           // null  (assenza intenzionale)
let notYet;                    // undefined (non assegnato)

console.log(typeof productName); // "string"
console.log(typeof price);       // "number"
console.log(typeof inStock);     // "boolean"
console.log(typeof coupon);      // "object"  (bug storico di JS!)
console.log(typeof notYet);      // "undefined"`,
      },
      {
        type: "warning",
        content:
          "`typeof null` restituisce `\"object\"`: è un bug storico di JavaScript mai corretto. Per controllare null usa `value === null`.",
      },
      {
        type: "heading",
        content: "Operatori aritmetici e concatenazione",
      },
      {
        type: "text",
        content:
          "Con i numeri puoi usare `+`, `-`, `*`, `/`, `%` (resto della divisione) e `**` (potenza). Esistono anche le forme abbreviate `+=`, `-=`, `++` e `--` per aggiornare una variabile. Con le stringhe, l'operatore `+` le unisce (*concatenazione*).",
      },
      {
        type: "code",
        language: "javascript",
        title: "Calcoli e concatenazione",
        code: `console.log(7 + 3);   // 10
console.log(7 - 3);   // 4
console.log(7 * 3);   // 21
console.log(7 / 2);   // 3.5
console.log(7 % 2);   // 1  (resto: utile per sapere se un numero è pari)
console.log(2 ** 3);  // 8

let cartItems = 2;
cartItems += 3;       // come cartItems = cartItems + 3  -> 5
cartItems++;          // aggiunge 1 -> 6
console.log(cartItems); // 6

// Concatenazione di stringhe con +
const firstName = "Giulia";
const greeting = "Ciao, " + firstName + "!";
console.log(greeting); // "Ciao, Giulia!"

const total = 3 * 12;
console.log("Totale: " + total + " euro"); // "Totale: 36 euro"`,
      },
      {
        type: "heading",
        content: "Type coercion e confronti",
      },
      {
        type: "text",
        content:
          "Per confrontare valori si usano `<`, `>`, `<=`, `>=`, l'uguaglianza e la disuguaglianza. JavaScript può convertire i tipi automaticamente (*coercion*). L'operatore `==` confronta *dopo* la coercion, mentre `===` confronta senza conversioni (*strict equality*); lo stesso vale per `!=` e `!==`. Usa sempre `===` e `!==` per evitare sorprese.",
      },
      {
        type: "code",
        language: "javascript",
        title: "== vs === e coercion",
        code: `console.log(5 > 3);       // true
console.log(5 <= 4);      // false
console.log(5 !== 3);     // true

// Coercion implicita
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
        content: "if, else if ed else",
      },
      {
        type: "text",
        content:
          "Per eseguire codice solo quando una condizione è vera si usa `if (condizione) { ... }`. Il blocco `else { ... }` viene eseguito quando la condizione è falsa. Con `else if` puoi controllare più condizioni in sequenza: viene eseguito solo il primo blocco la cui condizione è vera.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Condizioni",
        code: `const temperature = 18;

if (temperature > 25) {
  console.log("Fa caldo");
} else if (temperature > 15) {
  console.log("Si sta bene");   // <- viene eseguito questo
} else {
  console.log("Fa freddo");
}

// Le condizioni possono essere qualsiasi espressione
const cartTotal = 60;
let shipping = 5;
if (cartTotal >= 50) {
  shipping = 0;
}
console.log("Spedizione: " + shipping + " euro"); // "Spedizione: 0 euro"`,
      },
      {
        type: "heading",
        content: "Operatori logici e ternario",
      },
      {
        type: "text",
        content:
          "Gli operatori logici `&&` (AND), `||` (OR) e `!` (NOT) servono a combinare condizioni. In realtà non restituiscono solo `true`/`false`: restituiscono il primo valore che determina il risultato (*short-circuit evaluation*). L'operatore ternario `condizione ? valoreSeVero : valoreSeFalso` è una forma compatta di `if/else` che produce un valore.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Operatori logici e ternario",
        code: `// Combinare condizioni
const age = 20;
const hasTicket = true;
if (age >= 18 && hasTicket) {
  console.log("Puoi entrare");
}

// Short-circuit: && restituisce il primo falsy, || il primo truthy
const userName = "";
const displayName = userName || "Ospite";   // "Ospite"
console.log(displayName);

// Ternario
const itemsInCart = 3;
const label = itemsInCart === 1 ? "1 prodotto" : itemsInCart + " prodotti";
console.log(label); // "3 prodotti"

// Valori "falsy": false, 0, "", null, undefined, NaN
console.log(!0);         // true
console.log(!!"hello");  // true  (doppio NOT per convertire a boolean)
console.log(!!0);        // false`,
      },
      {
        type: "info",
        content:
          "I valori *falsy* in JavaScript sono: `false`, `0`, `\"\"` (stringa vuota), `null`, `undefined` e `NaN`. Tutto il resto è *truthy*, inclusi `[]` e `{}` (array e oggetti vuoti, che vedremo nelle prossime lezioni).",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "typeof e tipi",
        description: "Qual è il risultato di `typeof null`?",
        difficulty: "facile",
        options: [
          '"null"',
          '"object"',
          '"undefined"',
          "Lancia un errore",
        ],
        correct: 1,
        explanation:
          '`typeof null` restituisce `"object"`. È un bug storico di JavaScript presente fin dalla prima versione del linguaggio e mai corretto per motivi di compatibilità.',
      },
      {
        type: "multiple-choice",
        title: "+ e - con le stringhe",
        description:
          'Cosa stampa questo codice?\n`console.log("3" + 2, "3" - 2);`',
        difficulty: "facile",
        options: ["`5 1`", "`32 32`", "`32 1`", "`NaN 1`"],
        correct: 2,
        explanation:
          'Se uno dei due operandi è una stringa, `+` **concatena**: `"3" + 2` diventa `"32"`. L\'operatore `-` invece esiste solo per i numeri, quindi JavaScript converte `"3"` in `3` (coercion) e calcola `3 - 2 = 1`. Per questo `5 1` e `32 32` sono sbagliate, e non c\'è nessun `NaN`: `"3"` si converte senza problemi in un numero.',
      },
      {
        type: "multiple-choice",
        title: "Riassegnare una const",
        description:
          "Cosa succede eseguendo questo codice?\n`const total = 10;`\n`total = total + 5;`\n`console.log(total);`",
        difficulty: "facile",
        options: [
          "Si verifica un errore (TypeError) alla seconda riga",
          "Stampa `15`",
          "Stampa `10`: la riassegnazione viene ignorata senza errori",
          "Stampa `undefined`",
        ],
        correct: 0,
        explanation:
          "Una variabile dichiarata con `const` non può essere riassegnata: la seconda riga lancia `TypeError: Assignment to constant variable` e il programma si ferma prima del `console.log`. JavaScript non ignora in silenzio la riassegnazione e non cambia il valore. Se il valore deve cambiare, dichiara la variabile con `let`.",
      },
      {
        type: "multiple-choice",
        title: "|| e i valori falsy",
        description:
          'Cosa stampa questo codice?\n`const quantity = 0;`\n`const shown = quantity || "nessuno";`\n`console.log(shown);`',
        difficulty: "medio",
        options: ["`0`", "`true`", "`undefined`", "`nessuno`"],
        correct: 3,
        explanation:
          '`||` restituisce il primo valore *truthy*, oppure l\'ultimo valore se nessuno lo è. `0` è *falsy*, quindi `||` passa al secondo operando e restituisce `"nessuno"`. Non restituisce `true`: gli operatori logici restituiscono uno dei valori, non necessariamente un boolean. Attenzione a questo comportamento quando `0` è un valore valido (come una quantità).',
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
        validate: `
if (a !== 42) return "a deve contenere il numero 42 (senza virgolette)";
if (b !== "42") return "b deve contenere la stringa \\"42\\" (con le virgolette)";
if (!/===/.test($codeNoComments)) return "Usa l'operatore === per confrontare a e b";
if (isStrictEqual !== false) return "isStrictEqual deve essere il risultato di a === b (cioè false)";
if (!$logs.includes("false")) return "Stampa isStrictEqual con console.log";
return true;`,
      },
      {
        type: "code",
        title: "if/else e ternario",
        description:
          'Hai una variabile `score`. Usa `if`, `else if` ed `else` per assegnare alla variabile `grade`: `"Ottimo"` se `score >= 90`, `"Promosso"` se `score >= 60`, altrimenti `"Bocciato"`.\nPoi crea `message` usando l\'operatore ternario: se `grade` è diverso da `"Bocciato"` deve valere `"Esame superato"`, altrimenti `"Riprova"`. Stampa `grade` e `message`.',
        difficulty: "medio",
        starterCode: `const score = 75;
let grade;
// Scrivi qui sotto
`,
        solution: `const score = 75;
let grade;
if (score >= 90) {
  grade = "Ottimo";
} else if (score >= 60) {
  grade = "Promosso";
} else {
  grade = "Bocciato";
}
const message = grade !== "Bocciato" ? "Esame superato" : "Riprova";
console.log(grade);
console.log(message);`,
        solutionExplanation:
          "Le condizioni vengono controllate dall'alto verso il basso e viene eseguito solo il primo ramo vero: per questo si parte dalla soglia più alta (`>= 90`). Con `score = 75` la prima condizione è falsa e la seconda vera, quindi `grade` diventa `\"Promosso\"`. Il ternario produce direttamente un valore, per cui si può assegnare a `message` in una sola riga.",
        validate: `
const code = $codeNoComments;
if (!/\\bif\\s*\\(/.test(code)) return "Usa un'istruzione if (...) { ... }";
if (!/else\\s+if\\s*\\(/.test(code)) return "Aggiungi un ramo else if (...) per il caso score >= 60";
if (!/\\belse\\s*\\{/.test(code)) return "Aggiungi un ramo else { ... } finale per il caso \\"Bocciato\\"";
if (!/\\?[^?]*:/.test(code)) return "Crea message con l'operatore ternario: condizione ? valore1 : valore2";
if (grade !== "Promosso") return "Con score = 75, grade dovrebbe valere \\"Promosso\\"";
if (message !== "Esame superato") return "Con grade = \\"Promosso\\", message dovrebbe valere \\"Esame superato\\"";
if (!$logs.includes("Promosso") || !$logs.includes("Esame superato")) return "Stampa sia grade sia message con console.log";
return true;`,
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
          "Le funzioni sono blocchi di codice riutilizzabili: ricevono dei valori in ingresso (*parametri*), eseguono delle istruzioni e possono restituire un risultato con `return`. In JavaScript ci sono diversi modi per definirle, ognuno con le proprie caratteristiche. Capire le differenze è essenziale per lavorare con React e con il codice moderno.",
      },
      {
        type: "heading",
        content: "Dichiarazioni vs espressioni",
      },
      {
        type: "text",
        content:
          'Una *function declaration* viene "sollevata" (*hoisting*): può essere chiamata anche prima della riga in cui è scritta. Una *function expression* assegnata a una variabile, invece, segue le regole di `const`/`let` e non è disponibile prima della sua definizione.',
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
          "Le arrow functions (`=>`) sono la forma più concisa e moderna. Se il corpo è una sola espressione, `return` e graffe si possono omettere (*implicit return*). Sono la scelta predefinita nel codice React moderno.",
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

console.log(addShort(2, 3)); // 5
console.log(double(4));      // 8
console.log(greet());        // "Ciao!"`,
      },
      {
        type: "tip",
        content:
          "Preferisci le arrow functions per funzioni brevi e callback: sono più compatte e leggibili. Dai sempre alle funzioni nomi che descrivono cosa fanno (`calculateTotal`, `formatPrice`), non come lo fanno.",
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
        code: `const formatPrice = (amount, currency = "EUR") => {
  return amount + " " + currency;
};

console.log(formatPrice(25));        // "25 EUR"
console.log(formatPrice(25, "USD")); // "25 USD"

function greetUser(name = "Ospite") {
  return "Benvenuto, " + name + "!";
}
console.log(greetUser());          // "Benvenuto, Ospite!"
console.log(greetUser("Luca"));    // "Benvenuto, Luca!"`,
      },
      {
        type: "heading",
        content: "Callback: passare funzioni come argomenti",
      },
      {
        type: "text",
        content:
          "In JavaScript le funzioni sono valori: puoi salvarle in variabili e passarle come argomenti ad altre funzioni. Una funzione passata a un'altra funzione si chiama *callback*. È un pattern fondamentale: lo ritroverai nei metodi degli array (lezione successiva), negli eventi delle pagine web e in React.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Callback in azione",
        code: `// calculate riceve due numeri e una funzione che decide cosa farne
const calculate = (a, b, operation) => operation(a, b);

const add = (x, y) => x + y;
const multiply = (x, y) => x * y;

console.log(calculate(4, 5, add));       // 9
console.log(calculate(4, 5, multiply));  // 20

// Il callback si può anche scrivere direttamente nella chiamata
console.log(calculate(10, 3, (x, y) => x - y)); // 7

// Eseguire una funzione due volte su un valore
const applyTwice = (fn, value) => fn(fn(value));
console.log(applyTwice((n) => n * 3, 2)); // 18  (2 * 3 * 3)`,
      },
      {
        type: "heading",
        content: "Funzioni che restituiscono funzioni (closure)",
      },
      {
        type: "text",
        content:
          "Una funzione può anche *restituire* un'altra funzione. La funzione interna \"ricorda\" le variabili della funzione esterna in cui è stata creata, anche dopo che questa ha finito di essere eseguita: questo meccanismo si chiama *closure*.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Closure",
        code: `const createGreeter = (greeting) => {
  return (name) => greeting + ", " + name + "!";
};

const sayHello = createGreeter("Ciao");
const sayGoodMorning = createGreeter("Buongiorno");
console.log(sayHello("Anna"));        // "Ciao, Anna!"
console.log(sayGoodMorning("Marco")); // "Buongiorno, Marco!"

// Un contatore: count resta "privato" dentro la closure
const createCounter = () => {
  let count = 0;
  return () => {
    count++;
    return count;
  };
};
const next = createCounter();
console.log(next()); // 1
console.log(next()); // 2
console.log(next()); // 3`,
      },
      {
        type: "heading",
        content: "IIFE (Immediately Invoked Function Expression)",
      },
      {
        type: "text",
        content:
          "Una IIFE è una funzione che viene definita e immediatamente eseguita. Si usa per isolare lo scope o per eseguire codice di inizializzazione senza inquinare lo scope globale.",
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
          "Le IIFE sono meno frequenti nel codice moderno grazie ai moduli, ma le trovi ancora per inizializzazioni immediate o per creare scope isolati nel codice più datato.",
      },
      {
        type: "heading",
        content: "Riepilogo: quando usare cosa",
      },
      {
        type: "list",
        items: [
          "Arrow function: la scelta di default per callback, handler ed espressioni brevi",
          "Function declaration: utile quando serve l'hoisting o per funzioni di supporto con un nome chiaro",
          "Function expression: rara, usata quando devi assegnare la funzione a una variabile ma preferisci la sintassi classica",
          "IIFE: per codice da eseguire immediatamente in uno scope isolato",
        ],
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "Hoisting",
        description:
          "Quale di questi due frammenti funziona senza errori?\n\n**A**\n`console.log(square(3));`\n`function square(n) { return n * n; }`\n\n**B**\n`console.log(square(3));`\n`const square = (n) => n * n;`",
        difficulty: "medio",
        options: [
          "Entrambi stampano `9`",
          "Solo A stampa `9`; B lancia un errore",
          "Solo B stampa `9`; A lancia un errore",
          "Nessuno dei due: una funzione va sempre definita prima di usarla",
        ],
        correct: 1,
        explanation:
          "Le *function declaration* (A) vengono sollevate (*hoisting*): sono disponibili in tutto lo scope, anche prima della riga in cui sono scritte. Una arrow function assegnata a `const` (B) segue invece le regole di `const`: prima della dichiarazione la variabile non è utilizzabile e si ottiene un `ReferenceError`. Quindi non funzionano entrambi né nessuno dei due, e il caso che fallisce è B, non A.",
      },
      {
        type: "multiple-choice",
        title: "Implicit return con le graffe",
        description:
          "Cosa stampa questo codice?\n`const double = (n) => { n * 2 };`\n`console.log(double(4));`",
        difficulty: "medio",
        options: ["`8`", "`4`", "Un errore di sintassi", "`undefined`"],
        correct: 3,
        explanation:
          "Con le graffe `{ }` la arrow function ha un corpo a blocco, e in quel caso il *return implicito* non c'è: senza `return` la funzione restituisce `undefined`. Il codice è sintatticamente valido, quindi non c'è errore. Per ottenere `8` bisogna scrivere `(n) => n * 2` (senza graffe) oppure `(n) => { return n * 2; }`.",
      },
      {
        type: "multiple-choice",
        title: "Closure e contatori",
        description:
          "Cosa stampa questo codice?\n`const createCounter = () => {`\n`  let count = 0;`\n`  return () => { count++; return count; };`\n`};`\n`const a = createCounter();`\n`const b = createCounter();`\n`a(); a();`\n`console.log(a(), b());`",
        difficulty: "difficile",
        options: ["`3 1`", "`3 4`", "`1 1`", "`2 1`"],
        correct: 0,
        explanation:
          "Ogni chiamata a `createCounter` crea una **nuova** variabile `count`, ricordata dalla funzione restituita (closure). `a` e `b` hanno quindi contatori separati: `a` è già stato chiamato due volte, e la terza chiamata restituisce `3`; `b` viene chiamato per la prima volta e restituisce `1`. `3 4` presuppone un contatore condiviso, `1 1` un contatore che si azzera a ogni chiamata, `2 1` dimentica che anche `a()` dentro il `console.log` incrementa.",
      },
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
        validate: `
if (typeof triple !== "function") return "Definisci la funzione triple";
if (!/=>/.test($codeNoComments)) return "Usa una arrow function (=>)";
if (triple(7) !== 21) return "triple(7) dovrebbe restituire 21";
if (triple(0) !== 0 || triple(-2) !== -6 || triple(1.5) !== 4.5) return "triple deve funzionare con qualsiasi numero (es. triple(-2) deve restituire -6)";
if (!$logs.includes("21")) return "Stampa il risultato di triple(7) con console.log";
return true;`,
      },
      {
        type: "code",
        title: "Callback con valore di default",
        description:
          "Crea una funzione `applyOperation(a, b, operation)` che restituisce il risultato di `operation(a, b)`.\nIl parametro `operation` deve avere come valore di default una funzione che somma i due numeri, così `applyOperation(2, 3)` restituisce `5`.\nPoi stampa `applyOperation(2, 3)` e `applyOperation(2, 3, (x, y) => x * y)`.",
        difficulty: "medio",
        starterCode: `// Scrivi applyOperation qui
`,
        solution: `const applyOperation = (a, b, operation = (x, y) => x + y) => operation(a, b);
console.log(applyOperation(2, 3));
console.log(applyOperation(2, 3, (x, y) => x * y));`,
        solutionExplanation:
          "Il valore di default di un parametro può essere qualsiasi espressione, anche una funzione: `operation = (x, y) => x + y`. Quando la chiamata non passa il terzo argomento, `operation` è `undefined` e viene usato il default; altrimenti si usa la funzione ricevuta. Il corpo si limita a chiamare `operation(a, b)`: è `applyOperation` a decidere *quando* chiamarla, il chiamante decide *cosa* fa.",
        validate: `
if (typeof applyOperation !== "function") return "Definisci la funzione applyOperation";
let r;
try { r = applyOperation(2, 3); } catch (e) { return "applyOperation(2, 3) genera un errore: hai dato un default a operation?"; }
if (r !== 5) return "applyOperation(2, 3) dovrebbe restituire 5 (default: somma)";
if (applyOperation(10, 4) !== 14) return "Il default deve sommare a e b: applyOperation(10, 4) dovrebbe restituire 14";
if (applyOperation(2, 3, (x, y) => x * y) !== 6) return "applyOperation(2, 3, (x, y) => x * y) dovrebbe restituire 6";
if (applyOperation(10, 4, (x, y) => x - y) !== 6) return "applyOperation deve chiamare operation(a, b) nell'ordine giusto";
if (!$logs.includes("5") || !$logs.includes("6")) return "Stampa i due risultati richiesti con console.log";
return true;`,
      },
      {
        type: "code",
        title: "Funzione che restituisce una funzione",
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
        solutionExplanation:
          "`(factor) => (n) => n * factor` è una arrow function che restituisce (con il return implicito) un'altra arrow function. La funzione interna ricorda il valore di `factor` con cui è stata creata (closure): `double` ricorda `2`, `tenTimes` ricorda `10`, anche se `createMultiplier` ha già finito di essere eseguita. La forma estesa equivalente è `(factor) => { return (n) => { return n * factor; }; }`.",
        validate: `
if (typeof createMultiplier !== "function") return "Definisci la funzione createMultiplier";
const byThree = createMultiplier(3);
if (typeof byThree !== "function") return "createMultiplier deve restituire una funzione";
if (byThree(4) !== 12 || createMultiplier(7)(2) !== 14) return "La funzione restituita deve moltiplicare il suo argomento per factor";
if (typeof double !== "function" || double(5) !== 10 || double(8) !== 16) return "double deve essere createMultiplier(2)";
if (typeof tenTimes !== "function" || tenTimes(5) !== 50 || tenTimes(3) !== 30) return "tenTimes deve essere createMultiplier(10)";
if (!$logs.includes("10") || !$logs.includes("50")) return "Stampa double(5) e tenTimes(5)";
return true;`,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // ARRAY: LE BASI
  // ---------------------------------------------------------------------------
  "arrays": {
    sections: [
      {
        type: "text",
        content:
          "Gli array sono collezioni ordinate di valori. Sono il modo principale per gestire liste di dati: i brani di una playlist, le cose da fare, i prezzi di un carrello. In questa lezione lavoriamo con array di valori semplici (stringhe e numeri); con gli array di oggetti lavoreremo dopo la lezione sugli oggetti.",
      },
      {
        type: "heading",
        content: "Creare e accedere agli array",
      },
      {
        type: "text",
        content:
          "Un array si crea con le parentesi quadre, separando gli elementi con la virgola. Ogni elemento ha un *indice* numerico che parte da **0**. La proprietà `length` indica quanti elementi ci sono, quindi l'ultimo elemento ha indice `length - 1`. Leggere un indice che non esiste restituisce `undefined`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Basi degli array",
        code: `const playlist = ["Imagine", "Yesterday", "Hallelujah"];

console.log(playlist[0]);      // "Imagine" (primo elemento)
console.log(playlist[2]);      // "Hallelujah"
console.log(playlist.length);  // 3
console.log(playlist[playlist.length - 1]); // "Hallelujah" (ultimo)
console.log(playlist[10]);     // undefined (non esiste)

// Si può modificare un elemento tramite il suo indice
// (anche se l'array è const: const impedisce di riassegnare la variabile,
//  non di modificare il contenuto dell'array)
playlist[1] = "Let It Be";
console.log(playlist); // ["Imagine", "Let It Be", "Hallelujah"]

const empty = [];
console.log(empty.length); // 0`,
      },
      {
        type: "heading",
        content: "Aggiungere e rimuovere: push, pop, shift, unshift",
      },
      {
        type: "text",
        content:
          "`push` aggiunge elementi alla fine e `pop` rimuove (e restituisce) l'ultimo. `unshift` aggiunge elementi all'inizio e `shift` rimuove (e restituisce) il primo. Tutti e quattro **modificano** l'array originale.",
      },
      {
        type: "code",
        language: "javascript",
        title: "push, pop, shift, unshift",
        code: `const todos = ["Fare la spesa", "Studiare"];

todos.push("Chiamare Anna");      // aggiunge alla fine
console.log(todos); // ["Fare la spesa", "Studiare", "Chiamare Anna"]

const last = todos.pop();         // rimuove dalla fine
console.log(last);  // "Chiamare Anna"

todos.unshift("Fare colazione");  // aggiunge all'inizio
console.log(todos); // ["Fare colazione", "Fare la spesa", "Studiare"]

const first = todos.shift();      // rimuove dall'inizio
console.log(first); // "Fare colazione"
console.log(todos); // ["Fare la spesa", "Studiare"]`,
      },
      {
        type: "heading",
        content: "Cercare un valore: includes e indexOf",
      },
      {
        type: "text",
        content:
          "`includes(valore)` restituisce `true` se il valore è presente nell'array. `indexOf(valore)` restituisce l'indice della prima occorrenza, oppure `-1` se il valore non c'è.",
      },
      {
        type: "code",
        language: "javascript",
        title: "includes e indexOf",
        code: `const fruits = ["mela", "pera", "banana", "pera"];

console.log(fruits.includes("banana")); // true
console.log(fruits.includes("kiwi"));   // false

console.log(fruits.indexOf("pera"));    // 1 (la prima occorrenza)
console.log(fruits.indexOf("kiwi"));    // -1 (non trovato)

// Uso tipico in una condizione
if (!fruits.includes("kiwi")) {
  fruits.push("kiwi");
}
console.log(fruits.length); // 5`,
      },
      {
        type: "heading",
        content: "slice e splice",
      },
      {
        type: "text",
        content:
          "`slice(inizio, fine)` restituisce una **copia** di una porzione dell'array (l'indice `fine` è escluso) e non modifica l'originale. `splice(inizio, quanti, nuovo1, nuovo2, ...)` invece **modifica** l'array: rimuove `quanti` elementi a partire da `inizio` e, se vuoi, inserisce i nuovi elementi indicati al loro posto.",
      },
      {
        type: "code",
        language: "javascript",
        title: "slice vs splice",
        code: `const letters = ["a", "b", "c", "d", "e"];

// slice NON modifica l'originale
const middle = letters.slice(1, 3);
console.log(middle);   // ["b", "c"]
console.log(letters);  // ["a", "b", "c", "d", "e"] (invariato)
console.log(letters.slice(-2)); // ["d", "e"] (indici negativi: dalla fine)

// splice MODIFICA l'originale
const removed = letters.splice(1, 2);  // da indice 1, rimuovi 2 elementi
console.log(removed);  // ["b", "c"]
console.log(letters);  // ["a", "d", "e"]

letters.splice(1, 0, "x", "y");        // inserisce senza rimuovere
console.log(letters);  // ["a", "x", "y", "d", "e"]`,
      },
      {
        type: "heading",
        content: "Scorrere un array: for e for...of",
      },
      {
        type: "text",
        content:
          "Il ciclo `for` classico ha tre parti: inizializzazione (`let i = 0`), condizione (`i < arr.length`) e aggiornamento (`i++`). Il corpo viene ripetuto finché la condizione è vera, e `i` vale di volta in volta 0, 1, 2... Se non ti serve l'indice, il ciclo `for...of` è più semplice: a ogni giro ti dà direttamente l'elemento successivo.",
      },
      {
        type: "code",
        language: "javascript",
        title: "for e for...of",
        code: `const prices = [12, 5, 30];

// for classico: hai a disposizione l'indice i
for (let i = 0; i < prices.length; i++) {
  console.log("Prodotto " + i + ": " + prices[i] + " euro");
}
// Prodotto 0: 12 euro
// Prodotto 1: 5 euro
// Prodotto 2: 30 euro

// for...of: ottieni direttamente ogni elemento
let total = 0;
for (const price of prices) {
  total += price;
}
console.log(total); // 47

// Si può combinare con if
let expensive = 0;
for (const price of prices) {
  if (price > 10) {
    expensive++;
  }
}
console.log(expensive); // 2`,
      },
      {
        type: "heading",
        content: "forEach",
      },
      {
        type: "text",
        content:
          "`forEach` è un metodo che riceve una funzione *callback* (come visto nella lezione sulle funzioni) e la chiama per ogni elemento, passandole l'elemento e il suo indice. Non restituisce nulla: serve solo a \"fare qualcosa\" per ogni elemento.",
      },
      {
        type: "code",
        language: "javascript",
        title: "forEach",
        code: `const names = ["Alice", "Bruno", "Carla"];

names.forEach((name) => console.log("Ciao, " + name));
// Ciao, Alice
// Ciao, Bruno
// Ciao, Carla

// Il secondo parametro del callback è l'indice
names.forEach((name, index) => {
  console.log((index + 1) + ". " + name);
});
// 1. Alice
// 2. Bruno
// 3. Carla`,
      },
      {
        type: "heading",
        content: "map: trasformare ogni elemento",
      },
      {
        type: "text",
        content:
          "`map` crea un **nuovo** array della stessa lunghezza, in cui ogni elemento è il valore restituito dal callback. Non modifica l'array originale. È uno dei metodi più usati in assoluto (in React servirà per trasformare liste di dati in elementi della pagina).",
      },
      {
        type: "code",
        language: "javascript",
        title: "map",
        code: `const numbers = [1, 2, 3, 4];

const doubled = numbers.map((n) => n * 2);
console.log(doubled); // [2, 4, 6, 8]
console.log(numbers); // [1, 2, 3, 4] (invariato)

const prices = [10, 25, 40];
const labels = prices.map((p) => p + " euro");
console.log(labels); // ["10 euro", "25 euro", "40 euro"]

// Anche map riceve l'indice come secondo parametro
const songs = ["Imagine", "Yesterday"];
const numbered = songs.map((song, index) => (index + 1) + ". " + song);
console.log(numbered); // ["1. Imagine", "2. Yesterday"]`,
      },
      {
        type: "heading",
        content: "filter: tenere solo alcuni elementi",
      },
      {
        type: "text",
        content:
          "`filter` restituisce un **nuovo** array con solo gli elementi per cui il callback restituisce `true` (o un valore truthy). Anche `filter` non modifica l'originale.",
      },
      {
        type: "code",
        language: "javascript",
        title: "filter",
        code: `const temperatures = [12, 25, 31, 18, 29];

const hotDays = temperatures.filter((t) => t > 24);
console.log(hotDays); // [25, 31, 29]

const numbers = [1, 2, 3, 4, 5, 6];
const even = numbers.filter((n) => n % 2 === 0);
console.log(even); // [2, 4, 6]

// Rimuovere valori indesiderati
const votes = [8, null, 6, null, 9];
const validVotes = votes.filter((v) => v !== null);
console.log(validVotes); // [8, 6, 9]

// filter e map si possono concatenare
const evenSquares = numbers.filter((n) => n % 2 === 0).map((n) => n * n);
console.log(evenSquares); // [4, 16, 36]`,
      },
      {
        type: "warning",
        content:
          "Attenzione a quali metodi modificano l'array originale (*mutating*): `push`, `pop`, `shift`, `unshift` e `splice` lo modificano; `slice`, `map` e `filter` restituiscono un nuovo array lasciando intatto l'originale. In React questa differenza è molto importante, perché i dati dello stato non vanno modificati direttamente.",
      },
      {
        type: "info",
        content:
          'Ricorda: `map` e `filter` restituiscono un nuovo array, `forEach` restituisce `undefined`. Se devi trasformare o selezionare i dati, usa `map` o `filter`. Se devi solo "fare qualcosa" per ogni elemento (es. stamparlo), usa `forEach` o un ciclo `for...of`.',
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "Indici e length",
        description:
          'Cosa stampa questo codice?\n`const todos = ["Spesa", "Palestra", "Studiare"];`\n`console.log(todos[todos.length]);`',
        difficulty: "facile",
        options: ['`"Studiare"`', "`undefined`", "`3`", "Un errore: indice fuori dai limiti"],
        correct: 1,
        explanation:
          'Gli indici partono da 0, quindi con 3 elementi gli indici validi sono 0, 1 e 2. `todos.length` vale `3` e `todos[3]` non esiste: leggere un indice inesistente restituisce `undefined`, senza errori. Per l\'ultimo elemento (`"Studiare"`) serve `todos[todos.length - 1]`; `3` sarebbe il valore di `todos.length`, non l\'elemento.',
      },
      {
        type: "multiple-choice",
        title: "slice o splice?",
        description:
          'Cosa stampa questo codice?\n`const nums = [10, 20, 30, 40];`\n`const part = nums.slice(1, 3);`\n`console.log(part, nums.length);`',
        difficulty: "medio",
        options: [
          "`[20, 30] 2`",
          "`[20, 30, 40] 4`",
          "`[10, 20, 30] 4`",
          "`[20, 30] 4`",
        ],
        correct: 3,
        explanation:
          "`slice(1, 3)` restituisce una **copia** degli elementi dall'indice 1 fino al 3 **escluso**, cioè `[20, 30]`, e non modifica l'array originale, che resta lungo 4. `[20, 30] 2` sarebbe il comportamento di `splice(1, 2)`, che invece rimuove gli elementi dall'originale; le altre due opzioni ignorano che l'indice di fine è escluso o che gli indici partono da 0.",
      },
      {
        type: "multiple-choice",
        title: "forEach o map?",
        description:
          "Vuoi ottenere un nuovo array con i prezzi aumentati di 2 euro. Quale codice è corretto?\n**A** `const updated = prices.forEach((p) => p + 2);`\n**B** `const updated = prices.map((p) => p + 2);`\n**C** `const updated = prices.filter((p) => p + 2);`",
        difficulty: "medio",
        options: [
          "Solo B",
          "A e B: fanno la stessa cosa",
          "Solo A",
          "B e C",
        ],
        correct: 0,
        explanation:
          "`map` crea un nuovo array con il valore restituito dal callback per ogni elemento: è esattamente ciò che serve. `forEach` chiama il callback ma restituisce sempre `undefined`, quindi `updated` sarebbe `undefined`. `filter` usa il valore restituito solo come condizione vero/falso: `p + 2` è un numero diverso da 0 (truthy) e quindi `filter` restituirebbe una copia dei prezzi **non modificati**.",
      },
      {
        type: "code",
        title: "Gestire una playlist",
        description:
          'Hai l\'array `playlist`. Usando i metodi visti nella lezione (non riscrivere l\'array a mano):\n1. aggiungi `"Bohemian Rhapsody"` alla fine;\n2. aggiungi `"Imagine"` all\'inizio;\n3. rimuovi `"Yesterday"` usando `indexOf` per trovarne la posizione e `splice` per toglierlo.\nInfine crea `songCount` con il numero di brani (usa `length`) e stampa `playlist`.',
        difficulty: "facile",
        starterCode: `const playlist = ["Hey Jude", "Yesterday", "Let It Be"];

// Scrivi qui
`,
        solution: `const playlist = ["Hey Jude", "Yesterday", "Let It Be"];

playlist.push("Bohemian Rhapsody");
playlist.unshift("Imagine");
const index = playlist.indexOf("Yesterday");
playlist.splice(index, 1);
const songCount = playlist.length;
console.log(playlist);`,
        validate: `
const code = $codeNoComments;
if (!/\\.push\\(/.test(code)) return "Usa push per aggiungere \\"Bohemian Rhapsody\\" alla fine";
if (!/\\.unshift\\(/.test(code)) return "Usa unshift per aggiungere \\"Imagine\\" all'inizio";
if (!/\\.indexOf\\(/.test(code) || !/\\.splice\\(/.test(code)) return "Usa indexOf per trovare \\"Yesterday\\" e splice per rimuoverlo";
if (!$equal(playlist, ["Imagine", "Hey Jude", "Let It Be", "Bohemian Rhapsody"])) return "La playlist finale dovrebbe essere [\\"Imagine\\", \\"Hey Jude\\", \\"Let It Be\\", \\"Bohemian Rhapsody\\"]";
if (songCount !== 4 || !/\\.length/.test(code)) return "songCount deve essere playlist.length (cioè 4)";
if (!$logs.some((l) => l.includes("Bohemian Rhapsody"))) return "Stampa playlist con console.log";
return true;`,
      },
      {
        type: "code",
        title: "Somma con for...of",
        description:
          "Crea una funzione `sumPositive(numbers)` che riceve un array di numeri e restituisce la somma dei soli numeri **maggiori di zero**. Usa un ciclo `for` o `for...of` (non `filter`). Se l'array è vuoto deve restituire `0`.\nEsempio: `sumPositive([3, -2, 5, 0])` restituisce `8`.",
        difficulty: "medio",
        starterCode: `function sumPositive(numbers) {
  // Scrivi qui
}

console.log(sumPositive([3, -2, 5, 0]));`,
        solution: `function sumPositive(numbers) {
  let total = 0;
  for (const n of numbers) {
    if (n > 0) {
      total += n;
    }
  }
  return total;
}

console.log(sumPositive([3, -2, 5, 0]));`,
        solutionExplanation:
          "La variabile `total` parte da `0` ed è dichiarata con `let` perché viene aggiornata a ogni giro. `for...of` dà direttamente ogni numero e l'`if` decide se sommarlo. Partire da `0` gestisce automaticamente anche i casi limite: con un array vuoto (o senza numeri positivi) il ciclo non somma nulla e la funzione restituisce `0`.",
        validate: `
if (typeof sumPositive !== "function") return "Definisci la funzione sumPositive";
if (!/\\bfor\\s*\\(/.test($codeNoComments)) return "Usa un ciclo for o for...of";
if (sumPositive([3, -2, 5, 0]) !== 8) return "sumPositive([3, -2, 5, 0]) dovrebbe restituire 8";
if (sumPositive([]) !== 0) return "Con un array vuoto sumPositive deve restituire 0";
if (sumPositive([-1, -5]) !== 0) return "Se non ci sono numeri positivi il risultato deve essere 0";
if (sumPositive([10, 20, 30]) !== 60) return "sumPositive([10, 20, 30]) dovrebbe restituire 60";
if (sumPositive([1.5, -1, 2.5]) !== 4) return "sumPositive([1.5, -1, 2.5]) dovrebbe restituire 4";
return true;`,
      },
      {
        type: "code",
        title: "filter e map",
        description:
          "Crea una funzione `discountedPrices(prices)` che riceve un array di prezzi e restituisce un **nuovo** array con:\n1. solo i prezzi maggiori o uguali a 20 (usa `filter`);\n2. ognuno ridotto della metà (usa `map`).\nL'array originale non deve essere modificato.\nEsempio: `discountedPrices([10, 40, 20, 5])` restituisce `[20, 10]`.",
        difficulty: "difficile",
        starterCode: `const discountedPrices = (prices) => {
  // Scrivi qui
};

console.log(discountedPrices([10, 40, 20, 5]));`,
        solution: `const discountedPrices = (prices) => {
  return prices.filter((p) => p >= 20).map((p) => p / 2);
};

console.log(discountedPrices([10, 40, 20, 5]));`,
        solutionExplanation:
          "`filter` restituisce un nuovo array con i soli prezzi `>= 20`; su questo nuovo array si chiama subito `map`, che dimezza ogni elemento. L'ordine conta: se dimezzassi prima di filtrare, il prezzo `20` diventerebbe `10` e verrebbe scartato per errore. Né `filter` né `map` modificano l'array di partenza, quindi l'originale resta intatto.",
        validate: `
if (typeof discountedPrices !== "function") return "Definisci la funzione discountedPrices";
const code = $codeNoComments;
if (!/\\.filter\\(/.test(code)) return "Usa filter per tenere solo i prezzi >= 20";
if (!/\\.map\\(/.test(code)) return "Usa map per dimezzare i prezzi";
const input = [10, 40, 20, 5];
const result = discountedPrices(input);
if (!$equal(input, [10, 40, 20, 5])) return "Non modificare l'array originale";
if (!$equal(result, [20, 10])) return "discountedPrices([10, 40, 20, 5]) dovrebbe restituire [20, 10], invece restituisce " + $format(result);
if (!$equal(discountedPrices([100, 19, 50]), [50, 25])) return "discountedPrices([100, 19, 50]) dovrebbe restituire [50, 25]";
if (!$equal(discountedPrices([1, 2]), [])) return "Se nessun prezzo è >= 20 il risultato deve essere un array vuoto";
return true;`,
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
          "Gli oggetti sono il modo fondamentale di rappresentare dati strutturati in JavaScript: un insieme di coppie *chiave: valore* (dette *proprietà*). Un libro, un utente, un prodotto: tutto si descrive con un oggetto. In React gli oggetti sono ovunque: le props dei componenti, lo stato, le configurazioni.",
      },
      {
        type: "heading",
        content: "Object literals e accesso alle proprietà",
      },
      {
        type: "text",
        content:
          "Un oggetto si crea con le parentesi graffe. Si accede a una proprietà con la *dot notation* (`book.title`) oppure con la *bracket notation* (`book[\"title\"]`), utile quando il nome della chiave è contenuto in una variabile. Leggere una proprietà che non esiste restituisce `undefined`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Creare e accedere agli oggetti",
        code: `const book = {
  title: "Il nome della rosa",
  author: "Umberto Eco",
  year: 1980,
  available: true,
};

// Dot notation
console.log(book.title);    // "Il nome della rosa"

// Bracket notation (utile con chiavi dinamiche)
const key = "author";
console.log(book[key]);     // "Umberto Eco"

// Modificare e aggiungere proprietà
book.available = false;
book.pages = 503;
console.log(book.pages);    // 503
console.log(book.isbn);     // undefined (non esiste)

// Proprietà annidate
const library = {
  name: "Biblioteca Civica",
  address: {
    city: "Bologna",
    street: "Via Roma 1",
  },
};
console.log(library.address.city); // "Bologna"`,
      },
      {
        type: "info",
        content:
          "Una arrow function con *implicit return* che restituisce un oggetto deve racchiuderlo tra parentesi tonde, altrimenti le graffe verrebbero interpretate come il corpo della funzione: `const makeBook = (title) => ({ title: title, available: true });`",
      },
      {
        type: "heading",
        content: "Array di oggetti",
      },
      {
        type: "text",
        content:
          "Molto spesso i dati sono liste di oggetti: un catalogo di libri, un elenco di contatti, i prodotti di un carrello. Si combinano gli strumenti già visti: l'indice per scegliere l'elemento, il punto per leggerne la proprietà, i cicli per scorrerli tutti.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Lavorare con array di oggetti",
        code: `const books = [
  { title: "Il nome della rosa", year: 1980, available: true },
  { title: "Se questo è un uomo", year: 1947, available: false },
  { title: "Il barone rampante", year: 1957, available: true },
];

console.log(books[1].title);  // "Se questo è un uomo"
console.log(books.length);    // 3

// Scorrere con for...of
for (const book of books) {
  if (book.available) {
    console.log(book.title + " (" + book.year + ")");
  }
}
// Il nome della rosa (1980)
// Il barone rampante (1957)

// Aggiungere un nuovo oggetto
books.push({ title: "La coscienza di Zeno", year: 1923, available: true });
console.log(books.length);    // 4`,
      },
      {
        type: "heading",
        content: "Object.keys(), Object.values(), Object.entries()",
      },
      {
        type: "text",
        content:
          "Questi metodi trasformano le proprietà di un oggetto in array, così puoi scorrerle con un ciclo. `Object.keys` restituisce le chiavi, `Object.values` i valori e `Object.entries` un array di coppie `[chiave, valore]`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Iterare sugli oggetti",
        code: `const contact = {
  name: "Laura",
  phone: "333 1234567",
  city: "Torino",
};

console.log(Object.keys(contact));
// ["name", "phone", "city"]

console.log(Object.values(contact));
// ["Laura", "333 1234567", "Torino"]

console.log(Object.entries(contact));
// [["name", "Laura"], ["phone", "333 1234567"], ["city", "Torino"]]

// Scorrere le coppie chiave-valore
for (const entry of Object.entries(contact)) {
  console.log(entry[0] + " = " + entry[1]);
}
// name = Laura
// phone = 333 1234567
// city = Torino`,
      },
      {
        type: "heading",
        content: "Destructuring di oggetti",
      },
      {
        type: "text",
        content:
          "Il *destructuring* permette di estrarre proprietà da un oggetto in variabili separate, in modo conciso. È uno dei pattern più usati nel JavaScript moderno e in React. Si possono anche indicare valori di default e rinominare le variabili.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Destructuring semplice e annidato",
        code: `const user = {
  name: "Paolo",
  email: "paolo@example.com",
  address: { city: "Napoli", zip: "80100" },
};

// Destructuring base
const { name, email } = user;
console.log(name);   // "Paolo"
console.log(email);  // "paolo@example.com"

// Destructuring annidato
const { address: { city } } = user;
console.log(city);   // "Napoli"

// Con valori di default
const { role = "utente" } = user;
console.log(role);   // "utente" (la proprietà non esiste, usa il default)

// Rinominare durante il destructuring
const { name: userName } = user;
console.log(userName); // "Paolo"`,
      },
      {
        type: "heading",
        content: "Destructuring di array",
      },
      {
        type: "text",
        content:
          "Anche gli array si possono destrutturare, usando le parentesi quadre: le variabili ricevono gli elementi **in base alla posizione**. Puoi saltare elementi lasciando una virgola vuota. È molto comodo con `Object.entries`, che restituisce coppie `[chiave, valore]`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Destructuring di array",
        code: `const podium = ["Anna", "Bruno", "Carla"];

const [first, second] = podium;
console.log(first);  // "Anna"
console.log(second); // "Bruno"

// Saltare un elemento
const [, , third] = podium;
console.log(third);  // "Carla"

// Scambiare due variabili
let a = 1;
let b = 2;
[a, b] = [b, a];
console.log(a, b);   // 2 1

// Con Object.entries, nel ciclo for...of
const stock = { mele: 10, pere: 4 };
for (const [fruit, quantity] of Object.entries(stock)) {
  console.log(fruit + ": " + quantity);
}
// mele: 10
// pere: 4`,
      },
      {
        type: "heading",
        content: "Destructuring nei parametri di funzione",
      },
      {
        type: "text",
        content:
          "Quando una funzione riceve un oggetto, puoi destrutturarlo direttamente nella lista dei parametri. Invece di scrivere `product.name`, `product.price` ecc. ottieni subito le variabili che ti servono. In React i componenti ricevono un oggetto `props`, e questo pattern si usa in praticamente ogni componente.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Destructuring nei parametri",
        code: `// Senza destructuring
const describe = (product) => {
  return product.name + ": " + product.price + " euro";
};

// Con destructuring (più leggibile)
const describeV2 = ({ name, price }) => {
  return name + ": " + price + " euro";
};

const product = { name: "Zaino", price: 45, color: "blu" };
console.log(describe(product));    // "Zaino: 45 euro"
console.log(describeV2(product));  // "Zaino: 45 euro"

// Con default nei parametri
const badge = ({ label = "N/D", color = "grigio" }) => {
  console.log(label, color);
};
badge({ label: "Nuovo" }); // Nuovo grigio`,
      },
      {
        type: "heading",
        content: "Spread operator su oggetti e array",
      },
      {
        type: "text",
        content:
          'Lo spread operator `...` "espande" le proprietà di un oggetto dentro un altro oggetto, oppure gli elementi di un array dentro un altro array. Serve per copiare e unire dati **senza modificare gli originali**: è fondamentale in React per aggiornare lo stato in modo immutabile.',
      },
      {
        type: "code",
        language: "javascript",
        title: "Spread sugli oggetti",
        code: `const defaultSettings = {
  theme: "light",
  fontSize: 14,
  notifications: true,
};

const userSettings = {
  theme: "dark",
  notifications: false,
};

// Merge: le proprietà scritte dopo sovrascrivono quelle prima
const settings = { ...defaultSettings, ...userSettings };
console.log(settings);
// { theme: "dark", fontSize: 14, notifications: false }

// Copiare un oggetto (copia superficiale)
const copy = { ...defaultSettings };
copy.theme = "blue";
console.log(defaultSettings.theme); // "light" (originale invariato)

// Creare una versione aggiornata senza toccare l'originale
const cart = { items: 3, total: 60 };
const updatedCart = { ...cart, total: 75 };
console.log(updatedCart); // { items: 3, total: 75 }
console.log(cart);        // { items: 3, total: 60 }`,
      },
      {
        type: "code",
        language: "javascript",
        title: "Spread e rest sugli array",
        code: `const fruits = ["mela", "pera"];
const vegetables = ["carota", "zucchina"];

// Unire array
const shopping = [...fruits, ...vegetables];
console.log(shopping); // ["mela", "pera", "carota", "zucchina"]

// Copiare un array (la copia si può modificare liberamente)
const copy = [...fruits];
copy.push("kiwi");
console.log(fruits); // ["mela", "pera"] (invariato)

// Aggiungere elementi senza modificare l'originale
const withBanana = [...fruits, "banana"];
console.log(withBanana); // ["mela", "pera", "banana"]

// Nel destructuring, ... raccoglie "il resto" (rest)
const [firstItem, ...others] = shopping;
console.log(firstItem); // "mela"
console.log(others);    // ["pera", "carota", "zucchina"]`,
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
        code: `const field = "city";
const value = "Firenze";

// Chiave calcolata
const filter = { [field]: value };
console.log(filter); // { city: "Firenze" }

// Pattern utile: costruire un oggetto a partire da un campo di un form
const buildField = (key, val) => ({ [key]: val });
console.log(buildField("email", "anna@example.com"));
// { email: "anna@example.com" }

// Combinato con spread: aggiornare un campo qualsiasi
const form = { name: "Anna", city: "Roma" };
const fieldToUpdate = "city";
const updated = { ...form, [fieldToUpdate]: "Milano" };
console.log(updated); // { name: "Anna", city: "Milano" }`,
      },
      {
        type: "heading",
        content: "Shorthand properties",
      },
      {
        type: "text",
        content:
          "Se una variabile ha lo stesso nome della chiave, puoi abbreviare: `{ name: name, age: age }` diventa `{ name, age }`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Shorthand properties",
        code: `const title = "Inception";
const year = 2010;
const rating = 8.8;

// Invece di { title: title, year: year, rating: rating }
const movie = { title, year, rating };
console.log(movie); // { title: "Inception", year: 2010, rating: 8.8 }`,
      },
      {
        type: "tip",
        content:
          "Usa il destructuring per estrarre solo i dati che ti servono e lo spread per creare copie aggiornate invece di modificare gli oggetti originali: il codice diventa più prevedibile e più facile da correggere.",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "Spread: chi vince?",
        description:
          'Cosa stampa questo codice?\n`const base = { theme: "light", size: 14 };`\n`const result = { theme: "dark", ...base };`\n`console.log(result.theme);`',
        difficulty: "medio",
        options: ['`"dark"`', "`undefined`", '`"light"`', '`["dark", "light"]`'],
        correct: 2,
        explanation:
          'Con lo spread le proprietà vengono copiate nell\'ordine in cui sono scritte, e una chiave ripetuta viene **sovrascritta** da quella che arriva dopo. Qui `...base` viene dopo `theme: "dark"`, quindi il suo `theme: "light"` vince. Una chiave in un oggetto può avere un solo valore (niente array di valori). Per far vincere `"dark"` bisogna scrivere `{ ...base, theme: "dark" }`.',
      },
      {
        type: "multiple-choice",
        title: "Dot o bracket notation?",
        description:
          'Cosa stampa questo codice?\n`const book = { title: "Dune", year: 1965 };`\n`const key = "year";`\n`console.log(book.key, book[key]);`',
        difficulty: "medio",
        options: [
          "`1965 1965`",
          "`undefined 1965`",
          '`"year" 1965`',
          "Un errore: `key` non è una proprietà",
        ],
        correct: 1,
        explanation:
          '`book.key` cerca una proprietà che si chiama letteralmente `"key"`, che non esiste: restituisce `undefined` (senza errori). `book[key]` invece usa il **valore** della variabile `key`, cioè `"year"`, e restituisce `1965`. Per questo quando il nome della chiave è in una variabile serve la bracket notation.',
      },
      {
        type: "multiple-choice",
        title: "Destructuring con rinomina e default",
        description:
          'Dopo questo codice, quanto valgono `label` e `stock`?\n`const product = { name: "Lampada", price: 30 };`\n`const { name: label, stock = 0 } = product;`',
        difficulty: "difficile",
        options: [
          '`label` è `undefined`, `stock` è `0`',
          '`label` è `"name"`, `stock` è `undefined`',
          '`label` è `"Lampada"`, `stock` è `undefined`',
          '`label` è `"Lampada"`, `stock` è `0`',
        ],
        correct: 3,
        explanation:
          '`name: label` significa "leggi la proprietà `name` e salvala in una variabile chiamata `label`", quindi `label` vale `"Lampada"` (e non viene creata nessuna variabile `name`). `stock = 0` è un valore di default: la proprietà `stock` non esiste nell\'oggetto, quindi si usa `0` invece di `undefined`.',
      },
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
        validate: `
if (!/(const|let)\\s*\\{[^}]*\\bname\\b[^}]*\\}\\s*=\\s*user/.test($codeNoComments)) return "Usa il destructuring: const { name, role = ... } = user";
if (name !== "Marco") return "name dovrebbe valere \\"Marco\\"";
if (role !== "viewer") return "role dovrebbe valere \\"viewer\\" grazie al valore di default";
if (!/role\\s*=\\s*["']viewer["']/.test($codeNoComments)) return "Indica il default direttamente nel destructuring: role = \\"viewer\\"";
if (!$logs.includes("Marco") || !$logs.includes("viewer")) return "Stampa sia name sia role";
return true;`,
      },
      {
        type: "code",
        title: "Spread e merge",
        description:
          'Hai `baseConfig` e `userConfig`. Crea `finalConfig` unendoli con lo spread operator (le proprietà di `userConfig` devono sovrascrivere quelle di `baseConfig`) e aggiungendo, nello stesso oggetto, la proprietà `lastUpdate` con valore `"2024-01-01"`. Gli oggetti originali non devono essere modificati. Stampa `finalConfig`.',
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

const finalConfig = { ...baseConfig, ...userConfig, lastUpdate: "2024-01-01" };
console.log(finalConfig);`,
        solutionExplanation:
          "Lo spread copia le proprietà nell'ordine in cui è scritto: prima tutte quelle di `baseConfig`, poi quelle di `userConfig`, che sovrascrivono le chiavi ripetute (`theme` diventa `\"dark\"`). `lastUpdate` si aggiunge in coda come una normale proprietà. Poiché `finalConfig` è un oggetto nuovo, i due oggetti di partenza non vengono toccati.",
        validate: `
if (!/\\.\\.\\.\\s*baseConfig/.test($codeNoComments) || !/\\.\\.\\.\\s*userConfig/.test($codeNoComments)) return "Usa lo spread: { ...baseConfig, ...userConfig, ... }";
if (!$equal(baseConfig, { theme: "light", language: "it", showHeader: true })) return "Non modificare baseConfig";
if (!$equal(userConfig, { theme: "dark", fontSize: 16 })) return "Non modificare userConfig";
if (finalConfig.theme !== "dark") return "theme deve valere \\"dark\\": metti ...userConfig dopo ...baseConfig";
if (!$equal(finalConfig, { theme: "dark", language: "it", showHeader: true, fontSize: 16, lastUpdate: "2024-01-01" })) return "finalConfig non è corretto: contiene " + $format(finalConfig);
if (!$values.some((args) => args[0] === finalConfig)) return "Stampa finalConfig con console.log";
return true;`,
      },
      {
        type: "code",
        title: "Object.entries e for...of",
        description:
          "Crea una funzione `getAverage(scores)` che riceve un oggetto con nomi come chiavi e voti come valori, e restituisce la media dei voti.\nUsa `Object.entries` (o `Object.values`) e un ciclo `for...of`. Se l'oggetto è vuoto deve restituire `0`.\nEsempio: `getAverage({ Alice: 9, Bruno: 7 })` restituisce `8`.",
        difficulty: "difficile",
        starterCode: `const scores = {
  Alice: 90,
  Bruno: 75,
  Clara: 88,
  Davide: 67,
};

function getAverage(scores) {
  // Scrivi qui
}

console.log(getAverage(scores));`,
        solution: `const scores = {
  Alice: 90,
  Bruno: 75,
  Clara: 88,
  Davide: 67,
};

function getAverage(scores) {
  const entries = Object.entries(scores);
  if (entries.length === 0) {
    return 0;
  }
  let sum = 0;
  for (const [, score] of entries) {
    sum += score;
  }
  return sum / entries.length;
}

console.log(getAverage(scores));`,
        solutionExplanation:
          "`Object.entries` trasforma l'oggetto in un array di coppie `[nome, voto]`, così si può usare `length` per contare i voti e `for...of` per scorrerli. Nel ciclo, il destructuring `[, score]` salta il nome e prende solo il voto. Il controllo iniziale sull'oggetto vuoto evita la divisione `0 / 0`, che darebbe `NaN`. Con `Object.values(scores)` si otterrebbe direttamente l'array dei voti.",
        validate: `
if (typeof getAverage !== "function") return "Definisci la funzione getAverage";
const code = $codeNoComments;
if (!/Object\\.(entries|values)\\(/.test(code)) return "Usa Object.entries o Object.values per ottenere i voti";
if (!/\\bfor\\s*\\(/.test(code)) return "Usa un ciclo for...of per sommare i voti";
if (getAverage(scores) !== 80) return "getAverage(scores) dovrebbe restituire 80";
if (getAverage({ Alice: 9, Bruno: 7 }) !== 8) return "getAverage({ Alice: 9, Bruno: 7 }) dovrebbe restituire 8";
if (getAverage({ Solo: 6 }) !== 6) return "Con un solo voto la media è il voto stesso";
if (getAverage({}) !== 0) return "Con un oggetto vuoto getAverage deve restituire 0";
return true;`,
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // METODI DEGLI ARRAY: FIND, REDUCE E SORT
  // ---------------------------------------------------------------------------
  "array-methods": {
    sections: [
      {
        type: "text",
        content:
          "Ora che conosci array e oggetti, puoi combinarli: nella pratica lavorerai quasi sempre con **array di oggetti** (prodotti, utenti, ordini...). In questa lezione vediamo i metodi che permettono di cercare, verificare, accumulare e ordinare questi dati, e come concatenarli in vere e proprie pipeline.",
      },
      {
        type: "heading",
        content: "map e filter su array di oggetti",
      },
      {
        type: "text",
        content:
          "`map` e `filter` funzionano esattamente come con gli array di primitivi: il callback riceve un oggetto alla volta, e puoi leggerne le proprietà (anche con il destructuring nei parametri).",
      },
      {
        type: "code",
        language: "javascript",
        title: "map e filter con oggetti",
        code: `const products = [
  { name: "Penna", price: 2, category: "cancelleria" },
  { name: "Zaino", price: 45, category: "scuola" },
  { name: "Quaderno", price: 5, category: "cancelleria" },
  { name: "Tablet", price: 350, category: "elettronica" },
];

// Estrarre un campo
const names = products.map((p) => p.name);
console.log(names); // ["Penna", "Zaino", "Quaderno", "Tablet"]

// Trasformare in nuovi oggetti (con spread)
const discounted = products.map((p) => ({ ...p, price: p.price * 0.9 }));
console.log(discounted[1]); // { name: "Zaino", price: 40.5, category: "scuola" }

// Filtrare per proprietà (con destructuring nel parametro)
const stationery = products.filter(({ category }) => category === "cancelleria");
console.log(stationery.length); // 2`,
      },
      {
        type: "heading",
        content: "find e findIndex",
      },
      {
        type: "text",
        content:
          "`find` restituisce il **primo elemento** per cui il callback restituisce `true`, oppure `undefined` se non ne trova nessuno. `findIndex` restituisce invece l'**indice** di quell'elemento, oppure `-1`. Sono il modo naturale per cercare un oggetto in base a una proprietà (cosa che `includes` e `indexOf` non sanno fare).",
      },
      {
        type: "code",
        language: "javascript",
        title: "Cercare un elemento",
        code: `const users = [
  { id: 1, name: "Alice", active: true },
  { id: 2, name: "Bruno", active: false },
  { id: 3, name: "Clara", active: true },
];

const bruno = users.find((u) => u.name === "Bruno");
console.log(bruno); // { id: 2, name: "Bruno", active: false }

const missing = users.find((u) => u.id === 99);
console.log(missing); // undefined

const claraIndex = users.findIndex((u) => u.name === "Clara");
console.log(claraIndex); // 2
console.log(users.findIndex((u) => u.id === 99)); // -1`,
      },
      {
        type: "heading",
        content: "some e every",
      },
      {
        type: "text",
        content:
          "`some` restituisce `true` se **almeno un** elemento soddisfa la condizione; `every` restituisce `true` se **tutti** la soddisfano. Entrambi restituiscono un boolean e si fermano appena conoscono la risposta.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Verificare condizioni",
        code: `const users = [
  { id: 1, name: "Alice", active: true },
  { id: 2, name: "Bruno", active: false },
  { id: 3, name: "Clara", active: true },
];

const hasInactive = users.some((u) => !u.active);
console.log(hasInactive); // true

const allActive = users.every((u) => u.active);
console.log(allActive);   // false

const temperatures = [18, 21, 24];
console.log(temperatures.every((t) => t > 15)); // true
console.log(temperatures.some((t) => t > 30));  // false`,
      },
      {
        type: "heading",
        content: "reduce: accumulare un risultato",
      },
      {
        type: "text",
        content:
          "`reduce` attraversa l'array accumulando un unico risultato. Il callback riceve `(accumulatore, elementoCorrente)` e deve restituire il nuovo valore dell'accumulatore; il secondo argomento di `reduce` è il **valore iniziale**. È il metodo più versatile: può produrre un numero, una stringa, un oggetto o un altro array.",
      },
      {
        type: "code",
        language: "javascript",
        title: "reduce in pratica",
        code: `const numbers = [10, 20, 30, 40];

// Somma: acc parte da 0
const total = numbers.reduce((acc, n) => acc + n, 0);
console.log(total); // 100
// giro 1: acc = 0,  n = 10 -> 10
// giro 2: acc = 10, n = 20 -> 30
// giro 3: acc = 30, n = 30 -> 60
// giro 4: acc = 60, n = 40 -> 100

// Totale di un carrello
const cart = [
  { name: "Libro", price: 15, quantity: 2 },
  { name: "Penna", price: 2, quantity: 5 },
];
const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
console.log(cartTotal); // 40

// Costruire un oggetto: contare i prodotti per categoria
const categories = ["libri", "musica", "libri", "film", "libri"];
const counts = categories.reduce((acc, cat) => {
  acc[cat] = (acc[cat] || 0) + 1;
  return acc;
}, {});
console.log(counts); // { libri: 3, musica: 1, film: 1 }`,
      },
      {
        type: "warning",
        content:
          "Indica sempre il valore iniziale di `reduce` (es. `0` o `{}`). Senza, `reduce` usa il primo elemento come valore iniziale e, su un array vuoto, lancia un errore.",
      },
      {
        type: "heading",
        content: "sort: ordinare (con una copia!)",
      },
      {
        type: "text",
        content:
          "`sort` ordina gli elementi e **modifica l'array originale**. Senza argomenti ordina come se fossero stringhe (va bene per parole semplici, non per i numeri!). Per ordinare numeri o oggetti passa una funzione di confronto `(a, b) => ...` che restituisce un numero negativo se `a` va prima di `b`, positivo se va dopo, `0` se sono equivalenti. Per non modificare l'originale, ordina una copia fatta con lo spread: `[...arr].sort(...)`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Ordinare in modo sicuro",
        code: `// Attenzione: senza funzione di confronto i numeri sono trattati come testo
console.log([10, 9, 100].sort()); // [10, 100, 9]  (!)

const scores = [40, 10, 90, 25];
const ascending = [...scores].sort((a, b) => a - b);
const descending = [...scores].sort((a, b) => b - a);
console.log(ascending);  // [10, 25, 40, 90]
console.log(descending); // [90, 40, 25, 10]
console.log(scores);     // [40, 10, 90, 25] (originale invariato)

// Ordinare oggetti per una proprietà numerica
const movies = [
  { title: "Matrix", year: 1999 },
  { title: "Casablanca", year: 1942 },
  { title: "Inception", year: 2010 },
];
const byYear = [...movies].sort((a, b) => a.year - b.year);
console.log(byYear[0].title); // "Casablanca"

// Parole semplici: sort() senza argomenti va bene
const cities = ["Roma", "Bari", "Milano"];
console.log([...cities].sort()); // ["Bari", "Milano", "Roma"]`,
      },
      {
        type: "heading",
        content: "Chaining: pipeline di trasformazione",
      },
      {
        type: "text",
        content:
          "Poiché `filter`, `map` e `sort` restituiscono array, puoi concatenarli (*chaining*): il risultato di un metodo diventa l'input del successivo. Questo permette di descrivere trasformazioni complesse in pochi passaggi leggibili.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Chaining",
        code: `const students = [
  { name: "Davide", grade: 5 },
  { name: "Alice", grade: 8 },
  { name: "Carlo", grade: 6 },
  { name: "Beatrice", grade: 9 },
];

const topStudents = students
  .filter((s) => s.grade >= 6)          // solo i promossi
  .sort((a, b) => b.grade - a.grade)    // dal voto più alto
  .map((s) => s.name);                  // solo il nome
console.log(topStudents); // ["Beatrice", "Alice", "Carlo"]

// filter restituisce già un nuovo array, quindi qui sort
// non modifica students. Se ordini direttamente l'originale, copialo prima.

// Somma dei voti dei promossi: filter + reduce
const passedTotal = students
  .filter((s) => s.grade >= 6)
  .reduce((sum, s) => sum + s.grade, 0);
console.log(passedTotal); // 23`,
      },
      {
        type: "tip",
        content:
          "Nelle pipeline scrivi un metodo per riga, con un breve commento se serve: il codice si legge come una ricetta. Se una pipeline diventa troppo lunga, spezzala in variabili intermedie con nomi chiari.",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "find o filter?",
        description:
          'Cosa stampa questo codice?\n`const users = [{ id: 1, name: "Ada" }, { id: 2, name: "Leo" }];`\n`console.log(users.find((u) => u.id === 2));`\n`console.log(users.filter((u) => u.id === 3));`',
        difficulty: "facile",
        options: [
          '`[{ id: 2, name: "Leo" }]` e poi `undefined`',
          '`{ id: 2, name: "Leo" }` e poi `[]`',
          '`{ id: 2, name: "Leo" }` e poi `undefined`',
          "`1` e poi `-1`",
        ],
        correct: 1,
        explanation:
          "`find` restituisce **il primo elemento** che soddisfa la condizione (l'oggetto stesso, non un array), oppure `undefined` se non lo trova. `filter` restituisce **sempre un array**: se nessun elemento soddisfa la condizione, è un array vuoto `[]`, mai `undefined`. Gli indici (`1`, `-1`) sarebbero il risultato di `findIndex`.",
      },
      {
        type: "multiple-choice",
        title: "sort senza funzione di confronto",
        description:
          "Cosa stampa questo codice?\n`const prices = [25, 100, 9];`\n`const sorted = [...prices].sort();`\n`console.log(sorted, prices);`",
        difficulty: "medio",
        options: [
          "`[9, 25, 100] [25, 100, 9]`",
          "`[9, 25, 100] [9, 25, 100]`",
          "`[100, 25, 9] [25, 100, 9]`",
          "`[100, 25, 9] [100, 25, 9]`",
        ],
        correct: 2,
        explanation:
          'Senza funzione di confronto, `sort` confronta gli elementi **come testo**: `"100"` viene prima di `"25"` (perché `"1"` < `"2"`) e `"25"` prima di `"9"`. Il risultato è quindi `[100, 25, 9]`, non l\'ordine numerico. L\'originale invece resta `[25, 100, 9]`, perché è stata ordinata una copia fatta con lo spread. Per l\'ordine numerico serve `.sort((a, b) => a - b)`.',
      },
      {
        type: "multiple-choice",
        title: "reduce passo per passo",
        description:
          'Quanto vale `result`?\n`const cart = [{ price: 5, qty: 2 }, { price: 3, qty: 4 }];`\n`const result = cart.reduce((acc, item) => acc + item.price * item.qty, 100);`',
        difficulty: "difficile",
        options: ["`22`", "`114`", "`108`", "`122`"],
        correct: 3,
        explanation:
          "Il secondo argomento di `reduce` è il valore iniziale dell'accumulatore, qui `100`. Primo giro: `100 + 5 * 2 = 110`. Secondo giro: `110 + 3 * 4 = 122`. `22` è il totale del carrello se si parte da `0`; `114` si otterrebbe sommando prezzi e quantità invece di moltiplicarli, `108` sommando solo i prezzi.",
      },
      {
        type: "code",
        title: "filter e map su oggetti",
        description:
          "Crea una funzione `getExpensiveNames(products)` che restituisce i **nomi** dei prodotti con `price > 20`, nello stesso ordine. Usa `filter` e poi `map`.\nEsempio: con l'array `products` qui sotto il risultato è `[\"Zaino\", \"Tablet\"]`.",
        difficulty: "facile",
        starterCode: `const products = [
  { name: "Penna", price: 2 },
  { name: "Zaino", price: 45 },
  { name: "Quaderno", price: 5 },
  { name: "Tablet", price: 350 },
  { name: "Matita", price: 1 },
];

const getExpensiveNames = (products) => {
  // Scrivi qui
};

console.log(getExpensiveNames(products));`,
        solution: `const products = [
  { name: "Penna", price: 2 },
  { name: "Zaino", price: 45 },
  { name: "Quaderno", price: 5 },
  { name: "Tablet", price: 350 },
  { name: "Matita", price: 1 },
];

const getExpensiveNames = (products) => {
  return products
    .filter((p) => p.price > 20)
    .map((p) => p.name);
};

console.log(getExpensiveNames(products));`,
        validate: `
if (typeof getExpensiveNames !== "function") return "Definisci la funzione getExpensiveNames";
const code = $codeNoComments;
if (!/\\.filter\\(/.test(code) || !/\\.map\\(/.test(code)) return "Usa filter per selezionare i prodotti e map per estrarre il nome";
const r = getExpensiveNames(products);
if (!$equal(r, ["Zaino", "Tablet"])) return "Con products il risultato dovrebbe essere [\\"Zaino\\", \\"Tablet\\"], invece è " + $format(r);
if (!$equal(getExpensiveNames([{ name: "A", price: 20 }, { name: "B", price: 21 }]), ["B"])) return "Il prezzo deve essere strettamente maggiore di 20";
if (!$equal(getExpensiveNames([]), [])) return "Con un array vuoto deve restituire []";
return true;`,
      },
      {
        type: "code",
        title: "reduce per il totale",
        description:
          "Crea una funzione `getTotal(orders)` che usa `reduce` per calcolare la somma dei campi `amount` di tutti gli ordini. Con un array vuoto deve restituire `0`.\nPoi stampa `getTotal(orders)` (deve dare `460`).",
        difficulty: "medio",
        starterCode: `const orders = [
  { id: 1, amount: 120 },
  { id: 2, amount: 85 },
  { id: 3, amount: 200 },
  { id: 4, amount: 55 },
];

const getTotal = (orders) => {
  // Scrivi qui
};

console.log(getTotal(orders));`,
        solution: `const orders = [
  { id: 1, amount: 120 },
  { id: 2, amount: 85 },
  { id: 3, amount: 200 },
  { id: 4, amount: 55 },
];

const getTotal = (orders) => {
  return orders.reduce((acc, order) => acc + order.amount, 0);
};

console.log(getTotal(orders));`,
        solutionExplanation:
          "A ogni giro il callback riceve il totale accumulato finora (`acc`) e l'ordine corrente, e restituisce il nuovo totale `acc + order.amount`. Il valore iniziale `0` è essenziale: è il punto di partenza della somma e, con un array vuoto, diventa direttamente il risultato invece di provocare un errore.",
        validate: `
if (typeof getTotal !== "function") return "Definisci la funzione getTotal";
if (!/\\.reduce\\(/.test($codeNoComments)) return "Usa il metodo reduce";
if (getTotal(orders) !== 460) return "getTotal(orders) dovrebbe restituire 460";
if (getTotal([{ id: 9, amount: 7 }, { id: 10, amount: 3 }]) !== 10) return "getTotal deve funzionare con qualsiasi array di ordini";
let empty;
try { empty = getTotal([]); } catch (e) { return "Con un array vuoto reduce lancia un errore: indica il valore iniziale 0"; }
if (empty !== 0) return "Con un array vuoto getTotal deve restituire 0 (valore iniziale di reduce)";
if (!$logs.includes("460")) return "Stampa getTotal(orders)";
return true;`,
      },
      {
        type: "code",
        title: "Pipeline completa: filter, sort, map",
        description:
          'Crea una funzione `getRanking(students)` che:\n1. tiene solo gli studenti con `grade >= 6`;\n2. li ordina dal voto più **alto** al più basso;\n3. li trasforma in stringhe del tipo `"Nome: voto"` (es. `"Alice: 8"`).\nL\'array originale non deve essere modificato. Usa `filter`, `sort` e `map`.',
        difficulty: "difficile",
        starterCode: `const students = [
  { name: "Davide", grade: 5 },
  { name: "Alice", grade: 8 },
  { name: "Carlo", grade: 6 },
  { name: "Beatrice", grade: 9 },
  { name: "Elena", grade: 4 },
];

const getRanking = (students) => {
  // Scrivi qui
};

console.log(getRanking(students));`,
        solution: `const students = [
  { name: "Davide", grade: 5 },
  { name: "Alice", grade: 8 },
  { name: "Carlo", grade: 6 },
  { name: "Beatrice", grade: 9 },
  { name: "Elena", grade: 4 },
];

const getRanking = (students) => {
  return students
    .filter((s) => s.grade >= 6)
    .sort((a, b) => b.grade - a.grade)
    .map((s) => s.name + ": " + s.grade);
};

console.log(getRanking(students));`,
        solutionExplanation:
          "`filter` restituisce già un **nuovo** array, quindi il `sort` successivo ordina quella copia e non tocca `students`. La funzione di confronto `(a, b) => b.grade - a.grade` restituisce un numero positivo quando `b` ha il voto più alto, mettendolo prima: ordine decrescente. Infine `map` trasforma ogni oggetto nella stringa richiesta. Se si ordinasse prima di filtrare, servirebbe copiare l'array con `[...students]`.",
        validate: `
if (typeof getRanking !== "function") return "Definisci la funzione getRanking";
const code = $codeNoComments;
if (!/\\.filter\\(/.test(code) || !/\\.sort\\(/.test(code) || !/\\.map\\(/.test(code)) return "Usa filter, sort e map";
const input = [
  { name: "Davide", grade: 5 },
  { name: "Alice", grade: 8 },
  { name: "Carlo", grade: 6 },
  { name: "Beatrice", grade: 9 },
  { name: "Elena", grade: 4 },
];
const snapshot = input.map((s) => s.name);
const r = getRanking(input);
if (!$equal(input.map((s) => s.name), snapshot)) return "Non modificare l'ordine dell'array originale (ordina una copia)";
if (!$equal(r, ["Beatrice: 9", "Alice: 8", "Carlo: 6"])) return "Risultato atteso: [\\"Beatrice: 9\\", \\"Alice: 8\\", \\"Carlo: 6\\"], ottenuto " + $format(r);
const r2 = getRanking([{ name: "Zoe", grade: 6 }, { name: "Ugo", grade: 10 }, { name: "Ivo", grade: 2 }]);
if (!$equal(r2, ["Ugo: 10", "Zoe: 6"])) return "Controlla l'ordinamento numerico: con voti 6 e 10 il 10 deve venire prima (usa (a, b) => b.grade - a.grade)";
return true;`,
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
          "Le stringhe in JavaScript hanno molti metodi utili per manipolare il testo. Con ES6 sono arrivati anche i *template literals* (stringhe con i backtick), che rendono l'interpolazione e le stringhe su più righe molto più semplici rispetto alla concatenazione con `+` usata finora.",
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
        code: `const author = "anna";
const postId = 42;

// Concatenazione classica (scomoda)
const urlOld = "/blog/" + author + "/" + postId;

// Template literal (molto meglio!)
const url = \`/blog/\${author}/\${postId}\`;
console.log(url); // "/blog/anna/42"

// Qualsiasi espressione dentro \${}
const price = 19.99;
console.log(\`Prezzo: \${price.toFixed(0)} EUR\`); // "Prezzo: 20 EUR"
console.log(\`Doppio: \${price * 2} EUR\`);         // "Doppio: 39.98 EUR"

// Stringhe multilinea
const message = \`
  Benvenuto nel blog.
  Autore: \${author}.
  Articolo numero: \${postId}.
\`;
console.log(message);`,
      },
      {
        type: "tip",
        content:
          "Preferisci i template literals alla concatenazione con `+` ogni volta che inserisci variabili in un testo: sono più leggibili e riducono gli errori con spazi e virgolette.",
      },
      {
        type: "heading",
        content: "Metodi di ricerca: includes, startsWith, endsWith",
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
        content: "split e join",
      },
      {
        type: "text",
        content:
          "`.split()` divide una stringa in un array usando un separatore. `.join()` fa l'opposto: unisce gli elementi di un array in una stringa. Sono spesso usati insieme.",
      },
      {
        type: "code",
        language: "javascript",
        title: "split e join",
        code: `// split: stringa -> array
const path = "blog/2024/javascript";
const parts = path.split("/");
console.log(parts); // ["blog", "2024", "javascript"]

// join: array -> stringa
const tags = ["urgente", "bug", "frontend"];
const tagString = tags.join(", ");
console.log(tagString); // "urgente, bug, frontend"

// Con il destructuring di array
const fullName = "Mario Rossi";
const [firstName, lastName] = fullName.split(" ");
console.log(firstName); // "Mario"
console.log(lastName);  // "Rossi"

// Rimuovere spazi extra tra le parole
const messy = "  ciao   mondo  ";
const clean = messy
  .split(" ")
  .filter((word) => word !== "")
  .join(" ");
console.log(clean); // "ciao mondo"`,
      },
      {
        type: "heading",
        content: "replace, substring e slice",
      },
      {
        type: "code",
        language: "javascript",
        title: "Sostituzione e sotto-stringhe",
        code: `// .replace() sostituisce solo la PRIMA occorrenza
const text = "il gatto è sul tetto, il gatto dorme";
console.log(text.replace("gatto", "cane"));
// "il cane è sul tetto, il gatto dorme"

// .replaceAll() sostituisce TUTTE le occorrenze
console.log(text.replaceAll("gatto", "cane"));
// "il cane è sul tetto, il cane dorme"

// .substring(start, end) - estrae una porzione (end escluso)
const code = "ERR-404-NOT_FOUND";
console.log(code.substring(0, 3)); // "ERR"
console.log(code.substring(4, 7)); // "404"

// .slice() funziona come per gli array e accetta indici negativi
const word = "JavaScript";
console.log(word.slice(0, 4));  // "Java"
console.log(word.slice(-6));    // "Script" (ultimi 6 caratteri)

// Pattern comune: troncare titoli lunghi
const title = "Guida completa al JavaScript moderno";
const display = title.length > 20
  ? title.slice(0, 17) + "..."
  : title;
console.log(display); // "Guida completa al..."`,
      },
      {
        type: "heading",
        content: "toLowerCase, toUpperCase, trim",
      },
      {
        type: "code",
        language: "javascript",
        title: "Trasformazioni comuni",
        code: `const input = "  Ciao Mondo  ";

console.log(input.trim());          // "Ciao Mondo" (rimuove gli spazi ai lati)
console.log(input.toLowerCase());   // "  ciao mondo  "
console.log(input.toUpperCase());   // "  CIAO MONDO  "

// Confronto che ignora maiuscole/minuscole
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
        content: "padStart e padEnd",
      },
      {
        type: "text",
        content:
          "`.padStart()` e `.padEnd()` aggiungono caratteri di riempimento (all'inizio o alla fine) fino a raggiungere la lunghezza desiderata. Utili per formattare numeri e codici. Funzionano sulle stringhe: per usarli con un numero convertilo prima con `String(numero)`.",
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
          "Spesso i dati arrivano come stringhe (dai campi di un form, dall'URL, da un server) e devono essere convertiti in numeri. JavaScript offre diversi modi per farlo.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Da stringa a numero",
        code: `// parseInt: converte in intero (ignora la parte decimale)
console.log(parseInt("42"));      // 42
console.log(parseInt("42.7"));    // 42
console.log(parseInt("10px"));    // 10 (si ferma al primo carattere non numerico)
console.log(parseInt("abc"));     // NaN

// parseFloat: mantiene i decimali
console.log(parseFloat("42.7"));  // 42.7
console.log(parseFloat("3.14"));  // 3.14

// Number(): conversione stretta (fallisce con caratteri extra)
console.log(Number("42"));     // 42
console.log(Number("42.7"));   // 42.7
console.log(Number("10px"));   // NaN (non tollera "px"!)
console.log(Number(""));       // 0

// Verificare se il risultato è un numero valido
console.log(isNaN(Number("abc")));  // true
console.log(isNaN(Number("42")));   // false

// Da numero a stringa
console.log(String(42));        // "42"
console.log((3.14159).toFixed(2)); // "3.14"

// Pattern comune: sommare valori letti da un form
const quantityInput = "3";
const priceInput = "12.5";
const total = Number(quantityInput) * Number(priceInput);
console.log(\`Totale: \${total} euro\`); // "Totale: 37.5 euro"`,
      },
      {
        type: "info",
        content:
          'Usa `Number()` quando vuoi una conversione stretta. Usa `parseInt()`/`parseFloat()` quando la stringa potrebbe contenere unità di misura (es. "14px"). Controlla sempre con `isNaN()` se il risultato è valido.',
      },
    ],
    exercises: [
      {
        type: "code",
        title: "Template literal e interpolazione",
        description:
          'Crea una funzione `buildUrl(author, section, postId)` che usa un template literal per restituire una stringa nel formato `"/{author}/{section}/{postId}"`.\nEsempio: `buildUrl("anna", "blog", 42)` restituisce `"/anna/blog/42"`. Stampa il risultato di questo esempio.',
        difficulty: "facile",
        starterCode: `const buildUrl = (author, section, postId) => {
  // Scrivi qui
};

console.log(buildUrl("anna", "blog", 42));`,
        solution: `const buildUrl = (author, section, postId) => {
  return \`/\${author}/\${section}/\${postId}\`;
};

console.log(buildUrl("anna", "blog", 42));`,
        validate: `
if (typeof buildUrl !== "function") return "Definisci la funzione buildUrl";
if (!/\\$\\{/.test($codeNoComments)) return "Usa un template literal con i backtick e \${...}";
if (buildUrl("anna", "blog", 42) !== "/anna/blog/42") return "buildUrl(\\"anna\\", \\"blog\\", 42) dovrebbe restituire \\"/anna/blog/42\\"";
if (buildUrl("luca", "ricette", 7) !== "/luca/ricette/7") return "buildUrl deve usare i parametri ricevuti (prova buildUrl(\\"luca\\", \\"ricette\\", 7))";
if (!$logs.includes("/anna/blog/42")) return "Stampa il risultato di buildUrl(\\"anna\\", \\"blog\\", 42)";
return true;`,
      },
      {
        type: "code",
        title: "split, map e join",
        description:
          'Crea una funzione `formatCities(csvLine)` che riceve una stringa con valori separati da virgola e restituisce una nuova stringa in cui ogni valore è senza spazi ai lati (`.trim()`), in maiuscolo (`.toUpperCase()`) e separato dal successivo da `" | "`.\nUsa `.split(",")`, `.map()` e `.join(" | ")`.\nEsempio: `formatCities(" milano , roma ")` restituisce `"MILANO | ROMA"`.',
        difficulty: "medio",
        starterCode: `const formatCities = (csvLine) => {
  // Scrivi qui
};

console.log(formatCities(" milano , roma , napoli , torino "));`,
        solution: `const formatCities = (csvLine) => {
  return csvLine
    .split(",")
    .map((city) => city.trim().toUpperCase())
    .join(" | ");
};

console.log(formatCities(" milano , roma , napoli , torino "));`,
        validate: `
if (typeof formatCities !== "function") return "Definisci la funzione formatCities";
const code = $codeNoComments;
if (!/\\.split\\(/.test(code) || !/\\.join\\(/.test(code)) return "Usa split per dividere la stringa e join per riunirla";
if (formatCities(" milano , roma ") !== "MILANO | ROMA") return "formatCities(\\" milano , roma \\") dovrebbe restituire \\"MILANO | ROMA\\", invece restituisce " + $format(formatCities(" milano , roma "));
if (formatCities(" milano , roma , napoli , torino ") !== "MILANO | ROMA | NAPOLI | TORINO") return "Controlla trim e toUpperCase su ogni elemento";
if (formatCities("bari") !== "BARI") return "Con un solo valore il risultato è solo quel valore in maiuscolo";
return true;`,
      },
      {
        type: "code",
        title: "Formattazione data con padStart",
        description:
          'Crea una funzione `formatDate(year, month, day)` che riceve tre numeri e restituisce una stringa nel formato `"YYYY-MM-DD"`, usando un template literal e `.padStart(2, "0")` per mese e giorno.\nEsempi: `formatDate(2024, 3, 7)` restituisce `"2024-03-07"`, `formatDate(2023, 12, 25)` restituisce `"2023-12-25"`.',
        difficulty: "difficile",
        starterCode: `const formatDate = (year, month, day) => {
  // Scrivi qui
};

console.log(formatDate(2024, 3, 7));`,
        solution: `const formatDate = (year, month, day) => {
  const mm = String(month).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return \`\${year}-\${mm}-\${dd}\`;
};

console.log(formatDate(2024, 3, 7));`,
        validate: `
if (typeof formatDate !== "function") return "Definisci la funzione formatDate";
const code = $codeNoComments;
if (!/\\.padStart\\(/.test(code)) return "Usa .padStart(2, \\"0\\") per mese e giorno";
if (!/\\$\\{/.test(code)) return "Componi la data con un template literal";
let r;
try { r = formatDate(2024, 3, 7); } catch (e) { return "formatDate genera un errore: ricorda che padStart esiste solo sulle stringhe (usa String(month))"; }
if (r !== "2024-03-07") return "formatDate(2024, 3, 7) dovrebbe restituire \\"2024-03-07\\", invece restituisce " + $format(r);
if (formatDate(2023, 12, 25) !== "2023-12-25") return "formatDate(2023, 12, 25) dovrebbe restituire \\"2023-12-25\\" (niente zeri se il numero ha già due cifre)";
if (formatDate(1999, 1, 31) !== "1999-01-31") return "formatDate(1999, 1, 31) dovrebbe restituire \\"1999-01-31\\"";
return true;`,
      },
    ],
  },
};
