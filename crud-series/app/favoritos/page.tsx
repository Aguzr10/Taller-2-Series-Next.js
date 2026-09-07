"use client";

// pagina para ver unicamente las series que el usuario marco como favoritas
import { useState } from "react";
import { useSeries } from "@/context/SeriesContext";
import { Serie } from "@/types/series";
import SeriesList from "@/components/SeriesList";
import ConfirmModal from "@/components/ConfirmModal";
import Link from "next/link";

export default function FavoritosPage() {
  // sacamos las series, favoritos y eliminar del contexto
  const { series, favorites, loading, deleteSerie } = useSeries();

  // estado para el modal de confirmacion
  const [serieToDelete, setSerieToDelete] = useState<Serie | null>(null);

  // filtramos solo las series cuyos ids esten en el arreglo de favoritos
  const favoriteSeries = series.filter((serie) => favorites.includes(serie.id));

  // confirmamos la eliminacion
  const handleConfirmDelete = () => {
    if (serieToDelete) {
      deleteSerie(serieToDelete.id);
      setSerieToDelete(null);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* migas de pan sencillas */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-neutral-400">
        <Link href="/" className="hover:text-white transition">
          Catálogo
        </Link>
        <span>/</span>
        <span className="text-neutral-200">Favoritos</span>
      </nav>

      {/* encabezado de la seccion */}
      <div className="mb-8 border-b border-[#172338] pb-5">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#A50044]/20 text-[#c41555] ring-1 ring-[#c41555]/30">
            ♥
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Mis Series Favoritas
          </h1>
        </div>
        <p className="mt-1 text-sm text-neutral-400">
          {loading
            ? "Cargando tus favoritos..."
            : `Tienes ${favoriteSeries.length} ${
                favoriteSeries.length === 1 ? "serie guardada" : "series guardadas"
              } en tu lista personal.`}
        </p>
      </div>

      {/* lista de series favoritas o mensaje vacio si no hay */}
      <SeriesList
        series={favoriteSeries}
        loading={loading}
        emptyMessage="Aún no has marcado ninguna serie como favorita."
        onDeleteRequest={(serie) => setSerieToDelete(serie)}
      />

      {/* modal de confirmacion al eliminar */}
      <ConfirmModal
        isOpen={Boolean(serieToDelete)}
        title="¿Eliminar serie?"
        message={`¿Estás seguro de que deseas eliminar "${serieToDelete?.title}"? También se quitará de tus favoritos.`}
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={() => setSerieToDelete(null)}
      />
    </div>
  );
}
