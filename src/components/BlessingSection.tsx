import React from 'react';
import { Heart } from 'lucide-react';
import { BIBLE_VERSE, PARENTS_MESSAGE } from '../config/invitationConfig';

export const BlessingSection: React.FC = () => {
  return (
    <section
      id="bendicion"
      aria-labelledby="titulo-versiculo"
      className="py-10 sm:py-14 px-4"
    >
      <div className="max-w-4xl mx-auto bg-[#FFFDF7] rounded-3xl shadow-md border border-[#F1E4C8] p-7 sm:p-10 md:p-12 text-center">
        {/* Delicate Bible Verse */}
        <div className="max-w-2xl mx-auto">
          <div className="w-11 h-11 rounded-full bg-[#FFF1E0] text-[#D95B00] mx-auto flex items-center justify-center">
            <Heart className="w-5 h-5" aria-hidden="true" />
          </div>

          <h2
            id="titulo-versiculo"
            className="mt-4 text-sm sm:text-base font-extrabold text-[#9A4A06] tracking-wide"
          >
            {BIBLE_VERSE.reference}
          </h2>

          <blockquote className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-[#2C1E14] leading-snug text-balance">
            {BIBLE_VERSE.text}
          </blockquote>
        </div>

        {/* Hairline Divider */}
        <div
          aria-hidden="true"
          className="my-8 max-w-xs mx-auto h-px bg-gradient-to-r from-transparent via-[#E5C992] to-transparent"
        />

        {/* Parents' Complete Unmodified Message */}
        <div className="max-w-2xl mx-auto space-y-5 text-base sm:text-lg leading-relaxed font-semibold text-[#3E2C1E]">
          {PARENTS_MESSAGE.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
};
