"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, ImageIcon } from "lucide-react"

interface CloudinaryUploadProps {
  value?: string
  onChange: (url: string) => void
  onRemove?: () => void
}

export default function CloudinaryUpload({ value, onChange, onRemove }: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)

  const handleUpload = async (file: File) => {
    if (!file) return

    setUploading(true)
    try {
      // Create FormData for Cloudinary upload
      const formData = new FormData()
      formData.append("file", file)
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || process.env.CLOUDINARY_UPLOAD_PRESET || "products"
  formData.append("upload_preset", uploadPreset)

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME || ""
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      )

      const data = await response.json()

      if (data.secure_url) {
        onChange(data.secure_url)
      } else {
        throw new Error("Upload failed")
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Failed to upload image. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleUpload(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)

    const file = e.dataTransfer.files?.[0]
    if (file && file.type.startsWith("image/")) {
      handleUpload(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }

  return (
    <div className="space-y-4">
      <Label>Product Image</Label>

      {value ? (
        <div className="relative">
          <div className="aspect-square w-full max-w-xs bg-muted rounded-lg overflow-hidden">
            <img src={value || "/placeholder.svg"} alt="Product preview" className="w-full h-full object-cover" />
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={() => {
              onChange("")
              onRemove?.()
            }}
          >
            <X size={16} />
          </Button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="space-y-4">
            <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-muted-foreground" />
            </div>

            <div>
              <p className="text-sm font-medium">Drop your image here, or click to browse</p>
              <p className="text-xs text-muted-foreground mt-1">Supports: JPG, PNG, GIF up to 10MB</p>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="outline"
                disabled={uploading}
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <Upload size={16} className="mr-2" />
                {uploading ? "Uploading..." : "Choose File"}
              </Button>

              <Input id="file-upload" type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
            </div>
          </div>
        </div>
      )}

      {/* Fallback URL input */}
      <div>
        <Label htmlFor="image-url" className="text-sm text-muted-foreground">
          Or enter image URL directly:
        </Label>
        <Input
          id="image-url"
          type="url"
          placeholder="https://example.com/image.jpg"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1"
        />
      </div>
    </div>
  )
}
