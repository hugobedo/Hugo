import React, { useEffect, useMemo, useState } from 'react';
import { PartyPopper } from 'lucide-react';
import {
  CONFIRMED_EVENT,
  PLACEHOLDERS,
  isPlaceholderValue,
} from '../config/invitationConfig';

interface CountdownSectionProps {
  horaTexto: string;
  horaCuentaRegresiva: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function buildTargetDate(horaHHmm: string): Date {
  const { year, month, day } = CONFIRMED_EVENT.fechaPartes;
  let hours = 0;
  let minutes = 0;

  if (/^\d{1,2}:\d{2}$/.test(horaHHmm.trim())) {
    const [hStr, mStr] = horaHHmm.trim().split(':');
    const parsedH = Number(hStr);
    const parsedM = Number(mStr);
    if (parsedH >= 0 && parsedH <= 23 && parsedM >= 0 && parsedM <= 59) {
      hours = parsedH;
      minutes = parsedM;
    }
  }

  return new Date(year, month - 1, day, hours, minutes, 0, 0);
}

function computeRemaining(target: Date): TimeRemaining {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, isPast: false };
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({
  horaTexto,
  horaCuentaRegresiva,
}) => {
  const targetDate = useMemo(
    () => buildTargetDate(horaCuentaRegresiva),
    [horaCuentaRegresiva]
  );

  const [remaining, setRemaining] = useState<TimeRemaining>(() =>
    computeRemaining(targetDate)
  );

  useEffect(() => {
    setRemaining(computeRemaining(targetDate));
    const interval = window.setInterval(() => {
      setRemaining(computeRemaining(targetDate));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [targetDate]);

  const units = [
    {
      label: 'Días',
      value: String(remaining.days).padStart(2, '0'),
      cardClass:
        'bg-gradient-to-b from-[#FF9234] to-[#E8660C] text-white shadow-[0_6px_0_#B44B00]',
      labelClass: 'text-[#FFF4E6]',
    },
    {
      label: 'Horas',
      value: String(remaining.hours).padStart(2, '0'),
      cardClass:
        'bg-gradient-to-b from-[#6CC431] to-[#4A961D] text-white shadow-[0_6px_0_#2F6910]',
      labelClass: 'text-[#ECF9E2]',
    },
    {
      label: 'Minutos',
      value: String(remaining.minutes).padStart(2, '0'),
      cardClass:
        'bg-gradient-to-b from-[#29A8E8] to-[#0284C7] text-white shadow-[0_6px_0_#035B8C]',
      labelClass: 'text-[#E0F4FF]',
    },
    {
      label: 'Segundos',
      value: String(remaining.seconds).padStart(2, '0'),
      cardClass:
        'bg-gradient-to-b from-[#F25042] to-[#D12E20] text-white shadow-[0_6px_0_#991B1B]',
      labelClass: 'text-[#FEE2E2]',
    },
  ];

  const hasCustomTime = !isPlaceholderValue(horaTexto, PLACEHOLDERS.HORA);

  return (
    <section
      id="cuenta-regresiva"
      aria-labelledby="titulo-cuenta-regresiva"
      className="py-10 sm:py-14 px-4"
    >
      <div className="max-w-4xl mx-auto bg-[#FFFDF7] rounded-[2rem] shadow-lg border-[3px] border-[#F6C33E] p-6 sm:p-8 md:p-10 text-center fiesta-dot-bg">
        <p className="text-sm sm:text-base font-extrabold text-[#4E9A23]">
          ¡Cada segundo nos acerca más a la fiesta!
        </p>
        <h2
          id="titulo-cuenta-regresiva"
          className="mt-1 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E3A14] text-balance"
        >
          Cuenta regresiva para el primer añito
        </h2>
        <p className="mt-2 text-sm sm:text-base font-bold text-[#5C4332]">
          {CONFIRMED_EVENT.fechaTexto}
          <span aria-hidden="true" className="mx-2 text-[#F47B1E]">
            ★
          </span>
          <span>{hasCustomTime ? horaTexto : PLACEHOLDERS.HORA}</span>
        </p>

        {remaining.isPast ? (
          <div className="mt-6 rounded-2xl bg-[#FFF5EB] border-2 border-[#F47B1E]/40 px-6 py-8 flex flex-col items-center">
            <PartyPopper className="w-11 h-11 text-[#F47B1E]" aria-hidden="true" />
            <p className="mt-3 font-display text-2xl sm:text-3xl font-bold text-[#1E3A14]">
              ¡Llegó el gran día de celebración!
            </p>
            <p className="mt-2 text-base font-bold text-[#5C4332] max-w-lg">
              ¡Feliz primer añito, Hugo Emilio! Que la alegría de La Granja de Zenón
              llene de sonrisas este día inolvidable.
            </p>
          </div>
        ) : (
          <div
            className="mt-7 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5"
            role="timer"
            aria-live="off"
          >
            {units.map((unit) => (
              <div
                key={unit.label}
                className={`rounded-2xl px-3 py-5 sm:py-6 flex flex-col items-center justify-center border-2 border-white/40 ${unit.cardClass}`}
              >
                <span className="font-display text-4xl sm:text-5xl font-bold tabular-nums leading-none drop-shadow-xs">
                  {unit.value}
                </span>
                <span
                  className={`mt-2 text-xs sm:text-sm font-extrabold tracking-wide ${unit.labelClass}`}
                >
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
