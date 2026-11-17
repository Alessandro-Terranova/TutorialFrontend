// Verifica automatica degli esercizi di codice.
// Per ogni esercizio con `validate`:
//   - la `solution` deve passare senza errori
//   - lo `starterCode` NON deve passare
// Uso: node scripts/check-exercises.mjs [nomeFile ...]   (es. js-basics)
import { createRequire } from "module";
import { pathToFileURL, fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
require(path.join(root, "public", "sandbox-worker.js"));
const execute = globalThis.__sandboxExecute;

const lessonsDir = path.join(root, "src", "data", "lessons");
const only = process.argv.slice(2);
const files = fs
  .readdirSync(lessonsDir)
  .filter((f) => f.endsWith(".js"))
  .filter((f) => only.length === 0 || only.includes(f.replace(/\.js$/, "")));

let failures = 0;
let total = 0;
for (const file of files) {
  const { lessons } = await import(pathToFileURL(path.join(lessonsDir, file)).href);
  for (const [lessonId, lesson] of Object.entries(lessons)) {
    for (const [i, ex] of (lesson.exercises || []).entries()) {
      const where = `${file.replace(/\.js$/, "")}/${lessonId} #${i + 1} "${ex.title}"`;
      if (ex.type === "multiple-choice") {
        if (!Array.isArray(ex.options) || typeof ex.correct !== "number" || !ex.options[ex.correct]) {
          console.log(`✗ ${where}: risposta corretta non valida`);
          failures++;
        }
        continue;
      }
      if (ex.type !== "code") continue;
      total++;
      if (!ex.validate) {
        console.log(`✗ ${where}: manca validate`);
        failures++;
        continue;
      }
      const mode = ex.mode || "js"; const isStatic = mode !== "js";
      const sol = await execute({ code: ex.solution || "", validate: ex.validate, mode, settleTimeout: 3000 });
      const start = await execute({ code: ex.starterCode || "", validate: ex.validate, mode, settleTimeout: 3000 });
      const problems = [];
      if (!sol.passed || (sol.error && !isStatic)) {
        problems.push(`la soluzione NON passa (${sol.error || sol.message || "validate ha restituito false"})`);
      }
      if (start.passed) problems.push("lo starterCode passa già la validazione");
      if (problems.length) {
        failures++;
        console.log(`✗ ${where}: ${problems.join("; ")}`);
        if (sol.logs?.length) console.log("   output soluzione:\n   " + sol.logs.map((l) => l.text).join("\n   "));
      } else {
        console.log(`✓ ${where}`);
      }
    }
  }
}
console.log(`\n${total} esercizi di codice controllati, ${failures} problemi.`);
process.exit(failures ? 1 : 0);
