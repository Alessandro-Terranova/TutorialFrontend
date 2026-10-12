export const lessons = {
  "store-slices": {
    sections: [
      {
        type: "text",
        content:
          "Redux e una libreria per la gestione dello stato globale dell'applicazione. Invece di passare dati tra decine di componenti tramite props, Redux crea un unico store centralizzato a cui qualsiasi componente puo accedere direttamente.",
      },
      {
        type: "heading",
        content: "Perche Redux?",
      },
      {
        type: "text",
        content:
          "Immagina un'app con filtri nella sidebar, dati nel grafico centrale e contatori nella barra superiore. Tutti questi componenti devono leggere e modificare gli stessi dati. Senza Redux, dovresti sollevare lo stato al componente più alto e passarlo giu come props. Redux elimina questo problema creando un unico punto di verita accessibile ovunque.",
      },
      {
        type: "heading",
        content: "Redux Toolkit (RTK) vs Redux classico",
      },
      {
        type: "text",
        content:
          "Redux Toolkit e il modo moderno e ufficiale di usare Redux. Il Redux classico richiedeva molto codice boilerplate: action types come stringhe, action creators separati, reducer con grandi switch-case, e immutabilita manuale dello stato. RTK semplifica tutto questo drasticamente.",
      },
      {
        type: "list",
        items: [
          "configureStore: crea lo store con configurazione automatica di middleware e dev tools.",
          "createSlice: genera automaticamente actions e reducer da un singolo oggetto.",
          "Immer integrato: puoi scrivere codice che sembra mutare lo stato, ma sotto il cofano produce aggiornamenti immutabili.",
          "Meno boilerplate: niente più action types, action creators manuali o switch-case.",
        ],
      },
      {
        type: "heading",
        content: "configureStore: creare lo Store",
      },
      {
        type: "text",
        content:
          "Lo store e il contenitore centrale di tutto lo stato dell'applicazione. Si crea con configureStore passando un oggetto con i reducer. Ogni chiave dell'oggetto reducer diventa una sezione (slice) dello stato globale.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Store di un'applicazione reale",
        code: `import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./reducers/navigationReducer";
import dataReducer from "./reducers/dataReducer";
import chartConfigReducer from "./reducers/editModeReducer";
import filtersReducer from "./reducers/filtersSlice";
import filterCombinationReducer from "./reducers/filterCombinationReducer";

const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    data: dataReducer,
    chartConfig: chartConfigReducer,
    filters: filtersReducer,
    filterCombination: filterCombinationReducer,
  },
});

export default store;

// Lo stato risultante ha questa forma:
// {
//   navigation: { selectedSite, selectedAnalysisType, selectedPage, ... },
//   data: { ... },
//   chartConfig: { charts: { ... } },
//   filters: { "100/category_analysis": { values, options, range }, ... },
//   filterCombination: { ... },
// }`,
      },
      {
        type: "heading",
        content: "createSlice: definire una porzione di stato",
      },
      {
        type: "text",
        content:
          "createSlice e il cuore di Redux Toolkit. Riceve un nome, uno stato iniziale e un oggetto di reducer, e genera automaticamente le action e gli action creators corrispondenti.",
      },
      {
        type: "code",
        language: "javascript",
        title: "createSlice - navigazione del progetto",
        code: `import { createSlice } from "@reduxjs/toolkit";

const navigationSlice = createSlice({
  name: "navigation",           // Nome univoco della slice
  initialState: {               // Stato iniziale
    selectedSite: "Sesto",
    selectedAnalysisType: "100",
    selectedPage: "category_analysis",
    selectedView: "grafico",
    selectedGroupBy: "individual",
  },
  reducers: {                   // Funzioni che modificano lo stato
    setSelectedSite(state, action) {
      state.selectedSite = action.payload;
    },
    setSelectedAnalysisType(state, action) {
      state.selectedAnalysisType = action.payload;
      // Quando cambia il tipo di analisi, resetta la pagina
      state.selectedPage = "category_analysis";
      state.selectedView = "grafico";
    },
    setSelectedPage(state, action) {
      state.selectedPage = action.payload;
    },
  },
});

// Le action vengono generate AUTOMATICAMENTE
export const {
  setSelectedSite,
  setSelectedAnalysisType,
  setSelectedPage,
} = navigationSlice.actions;

// Il reducer viene esportato per lo store
export default navigationSlice.reducer;`,
      },
      {
        type: "heading",
        content: "Immer: aggiornamenti immutabili con sintassi mutabile",
      },
      {
        type: "text",
        content:
          "In Redux classico, non puoi mai modificare lo stato direttamente: devi sempre restituire un nuovo oggetto. Redux Toolkit usa la libreria Immer sotto il cofano, permettendoti di scrivere codice che sembra mutare lo stato ma in realta produce una copia immutabile.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Immer rende il codice molto più leggibile",
        code: `// REDUX CLASSICO (senza Immer) - verboso e fragile
function filtersReducer(state, action) {
  return {
    ...state,
    [action.payload.key]: {
      ...state[action.payload.key],
      values: {
        ...state[action.payload.key].values,
        [action.payload.filter]: action.payload.value,
      },
    },
  };
}

// REDUX TOOLKIT (con Immer) - semplice e diretto
const filtersSlice = createSlice({
  name: "filters",
  initialState: {},
  reducers: {
    setFilterValue(state, action) {
      const { key, filter, value } = action.payload;
      // Sembra una mutazione, ma Immer la converte
      // automaticamente in un aggiornamento immutabile!
      if (!state[key]) state[key] = { values: {}, options: {}, range: "1y" };
      state[key].values[filter] = value;
    },
  },
});`,
      },
      {
        type: "warning",
        content:
          "Attenzione: la \"mutazione\" funziona solo dentro i reducer di createSlice. Fuori dai reducer (ad esempio nei componenti), non devi MAI modificare lo stato Redux direttamente.",
      },
      {
        type: "subheading",
        content: "più slices per un'app organizzata",
      },
      {
        type: "text",
        content:
          "Ogni slice gestisce una responsabilita specifica. Dividere lo stato in slices rende il codice modulare, testabile e facile da comprendere. Ogni sviluppatore puo lavorare sulla propria slice senza conflitti.",
      },
      {
        type: "list",
        items: [
          "navigation: sito selezionato, tipo di analisi, pagina corrente, vista e raggruppamento.",
          "data: dati grezzi caricati dal backend.",
          "chartConfig: configurazione visuale dei grafici (colori, stili, assi) personalizzata dall'utente.",
          "filters: valori dei filtri selezionati e opzioni disponibili per ogni pagina.",
          "filterCombination: combinazioni valide di filtri e logica di narrowing.",
        ],
      },
      {
        type: "tip",
        content:
          "In un'applicazione enterprise, lo store ha 5 slices: navigation, data, chartConfig, filters, filterCombination. Ogni slice gestisce un aspetto specifico dello stato.",
      },
    ],
    exercises: [
      {
        type: "code",
        title: "Crea una slice per un carrello",
        description:
          "Simula la struttura di una slice Redux per un carrello della spesa.\n\nCrea un oggetto carrelloSlice con:\n- name: \"carrello\"\n- initialState: un oggetto con prodotti (array vuoto) e totale (0)\n- reducers: un oggetto con aggiungiProdotto e rimuoviProdotto\n\nLe funzioni reducer ricevono (state, action) e modificano state direttamente (come con Immer).",
        difficulty: "medio",
        starterCode: `// Simula createSlice (senza Redux)
function createSlice({ name, initialState, reducers }) {
  const state = JSON.parse(JSON.stringify(initialState));
  const actions = {};

  for (const [key, reducerFn] of Object.entries(reducers)) {
    actions[key] = (payload) => reducerFn(state, { payload });
  }

  return { name, state, actions };
}

// Crea la slice del carrello
const carrelloSlice = createSlice({
  name: "carrello",
  initialState: {
    // definisci lo stato iniziale
  },
  reducers: {
    // aggiungiProdotto: aggiunge un prodotto all'array e aggiorna il totale
    // rimuoviProdotto: rimuove per nome e aggiorna il totale
  },
});

// Test
const { aggiungiProdotto, rimuoviProdotto } = carrelloSlice.actions;
aggiungiProdotto({ nome: "Mela", prezzo: 1.5 });
aggiungiProdotto({ nome: "Pane", prezzo: 2.0 });
console.log(carrelloSlice.state.prodotti.length); // 2
console.log(carrelloSlice.state.totale);          // 3.5
rimuoviProdotto({ nome: "Mela" });
console.log(carrelloSlice.state.prodotti.length); // 1
console.log(carrelloSlice.state.totale);          // 2.0`,
        solution: `function createSlice({ name, initialState, reducers }) {
  const state = JSON.parse(JSON.stringify(initialState));
  const actions = {};

  for (const [key, reducerFn] of Object.entries(reducers)) {
    actions[key] = (payload) => reducerFn(state, { payload });
  }

  return { name, state, actions };
}

const carrelloSlice = createSlice({
  name: "carrello",
  initialState: {
    prodotti: [],
    totale: 0,
  },
  reducers: {
    aggiungiProdotto(state, action) {
      state.prodotti.push(action.payload);
      state.totale += action.payload.prezzo;
    },
    rimuoviProdotto(state, action) {
      const indice = state.prodotti.findIndex(
        (p) => p.nome === action.payload.nome
      );
      if (indice !== -1) {
        state.totale -= state.prodotti[indice].prezzo;
        state.prodotti.splice(indice, 1);
      }
    },
  },
});

const { aggiungiProdotto, rimuoviProdotto } = carrelloSlice.actions;
aggiungiProdotto({ nome: "Mela", prezzo: 1.5 });
aggiungiProdotto({ nome: "Pane", prezzo: 2.0 });
console.log(carrelloSlice.state.prodotti.length); // 2
console.log(carrelloSlice.state.totale);          // 3.5
rimuoviProdotto({ nome: "Mela" });
console.log(carrelloSlice.state.prodotti.length); // 1
console.log(carrelloSlice.state.totale);          // 2.0`,
        validate: `try {
  return carrelloSlice.state.prodotti.length === 1 && carrelloSlice.state.totale === 2;
} catch(e) { return false; }`,
        testCode: "",
      },
      {
        type: "multiple-choice",
        title: "Ruolo di createSlice",
        description: "Cosa genera automaticamente createSlice di Redux Toolkit?",
        difficulty: "facile",
        options: [
          "Solo il reducer, le action vanno create manualmente",
          "Reducer, action types e action creators a partire dall'oggetto reducers",
          "Solo le action, il reducer va scritto separatamente",
          "Un componente React con lo stato predefinito",
        ],
        correct: 1,
        explanation:
          "createSlice riceve name, initialState e reducers, e genera automaticamente il reducer (funzione che gestisce lo stato), gli action types (stringhe come 'navigation/setSelectedSite') e gli action creators (funzioni che creano gli oggetti action). Tutto da un unico punto di configurazione.",
      },
      {
        type: "multiple-choice",
        title: "Immer e immutabilita",
        description:
          "Perche in un reducer di createSlice possiamo scrivere state.selectedSite = action.payload?",
        difficulty: "medio",
        options: [
          "Perche Redux non richiede immutabilita dello stato",
          "Perche Immer, integrato in RTK, intercetta la mutazione e crea automaticamente una copia immutabile",
          "Perche JavaScript permette sempre di modificare oggetti",
          "Perche createSlice clona lo stato prima di ogni reducer",
        ],
        correct: 1,
        explanation:
          "Redux Toolkit integra la libreria Immer che usa un proxy JavaScript per intercettare le modifiche. Quando scrivi state.selectedSite = 'valore', Immer registra la modifica e produce un nuovo oggetto stato immutabile. Questo avviene solo nei reducer di createSlice.",
      },
    ],
  },

  "use-redux": {
    sections: [
      {
        type: "text",
        content:
          "Ora che sappiamo come creare lo store e le slices, vediamo come i componenti React leggono e modificano lo stato Redux. I due hook fondamentali sono useSelector (per leggere) e useDispatch (per scrivere).",
      },
      {
        type: "heading",
        content: "Il Provider: collegare Redux a React",
      },
      {
        type: "text",
        content:
          "Prima di poter usare Redux nei componenti, dobbiamo avvolgere l'applicazione con il componente Provider di react-redux. Questo rende lo store accessibile a tutti i componenti dell'albero.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Setup del Provider",
        code: `import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      {/* Tutti i componenti qui dentro possono
          usare useSelector e useDispatch */}
      <Layout>
        <Sidebar />
        <MainContent />
      </Layout>
    </Provider>
  );
}`,
      },
      {
        type: "heading",
        content: "useSelector: leggere lo stato",
      },
      {
        type: "text",
        content:
          "useSelector riceve una funzione selettore che estrae la porzione di stato necessaria. Il componente si ri-renderizza SOLO quando il valore estratto cambia, non quando cambiano altre parti dello stato.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Leggere lo stato con useSelector",
        code: `import { useSelector } from "react-redux";

function NavigationInfo() {
  // Legge un singolo valore dallo stato
  const siteScelto = useSelector((state) => state.navigation.selectedSite);

  // Legge più valori con destructuring
  const { selectedAnalysisType, selectedPage } = useSelector(
    (state) => state.navigation
  );

  // Legge da una slice diversa
  const filtri = useSelector((state) => state.filters);

  return (
    <div>
      <p>Sito: {siteScelto}</p>
      <p>Analisi: {selectedAnalysisType}</p>
      <p>Pagina: {selectedPage}</p>
    </div>
  );
}`,
      },
      {
        type: "info",
        content:
          "useSelector esegue un confronto referenziale (===) sul risultato. Se restituisci un nuovo oggetto ogni volta (ad esempio con .filter() o .map()), il componente si ri-renderizza sempre. Per calcoli derivati, usa un selettore memoizzato o useMemo.",
      },
      {
        type: "heading",
        content: "useDispatch: modificare lo stato",
      },
      {
        type: "text",
        content:
          "useDispatch restituisce la funzione dispatch dello store. La usi per inviare action che attivano i reducer e aggiornano lo stato.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Dispatch da event handler",
        code: `import { useSelector, useDispatch } from "react-redux";
import { setSelectedSite, setSelectedPage } from "../redux/reducers/navigationReducer";

function SiteSelector() {
  const dispatch = useDispatch();
  const siteScelto = useSelector((state) => state.navigation.selectedSite);

  const handleCambiaSito = (nuovoSito) => {
    // Dispatch dell'action: aggiorna lo stato globale
    dispatch(setSelectedSite(nuovoSito));
  };

  return (
    <select
      value={siteScelto}
      onChange={(e) => handleCambiaSito(e.target.value)}
    >
      <option value="Sesto">Sesto Fiorentino</option>
      <option value="Firenze">Firenze</option>
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
          "Spesso i dispatch avvengono dentro useEffect, ad esempio dopo il caricamento di dati o quando un valore cambia. Questo e un pattern molto comune per sincronizzare lo stato Redux con eventi asincroni.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Dispatch da useEffect",
        code: `import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilterRange } from "../redux/reducers/filtersSlice";

function Filters() {
  const dispatch = useDispatch();
  const { selectedAnalysisType, selectedPage } = useSelector(
    (state) => state.navigation
  );

  // Quando cambia la pagina selezionata, resetta i filtri
  useEffect(() => {
    const key = \`\${selectedAnalysisType}/\${selectedPage}\`;
    dispatch(setFilterRange({ key, range: "1y" }));
  }, [selectedAnalysisType, selectedPage, dispatch]);

  return <div>{/* UI dei filtri */}</div>;
}`,
      },
      {
        type: "subheading",
        content: "Pattern: passare action creators come props",
      },
      {
        type: "text",
        content:
          "Un pattern utile e che un componente padre faccia il dispatch e passi solo la callback ai figli. Questo mantiene i componenti figli semplici e disaccoppiati da Redux.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Action creators come props",
        code: `import { useDispatch, useSelector } from "react-redux";
import { setFilterValue } from "../redux/reducers/filtersSlice";

function FiltersContainer() {
  const dispatch = useDispatch();
  const filtri = useSelector((state) => state.filters);

  // Il padre gestisce il dispatch
  const handleFilterChange = (key, filter, value) => {
    dispatch(setFilterValue({ key, filter, value }));
  };

  return (
    <div>
      {/* Il figlio riceve una semplice callback */}
      <FilterDropdown
        options={filtri.options}
        onChange={(value) => handleFilterChange("100/cat", "site", value)}
      />
    </div>
  );
}

// Il figlio non sa nulla di Redux
function FilterDropdown({ options, onChange }) {
  return (
    <select onChange={(e) => onChange(e.target.value)}>
      {options?.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}`,
      },
      {
        type: "warning",
        content:
          "Ricorda di includere dispatch nell'array delle dipendenze di useEffect. Anche se la funzione dispatch e stabile (non cambia tra i render), ESLint lo richiede per completezza. Il valore stesso e garantito stabile da react-redux.",
      },
      {
        type: "tip",
        content:
          "Nel progetto, quasi ogni componente usa useSelector per leggere lo stato e useDispatch per modificarlo. Ad esempio, il componente Filters legge navigazione e filtri con useSelector, e aggiorna i valori dei filtri con dispatch(setFilterValue(...)).",
      },
    ],
    exercises: [
      {
        type: "code",
        title: "Simula useSelector e useDispatch",
        description:
          "Crea una simulazione semplificata di uno store Redux con le funzioni getState, dispatch e una funzione select che simula useSelector.\n\nIl store ha uno stato con { contatore: 0, nome: 'Utente' }.\nLe action supportate sono 'incrementa' e 'cambiaNome'.",
        difficulty: "medio",
        starterCode: `// Simula uno store Redux
const store = {
  state: { contatore: 0, nome: "Utente" },

  getState() {
    return this.state;
  },

  dispatch(action) {
    // Implementa: gestisci action.type "incrementa" e "cambiaNome"
    // "incrementa" incrementa contatore di 1
    // "cambiaNome" imposta nome a action.payload

  },
};

// Simula useSelector
function select(selectorFn) {
  // Esegui la funzione selettore passandole lo stato

}

// Test
store.dispatch({ type: "incrementa" });
store.dispatch({ type: "incrementa" });
console.log(select((state) => state.contatore)); // 2

store.dispatch({ type: "cambiaNome", payload: "Mario" });
console.log(select((state) => state.nome)); // "Mario"

console.log(select((state) => state.contatore + " - " + state.nome)); // "2 - Mario"`,
        solution: `const store = {
  state: { contatore: 0, nome: "Utente" },

  getState() {
    return this.state;
  },

  dispatch(action) {
    switch (action.type) {
      case "incrementa":
        this.state = { ...this.state, contatore: this.state.contatore + 1 };
        break;
      case "cambiaNome":
        this.state = { ...this.state, nome: action.payload };
        break;
    }
  },
};

function select(selectorFn) {
  return selectorFn(store.getState());
}

store.dispatch({ type: "incrementa" });
store.dispatch({ type: "incrementa" });
console.log(select((state) => state.contatore)); // 2

store.dispatch({ type: "cambiaNome", payload: "Mario" });
console.log(select((state) => state.nome)); // "Mario"

console.log(select((state) => state.contatore + " - " + state.nome)); // "2 - Mario"`,
        validate: `try {
  return select((s) => s.contatore) === 2 && select((s) => s.nome) === "Mario";
} catch(e) { return false; }`,
        testCode: "",
      },
      {
        type: "multiple-choice",
        title: "Quando si ri-renderizza un componente con useSelector?",
        description:
          "Un componente usa useSelector((state) => state.navigation.selectedSite). Quando si ri-renderizza?",
        difficulty: "medio",
        options: [
          "Ogni volta che qualsiasi parte dello stato Redux cambia",
          "Solo quando state.navigation.selectedSite cambia valore",
          "Solo quando viene chiamato dispatch() nel componente stesso",
          "Mai, useSelector non causa re-render",
        ],
        correct: 1,
        explanation:
          "useSelector sottoscrive il componente allo store Redux, ma lo ri-renderizza solo quando il valore restituito dalla funzione selettore cambia (confronto ===). Se cambia una slice diversa o un campo diverso di navigation, il componente non si ri-renderizza.",
      },
      {
        type: "multiple-choice",
        title: "Provider e gerarchia",
        description:
          "Cosa succede se un componente chiama useSelector senza essere figlio di un Provider?",
        difficulty: "facile",
        options: [
          "Restituisce undefined silenziosamente",
          "Restituisce lo stato iniziale dello store",
          "Lancia un errore a runtime",
          "Funziona normalmente perche lo store e globale",
        ],
        correct: 2,
        explanation:
          "Senza un Provider che fornisce lo store nel contesto React, useSelector non sa da dove leggere lo stato e lancia un errore. Il Provider e obbligatorio e deve avvolgere tutti i componenti che usano hook Redux.",
      },
    ],
  },

  selectors: {
    sections: [
      {
        type: "text",
        content:
          "I selettori sono funzioni che estraggono e trasformano dati dallo stato Redux. Vanno da semplici letture di un campo a calcoli complessi che derivano nuovi valori combinando diverse parti dello stato.",
      },
      {
        type: "heading",
        content: "Selettori semplici",
      },
      {
        type: "text",
        content:
          "Il selettore più semplice e una arrow function che accede a un campo dello stato. Questi selettori sono usati direttamente con useSelector nei componenti.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Selettori semplici",
        code: `import { useSelector } from "react-redux";

// Selettore inline: legge un singolo campo
const sito = useSelector((state) => state.navigation.selectedSite);

// Selettore inline: legge un oggetto intero
const navigazione = useSelector((state) => state.navigation);

// Selettore inline: legge un valore annidato
const filtriPagina = useSelector(
  (state) => state.filters["100/category_analysis"]
);

// Selettore inline: legge un booleano derivato
const haFiltriAttivi = useSelector(
  (state) => Object.keys(state.filters).length > 0
);`,
      },
      {
        type: "heading",
        content: "Selettori derivati (computed)",
      },
      {
        type: "text",
        content:
          "Spesso serve calcolare nuovi valori a partire dallo stato. Questi selettori derivati possono combinare dati da diverse slices, applicare trasformazioni o calcolare aggregazioni.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Selettori che calcolano valori derivati",
        code: `import { useSelector } from "react-redux";

function Statistiche() {
  // Selettore derivato: combina navigazione e filtri
  const filtriCorrente = useSelector((state) => {
    const { selectedAnalysisType, selectedPage } = state.navigation;
    const key = \`\${selectedAnalysisType}/\${selectedPage}\`;
    return state.filters[key] || { values: {}, options: {}, range: "1y" };
  });

  // Selettore derivato: conta i filtri attivi
  const numerofiltriAttivi = useSelector((state) => {
    const { selectedAnalysisType, selectedPage } = state.navigation;
    const key = \`\${selectedAnalysisType}/\${selectedPage}\`;
    const values = state.filters[key]?.values || {};
    return Object.values(values).filter((v) =>
      Array.isArray(v) ? v.length > 0 : v !== null && v !== ""
    ).length;
  });

  return (
    <div>
      <p>Range: {filtriCorrente.range}</p>
      <p>Filtri attivi: {numerofiltriAttivi}</p>
    </div>
  );
}`,
      },
      {
        type: "heading",
        content: "Selettori custom come funzioni esportate",
      },
      {
        type: "text",
        content:
          "Per selettori complessi o riutilizzabili, la best practice e definirli come funzioni esportate nel file della slice o in un file dedicato. Questo centralizza la logica di accesso allo stato e la rende testabile.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Selettore custom: selectChartConfig dal progetto",
        code: `import { defaultChartStyles } from "./defaultChartStyles";

// Funzione helper per navigare oggetti annidati
const getNestedProperty = (obj, pathKeys) => {
  return pathKeys.reduce((acc, key) => acc?.[key], obj);
};

// Selettore custom che mergia configurazioni default con personalizzazioni
export const selectChartConfig = (
  state,
  chartName,
  analysisType,
  page,
  groupBy
) => {
  // Determina il percorso nello stato
  const targetAnalysisType =
    analysisType ?? state.navigation.selectedAnalysisType;
  const targetPage = page ?? state.navigation.selectedPage;
  const targetGroupBy = groupBy ?? state.navigation.selectedGroupBy;

  // Naviga nella struttura annidata
  const path = [targetAnalysisType, targetPage, targetGroupBy, chartName];
  const custom =
    getNestedProperty(state.chartConfig.charts, path) || {};

  // Mergia default + personalizzazioni con spread annidato
  return {
    ...defaultChartStyles,
    ...custom,
    styles: {
      ...defaultChartStyles.styles,
      ...(custom.styles || {}),
    },
    customUcl: {
      ...defaultChartStyles.customUcl,
      ...(custom.customUcl || {}),
    },
    visibleFields:
      custom.visibleFields ?? defaultChartStyles.visibleFields,
    yAxisMax: custom.yAxisMax ?? defaultChartStyles.yAxisMax,
  };
};`,
      },
      {
        type: "info",
        content:
          "Nota il pattern di merge: prima lo spread dei default, poi lo spread delle personalizzazioni. Per le proprieta annidate come styles, il merge va fatto esplicitamente livello per livello perche lo spread e superficiale (shallow).",
      },
      {
        type: "heading",
        content: "Il pattern di merge: defaults + overrides",
      },
      {
        type: "text",
        content:
          "Un pattern ricorrente nei selettori e il merge tra valori default e personalizzazioni dell'utente. Questo permette di avere una configurazione completa anche quando l'utente ha modificato solo alcuni campi.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Spread annidato per merge profondo",
        code: `const defaultChartStyles = {
  yValueKey: "parameter_val",
  yAxisMax: null,
  styles: {
    color: "#1976d2",
    lineWidth: 2,
    showPoints: true,
  },
  visibleFields: ["parameter_val", "ucl_val"],
};

// L'utente ha personalizzato solo il colore e l'asse Y
const customConfig = {
  yAxisMax: 100,
  styles: {
    color: "#e91e63",
  },
};

// Merge: i default vengono preservati dove mancano personalizzazioni
const configFinale = {
  ...defaultChartStyles,         // yValueKey, visibleFields (default)
  ...customConfig,                // yAxisMax: 100 (override)
  styles: {
    ...defaultChartStyles.styles, // lineWidth: 2, showPoints: true
    ...(customConfig.styles || {}), // color: "#e91e63" (override)
  },
};

// Risultato:
// {
//   yValueKey: "parameter_val",
//   yAxisMax: 100,              <-- personalizzato
//   styles: {
//     color: "#e91e63",         <-- personalizzato
//     lineWidth: 2,             <-- default preservato
//     showPoints: true,         <-- default preservato
//   },
//   visibleFields: ["parameter_val", "ucl_val"],
// }`,
      },
      {
        type: "subheading",
        content: "Usare i selettori custom nei componenti",
      },
      {
        type: "code",
        language: "javascript",
        title: "Uso di selectChartConfig nel componente Chart",
        code: `import { useSelector } from "react-redux";
import { selectChartConfig } from "../redux/reducers/editModeReducer";

function Chart({ chartName }) {
  const { selectedAnalysisType, selectedPage, selectedGroupBy } =
    useSelector((state) => state.navigation);

  // Usa il selettore custom passando lo stato completo
  const config = useSelector((state) =>
    selectChartConfig(
      state,
      chartName,
      selectedAnalysisType,
      selectedPage,
      selectedGroupBy
    )
  );

  return (
    <div>
      <LineChart
        color={config.styles.color}
        lineWidth={config.styles.lineWidth}
        yMax={config.yAxisMax}
      />
    </div>
  );
}`,
      },
      {
        type: "warning",
        content:
          "Attenzione: se il selettore crea un nuovo oggetto ogni volta (con spread o .filter()), useSelector causera un re-render ad ogni dispatch, perche il confronto === fallisce sempre su nuovi oggetti. Per evitarlo, usa useMemo nel componente oppure la funzione createSelector di Redux Toolkit per memoizzare il selettore.",
      },
      {
        type: "tip",
        content:
          "Nel progetto, selectChartConfig e un selettore custom che mergia configurazioni default con quelle personalizzate dall'utente usando spread: { ...defaultChartStyles, ...custom, styles: { ...defaultChartStyles.styles, ...(custom.styles || {}) } }.",
      },
    ],
    exercises: [
      {
        type: "code",
        title: "Scrivi selettori per uno stato Redux",
        description:
          "Dato lo stato Redux simulato qui sotto, scrivi tre funzioni selettore:\n\n1. selectSitoCorrente: restituisce il sito selezionato\n2. selectFiltriPagina: restituisce i filtri della pagina corrente (combinando analysisType e page)\n3. selectNumeroFiltriAttivi: restituisce quanti filtri hanno un valore non vuoto",
        difficulty: "medio",
        starterCode: `const statoRedux = {
  navigation: {
    selectedSite: "Sesto",
    selectedAnalysisType: "100",
    selectedPage: "category_analysis",
  },
  filters: {
    "100/category_analysis": {
      values: { site: "Sesto", product: "", category: "A" },
      range: "1y",
    },
    "200/phase_analysis": {
      values: { site: "Firenze", product: "ProdX" },
      range: "6m",
    },
  },
};

// 1. Selettore semplice
function selectSitoCorrente(state) {
  // restituisci il sito selezionato
}

// 2. Selettore derivato
function selectFiltriPagina(state) {
  // combina analysisType + page per ottenere la chiave
  // restituisci i filtri per quella chiave
}

// 3. Selettore con calcolo
function selectNumeroFiltriAttivi(state) {
  // usa selectFiltriPagina per ottenere i filtri
  // conta quanti values hanno un valore non vuoto (stringa non vuota)
}

// Test
console.log(selectSitoCorrente(statoRedux));        // "Sesto"
console.log(selectFiltriPagina(statoRedux).range);   // "1y"
console.log(selectNumeroFiltriAttivi(statoRedux));    // 2`,
        solution: `const statoRedux = {
  navigation: {
    selectedSite: "Sesto",
    selectedAnalysisType: "100",
    selectedPage: "category_analysis",
  },
  filters: {
    "100/category_analysis": {
      values: { site: "Sesto", product: "", category: "A" },
      range: "1y",
    },
    "200/phase_analysis": {
      values: { site: "Firenze", product: "ProdX" },
      range: "6m",
    },
  },
};

function selectSitoCorrente(state) {
  return state.navigation.selectedSite;
}

function selectFiltriPagina(state) {
  const { selectedAnalysisType, selectedPage } = state.navigation;
  const key = \`\${selectedAnalysisType}/\${selectedPage}\`;
  return state.filters[key] || { values: {}, range: "" };
}

function selectNumeroFiltriAttivi(state) {
  const filtri = selectFiltriPagina(state);
  return Object.values(filtri.values).filter((v) => v !== "" && v !== null && v !== undefined).length;
}

console.log(selectSitoCorrente(statoRedux));        // "Sesto"
console.log(selectFiltriPagina(statoRedux).range);   // "1y"
console.log(selectNumeroFiltriAttivi(statoRedux));    // 2`,
        validate: `try {
  return selectSitoCorrente(statoRedux) === "Sesto" &&
    selectFiltriPagina(statoRedux).range === "1y" &&
    selectNumeroFiltriAttivi(statoRedux) === 2;
} catch(e) { return false; }`,
        testCode: "",
      },
      {
        type: "code",
        title: "Merge di configurazioni con spread",
        description:
          "Implementa una funzione mergeConfig che combina valori default con personalizzazioni dell'utente, gestendo correttamente le proprieta annidate.\n\nLa funzione deve:\n- Usare lo spread per unire i due oggetti\n- Per la proprieta 'styles' fare un merge annidato (non sovrascrivere tutto)\n- Usare il nullish coalescing (??) per visibleFields",
        difficulty: "difficile",
        starterCode: `const defaults = {
  yValueKey: "parameter_val",
  yAxisMax: null,
  styles: { color: "#1976d2", lineWidth: 2, showPoints: true },
  visibleFields: ["parameter_val", "ucl_val"],
};

function mergeConfig(defaultConfig, customConfig) {
  // Implementa il merge profondo
  // 1. Spread dei default + custom per le proprieta di primo livello
  // 2. Spread annidato per styles
  // 3. Nullish coalescing per visibleFields

}

// Test
const custom1 = { yAxisMax: 100, styles: { color: "#e91e63" } };
const result1 = mergeConfig(defaults, custom1);
console.log(result1.yAxisMax);            // 100
console.log(result1.styles.color);        // "#e91e63"
console.log(result1.styles.lineWidth);    // 2 (preservato dal default)
console.log(result1.styles.showPoints);   // true (preservato dal default)
console.log(result1.visibleFields.length); // 2

const custom2 = { visibleFields: ["parameter_val"] };
const result2 = mergeConfig(defaults, custom2);
console.log(result2.visibleFields.length); // 1
console.log(result2.styles.color);         // "#1976d2" (default)`,
        solution: `const defaults = {
  yValueKey: "parameter_val",
  yAxisMax: null,
  styles: { color: "#1976d2", lineWidth: 2, showPoints: true },
  visibleFields: ["parameter_val", "ucl_val"],
};

function mergeConfig(defaultConfig, customConfig) {
  return {
    ...defaultConfig,
    ...customConfig,
    styles: {
      ...defaultConfig.styles,
      ...(customConfig.styles || {}),
    },
    visibleFields: customConfig.visibleFields ?? defaultConfig.visibleFields,
  };
}

const custom1 = { yAxisMax: 100, styles: { color: "#e91e63" } };
const result1 = mergeConfig(defaults, custom1);
console.log(result1.yAxisMax);            // 100
console.log(result1.styles.color);        // "#e91e63"
console.log(result1.styles.lineWidth);    // 2
console.log(result1.styles.showPoints);   // true
console.log(result1.visibleFields.length); // 2

const custom2 = { visibleFields: ["parameter_val"] };
const result2 = mergeConfig(defaults, custom2);
console.log(result2.visibleFields.length); // 1
console.log(result2.styles.color);         // "#1976d2"`,
        validate: `try {
  const t1 = mergeConfig(defaults, { yAxisMax: 100, styles: { color: "#e91e63" } });
  const t2 = mergeConfig(defaults, { visibleFields: ["parameter_val"] });
  return t1.styles.lineWidth === 2 && t1.styles.color === "#e91e63" && t1.yAxisMax === 100 &&
    t2.visibleFields.length === 1 && t2.styles.color === "#1976d2";
} catch(e) { return false; }`,
        testCode: "",
      },
      {
        type: "multiple-choice",
        title: "Re-render con selettori che creano nuovi oggetti",
        description:
          "Quale di questi selettori causera re-render non necessari?",
        difficulty: "difficile",
        options: [
          "`useSelector((state) => state.navigation.selectedSite)`",
          "`useSelector((state) => state.filters)`",
          "`useSelector((state) => ({ ...state.navigation, extra: 'valore' }))`",
          "`useSelector((state) => state.data.items.length)`",
        ],
        correct: 2,
        explanation:
          "Il selettore con spread ({ ...state.navigation, extra: 'valore' }) crea un NUOVO oggetto ad ogni esecuzione. Poiche useSelector confronta i risultati con ===, un nuovo oggetto e sempre diverso dal precedente, causando un re-render ad ogni dispatch. Gli altri selettori restituiscono riferimenti stabili o valori primitivi.",
      },
    ],
  },
};
