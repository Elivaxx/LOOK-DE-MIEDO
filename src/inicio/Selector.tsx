"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORIAS, COMPOSICION, type Categoria, type Look } from "@/looks/looks";

/**
 * El selector, sobre el armario.
 *
 * El armario está SIEMPRE de fondo: es lo que llama a quedarse. Encima va una
 * capa que baja las luces para que se lea el texto, y encima de la capa los
 * botones.
 *
 * Funciona como acordeón, no como pantallas: al abrir una categoría se
 * despliegan sus opciones debajo y las demás categorías siguen visibles. Abrir
 * otra cierra la anterior. Nunca desaparece la navegación.
 *
 * Al elegir una opción, la capa se aclara para que el armario se vea de verdad
 * — es el momento en que "se abre" y aparece el modelo.
 *
 * Móvil primero: esto se va a ver mucho más en un teléfono que en un
 * escritorio, así que las opciones son de ancho completo y con área de toque
 * amplia. En pantallas anchas la lista pasa al costado izquierdo.
 */
export function Selector({ looks }: { looks: Look[] }) {
  const [abierta, setAbierta] = useState<Categoria | null>(null);
  const [elegido, setElegido] = useState<string | null>(null);

  return (
    <div className={elegido ? "capa-abierta" : undefined}>
      <ul className="grid gap-2">
        {CATEGORIAS.map((c, n) => {
          const activa = abierta === c.slug;
          const suyos = looks.filter((l) => l.categoria === c.slug);

          return (
            <li
              key={c.slug}
              className="aparece"
              style={{ animationDelay: `${100 + n * 60}ms` }}
            >
              <button
                type="button"
                aria-expanded={activa}
                onClick={() => {
                  setAbierta(activa ? null : c.slug);
                  setElegido(null);
                }}
                className={`flex w-full items-baseline gap-3 rounded border px-4 py-4 text-left backdrop-blur-md transition-all duration-300 sm:px-5 ${
                  activa
                    ? "border-lila bg-panel2/90"
                    : "border-linea bg-panel/70 hover:border-lila"
                }`}
              >
                <span className="display text-xl leading-none sm:text-2xl">{c.nombre}</span>
                <span className="hidden text-[12.5px] text-niebla sm:inline">{c.que}</span>
                <span
                  className={`ml-auto shrink-0 text-[11px] font-extrabold uppercase tracking-wider transition-transform duration-300 ${
                    activa ? "rotate-180 text-lila" : "text-niebla"
                  }`}
                  aria-hidden="true"
                >
                  ▾
                </span>
              </button>

              {/* Las opciones de la categoría abierta. Al costado en pantalla
                  ancha, de ancho completo en móvil, que es donde se va a ver. */}
              {activa ? (
                <div className="despliega mt-2 rounded border border-lila bg-panel2/90 p-4 backdrop-blur-md sm:ml-6">
                  {suyos.length === 0 ? (
                    <>
                      <p className="display text-xl">Esto está al caer</p>
                      <p className="mt-1 text-[13.5px] text-texto">
                        Todavía no hemos publicado nada de {c.nombre.toLowerCase()}.
                      </p>
                    </>
                  ) : (
                    <ul className="grid gap-1.5">
                      {suyos.map((l, i) => {
                        const sel = elegido === l.slug;
                        return (
                          <li
                            key={l.slug}
                            className="aparece"
                            style={{ animationDelay: `${i * 50}ms` }}
                          >
                            <Link
                              href={`/look/${l.slug}`}
                              onMouseEnter={() => setElegido(l.slug)}
                              onFocus={() => setElegido(l.slug)}
                              className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded border px-4 py-3 transition-all duration-300 ${
                                sel
                                  ? "border-lila bg-lila/12 text-hueso"
                                  : "border-linea bg-panel/60 hover:border-lila"
                              }`}
                            >
                              <span className="display text-lg">{l.nombre}</span>
                              <span className="text-[12px] text-niebla">{l.personaje}</span>
                              <span
                                className={`ml-auto text-[10.5px] font-extrabold uppercase tracking-wider ${
                                  sel ? "text-lila" : "text-niebla"
                                }`}
                              >
                                {COMPOSICION[l.composicion].nombre}
                              </span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
