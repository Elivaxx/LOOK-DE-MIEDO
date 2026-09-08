const AFFILIATE_TAG = "ivanleguizamo-21";

/**
 * Único punto por el que pasa todo enlace a Amazon del sitio, para que sea
 * imposible publicar uno sin tag.
 *
 * Se aplica DENTRO de la capa de datos (`src/looks/looks.ts`), nunca en las
 * vistas. En Navidad Ya eso dio 99 enlaces con 0 sin tag — no por disciplina,
 * sino porque no hay forma de escribir un enlace sin tag aunque quieras.
 *
 * Es idempotente a propósito: si la URL ya trae un `tag=` —porque viene de
 * SiteStripe o del botón de compartir de la app— se sustituye por el del
 * proyecto en vez de añadir un segundo. Sin esto, pegar un enlace de SiteStripe
 * producía `?tag=uno&tag=dos` y Amazon se queda con uno solo, rompiendo la
 * atribución por sitio sin avisar.
 */
export function withAffiliateTag(url: string): string {
  if (!url) return url;
  try {
    const u = new URL(url);
    u.searchParams.set("tag", AFFILIATE_TAG);
    return u.toString();
  } catch {
    return url; // relativa o malformada: no la tocamos antes que romperla
  }
}

/** Props obligatorias de todo enlace saliente a Amazon. */
export const ENLACE_AFILIADO = {
  target: "_blank",
  rel: "nofollow sponsored noopener",
} as const;

/** Divulgación literal exigida por el Acuerdo Operativo. No se redacta otra. */
export const DIVULGACION = "Como Afiliado de Amazon, gano por compras elegibles.";

/**
 * Recompensas de Prime Video Channels: 3 € fijos por prueba gratis, sin que el
 * visitante gaste un euro. Enlazar aquí está expresamente permitido aunque no
 * sea una ficha de producto (Ingresos 4(a)).
 */
export const PRIME_VIDEO_CHANNELS = withAffiliateTag(
  "https://www.primevideo.com/storefront/channels"
);
