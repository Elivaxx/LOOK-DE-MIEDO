import Link from "next/link";
import { CATEGORIAS, getLooks } from "@/looks/looks";
import { Percha } from "@/compartido/ProductoImagen";

export default function Home() {
  const looks = getLooks();

  return (
    <>
      <section className="mb-14">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-lila">
          Bro, ¿qué me pongo?
        </p>
        <h1 className="display mb-4 text-balance text-4xl leading-[1.05] sm:text-6xl">
          El look de Halloween,
          <br />
          pieza a pieza
        </h1>
        <p className="max-w-[54ch] text-texto">
          A ver, ¿qué te pones este año? Aquí cada look viene desmontado en las cuatro
          o cinco cosas que hay que comprar, con marca y modelo. Sin liarte. Y si vais
          dos, el de tu amiga sale del mismo sitio.
        </p>
      </section>

      {looks.length === 0 ? (
        <section className="mb-14 rounded border border-linea bg-panel p-8">
          <Percha className="mb-4 h-8 w-8 text-lila" />
          <h2 className="display mb-2 text-2xl">Todavía no hay looks publicados</h2>
          <p className="max-w-[58ch] text-texto">
            Un producto no entra al catálogo sin marca, modelo y ASIN reales. Esos datos
            los aporta una persona mirando la ficha: recorrer Amazon con un robot está
            prohibido, y rellenar con nombres genéricos es lo que dejó la web anterior
            con 34 fichas inservibles.
          </p>
          <p className="mt-3 max-w-[58ch] text-texto">
            Mientras tanto, lo que sí funciona ya está en{" "}
            <Link href="/que-ver" className="text-lila underline underline-offset-4">
              qué ver esa noche
            </Link>
            .
          </p>
        </section>
      ) : null}

      <section>
        <h2 className="display mb-5 text-3xl">Por dónde empezar</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIAS.map((c) => (
            <Link
              key={c.slug}
              href={`/categoria/${c.slug}`}
              className="rounded border border-linea bg-panel p-5 transition-colors hover:border-lila"
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
