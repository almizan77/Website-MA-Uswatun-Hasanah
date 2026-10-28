import React, { useEffect } from 'react';
import { SpmbRegistrationRecord } from '../types';
import { schoolInfo } from '../data/schoolData';

interface SpmbPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: SpmbRegistrationRecord | null;
  googleFormUrl: string;
}

export const SpmbPrintModal: React.FC<SpmbPrintModalProps> = ({
  isOpen,
  onClose,
  record,
  googleFormUrl,
}) => {
  // Automatically trigger browser print dialog when modal opens
  useEffect(() => {
    if (isOpen && record) {
      const timer = setTimeout(() => {
        window.print();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, record]);

  if (!isOpen || !record) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="spmb-print-root"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex flex-col items-center justify-start p-2 sm:p-4 md:p-6"
    >
      {/* Screen-only Controls / Top Bar */}
      <div className="no-print w-full max-w-4xl bg-surface-container-lowest rounded-2xl border border-outline-variant p-4 mb-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[24px]">task_alt</span>
          </div>
          <div>
            <h4 className="font-headline-sm font-bold text-on-background text-sm sm:text-base">
              Pendaftaran Berhasil Dikirim!
            </h4>
            <p className="text-xs text-on-surface-variant">
              Dokumen Bukti Pendaftaran PDF telah disiapkan. Klik tombol cetak untuk menyimpan sebagai PDF.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-container text-white text-xs sm:text-sm font-bold shadow-md flex items-center gap-1.5 transition cursor-pointer"
            title="Buka dialog cetak untuk menyimpan dokumen ini sebagai file PDF"
          >
            <span className="material-symbols-outlined text-[18px]">print</span>
            <span>Cetak / Simpan PDF</span>
          </button>

          <a
            href={googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-xs sm:text-sm font-semibold border border-outline-variant/60 flex items-center gap-1.5 transition"
            title="Buka link Google Form Resmi MA Uswatun Hasanah"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">open_in_new</span>
            <span>Buka Google Form</span>
          </a>

          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl border border-outline-variant hover:bg-surface-container text-on-surface text-xs sm:text-sm font-semibold transition cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>

      {/* Screen Instruction Notice */}
      <div className="no-print w-full max-w-4xl bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 mb-4 text-xs text-amber-900 flex items-center gap-2">
        <span className="material-symbols-outlined text-amber-700 text-[18px]">info</span>
        <span>
          <strong>Petunjuk Cetak PDF:</strong> Pada jendela cetak browser yang muncul, pilih tujuan pencetakan <strong>"Save as PDF" / "Simpan sebagai PDF"</strong>, ukuran kertas <strong>A4</strong>.
        </span>
      </div>

      {/* Printable Sheet (Official Indonesian Madrasah Document) */}
      <div
        id="spmb-print-document"
        className="print-only-sheet w-full max-w-4xl bg-white text-black p-8 sm:p-12 rounded-2xl sm:shadow-2xl border border-gray-200 mx-auto"
        style={{ fontFamily: '"Times New Roman", Times, serif' }}
      >
        {/* KOP SURAT RESMI */}
        <div className="border-b-[3px] border-double border-black pb-3 mb-6">
          <div className="flex items-center justify-between gap-4">
            {/* Logo Kemenag / Madrasah */}
            <div className="w-20 h-20 shrink-0 flex items-center justify-center">
              <img
                src={schoolInfo.logoUrl}
                alt="Logo Madrasah Aliyah Uswatun Hasanah"
                className="w-18 h-18 object-contain"
              />
            </div>

            {/* Teks Kop */}
            <div className="text-center flex-1">
              <h4 className="text-xs sm:text-sm tracking-widest font-semibold uppercase m-0 leading-tight">
                YAYASAN PENDIDIKAN ISLAM USWATUN HASANAH
              </h4>
              <h2 className="text-base sm:text-xl font-bold uppercase tracking-wider m-0 leading-tight text-emerald-950">
                MADRASAH ALIYAH (MA) USWATUN HASANAH SEMARANG
              </h2>
              <p className="text-[11px] sm:text-xs font-semibold m-0 leading-tight mt-0.5">
                STATUS TERAKREDITASI &ldquo;A&rdquo; (UNGGUL) BERDASARKAN SK BAN-S/M
              </p>
              <p className="text-[10px] sm:text-[11px] text-gray-700 m-0 leading-tight">
                NSM: {schoolInfo.nsm} | NPSN: {schoolInfo.npsn}
              </p>
              <p className="text-[9px] sm:text-[10px] text-gray-600 m-0 leading-tight mt-0.5">
                {schoolInfo.address}, {schoolInfo.city}, {schoolInfo.province} {schoolInfo.postalCode} | Telp/WA: {schoolInfo.phone} | Website: mauh-semarang.sch.id
              </p>
            </div>

            {/* Right Badge (Akreditasi A / Kemenag) */}
            <div className="w-20 h-20 shrink-0 hidden sm:flex flex-col items-center justify-center border border-emerald-800 p-1 rounded-sm text-center">
              <span className="text-[9px] font-bold text-emerald-900 leading-none">AKREDITASI</span>
              <span className="text-xl font-extrabold text-emerald-800 leading-none my-0.5">A</span>
              <span className="text-[8px] text-gray-600 leading-none">UNGGUL</span>
            </div>
          </div>
        </div>

        {/* JUDUL DOKUMEN */}
        <div className="text-center mb-6">
          <h3 className="text-base sm:text-lg font-bold uppercase underline tracking-wider mb-1">
            LEMBAR BUKTI REGISTRASI PENDAFTARAN SISWA BARU (SPMB)
          </h3>
          <p className="text-xs sm:text-sm font-semibold tracking-wide">
            TAHUN PELAJARAN 2026 / 2027
          </p>
        </div>

        {/* REGISTRATION METADATA BADGE */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-gray-50 border border-gray-300 rounded-md mb-6 text-xs">
          <div>
            <span className="block text-[10px] text-gray-600 uppercase">Nomor Registrasi:</span>
            <span className="font-mono font-bold text-sm text-emerald-900">{record.regNumber}</span>
          </div>
          <div>
            <span className="block text-[10px] text-gray-600 uppercase">Jalur &amp; Jurusan:</span>
            <span className="font-bold text-gray-900">{record.track} &bull; Jurusan {record.major}</span>
          </div>
          <div>
            <span className="block text-[10px] text-gray-600 uppercase">Waktu Pendaftaran:</span>
            <span className="font-medium text-gray-800">{record.date} {record.time ? `(${record.time} WIB)` : ''}</span>
          </div>
        </div>

        {/* BIODATA SECTION */}
        <div className="mb-6">
          <h4 className="text-xs sm:text-sm font-bold uppercase border-b border-gray-400 pb-1 mb-2">
            A. BIODATA CALON PESERTA DIDIK
          </h4>
          <table className="w-full text-xs border-collapse">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-1.5 px-2 font-semibold w-44 text-gray-700">Nama Lengkap Siswa</td>
                <td className="py-1.5 px-2 font-bold uppercase text-gray-900">{record.studentName}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-1.5 px-2 font-semibold text-gray-700">NISN / NIK</td>
                <td className="py-1.5 px-2 font-medium">{record.nisn || '-'} / {record.nik || '-'}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-1.5 px-2 font-semibold text-gray-700">Jenis Kelamin</td>
                <td className="py-1.5 px-2 font-medium">{record.gender}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-1.5 px-2 font-semibold text-gray-700">Tempat, Tanggal Lahir</td>
                <td className="py-1.5 px-2 font-medium">
                  {record.birthPlace}, {record.birthDate}
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-1.5 px-2 font-semibold text-gray-700">Asal Madrasah / Sekolah</td>
                <td className="py-1.5 px-2 font-medium">{record.schoolOrigin || '-'}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-1.5 px-2 font-semibold text-gray-700">Pilihan Jurusan Peminatan</td>
                <td className="py-1.5 px-2 font-bold text-emerald-900">
                  {record.major === 'MIPA'
                    ? 'MIPA (Matematika & Ilmu Pengetahuan Alam)'
                    : record.major === 'IPS'
                    ? 'IPS (Ilmu Pengetahuan Sosial)'
                    : record.major}
                </td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-1.5 px-2 font-semibold text-gray-700">Rata-rata Nilai Rapor / Hafalan</td>
                <td className="py-1.5 px-2 font-medium">
                  Nilai Rapor: <strong>{record.raportAverage}</strong> | Capaian Hafalan: <strong>{record.memorizationJuz} Juz</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* DATA ORANG TUA / WALI */}
        <div className="mb-6">
          <h4 className="text-xs sm:text-sm font-bold uppercase border-b border-gray-400 pb-1 mb-2">
            B. DATA ORANG TUA / WALI &amp; KONTAK
          </h4>
          <table className="w-full text-xs border-collapse">
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="py-1.5 px-2 font-semibold w-44 text-gray-700">Nama Orang Tua / Wali</td>
                <td className="py-1.5 px-2 font-bold uppercase text-gray-900">{record.parentName || '-'}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-1.5 px-2 font-semibold text-gray-700">No. WhatsApp / Telepon</td>
                <td className="py-1.5 px-2 font-medium">{record.phone}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-1.5 px-2 font-semibold text-gray-700">Email</td>
                <td className="py-1.5 px-2 font-medium">{record.email || '-'}</td>
              </tr>
              <tr className="border-b border-gray-200">
                <td className="py-1.5 px-2 font-semibold text-gray-700">Alamat Lengkap</td>
                <td className="py-1.5 px-2 font-medium">{record.address || '-'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* PETUNJUK VERIFIKASI & SYARAT */}
        <div className="mb-6 p-3 bg-gray-50 border border-gray-300 rounded text-[11px] leading-relaxed">
          <p className="font-bold mb-1 uppercase text-gray-900">
            Ketentuan &amp; Langkah Verifikasi Selanjutnya:
          </p>
          <ol className="list-decimal list-inside space-y-0.5 text-gray-800">
            <li>Simpan / cetak lembar bukti pendaftaran ini sebagai bukti sah pendaftaran online.</li>
            <li>
              Bawa lembar ini beserta fotokopi berkas (Kartu Keluarga, Akta Kelahiran, dan Rapor Semester 1-5) saat verifikasi berkas fisik di sekretariat madrasah.
            </li>
            <li>Jadwal Computer-Based Test (CBT) dan wawancara calon siswa &amp; wali akan dikonfirmasi melalui WhatsApp.</li>
            <li>Formulir ini juga dapat disinkronkan ke pangkalan data Google Form resmi madrasah.</li>
          </ol>
        </div>

        {/* FOTO, BARCODE & TANDA TANGAN */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-300 items-start text-xs">
          {/* Box Pas Foto 3x4 */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-24 h-32 border-2 border-dashed border-gray-400 bg-gray-50 flex flex-col items-center justify-center text-center p-2 rounded">
              <span className="text-[10px] text-gray-500 font-semibold leading-tight">
                TEMPEL PAS FOTO
                <br />
                3 x 4
                <br />
                (Background Merah/Biru)
              </span>
            </div>
            <span className="text-[9px] text-gray-500 mt-1 font-mono">Verifikasi Fisik</span>
          </div>

          {/* Tanda Tangan Calon Siswa & Wali */}
          <div className="text-center flex flex-col justify-between h-36">
            <p className="text-[11px] text-gray-700">Calon Siswa / Wali Murid,</p>
            <div className="my-auto">
              <span className="text-[10px] text-gray-400 italic">(Tanda Tangan)</span>
            </div>
            <p className="font-bold underline text-[11px] uppercase">
              ( {record.studentName} )
            </p>
          </div>

          {/* Tanda Tangan Panitia SPMB */}
          <div className="text-center flex flex-col justify-between h-36 relative">
            <div>
              <p className="text-[11px] text-gray-700">Semarang, {record.date}</p>
              <p className="text-[11px] font-bold">Panitia SPMB 2026/2027</p>
            </div>
            <div className="my-auto relative">
              {/* Simulated Official Stamp */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80">
                <div className="w-24 h-24 border-2 border-dashed border-emerald-800 rounded-full flex flex-col items-center justify-center transform -rotate-12 text-emerald-800 text-[8px] font-bold p-1">
                  <span>PANITIA SPMB</span>
                  <span className="text-[9px]">MA USWATUN HASANAH</span>
                  <span>TERDAFTAR RESMI</span>
                </div>
              </div>
              <span className="text-[10px] text-gray-400 italic relative z-10">(Tanda Tangan &amp; Cap)</span>
            </div>
            <p className="font-bold underline text-[11px] uppercase relative z-10">
              Panitia Penerimaan Siswa Baru
            </p>
          </div>
        </div>

        {/* FOOTER VERIFIKASI DIGITAL */}
        <div className="mt-8 pt-3 border-t border-gray-200 flex items-center justify-between text-[9px] text-gray-500">
          <div>
            <span>ID Dokumen: {record.regNumber} &bull; Dicetak dari Sistem Portal Resmi MA Uswatun Hasanah Semarang</span>
          </div>
          <div>
            <span>Status: VALID &bull; Tervalidasi Sistem Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};
