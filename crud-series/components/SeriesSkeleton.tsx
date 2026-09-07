// un skeleton es una tarjeta gris animada que imita el contenido real mientras cargan los datos
interface SeriesSkeletonProps {
  count?: number;
}

export default function SeriesSkeleton({ count = 6 }: SeriesSkeletonProps) {
  // array falso para iterar la cantidad de skeletons pedida
  const skeletons = Array.from({ length: count });

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {skeletons.map((_, index) => (
        <div
          key={index}
          className="flex flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 shadow-sm animate-pulse"
        >
          {/* espacio que simula el poster */}
          <div className="h-64 w-full rounded-lg bg-neutral-800" />

          {/* titulo y genero simulados */}
          <div className="mt-4 space-y-2">
            <div className="h-5 w-3/4 rounded bg-neutral-800" />
            <div className="h-4 w-1/2 rounded bg-neutral-800/70" />
          </div>

          {/* badges y boton simulados */}
          <div className="mt-4 flex items-center justify-between pt-2">
            <div className="h-6 w-20 rounded-full bg-neutral-800" />
            <div className="h-8 w-24 rounded-lg bg-neutral-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
