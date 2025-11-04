"use client"

import { Card } from "@/components/ui/card"
import { FileText, TrendingUp, Shield, Clock } from "lucide-react"
import type { ClassificationStats } from "@/lib/types"

interface StatsOverviewProps {
  stats: ClassificationStats
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const statCards = [
    {
      title: "Total Documents",
      value: stats.totalDocuments,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Average Confidence",
      value: `${(stats.averageConfidence * 100).toFixed(1)}%`,
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "High Risk Items",
      value: stats.byRiskLevel.High + stats.byRiskLevel.Critical,
      icon: Shield,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Recent Activity",
      value: stats.recentClassifications.length,
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat) => (
        <Card key={stat.title} className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
              <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
