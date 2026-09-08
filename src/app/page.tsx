import Link from "next/link";
import { Embudo } from "@/inicio/Embudo";
import { CATEGORIAS, getLooks } from "@/looks/looks";

export default function Home() {
  const looks = getLooks();

  return (
    <>
      <section className="armario -mx-5 mb-16 px-5 pb-20 pt-4">
        <p className="aparece mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-lila">
          Bro, ¿qué me pongo?
        </p>
        <h1 className="display aparece aparece-1 mb-4 max-w-[16ch] text-balance text-4xl leading-[1.02] sm:text-6xl">
          El look de Halloween, pieza a pieza
        </h1>
        <p
          className="aparece max-w-[52ch] text-texto"
          style={{ animationDelay: "180ms" }}
        >
          A ver, ¿qué te pones este año? Aquí cada look viene desmontado en las cuatro
          o cinco cosas que hay que comprar, con marca y modelo. Sin liarte. Y si vais
          dos, el de tu amiga sale del mismo sitio.
        </p>
      </section>

      <div className="mb-16">
        <Embudo looks={looks} />
      </div>

      <section>
        <h2 className="display mb-1 text-2xl">O tira por categoría</h2>
        <p className="mb-5 text-[13.5px] text-niebla">
          Si ya sabes lo que buscas y prefieres ir directo.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIAS.map((c, n) => (
            <Link
              key={c.slug}
              href={`/categoria/${c.slug}`}
              className="aparece rounded border border-linea bg-panel p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-lila"
              style={{ animationDelay: `${n * 70}ms` }}
            >
              <span className="display block text-xl">{c.nombre}</span>
              <span className="mt-1 block text-[13px] text-niebla">{c.que}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
