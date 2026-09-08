import type { MetadataRoute } from "next";

// Mientras no haya looks publicados, la web no se indexa: rastrear un sitio
// vacío gasta presupuesto de rastreo y cuesta recuperarlo. Se abre en cuanto
// entren los primeros looks reales.
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", disallow: "/" } };
}
