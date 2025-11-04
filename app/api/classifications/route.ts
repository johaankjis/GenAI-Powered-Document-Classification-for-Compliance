import { NextResponse } from "next/server"
import { mockDB } from "@/lib/mock-db"

export async function GET() {
  try {
    const classifications = mockDB.getAllClassifications()

    return NextResponse.json({
      success: true,
      classifications,
    })
  } catch (error) {
    console.error("[v0] Error fetching classifications:", error)
    return NextResponse.json({ error: "Failed to fetch classifications" }, { status: 500 })
  }
}
