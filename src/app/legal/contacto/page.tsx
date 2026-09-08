import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contacto" };

export default function Contacto() {
  return (
    <article className="max-w-[62ch]">
      <h1 className="display mb-6 text-4xl">Contacto</h1>
      <p className="mb-4 text-texto">
        Si has visto algo mal, quieres proponer un look o tienes cualquier duda,
        escribe. Se contesta.
      </p>
      <p className="mb-4 text-texto">
        {/* TODO: sustituir por el correo de marca en cuanto exista la cuenta. */}
        <span className="text-niebla">Correo de contacto pendiente de dar de alta.</span>
      </p>
    </article>
  );
}
