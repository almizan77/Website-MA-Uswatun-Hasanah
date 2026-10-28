import React, { useState, useEffect, useRef } from 'react';
import { achievementsData, AchievementItem } from '../data/schoolData';
import { getNamedImage, saveNamedImage, resetNamedImage } from '../utils/imageStorage';

export const AchievementsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [isAllModalOpen, setIsAllModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>({});
  const [toastNotice, setToastNotice] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const categories = [
    'Semua',
    'Sains & Riset',
    'Keagamaan & MTQ',
    'Bahasa & Diplomasi',
    'Olahraga & Seni',
  ];

  // Load custom photos from storage
  useEffect(() => {
    achievementsData.forEach((item) => {
      const storageKey = `prestasi_photo_${item.id}`;
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
    const item = achievementsData.find((p) => p.id === itemId);
    const storageKey = `prestasi_photo_${itemId}`;
    try {
      const url = await saveNamedImage(storageKey, file);
      setCustomPhotos((prev) => ({ ...prev, [itemId]: url }));
      setToastNotice(`Foto prestasi "${item?.studentName || 'Siswa'}" berhasil diganti!`);
      setTimeout(() => setToastNotice(null), 3500);
    } catch (err) {
      console.error('Gagal menyimpan foto prestasi:', err);
    }
  };

  const handleResetPhoto = async (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const storageKey = `prestasi_photo_${itemId}`;
    await resetNamedImage(storageKey);
    setCustomPhotos((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
    setToastNotice('Foto prestasi dikembalikan ke bawaan.');
    setTimeout(() => setToastNotice(null), 3000);
  };

  const filteredAchievements = achievementsData.filter((item) => {
    if (selectedCategory === 'Semua') return true;
    return item.category === selectedCategory;
  });

  const modalFilteredAchievements = achievementsData.filter((item) => {
    const matchesSearch =
      item.competition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.rank.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <section id="prestasi" className="py-space-3xl bg-background">
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

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md px-3.5 py-1 rounded-full font-bold inline-block mb-3">
            REKOR JUARA &amp; PRESTASI
          </span>
          <h2 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-background font-extrabold tracking-tight">
            Prestasi Membanggakan Siswa Kami
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-3">
            Bukti dedikasi, kedisiplinan, dan ikhtiar para siswa dan siswi di panggung olimpiade sains, musabaqah tilawah, diplomasi bahasa, serta cabang olahraga.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-primary text-on-primary shadow-xs font-bold'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAchievements.map((item) => {
            const imgSrc = customPhotos[item.id] || item.photo;
            const isCustom = Boolean(customPhotos[item.id]);

            return (
              <div
                key={item.id}
                className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 overflow-hidden shadow-xs hover:shadow-xl hover:border-secondary/60 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative"
              >
                {/* Hidden File Input */}
                <input
                  ref={(el) => (fileInputRefs.current[item.id] = el)}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleUploadPhoto(item.id, e.target.files[0]);
                    }
                  }}
                />

                {/* Photo Banner with Level Badge & Tombol Ganti Foto */}
                <div className="relative h-48 w-full overflow-hidden bg-surface-container">
                  <img
                    src={imgSrc}
                    alt={item.competition}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-background/85 via-on-background/30 to-transparent"></div>

                  {/* Level & Year Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                    <span
                      className={`font-label-sm text-label-sm font-bold px-2.5 py-1 rounded shadow-xs text-white ${
                        item.level === 'Internasional'
                          ? 'bg-tertiary'
                          : item.level === 'Nasional'
                          ? 'bg-secondary'
                          : 'bg-primary'
                      }`}
                    >
                      Tingkat {item.level}
                    </span>
                    <span className="bg-surface-container-lowest/90 backdrop-blur-xs text-on-surface text-[11px] font-bold px-2 py-1 rounded shadow-xs">
                      Tahun {item.year}
                    </span>
                  </div>

                  {/* Tombol Ganti Foto & Reset */}
                  <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                    <button
                      type="button"
                      onClick={() => fileInputRefs.current[item.id]?.click()}
                      className="px-2.5 py-1 rounded-lg bg-black/70 hover:bg-primary text-white text-[11px] font-bold backdrop-blur-md border border-white/30 transition-all flex items-center gap-1 shadow-md hover:scale-105 cursor-pointer"
                      title="Ganti foto dokumentasi prestasi ini"
                    >
                      <span className="material-symbols-outlined text-[14px]">photo_camera</span>
                      <span>Ganti Foto</span>
                    </button>
                    {isCustom && (
                      <button
                        type="button"
                        onClick={(e) => handleResetPhoto(item.id, e)}
                        className="p-1 rounded-lg bg-black/70 hover:bg-red-700 text-white text-[11px] font-semibold backdrop-blur-md border border-white/20 transition-all flex items-center shadow-md cursor-pointer"
                        title="Reset ke foto bawaan"
                      >
                        <span className="material-symbols-outlined text-[14px]">refresh</span>
                      </button>
                    )}
                  </div>

                  {/* Rank on bottom */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 text-secondary-fixed z-10">
                    <span className="material-symbols-outlined text-[18px]">military_tech</span>
                    <span className="font-bold text-sm tracking-wide">{item.rank}</span>
                    {isCustom && (
                      <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-600/90 text-white">
                        Foto Asli
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-headline-md text-headline-md font-bold text-on-background leading-snug group-hover:text-primary transition-colors">
                      {item.competition}
                    </h3>
                  </div>

                  <div className="mt-5 pt-4 border-t border-outline-variant/40 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                      <span className="material-symbols-outlined text-[20px]">person</span>
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-headline-sm text-sm font-bold text-on-background truncate">
                        {item.studentName}
                      </div>
                      <div className="font-body-sm text-xs text-on-surface-variant">
                        Siswa/Siswi Berprestasi MAUH
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            type="button"
            onClick={() => setIsAllModalOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-on-primary font-label-lg font-bold text-sm transition-all duration-200 shadow-xs cursor-pointer"
          >
            <span>Lihat Semua Prestasi</span>
            <span className="material-symbols-outlined text-[18px]">trophy</span>
          </button>
        </div>
      </div>

      {/* Modal: Semua Prestasi */}
      {isAllModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest max-w-4xl w-full rounded-2xl border border-outline-variant p-6 sm:p-8 shadow-2xl relative max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">emoji_events</span>
                </div>
                <div>
                  <h3 className="font-headline-md font-bold text-on-background">
                    Daftar Prestasi Lengkap Siswa
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Pencapaian medali &amp; kejuaraan siswa dan siswi MA Uswatun Hasanah
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAllModalOpen(false)}
                className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            {/* Search Filter in Modal */}
            <div className="py-4">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-outline">
                  <span className="material-symbols-outlined text-[20px]">search</span>
                </span>
                <input
                  type="text"
                  placeholder="Cari kompetisi, nama siswa, atau kejuaraan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-on-surface text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
            </div>

            {/* Scrollable Table / List */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-3">
              {modalFilteredAchievements.length === 0 ? (
                <div className="text-center py-10 text-on-surface-variant">
                  Tidak ditemukan prestasi dengan kata kunci tersebut.
                </div>
              ) : (
                modalFilteredAchievements.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-outline-variant/50 bg-surface-container-low hover:bg-surface-container transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-secondary bg-secondary-fixed/50 px-2 py-0.5 rounded">
                          {item.rank}
                        </span>
                        <span className="text-xs text-on-surface-variant">
                          Tingkat {item.level} ({item.year})
                        </span>
                      </div>
                      <h4 className="font-bold text-on-background text-sm sm:text-base">
                        {item.competition}
                      </h4>
                      <p className="text-xs text-primary font-semibold mt-0.5">
                        Siswa/Siswi: {item.studentName}
                      </p>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-surface-container-lowest rounded border border-outline-variant/40 shrink-0">
                      {item.category}
                    </span>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-outline-variant/60 flex justify-end">
              <button
                type="button"
                onClick={() => setIsAllModalOpen(false)}
                className="px-6 py-2.5 rounded-lg bg-on-background text-surface-container-lowest font-bold text-sm hover:bg-on-surface cursor-pointer"
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
