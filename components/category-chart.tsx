"use client"

import { Card } from "@/components/ui/card"
import type { ClassificationStats } from "@/lib/types"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

interface CategoryChartProps {
  stats: ClassificationStats
}

const COLORS = ["#1e40af", "#0ea5e9", "#06b6d4", "#8b5cf6", "#ec4899", "#f59e0b"]

export function CategoryChart({ stats }: CategoryChartProps) {
  const data = Object.entries(stats.byCategory)
    .map(([category, count]) => ({
      category: category.replace(" ", "\n"),
      count,
    }))
    .filter((item) => item.count > 0)

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">Documents by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="category" tick={{ fill: "#64748b", fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
          <YAxis tick={{ fill: "#64748b" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
            }}
          />
          <Bar dataKey="count" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
