import React, { useState, useEffect, useRef } from 'react';
import { Camera, RotateCcw, Upload, CheckCircle2 } from 'lucide-react';
import { schoolInfo } from '../data/schoolData';
import { getCustomHeroImage, saveCustomHeroImage, resetCustomHeroImage } from '../utils/imageStorage';

interface HeroProps {
  onOpenSpmbRegister: () => void;
  onExploreClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenSpmbRegister,
}) => {
  const [showBuildingPreview, setShowBuildingPreview] = useState(false);
  const [heroImage, setHeroImage] = useState<string>('/images/hero-building.jpg');
  const [isCustomPhoto, setIsCustomPhoto] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Load stored custom photo if exists
    getCustomHeroImage().then((stored) => {
      if (stored) {
        setHeroImage(stored);
        setIsCustomPhoto(true);
      }
    });

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<string | null>;
      if (customEvent.detail) {
        setHeroImage(customEvent.detail);
        setIsCustomPhoto(true);
      } else {
        setHeroImage('/images/hero-building.jpg');
        setIsCustomPhoto(false);
      }
    };

    window.addEventListener('hero-image-updated', handleUpdate);
    return () => window.removeEventListener('hero-image-updated', handleUpdate);
  }, []);

  const handleFileChange = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih file gambar (JPG / PNG).');
      return;
    }
    try {
      const url = await saveCustomHeroImage(file);
      setHeroImage(url);
      setIsCustomPhoto(true);
      setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 4000);
    } catch (err) {
      console.error('Gagal menyimpan foto:', err);
    }
  };

  const handleReset = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await resetCustomHeroImage();
    setHeroImage('/images/hero-building.jpg');
    setIsCustomPhoto(false);
  };

  return (
    <section
      id="beranda"
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          handleFileChange(e.dataTransfer.files[0]);
        }
      }}
      className="relative min-h-[660px] md:min-h-[740px] lg:min-h-[820px] flex items-center justify-center overflow-hidden bg-on-background text-surface-container-lowest"
    >
      {/* Hidden File Input for Native Camera / Gallery Upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileChange(e.target.files[0]);
          }
        }}
      />

      {/* Drag & Drop Visual Indicator */}
      {isDragging && (
        <div className="absolute inset-0 z-50 bg-primary/80 backdrop-blur-sm flex flex-col items-center justify-center border-4 border-dashed border-white text-white p-6 text-center animate-in fade-in duration-200 pointer-events-none">
          <Upload className="w-16 h-16 animate-bounce mb-3" />
          <p className="text-xl font-bold">Lepaskan Foto Asli Gedung di Sini</p>
          <p className="text-sm opacity-90 mt-1">Foto kamera akan langsung dipasang tanpa editan</p>
        </div>
      )}

      {/* Background Visual: School Building */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Gedung Kampus Hijau MA Uswatun Hasanah Semarang"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />

        {/* Natural scrim overlay to maintain photo realism while ensuring text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/25"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
      </div>

      {/* Floating Action: Upload / Ganti Foto Asli Gedung (Top Right / Bottom Right) */}
      <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
        {uploadSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/90 backdrop-blur-md text-white text-xs font-semibold rounded-full shadow-lg border border-emerald-400/40 animate-in fade-in slide-in-from-bottom-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            <span>Foto Asli Berhasil Dipasang!</span>
          </div>
        )}
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-3.5 py-2 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-medium rounded-full border border-white/20 transition-all shadow-lg hover:shadow-xl hover:border-white/40 cursor-pointer group"
          title="Klik untuk memilih file foto asli dari HP atau laptop Anda"
        >
          <Camera className="w-4 h-4 text-secondary group-hover:scale-110 transition-transform" />
          <span>{isCustomPhoto ? 'Ganti Foto Asli' : 'Pasang Foto Asli Gedung'}</span>
        </button>
        {isCustomPhoto && (
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2 bg-black/50 hover:bg-red-950/80 backdrop-blur-md text-white/80 hover:text-white text-xs rounded-full border border-white/20 transition cursor-pointer"
            title="Kembalikan ke foto bawaan"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        )}
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-container-max mx-auto px-gutter-desktop py-space-3xl w-full text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          {/* Slogan Kaligrafi Motif from User's Building Banner */}
          <div className="flex items-center justify-center gap-3 mb-4 text-secondary-fixed animate-in fade-in slide-in-from-top-3 duration-500">
            <span className="h-[1px] w-6 sm:w-12 bg-secondary/60"></span>
            <span className="font-headline-sm text-sm sm:text-base md:text-lg italic font-semibold tracking-wide drop-shadow-sm">
              ✨ dengan Iman, Ilmu dan Amal ✨
            </span>
            <span className="h-[1px] w-6 sm:w-12 bg-secondary/60"></span>
          </div>

          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 bg-surface-container-lowest/15 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-6 shadow-lg animate-in fade-in slide-in-from-bottom-3 duration-500">
            <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-ping"></span>
            <span className="text-xs md:text-sm font-semibold text-surface-container-lowest tracking-wide">
              Sistem Penerimaan Murid Baru (SPMB) TP 2027/2028 Resmi Dibuka
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.15] text-white drop-shadow-sm mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            Aswaja Hebat,
            <span className="block text-white mt-1 sm:mt-2">Pelajar Bermartabat</span>
          </h1>

          {/* Subheadline */}
          <p className="font-normal text-base sm:text-lg md:text-xl text-outline-variant max-w-2xl mx-auto leading-relaxed mb-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
            {schoolInfo.subheadline}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-6 duration-700">
            <a
              href="https://docs.google.com/forms/d/1lQ3_QHZ2r-XINMfAgpLCwgXwaCQ6pAyEmivue2pUozU/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-base shadow-lg hover:shadow-primary/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
              title="Daftar Sekarang melalui Google Form Resmi MA Uswatun Hasanah"
            >
              <span className="material-symbols-outlined text-[22px]">how_to_reg</span>
              <span>DAFTAR SEKARANG</span>
            </a>
          </div>

          {/* Trust Highlights Strip */}
          <div className="mt-14 pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl">
            <div className="flex flex-col items-center">
              <span className="text-secondary-fixed font-bold text-xl sm:text-2xl">Berkarakter</span>
              <span className="text-xs text-outline-variant mt-0.5">Iman, Ilmu &amp; Amal</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-secondary-fixed font-bold text-xl sm:text-2xl">Hafal Al-Qur'an</span>
              <span className="text-xs text-outline-variant mt-0.5">Hafal Surat-surat Pilihan</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-secondary-fixed font-bold text-xl sm:text-2xl">Diskon 70%</span>
              <span className="text-xs text-outline-variant mt-0.5">Infaq Pendaftaran Gel. 1</span>
            </div>
          </div>
        </div>
      </div>

      {/* Building Photo Lightbox Modal */}
      {showBuildingPreview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowBuildingPreview(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-surface-container-lowest rounded-2xl overflow-hidden shadow-2xl border border-outline-variant"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={heroImage}
                alt="Gedung Kampus Hijau MTs - MA Uswatun Hasanah Mangkang Wetan Semarang"
                className="w-full h-auto max-h-[75vh] object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                type="button"
                onClick={() => setShowBuildingPreview(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition cursor-pointer"
                aria-label="Tutup foto"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>
            <div className="p-6 bg-surface-container-low flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-secondary uppercase">
                  Kampus Terpadu MA Uswatun Hasanah Semarang
                </span>
                <h3 className="font-headline-sm text-base font-bold text-on-background">
                  Gedung Pembelajaran 3 Lantai MA Uswatun Hasanah
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Jl. Raya Mangkang Wetan, Kec. Tugu, Kota Semarang, Jawa Tengah • Telp: (024) 76171829
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowBuildingPreview(false);
                  onOpenSpmbRegister();
                }}
                className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary-container transition shrink-0 flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                <span>Daftar SPMB Sekarang</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
