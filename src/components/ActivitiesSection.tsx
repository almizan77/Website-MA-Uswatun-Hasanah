import React, { useState, useEffect, useRef } from 'react';
import { activitiesData, ActivityItem } from '../data/schoolData';
import { getNamedImage, saveNamedImage, resetNamedImage } from '../utils/imageStorage';

export const ActivitiesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [activeActivity, setActiveActivity] = useState<ActivityItem | null>(null);
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>({});
  const [toastNotice, setToastNotice] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const categories = [
    'Semua',
    'Kepanduan & Karakter',
    'Olahraga & Prestasi',
    'Olahraga & Ketangkasan',
  ];

  // Load custom photos from storage
  useEffect(() => {
    activitiesData.forEach((item) => {
      const storageKey = `ekskul_photo_${item.id}`;
      getNamedImage(storageKey).then((stored) => {
        if (stored) {
          setCustomPhotos((prev) => ({ ...prev, [item.id]: stored }));
        }
      });
    });
  }, []);

  const handleUploadPhoto = async (itemId: string, file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih file gambar (JPG / PNG / WEBP).');
      return;
    }
    const item = activitiesData.find((p) => p.id === itemId);
    const storageKey = `ekskul_photo_${itemId}`;
    try {
      const url = await saveNamedImage(storageKey, file);
      setCustomPhotos((prev) => ({ ...prev, [itemId]: url }));
      setToastNotice(`Foto ekstrakurikuler "${item?.title || 'Ekskul'}" berhasil diganti!`);
      setTimeout(() => setToastNotice(null), 3500);
    } catch (err) {
      console.error('Gagal menyimpan foto ekskul:', err);
    }
  };

  const handleResetPhoto = async (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const storageKey = `ekskul_photo_${itemId}`;
    await resetNamedImage(storageKey);
    setCustomPhotos((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
    setToastNotice('Foto ekstrakurikuler dikembalikan ke bawaan.');
    setTimeout(() => setToastNotice(null), 3000);
  };

  const filteredActivities = activitiesData.filter((item) => {
    if (selectedCategory === 'Semua') return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="kegiatan" className="py-space-3xl bg-surface-container-lowest border-y border-outline-variant/40">
      <div className="max-w-container-max mx-auto px-gutter-desktop">
        {/* Toast Notifikasi */}
        {toastNotice && (
          <div className="mb-6 mx-auto max-w-md bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>{toastNotice}</span>
            </div>
            <button
              type="button"
              onClick={() => setToastNotice(null)}
              className="text-white/80 hover:text-white text-base cursor-pointer"
            >
              ×
            </button>
          </div>
        )}

        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="bg-primary/10 text-primary font-label-md text-label-md px-3.5 py-1 rounded-full font-bold inline-block mb-3">
            PENGEMBANGAN MINAT &amp; BAKAT
          </span>
          <h2 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-background font-extrabold tracking-tight">
            Extrakurikuler Siswa
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-3">
            Wadah pengembangan potensi kepanduan karakter dan olahraga prestasi: Pramuka, Futsal, Tennis Meja, dan Badminton dengan fasilitas GOR madrasah yang lengkap.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-primary text-on-primary font-bold shadow-xs'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Cards Grid - 2 on md, 2 on lg */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {filteredActivities.map((act) => {
            const imgSrc = customPhotos[act.id] || act.image;
            const isCustom = Boolean(customPhotos[act.id]);

            return (
              <div
                key={act.id}
                onClick={() => setActiveActivity(act)}
                className="group relative h-80 rounded-2xl overflow-hidden border border-outline-variant/60 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Hidden File Input */}
                <input
                  ref={(el) => (fileInputRefs.current[act.id] = el)}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleUploadPhoto(act.id, e.target.files[0]);
                    }
                  }}
                />

                <img
                  src={imgSrc}
                  alt={act.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent"></div>

                {/* Category Pill */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="bg-primary/90 text-on-primary backdrop-blur-xs font-label-sm text-label-sm font-bold px-2.5 py-1 rounded-md shadow-xs">
                    {act.category}
                  </span>
                </div>

                {/* Tombol Ganti Foto & Reset */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRefs.current[act.id]?.click();
                    }}
                    className="px-2.5 py-1 rounded-lg bg-black/70 hover:bg-primary text-white text-[11px] font-bold backdrop-blur-md border border-white/30 transition-all flex items-center gap-1 shadow-md hover:scale-105 cursor-pointer"
                    title="Ganti foto ekstrakurikuler ini"
                  >
                    <span className="material-symbols-outlined text-[14px]">photo_camera</span>
                    <span>Ganti Foto</span>
                  </button>
                  {isCustom && (
                    <button
                      type="button"
                      onClick={(e) => handleResetPhoto(act.id, e)}
                      className="p-1 rounded-lg bg-black/70 hover:bg-red-700 text-white text-[11px] font-semibold backdrop-blur-md border border-white/20 transition-all flex items-center shadow-md cursor-pointer"
                      title="Reset ke foto bawaan"
                    >
                      <span className="material-symbols-outlined text-[14px]">refresh</span>
                    </button>
                  )}
                </div>

                {/* Schedule Pill */}
                <div className="absolute top-14 right-4 z-10">
                  <span className="bg-surface-container-lowest/90 text-on-surface text-[11px] font-bold px-2.5 py-0.5 rounded shadow-xs backdrop-blur-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px] text-primary">schedule</span>
                    <span>{act.schedule}</span>
                  </span>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-6 text-white transition-transform duration-300 group-hover:-translate-y-1 z-10">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-headline-md text-lg sm:text-xl font-bold text-white leading-snug">
                      {act.title}
                    </h3>
                    {isCustom && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-600/90 text-white shrink-0 ml-2">
                        Foto Asli
                      </span>
                    )}
                  </div>
                  <p className="font-body-sm text-xs sm:text-sm text-outline-variant line-clamp-2 leading-relaxed">
                    {act.desc}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-secondary-fixed text-xs font-bold">
                    <span>Lihat Selengkapnya</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Activity Detail Modal */}
      {activeActivity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest max-w-lg w-full rounded-2xl border border-outline-variant overflow-hidden shadow-2xl relative">
            <div className="relative h-60 w-full">
              <img
                src={customPhotos[activeActivity.id] || activeActivity.image}
                alt={activeActivity.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setActiveActivity(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary/10 text-primary font-bold text-xs px-2.5 py-0.5 rounded">
                  {activeActivity.category}
                </span>
                <span className="text-xs text-on-surface-variant font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-primary">schedule</span>
                  <span>Jadwal: {activeActivity.schedule}</span>
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md font-bold text-on-background mb-3">
                {activeActivity.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
                {activeActivity.desc}
              </p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const id = activeActivity.id;
                    setActiveActivity(null);
                    fileInputRefs.current[id]?.click();
                  }}
                  className="flex-1 py-2.5 bg-primary text-on-primary rounded-xl font-bold text-sm hover:opacity-90 transition cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                  <span>Ganti Foto Ini</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveActivity(null)}
                  className="px-5 py-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl font-bold text-sm transition cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
