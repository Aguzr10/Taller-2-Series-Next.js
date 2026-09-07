"use client";

// barra de busqueda en tiempo real con debounce
import { useState, useEffect } from "react";

// props que recibe la barra de busqueda
interface SearchBarProps {
  onSearch: (term: string) => void; // envia el termino filtrado al padre
  placeholder?: string; // texto que se ve cuando esta vacio
}

export default function SearchBar({
  onSearch,
  placeholder = "Buscar serie por título...",
}: SearchBarProps) {
  // estado local del input
  const [term, setTerm] = useState("");

  // debounce para esperar 300ms despues de teclear antes de buscar
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(term);
    }, 300);

    // cancelamos el timer si el usuario sigue escribiendo
    return () => clearTimeout(timer);
  }, [term, onSearch]);

  return (
    <div className="relative w-full">
      {/* icono de lupa */}
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-500">
        <svg
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>

      {/* input de texto controlado */}
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-700/80 bg-[#172033] py-2.5 pl-9 pr-8 text-sm text-white placeholder-slate-400 outline-none transition focus:border-[#004D98] focus:ring-1 focus:ring-[#004D98]"
      />

      {/* boton para limpiar el input si hay algo escrito */}
      {term && (
        <button
          type="button"
          onClick={() => setTerm("")}
          className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-neutral-400 hover:text-white"
          title="Limpiar búsqueda"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
