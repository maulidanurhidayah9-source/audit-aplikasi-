import {
  User,
  UserRole,
  Institution,
  AuditPeriod,
  SPBEIndicator,
  SPBEAudit,
  ActivityLog,
  Notification,
  Comment
} from "../types";

export const mockInstitutions: Institution[] = [
  {
    id: "inst-1",
    name: "Kementerian Komunikasi dan Digital",
    code: "KOMDIGI",
    type: "MINISTRY",
    address: "Jl. Medan Merdeka Barat No. 9, Jakarta Pusat",
    logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&h=120&q=80"
  },
  {
    id: "inst-2",
    name: "Kementerian Dalam Negeri",
    code: "KEMENDAGRI",
    type: "MINISTRY",
    address: "Jl. Medan Merdeka Utara No. 7, Jakarta Pusat",
    logoUrl: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=120&h=120&q=80"
  },
  {
    id: "inst-3",
    name: "Pemerintah Provinsi DKI Jakarta",
    code: "DKI-JAKARTA",
    type: "LOCAL_GOVT",
    address: "Jl. Medan Merdeka Selatan No. 8-9, Jakarta Pusat",
    logoUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=120&h=120&q=80"
  },
  {
    id: "inst-4",
    name: "Kementerian Keuangan",
    code: "KEMENKEU",
    type: "MINISTRY",
    address: "Jl. Dr. Wahidin Raya No. 1, Jakarta Pusat",
    logoUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=120&h=120&q=80"
  }
];

export const mockAuditPeriods: AuditPeriod[] = [
  {
    id: "period-2026",
    name: "Tahun Anggaran 2026",
    year: 2026,
    startDate: "2026-01-01",
    endDate: "2026-11-30",
    status: "ACTIVE"
  },
  {
    id: "period-2025",
    name: "Tahun Anggaran 2025",
    year: 2025,
    startDate: "2025-01-01",
    endDate: "2025-11-30",
    status: "ARCHIVED"
  },
  {
    id: "period-2027",
    name: "Tahun Anggaran 2027",
    year: 2027,
    startDate: "2027-01-01",
    endDate: "2027-11-30",
    status: "PLANNING"
  }
];

export const mockUsers: User[] = [
  {
    id: "usr-super-admin",
    name: "Rian Hidayat, S.Kom.",
    email: "admin.spbe@layanan.go.id",
    role: UserRole.SUPER_ADMIN,
    institutionId: "inst-1",
    phoneNumber: "081122334455",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    id: "usr-auditor-1",
    name: "Dr. Ir. Heru Prasetyo, M.T.",
    email: "heru.prasetyo@audit.go.id",
    role: UserRole.AUDITOR,
    institutionId: "inst-1",
    phoneNumber: "081234567890",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    id: "usr-auditee-komdigi",
    name: "Budi Setiawan, M.Eng.",
    email: "budi.s@komdigi.go.id",
    role: UserRole.AUDITEE,
    institutionId: "inst-1",
    phoneNumber: "081398765432",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    id: "usr-auditee-kemendagri",
    name: "Siti Rahma, S.IP.",
    email: "siti.rahma@kemendagri.go.id",
    role: UserRole.AUDITEE,
    institutionId: "inst-2",
    phoneNumber: "081544332211",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    id: "usr-agency-admin",
    name: "Anas Malik, S.E.",
    email: "anas.malik@kemendagri.go.id",
    role: UserRole.AGENCY_ADMIN,
    institutionId: "inst-2",
    phoneNumber: "081777888999",
    avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&h=100&q=80"
  },
  {
    id: "usr-leader",
    name: "Drs. Taufik Hidayat, M.Si.",
    email: "taufik.hidayat@sekjen.go.id",
    role: UserRole.LEADER,
    institutionId: "inst-2",
    phoneNumber: "081822334455",
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&h=100&q=80"
  }
];

