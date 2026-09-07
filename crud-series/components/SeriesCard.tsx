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
    <div className="group flex flex-col overflow-hidden rounded-xl border border-slate-800 bg-[#172033] shadow-sm transition hover:border-slate-700 hover:shadow-lg hover:shadow-black/20">
      {/* contenedor de imagen con badges y boton de favoritos */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-900">
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
          <span className="inline-flex items-center rounded-md bg-black/80 px-2 py-1 text-xs font-medium text-neutral-200 backdrop-blur-xs">
            {serie.platform}
          </span>
        </div>

        {/* badge con el rating con fondo oscuro para que siempre sea legible en cualquier portada */}
        <div className="absolute bottom-2.5 right-2.5">
          <span className="inline-flex items-center gap-1 rounded-md bg-black/85 px-2 py-1 text-xs font-bold text-amber-300 ring-1 ring-white/15 shadow-md backdrop-blur-xs">
            ★ {serie.rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* cuerpo de la tarjeta con informacion */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white line-clamp-1 group-hover:text-blue-400 transition">
            {serie.title}
          </h3>
          <p className="mt-1 text-xs font-medium text-slate-400">
            {serie.genre} • {serie.seasons} {serie.seasons === 1 ? "temporada" : "temporadas"}
          </p>
          <p className="mt-2 text-sm text-slate-300 line-clamp-2">
            {serie.description}
          </p>
        </div>

        {/* barra de acciones: ver detalle, editar y eliminar */}
        <div className="mt-4 flex items-center justify-between border-t border-slate-800/80 pt-3 gap-2">
          <Link
            href={`/series/${serie.id}`}
            className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition"
          >
            Ver detalle →
          </Link>

          <div className="flex items-center gap-1.5">
            <Link
              href={`/series/${serie.id}/edit`}
              className="rounded-md px-2.5 py-1 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition"
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
