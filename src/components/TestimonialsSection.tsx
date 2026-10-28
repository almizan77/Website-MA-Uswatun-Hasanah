import React, { useState, useEffect } from 'react';
import { testimonialsData, TestimonialItem } from '../data/schoolData';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filterRole, setFilterRole] = useState<string>('Semua');

  const filteredTestimonials = testimonialsData.filter((item) => {
    if (filterRole === 'Semua') return true;
    return item.status === filterRole;
  });

  // Autoplay carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [filteredTestimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? filteredTestimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
  };

  const currentItem = filteredTestimonials[currentIndex] || testimonialsData[0];

  return (
    <section className="py-space-3xl bg-background overflow-hidden">
      <div className="max-w-container-max mx-auto px-gutter-desktop">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="bg-primary/10 text-primary font-label-md text-label-md px-3.5 py-1 rounded-full font-bold inline-block mb-3">
            SUARA KELUARGA BESAR
          </span>
          <h2 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-background font-extrabold tracking-tight">
            Apa Kata Mereka?
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-3">
            Pengalaman nyata alumni, siswa dan siswi aktif, dan para orang tua yang telah merasakan ikhtiar pendidikan di MA Uswatun Hasanah.
          </p>

          {/* Filter Pills */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {['Semua', 'Orang Tua', 'Alumni', 'Siswa'].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => {
                  setFilterRole(status);
                  setCurrentIndex(0);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                  filterRole === status
                    ? 'bg-primary text-on-primary font-bold shadow-xs'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Testimonial Spotlight Card */}
        <div className="max-w-3xl mx-auto bg-surface-container-lowest rounded-3xl border border-outline-variant/70 p-8 sm:p-12 shadow-xl relative">
          <div className="absolute top-6 right-8 text-primary/15 pointer-events-none">
            <span className="material-symbols-outlined text-[80px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              format_quote
            </span>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-secondary text-white font-extrabold text-xl flex items-center justify-center shrink-0 shadow-md">
              {currentItem.avatarText}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-secondary-fixed text-on-secondary-fixed font-bold text-xs px-2.5 py-0.5 rounded">
                  {currentItem.status}
                </span>
                {currentItem.achievementBadge && (
                  <span className="bg-surface-container-low text-primary text-xs font-bold px-2 py-0.5 rounded border border-outline-variant/30">
                    {currentItem.achievementBadge}
                  </span>
                )}
              </div>
              <h3 className="font-headline-md text-xl font-bold text-on-background">
                {currentItem.name}
              </h3>
              <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant">
                {currentItem.role}
              </p>
            </div>
          </div>

          {/* Star Rating */}
          <div className="flex items-center gap-1 text-secondary mb-4">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
            ))}
          </div>

          {/* Testimonial Quote */}
          <blockquote className="font-body-lg text-base sm:text-lg text-on-surface leading-relaxed italic mb-8">
            "{currentItem.quote}"
          </blockquote>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-outline-variant/40">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {filteredTestimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? 'w-8 bg-primary' : 'w-2.5 bg-outline-variant hover:bg-outline'
                  }`}
                  aria-label={`Lihat testimoni ke-${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="w-10 h-10 rounded-xl border border-outline-variant flex items-center justify-center text-on-surface hover:bg-surface-container transition cursor-pointer"
                aria-label="Sebelumnya"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="w-10 h-10 rounded-xl border border-outline-variant flex items-center justify-center text-on-surface hover:bg-surface-container transition cursor-pointer"
                aria-label="Selanjutnya"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
