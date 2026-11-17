export const lessons = {
  "useref-usememo": {
    sections: [
      {
        type: "text",
        content:
          "In questa lezione esploreremo due hook avanzati di React: useRef e useMemo. Entrambi gestiscono valori che devono persistere tra un render e l'altro, ma funzionano in modi molto diversi: useRef conserva un valore senza causare re-render, useMemo evita di ripetere calcoli costosi.",
      },
      {
        type: "heading",
        content: "useRef: un contenitore mutabile e persistente",
      },
      {
        type: "text",
        content:
          "useRef restituisce un oggetto con una proprietà `.current` che persiste per tutta la vita del componente. A differenza di useState, modificare `.current` NON causa un re-render. Questo lo rende perfetto per conservare valori che cambiano ma che non devono influenzare ciò che viene mostrato.",
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
          "L'uso più comune di useRef è ottenere un riferimento diretto a un elemento del DOM, cioè all'oggetto JavaScript che rappresenta un elemento HTML nella pagina. Si passa il ref all'attributo `ref` di un elemento JSX e React lo riempie automaticamente con il nodo DOM corrispondente. Da lì si possono usare i metodi del nodo, ad esempio `focus()` per posizionare il cursore in un campo di testo.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Dare il focus a un campo di ricerca",
        code: `import { useRef } from "react";

function CercaLibro() {
  const inputRef = useRef(null);

  const attivaRicerca = () => {
    // inputRef.current è il nodo <input> della pagina
    if (inputRef.current) {
      inputRef.current.focus(); // sposta il cursore nel campo
    }
  };

  return (
    <div>
      <input ref={inputRef} placeholder="Titolo del libro..." />
      <button onClick={attivaRicerca}>Cerca un libro</button>
    </div>
  );
}`,
      },
      {
        type: "subheading",
        content: "useRef per valori mutabili (timer e flag)",
      },
      {
        type: "text",
        content:
          "useRef è utile anche per conservare valori \"di servizio\" che non vanno mostrati, come l'identificativo di un timer o un flag. Nell'esempio usiamo `setInterval(funzione, millisecondi)`, che funziona come setTimeout ma ripete la funzione a intervalli regolari finché non viene fermato con `clearInterval(id)`. L'id del timer va conservato tra un render e l'altro, ma non serve mostrarlo: è il lavoro ideale per un ref.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Un cronometro con useRef",
        code: `import { useRef, useState } from "react";

function Cronometro() {
  const [secondi, setSecondi] = useState(0);
  const intervalRef = useRef(null); // id del timer: non serve mostrarlo

  const avvia = () => {
    if (intervalRef.current !== null) return; // già in corso: non avviarne un altro
    intervalRef.current = setInterval(() => {
      setSecondi((s) => s + 1);
    }, 1000);
  };

  const ferma = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  return (
    <div>
      <p>Secondi: {secondi}</p>
      <button onClick={avvia}>Avvia</button>
      <button onClick={ferma}>Ferma</button>
    </div>
  );
}`,
      },
      {
        type: "info",
        content:
          "useRef è come una scatola in cui puoi mettere qualsiasi valore. La differenza fondamentale con useState: cambiare `.current` non avvisa React, quindi non avviene nessun re-render. Se un valore deve comparire sullo schermo, usa useState; se serve solo \"dietro le quinte\", useRef.",
      },
      {
        type: "heading",
        content: "useMemo: memorizzare calcoli costosi",
      },
      {
        type: "text",
        content:
          "useMemo memorizza il risultato di una funzione e lo ricalcola solo quando le sue dipendenze cambiano. Riceve due argomenti, come useEffect: una funzione che restituisce il valore e un array di dipendenze. È utile per evitare calcoli pesanti a ogni render.",
      },
      {
        type: "code",
        language: "javascript",
        title: "useMemo per filtrare e ordinare dei prodotti",
        code: `import { useMemo, useState } from "react";

function ListaProdotti({ prodotti }) {
  const [filtro, setFiltro] = useState("");
  const [tema, setTema] = useState("chiaro");

  // Senza useMemo: questo calcolo avverrebbe a OGNI render
  // (anche quando cambia solo il tema!)
  // Con useMemo: avviene solo quando prodotti o filtro cambiano
  const prodottiFiltrati = useMemo(() => {
    console.log("Ricalcolo prodotti filtrati...");
    const risultato = prodotti.filter((p) =>
      p.nome.toLowerCase().includes(filtro.toLowerCase())
    );
    // sort modifica l'array: ordiniamo una copia
    return [...risultato].sort((a, b) => a.prezzo - b.prezzo);
  }, [prodotti, filtro]);

  return (
    <div className={tema}>
      <button onClick={() => setTema(tema === "chiaro" ? "scuro" : "chiaro")}>
        Cambia tema
      </button>
      <input
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        placeholder="Filtra..."
      />
      <ul>
        {prodottiFiltrati.map((p) => (
          <li key={p.id}>{p.nome} - {p.prezzo} €</li>
        ))}
      </ul>
    </div>
  );
}`,
      },
      {
        type: "text",
        content:
          "Un valore memorizzato con useMemo può essere a sua volta la dipendenza di un altro useMemo: in questo modo ogni calcolo viene rifatto solo quando cambia davvero ciò da cui dipende.",
      },
      {
        type: "code",
        language: "javascript",
        title: "useMemo concatenati: voti degli studenti",
        code: `function RiepilogoClasse({ studenti, votoMinimo }) {
  // Si ricalcola solo quando cambiano gli studenti
  const media = useMemo(() => {
    if (studenti.length === 0) return 0;
    const somma = studenti.reduce((tot, s) => tot + s.voto, 0);
    return somma / studenti.length;
  }, [studenti]);

  // Si ricalcola quando cambiano gli studenti o il voto minimo
  const promossi = useMemo(() => {
    return studenti.filter((s) => s.voto >= votoMinimo);
  }, [studenti, votoMinimo]);

  return (
    <div>
      <p>Media della classe: {media}</p>
      <p>Promossi: {promossi.length} su {studenti.length}</p>
    </div>
  );
}`,
      },
      {
        type: "subheading",
        content: "useCallback: memorizzare una funzione",
      },
      {
        type: "text",
        content:
          "A ogni render, le funzioni definite dentro un componente vengono ricreate: sono funzioni nuove, anche se il codice è identico. Di solito non è un problema, ma lo diventa quando la funzione è nell'array di dipendenze di un useEffect: l'effetto ripartirebbe a ogni render. `useCallback(funzione, dipendenze)` restituisce sempre la STESSA funzione finché le dipendenze non cambiano. In pratica è una scorciatoia: `useCallback(fn, deps)` equivale a `useMemo(() => fn, deps)`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "useCallback con useEffect",
        code: `import { useCallback, useEffect, useState } from "react";

function Meteo({ citta }) {
  const [previsioni, setPrevisioni] = useState(null);

  // Senza useCallback, caricaPrevisioni sarebbe una funzione nuova
  // a ogni render e l'effetto qui sotto ripartirebbe ogni volta.
  const caricaPrevisioni = useCallback(async () => {
    const response = await fetch("/api/meteo?citta=" + citta);
    const data = await response.json();
    setPrevisioni(data);
  }, [citta]); // nuova funzione solo quando cambia la città

  useEffect(() => {
    caricaPrevisioni();
  }, [caricaPrevisioni]);

  return (
    <div>
      <button onClick={caricaPrevisioni}>Aggiorna</button>
      {previsioni && <p>{previsioni.descrizione}</p>}
    </div>
  );
}`,
      },
      {
        type: "subheading",
        content: "Un pattern reale: caricare e ricaricare i dati",
      },
      {
        type: "text",
        content:
          "Nelle applicazioni vere una pagina carica i dati all'apertura e poi li ricarica più volte: dopo un salvataggio, dopo una cancellazione, quando l'utente preme \"Aggiorna\". Conviene quindi avere UNA sola funzione `fetchData`, memorizzata con useCallback, da usare sia nel `useEffect` iniziale sia in tutti gli altri punti.\n\nLa funzione riceve un oggetto di opzioni con un parametro di default: `async ({ silent = false } = {})`. È il destructuring nei parametri che già conosci, con due default: se chiami `fetchData()` senza argomenti, l'oggetto vale `{}` e quindi `silent` vale `false`; se chiami `fetchData({ silent: true })`, `silent` vale `true`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "fetchData con useCallback e ricaricamento silenzioso",
        code: `import { useCallback, useEffect, useState } from "react";

function PaginaOrdini() {
  const [ordini, setOrdini] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async ({ silent = false } = {}) => {
    // Lo spinner compare solo nei caricamenti "normali"
    if (!silent) setLoading(true);
    try {
      const response = await fetch("/api/ordini");
      const data = await response.json();
      setOrdini(data);
    } catch (error) {
      console.error("Errore nel caricamento degli ordini:", error);
      // In un ricaricamento silenzioso teniamo le righe che si vedono già
      if (!silent) setOrdini([]);
    } finally {
      if (!silent) setLoading(false);
    }
  }, []); // nessuna dipendenza: la funzione resta sempre la stessa

  // Primo caricamento, all'apertura della pagina
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <p>Caricamento...</p>;

  return <TabellaOrdini ordini={ordini} />;
}`,
      },
      {
        type: "text",
        content:
          "Perché il ricaricamento \"silenzioso\"? Guarda il componente: quando `loading` è true, al posto della tabella viene mostrato \"Caricamento...\". Se dopo ogni salvataggio richiamassimo `fetchData()` normale, la tabella sparirebbe per un attimo: React la **smonta** (la toglie dalla pagina) e poi ne crea una nuova. Smontare un componente significa perdere tutto il suo stato interno: la pagina che l'utente stava guardando, la riga selezionata, il testo di ricerca, lo scroll. Con `fetchData({ silent: true })` lo spinner non compare, la tabella resta montata e riceve solo le nuove righe tramite le props, mantenendo il suo stato.",
      },
      {
        type: "text",
        content:
          "Il ricaricamento viene spesso chiesto da un componente figlio. La tabella sa quando un salvataggio è andato a buon fine, ma non sa come ricaricare i dati: lo sa la pagina. Si usa quindi il pattern della callback come prop: la pagina passa una funzione `onChanged` e la tabella la chiama dopo ogni salvataggio riuscito. Anche questa callback va memorizzata con useCallback, così il figlio riceve sempre la stessa funzione.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Il figlio avvisa il genitore con onChanged",
        code: `function PaginaOrdini() {
  // ... ordini, loading e fetchData come sopra ...

  // Chiamata dalla tabella dopo ogni salvataggio riuscito
  const handleOrdiniChanged = useCallback(() => {
    fetchData({ silent: true }); // niente spinner: la tabella resta montata
  }, [fetchData]);

  if (loading) return <p>Caricamento...</p>;
  return <TabellaOrdini ordini={ordini} onChanged={handleOrdiniChanged} />;
}

function TabellaOrdini({ ordini, onChanged }) {
  const [paginaCorrente, setPaginaCorrente] = useState(1); // sopravvive ai ricaricamenti silenziosi

  const segnaComeSpedito = async (id) => {
    try {
      await fetch("/api/ordini/" + id + "/spedito", { method: "POST" });
      // Salvataggio riuscito: avvisiamo il genitore
      // (?. chiama onChanged solo se il genitore l'ha passata)
      onChanged?.();
    } catch (error) {
      console.error("Salvataggio non riuscito:", error);
    }
  };

  return (
    <ul>
      {ordini.map((o) => (
        <li key={o.id}>
          Ordine {o.id} - {o.stato}
          <button onClick={() => segnaComeSpedito(o.id)}>Segna come spedito</button>
        </li>
      ))}
    </ul>
  );
}`,
      },
      {
        type: "subheading",
        content: "Configurazioni stabili: costanti di modulo e useMemo",
      },
      {
        type: "text",
        content:
          "Lo stesso problema delle funzioni vale per oggetti e array: `{}` e `[]` scritti nel corpo di un componente sono un oggetto o un array NUOVI a ogni render (ricorda che `{} === {}` è false). Se finiscono nelle dipendenze di un useMemo o di un useEffect, il calcolo viene rifatto a ogni render anche se il contenuto non è cambiato.\n\nCaso tipico: il valore di default di una prop. Scrivere `opzioni = {}` nei parametri crea un oggetto nuovo a ogni render quando la prop non viene passata. La soluzione è definire una costante a livello di modulo (fuori dal componente), creata una sola volta: `const NO_OPTIONS = {}`. Per le configurazioni calcolate a partire dalle props (ad esempio le colonne di una tabella), si usa invece useMemo.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Default stabili e colonne calcolate con useMemo",
        code: `import { useMemo } from "react";

// Create UNA volta sola, quando il file viene caricato
const NO_OPTIONS = {};
const NO_FIELDS = [];

function TabellaProdotti({ prodotti, etichette = NO_OPTIONS, campiNascosti = NO_FIELDS }) {
  // Con "etichette = {}" qui sopra, etichette sarebbe un oggetto nuovo
  // a ogni render e questo useMemo verrebbe ricalcolato ogni volta.
  const colonne = useMemo(() => {
    if (prodotti.length === 0) return [];
    return Object.keys(prodotti[0])
      .filter((campo) => !campiNascosti.includes(campo))
      .map((campo) => ({
        campo,
        titolo: etichette[campo] || campo,
      }));
  }, [prodotti, etichette, campiNascosti]);

  return (
    <table>
      <thead>
        <tr>
          {colonne.map((c) => <th key={c.campo}>{c.titolo}</th>)}
        </tr>
      </thead>
      {/* ... righe ... */}
    </table>
  );
}`,
      },
      {
        type: "info",
        content:
          "Una costante di modulo funziona per i valori che non dipendono da props o stato (un default vuoto, un elenco fisso di opzioni). Se il valore dipende da props o stato, non può stare fuori dal componente: in quel caso si usa useMemo con le dipendenze giuste.",
      },
      {
        type: "subheading",
        content: "Quando NON usare useMemo (e useCallback)",
      },
      {
        type: "list",
        items: [
          "Per operazioni semplici come somme di pochi numeri o concatenazioni di stringhe: il costo della memorizzazione supera il beneficio.",
          "Quando il valore cambia comunque a ogni render (le dipendenze cambiano sempre).",
          "Per creare oggetti semplici come { color: 'red' }: il codice è più leggibile senza useMemo.",
          "Come ottimizzazione prematura: prima verifica che ci sia un vero problema di prestazioni.",
        ],
      },
      {
        type: "warning",
        content:
          "useMemo è un'ottimizzazione, non una garanzia: React potrebbe decidere di ricalcolare il valore anche se le dipendenze non sono cambiate (ad esempio per liberare memoria). Il codice deve funzionare correttamente anche senza useMemo, e la funzione passata a useMemo non deve avere effetti collaterali (chiamate API, modifiche a variabili esterne): per quelli c'è useEffect.",
      },
      {
        type: "tip",
        content:
          "Usa useRef per tutto ciò che deve sopravvivere ai render senza essere mostrato (nodi DOM, id dei timer, flag), e useMemo solo per calcoli davvero pesanti su liste lunghe. Se non sei sicuro, scrivi prima il codice senza useMemo: aggiungerlo dopo è facile.",
      },
    ],
    exercises: [
      {
        type: "code",
        mode: "static",
        title: "Contatore con useRef",
        description:
          "Completa il componente `ContaClic`, che conta i clic su un bottone SENZA causare re-render.\n\n1. Crea un ref `clicRef` con valore iniziale `0` usando `useRef`.\n2. Nella funzione `registraClic` incrementa `clicRef.current` di 1.\n3. Nella funzione `mostraTotale` stampa il totale con `console.log`, ad esempio `console.log(\"Clic totali: \" + clicRef.current)`.\n4. Collega i due bottoni alle funzioni con `onClick`.\n\nNon usare useState: il numero di clic non deve essere mostrato sullo schermo.",
        difficulty: "facile",
        starterCode: `import { useRef } from "react";

function ContaClic() {
  // 1. Crea qui il ref clicRef

  const registraClic = () => {
    // 2. Incrementa il valore del ref
  };

  const mostraTotale = () => {
    // 3. Stampa il totale dei clic
  };

  return (
    <div>
      {/* 4. Collega i bottoni alle funzioni */}
      <button>Clicca</button>
      <button>Mostra totale</button>
    </div>
  );
}`,
        solution: `import { useRef } from "react";

function ContaClic() {
  const clicRef = useRef(0);

  const registraClic = () => {
    clicRef.current += 1;
  };

  const mostraTotale = () => {
    console.log("Clic totali: " + clicRef.current);
  };

  return (
    <div>
      <button onClick={registraClic}>Clicca</button>
      <button onClick={mostraTotale}>Mostra totale</button>
    </div>
  );
}`,
        validate: `const c = $codeNoComments;
if (!/import\\s*\\{[^}]*\\buseRef\\b[^}]*\\}\\s*from\\s*["']react["']/.test(c)) return "Importa useRef da \\"react\\": import { useRef } from \\"react\\";";
if (!/const\\s+clicRef\\s*=\\s*useRef\\(\\s*0\\s*\\)/.test(c)) return "Crea il ref con valore iniziale 0: const clicRef = useRef(0);";
if (/\\buseState\\b/.test(c)) return "Non serve useState: il conteggio va salvato solo nel ref, così i clic non causano re-render.";
if (!/clicRef\\.current\\s*(\\+\\+|\\+=\\s*1\\b|=\\s*clicRef\\.current\\s*\\+\\s*1\\b)|\\+\\+\\s*clicRef\\.current/.test(c)) return "In registraClic incrementa il ref di 1: clicRef.current += 1;";
if (!/console\\.log\\([^)]*clicRef\\.current/.test(c)) return "In mostraTotale stampa clicRef.current con console.log.";
if (!/<button[^>]*onClick\\s*=\\s*\\{\\s*registraClic\\s*\\}/.test(c)) return "Collega il bottone \\"Clicca\\" alla funzione: onClick={registraClic}.";
if (!/<button[^>]*onClick\\s*=\\s*\\{\\s*mostraTotale\\s*\\}/.test(c)) return "Collega il bottone \\"Mostra totale\\" alla funzione: onClick={mostraTotale}.";
return true;`,
      },
      {
        type: "code",
        mode: "static",
        title: "Totale del carrello con useMemo",
        description:
          "Il componente `Carrello` riceve la prop `prodotti`, un array di oggetti come `{ id: 1, nome: \"Zaino\", prezzo: 30, quantita: 2 }`.\n\nCalcola la costante `totale` con `useMemo`: usa `reduce` per sommare `prezzo * quantita` di ogni prodotto (partendo da 0) e indica `prodotti` come unica dipendenza.",
        difficulty: "medio",
        starterCode: `import { useMemo } from "react";

function Carrello({ prodotti }) {
  // Calcola qui la costante totale con useMemo

  return <p>Totale: {totale} €</p>;
}`,
        solution: `import { useMemo } from "react";

function Carrello({ prodotti }) {
  const totale = useMemo(() => {
    return prodotti.reduce((somma, p) => somma + p.prezzo * p.quantita, 0);
  }, [prodotti]);

  return <p>Totale: {totale} €</p>;
}`,
        validate: `const c = $codeNoComments;
if (!/import\\s*\\{[^}]*\\buseMemo\\b[^}]*\\}\\s*from\\s*["']react["']/.test(c)) return "Importa useMemo da \\"react\\".";
if (!/const\\s+totale\\s*=\\s*useMemo\\(/.test(c)) return "Calcola il totale con useMemo: const totale = useMemo(() => ..., [prodotti]);";
if (!/prodotti\\.reduce\\(/.test(c)) return "Dentro useMemo usa prodotti.reduce(...) per sommare i prezzi.";
if (!/\\.prezzo\\s*\\*\\s*\\w+\\.quantita|\\.quantita\\s*\\*\\s*\\w+\\.prezzo/.test(c)) return "Per ogni prodotto somma prezzo * quantita.";
if (!/,\\s*0\\s*\\)/.test(c)) return "Ricorda il valore iniziale di reduce: 0.";
if (!/,\\s*\\[\\s*prodotti\\s*\\]\\s*\\)/.test(c)) return "Passa a useMemo l'array di dipendenze [prodotti] come secondo argomento.";
if (!/\\{\\s*totale\\s*\\}/.test(c)) return "Mostra il totale nel JSX con {totale}.";
return true;`,
        solutionExplanation:
          "`reduce` parte da 0 e, per ogni prodotto, aggiunge `prezzo * quantita` alla somma accumulata. Avvolgendo il calcolo in useMemo con dipendenza `[prodotti]`, il totale viene ricalcolato solo quando arriva un nuovo array di prodotti, non a ogni render del componente (ad esempio quando cambia uno stato che non riguarda il carrello).",
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
          "useState mantiene il valore tra i render; useRef azzera il valore a ogni render",
          "useRef può contenere solo riferimenti a elementi DOM; useState può contenere qualsiasi valore",
        ],
        correct: 1,
        explanation:
          "useRef restituisce un oggetto { current: valore } che persiste tra i render. Modificare .current NON causa un re-render. useState invece avvisa React del cambiamento, causando un nuovo render del componente. Un ref può contenere qualsiasi valore, non solo nodi DOM.",
      },
      {
        type: "multiple-choice",
        title: "Quando usare useMemo",
        description:
          "In quale di questi scenari è più appropriato usare useMemo?",
        difficulty: "medio",
        options: [
          "Per memorizzare una stringa costante come const titolo = 'Benvenuto'",
          "Per creare un gestore di eventi come onClick={() => alert('cliccato')}",
          "Per salvare il valore di un input di testo",
          "Per filtrare e ordinare un array di 10.000 elementi ogni volta che cambia un filtro",
        ],
        correct: 3,
        explanation:
          "useMemo è ideale per operazioni costose come filtrare e ordinare grandi quantità di dati. Il costo della memorizzazione si ripaga quando il calcolo è pesante e le dipendenze non cambiano a ogni render. Per valori semplici o gestori di eventi, useMemo aggiunge complessità senza benefici; per il valore di un input serve useState.",
      },
      {
        type: "multiple-choice",
        title: "Il ricaricamento silenzioso",
        description:
          "Una pagina mostra `<p>Caricamento...</p>` quando `loading` è true, altrimenti `<TabellaOrdini />`. Dopo ogni salvataggio la tabella chiama `onChanged`, che esegue `fetchData({ silent: true })`:\n\nconst fetchData = useCallback(async ({ silent = false } = {}) => {\n  if (!silent) setLoading(true);\n  try { setOrdini(await caricaOrdini()); }\n  finally { if (!silent) setLoading(false); }\n}, []);\n\nPerché si passa `silent: true` invece di chiamare semplicemente `fetchData()`?",
        difficulty: "difficile",
        options: [
          "Perché con `silent: true` la richiesta al server è più veloce",
          "Perché senza argomenti `fetchData()` lancerebbe un errore: il parametro è obbligatorio",
          "Perché così `loading` non diventa true: la tabella non viene sostituita dallo spinner, resta montata e conserva il suo stato (pagina, selezione)",
          "Perché useCallback permette di chiamare la funzione senza argomenti una sola volta",
        ],
        correct: 2,
        explanation:
          "Con `silent: true` il codice salta `setLoading(true)`: il componente non mostra \"Caricamento...\", quindi `TabellaOrdini` non viene smontata e mantiene il suo stato interno, ricevendo solo le nuove righe. La velocità della richiesta è identica. `fetchData()` senza argomenti è lecito: grazie a `= {}` l'oggetto vale `{}` e `silent` vale false. useCallback non limita il numero di chiamate: restituisce sempre la stessa funzione finché le dipendenze non cambiano.",
      },
      {
        type: "multiple-choice",
        title: "Un valore di default che rompe useMemo",
        description:
          "In questo componente il calcolo delle colonne viene rifatto a OGNI render quando la prop `etichette` non viene passata. Qual è la correzione migliore?\n\nfunction Tabella({ prodotti, etichette = {} }) {\n  const colonne = useMemo(() => creaColonne(prodotti, etichette), [prodotti, etichette]);\n  // ...\n}",
        difficulty: "medio",
        options: [
          "Definire fuori dal componente `const NO_OPTIONS = {};` e usare `etichette = NO_OPTIONS` come default",
          "Togliere `etichette` dall'array di dipendenze di useMemo",
          "Sostituire useMemo con useEffect",
          "Salvare `{}` in una variabile `const vuoto = {};` dentro il componente, prima di useMemo",
        ],
        correct: 0,
        explanation:
          "Un default `{}` crea un oggetto nuovo a ogni render e, siccome `{} !== {}`, useMemo vede una dipendenza cambiata. Una costante di modulo viene creata una sola volta, quindi è sempre lo stesso oggetto. Togliere la dipendenza nasconde il problema e farebbe usare valori vecchi quando la prop cambia davvero; useEffect serve per gli effetti collaterali, non per calcolare valori; una variabile dentro il componente viene comunque ricreata a ogni render.",
      },
    ],
  },

  "custom-hooks": {
    sections: [
      {
        type: "text",
        content:
          "I custom hook sono funzioni JavaScript il cui nome inizia con `use` e che possono chiamare altri hook di React al loro interno. Sono il meccanismo principale per estrarre e riutilizzare logica con stato tra componenti diversi.",
      },
      {
        type: "heading",
        content: "Cosa sono i custom hook",
      },
      {
        type: "text",
        content:
          "Un custom hook è semplicemente una funzione che usa altri hook. Non è un componente: non restituisce JSX, ma valori (dati, funzioni, oggetti) che i componenti possono utilizzare. L'idea chiave è: se due componenti condividono la stessa logica, estraila in un hook.",
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
  const azzera = () => setValore(valoreIniziale);

  return { valore, incrementa, decrementa, azzera };
}

// Uso nel componente
function Contatore() {
  const { valore, incrementa, decrementa, azzera } = useContatore(0);

  return (
    <div>
      <p>Valore: {valore}</p>
      <button onClick={incrementa}>+</button>
      <button onClick={decrementa}>-</button>
      <button onClick={azzera}>Azzera</button>
    </div>
  );
}`,
      },
      {
        type: "heading",
        content: "Regole degli hook",
      },
      {
        type: "list",
        items: [
          "Chiama gli hook solo al livello più alto della funzione, mai dentro condizioni, cicli o funzioni annidate.",
          "Chiama gli hook solo dentro componenti React o altri custom hook.",
          "Il nome deve iniziare con `use` (es. useContatore, useToggle, useFetch).",
          "Ogni chiamata a un hook ha il proprio stato indipendente: se due componenti usano lo stesso hook, non condividono lo stato.",
        ],
      },
      {
        type: "warning",
        content:
          "Non chiamare mai un hook dentro un if o un for. React si basa sull'ordine delle chiamate per associare a ogni hook il suo stato interno: cambiare l'ordine tra un render e l'altro causa bug difficili da individuare.",
      },
      {
        type: "heading",
        content: "Estrarre logica riutilizzabile",
      },
      {
        type: "text",
        content:
          "Il vero potere dei custom hook emerge quando la logica diventa complessa. Invece di duplicare codice tra componenti, lo si estrae in un hook che può combinare useState, useEffect, useRef, useMemo e qualsiasi altro hook.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Custom hook per caricare dati",
        code: `import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errore, setErrore] = useState(null);

  useEffect(() => {
    if (!url) return;

    async function caricaDati() {
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
      }
    }

    caricaDati();
  }, [url]); // ricarica quando cambia l'indirizzo

  return { data, loading, errore };
}

