"use client";

// pagina para registrar una nueva serie en el catalogo
import { useRouter } from "next/navigation";
import { useSeries } from "@/context/SeriesContext";
import { SerieFormData } from "@/types/series";
import SerieForm from "@/components/SerieForm";
import Link from "next/link";

export default function NewSeriePage() {
  const router = useRouter();
  // sacamos la funcion addserie del contexto
  const { addSerie } = useSeries();

  // al guardar la serie la agregamos al estado y volvemos al inicio
  const handleSubmit = (data: SerieFormData) => {
    addSerie(data);
    router.push("/");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      {/* migas de pan sencillas para volver atras */}
      <nav className="mb-6 flex items-center gap-2 text-xs text-neutral-400">
        <Link href="/" className="hover:text-white transition">
          Catálogo
        </Link>
        <span>/</span>
        <span className="text-neutral-200">Nueva serie</span>
      </nav>

      {/* encabezado de la pagina */}
      <div className="mb-8 border-b border-slate-800 pb-5">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Agregar Nueva Serie
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Llena el formulario para registrar una serie de televisión en tu catálogo.
        </p>
      </div>

      {/* contenedor del formulario */}
      <div className="rounded-xl border border-slate-800 bg-[#172033]/80 p-6 sm:p-8">
        <SerieForm onSubmit={handleSubmit} buttonText="Guardar Serie" />
      </div>
    </div>
  );
}
