import React, { useState, useEffect, useRef } from 'react';
import { facilitiesData, FacilityItem } from '../data/schoolData';
import { getNamedImage, saveNamedImage, resetNamedImage } from '../utils/imageStorage';

export const FacilitiesSection: React.FC = () => {
  const [activeFacility, setActiveFacility] = useState<FacilityItem | null>(null);
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const [toastNotice, setToastNotice] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    facilitiesData.forEach((facility) => {
      getNamedImage(`facility_${facility.id}`).then((stored) => {
        if (stored) {
          setCustomImages((prev) => ({ ...prev, [facility.id]: stored }));
        }
      });
    });
  }, []);

  const handleFacilityUpload = async (facilityId: string, file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih file gambar (JPG / PNG / WEBP).');
      return;
    }
    const facility = facilitiesData.find((f) => f.id === facilityId);
    try {
      const url = await saveNamedImage(`facility_${facilityId}`, file);
      setCustomImages((prev) => ({ ...prev, [facilityId]: url }));
      setToastNotice(`Foto ${facility?.title || 'fasilitas'} berhasil diperbarui!`);
      setTimeout(() => setToastNotice(null), 3500);
    } catch (err) {
      console.error('Gagal menyimpan foto fasilitas:', err);
    }
  };

  const handleResetFacility = async (facilityId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    await resetNamedImage(`facility_${facilityId}`);
    setCustomImages((prev) => {
      const updated = { ...prev };
      delete updated[facilityId];
      return updated;
    });
    setToastNotice('Foto fasilitas dikembalikan ke bawaan.');
    setTimeout(() => setToastNotice(null), 3000);
  };

  return (
    <section id="fasilitas" className="py-space-3xl bg-surface-container-lowest border-y border-outline-variant/40">
      <div className="max-w-container-max mx-auto px-gutter-desktop">
        {/* Toast Notice */}
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

        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="bg-primary/10 text-primary font-label-md text-label-md px-3.5 py-1 rounded-full font-bold inline-block mb-3">
            SARANA &amp; PRASARANA
          </span>
          <h2 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-background font-extrabold tracking-tight">
            Fasilitas Pendukung Pembelajaran
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-3">
            Kampus terpadu dilengkapi sarana belajar modern, laboratorium sains &amp; komputasi canggih, perpustakaan digital, serta sarana ibadah representatif.
          </p>
        </div>

        {/* Facilities Grid with Clickable Image Lightbox */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilitiesData.map((facility) => {
            const currentImg = customImages[facility.id] || facility.image;
            const isCustom = !!customImages[facility.id];

            return (
              <div
                key={facility.id}
                className="group bg-background rounded-2xl border border-outline-variant/60 overflow-hidden shadow-xs hover:shadow-xl hover:border-primary/50 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Hidden File Input for this facility */}
                <input
                  ref={(el) => (fileInputRefs.current[facility.id] = el)}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFacilityUpload(facility.id, e.target.files[0]);
                    }
                  }}
                />

                {/* Image Container with Controls */}
                <div
                  className="relative h-56 w-full overflow-hidden bg-surface-container cursor-pointer"
                  onClick={() => setActiveFacility(facility)}
                >
                  <img
                    src={currentImg}
                    alt={facility.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-background/80 via-transparent to-transparent pointer-events-none"></div>

                  <div className="absolute top-3 left-3 flex items-center gap-1.5 pointer-events-none">
                    <span className="bg-surface-container-lowest/90 backdrop-blur-xs text-primary font-label-sm text-label-sm font-bold px-2.5 py-1 rounded-md shadow-xs">
                      {facility.category}
                    </span>
                    {isCustom && (
                      <span className="bg-emerald-600/90 text-white font-label-sm text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-0.5">
                        <span className="material-symbols-outlined text-[12px]">verified</span>
                        Foto Asli
                      </span>
                    )}
                  </div>

                  {/* Top Right Action Button: Ganti Foto */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => fileInputRefs.current[facility.id]?.click()}
                      className="px-2 py-1 rounded-lg bg-black/70 hover:bg-primary text-white text-[11px] font-bold backdrop-blur-md border border-white/20 transition-all flex items-center gap-1 shadow-md cursor-pointer hover:scale-105"
                      title="Klik untuk mengganti foto fasilitas ini"
                    >
                      <span className="material-symbols-outlined text-[14px]">add_a_photo</span>
                      <span>Ganti Foto</span>
                    </button>
                    {isCustom && (
                      <button
                        type="button"
                        onClick={(e) => handleResetFacility(facility.id, e)}
                        className="p-1 rounded-lg bg-black/70 hover:bg-red-700 text-white text-[11px] transition cursor-pointer"
                        title="Reset ke foto bawaan"
                      >
                        <span className="material-symbols-outlined text-[14px]">refresh</span>
                      </button>
                    )}
                  </div>

                  {/* Zoom indicator on bottom right */}
                  <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-primary group-hover:text-on-primary transition-colors duration-200 pointer-events-none">
                    <span className="material-symbols-outlined text-[20px]">zoom_in</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      onClick={() => setActiveFacility(facility)}
                      className="font-headline-md text-headline-md font-bold text-on-background group-hover:text-primary transition-colors cursor-pointer"
                    >
                      {facility.title}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                      {facility.caption}
                    </p>
                  </div>

                  {/* Specs Pill List */}
                  <div className="mt-5 pt-4 border-t border-outline-variant/40 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {facility.specs.slice(0, 3).map((spec, i) => (
                        <span
                          key={i}
                          className="bg-surface-container-low text-on-surface text-[11px] font-semibold px-2 py-0.5 rounded border border-outline-variant/30"
                        >
                          {spec}
                        </span>
                      ))}
                      {facility.specs.length > 3 && (
                        <span className="text-[11px] text-primary font-bold px-1 py-0.5">
                          +{facility.specs.length - 3} lainnya
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRefs.current[facility.id]?.click()}
                      className="text-primary hover:text-primary-container text-xs font-bold flex items-center gap-1 cursor-pointer ml-auto"
                    >
                      <span className="material-symbols-outlined text-[15px]">add_a_photo</span>
                      <span>Ganti Foto</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox / Gallery Modal */}
      {activeFacility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest max-w-3xl w-full rounded-2xl border border-outline-variant overflow-hidden shadow-2xl relative max-h-[95vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-outline-variant/60 bg-surface-container-low">
              <div className="flex items-center gap-2">
                <span className="bg-primary text-on-primary font-bold text-xs px-2.5 py-1 rounded">
                  {activeFacility.category}
                </span>
                <h3 className="font-headline-sm font-bold text-on-background">
                  {activeFacility.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveFacility(null)}
                className="w-9 h-9 rounded-lg border border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:bg-surface-container cursor-pointer transition"
              >
                <span className="material-symbols-outlined text-[22px]">close</span>
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative h-80 sm:h-96 w-full bg-black overflow-hidden flex items-center justify-center">
              <img
                src={customImages[activeFacility.id] || activeFacility.image}
                alt={activeFacility.title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Modal Description & Specs */}
            <div className="p-6 bg-surface-container-lowest space-y-4 overflow-y-auto">
              <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                {activeFacility.caption}
              </p>

              <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/40">
                <h4 className="font-label-lg font-bold text-primary mb-2 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">tune</span>
                  <span>Spesifikasi &amp; Fasilitas Ruangan:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeFacility.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-on-surface-variant">
                      <span className="material-symbols-outlined text-secondary text-[16px]">
                        check_circle
                      </span>
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer with Change Photo Option */}
            <div className="p-4 bg-surface-container-low border-t border-outline-variant/60 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const id = activeFacility.id;
                    setActiveFacility(null);
                    fileInputRefs.current[id]?.click();
                  }}
                  className="px-4 py-2 rounded-xl bg-primary text-white font-bold text-xs hover:bg-primary-container transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span className="material-symbols-outlined text-[16px]">add_a_photo</span>
                  <span>Ganti Foto Fasilitas Ini</span>
                </button>
                {customImages[activeFacility.id] && (
                  <button
                    type="button"
                    onClick={() => handleResetFacility(activeFacility.id)}
                    className="px-3 py-2 rounded-xl bg-error-container text-on-error-container font-bold text-xs hover:opacity-90 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[15px]">restart_alt</span>
                    <span>Reset Bawaan</span>
                  </button>
                )}
              </div>
              <button
                type="button"
                onClick={() => setActiveFacility(null)}
                className="px-5 py-2 rounded-lg bg-on-background text-surface-container-lowest font-bold text-sm hover:bg-on-surface transition cursor-pointer"
              >
                Tutup Pratinjau
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
