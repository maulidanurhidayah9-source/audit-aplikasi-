import React, { useState } from "react";
import { User, Institution, SPBEAudit, UserRole } from "../types";
import { 
  Users, 
  UserPlus, 
  Building, 
  MapPin, 
  ShieldCheck, 
  Activity, 
  CheckCircle,
  Clock,
  Briefcase
} from "lucide-react";

interface AgencyAdminPanelProps {
  currentUser: User;
  institution: Institution | undefined;
  users: User[];
  audit: SPBEAudit | undefined;
  onAddUser: (user: Omit<User, "id">) => void;
}

export default function AgencyAdminPanel({
  currentUser,
  institution,
  users,
  audit,
  onAddUser
}: AgencyAdminPanelProps) {
  
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserRole, setNewUserRole] = useState<UserRole>(UserRole.AUDITEE);
  const [newUserPhone, setNewUserPhone] = useState("");

  const handleRegisterUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    onAddUser({
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      institutionId: currentUser.institutionId,
      phoneNumber: newUserPhone,
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80"
    });

    setNewUserName("");
    setNewUserEmail("");
    setNewUserPhone("");
    alert(`Pengguna ${newUserName} berhasil diregistrasikan di lingkungan instansi.`);
  };

  // Filter users belonging to this institution
  const instUsers = users.filter(u => u.institutionId === currentUser.institutionId);

  return (
    <div className="space-y-6">
      
      {/* Agency Header */}
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 tracking-tight sm:text-2xl flex items-center">
          <Building className="h-6 w-6 text-blue-600 mr-2 shrink-0" />
          Dashboard Admin Instansi ({institution?.code || "KEMEN"})
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Kelola profil instansi, registrasikan tim pelaksana (Auditee), dan pantau kemajuan unggah data dukung SPBE internal Anda.
        </p>
      </div>

      {/* Institution Info Card & Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        
        {/* Institution Details */}
        <div className="md:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
            <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 font-black font-mono text-base flex items-center justify-center border border-blue-100">
              {institution?.code || "GOV"}
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase">Profil Resmi Instansi</h3>
              <h4 className="text-sm font-extrabold text-slate-950 leading-tight mt-0.5">{institution?.name}</h4>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs">
            <div className="space-y-0.5">
              <span className="font-semibold text-slate-400 block uppercase text-[10px]">Alamat Surat</span>
              <p className="text-slate-700 flex items-start">
                <MapPin className="h-3.5 w-3.5 text-slate-400 mr-1 shrink-0 mt-0.5" />
                {institution?.address || "Kantor Pusat Republik Indonesia"}
              </p>
            </div>
            <div className="space-y-0.5">
              <span className="font-semibold text-slate-400 block uppercase text-[10px]">Status Evaluasi TA 2026</span>
              <p className="text-slate-700 flex items-center">
                <Activity className="h-3.5 w-3.5 text-blue-600 mr-1.5" />
                <strong className="text-blue-700 uppercase font-bold tracking-wide">
                  {audit?.status === "DRAFT" ? "Draf Pengisian" :
                   audit?.status === "UNDER_REVIEW" ? "Sedang Ditelaah" : "Aktif"}
                </strong>
              </p>
            </div>
          </div>
        </div>

        {/* Instansi User Stats */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Sumber Daya Instansi</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Anggota tim dengan akses resmi.</p>
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-slate-900 font-mono tracking-tight">{instUsers.length}</span>
            <span className="text-xs font-semibold text-slate-500 uppercase">Orang Staf</span>
          </div>
          <div className="mt-2 text-[10px] text-slate-400">
            Termasuk Admin Instansi & pelaksana pengisian berkas.
          </div>
        </div>

      </div>

      {/* Main content grid: Register user, Member list */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        
        {/* Form to add user */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
          <div className="flex items-center space-x-2">
            <UserPlus className="h-4.5 w-4.5 text-blue-600" />
            <h3 className="text-xs font-extrabold text-slate-900 uppercase">Undang Pelaksana (Auditee)</h3>
          </div>

          <form onSubmit={handleRegisterUser} className="space-y-3.5 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-500">Nama Lengkap Anggota</label>
              <input
                type="text"
                required
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                placeholder="Randi Setiawan, S.IP"
                className="w-full rounded-lg border border-slate-200 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-500">Alamat Email Organisasi (.go.id)</label>
              <input
                type="email"
                required
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                placeholder="randi.s@organisasi.go.id"
                className="w-full rounded-lg border border-slate-200 p-2 focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-500">Kontak Telepon</label>
                <input
                  type="text"
                  value={newUserPhone}
                  onChange={(e) => setNewUserPhone(e.target.value)}
                  placeholder="081234567..."
                  className="w-full rounded-lg border border-slate-200 p-2 focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-bold text-slate-500">Hak Akses Peran</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as UserRole)}
                  className="w-full rounded-lg border border-slate-200 p-2"
                >
                  <option value={UserRole.AUDITEE}>Pelaksana Auditee</option>
                  <option value={UserRole.LEADER}>Pimpinan (Baca Saja)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-slate-900 p-2.5 font-bold text-white hover:bg-slate-800 shadow cursor-pointer"
            >
              Daftarkan Anggota Tim
            </button>
          </form>
        </div>

        {/* User list */}
        <div className="lg:col-span-2 space-y-3">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider pl-1">Daftar Pelaksana Instansi Terdaftar</h3>
          
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <table className="min-w-full divide-y divide-slate-100 text-left text-xs">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 font-bold text-slate-400 uppercase">Anggota</th>
                  <th className="px-4 py-3 font-bold text-slate-400 uppercase">Kontak</th>
                  <th className="px-4 py-3 font-bold text-slate-400 uppercase">Hak Akses</th>
                  <th className="px-4 py-3 font-bold text-slate-400 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {instUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/40">
                    <td className="px-4 py-3 font-bold text-slate-800 flex items-center space-x-2.5">
                      <img
                        className="h-7 w-7 rounded-lg object-cover ring-1 ring-slate-100"
                        src={user.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80"}
                        alt={user.name}
                      />
                      <span>{user.name}</span>
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-400">
                      {user.email}
                      <span className="block text-[10px] text-slate-400">{user.phoneNumber || "-"}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        user.role === UserRole.AGENCY_ADMIN ? "bg-amber-50 text-amber-700" : "bg-blue-50 text-blue-700"
                      }`}>
                        {user.role === UserRole.AGENCY_ADMIN ? "Admin Instansi" : "Pelaksana / Auditee"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center text-emerald-600 font-bold">
                        <CheckCircle className="h-3.5 w-3.5 mr-1" /> Aktif
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
