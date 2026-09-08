import { withAffiliateTag } from "@/afiliados/enlace";

/** Una pieza del look. Sin marca y modelo NO entra: es la regla 12 de Navidad Ya. */
export type Pieza = {
  papel: string;   // "el vestido", "las medias" — qué hace en el look
  nombre: string;  // marca + qué es + rasgo, ~70 caracteres
  marca: string;
  modelo: string;
  asin: string;    // obligatorio: sin ASIN el enlace no convierte
  nota: string;    // una línea de por qué esta y no otra
  /**
   * SOLO se rellena desde PA API / Creators API. Nunca a mano con una URL
   * copiada del navegador: sería la misma imagen pero fuera de la licencia
   * (Licencia 2(h)).
   */
  src?: string | null;
};

/**
 * Cómo se resuelve el look. Es la primera pregunta que se hace quien llega:
 * ¿me lo compro hecho o tengo que montarlo?
 */
export type Composicion = "entero" | "entero-mas" | "piezas";

export const COMPOSICION: Record<Composicion, { nombre: string; que: string }> = {
  "entero": { nombre: "Compra entera", que: "Viene todo en un paquete. Lo pides y ya" },
  "entero-mas": { nombre: "Entero + complementos", que: "El disfraz viene hecho, pero se queda corto sin dos o tres cosas" },
  "piezas": { nombre: "Montado por piezas", que: "No existe como disfraz: se arma con ropa normal" },
};

export type Look = {
  slug: string;
  nombre: string;
  personaje: string;   // uso descriptivo del nombre, va en TEXTO
  categoria: Categoria;
  composicion: Composicion;
  entradilla: string;
  piezas: Pieza[];
  pareja?: string;     // slug del look que hace juego
  /**
   * El avatar que ilustra el look. `generadoConIA` es obligatorio si hay imagen:
   * la etiqueta de IA la piden las plataformas y no puede depender de que
   * alguien se acuerde. El guardarraíl de abajo rechaza el look si falta.
   */
  avatar?: { src: string; alt: string; generadoConIA: boolean };
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

/* ────────────────────────────────────────────────────────────────────────
   GUARDARRAÍL DEL CATÁLOGO

   La auditoría del 08/09 señaló que `nombre` y `nota` son texto libre y que
   nada impedía colar "por menos de 20€" o "el más vendido" al redactar una
   ficha — dependía de que el catalogador se auto-vigilara.

   En Navidad Ya la autorrevisión no detectó ni una sola de las infracciones
   graves: los superlativos de Marketing los cazó Construcción y el rascado de
   Construcción lo cazó el usuario un mes después. Así que esto no se confía a
   nadie, se comprueba.

   Corre al cargar el módulo, así que un dato prohibido REVIENTA EL BUILD y no
   llega a producción.
   ──────────────────────────────────────────────────────────────────────── */

const PROHIBIDO: { patron: RegExp; motivo: string }[] = [
  { patron: /\d[\d.,]*\s*(?:€|eur\b)|(?:€|eur\b)\s*\d/i, motivo: "precio — Requisito 2(b)" },
  { patron: /\bpor\s+(?:menos|más)\s+de\s+\d/i, motivo: "afirmación de precio — Requisito 2(b)" },
  { patron: /\bvaloracion|\breseñ|\bestrellas\b|\d\s*(?:de|\/)\s*5\b/i, motivo: "valoración — Requisito 6(t)" },
  // El sustantivo puede ir entre el artículo y el "más": "el peluche más
  // buscado" es una de las frases reales que hubo que limpiar en Navidad Ya.
  { patron: /\b(?:el|la|los|las)\s+(?:\w+\s+){0,2}(?:más|mas)\s+\w+|\b(?:el|la)\s+mejor\b|\bsuperventas\b|\bbestseller\b/i, motivo: "superlativo indemostrable — Requisito 2(b)" },
  { patron: /\btodo\s+el\s+mundo\b|\btodas\s+(?:lo|la)\s+\w+|\bse\s+agota/i, motivo: "afirmación no demostrable — Requisito 2(b)" },
  { patron: /\blo\s+he\s+probado\b|\blo\s+llevé\b|\bme\s+encanta\b|\blo\s+probé\b/i, motivo: "testimonio falso — publicidad engañosa" },
  { patron: /\bnovedad\s+20\d\d\b|\blo\s+que\s+se\s+lleva\s+est/i, motivo: "novedad no verificable — no hay estreno de 2026" },
  { patron: /media-amazon|images-amazon|ssl-images/i, motivo: "imagen de Amazon — Licencia 2(h)" },
];

function validarCatalogo(looks: Look[]): void {
  const errores: string[] = [];

  for (const l of looks) {
    const campos: [string, string][] = [
      [`${l.slug}.nombre`, l.nombre],
      [`${l.slug}.entradilla`, l.entradilla],
      [`${l.slug}.personaje`, l.personaje],
    ];
    if (l.piezas.length === 0) errores.push(`${l.slug}: un look sin piezas no es un look`);
    if (l.avatar && typeof l.avatar.generadoConIA !== "boolean") {
      errores.push(`${l.slug}: el avatar no declara si está generado con IA`);
    }
    if (!COMPOSICION[l.composicion]) {
      errores.push(`${l.slug}: composición inválida ("${l.composicion}") — entero, entero-mas o piezas`);
    }

    for (const p of l.piezas) {
      // Regla 12 de Navidad Ya: sin marca, modelo y ASIN no entra.
      if (!p.marca?.trim()) errores.push(`${l.slug}/${p.papel}: falta la marca`);
      if (!p.modelo?.trim()) errores.push(`${l.slug}/${p.papel}: falta el modelo`);
      if (!/^[A-Z0-9]{10}$/.test(p.asin || "")) {
        errores.push(`${l.slug}/${p.papel}: ASIN inválido ("${p.asin}") — un enlace s?k= no convierte`);
      }
      if (p.nombre && p.nombre.trim().split(/\s+/).length < 3) {
        errores.push(`${l.slug}/${p.papel}: "${p.nombre}" describe una categoría, no un producto`);
      }
      campos.push([`${l.slug}/${p.papel}.nombre`, p.nombre], [`${l.slug}/${p.papel}.nota`, p.nota]);
    }

    for (const [donde, texto] of campos) {
      for (const { patron, motivo } of PROHIBIDO) {
        const m = texto?.match(patron);
        if (m) errores.push(`${donde}: "${m[0]}" → ${motivo}`);
      }
    }
  }

  if (errores.length) {
    throw new Error(
      `\n\nCATÁLOGO RECHAZADO — ${errores.length} problema(s):\n\n` +
        errores.map((e) => `  ✕ ${e}`).join("\n") +
        `\n\nNo se despliega hasta arreglarlo. Quien escribe no aprueba.\n`
    );
  }
}

validarCatalogo(LOOKS);

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

