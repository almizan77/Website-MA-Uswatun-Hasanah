import React, { useState, useEffect } from 'react';
import { schoolInfo } from '../data/schoolData';

interface NavbarProps {
  currentPage: string;
  onNavigate: (pageId: string) => void;
  onOpenSpmbRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenSpmbRegister,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'profil', label: 'Profil' },
    { id: 'guru', label: 'Guru' },
    { id: 'program', label: 'Program' },
    { id: 'fasilitas', label: 'Fasilitas' },
    { id: 'kegiatan', label: 'Extrakurikuler' },
    { id: 'prestasi', label: 'Prestasi' },
    { id: 'berita', label: 'Berita' },
    { id: 'spmb', label: 'SPMB' },
    { id: 'kontak', label: 'Kontak' },
  ];

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      {/* Main Sticky Navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-surface-container-lowest/95 backdrop-blur-md shadow-md border-b border-outline-variant/60 py-2'
            : 'bg-surface-container-lowest/90 backdrop-blur-xs border-b border-outline-variant/40 py-3'
        }`}
      >
        <div className="max-w-container-max mx-auto px-gutter-desktop flex items-center justify-between">
          {/* Logo & Identity with Yayasan Darul Husna */}
          <a
            href="#beranda"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('beranda');
            }}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <div className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
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
              <div className="text-[10px] sm:text-[11px] font-extrabold text-secondary tracking-wider uppercase leading-none">
                YAYASAN DARUL HUSNA
              </div>
              <div className="font-headline-sm font-black text-on-background tracking-tight leading-tight flex items-center gap-1.5 mt-0.5">
                <span>MA USWATUN HASANAH</span>
              </div>
              <div className="text-[10px] text-on-surface-variant font-medium tracking-wide">
                Mangkang Wetan, Semarang
              </div>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className={`px-2 xl:px-2.5 py-1.5 rounded-lg text-xs xl:text-sm font-semibold transition-colors duration-150 cursor-pointer ${
                    isActive
                      ? 'text-primary bg-primary/10 font-bold'
                      : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-lg border border-outline-variant/60 flex items-center justify-center text-on-surface hover:bg-surface-container transition cursor-pointer"
              aria-label="Buka Menu"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-outline-variant/60 bg-surface-container-lowest px-4 py-4 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200 shadow-xl">
            <div className="grid grid-cols-2 gap-1 mb-3">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => handleNavClick(link.id)}
                    className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition cursor-pointer ${
                      isActive
                        ? 'bg-primary text-on-primary font-bold'
                        : 'text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 border-t border-outline-variant/40 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSpmbRegister();
                }}
                className="w-full py-3 rounded-lg bg-primary text-on-primary font-bold text-sm flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                <span>DAFTAR SEKARANG (SPMB ONLINE)</span>
              </button>
              <a
                href={`https://wa.me/${schoolInfo.whatsappClean}?text=Assalamu'alaikum%20Panitia%20SPMB,%20saya%20ingin%20bertanya`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-lg border border-outline-variant text-on-surface text-center font-semibold text-sm flex items-center justify-center gap-2 hover:bg-surface-container transition"
              >
                <span className="material-symbols-outlined text-[18px] text-primary">chat</span>
                <span>Konsultasi WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

