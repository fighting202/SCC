"use client"

import React from 'react'
import { cn } from '@/lib/scc-utils'
import { BilingualText } from './bilingualtext'

// SCC 타이포그래피 타입 정의
export type SCCHeadingLevel = 'xl' | 'lg' | 'md' | 'sm'
export type SCCBodySize = 'lg' | 'base' | 'sm'
export type SCCTextAlign = 'left' | 'center' | 'right' | 'justify'
export type SCCTextWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold'

interface SCCHeadingProps {
  level: SCCHeadingLevel
  children: React.ReactNode
  className?: string
  align?: SCCTextAlign
  weight?: SCCTextWeight
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

interface SCCBodyProps {
  size: SCCBodySize
  children: React.ReactNode
  className?: string
  align?: SCCTextAlign
  weight?: SCCTextWeight
  as?: 'p' | 'span' | 'div'
}

interface SCCBilingualHeadingProps {
  level: SCCHeadingLevel
  en: string
  zh: string
  className?: string
  align?: SCCTextAlign
  weight?: SCCTextWeight
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

interface SCCBilingualBodyProps {
  size: SCCBodySize
  en: string
  zh: string
  className?: string
  align?: SCCTextAlign
  weight?: SCCTextWeight
  as?: 'p' | 'span' | 'div'
}

// 헤딩 컴포넌트
export function SCCHeading({ 
  level, 
  children, 
  className, 
  align = 'left',
  weight = 'bold',
  as 
}: SCCHeadingProps) {
  const sizeClasses = {
    xl: 'text-heading-xl',     // 32px - Hero 헤드라인
    lg: 'text-heading-lg',     // 28px - 섹션 제목
    md: 'text-heading-md',     // 22px - 카드 제목
    sm: 'text-lg'              // 18px - 작은 제목
  }

  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  }

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  }

  const Component = as || (level === 'xl' ? 'h1' : level === 'lg' ? 'h2' : level === 'md' ? 'h3' : 'h4')

  return (
    <Component
      className={cn(
        'leading-tight',
        sizeClasses[level],
        weightClasses[weight],
        alignClasses[align],
        className
      )}
    >
      {children}
    </Component>
  )
}

// 본문 컴포넌트
export function SCCBody({ 
  size, 
  children, 
  className, 
  align = 'left',
  weight = 'normal',
  as = 'p'
}: SCCBodyProps) {
  const sizeClasses = {
    lg: 'text-body-lg',        // 18px - 강조 본문
    base: 'text-body-base',    // 16px - 기본 본문 (절대 16px 미만 금지)
    sm: 'text-body-sm'         // 14px - 부가 정보
  }

  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  }

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  }

  const Component = as as keyof JSX.IntrinsicElements
  
  return (
    <Component
      className={cn(
        'font-sans leading-chinese', // 중국어 가독성 확보
        sizeClasses[size],
        weightClasses[weight],
        alignClasses[align],
        className
      )}
    >
      {children}
    </Component>
  )
}

// 이중 언어 헤딩 컴포넌트
export function SCCBilingualHeading({ 
  level, 
  en, 
  zh, 
  className, 
  align = 'left',
  weight = 'bold',
  as 
}: SCCBilingualHeadingProps) {
  const sizeClasses = {
    xl: 'text-heading-xl',     // 32px - Hero 헤드라인
    lg: 'text-heading-lg',     // 28px - 섹션 제목
    md: 'text-heading-md',     // 22px - 카드 제목
    sm: 'text-lg'              // 18px - 작은 제목
  }

  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  }

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  }

  const Component = as || (level === 'xl' ? 'h1' : level === 'lg' ? 'h2' : level === 'md' ? 'h3' : 'h4')

  return (
    <Component
      className={cn(
        'leading-tight',
        sizeClasses[level],
        weightClasses[weight],
        alignClasses[align],
        className
      )}
    >
      <BilingualText en={en} zh={zh} />
    </Component>
  )
}

// 이중 언어 본문 컴포넌트
export function SCCBilingualBody({ 
  size, 
  en, 
  zh, 
  className, 
  align = 'left',
  weight = 'normal',
  as = 'p'
}: SCCBilingualBodyProps) {
  const sizeClasses = {
    lg: 'text-body-lg',        // 18px - 강조 본문
    base: 'text-body-base',    // 16px - 기본 본문 (절대 16px 미만 금지)
    sm: 'text-body-sm'         // 14px - 부가 정보
  }

  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  }

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  }

  const Component = as as keyof JSX.IntrinsicElements
  
  return (
    <Component
      className={cn(
        'font-sans leading-chinese', // 중국어 가독성 확보
        sizeClasses[size],
        weightClasses[weight],
        alignClasses[align],
        className
      )}
    >
      <BilingualText en={en} zh={zh} />
    </Component>
  )
}

// 특수 텍스트 컴포넌트들
export function SCCPrice({ 
  amount, 
  currency = 'USD', 
  className 
}: { 
  amount: number
  currency?: string
  className?: string 
}) {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)

  return (
    <span className={cn('font-bold text-accent', className)}>
      {formattedAmount}
    </span>
  )
}

export function SCCBadge({ 
  children, 
  variant = 'default',
  className 
}: { 
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'accent'
  className?: string 
}) {
  const variantClasses = {
    default: 'bg-primary text-white',
    success: 'bg-success text-white',
    warning: 'bg-accent text-white',
    error: 'bg-red-500 text-white',
    accent: 'bg-accent text-white'
  }

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

export function SCCHighlight({ 
  children, 
  className 
}: { 
  children: React.ReactNode
  className?: string 
}) {
  return (
    <span className={cn('bg-accent/20 text-accent font-semibold px-1 rounded', className)}>
      {children}
    </span>
  )
}

// 텍스트 그룹 컴포넌트
export function SCCTextGroup({ 
  children, 
  spacing = 'md',
  className 
}: { 
  children: React.ReactNode
  spacing?: 'sm' | 'md' | 'lg'
  className?: string 
}) {
  const spacingClasses = {
    sm: 'space-y-2',
    md: 'space-y-4',
    lg: 'space-y-6'
  }

  return (
    <div className={cn(spacingClasses[spacing], className)}>
      {children}
    </div>
  )
}
