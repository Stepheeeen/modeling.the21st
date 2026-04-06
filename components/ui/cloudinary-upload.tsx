'use client'

import { CldUploadWidget } from 'next-cloudinary'
import { Button } from '@/components/ui/button'
import { ImagePlus, Trash2, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

interface CloudinaryUploadProps {
  value: string | string[]
  onChange: (value: string | string[]) => void
  onRemove: (value: string) => void
  multiple?: boolean
}

export function CloudinaryUpload({
  value,
  onChange,
  onRemove,
  multiple = false
}: CloudinaryUploadProps) {
  const [isUploaded, setIsUploaded] = useState(false)
  
  // Use a ref to keep track of values during multiple uploads to avoid race conditions
  // because props may not update fast enough between consecutive onUpload calls
  const valuesRef = useRef<string[]>(Array.isArray(value) ? value : value ? [value] : [])

  const onUpload = (result: any) => {
    const url = result.info.secure_url
    if (multiple) {
      const newValues = [...valuesRef.current, url]
      valuesRef.current = newValues
      onChange(newValues)
    } else {
      valuesRef.current = [url]
      onChange(url)
    }
    setIsUploaded(true)
    setTimeout(() => setIsUploaded(false), 2000)
  }

  const values = Array.isArray(value) ? value : value ? [value] : []
  
  // Keep ref in sync with prop updates (e.g. from deletion or initial load)
  useEffect(() => {
    if (JSON.stringify(values) !== JSON.stringify(valuesRef.current)) {
      valuesRef.current = values
    }
  }, [value, values])

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

  if (!cloudName) {
    return (
      <div className="p-4 border-2 border-dashed border-destructive/50 bg-destructive/5 rounded-md text-center">
        <p className="text-sm text-destructive font-medium font-sans">
          Cloudinary Configuration Missing
        </p>
        <p className="text-xs text-muted-foreground font-sans mt-1">
          Please set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in your environment.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-wrap gap-4">
        {values.map((url) => (
          <div key={url} className="relative w-32 h-40 border border-border group overflow-hidden bg-muted">
            <Image
              fill
              src={url}
              alt="Upload"
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => onRemove(url)}
                className="h-8 w-8"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <CldUploadWidget
        onSuccess={onUpload}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        options={{
          maxFiles: multiple ? 10 : 1,
          sources: ['local', 'url', 'camera'],
          cropping: true,
          showSkipCropButton: false,
          croppingAspectRatio: 3/4, // Portrait for models
          styles: {
            palette: {
              window: "#FFFFFF",
              windowBorder: "#90A0B3",
              tabIcon: "#000000",
              menuIcons: "#5A616A",
              textDark: "#000000",
              textLight: "#FFFFFF",
              link: "#000000",
              action: "#000000",
              inactiveTabIcon: "#000000",
              error: "#F44235",
              inProgress: "#0078FF",
              complete: "#20B832",
              sourceBg: "#E4EBF1"
            },
            fonts: {
              default: null,
              "'Inter', sans-serif": {
                url: "https://fonts.googleapis.com/css?family=Inter",
                active: true
              }
            }
          }
        }}
      >
        {({ open }) => {
          return (
            <Button
              type="button"
              variant="outline"
              disabled={!multiple && values.length > 0}
              onClick={() => open()}
              className="font-sans border-dashed border-2 h-24 w-full flex flex-col gap-2 hover:bg-muted/50"
            >
              {isUploaded ? (
                <>
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                  <span className="text-sm font-medium">Upload Successful</span>
                </>
              ) : (
                <>
                  <ImagePlus className="h-6 w-6 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {multiple ? 'Add Gallery Images' : 'Upload Profile Image'}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Click to upload and crop
                  </span>
                </>
              )}
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}
