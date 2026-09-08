/**
 * Las guías: los posts que descubren, frente a los looks que convierten.
 *
 * Una guía NO repite el contenido de un look: lo enlaza. Se escribe el look
 * una vez y se reutiliza en las guías que haga falta. Cero duplicado, que es
 * lo que hunde el SEO.
 *
 * Amazon lo dice en su propia guía de escalado: las listas y guías rinden más
 * que las reseñas de producto suelto.
 */
export type TipoGuia = "comparativa" | "como-se-arma" | "lista";

export const TIPOS: Record<TipoGuia, { nombre: string; que: string }> = {
  "comparativa": { nombre: "Comparativa", que: "Dos formas de resolver el mismo look, cara a cara" },
  "como-se-arma": { nombre: "Cómo se arma", que: "El paso a paso de montar un disfraz desde cero" },
  "lista": { nombre: "Lista", que: "Varios looks reunidos por un criterio" },
};

export type Guia = {
  slug: string;
  titulo: string;
  tipo: TipoGuia;
  entradilla: string;
  /** Fecha ISO. Sirve para ordenar y para el <time> del artículo. */
  fecha: string;
  /** Slugs de looks que se enlazan. La guía no los duplica, los referencia. */
  looks: string[];
  /** Párrafos del cuerpo. Sin HTML: texto plano que se pinta como <p>. */
  cuerpo: string[];
};

/**
 * VACÍO A PROPÓSITO, igual que el catálogo.
 *
 * Una guía sin looks dentro está vacía, así que estas van después de los
 * primeros looks, no antes. En Navidad Ya se escribieron 3 artículos y 9
 * piezas sociales antes de que existiera la ruta donde publicarlos.
 */
const GUIAS: Guia[] = [];

export function getGuias(): Guia[] {
  return [...GUIAS].sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export function getGuia(slug: string): Guia | undefined {
  return GUIAS.find((g) => g.slug === slug);
}
