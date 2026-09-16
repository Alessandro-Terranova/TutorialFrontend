export const modules = [
  {
    id: "css",
    title: "CSS Fundamentals",
    icon: "palette",
    color: "#e91e63",
    description: "Selettori, Flexbox, variabili CSS e layout responsive",
    lessons: [
      { id: "selectors", title: "Selettori e Box Model" },
      { id: "flexbox", title: "Flexbox e Layout" },
      { id: "variables", title: "Variabili CSS e Responsive" },
    ],
  },
  {
    id: "js-basics",
    title: "JavaScript Fundamentals",
    icon: "code",
    color: "#f7df1e",
    description: "Variabili, funzioni, array, oggetti e i fondamenti del linguaggio",
    lessons: [
      { id: "variables", title: "Variabili, Tipi e Operatori" },
      { id: "functions", title: "Funzioni e Arrow Functions" },
      { id: "arrays", title: "Array e Metodi degli Array" },
      { id: "objects", title: "Oggetti, Destructuring e Spread" },
      { id: "strings", title: "Template Literals e Stringhe" },
    ],
  },
  {
    id: "js-advanced",
    title: "JavaScript Avanzato",
    icon: "bolt",
    color: "#ff9800",
    description: "Async/await, Set/Map, moduli, optional chaining e pattern moderni",
    lessons: [
      { id: "async", title: "Async/Await e Promises" },
      { id: "data-structures", title: "Set, Map e Iterazione" },
      { id: "modules", title: "Moduli e Operatori Moderni" },
    ],
  },
  {
    id: "react-basics",
    title: "React Fundamentals",
    icon: "widgets",
    color: "#61dafb",
    description: "Componenti, JSX, props, state e gli hook fondamentali",
    lessons: [
      { id: "components", title: "Componenti e JSX" },
      { id: "props", title: "Props e Rendering Condizionale" },
      { id: "usestate", title: "useState - Gestione dello Stato" },
      { id: "useeffect", title: "useEffect - Side Effects" },
    ],
  },
  {
    id: "react-advanced",
    title: "React Avanzato",
    icon: "psychology",
    color: "#00bcd4",
    description: "useRef, useMemo, custom hooks e Context API",
    lessons: [
      { id: "useref-usememo", title: "useRef e useMemo" },
      { id: "custom-hooks", title: "Custom Hooks" },
      { id: "context", title: "Context API (useContext)" },
    ],
  },
  {
    id: "redux",
    title: "Redux Toolkit",
    icon: "hub",
    color: "#764abc",
    description: "Store, slices, reducers, selectors e gestione dello stato globale",
    lessons: [
      { id: "store-slices", title: "Store, Slices e Reducers" },
      { id: "use-redux", title: "useSelector e useDispatch" },
      { id: "selectors", title: "Selectors e Stato Derivato" },
    ],
  },
  {
    id: "nextjs",
    title: "Next.js",
    icon: "rocket_launch",
    color: "#000000",
    description: "App Router, routing, server/client components e layout",
    lessons: [
      { id: "app-router", title: "App Router e Routing" },
      { id: "components-types", title: "Server vs Client Components" },
      { id: "dynamic-routes", title: "Route Dinamiche e Layout" },
    ],
  },
  {
    id: "mui",
    title: "Material UI",
    icon: "design_services",
    color: "#1976d2",
    description: "Componenti MUI, sx prop, form controls e theming",
    lessons: [
      { id: "basics", title: "Box, Stack, Typography e Button" },
      { id: "sx-prop", title: "La Prop sx e Styling" },
      { id: "forms", title: "Form Controls e Tabelle" },
    ],
  },
  {
    id: "project",
    title: "Pattern Avanzati",
    icon: "integration_instructions",
    color: "#4caf50",
    description: "Pattern enterprise: stato annidato, autenticazione, custom hook compositi",
    lessons: [
      { id: "patterns", title: "Pattern Avanzati" },
    ],
  },
];

export function getLesson(moduleId, lessonId) {
  const mod = modules.find((m) => m.id === moduleId);
  if (!mod) return null;
  const lessonIndex = mod.lessons.findIndex((l) => l.id === lessonId);
  if (lessonIndex === -1) return null;
  return { module: mod, lesson: mod.lessons[lessonIndex], index: lessonIndex };
}

export function getAdjacentLessons(moduleId, lessonId) {
  const flatList = [];
  for (const mod of modules) {
    for (const lesson of mod.lessons) {
      flatList.push({ moduleId: mod.id, lessonId: lesson.id, title: lesson.title, moduleTitle: mod.title });
    }
  }
  const currentIndex = flatList.findIndex(
    (item) => item.moduleId === moduleId && item.lessonId === lessonId
  );
  return {
    prev: currentIndex > 0 ? flatList[currentIndex - 1] : null,
    next: currentIndex < flatList.length - 1 ? flatList[currentIndex + 1] : null,
  };
}

export function getTotalLessons() {
  return modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
}
