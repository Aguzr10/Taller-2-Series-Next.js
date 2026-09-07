// Modelo principal de una serie
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

// Datos necesarios para crear o editar (sin el id autogenerado)
export type SerieFormData = Omit<Serie, "id">;

// Errores de validacion para el formulario
export type SerieErrors = Partial<Record<keyof SerieFormData, string>>;
