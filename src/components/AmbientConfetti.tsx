import React from 'react';

interface ConfettiPiece {
  id: number;
  left: string;
  color: string;
  size: string;
  duration: string;
  delay: string;
  shape: 'rect' | 'circle' | 'star';
  reverse: boolean;
}

const COLORS = [
  '#F47B1E', // Naranja Zenón
  '#59A927', // Verde pradera
  '#0288D1', // Azul cielo
  '#F6C33E', // Amarillo sol
  '#D93829', // Rojo granero
  '#EC4899', // Rosa fiesta
];

const PIECES: ConfettiPiece[] = Array.from({ length: 26 }, (_, i) => {
  const leftPct = ((i * 3.9 + (i % 3) * 1.4) % 96) + 2;
  const shapes: Array<'rect' | 'circle' | 'star'> = ['rect', 'circle', 'star'];
  return {
    id: i,
    left: `${leftPct.toFixed(1)}%`,
    color: COLORS[i % COLORS.length],
    size: i % 3 === 0 ? 'w-3 h-3' : i % 3 === 1 ? 'w-2.5 h-4' : 'w-3.5 h-3.5',
    duration: `${8.5 + (i % 5) * 1.8}s`,
    delay: `${-((i * 0.75) % 10)}s`,
    shape: shapes[i % 3],
    reverse: i % 2 === 1,
  };
});

interface AmbientConfettiProps {
  /** 'fixed' spans the whole screen continuously; 'absolute' stays within the cover */
  mode?: 'fixed' | 'absolute';
}

export const AmbientConfetti: React.FC<AmbientConfettiProps> = ({
  mode = 'fixed',
}) => {
  return (
    <div
      aria-hidden="true"
      className={`${
        mode === 'fixed' ? 'fixed' : 'absolute'
      } inset-0 overflow-hidden pointer-events-none select-none z-20`}
    >
      {PIECES.map((piece) => (
        <span
          key={piece.id}
          className={`absolute top-0 ${
            piece.reverse
              ? 'animate-confetti-fall-reverse'
              : 'animate-confetti-fall'
          }`}
          style={{
            left: piece.left,
            animationDuration: piece.duration,
            animationDelay: piece.delay,
          }}
        >
          {piece.shape === 'star' ? (
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]"
              fill={piece.color}
            >
              <path d="M12 2l2.9 6.2 6.8.8-5 4.6 1.4 6.7L12 16.9 5.9 20.3l1.4-6.7-5-4.6 6.8-.8L12 2z" />
            </svg>
          ) : (
            <span
              className={`block ${piece.size} ${
                piece.shape === 'circle' ? 'rounded-full' : 'rounded-[3px]'
              } shadow-[0_1px_2px_rgba(0,0,0,0.08)]`}
              style={{ backgroundColor: piece.color }}
            />
          )}
        </span>
      ))}
    </div>
  );
};
