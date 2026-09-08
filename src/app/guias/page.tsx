import Link from "next/link";
import type { Metadata } from "next";
import { getGuias, TIPOS } from "@/guias/guias";

export const metadata: Metadata = {
  title: "Guías",
  description: "Comparativas y cómo se arma cada disfraz de Halloween, pieza a pieza.",
};

export default function Guias() {
  const guias = getGuias();

  return (
    <>
      <h1 className="display mb-3 text-balance text-4xl leading-[1.05] sm:text-5xl">Guías</h1>
      <p className="mb-10 max-w-[56ch] text-texto">
        Comparativas entre dos formas de resolver el mismo look, y el paso a paso de
        montar un disfraz desde cero.
      </p>

      {guias.length === 0 ? (
        <p className="rounded border border-linea bg-panel p-6 text-texto">
          Todavía no hay ninguna publicada. Las primeras salen en cuanto haya looks que
          comparar.
        </p>
      ) : (
        <div className="grid gap-3">
          {guias.map((g, n) => (
            <Link
              key={g.slug}
              href={`/guias/${g.slug}`}
              className="aparece rounded border border-linea bg-panel p-5 transition-colors hover:border-lila"
              style={{ animationDelay: `${n * 60}ms` }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.11em] text-lila">
                {TIPOS[g.tipo].nombre}
              </span>
              <span className="display mt-1 block text-2xl leading-tight">{g.titulo}</span>
              <span className="mt-1 block text-[13.5px] text-niebla">{g.entradilla}</span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