export const mockIndicators: SPBEIndicator[] = [
  {
    id: "ind-1",
    code: "Indikator 1",
    name: "Tingkat Kematangan Kebijakan Internal Arsitektur SPBE Instansi Pemerintah",
    domain: "Domain I: Kebijakan Internal SPBE",
    aspect: "Aspek 1: Kebijakan Internal Tata Kelola SPBE",
    description: "Evaluasi terhadap adanya regulasi/kebijakan formal (seperti Peraturan Menteri/Kepala Lembaga/Peraturan Daerah) yang menetapkan kerangka kerja Arsitektur SPBE Instansi.",
    weight: 10,
    maxLevel: 5,
    guidance: {
      1: "Belum terdapat draf kebijakan internal Arsitektur SPBE yang mengatur penyusunan Arsitektur SPBE.",
      2: "Terdapat draf kebijakan internal Arsitektur SPBE Instansi yang sedang dalam proses perumusan atau belum ditandatangani.",
      3: "Terdapat kebijakan internal Arsitektur SPBE Instansi yang telah ditetapkan secara resmi oleh pimpinan instansi.",
      4: "Kebijakan internal Arsitektur SPBE Instansi telah diterapkan sepenuhnya dan dipantau serta dievaluasi secara berkala.",
      5: "Kebijakan internal Arsitektur SPBE Instansi telah ditinjau kembali dan disempurnakan berdasarkan hasil evaluasi berkala."
    }
  },
  {
    id: "ind-2",
    code: "Indikator 2",
    name: "Tingkat Kematangan Kebijakan Internal Peta Rencana SPBE Instansi Pemerintah",
    domain: "Domain I: Kebijakan Internal SPBE",
    aspect: "Aspek 1: Kebijakan Internal Tata Kelola SPBE",
    description: "Evaluasi atas tersedianya regulasi formal mengenai rencana induk, roadmap, atau peta rencana penyelenggaraan SPBE yang mencakup target-target jangka menengah/panjang.",
    weight: 10,
    maxLevel: 5,
    guidance: {
      1: "Belum terdapat draf kebijakan internal Peta Rencana SPBE Instansi.",
      2: "Terdapat draf kebijakan internal Peta Rencana SPBE Instansi yang belum ditetapkan secara resmi.",
      3: "Terdapat kebijakan internal Peta Rencana SPBE Instansi yang telah ditetapkan secara formal.",
      4: "Kebijakan internal Peta Rencana SPBE Instansi telah disebarluaskan, dilaksanakan, dan dievaluasi dampaknya secara formal.",
      5: "Kebijakan internal Peta Rencana SPBE Instansi telah disempurnakan secara berkesinambungan."
    }
  },
  {
    id: "ind-3",
    code: "Indikator 3",
    name: "Tingkat Kematangan Kebijakan Internal Manajemen Data Instansi Pemerintah",
    domain: "Domain I: Kebijakan Internal SPBE",
    aspect: "Aspek 2: Kebijakan Internal Manajemen SPBE",
    description: "Mengukur keberadaan regulasi terkait pengelolaan aset data, standar data, metadata, dan bagi-pakai data di tingkat instansi.",
    weight: 8,
    maxLevel: 5,
    guidance: {
      1: "Belum terdapat regulasi atau panduan tertulis mengenai manajemen data.",
      2: "Panduan manajemen data sedang dalam tahap draf rancangan.",
      3: "Regulasi mengenai manajemen data instansi telah ditetapkan (misal SK Kadin/Kamen atau Peraturan Daerah).",
      4: "Kebijakan data instansi telah diintegrasikan dengan Satu Data Indonesia dan dievaluasi kepatuhannya.",
      5: "Kebijakan manajemen data diperbaiki secara berkala untuk mendukung tata kelola data modern."
    }
  },
  {
    id: "ind-4",
    code: "Indikator 4",
    name: "Tingkat Kematangan Penerapan Arsitektur SPBE Instansi Pemerintah",
    domain: "Domain II: Tata Kelola SPBE",
    aspect: "Aspek 3: Tata Kelola SPBE",
    description: "Evaluasi aktual atas implementasi cetak biru Arsitektur SPBE yang mencakup Arsitektur Bisnis, Data, Aplikasi, Keamanan, Teknologi, dan Infrastruktur.",
    weight: 12,
    maxLevel: 5,
    guidance: {
      1: "Arsitektur SPBE belum disusun atau masih dalam bentuk konsep dasar.",
      2: "Arsitektur SPBE sebagian telah disusun namun baru mencakup beberapa domain saja.",
      3: "Arsitektur SPBE instansi telah disusun lengkap 6 domain dan ditetapkan secara resmi.",
      4: "Arsitektur SPBE digunakan sebagai rujukan utama pembangunan sistem aplikasi dan anggaran belanja TIK.",
      5: "Arsitektur SPBE dimutakhirkan secara dinamis mengikuti perubahan strategis organisasi secara otomatis."
    }
  },
  {
    id: "ind-5",
    code: "Indikator 5",
    name: "Tingkat Kematangan Penerapan Sistem Penghubung Layanan (SPL) SPBE",
    domain: "Domain II: Tata Kelola SPBE",
    aspect: "Aspek 3: Tata Kelola SPBE",
    description: "Mengukur tingkat integrasi dan bagi-pakai data antar-sistem aplikasi pemerintah menggunakan platform Sistem Penghubung Layanan yang terstandar nasional.",
    weight: 10,
    maxLevel: 5,
    guidance: {
      1: "Instansi belum menggunakan SPL atau integrasi dilakukan secara point-to-point custom tanpa standardisasi.",
      2: "Instansi mulai menguji coba pemakaian SPL nasional/instansi untuk beberapa layanan terbatas.",
      3: "Instansi telah mengimplementasikan SPL secara resmi pada layanan utama/prioritas.",
      4: "Seluruh pertukaran data antar-layanan internal dan eksternal wajib melalui SPL dan dipantau kinerjanya.",
      5: "Implementasi SPL dioptimalkan secara realtime dengan mekanisme pemantauan keamanan otomatis."
    }
  },
  {
    id: "ind-6",
    code: "Indikator 6",
    name: "Tingkat Kematangan Penerapan Manajemen Keamanan Informasi SPBE",
    domain: "Domain III: Manajemen SPBE",
    aspect: "Aspek 4: Manajemen SPBE",
    description: "Mengukur implementasi kebijakan keamanan informasi berbasis standar ISO/IEC 27001 atau Sistem Manajemen Keamanan Informasi (SMKI) SPBE.",
    weight: 10,
    maxLevel: 5,
    guidance: {
      1: "Aspek keamanan informasi dikelola secara parsial, tanpa panduan formal dan hanya saat insiden terjadi.",
      2: "Instansi memiliki draf konsep pengelolaan keamanan informasi dan sosialisasi terbatas.",
      3: "Instansi menerapkan SMKI SPBE secara formal di unit-unit TI utama.",
      4: "Audit keamanan informasi rutin dilakukan oleh lembaga independen bersertifikat dan sistem diproteksi penuh.",
      5: "Sistem keamanan adaptif terus diperbarui guna menangkal ancaman siber terbaru dengan pertahanan otomatis."
    }
  },
  {
    id: "ind-7",
    code: "Indikator 7",
    name: "Tingkat Kematangan Penerapan Layanan Naskah Dinas Elektronik (Srikandi)",
    domain: "Domain IV: Layanan SPBE",
    aspect: "Aspek 5: Layanan Administrasi Pemerintahan Berbasis Elektronik",
    description: "Evaluasi atas digitalisasi sistem persuratan resmi dinas, tanda tangan elektronik tersertifikasi BSrE, dan distribusi naskah dinas antar-instansi.",
    weight: 15,
    maxLevel: 5,
    guidance: {
      1: "Persuratan dinas masih menggunakan kertas fisik atau email non-organisasi secara manual.",
      2: "Sistem surat elektronik internal digunakan namun belum memiliki integrasi tanda tangan digital.",
      3: "Mengimplementasikan sistem Srikandi secara menyeluruh dan terintegrasi tanda tangan elektronik BSrE.",
      4: "Layanan persuratan dinas terintegrasi antar instansi pemerintah dan mengukur efisiensi disposisi.",
      5: "Sistem naskah dinas sepenuhnya otomatis dengan analisis data disposisi untuk perbaikan birokrasi."
    }
  },
  {
    id: "ind-8",
    code: "Indikator 8",
    name: "Tingkat Kematangan Penerapan Layanan Kepegawaian Elektronik",
    domain: "Domain IV: Layanan SPBE",
    aspect: "Aspek 5: Layanan Administrasi Pemerintahan Berbasis Elektronik",
    description: "Mengukur efektivitas sistem informasi kepegawaian (SIMPEG) dalam memproses mutasi, promosi, penilaian kinerja, absensi, dan penggajian pegawai secara real-time.",
    weight: 12,
    maxLevel: 5,
    guidance: {
      1: "Administrasi kepegawaian dikelola manual dengan berkas fisik.",
      2: "SIMPEG digunakan sebatas database pasif dan berkala diisi secara manual.",
      3: "SIMPEG terpadu yang memproses layanan cuti, absensi, gaji secara mandiri (self-service) terintegrasi secara dinamis.",
      4: "Sistem kepegawaian terintegrasi dengan Badan Kepegawaian Negara (SIASN BKN) secara otomatis.",
      5: "Sistem menggunakan analisis predikatif kinerja dan talenta pegawai guna otomatisasi jenjang karir."
    }
  },
  {
    id: "ind-9",
    code: "Indikator 9",
    name: "Tingkat Kematangan Penerapan Layanan Pengaduan Pelayanan Publik",
    domain: "Domain IV: Layanan SPBE",
    aspect: "Aspek 6: Layanan Publik Berbasis Elektronik",
    description: "Tingkat pemanfaatan sistem pengelolaan pengaduan pelayanan publik nasional seperti SP4N-LAPOR! guna menanggapi dan menyelesaikan keluhan masyarakat secara transparan.",
    weight: 13,
    maxLevel: 5,
    guidance: {
      1: "Belum memiliki saluran pengaduan online yang terintegrasi atau sistem respon tidak ada standar.",
      2: "Memiliki kanal pengaduan namun respon lambat dan belum terhubung ke sistem nasional SP4N-LAPOR!.",
      3: "Sistem SP4N-LAPOR! terintegrasi penuh, pengaduan ditindaklanjuti secara terjadwal dengan SOP baku.",
      4: "Layanan pengaduan dianalisis secara berkala melalui survei kepuasan pelanggan elektronik (IKM) secara terpadu.",
      5: "Menggunakan teknologi sentiment analysis untuk mendeteksi dini keluhan kritis warga dan bertindak preventif."
    }
  }
];

