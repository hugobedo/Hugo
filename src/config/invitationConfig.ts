export interface MusicTrack {
  id: string;
  videoId: string;
  url: string;
  label: string;
  subtitle: string;
}

export interface PhotoSlot {
  id: string;
  title: string;
  caption: string;
  imageUrl: string | null;
}

export interface EditableInvitationData {
  /** Hora legible de la fiesta, ej. "3:00 p. m." */
  horaTexto: string;
  /** Hora en formato 24h (HH:mm) usada para la cuenta regresiva; vacío usa 00:00 */
  horaCuentaRegresiva: string;
  /** Nombre del salón, casa o parque */
  lugar: string;
  /** Dirección completa del evento */
  direccion: string;
  /** URL completa de Google Maps */
  enlaceMaps: string;
  /** Número de WhatsApp con código de país, ej. "+573001234567" */
  whatsappNumero: string;
  /** Fotos reales de Hugo Emilio (null = muestra espacio reemplazable) */
  fotos: PhotoSlot[];
  /** Imagen opcional autorizada adicional (ej. La Gallina Turuleca) */
  imagenGallinaAutorizada: string | null;
}

export const PLACEHOLDERS = {
  HORA: '[AGREGAR HORA]',
  LUGAR: '[AGREGAR NOMBRE DEL LUGAR]',
  DIRECCION: '[AGREGAR DIRECCIÓN]',
  MAPS: '[AGREGAR ENLACE]',
  WHATSAPP: '[AGREGAR NÚMERO CON CÓDIGO DE PAÍS]',
} as const;

export const CONFIRMED_EVENT = {
  nombreCumpleanero: 'HUGO EMILIO',
  edadTexto: '¡Cumple 1 año!',
  fechaTexto: '28 de enero de 2027',
  /** Año, mes (1-12), día */
  fechaPartes: {
    year: 2027,
    month: 1,
    day: 28,
  },
  referenciaImagenUrl: '/src/assets/images/zenon_fiesta_portada_1795652110031.jpg',
  cierreImagenUrl: '/src/assets/images/zenon_fiesta_cierre_1795652110285.jpg',
  personajesFuenteUrl: '/assets/aistudio/zenon_2a5f8b0b.jpg',
  referenciaImagenAlt:
    'Zenón junto a los animales de La Granja de Zenón: el caballo Percherón, el gallo Bartolito, el lorito Pepe, la cerdita y la vaca Lola celebrando con globos, banderines, confeti y un granero rojo en el campo soleado.',
  cierreImagenAlt:
    'Zenón y los animales de La Granja de Zenón celebrando entre globos de colores, confeti, serpentinas y flores en la pradera soleada.',
} as const;

export const MUSIC_TRACKS: MusicTrack[] = [
  {
    id: 'track-1',
    videoId: '4nKcnfw9ggc',
    url: 'https://youtu.be/4nKcnfw9ggc?list=RD4nKcnfw9ggc',
    label: 'Canción 1',
    subtitle: 'Música de La Granja (Opción 1)',
  },
  {
    id: 'track-2',
    videoId: 'KFJl6ofQ8XQ',
    url: 'https://youtu.be/KFJl6ofQ8XQ?list=RDKFJl6ofQ8XQ',
    label: 'Canción 2',
    subtitle: 'Música de La Granja (Opción 2)',
  },
];

export const BIBLE_VERSE = {
  reference: '1 Samuel 1:27 (Reina-Valera 1960)',
  text: '«Por este niño oraba, y Jehová me dio lo que le pedí».',
} as const;

export const PARENTS_MESSAGE = [
  'Nuestro hijo es una bendición que Dios puso en nuestras vidas, un regalo de amor que llegó para llenar nuestro hogar de alegría. Hoy agradecemos a Dios por su vida y le pedimos que guíe cada uno de sus pasos, lo proteja siempre y le permita crecer con salud, amor y sabiduría.',
  'Porque un hijo no solo nace en una familia, también nace en el corazón de Dios como una de sus más hermosas bendiciones. 🙏❤️',
] as const;

