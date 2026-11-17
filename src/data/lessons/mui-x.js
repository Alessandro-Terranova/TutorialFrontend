export const lessons = {
  "data-grid": {
    sections: [
      {
        type: "text",
        content:
          "Nel modulo MUI hai costruito tabelle con `Table`, `TableHead`, `TableRow` e `TableCell`: vanno benissimo per pochi dati da mostrare e basta. Quando però servono ordinamento per colonna, filtri, paginazione, ridimensionamento delle colonne o modifica delle celle, scriverli a mano diventa lungo. **MUI X** è la famiglia di componenti avanzati di MUI e la sua **DataGrid** offre tutto questo già pronto: le passi i dati e la descrizione delle colonne, al resto pensa lei.",
      },
      {
        type: "heading",
        content: "Installazione e importazione",
      },
      {
        type: "code",
        language: "javascript",
        title: "Installare e importare la DataGrid",
        code: `// Installazione (da terminale, nella cartella del progetto)
// Richiede che @mui/material sia già installato
// npm install @mui/x-data-grid

// Importazione: il pacchetto è diverso da "@mui/material"
import { DataGrid } from "@mui/x-data-grid";`,
      },
      {
        type: "info",
        content:
          "MUI X esiste in versione gratuita (`@mui/x-data-grid`, licenza MIT) e in versioni a pagamento (`Pro` e `Premium`) con funzioni extra come il raggruppamento delle righe o l'esportazione in Excel. Tutto quello che vedi in questo modulo fa parte della versione gratuita.",
      },
      {
        type: "heading",
        content: "rows e columns: le due props fondamentali",
      },
      {
        type: "text",
        content:
          "La DataGrid ha bisogno di due array:\n- `rows`: i dati, un **array di oggetti**, uno per riga. Ogni riga deve avere un identificativo univoco, che di default la griglia cerca nella proprietà `id`.\n- `columns`: un array di oggetti che descrivono le colonne. Il campo `field` dice quale proprietà della riga mostrare nella colonna, `headerName` è il titolo dell'intestazione.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Una prima DataGrid: il catalogo prodotti",
        code: `import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const products = [
  { id: 1, name: "Tastiera", category: "Informatica", price: 49.9 },
  { id: 2, name: "Lampada da tavolo", category: "Casa", price: 24.5 },
  { id: 3, name: "Zaino", category: "Viaggi", price: 39 },
];

const columns = [
  { field: "name", headerName: "Prodotto", flex: 1, minWidth: 150 },
  { field: "category", headerName: "Categoria", width: 140 },
  { field: "price", headerName: "Prezzo (€)", type: "number", width: 110 },
];

export default function ProductGrid() {
  return (
    // La griglia riempie il contenitore: dagli un'altezza
    <Box sx={{ height: 400 }}>
      <DataGrid rows={products} columns={columns} />
    </Box>
  );
}`,
      },
      {
        type: "text",
        content:
          "Con queste poche righe ottieni già: ordinamento cliccando sull'intestazione, un menu per ogni colonna (filtra, nascondi, ordina), colonne ridimensionabili trascinando il bordo, selezione delle righe con un clic e un footer con la paginazione.",
      },
      {
        type: "subheading",
        content: "Le proprietà principali di una colonna",
      },
      {
        type: "list",
        items: [
          "`field` (obbligatorio): il nome della proprietà della riga da mostrare, es. `\"price\"` legge `row.price`. Deve essere unico tra le colonne.",
          "`headerName`: il testo dell'intestazione. Se manca, viene mostrato il `field`.",
          "`width`: larghezza fissa in pixel (default 100).",
          "`minWidth` e `maxWidth`: limiti in pixel, rispettati anche quando l'utente ridimensiona la colonna.",
          "`flex`: come `flex` in CSS, la colonna si allarga per occupare lo spazio rimasto. Con `flex: 1` su due colonne, lo spazio libero si divide a metà. Se c'è `flex`, `width` viene ignorata.",
          "`align` e `headerAlign`: allineamento del contenuto delle celle e dell'intestazione: `\"left\"`, `\"center\"` o `\"right\"`.",
          "`type`: il tipo di dato. Di default è `\"string\"`; con `\"number\"` i valori sono allineati a destra e ordinati come numeri (10 dopo 9, non prima). Esistono anche `\"boolean\"` (mostra una spunta), `\"date\"` (vuole oggetti `Date`, non stringhe) e `\"singleSelect\"`, che vedremo nella prossima lezione.",
        ],
      },
      {
        type: "warning",
        content:
          "La DataGrid occupa tutta l'altezza del suo contenitore. Se il contenitore non ha un'altezza definita, la griglia può risultare schiacciata o non mostrare le righe. Soluzioni: dai un'altezza al contenitore (es. `<Box sx={{ height: 400 }}>`) oppure usa la prop `autoHeight`, che vedremo tra poco.",
      },
      {
        type: "subheading",
        content: "getRowId: quando l'id non si chiama id",
      },
      {
        type: "text",
        content:
          "Spesso i dati arrivano da un server con l'identificativo in un campo dal nome diverso, per esempio `code` o `isbn`. Senza `id` la griglia segnala un errore. Invece di trasformare tutti gli oggetti, le passi la funzione `getRowId`, che riceve una riga e restituisce il suo identificativo.",
      },
      {
        type: "code",
        language: "javascript",
        title: "getRowId con un identificativo personalizzato",
        code: `const books = [
  { isbn: "978-88-01", title: "Il nome della rosa", author: "Umberto Eco" },
  { isbn: "978-88-02", title: "Se una notte d'inverno un viaggiatore", author: "Italo Calvino" },
];

const columns = [
  { field: "title", headerName: "Titolo", flex: 1 },
  { field: "author", headerName: "Autore", width: 180 },
];

<DataGrid
  rows={books}
  columns={columns}
  getRowId={(row) => row.isbn}   // l'identificativo è nel campo isbn
/>`,
      },
      {
        type: "heading",
        content: "valueFormatter: cambiare come appare un valore",
      },
      {
        type: "text",
        content:
          "A volte il dato è giusto ma va mostrato in un altro formato: una data `\"2026-06-01\"` che l'utente si aspetta di leggere come `01/06/2026`, un prezzo con il simbolo dell'euro. La proprietà di colonna `valueFormatter` è una funzione che riceve il valore della cella (e come secondo argomento la riga intera) e restituisce il **testo da mostrare**. Il valore vero non cambia: ordinamento e filtri continuano a lavorare sul dato originale.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Formattare date e prezzi",
        code: `// "2026-06-01" -> "01/06/2026"; valore mancante -> "-"
const formatDate = (value) => {
  if (!value) return "-";
  const [year, month, day] = value.split("-");
  return day + "/" + month + "/" + year;
};

const orders = [
  { id: 101, customer: "Giulia", date: "2026-06-01", total: 59.9 },
  { id: 102, customer: "Marco", date: "2026-05-28", total: 120 },
  { id: 103, customer: "Sara", date: null, total: 15.5 },
];

const columns = [
  { field: "id", headerName: "N. ordine", width: 100 },
  { field: "customer", headerName: "Cliente", flex: 1 },
  // Le date "aaaa-mm-gg" si ordinano correttamente anche come stringhe
  { field: "date", headerName: "Data", width: 120, valueFormatter: formatDate },
  {
    field: "total",
    headerName: "Totale",
    type: "number",
    width: 120,
    valueFormatter: (value) => value.toFixed(2) + " €",
  },
];`,
      },
      {
        type: "tip",
        content:
          "Tieni i dati nel formato più comodo per elaborarli (date \"aaaa-mm-gg\", numeri come numeri) e trasformali in testo leggibile solo al momento di mostrarli. Così ordinamenti, confronti e calcoli restano semplici e corretti.",
      },
      {
        type: "heading",
        content: "renderCell: contenuti personalizzati nelle celle",
      },
      {
        type: "text",
        content:
          "Se in una cella vuoi mostrare un componente invece del semplice testo (un Chip colorato, un'icona, un bottone), usa `renderCell`. È una funzione che riceve un oggetto di parametri, da cui di solito prendi `value` (il valore della cella) e `row` (la riga intera), e restituisce JSX.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Chip e Typography dentro le celle",
        code: `import { Chip, Typography } from "@mui/material";

const STOCK_COLORS = { Disponibile: "success", "In arrivo": "warning", Esaurito: "error" };

const columns = [
  {
    field: "name",
    headerName: "Prodotto",
    flex: 1,
    // component="span": un <p> andrebbe a capo dentro la cella e
    // non resterebbe centrato verticalmente; uno <span> sì
    renderCell: ({ value }) => (
      <Typography component="span" variant="body2" sx={{ fontWeight: "bold" }}>
        {value}
      </Typography>
    ),
  },
  {
    field: "stock",
    headerName: "Disponibilità",
    width: 140,
    renderCell: ({ value }) => (
      <Chip label={value} size="small" color={STOCK_COLORS[value] ?? "default"} />
    ),
  },
  {
    field: "price",
    headerName: "Prezzo",
    type: "number",
    // Anche la riga intera è disponibile: qui serve per lo sconto
    renderCell: ({ value, row }) => (row.discount ? value + " € (scontato)" : value + " €"),
  },
];`,
      },
      {
        type: "info",
        content:
          "Differenza pratica: `valueFormatter` restituisce **testo** e basta; `renderCell` restituisce **JSX** e può contenere qualsiasi componente. Quando ti serve solo cambiare il formato, preferisci `valueFormatter`: è più semplice e più leggero da disegnare.",
      },
      {
        type: "heading",
        content: "Props utili per adattare la griglia",
      },
      {
        type: "text",
        content:
          "Non sempre servono tutte le funzioni della DataGrid. Per una piccola tabella di riepilogo con poche righe, per esempio, paginazione, menu e selezione sono solo d'intralcio. Molte props booleane servono proprio a spegnerle; come per ogni prop booleana in JSX, scrivere solo il nome equivale a passare `true`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Una griglia compatta di riepilogo",
        code: `<DataGrid
  rows={rows}
  columns={columns}
  density="compact"            // righe più basse: "compact", "standard" (default), "comfortable"
  autoHeight                   // l'altezza si adatta al numero di righe
  hideFooter                   // niente footer (né paginazione né conteggio)
  disableColumnMenu            // niente menu con i tre puntini sulle colonne
  disableColumnSorting         // clic sull'intestazione non ordina
  disableColumnFilter          // niente filtri nel menu della colonna
  disableRowSelectionOnClick   // il clic su una riga non la seleziona
  localeText={{ noRowsLabel: "Nessun ordine da mostrare" }}
/>`,
      },
      {
        type: "list",
        items: [
          "`autoHeight` fa crescere la griglia quanto serve per mostrare tutte le righe della pagina: comodo per tabelle piccole, sconsigliato con migliaia di righe (usa un contenitore con altezza fissa).",
          "`localeText` permette di cambiare i testi della griglia. `noRowsLabel` è il messaggio mostrato quando `rows` è vuoto: molto meglio di una tabella vuota senza spiegazioni.",
          "Le props `disable...` si possono usare anche sulle singole colonne: `sortable: false`, `filterable: false`, `disableColumnMenu: true` nella definizione della colonna.",
        ],
      },
      {
        type: "heading",
        content: "initialState: la configurazione iniziale",
      },
      {
        type: "text",
        content:
          "La prop `initialState` imposta lo stato della griglia **solo al primo render**: ordinamento iniziale, dimensione della pagina, colonne nascoste. Dopo, l'utente resta libero di cambiare tutto. Le colonne nascoste si descrivono con `columnVisibilityModel`, un oggetto `{ nomeCampo: false }`: ogni campo che vale `false` parte nascosto, e l'utente può mostrarlo di nuovo dal menu della colonna.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Ordinamento, paginazione e colonne nascoste all'avvio",
        code: `// Le colonne da nascondere all'avvio, come semplice array di nomi
const hiddenFields = ["category", "supplier"];

// Object.fromEntries trasforma [["category", false], ["supplier", false]]
// nell'oggetto { category: false, supplier: false }
const columnVisibilityModel = Object.fromEntries(
  hiddenFields.map((field) => [field, false])
);

<DataGrid
  rows={products}
  columns={columns}
  initialState={{
    columns: { columnVisibilityModel },
    sorting: { sortModel: [{ field: "price", sort: "desc" }] },
    pagination: { paginationModel: { pageSize: 10 } },
  }}
  pageSizeOptions={[10, 25, 50]}
/>`,
      },
      {
        type: "subheading",
        content: "autosizeOnMount: colonne larghe quanto il contenuto",
      },
      {
        type: "text",
        content:
          "Con `autosizeOnMount` la griglia, appena montata, misura il contenuto di ogni colonna e ne adatta la larghezza. Con `autosizeOptions` scegli come misurare: `includeHeaders: true` considera anche il titolo dell'intestazione, così non viene troncato. Il ridimensionamento automatico imposta larghezze in pixel: per questo non va d'accordo con `flex`, che verrebbe annullato.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Larghezze automatiche",
        code: `<DataGrid
  rows={rows}
  columns={columns}             // colonne senza flex, con minWidth/maxWidth come limiti
  autosizeOnMount
  autosizeOptions={{ includeHeaders: true }}
/>`,
      },
      {
        type: "heading",
        content: "Colonne costruite dai dati",
      },
      {
        type: "text",
        content:
          "Quando i dati arrivano da un server e non sai in anticipo quali campi conterranno (o non vuoi riscrivere le colonne a mano per ogni tabella), puoi costruire le colonne dalle **chiavi del primo oggetto**: `Object.keys(data[0])` restituisce i nomi dei campi, e con `map` crei una colonna per ognuno. Il calcolo va dentro `useMemo`: se a ogni render creassi un nuovo array `columns`, la griglia penserebbe che le colonne sono cambiate e perderebbe, per esempio, le larghezze impostate dall'utente.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Una griglia che si adatta a qualsiasi array di oggetti",
        code: `import { useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";

// Etichette leggibili per i campi conosciuti; gli altri mostrano il nome del campo
const LABELS = { name: "Nome", grade: "Voto", course: "Corso" };

export default function AutoGrid({ data }) {
  const columns = useMemo(() => {
    // Nessun dato: nessuna colonna (data[0] sarebbe undefined)
    if (!data || data.length === 0) return [];
    return Object.keys(data[0]).map((key) => ({
      field: key,
      headerName: LABELS[key] ?? key,
      minWidth: 120,
      flex: 1,
      // Lo spread di false non aggiunge nulla: type solo per i numeri
      ...(typeof data[0][key] === "number" && { type: "number" }),
    }));
  }, [data]);

  return (
    <DataGrid
      rows={data}
      columns={columns}
      autoHeight
      localeText={{ noRowsLabel: "Nessuno studente" }}
    />
  );
}

// <AutoGrid data={[{ id: 1, name: "Luca", course: "Storia", grade: 28 }]} />`,
      },
      {
        type: "warning",
        content:
          "Per lo stesso motivo, se le colonne non dipendono da nulla del componente, definiscile **fuori** dal componente (costante di modulo): vengono create una volta sola. Anche `rows` dovrebbe cambiare solo quando cambiano davvero i dati, non essere ricreato con un `map` a ogni render senza `useMemo`.",
      },
      {
        type: "heading",
        content: "Dati \"per righe\" e griglia pivot",
      },
      {
        type: "text",
        content:
          "Spesso i dati arrivano come un elenco di \"fatti\": una riga per ogni combinazione, per esempio `{ product: \"Tastiera\", month: \"gen\", amount: 120 }`. Per un utente è molto più leggibile una tabella **pivot**: una riga per prodotto e una colonna per mese, con l'importo all'incrocio. La DataGrid vuole comunque un oggetto per riga, quindi prima di passarle i dati devi trasformarli: raggruppi per prodotto e trasformi ogni mese in una proprietà dell'oggetto.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Da elenco di vendite a griglia prodotti x mesi",
        code: `const MONTHS = ["gen", "feb", "mar"];

const sales = [
  { product: "Tastiera", month: "gen", amount: 120 },
  { product: "Mouse", month: "gen", amount: 80 },
  { product: "Tastiera", month: "feb", amount: 150 },
  { product: "Mouse", month: "mar", amount: 95 },
];

function toPivot(sales) {
  const byProduct = {};
  for (const s of sales) {
    // Prima volta che incontro il prodotto: creo la sua riga con tutti i mesi a 0
    byProduct[s.product] ??= {
      id: s.product,
      product: s.product,
      ...Object.fromEntries(MONTHS.map((m) => [m, 0])),
    };
    byProduct[s.product][s.month] += s.amount;
  }

  return {
    columns: [
      { field: "product", headerName: "Prodotto", flex: 1 },
      // Una colonna per mese, generata dall'elenco dei mesi
      ...MONTHS.map((m) => ({ field: m, headerName: m.toUpperCase(), type: "number" })),
    ],
    rows: Object.values(byProduct),
  };
}

// rows:
// [ { id: "Tastiera", product: "Tastiera", gen: 120, feb: 150, mar: 0 },
//   { id: "Mouse",    product: "Mouse",    gen: 80,  feb: 0,   mar: 95 } ]

// Nel componente: const { columns, rows } = useMemo(() => toPivot(sales), [sales]);`,
      },
      {
        type: "tip",
        content:
          "Separa la trasformazione dei dati (una funzione JavaScript pura, come `toPivot`) dal componente che li mostra. Una funzione pura riceve dati e restituisce dati: è facile da leggere, da riusare e da provare con `console.log`, senza dover avviare l'interfaccia.",
      },
      {
        type: "heading",
        content: "Personalizzare l'aspetto con sx",
      },
      {
        type: "text",
        content:
          "La DataGrid accetta la prop `sx` come ogni componente MUI. Per raggiungere le sue parti interne usi i selettori annidati che hai visto nella lezione su `sx`: ogni parte ha una classe che inizia con `MuiDataGrid-`, per esempio `MuiDataGrid-columnHeader` (ogni cella dell'intestazione), `MuiDataGrid-columnHeaderTitle` (il testo del titolo), `MuiDataGrid-row` (ogni riga), `MuiDataGrid-cell` (ogni cella).",
      },
      {
        type: "code",
        language: "javascript",
        title: "Intestazione colorata e righe evidenziate",
        code: `<DataGrid
  rows={rows}
  columns={columns}
  sx={{
    borderRadius: 2,
    "& .MuiDataGrid-columnHeader": {
      bgcolor: "primary.main",
      color: "primary.contrastText",
    },
    "& .MuiDataGrid-columnHeaderTitle": {
      fontWeight: "bold",
    },
    "& .MuiDataGrid-row:hover": {
      bgcolor: "action.hover",
    },
  }}
/>`,
      },
      {
        type: "tip",
        content:
          "Per scoprire il nome della classe di una parte della griglia, ispeziona l'elemento con gli strumenti per sviluppatori del browser (tasto destro, \"Ispeziona\"): le classi `MuiDataGrid-...` sono ben visibili e stabili.",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "Righe senza id",
        description:
          "I dati di una griglia hanno questa forma:\n`[{ code: \"A1\", name: \"Tastiera\" }, { code: \"B7\", name: \"Mouse\" }]`\nQual è il modo corretto per mostrarli in una DataGrid?",
        difficulty: "facile",
        options: [
          "Aggiungere una colonna `{ field: \"id\" }` alle columns",
          "Non serve fare nulla: la griglia usa l'indice della riga",
          "Passare `getRowId={(row) => row.code}`",
          "Passare `rowId=\"code\"` alla DataGrid",
        ],
        correct: 2,
        explanation:
          "La DataGrid cerca l'identificativo di ogni riga nella proprietà `id`; se si chiama diversamente, `getRowId` riceve la riga e restituisce il suo identificativo, qui `row.code`. Aggiungere una colonna non crea il dato `id` nelle righe; la griglia non usa l'indice (segnala un errore se manca l'id); `rowId` non è una prop della DataGrid.",
      },
      {
        type: "multiple-choice",
        title: "valueFormatter o renderCell?",
        description:
          "In una colonna `total` i valori sono numeri come `59.9`. Vuoi mostrarli come `59.90 €`, mantenendo l'ordinamento numerico. Quale soluzione è la più adatta?",
        difficulty: "medio",
        options: [
          "`valueFormatter: (value) => value.toFixed(2) + \" €\"`",
          "Trasformare le righe prima, con `total: row.total.toFixed(2) + \" €\"`",
          "`renderCell: ({ value }) => <Chip label={value + \" €\"} />`",
          "`headerName: \"Totale €\"` e lasciare i valori così",
        ],
        correct: 0,
        explanation:
          "`valueFormatter` cambia solo il testo mostrato: il valore resta il numero 59.9, quindi l'ordinamento rimane numerico. Trasformare le righe in stringhe rovina l'ordinamento (\"100.00 €\" verrebbe prima di \"59.90 €\"). `renderCell` con un Chip funziona ma è più pesante e cambia l'aspetto senza motivo. Cambiare solo l'intestazione non formatta i valori.",
      },
      {
        type: "multiple-choice",
        title: "Colonne ricreate a ogni render",
        description:
          "Un componente calcola le colonne così:\n`const columns = Object.keys(data[0]).map((key) => ({ field: key }));`\nDue problemi possibili: quale coppia è corretta?",
        difficulty: "difficile",
        options: [
          "`Object.keys` non funziona sugli oggetti delle righe e `map` modifica `data`",
          "Le colonne devono sempre essere scritte a mano e `field` non accetta variabili",
          "Le colonne sono ricreate a ogni render (manca `useMemo`) e se `data` è vuoto `data[0]` è undefined, quindi `Object.keys` lancia un errore",
          "Manca `headerName`, che è obbligatorio, e `field` deve essere un numero",
        ],
        correct: 2,
        explanation:
          "Senza `useMemo` a ogni render nasce un nuovo array `columns` e la griglia lo tratta come colonne nuove (perdendo, per esempio, le larghezze impostate dall'utente). Inoltre con `data = []` si ha `Object.keys(undefined)`, che lancia un errore: serve un controllo prima. `Object.keys` funziona su qualsiasi oggetto e `map` non modifica l'array; `headerName` è facoltativo e `field` è una stringa.",
      },
      {
        type: "multiple-choice",
        title: "Colonne nascoste all'avvio",
        description:
          "Vuoi che la colonna `supplier` parta nascosta, ma che l'utente possa mostrarla dal menu della colonna. Quale codice usi?",
        difficulty: "medio",
        options: [
          "Togliere la colonna `supplier` dall'array `columns`",
          "`sx={{ \"& .supplier\": { display: \"none\" } }}`",
          "`hideFooter` sulla DataGrid",
          "`initialState={{ columns: { columnVisibilityModel: { supplier: false } } }}`",
        ],
        correct: 3,
        explanation:
          "`initialState` imposta lo stato solo all'avvio: la colonna parte nascosta, ma l'utente può farla riapparire. Togliere la colonna da `columns` la elimina del tutto, senza possibilità di mostrarla. Nascondere con il CSS non aggiorna la griglia (resterebbe lo spazio dell'intestazione). `hideFooter` nasconde il footer, non le colonne.",
      },
      {
        type: "code",
        title: "Formattare le date",
        description:
          "Le date degli ordini arrivano nel formato `\"aaaa-mm-gg\"`. Scrivi la funzione `formatDate(value)` da usare come `valueFormatter`:\n- `formatDate(\"2026-06-01\")` deve restituire `\"01/06/2026\"`.\n- Se il valore manca (`null`, `undefined` o stringa vuota) deve restituire `\"-\"`.\n\nStampa poi il risultato per `\"2026-12-25\"`.",
        difficulty: "facile",
        starterCode: `function formatDate(value) {
  // Trasforma "aaaa-mm-gg" in "gg/mm/aaaa"
}

console.log(formatDate("2026-12-25"));`,
        solution: `function formatDate(value) {
  if (!value) return "-";
  const [year, month, day] = value.split("-");
  return day + "/" + month + "/" + year;
}

console.log(formatDate("2026-12-25"));`,
        validate: `if (typeof formatDate !== "function") return "Definisci la funzione formatDate";
if (formatDate("2026-06-01") !== "01/06/2026") return "formatDate(\\"2026-06-01\\") dovrebbe restituire \\"01/06/2026\\", invece restituisce " + $format(formatDate("2026-06-01"));
if (formatDate("1999-01-31") !== "31/01/1999") return "formatDate(\\"1999-01-31\\") dovrebbe restituire \\"31/01/1999\\"";
for (const empty of [null, undefined, ""]) {
  let r;
  try { r = formatDate(empty); } catch (e) { return "formatDate(" + $format(empty) + ") lancia un errore: controlla prima se il valore manca"; }
  if (r !== "-") return "formatDate(" + $format(empty) + ") dovrebbe restituire \\"-\\"";
}
if (!$logs.includes("25/12/2026")) return "Stampa con console.log il risultato di formatDate(\\"2026-12-25\\")";
return true;`,
      },
      {
        type: "code",
        title: "Colonne dalle chiavi del primo oggetto",
        description:
          "Scrivi la funzione `buildColumns(data, labels)` che costruisce le colonne di una DataGrid a partire da un array di oggetti:\n- se `data` è vuoto restituisce `[]`;\n- altrimenti crea una colonna per ogni chiave del primo oggetto, nello stesso ordine, nella forma `{ field: chiave, headerName: etichetta, flex: 1 }`;\n- l'etichetta è `labels[chiave]` se esiste, altrimenti la chiave stessa;\n- se il valore di quella chiave nel primo oggetto è un numero, la colonna ha anche `type: \"number\"`.\n\nEsempio: con `[{ id: 1, name: \"Luca\", grade: 28 }]` e `{ name: \"Nome\" }` il risultato è\n`[{ field: \"id\", headerName: \"id\", flex: 1, type: \"number\" }, { field: \"name\", headerName: \"Nome\", flex: 1 }, { field: \"grade\", headerName: \"grade\", flex: 1, type: \"number\" }]`.",
        difficulty: "medio",
        starterCode: `const students = [
  { id: 1, name: "Luca", course: "Storia", grade: 28 },
  { id: 2, name: "Anna", course: "Fisica", grade: 30 },
];
const LABELS = { name: "Nome", course: "Corso", grade: "Voto" };

function buildColumns(data, labels) {
  // Una colonna per ogni chiave di data[0]
}

console.log(buildColumns(students, LABELS));`,
        solution: `const students = [
  { id: 1, name: "Luca", course: "Storia", grade: 28 },
  { id: 2, name: "Anna", course: "Fisica", grade: 30 },
];
const LABELS = { name: "Nome", course: "Corso", grade: "Voto" };

function buildColumns(data, labels) {
  if (data.length === 0) return [];
  return Object.keys(data[0]).map((key) => ({
    field: key,
    headerName: labels[key] ?? key,
    flex: 1,
    ...(typeof data[0][key] === "number" && { type: "number" }),
  }));
}

console.log(buildColumns(students, LABELS));`,
        solutionExplanation:
          "`Object.keys(data[0])` dà i nomi dei campi nell'ordine dell'oggetto; `map` li trasforma in colonne. `labels[key] ?? key` usa l'etichetta solo se esiste. Lo spread condizionale `...(condizione && { type: \"number\" })` aggiunge la proprietà solo per i numeri: quando la condizione è falsa si fa lo spread di `false`, che non aggiunge nulla. Il controllo iniziale evita l'errore su `data[0]` con un array vuoto.",
        validate: `if (typeof buildColumns !== "function") return "Definisci la funzione buildColumns";
let empty;
try { empty = buildColumns([], {}); } catch (e) { return "Con un array vuoto buildColumns lancia un errore: restituisci [] prima di leggere data[0]"; }
if (!$equal(empty, [])) return "Con un array vuoto buildColumns deve restituire []";
const r1 = buildColumns([{ id: 1, name: "Luca", grade: 28 }], { name: "Nome" });
const e1 = [
  { field: "id", headerName: "id", flex: 1, type: "number" },
  { field: "name", headerName: "Nome", flex: 1 },
  { field: "grade", headerName: "grade", flex: 1, type: "number" },
];
if (!Array.isArray(r1)) return "buildColumns deve restituire un array di colonne";
if (r1.length !== 3) return "Serve una colonna per ogni chiave del primo oggetto (qui 3), ne hai create " + r1.length;
if (!$equal(r1.map((c) => c && c.field), ["id", "name", "grade"])) return "I field devono essere le chiavi del primo oggetto, nello stesso ordine";
if (r1[0].headerName !== "id") return "Se manca l'etichetta in labels, headerName deve essere la chiave stessa";
if (r1[1].headerName !== "Nome") return "headerName deve essere labels[chiave] quando esiste";
if (r1[1].type !== undefined) return "La colonna name non contiene un numero: non deve avere la proprietà type";
if (!$equal(r1, e1)) return "Ogni colonna deve essere { field, headerName, flex: 1 } più type: \\"number\\" se il valore è un numero. Hai ottenuto: " + $format(r1);
const r2 = buildColumns([{ title: "Dune", year: 1965 }, { title: "Emma", year: 1815, extra: true }], { title: "Titolo", year: "Anno" });
if (!$equal(r2, [{ field: "title", headerName: "Titolo", flex: 1 }, { field: "year", headerName: "Anno", flex: 1, type: "number" }])) return "Con altri dati il risultato non è corretto: usa solo le chiavi del PRIMO oggetto. Hai ottenuto: " + $format(r2);
return true;`,
      },
      {
        type: "code",
        title: "Griglia pivot delle vendite",
        description:
          "Scrivi `toPivot(sales, months)` che trasforma un elenco di vendite `{ product, month, amount }` nei dati di una griglia con una riga per prodotto e una colonna per mese. Deve restituire `{ columns, rows }`:\n- `columns`: prima `{ field: \"product\", headerName: \"Prodotto\" }`, poi per ogni mese `m` di `months` la colonna `{ field: m, headerName: m, type: \"number\" }` (puoi aggiungere altre proprietà come `flex`).\n- `rows`: una riga per prodotto, nell'ordine in cui il prodotto compare la prima volta, nella forma `{ id: prodotto, product: prodotto, gen: ..., feb: ..., ... }`. I mesi senza vendite valgono `0`; se lo stesso prodotto ha più vendite nello stesso mese, gli importi si sommano.",
        difficulty: "difficile",
        starterCode: `const MONTHS = ["gen", "feb", "mar"];
const sales = [
  { product: "Tastiera", month: "gen", amount: 120 },
  { product: "Mouse", month: "gen", amount: 80 },
  { product: "Tastiera", month: "feb", amount: 150 },
  { product: "Mouse", month: "mar", amount: 95 },
  { product: "Tastiera", month: "feb", amount: 30 },
];

function toPivot(sales, months) {
  // Costruisci columns e rows
}

console.log(toPivot(sales, MONTHS));`,
        solution: `const MONTHS = ["gen", "feb", "mar"];
const sales = [
  { product: "Tastiera", month: "gen", amount: 120 },
  { product: "Mouse", month: "gen", amount: 80 },
  { product: "Tastiera", month: "feb", amount: 150 },
  { product: "Mouse", month: "mar", amount: 95 },
  { product: "Tastiera", month: "feb", amount: 30 },
];

function toPivot(sales, months) {
  const columns = [
    { field: "product", headerName: "Prodotto", flex: 1 },
    ...months.map((m) => ({ field: m, headerName: m, type: "number" })),
  ];

  const byProduct = {};
  for (const s of sales) {
    byProduct[s.product] ??= {
      id: s.product,
      product: s.product,
      ...Object.fromEntries(months.map((m) => [m, 0])),
    };
    byProduct[s.product][s.month] += s.amount;
  }

  return { columns, rows: Object.values(byProduct) };
}

console.log(toPivot(sales, MONTHS));`,
        solutionExplanation:
          "Le colonne nascono da `months.map`, precedute dalla colonna fissa del prodotto. Per le righe si usa un oggetto come \"indice\" per prodotto: `??=` crea la riga solo la prima volta, con tutti i mesi a 0 grazie a `Object.fromEntries`; poi `+=` somma l'importo nel mese giusto. `Object.values` restituisce le righe nell'ordine di inserimento.",
        validate: `if (typeof toPivot !== "function") return "Definisci la funzione toPivot";
const pick = (cols) => cols.map((c) => ({ field: c.field, headerName: c.headerName, type: c.type }));
const data1 = [
  { product: "Tastiera", month: "gen", amount: 120 },
  { product: "Mouse", month: "gen", amount: 80 },
  { product: "Tastiera", month: "feb", amount: 150 },
  { product: "Mouse", month: "mar", amount: 95 },
  { product: "Tastiera", month: "feb", amount: 30 },
];
const r1 = toPivot(data1, ["gen", "feb", "mar"]);
if (!r1 || !Array.isArray(r1.columns) || !Array.isArray(r1.rows)) return "toPivot deve restituire un oggetto { columns, rows } con due array";
if (!$equal(pick(r1.columns), [
  { field: "product", headerName: "Prodotto", type: undefined },
  { field: "gen", headerName: "gen", type: "number" },
  { field: "feb", headerName: "feb", type: "number" },
  { field: "mar", headerName: "mar", type: "number" },
])) return "columns non è corretto: serve { field: \\"product\\", headerName: \\"Prodotto\\" } seguita da una colonna { field: m, headerName: m, type: \\"number\\" } per ogni mese";
if (r1.rows.length !== 2) return "Serve una riga per prodotto (qui 2), ne hai " + r1.rows.length;
const exp1 = [
  { id: "Tastiera", product: "Tastiera", gen: 120, feb: 180, mar: 0 },
  { id: "Mouse", product: "Mouse", gen: 80, feb: 0, mar: 95 },
];
if (r1.rows[0] && r1.rows[0].mar === undefined) return "I mesi senza vendite devono valere 0 (es. Tastiera a marzo)";
if (r1.rows[0] && r1.rows[0].feb === 30) return "Le vendite dello stesso prodotto nello stesso mese vanno sommate, non sovrascritte";
if (!$equal(r1.rows, exp1)) return "rows non è corretto. Atteso: " + $format(exp1) + " - ottenuto: " + $format(r1.rows);
const r2 = toPivot([{ product: "Cuffie", month: "apr", amount: 10 }], ["mar", "apr"]);
if (!$equal(r2.rows, [{ id: "Cuffie", product: "Cuffie", mar: 0, apr: 10 }])) return "Usa il parametro months, non la costante MONTHS: con months = [\\"mar\\", \\"apr\\"] il risultato non è corretto";
if (r2.columns.length !== 3) return "Le colonne devono essere generate dal parametro months";
if (!$equal(toPivot([], ["gen"]).rows, [])) return "Con nessuna vendita rows deve essere []";
return true;`,
      },
      {
        type: "code",
        title: "La griglia dei libri",
        description:
          "Completa il componente che mostra il catalogo `books` (gli oggetti hanno `isbn`, `title`, `price`, `available`).\n- Nella colonna `price` aggiungi un `valueFormatter` che mostra il prezzo seguito da `\" €\"`.\n- Nella colonna `available` aggiungi un `renderCell` che mostra un `Chip` con etichetta `\"Sì\"` o `\"No\"` in base al valore.\n- Sulla DataGrid: l'id è nel campo `isbn` (usa `getRowId`), densità compatta, altezza automatica, nessuna selezione al clic e il messaggio `\"Nessun libro\"` quando non ci sono righe.",
        difficulty: "medio",
        mode: "static",
        starterCode: `import { Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "title", headerName: "Titolo", flex: 1 },
  { field: "price", headerName: "Prezzo", type: "number", width: 110 },
  { field: "available", headerName: "Disponibile", width: 130 },
];

export default function BookGrid({ books }) {
  return <DataGrid rows={books} columns={columns} />;
}`,
        solution: `import { Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "title", headerName: "Titolo", flex: 1 },
  {
    field: "price",
    headerName: "Prezzo",
    type: "number",
    width: 110,
    valueFormatter: (value) => value + " €",
  },
  {
    field: "available",
    headerName: "Disponibile",
    width: 130,
    renderCell: ({ value }) => (
      <Chip label={value ? "Sì" : "No"} size="small" color={value ? "success" : "default"} />
    ),
  },
];

export default function BookGrid({ books }) {
  return (
    <DataGrid
      rows={books}
      columns={columns}
      getRowId={(row) => row.isbn}
      density="compact"
      autoHeight
      disableRowSelectionOnClick
      localeText={{ noRowsLabel: "Nessun libro" }}
    />
  );
}`,
        solutionExplanation:
          "`valueFormatter` riceve il valore e restituisce il testo da mostrare; `renderCell` riceve un oggetto di parametri da cui si prende `value` e restituisce JSX. Le altre richieste sono props della DataGrid: `getRowId` indica dove trovare l'identificativo, le props booleane (`autoHeight`, `disableRowSelectionOnClick`) si scrivono solo con il nome.",
        validate: `const c = $codeNoComments;
if (!/import\\s*\\{[^}]*\\bDataGrid\\b[^}]*\\}\\s*from\\s*["']@mui\\/x-data-grid["']/.test(c)) return "Importa DataGrid da \\"@mui/x-data-grid\\"";
if (!/field:\\s*["']price["'][^}]*valueFormatter:\\s*\\(?\\s*\\w+[^)]*\\)?\\s*=>[^,}]*€/.test(c)) return "Nella colonna price aggiungi valueFormatter: (value) => value + \\" €\\"";
if (!/renderCell:/.test(c)) return "Nella colonna available aggiungi renderCell";
if (!/renderCell:[\\s\\S]*<Chip[^>]*label=\\{[^}]*["']Sì["'][^}]*["']No["']/.test(c)) return "Il renderCell deve restituire un <Chip> con label \\"Sì\\" o \\"No\\" in base a value, es. label={value ? \\"Sì\\" : \\"No\\"}";
if (!/getRowId=\\{\\s*\\(?\\s*(\\w+)\\s*\\)?\\s*=>\\s*\\1\\.isbn\\s*\\}/.test(c)) return "Indica l'id con getRowId={(row) => row.isbn}";
if (!/density=["']compact["']/.test(c)) return "Imposta la densità compatta con density=\\"compact\\"";
if (!/<DataGrid[\\s\\S]*\\bautoHeight\\b/.test(c)) return "Aggiungi la prop autoHeight alla DataGrid";
if (!/\\bdisableRowSelectionOnClick\\b/.test(c)) return "Aggiungi disableRowSelectionOnClick per evitare la selezione al clic";
if (!/localeText=\\{\\{\\s*noRowsLabel:\\s*["']Nessun libro["']\\s*,?\\s*\\}\\}/.test(c)) return "Imposta il messaggio con localeText={{ noRowsLabel: \\"Nessun libro\\" }}";
return true;`,
      },
    ],
  },

  "editable-grid": {
    sections: [
      {
        type: "text",
        content:
          "Una DataGrid non serve solo a mostrare dati: l'utente può anche modificarli direttamente nelle celle, come in un foglio di calcolo. In questa lezione vediamo come rendere le colonne modificabili, come salvare le modifiche (per esempio su un server), come aggiungere ed eliminare righe e, alla fine, come raccogliere tutto in un componente tabella riutilizzabile. L'esempio della lezione è l'elenco delle attività di un team.",
      },
      {
        type: "heading",
        content: "Colonne modificabili",
      },
      {
        type: "text",
        content:
          "Per rendere modificabile una colonna basta aggiungere `editable: true` nella sua definizione. Con un doppio clic sulla cella (oppure premendo Invio quando la cella ha il focus) compare un campo di input adatto al tipo della colonna: testo per `\"string\"`, numero per `\"number\"`, una casella di spunta per `\"boolean\"`.\n\nPer scegliere un valore da un elenco fisso usa `type: \"singleSelect\"` con `valueOptions`, l'array delle scelte possibili: al posto del campo di testo compare un menu a tendina.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Attività di un team: colonne modificabili",
        code: `const STATUSES = ["Da fare", "In corso", "Completata"];

const initialTasks = [
  { id: 1, title: "Preparare la presentazione", owner: "Giulia", hours: 4, status: "In corso" },
  { id: 2, title: "Aggiornare la documentazione", owner: "Marco", hours: 2, status: "Da fare" },
  { id: 3, title: "Rivedere il calendario", owner: "Sara", hours: 1, status: "Completata" },
];

const columns = [
  { field: "id", headerName: "ID", width: 70 },              // non modificabile
  { field: "title", headerName: "Attività", flex: 1, editable: true },
  { field: "owner", headerName: "Responsabile", width: 140, editable: true },
  { field: "hours", headerName: "Ore", type: "number", width: 90, editable: true },
  {
    field: "status",
    headerName: "Stato",
    width: 140,
    editable: true,
    type: "singleSelect",
    valueOptions: STATUSES,   // le scelte del menu a tendina
  },
];

<DataGrid rows={initialTasks} columns={columns} />`,
      },
      {
        type: "subheading",
        content: "Modifica per cella o per riga",
      },
      {
        type: "text",
        content:
          "Di default la griglia usa la modifica **per cella**: si modifica una cella alla volta, Invio (o un clic altrove) conferma, Esc annulla. Con la prop `editMode=\"row\"` si passa alla modifica **per riga**: il doppio clic apre in modifica tutte le celle modificabili della riga, Tab passa da una cella all'altra, e la modifica viene confermata solo quando premi Invio o il focus lascia la riga. La modalità per riga è comoda quando i campi vanno compilati insieme, per esempio per una nuova riga.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Modifica per riga",
        code: `<DataGrid
  rows={tasks}
  columns={columns}
  editMode="row"   // una riga intera alla volta
/>`,
      },
      {
        type: "heading",
        content: "processRowUpdate: salvare le modifiche",
      },
      {
        type: "text",
        content:
          "Quando l'utente conferma una modifica, la griglia chiama la funzione che le passi nella prop `processRowUpdate`, con due argomenti: `newRow` (la riga con i nuovi valori) e `oldRow` (la riga com'era prima). Il valore che restituisci è la riga che la griglia mostrerà da quel momento:\n- restituisci `newRow` per accettare la modifica;\n- restituisci `oldRow` per scartarla e tornare ai valori precedenti.\n\nLa funzione può essere `async`: puoi aspettare con `await` il salvataggio sul server prima di restituire la riga. Se la funzione **lancia un errore** (o la Promise viene rifiutata), la modifica non viene applicata e la griglia chiama `onProcessRowUpdateError` con l'errore, dove puoi mostrare un messaggio. Con la modifica per cella la cella torna al valore precedente; con `editMode=\"row\"` la riga resta aperta in modifica, così l'utente può correggere il valore e riprovare.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Salvare una riga modificata",
        code: `import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

// Salvataggio simulato: in un'app vera qui ci sarebbe una richiesta HTTP
function saveTask(task) {
  return new Promise((resolve) => setTimeout(resolve, 300));
}

export default function TaskGrid() {
  const [tasks, setTasks] = useState(initialTasks);

  const handleProcessRowUpdate = async (newRow, oldRow) => {
    await saveTask(newRow);          // se lancia un errore, la modifica non passa
    // Aggiorno anche lo stato: sostituisco la riga con lo stesso id
    setTasks((current) =>
      current.map((task) => (task.id === newRow.id ? newRow : task))
    );
    return newRow;                   // la riga che la griglia mostrerà
  };

  return (
    <DataGrid
      rows={tasks}
      columns={columns}
      processRowUpdate={handleProcessRowUpdate}
      onProcessRowUpdateError={(error) => console.error(error.message)}
    />
  );
}`,
      },
      {
        type: "warning",
        content:
          "Senza `onProcessRowUpdateError`, un errore lanciato da `processRowUpdate` resta senza gestione e la griglia stampa un avviso nella console. Passala sempre, anche solo per registrare l'errore: è il punto giusto per mostrare all'utente un messaggio come \"Salvataggio non riuscito\".",
      },
      {
        type: "subheading",
        content: "Nulla è cambiato? Non salvare",
      },
      {
        type: "text",
        content:
          "In modalità riga, se l'utente apre una riga in modifica e poi esce senza toccare nulla, la conferma arriva comunque. Inutile disturbare il server: confronta le due righe. Per oggetti semplici (con valori stringa, numero, booleano) il modo più rapido è confrontare le loro versioni JSON: `JSON.stringify` trasforma l'oggetto in una stringa, e due stringhe si confrontano con `===`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Saltare il salvataggio se non ci sono modifiche",
        code: `const handleProcessRowUpdate = async (newRow, oldRow) => {
  // Stessa stringa JSON = stessi valori: niente da salvare
  if (JSON.stringify(newRow) === JSON.stringify(oldRow)) return oldRow;

  await saveTask(newRow);
  return newRow;
};`,
      },
      {
        type: "info",
        content:
          "`JSON.stringify` tiene conto anche dell'ordine delle proprietà: `{ a: 1, b: 2 }` e `{ b: 2, a: 1 }` danno stringhe diverse. Qui non è un problema, perché `newRow` è una copia di `oldRow` con alcuni valori cambiati e le proprietà restano nello stesso ordine.",
      },
      {
        type: "subheading",
        content: "Validare prima di salvare",
      },
      {
        type: "text",
        content:
          "`processRowUpdate` è anche il posto giusto per controllare i valori inseriti. Se un valore non va bene hai due strade: restituire `oldRow`, così la riga torna silenziosamente come prima, oppure lanciare un errore con un messaggio chiaro, che arriverà a `onProcessRowUpdateError` e che puoi mostrare all'utente.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Controlli sui valori",
        code: `const handleProcessRowUpdate = async (newRow, oldRow) => {
  if (JSON.stringify(newRow) === JSON.stringify(oldRow)) return oldRow;

  // Un titolo fatto solo di spazi non è un titolo
  if (newRow.title.trim() === "") {
    throw new Error("Il titolo non può essere vuoto");
  }
  // Le ore devono essere un numero tra 0 e 40 (NaN fallisce entrambi i confronti)
  if (!(newRow.hours >= 0 && newRow.hours <= 40)) {
    throw new Error("Le ore devono essere tra 0 e 40");
  }

  await saveTask(newRow);
  return newRow;
};

<DataGrid
  rows={tasks}
  columns={columns}
  processRowUpdate={handleProcessRowUpdate}
  onProcessRowUpdateError={(error) => setErrorMessage(error.message)}
/>`,
      },
      {
        type: "heading",
        content: "Controllare la griglia dal codice: useGridApiRef",
      },
      {
        type: "text",
        content:
          "Alcune azioni non si fanno con le props ma \"comandando\" la griglia: tornare alla prima pagina, togliere l'ordinamento, aprire una riga in modifica. Per questo MUI X offre l'hook `useGridApiRef`: funziona come `useRef`, crei il riferimento, lo passi alla prop `apiRef` e da quel momento `apiRef.current` contiene i metodi della griglia.",
      },
      {
        type: "code",
        language: "javascript",
        title: "I metodi più utili di apiRef",
        code: `import { DataGrid, useGridApiRef } from "@mui/x-data-grid";

export default function TaskGrid() {
  const apiRef = useGridApiRef();

  const goToTop = () => {
    apiRef.current.setSortModel([]);   // nessun ordinamento
    apiRef.current.setPage(0);         // prima pagina (si conta da 0)
  };

  const editFirstTask = () => {
    // Apre la riga con id 1 in modifica, con il cursore nella colonna "title"
    apiRef.current.startRowEditMode({ id: 1, fieldToFocus: "title" });
  };

  return <DataGrid apiRef={apiRef} rows={tasks} columns={columns} editMode="row" />;
}`,
      },
      {
        type: "heading",
        content: "Aggiungere una riga",
      },
      {
        type: "text",
        content:
          "Per aggiungere una riga crei un oggetto con tutti i campi vuoti e lo metti **in cima** all'array delle righe, in modo immutabile (`[nuovaRiga, ...righe]`), così compare nella prima pagina. Finché il server non lo salva, non ha un id vero: gli dai un id temporaneo riconoscibile, per esempio `\"new-\" + Date.now()` (`Date.now()` restituisce i millisecondi trascorsi dal 1970, quindi è diverso a ogni clic).\n\nSubito dopo vorresti aprire la riga in modifica, ma c'è un problema: `setTasks` non aggiorna la griglia all'istante, la nuova riga esiste solo dal render successivo. Per questo salvi l'id in uno stato (`pendingEditId`) e chiami `startRowEditMode` in un `useEffect`, che viene eseguito **dopo** il render.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Nuova riga in cima, aperta in modifica",
        code: `const [tasks, setTasks] = useState(initialTasks);
const [pendingEditId, setPendingEditId] = useState(null);
const apiRef = useGridApiRef();

const handleAddRow = () => {
  // { id: "", title: "", owner: "", hours: "", status: "" }
  const emptyRow = Object.fromEntries(columns.map((col) => [col.field, ""]));
  const newId = "new-" + Date.now();

  // Con un ordinamento attivo la riga potrebbe finire altrove
  apiRef.current.setSortModel([]);
  apiRef.current.setPage(0);

  setTasks((current) => [{ ...emptyRow, id: newId }, ...current]);
  setPendingEditId(newId);
};

// Dopo il render la riga esiste nella griglia: ora posso aprirla
useEffect(() => {
  if (!pendingEditId) return;
  apiRef.current.startRowEditMode({ id: pendingEditId, fieldToFocus: "title" });
  setPendingEditId(null);
}, [tasks, pendingEditId, apiRef]);`,
      },
      {
        type: "text",
        content:
          "In `processRowUpdate` riconosci le righe nuove dall'id che inizia con `\"new-\"`: per loro chiami la funzione di creazione invece di quella di aggiornamento. Se l'utente esce da una riga nuova senza scrivere nulla, la riga vuota va semplicemente tolta.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Creazione o aggiornamento",
        code: `const isNewRow = (row) => String(row.id).startsWith("new-");

const handleProcessRowUpdate = async (newRow, oldRow) => {
  if (isNewRow(newRow)) {
    // Uscito senza scrivere: elimino la riga vuota
    if (JSON.stringify(newRow) === JSON.stringify(oldRow)) {
      setTasks((current) => current.filter((t) => t.id !== newRow.id));
      return oldRow;
    }
    await createTask(newRow);
  } else if (JSON.stringify(newRow) !== JSON.stringify(oldRow)) {
    await updateTask(newRow);
  }
  setTasks((current) => current.map((t) => (t.id === newRow.id ? newRow : t)));
  return newRow;
};`,
      },
      {
        type: "heading",
        content: "Eliminare la riga selezionata",
      },
      {
        type: "text",
        content:
          "Per eliminare serve sapere quale riga è selezionata. La selezione si controlla come un input controllato, con una coppia di props:\n- `rowSelectionModel`: le righe selezionate. Ha la forma `{ type: \"include\", ids: new Set([...]) }`, cioè \"sono selezionate le righe con questi id\", in un `Set`.\n- `onRowSelectionModelChange`: chiamata quando l'utente cambia la selezione, riceve il nuovo modello.\n\nCon `disableMultipleRowSelection` si può selezionare una sola riga alla volta, quindi basta salvare nello stato un solo id. Prima di eliminare una riga già salvata, chiedi conferma con `window.confirm(messaggio)`: mostra una finestra del browser con OK e Annulla e restituisce `true` o `false`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Selezione singola ed eliminazione",
        code: `const [selectedId, setSelectedId] = useState(null);

const handleDeleteRow = async () => {
  const task = tasks.find((t) => t.id === selectedId);
  if (!task) return;
  // Le righe nuove esistono solo qui: nessuna conferma, nessuna chiamata al server
  if (!isNewRow(task)) {
    if (!window.confirm("Eliminare \\"" + task.title + "\\"?")) return;
    try {
      await deleteTask(task);
    } catch (error) {
      console.error(error.message);
      return; // la riga resta: sul server esiste ancora
    }
  }
  setTasks((current) => current.filter((t) => t.id !== task.id));
  setSelectedId(null);
};

<DataGrid
  rows={tasks}
  columns={columns}
  disableMultipleRowSelection
  rowSelectionModel={{
    type: "include",
    ids: new Set(selectedId === null ? [] : [selectedId]),
  }}
  // model.ids è un Set: [...model.ids][0] è il primo (e unico) id selezionato
  onRowSelectionModelChange={(model) => setSelectedId([...model.ids][0] ?? null)}
/>`,
      },
      {
        type: "heading",
        content: "Un footer personalizzato con slots",
      },
      {
        type: "text",
        content:
          "Dove mettere i bottoni \"Aggiungi\" ed \"Elimina\"? Un buon posto è il footer della griglia, accanto alla paginazione. Come gli altri componenti MUI, anche la DataGrid permette di sostituire le sue parti con la prop `slots`: `slots={{ footer: CustomFooter }}` usa il tuo componente al posto del footer standard. Dentro, `GridFooterContainer` dà al footer l'aspetto standard (bordo, altezza, elementi ai due lati) e `GridPagination` rimette la paginazione originale.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Bottoni nel footer",
        code: `import { Button, Stack } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { DataGrid, GridFooterContainer, GridPagination } from "@mui/x-data-grid";

// Dentro il componente TaskGrid, così vede handleAddRow e selectedId
const CustomFooter = () => (
  <GridFooterContainer>
    <Stack direction="row" spacing={1} sx={{ ml: 1 }}>
      <Button size="small" startIcon={<Add />} onClick={handleAddRow}>
        Aggiungi
      </Button>
      <Button
        size="small"
        color="error"
        startIcon={<Delete />}
        onClick={handleDeleteRow}
        disabled={selectedId === null}
      >
        Elimina
      </Button>
    </Stack>
    <GridPagination />
  </GridFooterContainer>
);

<DataGrid
  rows={tasks}
  columns={columns}
  slots={{ footer: CustomFooter }}
/>`,
      },
      {
        type: "info",
        content:
          "Definire `CustomFooter` dentro il componente è il modo più semplice per fargli usare stato e funzioni del componente. Ha un costo: a ogni render è un componente \"nuovo\" e React lo ricrea da zero. Per un footer con un paio di bottoni non è un problema; per footer complessi conviene definirlo fuori e passargli i dati con `slotProps={{ footer: { ... } }}`.",
      },
      {
        type: "heading",
        content: "Un componente tabella riutilizzabile",
      },
      {
        type: "text",
        content:
          "Un'app con molte tabelle (attività, utenti, prodotti...) finirebbe per ripetere lo stesso codice ovunque. Conviene scrivere **un solo** componente generico e passargli con le props solo ciò che cambia da una tabella all'altra:\n- `data`: le righe; `idField`: il nome del campo con l'id (usato per `getRowId` e per le righe nuove);\n- `readOnly`: se `true`, niente modifiche né footer con i bottoni;\n- `onCreate`, `onUpdate`, `onDelete`: funzioni async che salvano sul server e lanciano un errore se qualcosa va storto;\n- `onChanged`: chiamata dopo ogni salvataggio riuscito, per esempio per ricaricare i dati.\n\nLe colonne si costruiscono dalle chiavi del primo oggetto, come nella lezione precedente, e `editable` dipende da `readOnly`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "EditableTable: configurata tramite props",
        code: `export default function EditableTable({
  data, idField, readOnly = false, onCreate, onUpdate, onDelete, onChanged,
}) {
  const [rows, setRows] = useState(data);
  const [selectedId, setSelectedId] = useState(null);
  const apiRef = useGridApiRef();

  // Quando arrivano dati nuovi dal genitore, riparto da quelli
  useEffect(() => {
    setRows(data);
    setSelectedId(null);
  }, [data]);

  const columns = useMemo(() => {
    if (data.length === 0) return [];
    return Object.keys(data[0]).map((key) => ({
      field: key,
      headerName: key,
      minWidth: 120,
      // L'id non si modifica mai
      editable: !readOnly && key !== idField,
    }));
  }, [data, idField, readOnly]);

  // ... handleAddRow, handleDeleteRow, handleProcessRowUpdate, CustomFooter
  //     come visti sopra, usando row[idField] al posto di row.id,
  //     onCreate/onUpdate/onDelete per salvare e onChanged?.() dopo

  return (
    <DataGrid
      apiRef={apiRef}
      rows={rows}
      columns={columns}
      getRowId={(row) => row[idField]}
      editMode="row"
      autoHeight
      // Props aggiunte solo se la tabella è modificabile
      {...(!readOnly && {
        slots: { footer: CustomFooter },
        disableMultipleRowSelection: true,
        rowSelectionModel: { type: "include", ids: new Set(selectedId === null ? [] : [selectedId]) },
        onRowSelectionModelChange: (model) => setSelectedId([...model.ids][0] ?? null),
        processRowUpdate: handleProcessRowUpdate,
        onProcessRowUpdateError: (error) => console.error(error.message),
      })}
    />
  );
}

// Uso:
// <EditableTable data={tasks} idField="taskId" onCreate={createTask}
//   onUpdate={updateTask} onDelete={deleteTask} onChanged={reload} />
// <EditableTable data={users} idField="email" readOnly />`,
      },
      {
        type: "text",
        content:
          "La riga `{...(!readOnly && { ... })}` è lo **spread condizionale** applicato alle props JSX: le props di un componente sono un oggetto, e lo spread `{...oggetto}` le aggiunge tutte insieme. Se `readOnly` è `false`, `!readOnly && {...}` vale l'oggetto con le props di modifica, che vengono aggiunte; se `readOnly` è `true`, vale `false` e lo spread di `false` non aggiunge niente. Così un intero gruppo di props si accende o si spegne con una sola condizione.",
      },
      {
        type: "tip",
        content:
          "Quando passi oggetti o array come valori di default delle props (es. `hiddenColumns = []`), definiscili come costanti fuori dal componente (`const NO_FIELDS = [];`). Un `[]` scritto direttamente nei parametri è un array nuovo a ogni render: se finisce nelle dipendenze di un `useMemo`, il calcolo verrebbe rifatto ogni volta.",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "Cosa restituisce processRowUpdate",
        description:
          "Con questa funzione:\n`const handleProcessRowUpdate = async (newRow, oldRow) => {\n  if (newRow.hours < 0) return oldRow;\n  await saveTask(newRow);\n  return newRow;\n};`\nl'utente cambia le ore di un'attività da 4 a -2 e conferma. Cosa succede?",
        difficulty: "medio",
        options: [
          "La griglia mostra -2 e il valore viene salvato",
          "La griglia mostra di nuovo 4 e saveTask non viene chiamata",
          "La griglia mostra -2 ma saveTask non viene chiamata",
          "Viene chiamata onProcessRowUpdateError",
        ],
        correct: 1,
        explanation:
          "La riga restituita da `processRowUpdate` è quella che la griglia mostra: restituendo `oldRow` la modifica viene scartata e le ore tornano a 4. Il `return` avviene prima di `await saveTask`, quindi il salvataggio non parte. `onProcessRowUpdateError` viene chiamata solo se la funzione lancia un errore, cosa che qui non succede.",
      },
      {
        type: "multiple-choice",
        title: "Aprire in modifica la riga appena aggiunta",
        description:
          "Questo codice dovrebbe aggiungere una riga e aprirla subito in modifica, ma `startRowEditMode` segnala che la riga non esiste:\n`setTasks((current) => [{ ...emptyRow, id: newId }, ...current]);\napiRef.current.startRowEditMode({ id: newId });`\nPerché?",
        difficulty: "difficile",
        options: [
          "Perché l'id temporaneo deve essere un numero, non una stringa",
          "Perché startRowEditMode funziona solo con editMode=\"cell\"",
          "Perché la riga andrebbe aggiunta in fondo con push",
          "Perché setTasks non aggiorna la griglia subito: la nuova riga esiste solo dal render successivo, quindi va aperta in un useEffect",
        ],
        correct: 3,
        explanation:
          "Aggiornare lo stato programma un nuovo render, ma non cambia nulla nell'istante in cui la riga successiva viene eseguita: la griglia non ha ancora ricevuto la nuova riga. Salvando l'id in uno stato e chiamando `startRowEditMode` in un `useEffect` (eseguito dopo il render) la riga esiste. Gli id possono essere stringhe; `startRowEditMode` è proprio della modalità per riga; usare `push` muterebbe l'array e non risolverebbe il problema dei tempi.",
      },
      {
        type: "multiple-choice",
        title: "La forma della selezione",
        description:
          "Con `disableMultipleRowSelection`, quale valore di `rowSelectionModel` indica che è selezionata la riga con id 7?",
        difficulty: "facile",
        options: [
          "`{ type: \"include\", ids: new Set([7]) }`",
          "`7`",
          "`[7]`",
          "`{ selected: 7 }`",
        ],
        correct: 0,
        explanation:
          "Nelle versioni attuali di MUI X il modello di selezione è un oggetto: `type: \"include\"` significa \"sono selezionate queste righe\" e `ids` è un `Set` con i loro id. Un numero, un array o un oggetto con altre proprietà non sono il formato atteso, anche con una sola riga selezionabile.",
      },
      {
        type: "multiple-choice",
        title: "Spread condizionale delle props",
        description:
          "Che effetto ha questa riga se `readOnly` vale `true`?\n`<DataGrid rows={rows} columns={columns} {...(!readOnly && { processRowUpdate: save, slots: { footer: CustomFooter } })} />`",
        difficulty: "medio",
        options: [
          "Errore: non si può fare lo spread di un booleano",
          "La DataGrid riceve processRowUpdate e slots con valore false",
          "La DataGrid riceve solo rows e columns: lo spread di false non aggiunge props",
          "La DataGrid riceve la prop readOnly",
        ],
        correct: 2,
        explanation:
          "Con `readOnly` a `true`, `!readOnly && {...}` vale `false`, e lo spread di `false` non aggiunge nulla: la griglia riceve solo `rows` e `columns`. Non è un errore (lo spread di valori falsi è ammesso), le props non diventano `false` una per una e `readOnly` non viene passata, perché non compare nel JSX.",
      },
      {
        type: "code",
        title: "Salvare con validazione",
        description:
          "Scrivi la funzione async `processProductUpdate(newRow, oldRow)` da usare come `processRowUpdate` in una griglia di prodotti (`{ id, name, price }`). La funzione `saveProduct` (già pronta) simula il salvataggio.\n- Se le righe sono uguali (confrontale con `JSON.stringify`) restituisci `oldRow` **senza** salvare.\n- Se `name`, tolti gli spazi, è vuoto, lancia un errore.\n- Se `price` non è un numero maggiore o uguale a 0 (attenzione anche a `NaN`), lancia un errore.\n- Altrimenti aspetta `saveProduct(newRow)` con `await` e restituisci `newRow`.",
        difficulty: "medio",
        starterCode: `// Salvataggio simulato: registra le righe salvate dopo 100 ms
const savedRows = [];
function saveProduct(row) {
  return new Promise((resolve) => {
    setTimeout(() => {
      savedRows.push(row);
      resolve();
    }, 100);
  });
}

async function processProductUpdate(newRow, oldRow) {
  // 1. Niente da salvare?  2. Nome valido?  3. Prezzo valido?  4. Salva
}

const before = { id: 1, name: "Zaino", price: 39 };
const after = { id: 1, name: "Zaino", price: 35 };
const result = await processProductUpdate(after, before);
console.log(result, savedRows.length);`,
        solution: `// Salvataggio simulato: registra le righe salvate dopo 100 ms
const savedRows = [];
function saveProduct(row) {
  return new Promise((resolve) => {
    setTimeout(() => {
      savedRows.push(row);
      resolve();
    }, 100);
  });
}

async function processProductUpdate(newRow, oldRow) {
  if (JSON.stringify(newRow) === JSON.stringify(oldRow)) return oldRow;
  if (newRow.name.trim() === "") throw new Error("Il nome non può essere vuoto");
  if (!(newRow.price >= 0)) throw new Error("Il prezzo deve essere un numero maggiore o uguale a 0");
  await saveProduct(newRow);
  return newRow;
}

const before = { id: 1, name: "Zaino", price: 39 };
const after = { id: 1, name: "Zaino", price: 35 };
const result = await processProductUpdate(after, before);
console.log(result, savedRows.length);`,
        solutionExplanation:
          "L'ordine dei controlli conta: prima si esce subito se non è cambiato nulla, poi si valida, e solo alla fine si salva. `!(newRow.price >= 0)` scarta in un colpo solo i numeri negativi e `NaN` (ogni confronto con `NaN` è falso). Lanciare un errore dentro una funzione async rifiuta la Promise: la griglia non applica la modifica e chiama `onProcessRowUpdateError`.",
        validate: `if (typeof processProductUpdate !== "function") return "Definisci la funzione processProductUpdate";
savedRows.length = 0;
const old1 = { id: 1, name: "Zaino", price: 39 };
const same = await processProductUpdate({ id: 1, name: "Zaino", price: 39 }, old1);
if (same !== old1) return "Se nulla è cambiato devi restituire oldRow";
await new Promise((r) => setTimeout(r, 150));
if (savedRows.length !== 0) return "Se nulla è cambiato non devi chiamare saveProduct";
const rejects = async (row, what) => {
  try { await processProductUpdate(row, old1); } catch (e) { return true; }
  return false;
};
if (!(await rejects({ id: 1, name: "   ", price: 39 }))) return "Con un nome fatto solo di spazi devi lanciare un errore (throw new Error(...))";
if (!(await rejects({ id: 1, name: "Zaino", price: -5 }))) return "Con un prezzo negativo devi lanciare un errore";
if (!(await rejects({ id: 1, name: "Zaino", price: NaN }))) return "Con un prezzo NaN devi lanciare un errore: ricorda che NaN < 0 è false";
await new Promise((r) => setTimeout(r, 150));
if (savedRows.length !== 0) return "Con dati non validi non devi chiamare saveProduct";
const ok = { id: 1, name: "Zaino blu", price: 0 };
const res = await processProductUpdate(ok, old1);
if (savedRows.length === 0) return "Con dati validi aspetta il salvataggio: await saveProduct(newRow) prima di restituire la riga";
if (savedRows[0] !== ok) return "Devi salvare newRow";
if (res !== ok) return "Con dati validi devi restituire newRow";
return true;`,
      },
      {
        type: "code",
        title: "Aggiungere ed eliminare righe in modo immutabile",
        description:
          "Scrivi tre funzioni pure per gestire le righe di una griglia, senza mai modificare l'array ricevuto:\n- `isNewRow(row, idField)`: `true` se l'id della riga (`row[idField]`, convertito in stringa) inizia con `\"new-\"`.\n- `addEmptyRow(rows, fields, idField)`: restituisce un **nuovo** array con in cima una riga in cui ogni campo di `fields` vale `\"\"` e il campo `idField` vale `\"new-\" + Date.now()`, seguita dalle righe esistenti.\n- `deleteRow(rows, id, idField)`: restituisce un nuovo array senza la riga il cui `idField` vale `id`.",
        difficulty: "medio",
        starterCode: `const tasks = [
  { taskId: 1, title: "Preparare la presentazione", owner: "Giulia" },
  { taskId: 2, title: "Aggiornare la documentazione", owner: "Marco" },
];

function isNewRow(row, idField) {}

function addEmptyRow(rows, fields, idField) {}

function deleteRow(rows, id, idField) {}

const withNew = addEmptyRow(tasks, ["taskId", "title", "owner"], "taskId");
console.log(withNew);
console.log(deleteRow(withNew, 1, "taskId"));`,
        solution: `const tasks = [
  { taskId: 1, title: "Preparare la presentazione", owner: "Giulia" },
  { taskId: 2, title: "Aggiornare la documentazione", owner: "Marco" },
];

function isNewRow(row, idField) {
  return String(row[idField]).startsWith("new-");
}

function addEmptyRow(rows, fields, idField) {
  const emptyRow = Object.fromEntries(fields.map((field) => [field, ""]));
  return [{ ...emptyRow, [idField]: "new-" + Date.now() }, ...rows];
}

function deleteRow(rows, id, idField) {
  return rows.filter((row) => row[idField] !== id);
}

const withNew = addEmptyRow(tasks, ["taskId", "title", "owner"], "taskId");
console.log(withNew);
console.log(deleteRow(withNew, 1, "taskId"));`,
        solutionExplanation:
          "`Object.fromEntries` costruisce la riga vuota dall'elenco dei campi; la proprietà calcolata `[idField]` sovrascrive il campo id con quello temporaneo. Lo spread `[nuova, ...rows]` e `filter` creano sempre array nuovi, quindi lo stato originale non viene toccato. `String(...)` serve perché gli id salvati possono essere numeri, che non hanno `startsWith`.",
        validate: `if (typeof isNewRow !== "function") return "Definisci la funzione isNewRow";
if (typeof addEmptyRow !== "function") return "Definisci la funzione addEmptyRow";
if (typeof deleteRow !== "function") return "Definisci la funzione deleteRow";
if (isNewRow({ code: "new-123" }, "code") !== true) return "isNewRow({ code: \\"new-123\\" }, \\"code\\") deve restituire true";
let r;
try { r = isNewRow({ code: 42 }, "code"); } catch (e) { return "isNewRow con un id numerico lancia un errore: converti l'id con String(...)"; }
if (r !== false) return "isNewRow({ code: 42 }, \\"code\\") deve restituire false";
if (isNewRow({ code: "renew-1" }, "code") !== false) return "isNewRow deve controllare che l'id INIZI con \\"new-\\" (usa startsWith)";
const rows = [{ sku: 1, name: "Tastiera", price: 49 }, { sku: 2, name: "Mouse", price: 19 }];
const copy = JSON.stringify(rows);
const added = addEmptyRow(rows, ["sku", "name", "price"], "sku");
if (!Array.isArray(added)) return "addEmptyRow deve restituire un array";
if (JSON.stringify(rows) !== copy) return "addEmptyRow non deve modificare l'array originale";
if (added === rows) return "addEmptyRow deve restituire un NUOVO array";
if (added.length !== 3) return "addEmptyRow deve restituire le righe esistenti più una nuova";
const first = added[0];
if (!first || typeof first.sku !== "string" || !first.sku.startsWith("new-")) return "La nuova riga deve stare in cima e avere come id \\"new-\\" + Date.now()";
if (first.name !== "" || first.price !== "") return "Nella nuova riga ogni campo deve valere \\"\\"";
if (Object.keys(first).length !== 3) return "La nuova riga deve avere esattamente i campi di fields";
if (!/^new-\\d+$/.test(first.sku)) return "L'id temporaneo deve essere \\"new-\\" seguito da Date.now()";
if (added[1] !== rows[0] || added[2] !== rows[1]) return "Dopo la riga nuova devono esserci le righe esistenti, nello stesso ordine";
const del = deleteRow(added, 1, "sku");
if (JSON.stringify(rows) !== copy || added.length !== 3) return "deleteRow non deve modificare l'array ricevuto";
if (!Array.isArray(del) || del.length !== 2 || del.some((x) => x.sku === 1)) return "deleteRow(rows, 1, \\"sku\\") deve togliere la riga con sku 1";
if (!$equal(deleteRow(added, first.sku, "sku"), rows)) return "deleteRow deve funzionare anche con gli id temporanei";
if (!$equal(deleteRow(rows, 99, "sku"), rows)) return "Se l'id non esiste, deleteRow deve restituire tutte le righe";
return true;`,
      },
      {
        type: "code",
        title: "Footer con il bottone Elimina",
        description:
          "Completa la griglia delle attività:\n- Definisci `CustomFooter`: dentro un `GridFooterContainer` mette un `Button` \"Elimina\" con `onClick={handleDeleteRow}`, disabilitato quando `selectedId === null`, seguito da `GridPagination`.\n- Passa il footer alla DataGrid con `slots`.\n- Permetti una sola riga selezionata con `disableMultipleRowSelection`, collega la selezione allo stato con `rowSelectionModel` (forma `{ type: \"include\", ids: new Set(...) }`) e aggiornala in `onRowSelectionModelChange`.\n- Ricordati di importare `GridFooterContainer` e `GridPagination`.",
        difficulty: "difficile",
        mode: "static",
        starterCode: `import { useState } from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function TaskGrid({ tasks, columns, onDelete }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleDeleteRow = () => {
    onDelete(selectedId);
    setSelectedId(null);
  };

  // Definisci CustomFooter

  return <DataGrid rows={tasks} columns={columns} />;
}`,
        solution: `import { useState } from "react";
import { Button } from "@mui/material";
import { DataGrid, GridFooterContainer, GridPagination } from "@mui/x-data-grid";

export default function TaskGrid({ tasks, columns, onDelete }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleDeleteRow = () => {
    onDelete(selectedId);
    setSelectedId(null);
  };

  const CustomFooter = () => (
    <GridFooterContainer>
      <Button color="error" onClick={handleDeleteRow} disabled={selectedId === null}>
        Elimina
      </Button>
      <GridPagination />
    </GridFooterContainer>
  );

  return (
    <DataGrid
      rows={tasks}
      columns={columns}
      slots={{ footer: CustomFooter }}
      disableMultipleRowSelection
      rowSelectionModel={{ type: "include", ids: new Set(selectedId === null ? [] : [selectedId]) }}
      onRowSelectionModelChange={(model) => setSelectedId([...model.ids][0] ?? null)}
    />
  );
}`,
        solutionExplanation:
          "Il footer è un normale componente definito dentro `TaskGrid`, così vede `selectedId` e `handleDeleteRow`. `slots={{ footer: CustomFooter }}` gli dice di usarlo al posto del footer standard (si passa il componente, non `<CustomFooter />`). La selezione è controllata: lo stato contiene un solo id e da esso si ricostruisce il modello con il `Set`; quando l'utente seleziona, si legge il primo id del `Set` con `[...model.ids][0]`.",
        validate: `const c = $codeNoComments;
const imp = c.match(/import\\s*\\{([^}]*)\\}\\s*from\\s*["']@mui\\/x-data-grid["']/);
if (!imp || !/\\bGridFooterContainer\\b/.test(imp[1]) || !/\\bGridPagination\\b/.test(imp[1])) return "Importa GridFooterContainer e GridPagination da \\"@mui/x-data-grid\\"";
if (!/(const|function)\\s+CustomFooter\\b/.test(c)) return "Definisci il componente CustomFooter";
if (!/<GridFooterContainer>[\\s\\S]*<Button[\\s\\S]*<\\/Button>[\\s\\S]*<GridPagination\\s*\\/>[\\s\\S]*<\\/GridFooterContainer>/.test(c)) return "Dentro <GridFooterContainer> metti il <Button> e dopo <GridPagination />";
if (!/<Button[^>]*onClick=\\{\\s*handleDeleteRow\\s*\\}/.test(c)) return "Collega il bottone con onClick={handleDeleteRow}";
if (!/<Button[^>]*disabled=\\{\\s*selectedId\\s*===\\s*null\\s*\\}/.test(c)) return "Disabilita il bottone quando non c'è selezione: disabled={selectedId === null}";
if (!/slots=\\{\\{\\s*footer:\\s*CustomFooter\\s*,?\\s*\\}\\}/.test(c)) return "Passa il footer alla griglia con slots={{ footer: CustomFooter }}";
if (!/<DataGrid[\\s\\S]*\\bdisableMultipleRowSelection\\b/.test(c)) return "Aggiungi disableMultipleRowSelection alla DataGrid";
if (!/rowSelectionModel=\\{\\{\\s*type:\\s*["']include["']\\s*,\\s*ids:\\s*new Set\\(/.test(c)) return "Collega la selezione: rowSelectionModel={{ type: \\"include\\", ids: new Set(...) }}";
if (!/rowSelectionModel=\\{\\{[^\\n]*selectedId/.test(c)) return "Il Set di rowSelectionModel deve essere costruito da selectedId";
if (!/onRowSelectionModelChange=\\{\\s*\\(?\\s*(\\w+)\\s*\\)?\\s*=>[^\\n]*setSelectedId\\([^\\n]*\\1\\.ids/.test(c)) return "In onRowSelectionModelChange leggi l'id da model.ids, es. (model) => setSelectedId([...model.ids][0] ?? null)";
return true;`,
      },
    ],
  },

  charts: {
    sections: [
      {
        type: "text",
        content:
          "Un numero in una tabella dice quanto vale; un grafico mostra a colpo d'occhio come si confrontano i valori. **MUI X Charts** è la libreria di grafici della famiglia MUI X: si usa come gli altri componenti MUI, rispetta il tema dell'app e ha già pronti legenda, tooltip al passaggio del mouse e animazioni. In questa lezione vediamo i due grafici più comuni: il grafico a barre (`BarChart`) e il grafico a torta (`PieChart`).",
      },
      {
        type: "heading",
        content: "Installazione e importazione",
      },
      {
        type: "code",
        language: "javascript",
        title: "Installare e importare i grafici",
        code: `// Installazione (da terminale, nella cartella del progetto)
// npm install @mui/x-charts

// Ogni grafico si importa dal suo sotto-percorso
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";`,
      },
      {
        type: "info",
        content:
          "Importare da `@mui/x-charts/BarChart` invece che da `@mui/x-charts` porta nel tuo progetto solo il codice del grafico che usi. Funzionano entrambe le forme, ma quella con il sotto-percorso è la più comune.",
      },
      {
        type: "heading",
        content: "BarChart: dataset, series e assi",
      },
      {
        type: "text",
        content:
          "Il modo più leggibile per dare i dati a un BarChart è la prop `dataset`: un array di oggetti, uno per ogni gruppo di barre, proprio come le righe di una DataGrid. Poi descrivi cosa disegnare:\n- `series`: l'elenco delle serie di barre. Per ognuna, `dataKey` indica quale proprietà degli oggetti contiene l'altezza della barra.\n- `xAxis`: l'asse orizzontale. Con `scaleType: \"band\"` l'asse è fatto di categorie (una \"fascia\" per ogni oggetto) e `dataKey` indica la proprietà con l'etichetta della categoria.\n- `height`: l'altezza in pixel. La larghezza, se non la indichi, si adatta al contenitore.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Vendite mensili",
        code: `import { BarChart } from "@mui/x-charts/BarChart";

const monthlySales = [
  { month: "Gen", sales: 120 },
  { month: "Feb", sales: 98 },
  { month: "Mar", sales: 143 },
  { month: "Apr", sales: 110 },
];

export default function SalesChart() {
  return (
    <BarChart
      dataset={monthlySales}
      xAxis={[{ scaleType: "band", dataKey: "month" }]}
      series={[{ dataKey: "sales", label: "Vendite" }]}
      height={300}
    />
  );
}`,
      },
      {
        type: "text",
        content:
          "`xAxis`, `yAxis` e `series` sono **array**, anche quando contengono un solo elemento: un grafico può avere più assi e più serie. Il `label` della serie compare nella legenda e nel tooltip.",
      },
      {
        type: "subheading",
        content: "Più serie: barre affiancate",
      },
      {
        type: "text",
        content:
          "Per confrontare due grandezze per ogni categoria, aggiungi una seconda serie. Ogni oggetto del dataset avrà una proprietà per serie. Con `color` scegli il colore di ogni serie; se lo ometti, il grafico usa una palette predefinita.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Online contro negozio",
        code: `const salesByChannel = [
  { month: "Gen", online: 70, store: 50 },
  { month: "Feb", online: 60, store: 38 },
  { month: "Mar", online: 95, store: 48 },
];

<BarChart
  dataset={salesByChannel}
  xAxis={[{ scaleType: "band", dataKey: "month" }]}
  series={[
    { dataKey: "online", label: "Online", color: "#1976d2" },
    { dataKey: "store", label: "Negozio", color: "#ff9800" },
  ]}
  height={300}
/>`,
      },
      {
        type: "subheading",
        content: "Barre orizzontali",
      },
      {
        type: "text",
        content:
          "Con `layout=\"horizontal\"` le barre crescono da sinistra verso destra. I ruoli degli assi si scambiano: ora le categorie stanno sull'asse **verticale**, quindi `scaleType: \"band\"` e il `dataKey` delle etichette vanno su `yAxis`. Le barre orizzontali sono ideali quando le etichette sono lunghe (nomi di prodotti, titoli di libri), perché hanno spazio per essere lette per intero.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Libri più prestati",
        code: `const loans = [
  { title: "Il nome della rosa", loans: 34 },
  { title: "Il barone rampante", loans: 27 },
  { title: "La coscienza di Zeno", loans: 19 },
];

<BarChart
  layout="horizontal"
  dataset={loans}
  // Le categorie ora sono sull'asse verticale
  yAxis={[{ scaleType: "band", dataKey: "title", width: 160 }]}
  series={[{ dataKey: "loans", label: "Prestiti" }]}
  height={250}
/>`,
      },
      {
        type: "heading",
        content: "PieChart: il grafico a torta",
      },
      {
        type: "text",
        content:
          "Il PieChart mostra come un totale si divide tra le parti. Qui i dati non vanno in `dataset` ma dentro la serie: `series={[{ data: [...] }]}`, dove ogni elemento di `data` è una fetta con:\n- `label`: il nome, mostrato in legenda e tooltip;\n- `value`: il valore (le fette sono proporzionali);\n- `color` (facoltativo): il colore della fetta.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Stato delle attività",
        code: `import { PieChart } from "@mui/x-charts/PieChart";

const taskStatus = [
  { label: "Da fare", value: 8, color: "#9e9e9e" },
  { label: "In corso", value: 5, color: "#1976d2" },
  { label: "Completata", value: 12, color: "#2e7d32" },
];

export default function StatusChart() {
  return (
    <PieChart
      series={[{ data: taskStatus }]}
      width={200}
      height={200}
    />
  );
}`,
      },
      {
        type: "subheading",
        content: "Ciambella ed etichette sulle fette",
      },
      {
        type: "text",
        content:
          "Altre proprietà della serie cambiano la forma:\n- `innerRadius`: il raggio del buco centrale in pixel. Con un valore maggiore di 0 la torta diventa una **ciambella** (donut).\n- `outerRadius`: il raggio esterno.\n- `arcLabel`: cosa scrivere sopra ogni fetta, per esempio `\"value\"` (il numero) o `\"label\"` (il nome).\n\nSul grafico, `width` e `height` fissano le dimensioni e `margin` lo spazio intorno al disegno, un oggetto con `top`, `right`, `bottom`, `left`.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Grafico a ciambella",
        code: `// Impostazioni comuni a più grafici: un oggetto da passare con lo spread
const pieSettings = {
  width: 220,
  height: 220,
  margin: { right: 5 },
};

<PieChart
  series={[
    {
      data: taskStatus,
      innerRadius: 50,    // buco centrale: ciambella
      outerRadius: 100,
      arcLabel: "value",  // il numero scritto su ogni fetta
    },
  ]}
  {...pieSettings}
/>`,
      },
      {
        type: "tip",
        content:
          "Il grafico a torta funziona bene con poche categorie (fino a 5-6) che formano un totale. Per confrontare tanti valori, o valori nel tempo, il grafico a barre è quasi sempre più leggibile: l'occhio confronta le lunghezze molto meglio degli angoli.",
      },
      {
        type: "heading",
        content: "Grafici in una dashboard",
      },
      {
        type: "text",
        content:
          "Un grafico da solo non ha bordi né titolo. Di solito lo si mette in un `Paper` con un `Typography` come titolo, e più Paper si dispongono con `Grid` (la prop `size` indica quante delle 12 colonne occupare a ogni breakpoint). Il BarChart senza `width` si adatta alla larghezza del Paper.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Due grafici affiancati",
        code: `import { Grid, Paper, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

export default function Dashboard() {
  return (
    <Grid container spacing={2}>
      {/* Su schermi piccoli uno sotto l'altro, da md in su affiancati */}
      <Grid size={{ xs: 12, md: 8 }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6">Vendite mensili</Typography>
          <BarChart
            dataset={monthlySales}
            xAxis={[{ scaleType: "band", dataKey: "month" }]}
            series={[{ dataKey: "sales", label: "Vendite" }]}
            height={300}
          />
        </Paper>
      </Grid>
      <Grid size={{ xs: 12, md: 4 }}>
        <Paper sx={{ p: 2, height: "100%" }}>
          <Typography variant="h6">Stato delle attività</Typography>
          <PieChart
            series={[{ data: taskStatus, innerRadius: 50, outerRadius: 100 }]}
            height={300}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}`,
      },
      {
        type: "heading",
        content: "Preparare i dati per un grafico",
      },
      {
        type: "text",
        content:
          "I dati raramente arrivano già pronti per il grafico. Di solito hai un elenco di oggetti (ordini, attività, studenti) e il grafico vuole dei **totali per categoria**. Il procedimento è sempre lo stesso: conti (o sommi) in un oggetto che usa la categoria come chiave, poi trasformi quell'oggetto nell'array che il grafico si aspetta.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Contare le attività per stato",
        code: `const tasks = [
  { title: "Preparare la presentazione", status: "In corso" },
  { title: "Aggiornare la documentazione", status: "Da fare" },
  { title: "Rivedere il calendario", status: "Completata" },
  { title: "Inviare il resoconto", status: "Completata" },
];

// 1. Conteggio per categoria con reduce
const counts = tasks.reduce((acc, task) => {
  acc[task.status] = (acc[task.status] ?? 0) + 1;
  return acc;
}, {});
// { "In corso": 1, "Da fare": 1, "Completata": 2 }

// 2a. Per il BarChart: un array di oggetti da usare come dataset
const dataset = Object.entries(counts).map(([status, count]) => ({ status, count }));
// [{ status: "In corso", count: 1 }, { status: "Da fare", count: 1 }, ...]

// 2b. Per il PieChart: fette con label, value e colore
const COLORS = { "Da fare": "#9e9e9e", "In corso": "#1976d2", Completata: "#2e7d32" };
const pieData = Object.entries(counts).map(([label, value]) => ({
  label,
  value,
  color: COLORS[label],
}));`,
      },
      {
        type: "text",
        content:
          "Lo stesso conteggio si può scrivere con un ciclo `for...of` e l'operatore `??=`, che assegna un valore solo se la proprietà non esiste ancora. È comodo quando per ogni categoria devi tenere più di un numero, per esempio i totali di due canali di vendita:",
      },
      {
        type: "code",
        language: "javascript",
        title: "Sommare per mese e per canale",
        code: `const orders = [
  { month: "Gen", channel: "online", total: 40 },
  { month: "Gen", channel: "store", total: 25 },
  { month: "Feb", channel: "online", total: 60 },
  { month: "Gen", channel: "online", total: 30 },
];

const byMonth = {};
for (const order of orders) {
  // Prima volta che vedo il mese: creo il suo oggetto con i totali a 0
  byMonth[order.month] ??= { month: order.month, online: 0, store: 0 };
  byMonth[order.month][order.channel] += order.total;
}

const dataset = Object.values(byMonth);
// [{ month: "Gen", online: 70, store: 25 }, { month: "Feb", online: 60, store: 0 }]
// Pronto per: series={[{ dataKey: "online" }, { dataKey: "store" }]}`,
      },
      {
        type: "heading",
        content: "Dati di esempio in attesa dei dati veri",
      },
      {
        type: "text",
        content:
          "Mentre costruisci l'interfaccia, i dati veri (per esempio da un server) potrebbero non essere ancora disponibili. Un trucco pratico è dare alla prop `data` un **valore di default** con dei dati di esempio (in inglese *mock*): il grafico si vede e si può sistemare subito, e quando il genitore inizierà a passare i dati veri il default smetterà semplicemente di essere usato, senza cambiare il componente.",
      },
      {
        type: "code",
        language: "javascript",
        title: "Un grafico con dati di esempio di default",
        code: `import { Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

// Dati di esempio: costante di modulo, creata una volta sola
const MOCK_DATA = [
  { course: "Matematica", students: 24 },
  { course: "Storia", students: 18 },
  { course: "Inglese", students: 31 },
];

export default function StudentsPerCourseChart({ data = MOCK_DATA }) {
  return (
    <>
      <Typography variant="h6">Studenti per corso</Typography>
      <BarChart
        layout="horizontal"
        dataset={data}
        yAxis={[{ scaleType: "band", dataKey: "course" }]}
        series={[{ dataKey: "students", label: "Studenti" }]}
        height={300}
      />
    </>
  );
}

// <StudentsPerCourseChart />                    -> dati di esempio
// <StudentsPerCourseChart data={realData} />    -> dati veri`,
      },
      {
        type: "warning",
        content:
          "Ricordati di togliere i dati di esempio (o almeno di renderli evidenti) prima di pubblicare l'app: un grafico che mostra numeri inventati come se fossero veri è peggio di un grafico vuoto.",
      },
    ],
    exercises: [
      {
        type: "multiple-choice",
        title: "Barre orizzontali",
        description:
          "Vuoi un BarChart con `layout=\"horizontal\"` e i nomi dei prodotti come categorie. Il dataset è `[{ name: \"Tastiera\", sold: 30 }, ...]`. Quale configurazione è corretta?",
        difficulty: "medio",
        options: [
          "`xAxis={[{ scaleType: \"band\", dataKey: \"name\" }]}` e `series={[{ dataKey: \"sold\" }]}`",
          "`yAxis={[{ scaleType: \"band\", dataKey: \"name\" }]}` e `series={[{ dataKey: \"sold\" }]}`",
          "`yAxis={[{ scaleType: \"band\", dataKey: \"sold\" }]}` e `series={[{ dataKey: \"name\" }]}`",
          "`series={[{ dataKey: \"name\", layout: \"horizontal\" }]}`",
        ],
        correct: 1,
        explanation:
          "Con le barre orizzontali le categorie stanno sull'asse verticale, quindi `scaleType: \"band\"` con il `dataKey` delle etichette va su `yAxis`, mentre la serie legge i valori numerici (`sold`). Mettere le categorie su `xAxis` è la configurazione delle barre verticali; scambiare `name` e `sold` farebbe disegnare barre da stringhe; `layout` è una prop del grafico, non della serie.",
      },
      {
        type: "multiple-choice",
        title: "Da torta a ciambella",
        description:
          "Quale modifica trasforma un PieChart in un grafico a ciambella con il valore scritto su ogni fetta?",
        difficulty: "facile",
        options: [
          "Aggiungere `layout=\"donut\"` al PieChart",
          "Aggiungere `variant=\"donut\"` e `showValues` al PieChart",
          "Usare un BarChart con `innerRadius`",
          "Aggiungere alla serie `innerRadius: 50` e `arcLabel: \"value\"`",
        ],
        correct: 3,
        explanation:
          "Il buco centrale si ottiene con `innerRadius` maggiore di 0 e l'etichetta sulle fette con `arcLabel`, entrambi proprietà della serie (dentro `series`). `layout=\"donut\"`, `variant=\"donut\"` e `showValues` non esistono; `innerRadius` non ha senso in un grafico a barre.",
      },
      {
        type: "multiple-choice",
        title: "Cosa produce questo conteggio",
        description:
          "Cosa contiene `data` alla fine?\n`const orders = [{ city: \"Roma\" }, { city: \"Milano\" }, { city: \"Roma\" }];\nconst counts = {};\nfor (const o of orders) {\n  counts[o.city] ??= 0;\n  counts[o.city] += 1;\n}\nconst data = Object.entries(counts).map(([label, value]) => ({ label, value }));`",
        difficulty: "medio",
        options: [
          "`[{ label: \"Roma\", value: 2 }, { label: \"Milano\", value: 1 }]`",
          "`[{ label: \"Roma\", value: 1 }, { label: \"Milano\", value: 1 }, { label: \"Roma\", value: 1 }]`",
          "`{ Roma: 2, Milano: 1 }`",
          "`[{ label: \"Roma\", value: NaN }, { label: \"Milano\", value: NaN }]`",
        ],
        correct: 0,
        explanation:
          "`??=` inizializza a 0 ogni città la prima volta che compare, poi `+= 1` conta: `counts` diventa `{ Roma: 2, Milano: 1 }`. `Object.entries` lo trasforma in coppie `[chiave, valore]` e `map` in oggetti `{ label, value }`, il formato delle fette del PieChart. Non ci sono doppioni perché le chiavi di un oggetto sono uniche; `{ Roma: 2, Milano: 1 }` è `counts`, non `data`; senza `??=` si otterrebbe `NaN` (undefined + 1), ma qui c'è.",
      },
      {
        type: "multiple-choice",
        title: "Il valore di default della prop",
        description:
          "Il componente è definito come `function Chart({ data = MOCK_DATA }) { ... }`. Quale affermazione è vera?",
        difficulty: "facile",
        options: [
          "MOCK_DATA viene sempre usato, anche quando il genitore passa data",
          "MOCK_DATA viene unito ai dati passati dal genitore",
          "MOCK_DATA viene usato solo quando il genitore non passa data (o lo passa undefined)",
          "Il valore di default funziona solo con le props di tipo stringa",
        ],
        correct: 2,
        explanation:
          "Un parametro di default si applica solo quando il valore è `undefined`, cioè quando la prop manca. Appena il genitore passa `data`, viene usato quello e i dati di esempio vengono ignorati, non uniti. I valori di default funzionano con qualsiasi tipo, array compresi.",
      },
      {
        type: "code",
        title: "Fette per il PieChart",
        description:
          "Scrivi `toPieData(tasks, colors)` che prepara i dati di un PieChart a partire da un elenco di attività `{ title, status }`:\n- restituisce un array con un oggetto `{ label, value, color }` per ogni stato, nell'ordine in cui lo stato compare la prima volta;\n- `value` è il numero di attività con quello stato;\n- `color` è `colors[stato]`, oppure `\"#bdbdbd\"` se lo stato non è in `colors`.\n\nPuoi contare con `reduce` oppure con un ciclo e `??=`.",
        difficulty: "medio",
        starterCode: `const tasks = [
  { title: "Preparare la presentazione", status: "In corso" },
  { title: "Aggiornare la documentazione", status: "Da fare" },
  { title: "Rivedere il calendario", status: "Completata" },
  { title: "Inviare il resoconto", status: "Completata" },
  { title: "Prenotare la sala", status: "In pausa" },
];
const STATUS_COLORS = { "Da fare": "#9e9e9e", "In corso": "#1976d2", Completata: "#2e7d32" };

function toPieData(tasks, colors) {
  // 1. Conta le attività per stato  2. Trasforma il conteggio in fette
}

console.log(toPieData(tasks, STATUS_COLORS));`,
        solution: `const tasks = [
  { title: "Preparare la presentazione", status: "In corso" },
  { title: "Aggiornare la documentazione", status: "Da fare" },
  { title: "Rivedere il calendario", status: "Completata" },
  { title: "Inviare il resoconto", status: "Completata" },
  { title: "Prenotare la sala", status: "In pausa" },
];
const STATUS_COLORS = { "Da fare": "#9e9e9e", "In corso": "#1976d2", Completata: "#2e7d32" };

function toPieData(tasks, colors) {
  const counts = {};
  for (const task of tasks) {
    counts[task.status] ??= 0;
    counts[task.status] += 1;
  }
  return Object.entries(counts).map(([label, value]) => ({
    label,
    value,
    color: colors[label] ?? "#bdbdbd",
  }));
}

console.log(toPieData(tasks, STATUS_COLORS));`,
        solutionExplanation:
          "Prima si costruisce un oggetto di conteggi con lo stato come chiave (le chiavi conservano l'ordine di inserimento), poi `Object.entries` + `map` lo trasforma nel formato delle fette. `?? \"#bdbdbd\"` fornisce un colore neutro per gli stati imprevisti, così nessuna fetta resta senza colore.",
        validate: `if (typeof toPieData !== "function") return "Definisci la funzione toPieData";
const colors = { A: "#111111", B: "#222222" };
const r1 = toPieData([{ status: "B" }, { status: "A" }, { status: "B" }, { status: "C" }], colors);
if (!Array.isArray(r1)) return "toPieData deve restituire un array di fette";
if (r1.length !== 3) return "Serve una fetta per ogni stato diverso (qui 3), ne hai " + r1.length;
if (!$equal(r1.map((x) => x && x.label), ["B", "A", "C"])) return "Le fette devono seguire l'ordine in cui ogni stato compare la prima volta";
if (r1[0].value !== 2) return "value deve essere il numero di attività con quello stato (B compare 2 volte)";
if (r1[0].color !== "#222222") return "color deve essere colors[stato]";
if (r1[2].color !== "#bdbdbd") return "Se lo stato non è in colors, color deve essere \\"#bdbdbd\\"";
const exp = [
  { label: "B", value: 2, color: "#222222" },
  { label: "A", value: 1, color: "#111111" },
  { label: "C", value: 1, color: "#bdbdbd" },
];
if (!$equal(r1, exp)) return "Ogni fetta deve avere esattamente label, value e color. Ottenuto: " + $format(r1);
if (!$equal(toPieData([], colors), [])) return "Con nessuna attività deve restituire []";
return true;`,
      },
      {
        type: "code",
        title: "Dataset mensile per il BarChart",
        description:
          "Scrivi `salesDataset(orders, months)` che prepara il `dataset` di un BarChart con due serie, `online` e `store`.\n- Ogni ordine ha `date` (`\"aaaa-mm-gg\"`), `channel` (`\"online\"` o `\"store\"`) e `total`.\n- `months` è l'elenco delle etichette dei mesi da mostrare, a partire da gennaio: `months[0]` è gennaio, `months[1]` febbraio e così via.\n- Restituisci un oggetto per ogni etichetta di `months`, nello stesso ordine: `{ month: etichetta, online: somma, store: somma }`. I mesi senza ordini hanno 0.\n- Ignora gli ordini il cui mese non ha un'etichetta in `months`.\n\nSuggerimento: il numero del mese si ricava da `date.split(\"-\")[1]`; ricordati che le etichette partono dall'indice 0.",
        difficulty: "difficile",
        starterCode: `const MONTHS = ["Gen", "Feb", "Mar"];
const orders = [
  { date: "2026-01-15", channel: "online", total: 40 },
  { date: "2026-01-20", channel: "store", total: 25 },
  { date: "2026-02-03", channel: "online", total: 60 },
  { date: "2026-01-28", channel: "online", total: 30 },
  { date: "2026-05-10", channel: "store", total: 99 },
];

function salesDataset(orders, months) {
  // Un oggetto { month, online, store } per ogni mese
}

console.log(salesDataset(orders, MONTHS));`,
        solution: `const MONTHS = ["Gen", "Feb", "Mar"];
const orders = [
  { date: "2026-01-15", channel: "online", total: 40 },
  { date: "2026-01-20", channel: "store", total: 25 },
  { date: "2026-02-03", channel: "online", total: 60 },
  { date: "2026-01-28", channel: "online", total: 30 },
  { date: "2026-05-10", channel: "store", total: 99 },
];

function salesDataset(orders, months) {
  const dataset = months.map((month) => ({ month, online: 0, store: 0 }));
  for (const order of orders) {
    const index = Number(order.date.split("-")[1]) - 1;
    if (index >= dataset.length) continue;
    dataset[index][order.channel] += order.total;
  }
  return dataset;
}

console.log(salesDataset(orders, MONTHS));`,
        solutionExplanation:
          "Si parte da un dataset già completo, un oggetto per mese con i totali a 0: così i mesi senza ordini ci sono comunque e l'ordine è quello di `months`. Per ogni ordine si ricava l'indice del mese (\"01\" diventa 1, meno 1 perché gli array partono da 0), si scartano i mesi fuori elenco e si somma il totale nella proprietà del canale, letta con le parentesi quadre.",
        validate: `if (typeof salesDataset !== "function") return "Definisci la funzione salesDataset";
const orders1 = [
  { date: "2026-01-15", channel: "online", total: 40 },
  { date: "2026-01-20", channel: "store", total: 25 },
  { date: "2026-02-03", channel: "online", total: 60 },
  { date: "2026-01-28", channel: "online", total: 30 },
  { date: "2026-05-10", channel: "store", total: 99 },
];
let r1;
try { r1 = salesDataset(orders1, ["Gen", "Feb", "Mar"]); } catch (e) { return "salesDataset lancia un errore (" + e.message + "): ricorda di ignorare gli ordini dei mesi che non sono in months"; }
if (!Array.isArray(r1)) return "salesDataset deve restituire un array";
if (r1.length !== 3) return "Serve un oggetto per ogni etichetta di months (qui 3), ne hai " + r1.length;
if (!$equal(r1.map((x) => x && x.month), ["Gen", "Feb", "Mar"])) return "La proprietà month deve contenere le etichette di months, nello stesso ordine";
if (r1[2].online !== 0 || r1[2].store !== 0) return "I mesi senza ordini devono avere online: 0 e store: 0";
if (r1[0].online === 30) return "Gli ordini dello stesso mese e canale vanno sommati, non sovrascritti";
if (r1[1].online === 40 || r1[0].online === 60) return "Controlla l'indice del mese: \\"01\\" è gennaio, cioè months[0]";
const exp1 = [
  { month: "Gen", online: 70, store: 25 },
  { month: "Feb", online: 60, store: 0 },
  { month: "Mar", online: 0, store: 0 },
];
if (!$equal(r1, exp1)) return "Risultato non corretto. Atteso: " + $format(exp1) + " - ottenuto: " + $format(r1);
const r2 = salesDataset([{ date: "2025-02-01", channel: "store", total: 5 }, { date: "2025-02-11", channel: "store", total: 7 }], ["G", "F"]);
if (!$equal(r2, [{ month: "G", online: 0, store: 0 }, { month: "F", online: 0, store: 12 }])) return "Con altri mesi il risultato non è corretto: usa il parametro months. Ottenuto: " + $format(r2);
return true;`,
      },
      {
        type: "code",
        title: "Grafico in un Paper",
        description:
          "Completa il componente `CourseChart`, che mostra quanti studenti ha ogni corso.\n- La prop `data` ha come valore di default `MOCK_DATA`.\n- Dentro la `Grid` con `size={{ xs: 12, md: 6 }}` metti un `Paper` con `sx={{ p: 2 }}`, che contiene un `Typography` con `variant=\"h6\"` e testo \"Studenti per corso\" e un `BarChart`.\n- Il BarChart è orizzontale, usa `data` come dataset, ha i corsi (`course`) come categorie sull'asse giusto con `scaleType: \"band\"`, una serie con `dataKey: \"students\"` e `height={300}`.",
        difficulty: "medio",
        mode: "static",
        starterCode: `import { Grid, Paper, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

const MOCK_DATA = [
  { course: "Matematica", students: 24 },
  { course: "Storia", students: 18 },
];

export default function CourseChart({ data }) {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      {/* Paper con titolo e grafico */}
    </Grid>
  );
}`,
        solution: `import { Grid, Paper, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";

const MOCK_DATA = [
  { course: "Matematica", students: 24 },
  { course: "Storia", students: 18 },
];

export default function CourseChart({ data = MOCK_DATA }) {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Studenti per corso</Typography>
        <BarChart
          layout="horizontal"
          dataset={data}
          yAxis={[{ scaleType: "band", dataKey: "course" }]}
          series={[{ dataKey: "students" }]}
          height={300}
        />
      </Paper>
    </Grid>
  );
}`,
        solutionExplanation:
          "Il valore di default nella destrutturazione delle props fa usare `MOCK_DATA` finché il genitore non passa `data`. Con `layout=\"horizontal\"` le categorie vanno sull'asse verticale, quindi `scaleType: \"band\"` e `dataKey: \"course\"` stanno in `yAxis`; la serie legge i numeri da `students`.",
        validate: `const c = $codeNoComments;
if (!/function\\s+CourseChart\\s*\\(\\s*\\{\\s*data\\s*=\\s*MOCK_DATA\\s*\\}\\s*\\)/.test(c)) return "Dai alla prop data il valore di default MOCK_DATA: function CourseChart({ data = MOCK_DATA })";
if (!/<Grid[^>]*>[\\s\\S]*<Paper[^>]*sx=\\{\\{\\s*p:\\s*2\\s*\\}\\}[^>]*>[\\s\\S]*<\\/Paper>[\\s\\S]*<\\/Grid>/.test(c)) return "Dentro la Grid metti un <Paper sx={{ p: 2 }}> ... </Paper>";
if (!/<Paper[\\s\\S]*<Typography[^>]*variant=["']h6["'][^>]*>\\s*Studenti per corso\\s*<\\/Typography>/.test(c)) return "Nel Paper aggiungi <Typography variant=\\"h6\\">Studenti per corso</Typography>";
if (!/<Paper[\\s\\S]*<BarChart[\\s\\S]*<\\/Paper>/.test(c)) return "Metti il <BarChart> dentro il Paper";
if (!/layout=["']horizontal["']/.test(c)) return "Rendi il grafico orizzontale con layout=\\"horizontal\\"";
if (!/dataset=\\{\\s*data\\s*\\}/.test(c)) return "Usa la prop data come dataset: dataset={data}";
if (/xAxis=\\{\\[\\s*\\{[^}]*scaleType:\\s*["']band["']/.test(c)) return "Con le barre orizzontali le categorie vanno su yAxis, non su xAxis";
if (!/yAxis=\\{\\[\\s*\\{[^}]*scaleType:\\s*["']band["'][^}]*\\}\\s*\\]\\}/.test(c) || !/yAxis=\\{\\[\\s*\\{[^}]*dataKey:\\s*["']course["']/.test(c)) return "Metti le categorie sull'asse verticale: yAxis={[{ scaleType: \\"band\\", dataKey: \\"course\\" }]}";
if (!/series=\\{\\[\\s*\\{[^}]*dataKey:\\s*["']students["']/.test(c)) return "Aggiungi la serie: series={[{ dataKey: \\"students\\" }]}";
if (!/height=\\{\\s*300\\s*\\}/.test(c)) return "Imposta l'altezza con height={300}";
return true;`,
      },
    ],
  },
};
