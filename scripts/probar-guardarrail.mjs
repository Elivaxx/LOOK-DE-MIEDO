#!/usr/bin/env node
/**
 * Prueba del guardarraíl del catálogo.
 *
 *   node scripts/probar-guardarrail.mjs
 *
 * Le mete a propósito las fichas malas que produjo Navidad Ya y comprueba que
 * las rechaza todas. Un guardarraíl sin esta prueba no vale nada: si mañana
 * alguien afloja un patrón sin querer, esto lo caza.
 *
 * No importa `looks.ts` (es TypeScript): reimplementa la validación leyendo los
 * patrones del propio fichero, así que si allí se cambia un patrón, aquí cambia
 * también y la prueba sigue siendo real.
 */

import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const fuente = readFileSync(new URL("../src/looks/looks.ts", import.meta.url), "utf8");

/* Extrae los patrones tal cual están escritos en looks.ts */
const patrones = [...fuente.matchAll(/\{\s*patron:\s*(\/(?:[^/\\]|\\.)+\/[gimsuy]*)\s*,\s*motivo:\s*"([^"]+)"/g)]
  .map(([, re, motivo]) => {
    const i = re.lastIndexOf("/");
    return { patron: new RegExp(re.slice(1, i), re.slice(i + 1)), motivo };
  });

assert.ok(patrones.length >= 8, `esperaba al menos 8 patrones, encontré ${patrones.length}`);

const prohibe = (t) => patrones.some((p) => p.patron.test(t));

/* ── casos reales de Navidad Ya que hay que rechazar ─────────────────── */
const MALOS = [
  ["mejores-auriculares-menos-30-euros", "por menos de 30€"],
  ["precio con coma", "Vestido gótico 24,95 €"],
  ["recuento de reseñas", "+43.000 valoraciones reales"],
  ["estrellas", "4,8 de 5 estrellas"],
  ["superlativo", "el peluche más buscado del año"],
  ["superlativo 2", "la mejor peluca para Halloween"],
  ["superventas", "Novela superventas del año"],
  ["afirmación de escasez", "de las que se agotan todos los años sin falta"],
  ["todo el mundo", "el que todo el mundo lleva este año"],
  ["testimonio falso", "lo he probado y me encanta"],
  ["novedad inventada", "la novedad 2026 que arrasa"],
  ["lo que se lleva", "lo que se lleva este Halloween"],
  ["imagen de Amazon", "https://m.media-amazon.com/images/I/71abc.jpg"],
];

/* ── copy legítimo que NO se puede bloquear ──────────────────────────── */
const BUENOS = [
  ["criterio declarado", "el que yo pondría primero"],
  ["selección honesta", "esta es mi selección para ir de gótica"],
  ["descripción de prenda", "Vestido negro midi de manga larga con cuello blanco de pico"],
  ["nota de estilismo", "Las medias de rayas son lo que hace que se lea como un disfraz y no como ropa"],
  ["marca y modelo", "Widmann · 08745 · capa de terciopelo con capucha"],
];

let fallos = 0;
console.log("Casos que DEBEN rechazarse:\n");
for (const [nombre, texto] of MALOS) {
  const ok = prohibe(texto);
  console.log(`  ${ok ? "✓" : "✕"}  ${nombre.padEnd(24)} «${texto.slice(0, 46)}»`);
  if (!ok) fallos++;
}

console.log("\nCopy legítimo que NO debe bloquearse:\n");
for (const [nombre, texto] of BUENOS) {
  const ok = !prohibe(texto);
  console.log(`  ${ok ? "✓" : "✕"}  ${nombre.padEnd(24)} «${texto.slice(0, 46)}»`);
  if (!ok) fallos++;
}

console.log("");
if (fallos) {
  console.log(`${fallos} fallo(s) en el guardarraíl.`);
  process.exit(1);
}
console.log(`${MALOS.length + BUENOS.length} casos, todos correctos.`);
