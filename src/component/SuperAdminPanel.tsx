import React, { useState } from "react";
import { SPBEIndicator, Institution, AuditPeriod, ActivityLog, User } from "../types";
import { 
  Building2, 
  Layers, 
  UserCheck, 
  History, 
  Plus, 
  Trash2, 
  Edit, 
  ShieldCheck, 
  Globe, 
  Compass,
  Calendar
} from "lucide-react";

interface SuperAdminPanelProps {
  indicators: SPBEIndicator[];
  institutions: Institution[];
  periods: AuditPeriod[];
  activityLogs: ActivityLog[];
  users: User[];
  onAddInstitution: (inst: Omit<Institution, "id">) => void;
  onAddIndicator: (ind: SPBEIndicator) => void;
  onAssignAuditor: (auditId: string, auditorId: string) => void;
}

export default function SuperAdminPanel({
  indicators,
  institutions,
  periods,
  activityLogs,
  users,
  onAddInstitution,
  onAddIndicator,
  onAssignAuditor
}: SuperAdminPanelProps) {
  
  const [activeTab, setActiveTab] = useState<"INSTITUTIONS" | "INDICATORS" | "AUDITORS" | "LOGS">("INSTITUTIONS");

  // State for new institution form
  const [newInstName, setNewInstName] = useState("");
  const [newInstCode, setNewInstCode] = useState("");
  const [newInstType, setNewInstType] = useState<"MINISTRY" | "LOCAL_GOVT" | "PUBLIC_INSTITUTION">("MINISTRY");
  const [newInstAddress, setNewInstAddress] = useState("");

  // State for new indicator form
  const [newIndCode, setNewIndCode] = useState("Indikator 10");
  const [newIndName, setNewIndName] = useState("");
  const [newIndDomain, setNewIndDomain] = useState("Domain III: Manajemen SPBE");
  const [newIndAspect, setNewIndAspect] = useState("Aspek 4: Keamanan SPBE");
  const [newIndDesc, setNewIndDesc] = useState("");
  const [newIndWeight, setNewIndWeight] = useState(10);

  const handleAddInst = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInstName || !newInstCode) return;
    onAddInstitution({
      name: newInstName,
      code: newInstCode.toUpperCase(),
      type: newInstType,
      address: newInstAddress,
      logoUrl: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=120&h=120&q=80"
    });
    setNewInstName("");
    setNewInstCode("");
    setNewInstAddress("");
    alert("Instansi baru berhasil didaftarkan secara sah.");
  };

  const handleAddInd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIndName) return;
    
    const newInd: SPBEIndicator = {
      id: "ind-" + Math.random().toString(36).substr(2, 9),
      code: newIndCode,
      name: newIndName,
      domain: newIndDomain,
      aspect: newIndAspect,
      description: newIndDesc,
      weight: Number(newIndWeight),
      maxLevel: 5,
      guidance: {
        1: "Belum terdapat draf regulasi yang mengatur standar indikator.",
        2: "Regulasi instansi sedang dirumuskan secara parsial.",
        3: "Telah ditetapkan secara sah oleh Pejabat berwenang instansi.",
        4: "Penerapan merata, termonitor, dan terukur kinerjanya.",
        5: "Pembaruan adaptif berkelanjutan secara optimal terbukti berkala."
      }
    };
    onAddIndicator(newInd);
    setNewIndName("");
    setNewIndDesc("");
    alert("Indikator SPBE master berhasil ditambahkan ke database nasional.");
  };

  const auditors = users.filter(u => u.role === "AUDITOR");

  return (
    <div className="space-y-6">
      
      {/* Super Admin header */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight sm:text-2xl flex items-center">
          <ShieldCheck className="h-6 w-6 text-purple-600 mr-2 shrink-0" />
          Konsol Super Admin Nasional
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Kelola master referensi nasional, registrasi instansi, pembagian tugas auditor independen, dan monitor jejak audit sistem keseluruhan.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab("INSTITUTIONS")}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
            activeTab === "INSTITUTIONS"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Building2 className="inline-block mr-1.5 h-4 w-4" />
          Registrasi Instansi ({institutions.length})
        </button>
        <button
          onClick={() => setActiveTab("INDICATORS")}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
            activeTab === "INDICATORS"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Layers className="inline-block mr-1.5 h-4 w-4" />
          Referensi Indikator ({indicators.length})
        </button>
        <button
          onClick={() => setActiveTab("LOGS")}
          className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
            activeTab === "LOGS"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <History className="inline-block mr-1.5 h-4 w-4" />
          Log Aktivitas Sistem
        </button>
      </div>

      {/* Tab 1: Institutions Management */}
      {activeTab === "INSTITUTIONS" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          
          {/* Add form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase">Daftarkan Instansi Baru</h3>
            
            <form onSubmit={handleAddInst} className="space-y-3.5 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-500">Nama Lengkap Instansi</label>
                <input
                  type="text"
                  required
                  value={newInstName}
                  onChange={(e) => setNewInstName(e.target.value)}
                  placeholder="Kementerian Agraria dan Tata Ruang"
                  className="w-full rounded-lg border border-slate-200 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500">Kode Unik Instansi</label>
                  <input
                    type="text"
                    required
                    value={newInstCode}
                    onChange={(e) => setNewInstCode(e.target.value)}
                    placeholder="ATR-BPN"
                    className="w-full rounded-lg border border-slate-200 p-2 uppercase focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500">Klasifikasi</label>
                  <select
                    value={newInstType}
                    onChange={(e) => setNewInstType(e.target.value as any)}
                    className="w-full rounded-lg border border-slate-200 p-2"
                  >
                    <option value="MINISTRY">Kementerian</option>
                    <option value="LOCAL_GOVT">Pemprov / Pemda</option>
                    <option value="PUBLIC_INSTITUTION">Lembaga Publik</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-500">Alamat Kantor Resmi</label>
                <input
                  type="text"
                  value={newInstAddress}
                  onChange={(e) => setNewInstAddress(e.target.value)}
                  placeholder="Jl. Sisingamangaraja No. 2, Jakarta Selatan"
                  className="w-full rounded-lg border border-slate-200 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 p-2.5 font-bold text-white hover:bg-blue-700 shadow shadow-blue-500/10 cursor-pointer"
              >
                Simpan Instansi
              </button>
            </form>
          </div>

          {/* List of registered institutions */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider pl-1">Daftar Instansi Terdaftar</h3>
            
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
              <table className="min-w-full divide-y divide-slate-100 text-left text-xs">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 font-bold text-slate-400 uppercase">Instansi</th>
                    <th className="px-4 py-3 font-bold text-slate-400 uppercase">Kode</th>
                    <th className="px-4 py-3 font-bold text-slate-400 uppercase">Tipe</th>
                    <th className="px-4 py-3 font-bold text-slate-400 uppercase">Alamat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {institutions.map((inst) => (
                    <tr key={inst.id} className="hover:bg-slate-50/40">
                      <td className="px-4 py-3.5 font-bold text-slate-800">{inst.name}</td>
                      <td className="px-4 py-3.5 font-mono font-bold text-blue-600">{inst.code}</td>
                      <td className="px-4 py-3.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          inst.type === "MINISTRY" ? "bg-blue-50 text-blue-700" : "bg-emerald-50 text-emerald-700"
                        }`}>
                          {inst.type === "MINISTRY" ? "Kementerian" : "Pemda/Pemprov"}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-slate-500 truncate max-w-xs">{inst.address || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* Tab 2: Reference Indicators */}
      {activeTab === "INDICATORS" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          
          {/* Add form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase">Tambah Indikator Master</h3>
            
            <form onSubmit={handleAddInd} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500">Kode Indikator</label>
                  <input
                    type="text"
                    required
                    value={newIndCode}
                    onChange={(e) => setNewIndCode(e.target.value)}
                    placeholder="Indikator 10"
                    className="w-full rounded-lg border border-slate-200 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-500">Bobot Penilaian (%)</label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={100}
                    value={newIndWeight}
                    onChange={(e) => setNewIndWeight(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-200 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-500">Nama Indikator SPBE</label>
                <input
                  type="text"
                  required
                  value={newIndName}
                  onChange={(e) => setNewIndName(e.target.value)}
                  placeholder="Tingkat Kematangan Penerapan Layanan Keuangan"
                  className="w-full rounded-lg border border-slate-200 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-500">Domain Ref</label>
                <select
                  value={newIndDomain}
                  onChange={(e) => setNewIndDomain(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 p-2"
                >
                  <option value="Domain I: Kebijakan Internal SPBE">Domain I: Kebijakan Internal</option>
                  <option value="Domain II: Tata Kelola SPBE">Domain II: Tata Kelola</option>
                  <option value="Domain III: Manajemen SPBE">Domain III: Manajemen SPBE</option>
                  <option value="Domain IV: Layanan SPBE">Domain IV: Layanan SPBE</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-500">Aspek Ref</label>
                <input
                  type="text"
                  value={newIndAspect}
                  onChange={(e) => setNewIndAspect(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-500">Penjelasan Detail Indikator</label>
                <textarea
                  required
                  value={newIndDesc}
                  onChange={(e) => setNewIndDesc(e.target.value)}
                  placeholder="Rumuskan penjelasan kriteria penilaian kematangan..."
                  className="w-full h-20 rounded-lg border border-slate-200 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 p-2.5 font-bold text-white hover:bg-blue-700 shadow shadow-blue-500/10 cursor-pointer"
              >
                Tambahkan Indikator
              </button>
            </form>
          </div>

          {/* List of master indicators */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider pl-1">Daftar Indikator Master Nasional</h3>
            
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm max-h-[500px] overflow-y-auto">
              <table className="min-w-full divide-y divide-slate-100 text-left text-xs">
                <thead className="bg-slate-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 font-bold text-slate-400 uppercase">Kode</th>
                    <th className="px-4 py-3 font-bold text-slate-400 uppercase">Indikator</th>
                    <th className="px-4 py-3 font-bold text-slate-400 uppercase">Domain</th>
                    <th className="px-4 py-3 font-bold text-slate-400 uppercase">Bobot</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {indicators.map((ind) => (
                    <tr key={ind.id} className="hover:bg-slate-50/40">
                      <td className="px-4 py-3.5 font-mono font-bold text-blue-600">{ind.code}</td>
                      <td className="px-4 py-3.5 font-bold text-slate-800">
                        <div className="line-clamp-2" title={ind.name}>{ind.name}</div>
                      </td>
                      <td className="px-4 py-3.5 text-slate-400 font-medium truncate max-w-[120px]" title={ind.domain}>
                        {ind.domain.split(":")[0]}
                      </td>
                      <td className="px-4 py-3.5 font-mono font-bold text-slate-800">{ind.weight}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* Tab 3: Security & Audit Activity Logs */}
      {activeTab === "LOGS" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Log Jejak Pengguna Aplikasi (Security Trail)</h3>
            <span className="font-mono text-[10px] text-slate-400">Total: {activityLogs.length} Entri</span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm max-h-[480px] overflow-y-auto">
            <table className="min-w-full divide-y divide-slate-150 text-left text-xs">
              <thead className="bg-slate-50 sticky top-0">
                <tr>
                  <th className="px-4 py-3 font-bold text-slate-400 uppercase">Waktu</th>
                  <th className="px-4 py-3 font-bold text-slate-400 uppercase">Pengguna</th>
                  <th className="px-4 py-3 font-bold text-slate-400 uppercase">Tindakan</th>
                  <th className="px-4 py-3 font-bold text-slate-400 uppercase">Detail Log</th>
                  <th className="px-4 py-3 font-bold text-slate-400 uppercase">IP Pengguna</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-medium">
                {activityLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50">
                    <td className="px-4 py-3 font-mono text-[10px] text-slate-400">
                      {new Date(log.timestamp).toLocaleString("id-ID", { hour12: false })}
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-800">
                      {log.userName}
                      <span className="block text-[9px] text-slate-400 font-semibold uppercase">{log.userRole}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-1.5 py-0.5 rounded font-mono text-[9px] font-bold ${
                        log.action === "SUBMIT_AUDIT" ? "bg-blue-50 text-blue-700" :
                        log.action === "UPLOAD_EVIDENCE" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-700"
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 max-w-sm truncate">{log.details}</td>
                    <td className="px-4 py-3 font-mono text-[10px] text-slate-400">{log.ipAddress || "127.0.0.1"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