export const DEFAULT_EDITABLE_DATA: EditableInvitationData = {
  horaTexto: PLACEHOLDERS.HORA,
  horaCuentaRegresiva: '',
  lugar: PLACEHOLDERS.LUGAR,
  direccion: PLACEHOLDERS.DIRECCION,
  enlaceMaps: PLACEHOLDERS.MAPS,
  whatsappNumero: PLACEHOLDERS.WHATSAPP,
  imagenGallinaAutorizada: null,
  fotos: [
    {
      id: 'foto-1',
      title: 'Foto 1 de Hugo Emilio',
      caption: 'Espacio de muestra reemplazable — Primeros meses',
      imageUrl: null,
    },
    {
      id: 'foto-2',
      title: 'Foto 2 de Hugo Emilio',
      caption: 'Espacio de muestra reemplazable — Su sonrisa favorita',
      imageUrl: null,
    },
    {
      id: 'foto-3',
      title: 'Foto 3 de Hugo Emilio',
      caption: 'Espacio de muestra reemplazable — Jugando en casa',
      imageUrl: null,
    },
    {
      id: 'foto-4',
      title: 'Foto 4 de Hugo Emilio',
      caption: 'Espacio de muestra reemplazable — En familia',
      imageUrl: null,
    },
    {
      id: 'foto-5',
      title: 'Foto 5 de Hugo Emilio',
      caption: 'Espacio de muestra reemplazable — Descubriendo el mundo',
      imageUrl: null,
    },
    {
      id: 'foto-6',
      title: 'Foto 6 de Hugo Emilio',
      caption: 'Espacio de muestra reemplazable — Listo para su primer añito',
      imageUrl: null,
    },
  ],
};

export interface ReferenceCharacter {
  id: 'zenon' | 'vaca' | 'caballo' | 'gallo' | 'cerdito' | 'loro';
  name: string;
  alt: string;
  /** CSS object-position and scale to frame the character faithfully from the official reference artwork */
  objectPosition: string;
  scale: number;
  ringColor: string;
}

export const REFERENCE_CHARACTERS: ReferenceCharacter[] = [
  {
    id: 'zenon',
    name: 'Zenón',
    alt: 'Zenón, personaje de La Granja de Zenón, tomado de la imagen oficial de referencia',
    objectPosition: '62% 28%',
    scale: 2.35,
    ringColor: '#F47B1E',
  },
  {
    id: 'vaca',
    name: 'La Vaca Lola',
    alt: 'La vaca de La Granja de Zenón, tomada de la imagen oficial de referencia',
    objectPosition: '86% 36%',
    scale: 2.2,
    ringColor: '#0288D1',
  },
  {
    id: 'caballo',
    name: 'El Caballo Percherón',
    alt: 'El caballo de La Granja de Zenón, tomado de la imagen oficial de referencia',
    objectPosition: '39% 28%',
    scale: 2.35,
    ringColor: '#D97706',
  },
  {
    id: 'gallo',
    name: 'El Gallo Bartolito',
    alt: 'El gallo de La Granja de Zenón, tomado de la imagen oficial de referencia',
    objectPosition: '50% 62%',
    scale: 2.3,
    ringColor: '#D93829',
  },
  {
    id: 'cerdito',
    name: 'La Cerdita',
    alt: 'La cerdita de La Granja de Zenón, tomada de la imagen oficial de referencia',
    objectPosition: '73% 70%',
    scale: 2.35,
    ringColor: '#DB2777',
  },
  {
    id: 'loro',
    name: 'El Lorito Pepe',
    alt: 'El loro de La Granja de Zenón, tomado de la imagen oficial de referencia',
    objectPosition: '26% 88%',
    scale: 2.7,
    ringColor: '#4E9A23',
  },
];

/** Helpers to detect whether editable placeholders have been replaced with real values */
export function isValidMapsLink(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed || trimmed === PLACEHOLDERS.MAPS) return false;
  return /^https?:\/\/.+/i.test(trimmed);
}

export function sanitizeWhatsAppNumber(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed || trimmed === PLACEHOLDERS.WHATSAPP) return null;
  const digits = trimmed.replace(/[^\d]/g, '');
  return digits.length >= 8 ? digits : null;
}

export function isPlaceholderValue(value: string, placeholder: string): boolean {
  const trimmed = value.trim();
  return !trimmed || trimmed === placeholder;
}
