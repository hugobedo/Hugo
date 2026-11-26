import React, { useState } from 'react';
import { ImagePlus } from 'lucide-react';
import { CONFIRMED_EVENT } from '../config/invitationConfig';

export type CharacterId = 'zenon' | 'vaca' | 'caballo' | 'gallo' | 'cerdito' | 'loro';

interface CropSpec {
  name: string;
  alt: string;
  /** Normalized focal point (0 to 1) inside the high-res La Granja de Zenón image */
  cx: number;
  cy: number;
  /** Vertical zoom factor relative to the square medallion height */
  zoom: number;
  borderColor: string;
  bgTint: string;
}

export const CHARACTER_CROPS: Record<CharacterId, CropSpec> = {
  zenon: {
    name: 'Zenón',
    alt: 'Zenón de La Granja de Zenón',
    cx: 0.645,
    cy: 0.3,
    zoom: 2.35,
    borderColor: '#F47B1E',
    bgTint: '#FFF7ED',
  },
  vaca: {
    name: 'La Vaca Lola',
    alt: 'La vaca de La Granja de Zenón',
    cx: 0.845,
    cy: 0.46,
    zoom: 2.15,
    borderColor: '#0288D1',
    bgTint: '#F0F9FF',
  },
  caballo: {
    name: 'El Caballo Percherón',
    alt: 'El caballo de La Granja de Zenón',
    cx: 0.145,
    cy: 0.39,
    zoom: 2.1,
    borderColor: '#D97706',
    bgTint: '#FFFBEB',
  },
  gallo: {
    name: 'El Gallo Bartolito',
    alt: 'El gallo de La Granja de Zenón',
    cx: 0.32,
    cy: 0.52,
    zoom: 2.4,
    borderColor: '#D93829',
    bgTint: '#FEF2F2',
  },
  cerdito: {
    name: 'La Cerdita',
    alt: 'La cerdita de La Granja de Zenón',
    cx: 0.48,
    cy: 0.66,
    zoom: 2.25,
    borderColor: '#DB2777',
    bgTint: '#FDF2F8',
  },
  loro: {
    name: 'El Lorito Pepe',
    alt: 'El lorito de La Granja de Zenón',
    cx: 0.425,
    cy: 0.255,
    zoom: 2.95,
    borderColor: '#4E9A23',
    bgTint: '#F2F9EC',
  },
};

interface CharacterMedallionProps {
  character: CharacterId;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const CharacterMedallion: React.FC<CharacterMedallionProps> = ({
  character,
  size = 'md',
  showLabel = true,
  className = '',
}) => {
  const [ratio, setRatio] = useState(1.78);
  const [failed, setFailed] = useState(false);
  const spec = CHARACTER_CROPS[character];

  const sizeClass =
    size === 'sm'
      ? 'w-16 h-16 sm:w-20 sm:h-20'
      : size === 'lg'
        ? 'w-24 h-24 sm:w-28 sm:h-28'
        : 'w-20 h-20 sm:w-24 sm:h-24';

  const imgWidthPct = spec.zoom * ratio * 100;
  const imgHeightPct = spec.zoom * 100;

  const rawLeft = 50 - spec.cx * imgWidthPct;
  const rawTop = 50 - spec.cy * imgHeightPct;

  const minLeft = 100 - imgWidthPct;
  const minTop = 100 - imgHeightPct;

  const clampedLeft = Math.min(0, Math.max(minLeft, rawLeft));
  const clampedTop = Math.min(0, Math.max(minTop, rawTop));

  return (
    <figure className={`flex flex-col items-center text-center group ${className}`}>
      <div
        className={`relative rounded-full overflow-hidden shadow-lg border-4 ring-2 ring-white shrink-0 transition-transform duration-200 group-hover:scale-105 ${sizeClass}`}
        style={{
          borderColor: spec.borderColor,
          backgroundColor: spec.bgTint,
        }}
      >
        {!failed ? (
          <img
            src={CONFIRMED_EVENT.personajesFuenteUrl}
            alt={spec.alt}
            loading="lazy"
            referrerPolicy="no-referrer"
            onLoad={(e) => {
              const img = e.currentTarget;
              if (img.naturalWidth > 0 && img.naturalHeight > 0) {
                setRatio(img.naturalWidth / img.naturalHeight);
              }
            }}
            onError={() => setFailed(true)}
            style={{
              position: 'absolute',
              height: `${imgHeightPct}%`,
              width: `${imgWidthPct}%`,
              maxWidth: 'none',
              left: `${clampedLeft}%`,
              top: `${clampedTop}%`,
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-2 text-xs font-semibold text-[#5C4332]">
            {spec.name}
          </div>
        )}
      </div>
      {showLabel && (
        <figcaption className="mt-2 text-xs sm:text-sm font-extrabold text-[#2C1E14] leading-tight">
          {spec.name}
        </figcaption>
      )}
    </figure>
  );
};

interface AuthorizedCharacterSlotProps {
  title: string;
  imageUrl: string | null;
  onConfigure?: () => void;
}

export const AuthorizedCharacterSlot: React.FC<AuthorizedCharacterSlotProps> = ({
  title,
  imageUrl,
  onConfigure,
}) => {
  return (
    <figure className="flex flex-col items-center text-center">
      <button
        type="button"
        onClick={onConfigure}
        className="group relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-[3px] border-dashed border-[#4E9A23]/70 bg-[#F2F9EC] hover:border-[#F47B1E] hover:bg-[#FFF7ED] transition-colors flex flex-col items-center justify-center p-2 shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F47B1E] focus-visible:ring-offset-2"
        aria-label={
          imageUrl
            ? `Imagen autorizada de ${title}`
            : `Espacio reservado para imagen autorizada de ${title}. Toca para personalizar.`
        }
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`${title} — imagen autorizada de La Granja de Zenón`}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <>
            <ImagePlus className="w-5 h-5 text-[#4E9A23] group-hover:text-[#F47B1E] transition-colors mb-1" />
            <span className="text-[10px] leading-tight font-bold text-[#4E9A23] group-hover:text-[#C2590B]">
              Imagen autorizada
            </span>
          </>
        )}
      </button>
      <figcaption className="mt-2 text-xs sm:text-sm font-extrabold text-[#2C1E14] leading-tight">
        {title}
      </figcaption>
    </figure>
  );
};
