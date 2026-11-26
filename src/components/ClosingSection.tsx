import React, { useState } from 'react';
import {
  Check,
  MessageCircle,
  Settings2,
  Share2,
  Sparkles,
} from 'lucide-react';
import {
  CONFIRMED_EVENT,
  EditableInvitationData,
  PLACEHOLDERS,
  sanitizeWhatsAppNumber,
} from '../config/invitationConfig';

interface ClosingSectionProps {
  data: EditableInvitationData;
  onOpenCustomize: () => void;
  onReplayConfetti: () => void;
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({
  data,
  onOpenCustomize,
  onReplayConfetti,
}) => {
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);
  const [whatsappNotice, setWhatsappNotice] = useState(false);

  const cleanWhatsApp = sanitizeWhatsAppNumber(data.whatsappNumero);

  const rsvpMessage = `¡Hola! Confirmo con mucha alegría nuestra asistencia al primer añito de ${CONFIRMED_EVENT.nombreCumpleanero} el ${CONFIRMED_EVENT.fechaTexto}. 🎉🐄🐴🐓`;
  const rsvpUrl = cleanWhatsApp
    ? `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(rsvpMessage)}`
    : null;

  const handleShare = async () => {
    const shareTitle = `¡${CONFIRMED_EVENT.nombreCumpleanero} cumple 1 año! | La Granja de Zenón`;
    const shareText = `¡La Granja de Zenón está de fiesta! Ven a celebrar el primer añito de ${CONFIRMED_EVENT.nombreCumpleanero} el ${CONFIRMED_EVENT.fechaTexto}.`;
    const shareUrl = window.location.href;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        setShareFeedback('¡Invitación compartida!');
        window.setTimeout(() => setShareFeedback(null), 3000);
        return;
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
      }
    }

    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setShareFeedback('¡Enlace de la invitación copiado al portapapeles!');
      window.setTimeout(() => setShareFeedback(null), 3500);
    } catch {
      setShareFeedback('Copia la dirección del navegador para compartir esta invitación.');
      window.setTimeout(() => setShareFeedback(null), 4000);
    }
  };

  return (
    <footer
      id="confirmacion"
      aria-labelledby="titulo-cierre"
      className="pt-10 pb-28 sm:pb-24 px-4"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-xl border-[3px] border-[#F6C33E] overflow-hidden text-center">
        {/* Festive Edited Celebration Artwork Banner */}
        <div className="relative aspect-[16/8] sm:aspect-[16/7] w-full bg-[#0288D1] overflow-hidden border-b-[5px] border-[#59A927]">
          <img
            src={CONFIRMED_EVENT.cierreImagenUrl}
            alt={CONFIRMED_EVENT.cierreImagenAlt}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Multicolor Fiesta Stripe */}
        <div aria-hidden="true" className="h-2.5 w-full grid grid-cols-6">
          <div className="bg-[#F47B1E]" />
          <div className="bg-[#F6C33E]" />
          <div className="bg-[#59A927]" />
          <div className="bg-[#0288D1]" />
          <div className="bg-[#D93829]" />
          <div className="bg-[#EC4899]" />
        </div>

        <div className="p-7 sm:p-10 md:p-12 fiesta-dot-bg">
          <h2
            id="titulo-cierre"
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E3A14] text-balance drop-shadow-[0_2px_0_rgba(246,195,62,0.5)]"
          >
            ¡Te esperamos para celebrar juntos!
          </h2>

          <p className="mt-3 text-lg sm:text-xl font-extrabold text-[#D95B00]">
            Con cariño, la familia de Hugo Emilio
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
            {rsvpUrl ? (
              <a
                href={rsvpUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[56px] px-7 py-3.5 rounded-2xl bg-gradient-to-b from-[#2E9E46] to-[#1F7A33] hover:from-[#25853B] hover:to-[#186429] text-white font-display text-lg sm:text-xl font-bold shadow-[0_5px_0_#145323] transition-all inline-flex items-center justify-center gap-2.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25853B]/40"
              >
                <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>Confirmar asistencia por WhatsApp</span>
              </a>
            ) : (
              <button
                type="button"
                onClick={() => setWhatsappNotice(true)}
                className="min-h-[56px] px-7 py-3.5 rounded-2xl bg-gradient-to-b from-[#2E9E46] to-[#1F7A33] hover:from-[#25853B] hover:to-[#186429] text-white font-display text-lg sm:text-xl font-bold shadow-[0_5px_0_#145323] transition-all inline-flex items-center justify-center gap-2.5 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25853B]/40"
              >
                <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>Confirmar asistencia por WhatsApp</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleShare}
              className="min-h-[56px] px-7 py-3.5 rounded-2xl bg-gradient-to-b from-[#29A8E8] to-[#0284C7] hover:from-[#0288D1] hover:to-[#0369A1] text-white font-display text-lg sm:text-xl font-bold shadow-[0_5px_0_#035B8C] transition-all inline-flex items-center justify-center gap-2.5 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0288D1]/40"
            >
              <Share2 className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>Compartir invitación</span>
            </button>
          </div>

          {!rsvpUrl && (
            <p className="mt-4 text-xs sm:text-sm font-semibold text-[#5C4332]">
              WhatsApp editable actual:{' '}
              <span className="font-extrabold text-[#B84D00]">{PLACEHOLDERS.WHATSAPP}</span>
            </p>
          )}

          {whatsappNotice && !rsvpUrl && (
            <div
              role="status"
              className="mt-4 max-w-xl mx-auto rounded-2xl bg-[#FFF5EB] border-2 border-[#F47B1E]/40 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left text-sm text-[#3E2C1E]"
            >
              <p className="font-semibold">
                Para confirmar asistencia por WhatsApp, primero reemplaza{' '}
                <strong className="text-[#B84D00]">{PLACEHOLDERS.WHATSAPP}</strong> con el
                número real incluyendo el código de país.
              </p>
              <button
                type="button"
                onClick={onOpenCustomize}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-[#F47B1E] hover:bg-[#DC660E] text-white font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Settings2 className="w-4 h-4" aria-hidden="true" />
                <span>Agregar número</span>
              </button>
            </div>
          )}

          {shareFeedback && (
            <p
              role="status"
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#2F6B12]"
            >
              <Check className="w-4 h-4" aria-hidden="true" />
              <span>{shareFeedback}</span>
            </p>
          )}

          {/* Utility Row for Confetti Burst & Family Personalization */}
          <div className="mt-9 pt-6 border-t-2 border-dashed border-[#E2E8F0] flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm font-bold text-[#5C4332]">
            <button
              type="button"
              onClick={onReplayConfetti}
              className="min-h-[46px] px-5 py-2.5 rounded-2xl bg-[#FFF5EB] hover:bg-[#FFE6CC] text-[#C85000] border border-[#F47B1E]/35 inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              <span>¡Lanzar confeti!</span>
            </button>

            <button
              type="button"
              onClick={onOpenCustomize}
              className="min-h-[46px] px-5 py-2.5 rounded-2xl bg-[#EBF7FD] hover:bg-[#D6EFFB] text-[#0369A1] border border-[#0288D1]/30 inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Settings2 className="w-4 h-4" aria-hidden="true" />
              <span>Personalizar datos pendientes y fotos</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
