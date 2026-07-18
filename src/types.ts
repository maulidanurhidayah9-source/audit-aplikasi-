export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  AUDITOR = "AUDITOR",
  AUDITEE = "AUDITEE",
  AGENCY_ADMIN = "AGENCY_ADMIN",
  LEADER = "LEADER",
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institutionId: string;
  phoneNumber?: string;
  avatarUrl?: string;
}

export interface Institution {
  id: string;
  name: string;
  code: string;
  logoUrl?: string;
  address?: string;
  type: "MINISTRY" | "LOCAL_GOVT" | "PUBLIC_INSTITUTION";
}

export interface AuditPeriod {
  id: string;
  name: string;
  year: number;
  startDate: string;
  endDate: string;
  status: "ACTIVE" | "ARCHIVED" | "PLANNING";
}

export interface SPBEIndicator {
  id: string;
  code: string; // e.g. "Indikator 1"
  name: string;
  domain: string; // "Domain I: Kebijakan SPBE", etc.
  aspect: string; // "Aspek 1: Kebijakan Internal SPBE", etc.
  description: string;
  weight: number; // Percentage or fraction
  maxLevel: number; // typically 5 (Level 1 s/d 5)
  guidance: Record<number, string>; // Guidance for each level
}

export interface EvidenceFile {
  id: string;
  name: string;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
  size: string;
}

export interface AuditIndicatorResponse {
  indicatorId: string;
  selectedLevel: number; // 1 to 5
  auditeeExplanation: string;
  evidenceFiles: EvidenceFile[];
  status: "DRAFT" | "SUBMITTED" | "APPROVED" | "REJECTED" | "REVISION_REQUESTED";
  auditorComments?: string;
  verifiedLevel?: number; // Level set by auditor
  lastUpdated: string;
}

export interface SPBEAudit {
  id: string;
  institutionId: string;
  periodId: string;
  status: "PLANNING" | "DRAFT" | "SUBMITTED" | "UNDER_REVIEW" | "REVISION" | "COMPLETED";
  responses: Record<string, AuditIndicatorResponse>; // keyed by indicatorId
  auditorId?: string; // Assigned auditor user ID
  assignedAuditees: string[]; // User IDs of auditees inside the institution
  finalScore?: number; // Scale 1.0 - 5.0
  createdAt: string;
  submittedAt?: string;
  verifiedAt?: string;
  recommendations?: string;
}

export interface Comment {
  id: string;
  auditId: string;
  indicatorId: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  message: string;
  timestamp: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  details: string;
  timestamp: string;
  ipAddress?: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: "INFO" | "SUCCESS" | "WARNING" | "DANGER";
  isRead: boolean;
  timestamp: string;
}
