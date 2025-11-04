"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { AuditLog } from "@/lib/types"
import { Clock, User, FileCheck, Flag, CheckCircle, Eye } from "lucide-react"

interface AuditTrailProps {
  logs: AuditLog[]
}

const actionIcons = {
  CLASSIFIED: FileCheck,
  REVIEWED: Eye,
  FLAGGED: Flag,
  APPROVED: CheckCircle,
}

const actionColors = {
  CLASSIFIED: "bg-blue-100 text-blue-800 border-blue-200",
  REVIEWED: "bg-purple-100 text-purple-800 border-purple-200",
  FLAGGED: "bg-orange-100 text-orange-800 border-orange-200",
  APPROVED: "bg-green-100 text-green-800 border-green-200",
}

export function AuditTrail({ logs }: AuditTrailProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">Audit Trail</h2>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {logs.map((log) => {
          const Icon = actionIcons[log.action]
          return (
            <div
              key={log.id}
              className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="p-2 rounded-lg bg-card">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge className={actionColors[log.action]}>{log.action}</Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDate(log.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-foreground font-medium mb-1">{log.details}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {log.user}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
