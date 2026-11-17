/*
 * Sandbox per gli esercizi JavaScript.
 *
 * Gira dentro un Web Worker: il codice dell'utente non può bloccare la pagina
 * (un ciclo infinito viene interrotto dal timeout nel thread principale).
 *
 * Messaggio in ingresso:  { id, code, validate, mode }
 *   mode: "js" (default, il codice viene eseguito), "static" (React/JSX: il
 *   codice NON viene eseguito, si controlla solo il testo), "css" (come static,
 *   con in più $cssRules / $cssRule)
 * Messaggio in uscita:    { id, logs, error, passed, message, pendingTimers }
 *
 * Il codice di `validate` viene eseguito NELLO STESSO SCOPE del codice
 * dell'utente (dopo di esso e dopo che tutti i timer sono terminati), quindi
 * può leggere direttamente le variabili e le funzioni dichiarate dall'utente.
 * Ha inoltre a disposizione:
 *   $logs            array delle righe stampate (stringhe già formattate)
 *   $output          tutte le righe unite da "\n"
 *   $values          array degli argomenti grezzi di ogni console.log
 *   $code            il codice scritto dall'utente
 *   $codeNoComments  il codice senza commenti
 *   $equal(a, b)     confronto profondo (array, oggetti, Map, Set...)
 *   $format(v)       formatta un valore come farebbe la console
 *   $cssRules        (solo esercizi CSS) array di { selector, media, decls }
 *   $cssRule(sel, media?)  dichiarazioni unite per quel selettore, es.
 *                    $cssRule(".card")["padding"] === "16px"
 *                    (proprietà in minuscolo, valori normalizzati: spazi singoli, minuscolo)
 * Deve restituire `true` se l'esercizio è corretto, oppure una stringa con un
 * suggerimento (o `false`) se non lo è.
 */
