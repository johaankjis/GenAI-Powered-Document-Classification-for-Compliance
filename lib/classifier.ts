import type { ComplianceCategory, RiskLevel } from "./types"

// Mock DistilBERT classifier
export class DocumentClassifier {
  private categoryKeywords: Record<ComplianceCategory, string[]> = {
    "Financial Report": [
      "revenue",
      "profit",
      "loss",
      "balance sheet",
      "income statement",
      "financial",
      "earnings",
      "fiscal",
    ],
    "Tax Document": ["tax", "irs", "deduction", "filing", "return", "taxable", "withholding", "exemption"],
    "Legal Contract": ["agreement", "contract", "party", "terms", "conditions", "hereby", "whereas", "covenant"],
    "Internal Memo": ["memo", "memorandum", "internal", "team", "update", "notice", "announcement", "fyi"],
    "Regulatory Filing": [
      "sec",
      "filing",
      "compliance",
      "regulatory",
      "disclosure",
      "form",
      "regulation",
      "submission",
    ],
    "Audit Report": ["audit", "auditor", "findings", "review", "examination", "assessment", "evaluation", "inspection"],
  }

  private riskKeywords = {
    critical: ["fraud", "violation", "breach", "illegal", "criminal", "lawsuit", "penalty", "sanctions"],
    high: ["risk", "concern", "issue", "problem", "warning", "alert", "urgent", "critical"],
    medium: ["review", "attention", "consider", "note", "important", "significant"],
    low: ["routine", "standard", "normal", "regular", "typical", "usual"],
  }

  classify(documentContent: string): { category: ComplianceCategory; confidence: number; riskLevel: RiskLevel } {
    const content = documentContent.toLowerCase()

    // Calculate scores for each category
    const scores: Record<ComplianceCategory, number> = {
      "Financial Report": 0,
      "Tax Document": 0,
      "Legal Contract": 0,
      "Internal Memo": 0,
      "Regulatory Filing": 0,
      "Audit Report": 0,
    }

    // Score each category based on keyword matches
    Object.entries(this.categoryKeywords).forEach(([category, keywords]) => {
      keywords.forEach((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, "gi")
        const matches = content.match(regex)
        if (matches) {
          scores[category as ComplianceCategory] += matches.length
        }
      })
    })

    // Find category with highest score
    let maxScore = 0
    let bestCategory: ComplianceCategory = "Internal Memo"

    Object.entries(scores).forEach(([category, score]) => {
      if (score > maxScore) {
        maxScore = score
        bestCategory = category as ComplianceCategory
      }
    })

    // Calculate confidence (normalize score)
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0)
    const confidence = totalScore > 0 ? maxScore / totalScore : 0.5

    // Add some randomness to make it more realistic
    const adjustedConfidence = Math.min(0.99, Math.max(0.65, confidence + (Math.random() * 0.15 - 0.075)))

    // Determine risk level
    const riskLevel = this.determineRiskLevel(content)

    return {
      category: bestCategory,
      confidence: adjustedConfidence,
      riskLevel,
    }
  }

  private determineRiskLevel(content: string): RiskLevel {
    let riskScore = 0

    // Check for critical keywords
    this.riskKeywords.critical.forEach((keyword) => {
      if (content.includes(keyword)) riskScore += 4
    })

    // Check for high risk keywords
    this.riskKeywords.high.forEach((keyword) => {
      if (content.includes(keyword)) riskScore += 2
    })

    // Check for medium risk keywords
    this.riskKeywords.medium.forEach((keyword) => {
      if (content.includes(keyword)) riskScore += 1
    })

    if (riskScore >= 8) return "Critical"
    if (riskScore >= 4) return "High"
    if (riskScore >= 2) return "Medium"
    return "Low"
  }
}

export const classifier = new DocumentClassifier()
