import React, { useState, useRef } from 'react';
import { alumniData } from '../data/schoolData';

export const AlumniSection: React.FC = () => {
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('alumni_custom_photos');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [activeAlumniId, setActiveAlumniId] = useState<string | null>(null);
  const [inputUrl, setInputUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSavePhoto = (id: string, url: string) => {
    if (!url.trim()) return;
    const updated = { ...customPhotos, [id]: url };
    setCustomPhotos(updated);
    try {
      localStorage.setItem('alumni_custom_photos', JSON.stringify(updated));
    } catch {
      // quota or storage error handling
    }
    setActiveAlumniId(null);
    setInputUrl('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeAlumniId) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          handleSavePhoto(activeAlumniId, event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPhoto = (id: string) => {
    const updated = { ...customPhotos };
    delete updated[id];
    setCustomPhotos(updated);
    try {
      localStorage.setItem('alumni_custom_photos', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setActiveAlumniId(null);
  };

  const activeAlumni = alumniData.find((a) => a.id === activeAlumniId);

  return (
    <section className="py-space-3xl bg-surface-container-lowest border-y border-outline-variant/40">
      <div className="max-w-container-max mx-auto px-gutter-desktop">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md px-3.5 py-1 rounded-full font-bold inline-block mb-3">
            KARYA &amp; KIPRAH LULUSAN
          </span>
          <h2 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-background font-extrabold tracking-tight">
            Jejak Alumni MA Uswatun Hasanah
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-3">
            Lulusan kami tersebar di berbagai perguruan tinggi terkemuka di dalam negeri, serta berkiprah di bidang Medis, Akademisi, dan keilmuan Islam.
          </p>
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* Alumni Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {alumniData.map((alumni) => {
            const photoSrc = customPhotos[alumni.id] || alumni.photo;
            return (
              <div
                key={alumni.id}
                className="bg-background rounded-2xl border border-outline-variant/60 p-6 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1 relative"
              >
                <div>
                  {/* Photo Container with Ganti Foto Trigger */}
                  <div className="relative w-24 h-24 mx-auto mb-4 group/photo">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/30 p-1 group-hover/photo:border-primary transition-colors bg-surface shadow-xs">
                      <img
                        src={photoSrc}
                        alt={alumni.name}
                        style={{
                          objectPosition: alumni.photoPosition || 'center',
                          transform: `scale(${alumni.photoScale || 1})`,
                        }}
                        className="w-full h-full object-cover rounded-full transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.includes('aida-public')) {
                            target.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBI9aP0AZxrzPw7xsOZPz9t5Su9Elm7--UhX0-qq1f6VfptUBmP7C6u6s0U3OpJ3PcOfTNcZ5zWZrcgmQtpqzqSywATcgeI_k5X2hRAKYViX-LBtXc-kPAa-OwW-fWv1m7DbMe6eBajUJ3GenRe0UScn-6KU55Rnv1LYvBrwddmy2uLgAyDi5o3Sv_Prv1_cCSx_CGUQsEDNjxMXLoEM7IFUYaXRAGSw5r6ZngC8kD5m5vxd3Cgcrks';
                          }
                        }}
                      />
                    </div>

                    {/* Tombol Ganti Foto (Icon camera overlay di pojok foto) */}
                    <button
                      type="button"
                      onClick={() => {
                        setActiveAlumniId(alumni.id);
                        setInputUrl('');
                      }}
                      className="absolute bottom-0 right-0 bg-primary text-on-primary hover:bg-primary/90 p-2 rounded-full shadow-lg border-2 border-background transition-transform transform hover:scale-110 cursor-pointer flex items-center justify-center"
                      title="Ganti Foto Alumni Ini"
                    >
                      <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                    </button>
                  </div>

                  <div className="text-center">
                    <span className="text-[11px] font-bold text-secondary-fixed-dim uppercase tracking-wider block mb-1">
                      {alumni.graduationYear}
                    </span>
                    <h3 className="font-headline-sm text-base font-bold text-on-background line-clamp-1">
                      {alumni.name}
                    </h3>
                    <p className="text-xs font-semibold text-primary mt-0.5">
                      {alumni.currentRole}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-outline-variant/40 text-center">
                    <span className="text-xs font-bold text-on-surface block">
                      {alumni.institution}
                    </span>
                    {alumni.major && (
                      <span className="text-[11px] text-on-surface-variant block mt-0.5">
                        {alumni.major}
                      </span>
                    )}
                  </div>
                </div>

                <blockquote className="mt-4 pt-3 border-t border-outline-variant/30 text-xs italic text-on-surface-variant text-center leading-relaxed">
                  "{alumni.quote}"
                </blockquote>

                {/* Text trigger tombol ganti foto di bawah kartu untuk kemudahan akses */}
                <div className="mt-3 pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveAlumniId(alumni.id);
                      setInputUrl('');
                    }}
                    className="text-[11px] font-medium text-primary hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">edit</span>
                    <span>Ganti Foto</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal Dialog Ganti Foto Alumni */}
      {activeAlumniId && activeAlumni && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest rounded-2xl max-w-md w-full border border-outline-variant shadow-2xl p-6 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
              <div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-background flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[22px]">photo_camera</span>
                  <span>Ganti Foto Alumni</span>
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  Untuk: <strong>{activeAlumni.name}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveAlumniId(null)}
                className="text-on-surface-variant hover:text-on-background p-1 rounded-lg hover:bg-surface-container transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Preview foto saat ini */}
            <div className="flex items-center justify-center">
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-primary/40 p-1 shadow-md">
                <img
                  src={customPhotos[activeAlumni.id] || activeAlumni.photo}
                  alt={activeAlumni.name}
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('aida-public')) {
                      target.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBI9aP0AZxrzPw7xsOZPz9t5Su9Elm7--UhX0-qq1f6VfptUBmP7C6u6s0U3OpJ3PcOfTNcZ5zWZrcgmQtpqzqSywATcgeI_k5X2hRAKYViX-LBtXc-kPAa-OwW-fWv1m7DbMe6eBajUJ3GenRe0UScn-6KU55Rnv1LYvBrwddmy2uLgAyDi5o3Sv_Prv1_cCSx_CGUQsEDNjxMXLoEM7IFUYaXRAGSw5r6ZngC8kD5m5vxd3Cgcrks';
                    }
                  }}
                />
              </div>
            </div>

            {/* Opsi 1: Upload langsung dari HP / Laptop */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                Opsi 1: Unggah Dari Komputer / HP
              </label>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-3 px-4 border-2 border-dashed border-primary/40 hover:border-primary bg-primary/5 hover:bg-primary/10 rounded-xl text-primary font-medium text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[22px]">upload_file</span>
                <span>Pilih Foto dari Galeri / File</span>
              </button>
            </div>

            {/* Opsi 2: Link URL Foto */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-on-surface-variant uppercase tracking-wider block">
                Opsi 2: Masukkan Link / URL Foto
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/foto-alumni.jpg"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-on-surface text-sm focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => handleSavePhoto(activeAlumni.id, inputUrl)}
                  disabled={!inputUrl.trim()}
                  className="px-4 py-2.5 bg-primary text-on-primary rounded-xl font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors shrink-0 cursor-pointer"
                >
                  Terapkan
                </button>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-outline-variant">
              {customPhotos[activeAlumni.id] ? (
                <button
                  type="button"
                  onClick={() => handleResetPhoto(activeAlumni.id)}
                  className="text-xs text-error hover:underline flex items-center gap-1 cursor-pointer font-medium"
                >
                  <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                  Kembalikan ke Asli
                </button>
              ) : (
                <span />
              )}
              <button
                type="button"
                onClick={() => setActiveAlumniId(null)}
                className="px-4 py-2 bg-surface-container text-on-surface hover:bg-surface-container-high rounded-xl text-sm font-medium transition-colors cursor-pointer"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

