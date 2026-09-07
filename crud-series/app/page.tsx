"use client";

// pagina principal de catalogo con busqueda en tiempo real y eliminacion
import { useState, useMemo } from "react";
import { useSeries } from "@/context/SeriesContext";
import { Serie } from "@/types/series";
import SearchBar from "@/components/SearchBar";
import SeriesList from "@/components/SeriesList";
import ConfirmModal from "@/components/ConfirmModal";

export default function HomePage() {
  // sacamos las series y la funcion de eliminar del contexto
  const { series, loading, deleteSerie } = useSeries();

  // estados para filtrar por busqueda y controlar el modal de confirmacion
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("todos");
  const [serieToDelete, setSerieToDelete] = useState<Serie | null>(null);

  // generos principales para no saturar la barra con demasiados botones
  const genres = ["todos", "Acción", "Anime", "Drama", "Misterio"];

  // filtramos las series segun el termino de busqueda y el genero seleccionado
  const filteredSeries = useMemo(() => {
    return series.filter((serie) => {
      const matchesSearch = serie.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesGenre =
        selectedGenre === "todos" ||
        serie.genre.toLowerCase().includes(selectedGenre.toLowerCase());
      return matchesSearch && matchesGenre;
    });
  }, [series, searchTerm, selectedGenre]);

  // confirma la eliminacion y cierra el modal
  const handleConfirmDelete = () => {
    if (serieToDelete) {
      deleteSerie(serieToDelete.id);
      setSerieToDelete(null);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      {/* encabezado principal */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-[#60a5fa]">
          Catálogo completo
        </span>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Explora tus Series
        </h1>
      </div>

      {/* barra de busqueda y selector de generos */}
      <div className="mt-8 space-y-4">
        <SearchBar
          onSearch={(term) => setSearchTerm(term)}
          placeholder="Buscar serie por título"
        />

        {/* chips de filtro rapido por genero */}
        {genres.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-medium text-slate-400 shrink-0">
              Género:
            </span>
            {genres.map((genre) => (
              <button
                key={genre}
                type="button"
                onClick={() => setSelectedGenre(genre)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition capitalize shrink-0 ${
                  selectedGenre === genre
                    ? "bg-[#A50044] text-white shadow-xs shadow-[#A50044]/30 ring-1 ring-[#c41555]/40"
                    : "bg-slate-800/90 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700/60"
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* contador de resultados */}
      <div className="mt-6 mb-4 flex items-center justify-between text-xs text-slate-400">
        <p>
          {loading
            ? "Cargando catálogo..."
            : `Mostrando ${filteredSeries.length} de ${series.length} series`}
        </p>

        {(searchTerm || selectedGenre !== "todos") && (
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setSelectedGenre("todos");
            }}
            className="text-blue-400 hover:text-blue-300 transition font-medium"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* grilla de series o skeletons si esta cargando */}
      <SeriesList
        series={filteredSeries}
        loading={loading}
        emptyMessage={
          searchTerm || selectedGenre !== "todos"
            ? "No hay series que coincidan con tu búsqueda."
            : "No tienes series registradas todavía."
        }
        onDeleteRequest={(serie) => setSerieToDelete(serie)}
      />

      {/* modal de confirmacion antes de eliminar */}
      <ConfirmModal
        isOpen={Boolean(serieToDelete)}
        title="¿Eliminar serie?"
        message={`¿Estás seguro de que deseas eliminar "${serieToDelete?.title}"? Se borrará de la lista y de tus favoritos.`}
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={() => setSerieToDelete(null)}
      />
    </div>
  );
}
