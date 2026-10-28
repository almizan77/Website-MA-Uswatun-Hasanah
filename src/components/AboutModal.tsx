import React from 'react';
import { schoolInfo, visionMissionData } from '../data/schoolData';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSpmbRegister: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({
  isOpen,
  onClose,
  onOpenSpmbRegister,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-on-background/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest max-w-3xl w-full rounded-2xl border border-outline-variant shadow-2xl relative max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-outline-variant/60 bg-surface-container-low flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center shrink-0">
              <img
                src={schoolInfo.logoUrl}
                alt="Logo MA Uswatun Hasanah Semarang"
                className="w-full h-full object-contain filter drop-shadow-xs"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    'https://upload.wikimedia.org/wikipedia/id/4/4e/Logo_MA_Uswatun_Hasanah.png';
                }}
              />
            </div>
            <div>
              <span className="text-[11px] font-bold text-secondary uppercase">
                PROFIL RESMI MADRASAH
              </span>
              <h3 className="font-headline-sm font-bold text-on-background">
                Mengenal Lebih Dekat MA Uswatun Hasanah
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-lg border border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:bg-surface-container cursor-pointer transition"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Sejarah & Latar Belakang */}
          <div>
            <h4 className="font-headline-md text-lg font-bold text-primary mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">history_edu</span>
              <span>Sejarah &amp; Nilai Dasar Pendirian</span>
            </h4>
            <p className="font-body-md text-body-md text-on-surface leading-relaxed">
              <strong>Madrasah Aliyah Uswatun Hasanah</strong> berada di bawah naungan <strong>Yayasan Darul Husna Semarang</strong> dan didirikan dengan cita-cita luhur melahirkan generasi ilmuwan muslim yang bertafaqquh fiddin sekaligus mumpuni dalam rekayasa teknologi dan sains modern. Mengambil teladan dari Rasulullah SAW sebagai <em>Uswatun Hasanah</em> (suri teladan terbaik), lembaga ini memadukan tradisi keilmuan pesantren (Pondok Pesantren Darul Husna) dengan pendidikan formal berjenjang dari RA, MTs, hingga MA.
            </p>
          </div>

          {/* Visi Madrasah */}
          <div className="bg-primary/5 rounded-2xl p-5 border border-primary/20">
            <h4 className="font-headline-md text-base font-bold text-primary mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">visibility</span>
              <span>Visi Madrasah</span>
            </h4>
            <p className="font-body-md text-sm sm:text-base text-on-surface font-semibold leading-relaxed">
              "{visionMissionData.vision}"
            </p>
          </div>

          {/* Misi Madrasah */}
          <div className="bg-surface-container-low rounded-2xl p-5 border border-outline-variant/50">
            <h4 className="font-headline-md text-base font-bold text-secondary mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">flag</span>
              <span>Misi Madrasah</span>
            </h4>
            <ol className="space-y-2.5 font-body-md text-xs sm:text-sm text-on-surface-variant">
              {visionMissionData.missions.map((misi, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 border border-primary/20">
                    {idx + 1}
                  </span>
                  <span className="text-on-surface leading-relaxed">{misi}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Profil Kepala Madrasah */}
          <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/50 flex flex-col sm:flex-row items-center gap-5">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-primary/20 shrink-0 border-2 border-primary/30">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwRBV9k1SVX-vkF27M1Dww6H_tmA8FIl-kbruO_0Y90f--tc-suM221bgFV36Y84OiwAR-TULUBw9IdREL5L9KkzUYd7p8zDqaRyL0NfZeMGRxXQjq_R30GrToyMCksqD_KC6jR14POnWvnsdGZir-oE82J03S8GaIS7ub2nOrpaeBcr8X4tsAPAKA8NOkrFwXKSrnj-V9HUARp4CudRC1YVUmROOTwQc6Eh56eXzru7u7Jd8yYxb3"
                alt="Kepala Madrasah"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-xs font-bold text-secondary uppercase">Pimpinan Madrasah</span>
              <h5 className="font-headline-sm font-bold text-on-background text-base">
                Dr. KH. Abdullah Syukri, M.Ag.
              </h5>
              <p className="font-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
                Alumni S1 Al-Azhar Kairo, S2 &amp; S3 UIN Sunan Gunung Djati Bandung. Pengasuh pesantren, penulis produktif, dan pegiat integrasi sains-Islam Indonesia.
              </p>
            </div>
          </div>

          {/* Legalitas Lembaga */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/40">
              <span className="text-on-surface-variant block">Izin Operasional Resmi:</span>
              <strong className="text-primary text-sm">Kementerian Agama RI</strong>
              <div className="text-[11px] text-on-surface-variant mt-0.5 font-medium">SK: {schoolInfo.accreditationSk}</div>
            </div>
            <div className="p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/40">
              <span className="text-on-surface-variant block">Nomor Pokok Sekolah Nasional:</span>
              <strong className="text-on-background text-sm">NPSN: {schoolInfo.npsn}</strong>
              <div className="text-[11px] text-on-surface-variant mt-0.5">NSM: {schoolInfo.nsm}</div>
            </div>
          </div>

          {/* Empat Pilar Pendidikan */}
          <div>
            <h4 className="font-headline-md text-lg font-bold text-primary mb-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">diamond</span>
              <span>4 Nilai Karakter Utama Siswa &amp; Siswi</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl">
                <div className="font-bold text-on-background text-xs sm:text-sm">1. Aqidah Shahihah &amp; Ibadah Istiqamah</div>
                <div className="text-xs text-on-surface-variant mt-0.5">Pondasi spiritual keimanan, ketakwaan, dan salat berjamaah.</div>
              </div>
              <div className="p-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl">
                <div className="font-bold text-on-background text-xs sm:text-sm">2. Keunggulan Akademik &amp; Teknologi</div>
                <div className="text-xs text-on-surface-variant mt-0.5">Berpikir kritis, mandiri, dan terampil memanfaatkan teknologi.</div>
              </div>
              <div className="p-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl">
                <div className="font-bold text-on-background text-xs sm:text-sm">3. Adab &amp; Integritas Akhlak</div>
                <div className="text-xs text-on-surface-variant mt-0.5">Menjunjung kejujuran, sopan santun, dan khidmah masyarakat.</div>
              </div>
              <div className="p-3 bg-surface-container-lowest border border-outline-variant/50 rounded-xl">
                <div className="font-bold text-on-background text-xs sm:text-sm">4. Kemampuan Diplomasi Global</div>
                <div className="text-xs text-on-surface-variant mt-0.5">Fasih berbahasa Arab dan Inggris dalam pergaulan dunia.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-surface-container-low border-t border-outline-variant/60 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenSpmbRegister();
            }}
            className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs hover:bg-primary-container transition cursor-pointer flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
            <span>Daftar Sekarang</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-outline-variant text-on-surface font-semibold text-xs hover:bg-surface-container cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
