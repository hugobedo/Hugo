import React, { useState } from 'react';
import { Check, Copy, MessageCircle, Send, Settings2 } from 'lucide-react';
import {
  PLACEHOLDERS,
  sanitizeWhatsAppNumber,
} from '../config/invitationConfig';
import { CharacterMedallion } from './CharacterMedallion';

interface GuestbookSectionProps {
  whatsappNumero: string;
  onOpenCustomize: () => void;
}

export const GuestbookSection: React.FC<GuestbookSectionProps> = ({
  whatsappNumero,
  onOpenCustomize,
}) => {
  const [guestName, setGuestName] = useState('');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [preparedText, setPreparedText] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const cleanWhatsApp = sanitizeWhatsAppNumber(whatsappNumero);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedName = guestName.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedMessage) {
      setFormError('Por favor escribe tu nombre y tu mensajito para Hugo Emilio.');
      return;
    }

    setFormError('');
    setCopied(false);
    const formatted = `¡Hola familia de Hugo Emilio! 🎉🎂\nMensaje de ${trimmedName} para el primer añito de Hugo Emilio:\n"${trimmedMessage}"`;
    setPreparedText(formatted);
  };

  const handleCopy = async () => {
    if (!preparedText) return;
    try {
      await navigator.clipboard.writeText(preparedText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 3000);
    } catch {
      setFormError(
        'No se pudo copiar automáticamente en este navegador. Puedes seleccionar y copiar el texto del recuadro.'
      );
    }
  };

  const whatsappUrl = preparedText
    ? cleanWhatsApp
      ? `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(preparedText)}`
      : `https://wa.me/?text=${encodeURIComponent(preparedText)}`
    : '#';

  return (
    <section
      id="mensajes"
      aria-labelledby="titulo-mensajes"
      className="py-10 sm:py-14 px-4"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-md border border-[#E2E8F0] overflow-hidden">
        <div className="bg-gradient-to-r from-[#FFF5EB] via-[#FFFDF7] to-[#FDF2F8] px-6 py-7 sm:px-10 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div>
            <p className="text-sm font-bold text-[#D95B00]">
              Palabras llenas de cariño
            </p>
            <h2
              id="titulo-mensajes"
              className="mt-1 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C1E14] text-balance"
            >
              Déjale un mensajito a Hugo Emilio
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-[#5C4332]">
              Escribe tus mejores deseos para su primer añito y compártelo directamente
              con su familia.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <CharacterMedallion character="cerdito" size="sm" showLabel={false} />
            <CharacterMedallion character="loro" size="sm" showLabel={false} />
          </div>
        </div>

        <div className="p-6 sm:p-8 md:p-10">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <div>
              <label
                htmlFor="guest-name"
                className="block text-sm font-bold text-[#2C1E14] mb-1.5"
              >
                Tu nombre
              </label>
              <input
                id="guest-name"
                name="guestName"
                type="text"
                value={guestName}
                onChange={(e) => {
                  setGuestName(e.target.value);
                  if (formError) setFormError('');
                }}
                placeholder="Ej. Tía Carolina, Familia Pérez..."
                className="w-full min-h-[48px] px-4 py-3 rounded-2xl border border-[#CBD5E1] bg-[#FAFCFE] text-[#2C1E14] placeholder:text-[#94A3B8] font-semibold focus:outline-none focus:border-[#F47B1E] focus:ring-4 focus:ring-[#F47B1E]/15"
              />
            </div>

            <div>
              <label
                htmlFor="guest-message"
                className="block text-sm font-bold text-[#2C1E14] mb-1.5"
              >
                Tu mensaje para Hugo Emilio
              </label>
              <textarea
                id="guest-message"
                name="guestMessage"
                rows={4}
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (formError) setFormError('');
                }}
                placeholder="Escribe un deseo bonito para el primer cumpleaños de Hugo Emilio..."
                className="w-full px-4 py-3 rounded-2xl border border-[#CBD5E1] bg-[#FAFCFE] text-[#2C1E14] placeholder:text-[#94A3B8] font-semibold focus:outline-none focus:border-[#F47B1E] focus:ring-4 focus:ring-[#F47B1E]/15 resize-y"
              />
            </div>

            {formError && (
              <p role="alert" className="text-sm font-bold text-[#C8281D]">
                {formError}
              </p>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-xs sm:text-sm font-semibold text-[#5C4332]">
                Esta invitación no guarda mensajes en un servidor automático; al pulsar el
                botón podrás copiarlo o enviarlo por WhatsApp.
              </p>

              <button
                type="submit"
                className="min-h-[50px] px-7 py-3 rounded-2xl bg-[#F47B1E] hover:bg-[#DC660E] text-white font-display text-lg font-bold shadow-md transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F47B1E]/40"
              >
                <Send className="w-5 h-5" aria-hidden="true" />
                <span>Enviar mensaje</span>
              </button>
            </div>
          </form>

          {/* Honest Prepared Message Box (Never simulates server persistence) */}
          {preparedText && (
            <div
              role="region"
              aria-live="polite"
              aria-label="Mensaje preparado para compartir"
              className="mt-6 rounded-2xl bg-[#F2F9EC] border border-[#59A927]/35 p-5 sm:p-6"
            >
              <p className="font-display text-lg font-bold text-[#1E3A14]">
                Tu mensajito está listo para compartir
              </p>
              <p className="mt-1 text-xs sm:text-sm font-semibold text-[#3E2C1E]">
                Como todavía no hay un servicio conectado para guardar mensajes en línea,
                elige una de estas opciones reales para hacerlo llegar a la familia:
              </p>

              <pre className="mt-3 whitespace-pre-wrap font-sans text-sm sm:text-base font-semibold text-[#2C1E14] bg-white rounded-xl border border-[#D9EAD3] p-4">
                {preparedText}
              </pre>

              <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="min-h-[48px] px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#2C1E14] border border-[#CBD5E1] font-bold text-sm inline-flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#2F6B12]" aria-hidden="true" />
                      <span>¡Mensaje copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#0369A1]" aria-hidden="true" />
                      <span>Copiar mensaje</span>
                    </>
                  )}
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] px-5 py-2.5 rounded-xl bg-[#25853B] hover:bg-[#1E6E30] text-white font-bold text-sm inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>
                    {cleanWhatsApp
                      ? 'Enviar por WhatsApp a la familia'
                      : 'Preparar mensaje en WhatsApp'}
                  </span>
                </a>
              </div>

              {!cleanWhatsApp && (
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-[#5C4332]">
                  <span>
                    Número de WhatsApp editable pendiente ({PLACEHOLDERS.WHATSAPP}): al
                    abrir WhatsApp podrás elegir el contacto manualmente.
                  </span>
                  <button
                    type="button"
                    onClick={onOpenCustomize}
                    className="inline-flex items-center gap-1 font-bold text-[#B84D00] hover:underline cursor-pointer"
                  >
                    <Settings2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Configurar número</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
