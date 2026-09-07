"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Serie, SerieFormData } from "@/types/series";
import { initialSeries } from "@/data/initialSeries";

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

const SeriesContext = createContext<SeriesContextType | null>(null);

const STORAGE_KEY_SERIES = "series_app_data";
const STORAGE_KEY_FAVORITES = "series_app_favorites";

export function SeriesProvider({ children }: { children: ReactNode }) {
  const [series, setSeries] = useState<Serie[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargamos los datos del localStorage en el primer render del cliente
  useEffect(() => {
    try {
      const storedSeries = localStorage.getItem(STORAGE_KEY_SERIES);
      if (storedSeries) {
        setSeries(JSON.parse(storedSeries));
      } else {
        // Si no hay nada guardado, usamos la lista de 6 series iniciales
        setSeries(initialSeries);
        localStorage.setItem(STORAGE_KEY_SERIES, JSON.stringify(initialSeries));
      }

      const storedFavorites = localStorage.getItem(STORAGE_KEY_FAVORITES);
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Error al leer de localStorage:", error);
      setSeries(initialSeries);
    } finally {
      setLoading(false);
    }
  }, []);

  // Guardamos las series en localStorage cada vez que cambien (despues de cargar)
  useEffect(() => {
    if (!loading && typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_SERIES, JSON.stringify(series));
      } catch (error) {
        console.error("Error al guardar series en localStorage:", error);
      }
    }
  }, [series, loading]);

  // Guardamos favoritos en localStorage cada vez que cambien
  useEffect(() => {
    if (!loading && typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(favorites));
      } catch (error) {
        console.error("Error al guardar favoritos en localStorage:", error);
      }
    }
  }, [favorites, loading]);

  // Crear una nueva serie con un ID unico
  const addSerie = (data: SerieFormData) => {
    const nextId = series.length > 0 ? Math.max(...series.map((s) => s.id)) + 1 : 1;
    const newSerie: Serie = {
      ...data,
      id: nextId,
    };
    setSeries((prev) => [newSerie, ...prev]);
  };

  // Actualizar una serie existente por su ID
  const updateSerie = (id: number, data: SerieFormData) => {
    setSeries((prev) =>
      prev.map((s) => (s.id === id ? { ...data, id } : s))
    );
  };

  // Eliminar serie y removerla de favoritos si estaba marcada
  const deleteSerie = (id: number) => {
    setSeries((prev) => prev.filter((s) => s.id !== id));
    setFavorites((prev) => prev.filter((favId) => favId !== id));
  };

  // Alternar favorito (marcar o desmarcar)
  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Verificar si una serie es favorita
  const isFavorite = (id: number) => favorites.includes(id);

  // Buscar una serie especifica por su ID
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

// Hook personalizado para consumir el contexto en los componentes
export function useSeries() {
  const context = useContext(SeriesContext);
  if (!context) {
    throw new Error("useSeries debe usarse dentro de un SeriesProvider");
  }
  return context;
}
