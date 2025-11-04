"use client"

import { Card } from "@/components/ui/card"
import type { ClassificationStats } from "@/lib/types"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface RiskDistributionProps {
  stats: ClassificationStats
}

const RISK_COLORS = {
  Low: "#10b981",
  Medium: "#f59e0b",
  High: "#f97316",
  Critical: "#dc2626",
}

export function RiskDistribution({ stats }: RiskDistributionProps) {
  const data = Object.entries(stats.byRiskLevel)
    .map(([level, count]) => ({
      name: level,
      value: count,
      color: RISK_COLORS[level as keyof typeof RISK_COLORS],
    }))
    .filter((item) => item.value > 0)

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">Risk Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  )
}
