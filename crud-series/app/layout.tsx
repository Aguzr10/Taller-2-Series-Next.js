import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// importamos el proveedor del contexto global y la barra de navegacion
import { SeriesProvider } from "@/context/SeriesContext";
import Navbar from "@/components/Navbar";

// configuramos las fuentes de la aplicacion
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// metadatos seo de la aplicacion
export const metadata: Metadata = {
  title: "SeriesApp — Catálogo y CRUD de Series",
  description:
    "Aplicación interactiva para buscar, ver, agregar, editar y guardar series de televisión favoritas.",
};

// layout raiz que envuelve toda la aplicacion con navbar y provider
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#070b14] text-neutral-100 selection:bg-[#A50044] selection:text-white">
        {/* envolvemos con el contexto para que cualquier pagina o componente acceda al estado */}
        <SeriesProvider>
          {/* linea decorativa superior con los colores del barca */}
          <div className="h-[2.5px] w-full bg-gradient-to-r from-[#004D98] via-[#A50044] to-[#EDBB00]" />
          <Navbar />
          <main className="flex-1">{children}</main>
          {/* pie de pagina sencillo */}
          <footer className="border-t border-[#131f37] bg-[#070b14] py-6 text-center text-xs text-neutral-500">
            <p>SeriesApp • Taller 2 de React y Next.js</p>
          </footer>
        </SeriesProvider>
      </body>
    </html>
  );
}
