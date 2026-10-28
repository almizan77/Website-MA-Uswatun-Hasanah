import React, { useState } from 'react';
import { schoolInfo } from '../data/schoolData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    topic: 'Informasi SPMB',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending message
    setSubmitted(true);
    setTimeout(() => {
      // Open WhatsApp with prefilled message
      const text = encodeURIComponent(
        `Assalamu'alaikum MA Uswatun Hasanah,\nNama: ${formData.name}\nNo. HP/WA: ${formData.phone}\nTopik: ${formData.topic}\nPesan: ${formData.message}`
      );
      window.open(`https://wa.me/${schoolInfo.whatsappClean}?text=${text}`, '_blank');
      setSubmitted(false);
      setFormData({ name: '', phone: '', topic: 'Informasi SPMB', message: '' });
    }, 1000);
  };

  return (
    <section id="kontak" className="py-space-3xl bg-surface-container-lowest border-y border-outline-variant/40">
      <div className="max-w-container-max mx-auto px-gutter-desktop">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="bg-primary/10 text-primary font-label-md text-label-md px-3.5 py-1 rounded-full font-bold inline-block mb-3">
            HUBUNGI KAMI
          </span>
          <h2 className="font-headline-xl-mobile md:font-headline-xl text-headline-xl-mobile md:text-headline-xl text-on-background font-extrabold tracking-tight">
            Kontak &amp; Lokasi Madrasah
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-3">
            Kami siap menyambut kunjungan silaturahmi calon siswa dan orang tua di kampus MA Uswatun Hasanah setiap hari kerja.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards & Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Alamat Card */}
            <div className="bg-background p-6 rounded-2xl border border-outline-variant/60 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[26px]">location_on</span>
              </div>
              <div>
                <h4 className="font-headline-sm font-bold text-on-background mb-1">
                  Alamat Kampus Terpadu
                </h4>
                <p className="font-body-sm text-sm text-on-surface-variant leading-relaxed">
                  {schoolInfo.address}, {schoolInfo.city}, {schoolInfo.province} {schoolInfo.postalCode}
                </p>
                <div className="mt-2 text-xs text-primary font-semibold">
                  NPSN: {schoolInfo.npsn} • NSM: {schoolInfo.nsm}
                </div>
              </div>
            </div>

            {/* Telepon & WhatsApp Card */}
            <div className="bg-background p-6 rounded-2xl border border-outline-variant/60 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[26px]">call</span>
              </div>
              <div className="flex-1">
                <h4 className="font-headline-sm font-bold text-on-background mb-1">
                  Telepon &amp; WhatsApp Resmi
                </h4>
                <p className="font-body-sm text-sm text-on-surface-variant">
                  Kantor: {schoolInfo.phone} <br />
                  Helpdesk SPMB: {schoolInfo.whatsapp}
                </p>
                <div className="mt-3">
                  <a
                    href={`https://wa.me/${schoolInfo.whatsappClean}?text=Assalamu'alaikum%20Panitia%20SPMB%20MA%20Uswatun%20Hasanah,%20saya%20ingin%20berkonsultasi.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-secondary hover:bg-secondary/90 text-on-secondary px-4 py-2 rounded-lg text-xs font-bold transition shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[16px]">chat</span>
                    <span>Chat WhatsApp Cepat</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Email & Jam Layanan */}
            <div className="bg-background p-6 rounded-2xl border border-outline-variant/60 shadow-xs flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[26px]">mail</span>
              </div>
              <div>
                <h4 className="font-headline-sm font-bold text-on-background mb-1">
                  Email &amp; Jam Layanan
                </h4>
                <p className="font-body-sm text-sm text-on-surface-variant">
                  {schoolInfo.email} <br />
                  Senin - Sabtu: 07.30 - 16.00 WIB
                </p>
              </div>
            </div>

            {/* Media Sosial */}
            <div className="bg-background p-6 rounded-2xl border border-outline-variant/60 shadow-xs">
              <h4 className="font-headline-sm font-bold text-on-background mb-3">
                Ikuti Media Sosial Kami
              </h4>
              <div className="flex items-center gap-3">
                <a
                  href={schoolInfo.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-surface-container-low hover:bg-primary/10 text-on-surface hover:text-primary transition font-semibold text-xs flex items-center gap-2 border border-outline-variant/40"
                >
                  <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                  <span>Instagram</span>
                </a>
                <a
                  href={schoolInfo.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-surface-container-low hover:bg-tertiary/10 text-on-surface hover:text-tertiary transition font-semibold text-xs flex items-center gap-2 border border-outline-variant/40"
                >
                  <span className="material-symbols-outlined text-[18px]">smart_display</span>
                  <span>YouTube</span>
                </a>
                <a
                  href={schoolInfo.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-xl bg-surface-container-low hover:bg-primary/10 text-on-surface hover:text-primary transition font-semibold text-xs flex items-center gap-2 border border-outline-variant/40"
                >
                  <span className="material-symbols-outlined text-[18px]">public</span>
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Embed & Contact Form */}
          <div className="lg:col-span-7 space-y-6">
            {/* Google Maps Embed */}
            <div className="rounded-2xl overflow-hidden border border-outline-variant/60 shadow-md bg-surface-container h-72 sm:h-80 relative">
              <iframe
                title="Peta Lokasi MA Uswatun Hasanah"
                src={schoolInfo.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
              <div className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur-xs px-3 py-1.5 rounded-lg text-xs font-bold text-on-background shadow-xs">
                Kompleks Islamic Centre Bandung
              </div>
            </div>

            {/* Quick Inquiry Form */}
            <div className="bg-background rounded-2xl p-6 sm:p-8 border border-outline-variant/60 shadow-xs">
              <h3 className="font-headline-md text-headline-md font-bold text-on-background mb-1">
                Kirim Pesan atau Pertanyaan
              </h3>
              <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant mb-6">
                Tim administrasi dan Panitia SPMB akan merespons pesan Anda via WhatsApp dalam waktu maksimal 1x24 jam.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-1">
                      Nama Lengkap Anda *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Budi Santoso"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface mb-1">
                      No. WhatsApp Aktif *
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
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Topik Pertanyaan
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  >
                    <option value="Informasi SPMB">Informasi SPMB &amp; Pendaftaran</option>
                    <option value="Program Tahfidz">Program Tahfidz &amp; Sanad</option>
                    <option value="Informasi Fasilitas">Fasilitas &amp; Sarana Madrasah</option>
                    <option value="Beasiswa Pendidikan">Program Beasiswa Siswa</option>
                    <option value="Kunjungan Kampus">Jadwal Kunjungan Kampus</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1">
                    Pesan / Pertanyaan Anda *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tuliskan pertanyaan atau informasi yang ingin Anda ketahui..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitted}
                  className="w-full py-3 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-sm shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  <span>{submitted ? 'Mengalihkan ke WhatsApp...' : 'Kirim Pesan ke Panitia'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
