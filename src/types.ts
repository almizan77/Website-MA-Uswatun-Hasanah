export interface PendaftaranFormData {
  namaLengkap: string;
  nisn: string;
  asalSekolah: string;
  jurusan: string;
  sistemBelajar: string;
  whatsapp: string;
  setuju: boolean;
}

export interface StatusCheckResult {
  nomorRegistrasi: string;
  namaSiswa: string;
  nisn: string;
  asalSekolah: string;
  jurusan: string;
  statusVerifikasi: 'TERVERIFIKASI' | 'MENUNGGU_VERIFIKASI' | 'PERLU_PERBAIKAN';
  jadwalTes: string;
  lokasiTes: string;
  gelombang: string;
}

export interface SpmbRegistrationRecord {
  regNumber: string;
  studentName: string;
  track: string;
  major: string;
  gender: string;
  nisn: string;
  nik: string;
  birthPlace: string;
  birthDate: string;
  schoolOrigin: string;
  parentName: string;
  phone: string;
  email: string;
  address: string;
  memorizationJuz: string;
  raportAverage: string;
  date: string;
  time: string;
}
