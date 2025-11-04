"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Classification, AuditLog, RiskLevel } from "@/lib/types"
import { FileText, Clock, TrendingUp, Shield, CheckCircle, Flag } from "lucide-react"
import { AuditTrail } from "./audit-trail"

interface ClassificationDetailModalProps {
  classification: Classification | null
  isOpen: boolean
  onClose: () => void
}

const riskColors: Record<RiskLevel, string> = {
  Low: "bg-green-100 text-green-800 border-green-200",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  High: "bg-orange-100 text-orange-800 border-orange-200",
  Critical: "bg-red-100 text-red-800 border-red-200",
}

export function ClassificationDetailModal({ classification, isOpen, onClose }: ClassificationDetailModalProps) {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (classification && isOpen) {
      fetchAuditLogs()
    }
  }, [classification, isOpen])

  const fetchAuditLogs = async () => {
    if (!classification) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/classifications/${classification.id}`)
      const data = await response.json()

      if (data.success) {
        setAuditLogs(data.auditLogs)
      }
    } catch (error) {
      console.error("[v0] Error fetching audit logs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAction = async (action: "REVIEWED" | "FLAGGED" | "APPROVED") => {
    if (!classification) return

    try {
      const response = await fetch("/api/audit-logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          classificationId: classification.id,
          action,
          user: "compliance.officer@company.com",
          details: `Document ${action.toLowerCase()} by compliance officer`,
        }),
      })

      if (response.ok) {
        fetchAuditLogs()
      }
    } catch (error) {
      console.error("[v0] Error creating audit log:", error)
    }
  }

  if (!classification) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Classification Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Document Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{classification.documentName}</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="font-medium">
                  {classification.category}
                </Badge>
                <Badge className={riskColors[classification.riskLevel]}>{classification.riskLevel} Risk</Badge>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs font-medium">Confidence</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{(classification.confidence * 100).toFixed(1)}%</p>
              </div>

              <div className="p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-medium">Processing</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{classification.processingTime}ms</p>
              </div>

              <div className="p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <FileText className="w-4 h-4" />
                  <span className="text-xs font-medium">Words</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{classification.metadata.wordCount}</p>
              </div>

              <div className="p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Shield className="w-4 h-4" />
                  <span className="text-xs font-medium">File Size</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {(classification.metadata.fileSize / 1024).toFixed(0)}KB
                </p>
              </div>
            </div>

            {/* Document Preview */}
            <div className="p-4 rounded-lg bg-muted/30">
              <h4 className="text-sm font-medium text-foreground mb-2">Document Preview</h4>
              <p className="text-sm text-muted-foreground">{classification.documentContent}...</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button onClick={() => handleAction("REVIEWED")} variant="outline" size="sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark as Reviewed
            </Button>
            <Button onClick={() => handleAction("FLAGGED")} variant="outline" size="sm">
              <Flag className="w-4 h-4 mr-2" />
              Flag for Review
            </Button>
            <Button onClick={() => handleAction("APPROVED")} variant="outline" size="sm">
              <CheckCircle className="w-4 h-4 mr-2" />
              Approve
            </Button>
          </div>

          {/* Audit Trail */}
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" />
            </div>
          ) : (
            <AuditTrail logs={auditLogs} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
