import React, { useState } from 'react';
import { spmbTracks } from '../data/schoolData';
import { SpmbRegistrationRecord } from '../types';

interface SpmbRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (regData: SpmbRegistrationRecord) => void;
  googleFormUrl?: string;
}

const DEFAULT_GOOGLE_FORM = 'https://docs.google.com/forms/d/1lQ3_QHZ2r-XINMfAgpLCwgXwaCQ6pAyEmivue2pUozU/viewform';

export const SpmbRegisterModal: React.FC<SpmbRegisterModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  googleFormUrl = DEFAULT_GOOGLE_FORM,
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    track: 'reguler',
    major: 'MIPA',
    studentName: '',
    nisn: '',
    nik: '',
    gender: 'Laki-laki',
    birthPlace: 'Semarang',
    birthDate: '2010-05-14',
    schoolOrigin: '',
    parentName: '',
    phone: '',
    email: '',
    address: '',
    memorizationJuz: '3',
    raportAverage: '85',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate Registration Number
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const regNumber = `SPMB-2026-${randomSuffix}`;
    const selectedTrackObj = spmbTracks.find((t) => t.id === formData.track);

    const submission: SpmbRegistrationRecord = {
      regNumber,
      studentName: formData.studentName || 'Calon Siswa MAUH',
      track: selectedTrackObj?.name || 'Jalur Reguler',
      major: formData.major,
      gender: formData.gender,
      nisn: formData.nisn,
      nik: formData.nik,
      birthPlace: formData.birthPlace,
      birthDate: formData.birthDate,
      schoolOrigin: formData.schoolOrigin,
      parentName: formData.parentName,
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
      memorizationJuz: formData.memorizationJuz,
      raportAverage: formData.raportAverage,
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      time: new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    // Save to local storage for persistent status lookup
    try {
      const existing = JSON.parse(localStorage.getItem('mauh_spmb_registrations') || '[]');
      existing.unshift(submission);
      localStorage.setItem('mauh_spmb_registrations', JSON.stringify(existing));
    } catch {
      // ignore
    }

    onSuccess(submission);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-on-background/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest max-w-2xl w-full rounded-2xl border border-outline-variant shadow-2xl relative max-h-[95vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-outline-variant/60 bg-surface-container-low flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold shadow-sm">
              <span className="material-symbols-outlined text-[24px]">how_to_reg</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-secondary uppercase tracking-wide">
                FORMULIR ONLINE 2026/2027
              </span>
              <h3 className="font-headline-sm font-bold text-on-background">
                Pendaftaran Murid Baru (SPMB)
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-lg border border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:bg-surface-container cursor-pointer transition"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        {/* Google Form Link Banner */}
        <div className="bg-emerald-50 border-b border-emerald-200 px-5 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-emerald-950">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-700 text-[20px] shrink-0">assignment</span>
            <div>
              <span className="font-bold">Formulir Google Form:</span>{' '}
              <span className="text-emerald-800">Tersedia juga pengisian via Google Docs Form resmi.</span>
            </div>
          </div>
          <a
            href={googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-semibold transition shrink-0 shadow-sm"
          >
            <span>Buka Google Form</span>
            <span className="material-symbols-outlined text-[15px]">open_in_new</span>
          </a>
        </div>

        {/* Progress Steps Indicator */}
        <div className="px-6 py-3 bg-surface-container-lowest border-b border-outline-variant/40 flex items-center justify-between text-xs font-semibold">
          <button
            type="button"
            onClick={() => setStep(1)}
            className={`flex items-center gap-1.5 ${step === 1 ? 'text-primary font-bold' : 'text-on-surface-variant'}`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 1 ? 'bg-primary text-on-primary' : 'bg-surface-container-high'}`}>
              1
            </span>
            <span>Jalur &amp; Peminatan</span>
          </button>
          <span className="text-outline-variant">→</span>
          <button
            type="button"
            onClick={() => setStep(2)}
            className={`flex items-center gap-1.5 ${step === 2 ? 'text-primary font-bold' : 'text-on-surface-variant'}`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 2 ? 'bg-primary text-on-primary' : 'bg-surface-container-high'}`}>
              2
            </span>
            <span>Biodata Siswa</span>
          </button>
          <span className="text-outline-variant">→</span>
          <button
            type="button"
            onClick={() => setStep(3)}
            className={`flex items-center gap-1.5 ${step === 3 ? 'text-primary font-bold' : 'text-on-surface-variant'}`}
          >
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step === 3 ? 'bg-primary text-on-primary' : 'bg-surface-container-high'}`}>
              3
            </span>
            <span>Data Orang Tua &amp; Nilai</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* STEP 1: JALUR & JURUSAN */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-bold text-on-surface uppercase tracking-wide mb-2">
                  Pilih Jalur Masuk SPMB *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {spmbTracks.map((t) => (
                    <label
                      key={t.id}
                      className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition ${
                        formData.track === t.id
                          ? 'border-primary bg-primary/5 ring-1 ring-primary'
                          : 'border-outline-variant hover:bg-surface-container-low'
                      }`}
                    >
                      <input
                        type="radio"
                        name="track"
                        value={t.id}
                        checked={formData.track === t.id}
                        onChange={(e) => setFormData({ ...formData, track: e.target.value })}
                        className="mt-1 accent-primary"
                      />
                      <div>
                        <div className="text-sm font-bold text-on-background">{t.name}</div>
                        <div className="text-xs text-secondary font-semibold">{t.badge}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Pilihan Jurusan Peminatan *
                </label>
                <select
                  value={formData.major}
                  onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                >
                  <option value="MIPA">MIPA (Matematika &amp; Ilmu Pengetahuan Alam)</option>
                  <option value="IPS">IPS (Ilmu Pengetahuan Sosial)</option>
                </select>
              </div>

              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/50 text-xs text-on-surface-variant flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-[20px]">info</span>
                <span>Pendaftaran akun formulir SPMB Online 2026/2027 tidak dipungut biaya pendaftaran (Gratis).</span>
              </div>
            </div>
          )}

          {/* STEP 2: BIODATA SISWA */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Nama Lengkap Siswa (Sesuai Ijazah/Akta) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Muhammad Rayhan Firdaus"
                  value={formData.studentName}
                  onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Nomor Induk Siswa Nasional (NISN) *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={10}
                    placeholder="10 Digit NISN..."
                    value={formData.nisn}
                    onChange={(e) => setFormData({ ...formData, nisn: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Jenis Kelamin *
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  >
                    <option value="Laki-laki">Laki-laki (Ikhwan)</option>
                    <option value="Perempuan">Perempuan (Akhwat)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Tempat Lahir *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.birthPlace}
                    onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Tanggal Lahir *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.birthDate}
                    onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Asal Sekolah / Madrasah (MTs/SMP/Pesantren) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: MTs Negeri 1 Kota Bandung"
                  value={formData.schoolOrigin}
                  onChange={(e) => setFormData({ ...formData, schoolOrigin: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 3: ORANG TUA, NILAI, & KONTAK */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Nama Orang Tua / Wali Siswa *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nama Ayah / Ibu / Wali..."
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    No. WhatsApp Aktif (Untuk Notifikasi Akun) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Contoh: 081234567890"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Alamat Email Aktif
                  </label>
                  <input
                    type="email"
                    placeholder="email@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Rata-rata Nilai Rapor Semester 1 s.d 5
                  </label>
                  <input
                    type="number"
                    min="60"
                    max="100"
                    value={formData.raportAverage}
                    onChange={(e) => setFormData({ ...formData, raportAverage: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Capaian Hafalan Qur'an Saat Ini (Juz)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="30"
                    value={formData.memorizationJuz}
                    onChange={(e) => setFormData({ ...formData, memorizationJuz: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">
                  Alamat Tempat Tinggal Saat Ini *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota/Kabupaten..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                ></textarea>
              </div>

              <div className="p-3 bg-secondary/10 rounded-xl text-xs text-on-secondary-container flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                <span>Dengan mengklik submit, saya menyatakan data yang diisikan adalah benar dan siap diverifikasi.</span>
              </div>
            </div>
          )}

          {/* Modal Footer Controls */}
          <div className="pt-4 border-t border-outline-variant/60 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 rounded-xl border border-outline-variant text-on-surface font-semibold text-sm hover:bg-surface-container cursor-pointer"
              >
                Kembali
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl border border-outline-variant text-on-surface font-semibold text-sm hover:bg-surface-container cursor-pointer"
              >
                Batal
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-sm hover:bg-primary-container transition cursor-pointer flex items-center gap-1.5"
              >
                <span>Lanjut Langkah {step + 1}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-extrabold text-sm shadow-md transition cursor-pointer flex items-center gap-2"
                title="Kirim formulir dan langsung cetak lembar bukti pendaftaran resmi sebagai PDF"
              >
                <span className="material-symbols-outlined text-[20px]">print</span>
                <span>Kirim &amp; Cetak Bukti PDF</span>
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
