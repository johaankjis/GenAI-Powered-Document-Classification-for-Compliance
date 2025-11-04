export type ComplianceCategory =
  | "Financial Report"
  | "Tax Document"
  | "Legal Contract"
  | "Internal Memo"
  | "Regulatory Filing"
  | "Audit Report"

export type RiskLevel = "Low" | "Medium" | "High" | "Critical"

export interface Classification {
  id: string
  documentName: string
  documentContent: string
  category: ComplianceCategory
  confidence: number
  riskLevel: RiskLevel
  timestamp: Date
  processingTime: number // in milliseconds
  metadata: {
    fileSize: number
    fileType: string
    wordCount: number
  }
}

export interface AuditLog {
  id: string
  classificationId: string
  action: "CLASSIFIED" | "REVIEWED" | "FLAGGED" | "APPROVED"
  user: string
  timestamp: Date
  details: string
}

export interface ClassificationStats {
  totalDocuments: number
  byCategory: Record<ComplianceCategory, number>
  byRiskLevel: Record<RiskLevel, number>
  averageConfidence: number
  recentClassifications: Classification[]
}
