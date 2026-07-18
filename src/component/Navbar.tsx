import React, { useState } from "react";
import { User, UserRole, Notification } from "../types";
import { 
  Bell, 
  ShieldCheck, 
  Users, 
  UserCheck, 
  FileCheck, 
  Settings, 
  Building2, 
  LogOut,
  ChevronDown,
  Sparkles,
  Volume2
} from "lucide-react";

interface NavbarProps {
  currentUser: User;
  onRoleChange: (role: UserRole) => void;
  notifications: Notification[];
  onMarkNotificationRead: (id: string) => void;
  onResetDatabase: () => void;
}

export default function Navbar({
  currentUser,
  onRoleChange,
  notifications,
  onMarkNotificationRead,
  onResetDatabase
}: NavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Custom styling details for role badges
  const getRoleBadge = (role: UserRole) => {
    switch (role) {
      case UserRole.SUPER_ADMIN:
        return {
          label: "Super Admin",
          color: "bg-purple-50 text-purple-700 border-purple-200",
          icon: ShieldCheck
        };
      case UserRole.AUDITOR:
        return {
          label: "Auditor Nasional",
          color: "bg-blue-50 text-blue-700 border-blue-200",
          icon: FileCheck
        };
      case UserRole.AUDITEE:
        return {
          label: "Auditee / Instansi",
          color: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: UserCheck
        };
      case UserRole.AGENCY_ADMIN:
        return {
          label: "Admin Instansi",
          color: "bg-amber-50 text-amber-700 border-amber-200",
          icon: Users
        };
      case UserRole.LEADER:
        return {
          label: "Pimpinan / Eksekutif",
          color: "bg-rose-50 text-rose-700 border-rose-200",
          icon: Building2
        };
    }
  };

  const badge = getRoleBadge(currentUser.role);
  const BadgeIcon = badge.icon;

  return (
    <header id="main-header" className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Indonesian Gov Brand Style Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white font-bold shadow-md shadow-blue-500/10">
            {/* Simple emblem representation */}
            <span className="text-lg tracking-tight font-extrabold">SP</span>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-slate-900 tracking-tight text-base sm:text-lg">
                AUDIT SPBE
              </span>
              <span className="rounded-full bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold text-blue-800 uppercase tracking-wider">
                v1.0
              </span>
            </div>
            <p className="hidden text-[10px] font-medium text-slate-500 sm:block">
              Sistem Audit Aplikasi Pemerintahan Berbasis Elektronik
            </p>
          </div>
        </div>

        {/* Center/Right: Role Switcher Simulator for Sandbox Testing */}
        <div className="flex items-center space-x-4">
          <div className="hidden items-center space-x-2 rounded-xl bg-slate-50 p-1 border border-slate-200/80 md:flex">
            <span className="pl-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Simulasi Peran:
            </span>
            <div className="flex space-x-1">
              {(Object.keys(UserRole) as Array<keyof typeof UserRole>).map((roleKey) => {
                const roleValue = UserRole[roleKey];
                const isActive = currentUser.role === roleValue;
                return (
                  <button
                    key={roleValue}
                    onClick={() => onRoleChange(roleValue)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all duration-150 cursor-pointer ${
                      isActive
                        ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                        : "text-slate-600 hover:bg-slate-150 hover:text-slate-900"
                    }`}
                  >
                    {roleValue === UserRole.SUPER_ADMIN ? "Admin" :
                     roleValue === UserRole.AUDITOR ? "Auditor" :
                     roleValue === UserRole.AUDITEE ? "Auditee" :
                     roleValue === UserRole.AGENCY_ADMIN ? "Agency" : "Leader"}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile compact role select dropdown */}
          <div className="block md:hidden">
            <select
              value={currentUser.role}
              onChange={(e) => onRoleChange(e.target.value as UserRole)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-700"
            >
              <option value={UserRole.SUPER_ADMIN}>Super Admin</option>
              <option value={UserRole.AUDITOR}>Auditor</option>
              <option value={UserRole.AUDITEE}>Auditee</option>
              <option value={UserRole.AGENCY_ADMIN}>Agency Admin</option>
              <option value={UserRole.LEADER}>Leader</option>
            </select>
          </div>

          {/* Separation line */}
          <span className="h-6 w-px bg-slate-200" aria-hidden="true"></span>

          {/* Notification Menu Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowUserMenu(false);
              }}
              className="relative rounded-full p-1.5 text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
              id="notification-bell"
            >
              <span className="sr-only">Notifikasi</span>
              <Bell className="h-5.5 w-5.5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Container */}
            {showNotifications && (
              <div className="absolute right-0 mt-2.5 w-80 rounded-xl border border-slate-200 bg-white p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-3 duration-200">
                <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2.5">
                  <h3 className="text-xs font-bold text-slate-900">Notifikasi Masuk</h3>
                  <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-blue-700">
                    {unreadCount} baru
                  </span>
                </div>
                <div className="max-h-64 overflow-y-auto py-1">
                  {notifications.length === 0 ? (
                    <p className="py-4 text-center text-xs text-slate-400">Tidak ada notifikasi baru</p>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => onMarkNotificationRead(notif.id)}
                        className={`flex flex-col border-b border-slate-50 px-3 py-2.5 hover:bg-slate-50 transition-colors cursor-pointer ${
                          !notif.isRead ? "bg-blue-50/30" : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`h-2 w-2 rounded-full ${
                            notif.type === "WARNING" ? "bg-amber-500" :
                            notif.type === "SUCCESS" ? "bg-emerald-500" :
                            notif.type === "DANGER" ? "bg-red-500" : "bg-blue-500"
                          }`} />
                          <span className="font-mono text-[9px] text-slate-400">
                            {new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <h4 className="mt-1 text-xs font-bold text-slate-800">{notif.title}</h4>
                        <p className="text-[11px] text-slate-500 leading-normal mt-0.5">{notif.message}</p>
                        {!notif.isRead && (
                          <span className="mt-1.5 text-[10px] font-semibold text-blue-600 hover:underline">
                            Tandai dibaca
                          </span>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Active User Menu / Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifications(false);
              }}
              className="flex items-center space-x-2.5 rounded-xl border border-slate-200/80 p-1.5 hover:bg-slate-50 transition-colors text-left cursor-pointer"
              id="user-profile-menu"
            >
              <img
                className="h-7 w-7 rounded-lg object-cover ring-1 ring-slate-100"
                src={currentUser.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80"}
                alt={currentUser.name}
                referrerPolicy="no-referrer"
              />
              <div className="hidden max-w-[120px] text-xs sm:block">
                <h4 className="truncate font-bold text-slate-800 leading-tight">{currentUser.name}</h4>
                <div className="flex items-center mt-0.5">
                  <span className={`inline-flex items-center rounded-md border px-1.5 py-0.2 text-[9px] font-bold tracking-tight ${badge.color}`}>
                    <BadgeIcon className="mr-0.5 h-2.5 w-2.5" />
                    {badge.label}
                  </span>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </button>

            {/* Profile Dropdown Container */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-64 rounded-xl border border-slate-200 bg-white p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-3 duration-200">
                <div className="px-3 py-2.5 border-b border-slate-100">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">ID Instansi</p>
                  <p className="text-xs font-bold text-slate-800 mt-0.5 truncate">
                    {currentUser.institutionId === "inst-1" ? "Kementerian Komdigi" : "Kementerian Dalam Negeri"}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">{currentUser.email}</p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      onResetDatabase();
                      setShowUserMenu(false);
                      alert("Database simulasi berhasil direset ke data default.");
                    }}
                    className="flex w-full items-center px-3 py-2 text-left text-xs font-medium text-amber-700 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Settings className="mr-2 h-4 w-4 text-amber-600" />
                    Reset Data Simulasi
                  </button>
                  <div className="border-t border-slate-50 my-1"></div>
                  <div className="px-3 py-1.5 text-[10px] text-slate-400 leading-relaxed">
                    Ubah peran di atas untuk menjelajahi hak akses khusus setiap level pengguna.
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}
