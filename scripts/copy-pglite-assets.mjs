#!/usr/bin/env node
/**
 * Nitro bundles electric-sql__pglite.mjs but does not copy sibling
 * pglite.data / pglite.wasm / initdb.wasm, so production preview dies with ENOENT.
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(root, "node_modules/@electric-sql/pglite/dist");
const files = ["pglite.data", "pglite.wasm", "initdb.wasm"];

function copyInto(dest) {
  if (!existsSync(dest)) return 0;
  let n = 0;
  for (const f of files) {
    const from = join(srcDir, f);
    if (!existsSync(from)) continue;
    copyFileSync(from, join(dest, f));
    n += 1;
  }
  return n;
}

const dests = new Set();
const funcRoot = join(root, ".vercel/output/functions");
if (existsSync(funcRoot)) {
  for (const name of readdirSync(funcRoot)) {
    dests.add(join(funcRoot, name, "_libs"));
  }
}
dests.add(join(root, ".vercel/output/functions/__server.func/_libs"));

let copied = 0;
for (const dest of dests) {
  mkdirSync(dest, { recursive: true });
  copied += copyInto(dest);
}
if (copied === 0) {
  console.warn("[pglite-assets] nothing copied (build output missing?)");
} else {
  console.log(`[pglite-assets] copied ${files.join(", ")} into function _libs`);
}
