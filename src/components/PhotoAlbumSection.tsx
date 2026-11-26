import React, { useEffect, useState } from 'react';
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Expand,
  Settings2,
  X,
} from 'lucide-react';
import { PhotoSlot } from '../config/invitationConfig';
import { CharacterId, CharacterMedallion } from './CharacterMedallion';

interface PhotoAlbumSectionProps {
  fotos: PhotoSlot[];
  onOpenCustomize: () => void;
}

const SLOT_CHARACTERS: CharacterId[] = [
  'zenon',
  'vaca',
  'caballo',
  'gallo',
  'cerdito',
  'loro',
];

const SLOT_THEMES = [
  'from-[#EBF7FD] to-[#FFFDF7] border-[#0288D1]/30',
  'from-[#F2F9EC] to-[#FFFDF7] border-[#59A927]/30',
  'from-[#FFF5EB] to-[#FFFDF7] border-[#F47B1E]/30',
  'from-[#FEF2F2] to-[#FFFDF7] border-[#D93829]/30',
  'from-[#FDF2F8] to-[#FFFDF7] border-[#DB2777]/30',
  'from-[#FFFBEB] to-[#FFFDF7] border-[#D97706]/30',
];

export const PhotoAlbumSection: React.FC<PhotoAlbumSectionProps> = ({
  fotos,
  onOpenCustomize,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setActiveIndex(index);
  const closeLightbox = () => setActiveIndex(null);

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === null ? null : (prev - 1 + fotos.length) % fotos.length
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === null ? null : (prev + 1) % fotos.length));
  };

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveIndex(null);
      } else if (event.key === 'ArrowLeft') {
        setActiveIndex((prev) =>
          prev === null ? null : (prev - 1 + fotos.length) % fotos.length
        );
      } else if (event.key === 'ArrowRight') {
        setActiveIndex((prev) =>
          prev === null ? null : (prev + 1) % fotos.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, fotos.length]);

  const activePhoto = activeIndex !== null ? fotos[activeIndex] : null;
  const activeCharacter =
    activeIndex !== null
      ? SLOT_CHARACTERS[activeIndex % SLOT_CHARACTERS.length]
      : 'zenon';

  return (
    <section
      id="album"
      aria-labelledby="titulo-album"
      className="py-10 sm:py-14 px-4"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7">
          <div>
            <p className="text-sm font-bold text-[#D95B00]">
              Recuerdos de su primer añito
            </p>
            <h2
              id="titulo-album"
              className="mt-1 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C1E14] text-balance"
            >
              Álbum de fotos de Hugo Emilio
            </h2>
            <p className="mt-1.5 text-sm sm:text-base text-[#5C4332] max-w-2xl">
              Toca cualquier recuadro para verlo en grande y recorrer la galería. Los
              espacios sin foto están marcados como muestra lista para reemplazar con las
              fotos reales de Hugo Emilio.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenCustomize}
            className="min-h-[44px] px-4 py-2.5 rounded-xl bg-white hover:bg-[#FFF5EB] text-[#3E2C1E] border border-[#E2E8F0] hover:border-[#F47B1E]/50 font-bold text-sm inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 shadow-xs transition-colors cursor-pointer"
          >
            <Settings2 className="w-4 h-4 text-[#F47B1E]" aria-hidden="true" />
            <span>Agregar fotos de Hugo</span>
          </button>
        </div>

        {/* Interactive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {fotos.map((foto, index) => {
            const charId = SLOT_CHARACTERS[index % SLOT_CHARACTERS.length];
            const themeClass = SLOT_THEMES[index % SLOT_THEMES.length];

            return (
              <button
                key={foto.id}
                type="button"
                onClick={() => openLightbox(index)}
                aria-label={`Abrir ${foto.title} en vista ampliada`}
                className={`group text-left rounded-3xl overflow-hidden border-2 bg-gradient-to-b shadow-sm hover:shadow-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0288D1]/40 ${themeClass}`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden flex flex-col items-center justify-center p-5">
                  {foto.imageUrl ? (
                    <>
                      <img
                        src={foto.imageUrl}
                        alt={`${foto.title} — ${foto.caption}`}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/55 text-white flex items-center justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                        <Expand className="w-4 h-4" aria-hidden="true" />
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center">
                      <CharacterMedallion
                        character={charId}
                        size="sm"
                        showLabel={false}
                      />
                      <div className="mt-3 inline-flex items-center gap-1.5 text-xs font-extrabold text-[#5C4332]">
                        <Camera className="w-4 h-4 text-[#F47B1E]" aria-hidden="true" />
                        <span>Espacio de muestra reemplazable</span>
                      </div>
                      <p className="mt-1 text-xs font-semibold text-[#64748B] max-w-[220px]">
                        Aquí irá una foto real de Hugo Emilio
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-white px-4 py-3.5 border-t border-[#E2E8F0] flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-display text-base font-bold text-[#2C1E14] truncate">
                      {foto.title}
                    </p>
                    <p className="text-xs font-semibold text-[#5C4332] truncate">
                      {foto.caption}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#0369A1] whitespace-nowrap shrink-0">
                    Ver
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {activeIndex !== null && activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Vista ampliada: ${activePhoto.title}`}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-3xl bg-[#FFFDF7] rounded-3xl overflow-hidden shadow-2xl border-2 border-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between gap-4 px-5 py-3.5 bg-white border-b border-[#E2E8F0]">
              <div className="min-w-0">
                <p className="font-display text-lg font-bold text-[#2C1E14] truncate">
                  {activePhoto.title}
                </p>
                <p className="text-xs font-semibold text-[#5C4332]">
                  Foto {activeIndex + 1} de {fotos.length}
                </p>
              </div>
              <button
                type="button"
                onClick={closeLightbox}
                aria-label="Cerrar vista ampliada"
                className="min-w-[44px] min-h-[44px] rounded-xl bg-slate-100 hover:bg-slate-200 text-[#2C1E14] flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Image / Sample Frame Display */}
            <div className="relative bg-gradient-to-b from-[#EBF7FD] to-[#F2F9EC] aspect-[4/3] sm:aspect-[16/10] flex items-center justify-center p-6">
              {activePhoto.imageUrl ? (
                <img
                  src={activePhoto.imageUrl}
                  alt={`${activePhoto.title} — ${activePhoto.caption}`}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-full object-contain rounded-2xl shadow-md"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-center max-w-md bg-white/90 rounded-3xl p-6 sm:p-8 border-2 border-dashed border-[#F47B1E]/50 shadow-sm">
                  <CharacterMedallion
                    character={activeCharacter}
                    size="lg"
                    showLabel={true}
                  />
                  <p className="mt-4 font-display text-xl font-bold text-[#2C1E14]">
                    {activePhoto.title}
                  </p>
                  <p className="mt-1.5 text-sm font-semibold text-[#5C4332]">
                    Espacio de muestra claramente reemplazable. Todavía no se ha cargado
                    una fotografía real de Hugo Emilio en este espacio.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      closeLightbox();
                      onOpenCustomize();
                    }}
                    className="mt-4 min-h-[44px] px-5 py-2 rounded-xl bg-[#F47B1E] hover:bg-[#DC660E] text-white font-bold text-sm inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Camera className="w-4 h-4" aria-hidden="true" />
                    <span>Cargar foto real</span>
                  </button>
                </div>
              )}
            </div>

            {/* Footer Controls: Previous / Caption / Next */}
            <div className="flex items-center justify-between gap-3 px-4 py-3.5 bg-white border-t border-[#E2E8F0]">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Foto anterior"
                className="min-h-[44px] px-4 py-2 rounded-xl bg-[#EBF7FD] hover:bg-[#D6EFFB] text-[#0369A1] font-bold text-sm inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                <span>Anterior</span>
              </button>

              <p className="text-xs sm:text-sm font-semibold text-[#5C4332] text-center truncate px-2">
                {activePhoto.caption}
              </p>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Foto siguiente"
                className="min-h-[44px] px-4 py-2 rounded-xl bg-[#EBF7FD] hover:bg-[#D6EFFB] text-[#0369A1] font-bold text-sm inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>Siguiente</span>
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
