import type { Metadata } from "next";
import { DIVULGACION } from "@/afiliados/enlace";

export const metadata: Metadata = { title: "Aviso de afiliados" };

export default function Afiliados() {
  return (
    <article className="max-w-[62ch]">
      <h1 className="display mb-6 text-4xl">Aviso de afiliados</h1>
      <p className="mb-4 text-lg text-hueso">{DIVULGACION}</p>
      <p className="mb-4 text-texto">
        Look de Miedo participa en el Programa de Afiliados de Amazon EU, un programa
        de publicidad para afiliados diseñado para ofrecer a sitios web un modo de
        obtener comisiones por publicidad, publicitando e incluyendo enlaces a
        Amazon.es.
      </p>
      <p className="mb-4 text-texto">
        Cuando pulsas uno de nuestros enlaces y compras algo, Amazon nos paga una
        comisión. <strong className="text-hueso">A ti no te cuesta nada más</strong>:
        el precio es el mismo que si hubieras entrado directamente.
      </p>
      <h2 className="display mb-3 mt-9 text-2xl">Qué no hacemos</h2>
      <ul className="mb-4 list-disc space-y-2 pl-5 text-texto marker:text-lila">
        <li>
          No mostramos precios ni valoraciones. No tenemos acceso a la API de
          Amazon, así que cualquier precio que copiáramos estaría desactualizado a
          los cinco minutos. Míralos en Amazon, que siempre están al día.
        </li>
        <li>
          No usamos fotos de producto de Amazon. Las ilustraciones de esta web son
          nuestras.
        </li>
        <li>
          No decimos haber probado nada que no hayamos probado. Cuando
          recomendamos algo, es una selección con criterio, no una reseña.
        </li>
      </ul>
    </article>
  );
}
