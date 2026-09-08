import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DIVULGACION, ENLACE_AFILIADO } from "@/afiliados/enlace";
import { ProductoImagen } from "@/compartido/ProductoImagen";
import { getLook, getLooks, urlAmazon } from "@/looks/looks";

export function generateStaticParams() {
  return getLooks().map((l) => ({ slug: l.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const look = getLook((await params).slug);
  if (!look) return {};
  return { title: look.nombre, description: look.entradilla };
}

export default async function LookPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const look = getLook((await params).slug);
  if (!look) notFound();

  return (
    <article>
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-lila">
        {look.personaje}
      </p>
      <h1 className="display mb-4 text-balance text-4xl leading-[1.05] sm:text-5xl">
        {look.nombre}
      </h1>
      <p className="mb-10 max-w-[58ch] text-texto">{look.entradilla}</p>

      <h2 className="display mb-5 text-2xl">
        Las {look.piezas.length} piezas
      </h2>
      <ol className="grid gap-3">
        {look.piezas.map((p) => (
          <li
            key={p.asin}
            className="grid gap-4 rounded border border-linea bg-panel p-4 sm:grid-cols-[110px_1fr]"
          >
            <ProductoImagen src={p.src} alt={p.nombre} className="h-[110px] rounded" />
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.11em] text-niebla">
                {p.papel}
              </span>
              <h3 className="mt-1 text-[15px] font-extrabold leading-snug">{p.nombre}</h3>
              <p className="mt-1 text-[13px] text-niebla">
                {p.marca} · {p.modelo}
              </p>
              <p className="mt-2 max-w-[52ch] text-[13.5px] text-texto">{p.nota}</p>
              <a
                href={urlAmazon(p.asin)}
                {...ENLACE_AFILIADO}
                className="mt-3 inline-block rounded bg-rosa px-4 py-2 text-[11px] font-extrabold uppercase tracking-wide text-noche"
              >
                Verlo en Amazon
              </a>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-8 text-[12px] text-niebla">{DIVULGACION}</p>
    </article>
  );
}
