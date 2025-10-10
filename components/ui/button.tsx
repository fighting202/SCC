'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold font-sans transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:scale-105 active:scale-95 hover:text-scc-gold",
  {
    variants: {
      variant: {
        // SCC Primary - 메인 CTA 버튼
        primary:
          'bg-[#2C5F7C] text-white shadow-lg hover:bg-[#1F4A5F] hover:shadow-xl focus-visible:ring-[#2C5F7C]/50',
        // SCC Secondary - 보조 버튼
        secondary:
          'bg-gray-200 text-gray-800 shadow-md hover:bg-gray-300 hover:shadow-lg focus-visible:ring-gray-400/50',
        // SCC Outline - 테두리 버튼
        outline:
          'border-2 border-[#2C5F7C] text-[#2C5F7C] bg-transparent hover:bg-[#2C5F7C] hover:text-white shadow-md hover:shadow-lg focus-visible:ring-[#2C5F7C]/50',
        // SCC Ghost - 투명 버튼
        ghost:
          'text-[#2C5F7C] hover:bg-[#2C5F7C]/10 hover:text-[#1F4A5F] focus-visible:ring-[#2C5F7C]/50',
        // SCC Gold - 특별한 액션
        gold:
          'bg-[#D4AF37] text-white shadow-lg hover:bg-[#E5C158] hover:shadow-xl focus-visible:ring-[#D4AF37]/50',
        // SCC Success - 성공/완료 버튼
        success:
          'bg-green-600 text-white shadow-lg hover:bg-green-700 hover:shadow-xl focus-visible:ring-green-600/50',
        // SCC Warning - 경고 버튼
        warning:
          'bg-orange-500 text-white shadow-lg hover:bg-orange-600 hover:shadow-xl focus-visible:ring-orange-500/50',
        // SCC Destructive - 삭제/취소 버튼
        destructive:
          'bg-red-600 text-white shadow-lg hover:bg-red-700 hover:shadow-xl focus-visible:ring-red-600/50',
        // Link 스타일
        link: 'text-[#2C5F7C] underline-offset-4 hover:underline hover:text-[#1F4A5F]',
      },
      size: {
        sm: 'h-8 px-3 text-sm rounded-lg',
        default: 'h-10 px-4 py-2 text-base rounded-lg',
        lg: 'h-12 px-6 py-3 text-lg rounded-xl',
        xl: 'h-14 px-8 py-4 text-xl rounded-xl',
        icon: 'size-10 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

interface ButtonProps
  extends React.ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  fullWidth?: boolean
  language?: 'en' | 'zh'
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  fullWidth = false,
  language = 'en',
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  // asChild일 때는 loading을 무시 (React.Children.only 오류 방지)
  if (asChild) {
    return (
      <Comp
        data-slot="button"
        className={cn(
          buttonVariants({ variant, size }),
          fullWidth && 'w-full',
          language === 'zh' ? 'font-chinese' : 'font-sans',
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    )
  }

  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size }),
        fullWidth && 'w-full',
        loading && 'pointer-events-none opacity-70',
        language === 'zh' ? 'font-chinese' : 'font-sans',
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </Comp>
  )
}

export { Button, buttonVariants }
