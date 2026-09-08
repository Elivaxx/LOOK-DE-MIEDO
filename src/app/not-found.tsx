import Link from "next/link";
import { Percha } from "@/compartido/ProductoImagen";

export default function NotFound() {
  return (
    <div className="py-14">
      <Percha className="mb-5 h-10 w-10 text-lila" />
      <h1 className="display mb-3 text-4xl">Aquí no hay nada colgado</h1>
      <p className="mb-6 max-w-[52ch] text-texto">
        La percha está vacía. O el enlace está mal, o esto todavía no lo hemos
        publicado.
      </p>
      <Link
        href="/"
        className="inline-block rounded bg-rosa px-5 py-3 text-[12px] font-extrabold uppercase tracking-wide text-noche"
      >
        Volver al principio
      </Link>
    </div>
  );
}
