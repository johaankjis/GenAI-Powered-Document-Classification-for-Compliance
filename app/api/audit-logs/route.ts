import { type NextRequest, NextResponse } from "next/server"
import { mockDB } from "@/lib/mock-db"
import type { AuditLog } from "@/lib/types"

export async function GET() {
  try {
    const logs = mockDB.getAllAuditLogs()

    return NextResponse.json({
      success: true,
      logs,
    })
  } catch (error) {
    console.error("[v0] Error fetching audit logs:", error)
    return NextResponse.json({ error: "Failed to fetch audit logs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { classificationId, action, user, details } = body

    if (!classificationId || !action || !user) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const auditLog: AuditLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      classificationId,
      action,
      user,
      timestamp: new Date(),
      details: details || `${action} by ${user}`,
    }

    const saved = mockDB.addAuditLog(auditLog)

    return NextResponse.json({
      success: true,
      log: saved,
    })
  } catch (error) {
    console.error("[v0] Error creating audit log:", error)
    return NextResponse.json({ error: "Failed to create audit log" }, { status: 500 })
  }
}