(function (root) {
  "use strict";

  var MAX_DEPTH = 6;
  var MAX_ITEMS = 100;
  var LINE_WIDTH = 72;

  function isIdentifier(key) {
    return /^[A-Za-z_$][\w$]*$/.test(key);
  }

  function formatKey(key) {
    if (typeof key === "symbol") return "[" + key.toString() + "]";
    return isIdentifier(key) ? key : JSON.stringify(key);
  }

  function constructorName(obj) {
    try {
      var proto = Object.getPrototypeOf(obj);
      if (proto === null) return "[Object: null prototype]";
      var ctor = proto && proto.constructor;
      return ctor && typeof ctor.name === "string" ? ctor.name : "";
    } catch (e) {
      return "";
    }
  }

  function inspect(value, depth, seen, nested) {
    if (value === null) return "null";
    var type = typeof value;
    if (type === "undefined") return "undefined";
    if (type === "string") return nested ? JSON.stringify(value) : value;
    if (type === "number") return Object.is(value, -0) ? "-0" : String(value);
    if (type === "bigint") return String(value) + "n";
    if (type === "boolean") return String(value);
    if (type === "symbol") return value.toString();
    if (type === "function") {
      var src = "";
      try {
        src = Function.prototype.toString.call(value);
      } catch (e) {
        /* ignora */
      }
      if (/^class\b/.test(src)) return "[class " + (value.name || "(anonima)") + "]";
      return value.name ? "[Function: " + value.name + "]" : "[Function (anonima)]";
    }

    if (seen.indexOf(value) !== -1) return "[Circular]";
    if (value instanceof Date) return isNaN(value.getTime()) ? "Invalid Date" : value.toISOString();
    if (value instanceof RegExp) return String(value);
    if (value instanceof Error) {
      var text = value.name + ": " + value.message;
      return nested ? "[" + text + "]" : text;
    }
    if (typeof Promise !== "undefined" && value instanceof Promise) return "Promise { ... }";
    if (typeof WeakMap !== "undefined" && value instanceof WeakMap) return "WeakMap { ... }";
    if (typeof WeakSet !== "undefined" && value instanceof WeakSet) return "WeakSet { ... }";
    if (typeof WeakRef !== "undefined" && value instanceof WeakRef) return "WeakRef { ... }";

    var isArray = Array.isArray(value);
    if (depth > MAX_DEPTH) return isArray ? "[Array]" : "[Object]";

    seen.push(value);
    try {
      var parts = [];
      var prefix = "";
      var open = "{";
      var close = "}";
      var i;

      if (isArray) {
        open = "[";
        close = "]";
        var n = Math.min(value.length, MAX_ITEMS);
        for (i = 0; i < n; i++) {
          parts.push(i in value ? inspect(value[i], depth + 1, seen, true) : "<vuoto>");
        }
        if (value.length > n) parts.push("... altri " + (value.length - n) + " elementi");
        var name = constructorName(value);
        if (name && name !== "Array") prefix = name + "(" + value.length + ") ";
      } else if (value instanceof Map) {
        prefix = "Map(" + value.size + ") ";
        var mi = 0;
        value.forEach(function (v, k) {
          if (mi++ < MAX_ITEMS) {
            parts.push(inspect(k, depth + 1, seen, true) + " => " + inspect(v, depth + 1, seen, true));
          }
        });
        if (value.size > MAX_ITEMS) parts.push("... altri " + (value.size - MAX_ITEMS) + " elementi");
      } else if (value instanceof Set) {
        prefix = "Set(" + value.size + ") ";
        var si = 0;
        value.forEach(function (v) {
          if (si++ < MAX_ITEMS) parts.push(inspect(v, depth + 1, seen, true));
        });
        if (value.size > MAX_ITEMS) parts.push("... altri " + (value.size - MAX_ITEMS) + " elementi");
      } else {
        var ctor = constructorName(value);
        if (ctor && ctor !== "Object") prefix = ctor + " ";
        var keys = Object.keys(value);
        var symbols = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(value) : [];
        var allKeys = keys.concat(symbols);
        for (i = 0; i < allKeys.length && i < MAX_ITEMS; i++) {
          var k = allKeys[i];
          var formatted;
          try {
            formatted = inspect(value[k], depth + 1, seen, true);
          } catch (e) {
            formatted = "<errore>";
          }
          parts.push(formatKey(k) + ": " + formatted);
        }
        if (allKeys.length > MAX_ITEMS) parts.push("... altre " + (allKeys.length - MAX_ITEMS) + " proprietà");
      }

      if (parts.length === 0) return prefix + open + close;

      var pad = isArray ? "" : " ";
      var single = prefix + open + pad + parts.join(", ") + pad + close;
      if (single.length + depth * 2 <= LINE_WIDTH && single.indexOf("\n") === -1) return single;

      var indent = new Array(depth + 2).join("  ");
      var closeIndent = new Array(depth + 1).join("  ");
      return prefix + open + "\n" + parts.map(function (p) { return indent + p; }).join(",\n") + "\n" + closeIndent + close;
    } finally {
      seen.pop();
    }
  }

  function format(value) {
    return inspect(value, 0, [], false);
  }

  // Supporto minimo ai segnaposto di console.log("%s ha %d anni", nome, eta)
  function formatArgs(args) {
    if (typeof args[0] === "string" && /%[sdifoOc%]/.test(args[0]) && args.length > 1) {
      var rest = args.slice(1);
      var first = args[0].replace(/%([sdifoOc%])/g, function (m, f) {
        if (f === "%") return "%";
        if (!rest.length) return m;
        var v = rest.shift();
        if (f === "c") return "";
        if (f === "d" || f === "i") return String(parseInt(v, 10));
        if (f === "f") return String(parseFloat(v));
        if (f === "s") return typeof v === "string" ? v : inspect(v, 1, [], true);
        return inspect(v, 0, [], true);
      });
      return [first].concat(rest.map(format)).join(" ");
    }
    return args.map(format).join(" ");
  }

  function formatTable(data) {
    if (data === null || typeof data !== "object") return format(data);
    var rowKeys = Array.isArray(data) ? data.map(function (_, i) { return String(i); }) : Object.keys(data);
    var columns = [];
    var hasValues = false;
    rowKeys.forEach(function (rk) {
      var row = data[rk];
      if (row !== null && typeof row === "object") {
        Object.keys(row).forEach(function (c) {
          if (columns.indexOf(c) === -1) columns.push(c);
        });
      } else {
        hasValues = true;
      }
    });
    var header = ["(indice)"].concat(columns);
    if (hasValues) header.push("Valori");
    var rows = rowKeys.map(function (rk) {
      var row = data[rk];
      var isObj = row !== null && typeof row === "object";
      var cells = [rk].concat(columns.map(function (c) {
        return isObj && c in row ? inspect(row[c], 1, [], true) : "";
      }));
      if (hasValues) cells.push(isObj ? "" : inspect(row, 1, [], true));
      return cells;
    });
    var widths = header.map(function (h, i) {
      return Math.max.apply(null, [h.length].concat(rows.map(function (r) { return r[i].length; })));
    });
    function line(cells) {
      return "│ " + cells.map(function (c, i) { return c + new Array(widths[i] - c.length + 1).join(" "); }).join(" │ ") + " │";
    }
    function sep(l, m, r) {
      return l + widths.map(function (w) { return new Array(w + 3).join("─"); }).join(m) + r;
    }
    return [sep("┌", "┬", "┐"), line(header), sep("├", "┼", "┤")]
      .concat(rows.map(line))
      .concat([sep("└", "┴", "┘")])
      .join("\n");
  }

  function deepEqual(a, b, seen) {
    if (Object.is(a, b)) return true;
    if (typeof a !== typeof b || a === null || b === null || typeof a !== "object") return false;
    seen = seen || [];
    for (var s = 0; s < seen.length; s++) if (seen[s][0] === a && seen[s][1] === b) return true;
    seen.push([a, b]);
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    if (a instanceof Date || b instanceof Date) return a instanceof Date && b instanceof Date && a.getTime() === b.getTime();
    if (a instanceof Map || b instanceof Map) {
      if (!(a instanceof Map && b instanceof Map) || a.size !== b.size) return false;
      var okMap = true;
      a.forEach(function (v, k) {
        if (!b.has(k) || !deepEqual(v, b.get(k), seen)) okMap = false;
      });
      return okMap;
    }
    if (a instanceof Set || b instanceof Set) {
      if (!(a instanceof Set && b instanceof Set) || a.size !== b.size) return false;
      var okSet = true;
      a.forEach(function (v) {
        if (!b.has(v)) okSet = false;
      });
      return okSet;
    }
    var ka = Object.keys(a);
    var kb = Object.keys(b);
    if (ka.length !== kb.length) return false;
    for (var i = 0; i < ka.length; i++) {
      if (!Object.prototype.hasOwnProperty.call(b, ka[i])) return false;
      if (!deepEqual(a[ka[i]], b[ka[i]], seen)) return false;
    }
    return true;
  }

  function stripComments(code) {
    return code
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/(^|[^:\\])\/\/.*$/gm, "$1")
      .replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, "");
  }

  function errorText(err) {
    if (err && typeof err === "object" && "message" in err) {
      return (err.name || "Error") + ": " + err.message;
    }
    return "Eccezione: " + format(err);
  }

  function friendlyError(err) {
    var text = errorText(err);
    if (err && err.name === "ReferenceError") {
      var m = /^(\S+) is not defined/.exec(err.message);
      if (m) text += "\n→ La variabile o funzione `" + m[1] + "` non esiste: controlla di averla dichiarata e di aver scritto bene il nome.";
    } else if (err && err.name === "TypeError" && /is not a function/.test(err.message)) {
      text += "\n→ Stai chiamando come funzione qualcosa che non è una funzione.";
    } else if (err && err.name === "SyntaxError") {
      text += "\n→ Errore di sintassi: controlla parentesi, virgolette e virgole.";
    }
    return text;
  }

  // Parser CSS minimale per validare gli esercizi CSS
  function parseCss(css) {
    var src = String(css || "").replace(/\/\*[\s\S]*?\*\//g, "");
    var rules = [];
    function parseBlock(text, media) {
      var i = 0;
      while (i < text.length) {
        var open = text.indexOf("{", i);
        if (open === -1) break;
        var selector = text.slice(i, open).trim();
        var depth = 1;
        var j = open + 1;
        while (j < text.length && depth > 0) {
          if (text[j] === "{") depth++;
          else if (text[j] === "}") depth--;
          j++;
        }
        var inner = text.slice(open + 1, j - 1);
        if (/^@media/i.test(selector)) {
          parseBlock(inner, selector.replace(/^@media\s*/i, "").replace(/\s+/g, " ").toLowerCase());
        } else if (selector && selector[0] !== "@") {
          var decls = {};
          inner.split(";").forEach(function (d) {
            var c = d.indexOf(":");
            if (c === -1) return;
            var prop = d.slice(0, c).trim();
            var val = d.slice(c + 1).trim().replace(/\s+/g, " ").replace(/\s*!important$/i, "");
            if (prop) decls[prop.indexOf("--") === 0 ? prop : prop.toLowerCase()] = prop.indexOf("--") === 0 ? val : val.toLowerCase();
          });
          selector.split(",").forEach(function (sel) {
            rules.push({ selector: sel.trim().replace(/\s+/g, " ").replace(/\s*([>+~])\s*/g, " $1 "), media: media, decls: decls });
          });
        }
        i = j;
      }
    }
    parseBlock(src, null);
    return rules;
  }

  function cssRuleGetter(rules) {
    return function (selector, media) {
      var norm = String(selector).trim().replace(/\s+/g, " ").replace(/\s*([>+~])\s*/g, " $1 ");
      var wantMedia = media === undefined ? null : String(media).replace(/\s+/g, " ").toLowerCase();
      var out = {};
      rules.forEach(function (r) {
        if (r.selector !== norm) return;
        if (wantMedia === null ? r.media !== null : r.media === null || r.media.indexOf(wantMedia) === -1) return;
        Object.keys(r.decls).forEach(function (k) { out[k] = r.decls[k]; });
      });
      return out;
    };
  }

  var AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

  async function execute(payload) {
    var code = payload.code || "";
    var validate = payload.validate || "";
    var isStatic = !!payload.isStatic || payload.mode === "css" || payload.mode === "static";
    var settleTimeout = payload.settleTimeout || 2500;

    var logs = [];
    var values = [];
    var asyncErrors = [];

    function push(level, args) {
      values.push(args);
      logs.push({ level: level, text: formatArgs(args) });
    }

    var counters = {};
    var sandboxConsole = {
      log: function () { push("log", Array.prototype.slice.call(arguments)); },
      info: function () { push("info", Array.prototype.slice.call(arguments)); },
      debug: function () { push("log", Array.prototype.slice.call(arguments)); },
      warn: function () { push("warn", Array.prototype.slice.call(arguments)); },
      error: function () { push("error", Array.prototype.slice.call(arguments)); },
      table: function (data) {
        values.push([data]);
        logs.push({ level: "log", text: formatTable(data) });
      },
      count: function (label) {
        label = label === undefined ? "default" : String(label);
        counters[label] = (counters[label] || 0) + 1;
        push("log", [label + ": " + counters[label]]);
      },
      group: function () { if (arguments.length) push("log", Array.prototype.slice.call(arguments)); },
      groupEnd: function () {},
      clear: function () { logs.length = 0; values.length = 0; },
    };

    // Timer tracciati: aspettiamo che finiscano prima di validare.
    var pending = new Set();
    var settleResolvers = [];
    function checkSettled() {
      if (pending.size === 0) {
        settleResolvers.splice(0).forEach(function (r) { r(); });
      }
    }
    function wrapCallback(fn, args) {
      return function () {
        try {
          if (typeof fn === "function") fn.apply(null, args);
        } catch (e) {
          asyncErrors.push(e);
        }
      };
    }
    var sbSetTimeout = function (fn, ms) {
      var args = Array.prototype.slice.call(arguments, 2);
      var id = setTimeout(function () {
        pending.delete(id);
        wrapCallback(fn, args)();
        // lascia il tempo alle microtask (Promise) di completarsi
        Promise.resolve().then(checkSettled);
      }, Math.min(Number(ms) || 0, 2000));
      pending.add(id);
      return id;
    };
    var sbClearTimeout = function (id) {
      clearTimeout(id);
      pending.delete(id);
      checkSettled();
    };
    var sbSetInterval = function (fn, ms) {
      var args = Array.prototype.slice.call(arguments, 2);
      var id = setInterval(wrapCallback(fn, args), Math.max(Number(ms) || 0, 10));
      pending.add(id);
      return id;
    };
    var sbClearInterval = function (id) {
      clearInterval(id);
      pending.delete(id);
      checkSettled();
    };
    function settle() {
      return new Promise(function (resolve) {
        var done = false;
        function finish() {
          if (!done) {
            done = true;
            resolve();
          }
        }
        settleResolvers.push(finish);
        setTimeout(finish, settleTimeout);
        // aspetta un giro di microtask anche se non ci sono timer
        setTimeout(checkSettled, 0);
      });
    }

    var rejectionHandler = function (event) {
      asyncErrors.push(event && "reason" in event ? event.reason : event);
      if (event && event.preventDefault) event.preventDefault();
    };
    if (root.addEventListener) root.addEventListener("unhandledrejection", rejectionHandler);

    var phase = { current: "code" };
    var result = { logs: logs, error: null, passed: null, message: null, pendingTimers: 0 };

    var helpers = {
      $logs: null,
      $output: null,
      $values: values,
      $code: code,
      $codeNoComments: stripComments(code),
      $equal: function (a, b) { return deepEqual(a, b); },
      $format: format,
    };
    var cssRules = payload.mode === "css" ? parseCss(code) : [];

    var body =
      (isStatic ? "" : code) +
      "\n;await $__settle();\n$__phase.current = 'validate';\n" +
      "$logs = $__logs(); $output = $logs.join('\\n');\n" +
      "return await (async () => {\n" + (validate || "return undefined;") + "\n})();";

    try {
      var fn;
      try {
        fn = new AsyncFunction(
          "console", "setTimeout", "clearTimeout", "setInterval", "clearInterval",
          "$__settle", "$__phase", "$__logs",
          "$logs", "$output", "$values", "$code", "$codeNoComments", "$equal", "$format",
          "$cssRules", "$cssRule",
          body
        );
      } catch (syntaxErr) {
        // Distinguiamo un errore di sintassi nel codice utente da uno nel validatore
        try {
          new AsyncFunction(isStatic ? "" : code);
        } catch (userSyntaxErr) {
          result.error = friendlyError(userSyntaxErr);
          return result;
        }
        result.error = "Errore interno nel validatore dell'esercizio: " + errorText(syntaxErr);
        return result;
      }

      var outcome = await fn(
        sandboxConsole, sbSetTimeout, sbClearTimeout, sbSetInterval, sbClearInterval,
        settle, phase, function () { return logs.map(function (l) { return l.text; }); },
        helpers.$logs, helpers.$output, helpers.$values, helpers.$code, helpers.$codeNoComments,
        helpers.$equal, helpers.$format,
        cssRules, cssRuleGetter(cssRules)
      );

      if (asyncErrors.length) {
        result.error = "Errore in codice asincrono: " + friendlyError(asyncErrors[0]);
      }

      if (validate) {
        if (outcome === true) {
          result.passed = !result.error;
        } else {
          result.passed = false;
          if (typeof outcome === "string") result.message = outcome;
        }
      }
    } catch (err) {
      if (phase.current === "code") {
        result.error = friendlyError(err);
      } else if (err && err.name === "ReferenceError") {
        var m = /^(\S+) is not defined/.exec(err.message);
        result.passed = false;
        result.message = m
          ? "Non trovo `" + m[1] + "`: controlla di averla dichiarata con il nome richiesto."
          : errorText(err);
      } else {
        result.passed = false;
        result.message = "Il risultato non è quello atteso (" + errorText(err) + ").";
      }
    } finally {
      pending.forEach(function (id) {
        clearTimeout(id);
        clearInterval(id);
      });
      result.pendingTimers = pending.size;
      pending.clear();
      if (root.removeEventListener) root.removeEventListener("unhandledrejection", rejectionHandler);
    }

    return result;
  }

  root.__sandboxExecute = execute;
  root.__sandboxFormat = format;

  if (typeof root.postMessage === "function" && typeof root.document === "undefined") {
    root.onmessage = function (event) {
      var data = event.data || {};
      execute(data).then(
        function (res) {
          res.id = data.id;
          root.postMessage(res);
        },
        function (err) {
          root.postMessage({ id: data.id, logs: [], error: errorText(err), passed: false, message: null });
        }
      );
    };
  }
})(typeof self !== "undefined" ? self : globalThis);
