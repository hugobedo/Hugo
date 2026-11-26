import React from 'react';

interface BuntingBannerProps {
  className?: string;
}

const FLAG_COLORS = [
  '#F47B1E', // Naranja La Granja
  '#59A927', // Verde pradera
  '#0288D1', // Azul cielo
  '#F6C33E', // Amarillo sol
  '#D93829', // Rojo pañuelo de Zenón
  '#EC4899', // Rosa sombrero cerdita
];

export const BuntingBanner: React.FC<BuntingBannerProps> = ({ className = '' }) => {
  const flags = Array.from({ length: 14 }, (_, idx) => {
    const x1 = idx * 100;
    const x2 = x1 + 100;
    const xm = x1 + 50;
    // Slight natural curve along the cord
    const progress = (idx + 0.5) / 14;
    const sag = Math.sin(progress * Math.PI) * 18;
    const topY = 6 + sag;
    const tipY = topY + 56;
    const color = FLAG_COLORS[idx % FLAG_COLORS.length];

    return { x1, x2, xm, topY, tipY, color, idx };
  });

  return (
    <div className={`w-full overflow-hidden pointer-events-none select-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1400 92"
        preserveAspectRatio="none"
        className="w-full h-11 sm:h-14 md:h-16 block"
      >
        {/* Cord */}
        <path
          d="M 0 6 Q 700 42 1400 6"
          fill="none"
          stroke="#7C4A1D"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {flags.map(({ x1, x2, xm, topY, tipY, color, idx }) => (
          <g key={idx}>
            <polygon
              points={`${x1 + 8},${topY} ${x2 - 8},${topY} ${xm},${tipY}`}
              fill={color}
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <circle cx={xm} cy={topY + 18} r="4.5" fill="#FFFFFF" fillOpacity="0.45" />
          </g>
        ))}
      </svg>
    </div>
  );
};
