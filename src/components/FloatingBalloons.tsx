import React from 'react';

interface BalloonConfig {
  id: string;
  color: string;
  highlight: string;
  positionClass: string;
  sizeClass: string;
  animClass: string;
  delay: string;
}

const COVER_BALLOONS: BalloonConfig[] = [
  {
    id: 'b-left-top',
    color: '#F47B1E',
    highlight: '#FDBA74',
    positionClass: 'top-14 left-2 sm:left-6 md:left-10',
    sizeClass: 'w-11 h-16 sm:w-14 sm:h-20',
    animClass: 'animate-balloon',
    delay: '0s',
  },
  {
    id: 'b-left-mid',
    color: '#59A927',
    highlight: '#A3E635',
    positionClass: 'top-36 -left-1 sm:left-3 md:left-16 hidden sm:block',
    sizeClass: 'w-10 h-14 sm:w-12 sm:h-18',
    animClass: 'animate-balloon-slow',
    delay: '1.1s',
  },
  {
    id: 'b-right-top',
    color: '#D93829',
    highlight: '#FCA5A5',
    positionClass: 'top-16 right-2 sm:right-6 md:right-12',
    sizeClass: 'w-11 h-16 sm:w-14 sm:h-20',
    animClass: 'animate-balloon-slow',
    delay: '0.6s',
  },
  {
    id: 'b-right-mid',
    color: '#F6C33E',
    highlight: '#FEF08A',
    positionClass: 'top-40 right-1 sm:right-4 md:right-20 hidden sm:block',
    sizeClass: 'w-10 h-14 sm:w-12 sm:h-18',
    animClass: 'animate-balloon',
    delay: '1.7s',
  },
  {
    id: 'b-bottom-left',
    color: '#0288D1',
    highlight: '#7DD3FC',
    positionClass: 'bottom-20 left-3 sm:left-8 md:left-14',
    sizeClass: 'w-10 h-14 sm:w-13 sm:h-19',
    animClass: 'animate-balloon-slow',
    delay: '0.4s',
  },
  {
    id: 'b-bottom-right',
    color: '#EC4899',
    highlight: '#F9A8D4',
    positionClass: 'bottom-24 right-3 sm:right-8 md:right-14',
    sizeClass: 'w-10 h-14 sm:w-13 sm:h-19',
    animClass: 'animate-balloon',
    delay: '1.3s',
  },
];

const PAGE_BALLOONS: BalloonConfig[] = [
  {
    id: 'p-1',
    color: '#F47B1E',
    highlight: '#FDBA74',
    positionClass: 'top-24 left-2 lg:left-6',
    sizeClass: 'w-10 h-15 lg:w-12 lg:h-18',
    animClass: 'animate-balloon',
    delay: '0.2s',
  },
  {
    id: 'p-2',
    color: '#59A927',
    highlight: '#A3E635',
    positionClass: 'top-36 right-2 lg:right-6',
    sizeClass: 'w-10 h-15 lg:w-12 lg:h-18',
    animClass: 'animate-balloon-slow',
    delay: '0.9s',
  },
  {
    id: 'p-3',
    color: '#F6C33E',
    highlight: '#FEF08A',
    positionClass: 'top-[42%] left-2 lg:left-8 hidden md:block',
    sizeClass: 'w-11 h-16',
    animClass: 'animate-balloon-slow',
    delay: '1.5s',
  },
  {
    id: 'p-4',
    color: '#D93829',
    highlight: '#FCA5A5',
    positionClass: 'top-[58%] right-2 lg:right-8 hidden md:block',
    sizeClass: 'w-11 h-16',
    animClass: 'animate-balloon',
    delay: '0.5s',
  },
];

interface FloatingBalloonsProps {
  variant?: 'cover' | 'page';
}

export const FloatingBalloons: React.FC<FloatingBalloonsProps> = ({ variant = 'cover' }) => {
  const items = variant === 'cover' ? COVER_BALLOONS : PAGE_BALLOONS;

  return (
    <div
      className="pointer-events-none select-none absolute inset-0 overflow-hidden z-0"
      aria-hidden="true"
    >
      {items.map((balloon) => (
        <div
          key={balloon.id}
          className={`absolute ${balloon.positionClass} ${balloon.sizeClass} ${balloon.animClass} opacity-85`}
          style={{ animationDelay: balloon.delay }}
        >
          <svg viewBox="0 0 64 96" className="w-full h-full drop-shadow-sm">
            {/* String */}
            <path
              d="M32 62 Q27 72 34 81 T30 95"
              fill="none"
              stroke="#94A3B8"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
            {/* Balloon knot */}
            <polygon points="29,61 35,61 32,57" fill={balloon.color} />
            {/* Balloon body */}
            <ellipse cx="32" cy="31" rx="23" ry="28" fill={balloon.color} />
            {/* Subtle highlight */}
            <ellipse
              cx="23"
              cy="22"
              rx="6"
              ry="11"
              transform="rotate(-18 23 22)"
              fill={balloon.highlight}
              fillOpacity="0.55"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
