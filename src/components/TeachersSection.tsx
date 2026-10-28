import React, { useState, useMemo, useEffect, useRef } from 'react';
import { teachersData, TeacherItem, schoolInfo } from '../data/schoolData';
import { getNamedImage, saveNamedImage, resetNamedImage } from '../utils/imageStorage';

interface TeachersSectionProps {
  onOpenSpmbRegister?: () => void;
}

export const TeachersSection: React.FC<TeachersSectionProps> = ({ onOpenSpmbRegister }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherItem | null>(null);
  const [customPhotos, setCustomPhotos] = useState<Record<string, string>>({});
  const [toastNotice, setToastNotice] = useState<string | null>(null);
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    teachersData.forEach((teacher) => {
      const storageKey = `teacher_photo_${teacher.id}`;
      getNamedImage(storageKey).then((stored) => {
        if (stored) {
          setCustomPhotos((prev) => ({ ...prev, [teacher.id]: stored }));
        }
      });
    });
  }, []);

  const handleUploadPhoto = async (teacherId: string, file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Mohon pilih file gambar (JPG / PNG / WEBP).');
      return;
    }
    const t = teachersData.find((x) => x.id === teacherId);
    const storageKey = `teacher_photo_${teacherId}`;
    try {
      const url = await saveNamedImage(storageKey, file);
      setCustomPhotos((prev) => ({ ...prev, [teacherId]: url }));
      setToastNotice(`Foto ${t?.name || 'Guru'} berhasil diperbarui!`);
      setTimeout(() => setToastNotice(null), 3500);
    } catch (err) {
      console.error('Gagal menyimpan foto guru:', err);
    }
  };

  const handleResetPhoto = async (teacherId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const storageKey = `teacher_photo_${teacherId}`;
    await resetNamedImage(storageKey);
    setCustomPhotos((prev) => {
      const next = { ...prev };
      delete next[teacherId];
      return next;
    });
    setToastNotice('Foto guru dikembalikan ke bawaan.');
    setTimeout(() => setToastNotice(null), 3000);
  };

  const categories = [
    { id: 'semua', label: 'Semua Dewan Guru', icon: 'groups' },
    { id: 'pimpinan', label: 'Pimpinan Madrasah', icon: 'military_tech' },
    { id: 'pai', label: 'Rumpun PAI & Tahfidz', icon: 'menu_book' },
    { id: 'mipa', label: 'Rumpun MIPA & Sains', icon: 'science' },
    { id: 'ips', label: 'Rumpun IPS & Humaniora', icon: 'public' },
    { id: 'bahasa', label: 'Rumpun Bahasa', icon: 'translate' },
    { id: 'umum', label: 'BK & Umum', icon: 'psychology' },
  ];

  const filteredTeachers = useMemo(() => {
    return teachersData.filter((teacher) => {
      const matchCategory =
        selectedCategory === 'semua' || teacher.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchCategory;

      const matchName = teacher.name.toLowerCase().includes(query);
      const matchPosition = teacher.position.toLowerCase().includes(query);
      const matchSubjects = teacher.subjects.some((s) => s.toLowerCase().includes(query));
      const matchEducation = teacher.education.toLowerCase().includes(query);

      return matchCategory && (matchName || matchPosition || matchSubjects || matchEducation);
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div id="guru" className="py-6 sm:py-space-2xl md:py-space-3xl bg-background">
      <div className="max-w-container-max mx-auto px-4 sm:px-gutter-desktop">
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

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-12">
          <span className="bg-primary/10 text-primary font-label-md text-xs sm:text-label-md px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-full font-bold inline-block mb-2 sm:mb-3">
            TENAGA PENDIDIK &amp; KEPENDIDIKAN
          </span>
          <h2 className="font-headline-xl text-xl sm:text-3xl md:text-4xl font-extrabold text-on-background tracking-tight">
            Dewan Guru &amp; Tenaga Pendidik
          </h2>
          <p className="font-body-md text-xs sm:text-base text-on-surface-variant mt-2 sm:mt-3 leading-relaxed">
            Mengenal para asatidz dan guru pembimbing yang berdedikasi tinggi, berpendidikan S1/S2 lulusan perguruan tinggi terkemuka dalam negeri dan Timur Tengah, siap membimbing siswa dan siswi berakhlak karimah dan berprestasi unggul.
          </p>
        </div>

        {/* Quick Statistics Bar - Optimized for Mobile HP & Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4 mb-6 sm:mb-10 max-w-3xl mx-auto">
          <div className="bg-surface-container-lowest p-3 sm:p-4 rounded-xl border border-outline-variant/60 flex items-center gap-2.5 sm:gap-3 shadow-xs min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px] sm:text-[22px]">badge</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-base sm:text-xl font-bold text-on-background truncate">19</div>
              <div className="text-[11px] sm:text-xs text-on-surface-variant truncate">Dewan Pendidik</div>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-3 sm:p-4 rounded-xl border border-outline-variant/60 flex items-center gap-2.5 sm:gap-3 shadow-xs min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px] sm:text-[22px]">school</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-base sm:text-xl font-bold text-on-background truncate">100%</div>
              <div className="text-[11px] sm:text-xs text-on-surface-variant truncate">Sarjana S1 &amp; S2</div>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-3 sm:p-4 rounded-xl border border-outline-variant/60 flex items-center gap-2.5 sm:gap-3 shadow-xs min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px] sm:text-[22px]">verified</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs sm:text-base lg:text-xl font-bold text-on-background leading-tight truncate" title="Bersertifikat">
                Bersertifikat
              </div>
              <div className="text-[10px] sm:text-xs text-on-surface-variant truncate">
                Pendidik Profesional
              </div>
            </div>
          </div>
        </div>

        {/* Filter Controls: Search & Category Pills */}
        <div className="bg-surface-container-lowest p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border border-outline-variant/60 shadow-xs mb-6 sm:mb-8 space-y-3 sm:space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 sm:gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] sm:text-[20px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama guru, jabatan, atau mata pelajaran..."
                className="w-full pl-9 sm:pl-10 pr-9 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-outline-variant/70 bg-background text-on-background text-xs sm:text-sm placeholder:text-on-surface-variant/70 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-background text-xs cursor-pointer p-1"
                  title="Hapus pencarian"
                >
                  <span className="material-symbols-outlined text-[16px] sm:text-[18px]">cancel</span>
                </button>
              )}
            </div>

            {/* Total Results Indicator */}
            <div className="text-[11px] sm:text-xs text-on-surface-variant font-medium shrink-0 flex items-center justify-between md:justify-start gap-1.5 self-auto md:self-center">
              <span>Menampilkan:</span>
              <span className="font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                {filteredTeachers.length} Guru
              </span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-thin">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all duration-150 cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    isActive
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-container text-on-surface-variant hover:text-on-background hover:bg-surface-container-high'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px] sm:text-[16px]">
                    {cat.icon}
                  </span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Teachers Grid */}
        {filteredTeachers.length === 0 ? (
          <div className="text-center py-12 sm:py-16 bg-surface-container-lowest rounded-xl sm:rounded-2xl border border-outline-variant/60 px-4">
            <span className="material-symbols-outlined text-4xl sm:text-5xl text-on-surface-variant/40 mb-2 sm:mb-3">
              person_search
            </span>
            <h3 className="text-base sm:text-lg font-bold text-on-background">Tidak Ditemukan Guru</h3>
            <p className="text-xs sm:text-sm text-on-surface-variant mt-1 max-w-md mx-auto">
              Tidak ada data guru yang cocok dengan kata kunci &ldquo;{searchQuery}&rdquo;. Silakan coba kata kunci lain atau pilih rumpun mata pelajaran lainnya.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('semua');
              }}
              className="mt-4 px-3.5 py-1.5 sm:px-4 sm:py-2 bg-primary text-on-primary rounded-lg text-xs font-semibold cursor-pointer hover:bg-primary/90 transition"
            >
              Reset Pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredTeachers.map((teacher) => {
              const currentPhoto = customPhotos[teacher.id] || teacher.photo;
              const isCustom = Boolean(customPhotos[teacher.id]);

              return (
                <div
                  key={teacher.id}
                  onClick={() => setSelectedTeacher(teacher)}
                  className="bg-surface-container-lowest rounded-xl sm:rounded-2xl border border-outline-variant/60 overflow-hidden flex flex-col justify-between hover:shadow-xl hover:border-primary/60 transition-all duration-200 group cursor-pointer active:scale-[0.99] relative"
                >
                  {/* Hidden File Input */}
                  <input
                    ref={(el) => (fileInputRefs.current[teacher.id] = el)}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleUploadPhoto(teacher.id, e.target.files[0]);
                      }
                    }}
                  />

                  <div>
                    {/* Photo Container */}
                    <div className="relative aspect-4/3 sm:aspect-square w-full bg-surface-container overflow-hidden">
                      <img
                        src={currentPhoto}
                        alt={teacher.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        style={{ objectPosition: teacher.photoPosition || 'center 20%' }}
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&auto=format&fit=crop&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                      {/* Badge Category Tag */}
                      <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 flex items-center gap-1">
                        <span className="bg-surface-container-lowest/90 backdrop-blur-sm text-primary font-bold text-[10px] sm:text-[11px] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md shadow-xs flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px] sm:text-[14px]">school</span>
                          {teacher.categoryLabel}
                        </span>
                        {isCustom && (
                          <span className="bg-emerald-600/90 text-white font-bold text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded shadow-xs">
                            Foto Asli
                          </span>
                        )}
                      </div>

                      {/* Tombol Ganti Foto (Top Right) */}
                      <div
                        className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-20 flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => fileInputRefs.current[teacher.id]?.click()}
                          className="px-2 py-1 rounded-md bg-black/70 hover:bg-primary text-white text-[10px] sm:text-[11px] font-bold backdrop-blur-md border border-white/20 transition-all flex items-center gap-1 shadow-md hover:scale-105 cursor-pointer"
                          title={`Ganti foto untuk ${teacher.name}`}
                        >
                          <span className="material-symbols-outlined text-[13px] sm:text-[14px]">photo_camera</span>
                          <span className="hidden xs:inline">Ganti Foto</span>
                        </button>
                        {isCustom && (
                          <button
                            type="button"
                            onClick={(e) => handleResetPhoto(teacher.id, e)}
                            className="p-1 rounded-md bg-black/70 hover:bg-red-700 text-white text-[10px] transition cursor-pointer"
                            title="Reset ke foto awal"
                          >
                            <span className="material-symbols-outlined text-[13px]">refresh</span>
                          </button>
                        )}
                      </div>

                      {/* Quick Info on image bottom */}
                      <div className="absolute bottom-2 left-2.5 right-2.5 sm:bottom-2.5 sm:left-3 sm:right-3 text-white z-10">
                        <div className="text-[10px] sm:text-[11px] font-medium text-white/90 truncate flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px] sm:text-[13px]">history_edu</span>
                          <span>{teacher.experience || 'Pendidik Berpengalaman'}</span>
                        </div>
                      </div>
                    </div>

                  {/* Info Body */}
                  <div className="p-4 sm:p-5">
                    {/* Name */}
                    <h3 className="font-headline-sm text-sm sm:text-base font-bold text-on-background group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {teacher.name}
                    </h3>

                    {/* Jabatan (Position) */}
                    <div className="mt-1.5 sm:mt-2 inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-secondary-container/40 text-on-secondary-container text-[11px] sm:text-xs font-semibold border border-secondary-container/60">
                      <span className="material-symbols-outlined text-[13px] sm:text-[14px] text-primary">
                        assignment_ind
                      </span>
                      <span className="line-clamp-1">{teacher.position}</span>
                    </div>

                    {/* Mata Pelajaran / Matakuliah yang Diampu */}
                    <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-outline-variant/40">
                      <div className="text-[10px] sm:text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1.5 sm:mb-2 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[13px] sm:text-[14px] text-primary">
                          menu_book
                        </span>
                        <span>Mata Pelajaran Diampu:</span>
                      </div>
                      <div className="flex flex-wrap gap-1 sm:gap-1.5">
                        {teacher.subjects.map((sub, idx) => (
                          <span
                            key={idx}
                            className="bg-primary/10 text-primary font-medium text-[11px] sm:text-xs px-2 py-0.5 rounded-md leading-tight border border-primary/15"
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

        {/* Bottom Banner for Prospective Students / Consultation */}
        <div className="mt-10 sm:mt-14 p-4 sm:p-8 rounded-xl sm:rounded-2xl bg-surface-container-lowest border border-outline-variant/60 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto">
            <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
              <span className="material-symbols-outlined text-[24px] sm:text-[32px]">support_agent</span>
            </div>
            <div>
              <h3 className="font-headline-sm text-base sm:text-xl font-bold text-on-background">
                Konsultasi Peminatan Belajar &amp; Program SPMB
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-0.5 sm:mt-1 max-w-xl">
                Ingin berkonsultasi mengenai peminatan kelas MIPA, IPS, atau Keagamaan dengan tim guru kami? Hubungi layanan konsultasi madrasah melalui WhatsApp resmi.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 shrink-0 w-full md:w-auto">
            <a
              href={`https://wa.me/${schoolInfo.whatsappClean}?text=${encodeURIComponent(
                'Assalamu’alaikum Warahmatullahi Wabarakatuh. Saya ingin berkonsultasi mengenai dewan guru dan program peminatan di MA Uswatun Hasanah.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-primary text-on-primary text-xs sm:text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition shadow-xs text-center"
            >
              <span className="material-symbols-outlined text-[16px] sm:text-[18px]">chat</span>
              <span>Tanya Dewan Guru</span>
            </a>

            {onOpenSpmbRegister && (
              <button
                type="button"
                onClick={onOpenSpmbRegister}
                className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-primary text-primary hover:bg-primary/10 text-xs sm:text-sm font-bold transition cursor-pointer text-center"
              >
                Daftar SPMB
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal Detail Guru */}
      {selectedTeacher && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setSelectedTeacher(null)}
        >
          <div
            className="bg-surface-container-lowest max-w-2xl w-full rounded-xl sm:rounded-2xl border border-outline-variant/60 shadow-2xl overflow-hidden my-4 sm:my-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="bg-primary text-on-primary p-3.5 sm:p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] sm:text-[24px]">school</span>
                <span className="font-bold text-xs sm:text-base">Profil &amp; Biodata Pendidik</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTeacher(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition cursor-pointer"
                title="Tutup"
              >
                <span className="material-symbols-outlined text-[18px] sm:text-[20px]">close</span>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 max-h-[80vh] overflow-y-auto">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
                {/* Large Photo with Ganti Foto */}
                <div className="relative group/modalphoto w-28 h-28 sm:w-40 sm:h-40 rounded-xl sm:rounded-2xl overflow-hidden bg-surface-container shrink-0 border border-outline-variant/60 shadow-md">
                  <img
                    src={customPhotos[selectedTeacher.id] || selectedTeacher.photo}
                    alt={selectedTeacher.name}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: selectedTeacher.photoPosition || 'center 20%' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&auto=format&fit=crop&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/modalphoto:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-2">
                    <button
                      type="button"
                      onClick={() => {
                        const id = selectedTeacher.id;
                        fileInputRefs.current[id]?.click();
                      }}
                      className="px-2.5 py-1 rounded-lg bg-primary text-white text-[11px] font-bold shadow-md hover:scale-105 transition flex items-center gap-1 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px]">photo_camera</span>
                      <span>Ganti Foto</span>
                    </button>
                  </div>
                </div>

                {/* Main Identification */}
                <div className="flex-1 text-center sm:text-left">
                  <span className="bg-primary/10 text-primary font-bold text-[10px] sm:text-xs px-2.5 py-0.5 sm:py-1 rounded-md inline-block mb-1.5 sm:mb-2">
                    {selectedTeacher.categoryLabel}
                  </span>
                  <h3 className="text-base sm:text-2xl font-extrabold text-on-background leading-snug">
                    {selectedTeacher.name}
                  </h3>
                  {selectedTeacher.nip && (
                    <div className="text-[11px] sm:text-xs text-on-surface-variant font-mono mt-1">
                      NIP: {selectedTeacher.nip}
                    </div>
                  )}
                  <div className="mt-1.5 sm:mt-2 inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-lg bg-secondary-container/50 text-on-secondary-container text-xs sm:text-sm font-semibold border border-secondary-container">
                    <span className="material-symbols-outlined text-[14px] sm:text-[16px] text-primary">
                      assignment_ind
                    </span>
                    <span>{selectedTeacher.position}</span>
                  </div>

                  {selectedTeacher.experience && (
                    <div className="text-[11px] sm:text-xs text-on-surface-variant mt-1.5 sm:mt-2 flex items-center justify-center sm:justify-start gap-1">
                      <span className="material-symbols-outlined text-[14px] sm:text-[15px] text-primary">
                        schedule
                      </span>
                      <span>Pengalaman: {selectedTeacher.experience}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Mata Pelajaran yang Diampu */}
              <div className="p-3.5 sm:p-4 rounded-xl bg-surface-container/40 border border-outline-variant/50">
                <div className="text-[11px] sm:text-xs font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px] sm:text-[16px]">menu_book</span>
                  <span>Mata Pelajaran / Matakuliah yang Diampu:</span>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-1">
                  {selectedTeacher.subjects.map((sub, idx) => (
                    <span
                      key={idx}
                      className="bg-primary text-on-primary text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-md sm:rounded-lg shadow-xs"
                    >
                      {sub}
                    </span>
                  ))}
                </div>
              </div>

              {/* Biodata & Riwayat Hidup (TTL & Alamat) jika tersedia */}
              {(selectedTeacher.birthPlaceDate || selectedTeacher.address) && (
                <div className="p-3.5 sm:p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/60">
                  <div className="text-[11px] sm:text-xs font-bold text-primary uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[15px] sm:text-[16px]">badge</span>
                    <span>Biodata &amp; Riwayat Hidup:</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                    {selectedTeacher.birthPlaceDate && (
                      <div className="p-2.5 rounded-lg bg-surface-container-low/60 border border-outline-variant/40">
                        <span className="text-[10px] sm:text-xs text-on-surface-variant font-semibold block mb-0.5">
                          Tempat, Tanggal Lahir (TTL):
                        </span>
                        <span className="font-bold text-on-background">
                          {selectedTeacher.birthPlaceDate}
                        </span>
                      </div>
                    )}
                    {selectedTeacher.address && (
                      <div className="p-2.5 rounded-lg bg-surface-container-low/60 border border-outline-variant/40">
                        <span className="text-[10px] sm:text-xs text-on-surface-variant font-semibold block mb-0.5">
                          Alamat Domisili:
                        </span>
                        <span className="font-bold text-on-background">
                          {selectedTeacher.address}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Riwayat Pendidikan & Sertifikasi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3.5 sm:p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/60">
                  <div className="text-[11px] sm:text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5 sm:mb-2 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[15px] sm:text-[16px] text-primary">
                      account_balance
                    </span>
                    <span>Riwayat Pendidikan:</span>
                  </div>
                  <p className="text-xs sm:text-sm text-on-background leading-relaxed">
                    {selectedTeacher.education}
                  </p>
                </div>

                {selectedTeacher.certifications && selectedTeacher.certifications.length > 0 && (
                  <div className="p-3.5 sm:p-4 rounded-xl bg-surface-container-lowest border border-outline-variant/60">
                    <div className="text-[11px] sm:text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-1.5 sm:mb-2 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[15px] sm:text-[16px] text-primary">
                    verified
                  </span>
                  <span>Sertifikasi &amp; Kompetensi:</span>
                </div>
                <ul className="space-y-1">
                  {selectedTeacher.certifications.map((cert, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-on-surface-variant flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Kutipan Guru / Motto */}
          {selectedTeacher.quote && (
            <div className="p-3 sm:p-4 rounded-xl bg-primary/5 border border-primary/20 italic text-xs sm:text-sm text-on-background flex items-start gap-2">
              <span className="material-symbols-outlined text-[18px] sm:text-[20px] text-primary shrink-0">
                format_quote
              </span>
              <span>&ldquo;{selectedTeacher.quote}&rdquo;</span>
            </div>
          )}

          {/* Email Kontak */}
          {selectedTeacher.email && (
            <div className="text-xs text-on-surface-variant flex items-center gap-1.5 justify-center sm:justify-start">
              <span className="material-symbols-outlined text-[15px] sm:text-[16px] text-primary">mail</span>
              <span>Email Akademik:</span>
              <a
                href={`mailto:${selectedTeacher.email}`}
                className="text-primary hover:underline font-medium"
              >
                {selectedTeacher.email}
              </a>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 bg-surface-container/50 border-t border-outline-variant/60 flex items-center justify-end">
          <button
            type="button"
            onClick={() => setSelectedTeacher(null)}
            className="w-full sm:w-auto px-5 py-2 rounded-lg sm:rounded-xl bg-primary text-on-primary text-xs sm:text-sm font-semibold hover:bg-primary/90 transition cursor-pointer text-center"
          >
            Tutup Biodata
          </button>
        </div>
      </div>
    </div>
  )}
    </div>
  );
};
