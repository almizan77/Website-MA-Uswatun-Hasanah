export interface SchoolInfo {
  name: string;
  shortName: string;
  tagline: string;
  subheadline: string;
  logoUrl: string;
  npsn: string;
  nsm: string;
  accreditation: string;
  accreditationSk: string;
  skKemenag: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  whatsapp: string;
  whatsappClean: string;
  email: string;
  mapsUrl: string;
  mapsEmbedUrl: string;
  socials: {
    instagram: string;
    facebook: string;
    youtube: string;
  };
}

export interface StatisticItem {
  id: string;
  value: number;
  suffix: string;
  label: string;
  icon: string;
  description: string;
}

export interface ProgramItem {
  id: string;
  title: string;
  tag: string;
  icon: string;
  image: string;
  images?: string[];
  shortDesc: string;
  fullDesc: string;
  highlights: string[];
  target: string;
}

export interface AdvantageItem {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

export interface FacilityItem {
  id: string;
  title: string;
  category: string;
  image: string;
  caption: string;
  specs: string[];
}

export interface AchievementItem {
  id: string;
  competition: string;
  rank: string;
  level: 'Internasional' | 'Nasional' | 'Provinsi' | 'Kabupaten/Kota';
  year: string;
  studentName: string;
  category: 'Sains & Riset' | 'Keagamaan & MTQ' | 'Bahasa & Diplomasi' | 'Olahraga & Seni';
  photo: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  category: string;
  image: string;
  desc: string;
  schedule: string;
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  category: 'Akademik' | 'Prestasi' | 'Kegiatan' | 'Pengumuman' | 'Keagamaan';
  date: string;
  author: string;
  thumbnail: string;
  summary: string;
  content: string[];
  featured?: boolean;
}

export interface SpmbTrack {
  id: string;
  name: string;
  badge: string;
  desc: string;
  benefits: string[];
  requirements: string[];
  icon: string;
  isPopular?: boolean;
}

export interface SpmbStep {
  step: number;
  title: string;
  desc: string;
  icon: string;
  duration: string;
}

export interface SpmbScheduleItem {
  event: string;
  wave1: string;
  wave2: string;
  note: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  status: 'Alumni' | 'Siswa' | 'Orang Tua';
  avatarText: string;
  rating: number;
  quote: string;
  achievementBadge?: string;
}

export interface AlumniItem {
  id: string;
  name: string;
  graduationYear: string;
  currentRole: string;
  institution: string;
  major: string;
  photo: string;
  quote: string;
  photoPosition?: string;
  photoScale?: number;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'SPMB' | 'Akademik' | 'Sarana & Fasilitas' | 'Biaya';
}

export interface YayasanUnit {
  id: 'pondok' | 'ra' | 'mts' | 'ma';
  name: string;
  badge: string;
  shortTitle: string;
  level: string;
  description: string;
  features: string[];
  websiteUrl: string;
  isCurrentSite?: boolean;
  icon: string;
  stats: string;
  contactWa: string;
  colorTheme: {
    badgeBg: string;
    badgeText: string;
    border: string;
    hoverBorder: string;
    glow: string;
    accentBtn: string;
  };
}

export interface YayasanInfo {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  address: string;
  city: string;
  units: YayasanUnit[];
}

// --------------------------------------------------------------------------
// DATA INSTANCE
// --------------------------------------------------------------------------

export const yayasanInfo: YayasanInfo = {
  name: 'Yayasan Darul Husna',
  legalName: 'Yayasan Pendidikan Islam Darul Husna Semarang',
  tagline: 'Menaungi Pendidikan Islam Terpadu: Pondok Pesantren, RA, MTs, dan MA',
  description:
    'Yayasan Darul Husna adalah payung kelembagaan pendidikan Islam yang membina dan menaungi empat pilar unit pendidikan terintegrasi di Mangkang Wetan, Semarang: Pondok Pesantren, RA (Raudhatul Athfal), MTs (Madrasah Tsanawiyah), dan MA (Madrasah Aliyah).',
  address: 'Jl. Raya Mangkang Wetan, Kec. Tugu',
  city: 'Kota Semarang, Jawa Tengah',
  units: [
    {
      id: 'pondok',
      name: 'Pondok Pesantren Darul Husna',
      badge: 'Pondok Pesantren',
      shortTitle: 'Pondok',
      level: 'Pesantren & Tahfidz 30 Juz',
      description:
        'Pusat pendalaman kajian kitab kuning (kutubut turats), tahfidzul Qur’an mutqin 30 juz bersanad, asrama putra-putri, dan pembentukan karakter akhlak santri yang mandiri serta berjiwa kepemimpinan.',
      features: [
        'Tahfidz Al-Qur’an Mutqin 30 Juz',
        'Kajian Kitab Kuning (Turats) Lengkap',
        'Asrama Putra & Putri Representatif',
        'Bilingual Language Area (Arab & Inggris)',
      ],
      websiteUrl: 'https://pondok.darulhusna.sch.id',
      icon: 'mosque',
      stats: 'Tahfidz 30 Juz & Asrama',
      contactWa: '6281276171829',
      colorTheme: {
        badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        badgeText: 'text-emerald-300',
        border: 'border-emerald-500/30 hover:border-emerald-400',
        hoverBorder: 'hover:shadow-emerald-900/40',
        glow: 'from-emerald-950/70 via-emerald-900/40 to-black/70',
        accentBtn: 'bg-emerald-600 hover:bg-emerald-500 text-white',
      },
    },
    {
      id: 'ra',
      name: 'RA Darul Husna',
      badge: 'Raudhatul Athfal (RA)',
      shortTitle: 'RA',
      level: 'Pendidikan Anak Usia Dini (TK Islam)',
      description:
        'Pendidikan usia dini berbasis fitrah Islami, pembiasaan hafalan surat pendek, doa harian, adab santun, serta stimulasi motorik dan kreativitas ceria dalam suasana belajar yang menyenangkan.',
      features: [
        'Sentra Bermain & Kreativitas Anak',
        'Hafalan Juz ‘Amma & Doa Harian Ceria',
        'Penanaman Adab & Akhlak Sejak Dini',
        'Tenaga Pendidik Ramah & Tersertifikasi',
      ],
      websiteUrl: 'https://ra.darulhusna.sch.id',
      icon: 'child_care',
      stats: 'Usia 4 - 6 Tahun (PAUD/TK)',
      contactWa: '6281276171829',
      colorTheme: {
        badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        badgeText: 'text-amber-300',
        border: 'border-amber-500/30 hover:border-amber-400',
        hoverBorder: 'hover:shadow-amber-900/40',
        glow: 'from-amber-950/70 via-amber-900/40 to-black/70',
        accentBtn: 'bg-amber-600 hover:bg-amber-500 text-white',
      },
    },
    {
      id: 'mts',
      name: 'MTs Uswatun Hasanah',
      badge: 'Madrasah Tsanawiyah (MTs)',
      shortTitle: 'MTs',
      level: 'Pendidikan Menengah Pertama (Setara SMP)',
      description:
        'Madrasah Tsanawiyah unggulan berbasis kurikulum Kemenag dan penguatan riset dasar, tahfidz berkelanjutan, pembiasaan sains teknologi, dan kepanduan pramuka berprestasi.',
      features: [
        'Kelas Riset Sains & Robotik Dasar',
        'Program Tahfidz Berkelanjutan',
        'Laboratorium Komputer & IPA Modern',
        'Pembinaan Minat Bakat & Ekstrakurikuler',
      ],
      websiteUrl: 'https://mts.darulhusna.sch.id',
      icon: 'school',
      stats: 'Terakreditasi A • Jenjang MTs',
      contactWa: '6281276171829',
      colorTheme: {
        badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
        badgeText: 'text-cyan-300',
        border: 'border-cyan-500/30 hover:border-cyan-400',
        hoverBorder: 'hover:shadow-cyan-900/40',
        glow: 'from-cyan-950/70 via-cyan-900/40 to-black/70',
        accentBtn: 'bg-cyan-600 hover:bg-cyan-500 text-white',
      },
    },
    {
      id: 'ma',
      name: 'MA Uswatun Hasanah',
      badge: 'Madrasah Aliyah (MA)',
      shortTitle: 'MA',
      level: 'Pendidikan Menengah Atas (Setara SMA)',
      description:
        'Madrasah Aliyah berprestasi nasional di bidang riset (MYRES/KSM), pembinaan intensif tembus PTN & beasiswa luar negeri, tahfidz Al-Qur’an 30 juz, serta penanaman karakter Iman, Ilmu, dan Amal.',
      features: [
        'Peminatan MIPA Riset & IPS Keagamaan',
        'Juara Nasional KSM & Riset Kemenag',
        'Kampus Hijau 3 Lantai Representatif',
        '94% Lulusan Diterima di PTN/Luar Negeri',
      ],
      websiteUrl: 'https://ma.darulhusna.sch.id',
      isCurrentSite: true,
      icon: 'domain',
      stats: 'Website Aktif Saat Ini',
      contactWa: '6281276171829',
      colorTheme: {
        badgeBg: 'bg-primary/25 text-primary-fixed border-primary/50',
        badgeText: 'text-secondary-fixed',
        border: 'border-primary/50 hover:border-primary',
        hoverBorder: 'hover:shadow-primary/40',
        glow: 'from-primary/40 via-primary-container/30 to-black/80',
        accentBtn: 'bg-primary hover:bg-primary-container text-white',
      },
    },
  ],
};

export const schoolInfo: SchoolInfo = {
  name: 'MA Uswatun Hasanah Semarang',
  shortName: 'MAUH',
  tagline: "Membentuk Generasi Berkarakter dengan Iman, Ilmu dan Amal",
  logoUrl: '/images/logo-mauh.png',
  subheadline:
    'Membangun generasi Qur\'ani yang berakhlak mulia, berprestasi, dan siap menghadapi masa depan berlandaskan Iman, Ilmu, dan Amal di bawah naungan Yayasan Darul Husna Semarang.',
  npsn: '20363212',
  nsm: '131233740008',
  accreditation: 'B (Baik)',
  accreditationSk: '044/BANSM-JTG/SK/X/2018',
  skKemenag: 'B-1422/Kw.11.2/PP.00.5/2021',
  address: 'Jl. Raya Mangkang Wetan, Kec. Tugu',
  city: 'Kota Semarang',
  province: 'Jawa Tengah',
  postalCode: '50156',
  phone: '(024) 76171829',
  whatsapp: '+62 812-7617-1829',
  whatsappClean: '6281276171829',
  email: 'info@mauh-semarang.sch.id',
  mapsUrl: 'https://maps.google.com/?q=MA+Uswatun+Hasanah+Mangkang+Wetan+Semarang',
  mapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15840.485304671404!2d110.301375!3d-6.969145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e705fb555555555%3A0x1234567890abcdef!2sMangkang%20Wetan%2C%20Tugu%2C%20Semarang%20City%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid',
  socials: {
    instagram: 'https://instagram.com/ma_uswatunhasanah_smg',
    facebook: 'https://facebook.com/mauswatunhasanahsmg',
    youtube: 'https://youtube.com/@mauswatunhasanahsemarang',
  },
};

export interface VisionMission {
  vision: string;
  missions: string[];
}

export const visionMissionData: VisionMission = {
  vision:
    'TERWUJUDNYA PESERTA DIDIK YANG BERIMAN, BERAKHLAKUL KARIMAH, UNGGUL DALAM PRESTASI, TERAMPIL, MANDIRI, BERWAWASAN EKOLOGI, CAKAP MEMANFAATKAN TEKNOLOGI, SERTA MELESTARIKAN NILAI-NILAI BUDAYA BANGSA.',
  missions: [
    'Meningkatkan prestasi akademik maupun non akademik.',
    'Menyelenggarakan pembelajaran berbasis teknologi.',
    'Membangun karakter peserta didik yang religius.',
    'Meningkatkan partisipasi dalam menjaga kebersihan serta kelestarian lingkungan.',
    'Mengimplementasikan sistem pengelolaan sampah 3R (Reduce, Reuse, Recycle).',
    'Membangun budaya kepedulian antar siswa sehingga tercipta lingkungan pergaulan yang saling menjaga, mendukung dan waspada terhadap ancaman narkotika.',
  ],
};

export const statisticsData: StatisticItem[] = [
  {
    id: 'students',
    value: 540,
    suffix: '+',
    label: 'Siswa & Siswi Aktif',
    icon: 'groups',
    description: 'Terbagi dalam kelas peminatan MIPA dan IPS',
  },
  {
    id: 'teachers',
    value: 19,
    suffix: '',
    label: 'Guru & Tenaga Pendidik',
    icon: 'school',
    description: '100% S1/S2 lulusan PTN ternama & Universitas Timur Tengah bersertifikat',
  },
  {
    id: 'achievements',
    value: 128,
    suffix: '+',
    label: 'Prestasi Juara',
    icon: 'military_tech',
    description: 'Tingkat Nasional (KSM, MYRES, OPSI), Provinsi, & Daerah',
  },
  {
    id: 'programs',
    value: 24,
    suffix: '+',
    label: 'Program & Ekstrakurikuler',
    icon: 'palette',
    description: 'Mewadahi bakat sains, bahasa, kepanduan, olahraga, & seni Islami',
  },
  {
    id: 'ptn',
    value: 94,
    suffix: '%',
    label: 'Lulusan Tembus PTN/LN',
    icon: 'stars',
    description: 'Diterima melalui SNBP, SNBT, Kedinasan, & Beasiswa Univ. Al-Azhar Mesir',
  },
];

export const featuredPrograms: ProgramItem[] = [
  {
    id: 'tahfidz',
    title: 'Amaliyah Aswaja Annahdliyyah',
    tag: 'Keagamaan Unggulan',
    icon: 'menu_book',
    image: '/images/aswaja-apel.jpg',
    images: [
      '/images/aswaja-apel.jpg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCwRBV9k1SVX-vkF27M1Dww6H_tmA8FIl-kbruO_0Y90f--tc-suM221bgFV36Y84OiwAR-TULUBw9IdREL5L9KkzUYd7p8zDqaRyL0NfZeMGRxXQjq_R30GrToyMCksqD_KC6jR14POnWvnsdGZir-oE82J03S8GaIS7ub2nOrpaeBcr8X4tsAPAKA8NOkrFwXKSrnj-V9HUARp4CudRC1YVUmROOTwQc6Eh56eXzru7u7Jd8yYxb3',
      '/images/hero-building.jpg'
    ],
    shortDesc:
      "Pengamalan dan pembiasaan amaliyah Ahlussuannah wal jama'ah An-Nahdiyyah: Istighotsah, Sholat duha, tahlil dan do'a",
    fullDesc:
      'Program unggulan pembiasaan tradisi dan amaliyah Ahlussunnah wal Jama’ah (Aswaja) An-Nahdliyyah untuk menumbuhkan kecintaan pada Rasulullah SAW, para sahabat, ulama salafus shalih, dan memupuk spiritualitas siswa-siswi berkarakter tawassuth, tawazun, i’tidal, dan tasamuh.',
    highlights: [
      'Pembiasaan Istighotsah & Tahlil rutin',
      'Kajian amaliah Aswaja Annahdliyyah & Fikrah Nahdliyyah',
      'Pembacaan Shalawat Diba’, Simthudduror, & Ratib Al-Haddad',
      'Peringatan Hari Besar Islam & ziarah maqbarah auliya’',
    ],
    target: 'Karakter Siswa-Siswi Aswaja Annahdliyyah',
  },
  {
    id: 'karakter',
    title: 'Ngaji Kitab Kuning',
    tag: 'Turats Pesantren',
    icon: 'auto_stories',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCwRBV9k1SVX-vkF27M1Dww6H_tmA8FIl-kbruO_0Y90f--tc-suM221bgFV36Y84OiwAR-TULUBw9IdREL5L9KkzUYd7p8zDqaRyL0NfZeMGRxXQjq_R30GrToyMCksqD_KC6jR14POnWvnsdGZir-oE82J03S8GaIS7ub2nOrpaeBcr8X4tsAPAKA8NOkrFwXKSrnj-V9HUARp4CudRC1YVUmROOTwQc6Eh56eXzru7u7Jd8yYxb3',
    shortDesc:
      'Kajian kitab kuning (kutubut turats) berbasis metode sorogan dan bandongan: nahwu, sharaf, fiqih, aqidah, akhlak, dan tasawuf dibimbing asatidz berkompeten.',
    fullDesc:
      'Pendalaman khazanah keilmuan Islam klasik melalui pembelajaran kitab kuning standar pesantren salaf. Peserta didik dilatih membaca, menerjemahkan gandul/makna pegon, memahami kaidah gramatika gramatika bahasa Arab (Nahwu & Sharaf), serta menggali dalil hukum fiqih mazhab Syafi’i.',
    highlights: [
      'Metode pembelajaran sorogan, bandongan, & musyawarah',
      'Kajian kitab Jurumiyyah, Imrithi, Safinatun Najah, Fathul Qorib',
      'Penguasaan makna pegon dan gramatika bahasa Arab',
      'Sanad keilmuan mu’tabar dari masyayikh pesantren',
    ],
    target: 'Mutafaqqih Fiddin & Mahir Turats',
  },
  {
    id: 'minatbakat',
    title: 'Pengembangan Bakat, Seni & Olahraga',
    tag: 'Eksplorasi Potensi',
    icon: 'sports_soccer',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDCtOFdgwlQ29aF6S4_jQEADnDOB25uGJL2XtjS_fhh9GW9-uPXKPYh6cX8_wjD9PNyx4O4MPEGtEj5n_7rg4qS-yYQGk42tSf6jS6bbXchteNKYAPhjGdxWBO1tRUpYLxS4N8ubVMvvlL9I7Tmk2Vh2Du5Ez8nzWG-U8H5D7qybQovF2_wifIoeeN5qegQTmY2AVLrr5W-V1UZRsJSlZqG6y14ZU8uFZa3Osjg9iRKee0G244yajVj',
    shortDesc:
      'Wadah ekspresi siswa dan siswi di bidang seni tilawah Qur’an, kaligrafi, jurnalistik media, kepanduan Pramuka, serta cabang olahraga unggulan seperti futsal, badminton, dan bela diri silat.',
    fullDesc:
      'Setiap bakat siswa dan siswi dihargai dan dibimbing oleh pelatih profesional. Kami menyediakan fasilitas sarana olahraga indoor/outdoor dan studio multimedia untuk memacu prestasi non-akademik di tingkat daerah hingga nasional.',
    highlights: [
      'Ekskul Futsal, Badminton, Tenis Meja, & Pencak Silat',
      'Klub Seni Kaligrafi Islam & Qari/Qariah MTQ',
      'Tim Jurnalistik & Broadcast Siswa Kreatif',
      'Gugus Depan Pramuka Berprestasi',
    ],
    target: 'Podium Kejuaraan O2SN & Seni',
  },
];

export const whyChooseUs: AdvantageItem[] = [
  {
    id: 'lingkungan',
    title: 'Lingkungan Islami dan Nyaman',
    desc: 'Kampus asri berhawa sejuk yang menenangkan jiwa dan memacu konsentrasi belajar.',
    icon: 'mosque',
  },
  {
    id: 'guru',
    title: 'Guru Kompeten dan Berpengalaman',
    desc: 'Didukung oleh pendidik berijazah magister dan sarjana, lulusan perguruan tinggi terkemuka terakreditasi nasional.',
    icon: 'psychology',
  },
  {
    id: 'seimbang',
    title: 'Program Akademik & Keagamaan Seimbang',
    desc: 'Mengintegrasikan kurikulum nasional Kemendikbudristek/Kemenag dengan kurikulum kepesantrenan.',
    icon: 'balance',
  },
  {
    id: 'bakat',
    title: 'Pengembangan Bakat & Minat Terarah',
    desc: 'Extrakulikuler Olahraga Dan Seni',
    icon: 'emoji_events',
  },
  {
    id: 'karakter',
    title: 'Pembinaan Karakter & Akhlak Mulia',
    desc: 'Sistem pengasuhan dengan pendekatan keteladanan yang membentuk pribadi beradab, berbakti, dan mandiri.',
    icon: 'verified_user',
  },
];

export const facilitiesData: FacilityItem[] = [
  {
    id: 'gedung-kampus',
    title: 'Gedung Kampus Hijau 3 Lantai',
    category: 'Kampus Terpadu',
    image: '/images/hero-building.jpg',
    caption:
      'Gedung pembelajaran 3 lantai representatif MA Uswatun Hasanah Semarang yang dilengkapi ruang kelas modern, laboratorium riset, serta lingkungan asri sejuk berwawasan Islami.',
    specs: ['Gedung 3 Lantai Representatif', 'Ruang Kelas Nyaman & Interaktif', 'Halaman & Taman Asri Hijau', 'Akses Strategis Kota Semarang'],
  },
  {
    id: 'lab-komputer',
    title: 'Lapangan Olahraga',
    category: 'Olahraga & Jasmani',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBSJmTxQ2bP3DjpyqGG-fVNJG5PsODXaqW-HbtScF_F--5xJvGJ2Ntp0F2AhgS3bBM49Mvggxj3D7RAvyV5OmUF3qKrC4v-eSwUuFIRa0ibf7i3lMeBDzqdI4UcSvC1GcbZ7aJUCl3volnF5xt_33T1hwJ1Z4bIyBLgiTKag0zS6dIoB7tnKOWjiaaLyRmTgV6qmybsOt7nE3mkHrv1aJA81spOPmqFreBpQjiQivSnMuQfy3JuRZXR',
    caption:
      'Sarana lapangan olahraga multiguna terbuka dan representatif untuk kegiatan olahraga siswa-siswi, senam pagi, latihan ketangkasan, dan apel upacara madrasah.',
    specs: ['Lapangan Terbuka Luas', 'Kegiatan Olahraga & Senam', 'Area Apel & Upacara', 'Fasilitas Kebugaran Siswa'],
  },
  {
    id: 'smart-class',
    title: 'Laboratorium Komputer',
    category: 'TIK & Komputasi',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA-CpZRD9QAhYO1abFIn-chE6zOG8j6YFoShDwv5hS1e4uH1aKYQBlEQchWwyJPCy-cLpdMsKAZmum1Ce72oSTNoANJZeZTEpWtCy__3mDXytOVRpuqG9x7XbdbX57RzHTUpMXJ64c3rZ9hvqpAN0Jf0liorIMU_P3nI9FWflzg0iLs7HWwzO3GNeP78-IP7lk6trh2EpyJYcsq5B9BabW1sb4G9ZK1mwZWNPIUUs_Y4GybarKdmT_R',
    caption:
      'Laboratorium komputer modern berpendingin ruangan dengan perangkat PC terkini, koneksi internet berkecepatan tinggi, serta server mandiri untuk praktikum teknologi dan ujian berbasis komputer (CBT).',
    specs: ['Unit PC Modern High-Spec', 'Jaringan Internet Cepat', 'AC & Ruangan Berstandar', 'Server Ujian CBT Mandiri'],
  },
  {
    id: 'perpustakaan-digital',
    title: 'Mushola',
    category: 'Sarana Ibadah',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCwRBV9k1SVX-vkF27M1Dww6H_tmA8FIl-kbruO_0Y90f--tc-suM221bgFV36Y84OiwAR-TULUBw9IdREL5L9KkzUYd7p8zDqaRyL0NfZeMGRxXQjq_R30GrToyMCksqD_KC6jR14POnWvnsdGZir-oE82J03S8GaIS7ub2nOrpaeBcr8X4tsAPAKA8NOkrFwXKSrnj-V9HUARp4CudRC1YVUmROOTwQc6Eh56eXzru7u7Jd8yYxb3',
    caption:
      'Mushola madrasah yang bersih, nyaman, dan representatif untuk pelaksanaan sholat fardhu berjamaah, sholat Dhuha, tadarus Al-Qur’an.',
    specs: ['Tempat Wudhu Bersih & Terpisah', 'Pembiasaan Sholat Berjamaah'],
  },
];

export const achievementsData: AchievementItem[] = [
  {
    id: 'ksm-nasional',
    competition: 'Kompetisi Sains Madrasah (KSM) Bidang Fisika Terintegrasi',
    rank: 'Juara 1 (Medali Emas)',
    level: 'Nasional',
    year: '2024',
    studentName: 'Ahmad Faiz Rabbani',
    category: 'Sains & Riset',
    photo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBI9aP0AZxrzPw7xsOZPz9t5Su9Elm7--UhX0-qq1f6VfptUBmP7C6u6s0U3OpJ3PcOfTNcZ5zWZrcgmQtpqzqSywATcgeI_k5X2hRAKYViX-LBtXc-kPAa-OwW-fWv1m7DbMe6eBajUJ3GenRe0UScn-6KU55Rnv1LYvBrwddmy2uLgAyDi5o3Sv_Prv1_cCSx_CGUQsEDNjxMXLoEM7IFUYaXRAGSw5r6ZngC8kD5m5vxd3Cgcrks',
  },
  {
    id: 'mtq-nasional',
    competition: 'Musabaqah Hifdzil Qur’an (MHQ) 20 Juz Putra',
    rank: 'Juara 2 Nasional',
    level: 'Nasional',
    year: '2024',
    studentName: 'Muhammad Ziyad Al-Farabi',
    category: 'Keagamaan & MTQ',
    photo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DbHgeGKz8zTjaju9EBo8ad7u9USuMwRIVdxIHYiatnfPx34V6rg2hOiWOokjXpqxaWKvEXAKAGgfleMikv3aDbgiCjBW9sWqv97Vjr9d0Bszq_M6fOA_wQRyAgbBetVEe7q-nhIyviXkge4J6r7VsPevHNcdCxstYMFZSurmex4C0I5EjzDKOlCj-fYmXtCMsGkdORTubTi-y5Cs043srpE7q9xXC_aH3yZRmCG-2z7ARN5_C4ZD',
  },
  {
    id: 'myres-kemenag',
    competition: 'Madrasah Young Researchers Supercamp (MYRES) Bidang MST',
    rank: 'Juara 1 Terbaik Nasional',
    level: 'Nasional',
    year: '2024',
    studentName: 'Nadia Azzahra & Annisa Khairunnisa',
    category: 'Sains & Riset',
    photo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBSJmTxQ2bP3DjpyqGG-fVNJG5PsODXaqW-HbtScF_F--5xJvGJ2Ntp0F2AhgS3bBM49Mvggxj3D7RAvyV5OmUF3qKrC4v-eSwUuFIRa0ibf7i3lMeBDzqdI4UcSvC1GcbZ7aJUCl3volnF5xt_33T1hwJ1Z4bIyBLgiTKag0zS6dIoB7tnKOWjiaaLyRmTgV6qmybsOt7nE3mkHrv1aJA81spOPmqFreBpQjiQivSnMuQfy3JuRZXR',
  },
  {
    id: 'debat-arab',
    competition: 'Olimpiade Bahasa Arab (OBA) Tingkat Provinsi Jawa Tengah',
    rank: 'Juara 1',
    level: 'Provinsi',
    year: '2024',
    studentName: 'Lathifah Nur Azizah',
    category: 'Bahasa & Diplomasi',
    photo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCT3p7Mx3Arq5TNWXMyAH5OQE0lVcciytoId2mYLtJhm9jLlfWpqcy0lRrZPZ8cnpUB-oslL_XkcCDSoE4b1xBl6LvBJGonOLo8nmjX_pTJ0-zhd6jalDAMI8pIzF2JXu7F7G4zNEl5QWCTONrSGplJswkRq4UKDBJ_Pjs6k5Gl-7MSgpjjNiQbtwAhy7FBi4egj9l2b2V3vdz-VZmaEp-HhMsKHibtbrnYwO1wECTJHsdfsQKOm8xX',
  },
  {
    id: 'silat-nasional',
    competition: 'Pekan Olahraga dan Seni Ma’arif (PORSEMA)',
    rank: 'Medali Emas Kelas C Putra',
    level: 'Provinsi',
    year: '2024',
    studentName: 'Rayhan Surya Pratama',
    category: 'Olahraga & Seni',
    photo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDCtOFdgwlQ29aF6S4_jQEADnDOB25uGJL2XtjS_fhh9GW9-uPXKPYh6cX8_wjD9PNyx4O4MPEGtEj5n_7rg4qS-yYQGk42tSf6jS6bbXchteNKYAPhjGdxWBO1tRUpYLxS4N8ubVMvvlL9I7Tmk2Vh2Du5Ez8nzWG-U8H5D7qybQovF2_wifIoeeN5qegQTmY2AVLrr5W-V1UZRsJSlZqG6y14ZU8uFZa3Osjg9iRKee0G244yajVj',
  },
  {
    id: 'mun-internasional',
    competition: 'ASEAN Youth Model United Nations (Diplomacy Session)',
    rank: 'Honorable Mention Delegate',
    level: 'Nasional',
    year: '2023',
    studentName: 'Bilal Malik Ibrahim',
    category: 'Bahasa & Diplomasi',
    photo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA-CpZRD9QAhYO1abFIn-chE6zOG8j6YFoShDwv5hS1e4uH1aKYQBlEQchWwyJPCy-cLpdMsKAZmum1Ce72oSTNoANJZeZTEpWtCy__3mDXytOVRpuqG9x7XbdbX57RzHTUpMXJ64c3rZ9hvqpAN0Jf0liorIMU_P3nI9FWflzg0iLs7HWwzO3GNeP78-IP7lk6trh2EpyJYcsq5B9BabW1sb4G9ZK1mwZWNPIUUs_Y4GybarKdmT_R',
  },
];

export const activitiesData: ActivityItem[] = [
  {
    id: 'pramuka',
    title: 'Kepanduan Pramuka (Gugus Depan)',
    category: 'Kepanduan & Karakter',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBWdhrEBTQLll9vbTQSxLx6c33Oow6IqZ-23UNA34TH5sAyMgoGcsYj0kfYJiV7Jubo76V1xEaLlbE8aKa6uDcgmmO9yrX0ts1EHQbLAhNumKxrbvr-3QNY7t5WOaFahAbGKT1PkacwStsknXI0kQzsczFiVskmjWcrRBK8uNTX0Il_OgSikM1ECAZQPcR6HJApSmIP76b_npb_56PKiM0ATvobmJ7TbP8tr04vem9tl8iwlwi3nJ_1',
    desc: 'Latihan kepanduan Pramuka pembentuk mental mandiri, kepemimpinan, kedisiplinan, tali-temali, pertolongan pertama, dan perkemahan bakti madrasah.',
    schedule: 'Jumat Sore',
  },
  {
    id: 'futsal',
    title: 'Ekstrakurikuler Futsal',
    category: 'Olahraga & Prestasi',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDCtOFdgwlQ29aF6S4_jQEADnDOB25uGJL2XtjS_fhh9GW9-uPXKPYh6cX8_wjD9PNyx4O4MPEGtEj5n_7rg4qS-yYQGk42tSf6jS6bbXchteNKYAPhjGdxWBO1tRUpYLxS4N8ubVMvvlL9I7Tmk2Vh2Du5Ez8nzWG-U8H5D7qybQovF2_wifIoeeN5qegQTmY2AVLrr5W-V1UZRsJSlZqG6y14ZU8uFZa3Osjg9iRKee0G244yajVj',
    desc: 'Pembinaan bakat olahraga futsal di lapangan interlock GOR madrasah, mengasah stamina, teknik kerja sama tim, dan persiapan kejuaraan antarsekolah.',
    schedule: 'Selasa & Sabtu Sore',
  },
  {
    id: 'tenis-meja',
    title: 'Ekstrakurikuler Tenis Meja',
    category: 'Olahraga & Ketangkasan',
    image:
      'https://images.unsplash.com/photo-1534158914592-062992fbe900?w=800&auto=format&fit=crop&q=80',
    desc: 'Latihan olahraga ketangkasan dan konsentrasi tenis meja dengan meja standar turnamen, bimbingan teknik pukulan servis, spin, smash, serta turnamen internal.',
    schedule: 'Rabu & Sabtu Sore',
  },
  {
    id: 'badminton',
    title: 'Ekstrakurikuler Badminton (Bulu Tangkis)',
    category: 'Olahraga & Prestasi',
    image:
      'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&auto=format&fit=crop&q=80',
    desc: 'Latihan bulu tangkis di lapangan indoor GOR madrasah, melatih kelincahan gerak kaki (footwork), refleks pukulan, dan pembibitan atlet O2SN tingkat daerah/nasional.',
    schedule: 'Kamis & Minggu Pagi',
  },
];

export const newsData: NewsItem[] = [
  {
    id: 'news-1',
    title: 'MA Uswatun Hasanah Raih Medali Emas KSM Nasional 2024 Bidang Fisika Terintegrasi',
    slug: 'ma-uswatun-hasanah-raih-emas-ksm-2024',
    category: 'Prestasi',
    date: '18 Oktober 2024',
    author: 'Tim Humas & Riset',
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBI9aP0AZxrzPw7xsOZPz9t5Su9Elm7--UhX0-qq1f6VfptUBmP7C6u6s0U3OpJ3PcOfTNcZ5zWZrcgmQtpqzqSywATcgeI_k5X2hRAKYViX-LBtXc-kPAa-OwW-fWv1m7DbMe6eBajUJ3GenRe0UScn-6KU55Rnv1LYvBrwddmy2uLgAyDi5o3Sv_Prv1_cCSx_CGUQsEDNjxMXLoEM7IFUYaXRAGSw5r6ZngC8kD5m5vxd3Cgcrks',
    summary:
      'Prestasi gemilang kembali ditorehkan siswa MA Uswatun Hasanah pada ajang bergengsi Kompetisi Sains Madrasah (KSM) Nasional yang diselenggarakan Kementerian Agama RI.',
    content: [
      'Alhamdulillah, ananda Ahmad Faiz Rabbani, siswa kelas XII MIPA Riset MA Uswatun Hasanah, berhasil mempersembahkan Medali Emas pada cabang lomba Fisika Terintegrasi Tingkat Nasional 2024.',
      'Ajang tahunan yang mempertemukan madrasah-madrasah terbaik se-Indonesia ini menguji pemahaman konsep sains tingkat tinggi yang diintegrasikan dengan dalil-dalil Al-Qur’an dan fiqih peradaban.',
      'Kepala Madrasah, Dr. KH. Abdullah Syukri, M.Ag., menyampaikan rasa syukur dan kebanggaannya atas dedikasi para guru pembimbing sains dan semangat belajar siswa dan siswi yang tak kenal lelah.',
    ],
    featured: true,
  },
  {
    id: 'news-2',
    title: 'SPMB Tahun Ajaran 2026/2027 Resmi Dibuka: Kuota Terbatas untuk 160 Siswa dan Siswi Terbaik',
    slug: 'spmb-ta-2026-2027-resmi-dibuka',
    category: 'Pengumuman',
    date: '02 Januari 2026',
    author: 'Panitia SPMB MAUH',
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA-CpZRD9QAhYO1abFIn-chE6zOG8j6YFoShDwv5hS1e4uH1aKYQBlEQchWwyJPCy-cLpdMsKAZmum1Ce72oSTNoANJZeZTEpWtCy__3mDXytOVRpuqG9x7XbdbX57RzHTUpMXJ64c3rZ9hvqpAN0Jf0liorIMU_P3nI9FWflzg0iLs7HWwzO3GNeP78-IP7lk6trh2EpyJYcsq5B9BabW1sb4G9ZK1mwZWNPIUUs_Y4GybarKdmT_R',
    summary:
      'Penerimaan Murid Baru (SPMB) Gelombang 1 tahun pelajaran 2026/2027 telah dibuka secara daring dengan empat pilihan jalur pendaftaran dan beasiswa pendidikan penuh.',
    content: [
      'Panitia SPMB MA Uswatun Hasanah mengumumkan pembukaan pendaftaran murid baru untuk tahun pelajaran 2026/2027. Pada periode ini, madrasah membuka empat jalur seleksi: Jalur Reguler, Jalur Prestasi Akademik/Sains, Jalur Beasiswa Tahfidz Qur’an, dan Jalur Afirmasi.',
      'Calon pendaftar diimbau untuk melengkapi dokumen pendaftaran secara mandiri melalui portal resmi SPMB sebelum batas penutupan Gelombang 1 pada 31 Maret 2026.',
      'Kuota yang dibuka tahun ini dibatasi hanya 160 siswa untuk menjaga rasio ideal guru-murid dan efektivitas pembelajaran di kelas.',
    ],
    featured: true,
  },
  {
    id: 'news-3',
    title: 'Wisuda Tahfidz & Sanad Juz 30: 42 Siswa & Siswi Lulus Uji Tashih Kemenag dengan Nilai Mumtaz',
    slug: 'wisuda-tahfidz-dan-sanad-42-santri',
    category: 'Keagamaan',
    date: '14 Desember 2024',
    author: 'Lembaga Tahfidz MAUH',
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD6DbHgeGKz8zTjaju9EBo8ad7u9USuMwRIVdxIHYiatnfPx34V6rg2hOiWOokjXpqxaWKvEXAKAGgfleMikv3aDbgiCjBW9sWqv97Vjr9d0Bszq_M6fOA_wQRyAgbBetVEe7q-nhIyviXkge4J6r7VsPevHNcdCxstYMFZSurmex4C0I5EjzDKOlCj-fYmXtCMsGkdORTubTi-y5Cs043srpE7q9xXC_aH3yZRmCG-2z7ARN5_C4ZD',
    summary:
      'Prosesi khidmat wisuda tahfidz dan penganugerahan sanad muttashil diselenggarakan di Masjid Jami’ Uswatun Hasanah dihadiri wali murid dan ulama perwakilan Kemenag.',
    content: [
      'Sebanyak 42 siswa dan siswi MA Uswatun Hasanah dinyatakan lulus dalam wisuda tahfidz tahunan setelah menempuh ujian sekali duduk di hadapan dewan muhaffizh dan pentashih resmi.',
      'Tercatat 15 siswa dan siswi menuntaskan hafalan 30 Juz lengkap, 18 siswa pada kategori 20 Juz, dan sisanya 10 Juz mutqin.',
      'Acara ditutup dengan penyematan mahkota kehormatan secara simbolis kepada para orang tua siswa dan siswi yang diwarnai isak haru bahagia.',
    ],
  },
  {
    id: 'news-4',
    title: 'Kemitraan Pendidikan: Delegasi Universitas Al-Azhar Kairo Kunjungi MA Uswatun Hasanah',
    slug: 'kemitraan-al-azhar-kairo-kunjungi-mauh',
    category: 'Akademik',
    date: '28 November 2024',
    author: 'Hubungan Luar Negeri',
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCT3p7Mx3Arq5TNWXMyAH5OQE0lVcciytoId2mYLtJhm9jLlfWpqcy0lRrZPZ8cnpUB-oslL_XkcCDSoE4b1xBl6LvBJGonOLo8nmjX_pTJ0-zhd6jalDAMI8pIzF2JXu7F7G4zNEl5QWCTONrSGplJswkRq4UKDBJ_Pjs6k5Gl-7MSgpjjNiQbtwAhy7FBi4egj9l2b2V3vdz-VZmaEp-HhMsKHibtbrnYwO1wECTJHsdfsQKOm8xX',
    summary:
      'Kerja sama strategis dalam program matrikulasi Bahasa Arab, pengiriman dosen tamu, dan jalur rekomendasi beasiswa studi sarjana ke Kairo Mesir.',
    content: [
      'MA Uswatun Hasanah menerima kunjungan kehormatan dari masyaikh Universitas Al-Azhar Kairo dalam rangka meninjau kurikulum bahasa dan penguatan literatur keislaman.',
      'Kemitraan ini membuka peluang beasiswa sarjana langsung bagi siswa dan siswi berprestasi yang lulus uji kemahiran Bahasa Arab (TOAFL).',
    ],
  },
  {
    id: 'news-5',
    title: 'Giat Kepanduan Pramuka: Siswa-Siswi Juara Umum Lomba Ketangkasan Baris-Berbaris Se-Jawa Barat',
    slug: 'santri-juara-umum-pramuka-jabar',
    category: 'Kegiatan',
    date: '08 November 2024',
    author: 'Pembina Pramuka',
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBWdhrEBTQLll9vbTQSxLx6c33Oow6IqZ-23UNA34TH5sAyMgoGcsYj0kfYJiV7Jubo76V1xEaLlbE8aKa6uDcgmmO9yrX0ts1EHQbLAhNumKxrbvr-3QNY7t5WOaFahAbGKT1PkacwStsknXI0kQzsczFiVskmjWcrRBK8uNTX0Il_OgSikM1ECAZQPcR6HJApSmIP76b_npb_56PKiM0ATvobmJ7TbP8tr04vem9tl8iwlwi3nJ_1',
    summary:
      'Gugus Depan MA Uswatun Hasanah berhasil memborong tiga piala bergengsi pada kemah bakti dan kompetisi kepanduan antarmadrasah tingkat provinsi.',
    content: [
      'Disiplin, kekompakan, dan ketangguhan fisik mengantarkan regu pramuka MAUH menyabet predikat Juara Umum LKBB se-Jawa Barat.',
      'Kegiatan kepanduan di MAUH didesain untuk menanamkan jiwa kepemimpinan Islam dan kesiapsiagaan menghadapi situasi darurat.',
    ],
  },
  {
    id: 'news-6',
    title: 'Upgrade Fasilitas: Smart Interactive Flat Panel Hadir di Seluruh Ruang Kelas',
    slug: 'upgrade-smart-interactive-flat-panel-kelas',
    category: 'Akademik',
    date: '20 September 2024',
    author: 'Sarana & Prasarana',
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBSJmTxQ2bP3DjpyqGG-fVNJG5PsODXaqW-HbtScF_F--5xJvGJ2Ntp0F2AhgS3bBM49Mvggxj3D7RAvyV5OmUF3qKrC4v-eSwUuFIRa0ibf7i3lMeBDzqdI4UcSvC1GcbZ7aJUCl3volnF5xt_33T1hwJ1Z4bIyBLgiTKag0zS6dIoB7tnKOWjiaaLyRmTgV6qmybsOt7nE3mkHrv1aJA81spOPmqFreBpQjiQivSnMuQfy3JuRZXR',
    summary:
      'Komitmen digitalisasi madrasah terwujud melalui pemasangan layar sentuh interaktif multimedia 75 inci untuk mendukung metode belajar kolaboratif abad 21.',
    content: [
      'Guna menghadirkan pengalaman belajar yang dinamis dan visual, madrasah telah menyelesaikan instalasi Interactive Flat Panel di setiap ruang kelas.',
      'Guru serta siswa dan siswi kini dapat berkolaborasi membedah materi sains 3D, simulasi laboratorium virtual, dan mempresentasikan riset dengan mulus.',
    ],
  },
];

export const spmbTracks: SpmbTrack[] = [
  {
    id: 'reguler',
    name: 'Jalur Reguler',
    badge: 'Tes Seleksi Mandiri',
    desc: 'Jalur seleksi berbasis tes potensi akademik komputer (CBT), tes kemampuan membaca Al-Qur’an (tahsin/tajwid), dan wawancara kepribadian calon siswa/siswi serta orang tua.',
    benefits: [
      'Pilihan jurusan: MIPA atau IPS',
      'Fasilitas laboratorium & pembelajaran modern terpadu',
      'DISKON 50% Infaq Gedung & Sarana bagi pendaftar Gelombang 1',
    ],
    requirements: [
      'Lulusan MTs / SMP sederajat tahun 2025 atau 2026',
      'Rapor semester 1 s.d 5 (nilai rata-rata minimal 75)',
      'Mengikuti rangkaian tes CBT dan wawancara',
    ],
    icon: 'edit_note',
  },
  {
    id: 'prestasi',
    name: 'Jalur Prestasi Unggulan',
    badge: 'Bebas Uang Pangkal Gedung',
    desc: 'Didedikasikan bagi siswa berprestasi di bidang sains (OSN/KSM), riset ilmiah (MYRES/OPSI), bahasa, maupun olahraga & seni tingkat kabupaten, provinsi, atau nasional.',
    benefits: [
      'Bebas biaya tes akademik (Langsung verifikasi berkas)',
      'Pembebasan 100% biaya Infaq Pembangunan Sarana Gedung',
      'Pembinaan khusus masuk tim olimpiade sains madrasah',
    ],
    requirements: [
      'Sertifikat Juara 1-3 resmi Kemenag, Kemendikbud, atau KONI',
      'Rapor semester 1 s.d 5 dengan nilai mapel terkait minimal 85',
      'Rekomendasi dari Kepala Sekolah / Madrasah asal',
    ],
    icon: 'military_tech',
    isPopular: true,
  },
  {
    id: 'tahfidz',
    name: 'Jalur Beasiswa Tahfidz Qur’an',
    badge: 'Bebas Biaya SPP s.d 100%',
    desc: 'Fasilitas beasiswa pendidikan bertingkat hingga gratis SPP penuh bagi penghafal Al-Qur’an yang lulus uji sima’an tashih dewan muhaffizh.',
    benefits: [
      'Hafal 5 - 9 Juz: Beasiswa SPP 50% selama 3 tahun',
      'Hafal 10 - 19 Juz: Beasiswa SPP 75% + Infaq Gedung 50%',
      'Hafal 20 - 30 Juz: Beasiswa Bebas Biaya SPP & Pendidikan Penuh 100%',
      'Bimbingan langsung sanad muttashil Al-Qur’an',
    ],
    requirements: [
      'Memiliki hafalan Al-Qur’an minimal 5 Juz mutqin',
      'Lulus uji sima’an langsung bersama Dewan Muhaffizh MAUH',
      'Surat keterangan / syahadah dari pesantren/rumah tahfidz',
    ],
    icon: 'auto_stories',
    isPopular: true,
  },
  {
    id: 'khusus',
    name: 'Jalur Afirmasi & Dhuafa Berprestasi',
    badge: 'Bantuan KIP & Mitra BAZNAS',
    desc: 'Skema pembiayaan khusus untuk memberikan kesempatan pendidikan madrasah berkualitas bagi siswa dan siswi berprestasi dari keluarga pemegang KIP / PKH.',
    benefits: [
      'Subsidi penuh biaya pendidikan melalui kemitraan BAZNAS',
      'Bantuan paket seragam dan buku modul pembelajaran',
      'Pembinaan pembekalan wirausaha dan life-skills',
    ],
    requirements: [
      'Memiliki Kartu Indonesia Pintar (KIP) / PKH / SKTM resmi',
      'Rapor semester 1 s.d 5 dengan rata-rata nilai minimal 80',
      'Lolos survei verifikasi faktual tim panitia',
    ],
    icon: 'handshake',
  },
];

export const spmbSteps: SpmbStep[] = [
  {
    step: 1,
    title: 'Isi Formulir Online',
    desc: 'Lengkapi biodata calon siswa, pilihan jurusan, jalur masuk, serta nomor kontak WhatsApp aktif orang tua / wali murid.',
    icon: 'app_registration',
    duration: '15 Menit',
  },
  {
    step: 2,
    title: 'Unggah Berkas Persyaratan',
    desc: 'Unggah pindaian (scan) Kartu Keluarga, Rapor semester 1-5, NISN, dan sertifikat prestasi penunjang jalur.',
    icon: 'upload_file',
    duration: 'Format PDF/JPG',
  },
  {
    step: 3,
    title: 'Verifikasi Berkas Panitia',
    desc: 'Panitia SPMB memeriksa keabsahan dokumen dan menerbitkan Kartu Tanda Peserta Ujian beserta jadwal tes.',
    icon: 'fact_check',
    duration: '1-2 Hari Kerja',
  },
  {
    step: 4,
    title: 'Asesmen & Tes Seleksi',
    desc: 'Pelaksanaan ujian potensi akademik komputer (CBT), tes baca tahsin Al-Qur’an, dan wawancara calon siswa/siswi serta wali murid.',
    icon: 'psychology',
    duration: 'Online / Tatap Muka',
  },
  {
    step: 5,
    title: 'Pengumuman Kelulusan',
    desc: 'Hasil seleksi diumumkan secara transparan melalui portal SPMB website dan notifikasi resmi WhatsApp.',
    icon: 'campaign',
    duration: 'Sesuai Kalender',
  },
  {
    step: 6,
    title: 'Daftar Ulang & Pengukuran Seragam',
    desc: 'Penyerahan berkas fisik, administrasi daftar ulang, pengukuran seragam, dan masa ta’aruf siswa baru (MATSAMA).',
    icon: 'verified_user',
    duration: 'Resmi Menjadi Siswa Baru',
  },
];

export const spmbSchedule: SpmbScheduleItem[] = [
  {
    event: 'Pendaftaran Online & Unggah Berkas',
    wave1: '1 Jan - 31 Mar 2026',
    wave2: '1 Apr - 15 Jun 2026',
    note: 'Melalui portal spmb.uswatunhasanah.sch.id',
  },
  {
    event: 'Verifikasi Administrasi Berkas',
    wave1: 'Setiap Hari Kerja',
    wave2: 'Setiap Hari Kerja',
    note: 'Notifikasi via WhatsApp pendaftar',
  },
  {
    event: 'Pelaksanaan Tes Seleksi (CBT & Tahfidz)',
    wave1: 'Sabtu, 11 April 2026',
    wave2: 'Sabtu, 20 Juni 2026',
    note: 'Tatap muka di kampus / online Zoom luar pulau',
  },
  {
    event: 'Pengumuman Kelulusan',
    wave1: 'Rabu, 15 April 2026',
    wave2: 'Rabu, 24 Juni 2026',
    note: 'Pengumuman di web & portal akun pendaftar',
  },
  {
    event: 'Daftar Ulang & Pengukuran Seragam',
    wave1: '16 - 25 April 2026',
    wave2: '25 - 30 Juni 2026',
    note: 'Sekretariat Panitia SPMB MAUH',
  },
  {
    event: 'Awal Masuk & MATSAMA (Orientasi Siswa Baru)',
    wave1: '13 Juli 2026',
    wave2: '13 Juli 2026',
    note: 'Serentak bersama siswa-siswi baru 2026/2027',
  },
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: 'testi-1',
    name: 'Drs. H. Rachmat Hidayat',
    role: 'Wali Murid M. Fikri (Alumni 2024 - Mahasiswa FK UNAIR)',
    status: 'Orang Tua',
    avatarText: 'RH',
    rating: 5,
    quote:
      'Alhamdulillah, putra kami tidak hanya menuntaskan hafalan 15 Juz selama di MA Uswatun Hasanah, tapi juga lulus SNBT masuk Fakultas Kedokteran Unair. Pembinaan karakternya tertib, guru-gurunya membimbing layaknya orang tua kandung.',
    achievementBadge: 'Anak Lolos FK UNAIR & Hafidz 15 Juz',
  },
  {
    id: 'testi-2',
    name: 'Hj. Siti Nurkhalifah, S.Pd.',
    role: 'Wali Siswa Aisyah (Kelas XI Program MIPA Riset)',
    status: 'Orang Tua',
    avatarText: 'SN',
    rating: 5,
    quote:
      'Sistem pelaporan progres belajar digitalnya memudahkan kami yang berada di luar kota untuk memantau setoran hafalan dan nilai ujian putri kami setiap pekan. Lingkungannya aman, bersih, dan sangat kondusif bagi muslimah.',
    achievementBadge: 'Sistem Monitoring Belajar Transparan',
  },
  {
    id: 'testi-3',
    name: 'Ahmad Zaki Mubarak, Lc.',
    role: 'Alumni 2022 - Mahasiswa Fakultas Ushuluddin Univ. Al-Azhar Kairo Mesir',
    status: 'Alumni',
    avatarText: 'AZ',
    rating: 5,
    quote:
      'Penguasaan Bahasa Arab di MA Uswatun Hasanah sangat ditekankan dengan metode praktis. Berkat rekomendasi para asatidz madrasah dan sertifikat TOAFL, saya bisa lolos beasiswa penuh studi ke Mesir tanpa kendala adaptasi bahasa.',
    achievementBadge: 'Penerima Beasiswa Al-Azhar Mesir',
  },
  {
    id: 'testi-4',
    name: 'Nadia Azzahra',
    role: 'Siswi Kelas XII - Juara 1 MYRES Kemenag Bidang MST 2024',
    status: 'Siswa',
    avatarText: 'NA',
    rating: 5,
    quote:
      'Di madrasah ini minat riset saya difasilitasi penuh. Laboratorium komputernya lengkap, bimbingan para guru sangat sabar hingga kami bisa memenangkan medali emas penelitian ilmiah tingkat nasional.',
    achievementBadge: 'Peneliti Muda Berprestasi Nasional',
  },
];

