"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  CATEGORIAS,
  COMPOSICION,
  type Categoria,
  type Look,
} from "@/looks/looks";

/**
 * Paso 1 y 2 del embudo.
 *
 *   1 · Las categorías, arriba del todo. Son la primera pregunta.
 *   2 · Al pulsar una, se despliega el panel con sus looks.
 *   3 · /look/[slug] — el modelo luciéndolo, con el desglose y los enlaces.
 *
 * Hubo una versión con un paso previo de "sola / en pareja / un complemento",
 * y sobraba: decía lo mismo que las categorías, que ya incluyen "En pareja".
 * Una capa menos.
 *
 * El paso 3 se queda como ruta propia: cada look necesita su URL o no lo
 * indexa nadie, y es la página que convierte cuando alguien busca un
 * personaje concreto.
 */
export function Embudo({ looks }: { looks: Look[] }) {
  const [abierta, setAbierta] = useState<Categoria | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const seleccion = abierta ? looks.filter((l) => l.categoria === abierta) : [];
  const cat = CATEGORIAS.find((c) => c.slug === abierta);

  useEffect(() => {
    if (!abierta) return;
    const cerrar = (e: KeyboardEvent) => e.key === "Escape" && setAbierta(null);
    document.addEventListener("keydown", cerrar);
    panel.current?.focus();
    return () => document.removeEventListener("keydown", cerrar);
  }, [abierta]);

  return (
    <section>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIAS.map((c, n) => {
          const activa = abierta === c.slug;
          return (
            <button
              key={c.slug}
              type="button"
              onClick={() => setAbierta(activa ? null : c.slug)}
              aria-expanded={activa}
              className={`aparece group rounded border bg-panel/80 p-5 text-left backdrop-blur-sm transition-all duration-300 ${
                activa
                  ? "border-lila bg-panel2"
                  : "border-linea hover:-translate-y-0.5 hover:border-lila"
              }`}
              style={{ animationDelay: `${120 + n * 70}ms` }}
            >
              <span className="display block text-xl leading-tight">{c.nombre}</span>
              <span className="mt-1 block text-[13px] text-niebla">{c.que}</span>
              <span
                className={`mt-3 block text-[11px] font-extrabold uppercase tracking-wider transition-colors ${
                  activa ? "text-lila" : "text-niebla group-hover:text-lila"
                }`}
              >
                {activa ? "Cerrar ✕" : "Ver →"}
              </span>
            </button>
          );
        })}
      </div>

      {abierta ? (
        <div
          ref={panel}
          tabIndex={-1}
          className="despliega mt-3 rounded border border-lila bg-panel2 p-6 outline-none"
        >
          {seleccion.length === 0 ? (
            <>
              <p className="display text-2xl">Esto está al caer</p>
              <p className="mt-2 max-w-[52ch] text-texto">
                Todavía no hemos publicado ningún look de {cat?.nombre.toLowerCase()}.
                Vuelve en unos días.
              </p>
              <Link
                href="/que-ver"
                className="mt-4 inline-block text-[13.5px] text-lila underline underline-offset-4"
              >
                Mientras, mira qué ver esa noche →
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
