"use client";

// barra de navegacion principal con enlaces y contador de favoritos
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSeries } from "@/context/SeriesContext";

export default function Navbar() {
  // leemos la ruta actual para resaltar el link activo y sacamos favoritos del contexto
  const pathname = usePathname();
  const { favorites } = useSeries();

  // helper para saber si el link esta activo y cambiarle el color
  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* logo y nombre de la app */}
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-white transition hover:opacity-90"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white font-extrabold shadow-sm">
            S
          </span>
          <span>
            Series<span className="text-indigo-400">App</span>
          </span>
        </Link>

        {/* enlaces de navegacion */}
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
              isActive("/")
                ? "bg-neutral-800 text-white"
                : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
            }`}
          >
            Catálogo
          </Link>

          <Link
            href="/favoritos"
            className={`relative rounded-md px-3 py-1.5 text-sm font-medium transition ${
              isActive("/favoritos")
                ? "bg-neutral-800 text-white"
                : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
            }`}
          >
            Favoritos
            {/* badge con la cantidad de favoritos */}
            {favorites.length > 0 && (
              <span className="ml-1.5 inline-flex items-center justify-center rounded-full bg-rose-600 px-1.5 py-0.5 text-xs font-semibold text-white">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* boton para ir al formulario de crear serie */}
          <Link
            href="/series/new"
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 active:scale-95"
          >
            <span className="text-base leading-none">+</span>
            <span>Nueva Serie</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
