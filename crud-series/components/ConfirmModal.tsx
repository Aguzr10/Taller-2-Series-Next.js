"use client";

// modal sencillo para confirmar antes de eliminar una serie
import { useEffect } from "react";

// props que recibe el modal para controlar visibilidad, textos y acciones
interface ConfirmModalProps {
  isOpen: boolean; // si es true el modal se muestra en pantalla
  title: string; // titulo principal del modal
  message: string; // mensaje de advertencia o pregunta
  confirmText?: string; // texto del boton de confirmar (por defecto eliminar)
  cancelText?: string; // texto del boton de cancelar
  onConfirm: () => void; // funcion que se ejecuta al confirmar
  onCancel: () => void; // funcion que se ejecuta al cancelar o cerrar
}

// componente del dialogo de confirmacion
export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmText = "Eliminar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  // cerramos con la tecla escape si esta abierto
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onCancel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  // si no esta abierto no renderiza nada
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
      {/* cuadro del modal */}
      <div className="w-full max-w-md rounded-xl border border-[#172338] bg-[#0c1424] p-6 shadow-2xl">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-neutral-300">{message}</p>

        {/* botones de accion */}
        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-[#1f3254] bg-[#131f35] px-4 py-2 text-sm font-medium text-neutral-200 transition hover:bg-[#1a2b48] active:scale-95"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-[#A50044] px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-[#A50044]/30 ring-1 ring-[#c41555]/30 transition hover:bg-[#850036] active:scale-95"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
