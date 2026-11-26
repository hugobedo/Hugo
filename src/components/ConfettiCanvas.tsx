import React, { useEffect, useRef } from 'react';

interface ConfettiCanvasProps {
  /** Increment this number to launch a fresh celebratory confetti burst */
  burstKey: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  shape: 'rect' | 'circle' | 'star' | 'ribbon';
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
}

const CONFETTI_COLORS = [
  '#F47B1E', // Naranja Zenón
  '#59A927', // Verde pradera
  '#0288D1', // Azul cielo
  '#F6C33E', // Amarillo sol
  '#D93829', // Rojo granero
  '#EC4899', // Rosa fiesta
  '#8B5CF6', // Morado alegre
];

function drawStar(ctx: CanvasRenderingContext2D, r: number) {
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const outerAngle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
    const innerAngle = outerAngle + Math.PI / 5;
    const ox = Math.cos(outerAngle) * r;
    const oy = Math.sin(outerAngle) * r;
    const ix = Math.cos(innerAngle) * (r * 0.45);
    const iy = Math.sin(innerAngle) * (r * 0.45);
    if (i === 0) ctx.moveTo(ox, oy);
    else ctx.lineTo(ox, oy);
    ctx.lineTo(ix, iy);
  }
  ctx.closePath();
  ctx.fill();
}

export const ConfettiCanvas: React.FC<ConfettiCanvasProps> = ({ burstKey }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (burstKey <= 0) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const width = window.innerWidth;
    const height = window.innerHeight;
    const count = width < 640 ? 95 : 155;
    const shapes: Particle['shape'][] = ['rect', 'circle', 'star', 'ribbon'];

    const particles: Particle[] = Array.from({ length: count }, (_, i) => {
      const cannon = i % 3;
      const originX =
        cannon === 0 ? width * 0.14 : cannon === 1 ? width * 0.86 : width * 0.5;
      const originY =
        cannon === 2 ? height * 0.12 : height * (0.28 + Math.random() * 0.18);
      const horizontalBias = cannon === 0 ? 4.2 : cannon === 1 ? -4.2 : 0;

      return {
        x: originX + (Math.random() - 0.5) * 60,
        y: originY,
        vx: (Math.random() - 0.5) * 11 + horizontalBias,
        vy: -7 - Math.random() * 9.5,
        size: 7 + Math.random() * 7,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.24,
        color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
        shape: shapes[i % shapes.length],
        opacity: 1,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.08 + Math.random() * 0.08,
      };
    });

    let animationFrameId = 0;
    const startTime = performance.now();
    const maxDuration = 3900;

    const render = (now: number) => {
      const elapsed = now - startTime;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      let alive = 0;
      for (const p of particles) {
        p.wobble += p.wobbleSpeed;
        p.x += p.vx + Math.sin(p.wobble) * 0.9;
        p.y += p.vy;
        p.vy += 0.22;
        p.vx *= 0.988;
        p.rotation += p.rotationSpeed;

        if (elapsed > maxDuration * 0.62) {
          p.opacity = Math.max(0, p.opacity - 0.022);
        }

        if (p.opacity > 0.02 && p.y < window.innerHeight + 40) {
          alive++;
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = p.color;

          if (p.shape === 'circle') {
            ctx.beginPath();
            ctx.arc(0, 0, p.size * 0.45, 0, Math.PI * 2);
            ctx.fill();
          } else if (p.shape === 'star') {
            drawStar(ctx, p.size * 0.56);
          } else if (p.shape === 'ribbon') {
            ctx.fillRect(-p.size * 0.8, -p.size * 0.22, p.size * 1.6, p.size * 0.44);
          } else {
            ctx.fillRect(-p.size / 2, -p.size * 0.34, p.size, p.size * 0.68);
          }
          ctx.restore();
        }
      }

      if (alive > 0 && elapsed < maxDuration + 900) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      }
    };

    animationFrameId = requestAnimationFrame(render);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };
  }, [burstKey]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-50"
      aria-hidden="true"
    />
  );
};
