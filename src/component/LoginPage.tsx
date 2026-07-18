import React, { useState } from "react";
import { User, UserRole } from "../types";
import { mockUsers } from "../data/mockData";
import { 
  Building, 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  UserCheck, 
  Sparkles,
  HelpCircle,
  FileCheck,
  Building2,
  Users
} from "lucide-react";

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
}

export default function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState("admin.spbe@layanan.go.id");
  const [password, setPassword] = useState("••••••••");
  const [rememberMe, setRememberMe] = useState(true);

  const handleLoginFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Find matching mock user by email
    const matchedUser = mockUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase().trim()
    );

    if (matchedUser) {
      onLoginSuccess(matchedUser);
    } else {
      // Create a transient user or default to super admin for safety
      alert("Akun tidak ditemukan. Menggunakan akun Super Admin secara default.");
      onLoginSuccess(mockUsers[0]);
    }
  };

  // Pre-fill fields and directly log in as a specific simulated role
  const handleSimulationQuickLogin = (role: UserRole) => {
    const matched = mockUsers.find((u) => u.role === role);
    if (matched) {
      setEmail(matched.email);
      onLoginSuccess(matched);
    }
  };

  return (
    <div id="login-page" className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      
      {/* Left Column: Premium visual banner + Quick simulation accounts selection */}
      <div className="md:w-1/2 bg-slate-900 text-white relative p-8 sm:p-12 flex flex-col justify-between overflow-hidden">
        {/* Subtle decorative mesh background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.15),transparent)]" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-600/10 blur-3xl" />

        {/* Left header */}
        <div className="relative space-y-4">
          <div className="flex items-center space-x-2.5">
            <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center font-black text-sm">SP</div>
            <span className="font-extrabold tracking-wider text-xs uppercase text-blue-400">Portal Evaluasi Mandiri SPBE</span>
          </div>
          
          <div className="space-y-2 mt-8">
            <h2 className="text-2xl sm:text-3xl font-black leading-tight tracking-tight">
              Mewujudkan Tata Kelola Digital Pemerintah yang Akuntabel
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              Sesuai dengan PermenPANRB Nomor 59 Tahun 2020 tentang Pemantauan dan Evaluasi Sistem Pemerintahan Berbasis Elektronik (SPBE).
            </p>
          </div>
        </div>

        {/* Quick simulation access - critical sandbox utility */}
        <div className="relative my-10 bg-slate-800/60 rounded-2xl border border-slate-700/60 p-5 space-y-4">
          <div>
            <span className="rounded-full bg-blue-500/10 border border-blue-400/20 px-2 py-0.5 text-[9px] font-bold text-blue-400 uppercase tracking-wider">
              Mode Sandbox Penguji
            </span>
            <h4 className="text-xs font-extrabold text-white mt-1.5">Akses Sekali Klik (Simulasi Peran):</h4>
            <p className="text-[11px] text-slate-400 mt-0.5">Pilih salah satu akun resmi di bawah untuk langsung mencoba fitur penuh masing-masing hak akses:</p>
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            
            {/* Super Admin */}
            <button
              onClick={() => handleSimulationQuickLogin(UserRole.SUPER_ADMIN)}
              className="flex items-center text-left p-2.5 rounded-xl bg-slate-900/60 hover:bg-blue-600 border border-slate-750 hover:border-blue-500 group transition-all text-xs cursor-pointer"
            >
              <div className="h-7 w-7 rounded bg-purple-500/10 text-purple-400 group-hover:bg-white/20 group-hover:text-white flex items-center justify-center mr-2 shrink-0">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-white leading-none truncate">Super Admin</p>
                <p className="text-[9px] text-slate-400 group-hover:text-blue-100 mt-0.5">admin.spbe@layanan.go.id</p>
              </div>
            </button>

            {/* Auditor */}
            <button
              onClick={() => handleSimulationQuickLogin(UserRole.AUDITOR)}
              className="flex items-center text-left p-2.5 rounded-xl bg-slate-900/60 hover:bg-blue-600 border border-slate-750 hover:border-blue-500 group transition-all text-xs cursor-pointer"
            >
              <div className="h-7 w-7 rounded bg-blue-500/10 text-blue-400 group-hover:bg-white/20 group-hover:text-white flex items-center justify-center mr-2 shrink-0">
                <FileCheck className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-white leading-none truncate">Auditor Nasional</p>
                <p className="text-[9px] text-slate-400 group-hover:text-blue-100 mt-0.5">heru.prasetyo@audit.go.id</p>
              </div>
            </button>

            {/* Auditee */}
            <button
              onClick={() => handleSimulationQuickLogin(UserRole.AUDITEE)}
              className="flex items-center text-left p-2.5 rounded-xl bg-slate-900/60 hover:bg-blue-600 border border-slate-750 hover:border-blue-500 group transition-all text-xs cursor-pointer"
            >
              <div className="h-7 w-7 rounded bg-emerald-500/10 text-emerald-400 group-hover:bg-white/20 group-hover:text-white flex items-center justify-center mr-2 shrink-0">
                <UserCheck className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-white leading-none truncate">Auditee Komdigi</p>
                <p className="text-[9px] text-slate-400 group-hover:text-blue-100 mt-0.5">budi.s@komdigi.go.id</p>
              </div>
            </button>

            {/* Agency Admin */}
            <button
              onClick={() => handleSimulationQuickLogin(UserRole.AGENCY_ADMIN)}
              className="flex items-center text-left p-2.5 rounded-xl bg-slate-900/60 hover:bg-blue-600 border border-slate-750 hover:border-blue-500 group transition-all text-xs cursor-pointer"
            >
              <div className="h-7 w-7 rounded bg-amber-500/10 text-amber-400 group-hover:bg-white/20 group-hover:text-white flex items-center justify-center mr-2 shrink-0">
                <Users className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-white leading-none truncate">Admin Instansi</p>
                <p className="text-[9px] text-slate-400 group-hover:text-blue-100 mt-0.5">anas.malik@kemendagri.go.id</p>
              </div>
            </button>

          </div>
        </div>

        {/* Left footer */}
        <div className="relative text-[10px] text-slate-500 font-mono">
          &copy; 2026 Kementerian Komunikasi dan Digital RI. All rights reserved.
        </div>
      </div>

      {/* Right Column: SSO Login Form */}
      <div className="md:w-1/2 bg-white flex items-center justify-center p-8 sm:p-12 relative">
        <div className="w-full max-w-sm space-y-6">
          
          {/* Form Header */}
          <div className="space-y-2">
            {/* Indonesian Coat of Arms representation */}
            <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl font-bold font-serif text-slate-800 shadow-sm">
              RI
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
              Single Sign-On (SSO)
            </h1>
            <p className="text-xs text-slate-500 leading-snug">
              Masukkan kredensial akun instansi pemerintah Anda untuk mengakses Kertas Kerja Audit SPBE Nasional.
            </p>
          </div>

          {/* Core Login Form */}
          <form onSubmit={handleLoginFormSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 block">Alamat Email Organisasi (.go.id)</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@agency.go.id"
                  className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-slate-50/50"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-700">Kata Sandi Akun</label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Fitur reset kata sandi resmi dinonaktifkan di sandbox. Silakan klik akun cepat di panel sebelah kiri."); }} className="text-[10px] font-semibold text-blue-600 hover:underline">
                  Lupa Kata Sandi?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 bg-slate-50/50"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <label className="flex items-center space-x-2 select-none font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4 cursor-pointer"
                />
                <span>Ingat saya di perangkat ini</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 shadow-lg shadow-blue-500/15 cursor-pointer hover:shadow-blue-500/25 transition-all text-xs"
              id="btn-login-sso"
            >
              Masuk Layanan Audit SPBE
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </button>
          </form>

          {/* Form Footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>Versi Aplikasi 1.0.0</span>
            <span>Koneksi BSSN Terenkripsi</span>
          </div>

        </div>
      </div>

    </div>
  );
}