// Uso nei componenti: pulito e riutilizzabile
function ListaFilm() {
  const { data, loading, errore } = useFetch("/api/film");

  if (loading) return <p>Caricamento...</p>;
  if (errore) return <p>Errore: {errore}</p>;
  return <ul>{data.map((f) => <li key={f.id}>{f.titolo}</li>)}</ul>;
}

function ListaRicette() {
  // Stessa logica, dati diversi
  const { data, loading } = useFetch("/api/ricette");
  // ...
}`,
      },
      {
        type: "subheading",
        content: "Restituire valori dai custom hook",
      },
      {
        type: "text",
        content:
          "Un custom hook può restituire qualsiasi cosa: un singolo valore, un array (come useState) o un oggetto con più proprietà e funzioni. La convenzione più comune è restituire un array quando i valori sono pochi (così chi lo usa può rinominarli liberamente con il destructuring) e un oggetto quando sono molti (così si prendono per nome solo quelli che servono).",
      },
      {
        type: "code",
        language: "javascript",
        title: "Un hook più completo: usePaginazione",
        code: `import { useState, useMemo } from "react";

function usePaginazione(elementi, perPagina = 5) {
  const [pagina, setPagina] = useState(1);

  // Math.ceil arrotonda per eccesso: 12 elementi / 5 = 3 pagine
  const totalePagine = Math.ceil(elementi.length / perPagina);

  // Gli elementi della pagina corrente (ricalcolati solo se serve)
  const elementiVisibili = useMemo(() => {
    const inizio = (pagina - 1) * perPagina;
    return elementi.slice(inizio, inizio + perPagina);
  }, [elementi, pagina, perPagina]);

  const paginaSuccessiva = () => {
    if (pagina < totalePagine) setPagina((p) => p + 1);
  };
  const paginaPrecedente = () => {
    if (pagina > 1) setPagina((p) => p - 1);
  };

  // Molti valori: restituiamo un oggetto
  return {
    pagina,
    totalePagine,
    elementiVisibili,
    paginaSuccessiva,
    paginaPrecedente,
  };
}

