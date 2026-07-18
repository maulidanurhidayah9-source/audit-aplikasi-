import React from "react";
import { 
  Building2, 
  CheckCircle2, 
  FileSpreadsheet, 
  BarChart3, 
  Users, 
  HelpCircle, 
  ChevronRight, 
  Compass, 
  ShieldCheck, 
  Flame,
  Award,
  BookOpen
} from "lucide-react";

interface LandingPageProps {
  onStart: () => void;
  totalInstitutions: number;
  totalIndicators: number;
  activePeriod: string;
}

export default function LandingPage({
  onStart,
  totalInstitutions,
  totalIndicators,
  activePeriod
}: LandingPageProps) {
  return (
    <div id="landing-page" className="min-h-screen bg-slate-50">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-slate-200 py-16 sm:py-24">
        {/* Subtle decorative background gradients */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-blue-50/50 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-96 w-96 rounded-full bg-blue-100/30 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            
            {/* Left Column: Hero Content */}
            <div className="space-y-6 sm:max-w-xl lg:max-w-none">
              <div className="inline-flex items-center space-x-2 rounded-full bg-blue-50 border border-blue-200/60 px-3 py-1 text-xs font-semibold text-blue-700">
                <Compass className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                <span>Kementerian Komunikasi dan Digital RI</span>
              </div>
              
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl leading-tight">
                Portal Audit Aplikasi <br />
                <span className="text-blue-600 bg-clip-text">SPBE Nasional</span>
              </h1>
              
              <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
                Platform digital terintegrasi untuk menyelenggarakan Audit Sistem Pemerintahan Berbasis Elektronik (SPBE). Mengotomatiskan penilaian mandiri, verifikasi bukti dukung, kalkulasi indeks kematangan, dan penyusunan laporan rekomendasi sesuai <strong>PermenPANRB Nomor 59 Tahun 2020</strong>.
              </p>

              {/* Call To Actions */}
              <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                <button
                  onClick={onStart}
                  className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/15 hover:bg-blue-700 hover:shadow-blue-500/25 transition-all duration-200 group cursor-pointer"
                  id="btn-start-audit-landing"
                >
                  Mulai Audit Sekarang
                  <ChevronRight className="ml-2 h-4 w-4 transform transition-transform duration-200 group-hover:translate-x-1" />
                </button>
                <a
                  href="#tentang"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  Pelajari Selengkapnya
                </a>
              </div>

              {/* Stat badges */}
              <div className="pt-6 border-t border-slate-150 grid grid-cols-3 gap-4">
                <div>
                  <p className="font-mono text-xl sm:text-2xl font-extrabold text-blue-600">{totalInstitutions}</p>
                  <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wide">Instansi Aktif</p>
                </div>
                <div>
                  <p className="font-mono text-xl sm:text-2xl font-extrabold text-blue-600">{totalIndicators}</p>
                  <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wide">Indikator Master</p>
                </div>
                <div>
                  <p className="font-mono text-xl sm:text-2xl font-extrabold text-blue-600">{activePeriod}</p>
                  <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wide">Periode Audit</p>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Dashboard Preview Illustration (Aesthetic CSS Representation) */}
            <div className="relative lg:block">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-2xl shadow-slate-200/80">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-yellow-400" />
                    <span className="h-3 w-3 rounded-full bg-green-400" />
                    <span className="text-xs font-mono font-medium text-slate-400 pl-2">dashboard_evaluasi_spbe.exe</span>
                  </div>
                  <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700 uppercase">Live Preview</span>
                </div>

                <div className="space-y-4">
                  {/* Mock card representing total score status */}
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 border border-slate-150 p-4">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Predikat Kematangan</h4>
                      <p className="text-lg font-black text-slate-800">Sangat Baik (Indeks 3.82)</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 font-mono font-black text-lg">
                      3.82
                    </div>
                  </div>

                  {/* Mock indicator review item */}
                  <div className="border border-slate-150 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">Indikator 1</span>
                      <span className="text-[10px] font-bold text-emerald-600 flex items-center bg-emerald-50 px-2 py-0.5 rounded">
                        <CheckCircle2 className="h-3 w-3 mr-1" /> Terverifikasi
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-800 line-clamp-1">Kebijakan Internal Arsitektur SPBE Instansi</p>
                    <div className="flex items-center space-x-1.5">
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 w-4/5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-500">Level 4</span>
                    </div>
                  </div>

                  {/* Mini status tracking list */}
                  <div className="grid grid-cols-2 gap-2.5 text-left">
                    <div className="rounded-xl border border-slate-100 p-3 bg-slate-50/50">
                      <p className="text-[10px] font-semibold text-slate-400 uppercase">Dokumen Bukti</p>
                      <p className="font-mono text-sm font-bold text-slate-700 mt-1">12 File Valid</p>
                    </div>
                    <div className="rounded-xl border border-slate-100 p-3 bg-slate-50/50">
                      <p className="text-[10px] font-semibold text-slate-400 uppercase">Progress Audit</p>
                      <p className="font-mono text-sm font-bold text-slate-700 mt-1">87% Selesai</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Target User & Institutional Scale */}
      <section id="tentang" className="py-16 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight sm:text-3xl">Pilar Tata Kelola Digital Yang Akuntabel</h2>
            <p className="text-sm text-slate-500">
              Direkayasa khusus untuk memenuhi kebutuhan koordinasi lintas instansi dalam evaluasi kematangan sistem berbasis elektronik.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border border-slate-150 p-6 space-y-4 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:border-blue-200 transition-all duration-200">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">1. Regulasi Presisi</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Penyusunan instrumen pertanyaan audit, poin-poin penjelasan, dan tingkat kematangan (Level 1-5) yang sinkron secara mutlak dengan PermenPANRB No. 59 Tahun 2020.
              </p>
            </div>

            <div className="rounded-xl border border-slate-150 p-6 space-y-4 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:border-blue-200 transition-all duration-200">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                <FileSpreadsheet className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">2. Validasi Bukti Unggulan</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Mekanisme unggah dokumen formal legalitas, notulen, tangkapan layar sistem, dan tautan aplikasi sebagai syarat mutlak pemenuhan level kematangan yang andal.
              </p>
            </div>

            <div className="rounded-xl border border-slate-150 p-6 space-y-4 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:border-blue-200 transition-all duration-200">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                <BarChart3 className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">3. Transparansi Nilai & Laporan</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Kalkulasi indeks kumulatif instansi secara otomatis berbobot, visualisasi bento chart per-domain, serta ekspor berkas audit siap cetak untuk pimpinan negara.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Audit Flow Steps */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto space-y-2 mb-12">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Siklus Kerja Audit Aplikasi SPBE</h2>
            <p className="text-xs text-slate-500">Pengelolaan alur audit yang modern, rapi, dan terekam dengan jelas.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-4 text-center">
            <div className="space-y-2.5">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-200 border border-slate-300 text-sm font-bold text-slate-700">1</div>
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Perencanaan</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">Super Admin mendefinisikan instansi, master indikator, periode audit, dan menugaskan tim Auditor Independen.</p>
            </div>
            <div className="space-y-2.5">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 border border-blue-300 text-sm font-bold text-blue-700">2</div>
              <h4 className="text-xs font-extrabold text-blue-800 uppercase tracking-wider">Pengisian Auditee</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">Auditee instansi mengisi form penjelasan mandiri (Self-assessment) dan mengunggah dokumen bukti keabsahan hukum.</p>
            </div>
            <div className="space-y-2.5">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 border border-yellow-300 text-sm font-bold text-yellow-800">3</div>
              <h4 className="text-xs font-extrabold text-yellow-800 uppercase tracking-wider">Verifikasi Auditor</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">Auditor meneliti draf, memverifikasi dokumen bukti, menulis masukan revisi, serta menetapkan nilai kelayakan final.</p>
            </div>
            <div className="space-y-2.5">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 border border-emerald-300 text-sm font-bold text-emerald-700">4</div>
              <h4 className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider">Pelaporan Pimpinan</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">Sistem mengalkulasi skor agregat indeks, menyusun grafik kematangan instansi, dan mengunduh laporan rekomendasi resmi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center space-y-2 mb-12">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Tanya Jawab Terkait Audit SPBE</h2>
            <p className="text-xs text-slate-500">Pertanyaan umum seputar penggunaan portal evaluasi mandiri SPBE.</p>
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border border-slate-150 p-5 bg-slate-50/50">
              <h4 className="text-xs font-extrabold text-slate-900 flex items-center">
                <HelpCircle className="h-4.5 w-4.5 text-blue-600 mr-2 shrink-0" />
                Apa perbedaan antara Penilaian Mandiri (Self-Assessment) dengan Nilai Final?
              </h4>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed pl-6.5">
                Penilaian mandiri diisi oleh Auditee instansi berdasarkan persepsi internal dan draf bukti yang dimiliki. Nilai final (Verified Level) ditentukan secara sah oleh Auditor Nasional setelah melalui proses klarifikasi lapangan, pemeriksaan orisinalitas dokumen bukti, dan rekonsiliasi.
              </p>
            </div>

            <div className="rounded-xl border border-slate-150 p-5 bg-slate-50/50">
              <h4 className="text-xs font-extrabold text-slate-900 flex items-center">
                <HelpCircle className="h-4.5 w-4.5 text-blue-600 mr-2 shrink-0" />
                Bagaimana skala penilaian kematangan SPBE dirumuskan?
              </h4>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed pl-6.5">
                Kematangan SPBE mengadopsi skala 1 sampai 5. Level 1 (Rintisan) menunjukkan belum adanya tata kelola baku. Level 2 (Terkelola) ditandai dengan inisiatif unit kerja. Level 3 (Terstandardisasi) berlaku merata se-instansi. Level 4 (Terintegrasi) berinteraksi dengan lembaga luar. Level 5 (Optimum) didukung otomatisasi pembaruan.
              </p>
            </div>

            <div className="rounded-xl border border-slate-150 p-5 bg-slate-50/50">
              <h4 className="text-xs font-extrabold text-slate-900 flex items-center">
                <HelpCircle className="h-4.5 w-4.5 text-blue-600 mr-2 shrink-0" />
                Apa saja jenis file bukti dukung yang diperbolehkan diunggah?
              </h4>
              <p className="mt-2 text-xs text-slate-500 leading-relaxed pl-6.5">
                Auditee diwajibkan mengunggah file bukti dalam format PDF (untuk regulasi resmi/Keputusan Menteri/Pergub), PNG/JPG (untuk tangkapan layar aplikasi), atau mencantumkan tautan (URL) sistem pelayanan publik yang aktif agar auditor dapat menguji kegunaannya secara langsung.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Ministry Credit */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-850">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex justify-center items-center space-x-2">
            <div className="h-8 w-8 rounded bg-blue-600 text-white font-black flex items-center justify-center text-sm">SP</div>
            <span className="font-extrabold text-white text-sm uppercase tracking-wider">PORTAL AUDIT SPBE NASIONAL</span>
          </div>
          <p className="text-[11px] leading-relaxed max-w-md mx-auto">
            Diselenggarakan oleh Direktorat Jenderal Aplikasi Informatika, Kementerian Komunikasi dan Digital Republik Indonesia. Seluruh proses diawasi dan mematuhi standar hukum ketetapan kematangan reformasi birokrasi nasional.
          </p>
          <div className="text-[10px] text-slate-500 font-mono pt-4 border-t border-slate-800">
            &copy; 2026 Kementerian Komunikasi dan Digital RI. Hak Cipta Dilindungi Undang-Undang.
          </div>
        </div>
      </footer>

    </div>
  );
}
