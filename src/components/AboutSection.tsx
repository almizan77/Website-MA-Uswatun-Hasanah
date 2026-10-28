import React from 'react';
import { visionMissionData } from '../data/schoolData';

interface AboutSectionProps {
  onOpenDetailModal?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = () => {
  return (
    <section id="profil" className="py-space-3xl bg-background">
      <div className="max-w-container-max mx-auto px-gutter-desktop">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Teks Profil, Visi, Misi, dan Aksi */}
          <div className="space-y-6">
            <div className="text-center max-w-3xl mx-auto">
              <span className="bg-primary/10 text-primary font-label-md text-label-md px-3.5 py-1 rounded-full font-bold inline-block mb-3">
                TENTANG KAMI
              </span>
              <h2 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-background font-extrabold tracking-tight leading-tight">
                Madrasah Aliyah Berkarakter Islami &amp; Unggul dalam Prestasi
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-4 leading-relaxed">
                <strong>MA Uswatun Hasanah</strong> adalah lembaga pendidikan Islam jenjang menengah atas di bawah naungan <strong>Yayasan Darul Husna</strong> di Mangkang Wetan, Semarang yang mendidik generasi beriman, berakhlakul karimah, terampil, mandiri, berwawasan ekologi, serta cakap memanfaatkan teknologi.
              </p>
            </div>

            {/* Payung Yayasan Darul Husna */}
            <div className="bg-surface-container-low rounded-2xl p-4 sm:p-5 border border-outline-variant/60 flex items-center gap-4 max-w-2xl mx-auto">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[26px]">account_balance</span>
              </div>
              <div className="text-xs sm:text-sm">
                <span className="font-bold text-on-background block text-sm sm:text-base">
                  Yayasan Darul Husna Semarang
                </span>
                <span className="text-on-surface-variant">
                  Menaungi 4 jenjang lembaga pendidikan terpadu: Pondok Pesantren, RA, MTs, dan MA.
                </span>
              </div>
            </div>

            {/* Visi Card */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/60 shadow-xs">
              <div className="flex items-center gap-2.5 text-primary font-bold mb-2">
                <span className="material-symbols-outlined text-[24px]">visibility</span>
                <span className="font-headline-sm text-headline-sm text-base sm:text-lg">Visi Madrasah</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface leading-relaxed font-medium italic">
                "{visionMissionData.vision}"
              </p>
            </div>

            {/* Misi Card */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/60 shadow-xs">
              <div className="flex items-center gap-2.5 text-secondary font-bold mb-4">
                <span className="material-symbols-outlined text-[24px]">flag</span>
                <span className="font-headline-sm text-headline-sm text-base sm:text-lg">Misi Madrasah</span>
              </div>
              <ol className="space-y-3 font-body-md text-body-md text-on-surface-variant">
                {visionMissionData.missions.map((misi, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-primary/20">
                      {idx + 1}
                    </span>
                    <span className="text-on-surface leading-relaxed">{misi}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