export const mockAudits: SPBEAudit[] = [
  {
    id: "audit-komdigi-2026",
    institutionId: "inst-1",
    periodId: "period-2026",
    status: "UNDER_REVIEW",
    auditorId: "usr-auditor-1",
    assignedAuditees: ["usr-auditee-komdigi"],
    createdAt: "2026-02-15",
    submittedAt: "2026-06-10",
    responses: {
      "ind-1": {
        indicatorId: "ind-1",
        selectedLevel: 4,
        auditeeExplanation: "Kementerian Komunikasi dan Digital telah memiliki Keputusan Menteri mengenai Arsitektur SPBE Kementerian yang berlaku dari tahun 2024 s/d 2029. Evaluasi berkala dilakukan satu tahun sekali bersama Biro Perencanaan.",
        evidenceFiles: [
          {
            id: "doc-1",
            name: "Kepmen_Arsitektur_SPBE_KOMDIGI.pdf",
            url: "#",
            uploadedAt: "2026-05-20",
            uploadedBy: "Budi Setiawan, M.Eng.",
            size: "2.4 MB"
          },
          {
            id: "doc-2",
            name: "Laporan_Evaluasi_Tahunan_Arsitektur_2025.pdf",
            url: "#",
            uploadedAt: "2026-05-20",
            uploadedBy: "Budi Setiawan, M.Eng.",
            size: "1.8 MB"
          }
        ],
        status: "SUBMITTED",
        lastUpdated: "2026-05-20"
      },
      "ind-2": {
        indicatorId: "ind-2",
        selectedLevel: 3,
        auditeeExplanation: "Peta Rencana SPBE KOMDIGI telah ditetapkan secara resmi melalui Peraturan Menteri No. 12 Tahun 2024 tentang Roadmap SPBE Komdigi.",
        evidenceFiles: [
          {
            id: "doc-3",
            name: "Permen_Roadmap_SPBE_KOMDIGI.pdf",
            url: "#",
            uploadedAt: "2026-05-21",
            uploadedBy: "Budi Setiawan, M.Eng.",
            size: "4.1 MB"
          }
        ],
        status: "APPROVED",
        verifiedLevel: 3,
        lastUpdated: "2026-05-21"
      },
      "ind-3": {
        indicatorId: "ind-3",
        selectedLevel: 2,
        auditeeExplanation: "Kebijakan Manajemen Data masih berupa draf peraturan sekretaris jenderal yang saat ini sedang berada dalam pembahasan harmonisasi hukum di Biro Hukum.",
        evidenceFiles: [
          {
            id: "doc-4",
            name: "Draft_Persekjen_Manajemen_Data_v3.pdf",
            url: "#",
            uploadedAt: "2026-05-25",
            uploadedBy: "Budi Setiawan, M.Eng.",
            size: "1.1 MB"
          }
        ],
        status: "REVISION_REQUESTED",
        auditorComments: "Mohon lampirkan berita acara pembahasan draf regulasi terakhir atau komitmen timeline penetapan agar auditor dapat menaikkan status verifikasi.",
        lastUpdated: "2026-05-25"
      },
      "ind-4": {
        indicatorId: "ind-4",
        selectedLevel: 4,
        auditeeExplanation: "Penerapan arsitektur SPBE sudah 100% menggunakan sistem koordinasi internal. Semua pengajuan anggaran belanja TI wajib melampirkan kesesuaian arsitektur.",
        evidenceFiles: [
          {
            id: "doc-5",
            name: "Bukti_Rekomendasi_Belanja_TIK_2026.pdf",
            url: "#",
            uploadedAt: "2026-05-26",
            uploadedBy: "Budi Setiawan, M.Eng.",
            size: "1.5 MB"
          }
        ],
        status: "SUBMITTED",
        lastUpdated: "2026-05-26"
      },
      "ind-5": {
        indicatorId: "ind-5",
        selectedLevel: 3,
        auditeeExplanation: "Kami telah mengintegrasikan 5 sistem internal utama menggunakan Sistem Penghubung Layanan (SPL) Nasional yang dikelola oleh tim Pusat Data Nasional.",
        evidenceFiles: [
          {
            id: "doc-6",
            name: "Dokumentasi_API_Integrasi_Srikandi_SIMPEG.pdf",
            url: "#",
            uploadedAt: "2026-05-28",
            uploadedBy: "Budi Setiawan, M.Eng.",
            size: "3.2 MB"
          }
        ],
        status: "SUBMITTED",
        lastUpdated: "2026-05-28"
      },
      "ind-6": {
        indicatorId: "ind-6",
        selectedLevel: 4,
        auditeeExplanation: "Telah tersertifikasi ISO 27001 pada Layanan Inti Publik Portal Layanan Informasi Komdigi oleh auditor eksternal sejak November 2025.",
        evidenceFiles: [
          {
            id: "doc-7",
            name: "Sertifikat_ISO27001_Komdigi_2025.pdf",
            url: "#",
            uploadedAt: "2026-05-29",
            uploadedBy: "Budi Setiawan, M.Eng.",
            size: "820 KB"
          }
        ],
        status: "SUBMITTED",
        lastUpdated: "2026-05-29"
      },
      "ind-7": {
        indicatorId: "ind-7",
        selectedLevel: 4,
        auditeeExplanation: "Aplikasi Srikandi sudah diterapkan di seluruh satuan kerja eselon I dan II. Persentase disposisi elektronik mencapai 92%.",
        evidenceFiles: [
          {
            id: "doc-8",
            name: "Tangkapan_Layar_Statistik_Srikandi_Komdigi.pdf",
            url: "#",
            uploadedAt: "2026-06-01",
            uploadedBy: "Budi Setiawan, M.Eng.",
            size: "1.9 MB"
          }
        ],
        status: "SUBMITTED",
        lastUpdated: "2026-06-01"
      }
    }
  },
  {
    id: "audit-kemendagri-2026",
    institutionId: "inst-2",
    periodId: "period-2026",
    status: "DRAFT",
    auditorId: "usr-auditor-1",
    assignedAuditees: ["usr-auditee-kemendagri"],
    createdAt: "2026-03-01",
    responses: {
      "ind-1": {
        indicatorId: "ind-1",
        selectedLevel: 3,
        auditeeExplanation: "Kementerian Dalam Negeri telah menerbitkan Peraturan Menteri Dalam Negeri (Permendagri) Nomor 32 Tahun 2023 tentang Arsitektur SPBE Kemendagri.",
        evidenceFiles: [
          {
            id: "doc-kemendagri-1",
            name: "Permendagri_32_2023_Arsitektur_SPBE.pdf",
            url: "#",
            uploadedAt: "2026-04-10",
            uploadedBy: "Siti Rahma, S.IP.",
            size: "3.5 MB"
          }
        ],
        status: "DRAFT",
        lastUpdated: "2026-04-10"
      }
    }
  },
  {
    id: "audit-dki-2025",
    institutionId: "inst-3",
    periodId: "period-2025",
    status: "COMPLETED",
    auditorId: "usr-auditor-1",
    assignedAuditees: [],
    createdAt: "2025-02-10",
    submittedAt: "2025-08-15",
    verifiedAt: "2025-10-20",
    finalScore: 4.15,
    recommendations: "Penerapan SPBE Pemprov DKI Jakarta dinilai sangat baik. Fokus perbaikan ke depan adalah penguatan Manajemen Keamanan Informasi (SMKI) pada level puskesmas/kelurahan dan akselerasi integrasi satu data daerah dengan portal Satu Data Indonesia.",
    responses: {
      "ind-1": {
        indicatorId: "ind-1",
        selectedLevel: 5,
        auditeeExplanation: "Telah memiliki Pergub Arsitektur SPBE yang dievaluasi berkala setiap tahun secara otomatis dan terintegrasi dengan Rencana Kerja Pemerintah Daerah (RKPD).",
        evidenceFiles: [],
        status: "APPROVED",
        verifiedLevel: 5,
        lastUpdated: "2025-08-15"
      },
      "ind-2": {
        indicatorId: "ind-2",
        selectedLevel: 4,
        auditeeExplanation: "Peta Rencana SPBE ditetapkan lewat Pergub DKI No. 102 Tahun 2023.",
        evidenceFiles: [],
        status: "APPROVED",
        verifiedLevel: 4,
        lastUpdated: "2025-08-15"
      },
      "ind-3": {
        indicatorId: "ind-3",
        selectedLevel: 4,
        auditeeExplanation: "Kebijakan Tata Kelola Data telah diterapkan penuh melalui Portal Open Data DKI.",
        evidenceFiles: [],
        status: "APPROVED",
        verifiedLevel: 4,
        lastUpdated: "2025-08-15"
      }
    }
  }
];

