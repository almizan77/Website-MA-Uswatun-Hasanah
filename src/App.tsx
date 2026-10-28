import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProgramsSection } from './components/ProgramsSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { FacilitiesSection } from './components/FacilitiesSection';
import { AchievementsSection } from './components/AchievementsSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { NewsSection } from './components/NewsSection';
import { SpmbSection } from './components/SpmbSection';
import { TeachersSection } from './components/TeachersSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AlumniSection } from './components/AlumniSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { SpmbRegisterModal } from './components/SpmbRegisterModal';
import { SpmbPrintModal } from './components/SpmbPrintModal';
import { AboutModal } from './components/AboutModal';
import { SpmbRegistrationRecord } from './types';

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/1lQ3_QHZ2r-XINMfAgpLCwgXwaCQ6pAyEmivue2pUozU/viewform';

const VALID_PAGES = [
  'beranda',
  'profil',
  'guru',
  'program',
  'fasilitas',
  'kegiatan',
  'prestasi',
  'berita',
  'spmb',
  'kontak',
];

const PAGE_META: Record<string, { title: string; subtitle: string; icon: string }> = {
  profil: {
    title: 'Profil Madrasah',
    subtitle: 'Mengenal sejarah, visi misi, profil pimpinan, dan nilai-nilai luhur MA Uswatun Hasanah.',
    icon: 'school',
  },
  guru: {
    title: 'Dewan Guru & Tenaga Pendidik',
    subtitle: 'Profil pimpinan, dewan asatidz, jabatan struktural, dan mata pelajaran/kuliah yang diampu.',
    icon: 'badge',
  },
  program: {
    title: 'Program Unggulan',
    subtitle: 'Peminatan IPA, IPS, Keagamaan, serta kurikulum terpadu berbasis pesantren & sains modern.',
    icon: 'auto_stories',
  },
  fasilitas: {
    title: 'Sarana & Fasilitas',
    subtitle: 'Fasilitas pembelajaran representatif untuk mendukung kenyamanan dan mutu belajar siswa.',
    icon: 'domain',
  },
  prestasi: {
    title: 'Prestasi Siswa & Siswi',
    subtitle: 'Capaian gemilang siswa dan siswi MA Uswatun Hasanah di tingkat kota, provinsi, hingga nasional.',
    icon: 'emoji_events',
  },
  kegiatan: {
    title: 'Extrakurikuler Siswa',
    subtitle: 'Dokumentasi ragam aktivitas ekstrakurikuler minat bakat, keorganisasian, dan pembiasaan ibadah.',
    icon: 'palette',
  },
  berita: {
    title: 'Berita & Pengumuman',
    subtitle: 'Informasi dan warta terkini seputar kegiatan akademik, kesiswaan, dan pengumuman madrasah.',
    icon: 'newspaper',
  },
  spmb: {
    title: 'Penerimaan Murid Baru (SPMB)',
    subtitle: 'Informasi jalur pendaftaran, jadwal seleksi, beasiswa, dan syarat pendaftaran tahun ajaran 2026/2027.',
    icon: 'how_to_reg',
  },
  kontak: {
    title: 'Kontak & Lokasi',
    subtitle: 'Informasi sekretariat, kontak resmi madrasah, dan petunjuk lokasi kampus MA Uswatun Hasanah.',
    icon: 'location_on',
  },
};