export const alumniData: AlumniItem[] = [
  {
    id: 'alumni-5',
    name: 'TRI MUKTI WIBOWO',
    graduationYear: 'Alumni Tahun 2023',
    currentRole: 'Prajurit TNI-AD',
    institution: 'YONIF TP 443',
    major: '',
    photo: '/images/tri_mukti_wibowo.png',
    photoPosition: '50% 0%',
    photoScale: 1.04,
    quote:
      'Saat bersekolah di MA Uswatun Hasanah banyak sekali ilmu pengetahuan dan wawasan yang saya dapatkan serta banyak sekali kegiatan pendukung yang bisa mengembangkan hardskill dan softskill saya, sehingga saya bisa seperti sekarang ini. Terimakasih Bapak/Ibu Guru semua dan semoga MA Uswatun Hasanah semakin maju. Pesan saya: Tetap semangat jangan menyerah! Kegagalan adalah suatu pembelajaran bukan suatu kegagalan.',
  },
  {
    id: 'alumni-2',
    name: 'Akhmad Nurasikin, S.E.I., M.H.',
    graduationYear: 'Lulusan 2008',
    currentRole: 'Sekretaris Prodi HES & Manajer Sertifikasi LSP',
    institution: 'Universitas Wahid Hasyim Semarang (UNWAHAS)',
    major: '',
    photo: '/images/akhmad_nurasikin.jpg?v=5',
    photoPosition: '50% 0%',
    photoScale: 1.06,
    quote:
      'Selama menempuh pendidikan di MA Uswatun Hasanah, saya mendapatkan banyak pengalaman berharga, baik dari sisi ilmu agama maupun pembentukan karakter. Para guru tidak hanya mengajarkan ilmu, tetapi juga menanamkan nilai-nilai keikhlasan, kedisiplinan, dan tanggung jawab. Nilai-nilai tersebut menjadi bekal penting dalam perjalanan karir dan kehidupan saya hingga saat ini. Terima kasih kepada seluruh guru dan civitas MA Uswatun Hasanah yang telah menjadi bagian penting dalam perjalanan hidup saya.',
  },
  {
    id: 'alumni-1',
    name: 'Asiroch Yulia A, S.E.I., M.E.I.',
    graduationYear: 'Lulusan 2008',
    currentRole: 'Dosen',
    institution: 'Univ Nahdlatul Ulama Indonesia (UNUSIA)',
    major: '',
    photo: '/images/asiroch_yulia.jpg',
    quote:
      'MA Uswatun Hasanah bukan hanya tempat menimba ilmu, tapi juga tempat membentuk karakter dan spiritualitas. Saya yakin, keberhasilan dan pencapaian yang saya raih hari ini merupakan buah dari pendidikan yang penuh berkah di madrasah tercinta ini. Semoga MA Uswatun Hasanah terus melahirkan generasi berilmu, berakhlak, dan berdaya guna bagi umat dan bangsa.',
  },
  {
    id: 'alumni-4',
    name: 'Laily Mahmudah',
    graduationYear: 'Alumni Tahun 2014',
    currentRole: 'Nurse',
    institution: 'Saudi Arabia',
    major: '',
    photo: '/images/laily_mahmudah.jpg?v=3',
    photoPosition: '50% 8%',
    quote:
      'Selama bersekolah di MA USWAH, saya mendapatkan pengalaman yang berharga. Tidak hanya diajarkan ilmu pengetahuan, tetapi juga dibentuk karakter, disiplin, dan rasa tanggung jawab. Para guru membimbing dengan penuh kesabaran dan teladan sehingga madrasah ini terasa seperti rumah kedua. Untuk adik-adik kelas, tetap semangat mengejar cita-cita, manfaatkan waktu sebaik mungkin, dan jangan sia-siakan kesempatan yang ada!',
  },
  {
    id: 'alumni-3',
    name: "Fatatun Nafi'ah, S.Pd.",
    graduationYear: 'Alumni Tahun 2015',
    currentRole: 'Bendahara Madrasah',
    institution: 'MTs Darul Ishlah Sukorejo',
    major: '',
    photo: '/images/fatatun_nafiah.jpg?v=3',
    photoPosition: '50% 12%',
    quote:
      'Kesan saya selama menempuh pendidikan di MA Uswatun Hasanah Semarang sangat berkesan dan tak terlupakan. Lingkungan madrasah yang religius, para guru yang sabar dan penuh kasih sayang, serta teman-teman yang saling mendukung telah membentuk karakter saya hingga menjadi seperti sekarang. Pesan saya untuk adik-adik, manfaatkan waktu belajar sebaik mungkin, hormati guru, dan teruslah berprestasi agar bisa membawa nama baik madrasah tercinta.',
  },
];

