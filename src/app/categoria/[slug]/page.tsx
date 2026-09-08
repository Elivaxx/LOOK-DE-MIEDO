import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CATEGORIAS, getLooksDeCategoria, type Categoria } from "@/looks/looks";

export function generateStaticParams() {
  return CATEGORIAS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const cat = CATEGORIAS.find((c) => c.slug === slug);
  return cat ? { title: cat.nombre, description: cat.que } : {};
}

export default async function CategoriaPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;
  const cat = CATEGORIAS.find((c) => c.slug === slug);
  if (!cat) notFound();

  const looks = getLooksDeCategoria(slug as Categoria);

  return (
    <>
      <h1 className="display mb-3 text-balance text-4xl leading-[1.05] sm:text-5xl">
        {cat.nombre}
      </h1>
      <p className="mb-10 max-w-[56ch] text-texto">{cat.que}</p>

      {looks.length === 0 ? (
        <p className="rounded border border-linea bg-panel p-6 text-texto">
          Todavía no hay nada publicado en esta categoría.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {looks.map((l) => (
            <Link
              key={l.slug}
              href={`/look/${l.slug}`}
              className="rounded border border-linea bg-panel p-5 transition-colors hover:border-lila"
            >
              <span className="display block text-xl">{l.nombre}</span>
              <span className="mt-1 block text-[12px] text-niebla">
                {l.piezas.length} piezas · {l.personaje}
              </span>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
