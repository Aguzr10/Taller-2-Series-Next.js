"use client";

// boton interactivo para marcar o quitar una serie de favoritos
import { useSeries } from "@/context/SeriesContext";

// props que recibe el boton de favoritos
interface FavoriteButtonProps {
  serieId: number; // id de la serie a alternar
  size?: "sm" | "md"; // tamano del icono
}

export default function FavoriteButton({
  serieId,
  size = "md",
}: FavoriteButtonProps) {
  // usamos las funciones de favoritos del contexto
  const { isFavorite, toggleFavorite } = useSeries();
  const favorite = isFavorite(serieId);

  // dimensiones segun la prop size
  const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const buttonPadding = size === "sm" ? "p-1.5" : "p-2";

  return (
    <button
      type="button"
      onClick={(e) => {
        // evitamos que el click active el link de la tarjeta
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(serieId);
      }}
      aria-label={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
      title={favorite ? "Quitar de favoritos" : "Agregar a favoritos"}
      className={`rounded-full transition active:scale-90 ${buttonPadding} ${
        favorite
          ? "bg-rose-500/20 text-rose-500 hover:bg-rose-500/30"
          : "bg-neutral-900/80 text-neutral-400 hover:bg-neutral-800 hover:text-white"
      }`}
    >
      {/* icono de corazon svg */}
      <svg
        className={iconSize}
        viewBox="0 0 24 24"
        fill={favorite ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    </button>
  );
}
