"use client";

// formulario controlado para crear y editar series con validacion en tiempo real
import { useState, useEffect } from "react";
import { SerieFormData, SerieErrors } from "@/types/series";
import Link from "next/link";

// props del formulario
interface SerieFormProps {
  initialData?: SerieFormData; // datos iniciales si estamos editando
  onSubmit: (data: SerieFormData) => void; // funcion a ejecutar al enviar datos validos
  buttonText?: string; // texto personalizado para el boton principal
  isEditing?: boolean; // bandera para saber si es edicion o creacion
}

export default function SerieForm({
  initialData,
  onSubmit,
  buttonText = "Guardar Serie",
  isEditing = false,
}: SerieFormProps) {
  // estado inicial por defecto para campos vacios
  const defaultValues: SerieFormData = {
    title: "",
    genre: "",
    seasons: 1,
    platform: "",
    rating: 8.0,
    image: "",
    description: "",
  };

  // estado controlado para todos los campos del formulario
  const [form, setForm] = useState<SerieFormData>(initialData || defaultValues);

  // estado para almacenar los errores de cada campo
  const [errors, setErrors] = useState<SerieErrors>({});

  // si cambian los datos iniciales al editar, actualizamos el formulario
  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  // funcion para validar un campo individual o todo el formulario
  const validateField = (name: keyof SerieFormData, value: unknown): string => {
    switch (name) {
      case "title":
        if (!String(value).trim()) return "el título es obligatorio";
        if (String(value).trim().length < 2) return "mínimo 2 caracteres";
        return "";
      case "genre":
        if (!String(value).trim()) return "el género es obligatorio";
        return "";
      case "seasons":
        if (!value || Number(value) < 1) return "debe tener al menos 1 temporada";
        return "";
      case "platform":
        if (!String(value).trim()) return "la plataforma es obligatoria";
        return "";
      case "rating":
        if (value === "" || Number(value) < 1 || Number(value) > 10) {
          return "el rating debe ser entre 1 y 10";
        }
        return "";
      case "image":
        if (!String(value).trim()) return "la url de la imagen es obligatoria";
        if (!String(value).startsWith("http"))
          return "debe ser una url válida (iniciar con http o https)";
        return "";
      case "description":
        if (!String(value).trim()) return "la sinopsis es obligatoria";
        if (String(value).trim().length < 10) return "escribe al menos 10 caracteres";
        return "";
      default:
        return "";
    }
  };

  // actualizamos el estado del formulario y validamos el campo en tiempo real
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const parsedValue =
      type === "number" ? (value === "" ? "" : Number(value)) : value;

    setForm((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));

    // validamos en tiempo real y limpiamos o actualizamos el error
    const errorMsg = validateField(name as keyof SerieFormData, parsedValue);
    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };

  // validamos todos los campos juntos antes de enviar
  const validateAll = (): boolean => {
    const newErrors: SerieErrors = {};
    (Object.keys(form) as (keyof SerieFormData)[]).forEach((key) => {
      const errorMsg = validateField(key, form[key]);
      if (errorMsg) {
        newErrors[key] = errorMsg;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // manejamos el envio del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateAll()) {
      onSubmit(form);
      // si estamos creando reseteamos el formulario
      if (!isEditing) {
        setForm(defaultValues);
        setErrors({});
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* campo titulo */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300">
            Título de la serie *
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className={`mt-1.5 w-full rounded-lg border bg-[#172033] px-3.5 py-2.5 text-sm text-white placeholder-slate-400 outline-none transition focus:ring-1 ${
              errors.title
                ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500"
                : "border-slate-700/80 focus:border-[#004D98] focus:ring-[#004D98]"
            }`}
          />
          {errors.title && (
            <p className="mt-1 text-xs text-rose-400">{errors.title}</p>
          )}
        </div>

        {/* campo genero */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            Género *
          </label>
          <input
            type="text"
            name="genre"
            value={form.genre}
            onChange={handleChange}
            className={`mt-1.5 w-full rounded-lg border bg-[#172033] px-3.5 py-2.5 text-sm text-white placeholder-slate-400 outline-none transition focus:ring-1 ${
              errors.genre
                ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500"
                : "border-slate-700/80 focus:border-[#004D98] focus:ring-[#004D98]"
            }`}
          />
          {errors.genre && (
            <p className="mt-1 text-xs text-rose-400">{errors.genre}</p>
          )}
        </div>

        {/* campo plataforma */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            Plataforma *
          </label>
          <input
            type="text"
            name="platform"
            value={form.platform}
            onChange={handleChange}
            className={`mt-1.5 w-full rounded-lg border bg-[#172033] px-3.5 py-2.5 text-sm text-white placeholder-slate-400 outline-none transition focus:ring-1 ${
              errors.platform
                ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500"
                : "border-slate-700/80 focus:border-[#004D98] focus:ring-[#004D98]"
            }`}
          />
          {errors.platform && (
            <p className="mt-1 text-xs text-rose-400">{errors.platform}</p>
          )}
        </div>

        {/* campo temporadas */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            Temporadas *
          </label>
          <input
            type="number"
            name="seasons"
            min={1}
            value={form.seasons}
            onChange={handleChange}
            className={`mt-1.5 w-full rounded-lg border bg-[#172033] px-3.5 py-2.5 text-sm text-white placeholder-slate-400 outline-none transition focus:ring-1 ${
              errors.seasons
                ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500"
                : "border-slate-700/80 focus:border-[#004D98] focus:ring-[#004D98]"
            }`}
          />
          {errors.seasons && (
            <p className="mt-1 text-xs text-rose-400">{errors.seasons}</p>
          )}
        </div>

        {/* campo rating */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            Calificación (1 a 10) *
          </label>
          <input
            type="number"
            step="0.1"
            min="1"
            max="10"
            name="rating"
            value={form.rating}
            onChange={handleChange}
            className={`mt-1.5 w-full rounded-lg border bg-[#172033] px-3.5 py-2.5 text-sm text-white placeholder-slate-400 outline-none transition focus:ring-1 ${
              errors.rating
                ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500"
                : "border-slate-700/80 focus:border-[#004D98] focus:ring-[#004D98]"
            }`}
          />
          {errors.rating && (
            <p className="mt-1 text-xs text-rose-400">{errors.rating}</p>
          )}
        </div>

        {/* campo url de imagen */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            URL de la portada / póster *
          </label>
          <input
            type="url"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="https://ejemplo.com/poster.jpg"
            className={`mt-1.5 w-full rounded-lg border bg-[#172033] px-3.5 py-2.5 text-sm text-white placeholder-slate-400 outline-none transition focus:ring-1 ${
              errors.image
                ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500"
                : "border-slate-700/80 focus:border-[#004D98] focus:ring-[#004D98]"
            }`}
          />
          {errors.image && (
            <p className="mt-1 text-xs text-rose-400">{errors.image}</p>
          )}

          {/* preview de la imagen en vivo */}
          {form.image && !errors.image && (
            <div className="mt-3 flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-900 p-2.5">
              <img
                src={form.image}
                alt="Vista previa"
                className="h-16 w-12 rounded object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/100x150/1e293b/ffffff?text=Error";
                }}
              />
              <div className="text-xs text-slate-400">
                <p className="font-semibold text-white">
                  Vista previa de portada
                </p>
                <p className="line-clamp-1">{form.image}</p>
              </div>
            </div>
          )}
        </div>

        {/* campo descripcion o sinopsis */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            Sinopsis / Descripción *
          </label>
          <textarea
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
            placeholder="Escribe un breve resumen sobre la trama principal de la serie..."
            className={`mt-1.5 w-full rounded-lg border bg-[#172033] px-3.5 py-2.5 text-sm text-white placeholder-slate-400 outline-none transition focus:ring-1 ${
              errors.description
                ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500"
                : "border-slate-700/80 focus:border-[#004D98] focus:ring-[#004D98]"
            }`}
          />
          {errors.description && (
            <p className="mt-1 text-xs text-rose-400">{errors.description}</p>
          )}
        </div>
      </div>

      {/* botones de accion del formulario */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
        <Link
          href="/"
          className="rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700 active:scale-95"
        >
          Cancelar
        </Link>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-[#A50044] px-5 py-2 text-sm font-semibold text-white shadow-sm shadow-[#A50044]/30 ring-1 ring-[#c41555]/30 transition hover:bg-[#850036] active:scale-95"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
}
