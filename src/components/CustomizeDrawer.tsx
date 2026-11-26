import React, { useEffect, useState } from 'react';
import { Camera, RotateCcw, Save, Trash2, X } from 'lucide-react';
import {
  DEFAULT_EDITABLE_DATA,
  EditableInvitationData,
  PLACEHOLDERS,
} from '../config/invitationConfig';

interface CustomizeDrawerProps {
  isOpen: boolean;
  data: EditableInvitationData;
  onSave: (nextData: EditableInvitationData) => void;
  onReset: () => void;
  onClose: () => void;
}

export const CustomizeDrawer: React.FC<CustomizeDrawerProps> = ({
  isOpen,
  data,
  onSave,
  onReset,
  onClose,
}) => {
  const [draft, setDraft] = useState<EditableInvitationData>(data);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setDraft(data);
      setUploadError(null);
    }
  }, [isOpen, data]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const readImageFile = (file: File, onLoaded: (dataUrl: string) => void) => {
    if (!file.type.startsWith('image/')) {
      setUploadError('Por favor selecciona un archivo de imagen válido (JPG, PNG o WebP).');
      return;
    }
    if (file.size > 4 * 1024 * 1024) {
      setUploadError('La imagen pesa más de 4 MB. Elige una foto más ligera para que la invitación cargue rápido.');
      return;
    }
    setUploadError(null);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onLoaded(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...draft,
      horaTexto: draft.horaTexto.trim() || PLACEHOLDERS.HORA,
      lugar: draft.lugar.trim() || PLACEHOLDERS.LUGAR,
      direccion: draft.direccion.trim() || PLACEHOLDERS.DIRECCION,
      enlaceMaps: draft.enlaceMaps.trim() || PLACEHOLDERS.MAPS,
      whatsappNumero: draft.whatsappNumero.trim() || PLACEHOLDERS.WHATSAPP,
    });
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-personalizar"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-2xl max-h-[90dvh] bg-[#FFFDF7] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#E2E8F0] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 px-5 py-4 bg-white border-b border-[#E2E8F0] shrink-0">
          <div>
            <h2
              id="titulo-personalizar"
              className="font-display text-xl sm:text-2xl font-bold text-[#2C1E14]"
            >
              Personalizar datos de la invitación
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-[#5C4332]">
              Completa los campos pendientes para probar y previsualizar en este navegador.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar panel de personalización"
            className="min-w-[44px] min-h-[44px] rounded-xl bg-slate-100 hover:bg-slate-200 text-[#2C1E14] flex items-center justify-center cursor-pointer"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form
          id="customize-invitation-form"
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-5 py-5 space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="edit-hora" className="block text-sm font-bold text-[#2C1E14] mb-1">
                Hora (texto visible)
              </label>
              <input
                id="edit-hora"
                type="text"
                value={draft.horaTexto}
                onChange={(e) => setDraft({ ...draft, horaTexto: e.target.value })}
                placeholder="Ej. 3:00 p. m."
                className="w-full min-h-[46px] px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-sm font-semibold text-[#2C1E14] focus:outline-none focus:border-[#F47B1E]"
              />
            </div>

            <div>
              <label
                htmlFor="edit-hora-countdown"
                className="block text-sm font-bold text-[#2C1E14] mb-1"
              >
                Hora para cuenta regresiva (24h)
              </label>
              <input
                id="edit-hora-countdown"
                type="time"
                value={draft.horaCuentaRegresiva}
                onChange={(e) =>
                  setDraft({ ...draft, horaCuentaRegresiva: e.target.value })
                }
                className="w-full min-h-[46px] px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-sm font-semibold text-[#2C1E14] focus:outline-none focus:border-[#F47B1E]"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="edit-lugar" className="block text-sm font-bold text-[#2C1E14] mb-1">
                Lugar
              </label>
              <input
                id="edit-lugar"
                type="text"
                value={draft.lugar}
                onChange={(e) => setDraft({ ...draft, lugar: e.target.value })}
                placeholder="Ej. Salón de Eventos La Pradera"
                className="w-full min-h-[46px] px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-sm font-semibold text-[#2C1E14] focus:outline-none focus:border-[#F47B1E]"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="edit-direccion"
                className="block text-sm font-bold text-[#2C1E14] mb-1"
              >
                Dirección
              </label>
              <input
                id="edit-direccion"
                type="text"
                value={draft.direccion}
                onChange={(e) => setDraft({ ...draft, direccion: e.target.value })}
                placeholder="Calle, número, colonia o barrio, ciudad"
                className="w-full min-h-[46px] px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-sm font-semibold text-[#2C1E14] focus:outline-none focus:border-[#F47B1E]"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="edit-maps" className="block text-sm font-bold text-[#2C1E14] mb-1">
                Enlace de Google Maps
              </label>
              <input
                id="edit-maps"
                type="text"
                value={draft.enlaceMaps}
                onChange={(e) => setDraft({ ...draft, enlaceMaps: e.target.value })}
                placeholder="https://maps.google.com/..."
                className="w-full min-h-[46px] px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-sm font-semibold text-[#2C1E14] focus:outline-none focus:border-[#F47B1E]"
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="edit-whatsapp"
                className="block text-sm font-bold text-[#2C1E14] mb-1"
              >
                Número de WhatsApp (con código de país)
              </label>
              <input
                id="edit-whatsapp"
                type="text"
                value={draft.whatsappNumero}
                onChange={(e) => setDraft({ ...draft, whatsappNumero: e.target.value })}
                placeholder="Ej. +52 55 1234 5678"
                className="w-full min-h-[46px] px-3.5 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-sm font-semibold text-[#2C1E14] focus:outline-none focus:border-[#F47B1E]"
              />
            </div>
          </div>

          {uploadError && (
            <p role="alert" className="text-sm font-bold text-[#C8281D]">
              {uploadError}
            </p>
          )}

          {/* Optional Authorized Character Slot (La Gallina Turuleca) */}
          <div className="pt-4 border-t border-[#E2E8F0]">
            <h3 className="font-display text-lg font-bold text-[#2C1E14]">
              Espacio para imagen autorizada (La Gallina)
            </h3>
            <p className="text-xs font-semibold text-[#5C4332] mt-0.5">
              Si cuentas con una imagen autorizada de La Gallina Turuleca de La Granja de
              Zenón, puedes cargarla aquí.
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <label className="min-h-[44px] px-4 py-2 rounded-xl bg-[#F2F9EC] hover:bg-[#E2F2D5] text-[#2F6B12] font-bold text-sm inline-flex items-center gap-2 cursor-pointer">
                <Camera className="w-4 h-4" aria-hidden="true" />
                <span>
                  {draft.imagenGallinaAutorizada
                    ? 'Cambiar imagen autorizada'
                    : 'Subir imagen autorizada'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      readImageFile(file, (url) =>
                        setDraft((prev) => ({ ...prev, imagenGallinaAutorizada: url }))
                      );
                    }
                  }}
                />
              </label>

              {draft.imagenGallinaAutorizada && (
                <button
                  type="button"
                  onClick={() =>
                    setDraft((prev) => ({ ...prev, imagenGallinaAutorizada: null }))
                  }
                  className="min-h-[44px] px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-[#C8281D] font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" aria-hidden="true" />
                  <span>Quitar</span>
                </button>
              )}
            </div>
          </div>

          {/* Photo Album Uploads */}
          <div className="pt-4 border-t border-[#E2E8F0]">
            <h3 className="font-display text-lg font-bold text-[#2C1E14]">
              Fotos reales de Hugo Emilio
            </h3>
            <p className="text-xs font-semibold text-[#5C4332] mt-0.5">
              Reemplaza los espacios de muestra con las fotografías de Hugo Emilio.
            </p>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {draft.fotos.map((slot, index) => (
                <div
                  key={slot.id}
                  className="p-3 rounded-2xl bg-white border border-[#E2E8F0] flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-[#2C1E14] truncate">
                      {slot.title}
                    </p>
                    <p className="text-xs font-semibold text-[#64748B] truncate">
                      {slot.imageUrl ? 'Foto cargada' : 'Espacio de muestra'}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <label className="min-h-[40px] px-3 py-1.5 rounded-xl bg-[#EBF7FD] hover:bg-[#D6EFFB] text-[#0369A1] font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer">
                      <Camera className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{slot.imageUrl ? 'Cambiar' : 'Subir'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            readImageFile(file, (url) =>
                              setDraft((prev) => ({
                                ...prev,
                                fotos: prev.fotos.map((f, i) =>
                                  i === index
                                    ? {
                                        ...f,
                                        imageUrl: url,
                                        caption: `Recuerdo de Hugo Emilio #${i + 1}`,
                                      }
                                    : f
                                ),
                              }))
                            );
                          }
                        }}
                      />
                    </label>

                    {slot.imageUrl && (
                      <button
                        type="button"
                        aria-label={`Quitar ${slot.title}`}
                        onClick={() =>
                          setDraft((prev) => ({
                            ...prev,
                            fotos: prev.fotos.map((f, i) =>
                              i === index ? DEFAULT_EDITABLE_DATA.fotos[i] : f
                            ),
                          }))
                        }
                        className="min-w-[40px] min-h-[40px] rounded-xl bg-red-50 hover:bg-red-100 text-[#C8281D] flex items-center justify-center cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bg-white border-t border-[#E2E8F0] shrink-0">
          <button
            type="button"
            onClick={() => {
              onReset();
              setDraft(DEFAULT_EDITABLE_DATA);
            }}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#3E2C1E] font-bold text-sm inline-flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Restaurar plantilla</span>
          </button>

          <button
            type="submit"
            form="customize-invitation-form"
            className="min-h-[46px] px-6 py-2.5 rounded-xl bg-[#F47B1E] hover:bg-[#DC660E] text-white font-display text-base font-bold shadow-sm inline-flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" aria-hidden="true" />
            <span>Guardar cambios</span>
          </button>
        </div>
      </div>
    </div>
  );
};
