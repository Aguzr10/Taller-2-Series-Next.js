// pagina 404 cuando no se encuentra una ruta
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <span className="text-5xl font-black text-indigo-500">404</span>
      <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">
        Página no encontrada
      </h2>
      <p className="mt-2 text-sm text-neutral-400">
        La ruta a la que intentas acceder no existe en la aplicación.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
      >
        Volver al catálogo
      </Link>
    </div>
  );
}
