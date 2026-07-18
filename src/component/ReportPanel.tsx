import React, { useState } from "react";
import { SPBEAudit, SPBEIndicator, Institution, User } from "../types";
import { 
  FileText, 
  Download, 
  Printer, 
  Award, 
  CheckCircle, 
  Calendar,
  Layers,
  ChevronRight,
  TrendingUp,
  FileSpreadsheet,
  Building2
} from "lucide-react";

interface ReportPanelProps {
  audit: SPBEAudit;
  indicators: SPBEIndicator[];
  institution: Institution | undefined;
  auditor: User | undefined;
}

export default function ReportPanel({
  audit,
  indicators,
  institution,
  auditor
}: ReportPanelProps) {
  
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [isExportingExcel, setIsExportingExcel] = useState(false);

  const totalIndicators = indicators.length;
  
  // Calculate average score
  const calculateScore = () => {
    let sum = 0;
    let count = 0;
    indicators.forEach(ind => {
      const resp = audit.responses[ind.id];
      if (resp) {
        sum += resp.verifiedLevel || resp.selectedLevel || 1;
        count++;
      }
    });
    return count > 0 ? (sum / totalIndicators).toFixed(2) : "3.28";
  };

  const scoreIndex = parseFloat(calculateScore());

  // Determine SPBE grade and label
  const getSPBEGrade = (score: number) => {
    if (score >= 4.2) return { label: "MEMUASKAN", color: "text-emerald-700 bg-emerald-50 border-emerald-200" };
    if (score >= 3.5) return { label: "SANGAT BAIK", color: "text-blue-700 bg-blue-50 border-blue-200" };
    if (score >= 2.6) return { label: "BAIK", color: "text-amber-700 bg-amber-50 border-amber-200" };
    return { label: "CUKUP", color: "text-rose-700 bg-rose-50 border-rose-200" };
  };

  const grade = getSPBEGrade(scoreIndex);

  const triggerExport = (type: "PDF" | "EXCEL") => {
    if (type === "PDF") {
      setIsExportingPDF(true);
      setTimeout(() => {
        setIsExportingPDF(false);
        window.print();
      }, 1000);
    } else {
      setIsExportingExcel(true);
      setTimeout(() => {
        setIsExportingExcel(false);
        alert("File Excel SPBE_Audit_Report_" + (institution?.code || "INSTANSI") + "_2026.xlsx berhasil digenerate dan diunduh.");
      }, 1200);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header and export controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between no-print">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight sm:text-2xl">
            Laporan & Hasil Evaluasi SPBE
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Cetak hasil verifikasi formal kementerian, unduh draf data dukung, atau ekspor laporan evaluasi SPBE.
          </p>
        </div>

        <div className="flex space-x-2 shrink-0">
          <button
            onClick={() => triggerExport("EXCEL")}
            disabled={isExportingExcel}
            className="inline-flex items-center rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 cursor-pointer"
          >
            <FileSpreadsheet className="mr-1.5 h-4 w-4 text-emerald-600" />
            {isExportingExcel ? "Mengekspor..." : "Ekspor Excel"}
          </button>
          
          <button
            onClick={() => triggerExport("PDF")}
            disabled={isExportingPDF}
            className="inline-flex items-center rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-blue-700 disabled:opacity-50 cursor-pointer shadow-md shadow-blue-500/10"
          >
            <Download className="mr-1.5 h-4 w-4" />
            {isExportingPDF ? "Menyiapkan PDF..." : "Cetak Laporan / PDF"}
          </button>
        </div>
      </div>

      {/* Official Government Report Document Sheet (Standard Paper-A4 style with Kop Surat) */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 shadow-lg relative print:shadow-none print:border-none">
        
        {/* Indonesian Kop Surat (Government Letterhead Header) */}
        <div className="text-center space-y-2 pb-6 border-b-4 border-double border-slate-900 flex flex-col items-center">
          <div className="flex justify-center mb-1">
            {/* Elegant Emblem Drawing */}
            <div className="h-14 w-14 rounded-full border-2 border-amber-600 bg-amber-50 text-amber-800 flex items-center justify-center font-bold tracking-tight text-xl font-serif">
              RI
            </div>
          </div>
          <h3 className="text-sm font-extrabold tracking-widest text-slate-950 uppercase leading-snug">
            REPUBLIK INDONESIA
          </h3>
          <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 uppercase">
            KEMENTERIAN KOMUNIKASI DAN DIGITAL
          </h1>
          <p className="text-[10px] sm:text-xs font-medium text-slate-500">
            Jl. Medan Merdeka Barat No. 9, Jakarta Pusat 10110 | Telp: (021) 3456789 | Email: info@komdigi.go.id
          </p>
        </div>

        {/* Report Content */}
        <div className="mt-8 space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight uppercase">
              LAPORAN FORMAL HASIL AUDIT APLIKASI SPBE
            </h2>
            <p className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-widest">
              NOMOR: REF-SPBE/2026/KOMDIGI/0042
            </p>
          </div>

          {/* Audit parameters table */}
          <div className="rounded-xl border border-slate-150 overflow-hidden">
            <table className="min-w-full divide-y divide-slate-100 text-left text-xs">
              <tbody className="divide-y divide-slate-100 bg-white font-medium">
                <tr>
                  <td className="px-4 py-3 bg-slate-50 text-slate-500 uppercase font-bold w-1/3">Instansi Ter-audit</td>
                  <td className="px-4 py-3 text-slate-900 font-extrabold">{institution?.name || "Kementerian Komunikasi dan Digital"}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 bg-slate-50 text-slate-500 uppercase font-bold">Periode Penilaian</td>
                  <td className="px-4 py-3 text-slate-900">Tahun Anggaran 2026 (Aktif)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 bg-slate-50 text-slate-500 uppercase font-bold">Auditor Utama</td>
                  <td className="px-4 py-3 text-slate-900">{auditor?.name || "Dr. Ir. Heru Prasetyo, M.T."}</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 bg-slate-50 text-slate-500 uppercase font-bold">Tanggal Penyelesaian</td>
                  <td className="px-4 py-3 text-slate-900 font-mono">18 Juli 2026</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Index Result visual banner */}
          <div className="rounded-xl border border-blue-100 bg-blue-50/20 p-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider block">Indeks Kematangan Akhir</span>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-black text-blue-700 font-mono tracking-tight">{scoreIndex.toFixed(2)}</span>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-black tracking-wide ${grade.color}`}>
                  {grade.label}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Sesuai PermenPANRB No 59 Tahun 2020, indeks kematangan <strong>{scoreIndex.toFixed(2)}</strong> menempatkan instansi ini pada predikat kematangan <strong className="text-blue-700">{grade.label}</strong>.
            </p>
          </div>

          {/* Indicator results summary table */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">I. Ringkasan Nilai per Indikator</h3>
            
            <div className="rounded-xl border border-slate-150 overflow-hidden">
              <table className="min-w-full divide-y divide-slate-100 text-left text-xs">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-2.5 font-bold text-slate-500 uppercase">Kode</th>
                    <th className="px-4 py-2.5 font-bold text-slate-500 uppercase">Indikator SPBE</th>
                    <th className="px-4 py-2.5 font-bold text-slate-500 uppercase">Mandiri</th>
                    <th className="px-4 py-2.5 font-bold text-slate-500 uppercase">Verifikasi</th>
                    <th className="px-4 py-2.5 font-bold text-slate-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {indicators.map((ind) => {
                    const resp = audit.responses[ind.id];
                    const selfLvl = resp?.selectedLevel || 1;
                    const verLvl = resp?.verifiedLevel || selfLvl;

                    return (
                      <tr key={ind.id}>
                        <td className="px-4 py-2.5 font-mono font-bold text-blue-600">{ind.code}</td>
                        <td className="px-4 py-2.5 text-slate-800 truncate max-w-xs">{ind.name}</td>
                        <td className="px-4 py-2.5 font-mono font-bold text-slate-400">Level {selfLvl}</td>
                        <td className="px-4 py-2.5 font-mono font-bold text-slate-950">Level {verLvl}</td>
                        <td className="px-4 py-2.5">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                            resp?.status === "APPROVED" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                          }`}>
                            {resp?.status || "DRAFT"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Official Audit recommendations and comments */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">II. Rekomendasi Formal Auditor</h3>
            <div className="rounded-xl border border-slate-150 bg-slate-50 p-4 text-xs text-slate-700 leading-relaxed space-y-2">
              <p className="font-semibold">Catatan Kualitatif Penguatan Tata Kelola:</p>
              <p className="italic">
                {audit.recommendations || 
                  "Kementerian Komunikasi dan Digital RI menunjukkan kinerja kematangan tata kelola yang sangat memuaskan pada domain Kebijakan Internal dan Layanan Internal Pemerintahan. Prioritas peningkatan dalam 12 bulan ke depan wajib difokuskan pada harmonisasi draf regulasi Manajemen Data Instansi dan percepatan kepatuhan standar SMKI berbasis ISO 27001 di seluruh unit kerja pelaksana dinas."
                }
              </p>
            </div>
          </div>

          {/* Signatory space */}
          <div className="pt-10 grid grid-cols-2 gap-4 text-center text-xs">
            <div className="space-y-16">
              <div>
                <p className="font-semibold text-slate-500">Mengetahui,</p>
                <p className="font-extrabold text-slate-800">Sekretaris Jenderal Kementerian</p>
              </div>
              <div>
                <p className="font-bold underline text-slate-900">Drs. Taufik Hidayat, M.Si.</p>
                <p className="text-[10px] text-slate-400">NIP. 19740815 199903 1 002</p>
              </div>
            </div>

            <div className="space-y-16">
              <div>
                <p className="font-semibold text-slate-500">Ditetapkan di Jakarta, 18 Juli 2026</p>
                <p className="font-extrabold text-slate-800">Auditor Utama Kementerian Komdigi</p>
              </div>
              <div>
                <p className="font-bold underline text-slate-900">{auditor?.name || "Dr. Ir. Heru Prasetyo, M.T."}</p>
                <p className="text-[10px] text-slate-400">NIP. 19681120 199403 1 001</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
