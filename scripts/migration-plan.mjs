// @ts-check
/**
 * Migration bookkeeping shared by the two appliers — `scripts/migrate.mjs`
 * (deploy, `readdir`) and `src/lib/db.ts` (PGLite preview, `import.meta.glob`).
 *
 * Applied files are keyed by BASENAME, so the same file applies once no matter
 * which directory it is globbed from. That is what makes the auth schema safe to
 * copy from `migrations/auth/` into `migrations/` when an app turns sign-in on:
 * a database that already has `0001_auth.sql` will not re-run it.
 *
 * Neither applier descends into subdirectories, so `migrations/auth/*.sql` is
 * out of scope for both until it is copied up.
 */

/**
 * The `_migrations` key for a migration path (or bare filename).
 * @param {string} path
 * @returns {string}
 */
export function migrationName(path) {
  return path.split("/").pop() ?? path;
}

/**
 * @param {string} path
 * @returns {boolean}
 */
export function isMigrationFile(path) {
  return path.endsWith(".sql");
}

/**
 * Migrations in `paths` that are not yet in `applied`, in apply order.
 * Non-`.sql` entries (a `readdir` also yields `migrations/auth/`) are dropped.
 * @param {Iterable<string>} paths
 * @param {Iterable<string>} applied
 * @returns {Array<{ name: string, path: string }>}
 */
export function pendingMigrations(paths, applied) {
  const done = new Set(applied);
  return [...paths]
    .filter(isMigrationFile)
    .map((path) => ({ name: migrationName(path), path }))
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter(({ name }) => !done.has(name));
}

/**
 * Normalize a Postgres URL for node-postgres against Neon / Vercel.
 * `channel_binding=require` (Neon console default) breaks some Node/pg
 * versions; missing sslmode on a remote host fails TLS.
 * @param {string} raw
 * @returns {string}
 */
export function sanitizeDatabaseUrl(raw) {
  let next = String(raw).trim();
  next = next.replace(/([?&])channel_binding=[^&]*/gi, "$1");
  next = next.replace(/\?&/, "?").replace(/&&+/g, "&").replace(/[?&]$/, "");
  const isLocal = /localhost|127\.0\.0\.1/i.test(next);
  if (!isLocal && !/[?&]sslmode=/i.test(next)) {
    next += (next.includes("?") ? "&" : "?") + "sslmode=require";
  }
  return next;
}

/**
 * TLS options for a Pool. Localhost stays unencrypted; everything else
 * uses TLS and skips CA pinning (Vercel build images don't always have
 * Neon's chain).
 * @param {string} connectionString
 * @returns {{ rejectUnauthorized: boolean } | undefined}
 */
export function sslForDatabaseUrl(connectionString) {
  if (/localhost|127\.0\.0\.1/i.test(connectionString)) return undefined;
  return { rejectUnauthorized: false };
}

/**
 * Split a SQL script into statements Neon/PgBouncer can run one at a time.
 *
 * Hosted Postgres (Neon pooled endpoint especially) rejects a multi-statement
 * string sent as one query (`cannot insert multiple commands into a prepared
 * statement`). Deploy `npm run build` applies these files against DATABASE_URL,
 * so a whole-file `client.query(text)` fails the Vercel build even though the
 * same files apply fine on local PGLite via `exec()`.
 *
 * Understands `--` line comments, `/* block comments * /`, single-quoted
 * strings (`''` escapes) and `$tag$` dollar-quotes, so a semicolon inside a
 * string or function body is not treated as a separator.
 *
 * @param {string} sql
 * @returns {string[]}
 */
export function splitSqlStatements(sql) {
  const out = [];
  let cur = "";
  let i = 0;
  const n = sql.length;
  /** @type {"code" | "line" | "block" | "sq" | "dollar"} */
  let mode = "code";
  let dollarTag = "";

  while (i < n) {
    const c = sql[i];
    const nxt = i + 1 < n ? sql[i + 1] : "";

    if (mode === "line") {
      if (c === "\n") mode = "code";
      i += 1;
      continue;
    }
    if (mode === "block") {
      if (c === "*" && nxt === "/") {
        mode = "code";
        i += 2;
        continue;
      }
      i += 1;
      continue;
    }
    if (mode === "sq") {
      cur += c;
      if (c === "'" && nxt === "'") {
        cur += nxt;
        i += 2;
        continue;
      }
      if (c === "'") mode = "code";
      i += 1;
      continue;
    }
    if (mode === "dollar") {
      cur += c;
      if (c === "$") {
        const maybe = sql.slice(i, i + dollarTag.length);
        if (maybe === dollarTag) {
          cur += dollarTag.slice(1);
          i += dollarTag.length;
          mode = "code";
          continue;
        }
      }
      i += 1;
      continue;
    }

    if (c === "-" && nxt === "-") {
      mode = "line";
      i += 2;
      continue;
    }
    if (c === "/" && nxt === "*") {
      mode = "block";
      i += 2;
      continue;
    }
    if (c === "'") {
      mode = "sq";
      cur += c;
      i += 1;
      continue;
    }
    if (c === "$") {
      const rest = sql.slice(i);
      const m = rest.match(/^\$[A-Za-z_][\w]*\$/) || rest.match(/^\$\$/);
      if (m) {
        dollarTag = m[0];
        mode = "dollar";
        cur += dollarTag;
        i += dollarTag.length;
        continue;
      }
    }
    if (c === ";") {
      const stmt = cur.trim();
      if (stmt) out.push(stmt);
      cur = "";
      i += 1;
      continue;
    }
    cur += c;
    i += 1;
  }
  const tail = cur.trim();
  if (tail) out.push(tail);
  return out;
}
