import React, { useState, useRef } from 'react';
import { whyChooseUs, schoolInfo } from '../data/schoolData';

interface WhyChooseUsSectionProps {
  onOpenSpmbRegister: () => void;
}

const DEFAULT_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuD6DbHgeGKz8zTjaju9EBo8ad7u9USuMwRIVdxIHYiatnfPx34V6rg2hOiWOokjXpqxaWKvEXAKAGgfleMikv3aDbgiCjBW9sWqv97Vjr9d0Bszq_M6fOA_wQRyAgbBetVEe7q-nhIyviXkge4J6r7VsPevHNcdCxstYMFZSurmex4C0I5EjzDKOlCj-fYmXtCMsGkdORTubTi-y5Cs043srpE7q9xXC_aH3yZRmCG-2z7ARN5_C4ZD";
const STORAGE_KEY = 'why_choose_us_showcase_image';

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ onOpenSpmbRegister }) => {
  const [currentImage, setCurrentImage] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_IMAGE;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const presetImages = [
    { label: 'Gedung Madrasah', src: '/images/hero-building.jpg' },
    { label: 'Santri Apel', src: '/images/santri-apel.jpg' },
    { label: 'Aswaja Apel', src: '/images/aswaja-apel.jpg' },
    { label: 'Default Banner', src: DEFAULT_IMAGE },
  ];

  const handleApplyImage = (url: string) => {
    if (!url.trim()) return;
    setCurrentImage(url);
    localStorage.setItem(STORAGE_KEY, url);
    setIsModalOpen(false);
    setInputUrl('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const resultStr = event.target.result as string;
          handleApplyImage(resultStr);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setCurrentImage(DEFAULT_IMAGE);
    localStorage.removeItem(STORAGE_KEY);
    setIsModalOpen(false);
  };

  return (
    <section className="py-space-3xl bg-background">
      <div className="max-w-container-max mx-auto px-gutter-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Heading & Key Advantages */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md px-3.5 py-1 rounded-full font-bold inline-block mb-3">
                NILAI PLUS MADRASAH
              </span>
              <h2 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-background font-extrabold tracking-tight">
                Kenapa Memilih MA Uswatun Hasanah?
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-3">
                Kami menyajikan ekosistem pendidikan komprehensif yang menyeimbangkan kecerdasan spiritual, sains terapan, dan kemandirian karakter.
              </p>
            </div>

            {/* List of Key Items */}
            <div className="space-y-3.5">
              {whyChooseUs.map((item) => (
                <div
                  key={item.id}
                  className="bg-surface-container-lowest p-4 sm:p-5 rounded-xl border border-outline-variant/60 shadow-xs hover:border-primary/50 transition-all duration-200 flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                    <span className="material-symbols-outlined text-[22px]">
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-headline-sm font-bold text-on-background flex items-center gap-2">
                      <span>{item.title}</span>
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Feature Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/70 p-6 sm:p-8 shadow-xl relative overflow-hidden">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-56 h-56 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="relative z-10 space-y-6">
                {/* Image Container with Ganti Foto Overlay Button */}
                <div className="rounded-2xl overflow-hidden h-64 border border-outline-variant/50 shadow-inner group relative">
                  <img
                    src={currentImage}
                    alt="Kompleks Kampus Islami Modern MA Uswatun Hasanah"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Tombol Ganti Foto */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="px-4 py-2.5 bg-surface-container-lowest text-primary hover:bg-primary hover:text-on-primary rounded-xl font-medium text-sm shadow-lg flex items-center gap-2 transition-all transform scale-95 group-hover:scale-100 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                      <span>Ganti Foto</span>
                    </button>
                  </div>

                  {/* Badge tombol kecil di pojok kanan atas agar selalu terlihat di mobile/desktop */}
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="absolute top-3 right-3 bg-surface-container-lowest/90 hover:bg-surface-container-lowest text-on-surface hover:text-primary px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md flex items-center gap-1.5 transition-colors border border-outline-variant/60 cursor-pointer backdrop-blur-xs"
                    title="Ganti Foto"
                  >
                    <span className="material-symbols-outlined text-[16px] text-primary">edit</span>
                    <span>Ganti Foto</span>
                  </button>
                </div>

                <div className="border-b border-outline-variant/40 pb-4">
                  <span className="bg-primary/10 text-primary font-label-sm text-label-sm font-bold px-2.5 py-0.5 rounded">
                    PENDIDIKAN ISLAMI BERMUTU
                  </span>
                  <h3 className="font-headline-md text-headline-md font-bold text-on-background mt-2">
                    Standar Mutu Pendidikan Nasional
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                    Menjamin standar mutu sarana pembelajaran, tata kelola madrasah, dan kurikulum bermutu tinggi untuk melahirkan insan yang beriman, berilmu, dan beramal sholeh.
                  </p>
                </div>

                <div className="p-4 bg-primary/5 rounded-xl border border-primary/20 flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-[24px]">verified</span>
                  <div className="font-body-sm text-body-sm text-on-surface">
                    <strong>Legalitas Resmi:</strong> SK Kemenag B-1422/Kw.10.2/PP.00.5/2021 &amp; NPSN 20109876
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Popup Ganti Foto */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full border border-outline-variant shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">image</span>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-background">
                  Ganti Foto Showcase
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-on-surface-variant hover:text-on-background p-1 rounded-lg hover:bg-surface-container transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Opsi 1: Upload File dari Komputer/HP */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                Opsi 1: Unggah Foto Dari Komputer / HP
              </label>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 px-4 border-2 border-dashed border-primary/40 hover:border-primary bg-primary/5 hover:bg-primary/10 rounded-xl text-primary font-medium text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[22px]">upload_file</span>
                <span>Pilih Foto dari Galeri / Dokumen</span>
              </button>
            </div>

            {/* Opsi 2: Masukkan URL Gambar */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                Opsi 2: Tempel Link / URL Foto
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/foto-madrasah.jpg"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-on-surface text-sm focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => handleApplyImage(inputUrl)}
                  disabled={!inputUrl.trim()}
                  className="px-4 py-2.5 bg-primary text-on-primary rounded-xl font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors shrink-0 cursor-pointer"
                >
                  Terapkan
                </button>
              </div>
            </div>

            {/* Opsi 3: Pilih dari Pilihan yang Tersedia */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                Opsi 3: Pilih Koleksi Foto Madrasah
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {presetImages.map((preset, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleApplyImage(preset.src)}
                    className="flex items-center gap-2.5 p-2 rounded-xl border border-outline-variant/80 hover:border-primary hover:bg-primary/5 transition-all text-left cursor-pointer group"
                  >
                    <img
                      src={preset.src}
                      alt={preset.label}
                      className="w-10 h-10 rounded-lg object-cover border border-outline-variant shrink-0"
                    />
                    <span className="text-xs font-semibold text-on-surface group-hover:text-primary truncate">
                      {preset.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-outline-variant">
              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-error hover:underline flex items-center gap-1 cursor-pointer font-medium"
              >
                <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                Reset ke Default
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-surface-container text-on-surface hover:bg-surface-container-high rounded-xl text-sm font-medium transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

