import React, { useState, useEffect } from "react";
import { 
  User, 
  UserRole, 
  Institution, 
  SPBEIndicator, 
  SPBEAudit, 
  Comment, 
  Notification, 
  ActivityLog,
  AuditIndicatorResponse
} from "./types";
import { 
  mockUsers, 
  mockInstitutions, 
  mockIndicators, 
  mockAudits, 
  mockComments, 
  mockNotifications, 
  mockActivityLogs, 
  mockAuditPeriods 
} from "./data/mockData";

// Components
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import DashboardAnalytics from "./components/DashboardAnalytics";
import AuditWizard from "./components/AuditWizard";
import SuperAdminPanel from "./components/SuperAdminPanel";
import AgencyAdminPanel from "./components/AgencyAdminPanel";
import ReportPanel from "./components/ReportPanel";

// Icons for portal side navigation
import { 
  Award, 
  LayoutDashboard, 
  FileEdit, 
  FileCheck, 
  Users, 
  Activity, 
  Settings, 
  ShieldCheck,
  Sparkles,
  BookOpen,
  VolumeX,
  FileText,
  LogOut
} from "lucide-react";

export default function App() {
  
  // -----------------------------------------------------------------
  // PERSISTED SYSTEM STATE (LocalStorage Synchronized)
  // -----------------------------------------------------------------
  
  const [viewState, setViewState] = useState<"LANDING" | "LOGIN" | "PORTAL">(() => {
    const saved = localStorage.getItem("spbe_view_state");
    return (saved as any) || "LANDING";
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("spbe_current_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem("spbe_users");
    return saved ? JSON.parse(saved) : mockUsers;
  });

  const [institutions, setInstitutions] = useState<Institution[]>(() => {
    const saved = localStorage.getItem("spbe_institutions");
    return saved ? JSON.parse(saved) : mockInstitutions;
  });

  const [indicators, setIndicators] = useState<SPBEIndicator[]>(() => {
    const saved = localStorage.getItem("spbe_indicators");
    return saved ? JSON.parse(saved) : mockIndicators;
  });

  const [audits, setAudits] = useState<SPBEAudit[]>(() => {
    const saved = localStorage.getItem("spbe_audits");
    return saved ? JSON.parse(saved) : mockAudits;
  });

  const [comments, setComments] = useState<Comment[]>(() => {
    const saved = localStorage.getItem("spbe_comments");
    return saved ? JSON.parse(saved) : mockComments;
  });

  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem("spbe_notifications");
    return saved ? JSON.parse(saved) : mockNotifications;
  });

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem("spbe_activity_logs");
    return saved ? JSON.parse(saved) : mockActivityLogs;
  });

  const [activeTab, setActiveTab] = useState<"DASHBOARD" | "WIZARD" | "REPORT" | "ADMIN" | "AGENCY">(() => {
    const saved = localStorage.getItem("spbe_active_tab");
    return (saved as any) || "DASHBOARD";
  });

  // Keep track of which audit is currently active in Kertas Kerja view
  const [selectedAuditId, setSelectedAuditId] = useState<string>(() => {
    return localStorage.getItem("spbe_selected_audit_id") || "audit-komdigi-2026";
  });

  // -----------------------------------------------------------------
  // LOCALSTORAGE PERSISTENCE SYNC
  // -----------------------------------------------------------------
  useEffect(() => {
    localStorage.setItem("spbe_view_state", viewState);
  }, [viewState]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("spbe_current_user", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("spbe_current_user");
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("spbe_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("spbe_institutions", JSON.stringify(institutions));
  }, [institutions]);

  useEffect(() => {
    localStorage.setItem("spbe_indicators", JSON.stringify(indicators));
  }, [indicators]);

  useEffect(() => {
    localStorage.setItem("spbe_audits", JSON.stringify(audits));
  }, [audits]);

  useEffect(() => {
    localStorage.setItem("spbe_comments", JSON.stringify(comments));
  }, [comments]);

  useEffect(() => {
    localStorage.setItem("spbe_notifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem("spbe_activity_logs", JSON.stringify(activityLogs));
  }, [activityLogs]);

  useEffect(() => {
    localStorage.setItem("spbe_active_tab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem("spbe_selected_audit_id", selectedAuditId);
  }, [selectedAuditId]);

  // -----------------------------------------------------------------
  // CENTRAL EVENT HANDLERS / DATABASE OPERATIONS
  // -----------------------------------------------------------------

  const handleLoginSuccess = (user: User) => {
    setCurrentUser(user);
    setViewState("PORTAL");
    
    // Automatically open appropriate starting tabs based on role
    if (user.role === UserRole.SUPER_ADMIN) {
      setActiveTab("ADMIN");
    } else if (user.role === UserRole.AGENCY_ADMIN) {
      setActiveTab("AGENCY");
    } else {
      setActiveTab("DASHBOARD");
    }

    // Set correct default active audit for work paper
    if (user.role === UserRole.AUDITEE || user.role === UserRole.AGENCY_ADMIN) {
      const matchingAudit = audits.find(a => a.institutionId === user.institutionId);
      if (matchingAudit) {
        setSelectedAuditId(matchingAudit.id);
      }
    }

    // Add logging
    const newLog: ActivityLog = {
      id: "log-" + Math.random().toString(36).substr(2, 9),
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      action: "LOGIN",
      details: `User berhasil masuk ke portal SPBE sebagai ${user.role}.`,
      timestamp: new Date().toISOString(),
      ipAddress: "10.23.4.15"
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  const handleLogout = () => {
    const prevUser = currentUser;
    setCurrentUser(null);
    setViewState("LANDING");
    
    if (prevUser) {
      const newLog: ActivityLog = {
        id: "log-" + Math.random().toString(36).substr(2, 9),
        userId: prevUser.id,
        userName: prevUser.name,
        userRole: prevUser.role,
        action: "LOGOUT",
        details: `User keluar dari sistem.`,
        timestamp: new Date().toISOString()
      };
      setActivityLogs(prev => [newLog, ...prev]);
    }
  };

  // Reset database state back to defaults
  const handleResetDatabase = () => {
    localStorage.clear();
    setUsers(mockUsers);
    setInstitutions(mockInstitutions);
    setIndicators(mockIndicators);
    setAudits(mockAudits);
    setComments(mockComments);
    setNotifications(mockNotifications);
    setActivityLogs(mockActivityLogs);
    
    if (currentUser) {
      const reloadedUser = mockUsers.find(u => u.role === currentUser.role) || mockUsers[0];
      setCurrentUser(reloadedUser);
    }
  };

  // Change simulated role instantly
  const handleRoleChange = (role: UserRole) => {
    const matchedUser = users.find(u => u.role === role);
    if (matchedUser) {
      setCurrentUser(matchedUser);
      
      // Auto routing rules
      if (role === UserRole.SUPER_ADMIN) {
        setActiveTab("ADMIN");
      } else if (role === UserRole.AGENCY_ADMIN) {
        setActiveTab("AGENCY");
      } else {
        setActiveTab("DASHBOARD");
      }

      const matchingAudit = audits.find(a => a.institutionId === matchedUser.institutionId);
      if (matchingAudit) {
        setSelectedAuditId(matchingAudit.id);
      }

      // Add log
      const newLog: ActivityLog = {
        id: "log-" + Math.random().toString(36).substr(2, 9),
        userId: matchedUser.id,
        userName: matchedUser.name,
        userRole: matchedUser.role,
        action: "SIMULATE_ROLE",
        details: `Simulasi peran berpindah ke ${role}.`,
        timestamp: new Date().toISOString()
      };
      setActivityLogs(prev => [newLog, ...prev]);
    }
  };

  // Mark notification read
  const handleMarkNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  // Add new institution (Super Admin)
  const handleAddInstitution = (newInst: Omit<Institution, "id">) => {
    const generatedId = "inst-" + (institutions.length + 1);
    const inst: Institution = {
      ...newInst,
      id: generatedId
    };
    setInstitutions(prev => [...prev, inst]);

    // Automatically create a blank TA 2026 audit for this new institution
    const newAudit: SPBEAudit = {
      id: "audit-" + inst.code.toLowerCase() + "-2026",
      institutionId: generatedId,
      periodId: "period-2026",
      status: "DRAFT",
      assignedAuditees: [],
      responses: {},
      createdAt: new Date().toISOString().split("T")[0]
    };
    setAudits(prev => [...prev, newAudit]);

    // Activity Log
    const newLog: ActivityLog = {
      id: "log-" + Math.random().toString(36).substr(2, 9),
      userId: currentUser?.id || "admin",
      userName: currentUser?.name || "System Admin",
      userRole: currentUser?.role || UserRole.SUPER_ADMIN,
      action: "REGISTER_INSTITUTION",
      details: `Mendaftarkan instansi baru: ${inst.name} (${inst.code})`,
      timestamp: new Date().toISOString()
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  // Add new indicator (Super Admin)
  const handleAddIndicator = (newInd: SPBEIndicator) => {
    setIndicators(prev => [...prev, newInd]);

    // Activity Log
    const newLog: ActivityLog = {
      id: "log-" + Math.random().toString(36).substr(2, 9),
      userId: currentUser?.id || "admin",
      userName: currentUser?.name || "System Admin",
      userRole: currentUser?.role || UserRole.SUPER_ADMIN,
      action: "CREATE_INDICATOR",
      details: `Menyusun referensi indikator master baru: ${newInd.code} - ${newInd.name}`,
      timestamp: new Date().toISOString()
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  // Assign auditor (Super Admin)
  const handleAssignAuditor = (auditId: string, auditorId: string) => {
    setAudits(prev => prev.map(a => a.id === auditId ? { ...a, auditorId } : a));
  };

  // Add new user (Agency Admin)
  const handleAddUser = (newUser: Omit<User, "id">) => {
    const user: User = {
      ...newUser,
      id: "usr-" + Math.random().toString(36).substr(2, 9)
    };
    setUsers(prev => [...prev, user]);

    // Activity Log
    const newLog: ActivityLog = {
      id: "log-" + Math.random().toString(36).substr(2, 9),
      userId: currentUser?.id || "admin",
      userName: currentUser?.name || "Admin Instansi",
      userRole: currentUser?.role || UserRole.AGENCY_ADMIN,
      action: "REGISTER_STAFF",
      details: `Meregistrasikan staf pelaksana baru: ${user.name} (${user.role})`,
      timestamp: new Date().toISOString()
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  // Save single indicator response (Wizard)
  const handleSaveResponse = (indicatorId: string, updatedResponseFields: Partial<AuditIndicatorResponse>) => {
    setAudits(prev => prev.map(aud => {
      if (aud.id === selectedAuditId) {
        const currentResponse = aud.responses[indicatorId] || {
          indicatorId,
          selectedLevel: 1,
          auditeeExplanation: "",
          evidenceFiles: [],
          status: "DRAFT",
          lastUpdated: new Date().toISOString()
        };

        const merged: AuditIndicatorResponse = {
          ...currentResponse,
          ...updatedResponseFields,
          lastUpdated: new Date().toISOString()
        };

        return {
          ...aud,
          responses: {
            ...aud.responses,
            [indicatorId]: merged
          }
        };
      }
      return aud;
    }));

    // Add activity logging
    const actionType = updatedResponseFields.evidenceFiles ? "UPLOAD_EVIDENCE" : "SAVE_RESPONSE_DRAFT";
    const detailsText = updatedResponseFields.evidenceFiles 
      ? `Mengunggah berkas penunjang legalitas SPBE` 
      : `Menyimpan penjelasan jawaban mandiri`;

    const newLog: ActivityLog = {
      id: "log-" + Math.random().toString(36).substr(2, 9),
      userId: currentUser?.id || "user",
      userName: currentUser?.name || "Pelaksana Auditee",
      userRole: currentUser?.role || UserRole.AUDITEE,
      action: actionType,
      details: `${detailsText} pada indikator ${indicatorId}`,
      timestamp: new Date().toISOString()
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  // Submit response formal audit (Wizard)
  const handleSubmitAudit = () => {
    setAudits(prev => prev.map(aud => {
      if (aud.id === selectedAuditId) {
        // Change state from DRAFT/REVISION -> SUBMITTED (Auditee) or SUBMITTED -> COMPLETED (Auditor)
        const isAuditor = currentUser?.role === UserRole.AUDITOR;
        
        if (isAuditor) {
          // Auditor completing evaluation
          // Calculate final verified score
          let totalScore = 0;
          let count = 0;
          indicators.forEach(ind => {
            const r = aud.responses[ind.id];
            totalScore += r?.verifiedLevel || r?.selectedLevel || 1;
            count++;
          });
          const finalScore = count > 0 ? totalScore / count : 3.5;

          return {
            ...aud,
            status: "COMPLETED" as const,
            finalScore,
            verifiedAt: new Date().toISOString().split("T")[0]
          };
        } else {
          // Auditee submitting responses
          return {
            ...aud,
            status: "UNDER_REVIEW" as const,
            submittedAt: new Date().toISOString().split("T")[0]
          };
        }
      }
      return aud;
    }));

    // Trigger congratulations notification
    const isAuditor = currentUser?.role === UserRole.AUDITOR;
    const newNotif: Notification = {
      id: "notif-" + Math.random().toString(36).substr(2, 9),
      userId: "usr-auditee-komdigi", // notify auditee
      title: isAuditor ? "Audit SPBE Selesai Dinilai" : "Audit Berhasil Disubmit",
      message: isAuditor 
        ? "Auditor Dr. Ir. Heru Prasetyo telah merampungkan penilaian indeks dan merumuskan rekomendasi."
        : "Dokumen kerja audit Anda telah terkirim kepada Auditor Nasional untuk proses telaah.",
      type: "SUCCESS",
      isRead: false,
      timestamp: new Date().toISOString()
    };
    setNotifications(prev => [newNotif, ...prev]);

    // Activity Log
    const newLog: ActivityLog = {
      id: "log-" + Math.random().toString(36).substr(2, 9),
      userId: currentUser?.id || "user",
      userName: currentUser?.name || "User",
      userRole: currentUser?.role || UserRole.AUDITEE,
      action: isAuditor ? "FINALIZE_AUDIT" : "SUBMIT_AUDIT",
      details: isAuditor 
        ? "Menutup proses telaah dan mengesahkan indeks skor SPBE." 
        : "Mensubmit berkas kerja evaluasi mandiri SPBE 2026 secara formal.",
      timestamp: new Date().toISOString()
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  // Auditor verify indicator (Wizard Panel)
  const handleAuditorVerify = (
    indicatorId: string, 
    status: AuditIndicatorResponse["status"], 
    verifiedLevel: number, 
    commentsMessage: string
  ) => {
    setAudits(prev => prev.map(aud => {
      if (aud.id === selectedAuditId) {
        const currentResponse = aud.responses[indicatorId] || {
          indicatorId,
          selectedLevel: 1,
          auditeeExplanation: "",
          evidenceFiles: [],
          status: "DRAFT",
          lastUpdated: new Date().toISOString()
        };

        const updated: AuditIndicatorResponse = {
          ...currentResponse,
          status,
          verifiedLevel,
          auditorComments: commentsMessage,
          lastUpdated: new Date().toISOString()
        };

        return {
          ...aud,
          responses: {
            ...aud.responses,
            [indicatorId]: updated
          }
        };
      }
      return aud;
    }));

    // Automatically add as a collaborative thread comment
    if (commentsMessage.trim()) {
      const newComment: Comment = {
        id: "comm-" + Math.random().toString(36).substr(2, 9),
        auditId: selectedAuditId,
        indicatorId,
        userId: currentUser?.id || "auditor",
        userName: currentUser?.name || "Dr. Ir. Heru Prasetyo, M.T.",
        userRole: UserRole.AUDITOR,
        message: commentsMessage,
        timestamp: new Date().toISOString()
      };
      setComments(prev => [...prev, newComment]);
    }

    // Trigger auditee alert if revision requested
    if (status === "REVISION_REQUESTED") {
      const newNotif: Notification = {
        id: "notif-" + Math.random().toString(36).substr(2, 9),
        userId: "usr-auditee-komdigi",
        title: "Permintaan Perbaikan Bukti",
        message: `Auditor meminta revisi bukti dukung pada ${indicatorId}.`,
        type: "WARNING",
        isRead: false,
        timestamp: new Date().toISOString()
      };
      setNotifications(prev => [newNotif, ...prev]);
    }

    // Activity Log
    const newLog: ActivityLog = {
      id: "log-" + Math.random().toString(36).substr(2, 9),
      userId: currentUser?.id || "auditor-1",
      userName: currentUser?.name || "Dr. Ir. Heru Prasetyo",
      userRole: UserRole.AUDITOR,
      action: "REVIEW_INDICATOR",
      details: `Menyetujui atau meminta revisi level kematangan pada ${indicatorId}.`,
      timestamp: new Date().toISOString()
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  // Post collaborative comment
  const handlePostComment = (indicatorId: string, message: string) => {
    if (!currentUser) return;
    const newComment: Comment = {
      id: "comm-" + Math.random().toString(36).substr(2, 9),
      auditId: selectedAuditId,
      indicatorId,
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      message,
      timestamp: new Date().toISOString()
    };
    setComments(prev => [...prev, newComment]);

    // Activity Log
    const newLog: ActivityLog = {
      id: "log-" + Math.random().toString(36).substr(2, 9),
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      action: "POST_COMMENT",
      details: `Menulis tanggapan kolaborasi pada ${indicatorId}`,
      timestamp: new Date().toISOString()
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  // -----------------------------------------------------------------
  // VIEW ENGINE ROUTING
  // -----------------------------------------------------------------

  const currentAuditObj = audits.find(a => a.id === selectedAuditId) || audits[0];
  const currentInstitutionObj = institutions.find(i => i.id === currentUser?.institutionId);
  const currentAuditorObj = users.find(u => u.id === currentAuditObj?.auditorId);

  // Return Login Screen
  if (viewState === "LOGIN") {
    return (
      <LoginPage 
        onLoginSuccess={handleLoginSuccess} 
      />
    );
  }

  // Return Landing Screen
  if (viewState === "LANDING" && !currentUser) {
    return (
      <div className="min-h-screen flex flex-col justify-between bg-slate-50">
        {/* Landing Top Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-slate-200 py-3.5">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center space-x-2.5">
              <div className="h-9 w-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-sm">SP</div>
              <div>
                <span className="font-extrabold text-slate-900 text-sm sm:text-base leading-none block">AUDIT SPBE</span>
                <span className="text-[10px] text-slate-400 font-semibold uppercase block">Kementerian Komdigi RI</span>
              </div>
            </div>
            <button
              onClick={() => setViewState("LOGIN")}
              className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 text-xs font-bold transition-all shadow cursor-pointer"
              id="btn-login-landing-nav"
            >
              Portal Login
            </button>
          </div>
        </header>

        {/* Core Landing Page */}
        <LandingPage 
          onStart={() => setViewState("LOGIN")}
          totalInstitutions={institutions.length}
          totalIndicators={indicators.length}
          activePeriod="2026"
        />
      </div>
    );
  }

  // -----------------------------------------------------------------
  // RENDER MAIN APPLICATION DASHBOARD (PORTAL ROUTING)
  // -----------------------------------------------------------------

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      
      {/* Top Shared Navbar */}
      <Navbar 
        currentUser={currentUser!}
        onRoleChange={handleRoleChange}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        onResetDatabase={handleResetDatabase}
      />

      {/* Main Body Wrapper */}
      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8 no-print">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          
          {/* Side Menu Navigation panel */}
          <aside className="lg:col-span-1 space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm space-y-1">
              <p className="text-[9px] font-black uppercase tracking-wider text-slate-400 px-3 py-1.5">Navigasi Utama</p>
              
              {/* Dashboard Tab */}
              <button
                onClick={() => setActiveTab("DASHBOARD")}
                className={`w-full flex items-center space-x-2.5 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "DASHBOARD"
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/10"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                }`}
              >
                <LayoutDashboard className="h-4 w-4 shrink-0" />
                <span>Dashboard</span>
              </button>

              {/* Kertas Kerja / Wizard Tab */}
              <button
                onClick={() => {
                  setActiveTab("WIZARD");
                  // Auto focus appropriate audit
                  const matching = audits.find(a => a.institutionId === currentUser?.institutionId);
                  if (matching) setSelectedAuditId(matching.id);
                }}
                className={`w-full flex items-center space-x-2.5 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "WIZARD"
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/10"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                }`}
              >
                <FileEdit className="h-4 w-4 shrink-0" />
                <span>Kertas Kerja Audit</span>
              </button>

              {/* Reports Panel Tab */}
              <button
                onClick={() => setActiveTab("REPORT")}
                className={`w-full flex items-center space-x-2.5 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "REPORT"
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/10"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                }`}
              >
                <Award className="h-4 w-4 shrink-0" />
                <span>Laporan Indeks</span>
              </button>

              {/* Admin Panel Tab - ONLY Super Admin */}
              {currentUser?.role === UserRole.SUPER_ADMIN && (
                <button
                  onClick={() => setActiveTab("ADMIN")}
                  className={`w-full flex items-center space-x-2.5 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "ADMIN"
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-500/10"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                  }`}
                >
                  <ShieldCheck className="h-4 w-4 shrink-0 text-purple-500 group-hover:text-white" />
                  <span>Admin Konsol</span>
                </button>
              )}

              {/* Agency Admin Profile Tab - ONLY Agency Admin */}
              {currentUser?.role === UserRole.AGENCY_ADMIN && (
                <button
                  onClick={() => setActiveTab("AGENCY")}
                  className={`w-full flex items-center space-x-2.5 rounded-xl px-3.5 py-2.5 text-xs font-bold transition-all cursor-pointer ${
                    activeTab === "AGENCY"
                      ? "bg-blue-600 text-white shadow-sm shadow-blue-500/10"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                }`}
                >
                  <Users className="h-4 w-4 shrink-0" />
                  <span>Staf & Profil</span>
                </button>
              )}

              <div className="border-t border-slate-100 my-2"></div>

              {/* Explicit logout */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-2.5 rounded-xl px-3.5 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 hover:text-red-700 transition-all cursor-pointer"
              >
                <LogOut className="h-4 w-4 shrink-0" />
                <span>Keluar Portal</span>
              </button>

            </div>

            {/* Sandbox Quick Guidelines Widget card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-2 text-xs">
              <h4 className="font-extrabold text-slate-800 flex items-center">
                <Sparkles className="h-4 w-4 text-blue-600 mr-1 shrink-0" />
                Informasi Penting SPBE
              </h4>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                Indeks SPBE dihitung dengan mengambil bobot rata-rata dari seluruh indikator penjaminan mutu. Dokumen hukum yang diunggah harus memuat stempel basah pimpinan dinas untuk verifikasi Level 3+.
              </p>
            </div>
          </aside>

          {/* Core Content Switching panel */}
          <main className="lg:col-span-4 min-h-[500px]">
            {activeTab === "DASHBOARD" && (
              <DashboardAnalytics 
                audits={audits}
                indicators={indicators}
                institutions={institutions}
                activityLogs={activityLogs}
                onSelectAudit={(auditId) => {
                  setSelectedAuditId(auditId);
                  setActiveTab("WIZARD");
                }}
                userRole={currentUser?.role!}
              />
            )}

            {activeTab === "WIZARD" && (
              <AuditWizard 
                audit={currentAuditObj}
                indicators={indicators}
                currentUser={currentUser!}
                comments={comments}
                onSaveResponse={handleSaveResponse}
                onPostComment={handlePostComment}
                onSubmitAudit={handleSubmitAudit}
                onAuditorVerify={handleAuditorVerify}
                onBackToDashboard={() => setActiveTab("DASHBOARD")}
              />
            )}

            {activeTab === "REPORT" && (
              <ReportPanel 
                audit={currentAuditObj}
                indicators={indicators}
                institution={currentInstitutionObj}
                auditor={currentAuditorObj}
              />
            )}

            {activeTab === "ADMIN" && currentUser?.role === UserRole.SUPER_ADMIN && (
              <SuperAdminPanel 
                indicators={indicators}
                institutions={institutions}
                periods={mockAuditPeriods}
                activityLogs={activityLogs}
                users={users}
                onAddInstitution={handleAddInstitution}
                onAddIndicator={handleAddIndicator}
                onAssignAuditor={handleAssignAuditor}
              />
            )}

            {activeTab === "AGENCY" && currentUser?.role === UserRole.AGENCY_ADMIN && (
              <AgencyAdminPanel 
                currentUser={currentUser!}
                institution={currentInstitutionObj}
                users={users}
                audit={currentAuditObj}
                onAddUser={handleAddUser}
              />
            )}
          </main>

        </div>
      </div>

      {/* Invisible raw printable sheet for standard system printing */}
      <div className="hidden print:block p-8">
        <ReportPanel 
          audit={currentAuditObj}
          indicators={indicators}
          institution={currentInstitutionObj}
          auditor={currentAuditorObj}
        />
      </div>

      {/* Universal footer */}
      <footer className="border-t border-slate-250 bg-white py-5 mt-10 text-center text-[11px] text-slate-500 font-semibold no-print">
        Sistem Informasi Evaluasi Nasional SPBE Republik Indonesia &bull; Kemenkomdigi &bull; Direktorat Aplikasi Informatika
      </footer>

    </div>
  );
}
