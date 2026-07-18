import React, { useState } from "react";
import { SPBEAudit, SPBEIndicator, Institution, ActivityLog, UserRole } from "../types";
import { 
  Award, 
  BarChart3, 
  CheckCircle2, 
  FileText, 
  TrendingUp, 
  Clock, 
  HelpCircle,
  AlertCircle,
  FolderDot,
  Building2,
  Calendar,
  Layers,
  ShieldAlert,
  ArrowRight
} from "lucide-react";

interface DashboardAnalyticsProps {
  audits: SPBEAudit[];
  indicators: SPBEIndicator[];
  institutions: Institution[];
  activityLogs: ActivityLog[];
  onSelectAudit: (auditId: string) => void;
  userRole: UserRole;
}

export default function DashboardAnalytics({
  audits,
  indicators,
  institutions,
  activityLogs,
  onSelectAudit,
  userRole
}: DashboardAnalyticsProps) {
  const [selectedDomainFilter, setSelectedDomainFilter] = useState<string>("ALL");

  // Helper to resolve institution name
  const getInstitutionName = (id: string) => {
    return institutions.find((inst) => inst.id === id)?.name || "Instansi Pemerintah";
  };

  const getInstitutionCode = (id: string) => {
    return institutions.find((inst) => inst.id === id)?.code || "GOV";
  };

  // Calculate high level aggregate indicators
  const totalAuditsCount = audits.length;
  const completedAuditsCount = audits.filter(a => a.status === "COMPLETED").length;
  const reviewAuditsCount = audits.filter(a => a.status === "UNDER_REVIEW").length;
  
  // Calculate average SPBE Index across completed audits
  const completedAudits = audits.filter(a => a.status === "COMPLETED" || (a.finalScore && a.finalScore > 0));
  const averageSPBEIndex = completedAudits.length > 0
    ? (completedAudits.reduce((acc, curr) => acc + (curr.finalScore || 0), 0) / completedAudits.length).toFixed(2)
    : "3.28"; // Highly detailed fallback

  // Let's compute average scores for a single representative active audit: e.g. "audit-komdigi-2026"
  const komdigiAudit = audits.find(a => a.id === "audit-komdigi-2026");
  
  // Calculate score breakdown per domain
  const domains = [
    { id: "dom-1", name: "Domain I: Kebijakan Internal SPBE", color: "bg-blue-600", text: "text-blue-600", border: "border-blue-100", lightBg: "bg-blue-50/50" },
    { id: "dom-2", name: "Domain II: Tata Kelola SPBE", color: "bg-purple-600", text: "text-purple-600", border: "border-purple-100", lightBg: "bg-purple-50/50" },
    { id: "dom-3", name: "Domain III: Manajemen SPBE", color: "bg-amber-600", text: "text-amber-600", border: "border-amber-100", lightBg: "bg-amber-50/50" },
    { id: "dom-4", name: "Domain IV: Layanan SPBE", color: "bg-emerald-600", text: "text-emerald-600", border: "border-emerald-100", lightBg: "bg-emerald-50/50" }
  ];

  const getDomainScore = (domainName: string): { self: number; verified: number; total: number } => {
    // Get all indicators in this domain
    const domainIndicators = indicators.filter(ind => ind.domain.toLowerCase().includes(domainName.split(":")[0].toLowerCase()));
    if (domainIndicators.length === 0) return { self: 0, verified: 0, total: 0 };

    let totalSelfScore = 0;
    let totalVerifiedScore = 0;
    let countedVerified = 0;

    if (komdigiAudit) {
      domainIndicators.forEach(ind => {
        const resp = komdigiAudit.responses[ind.id];
        if (resp) {
          totalSelfScore += resp.selectedLevel;
          if (resp.status === "APPROVED" && resp.verifiedLevel) {
            totalVerifiedScore += resp.verifiedLevel;
            countedVerified++;
          } else {
            // default to current level or selected level for estimation
            totalVerifiedScore += resp.verifiedLevel || resp.selectedLevel;
            countedVerified++;
          }
        } else {
          // Default baseline
          totalSelfScore += 1;
          totalVerifiedScore += 1;
          countedVerified++;
        }
      });
    } else {
      return { self: 3.5, verified: 3.2, total: domainIndicators.length };
    }

    return {
      self: Number((totalSelfScore / domainIndicators.length).toFixed(2)),
      verified: Number((totalVerifiedScore / countedVerified).toFixed(2)),
      total: domainIndicators.length
    };
  };

  const getStatusLabel = (status: SPBEAudit["status"]) => {
    switch (status) {
      case "PLANNING":
        return { label: "Perencanaan", color: "bg-slate-100 text-slate-700 border-slate-200" };
      case "DRAFT":
        return { label: "Draf Pengisian", color: "bg-amber-50 text-amber-700 border-amber-200" };
      case "SUBMITTED":
        return { label: "Diajukan", color: "bg-blue-50 text-blue-700 border-blue-200" };
      case "UNDER_REVIEW":
        return { label: "Sedang Direview", color: "bg-purple-50 text-purple-700 border-purple-200" };
      case "REVISION":
        return { label: "Revisi Diminta", color: "bg-red-50 text-red-700 border-red-200" };
      case "COMPLETED":
        return { label: "Audit Selesai", color: "bg-emerald-50 text-emerald-700 border-emerald-200" };
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Header Info Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight sm:text-2xl">
            Dasbor Pemantauan SPBE Nasional
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Ringkasan data, grafik pencapaian indeks kematangan, dan aktivitas penjaminan mutu audit instansi pemerintah.
          </p>
        </div>
        
        <div className="flex items-center space-x-2.5 rounded-xl border border-slate-200 bg-white p-2 text-xs font-semibold text-slate-600">
          <Calendar className="h-4 w-4 text-blue-600" />
          <span>Tahun Evaluasi: <strong>2026 (Aktif)</strong></span>
        </div>
      </div>

      {/* Aggregate Score & Metrics Panel */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* SPBE Index Index Metric */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="absolute right-0 top-0 -mr-6 -mt-6 h-18 w-18 rounded-full bg-blue-50/50" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Indeks SPBE Nasional</span>
            <Award className="h-5 w-5 text-blue-600" />
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-slate-900 font-mono tracking-tight">{averageSPBEIndex}</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              <TrendingUp className="h-3.5 w-3.5 mr-0.5" /> +0.42 tahun lalu
            </span>
          </div>
          <p className="mt-2 text-[11px] font-semibold text-slate-400 uppercase">
            Predikat: <strong className="text-blue-600">Sangat Baik</strong> (Skala 5.0)
          </p>
        </div>

        {/* Total Audits Tracked */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="absolute right-0 top-0 -mr-6 -mt-6 h-18 w-18 rounded-full bg-purple-50/50" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Jumlah Instansi Diaudit</span>
            <Building2 className="h-5 w-5 text-purple-600" />
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-slate-900 font-mono tracking-tight">{totalAuditsCount}</span>
            <span className="text-xs font-medium text-slate-500">Kementerian & Pemda</span>
          </div>
          <div className="mt-2 flex space-x-2 text-[10px] font-bold text-slate-500">
            <span className="text-emerald-600">{completedAuditsCount} Selesai</span>
            <span>&bull;</span>
            <span className="text-purple-600">{reviewAuditsCount} Penelaahan</span>
          </div>
        </div>

        {/* Indicators Total */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="absolute right-0 top-0 -mr-6 -mt-6 h-18 w-18 rounded-full bg-amber-50/50" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Indikator Master</span>
            <Layers className="h-5 w-5 text-amber-600" />
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-slate-900 font-mono tracking-tight">{indicators.length}</span>
            <span className="text-xs font-medium text-slate-500">Indikator Mutu</span>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            Mencakup kebijakan, tata kelola, manajemen, & layanan.
          </p>
        </div>

        {/* Action Needed Counter */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="absolute right-0 top-0 -mr-6 -mt-6 h-18 w-18 rounded-full bg-rose-50/50" />
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Butuh Tindakan</span>
            <ShieldAlert className="h-5 w-5 text-rose-600" />
          </div>
          <div className="mt-4 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-slate-900 font-mono tracking-tight">2</span>
            <span className="text-xs font-semibold text-rose-600">Revisi Pending</span>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            Unggah ulang bukti dukung untuk perbaikan nilai.
          </p>
        </div>

      </div>

      {/* Bento Grid: Four SPBE Domains Dashboard Summary */}
      <div className="space-y-4">
        <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Visualisasi Nilai Kematangan per Domain SPBE (PermenPANRB 59/2020)</h3>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {domains.map((dom) => {
            const score = getDomainScore(dom.name);
            const verifiedPercent = (score.verified / 5) * 100;
            const selfPercent = (score.self / 5) * 100;

            return (
              <div 
                key={dom.id} 
                className={`rounded-2xl border ${dom.border} ${dom.lightBg} p-5 space-y-4 shadow-sm hover:shadow transition-all duration-200`}
              >
                <div>
                  <h4 className="text-xs font-bold text-slate-900 truncate" title={dom.name}>
                    {dom.name}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">{score.total} Indikator Evaluasi</p>
                </div>

                {/* Score Meters */}
                <div className="space-y-3">
                  {/* Verified Score */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-semibold text-slate-500">Nilai Auditor (Sah)</span>
                      <span className="font-mono font-extrabold text-slate-900">{score.verified} / 5</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200/80 rounded-full overflow-hidden">
                      <div className={`h-full ${dom.color} rounded-full`} style={{ width: `${verifiedPercent}%` }} />
                    </div>
                  </div>

                  {/* Self Score */}
                  <div>
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-semibold text-slate-500">Penilaian Mandiri</span>
                      <span className="font-mono font-bold text-slate-700">{score.self} / 5</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200/50 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-400 rounded-full" style={{ width: `${selfPercent}%` }} />
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-150 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400">Akurasi Bukti:</span>
                  <span className={`font-mono font-bold ${
                    Math.abs(score.self - score.verified) < 0.5 ? "text-emerald-600" : "text-amber-600"
                  }`}>
                    {Math.abs(score.self - score.verified) < 0.5 ? "Sangat Sesuai" : "Butuh Kalibrasi"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Active Audits List & Activity Log */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        
        {/* Left 2 Columns: Audit Progress & Registration list */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Status Evaluasi Instansi Aktif</h3>
            <span className="text-[10px] font-semibold text-slate-500">Tahun Anggaran 2026</span>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
            <table className="min-w-full divide-y divide-slate-100 text-left">
              <thead className="bg-slate-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Instansi Pemerintah</th>
                  <th scope="col" className="px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Status Audit</th>
                  <th scope="col" className="px-4 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Indeks SPBE</th>
                  <th scope="col" className="relative px-4 py-3">
                    <span className="sr-only">Aksi</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {audits.map((audit) => {
                  const statusInfo = getStatusLabel(audit.status);
                  
                  // Calculate mock indicator count completed
                  const totalIndicatorsCount = indicators.length;
                  const answeredCount = Object.keys(audit.responses).length;
                  const progressPct = Math.round((answeredCount / totalIndicatorsCount) * 100);

                  return (
                    <tr key={audit.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="flex items-center">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 font-mono font-bold text-xs shrink-0 border border-blue-100">
                            {getInstitutionCode(audit.institutionId)}
                          </div>
                          <div className="ml-3">
                            <div className="text-xs font-bold text-slate-800">{getInstitutionName(audit.institutionId)}</div>
                            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Periode: 2026</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4">
                        <div className="space-y-1">
                          <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold ${statusInfo.color}`}>
                            {statusInfo.label}
                          </span>
                          <div className="flex items-center space-x-1.5">
                            <span className="text-[9px] font-mono font-bold text-slate-400">{progressPct}% Pengisian</span>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 font-mono text-xs">
                        {audit.status === "COMPLETED" ? (
                          <div className="flex items-center space-x-1">
                            <span className="text-emerald-600 font-bold text-sm">{audit.finalScore?.toFixed(2)}</span>
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 border border-slate-100 px-1 rounded">Sangat Baik</span>
                          </div>
                        ) : audit.id === "audit-komdigi-2026" ? (
                          <div className="flex items-center space-x-1">
                            <span className="text-blue-600 font-bold text-sm">3.43</span>
                            <span className="text-[9px] font-bold text-amber-500 uppercase tracking-wider bg-amber-50 border border-amber-100 px-1 rounded">Estimasi</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 font-semibold italic">Belum dinilai</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-right text-xs font-medium">
                        <button
                          onClick={() => onSelectAudit(audit.id)}
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-bold cursor-pointer group"
                        >
                          {userRole === UserRole.LEADER ? "Tinjau Laporan" : "Buka Kerja"}
                          <ArrowRight className="ml-1 h-3.5 w-3.5 transform transition-transform duration-150 group-hover:translate-x-0.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right 1 Column: Activity Logs Feed */}
        <div className="space-y-4">
          <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Aktivitas Audit Terkini (Log)</h3>
          
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm space-y-4 max-h-[360px] overflow-y-auto">
            {activityLogs.map((log) => {
              const getActionBadge = (act: string) => {
                switch (act) {
                  case "SUBMIT_AUDIT":
                    return "bg-blue-100 text-blue-800";
                  case "REVIEW_INDICATOR":
                    return "bg-purple-100 text-purple-800";
                  case "UPLOAD_EVIDENCE":
                    return "bg-emerald-100 text-emerald-800";
                  default:
                    return "bg-slate-100 text-slate-800";
                }
              };

              return (
                <div key={log.id} className="flex space-x-3 text-xs pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="mt-0.5">
                    <span className="flex h-2 w-2 rounded-full bg-blue-500" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-800 truncate max-w-[120px]">{log.userName}</span>
                      <span className="font-mono text-[9px] text-slate-400">
                        {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className={`px-1 rounded text-[8px] font-bold ${getActionBadge(log.action)}`}>
                        {log.action}
                      </span>
                    </div>
                    <p className="text-slate-500 leading-normal text-[11px]">{log.details}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
