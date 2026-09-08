"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  COMPOSICION,
  INTENCIONES,
  type Intencion,
  type Look,
} from "@/looks/looks";

/**
 * El embudo de tres pasos.
 *
 *   1 · ¿Qué buscas?  →  sola · en pareja · un complemento
 *   2 · Se abre el panel al costado y eliges cuál
 *   3 · /look/[slug] — el modelo luciéndolo y el desglose con los enlaces
 *
 * Los pasos 1 y 2 viven aquí porque son navegación y tienen que ser
 * instantáneos. El paso 3 es una ruta de verdad: cada look necesita su URL
 * propia o no lo indexa nadie.
 */
export function Embudo({ looks }: { looks: Look[] }) {
  const [abierto, setAbierto] = useState<Intencion | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const seleccion = abierto ? looks.filter((l) => l.intencion === abierto) : [];

  useEffect(() => {
    if (!abierto) return;
    const cerrar = (e: KeyboardEvent) => e.key === "Escape" && setAbierto(null);
    document.addEventListener("keydown", cerrar);
    panel.current?.focus();
    return () => document.removeEventListener("keydown", cerrar);
  }, [abierto]);

  return (
    <section className="relative">
      <h2 className="display mb-1 text-3xl aparece">¿Qué buscas?</h2>
      <p className="mb-6 text-texto aparece aparece-1">
        Dime eso y te enseño solo lo que te sirve.
      </p>

      {/* ── Paso 1 ─────────────────────────────────────────────── */}
      <div className="grid gap-3 sm:grid-cols-3">
        {INTENCIONES.map((i, n) => {
          const activo = abierto === i.slug;
          return (
            <button
              key={i.slug}
              type="button"
              onClick={() => setAbierto(activo ? null : i.slug)}
              aria-expanded={activo}
              className={`aparece group rounded border bg-panel p-6 text-left transition-all duration-300 ${
                activo
                  ? "border-lila bg-panel2"
                  : "border-linea hover:border-lila hover:-translate-y-0.5"
              }`}
              style={{ animationDelay: `${120 + n * 90}ms` }}
            >
              <span className="display block text-2xl leading-tight">{i.nombre}</span>
              <span className="mt-1 block text-[13px] text-niebla">{i.que}</span>
              <span
                className={`mt-4 block text-[11px] font-extrabold uppercase tracking-wider transition-colors ${
                  activo ? "text-lila" : "text-niebla group-hover:text-lila"
                }`}
              >
                {activo ? "Cerrar ✕" : "Elegir →"}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Paso 2 ─────────────────────────────────────────────── */}
      {abierto ? (
        <div
          ref={panel}
          tabIndex={-1}
          className="despliega mt-3 rounded border border-lila bg-panel2 p-6 outline-none"
        >
          {seleccion.length === 0 ? (
            <>
              <p className="text-texto">
                Todavía no hay ningún look publicado aquí.
              </p>
              <p className="mt-2 max-w-[58ch] text-[13.5px] text-niebla">
                Un look no entra sin marca, modelo y ASIN reales de cada pieza. Esos
                datos los aporta una persona mirando la ficha: rellenar con nombres
                genéricos es lo que dejó la web anterior con 34 fichas inservibles.
              </p>
              <Link
                href="/que-ver"
                className="mt-4 inline-block text-[13px] text-lila underline underline-offset-4"
              >
                Mientras tanto, mira qué ver esa noche →
              </Link>
            </>
          ) : (
            <ul className="grid gap-2">
              {seleccion.map((l, n) => (
                <li key={l.slug} className="aparece" style={{ animationDelay: `${n * 60}ms` }}>
                  <Link
                    href={`/look/${l.slug}`}
                    className="flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded border border-linea bg-panel px-4 py-3 transition-colors hover:border-lila"
                  >
                    <span className="display text-xl">{l.nombre}</span>
                    <span className="text-[12px] text-niebla">{l.personaje}</span>
                    <span className="ml-auto text-[11px] font-extrabold uppercase tracking-wider text-lila">
                      {COMPOSICION[l.composicion].nombre}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}
    </section>
  );
}
