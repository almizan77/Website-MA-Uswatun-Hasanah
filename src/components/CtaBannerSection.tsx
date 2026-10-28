import React from 'react';

interface CtaBannerSectionProps {
  onOpenSpmbRegister: () => void;
}

export const CtaBannerSection: React.FC<CtaBannerSectionProps> = ({
  onOpenSpmbRegister,
}) => {
  return (
    <section className="py-space-3xl bg-background relative overflow-hidden">
      <div className="max-w-container-max mx-auto px-gutter-desktop">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary via-primary-container to-on-background text-on-primary p-8 sm:p-12 lg:p-16 shadow-2xl text-center">
          {/* Real Campus Building Visual Overlay */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src="/images/hero-building.jpg"
              alt="Kampus MA Uswatun Hasanah Semarang"
              className="w-full h-full object-cover opacity-25 scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d3b1e]/95 via-primary/90 to-[#022312]/95"></div>
          </div>
          {/* Subtle Islamic Motif & Gradient Background Glow */}
          <div className="absolute inset-0 opacity-10 pattern-grid-subtle"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary/25 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/40 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md px-4 py-1 rounded-full text-xs sm:text-sm font-semibold text-white">
              <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-ping"></span>
              <span>Penerimaan Murid Baru (SPMB) Gelombang 1</span>
            </div>

            <h2 className="font-headline-xl-mobile md:font-headline-xl text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-sm">
              Masa Depanmu Dimulai dari Sini.
            </h2>

            <p className="font-body-lg text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              Mari tumbuh bersama MA Uswatun Hasanah dan menjadi generasi yang berilmu, berakhlak, berprestasi, dan siap menghadapi masa depan.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={onOpenSpmbRegister}
                className="w-full sm:w-auto px-10 py-4.5 rounded-2xl bg-white hover:bg-surface-container-lowest text-primary font-extrabold text-base sm:text-lg shadow-2xl transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-1"
              >
                <span className="material-symbols-outlined text-[24px]">how_to_reg</span>
                <span>DAFTAR SEKARANG</span>
              </button>
              <a
                href="#kontak"
                className="w-full sm:w-auto px-8 py-4.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-base backdrop-blur-md border border-white/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[22px]">contact_support</span>
                <span>Hubungi Panitia SPMB</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