export const faqData: FaqItem[] = [
  {
    question: 'Siapa saja yang dapat mendaftar di SPMB MA Uswatun Hasanah?',
    answer:
      'Seluruh siswa-siswi yang saat ini berada di kelas IX (sembilan) atau telah lulus dari jenjang MTs / SMP / Pesantren sederajat negeri maupun swasta di seluruh Indonesia, serta memenuhi kriteria sehat jasmani dan rohani.',
    category: 'SPMB',
  },
  {
    question: 'Apa saja dokumen persyaratan yang harus diunggah?',
    answer:
      'Pindaian (scan) Kartu Keluarga (KK), Akta Kelahiran, NISN yang valid, Rapor semester 1 s.d 5 yang dilegalisir, pas foto terbaru berpakaian rapi dengan latar belakang merah/biru, serta sertifikat prestasi bagi peminat Jalur Prestasi/Tahfidz.',
    category: 'SPMB',
  },
  {
    question: 'Apakah ada program beasiswa untuk siswa berprestasi dan penghafal Qur’an?',
    answer:
      'Ya, kami menyediakan Beasiswa Tahfidz Qur’an (bebas SPP 50% hingga 100% untuk siswa dan siswi hafal 5 s.d 30 Juz mutqin), Beasiswa Prestasi Juara KSM/OSN (pembebasan uang pangkal gedung), serta Jalur Afirmasi bekerjasama dengan BAZNAS untuk dhuafa berprestasi.',
    category: 'Biaya',
  },
  {
    question: 'Bagaimana jam kegiatan belajar mengajar harian di MA Uswatun Hasanah?',
    answer:
      'Pembelajaran reguler berlangsung hari Senin hingga Jumat mulai pukul 07.00 s.d 15.30 WIB, diawali dengan pembiasaan tadarus Al-Qur’an dan salat Dhuha bersama, dilanjutkan kurikulum akademik terpadu, praktikum laboratorium, dan ekstrakurikuler.',
    category: 'Akademik',
  },
  {
    question: 'Bagaimana pelaksanaan tes seleksi bagi pendaftar dari luar kota atau luar provinsi?',
    answer:
      'Bagi calon pendaftar yang berdomisili di luar wilayah Kota Semarang / Jawa Tengah, pelaksanaan ujian potensi akademik berbasis komputer (CBT), tes sima’an tahfidz, dan wawancara dapat difasilitasi secara online melalui platform video conference Zoom interaktif.',
    category: 'SPMB',
  },
  {
    question: 'Apakah ijazah MA Uswatun Hasanah diakui untuk seleksi Kedinasan, Akmil/Akpol, dan PTN?',
    answer:
      'Sangat diakui secara penuh. Ijazah resmi Madrasah Aliyah MA Uswatun Hasanah memiliki kedudukan hukum dan kurikulum yang setara dengan SMA/SMK Negeri untuk seleksi SNBP, SNBT, STAN, IPDN, Akpol, Akmil, serta universitas luar negeri.',
    category: 'Akademik',
  },
  {
    question: 'Berapa rincian biaya pendaftaran dan tahapan daftar ulang?',
    answer:
      'Pendaftaran akun formulir SPMB online sepenuhnya GRATIS (Rp 0). Biaya administrasi daftar ulang bagi siswa dan siswi yang dinyatakan lulus seleksi diumumkan secara transparan dengan skema cicilan hingga 3 kali, dan terdapat potongan subsidi bagi pendaftar Gelombang 1.',
    category: 'Biaya',
  },
];

