"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, FileText, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Classification } from "@/lib/types"

interface UploadZoneProps {
  onClassificationComplete: (classification: Classification) => void
}

export function UploadZone({ onClassificationComplete }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      setSelectedFile(files[0])
    }
  }, [])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setSelectedFile(files[0])
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setIsProcessing(true)
    try {
      const formData = new FormData()
      formData.append("file", selectedFile)

      const response = await fetch("/api/classify", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        onClassificationComplete(data.classification)
        setSelectedFile(null)
      }
    } catch (error) {
      console.error("[v0] Upload error:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card className="p-8">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
          isDragging ? "border-primary bg-primary/5" : "border-border bg-muted/30"
        }`}
      >
        {selectedFile ? (
          <div className="space-y-4">
            <FileText className="w-12 h-12 mx-auto text-primary" />
            <div>
              <p className="font-medium text-foreground">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">{(selectedFile.size / 1024).toFixed(2)} KB</p>
            </div>
            <div className="flex gap-3 justify-center">
              <Button
                onClick={handleUpload}
                disabled={isProcessing}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Classify Document"
                )}
              </Button>
              <Button variant="outline" onClick={() => setSelectedFile(null)} disabled={isProcessing}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className="w-12 h-12 mx-auto text-muted-foreground" />
            <div>
              <p className="text-lg font-medium text-foreground">Drop your document here</p>
              <p className="text-sm text-muted-foreground mt-1">or click to browse files</p>
            </div>
            <input
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
              accept=".txt,.pdf,.doc,.docx"
            />
            <label htmlFor="file-upload">
              <Button asChild variant="outline">
                <span>Select File</span>
              </Button>
            </label>
          </div>
        )}
      </div>
    </Card>
  )
}
