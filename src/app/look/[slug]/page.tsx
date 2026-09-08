import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DIVULGACION, ENLACE_AFILIADO } from "@/afiliados/enlace";
import { ProductoImagen } from "@/compartido/ProductoImagen";
import { COMPOSICION, getLook, getLooks, urlAmazon } from "@/looks/looks";

export function generateStaticParams() {
  return getLooks().map((l) => ({ slug: l.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const look = getLook(slug);
  if (!look) return {};
  return { title: look.nombre, description: look.entradilla };
}

/**
 * Paso 3 del embudo: el modelo luciéndolo, y debajo el desglose con los enlaces.
 *
 * El avatar va en PNG recortado sobre el fondo de armario compartido: el fondo
 * se descarga una vez para toda la web y cada modelo pesa una fracción.
 */
export default async function LookPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const look = getLook(slug);
  if (!look) notFound();

  const comp = COMPOSICION[look.composicion];
  const pareja = look.pareja ? getLook(look.pareja) : undefined;

  return (
    <article>
      {/* ── El modelo, sobre el armario ─────────────────────────── */}
      <header className="armario -mx-5 mb-12 px-5 pb-14 pt-4">
        <p className="aparece mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-lila">
          {look.personaje}
        </p>
        <h1 className="display aparece aparece-1 mb-4 max-w-[18ch] text-balance text-4xl leading-[1.02] sm:text-5xl">
          {look.nombre}
        </h1>
        <p className="aparece max-w-[54ch] text-texto" style={{ animationDelay: "180ms" }}>
          {look.entradilla}
        </p>

        {/* El armario ha estado vacío durante los pasos 1 y 2. Aquí se puebla:
            el avatar entra en PNG recortado, sobre el mismo fondo de siempre. */}
        {look.avatar ? (
          <figure className="entra-avatar mt-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={look.avatar.src}
              alt={look.avatar.alt}
              className="mx-auto max-h-[560px] w-auto drop-shadow-[0_30px_60px_rgba(0,0,0,.55)]"
            />
            {look.avatar.generadoConIA ? (
              <figcaption className="mt-3 text-center text-[11px] text-niebla">
                Imagen generada con IA. No es una persona real.
              </figcaption>
            ) : null}
          </figure>
        ) : null}
      </header>

      {/* ── Cómo se resuelve ────────────────────────────────────── */}
      <section className="mb-10 rounded border border-lila bg-panel2 p-5">
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-lila">
          Cómo se monta
        </span>
        <p className="display mt-1 text-2xl">{comp.nombre}</p>
        <p className="mt-1 max-w-[56ch] text-[13.5px] text-texto">{comp.que}</p>
      </section>

      {/* ── Las piezas ──────────────────────────────────────────── */}
      <h2 className="display mb-5 text-2xl">
        {look.piezas.length === 1 ? "La pieza" : `Las ${look.piezas.length} piezas`}
      </h2>
      <ol className="mb-10 grid gap-3">
        {look.piezas.map((p, n) => (
          <li
            key={p.asin}
            className="aparece grid gap-4 rounded border border-linea bg-panel p-4 transition-colors hover:border-lila sm:grid-cols-[110px_1fr]"
            style={{ animationDelay: `${n * 70}ms` }}
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
                className="mt-3 inline-block rounded bg-rosa px-4 py-2 text-[11px] font-extrabold uppercase tracking-wide text-noche transition-transform hover:-translate-y-0.5"
              >
                Verlo en Amazon
              </a>
            </div>
          </li>
        ))}
      </ol>

      {pareja ? (
        <section className="mb-10">
          <h2 className="display mb-3 text-2xl">Y el de quien va contigo</h2>
          <Link
            href={`/look/${pareja.slug}`}
            className="flex flex-wrap items-baseline gap-x-3 rounded border border-linea bg-panel px-4 py-3 transition-colors hover:border-lila"
          >
            <span className="display text-xl">{pareja.nombre}</span>
            <span className="text-[12px] text-niebla">{pareja.personaje}</span>
            <span className="ml-auto text-[11px] font-extrabold uppercase tracking-wider text-lila">
              Verlo →
            </span>
          </Link>
        </section>
      ) : null}

      <p className="text-[12px] text-niebla">{DIVULGACION}</p>
    </article>
  );
}
