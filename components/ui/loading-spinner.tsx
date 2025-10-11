'use client'

import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  text?: string
}

export function LoadingSpinner({ 
  size = 'md', 
  className,
  text = 'Loading...'
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  return (
    <div className={cn('flex items-center justify-center space-x-2', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-gray-300 border-t-scc-primary',
          sizeClasses[size]
        )}
      />
      {text && (
        <span className="text-sm text-gray-600 dark:text-scc-dark-text-secondary">
          {text}
        </span>
      )}
    </div>
  )
}

export function PageLoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-scc-dark-bg">
      <div className="text-center">
        <LoadingSpinner size="lg" text="Loading Seoul Care Concierge..." />
      </div>
    </div>
  )
}