export const mockComments: Comment[] = [
  {
    id: "comm-1",
    auditId: "audit-komdigi-2026",
    indicatorId: "ind-3",
    userId: "usr-auditor-1",
    userName: "Dr. Ir. Heru Prasetyo, M.T.",
    userRole: UserRole.AUDITOR,
    message: "Saya lihat draf kebijakan ini sangat detail, namun karena belum ditandatangani oleh pejabat berwenang, secara aturan indikator SPBE nasional nilai maksimal yang dapat diberikan adalah Level 2. Mohon revisi draf atau lampirkan surat komitmen penetapan.",
    timestamp: "2026-06-11T10:15:00Z"
  },
  {
    id: "comm-2",
    auditId: "audit-komdigi-2026",
    indicatorId: "ind-3",
    userId: "usr-auditee-komdigi",
    userName: "Budi Setiawan, M.Eng.",
    userRole: UserRole.AUDITEE,
    message: "Baik Pak Heru, terima kasih masukannya. Kami saat ini sedang meminta surat komitmen penandatanganan dari Biro Hukum yang ditandatangani oleh Sekjen Komdigi. Segera kami upload bersama bukti berita acara.",
    timestamp: "2026-06-12T08:30:00Z"
  },
  {
    id: "comm-3",
    auditId: "audit-komdigi-2026",
    indicatorId: "ind-1",
    userId: "usr-auditor-1",
    userName: "Dr. Ir. Heru Prasetyo, M.T.",
    userRole: UserRole.AUDITOR,
    message: "Bukti Kepmen dan Laporan Evaluasi Tahunan sangat lengkap dan valid. Kami menyetujui di Level 4.",
    timestamp: "2026-06-12T11:45:00Z"
  }
];

