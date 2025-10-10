'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Skeleton } from './skeleton'

interface LazySectionProps {
  children: ReactNode
  fallback?: ReactNode
  rootMargin?: string
  threshold?: number
  className?: string
}

export function LazySection({
  children,
  fallback,
  rootMargin = '100px',
  threshold = 0.01,
  className
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      {
        rootMargin,
        threshold
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [rootMargin, threshold])

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : (fallback || <SectionSkeleton />)}
    </div>
  )
}

function SectionSkeleton() {
  return (
    <div className="space-y-4 p-8">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/6" />
    </div>
  )
}

/**
 * Lazy Component Wrapper
 * 컴포넌트 레벨 lazy loading
 */
interface LazyComponentProps {
  loader: () => Promise<{ default: React.ComponentType<any> }>
  fallback?: ReactNode
  [key: string]: any
}

export function LazyComponent({ loader, fallback, ...props }: LazyComponentProps) {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loader()
      .then((module) => {
        setComponent(() => module.default)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Failed to load component:', error)
        setIsLoading(false)
      })
  }, [loader])

  if (isLoading) {
    return <>{fallback || <SectionSkeleton />}</>
  }

  if (!Component) {
    return <div>Failed to load component</div>
  }

  return <Component {...props} />
}
