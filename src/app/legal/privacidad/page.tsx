import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacidad" };

export default function Privacidad() {
  return (
    <article className="max-w-[62ch]">
      <h1 className="display mb-6 text-4xl">Política de privacidad</h1>

      <h2 className="display mb-3 mt-8 text-2xl">Qué datos recogemos</h2>
      <p className="mb-4 text-texto">
        Esta web no tiene registro, ni formularios, ni carrito. No te pedimos ningún
        dato personal y no guardamos ninguno en nuestros servidores.
      </p>

      <h2 className="display mb-3 mt-8 text-2xl">Cookies</h2>
      <p className="mb-4 text-texto">
        Look de Miedo no instala cookies propias de seguimiento. Cuando pulsas un
        enlace a Amazon, es Amazon quien puede instalar las suyas para saber que
        llegaste desde aquí — así funciona el programa de afiliados. Esas cookies se
        rigen por la política de privacidad de Amazon, no por esta.
      </p>

      <h2 className="display mb-3 mt-8 text-2xl">Enlaces a terceros</h2>
      <p className="mb-4 text-texto">
        Al salir de esta web dejas de estar cubierto por esta política. Revisa la del
        sitio al que llegues.
      </p>

      <h2 className="display mb-3 mt-8 text-2xl">Tus derechos</h2>
      <p className="mb-4 text-texto">
        Puedes ejercer tus derechos de acceso, rectificación, supresión, portabilidad
        y oposición escribiendo a la dirección de la página de contacto. Como no
        guardamos datos, en la práctica no habrá nada que rectificar ni suprimir.
      </p>
    </article>
  );
}
