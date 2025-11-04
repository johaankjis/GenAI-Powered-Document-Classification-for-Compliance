import { type NextRequest, NextResponse } from "next/server"
import { mockDB } from "@/lib/mock-db"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const classification = mockDB.getClassification(id)

    if (!classification) {
      return NextResponse.json({ error: "Classification not found" }, { status: 404 })
    }

    const auditLogs = mockDB.getAuditLogsForClassification(id)

    return NextResponse.json({
      success: true,
      classification,
      auditLogs,
    })
  } catch (error) {
    console.error("[v0] Error fetching classification:", error)
    return NextResponse.json({ error: "Failed to fetch classification" }, { status: 500 })
  }
}