export default function App() {
  const getInitialPage = (): string => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (VALID_PAGES.includes(hash)) {
        return hash;
      }
    }
    return 'beranda';
  };

  const [currentPage, setCurrentPage] = useState<string>(getInitialPage);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [printRecord, setPrintRecord] = useState<SpmbRegistrationRecord | null>(null);

  // Success Notification Banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (VALID_PAGES.includes(hash)) {
        setCurrentPage(hash);
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (pageId: string) => {
    const targetPage = VALID_PAGES.includes(pageId) ? pageId : 'beranda';
    setCurrentPage(targetPage);
    window.location.hash = targetPage;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleOpenRegister = () => {
    window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
  };

  const handleOpenAbout = () => {
    setIsAboutModalOpen(true);
  };

  const handleRegisterSuccess = (data: SpmbRegistrationRecord) => {
    setPrintRecord(data);
    setIsPrintModalOpen(true);
    setToastMessage(`Pendaftaran ${data.studentName} berhasil terkirim! Dokumen PDF bukti pendaftaran siap dicetak.`);
    setTimeout(() => setToastMessage(null), 6000);
  };

  return (
    <div className="min-h-screen bg-background text-on-background font-body flex flex-col antialiased selection:bg-primary/20 selection:text-primary">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-primary text-on-primary px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20 animate-in fade-in slide-in-from-top-4 duration-300">
          <span className="material-symbols-outlined text-[24px]">verified</span>
          <span className="text-sm font-bold">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 hover:opacity-80 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}

      {/* Header & Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSpmbRegister={handleOpenRegister}
      />

      <main className="flex-1">
        {/* --- PAGE: BERANDA --- */}
        {currentPage === 'beranda' && (
          <div className="space-y-0 animate-in fade-in duration-200">
            {/* Hero Section */}
            <Hero
              onOpenSpmbRegister={handleOpenRegister}
              onExploreClick={() => handleNavigate('profil')}
            />

            {/* Keunggulan MA Uswatun Hasanah */}
            <WhyChooseUsSection onOpenSpmbRegister={handleOpenRegister} />

            {/* Jejak Alumni */}
            <AlumniSection />
          </div>
        )}

        {/* --- PAGE: PROFIL --- */}
        {currentPage === 'profil' && (
          <div className="animate-in fade-in duration-200">
            <AboutSection onOpenDetailModal={handleOpenAbout} />
          </div>
        )}

        {/* --- PAGE: GURU --- */}
        {currentPage === 'guru' && (
          <div className="animate-in fade-in duration-200">
            <TeachersSection onOpenSpmbRegister={handleOpenRegister} />
          </div>
        )}

        {/* --- PAGE: PROGRAM --- */}
        {currentPage === 'program' && (
          <div className="animate-in fade-in duration-200">
            <ProgramsSection onOpenSpmbRegister={handleOpenRegister} />
          </div>
        )}

        {/* --- PAGE: FASILITAS --- */}
        {currentPage === 'fasilitas' && (
          <div className="animate-in fade-in duration-200">
            <FacilitiesSection />
          </div>
        )}

        {/* --- PAGE: KEGIATAN --- */}
        {currentPage === 'kegiatan' && (
          <div className="animate-in fade-in duration-200">
            <ActivitiesSection />
          </div>
        )}

        {/* --- PAGE: PRESTASI --- */}
        {currentPage === 'prestasi' && (
          <div className="animate-in fade-in duration-200">
            <AchievementsSection />
          </div>
        )}

        {/* --- PAGE: BERITA --- */}
        {currentPage === 'berita' && (
          <div className="animate-in fade-in duration-200">
            <NewsSection />
          </div>
        )}

        {/* --- PAGE: SPMB --- */}
        {currentPage === 'spmb' && (
          <div className="animate-in fade-in duration-200">
            <SpmbSection onOpenSpmbRegister={handleOpenRegister} />
          </div>
        )}

        {/* --- PAGE: KONTAK --- */}
        {currentPage === 'kontak' && (
          <div className="animate-in fade-in duration-200">
            <ContactSection />
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSpmbRegister={handleOpenRegister}
      />

      {/* Floating WhatsApp Consultation Button */}
      <FloatingWhatsApp />

      <SpmbRegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSuccess={handleRegisterSuccess}
        googleFormUrl={GOOGLE_FORM_URL}
      />

      <SpmbPrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        record={printRecord}
        googleFormUrl={GOOGLE_FORM_URL}
      />

      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        onOpenSpmbRegister={handleOpenRegister}
      />
    </div>
  );
}
