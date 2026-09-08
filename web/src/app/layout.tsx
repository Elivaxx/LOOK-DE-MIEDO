import type { Metadata } from "next";
import { Bodoni_Moda, Bricolage_Grotesque } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { DIVULGACION } from "@/afiliados/enlace";
import { Percha } from "@/compartido/ProductoImagen";
import { CATEGORIAS } from "@/looks/looks";

const display = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const ui = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-ui",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Look de Miedo", template: "%s · Look de Miedo" },
  description:
    "El look de Halloween, pieza a pieza. Qué ver esa noche y de qué vestirte.",
  // Sin contenido publicado todavía. Se quita en cuanto haya looks reales:
  // indexar una web vacía gasta presupuesto de rastreo y cuesta recuperarlo.
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${display.variable} ${ui.variable}`}>
      <body
        className="min-h-screen flex flex-col"
        style={{ fontFamily: "var(--font-ui), system-ui, sans-serif" }}
      >
        <header className="border-b border-linea">
          <nav className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-6 gap-y-3 px-5 py-4">
            <Link href="/" className="display mr-auto flex items-center gap-2 text-xl">
              <Percha className="h-5 w-5 text-lila" />
              Look de Miedo
            </Link>
            {CATEGORIAS.slice(0, 3).map((c) => (
              <Link
                key={c.slug}
                href={`/categoria/${c.slug}`}
                className="text-[11.5px] font-bold uppercase tracking-wide text-niebla hover:text-lila"
              >
                {c.nombre}
              </Link>
            ))}
            <Link
              href="/que-ver"
              className="text-[11.5px] font-bold uppercase tracking-wide text-niebla hover:text-lila"
            >
              Qué ver
            </Link>
          </nav>
        </header>

        <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-10">{children}</main>

        <footer className="border-t border-linea">
          <div className="mx-auto max-w-5xl px-5 py-8 text-[12px] leading-relaxed text-niebla">
            <p className="mb-3 text-texto">{DIVULGACION}</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <Link href="/legal/afiliados" className="hover:text-lila">Aviso de afiliados</Link>
              <Link href="/legal/privacidad" className="hover:text-lila">Privacidad</Link>
              <Link href="/legal/contacto" className="hover:text-lila">Contacto</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
