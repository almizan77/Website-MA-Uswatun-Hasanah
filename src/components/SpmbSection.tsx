import React, { useState } from 'react';
import {
  spmbTracks,
  spmbSteps,
  spmbSchedule,
  faqData,
  SpmbTrack,
} from '../data/schoolData';

interface SpmbSectionProps {
  onOpenSpmbRegister: () => void;
}

export const SpmbSection: React.FC<SpmbSectionProps> = ({
  onOpenSpmbRegister,
}) => {
  const [activeTab, setActiveTab] = useState<'jalur' | 'alur' | 'jadwal' | 'syarat' | 'faq'>(
    'jalur'
  );
  const [selectedTrack, setSelectedTrack] = useState<SpmbTrack | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  return (
    <section id="spmb" className="py-space-3xl bg-surface-container-lowest border-y border-outline-variant/50">
      <div className="max-w-container-max mx-auto px-gutter-desktop">
        {/* Header Seksi SPMB */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="bg-primary/10 text-primary font-label-md text-label-md px-3.5 py-1 rounded-full font-bold inline-block mb-3">
            SPMB 2026/2027
          </span>
          <h2 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-background font-extrabold tracking-tight">
            Penerimaan Murid Baru
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-3">
            Informasi lengkap seputar jalur seleksi, persyaratan berkas, alur pendaftaran, serta jadwal dan rincian biaya pendidikan di MA Uswatun Hasanah.
          </p>
        </div>

        {/* Interactive SPMB Navigation Tabs */}
        <div id="spmb-tabs" className="scroll-mt-24 mb-10">
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-surface-container-low rounded-2xl max-w-2xl mx-auto border border-outline-variant/60">
            <button
              type="button"
              onClick={() => setActiveTab('jalur')}
              className={`flex-1 py-3 px-4 rounded-xl font-label-md text-label-md font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'jalur'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">alt_route</span>
              <span>Jalur Pendaftaran</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('syarat')}
              className={`flex-1 py-3 px-4 rounded-xl font-label-md text-label-md font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'syarat'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">checklist</span>
              <span>Persyaratan</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('alur')}
              className={`flex-1 py-3 px-4 rounded-xl font-label-md text-label-md font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'alur'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">timeline</span>
              <span>Alur Seleksi</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('jadwal')}
              className={`flex-1 py-3 px-4 rounded-xl font-label-md text-label-md font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'jadwal'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              <span>Jadwal &amp; Biaya</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('faq')}
              className={`flex-1 py-3 px-4 rounded-xl font-label-md text-label-md font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === 'faq'
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">help</span>
              <span>FAQ</span>
            </button>
          </div>
        </div>

        {/* TAB CONTENT 1: JALUR PENDAFTARAN */}
        {activeTab === 'jalur' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {spmbTracks.map((track) => (
                <div
                  key={track.id}
                  className={`rounded-2xl p-6 border flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
                    track.isPopular
                      ? 'bg-surface-container-lowest border-2 border-primary shadow-md relative'
                      : 'bg-background border-outline-variant/60'
                  }`}
                >
                  {track.isPopular && (
                    <span className="absolute -top-3 right-6 bg-secondary text-on-secondary font-bold text-[11px] px-3 py-0.5 rounded-full shadow-xs">
                      Favorit Pendaftar
                    </span>
                  )}
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined text-[28px]">{track.icon}</span>
                    </div>
                    <span className="text-xs font-bold text-secondary uppercase tracking-wider block mb-1">
                      {track.badge}
                    </span>
                    <h3 className="font-headline-md text-xl font-bold text-on-background mb-2">
                      {track.name}
                    </h3>
                    <p className="font-body-sm text-sm text-on-surface-variant leading-relaxed mb-4">
                      {track.desc}
                    </p>

                    <div className="border-t border-outline-variant/30 pt-3">
                      <h4 className="text-xs font-bold text-on-background uppercase mb-2">
                        Keuntungan Utama:
                      </h4>
                      <ul className="space-y-1.5 text-xs text-on-surface">
                        {track.benefits.map((b, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="material-symbols-outlined text-primary text-[15px] shrink-0 mt-0.5">
                              check
                            </span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-outline-variant/40">
                    <button
                      type="button"
                      onClick={() => setSelectedTrack(track)}
                      className="w-full py-2.5 rounded-xl border border-primary text-primary font-bold text-xs hover:bg-primary hover:text-on-primary transition cursor-pointer"
                    >
                      Lihat Syarat Jalur Ini
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT 2: PERSYARATAN */}
        {activeTab === 'syarat' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in duration-300">
            {/* Syarat Umum */}
            <div className="bg-background rounded-2xl p-6 sm:p-8 border border-outline-variant/60 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">verified_user</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md font-bold text-on-background">
                    Persyaratan Umum Pendaftaran
                  </h3>
                  <span className="text-xs text-on-surface-variant">Kriteria kelayakan peserta didik baru</span>
                </div>
              </div>

              <ul className="space-y-3 font-body-md text-body-md text-on-surface">
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                  <span>Warga Negara Indonesia (WNI) beragama Islam dan berakhlak mulia.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                  <span>Peserta didik kelas IX atau telah lulus MTs / SMP / Sederajat (usia maksimal 17 tahun per 1 Juli 2026).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                  <span>Memiliki nilai rapor semester 1 s.d 5 dengan rata-rata akumulatif minimal 75,00.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                  <span>Mampu membaca Al-Qur’an dengan baik dan benar (bertajwid).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                  <span>Sehat jasmani dan rohani, bebas dari narkoba dan penyakit menular berat.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">check_circle</span>
                  <span>Bersedia menaati seluruh tata tertib dan peraturan madrasah.</span>
                </li>
              </ul>
            </div>

            {/* Berkas Administrasi yang Harus Disiapkan */}
            <div className="bg-background rounded-2xl p-6 sm:p-8 border border-outline-variant/60 shadow-xs">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">folder_copy</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md font-bold text-on-background">
                    Dokumen Berkas Pendaftaran
                  </h3>
                  <span className="text-xs text-on-surface-variant">Disiapkan dalam format digital (scan PDF/JPG)</span>
                </div>
              </div>

              <div className="space-y-3 font-body-md text-body-md text-on-surface">
                <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/40 flex items-center justify-between">
                  <span className="font-semibold">1. Kartu Keluarga (KK) &amp; Akta Kelahiran</span>
                  <span className="text-xs text-primary font-bold">Wajib</span>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/40 flex items-center justify-between">
                  <span className="font-semibold">2. Pindaian Rapor Semester 1 s.d 5 Dilegalisir</span>
                  <span className="text-xs text-primary font-bold">Wajib</span>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/40 flex items-center justify-between">
                  <span className="font-semibold">3. Kartu NISN Resmi dari Kemendikbud/Kemenag</span>
                  <span className="text-xs text-primary font-bold">Wajib</span>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/40 flex items-center justify-between">
                  <span className="font-semibold">4. Pas Foto Berwarna 3x4 (Latar Merah/Biru)</span>
                  <span className="text-xs text-primary font-bold">Wajib</span>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/40 flex items-center justify-between">
                  <span className="font-semibold">5. Sertifikat Juara / Syahadah Tahfidz</span>
                  <span className="text-xs text-secondary font-bold">Jalur Prestasi / Tahfidz</span>
                </div>
                <div className="p-3 bg-surface-container-low rounded-xl border border-outline-variant/40 flex items-center justify-between">
                  <span className="font-semibold">6. KIP / PKH / SKTM dari Kelurahan</span>
                  <span className="text-xs text-on-surface-variant font-bold">Jalur Afirmasi</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT 3: ALUR STEP-BY-STEP */}
        {activeTab === 'alur' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {spmbSteps.map((s) => (
                <div
                  key={s.step}
                  className="bg-background rounded-2xl p-6 border border-outline-variant/60 shadow-xs relative flex flex-col justify-between hover:border-primary/50 transition-all duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-10 h-10 rounded-full bg-primary text-on-primary font-extrabold text-base flex items-center justify-center shadow-xs">
                        {s.step}
                      </span>
                      <span className="text-xs font-semibold px-2.5 py-1 bg-surface-container-low text-on-surface-variant rounded-full border border-outline-variant/30">
                        {s.duration}
                      </span>
                    </div>

                    <h4 className="font-headline-sm text-headline-sm font-bold text-on-background mb-2">
                      {s.title}
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB CONTENT 4: JADWAL & KALENDER SPMB */}
        {activeTab === 'jadwal' && (
          <div className="bg-background rounded-2xl p-6 sm:p-8 border border-outline-variant/60 shadow-xs space-y-6 animate-in fade-in duration-300">
            <div>
              <h3 className="font-headline-lg text-headline-lg font-bold text-on-background">
                Kalender Pelaksanaan SPMB TP 2026/2027
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                Catat tanggal-tanggal penting seleksi untuk Gelombang 1 dan Gelombang 2.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-outline-variant/60 bg-surface-container-low text-on-surface font-bold">
                    <th className="py-3 px-4">Tahapan Kegiatan</th>
                    <th className="py-3 px-4 text-primary">Gelombang 1 (Utama)</th>
                    <th className="py-3 px-4 text-secondary">Gelombang 2 (Reguler)</th>
                    <th className="py-3 px-4">Keterangan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/40">
                  {spmbSchedule.map((item, idx) => (
                    <tr key={idx} className="hover:bg-surface-container-low/50 transition">
                      <td className="py-3.5 px-4 font-semibold text-on-background">{item.event}</td>
                      <td className="py-3.5 px-4 font-bold text-primary">{item.wave1}</td>
                      <td className="py-3.5 px-4 font-semibold text-secondary">{item.wave2}</td>
                      <td className="py-3.5 px-4 text-xs text-on-surface-variant">{item.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase text-primary tracking-wide">Info Biaya Formulir:</span>
                <p className="text-sm font-semibold text-on-surface">Pendaftaran Formulir Akun Online Bebas Biaya (GRATIS Rp 0).</p>
              </div>
              <button
                type="button"
                onClick={onOpenSpmbRegister}
                className="px-5 py-2.5 rounded-lg bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition shrink-0 cursor-pointer"
              >
                Daftar Akun Online
              </button>
            </div>
          </div>
        )}

        {/* TAB CONTENT 5: FAQ SPMB */}
        {activeTab === 'faq' && (
          <div className="bg-background rounded-2xl p-6 sm:p-8 border border-outline-variant/60 shadow-xs space-y-4 animate-in fade-in duration-300 max-w-3xl mx-auto">
            <h3 className="font-headline-lg text-headline-lg font-bold text-on-background mb-4 text-center">
              Pertanyaan yang Sering Diajukan (FAQ SPMB)
            </h3>
            {faqData.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-outline-variant/50 overflow-hidden bg-surface-container-lowest"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left p-4.5 font-bold text-on-background flex items-center justify-between gap-4 hover:bg-surface-container-low transition cursor-pointer text-sm sm:text-base"
                  >
                    <span>{faq.question}</span>
                    <span className="material-symbols-outlined text-[20px] text-primary shrink-0">
                      {isOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4.5 pb-4 pt-1 font-body-md text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/30 bg-surface-container-low/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* End of SPMB Tab Contents */}
      </div>

      {/* Modal Track Detail */}
      {selectedTrack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-on-background/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest max-w-lg w-full rounded-2xl border border-outline-variant p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-outline-variant/60">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-primary text-[28px]">
                  {selectedTrack.icon}
                </span>
                <div>
                  <span className="text-xs font-bold text-secondary">{selectedTrack.badge}</span>
                  <h3 className="font-headline-sm font-bold text-on-background">
                    {selectedTrack.name}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTrack(null)}
                className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="font-body-md text-body-md text-on-surface leading-relaxed mb-4">
              {selectedTrack.desc}
            </p>

            <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/40 space-y-2 mb-6">
              <h4 className="font-bold text-sm text-primary">Syarat Khusus Jalur Ini:</h4>
              <ul className="space-y-1.5 text-xs text-on-surface-variant">
                {selectedTrack.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="material-symbols-outlined text-primary text-[15px] shrink-0 mt-0.5">
                      check_circle
                    </span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedTrack(null);
                  onOpenSpmbRegister();
                }}
                className="flex-1 py-3 bg-primary text-on-primary font-bold text-sm rounded-xl hover:bg-primary-container transition cursor-pointer"
              >
                Daftar Jalur Ini
              </button>
              <button
                type="button"
                onClick={() => setSelectedTrack(null)}
                className="py-3 px-5 border border-outline-variant text-on-surface font-semibold text-sm rounded-xl hover:bg-surface-container cursor-pointer"
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
