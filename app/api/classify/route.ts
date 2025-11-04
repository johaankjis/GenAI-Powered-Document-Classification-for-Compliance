import { type NextRequest, NextResponse } from "next/server"
import { mockDB } from "@/lib/mock-db"
import { classifier } from "@/lib/classifier"
import type { Classification } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Read file content
    const content = await file.text()
    const startTime = Date.now()

    // Simulate processing delay (realistic ML inference time)
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 400))

    // Classify document
    const result = classifier.classify(content)
    const processingTime = Date.now() - startTime

    // Create classification record
    const classification: Classification = {
      id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      documentName: file.name,
      documentContent: content.substring(0, 500), // Store first 500 chars
      category: result.category,
      confidence: result.confidence,
      riskLevel: result.riskLevel,
      timestamp: new Date(),
      processingTime,
      metadata: {
        fileSize: file.size,
        fileType: file.type,
        wordCount: content.split(/\s+/).length,
      },
    }

    // Save to database
    const saved = mockDB.addClassification(classification)

    return NextResponse.json({
      success: true,
      classification: saved,
    })
  } catch (error) {
    console.error("[v0] Classification error:", error)
    return NextResponse.json({ error: "Failed to classify document" }, { status: 500 })
  }
}
