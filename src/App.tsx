import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { PartyPopper, Sparkles } from 'lucide-react';
import {
  CONFIRMED_EVENT,
  DEFAULT_EDITABLE_DATA,
  EditableInvitationData,
} from './config/invitationConfig';
import { BuntingBanner } from './components/BuntingBanner';
import { FloatingBalloons } from './components/FloatingBalloons';
import { AmbientConfetti } from './components/AmbientConfetti';
import { ConfettiCanvas } from './components/ConfettiCanvas';
import { CoverScreen } from './components/CoverScreen';
import { MusicPlayer, MusicPlayerHandle } from './components/MusicPlayer';
import {
  AuthorizedCharacterSlot,
  CharacterMedallion,
} from './components/CharacterMedallion';
import { CountdownSection } from './components/CountdownSection';
import { DetailsSection } from './components/DetailsSection';
import { PhotoAlbumSection } from './components/PhotoAlbumSection';
import { GuestbookSection } from './components/GuestbookSection';
import { BlessingSection } from './components/BlessingSection';
import { ClosingSection } from './components/ClosingSection';
import { CustomizeDrawer } from './components/CustomizeDrawer';

const STORAGE_KEY = 'hugo_emilio_invitacion_v1';

function loadSavedData(): EditableInvitationData {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_EDITABLE_DATA;
    const parsed = JSON.parse(raw) as Partial<EditableInvitationData>;
    return {
      ...DEFAULT_EDITABLE_DATA,
      ...parsed,
      fotos:
        Array.isArray(parsed.fotos) &&
        parsed.fotos.length === DEFAULT_EDITABLE_DATA.fotos.length
          ? parsed.fotos
          : DEFAULT_EDITABLE_DATA.fotos,
    };
  } catch {
    return DEFAULT_EDITABLE_DATA;
  }
}

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [confettiKey, setConfettiKey] = useState(1);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [editableData, setEditableData] = useState<EditableInvitationData>(() =>
    loadSavedData()
  );

  const musicPlayerRef = useRef<MusicPlayerHandle | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(editableData));
    } catch {
      // Ignore storage quota errors if large photos are previewed
    }
  }, [editableData]);

  const handleOpenInvitation = () => {
    setIsOpened(true);
    setConfettiKey((prev) => prev + 1);
    musicPlayerRef.current?.attemptStartPlayback();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplayConfetti = () => {
    setConfettiKey((prev) => prev + 1);
  };

  const handleResetData = () => {
    setEditableData(DEFAULT_EDITABLE_DATA);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage error
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#D7F1FF] via-[#FFFDF5] to-[#E6F6DA] text-[#2C1E14]">
      {/* Global Celebration Confetti Cannons */}
      <ConfettiCanvas burstKey={confettiKey} />

      {/* Always-mounted YouTube Music Player (visible bar appears once invitation opens) */}
      <MusicPlayer ref={musicPlayerRef} visible={isOpened} />

      {!isOpened ? (
        <CoverScreen onOpen={handleOpenInvitation} />
      ) : (
        <div className="relative overflow-x-clip">
          {/* Continuous Falling Colorful Confetti Across the Opened Invitation */}
          <AmbientConfetti mode="fixed" />

          {/* Subtle Floating Balloons Along Page Margins */}
          <FloatingBalloons variant="page" />

          {/* Clean Top Bar (Non-sticky on mobile so total sticky height stays under 15%) */}
          <header className="relative md:sticky md:top-0 z-30 bg-[#FFFDF7]/95 backdrop-blur-md border-b-2 border-[#F6C33E]/60">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-6">
              <a
                href="#inicio"
                className="font-display text-lg sm:text-xl font-bold text-[#1E4A12] whitespace-nowrap shrink-0"
              >
                Hugo Emilio
              </a>

              <nav
                aria-label="Secciones de la invitación"
                className="hidden md:flex items-center gap-6 text-sm font-extrabold text-[#4A3525]"
              >
                <a
                  href="#cuenta-regresiva"
                  className="hover:text-[#D95B00] transition-colors whitespace-nowrap shrink-0"
                >
                  Cuenta regresiva
                </a>
                <a
                  href="#detalles"
                  className="hover:text-[#D95B00] transition-colors whitespace-nowrap shrink-0"
                >
                  Detalles
                </a>
                <a
                  href="#album"
                  className="hover:text-[#D95B00] transition-colors whitespace-nowrap shrink-0"
                >
                  Álbum
                </a>
                <a
                  href="#mensajes"
                  className="hover:text-[#D95B00] transition-colors whitespace-nowrap shrink-0"
                >
                  Mensajes
                </a>
                <a
                  href="#bendicion"
                  className="hover:text-[#D95B00] transition-colors whitespace-nowrap shrink-0"
                >
                  Versículo
                </a>
              </nav>

              <a
                href="#confirmacion"
                className="min-h-[40px] px-4 py-2 rounded-xl bg-[#F47B1E] hover:bg-[#DC660E] text-white font-display text-sm font-bold shadow-xs transition-colors whitespace-nowrap shrink-0 inline-flex items-center"
              >
                Confirmar
              </a>
            </div>
          </header>

          {/* Festive Bunting Banner */}
          <BuntingBanner className="relative z-10 -mb-2" />

          <main id="inicio" className="relative z-10">
            {/* Opened Invitation Vibrant Fiesta Hero Showcase */}
            <section
              aria-label="Bienvenida al primer cumpleaños de Hugo Emilio"
              className="pt-5 pb-10 sm:pt-8 sm:pb-14 px-4"
            >
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-5xl mx-auto bg-white rounded-[2.25rem] shadow-xl border-4 border-[#F6C33E] ring-4 ring-white/80 overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                  {/* Left: Festive Edited La Granja de Zenón Birthday Artwork */}
                  <div className="lg:col-span-7 bg-[#0288D1] relative min-h-[230px] sm:min-h-[320px]">
                    <img
                      src={CONFIRMED_EVENT.referenciaImagenUrl}
                      alt={CONFIRMED_EVENT.referenciaImagenAlt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Right: Joyful High-Contrast Birthday Headline */}
                  <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-center text-center lg:text-left bg-gradient-to-b from-[#FFFDF5] via-[#FFF9E8] to-[#F1FAEA] fiesta-dot-bg">
                    <p className="font-display text-lg sm:text-xl font-bold text-[#D95B00] inline-flex items-center justify-center lg:justify-start gap-2">
                      <PartyPopper className="w-5 h-5 text-[#F47B1E] shrink-0" aria-hidden="true" />
                      <span>¡La Granja de Zenón está de fiesta!</span>
                    </p>
                    <p className="mt-1.5 text-base font-extrabold text-[#4A3525]">
                      Ven a celebrar el primer añito de
                    </p>
                    <h1 className="mt-2 font-display text-4xl sm:text-5xl font-bold text-[#1E4A12] leading-[1.05] tracking-tight text-balance drop-shadow-[0_3px_0_rgba(246,195,62,0.8)]">
                      {CONFIRMED_EVENT.nombreCumpleanero}
                    </h1>

                    <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-x-2.5 gap-y-1 text-base sm:text-xl font-extrabold font-display">
                      <span className="text-[#C8281D]">{CONFIRMED_EVENT.edadTexto}</span>
                      <span aria-hidden="true" className="text-[#F47B1E]">
                        ★
                      </span>
                      <span className="text-[#0369A1]">{CONFIRMED_EVENT.fechaTexto}</span>
                    </div>

                    <p className="mt-4 text-sm sm:text-base font-bold text-[#4A3525] leading-relaxed">
                      Acompaña a Zenón y a sus queridos animales de la granja en esta
                      fiesta infantil llena de globos, confeti, música y amor.
                    </p>

                    <div className="mt-5 flex justify-center lg:justify-start">
                      <button
                        type="button"
                        onClick={handleReplayConfetti}
                        className="min-h-[44px] px-4 py-2 rounded-xl bg-[#FFF1E0] hover:bg-[#FFE2BF] text-[#C25000] border border-[#F47B1E]/40 font-display font-bold text-sm inline-flex items-center gap-2 transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4" aria-hidden="true" />
                        <span>¡Lanzar lluvia de confeti!</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Characters Cast Strip from High-Res La Granja de Zenón Image */}
              <div className="max-w-5xl mx-auto mt-8 bg-[#FFFDF7]/95 rounded-[2rem] border-2 border-[#0288D1]/30 px-5 py-7 sm:px-8 shadow-md fiesta-dot-bg">
                <div className="text-center mb-6">
                  <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-[#1E3A14]">
                    Los personajes de La Granja de Zenón te invitan
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm font-bold text-[#5C4332]">
                    Zenón y sus amigos de la serie celebran el primer añito de Hugo Emilio
                  </p>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-5 items-start justify-items-center">
                  <CharacterMedallion character="zenon" />
                  <CharacterMedallion character="vaca" />
                  <CharacterMedallion character="caballo" />
                  <CharacterMedallion character="gallo" />
                  <CharacterMedallion character="cerdito" />
                  <CharacterMedallion character="loro" />
                  <AuthorizedCharacterSlot
                    title="La Gallina"
                    imageUrl={editableData.imagenGallinaAutorizada}
                    onConfigure={() => setCustomizeOpen(true)}
                  />
                </div>
              </div>
            </section>

            {/* Countdown */}
            <CountdownSection
              horaTexto={editableData.horaTexto}
              horaCuentaRegresiva={editableData.horaCuentaRegresiva}
            />

            {/* Party Details */}
            <DetailsSection
              data={editableData}
              onOpenCustomize={() => setCustomizeOpen(true)}
            />

            {/* Photo Album */}
            <PhotoAlbumSection
              fotos={editableData.fotos}
              onOpenCustomize={() => setCustomizeOpen(true)}
            />

            {/* Messages for Hugo Emilio */}
            <GuestbookSection
              whatsappNumero={editableData.whatsappNumero}
              onOpenCustomize={() => setCustomizeOpen(true)}
            />

            {/* Bible Verse & Parents' Words */}
            <BlessingSection />

            {/* Closing & RSVP */}
            <ClosingSection
              data={editableData}
              onOpenCustomize={() => setCustomizeOpen(true)}
              onReplayConfetti={handleReplayConfetti}
            />
          </main>
        </div>
      )}

      {/* Family Personalization Drawer */}
      <CustomizeDrawer
        isOpen={customizeOpen}
        data={editableData}
        onSave={setEditableData}
        onReset={handleResetData}
        onClose={() => setCustomizeOpen(false)}
      />
    </div>
  );
}
