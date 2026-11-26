import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MailOpen, PartyPopper, Sparkles } from 'lucide-react';
import { CONFIRMED_EVENT } from '../config/invitationConfig';
import { BuntingBanner } from './BuntingBanner';
import { FloatingBalloons } from './FloatingBalloons';
import { AmbientConfetti } from './AmbientConfetti';

interface CoverScreenProps {
  onOpen: () => void;
}

export const CoverScreen: React.FC<CoverScreenProps> = ({ onOpen }) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section
      aria-label="Portada de la invitación de Hugo Emilio"
      className="relative min-h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#0284C7] via-[#38BDF8] to-[#59A927]"
    >
      {/* Top Festive Bunting */}
      <div className="relative z-30 w-full">
        <BuntingBanner />
      </div>

      {/* Continuous Falling Colorful Confetti on the Cover */}
      <AmbientConfetti mode="absolute" />

      {/* Floating Colorful Balloons */}
      <FloatingBalloons variant="cover" />

      {/* Sunlit Meadow & Sandy Country Path Ground Layer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[36%] bg-gradient-to-t from-[#E9C074] via-[#68B82E] to-transparent z-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -left-16 w-[65%] h-44 rounded-[100%] bg-[#59A927] opacity-95 z-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -right-12 w-[70%] h-48 rounded-[100%] bg-[#4E9A23] opacity-95 z-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#F2D18A] to-[#E9C074]/0 z-0"
      />

      {/* Main Centered Festive Invitation Card */}
      <div className="relative z-20 flex-1 flex items-center justify-center px-4 py-4 sm:py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-2xl mx-auto bg-[#FFFDF7] rounded-[2.25rem] shadow-[0_24px_60px_rgba(14,74,117,0.32)] border-4 border-[#F6C33E] ring-4 ring-white/85 overflow-hidden"
        >
          {/* Edited La Granja de Zenón Birthday Party Artwork */}
          <div className="relative w-full aspect-[16/9] bg-[#0288D1] overflow-hidden border-b-[5px] border-[#59A927]">
            {!imgFailed ? (
              <img
                src={CONFIRMED_EVENT.referenciaImagenUrl}
                alt={CONFIRMED_EVENT.referenciaImagenAlt}
                referrerPolicy="no-referrer"
                onError={() => setImgFailed(true)}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <img
                src={CONFIRMED_EVENT.personajesFuenteUrl}
                alt={CONFIRMED_EVENT.referenciaImagenAlt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
            )}
          </div>

          {/* Multicolor Children's Fiesta Stripe */}
          <div
            aria-hidden="true"
            className="h-2.5 w-full grid grid-cols-6"
          >
            <div className="bg-[#F47B1E]" />
            <div className="bg-[#F6C33E]" />
            <div className="bg-[#59A927]" />
            <div className="bg-[#0288D1]" />
            <div className="bg-[#D93829]" />
            <div className="bg-[#EC4899]" />
          </div>

          {/* Crisp, Joyful, High-Contrast Invitation Copy */}
          <div className="fiesta-dot-bg px-5 py-6 sm:px-8 sm:py-7 text-center flex flex-col items-center">
            <p className="font-display text-lg sm:text-xl md:text-2xl font-bold text-[#D95B00] tracking-tight text-balance inline-flex items-center gap-2">
              <PartyPopper className="w-5 h-5 sm:w-6 sm:h-6 text-[#F47B1E] shrink-0" aria-hidden="true" />
              <span>¡La Granja de Zenón está de fiesta!</span>
            </p>

            <p className="mt-1.5 text-base sm:text-lg font-extrabold text-[#4A3525]">
              Ven a celebrar el primer añito de
            </p>

            <h1 className="mt-2 font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1E4A12] leading-[1.04] text-balance drop-shadow-[0_3px_0_rgba(246,195,62,0.85)]">
              {CONFIRMED_EVENT.nombreCumpleanero}
            </h1>

            <div className="mt-3.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-base sm:text-xl font-extrabold">
              <span className="text-[#C8281D] font-display">{CONFIRMED_EVENT.edadTexto}</span>
              <span aria-hidden="true" className="text-[#F47B1E]">
                ★
              </span>
              <span className="text-[#0369A1] font-display">{CONFIRMED_EVENT.fechaTexto}</span>
            </div>

            <div className="mt-6 w-full sm:w-auto">
              <button
                type="button"
                onClick={onOpen}
                className="animate-cta-gentle w-full sm:w-auto min-h-[58px] px-9 py-4 rounded-2xl bg-gradient-to-b from-[#FF8F2D] to-[#E8660C] hover:from-[#F47B1E] hover:to-[#CE5604] active:translate-y-0.5 text-white font-display text-xl sm:text-2xl font-bold shadow-[0_6px_0_#A94400,0_16px_28px_rgba(232,102,12,0.42)] transition-all inline-flex items-center justify-center gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0288D1]/50"
              >
                <MailOpen className="w-6 h-6 shrink-0" aria-hidden="true" />
                <span>Abrir invitación</span>
              </button>
            </div>

            <p className="mt-4 text-xs sm:text-sm font-bold text-[#5C4332] inline-flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#F47B1E] shrink-0" aria-hidden="true" />
              <span>Toca el botón para lanzar confeti, activar la música y ver la fiesta</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
