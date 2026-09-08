import { withAffiliateTag } from "@/afiliados/enlace";

/** Una pieza del look. Sin marca y modelo NO entra: es la regla 12 de Navidad Ya. */
export type Pieza = {
  papel: string;   // "el vestido", "las medias" — qué hace en el look
  nombre: string;  // marca + qué es + rasgo, ~70 caracteres
  marca: string;
  modelo: string;
  asin: string;    // obligatorio: sin ASIN el enlace no convierte
  nota: string;    // una línea de por qué esta y no otra
  src?: string | null; // se rellena solo el día que haya PA API
};

export type Look = {
  slug: string;
  nombre: string;
  personaje: string;   // uso descriptivo del nombre, va en TEXTO
  categoria: Categoria;
  entradilla: string;
  piezas: Pieza[];
  pareja?: string;     // slug del look que hace juego
};

export type Categoria =
  | "looks-de-peli"
  | "en-pareja"
  | "maquillaje"
  | "pelucas"
  | "complementos";

export const CATEGORIAS: { slug: Categoria; nombre: string; que: string }[] = [
  { slug: "looks-de-peli", nombre: "Looks de peli", que: "El look de un personaje, pieza a pieza" },
  { slug: "en-pareja", nombre: "En pareja", que: "Dos personajes que van juntos" },
  { slug: "maquillaje", nombre: "Maquillaje y efectos", que: "Lo que remata el look" },
  { slug: "pelucas", nombre: "Pelucas y pelo", que: "Lo que más cambia una cara" },
  { slug: "complementos", nombre: "Complementos", que: "Medias, sombreros, uñas, máscaras" },
];

/**
 * CATÁLOGO VACÍO A PROPÓSITO.
 *
 * Un producto sin nombre real, marca, modelo y ASIN no entra. En Navidad Ya se
 * cargaron 99 con nombres genéricos y 34 siguen bloqueando la conversión meses
 * después; y se generaron 197 filas con enlaces `s?k=` sin ASIN que se
 * descartaron enteras.
 *
 * Estos datos los aporta una persona mirando la ficha en Amazon: recorrerlo con
 * automatización incumple la Licencia 1 y los Términos de Agente §4.
 * La hoja de trabajo está en el kit de prompts (ficha de siete casillas).
 */
const LOOKS: Look[] = [];

/** Todo `url` de Amazon sale de aquí ya con el tag puesto. */
export function urlAmazon(asin: string): string {
  return withAffiliateTag(`https://www.amazon.es/dp/${asin}`);
}

export function getLooks(): Look[] {
  return LOOKS;
}

export function getLook(slug: string): Look | undefined {
  return LOOKS.find((l) => l.slug === slug);
}

export function getLooksDeCategoria(cat: Categoria): Look[] {
  return LOOKS.filter((l) => l.categoria === cat);
}
