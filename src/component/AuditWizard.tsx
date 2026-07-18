import React, { useState } from "react";
import { 
  SPBEAudit, 
  SPBEIndicator, 
  AuditIndicatorResponse, 
  EvidenceFile, 
  Comment, 
  User, 
  UserRole 
} from "../types";
import { 
  Save, 
  Send, 
  Paperclip, 
  Trash2, 
  MessageSquare, 
  CheckCircle, 
  XCircle, 
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Info,
  Calendar,
  AlertTriangle,
  CornerDownRight,
  Loader2,
  Lock,
  Plus
} from "lucide-react";

interface AuditWizardProps {
  audit: SPBEAudit;
  indicators: SPBEIndicator[];
  currentUser: User;
  comments: Comment[];
  onSaveResponse: (indicatorId: string, response: Partial<AuditIndicatorResponse>) => void;
  onPostComment: (indicatorId: string, message: string) => void;
  onSubmitAudit: () => void;
  onAuditorVerify: (indicatorId: string, status: AuditIndicatorResponse["status"], verifiedLevel: number, comments: string) => void;
  onBackToDashboard: () => void;
}

export default function AuditWizard({
  audit,
  indicators,
  currentUser,
  comments,
  onSaveResponse,
  onPostComment,
  onSubmitAudit,
  onAuditorVerify,
  onBackToDashboard
}: AuditWizardProps) {
  
  // Active indicator selection
  const [activeIndIndex, setActiveIndIndex] = useState(0);
  const activeIndicator = indicators[activeIndIndex];
  
  // Local state for the current response edits
  const currentResponse = audit.responses[activeIndicator.id] || {
    indicatorId: activeIndicator.id,
    selectedLevel: 1,
    auditeeExplanation: "",
    evidenceFiles: [],
    status: "DRAFT",
    lastUpdated: new Date().toISOString()
  };

  // Editable fields in Wizard
  const [localExplanation, setLocalExplanation] = useState(currentResponse.auditeeExplanation);
  const [localLevel, setLocalLevel] = useState(currentResponse.selectedLevel);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newFileName, setNewFileName] = useState("");
  const [newFileSize, setNewFileSize] = useState("1.8 MB");
  const [commentInput, setCommentInput] = useState("");

  // Auditor specific verification input
  const [auditorVerifiedLevel, setAuditorVerifiedLevel] = useState(currentResponse.verifiedLevel || localLevel);
  const [auditorNotes, setAuditorNotes] = useState(currentResponse.auditorComments || "");
  const [isVerifyingAction, setIsVerifyingAction] = useState(false);

  // Sync state when active indicator changes
  React.useEffect(() => {
    const freshResponse = audit.responses[activeIndicator.id] || {
      indicatorId: activeIndicator.id,
      selectedLevel: 1,
      auditeeExplanation: "",
      evidenceFiles: [],
      status: "DRAFT",
      lastUpdated: new Date().toISOString()
    };
    setLocalExplanation(freshResponse.auditeeExplanation);
    setLocalLevel(freshResponse.selectedLevel);
    setAuditorVerifiedLevel(freshResponse.verifiedLevel || freshResponse.selectedLevel);
    setAuditorNotes(freshResponse.auditorComments || "");
  }, [activeIndIndex, audit.responses, activeIndicator.id]);

  const activeComments = comments.filter(c => c.auditId === audit.id && c.indicatorId === activeIndicator.id);

  // Handle saving Draft
  const handleSaveDraft = () => {
    onSaveResponse(activeIndicator.id, {
      selectedLevel: localLevel,
      auditeeExplanation: localExplanation,
      status: "DRAFT",
      lastUpdated: new Date().toISOString()
    });
    alert("Draf respon untuk " + activeIndicator.code + " berhasil disimpan secara lokal.");
  };

  // Handle submitting single indicator response
  const handleSubmitIndicator = () => {
    if (!localExplanation.trim()) {
      alert("Mohon isi deskripsi penjelasan mandiri terlebih dahulu.");
      return;
    }
    onSaveResponse(activeIndicator.id, {
      selectedLevel: localLevel,
      auditeeExplanation: localExplanation,
      status: "SUBMITTED",
      lastUpdated: new Date().toISOString()
    });
    alert("Respon untuk " + activeIndicator.code + " siap diajukan bersama draf audit lainnya.");
  };

  // Simulated file upload
  const handleSimulatedUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim()) return;

    const fileExtension = newFileName.includes(".") ? "" : ".pdf";
    const newFile: EvidenceFile = {
      id: "file-" + Math.random().toString(36).substr(2, 9),
      name: newFileName + fileExtension,
      url: "#",
      uploadedAt: new Date().toISOString().split("T")[0],
      uploadedBy: currentUser.name,
      size: newFileSize
    };

    const updatedFiles = [...(currentResponse.evidenceFiles || []), newFile];
    
    onSaveResponse(activeIndicator.id, {
      evidenceFiles: updatedFiles,
      lastUpdated: new Date().toISOString()
    });

    setNewFileName("");
    setShowUploadModal(false);
  };

  // Delete file
  const handleDeleteFile = (fileId: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus dokumen bukti ini?")) {
      const updatedFiles = (currentResponse.evidenceFiles || []).filter(f => f.id !== fileId);
      onSaveResponse(activeIndicator.id, {
        evidenceFiles: updatedFiles,
        lastUpdated: new Date().toISOString()
      });
    }
  };

  // Post comment
  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    onPostComment(activeIndicator.id, commentInput.trim());
    setCommentInput("");
  };

  // Auditor action: Approve or Reject
  const handleAuditorAction = (status: "APPROVED" | "REVISION_REQUESTED") => {
    setIsVerifyingAction(true);
    setTimeout(() => {
      onAuditorVerify(activeIndicator.id, status, auditorVerifiedLevel, auditorNotes);
      setIsVerifyingAction(false);
      alert(`Berhasil menandai ${activeIndicator.code} sebagai ${status === "APPROVED" ? "DISETUJUI" : "REVISI"}.`);
    }, 600);
  };

  // Helper styles for status indicators in left sidebar
  const getSidebarStatusStyle = (status: AuditIndicatorResponse["status"] | undefined) => {
    if (!status) return "bg-slate-100 text-slate-400 border-slate-200";
    switch (status) {
      case "DRAFT":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "SUBMITTED":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "APPROVED":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "REJECTED":
      case "REVISION_REQUESTED":
        return "bg-rose-100 text-rose-700 border-rose-200";
    }
  };

  const getStatusBadge = (status: AuditIndicatorResponse["status"] | undefined) => {
    if (!status) return { label: "Belum Diisi", style: "bg-slate-50 text-slate-500 border-slate-200" };
    switch (status) {
      case "DRAFT":
        return { label: "Draf Pengisian", style: "bg-amber-50 text-amber-700 border-amber-200" };
      case "SUBMITTED":
        return { label: "Menunggu Verifikasi", style: "bg-blue-50 text-blue-700 border-blue-200" };
      case "APPROVED":
        return { label: "Disetujui Auditor", style: "bg-emerald-50 text-emerald-700 border-emerald-200" };
      case "REVISION_REQUESTED":
        return { label: "Butuh Revisi", style: "bg-rose-50 text-rose-700 border-rose-200" };
      default:
        return { label: "Belum Diisi", style: "bg-slate-50 text-slate-500 border-slate-200" };
    }
  };

  const activeStatus = getStatusBadge(currentResponse.status);

  // Score Calculations
  const calculatedIndex = () => {
    const totalIndicators = indicators.length;
    let sum = 0;
    let count = 0;
    indicators.forEach(ind => {
      const resp = audit.responses[ind.id];
      if (resp) {
        sum += resp.verifiedLevel || resp.selectedLevel || 1;
        count++;
      }
    });
    return count > 0 ? (sum / totalIndicators).toFixed(2) : "1.00";
  };

  return (
    <div className="space-y-6">
      
      {/* Upper Navigation Row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={onBackToDashboard}
            className="rounded-xl border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Kertas Kerja Audit SPBE
            </h2>
            <p className="text-[11px] text-slate-500">
              Instansi: <strong className="text-slate-800">Kementerian Komunikasi dan Digital</strong> &bull; Periode: <strong className="text-slate-800">TA 2026</strong>
            </p>
          </div>
        </div>

        {/* Global Progress Indicators */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Indeks SPBE Saat Ini</span>
            <span className="text-xl font-black text-blue-600 font-mono tracking-tight">{calculatedIndex()}</span>
          </div>

          {currentUser.role === UserRole.AUDITEE && audit.status !== "COMPLETED" && (
            <button
              onClick={() => {
                if (confirm("Apakah Anda yakin telah mengisi semua indikator dengan benar dan ingin menyerahkan audit ini kepada Auditor Nasional secara final?")) {
                  onSubmitAudit();
                  alert("Audit berhasil diajukan secara formal kepada Auditor Dr. Ir. Heru Prasetyo.");
                }
              }}
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-500/10 hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Ajukan Audit Final
            </button>
          )}

          {currentUser.role === UserRole.AUDITOR && audit.status === "UNDER_REVIEW" && (
            <button
              onClick={() => {
                if (confirm("Apakah Anda yakin ingin menyelesaikan proses telaah audit SPBE ini dan mengeluarkan rekomendasi pimpinan?")) {
                  onSubmitAudit();
                  alert("Audit SPBE ini telah ditutup dengan predikat sangat memuaskan.");
                }
              }}
              className="rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-500/10 hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              Selesaikan Audit & Beri Nilai
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Left indicators navigation rail, Center detailed assessment */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        
        {/* Left indicators list (Sidebar) */}
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider pl-1">Daftar Indikator SPBE</h3>
          
          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm max-h-[640px] overflow-y-auto p-2 space-y-1">
            {indicators.map((ind, idx) => {
              const resp = audit.responses[ind.id];
              const isSelected = idx === activeIndIndex;
              const hasRevision = resp?.status === "REVISION_REQUESTED";

              return (
                <button
                  key={ind.id}
                  onClick={() => setActiveIndIndex(idx)}
                  className={`w-full text-left p-3 rounded-xl transition-all duration-150 flex items-start space-x-2.5 border cursor-pointer ${
                    isSelected 
                      ? "bg-blue-50 border-blue-200 text-blue-900 shadow-sm"
                      : "bg-white border-transparent text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-mono font-bold border ${
                    isSelected ? "bg-blue-600 text-white border-blue-700" : getSidebarStatusStyle(resp?.status)
                  }`}>
                    {idx + 1}
                  </span>
                  
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-slate-400 block">{ind.code}</span>
                      {hasRevision && (
                        <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" title="Butuh Revisi" />
                      )}
                    </div>
                    <p className="text-xs font-bold truncate mt-0.5" title={ind.name}>
                      {ind.name}
                    </p>
                    <div className="flex items-center justify-between text-[10px] mt-1 text-slate-400">
                      <span>Kematangan:</span>
                      <span className="font-mono font-bold text-slate-700">
                        Level {resp?.verifiedLevel || resp?.selectedLevel || 1}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center/Right detailed evaluation interface */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Active Indicator Header Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-3.5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span className="inline-flex rounded bg-blue-50 border border-blue-100 px-2 py-0.5 text-xs font-mono font-bold text-blue-700">
                {activeIndicator.code}
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Status Kelayakan:</span>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold ${activeStatus.style}`}>
                  {activeStatus.label}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
                {activeIndicator.name}
              </h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                {activeIndicator.domain} &bull; {activeIndicator.aspect}
              </p>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed bg-slate-50/80 p-3.5 rounded-xl border border-slate-150">
              {activeIndicator.description}
            </p>
          </div>

          {/* Interactive Maturity Level Assessment Form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-6">
            <div>
              <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                1. Pilih Skala Kematangan (1 s.d 5)
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Sesuaikan penjelasan dan bukti hukum yang Anda unggah dengan rumusan kriteria di bawah ini.
              </p>
            </div>

            {/* Slider/Level Indicators */}
            <div className="grid grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5].map((lvl) => {
                const isSelected = localLevel === lvl;
                const isVerified = currentResponse.verifiedLevel === lvl;

                return (
                  <button
                    key={lvl}
                    type="button"
                    disabled={currentUser.role === UserRole.LEADER || audit.status === "COMPLETED"}
                    onClick={() => {
                      setLocalLevel(lvl);
                      setAuditorVerifiedLevel(lvl); // default sync
                    }}
                    className={`p-3 rounded-xl border text-center transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? "bg-blue-600 border-blue-700 text-white shadow-md shadow-blue-500/10 scale-102"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"
                    }`}
                  >
                    <span className="block text-sm sm:text-base font-black font-mono">Level {lvl}</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider block mt-1 opacity-80">
                      {lvl === 1 ? "Rintisan" : 
                       lvl === 2 ? "Terkelola" : 
                       lvl === 3 ? "Standard" : 
                       lvl === 4 ? "Integrasi" : "Optimum"}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Level Guidance Description Box */}
            <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4 flex items-start space-x-3 text-xs leading-relaxed text-blue-900">
              <Info className="h-4.5 w-4.5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-extrabold uppercase text-[10px] tracking-wide text-blue-700">Panduan Penilaian Level {localLevel}:</p>
                <p className="mt-1 font-medium">{activeIndicator.guidance[localLevel]}</p>
              </div>
            </div>

            {/* Auditee Text Explanation */}
            <div className="space-y-2">
              <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                2. Penjelasan Mandiri (Self Explanation)
              </label>
              <textarea
                disabled={currentUser.role === UserRole.LEADER || audit.status === "COMPLETED" || currentUser.role === UserRole.AUDITOR}
                value={localExplanation}
                onChange={(e) => setLocalExplanation(e.target.value)}
                placeholder="Tuliskan alasan, regulasi pendukung, atau kondisi riil di kementerian Anda yang membuktikan kesesuaian pada level kematangan ini..."
                className="w-full h-32 rounded-xl border border-slate-200 bg-slate-50/50 p-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all leading-relaxed"
              />
            </div>

            {/* Evidence Uplod/List Section */}
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                  3. Dokumen Bukti Dukung (Evidence)
                </label>
                {currentUser.role === UserRole.AUDITEE && audit.status !== "COMPLETED" && (
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="inline-flex items-center rounded-lg border border-blue-200 bg-blue-50/50 px-2.5 py-1.5 text-[11px] font-bold text-blue-700 hover:bg-blue-100 cursor-pointer"
                  >
                    <Paperclip className="mr-1.5 h-3.5 w-3.5" />
                    Unggah Dokumen
                  </button>
                )}
              </div>

              {/* Uploaded Files grid */}
              {(currentResponse.evidenceFiles || []).length === 0 ? (
                <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl bg-slate-50/50 text-xs text-slate-400">
                  <Paperclip className="mx-auto h-5 w-5 text-slate-350 mb-1" />
                  Belum ada dokumen bukti yang diunggah.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {(currentResponse.evidenceFiles || []).map((file) => (
                    <div key={file.id} className="flex items-center justify-between rounded-xl border border-slate-150 bg-white p-3 text-xs shadow-sm">
                      <div className="flex items-center min-w-0">
                        <Paperclip className="h-4 w-4 text-blue-600 shrink-0 mr-2" />
                        <div className="min-w-0">
                          <p className="font-bold text-slate-800 truncate" title={file.name}>{file.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{file.size} &bull; {file.uploadedBy}</p>
                        </div>
                      </div>
                      
                      {currentUser.role === UserRole.AUDITEE && audit.status !== "COMPLETED" && (
                        <button
                          onClick={() => handleDeleteFile(file.id)}
                          className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-colors shrink-0 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Save Buttons for Auditee */}
            {currentUser.role === UserRole.AUDITEE && audit.status !== "COMPLETED" && (
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end space-x-3">
                <button
                  onClick={handleSaveDraft}
                  className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <Save className="mr-1.5 h-4 w-4" />
                  Simpan Draf
                </button>
                <button
                  onClick={handleSubmitIndicator}
                  className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-700 cursor-pointer shadow-md shadow-blue-500/10"
                >
                  <Send className="mr-1.5 h-4 w-4" />
                  Ajukan Respon
                </button>
              </div>
            )}
          </div>

          {/* AUDITOR SPECIAL WORKSPACE PANEL */}
          {currentUser.role === UserRole.AUDITOR && audit.status === "UNDER_REVIEW" && (
            <div className="rounded-2xl border-2 border-purple-200 bg-purple-50/20 p-5 shadow-md space-y-4">
              <div className="flex items-center space-x-2">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-purple-600 text-white font-bold text-xs">A</span>
                <h4 className="text-sm font-extrabold text-purple-900 tracking-tight">Panel Kerja Penilai / Auditor</h4>
              </div>

              <p className="text-[11px] text-purple-700 leading-normal">
                Tinjau penjelasan mandiri dan berkas bukti di atas. Setelah itu, tentukan tingkat kematangan sesungguhnya dan tetapkan kelayakannya.
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-extrabold text-purple-900 uppercase">
                    Nilai Kelayakan (Verified Level)
                  </label>
                  <select
                    value={auditorVerifiedLevel}
                    onChange={(e) => setAuditorVerifiedLevel(Number(e.target.value))}
                    className="w-full rounded-lg border border-purple-200 bg-white px-3 py-2 text-xs font-bold text-purple-900 focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5].map(lvl => (
                      <option key={lvl} value={lvl}>Level {lvl}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-extrabold text-purple-900 uppercase">
                    Keputusan Penilai
                  </label>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAuditorAction("APPROVED")}
                      disabled={isVerifyingAction}
                      className="flex-1 inline-flex items-center justify-center rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-2 text-xs cursor-pointer shadow"
                    >
                      {isVerifyingAction ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-1" />
                      ) : (
                        <CheckCircle className="h-4 w-4 mr-1.5" />
                      )}
                      Setujui
                    </button>

                    <button
                      onClick={() => handleAuditorAction("REVISION_REQUESTED")}
                      disabled={isVerifyingAction}
                      className="flex-1 inline-flex items-center justify-center rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-2 text-xs cursor-pointer shadow"
                    >
                      {isVerifyingAction ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-1" />
                      ) : (
                        <XCircle className="h-4 w-4 mr-1.5" />
                      )}
                      Minta Revisi
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-extrabold text-purple-900 uppercase">
                  Catatan Masukan / Penjelasan Koreksi Nilai
                </label>
                <textarea
                  value={auditorNotes}
                  onChange={(e) => setAuditorNotes(e.target.value)}
                  placeholder="Berikan argumen logis jika menurunkan/menaikkan nilai level, atau sebutkan instruksi perbaikan bukti dukung jika meminta revisi..."
                  className="w-full h-20 rounded-lg border border-purple-200 bg-white p-2.5 text-xs text-purple-900 placeholder-purple-400 focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* COLLABORATIVE DISCUSSION FORUM - AUDITEE & AUDITOR */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm space-y-4">
            <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center">
              <MessageSquare className="h-4 w-4 text-blue-600 mr-1.5" />
              Kolaborasi Penilai & Auditee ({activeComments.length} Diskusi)
            </h4>

            {/* Comments Thread list */}
            <div className="space-y-3.5 max-h-64 overflow-y-auto pr-1">
              {activeComments.length === 0 ? (
                <p className="text-center py-4 text-xs text-slate-400 italic">Belum ada diskusi koordinasi pada indikator ini.</p>
              ) : (
                activeComments.map((comm) => (
                  <div key={comm.id} className="flex space-x-3 text-xs leading-relaxed">
                    <img
                      className="h-7 w-7 rounded-lg object-cover ring-1 ring-slate-100"
                      src={comm.userRole === UserRole.AUDITOR 
                        ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&h=80&q=80" 
                        : "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&h=80&q=80"
                      }
                      alt={comm.userName}
                    />
                    <div className="flex-1 bg-slate-50 border border-slate-150 p-3 rounded-xl space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1.5">
                          <span className="font-bold text-slate-800">{comm.userName}</span>
                          <span className={`inline-flex rounded-md px-1 py-0.2 text-[8px] font-bold ${
                            comm.userRole === UserRole.AUDITOR 
                              ? "bg-blue-50 text-blue-700 border border-blue-100" 
                              : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                          }`}>
                            {comm.userRole === UserRole.AUDITOR ? "Penilai" : "Auditee"}
                          </span>
                        </div>
                        <span className="text-[9px] font-mono text-slate-400">
                          {new Date(comm.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-slate-600 text-[11px]">{comm.message}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Comment Input box */}
            {currentUser.role !== UserRole.LEADER && (
              <form onSubmit={handleSendComment} className="flex space-x-2 pt-2 border-t border-slate-100">
                <input
                  type="text"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="Ketik koordinasi tanggapan atau penjelasan tambahan..."
                  className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:bg-white"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 text-xs transition-colors cursor-pointer"
                >
                  Kirim
                </button>
              </form>
            )}
          </div>

          {/* Simple previous/next indicator row */}
          <div className="flex items-center justify-between">
            <button
              disabled={activeIndIndex === 0}
              onClick={() => setActiveIndIndex(activeIndIndex - 1)}
              className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Indikator Sebelumnya
            </button>

            <button
              disabled={activeIndIndex === indicators.length - 1}
              onClick={() => setActiveIndIndex(activeIndIndex + 1)}
              className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Indikator Selanjutnya
              <ChevronRight className="ml-1 h-4 w-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Simulated File Upload Modal popup */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl border border-slate-250 bg-white p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase">Simulasi Upload Dokumen</h4>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">&times;</button>
            </div>

            <form onSubmit={handleSimulatedUpload} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-extrabold text-slate-500 uppercase">Nama File</label>
                <input
                  type="text"
                  required
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  placeholder="e.g. Kepmen_Arsitektur_SPBE_v2"
                  className="w-full rounded-lg border border-slate-200 p-2 text-xs focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-extrabold text-slate-500 uppercase">Ukuran File</label>
                  <select
                    value={newFileSize}
                    onChange={(e) => setNewFileSize(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 p-2 text-xs"
                  >
                    <option value="1.2 MB">1.2 MB</option>
                    <option value="2.4 MB">2.4 MB</option>
                    <option value="4.5 MB">4.5 MB</option>
                    <option value="950 KB">950 KB</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-extrabold text-slate-500 uppercase">Format</label>
                  <input
                    type="text"
                    disabled
                    value=".pdf (Direkomendasikan)"
                    className="w-full rounded-lg border border-slate-100 bg-slate-50 p-2 text-xs font-semibold text-slate-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
                >
                  Upload File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