export interface TeacherItem {
  id: string;
  name: string;
  nip?: string;
  position: string;
  subjects: string[];
  category: 'pimpinan' | 'pai' | 'mipa' | 'ips' | 'bahasa' | 'umum';
  categoryLabel: string;
  education: string;
  photo: string;
  experience?: string;
  certifications?: string[];
  quote?: string;
  email?: string;
  birthPlaceDate?: string;
  address?: string;
  photoPosition?: string;
}

export const teachersData: TeacherItem[] = [
  {
    id: 'guru-1',
    name: 'Laily Hidayah, S.Pd.',
    position: 'Kepala Madrasah',
    subjects: ['Ekonomi'],
    category: 'pimpinan',
    categoryLabel: 'Pimpinan & IPS',
    birthPlaceDate: 'Magelang, 15 Oktober 1976',
    address: 'Jl. Bukit Beringin Timur VI/E-158 Rt 02 RW 010 Gondoriyo Ngaliyan',
    education: 'S1 Pendidikan Ekonomi',
    photo: '/images/laily_hidayah.jpg',
    photoPosition: 'center 10%',
    experience: 'Pendidik & Kepala Madrasah',
    certifications: ['Pendidik Profesional Bersertifikat', 'Kepala Madrasah Berprestasi'],
    quote: 'Membimbing generasi Qur’ani yang berkarakter, berilmu amaliyah, dan berakhlakul karimah untuk masa depan gemilang.',
    email: 'laily.hidayah@mauhasanah.sch.id',
  },
  {
    id: 'guru-2',
    name: 'Nur Walidah Afriyani, S.Pd.',
    position: 'Waka Kurikulum',
    subjects: ['Matematika', 'Informatika'],
    category: 'mipa',
    categoryLabel: 'Pimpinan & MIPA',
    birthPlaceDate: 'Kendal, 03 April 1993',
    address: 'Suking RT. 007/ RW. 003 Sumberojo Kaliwungu Kendal',
    education: 'S1 Pendidikan Matematika',
    photo: '/images/nur_walidah_afriyani.jpg',
    photoPosition: 'center 15%',
    experience: 'Pendidik & Waka Kurikulum',
    certifications: ['Pendidik Profesional Bersertifikat', 'Instruktur Kurikulum Merdeka'],
    quote: 'Matematika dan informatika melatih logika berpikir sistematis, kritis, dan solutif bagi kemajuan madrasah.',
    email: 'nur.walidah@mauhasanah.sch.id',
  },
  {
    id: 'guru-3',
    name: 'Italia, M.Pd.',
    position: 'Waka Kesiswaan',
    subjects: ['Sejarah', 'Geografi'],
    category: 'ips',
    categoryLabel: 'Pimpinan & IPS',
    birthPlaceDate: 'Kab. Semarang, 11 Desember 1989',
    address: 'Genjahan RT. 001 RW. 008 Ponjong Gunungkidul Yogyakarta',
    education: 'S2 Magister Pendidikan Ilmu Pengetahuan Sosial (IPS)',
    photo: '/images/italia_mpd.jpg',
    photoPosition: 'center 15%',
    experience: 'Pendidik & Waka Kesiswaan',
    certifications: ['Pendidik Profesional Bersertifikat', 'Pembina Kesiswaan & Karakter'],
    quote: 'Membimbing dan mendampingi potensi kesiswaan dengan teladan moral, kedisiplinan, dan budi pekerti luhur.',
    email: 'italia@mauhasanah.sch.id',
  },
  {
    id: 'guru-4',
    name: 'Siti Afriatun, S.Pd.',
    position: 'Bendahara Madrasah',
    subjects: ['Matematika'],
    category: 'mipa',
    categoryLabel: 'Pimpinan & MIPA',
    birthPlaceDate: 'Semarang, 13 April 1990',
    address: 'Kemantren Rt 04/RW 005 Wonosari Ngaliyan',
    education: 'S1 Pendidikan Matematika',
    photo: '/images/siti_afriatun.jpg',
    photoPosition: 'center 15%',
    experience: 'Pendidik & Bendahara',
    certifications: ['Pendidik Profesional Bersertifikat', 'Pengelolaan Administrasi Keuangan Madrasah'],
    quote: 'Amanah, ketelitian, dan kejujuran adalah pondasi utama dalam mengemban tata kelola keuangan madrasah.',
    email: 'siti.afriatun@mauhasanah.sch.id',
  },
  {
    id: 'guru-5',
    name: 'Nur Azizah, S.Sos.',
    position: 'Guru Bimbingan Konseling (BK)',
    subjects: ['Bimbingan Konseling (BK)', 'Praktik Ibadah'],
    category: 'umum',
    categoryLabel: 'BK & Umum',
    birthPlaceDate: 'Kendal, 06 April 1989',
    address: 'Kp. Sarimanan Barat Rt. 02/ Rw. 04 Kutoharjo Kaliwungu Kendal',
    education: 'S1 Sosiologi / Bimbingan Sosial',
    photo: '/images/nur_azizah_bk.jpg',
    photoPosition: 'center 15%',
    experience: 'Pendidik & Konselor Siswa',
    certifications: ['Konselor Remaja Madrasah', 'Pendidik Bimbingan Karakter'],
    quote: 'Mendengarkan dengan empati, mendampingi dengan hati, dan menuntun langkah siswa menuju pribadi mandiri yang berakhlak mulia.',
    email: 'nur.azizah@mauhasanah.sch.id',
  },
  {
    id: 'guru-6',
    name: 'Nuril Amalia, S.TP.',
    position: 'Tata Usaha (TU)',
    subjects: ['Administrasi Madrasah', 'Layanan Surat & Kearsipan'],
    category: 'umum',
    categoryLabel: 'Tata Usaha & Kependidikan',
    birthPlaceDate: 'Semarang, 30 Juli 1986',
    address: 'Tegalsari RT 001/ RW 006 Sumur Brangsong',
    education: 'S1 Teknologi Pertanian (S.TP)',
    photo: '/images/nuril_amalia.jpg',
    photoPosition: 'center 15%',
    experience: 'Staf Administrasi & Tata Usaha',
    certifications: ['Sertifikasi Manajemen Administrasi Sekolah', 'Layanan Prima Kearsipan'],
    quote: 'Pelayanan administrasi yang tertib, cepat, dan ramah merupakan kunci kelancaran kegiatan madrasah.',
    email: 'nuril.amalia@mauhasanah.sch.id',
  },
  {
    id: 'guru-7',
    name: 'Mahmudah Nur Khasanah, S.Pd.',
    position: 'Wali Kelas XII UMUM',
    subjects: ['Seni Budaya', 'Bahasa Inggris'],
    category: 'bahasa',
    categoryLabel: 'Bahasa & Seni',
    birthPlaceDate: 'Semarang, 07 Mei 1975',
    address: 'Mangkang Wetan Kauman RT 003/RW 003 Tugu Kota Semarang',
    education: 'S1 Pendidikan Bahasa Inggris / Pendidikan Seni',
    photo: '/images/mahmudah_nur_khasanah.jpg',
    photoPosition: 'center 15%',
    experience: 'Pendidik Senior & Wali Kelas',
    certifications: ['Pendidik Profesional Bersertifikat', 'Pembina Seni Budaya & Bahasa'],
    quote: 'Mengembangkan apresiasi budaya dan kemampuan bahasa asing untuk mencetak generasi berkarakter luhur dan berdaya saing global.',
    email: 'mahmudah.nur@mauhasanah.sch.id',
  },
  {
    id: 'guru-8',
    name: 'Choiri, S.Pd.I.',
    position: 'Wali Kelas X UMUM',
    subjects: ['Bahasa Arab', 'Praktik Ibadah'],
    category: 'pai',
    categoryLabel: 'Rumpun PAI & Bahasa',
    birthPlaceDate: 'Semarang, 17 Agustus 1969',
    address: 'Mangkang Kulon RT002/RW 002 Tugu Kota Semarang',
    education: 'S1 Pendidikan Agama Islam (S.Pd.I)',
    photo: '/images/choiri_spdi.jpg',
    photoPosition: 'center 12%',
    experience: 'Pendidik Senior & Wali Kelas',
    certifications: ['Pendidik Profesional Bersertifikat', 'Pembimbing Praktik Ibadah & Bahasa Arab'],
    quote: 'Membina generasi muda dengan penguasaan bahasa Arab dan keteladanan ibadah amaliah yang kokoh.',
    email: 'choiri@mauhasanah.sch.id',
  },
  {
    id: 'guru-9',
    name: 'Kurnia Yulianti, S.Pd.',
    position: 'Wali Kelas XI UMUM',
    subjects: ['Bahasa Indonesia'],
    category: 'bahasa',
    categoryLabel: 'Rumpun Bahasa',
    birthPlaceDate: 'Semarang, 21 Juli 1989',
    address: 'Karanganyar RT. 007/ RW. 001 Tugu Kota Semarang',
    education: 'S1 Pendidikan Bahasa dan Sastra Indonesia',
    photo: '/images/kurnia_yulianti.jpg',
    photoPosition: 'center 15%',
    experience: 'Pendidik & Wali Kelas XI',
    certifications: ['Pendidik Profesional Bersertifikat', 'Pembina Literasi & Kepenulisan'],
    quote: 'Bahasa Indonesia adalah identitas bangsa dan jembatan penalaran pikiran yang santun serta bermartabat.',
    email: 'kurnia.yulianti@mauhasanah.sch.id',
  },
  {
    id: 'guru-10',
    name: 'Dra. Hj. Muslikhah',
    position: 'Guru Pengampu PAI',
    subjects: ['Al-Qur’an Hadits (QH)', 'Aqidah Akhlak (AA)', 'Fiqih'],
    category: 'pai',
    categoryLabel: 'Rumpun PAI',
    birthPlaceDate: 'Kendal, 17 September 1964',
    address: 'Mangkang Wetan Kauman RT 001/ RW 003 Tugu Kota Semarang',
    education: 'Dra. Pendidikan Agama Islam',
    photo: '/images/muslikhah.jpg',
    photoPosition: 'center 15%',
    experience: 'Pendidik Senior PAI',
    certifications: ['Pendidik Profesional Bersertifikat', 'Pembina Akhlak & Keagamaan'],
    quote: 'Menanamkan kecintaan kepada Al-Qur’an dan pembiasaan fiqih ibadah sejak dini demi membentengi akhlak mulia generasi madrasah.',
    email: 'muslikhah@mauhasanah.sch.id',
  },
  {
    id: 'guru-11',
    name: 'Mukhidin, S.Ag., S.Pd.',
    position: 'Guru Pengampu IPS',
    subjects: ['Sosiologi', 'Antropologi', 'Geografi'],
    category: 'ips',
    categoryLabel: 'Rumpun IPS',
    birthPlaceDate: 'Kendal, 22 Februari 1967',
    address: 'Jln. Masjid Gg. KH. Muhdlor RT. 04 RW. 01 Ngilir Kendal',
    education: 'S1 Sarjana Agama (S.Ag.) & S1 Sarjana Pendidikan (S.Pd.)',
    photo: '/images/mukhidin.jpg',
    photoPosition: 'center 15%',
    experience: 'Pendidik Senior Rumpun IPS',
    certifications: ['Pendidik Profesional Bersertifikat', 'Pembina Pengkajian Sosial Kemasyarakatan'],
    quote: 'Memahami dinamika sosial, kearifan lokal antropologi, dan ruang geografi demi menumbuhkan kepedulian insan madrasah terhadap sesama.',
    email: 'mukhidin@mauhasanah.sch.id',
  },
  {
    id: 'guru-12',
    name: 'Ina Rotul Uliya, S.Pd.',
    position: 'Guru Pengampu Bahasa Inggris',
    subjects: ['Bahasa Inggris'],
    category: 'bahasa',
    categoryLabel: 'Rumpun Bahasa',
    birthPlaceDate: 'Semarang, 16 Februari 1981',
    address: 'Mangkang Wetan Rt. 003/ Rw. 004 Tugu Kota Semarang',
    education: 'S1 Pendidikan Bahasa Inggris',
    photo: '/images/ina_rotul_uliya.jpg',
    photoPosition: 'center 15%',
    experience: 'Pendidik Bahasa Inggris',
    certifications: ['Pendidik Profesional Bersertifikat', 'Pembina English Club & Literasi'],
    quote: 'Membimbing kecakapan bahasa Inggris dengan penuh percaya diri untuk membuka cakrawala pengetahuan global santri.',
    email: 'ina.rotul@mauhasanah.sch.id',
  },
  {
    id: 'guru-13',
    name: 'Rekka Artha Alifiananta, S.Pd.',
    position: 'Guru Pengampu Biologi',
    subjects: ['Biologi'],
    category: 'mipa',
    categoryLabel: 'Rumpun MIPA',
    birthPlaceDate: 'Semarang, 21 November 1996',
    address: 'Jl. Gunung Jati Utara V/120 Wonosari Ngaliyan Kota Semarang',
    education: 'S1 Pendidikan Biologi',
    photo: '/images/rekka_artha.jpg',
    photoPosition: 'center 15%',
    experience: 'Pendidik Biologi & Praktikum Sains',
    certifications: ['Pendidik Profesional Bersertifikat', 'Instruktur Praktikum Laboratorium Hayati'],
    quote: 'Mempelajari biologi menyingkap rahasia keagungan penciptaan alam semesta dan menumbuhkan rasa syukur mendalam kepada Sang Maha Pencipta.',
    email: 'rekka.artha@mauhasanah.sch.id',
  },
  {
    id: 'guru-14',
    name: 'Miftahul Asror',
    position: 'Guru Pengampu Aswaja & Ibadah',
    subjects: ['Ke-NU-an (Aswaja)', 'Praktik Ibadah'],
    category: 'pai',
    categoryLabel: 'Rumpun PAI & Ke-NU-an',
    birthPlaceDate: 'Grobogan, 03 April 1995',
    address: 'Ringinharjo RT 004/ RW 001 Gubug Grobogan',
    education: 'Sarjana Pendidikan Islam',
    photo: '/images/miftahul_asror.jpg',
    photoPosition: 'center 15%',
    experience: 'Pendidik Ke-NU-an & Pembina Amaliah Santri',
    certifications: ['Pendidik Profesional Aswaja An-Nahdliyyah', 'Pembimbing Praktik Amaliah Ibadah'],
    quote: 'Menanamkan nilai-nilai Ahlussunnah wal Jama’ah an-Nahdliyyah dan pembiasaan ibadah amaliah yang tawassuth, tawazun, dan tasamuh.',
    email: 'miftahul.asror@mauhasanah.sch.id',
  },
  {
    id: 'guru-15',
    name: 'Faqihuddin, S.Pd.',
    position: 'Guru Pengampu MIPA & TIK',
    subjects: ['Fisika', 'Informatika'],
    category: 'mipa',
    categoryLabel: 'Rumpun MIPA & TIK',
    birthPlaceDate: 'Kendal, 22 Januari 1995',
    address: 'Mangkang Wetan Rt. 03/ Rw. 06 Tugu Kota Semarang',
    education: 'S1 Pendidikan Fisika / Sains Terapan',
    photo: '/images/faqihuddin.jpg',
    photoPosition: 'center 15%',
    experience: 'Pendidik Fisika & Informatika',
    certifications: ['Pendidik Profesional Bersertifikat', 'Instruktur Laboratorium Sains & Komputer'],
    quote: 'Mengintegrasikan nalar hukum fisika dan kecakapan komputasi untuk membentuk generasi madrasah yang adaptif terhadap sains modern.',
    email: 'faqihuddin@mauhasanah.sch.id',
  },
  {
    id: 'guru-16',
    name: 'Hoyi Tinung Sari, S.Pd.',
    position: 'Guru Pengampu Kimia',
    subjects: ['Kimia'],
    category: 'mipa',
    categoryLabel: 'Rumpun MIPA',
    birthPlaceDate: 'Rembang, 03 Februari 1990',
    address: 'Kaba Timur Raya I RT. 08 RW. 13 Kelurahan Tandang Kec. Tembalang',
    education: 'S1 Pendidikan Kimia',
    photo: '/images/hoyi_tinung_sari.jpg',
    photoPosition: 'center 15%',
    experience: 'Pendidik Kimia & Praktikum Laboratorium',
    certifications: ['Pendidik Profesional Bersertifikat', 'Instruktur Keselamatan & Pengelolaan Laboratorium Kimia'],
    quote: 'Mempelajari reaksi dan struktur materi kimia membukakan wawasan tentang keteraturan hukum alam yang diciptakan dengan sempurna.',
    email: 'hoyi.tinung@mauhasanah.sch.id',
  },
  {
    id: 'guru-17',
    name: 'Mufidah, S.Pd.',
    position: 'Guru Pengampu Bahasa Jawa',
    subjects: ['Bahasa Jawa (Mulok)'],
    category: 'bahasa',
    categoryLabel: 'Rumpun Bahasa & Budaya',
    birthPlaceDate: 'Kendal, 10 Desember 1990',
    address: 'Rejosari rt. 02/ Rw. 04 Brangsong Kendal',
    education: 'S1 Pendidikan Bahasa dan Sastra Daerah (Jawa)',
    photo: '/images/mufidah.jpg',
    photoPosition: 'center 15%',
    experience: 'Pendidik Bahasa & Budaya Jawa',
    certifications: ['Pendidik Profesional Bersertifikat', 'Pelestari Bahasa & Unggah-Ungguh Budaya Jawa'],
    quote: 'Nguri-uri kabudayan Jawi lan mulangake unggah-ungguh subasita kang luhur tumrap para santri.',
    email: 'mufidah@mauhasanah.sch.id',
  },
  {
    id: 'guru-18',
    name: 'Didik Priyana, S.Pd.',
    position: 'Guru Pengampu PPKn',
    subjects: ['Pendidikan Pancasila & Kewarganegaraan (PPKn)'],
    category: 'ips',
    categoryLabel: 'Rumpun IPS & Kewarganegaraan',
    birthPlaceDate: 'Rembang, 29 Desember 1989',
    address: 'Tapak RT. 001 RW. 004 Tugurejo Kota Semarang',
    education: 'S1 Pendidikan Pancasila dan Kewarganegaraan (PPKn)',
    photo: '/images/didik_priyana.jpg',
    photoPosition: 'center 15%',
    experience: 'Pendidik Kewarganegaraan & Kebangsaan',
    certifications: ['Pendidik Profesional Bersertifikat', 'Pembina Kesadaran Hukum & Bela Negara'],
    quote: 'Membangun karakter pemuda madrasah yang berwawasan kebangsaan, cinta tanah air, dan taat pada konstitusi negara.',
    email: 'didik.priyana@mauhasanah.sch.id',
  },
  {
    id: 'guru-19',
    name: 'Romzanah, S.Pd.I.',
    position: 'Guru Pengampu PAI',
    subjects: ['Sejarah Kebudayaan Islam (SKI)', 'Aqidah Akhlak (AA)'],
    category: 'pai',
    categoryLabel: 'Rumpun PAI',
    birthPlaceDate: 'Kendal, 02 Oktober 1986',
    address: 'Mangkang Wetan RT. 002 RW. 004 Tugu Kota Semarang',
    education: 'S1 Pendidikan Agama Islam (S.Pd.I)',
    photo: '/images/romzanah.jpg',
    photoPosition: 'center 15%',
    experience: 'Pendidik PAI & Sejarah Islam',
    certifications: ['Pendidik Profesional Bersertifikat', 'Pembina Penguatan Karakter & Akhlak Santri'],
    quote: 'Mempelajari sejarah kebudayaan Islam dan mengokohkan aqidah akhlak menjadi pondasi utama membentuk generasi beradab mulia.',
    email: 'romzanah@mauhasanah.sch.id',
  },
  {
    id: 'guru-20',
    name: 'M. Wahiburrohim, S.Pd.I.',
    position: 'Guru Pengampu PAI',
    subjects: ['Al-Qur’an Hadits (QH)', 'Fiqih'],
    category: 'pai',
    categoryLabel: 'Rumpun PAI',
    birthPlaceDate: 'Demak, 11 Oktober 1979',
    address: 'Mangkang Wetan RT. 002 RW. 004 Tugu Kota Semarang',
    education: 'S1 Pendidikan Agama Islam (S.Pd.I)',
    photo: '/images/wahiburrohim.jpg',
    photoPosition: 'center 15%',
    experience: 'Pendidik PAI & Fiqih',
    certifications: ['Pendidik Profesional Bersertifikat', 'Pembimbing Tilawah & Pendalaman Syariat'],
    quote: 'Membekali santri dengan pemahaman Al-Qur’an Hadits dan pengamalan fiqih ibadah yang kokoh demi meraih ridho Allah SWT.',
    email: 'wahiburrohim@mauhasanah.sch.id',
  },
];

