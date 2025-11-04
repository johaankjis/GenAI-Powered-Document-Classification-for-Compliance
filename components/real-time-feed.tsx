"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Classification } from "@/lib/types"
import { FileText, TrendingUp } from "lucide-react"

interface RealTimeFeedProps {
  classifications: Classification[]
}

export function RealTimeFeed({ classifications }: RealTimeFeedProps) {
  const recentClassifications = classifications.slice(0, 5)

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000)

    if (seconds < 60) return "Just now"
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return `${Math.floor(seconds / 86400)}d ago`
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">Real-Time Activity</h2>
      <div className="space-y-3">
        {recentClassifications.map((classification) => (
          <div
            key={classification.id}
            className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{classification.documentName}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {classification.category}
                </Badge>
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  {(classification.confidence * 100).toFixed(0)}%
                </span>
              </div>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {formatTimeAgo(classification.timestamp)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}
