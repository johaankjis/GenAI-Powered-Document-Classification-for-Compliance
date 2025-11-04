"use client"

import { useState, useEffect } from "react"
import { UploadZone } from "@/components/upload-zone"
import { StatsOverview } from "@/components/stats-overview"
import { ClassificationTable } from "@/components/classification-table"
import { CategoryChart } from "@/components/category-chart"
import { RiskDistribution } from "@/components/risk-distribution"
import { RealTimeFeed } from "@/components/real-time-feed"
import { ClassificationDetailModal } from "@/components/classification-detail-modal"
import type { Classification, ClassificationStats } from "@/lib/types"
import { Shield } from "lucide-react"

export default function Home() {
  const [stats, setStats] = useState<ClassificationStats | null>(null)
  const [classifications, setClassifications] = useState<Classification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedClassification, setSelectedClassification] = useState<Classification | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const fetchData = async () => {
    try {
      const [statsRes, classificationsRes] = await Promise.all([fetch("/api/stats"), fetch("/api/classifications")])

      const statsData = await statsRes.json()
      const classificationsData = await classificationsRes.json()

      if (statsData.success) {
        setStats(statsData.stats)
      }

      if (classificationsData.success) {
        setClassifications(classificationsData.classifications)
      }
    } catch (error) {
      console.error("[v0] Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleClassificationComplete = (classification: Classification) => {
    setClassifications((prev) => [classification, ...prev])
    fetchData() // Refresh stats
  }

  const handleSelectClassification = (classification: Classification) => {
    setSelectedClassification(classification)
    setIsModalOpen(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Compliance Document Classifier</h1>
              <p className="text-sm text-muted-foreground">AI-Powered Document Classification System</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Upload Section */}
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-4">Upload Document</h2>
          <UploadZone onClassificationComplete={handleClassificationComplete} />
        </section>

        {/* Stats Overview */}
        {stats && (
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-4">Overview</h2>
            <StatsOverview stats={stats} />
          </section>
        )}

        {/* Charts */}
        {stats && (
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <CategoryChart stats={stats} />
              <RiskDistribution stats={stats} />
            </div>
            <div>
              <RealTimeFeed classifications={classifications} />
            </div>
          </section>
        )}

        {/* Classifications Table */}
        <section>
          <ClassificationTable classifications={classifications} onSelectClassification={handleSelectClassification} />
        </section>
      </main>

      {/* Classification Detail Modal */}
      <ClassificationDetailModal
        classification={selectedClassification}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
