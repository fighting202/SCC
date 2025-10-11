'use client'

import { cn } from '@/lib/utils'

interface ScreenReaderOnlyProps {
  children: React.ReactNode
  className?: string
}

export function ScreenReaderOnly({ children, className }: ScreenReaderOnlyProps) {
  return (
    <span className={cn('sr-only', className)}>
      {children}
    </span>
  )
}

// Live region for announcements
export function LiveRegion({ children, className }: ScreenReaderOnlyProps) {
  return (
    <div
      className={cn('sr-only', className)}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {children}
    </div>
  )
}

// Alert region for important announcements
export function AlertRegion({ children, className }: ScreenReaderOnlyProps) {
  return (
    <div
      className={cn('sr-only', className)}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      {children}
    </div>
  )
}
