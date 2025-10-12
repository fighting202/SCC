'use client';

import { cn } from '@/lib/utils';

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function SkipLink({ href, children, className }: SkipLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        'absolute -top-96 left-4 focus:top-4',
        'bg-[#2C5F7C] text-white px-4 py-2 rounded-md',
        'z-50 transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2',
        'opacity-0 focus:opacity-100',
        className
      )}
    >
      {children}
    </a>
  );
}

export function SkipToMain() {
  return <SkipLink href="#main">Skip to main content</SkipLink>;
}

export function SkipToNavigation() {
  return <SkipLink href="#navigation">Skip to navigation</SkipLink>;
}
