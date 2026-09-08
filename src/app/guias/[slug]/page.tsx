import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DIVULGACION } from "@/afiliados/enlace";
import { getGuia, getGuias, TIPOS } from "@/guias/guias";
import { COMPOSICION, getLook } from "@/looks/looks";

export function generateStaticParams() {
  return getGuias().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuia(slug);
  if (!g) return {};
  return { title: g.titulo, description: g.entradilla };
}

export default async function GuiaPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const g = getGuia(slug);
  if (!g) notFound();

  // La guía no duplica los looks: los referencia y los enlaza.
  const looks = g.looks.map(getLook).filter((l) => l !== undefined);

  return (
    <article>
      <p className="aparece mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-lila">
        {TIPOS[g.tipo].nombre}
      </p>
      <h1 className="display aparece aparece-1 mb-4 max-w-[20ch] text-balance text-4xl leading-[1.03] sm:text-5xl">
        {g.titulo}
      </h1>
      <p className="aparece mb-2 max-w-[54ch] text-texto" style={{ animationDelay: "180ms" }}>
        {g.entradilla}
      </p>
      <time dateTime={g.fecha} className="mb-10 block text-[12px] text-niebla">
        {new Date(g.fecha).toLocaleDateString("es-ES", {
          day: "numeric", month: "long", year: "numeric",
        })}
      </time>

      <div className="mb-10 grid gap-4">
        {g.cuerpo.map((p, i) => (
          <p key={i} className="max-w-[62ch] text-[15.5px] leading-relaxed text-texto">
            {p}
          </p>
        ))}
      </div>

      {looks.length ? (
        <section>
          <h2 className="display mb-4 text-2xl">Los looks de esta guía</h2>
          <ul className="grid gap-2">
            {looks.map((l) => (
              <li key={l.slug}>
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
        </section>
      ) : null}

      <p className="mt-10 text-[12px] text-niebla">{DIVULGACION}</p>
    </article>
  );
}
