// Marcador declarado en vez de hueco roto.
//
// Sin PA API no hay ninguna vía legítima de enseñar la foto real de un producto
// de Amazon. Ninguna: ni rascada, ni hotlinkeada, ni recreada con IA
// (Licencia 1, 2(h), 6(a)(b), Requisito 2(b)).
//
// El día que haya PA API se rellena `src` en los datos y TODAS las páginas se
// encienden solas, sin tocar ninguna.

type Props = { src?: string | null; alt: string; className?: string };

export function ProductoImagen({ src, alt, className = "" }: Props) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={className} loading="lazy" />;
  }
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 border border-[var(--linea)] bg-[var(--panel2)] ${className}`}
      role="img"
      aria-label={`${alt} — la foto está en Amazon`}
    >
      <Percha className="h-7 w-7 opacity-30" />
      <span className="text-[11px] text-[var(--niebla)]">Ver en Amazon →</span>
    </div>
  );
}

/** El símbolo de la marca: una percha cuyo gancho es un signo de interrogación. */
export function Percha({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M50 45 L50 29 C50 21 58.5 19.5 58.5 13.5 C58.5 8 51.5 5.2 45.8 8.6" />
        <path d="M50 46 L21.5 67 L78.5 67 Z" />
      </g>
      <circle cx="50" cy="59" r="4" fill="currentColor" />
    </svg>
  );
}
