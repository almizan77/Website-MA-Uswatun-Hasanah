import React, { useState, useEffect, useRef } from 'react';
import { featuredPrograms, ProgramItem } from '../data/schoolData';

interface ProgramsSectionProps {
  onOpenSpmbRegister: () => void;
}

const STORAGE_KEY = 'mauh_program_custom_images';

// Helper to get custom images from localStorage
const getStoredCustomImages = (): Record<string, string[]> => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

// Helper to save custom images to localStorage
const saveStoredCustomImages = (data: Record<string, string[]>) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save custom images:', err);
  }
};

// Komponen kartu thumbnail dengan fitur slider otomatis, navigasi, dan tombol tambah foto
const ProgramCardThumbnail: React.FC<{
  images: string[];
  title: string;
  tag: string;
  target: string;
  onManagePhotos: () => void;
}> = ({ images, title, tag, target, onManagePhotos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide jika terdapat lebih dari 1 gambar
  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative h-52 w-full overflow-hidden bg-surface-container select-none group/thumb">
      {/* Sliding Image Container */}
      <div
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((src, idx) => (
          <div key={idx} className="w-full h-full shrink-0 relative bg-surface-container-high">
            <img
              src={src}
              alt={`${title} foto ${idx + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-on-background/85 via-on-background/25 to-transparent pointer-events-none"></div>

      {/* Tag Badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className="bg-surface-container-lowest/90 backdrop-blur-sm text-primary font-label-sm text-label-sm font-bold px-2.5 py-1 rounded-md shadow-xs">
          {tag}
        </span>
      </div>

      {/* Tombol Kelola / Tambah Foto ke Slide */}
      <div className="absolute top-3 right-3 z-10">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onManagePhotos();
          }}
          title="Kelola & Tambah Foto Slide"
          className="flex items-center gap-1.5 px-2.5 py-1 bg-surface-container-lowest/90 hover:bg-primary hover:text-white text-on-surface text-xs font-bold rounded-lg shadow-sm backdrop-blur-sm transition-all cursor-pointer opacity-90 group-hover/thumb:opacity-100"
        >
          <span className="material-symbols-outlined text-[15px]">add_photo_alternate</span>
          <span>+ Foto</span>
        </button>
      </div>

      {/* Target Badge & Slide Indicators */}
      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white z-10">
        <span className="text-xs font-semibold bg-primary/80 backdrop-blur-xs px-2 py-0.5 rounded">
          Target: {target}
        </span>

        {/* Slide Indicator Dots */}
        {images.length > 1 && (
          <div className="flex items-center gap-1.5 bg-black/45 backdrop-blur-xs px-2 py-1 rounded-full">
            {images.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                aria-label={`Slide ${dotIdx + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(dotIdx);
                }}
                className={`transition-all rounded-full ${
                  dotIdx === currentIndex
                    ? 'w-4 h-1.5 bg-secondary-fixed shadow-sm'
                    : 'w-1.5 h-1.5 bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Manual Slide Controls (Arrow buttons on hover) */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Slide sebelumnya"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-primary text-white flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity z-20 cursor-pointer shadow-lg"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_left</span>
          </button>
          <button
            type="button"
            onClick={handleNext}
            aria-label="Slide selanjutnya"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-primary text-white flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity z-20 cursor-pointer shadow-lg"
          >
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </>
      )}
    </div>
  );
};

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ onOpenSpmbRegister }) => {
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);
  const [photoManageProgram, setPhotoManageProgram] = useState<ProgramItem | null>(null);

  // Menyimpan custom list gambar per program id (tersimpan di state & localStorage)
  const [customPhotosMap, setCustomPhotosMap] = useState<Record<string, string[]>>({});
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [uploadFeedback, setUploadFeedback] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved custom photos from localStorage on mount
  useEffect(() => {
    setCustomPhotosMap(getStoredCustomImages());
  }, []);

  // Ambil daftar gambar aktif untuk program tertentu
  const getProgramImages = (program: ProgramItem): string[] => {
    if (customPhotosMap[program.id] && customPhotosMap[program.id].length > 0) {
      return customPhotosMap[program.id];
    }
    if (program.images && program.images.length > 0) {
      return program.images;
    }
    return [program.image];
  };

  // Tambah gambar via file picker lokal (base64)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !photoManageProgram) return;

    if (!file.type.startsWith('image/')) {
      setUploadFeedback('Harap pilih file gambar (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        addImageToProgram(photoManageProgram.id, base64);
        setUploadFeedback('Foto berhasil ditambahkan ke slide!');
        setTimeout(() => setUploadFeedback(null), 3000);
      }
    };
    reader.readAsDataURL(file);
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Tambah gambar via URL
  const handleAddUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrlInput.trim() || !photoManageProgram) return;

    addImageToProgram(photoManageProgram.id, imageUrlInput.trim());
    setImageUrlInput('');
    setUploadFeedback('Foto dari link berhasil ditambahkan!');
    setTimeout(() => setUploadFeedback(null), 3000);
  };

  // Helper simpan penambahan gambar
  const addImageToProgram = (programId: string, newImage: string) => {
    const currentList = customPhotosMap[programId] || (
      featuredPrograms.find(p => p.id === programId)?.images || [
        featuredPrograms.find(p => p.id === programId)?.image || ''
      ]
    );

    const updatedList = [...currentList, newImage];
    const updatedMap = { ...customPhotosMap, [programId]: updatedList };
    setCustomPhotosMap(updatedMap);
    saveStoredCustomImages(updatedMap);
  };

  // Hapus foto dari slide
  const handleRemovePhoto = (programId: string, indexToRemove: number) => {
    const currentList = getProgramImages(photoManageProgram!);
    if (currentList.length <= 1) {
      setUploadFeedback('Minimal harus ada 1 foto di dalam slide.');
      setTimeout(() => setUploadFeedback(null), 3000);
      return;
    }

    const updatedList = currentList.filter((_, idx) => idx !== indexToRemove);
    const updatedMap = { ...customPhotosMap, [programId]: updatedList };
    setCustomPhotosMap(updatedMap);
    saveStoredCustomImages(updatedMap);
    setUploadFeedback('Foto berhasil dihapus.');
    setTimeout(() => setUploadFeedback(null), 2500);
  };

  // Reset ke foto default bawaan
  const handleResetToDefault = (programId: string) => {
    const updatedMap = { ...customPhotosMap };
    delete updatedMap[programId];
    setCustomPhotosMap(updatedMap);
    saveStoredCustomImages(updatedMap);
    setUploadFeedback('Foto dikembalikan ke setelan awal.');
    setTimeout(() => setUploadFeedback(null), 2500);
  };

  return (
    <section id="program" className="py-space-3xl bg-surface-container-lowest border-y border-outline-variant/40">
      <div className="max-w-container-max mx-auto px-gutter-desktop">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="bg-primary/10 text-primary font-label-md text-label-md px-3.5 py-1 rounded-full font-bold inline-block mb-3">
            KURIKULUM &amp; PEMINATAN
          </span>
          <h2 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-background font-extrabold tracking-tight">
            Program Unggulan Kami
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-3">
            Dirancang secara holistik untuk membentuk lulusan yang mutafaqqih fiddin, tangguh secara intelektual, dan siap bersaing di panggung peradaban global.
          </p>
        </div>

        {/* 3 Program Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPrograms.map((program, index) => {
            const programImages = getProgramImages(program);
            const isLastOddItem = index === 2 && featuredPrograms.length === 3;

            return (
              <div
                key={program.id}
                className={`group bg-background rounded-2xl border border-outline-variant/60 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-primary/60 transition-all duration-300 hover:-translate-y-1.5 ${
                  isLastOddItem
                    ? 'md:col-span-2 md:max-w-md md:mx-auto md:w-full lg:col-span-1 lg:max-w-none lg:mx-0'
                    : ''
                }`}
              >
                {/* Program Thumbnail Slider dengan tombol + Foto */}
                <ProgramCardThumbnail
                  images={programImages}
                  title={program.title}
                  tag={program.tag}
                  target={program.target}
                  onManagePhotos={() => setPhotoManageProgram(program)}
                />

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-on-primary transition-colors duration-200">
                      <span className="material-symbols-outlined text-[26px]">
                        {program.icon}
                      </span>
                    </div>
                    <h3 className="font-headline-md text-headline-md text-on-background font-bold mb-2 group-hover:text-primary transition-colors">
                      {program.title}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      {program.shortDesc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MODAL KELOLA & TAMBAH FOTO SLIDE */}
      {photoManageProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest max-w-xl w-full rounded-2xl border border-outline-variant p-6 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Header Modal */}
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-outline-variant/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[22px]">add_photo_alternate</span>
                </div>
                <div>
                  <h3 className="font-headline-sm font-bold text-on-background">
                    Kelola Foto Slide
                  </h3>
                  <p className="text-xs text-on-surface-variant">
                    {photoManageProgram.title}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setPhotoManageProgram(null);
                  setUploadFeedback(null);
                }}
                className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Feedback Alert */}
            {uploadFeedback && (
              <div className="mb-4 p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary text-xs font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">info</span>
                <span>{uploadFeedback}</span>
              </div>
            )}

            {/* Opsi 1: Upload File dari HP / Komputer */}
            <div className="mb-5 p-4 rounded-xl bg-surface-container-low border border-outline-variant/50">
              <label className="block text-xs font-bold text-on-background uppercase tracking-wider mb-2">
                1. Masukkan Foto dari Perangkat (Galeri / File)
              </label>
              <div className="flex items-center gap-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="program-file-upload"
                />
                <label
                  htmlFor="program-file-upload"
                  className="flex-1 py-2.5 px-4 bg-primary text-white rounded-xl font-bold text-xs hover:bg-primary-container transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">upload_file</span>
                  <span>Pilih Foto dari Galeri / File</span>
                </label>
              </div>
              <p className="text-[11px] text-on-surface-variant mt-2">
                Mendukung format JPG, PNG, WEBP. Foto langsung tersimpan ke browser Anda.
              </p>
            </div>

            {/* Opsi 2: Masukkan Link / URL Gambar */}
            <div className="mb-6 p-4 rounded-xl bg-surface-container-low border border-outline-variant/50">
              <label className="block text-xs font-bold text-on-background uppercase tracking-wider mb-2">
                2. Atau Tempel Tautan (URL) Foto
              </label>
              <form onSubmit={handleAddUrl} className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/foto-kegiatan.jpg"
                  value={imageUrlInput}
                  onChange={(e) => setImageUrlInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-outline-variant focus:outline-none focus:border-primary bg-background"
                />
                <button
                  type="submit"
                  disabled={!imageUrlInput.trim()}
                  className="px-4 py-2 bg-secondary text-on-secondary rounded-xl text-xs font-bold disabled:opacity-50 hover:bg-secondary-container transition cursor-pointer"
                >
                  Tambah
                </button>
              </form>
            </div>

            {/* Daftar Foto Slide Saat Ini */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-on-background uppercase tracking-wider">
                  Foto dalam Slide ({getProgramImages(photoManageProgram).length})
                </span>
                {customPhotosMap[photoManageProgram.id] && (
                  <button
                    type="button"
                    onClick={() => handleResetToDefault(photoManageProgram.id)}
                    className="text-[11px] text-error hover:underline cursor-pointer font-medium"
                  >
                    Reset ke Standar
                  </button>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3">
                {getProgramImages(photoManageProgram).map((imgUrl, idx) => (
                  <div
                    key={idx}
                    className="relative rounded-xl overflow-hidden border border-outline-variant/60 group/item aspect-video bg-surface-container"
                  >
                    <img
                      src={imgUrl}
                      alt={`Slide foto ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                      #{idx + 1}
                    </div>
                    {/* Tombol Hapus */}
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(photoManageProgram.id, idx)}
                      title="Hapus foto dari slide"
                      className="absolute top-1 right-1 w-6 h-6 rounded-md bg-error/90 hover:bg-error text-white flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity cursor-pointer shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[14px]">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Tombol Tutup */}
            <div className="mt-6 pt-4 border-t border-outline-variant/40 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setPhotoManageProgram(null);
                  setUploadFeedback(null);
                }}
                className="py-2.5 px-5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-container transition cursor-pointer"
              >
                Selesai
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Program Detail Modal */}
      {selectedProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest max-w-lg w-full rounded-2xl border border-outline-variant p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-outline-variant/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">
                    {selectedProgram.icon}
                  </span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-secondary uppercase tracking-wider">
                    {selectedProgram.tag}
                  </span>
                  <h3 className="font-headline-sm font-bold text-on-background">
                    {selectedProgram.title}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProgram(null)}
                className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="font-body-md text-body-md text-on-surface leading-relaxed mb-4">
              {selectedProgram.fullDesc}
            </p>

            <div className="bg-surface-container-low rounded-xl p-4 border border-outline-variant/40 mb-6">
              <h4 className="font-headline-sm text-headline-sm font-bold text-primary mb-2.5">
                Capaian &amp; Fasilitas Program:
              </h4>
              <ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
                {selectedProgram.highlights.map((point, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedProgram(null);
                  onOpenSpmbRegister();
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-primary text-on-primary font-bold text-sm hover:bg-primary-container transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                <span>Daftar ke Program Ini</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedProgram(null)}
                className="py-3 px-4 rounded-xl border border-outline-variant text-on-surface font-semibold text-sm hover:bg-surface-container cursor-pointer"
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
