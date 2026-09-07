"use client";

// lista o grilla de series con soporte para estados de carga y lista vacia
import { Serie } from "@/types/series";
import SeriesCard from "./SeriesCard";
import SeriesSkeleton from "./SeriesSkeleton";
import Link from "next/link";

// props que recibe el componente de lista
interface SeriesListProps {
  series: Serie[]; // arreglo de series a mostrar
  loading?: boolean; // si es true muestra skeletons
  emptyMessage?: string; // mensaje personalizado si no hay series
  onDeleteRequest?: (serie: Serie) => void; // callback para eliminar
}

export default function SeriesList({
  series,
  loading = false,
  emptyMessage = "No se encontraron series para mostrar.",
  onDeleteRequest,
}: SeriesListProps) {
  // si esta cargando mostramos 6 skeletons
  if (loading) {
    return <SeriesSkeleton count={6} />;
  }

  // si no hay elementos mostramos mensaje limpio
  if (series.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-[#172033]/60 p-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-blue-400">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="20" height="15" x="2" y="7" rx="2" ry="2" />
            <polyline points="17 2 12 7 7 2" />
          </svg>
        </div>
        <h4 className="mt-4 text-base font-semibold text-white">{emptyMessage}</h4>
        <p className="mt-1 text-sm text-slate-400">
          Prueba cambiando el término de búsqueda o agrega una nueva serie.
        </p>
        <Link
          href="/series/new"
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#A50044] px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-[#A50044]/30 ring-1 ring-[#c41555]/30 transition hover:bg-[#850036] active:scale-95"
        >
          + Agregar Serie
        </Link>
      </div>
    );
  }

  // grilla responsiva de tarjetas
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {series.map((serie) => (
        <SeriesCard
          key={serie.id}
          serie={serie}
          onDeleteRequest={onDeleteRequest}
        />
      ))}
    </div>
  );
}
