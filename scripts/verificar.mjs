#!/usr/bin/env node
/**
 * Verificación de cumplimiento contra PRODUCCIÓN, no contra capturas.
 *
 *   node scripts/verificar.mjs https://look-de-miedo.vercel.app
 *   node scripts/verificar.mjs            (sin argumento: usa el build local de .next)
 *
 * POR QUÉ EXISTE: en Navidad Ya el panel del navegador dio dos diagnósticos
 * falsos —un hero "roto" que funcionaba y un scroll "roto" que era la pestaña
 * oculta sin componer frames— y se persiguieron como si fueran bugs reales.
 * Lo que sí funciona es pedir el HTML y hacerle aserciones.
 *
 * Se pasa DESPUÉS DE CADA DESPLIEGUE. Sale con código 1 si algo falla, así que
 * sirve tal cual en CI.
 */

import { readFileSync } from "node:fs";


const TAG = "ivanleguizamo-21";
const DIVULGACION = "Como Afiliado de Amazon, gano por compras elegibles.";

/** Páginas que legítimamente no llevan divulgación por no tener enlaces de afiliado. */
const SIN_DIVULGACION_OK = new Set(["_global-error"]);

const RUTAS = [
  "/",
  "/que-ver",
  "/categoria/looks-de-peli",
  "/categoria/en-pareja",
  "/categoria/maquillaje",
  "/categoria/pelucas",
  "/categoria/complementos",
  "/legal/afiliados",
  "/legal/privacidad",
  "/legal/contacto",
];

/* ── las reglas ─────────────────────────────────────────────────────── */

const REGLAS = [
  {
    nombre: "todo enlace a Amazon lleva el tag",
    clausula: "Requisito 1 · el tag va en cada enlace",
    check(html) {
      const fallos = [];
      const re = /href="(https?:\/\/(?:www\.)?(?:amazon\.[a-z.]+|primevideo\.com)[^"]*)"/g;
      let m;
      while ((m = re.exec(html))) {
        if (!m[1].includes(`tag=${TAG}`)) fallos.push(m[1].slice(0, 70));
      }
      return fallos;
    },
  },
  {
    nombre: "todo enlace a Amazon lleva rel nofollow",
    clausula: "guía oficial de IA de Amazon",
    check(html) {
      const fallos = [];
      const re = /<a\b[^>]*href="https?:\/\/(?:www\.)?(?:amazon\.[a-z.]+|primevideo\.com)[^"]*"[^>]*>/g;
      let m;
      while ((m = re.exec(html))) {
        if (!/rel="[^"]*nofollow/.test(m[0])) fallos.push(m[0].slice(0, 80));
      }
      return fallos;
    },
  },
  {
    nombre: "ninguna imagen servida por Amazon",
    clausula: "Licencia 2(h) y 6(b)",
    check(html) {
      const hosts = ["media-amazon", "images-amazon", "ssl-images-amazon", "m.media-amazon"];
      return hosts.filter((h) => html.includes(h));
    },
  },
  {
    nombre: "ningún precio visible",
    clausula: "Requisito 2(b)",
    check(html) {
      // Solo en el texto visible: se quitan las etiquetas y el JSON del payload.
      const txt = visible(html);
      const m = txt.match(/\d+[,.]\d{2}\s*(?:€|EUR)|(?:€|EUR)\s*\d+[,.]\d{2}/g);
      return m ? [...new Set(m)] : [];
    },
  },
  {
    nombre: "ninguna valoración ni recuento de reseñas",
    clausula: "Requisito 6(t)",
    check(html) {
      const txt = visible(html);
      // "4,8 de 5", "163 reseñas", "+43.000 valoraciones" — no la palabra suelta,
      // que aparece legítimamente en el aviso de afiliados explicando que NO las usamos.
      const m = txt.match(
        /\d[\d.,]*\s*(?:de\s*5|estrellas|valoraciones|reseñas|opiniones)|\+\s*[\d.,]+\s*(?:valoraciones|reseñas)/gi
      );
      return m ? [...new Set(m)] : [];
    },
  },
  {
    nombre: "la divulgación literal está presente",
    clausula: "Acuerdo Operativo · texto exacto",
    check(html, ruta) {
      if (SIN_DIVULGACION_OK.has(ruta)) return [];
      return html.includes(DIVULGACION) ? [] : ["falta la frase literal"];
    },
  },
];

/** Texto visible: sin etiquetas y sin el payload de Next, que duplica todo el copy. */
function visible(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ");
}

/* ── ejecución ──────────────────────────────────────────────────────── */

async function traer(base, ruta) {
  if (base) {
    const r = await fetch(base.replace(/\/$/, "") + ruta);
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return await r.text();
  }
  const f = ruta === "/" ? "index" : ruta.slice(1);
  return readFileSync(`.next/server/app/${f}.html`, "utf8");
}

const base = process.argv[2] || null;
console.log(base ? `Verificando ${base}` : "Verificando el build local (.next)");
console.log("");

let fallos = 0;
for (const ruta of RUTAS) {
  let html;
  try {
    html = await traer(base, ruta);
  } catch (e) {
    console.log(`  ✕  ${ruta}  —  no se pudo leer: ${e.message}`);
    fallos++;
    continue;
  }
  const nombre = ruta === "/" ? "index" : ruta.slice(1);
  const problemas = [];
  for (const r of REGLAS) {
    const p = r.check(html, nombre);
    if (p.length) problemas.push(`${r.nombre} [${r.clausula}] → ${p.join(" · ")}`);
  }
  if (problemas.length) {
    fallos += problemas.length;
    console.log(`  ✕  ${ruta}`);
    problemas.forEach((p) => console.log(`       ${p}`));
  } else {
    console.log(`  ✓  ${ruta}`);
  }
}

console.log("");
if (fallos) {
  console.log(`${fallos} problema(s). NO desplegar hasta arreglarlos.`);
  process.exit(1);
}
console.log(`${RUTAS.length} rutas, 0 problemas.`);
