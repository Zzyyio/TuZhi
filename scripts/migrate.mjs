#!/usr/bin/env node
/**
 * Deploy-time database migrator (node-postgres, `pg`).
 *
 * Runs during `npm run build` — on every Vercel deploy — applying pending files
 * in ../migrations to DATABASE_URL. Each file is applied in one transaction and
 * recorded in a `_migrations` table, so it runs once and is safe to re-run.
 *
 * Neon’s pooled (PgBouncer) endpoint rejects a whole multi-statement file as
 * one query, so statements are split and executed one by one. The same files
 * still apply as a unit on local PGLite via `exec()` (see src/lib/db.ts).
 *
 * A connection / SQL failure here MUST NOT fail the Vercel build: the same
 * files are applied on first request (`src/lib/db.ts` applyNeonMigrations).
 * Exiting 1 is what blocked publish when DATABASE_URL was set but Neon was
 * unreachable, required extra TLS flags, or rejected a multi-statement file.
 *
 * The read is non-recursive, so the opt-in auth schema under migrations/auth/
 * is not applied to an app that never asked for sign-in.
 *
 * No DATABASE_URL (local / preview builds) -> skip; the PGLite fallback applies
 * the same files at startup instead (see src/lib/db.ts).
 */
import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import pg from "pg";
import {
  pendingMigrations,
  sanitizeDatabaseUrl,
  splitSqlStatements,
  sslForDatabaseUrl,
} from "./migration-plan.mjs";

const rawDatabaseUrl = process.env.DATABASE_URL;
if (!rawDatabaseUrl || !rawDatabaseUrl.trim()) {
  console.log(
    "[migrate] DATABASE_URL not set — skipping (the PGLite fallback migrates itself).",
  );
  process.exit(0);
}

const databaseUrl = sanitizeDatabaseUrl(rawDatabaseUrl);
const migrationsDir = join(dirname(fileURLToPath(import.meta.url)), "..", "migrations");

async function main() {
  let entries;
  try {
    entries = await readdir(migrationsDir);
  } catch {
    console.log("[migrate] no migrations/ directory — nothing to do.");
    return;
  }
  // An app with no schema of its own must not pay for a database connection.
  if (pendingMigrations(entries, []).length === 0) {
    console.log("[migrate] no migrations — nothing to do.");
    return;
  }

  const pool = new pg.Pool({
    connectionString: databaseUrl,
    max: 1,
    ssl: sslForDatabaseUrl(databaseUrl),
    connectionTimeoutMillis: 15_000,
    idleTimeoutMillis: 5_000,
  });
  try {
    const client = await pool.connect();
    try {
      await client.query(
        "CREATE TABLE IF NOT EXISTS _migrations (name TEXT PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL DEFAULT now())",
      );
      const applied = (await client.query("SELECT name FROM _migrations")).rows.map(
        (r) => r.name,
      );

      let count = 0;
      for (const { name } of pendingMigrations(entries, applied)) {
        const text = await readFile(join(migrationsDir, name), "utf8");
        const statements = splitSqlStatements(text);
        if (statements.length === 0) {
          console.log(`[migrate] ${name} is empty — recording as applied`);
        }
        try {
          await client.query("BEGIN");
          for (const stmt of statements) {
            try {
              await client.query(stmt);
            } catch (err) {
              const preview = stmt.replace(/\s+/g, " ").slice(0, 120);
              console.error(`[migrate] statement failed in ${name}: ${preview}`);
              throw err;
            }
          }
          await client.query("INSERT INTO _migrations (name) VALUES ($1)", [name]);
          await client.query("COMMIT");
        } catch (err) {
          console.error(`[migrate] error applying ${name} (${statements.length} statement(s))`);
          try {
            await client.query("ROLLBACK");
          } catch {
            // ROLLBACK fails when the connection died — keep the original error.
          }
          throw err;
        }
        console.log(`[migrate] applied ${name} (${statements.length} statement(s))`);
        count += 1;
      }
      console.log(count ? `[migrate] done — ${count} migration(s) applied.` : "[migrate] up to date.");
    } finally {
      client.release();
    }
  } finally {
    await pool.end().catch(() => undefined);
  }
}

main().catch((err) => {
  console.error("[migrate] failed:", err?.message || err);
  for (const key of ["code", "detail", "hint", "position", "where"]) {
    if (err?.[key] != null) console.error(`[migrate]   ${key}: ${err[key]}`);
  }
  // Do not fail `npm run build`. Schema is re-applied on first production
  // request; a Neon blip during Vercel build must not block publish.
  console.error("[migrate] continuing the build — schema will apply on first request.");
  process.exit(0);
});
