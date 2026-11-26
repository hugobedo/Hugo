import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Navigation, Home, Settings2 } from 'lucide-react';
import {
  CONFIRMED_EVENT,
  EditableInvitationData,
  PLACEHOLDERS,
  isPlaceholderValue,
  isValidMapsLink,
} from '../config/invitationConfig';
import { CharacterMedallion } from './CharacterMedallion';

interface DetailsSectionProps {
  data: EditableInvitationData;
  onOpenCustomize: () => void;
}

export const DetailsSection: React.FC<DetailsSectionProps> = ({
  data,
  onOpenCustomize,
}) => {
  const [mapsNotice, setMapsNotice] = useState(false);

  const mapsReady = isValidMapsLink(data.enlaceMaps);

  const detailItems = [
    {
      id: 'fecha',
      label: 'Fecha',
      value: CONFIRMED_EVENT.fechaTexto,
      pending: false,
      icon: Calendar,
      cardBorder: 'border-[#F47B1E]/35 bg-[#FFF9F2]',
      iconBg: 'bg-[#F47B1E] text-white',
    },
    {
      id: 'hora',
      label: 'Hora',
      value: data.horaTexto.trim() || PLACEHOLDERS.HORA,
      pending: isPlaceholderValue(data.horaTexto, PLACEHOLDERS.HORA),
      icon: Clock,
      cardBorder: 'border-[#59A927]/35 bg-[#F5FBF0]',
      iconBg: 'bg-[#59A927] text-white',
    },
    {
      id: 'lugar',
      label: 'Lugar',
      value: data.lugar.trim() || PLACEHOLDERS.LUGAR,
      pending: isPlaceholderValue(data.lugar, PLACEHOLDERS.LUGAR),
      icon: Home,
      cardBorder: 'border-[#0288D1]/35 bg-[#F0F9FF]',
      iconBg: 'bg-[#0288D1] text-white',
    },
    {
      id: 'direccion',
      label: 'Dirección',
      value: data.direccion.trim() || PLACEHOLDERS.DIRECCION,
      pending: isPlaceholderValue(data.direccion, PLACEHOLDERS.DIRECCION),
      icon: MapPin,
      cardBorder: 'border-[#D93829]/30 bg-[#FFF5F5]',
      iconBg: 'bg-[#D93829] text-white',
    },
  ];

  const handleMapsClick = () => {
    if (!mapsReady) {
      setMapsNotice(true);
    }
  };

  return (
    <section
      id="detalles"
      aria-labelledby="titulo-detalles"
      className="py-10 sm:py-14 px-4"
    >
      <div className="max-w-5xl mx-auto bg-white rounded-[2rem] shadow-lg border-[3px] border-[#59A927]/45 overflow-hidden">
        {/* Vibrant Fiesta Header Band with La Granja de Zenón Characters */}
        <div className="bg-gradient-to-r from-[#DCF3FF] via-[#FFF9E6] to-[#E6F7D8] px-6 py-7 sm:px-10 border-b-2 border-[#E2E8F0]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm sm:text-base font-extrabold text-[#0369A1]">
                ¡Prepárate para un día inolvidable en la granja!
              </p>
              <h2
                id="titulo-detalles"
                className="mt-1 font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#1E3A14] text-balance"
              >
                Detalles de la fiesta
              </h2>
              <p className="mt-1.5 text-sm sm:text-base font-semibold text-[#4A3525] max-w-xl">
                Zenón, La Vaca Lola, Percherón y Bartolito te esperan con globos, música
                y muchísima alegría para celebrar el primer añito de Hugo Emilio.
              </p>
            </div>

            <div className="flex items-center justify-start md:justify-end gap-2.5 sm:gap-3 shrink-0">
              <CharacterMedallion character="zenon" size="sm" showLabel={false} />
              <CharacterMedallion character="vaca" size="sm" showLabel={false} />
              <CharacterMedallion character="caballo" size="sm" showLabel={false} />
              <CharacterMedallion character="gallo" size="sm" showLabel={false} />
            </div>
          </div>
        </div>

        {/* Colorful Details Grid */}
        <div className="p-6 sm:p-8 md:p-10 fiesta-dot-bg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {detailItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className={`flex items-start gap-4 p-4 sm:p-5 rounded-2xl border-2 shadow-xs ${item.cardBorder}`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${item.iconBg}`}
                  >
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-extrabold text-[#5C4332]">
                      {item.label}
                    </p>
                    <p
                      className={`mt-0.5 text-base sm:text-lg font-extrabold break-words ${
                        item.pending ? 'text-[#B84D00]' : 'text-[#2C1E14]'
                      }`}
                    >
                      {item.value}
                    </p>
                    {item.pending && (
                      <p className="mt-1 text-xs font-semibold text-[#64748B]">
                        Dato pendiente por completar por la familia
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Bar: Cómo llegar */}
          <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t-2 border-dashed border-[#E2E8F0]">
            <div className="text-sm text-[#5C4332]">
              <span className="font-extrabold text-[#2C1E14]">Enlace de Google Maps: </span>
              <span className="break-all font-bold">
                {mapsReady ? 'Ubicación configurada lista para abrir' : PLACEHOLDERS.MAPS}
              </span>
            </div>

            {mapsReady ? (
              <a
                href={data.enlaceMaps.trim()}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[52px] px-7 py-3 rounded-2xl bg-gradient-to-b from-[#65BE2D] to-[#469119] hover:from-[#59A927] hover:to-[#3A7B14] text-white font-display text-lg font-bold shadow-[0_5px_0_#2D630D] transition-all inline-flex items-center justify-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#4E9A23]/40"
              >
                <Navigation className="w-5 h-5" aria-hidden="true" />
                <span>Cómo llegar</span>
              </a>
            ) : (
              <button
                type="button"
                onClick={handleMapsClick}
                className="min-h-[52px] px-7 py-3 rounded-2xl bg-gradient-to-b from-[#65BE2D] to-[#469119] hover:from-[#59A927] hover:to-[#3A7B14] text-white font-display text-lg font-bold shadow-[0_5px_0_#2D630D] transition-all inline-flex items-center justify-center gap-2.5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#4E9A23]/40"
              >
                <Navigation className="w-5 h-5" aria-hidden="true" />
                <span>Cómo llegar</span>
              </button>
            )}
          </div>

          {mapsNotice && !mapsReady && (
            <div
              role="status"
              className="mt-4 rounded-2xl bg-[#FFF5EB] border-2 border-[#F47B1E]/40 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm text-[#3E2C1E]"
            >
              <p className="font-semibold">
                El enlace de Google Maps todavía tiene el espacio editable{' '}
                <strong className="text-[#B84D00]">{PLACEHOLDERS.MAPS}</strong>. Agrega la
                ubicación real para activar el botón.
              </p>
              <button
                type="button"
                onClick={onOpenCustomize}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-[#F47B1E] hover:bg-[#DC660E] text-white font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Settings2 className="w-4 h-4" aria-hidden="true" />
                <span>Editar enlace ahora</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
