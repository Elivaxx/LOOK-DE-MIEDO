import type { Metadata } from "next";
import { DIVULGACION, ENLACE_AFILIADO, PRIME_VIDEO_CHANNELS } from "@/afiliados/enlace";

export const metadata: Metadata = {
  title: "Qué ver esa noche",
  description: "Dónde ver terror la noche de Halloween sin pagar de más.",
};

export default function QueVer() {
  return (
    <>
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-lila">
        31 de octubre
      </p>
      <h1 className="display mb-4 text-balance text-4xl leading-[1.05] sm:text-5xl">
        Qué ver esa noche
      </h1>
      <p className="mb-8 max-w-[58ch] text-texto">
        Si al final te quedas en casa, el plan se monta igual. Los canales de Prime
        Video se prueban gratis, así que puedes tener el catálogo de terror que te
        falte solo para esa noche.
      </p>

      <div className="rounded border border-linea bg-panel p-7">
        <h2 className="display mb-3 text-2xl">Canales de Prime Video</h2>
        <p className="mb-5 max-w-[58ch] text-texto">
          Cada canal se contrata por separado y casi todos traen periodo de prueba
          gratuito. Mira cuáles tienen prueba activa ahora mismo y quédate solo con el
          que te interese para el 31.
        </p>
        <a
          href={PRIME_VIDEO_CHANNELS}
          {...ENLACE_AFILIADO}
          className="inline-block rounded bg-rosa px-5 py-3 text-[12px] font-extrabold uppercase tracking-wide text-noche"
        >
          Ver los canales en Amazon
        </a>
        <p className="mt-5 text-[12px] text-niebla">{DIVULGACION}</p>
      </div>
    </>
  );
}
