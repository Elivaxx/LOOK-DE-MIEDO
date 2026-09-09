import Link from "next/link";
import { Selector } from "@/inicio/Selector";
import { getLooks } from "@/looks/looks";
import { getGuias, TIPOS } from "@/guias/guias";

export default function Home() {
  const looks = getLooks();
  const guias = getGuias().slice(0, 3);

  return (
    <>
      {/* Hero y categorías comparten el armario: las categorías son la
          primera pregunta, así que van dentro, no en un bloque aparte. */}
      <section className="armario -mx-5 mb-16 px-5 pb-14 pt-4">
        <p className="aparece mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-lila">
          Bro, ¿qué me pongo?
        </p>
        <h1 className="display aparece aparece-1 mb-4 max-w-[16ch] text-balance text-4xl leading-[1.02] sm:text-6xl">
          El look de Halloween, pieza a pieza
        </h1>
        <p
          className="aparece mb-10 max-w-[52ch] text-texto"
          style={{ animationDelay: "180ms" }}
        >
          A ver, ¿qué te pones este año? Aquí cada look viene desmontado en las cuatro
          o cinco cosas que hay que comprar, con marca y modelo. Sin liarte. Y si vais
          dos, el de tu amiga sale del mismo sitio.
        </p>

        <Selector looks={looks} />
      </section>

      <section>
        <div className="mb-5 flex flex-wrap items-baseline gap-x-4">
          <h2 className="display text-2xl">Guías</h2>
          <p className="text-[13.5px] text-niebla">
            Comparativas y cómo se arma cada disfraz.
          </p>
          {guias.length ? (
            <Link
              href="/guias"
              className="ml-auto text-[11px] font-extrabold uppercase tracking-wider text-lila"
            >
              Todas →
            </Link>
          ) : null}
        </div>

        {guias.length === 0 ? (
          <p className="rounded border border-linea bg-panel p-6 text-texto">
            Las primeras están en camino.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-3">
            {guias.map((g, n) => (
              <Link
                key={g.slug}
                href={`/guias/${g.slug}`}
                className="aparece rounded border border-linea bg-panel p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-lila"
                style={{ animationDelay: `${n * 70}ms` }}
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.11em] text-lila">
                  {TIPOS[g.tipo].nombre}
                </span>
                <span className="display mt-1 block text-xl leading-tight">{g.titulo}</span>
                <span className="mt-1 block text-[13px] text-niebla">{g.entradilla}</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
