import React, { useState, useEffect, useRef } from 'react';
import { newsData, NewsItem } from '../data/schoolData';
import { getNamedImage, saveNamedImage, resetNamedImage } from '../utils/imageStorage';

export const NewsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [readingNews, setReadingNews] = useState<NewsItem | null>(null);
  const [isAllNewsModalOpen, setIsAllNewsModalOpen] = useState<boolean>(false);
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>({});
  const [toastNotice, setToastNotice] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    newsData.forEach((item) => {
      const storageKey = `news_photo_${item.id}`;
      getNamedImage(storageKey).then((stored) => {
        if (stored) {
          setCustomPhotos((prev) => ({ ...prev, [item.id]: stored }));
        }
      });
    });
  }, []);

  const handleUploadPhoto = async (newsId: string, file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih file gambar (JPG / PNG / WEBP).');
      return;
    }
    const n = newsData.find((x) => x.id === newsId);
    const storageKey = `news_photo_${newsId}`;
    try {
      const url = await saveNamedImage(storageKey, file);
      setCustomPhotos((prev) => ({ ...prev, [newsId]: url }));
      setToastNotice(`Foto berita "${n?.title || 'Berita'}" berhasil diganti!`);
      setTimeout(() => setToastNotice(null), 3500);
    } catch (err) {
      console.error('Gagal menyimpan foto berita:', err);
    }
  };

  const handleResetPhoto = async (newsId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const storageKey = `news_photo_${newsId}`;
    await resetNamedImage(storageKey);
    setCustomPhotos((prev) => {
      const next = { ...prev };
      delete next[newsId];
      return next;
    });
    setToastNotice('Foto berita dikembalikan ke awal.');
    setTimeout(() => setToastNotice(null), 3000);
  };

  const categories = ['Semua', 'Prestasi', 'Pengumuman', 'Keagamaan', 'Akademik', 'Kegiatan'];

  const filteredNews = newsData.filter((item) => {
    if (selectedCategory === 'Semua') return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="berita" className="py-space-3xl bg-background">
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
          <span className="bg-primary/10 text-primary font-label-md text-label-md px-3.5 py-1 rounded-full font-bold inline-block mb-3">
            WARTA &amp; INFORMASI
          </span>
          <h2 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-background font-extrabold tracking-tight">
            Berita &amp; Informasi Terbaru
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-3">
            Kabar prestasi, agenda madrasah, pengumuman SPMB, serta artikel inspiratif seputar dunia pendidikan Islam.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 cursor-pointer ${
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

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.slice(0, 3).map((item) => {
            const currentImg = customPhotos[item.id] || item.thumbnail;
            const isCustom = Boolean(customPhotos[item.id]);

            return (
              <article
                key={item.id}
                className="bg-surface-container-lowest rounded-2xl border border-outline-variant/60 overflow-hidden shadow-xs hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative"
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

                <div>
                  {/* Thumbnail */}
                  <div className="relative h-52 w-full overflow-hidden bg-surface-container">
                    <img
                      src={currentImg}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
                      <span className="bg-primary/95 text-on-primary font-label-sm text-label-sm font-bold px-2.5 py-1 rounded shadow-xs">
                        {item.category}
                      </span>
                      {isCustom && (
                        <span className="bg-emerald-600/90 text-white font-bold text-[10px] px-2 py-0.5 rounded shadow-xs">
                          Foto Asli
                        </span>
                      )}
                    </div>

                    {/* Tombol Ganti Foto (Top Right) */}
                    <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          fileInputRefs.current[item.id]?.click();
                        }}
                        className="px-2.5 py-1 rounded-lg bg-black/70 hover:bg-primary text-white text-[11px] font-bold backdrop-blur-md border border-white/20 transition-all flex items-center gap-1 shadow-md hover:scale-105 cursor-pointer"
                        title="Ganti foto artikel ini"
                      >
                        <span className="material-symbols-outlined text-[14px]">photo_camera</span>
                        <span>Ganti Foto</span>
                      </button>
                      {isCustom && (
                        <button
                          type="button"
                          onClick={(e) => handleResetPhoto(item.id, e)}
                          className="p-1 rounded-lg bg-black/70 hover:bg-red-700 text-white text-[11px] transition cursor-pointer"
                          title="Reset ke foto awal"
                        >
                          <span className="material-symbols-outlined text-[14px]">refresh</span>
                        </button>
                      )}
                    </div>
                  </div>

                {/* Article Meta & Title */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-on-surface-variant mb-2.5">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">calendar_today</span>
                      <span>{item.date}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 truncate">
                      <span className="material-symbols-outlined text-[15px]">person</span>
                      <span>{item.author}</span>
                    </span>
                  </div>

                  <h3 className="font-headline-md text-headline-md font-bold text-on-background leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="font-body-md text-body-md text-on-surface-variant mt-3 line-clamp-3 leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>

              {/* Read More Action */}
              <div className="px-6 pb-6 pt-2 border-t border-outline-variant/40 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setReadingNews(item)}
                  className="text-primary font-label-md text-label-md font-bold hover:underline inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Baca Selengkapnya</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
                <span className="material-symbols-outlined text-outline text-[18px]">bookmark_border</span>
              </div>
            </article>
          );
        })}
      </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            type="button"
            onClick={() => setIsAllNewsModalOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-on-primary font-label-lg font-bold text-sm transition-all duration-200 shadow-xs cursor-pointer"
          >
            <span>Lihat Semua Berita &amp; Informasi</span>
            <span className="material-symbols-outlined text-[18px]">newspaper</span>
          </button>
        </div>
      </div>

      {/* Reader Modal */}
      {readingNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest max-w-2xl w-full rounded-2xl border border-outline-variant overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
            <div className="relative h-64 sm:h-72 w-full bg-black shrink-0">
              <img
                src={readingNews.thumbnail}
                alt={readingNews.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setReadingNews(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
              <div className="absolute bottom-3 left-4">
                <span className="bg-primary text-on-primary font-bold text-xs px-3 py-1 rounded shadow-xs">
                  {readingNews.category}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
              <div className="flex items-center gap-3 text-xs text-on-surface-variant pb-2 border-b border-outline-variant/40">
                <span>{readingNews.date}</span>
                <span>•</span>
                <span>Ditulis oleh: {readingNews.author}</span>
              </div>

              <h2 className="font-headline-lg font-bold text-on-background leading-tight">
                {readingNews.title}
              </h2>

              <div className="space-y-3.5 text-on-surface font-body-md leading-relaxed">
                {readingNews.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="p-4 bg-surface-container-low border-t border-outline-variant/60 flex justify-between items-center">
              <span className="text-xs text-on-surface-variant font-medium">
                MA Uswatun Hasanah Media
              </span>
              <button
                type="button"
                onClick={() => setReadingNews(null)}
                className="px-5 py-2 rounded-lg bg-on-background text-surface-container-lowest font-bold text-sm hover:bg-on-surface transition cursor-pointer"
              >
                Tutup Artikel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Semua Berita */}
      {isAllNewsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest max-w-4xl w-full rounded-2xl border border-outline-variant p-6 sm:p-8 shadow-2xl relative max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-outline-variant/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">newspaper</span>
                </div>
                <div>
                  <h3 className="font-headline-md font-bold text-on-background">
                    Arsip Berita &amp; Informasi Madrasah
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Semua kabar kegiatan dan prestasi siswa dan siswi
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAllNewsModalOpen(false)}
                className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {newsData.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border border-outline-variant/50 bg-surface-container-low hover:bg-surface-container transition flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
                >
                  <div className="flex gap-3">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-20 h-20 rounded-lg object-cover shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase bg-primary/10 text-primary px-2 py-0.5 rounded">
                          {item.category}
                        </span>
                        <span className="text-xs text-on-surface-variant">{item.date}</span>
                      </div>
                      <h4 className="font-bold text-on-background text-sm sm:text-base line-clamp-1">
                        {item.title}
                      </h4>
                      <p className="text-xs text-on-surface-variant line-clamp-1 mt-0.5">
                        {item.summary}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAllNewsModalOpen(false);
                      setReadingNews(item);
                    }}
                    className="shrink-0 px-4 py-2 rounded-lg bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition cursor-pointer"
                  >
                    Baca
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-outline-variant/60 flex justify-end">
              <button
                type="button"
                onClick={() => setIsAllNewsModalOpen(false)}
                className="px-6 py-2 rounded-lg bg-on-background text-surface-container-lowest font-bold text-sm hover:bg-on-surface cursor-pointer"
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
