// modelo de datos de una serie
export interface Serie {
  id: number;
  title: string;
  genre: string;
  seasons: number;
  platform: string;
  rating: number;
  image: string;
  description: string;
}

// datos para el formulario al crear o editar (sin id)
export type SerieFormData = Omit<Serie, "id">;

// mensajes de error campo por campo
export type SerieErrors = Partial<Record<keyof SerieFormData, string>>;
