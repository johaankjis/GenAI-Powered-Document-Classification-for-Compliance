import type { Classification, AuditLog, ComplianceCategory, RiskLevel } from "./types"

// In-memory storage for classifications and audit logs
class MockDatabase {
  private classifications: Map<string, Classification> = new Map()
  private auditLogs: Map<string, AuditLog> = new Map()

  constructor() {
    this.seedData()
  }

  private seedData() {
    // Seed with some sample data
    const sampleClassifications: Classification[] = [
      {
        id: "1",
        documentName: "Q4_Financial_Report_2024.pdf",
        documentContent: "Financial report for Q4 2024...",
        category: "Financial Report",
        confidence: 0.95,
        riskLevel: "Low",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        processingTime: 1250,
        metadata: {
          fileSize: 245000,
          fileType: "application/pdf",
          wordCount: 3500,
        },
      },
      {
        id: "2",
        documentName: "Tax_Filing_2024.pdf",
        documentContent: "Annual tax filing documentation...",
        category: "Tax Document",
        confidence: 0.92,
        riskLevel: "Medium",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
        processingTime: 980,
        metadata: {
          fileSize: 180000,
          fileType: "application/pdf",
          wordCount: 2800,
        },
      },
      {
        id: "3",
        documentName: "Vendor_Contract_2024.pdf",
        documentContent: "Legal contract with vendor...",
        category: "Legal Contract",
        confidence: 0.88,
        riskLevel: "High",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
        processingTime: 1450,
        metadata: {
          fileSize: 320000,
          fileType: "application/pdf",
          wordCount: 4200,
        },
      },
    ]

    sampleClassifications.forEach((c) => this.classifications.set(c.id, c))

    // Seed audit logs
    const sampleLogs: AuditLog[] = [
      {
        id: "log-1",
        classificationId: "1",
        action: "CLASSIFIED",
        user: "System",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        details: "Document automatically classified",
      },
      {
        id: "log-2",
        classificationId: "1",
        action: "REVIEWED",
        user: "compliance.officer@company.com",
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        details: "Classification verified by compliance officer",
      },
    ]

    sampleLogs.forEach((log) => this.auditLogs.set(log.id, log))
  }

  // Classification methods
  addClassification(classification: Classification): Classification {
    this.classifications.set(classification.id, classification)

    // Add audit log
    const auditLog: AuditLog = {
      id: `log-${Date.now()}`,
      classificationId: classification.id,
      action: "CLASSIFIED",
      user: "System",
      timestamp: new Date(),
      details: `Document classified as ${classification.category} with ${(classification.confidence * 100).toFixed(1)}% confidence`,
    }
    this.auditLogs.set(auditLog.id, auditLog)

    return classification
  }

  getClassification(id: string): Classification | undefined {
    return this.classifications.get(id)
  }

  getAllClassifications(): Classification[] {
    return Array.from(this.classifications.values()).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  getRecentClassifications(limit = 10): Classification[] {
    return this.getAllClassifications().slice(0, limit)
  }

  // Audit log methods
  addAuditLog(log: AuditLog): AuditLog {
    this.auditLogs.set(log.id, log)
    return log
  }

  getAuditLogsForClassification(classificationId: string): AuditLog[] {
    return Array.from(this.auditLogs.values())
      .filter((log) => log.classificationId === classificationId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  getAllAuditLogs(): AuditLog[] {
    return Array.from(this.auditLogs.values()).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  // Statistics methods
  getStats() {
    const classifications = this.getAllClassifications()

    const byCategory: Record<ComplianceCategory, number> = {
      "Financial Report": 0,
      "Tax Document": 0,
      "Legal Contract": 0,
      "Internal Memo": 0,
      "Regulatory Filing": 0,
      "Audit Report": 0,
    }

    const byRiskLevel: Record<RiskLevel, number> = {
      Low: 0,
      Medium: 0,
      High: 0,
      Critical: 0,
    }

    let totalConfidence = 0

    classifications.forEach((c) => {
      byCategory[c.category]++
      byRiskLevel[c.riskLevel]++
      totalConfidence += c.confidence
    })

    return {
      totalDocuments: classifications.length,
      byCategory,
      byRiskLevel,
      averageConfidence: classifications.length > 0 ? totalConfidence / classifications.length : 0,
      recentClassifications: this.getRecentClassifications(5),
    }
  }
}

// Singleton instance
export const mockDB = new MockDatabase()
