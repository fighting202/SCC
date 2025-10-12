'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'card' | 'text' | 'avatar' | 'button';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({
  className,
  variant = 'default',
  width,
  height,
}: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-gray-200 dark:bg-gray-700 rounded';

  const variantClasses = {
    default: 'h-4 w-full',
    card: 'h-48 w-full rounded-lg',
    text: 'h-4 w-3/4',
    avatar: 'h-10 w-10 rounded-full',
    button: 'h-10 w-24 rounded-md',
  };

  const style = {
    ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height && {
      height: typeof height === 'number' ? `${height}px` : height,
    }),
  };

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className)}
      style={style}
    />
  );
}

// 특화된 스켈레톤 컴포넌트들
export function CardSkeleton() {
  return (
    <div className="space-y-3 p-4 border rounded-lg">
      <Skeleton variant="avatar" />
      <div className="space-y-2">
        <Skeleton variant="text" />
        <Skeleton variant="text" className="w-1/2" />
      </div>
    </div>
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="bg-white dark:bg-scc-dark-bg rounded-lg shadow-lg p-6 space-y-4">
      <Skeleton variant="avatar" className="h-12 w-12" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <Skeleton variant="button" className="w-full" />
    </div>
  );
}

export function PackageCardSkeleton() {
  return (
    <div className="bg-white dark:bg-scc-dark-bg rounded-lg shadow-lg p-6 space-y-4">
      <div className="text-center space-y-2">
        <Skeleton className="h-4 w-20 mx-auto" />
        <Skeleton className="h-8 w-32 mx-auto" />
        <Skeleton className="h-6 w-24 mx-auto" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <Skeleton variant="button" className="w-full" />
    </div>
  );
}

export function HeaderSkeleton() {
  return (
    <header className="bg-white dark:bg-scc-dark-bg shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Skeleton className="h-8 w-32" />
          <div className="hidden md:flex items-center space-x-8">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="flex items-center space-x-4">
            <Skeleton variant="button" className="w-16" />
            <Skeleton variant="button" className="w-20" />
          </div>
        </div>
      </div>
    </header>
  );
}
