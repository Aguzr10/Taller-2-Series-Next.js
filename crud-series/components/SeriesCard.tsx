"use client";

// tarjeta individual para mostrar una serie con sus datos y acciones
import Link from "next/link";
import { Serie } from "@/types/series";
import FavoriteButton from "./FavoriteButton";

// props de la tarjeta
interface SeriesCardProps {
  serie: Serie; // datos de la serie
  onDeleteRequest?: (serie: Serie) => void; // callback para abrir el modal de confirmacion
}

export default function SeriesCard({ serie, onDeleteRequest }: SeriesCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/60 shadow-sm transition hover:border-neutral-700 hover:shadow-md">
      {/* contenedor de imagen con badges y boton de favoritos */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-neutral-800">
        <img
          src={serie.image}
          alt={serie.title}
          className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
          onError={(e) => {
            // si falla la imagen ponemos un placeholder gris limpio
            (e.target as HTMLImageElement).src =
              "https://placehold.co/600x400/1e293b/ffffff?text=Sin+Imagen";
          }}
        />

        {/* boton flotante de favoritos */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <FavoriteButton serieId={serie.id} />
        </div>

        {/* badge con la plataforma */}
        <div className="absolute bottom-2.5 left-2.5">
          <span className="inline-flex items-center rounded-md bg-black/75 px-2 py-1 text-xs font-medium text-neutral-200 backdrop-blur-xs">
            {serie.platform}
          </span>
        </div>

        {/* badge con el rating */}
        <div className="absolute bottom-2.5 right-2.5">
          <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/20 px-2 py-1 text-xs font-bold text-amber-300 backdrop-blur-xs">
            ★ {serie.rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* cuerpo de la tarjeta con informacion */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-indigo-400 transition">
            {serie.title}
          </h3>
          <p className="mt-1 text-xs font-medium text-neutral-400">
            {serie.genre} • {serie.seasons} {serie.seasons === 1 ? "temporada" : "temporadas"}
          </p>
          <p className="mt-2 text-sm text-neutral-300 line-clamp-2">
            {serie.description}
          </p>
        </div>

        {/* barra de acciones: ver detalle, editar y eliminar */}
        <div className="mt-4 flex items-center justify-between border-t border-neutral-800/80 pt-3 gap-2">
          <Link
            href={`/series/${serie.id}`}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition"
          >
            Ver detalle →
          </Link>

          <div className="flex items-center gap-1.5">
            <Link
              href={`/series/${serie.id}/edit`}
              className="rounded-md px-2.5 py-1 text-xs font-medium text-neutral-300 hover:bg-neutral-800 hover:text-white transition"
            >
              Editar
            </Link>

            {onDeleteRequest && (
              <button
                type="button"
                onClick={() => onDeleteRequest(serie)}
                className="rounded-md px-2.5 py-1 text-xs font-medium text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition"
              >
                Eliminar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