// Uso nel componente
function ElencoArticoli({ articoli }) {
  const { pagina, totalePagine, elementiVisibili, paginaSuccessiva, paginaPrecedente } =
    usePaginazione(articoli, 3);

  return (
    <div>
      <ul>
        {elementiVisibili.map((a) => <li key={a.id}>{a.titolo}</li>)}
      </ul>
      <button onClick={paginaPrecedente}>Indietro</button>
      <span> Pagina {pagina} di {totalePagine} </span>
      <button onClick={paginaSuccessiva}>Avanti</button>
    </div>
  );
}`,
      },
      {
        type: "info",
        content:
          "Nota come usePaginazione combina useState e useMemo in un unico hook. Il componente che lo usa riceve un'interfaccia pulita (dati e funzioni pronti all'uso) senza dover conoscere i dettagli del calcolo.",
      },
      {
        type: "tip",
        content:
          "Quando un componente diventa lungo e pieno di useState e useEffect, prova a raggruppare la logica in un custom hook con un nome che descriva cosa fa (useFetch, usePaginazione, useToggle): il componente resterà concentrato su ciò che mostra e la logica diventerà riutilizzabile.",
      },
    ],
    exercises: [
      {
        type: "code",
        mode: "static",
        title: "Crea un custom hook useToggle",
        description:
          "Completa il custom hook `useToggle`, che gestisce un valore booleano (vero/falso).\n\n1. Crea lo stato con `const [valore, setValore] = useState(valoreIniziale);`\n2. Definisci una funzione `toggle` che inverte il valore usando `setValore` (con l'operatore `!`).\n3. Restituisci un array con, in quest'ordine: `valore`, `toggle` e `setValore`.\n\nIl componente `Interruttore` mostra come verrà usato l'hook.",
        difficulty: "facile",
        starterCode: `import { useState } from "react";

