'use client'

import { useSkipToContent } from '@/hooks/useA11y'
import { cn } from '@/lib/utils'

export function SkipToContent() {
  const { skipToMain } = useSkipToContent()

  return (
    <button
      onClick={skipToMain}
      className={cn(
        'fixed top-0 left-0 z-[9999] px-4 py-2',
        'bg-primary text-primary-foreground font-medium',
        'transform -translate-y-full',
        'focus:translate-y-0',
        'transition-transform duration-200',
        'sr-only focus:not-sr-only'
      )}
    >
      Skip to main content
    </button>
  )
}
