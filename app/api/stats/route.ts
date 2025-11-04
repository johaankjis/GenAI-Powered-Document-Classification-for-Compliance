import { NextResponse } from "next/server"
import { mockDB } from "@/lib/mock-db"

export async function GET() {
  try {
    const stats = mockDB.getStats()

    return NextResponse.json({
      success: true,
      stats,
    })
  } catch (error) {
    console.error("[v0] Error fetching stats:", error)
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 })
  }
}
