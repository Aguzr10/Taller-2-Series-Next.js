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
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#0f172a]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* logo de la app con icono de television */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-white transition hover:opacity-95"
        >
          {/* icono de television estilizada con degradado blaugrana */}
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#004D98] to-[#A50044] text-white shadow-md shadow-[#004D98]/30 ring-1 ring-white/10">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="m17 2-5 5-5-5" />
            </svg>
          </span>
          <span className="tracking-tight">
            Series<span className="text-[#c41555]">App</span>
          </span>
        </Link>

        {/* enlaces de navegacion */}
        <nav className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              isActive("/")
                ? "bg-slate-800 text-white ring-1 ring-slate-700/60"
                : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
            }`}
          >
            Catálogo
          </Link>

          <Link
            href="/favoritos"
            className={`relative rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              isActive("/favoritos")
                ? "bg-slate-800 text-white ring-1 ring-slate-700/60"
                : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
            }`}
          >
            Favoritos
            {/* badge con la cantidad de favoritos */}
            {favorites.length > 0 && (
              <span className="ml-1.5 inline-flex items-center justify-center rounded-full bg-[#A50044] px-1.5 py-0.5 text-xs font-bold text-white shadow-xs">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* boton para ir al formulario de crear serie */}
          <Link
            href="/series/new"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#A50044] px-3.5 py-1.5 text-sm font-semibold text-white shadow-sm shadow-[#A50044]/30 ring-1 ring-[#c41555]/30 transition hover:bg-[#850036] active:scale-95"
          >
            <span className="text-base leading-none">+</span>
            <span>Nueva Serie</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
