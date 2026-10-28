import React from 'react';
import { schoolInfo } from '../data/schoolData';

interface FooterProps {
  currentPage?: string;
  onNavigate: (pageId: string) => void;
  onOpenSpmbRegister: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenSpmbRegister,
}) => {
  const quickLinks = [
    { label: 'Beranda', id: 'beranda' },
    { label: 'Profil Madrasah', id: 'profil' },
    { label: 'Dewan Guru & Pendidik', id: 'guru' },
    { label: 'Program Unggulan', id: 'program' },
    { label: 'Sarana Fasilitas', id: 'fasilitas' },
    { label: 'Extrakurikuler', id: 'kegiatan' },
    { label: 'Prestasi Siswa', id: 'prestasi' },
    { label: 'Berita & Informasi', id: 'berita' },
    { label: 'Informasi SPMB', id: 'spmb' },
    { label: 'Kontak & Lokasi', id: 'kontak' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
  };

  return (
    <footer className="bg-on-background text-surface-container-lowest pt-16 pb-12 border-t border-outline-variant/20">
      <div className="max-w-container-max mx-auto px-gutter-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Identity (Col 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 p-1 flex items-center justify-center shrink-0 border border-white/20 backdrop-blur-xs shadow-md">
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
                <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block">
                  YAYASAN DARUL HUSNA
                </span>
                <h3 className="font-headline-md text-lg font-extrabold text-white tracking-tight leading-none mt-0.5">
                  {schoolInfo.name}
                </h3>
                <span className="text-[11px] text-secondary-fixed font-semibold tracking-wide">
                  NPSN: {schoolInfo.npsn} • NSM: {schoolInfo.nsm}
                </span>
              </div>
            </div>

            <p className="font-body-md text-sm text-outline-variant leading-relaxed max-w-md">
              "{schoolInfo.tagline}"
            </p>

            <p className="font-body-sm text-xs text-outline-variant/80 leading-relaxed max-w-md">
              Madrasah Aliyah di bawah naungan Yayasan Darul Husna yang berlandaskan nilai-nilai Islami, keunggulan akademik sains riset, kemandirian, dan pembentukan akhlak mulia.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href={schoolInfo.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-primary text-white flex items-center justify-center transition"
                aria-label="Instagram"
              >
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              </a>
              <a
                href={schoolInfo.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-tertiary text-white flex items-center justify-center transition"
                aria-label="YouTube"
              >
                <span className="material-symbols-outlined text-[18px]">smart_display</span>
              </a>
              <a
                href={schoolInfo.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/10 hover:bg-primary text-white flex items-center justify-center transition"
                aria-label="Facebook"
              >
                <span className="material-symbols-outlined text-[18px]">public</span>
              </a>
              <a
                href={`https://wa.me/${schoolInfo.whatsappClean}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-secondary text-on-secondary hover:opacity-90 flex items-center justify-center transition"
                aria-label="WhatsApp"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
              </a>
            </div>
          </div>

          {/* Quick Links (Col 6-8) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-headline-sm text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              Tautan Navigasi
            </h4>
            <ul className="space-y-2 text-sm text-outline-variant">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => handleLinkClick(link.id)}
                    className="hover:text-secondary-fixed transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                  >
                    <span className="material-symbols-outlined text-[14px] text-primary">
                      chevron_right
                    </span>
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Jam Layanan & Kontak Resmi (Col 9-12) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-headline-sm text-sm font-bold text-white uppercase tracking-wider border-b border-white/10 pb-2">
              Sekretariat &amp; Layanan
            </h4>

            <div className="space-y-2.5 text-xs text-outline-variant">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                  location_on
                </span>
                <span>{schoolInfo.address}, {schoolInfo.city}, {schoolInfo.province}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px] shrink-0">
                  call
                </span>
                <span>{schoolInfo.phone} / WA: {schoolInfo.whatsapp}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px] shrink-0">
                  mail
                </span>
                <span>{schoolInfo.email}</span>
              </div>
              <div className="flex items-start gap-2 pt-1 border-t border-white/10">
                <span className="material-symbols-outlined text-secondary text-[18px] shrink-0 mt-0.5">
                  schedule
                </span>
                <div>
                  <strong className="text-white block">Jam Operasional Kantor:</strong>
                  <span>Senin - Sabtu: 07.30 - 16.00 WIB</span> <br />
                  <span className="text-secondary-fixed">Ahad &amp; Libur Nasional Tutup</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenSpmbRegister}
                className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-container text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">how_to_reg</span>
                <span>Portal SPMB Online 2026/2027</span>
              </button>
            </div>
          </div>
        </div>

        {/* Copyright Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-outline-variant/70">
          <p>© {new Date().getFullYear()} Yayasan Darul Husna &bull; MA Uswatun Hasanah Semarang. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-white transition">Kebijakan Privasi</span>
            <span>•</span>
            <span className="hover:text-white transition">Syarat &amp; Ketentuan</span>
            <span>•</span>
            <a
              href="#beranda"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('beranda');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-white transition cursor-pointer flex items-center gap-1 text-primary-fixed"
            >
              <span>Kembali ke Atas</span>
              <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
