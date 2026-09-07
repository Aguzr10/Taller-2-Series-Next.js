"use client";

// pagina para editar una serie existente con el formulario pre-llenado
import { useParams, useRouter } from "next/navigation";
import { useSeries } from "@/context/SeriesContext";
import { SerieFormData } from "@/types/series";
import SerieForm from "@/components/SerieForm";
import Link from "next/link";

export default function EditSeriePage() {
  const router = useRouter();
  const params = useParams();
  // obtenemos el id desde los parametros dinamicos de la ruta
  const serieId = Number(params.id);

  // sacamos las funciones para buscar y actualizar del contexto
  const { getSerieById, updateSerie, loading } = useSeries();
  const serie = getSerieById(serieId);

  // al guardar actualizamos y regresamos al detalle de la serie
  const handleSubmit = (data: SerieFormData) => {
    updateSerie(serieId, data);
    router.push(`/series/${serieId}`);
  };

  // si aun esta leyendo del localstorage mostramos mensaje de carga
  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center text-sm text-neutral-400">
        Cargando datos de la serie...
      </div>
    );
  }

  // si la serie no existe avisamos al usuario
  if (!serie) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-white">Serie no encontrada</h2>
        <p className="mt-2 text-sm text-neutral-400">
          La serie que intentas editar no existe o fue eliminada.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition"
        >
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      {/* navegacion de migas de pan */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-neutral-400">
        <Link href="/" className="hover:text-white transition">
          Catálogo
        </Link>
        <span>/</span>
        <Link href={`/series/${serie.id}`} className="hover:text-white transition">
          {serie.title}
        </Link>
        <span>/</span>
        <span className="text-neutral-200">Editar</span>
      </nav>

      {/* titulo y subtitulo de edicion */}
      <div className="mb-8 border-b border-neutral-800 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Editar Serie: <span className="text-indigo-400">{serie.title}</span>
        </h1>
        <p className="mt-1 text-sm text-neutral-400">
          Modifica los campos necesarios y guarda los cambios para actualizar el catálogo.
        </p>
      </div>

      {/* formulario con los datos actuales cargados */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 sm:p-8">
        <SerieForm
          initialData={serie}
          onSubmit={handleSubmit}
          buttonText="Guardar Cambios"
          isEditing={true}
        />
      </div>
    </div>
  );
}
