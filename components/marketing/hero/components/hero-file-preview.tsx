

'use client'

import { cn } from '@/lib/utils'
import { Loader2, X } from 'lucide-react'
import Image from 'next/image'

interface HeroFilePreviewProps {
  previewImageUrl?: string | null
  uploadedFileName?: string | null
  isUploadingFile?: boolean
  isDeletingFile?: boolean
  uploadError?: string | null
  isSubmitting?: boolean
  onRemoveFile?: () => void
}

export const HeroFilePreview = ({
  previewImageUrl,
  uploadedFileName,
  isUploadingFile,
  isDeletingFile = false,
  uploadError,
  isSubmitting,
  onRemoveFile,
}: HeroFilePreviewProps) => {
  if ((!previewImageUrl && !uploadError) || (isSubmitting && previewImageUrl)) {
    return null
  }

  return (
    <div className="mb-3 animate-in fade-in-50 slide-in-from-top-2 duration-300">
      {previewImageUrl && uploadedFileName && !isSubmitting && (
        <div className="p-3 border rounded-lg bg-background/50 backdrop-blur-sm border-input/50 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <Image
              src={previewImageUrl}
              alt={uploadedFileName}
              width={48}
              height={48}
              className="rounded-md object-cover flex-shrink-0 border border-border/50"
              onError={() => {
                console.error('[HeroFilePreview] Failed to load image preview')
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {uploadedFileName}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Image uploaded
              </p>
            </div>
          </div>

          {!isUploadingFile && !isDeletingFile && (
            <button
              type="button"
              onClick={onRemoveFile}
              className={cn(
                'flex-shrink-0 p-1.5 rounded-md transition-colors',
                'text-muted-foreground hover:text-foreground hover:bg-muted/80',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
              )}
              aria-label="Remove file"
              disabled={isDeletingFile}
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {(isUploadingFile || isDeletingFile) && (
            <div className="flex-shrink-0 p-1.5">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            </div>
          )}
        </div>
      )}

      {uploadError && !isUploadingFile && (
        <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
          {uploadError}
        </div>
      )}
    </div>
  )
}
