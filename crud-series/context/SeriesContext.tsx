"use client";

// traemos las funciones de react para crear y usar el contexto
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
// importamos los tipos y las series iniciales por defecto
import { Serie, SerieFormData } from "@/types/series";
import { initialSeries } from "@/data/initialSeries";

// lo que va a exponer el contexto a los componentes
interface SeriesContextType {
  series: Serie[];
  favorites: number[];
  loading: boolean;
  addSerie: (data: SerieFormData) => void;
  updateSerie: (id: number, data: SerieFormData) => void;
  deleteSerie: (id: number) => void;
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  getSerieById: (id: number) => Serie | undefined;
}

// creamos el contexto, arranca en null mientras carga el provider
const SeriesContext = createContext<SeriesContextType | null>(null);

// nombres de las llaves para guardar en localstorage
const STORAGE_KEY_SERIES = "series_app_data";
const STORAGE_KEY_FAVORITES = "series_app_favorites";

// este componente envuelve la app y maneja todo el estado global
export function SeriesProvider({ children }: { children: ReactNode }) {
  // estado con la lista de series
  const [series, setSeries] = useState<Serie[]>([]);
  // estado con los ids de favoritos
  const [favorites, setFavorites] = useState<number[]>([]);
  // para mostrar skeletons mientras lee de localstorage
  const [loading, setLoading] = useState(true);

  // leemos del localstorage apenas monta en el navegador
  useEffect(() => {
    try {
      const storedSeries = localStorage.getItem(STORAGE_KEY_SERIES);
      if (storedSeries) {
        setSeries(JSON.parse(storedSeries));
      } else {
        // se usan las 6 de la lista inicial si no hay nada guardado
        setSeries(initialSeries);
        localStorage.setItem(STORAGE_KEY_SERIES, JSON.stringify(initialSeries));
      }

      const storedFavorites = localStorage.getItem(STORAGE_KEY_FAVORITES);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("error al leer de localstorage:", error);
      setSeries(initialSeries);
    } finally {
      setLoading(false);
    }
  }, []);

  // guardamos las series en localstorage cuando cambian
  useEffect(() => {
    if (!loading && typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_SERIES, JSON.stringify(series));
      } catch (error) {
        console.error("error al guardar series:", error);
      }
    }
  }, [series, loading]);

  // guardamos favoritos en localstorage cuando cambian
  useEffect(() => {
    if (!loading && typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(favorites));
      } catch (error) {
        console.error("error al guardar favoritos:", error);
      }
    }
  }, [favorites, loading]);

  // calcula el id siguiente y agrega la serie al inicio
  const addSerie = (data: SerieFormData) => {
    const nextId = series.length > 0 ? Math.max(...series.map((s) => s.id)) + 1 : 1;
    const newSerie: Serie = {
      ...data,
      id: nextId,
    };
    setSeries((prev) => [newSerie, ...prev]);
  };

  // busca por id y reemplaza con los nuevos datos
  const updateSerie = (id: number, data: SerieFormData) => {
    setSeries((prev) =>
      prev.map((s) => (s.id === id ? { ...data, id } : s))
    );
  };

  // saca la serie de la lista y tambien de favoritos si estaba
  const deleteSerie = (id: number) => {
    setSeries((prev) => prev.filter((s) => s.id !== id));
    setFavorites((prev) => prev.filter((favId) => favId !== id));
  };

  // si ya esta en favoritos lo quita, si no lo agrega
  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // revisa si el id esta en el arreglo de favoritos
  const isFavorite = (id: number) => favorites.includes(id);

  // busca una serie por su id
  const getSerieById = (id: number) => series.find((s) => s.id === id);

  return (
    <SeriesContext.Provider
      value={{
        series,
        favorites,
        loading,
        addSerie,
        updateSerie,
        deleteSerie,
        toggleFavorite,
        isFavorite,
        getSerieById,
      }}
    >
      {children}
    </SeriesContext.Provider>
  );
}

// hook para usar el contexto facil en cualquier componente
export function useSeries() {
  const context = useContext(SeriesContext);
  if (!context) {
    throw new Error("useSeries debe usarse dentro de un SeriesProvider");
  }
  return context;
}
