"use client";

// pagina para ver el detalle completo de una serie especifica
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSeries } from "@/context/SeriesContext";
import FavoriteButton from "@/components/FavoriteButton";
import ConfirmModal from "@/components/ConfirmModal";
import Link from "next/link";

export default function SerieDetailPage() {
  const params = useParams();
  const router = useRouter();
  // obtenemos el id desde la url dinamica
  const serieId = Number(params.id);

  // sacamos los datos del contexto
  const { getSerieById, deleteSerie, isFavorite, loading } = useSeries();
  const serie = getSerieById(serieId);

  // estado para abrir o cerrar el modal de confirmacion
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // si esta leyendo de localstorage mostramos mensaje de carga
  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center text-sm text-neutral-400">
        Cargando detalles de la serie...
      </div>
    );
  }

  // si no se encuentra la serie mostramos aviso y boton para volver
  if (!serie) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white">Serie no encontrada</h2>
        <p className="mt-2 text-sm text-neutral-400">
          La serie que buscas no existe o fue removida del catálogo.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-[#A50044] px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-[#A50044]/30 ring-1 ring-[#c41555]/30 hover:bg-[#850036] transition"
        >
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const favorite = isFavorite(serie.id);

  // eliminamos la serie y volvemos al inicio
  const handleConfirmDelete = () => {
    deleteSerie(serie.id);
    setShowDeleteModal(false);
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      {/* migas de pan */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-neutral-400">
        <Link href="/" className="hover:text-white transition">
          Catálogo
        </Link>
        <span>/</span>
        <span className="text-neutral-200 line-clamp-1">{serie.title}</span>
      </nav>

      {/* boton de regreso al catalogo */}
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-400 hover:text-white transition"
      >
        <span>←</span>
        <span>Volver a la lista</span>
      </Link>

      {/* tarjeta principal con la informacion detallada */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-[#172033] shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* portada / poster grande */}
          <div className="relative aspect-3/4 md:aspect-auto md:h-full bg-slate-900 overflow-hidden">
            <img
              src={serie.image}
              alt={serie.title}
              className="h-full w-full object-cover object-center"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/600x800/1e293b/ffffff?text=Sin+Imagen";
              }}
            />
          </div>

          {/* datos y sinopsis de la serie */}
          <div className="p-6 sm:p-8 md:col-span-2 flex flex-col justify-between">
            <div>
              {/* badges de plataforma, temporadas y rating */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex rounded-md bg-[#004D98]/25 px-2.5 py-1 text-xs font-semibold text-blue-300 ring-1 ring-[#004D98]/40">
                  {serie.platform}
                </span>
                <span className="inline-flex rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-200 ring-1 ring-slate-700/60">
                  {serie.genre}
                </span>
                <span className="inline-flex rounded-md bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-200 ring-1 ring-slate-700/60">
                  {serie.seasons} {serie.seasons === 1 ? "temporada" : "temporadas"}
                </span>
                <span className="inline-flex items-center gap-1 rounded-md bg-black/75 px-2.5 py-1 text-xs font-bold text-amber-300 ring-1 ring-white/10 shadow-xs">
                  ★ {serie.rating.toFixed(1)} / 10
                </span>
              </div>

              {/* titulo principal */}
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                {serie.title}
              </h1>

              {/* sinopsis completa */}
              <div className="mt-6 space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Sinopsis
                </h3>
                <p className="text-sm leading-relaxed text-slate-300 whitespace-pre-line">
                  {serie.description}
                </p>
              </div>
            </div>

            {/* barra inferior de acciones */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800/80 pt-6">
              {/* boton interactivo de favoritos con texto */}
              <div className="flex items-center gap-2">
                <FavoriteButton serieId={serie.id} size="md" />
                <span className="text-xs font-medium text-slate-300">
                  {favorite ? "En tus favoritos" : "Marcar como favorita"}
                </span>
              </div>

              {/* botones de editar y eliminar */}
              <div className="flex items-center gap-2">
                <Link
                  href={`/series/${serie.id}/edit`}
                  className="rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-medium text-slate-200 transition hover:bg-slate-700 active:scale-95"
                >
                  Editar serie
                </Link>

                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="rounded-lg bg-rose-600/10 px-3.5 py-2 text-xs font-medium text-rose-400 transition hover:bg-rose-600/20 active:scale-95"
                >
                  Eliminar serie
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal de confirmacion para eliminar */}
      <ConfirmModal
        isOpen={showDeleteModal}
        title="¿Eliminar esta serie?"
        message={`¿Estás seguro de que deseas eliminar permanentemente "${serie.title}"? Esta acción no se puede deshacer.`}
        confirmText="Sí, eliminar"
        cancelText="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  );
}