function useToggle(valoreIniziale = false) {
  // Implementa qui l'hook
}

// Esempio d'uso
function Interruttore() {
  const [acceso, toggle, setAcceso] = useToggle(false);

  return (
    <div>
      <p>La luce è {acceso ? "accesa" : "spenta"}</p>
      <button onClick={toggle}>Accendi/Spegni</button>
      <button onClick={() => setAcceso(false)}>Spegni</button>
    </div>
  );
}`,
        solution: `import { useState } from "react";

function useToggle(valoreIniziale = false) {
  const [valore, setValore] = useState(valoreIniziale);

  const toggle = () => {
    setValore((v) => !v);
  };

  return [valore, toggle, setValore];
}

// Esempio d'uso
function Interruttore() {
  const [acceso, toggle, setAcceso] = useToggle(false);

  return (
    <div>
      <p>La luce è {acceso ? "accesa" : "spenta"}</p>
      <button onClick={toggle}>Accendi/Spegni</button>
      <button onClick={() => setAcceso(false)}>Spegni</button>
    </div>
  );
}`,
        validate: `const c = $codeNoComments;
if (!/function\\s+useToggle\\s*\\(|const\\s+useToggle\\s*=/.test(c)) return "Definisci l'hook useToggle.";
if (!/const\\s*\\[\\s*valore\\s*,\\s*setValore\\s*\\]\\s*=\\s*useState\\(\\s*valoreIniziale\\s*\\)/.test(c)) return "Dentro useToggle crea lo stato: const [valore, setValore] = useState(valoreIniziale);";
if (!/const\\s+toggle\\s*=|function\\s+toggle\\s*\\(/.test(c)) return "Definisci la funzione toggle dentro l'hook.";
if (!/setValore\\(\\s*\\(?\\s*(\\w+)\\s*\\)?\\s*=>\\s*!\\s*\\1\\s*\\)|setValore\\(\\s*!\\s*valore\\s*\\)/.test(c)) return "toggle deve invertire il valore: setValore((v) => !v) oppure setValore(!valore).";
if (!/return\\s*\\[\\s*valore\\s*,\\s*toggle\\s*,\\s*setValore\\s*\\]/.test(c)) return "L'hook deve restituire l'array [valore, toggle, setValore], in quest'ordine.";
return true;`,
      },
      {
        type: "multiple-choice",
        title: "Regole degli hook",
        description:
          "Quale di queste è una violazione delle regole degli hook?",
        difficulty: "medio",
        options: [
          "Chiamare useState dentro un custom hook chiamato useForm",
          "Chiamare useEffect dentro un if (condizione) nel corpo del componente",
          "Usare useRef all'interno di un custom hook chiamato useTimer",
          "Restituire un oggetto da un custom hook",
        ],
        correct: 1,
        explanation:
          "Gli hook devono essere chiamati sempre al livello più alto del componente o dell'hook, mai dentro condizioni, cicli o blocchi annidati. React dipende dall'ordine delle chiamate per gestire lo stato interno: chiamare useEffect dentro un if cambierebbe quest'ordine tra un render e l'altro. Le altre opzioni sono tutte lecite.",
      },
      {
        type: "multiple-choice",
        title: "Vantaggi dei custom hook",
        description:
          "Qual è il vantaggio principale di estrarre logica in un custom hook?",
        difficulty: "facile",
        options: [
          "I custom hook rendono il codice più veloce durante l'esecuzione",
          "I custom hook permettono di condividere lo stesso stato tra componenti diversi",
          "I custom hook permettono di riutilizzare logica con stato senza duplicare codice",
          "I custom hook restituiscono JSX e quindi sostituiscono i componenti",
        ],
        correct: 2,
        explanation:
          "I custom hook estraggono logica riutilizzabile. Attenzione: non condividono lo stato tra componenti (ogni uso crea il proprio stato indipendente) e non restituiscono JSX. Il vantaggio è evitare di duplicare logica complessa che coinvolge altri hook.",
      },
      {
        type: "multiple-choice",
        title: "Stato indipendente in ogni componente",
        description:
          "Due componenti usano lo stesso hook:\n\nfunction CarrelloA() {\n  const { valore, incrementa } = useContatore(0);\n  // ...\n}\nfunction CarrelloB() {\n  const { valore } = useContatore(0);\n  // ...\n}\n\nSe in `CarrelloA` si chiama `incrementa()` tre volte, quanto vale `valore` in `CarrelloB`?",
        difficulty: "medio",
        options: [
          "3, perché i due componenti usano lo stesso hook e quindi lo stesso stato",
          "1, perché solo il primo incremento viene condiviso",
          "undefined, perché un hook non può essere usato da due componenti",
          "0, perché ogni chiamata a useContatore crea il proprio stato indipendente",
        ],
        correct: 3,
        explanation:
          "Un custom hook condivide la *logica*, non lo stato: ogni componente che chiama `useContatore` esegue il proprio `useState`, quindi ha un valore tutto suo. `CarrelloB` resta a 0. Usare lo stesso hook in più componenti è proprio lo scopo dei custom hook; per condividere davvero un dato tra componenti servono altri strumenti, come il Context della prossima lezione.",
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
        content: "Il problema: prop drilling",
      },
      {
        type: "text",
        content:
          "Il prop drilling avviene quando un dato deve passare attraverso molti livelli di componenti, anche se quelli intermedi non lo usano. Ad esempio, se il nome dell'utente deve arrivare dal componente App fino a un menu annidato cinque livelli più in basso, ogni componente intermedio deve riceverlo come prop e passarlo al figlio.",
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
  // Solo qui viene usato davvero
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
          "Context crea un canale diretto tra un componente fornitore (il Provider) e qualsiasi componente discendente che vuole leggere quei dati, saltando tutti i livelli intermedi. Si procede in tre passi: si crea il Context con `createContext`, si crea un componente Provider che contiene lo stato, e lo si usa per avvolgere la parte di applicazione che deve accedere ai dati.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Creare un Context e il suo Provider",
        code: `import { createContext, useState } from "react";

// 1. Creiamo il Context (undefined è il valore di default)
export const UserContext = createContext(undefined);

// 2. Creiamo il Provider: un componente che avvolge i figli
export function UserProvider({ children }) {
  const [username, setUsername] = useState("Mario Rossi");
  const [loggato, setLoggato] = useState(true);

  const logout = () => {
    setUsername("");
    setLoggato(false);
  };

  // Tutto ciò che è in value diventa disponibile ai discendenti
  return (
    <UserContext.Provider value={{ username, loggato, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// 3. Avvolgiamo l'applicazione con il Provider
function App() {
  return (
    <UserProvider>
      <Layout />
    </UserProvider>
  );
}`,
      },
      {
        type: "heading",
        content: "useContext: leggere il Context",
      },
      {
        type: "text",
        content:
          "L'hook `useContext` permette a qualsiasi componente discendente del Provider di leggere i dati del Context, indipendentemente da quanti livelli di annidamento ci siano. Ora Layout e Sidebar non devono più ricevere né passare username.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Leggere il Context con useContext",
        code: `import { useContext } from "react";
import { UserContext } from "./UserContext";

function Layout() {
  return <Sidebar />; // nessuna prop da passare
}

function Sidebar() {
  return <UserMenu />;
}

function UserMenu() {
  // Accede direttamente ai dati: niente prop drilling!
  const { username, logout } = useContext(UserContext);

  return (
    <div>
      <span>Ciao, {username}!</span>
      <button onClick={logout}>Esci</button>
    </div>
  );
}`,
      },
      {
        type: "text",
        content:
          "Quando il valore del Provider cambia (ad esempio dopo il logout), React fa automaticamente il re-render di tutti i componenti che usano quel Context. Se ci sono più Provider dello stesso Context annidati, un componente legge il valore del Provider più vicino sopra di lui; un componente che non si trova dentro nessun Provider riceve invece il valore di default passato a `createContext`.",
      },
      {
        type: "subheading",
        content: "Pattern: un custom hook per il Context",
      },
      {
        type: "text",
        content:
          "Una buona pratica è creare un custom hook dedicato per ogni Context. Questo semplifica l'uso, aggiunge un controllo sugli errori e nasconde i dettagli di implementazione.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Custom hook useUser",
        code: `import { useContext } from "react";
import { UserContext } from "./UserContext";

// Custom hook con controllo
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser deve essere usato dentro un UserProvider");
  }
  return context;
}

// Ora nei componenti basta scrivere:
function ProfiloUtente() {
  const { username } = useUser();
  return <div>Benvenuto, {username}!</div>;
}`,
      },
      {
        type: "info",
        content:
          "Il `throw new Error` dentro useUser è un pattern difensivo: se un componente prova a usare il Context fuori dal Provider, riceve il valore di default `undefined`; invece di un errore misterioso più avanti (\"cannot read properties of undefined\"), ottiene subito un messaggio chiaro.",
      },
      {
        type: "heading",
        content: "Quando usare Context e quando una libreria di stato",
      },
      {
        type: "text",
        content:
          "Context è ottimo per pochi dati globali, ma non è pensato per gestire tutto lo stato di un'applicazione grande. Per questo esistono librerie dedicate come Redux, che vedremo nel prossimo modulo. Ecco un confronto concettuale:",
      },
      {
        type: "list",
        items: [
          "Usa Context per dati che cambiano raramente e servono ovunque: tema, lingua, utente connesso.",
          "Context causa il re-render di TUTTI i componenti che lo usano quando il valore cambia, anche se a loro interessa solo una parte dei dati.",
          "Una libreria come Redux è più adatta a stato complesso e aggiornato spesso (carrello, filtri, dati condivisi da molte pagine): permette a ogni componente di leggere solo la porzione di stato che gli serve, limitando i re-render.",
          "Le due soluzioni possono convivere: ad esempio Context per tema e utente, Redux per il resto dello stato.",
        ],
      },
      {
        type: "tip",
        content:
          "Non usare Context per evitare di passare props a uno o due livelli: in quel caso le props sono più semplici e chiare. Riservalo ai dati davvero globali e accompagnalo sempre con un custom hook (useUser, useTheme) che controlli la presenza del Provider.",
      },
    ],
    exercises: [
      {
        type: "code",
        mode: "static",
        title: "Crea un ThemeContext",
        description:
          "Crea un sistema di tema (chiaro/scuro) con la Context API.\n\n1. Crea `ThemeContext` con `createContext(undefined)`.\n2. Nel componente `ThemeProvider` crea lo stato `const [tema, setTema] = useState(\"chiaro\");` e una funzione `toggleTema` che passa da \"chiaro\" a \"scuro\" e viceversa.\n3. `ThemeProvider` deve restituire `<ThemeContext.Provider value={{ tema, toggleTema }}>` con dentro `{children}`.\n4. Nel custom hook `useTheme` leggi il Context con `useContext`, lancia un errore con `throw new Error(...)` se il valore è undefined, altrimenti restituiscilo.",
        difficulty: "medio",
        starterCode: `import { createContext, useContext, useState } from "react";

// 1. Crea ThemeContext

// 2-3. Completa il Provider
export function ThemeProvider({ children }) {

}

// 4. Completa il custom hook
export function useTheme() {

}`,
        solution: `import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState("chiaro");

  const toggleTema = () => {
    setTema((t) => (t === "chiaro" ? "scuro" : "chiaro"));
  };

  return (
    <ThemeContext.Provider value={{ tema, toggleTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve essere usato dentro un ThemeProvider");
  }
  return context;
}`,
        validate: `const c = $codeNoComments;
if (!/const\\s+ThemeContext\\s*=\\s*createContext\\(/.test(c)) return "Crea il Context: const ThemeContext = createContext(undefined);";
if (!/const\\s*\\[\\s*tema\\s*,\\s*setTema\\s*\\]\\s*=\\s*useState\\(\\s*["']chiaro["']\\s*\\)/.test(c)) return "In ThemeProvider crea lo stato: const [tema, setTema] = useState(\\"chiaro\\");";
if (!/const\\s+toggleTema\\s*=|function\\s+toggleTema\\s*\\(/.test(c)) return "Definisci la funzione toggleTema dentro ThemeProvider.";
if (!/setTema\\(/.test(c) || !/["']scuro["']/.test(c) || !/===\\s*["'](chiaro|scuro)["']|["'](chiaro|scuro)["']\\s*===/.test(c)) return "toggleTema deve usare setTema per passare da \\"chiaro\\" a \\"scuro\\" e viceversa (ad esempio con un ternario e ===).";
const prov = c.match(/<ThemeContext\\.Provider\\s+value\\s*=\\s*\\{\\s*\\{([^}]*)\\}\\s*\\}\\s*>/);
if (!prov) return "ThemeProvider deve restituire <ThemeContext.Provider value={{ tema, toggleTema }}>.";
if (!/\\btema\\b/.test(prov[1]) || !/\\btoggleTema\\b/.test(prov[1])) return "Nel value del Provider metti sia tema sia toggleTema: value={{ tema, toggleTema }}.";
if (!/<ThemeContext\\.Provider[\\s\\S]*\\{\\s*children\\s*\\}[\\s\\S]*<\\/ThemeContext\\.Provider>/.test(c)) return "Dentro il Provider mostra i figli con {children} e chiudi il tag con </ThemeContext.Provider>.";
if (!/useContext\\(\\s*ThemeContext\\s*\\)/.test(c)) return "In useTheme leggi il Context con useContext(ThemeContext).";
if (!/throw\\s+new\\s+Error\\(/.test(c)) return "In useTheme lancia un errore se il Context è undefined: throw new Error(\\"...\\").";
if (!/function\\s+useTheme[\\s\\S]*throw[\\s\\S]*return\\s+\\w+/.test(c)) return "Alla fine di useTheme restituisci il valore del Context con return.";
return true;`,
        solutionExplanation:
          "Il Provider tiene lo stato `tema` e mette nel `value` sia il valore sia la funzione per cambiarlo, così ogni discendente può leggerlo e modificarlo. `toggleTema` usa la forma funzionale di setTema per partire sempre dal valore più recente. `useTheme` nasconde `useContext(ThemeContext)` e, se il componente è fuori dal Provider (valore `undefined`), lancia subito un errore chiaro invece di lasciar fallire il codice più avanti.",
      },
      {
        type: "multiple-choice",
        title: "Context o props?",
        description:
          "Quando è preferibile usare Context invece di passare normalmente le props?",
        difficulty: "facile",
        options: [
          "Sempre, perché le props sono superate",
          "Solo per gestire il tema dell'applicazione",
          "Quando un dato deve attraversare molti livelli di componenti che non lo usano direttamente",
          "Quando si vogliono migliorare le prestazioni del rendering",
        ],
        correct: 2,
        explanation:
          "Context è utile quando i dati devono attraversare molti livelli intermedi che non li usano (prop drilling). Non sostituisce le props nella comunicazione diretta genitore-figlio e non migliora le prestazioni di per sé (anzi, un uso eccessivo può peggiorarle, perché ogni cambiamento fa ridisegnare tutti i componenti che lo usano).",
      },
      {
        type: "multiple-choice",
        title: "Provider annidati",
        description:
          "Un'app è avvolta da `<ThemeContext.Provider value=\"chiaro\">`. Al suo interno, una sezione è avvolta da `<ThemeContext.Provider value=\"scuro\">`. Un componente dentro quella sezione chiama `useContext(ThemeContext)`. Che valore riceve?",
        difficulty: "difficile",
        options: [
          "\"chiaro\", perché vince sempre il Provider più esterno",
          "\"scuro\", perché si legge il valore del Provider più vicino",
          "undefined, perché non si possono annidare due Provider dello stesso Context",
          "Un array con entrambi i valori: [\"chiaro\", \"scuro\"]",
        ],
        correct: 1,
        explanation:
          "useContext risale l'albero dei componenti e usa il valore del Provider più vicino. Annidare Provider dello stesso Context è lecito ed è utile per sovrascrivere un valore solo in una parte dell'app (ad esempio una sezione con tema scuro). Solo un componente fuori da ogni Provider riceve il valore di default di createContext.",
      },
      {
        type: "multiple-choice",
        title: "Un componente fuori dal Provider",
        description:
          "Con il custom hook `useUser` della lezione:\n\nexport function useUser() {\n  const context = useContext(UserContext); // createContext(undefined)\n  if (!context) {\n    throw new Error(\"useUser deve essere usato dentro un UserProvider\");\n  }\n  return context;\n}\n\nUn componente `Carrello` che chiama `useUser()` viene mostrato FUORI da `<UserProvider>`. Cosa succede?",
        difficulty: "medio",
        options: [
          "Viene lanciato subito l'errore \"useUser deve essere usato dentro un UserProvider\"",
          "useUser restituisce un oggetto vuoto {} e il componente mostra un nome vuoto",
          "React cerca automaticamente il Provider più vicino in un'altra parte dell'app",
          "Il componente funziona, ma username vale \"Mario Rossi\" perché è lo stato iniziale del Provider",
        ],
        correct: 0,
        explanation:
          "Fuori da ogni Provider, useContext restituisce il valore di default passato a createContext, cioè `undefined`. Il controllo `if (!context)` lo intercetta e lancia un errore con un messaggio chiaro. Non si ottiene un oggetto vuoto, React non va a cercare Provider in rami diversi dell'albero (risale solo verso gli antenati) e lo stato iniziale del Provider esiste solo dentro il Provider stesso.",
      },
    ],
  },
};
