"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Classification, RiskLevel } from "@/lib/types"
import { FileText, Clock } from "lucide-react"

interface ClassificationTableProps {
  classifications: Classification[]
  onSelectClassification?: (classification: Classification) => void
}

const riskColors: Record<RiskLevel, string> = {
  Low: "bg-green-100 text-green-800 border-green-200",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  High: "bg-orange-100 text-orange-800 border-orange-200",
  Critical: "bg-red-100 text-red-800 border-red-200",
}

export function ClassificationTable({ classifications, onSelectClassification }: ClassificationTableProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-6 border-b border-border">
        <h2 className="text-xl font-semibold text-foreground">Recent Classifications</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Document
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Confidence
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Risk Level
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Timestamp
              </th>
            </tr>
          </thead>
          <tbody className="bg-card divide-y divide-border">
            {classifications.map((classification) => (
              <tr
                key={classification.id}
                onClick={() => onSelectClassification?.(classification)}
                className="hover:bg-muted/30 cursor-pointer transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-muted-foreground mr-3" />
                    <div>
                      <div className="text-sm font-medium text-foreground">{classification.documentName}</div>
                      <div className="text-xs text-muted-foreground">{classification.metadata.wordCount} words</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge variant="outline" className="font-medium">
                    {classification.category}
                  </Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-16 bg-muted rounded-full h-2 mr-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${classification.confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {(classification.confidence * 100).toFixed(1)}%
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Badge className={riskColors[classification.riskLevel]}>{classification.riskLevel}</Badge>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatDate(classification.timestamp)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
