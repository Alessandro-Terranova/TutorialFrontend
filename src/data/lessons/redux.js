export const lessons = {
  "store-slices": {
    sections: [
      {
        type: "text",
        content:
          "Redux è una libreria per la gestione dello **stato globale** di un'applicazione. Invece di passare i dati tra decine di componenti tramite props, Redux li conserva in un unico **store** centralizzato da cui qualsiasi componente può leggere e a cui qualsiasi componente può chiedere modifiche.",
      },
      {
        type: "heading",
        content: "Perché Redux?",
      },
      {
        type: "text",
        content:
          "Immagina un negozio online: l'header mostra il numero di articoli nel carrello, la pagina del prodotto ha il bottone \"Aggiungi al carrello\", la pagina del carrello mostra l'elenco e il totale, e il checkout deve conoscere tutto. Tutti questi componenti leggono e modificano gli stessi dati. Senza uno stato globale dovresti sollevare lo stato fino al componente più alto e passarlo giù come props (il *prop drilling* visto nella lezione su Context). Redux risolve il problema creando un'unica fonte di verità accessibile ovunque.",
      },
      {
        type: "info",
        content:
          "Anche Context risolve il prop drilling. Redux in più offre: aggiornamenti prevedibili tramite action e reducer, strumenti di debug (Redux DevTools) e la possibilità di far ri-renderizzare un componente solo quando cambia la porzione di stato che usa. Per dati semplici e poco frequenti (tema, utente loggato) Context basta; per stato ricco e aggiornato spesso Redux è più comodo.",
      },
      {
        type: "heading",
        content: "I concetti di base: state, action, reducer",
      },
      {
        type: "list",
        items: [
          "**State**: un normale oggetto JavaScript che contiene tutti i dati globali, ad esempio `{ cart: { items: [], total: 0 } }`.",
          "**Action**: un oggetto che descrive *cosa è successo*. Ha sempre un campo `type` (una stringa) e spesso un `payload` con i dati, ad esempio `{ type: \"cart/addItem\", payload: { name: \"Mela\", price: 1.5 } }`.",
          "**Reducer**: una funzione `(state, action) => nuovoState` che, dato lo stato attuale e un'action, restituisce il nuovo stato. Deve essere *pura*: niente effetti collaterali e niente modifiche dirette allo stato ricevuto.",
          "**Store**: l'oggetto che conserva lo stato e offre `getState()` per leggerlo e `dispatch(action)` per inviare un'action al reducer.",
        ],
      },
      {
        type: "code",
        language: "javascript",
        title: "Un reducer \"a mano\" (Redux classico)",
        code: `const initialState = { items: [], total: 0 };

function cartReducer(state = initialState, action) {
  if (action.type === "cart/addItem") {
    // Non modifichiamo state: creiamo un NUOVO oggetto con lo spread
    return {
      ...state,
      items: [...state.items, action.payload],
      total: state.total + action.payload.price,
    };
  } else if (action.type === "cart/clear") {
    return initialState;
  }
  // Action sconosciuta: lo stato resta com'è
  return state;
}

let state = cartReducer(undefined, { type: "@@init" });
console.log(state); // { items: [], total: 0 }

state = cartReducer(state, {
  type: "cart/addItem",
  payload: { name: "Mela", price: 1.5 },
});
console.log(state.total); // 1.5`,
      },
      {
        type: "text",
        content:
          "Perché tanta attenzione a non modificare lo stato? Redux (e React) capiscono che qualcosa è cambiato confrontando i riferimenti con `===`: se modifichi l'oggetto esistente, il riferimento resta lo stesso e l'interfaccia potrebbe non aggiornarsi. Restituire sempre un nuovo oggetto rende ogni modifica rilevabile e prevedibile.",
      },
      {
        type: "heading",
        content: "Redux Toolkit (RTK) vs Redux classico",
      },
      {
        type: "text",
        content:
          "Redux Toolkit è il modo moderno e ufficiale di usare Redux (si installa con `npm install @reduxjs/toolkit react-redux`). Il Redux classico richiedeva molto codice ripetitivo (*boilerplate*): stringhe per i tipi di action, funzioni separate per creare le action, reducer con lunghe catene di condizioni e copie manuali dello stato con lo spread. RTK semplifica tutto questo.",
      },
      {
        type: "list",
        items: [
          "`configureStore`: crea lo store con una configurazione già pronta (middleware e supporto ai Redux DevTools).",
          "`createSlice`: genera automaticamente action e reducer a partire da un unico oggetto.",
          "Immer integrato: puoi scrivere codice che *sembra* modificare lo stato, ma che produce comunque un nuovo oggetto.",
          "Meno boilerplate: niente tipi di action scritti a mano, niente funzioni per creare action, niente catene di if/else.",
        ],
      },
      {
        type: "heading",
        content: "createSlice: definire una porzione di stato",
      },
      {
        type: "text",
        content:
          "`createSlice` è il cuore di Redux Toolkit. Riceve un nome, uno stato iniziale e un oggetto di reducer, e genera automaticamente il reducer della slice e gli *action creators*: funzioni che costruiscono l'action giusta. Ad esempio `addItem(prodotto)` restituisce `{ type: \"cart/addItem\", payload: prodotto }`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "createSlice per il carrello",
        code: `// store/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",                 // Nome univoco: prefisso dei tipi di action
  initialState: {               // Stato iniziale della slice
    items: [],
    total: 0,
  },
  reducers: {                   // Una funzione per ogni modifica possibile
    addItem(state, action) {
      state.items.push(action.payload);
      state.total += action.payload.price;
    },
    removeItem(state, action) {
      const index = state.items.findIndex((p) => p.name === action.payload);
      if (index !== -1) {
        state.total -= state.items[index].price;
        state.items.splice(index, 1);
      }
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;
    },
  },
});

// Gli action creators vengono generati AUTOMATICAMENTE
export const { addItem, removeItem, clearCart } = cartSlice.actions;

console.log(addItem({ name: "Mela", price: 1.5 }));
// { type: "cart/addItem", payload: { name: "Mela", price: 1.5 } }

// Il reducer viene esportato per lo store
export default cartSlice.reducer;`,
      },
      {
        type: "heading",
        content: "Immer: aggiornamenti immutabili con sintassi mutabile",
      },
      {
        type: "text",
        content:
          "Nel Redux classico non puoi mai modificare lo stato direttamente: devi sempre restituire un nuovo oggetto. Redux Toolkit usa la libreria **Immer**, che ti permette di scrivere `state.total += 1` o `state.items.push(...)`: Immer registra le modifiche su una bozza e produce un nuovo stato, lasciando intatto quello precedente.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Immer rende il codice molto più leggibile",
        code: `// REDUX CLASSICO (senza Immer): spread annidati, verboso e fragile
function preferencesReducer(state, action) {
  if (action.type === "preferences/setNotification") {
    return {
      ...state,
      notifications: {
        ...state.notifications,
        [action.payload.channel]: action.payload.enabled,
      },
    };
  }
  return state;
}

// REDUX TOOLKIT (con Immer): semplice e diretto
const preferencesSlice = createSlice({
  name: "preferences",
  initialState: {
    theme: "chiaro",
    notifications: { email: true, push: false },
  },
  reducers: {
    setNotification(state, action) {
      const { channel, enabled } = action.payload;
      // Sembra una modifica diretta, ma Immer la trasforma
      // in un aggiornamento immutabile!
      state.notifications[channel] = enabled;
    },
  },
});`,
      },
      {
        type: "warning",
        content:
          "Attenzione: la \"mutazione\" è permessa solo dentro i reducer di `createSlice`. Fuori dai reducer (ad esempio nei componenti) non devi MAI modificare direttamente lo stato Redux: invia sempre un'action con `dispatch`.",
      },
      {
        type: "heading",
        content: "configureStore: creare lo store",
      },
      {
        type: "text",
        content:
          "Lo store si crea con `configureStore`, passando un oggetto `reducer`. Ogni chiave di questo oggetto diventa una sezione (slice) dello stato globale, gestita dal reducer corrispondente.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Lo store di un negozio online",
        code: `// store/index.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productsReducer from "./productsSlice";
import preferencesReducer from "./preferencesSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    preferences: preferencesReducer,
  },
});

export default store;

// Lo stato globale ha questa forma:
// {
//   cart: { items: [...], total: 0 },
//   products: { list: [...], loading: false },
//   preferences: { theme: "chiaro", notifications: { ... } },
// }

// Lo store si può usare anche senza React:
store.dispatch(addItem({ name: "Mela", price: 1.5 }));
console.log(store.getState().cart.total); // 1.5`,
      },
      {
        type: "subheading",
        content: "Più slice per un'app organizzata",
      },
      {
        type: "text",
        content:
          "Ogni slice gestisce una responsabilità specifica. Dividere lo stato in slice rende il codice modulare, facile da testare e da capire: chi lavora sul carrello tocca solo `cartSlice.js`.",
      },
      {
        type: "list",
        items: [
          "`cart`: prodotti nel carrello e totale.",
          "`products`: catalogo dei prodotti caricato dal server e stato di caricamento.",
          "`preferences`: tema, lingua e notifiche scelte dall'utente.",
        ],
      },
      {
        type: "tip",
        content:
          "Crea una slice per ogni area logica dell'applicazione (non una per componente) e metti in Redux solo lo stato davvero condiviso: lo stato locale di un singolo componente, come l'apertura di un menu o il testo di un campo, sta meglio in `useState`.",
      },
    ],
    exercises: [
      {
        type: "code",
        title: "Crea la slice del carrello",
        description:
          "Nello starter trovi una versione semplificata di `createSlice` (non serve modificarla): crea `actions` e `reducer` come quella vera, e lavora su una copia dello stato, quindi puoi \"mutare\" `state` come con Immer.\n\nCrea `cartSlice` con:\n- `name`: \"cart\"\n- `initialState`: `{ items: [], total: 0 }`\n- `reducers`:\n  - `addItem(state, action)`: aggiunge `action.payload` (un oggetto `{ name, price }`) a `items` e somma il prezzo a `total`\n  - `removeItem(state, action)`: `action.payload` è un nome; rimuove il primo prodotto con quel nome e sottrae il suo prezzo da `total` (se non esiste non fa nulla)\n  - `clearCart(state)`: svuota il carrello e riporta `total` a 0",
        difficulty: "medio",
        mode: "js",
        starterCode: `// ---- createSlice semplificato (non modificare) ----
function createSlice({ name, initialState, reducers }) {
  const actions = {};
  for (const key of Object.keys(reducers)) {
    // Action creator: costruisce { type: "nome/chiave", payload }
    actions[key] = (payload) => ({ type: name + "/" + key, payload });
  }
  function reducer(state = initialState, action) {
    for (const key of Object.keys(reducers)) {
      if (action.type === name + "/" + key) {
        // structuredClone crea una copia profonda: lo stato precedente resta intatto
        const draft = structuredClone(state);
        reducers[key](draft, action);
        return draft;
      }
    }
    return state;
  }
  return { name, actions, reducer };
}
// ----------------------------------------------------

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    // definisci lo stato iniziale
  },
  reducers: {
    // addItem, removeItem, clearCart
  },
});

// Prova
const { addItem, removeItem, clearCart } = cartSlice.actions;
let state = cartSlice.reducer(undefined, { type: "@@init" });
state = cartSlice.reducer(state, addItem({ name: "Mela", price: 1.5 }));
state = cartSlice.reducer(state, addItem({ name: "Pane", price: 2 }));
console.log(state.items.length, state.total); // 2 3.5
state = cartSlice.reducer(state, removeItem("Mela"));
console.log(state.items.length, state.total); // 1 2`,
        solution: `// ---- createSlice semplificato (non modificare) ----
function createSlice({ name, initialState, reducers }) {
  const actions = {};
  for (const key of Object.keys(reducers)) {
    // Action creator: costruisce { type: "nome/chiave", payload }
    actions[key] = (payload) => ({ type: name + "/" + key, payload });
  }
  function reducer(state = initialState, action) {
    for (const key of Object.keys(reducers)) {
      if (action.type === name + "/" + key) {
        // structuredClone crea una copia profonda: lo stato precedente resta intatto
        const draft = structuredClone(state);
        reducers[key](draft, action);
        return draft;
      }
    }
    return state;
  }
  return { name, actions, reducer };
}
// ----------------------------------------------------

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
      state.total += action.payload.price;
    },
    removeItem(state, action) {
      const index = state.items.findIndex((p) => p.name === action.payload);
      if (index !== -1) {
        state.total -= state.items[index].price;
        state.items.splice(index, 1);
      }
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;
    },
  },
});

// Prova
const { addItem, removeItem, clearCart } = cartSlice.actions;
let state = cartSlice.reducer(undefined, { type: "@@init" });
state = cartSlice.reducer(state, addItem({ name: "Mela", price: 1.5 }));
state = cartSlice.reducer(state, addItem({ name: "Pane", price: 2 }));
console.log(state.items.length, state.total); // 2 3.5
state = cartSlice.reducer(state, removeItem("Mela"));
console.log(state.items.length, state.total); // 1 2`,
        validate: `if (typeof cartSlice !== "object" || !cartSlice) return "Crea cartSlice con createSlice";
if (cartSlice.name !== "cart") return "Il name della slice deve essere \\"cart\\"";
const a = cartSlice.actions;
const r = cartSlice.reducer;
let s = r(undefined, { type: "@@init" });
if (!$equal(s, { items: [], total: 0 })) return "initialState deve essere { items: [], total: 0 }";
for (const k of ["addItem", "removeItem", "clearCart"]) {
  if (typeof a[k] !== "function") return "Manca il reducer " + k + " nell'oggetto reducers";
}
s = r(s, a.addItem({ name: "Mela", price: 1.5 }));
s = r(s, a.addItem({ name: "Pane", price: 2 }));
s = r(s, a.addItem({ name: "Latte", price: 0.5 }));
if (!s.items || s.items.length !== 3) return "Dopo 3 addItem il carrello deve contenere 3 prodotti";
if (s.items[0].name !== "Mela" || s.items[2].name !== "Latte") return "addItem deve aggiungere action.payload in fondo a items";
if (s.total !== 4) return "Dopo aver aggiunto prodotti da 1.5, 2 e 0.5 il totale deve essere 4 (ottenuto: " + $format(s.total) + ")";
const prima = s;
s = r(s, a.removeItem("Pane"));
if (s.items.length !== 2 || s.items.some((p) => p.name === "Pane")) return "removeItem(\\"Pane\\") deve rimuovere il prodotto Pane";
if (s.total !== 2) return "Dopo aver rimosso Pane (2) il totale deve essere 2";
if (prima.items.length !== 3) return "Il reducer non deve modificare lo stato precedente";
const s2 = r(s, a.removeItem("Caffè"));
if (s2.items.length !== 2 || s2.total !== 2) return "removeItem con un nome inesistente non deve cambiare nulla";
s = r(s, a.clearCart());
if (!$equal(s, { items: [], total: 0 })) return "clearCart deve riportare lo stato a { items: [], total: 0 }";
return true;`,
        solutionExplanation:
          "Ogni reducer riceve una copia dello stato (la bozza) e la modifica direttamente: `push` aggiunge il prodotto e `total` viene aggiornato nello stesso passo, così i due dati restano coerenti. In `removeItem` si cerca l'indice con `findIndex`: se vale -1 il prodotto non c'è e non si fa nulla, altrimenti si sottrae il prezzo PRIMA di rimuovere l'elemento con `splice` (dopo non sarebbe più disponibile). `clearCart` riassegna i campi ai valori iniziali.",
      },
      {
        type: "multiple-choice",
        title: "Ruolo di createSlice",
        description: "Cosa genera automaticamente `createSlice` di Redux Toolkit?",
        difficulty: "facile",
        options: [
          "Il reducer, i tipi di action e gli action creators a partire dall'oggetto reducers",
          "Solo il reducer: le action vanno create a mano",
          "Solo le action: il reducer va scritto separatamente",
          "Un componente React con lo stato predefinito",
        ],
        correct: 0,
        explanation:
          "`createSlice` riceve name, initialState e reducers e genera il reducer della slice, i tipi di action (stringhe come `\"cart/addItem\"`, formate da name + nome del reducer) e gli action creators (funzioni come `addItem(payload)` che costruiscono l'oggetto action). Tutto da un unico punto di configurazione.",
      },
      {
        type: "multiple-choice",
        title: "Immer e immutabilità",
        description:
          "Perché in un reducer di `createSlice` possiamo scrivere `state.theme = action.payload`?",
        difficulty: "medio",
        options: [
          "Perché Redux non richiede l'immutabilità dello stato",
          "Perché Immer, integrato in RTK, registra la modifica su una bozza e produce automaticamente un nuovo stato",
          "Perché JavaScript permette sempre di modificare gli oggetti",
          "Perché il componente React copia lo stato prima di chiamare il reducer",
        ],
        correct: 1,
        explanation:
          "Redux Toolkit integra la libreria Immer: il reducer riceve una *bozza* (draft) dello stato, Immer registra le modifiche e produce un nuovo oggetto, lasciando intatto quello precedente. Questo vale solo dentro i reducer di createSlice: altrove lo stato non va mai modificato direttamente.",
      },
      {
        type: "multiple-choice",
        title: "Un reducer classico con un errore",
        description:
          "Questo reducer è scritto \"a mano\", SENZA createSlice:\n\nfunction cartReducer(state = { items: [] }, action) {\n  if (action.type === \"cart/addItem\") {\n    state.items.push(action.payload);\n    return state;\n  }\n  return state;\n}\n\nCosa c'è di sbagliato?",
        difficulty: "difficile",
        options: [
          "Niente: `push` è il modo corretto di aggiungere un elemento allo stato",
          "Manca il `payload` nel controllo del type",
          "Il reducer deve restituire `undefined` quando l'action non è riconosciuta",
          "Modifica lo stato ricevuto e restituisce lo stesso oggetto: va restituito un nuovo stato, ad esempio `{ ...state, items: [...state.items, action.payload] }`",
        ],
        correct: 3,
        explanation:
          "Fuori da createSlice non c'è Immer: un reducer deve essere puro e non può modificare lo stato ricevuto. Restituendo lo stesso oggetto, il riferimento non cambia e chi confronta con `===` (come useSelector) non si accorge della modifica. La soluzione è creare nuovi oggetti e array con lo spread. Il payload non va controllato nel type, e per un'action sconosciuta il reducer deve restituire lo stato attuale, non undefined.",
      },
    ],
  },

  "use-redux": {
    sections: [
      {
        type: "text",
        content:
          "Ora che sappiamo creare lo store e le slice, vediamo come i componenti React leggono e modificano lo stato Redux. Il pacchetto `react-redux` offre due hook fondamentali: `useSelector` (per leggere) e `useDispatch` (per inviare action).",
      },
      {
        type: "heading",
        content: "Il Provider: collegare Redux a React",
      },
      {
        type: "text",
        content:
          "Prima di usare Redux nei componenti, bisogna avvolgere l'applicazione con il componente `Provider` di react-redux, passandogli lo store. Funziona come il Provider di Context: rende lo store disponibile a tutti i componenti discendenti.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Setup del Provider",
        code: `import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      {/* Tutti i componenti qui dentro possono
          usare useSelector e useDispatch */}
      <Header />
      <ProductList />
      <Cart />
    </Provider>
  );
}`,
      },
      {
        type: "info",
        content:
          "Nel modulo Next.js vedremo dove posizionare il Provider in un'app Next.js; il concetto resta lo stesso.",
      },
      {
        type: "heading",
        content: "useSelector: leggere lo stato",
      },
      {
        type: "text",
        content:
          "`useSelector` riceve una *funzione selettore* che, dato lo stato globale, restituisce la porzione che serve al componente. Il componente si ri-renderizza SOLO quando il valore restituito cambia, non quando cambiano altre parti dello stato.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Leggere lo stato con useSelector",
        code: `import { useSelector } from "react-redux";

function Header() {
  // Legge un singolo valore
  const itemCount = useSelector((state) => state.cart.items.length);

  // Legge da un'altra slice
  const theme = useSelector((state) => state.preferences.theme);

  return (
    <header className={theme === "scuro" ? "header-dark" : "header-light"}>
      <span>Il mio negozio</span>
      <span>Carrello: {itemCount}</span>
    </header>
  );
}`,
      },
      {
        type: "info",
        content:
          "`useSelector` confronta il nuovo risultato con il precedente usando `===`. Se il selettore restituisce un nuovo oggetto o array a ogni chiamata (ad esempio con `.filter()` o `.map()`), il confronto fallisce sempre e il componente si ri-renderizza a ogni action. Approfondiremo nella lezione sui selettori.",
      },
      {
        type: "heading",
        content: "useDispatch: modificare lo stato",
      },
      {
        type: "text",
        content:
          "`useDispatch` restituisce la funzione `dispatch` dello store. La usi per inviare le action create dagli action creators: Redux le passa ai reducer, che aggiornano lo stato, e i componenti interessati si ri-renderizzano.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Dispatch da un gestore di eventi",
        code: `import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";
import { setTheme } from "../store/preferencesSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>{product.price} €</p>
      <button onClick={() => dispatch(addItem(product))}>
        Aggiungi al carrello
      </button>
    </div>
  );
}

function ThemeSelector() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.preferences.theme);

  return (
    <select value={theme} onChange={(e) => dispatch(setTheme(e.target.value))}>
      <option value="chiaro">Chiaro</option>
      <option value="scuro">Scuro</option>
    </select>
  );
}`,
      },
      {
        type: "subheading",
        content: "Dispatch da useEffect",
      },
      {
        type: "text",
        content:
          "Spesso il dispatch avviene dentro `useEffect`, ad esempio dopo aver caricato dei dati dal server. È un pattern molto comune per salvare in Redux il risultato di un'operazione asincrona.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Dispatch da useEffect",
        code: `import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProducts, setLoading } from "../store/productsSlice";

function ProductList() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.products);

  // Al primo render carica i prodotti e li salva nello store
  useEffect(() => {
    const load = async () => {
      dispatch(setLoading(true));
      const response = await fetch("/api/products");
      const data = await response.json();
      dispatch(setProducts(data));
      dispatch(setLoading(false));
    };
    load();
  }, [dispatch]);

  if (loading) return <p>Caricamento...</p>;
  return (
    <ul>
      {list.map((p) => (
        <li key={p.id}>{p.name}</li>
      ))}
    </ul>
  );
}`,
      },
      {
        type: "warning",
        content:
          "Includi `dispatch` nell'array delle dipendenze di useEffect: la funzione è garantita stabile da react-redux (non cambia tra un render e l'altro), quindi l'effetto non si ripete, ma la regola ESLint degli hook lo richiede.",
      },
      {
        type: "subheading",
        content: "Pattern: il padre fa il dispatch, il figlio riceve una callback",
      },
      {
        type: "text",
        content:
          "Un pattern utile è far sì che un componente \"contenitore\" parli con Redux e passi ai figli solo dati e callback. I figli restano semplici, riutilizzabili e non sanno nulla di Redux.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Callback come props",
        code: `import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../store/cartSlice";

function CartContainer() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  // Il padre gestisce il dispatch
  const handleRemove = (name) => {
    dispatch(removeItem(name));
  };

  return <CartList items={items} onRemove={handleRemove} />;
}

// Il figlio non sa nulla di Redux: riceve dati e una callback
function CartList({ items, onRemove }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.name}>
          {item.name} - {item.price} €
          <button onClick={() => onRemove(item.name)}>Rimuovi</button>
        </li>
      ))}
    </ul>
  );
}`,
      },
      {
        type: "tip",
        content:
          "Tieni i componenti di presentazione (che ricevono solo props) separati da quelli che usano `useSelector` e `useDispatch`: i primi diventano facili da riutilizzare e da testare, perché non dipendono dallo store.",
      },
    ],
    exercises: [
      {
        type: "code",
        title: "Costruisci uno store in miniatura",
        description:
          "Per capire cosa fa lo store dietro le quinte, implementa una versione semplificata di `createStore(reducer)` che restituisce un oggetto con:\n- `getState()`: restituisce lo stato corrente\n- `dispatch(action)`: calcola il nuovo stato con `reducer(statoCorrente, action)` e poi chiama tutte le funzioni registrate con subscribe\n- `subscribe(listener)`: registra una funzione da chiamare dopo ogni dispatch\n\nLo stato iniziale si ottiene chiamando subito `reducer(undefined, { type: \"@@init\" })`.\n\nImplementa poi `select(store, selector)`, che simula useSelector: restituisce `selector(store.getState())`.",
        difficulty: "medio",
        mode: "js",
        starterCode: `function createStore(reducer) {
  // Calcola lo stato iniziale e prepara l'array dei listener

  return {
    getState() {
      // restituisci lo stato corrente
    },
    dispatch(action) {
      // aggiorna lo stato con il reducer e avvisa i listener
    },
    subscribe(listener) {
      // registra il listener
    },
  };
}

function select(store, selector) {
  // simula useSelector
}

// Reducer di prova: preferenze dell'utente
function preferencesReducer(state = { theme: "chiaro", fontSize: 16 }, action) {
  if (action.type === "preferences/toggleTheme") {
    return { ...state, theme: state.theme === "chiaro" ? "scuro" : "chiaro" };
  } else if (action.type === "preferences/setFontSize") {
    return { ...state, fontSize: action.payload };
  }
  return state;
}

const store = createStore(preferencesReducer);
store.subscribe(() => console.log("Stato aggiornato:", store.getState()));
store.dispatch({ type: "preferences/toggleTheme" });
store.dispatch({ type: "preferences/setFontSize", payload: 20 });
console.log(select(store, (state) => state.theme)); // "scuro"`,
        solution: `function createStore(reducer) {
  let state = reducer(undefined, { type: "@@init" });
  const listeners = [];

  return {
    getState() {
      return state;
    },
    dispatch(action) {
      state = reducer(state, action);
      listeners.forEach((listener) => listener());
    },
    subscribe(listener) {
      listeners.push(listener);
    },
  };
}

function select(store, selector) {
  return selector(store.getState());
}

// Reducer di prova: preferenze dell'utente
function preferencesReducer(state = { theme: "chiaro", fontSize: 16 }, action) {
  if (action.type === "preferences/toggleTheme") {
    return { ...state, theme: state.theme === "chiaro" ? "scuro" : "chiaro" };
  } else if (action.type === "preferences/setFontSize") {
    return { ...state, fontSize: action.payload };
  }
  return state;
}

const store = createStore(preferencesReducer);
store.subscribe(() => console.log("Stato aggiornato:", store.getState()));
store.dispatch({ type: "preferences/toggleTheme" });
store.dispatch({ type: "preferences/setFontSize", payload: 20 });
console.log(select(store, (state) => state.theme)); // "scuro"`,
        validate: `if (typeof createStore !== "function") return "Definisci la funzione createStore";
if (typeof select !== "function") return "Definisci la funzione select";
function counter(state = { count: 0 }, action) {
  if (action.type === "add") return { count: state.count + action.payload };
  return state;
}
const st = createStore(counter);
if (!st || typeof st.getState !== "function" || typeof st.dispatch !== "function" || typeof st.subscribe !== "function")
  return "createStore deve restituire un oggetto con getState, dispatch e subscribe";
if (!$equal(st.getState(), { count: 0 })) return "Lo stato iniziale deve essere reducer(undefined, { type: \\"@@init\\" })";
st.dispatch({ type: "add", payload: 5 });
if (!st.getState() || st.getState().count !== 5) return "dispatch deve aggiornare lo stato con reducer(statoCorrente, action)";
st.dispatch({ type: "sconosciuta" });
st.dispatch({ type: "add", payload: 2 });
if (st.getState().count !== 7) return "Dopo add 5 e add 2 il contatore deve essere 7";
let calls = 0;
let seen = null;
st.subscribe(() => { calls++; seen = st.getState().count; });
st.subscribe(() => { calls++; });
st.dispatch({ type: "add", payload: 1 });
if (calls !== 2) return "Dopo un dispatch devono essere chiamati tutti i listener registrati con subscribe";
if (seen !== 8) return "I listener vanno chiamati DOPO aver aggiornato lo stato";
if (select(st, (s) => s.count * 10) !== 80) return "select(store, selector) deve restituire selector(store.getState())";
const p = createStore(preferencesReducer);
p.dispatch({ type: "preferences/toggleTheme" });
if (select(p, (s) => s.theme) !== "scuro") return "Con preferencesReducer, dopo toggleTheme il tema deve essere \\"scuro\\"";
return true;`,
        solutionExplanation:
          "Lo stato vive in una variabile `let` nella closure di `createStore`: nessuno può modificarlo dall'esterno, solo tramite `dispatch`. `dispatch` calcola il nuovo stato con il reducer e solo DOPO chiama i listener, così chi legge `getState()` dentro un listener vede già i dati aggiornati. È esattamente il meccanismo che `useSelector` usa dietro le quinte: si iscrive con subscribe e, a ogni dispatch, riesegue il selettore.",
      },
      {
        type: "code",
        title: "Collega un componente allo store",
        description:
          "Completa il componente `CartSummary`:\n- leggi il numero di prodotti nel carrello con `useSelector((state) => state.cart.items.length)`\n- leggi il totale da `state.cart.total`\n- ottieni `dispatch` con `useDispatch()`\n- al click sul bottone invia l'action `clearCart()`\n\nQuesto codice non viene eseguito: viene controllato il testo.",
        difficulty: "facile",
        mode: "static",
        starterCode: `import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";

function CartSummary() {
  // leggi count e total dallo store
  // ottieni dispatch

  return (
    <div>
      <p>Prodotti: {count}</p>
      <p>Totale: {total} €</p>
      <button>Svuota carrello</button>
    </div>
  );
}`,
        solution: `import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../store/cartSlice";

function CartSummary() {
  const count = useSelector((state) => state.cart.items.length);
  const total = useSelector((state) => state.cart.total);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Prodotti: {count}</p>
      <p>Totale: {total} €</p>
      <button onClick={() => dispatch(clearCart())}>Svuota carrello</button>
    </div>
  );
}`,
        validate: `const c = $codeNoComments;
if (!/const\\s+count\\s*=\\s*useSelector\\(\\s*\\(?\\s*(\\w+)\\s*\\)?\\s*=>\\s*\\1\\.cart\\.items\\.length\\s*\\)/.test(c))
  return "Leggi count con useSelector((state) => state.cart.items.length)";
if (!/const\\s+total\\s*=\\s*useSelector\\(\\s*\\(?\\s*(\\w+)\\s*\\)?\\s*=>\\s*\\1\\.cart\\.total\\s*\\)/.test(c))
  return "Leggi total con useSelector((state) => state.cart.total)";
if (!/const\\s+dispatch\\s*=\\s*useDispatch\\(\\s*\\)/.test(c)) return "Ottieni dispatch con const dispatch = useDispatch()";
if (!/onClick=\\{\\s*\\(\\s*\\)\\s*=>\\s*dispatch\\(\\s*clearCart\\(\\s*\\)\\s*\\)\\s*\\}/.test(c))
  return "Aggiungi al bottone onClick={() => dispatch(clearCart())}";
return true;`,
      },
      {
        type: "multiple-choice",
        title: "Quando si ri-renderizza un componente con useSelector?",
        description:
          "Un componente usa `useSelector((state) => state.preferences.theme)`. Quando si ri-renderizza a causa di Redux?",
        difficulty: "medio",
        options: [
          "Ogni volta che qualsiasi parte dello stato Redux cambia",
          "Solo quando il valore di state.preferences.theme cambia",
          "Solo quando viene chiamato dispatch() nel componente stesso",
          "Mai: useSelector non causa re-render",
        ],
        correct: 1,
        explanation:
          "useSelector iscrive il componente allo store, ma lo ri-renderizza solo quando il valore restituito dal selettore cambia (confronto con ===). Se cambia il carrello o un altro campo delle preferenze, il tema resta uguale e il componente non si ri-renderizza.",
      },
      {
        type: "multiple-choice",
        title: "Provider e gerarchia",
        description:
          "Cosa succede se un componente chiama `useSelector` senza essere discendente di un `Provider`?",
        difficulty: "facile",
        options: [
          "Restituisce undefined silenziosamente",
          "Restituisce lo stato iniziale dello store",
          "Lancia un errore a runtime",
          "Funziona normalmente perché lo store è globale",
        ],
        correct: 2,
        explanation:
          "Senza un Provider che fornisce lo store tramite il contesto React, useSelector non sa da quale store leggere e lancia un errore. Il Provider è obbligatorio e deve avvolgere tutti i componenti che usano gli hook di Redux.",
      },
      {
        type: "multiple-choice",
        title: "Dispatch nel posto giusto",
        description:
          "Quale di questi componenti invia correttamente l'action `addItem` quando l'utente clicca il bottone?",
        difficulty: "medio",
        options: [
          "`<button onClick={dispatch(addItem(prodotto))}>Aggiungi</button>`",
          "`<button onClick={() => dispatch(addItem(prodotto))}>Aggiungi</button>`",
          "`<button onClick={() => addItem(prodotto)}>Aggiungi</button>`",
          "`<button onClick={() => useDispatch(addItem(prodotto))}>Aggiungi</button>`",
        ],
        correct: 1,
        explanation:
          "Serve una funzione che, al clic, chiami `dispatch` con l'action creata da `addItem(prodotto)`. Nella prima opzione `dispatch` viene eseguito subito durante il render (e a ogni render), non al clic. Nella terza `addItem(prodotto)` crea solo l'oggetto action, ma nessuno lo invia allo store. Nella quarta useDispatch è un hook: va chiamato al livello più alto del componente (`const dispatch = useDispatch();`), non dentro un gestore di eventi.",
      },
    ],
  },

  selectors: {
    sections: [
      {
        type: "text",
        content:
          "I selettori sono funzioni che ricevono lo stato Redux e ne estraggono o calcolano una parte. Vanno dalla semplice lettura di un campo a calcoli che derivano nuovi valori combinando diverse parti dello stato.",
      },
      {
        type: "heading",
        content: "Selettori semplici",
      },
      {
        type: "text",
        content:
          "Il selettore più semplice è una arrow function che accede a un campo dello stato. Si scrive direttamente dentro `useSelector`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Selettori semplici (dentro un componente)",
        code: `// Legge un singolo campo
const theme = useSelector((state) => state.preferences.theme);

// Legge un'intera slice
const cart = useSelector((state) => state.cart);

// Legge un valore annidato
const emailEnabled = useSelector(
  (state) => state.preferences.notifications.email
);

// Calcola un booleano (un valore primitivo: nessun problema di re-render)
const isCartEmpty = useSelector((state) => state.cart.items.length === 0);`,
      },
      {
        type: "heading",
        content: "Selettori derivati",
      },
      {
        type: "text",
        content:
          "Spesso serve calcolare valori che non sono salvati nello stato, ma si possono ricavare da esso: il totale del carrello, il numero di articoli, i prodotti di una categoria. Non conviene salvarli nello store (rischieresti di dimenticare di aggiornarli): meglio calcolarli con un selettore.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Selettori che calcolano valori derivati",
        code: `function CartBadge() {
  // Numero totale di pezzi: somma delle quantità
  const count = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  // Totale in euro: prezzo * quantità per ogni riga
  const total = useSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  return <span>{count} articoli - {total} €</span>;
}`,
      },
      {
        type: "heading",
        content: "Selettori riutilizzabili come funzioni esportate",
      },
      {
        type: "text",
        content:
          "Quando un selettore serve in più componenti, la buona pratica è definirlo una sola volta come funzione esportata, nel file della slice o in un file dedicato. Così la logica di accesso allo stato è centralizzata: se cambia la forma dello stato, si modifica un solo punto. Per convenzione i nomi iniziano con `select`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "store/cartSlice.js: selettori accanto alla slice",
        code: `// ... createSlice come nella lezione precedente ...

export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = (state) =>
  selectCartItems(state).reduce((sum, item) => sum + item.quantity, 0);

export const selectCartTotal = (state) =>
  selectCartItems(state).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

// Selettore con un parametro in più
export const selectItemById = (state, id) =>
  selectCartItems(state).find((item) => item.id === id);`,
      },
      {
        type: "code",
        language: "javascript",
        title: "Usare i selettori nei componenti",
        code: `import { useSelector } from "react-redux";
import { selectCartCount, selectCartTotal, selectItemById } from "../store/cartSlice";

function CartFooter() {
  const count = useSelector(selectCartCount);   // si passa la funzione
  const total = useSelector(selectCartTotal);
  return <p>{count} articoli, totale {total} €</p>;
}

function CartRow({ id }) {
  // Se il selettore ha parametri, si avvolge in una arrow function
  const item = useSelector((state) => selectItemById(state, id));
  return <li>{item.name} x {item.quantity}</li>;
}`,
      },
      {
        type: "heading",
        content: "Il pattern di merge: valori di default + personalizzazioni",
      },
      {
        type: "text",
        content:
          "Un pattern ricorrente è unire valori di default con le personalizzazioni dell'utente, così da avere sempre una configurazione completa anche se l'utente ha modificato solo alcuni campi. Si usa lo spread: prima i default, poi le personalizzazioni (che sovrascrivono).",
      },
      {
        type: "code",
        language: "javascript",
        title: "Spread annidato per unire le preferenze",
        code: `const defaultPreferences = {
  theme: "chiaro",
  language: "it",
  notifications: { email: true, push: false, sms: false },
};

// L'utente ha cambiato solo il tema e le notifiche push
const userPreferences = {
  theme: "scuro",
  notifications: { push: true },
};

// Spread semplice: SBAGLIATO per gli oggetti annidati!
const wrong = { ...defaultPreferences, ...userPreferences };
console.log(wrong.notifications); // { push: true }  -> email e sms persi!

// Merge corretto: lo spread annidato va fatto livello per livello
const preferences = {
  ...defaultPreferences,
  ...userPreferences,
  notifications: {
    ...defaultPreferences.notifications,
    ...(userPreferences.notifications || {}),
  },
};
console.log(preferences);
// {
//   theme: "scuro",                 <-- personalizzato
//   language: "it",                 <-- default
//   notifications: { email: true, push: true, sms: false },
// }

// Come selettore:
const selectPreferences = (state) => ({
  ...defaultPreferences,
  ...state.preferences,
  notifications: {
    ...defaultPreferences.notifications,
    ...(state.preferences.notifications || {}),
  },
});`,
      },
      {
        type: "info",
        content:
          "Lo spread è *superficiale* (shallow): copia solo il primo livello. Se una proprietà contiene un oggetto, lo spread delle personalizzazioni lo sostituisce per intero. Per questo le proprietà annidate come `notifications` vanno unite esplicitamente.",
      },
      {
        type: "heading",
        content: "Selettori e re-render: la memoizzazione",
      },
      {
        type: "text",
        content:
          "`useSelector` confronta il risultato con `===`. Un selettore come `selectPreferences` qui sopra, o uno che usa `.filter()` o `.map()`, crea un NUOVO oggetto o array a ogni chiamata: il confronto fallisce sempre e il componente si ri-renderizza a ogni action, anche se i dati non sono cambiati. La soluzione è *memoizzare* il selettore: ricalcolare il risultato solo quando cambiano i dati di partenza, altrimenti restituire lo stesso riferimento di prima (è la stessa idea di `useMemo`).",
      },
      {
        type: "code",
        language: "javascript",
        title: "createSelector di Redux Toolkit",
        code: `import { createSelector } from "@reduxjs/toolkit";

const selectItems = (state) => state.cart.items;

// Il secondo argomento viene ricalcolato SOLO quando selectItems
// restituisce un riferimento diverso (cioè quando il carrello cambia)
export const selectExpensiveItems = createSelector(
  [selectItems],
  (items) => items.filter((item) => item.price > 50)
);

// Nel componente: stesso array finché il carrello non cambia,
// quindi nessun re-render inutile
const expensive = useSelector(selectExpensiveItems);`,
      },
      {
        type: "warning",
        content:
          "Non serve memoizzare tutto: un selettore che restituisce un valore già presente nello stato o un valore primitivo (numero, stringa, booleano) non causa re-render inutili. La memoizzazione serve quando il selettore crea nuovi oggetti o array.",
      },
      {
        type: "tip",
        content:
          "Tieni nello store solo i dati \"di base\" e ricava tutto il resto (totali, conteggi, liste filtrate) con selettori riutilizzabili. Lo stato resta piccolo, non può andare fuori sincrono e la logica di calcolo sta in un solo posto.",
      },
    ],
    exercises: [
      {
        type: "code",
        title: "Scrivi i selettori del carrello",
        description:
          "Lo stato del negozio ha la forma `{ cart: { items: [...] }, preferences: { currency } }`, dove ogni item è `{ id, name, price, quantity }`.\n\nScrivi quattro selettori:\n1. `selectCartItems(state)`: restituisce l'array degli item del carrello\n2. `selectCartCount(state)`: restituisce il numero totale di pezzi (somma delle quantità)\n3. `selectCartTotal(state)`: restituisce il totale (somma di price * quantity)\n4. `selectItemById(state, id)`: restituisce l'item con quell'id, oppure `undefined`\n\nUsa `selectCartItems` dentro gli altri selettori.",
        difficulty: "medio",
        mode: "js",
        starterCode: `const state = {
  cart: {
    items: [
      { id: 1, name: "Maglietta", price: 15, quantity: 2 },
      { id: 2, name: "Cappello", price: 10, quantity: 1 },
      { id: 3, name: "Calzini", price: 4, quantity: 3 },
    ],
  },
  preferences: { currency: "EUR" },
};

function selectCartItems(state) {
  // restituisci gli item del carrello
}

function selectCartCount(state) {
  // somma delle quantità
}

function selectCartTotal(state) {
  // somma di price * quantity
}

function selectItemById(state, id) {
  // trova l'item con quell'id
}

console.log(selectCartCount(state));        // 6
console.log(selectCartTotal(state));        // 52
console.log(selectItemById(state, 2).name); // "Cappello"`,
        solution: `const state = {
  cart: {
    items: [
      { id: 1, name: "Maglietta", price: 15, quantity: 2 },
      { id: 2, name: "Cappello", price: 10, quantity: 1 },
      { id: 3, name: "Calzini", price: 4, quantity: 3 },
    ],
  },
  preferences: { currency: "EUR" },
};

function selectCartItems(state) {
  return state.cart.items;
}

function selectCartCount(state) {
  return selectCartItems(state).reduce((sum, item) => sum + item.quantity, 0);
}

function selectCartTotal(state) {
  return selectCartItems(state).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
}

function selectItemById(state, id) {
  return selectCartItems(state).find((item) => item.id === id);
}

console.log(selectCartCount(state));        // 6
console.log(selectCartTotal(state));        // 52
console.log(selectItemById(state, 2).name); // "Cappello"`,
        validate: `if (typeof selectCartItems !== "function") return "Definisci la funzione selectCartItems";
if (typeof selectCartCount !== "function") return "Definisci la funzione selectCartCount";
if (typeof selectCartTotal !== "function") return "Definisci la funzione selectCartTotal";
if (typeof selectItemById !== "function") return "Definisci la funzione selectItemById";
const s1 = {
  cart: { items: [
    { id: 1, name: "Maglietta", price: 15, quantity: 2 },
    { id: 2, name: "Cappello", price: 10, quantity: 1 },
    { id: 3, name: "Calzini", price: 4, quantity: 3 },
  ] },
  preferences: { currency: "EUR" },
};
const s2 = {
  cart: { items: [{ id: 7, name: "Libro", price: 12, quantity: 4 }] },
  preferences: { currency: "EUR" },
};
const empty = { cart: { items: [] }, preferences: { currency: "EUR" } };
if (selectCartItems(s1) !== s1.cart.items) return "selectCartItems deve restituire state.cart.items (lo stesso array, non una copia)";
if (selectCartCount(s1) !== 6) return "selectCartCount: con quantità 2, 1 e 3 il risultato deve essere 6";
if (selectCartCount(s2) !== 4) return "selectCartCount deve funzionare con qualsiasi stato (atteso 4 per il secondo stato di prova)";
if (selectCartCount(empty) !== 0) return "selectCartCount con carrello vuoto deve restituire 0";
if (selectCartTotal(s1) !== 52) return "selectCartTotal: 15*2 + 10*1 + 4*3 = 52";
if (selectCartTotal(s2) !== 48) return "selectCartTotal deve funzionare con qualsiasi stato (atteso 48 per 12*4)";
if (selectCartTotal(empty) !== 0) return "selectCartTotal con carrello vuoto deve restituire 0";
const item = selectItemById(s1, 3);
if (!item || item.name !== "Calzini") return "selectItemById(state, 3) deve restituire l'item Calzini";
if (selectItemById(s2, 7) !== s2.cart.items[0]) return "selectItemById deve restituire l'item trovato";
if (selectItemById(s1, 99) !== undefined) return "selectItemById con un id inesistente deve restituire undefined";
if (!/selectCartItems\\(/.test($codeNoComments.replace(/function\\s+selectCartItems\\s*\\(/, "")))
  return "Riusa selectCartItems dentro gli altri selettori";
return true;`,
        solutionExplanation:
          "`selectCartItems` è il selettore \"di base\": gli altri lo riusano, così se un giorno la forma dello stato cambia basta aggiornare un solo punto. Conteggio e totale si ottengono con `reduce` partendo da 0 (che è anche il risultato corretto per un carrello vuoto), mentre `find` restituisce già `undefined` quando nessun item ha l'id cercato.",
      },
      {
        type: "code",
        title: "Unisci le preferenze con i default",
        description:
          "Implementa `mergePreferences(defaults, custom)` che restituisce un NUOVO oggetto in cui:\n- le proprietà di primo livello di `custom` sovrascrivono quelle di `defaults`\n- `notifications` è unito livello per livello: i canali non specificati in `custom` mantengono il valore di default\n- `defaults` e `custom` non vengono modificati\n\nAttenzione: `custom` potrebbe non avere `notifications`.",
        difficulty: "difficile",
        mode: "js",
        starterCode: `const defaultPreferences = {
  theme: "chiaro",
  language: "it",
  fontSize: 16,
  notifications: { email: true, push: false, sms: false },
};

function mergePreferences(defaults, custom) {
  // 1. spread dei default e poi di custom
  // 2. spread annidato per notifications

}

const result1 = mergePreferences(defaultPreferences, {
  theme: "scuro",
  notifications: { push: true },
});
console.log(result1);
// { theme: "scuro", language: "it", fontSize: 16,
//   notifications: { email: true, push: true, sms: false } }

const result2 = mergePreferences(defaultPreferences, { fontSize: 20 });
console.log(result2.notifications); // { email: true, push: false, sms: false }`,
        solution: `const defaultPreferences = {
  theme: "chiaro",
  language: "it",
  fontSize: 16,
  notifications: { email: true, push: false, sms: false },
};

function mergePreferences(defaults, custom) {
  return {
    ...defaults,
    ...custom,
    notifications: {
      ...defaults.notifications,
      ...(custom.notifications || {}),
    },
  };
}

const result1 = mergePreferences(defaultPreferences, {
  theme: "scuro",
  notifications: { push: true },
});
console.log(result1);
// { theme: "scuro", language: "it", fontSize: 16,
//   notifications: { email: true, push: true, sms: false } }

const result2 = mergePreferences(defaultPreferences, { fontSize: 20 });
console.log(result2.notifications); // { email: true, push: false, sms: false }`,
        validate: `if (typeof mergePreferences !== "function") return "Definisci la funzione mergePreferences";
const d = { theme: "chiaro", language: "it", fontSize: 16, notifications: { email: true, push: false, sms: false } };
const dCopy = structuredClone(d);
const c1 = { theme: "scuro", notifications: { push: true } };
const r1 = mergePreferences(d, c1);
if (!r1 || typeof r1 !== "object") return "mergePreferences deve restituire un oggetto";
if (!$equal(r1, { theme: "scuro", language: "it", fontSize: 16, notifications: { email: true, push: true, sms: false } }))
  return "Con custom = { theme: \\"scuro\\", notifications: { push: true } } il risultato è " + $format(r1) + ": controlla lo spread annidato di notifications";
if (!$equal(d, dCopy)) return "mergePreferences non deve modificare l'oggetto dei default";
if (r1 === d || r1.notifications === d.notifications) return "Restituisci un nuovo oggetto (anche per notifications), non quello dei default";
const r2 = mergePreferences(d, { fontSize: 20, language: "en" });
if (!$equal(r2, { theme: "chiaro", language: "en", fontSize: 20, notifications: { email: true, push: false, sms: false } }))
  return "Se custom non ha notifications, devono restare quelle di default (ottenuto: " + $format(r2) + ")";
const r3 = mergePreferences({ theme: "chiaro", notifications: { email: false } }, { notifications: { sms: true } });
if (!$equal(r3, { theme: "chiaro", notifications: { email: false, sms: true } }))
  return "La funzione deve funzionare con qualsiasi oggetto di default, non solo con defaultPreferences";
const r4 = mergePreferences(d, {});
if (!$equal(r4, d)) return "Con custom vuoto il risultato deve essere uguale ai default";
return true;`,
        solutionExplanation:
          "L'ordine degli spread conta: prima `...defaults`, poi `...custom`, così le proprietà personalizzate vincono. Lo spread però è *superficiale*: `...custom` sostituirebbe l'intero oggetto `notifications`, perdendo i canali non specificati. Per questo `notifications` viene ricostruito a parte con un secondo spread, e `custom.notifications || {}` evita errori quando custom non lo contiene.",
      },
      {
        type: "code",
        title: "Un selettore memoizzato",
        description:
          "Implementa una versione semplificata di `createSelector(inputSelector, resultFn)`.\nDeve restituire una nuova funzione `(state) => ...` che:\n- calcola `input = inputSelector(state)`\n- se `input` è lo stesso (`===`) della chiamata precedente, restituisce il risultato salvato SENZA richiamare `resultFn`\n- altrimenti calcola `resultFn(input)`, lo salva insieme a `input` e lo restituisce\n\nSuggerimento: usa due variabili nella closure (ad esempio `lastInput` e `lastResult`) e un flag per sapere se è la prima chiamata.",
        difficulty: "difficile",
        mode: "js",
        starterCode: `function createSelector(inputSelector, resultFn) {
  // variabili della closure

  return (state) => {
    // calcola l'input e decidi se ricalcolare
  };
}

let calcoli = 0;
const selectExpensiveItems = createSelector(
  (state) => state.cart.items,
  (items) => {
    calcoli++;
    return items.filter((item) => item.price > 50);
  }
);

const items = [
  { name: "Giacca", price: 80 },
  { name: "Calzini", price: 4 },
];
const state1 = { cart: { items }, preferences: { theme: "chiaro" } };
// Cambia solo il tema: il carrello è lo stesso array
const state2 = { ...state1, preferences: { theme: "scuro" } };

const a = selectExpensiveItems(state1);
const b = selectExpensiveItems(state2);
console.log(a === b);  // true: stesso riferimento
console.log(calcoli);  // 1: il filtro è stato eseguito una sola volta`,
        solution: `function createSelector(inputSelector, resultFn) {
  let hasResult = false;
  let lastInput;
  let lastResult;

  return (state) => {
    const input = inputSelector(state);
    if (hasResult && input === lastInput) {
      return lastResult;
    }
    lastInput = input;
    lastResult = resultFn(input);
    hasResult = true;
    return lastResult;
  };
}

let calcoli = 0;
const selectExpensiveItems = createSelector(
  (state) => state.cart.items,
  (items) => {
    calcoli++;
    return items.filter((item) => item.price > 50);
  }
);

const items = [
  { name: "Giacca", price: 80 },
  { name: "Calzini", price: 4 },
];
const state1 = { cart: { items }, preferences: { theme: "chiaro" } };
// Cambia solo il tema: il carrello è lo stesso array
const state2 = { ...state1, preferences: { theme: "scuro" } };

const a = selectExpensiveItems(state1);
const b = selectExpensiveItems(state2);
console.log(a === b);  // true: stesso riferimento
console.log(calcoli);  // 1: il filtro è stato eseguito una sola volta`,
        validate: `if (typeof createSelector !== "function") return "Definisci la funzione createSelector";
let n = 0;
const sel = createSelector((s) => s.list, (list) => { n++; return list.map((x) => x * 2); });
if (typeof sel !== "function") return "createSelector deve restituire una funzione (state) => ...";
const list1 = [1, 2, 3];
const r1 = sel({ list: list1, other: 1 });
if (!$equal(r1, [2, 4, 6])) return "Il selettore deve restituire resultFn(inputSelector(state))";
if (n !== 1) return "Alla prima chiamata resultFn va eseguita una volta";
const r2 = sel({ list: list1, other: 2 });
if (n !== 1) return "Se l'input è lo stesso (===) non devi richiamare resultFn";
if (r2 !== r1) return "Con lo stesso input devi restituire lo stesso riferimento della chiamata precedente";
const list2 = [5];
const r3 = sel({ list: list2 });
if (n !== 2 || !$equal(r3, [10])) return "Quando l'input cambia devi ricalcolare con resultFn";
const r4 = sel({ list: list2 });
if (n !== 2 || r4 !== r3) return "Dopo un ricalcolo devi salvare il nuovo input e il nuovo risultato";
let m = 0;
const selU = createSelector((s) => s.value, (v) => { m++; return v; });
selU({});
selU({});
if (m !== 1) return "Anche se il primo input è undefined, alla seconda chiamata con lo stesso input non devi ricalcolare: usa un flag per la prima chiamata";
return true;`,
        solutionExplanation:
          "La closure conserva tra una chiamata e l'altra l'ultimo input e l'ultimo risultato. Se l'input è lo stesso riferimento (`===`), si restituisce il risultato salvato: è ciò che permette a useSelector di non ri-renderizzare il componente. Il flag `hasResult` serve per la prima chiamata: senza di esso, un primo input `undefined` sarebbe uguale al valore iniziale di `lastInput` e `resultFn` non verrebbe mai eseguita.",
      },
      {
        type: "multiple-choice",
        title: "Re-render con selettori che creano nuovi oggetti",
        description: "Quale di questi selettori causa re-render non necessari?",
        difficulty: "difficile",
        options: [
          "`useSelector((state) => state.preferences.theme)`",
          "`useSelector((state) => state.cart)`",
          "`useSelector((state) => ({ ...state.preferences, extra: true }))`",
          "`useSelector((state) => state.cart.items.length)`",
        ],
        correct: 2,
        explanation:
          "Il selettore con lo spread crea un NUOVO oggetto a ogni esecuzione. Poiché useSelector confronta i risultati con ===, un nuovo oggetto è sempre diverso dal precedente e il componente si ri-renderizza a ogni action. Gli altri selettori restituiscono riferimenti già presenti nello stato o valori primitivi.",
      },
      {
        type: "multiple-choice",
        title: "Cosa stampa lo spread annidato?",
        description:
          "Cosa stampa questo codice?\n\nconst defaults = { theme: \"chiaro\", notifications: { email: true, push: false } };\nconst custom = { notifications: { push: true } };\nconst merged = { ...defaults, ...custom };\nconsole.log(merged.notifications);",
        difficulty: "medio",
        options: [
          "`{ email: true, push: true }`",
          "`{ push: true }`",
          "`{ email: true, push: false }`",
          "Un errore, perché `custom` non ha la proprietà `theme`",
        ],
        correct: 1,
        explanation:
          "Lo spread copia solo il primo livello: `...custom` sostituisce l'INTERO oggetto `notifications` dei default con `{ push: true }`, quindi `email` va perso. Per ottenere `{ email: true, push: true }` serve uno spread annidato: `notifications: { ...defaults.notifications, ...custom.notifications }`. Le proprietà mancanti in custom (come theme) non causano errori: restano semplicemente quelle dei default.",
      },
      {
        type: "multiple-choice",
        title: "Dove mettere il totale del carrello",
        description:
          "Il carrello contiene gli item `{ name, price, quantity }`. Qual è l'approccio migliore per mostrare il totale in più componenti?",
        difficulty: "facile",
        options: [
          "Salvare `total` nello stato e ricordarsi di aggiornarlo a mano in ogni componente che modifica il carrello",
          "Ricalcolare il totale con un ciclo dentro ogni componente che lo mostra",
          "Scrivere un selettore `selectCartTotal(state)` accanto alla slice e usarlo con useSelector dove serve",
          "Salvare il totale in una variabile globale fuori da Redux",
        ],
        correct: 2,
        explanation:
          "Il totale è un valore *derivato*: si ricava dagli item. Un selettore riutilizzabile lo calcola in un solo posto e non può andare fuori sincrono. Aggiornarlo a mano in ogni componente è fragile (basta dimenticarsene una volta), duplicare il calcolo nei componenti sparge la stessa logica ovunque, e una variabile globale fuori da Redux non fa ri-renderizzare i componenti quando cambia.",
      },
    ],
  },
};
