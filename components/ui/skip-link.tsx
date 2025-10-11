'use client'

import { cn } from '@/lib/utils'

interface SkipLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export function SkipLink({ href, children, className }: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4',
        'bg-scc-primary text-white px-4 py-2 rounded-md',
        'z-50 transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-scc-accent focus:ring-offset-2',
        className
      )}
    >
      {children}
    </a>
  )
}

export function SkipToMain() {
  return (
    <SkipLink href="#main">
      Skip to main content
    </SkipLink>
  )
}

export function SkipToNavigation() {
  return (
    <SkipLink href="#navigation">
      Skip to navigation
    </SkipLink>
  )
}