export const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    userId: "usr-auditee-komdigi",
    title: "Permintaan Revisi Bukti Dukung",
    message: "Auditor Dr. Ir. Heru Prasetyo meminta revisi pada Indikator 3: Kebijakan Internal Manajemen Data.",
    type: "WARNING",
    isRead: false,
    timestamp: "2026-06-11T10:15:00Z"
  },
  {
    id: "notif-2",
    userId: "usr-auditor-1",
    title: "Audit Baru Disubmit",
    message: "Kementerian Komunikasi dan Digital telah mensubmit jawaban audit untuk Tahun Anggaran 2026.",
    type: "INFO",
    isRead: false,
    timestamp: "2026-06-10T17:00:00Z"
  },
  {
    id: "notif-3",
    userId: "usr-agency-admin",
    title: "Alokasi Auditor Berhasil",
    message: "Auditor Dr. Ir. Heru Prasetyo telah ditugaskan untuk melakukan audit pada instansi Anda.",
    type: "SUCCESS",
    isRead: true,
    timestamp: "2026-02-18T09:00:00Z"
  }
];

export const mockActivityLogs: ActivityLog[] = [
  {
    id: "log-1",
    userId: "usr-auditee-komdigi",
    userName: "Budi Setiawan, M.Eng.",
    userRole: UserRole.AUDITEE,
    action: "UPLOAD_EVIDENCE",
    details: "Mengunggah bukti Kepmen_Arsitektur_SPBE_KOMDIGI.pdf untuk Indikator 1",
    timestamp: "2026-05-20T14:23:11Z",
    ipAddress: "10.12.134.45"
  },
  {
    id: "log-2",
    userId: "usr-auditee-komdigi",
    userName: "Budi Setiawan, M.Eng.",
    userRole: UserRole.AUDITEE,
    action: "SUBMIT_AUDIT",
    details: "Mensubmit dokumen audit Tahun Anggaran 2026 kepada Auditor",
    timestamp: "2026-06-10T17:00:00Z",
    ipAddress: "10.12.134.45"
  },
  {
    id: "log-3",
    userId: "usr-auditor-1",
    userName: "Dr. Ir. Heru Prasetyo, M.T.",
    userRole: UserRole.AUDITOR,
    action: "REVIEW_INDICATOR",
    details: "Mengubah status Indikator 3 menjadi REVISION_REQUESTED dan menulis komentar",
    timestamp: "2026-06-11T10:15:00Z",
    ipAddress: "10.12.2.8"
  },
  {
    id: "log-4",
    userId: "usr-super-admin",
    userName: "Rian Hidayat, S.Kom.",
    userRole: UserRole.SUPER_ADMIN,
    action: "ASSIGN_AUDITOR",
    details: "Menugaskan auditor Dr. Ir. Heru Prasetyo, M.T. untuk audit instansi DKI Jakarta",
    timestamp: "2026-02-18T08:45:00Z",
    ipAddress: "10.12.1.2"
  }
];
