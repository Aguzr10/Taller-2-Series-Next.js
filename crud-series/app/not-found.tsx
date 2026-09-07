// pagina 404 cuando no se encuentra una ruta
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <span className="text-5xl font-black bg-gradient-to-r from-[#004D98] via-[#A50044] to-[#EDBB00] bg-clip-text text-transparent">
        404
      </span>
      <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">
        Página no encontrada
      </h2>
      <p className="mt-2 text-sm text-neutral-400">
        La ruta a la que intentas acceder no existe en la aplicación.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-lg bg-[#A50044] px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-[#A50044]/30 ring-1 ring-[#c41555]/30 transition hover:bg-[#850036] active:scale-95"
      >
        Volver al catálogo
      </Link>
    </div>
  );
}
