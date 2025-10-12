'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Skeleton } from './skeleton'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  priority?: boolean
  className?: string
  containerClassName?: string
  sizes?: string
  quality?: number
  loading?: 'lazy' | 'eager'
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill,
  priority = false,
  className,
  containerClassName,
  sizes,
  quality = 85,
  loading = 'lazy',
  placeholder = 'empty',
  blurDataURL,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  if (hasError) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-muted text-muted-foreground',
          fill ? 'absolute inset-0' : '',
          containerClassName
        )}
        style={{ width, height }}
      >
        <span className="text-sm">Failed to load image</span>
      </div>
    )
  }

  return (
    <div className={cn('relative overflow-hidden', containerClassName)}>
      {isLoading && (
        <Skeleton
          className={cn(
            'absolute inset-0',
            fill ? 'w-full h-full' : ''
          )}
        />
      )}

      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
        loading={loading}
        quality={quality}
        sizes={sizes}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  )
}

/**
 * Responsive Image Component
 * 반응형 이미지 with automatic sizing
 */
interface ResponsiveImageProps extends Omit<OptimizedImageProps, 'sizes'> {
  aspectRatio?: '1/1' | '16/9' | '4/3' | '3/2' | '21/9'
}

export function ResponsiveImage({
  aspectRatio = '16/9',
  containerClassName,
  ...props
}: ResponsiveImageProps) {
  const aspectRatios = {
    '1/1': 'aspect-square',
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]',
    '21/9': 'aspect-[21/9]'
  }

  return (
    <div className={cn('relative w-full', aspectRatios[aspectRatio], containerClassName)}>
      <OptimizedImage
        {...props}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </div>
  )
}

/**
 * Avatar Image Component
 * 프로필 이미지 with fallback
 */
interface AvatarImageProps {
  src?: string
  alt: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fallback?: string
  className?: string
}

export function AvatarImage({
  src,
  alt,
  size = 'md',
  fallback,
  className
}: AvatarImageProps) {
  const sizes = {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96
  }

  const dimension = sizes[size]

  if (!src && fallback) {
    return (
      <div
        className={cn(
          'flex items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold',
          className
        )}
        style={{ width: dimension, height: dimension }}
      >
        {fallback}
      </div>
    )
  }

  return (
    <OptimizedImage
      src={src || '/placeholder-avatar.svg'}
      alt={alt}
      width={dimension}
      height={dimension}
      className={cn('rounded-full object-cover', className)}
      quality={90}
      priority
    />
  )
}
