import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva(
  "rounded-xl border bg-white dark:bg-scc-dark-card shadow-sm transition-all duration-300",
  {
    variants: {
      variant: {
        default: "border-gray-200 dark:border-scc-dark-border hover:shadow-md",
        elevated: "border-gray-200 shadow-lg hover:shadow-xl",
        outlined: "border-2 border-[#2C5F7C] hover:border-[#1F4A5F] hover:shadow-lg",
        featured: "border-2 border-[#D4AF37] bg-gradient-to-br from-[#D4AF37]/5 to-[#2C5F7C]/5 hover:shadow-xl",
        success: "border-green-200 bg-green-50/50 hover:shadow-md",
        warning: "border-orange-200 bg-orange-50/50 hover:shadow-md",
        error: "border-red-200 bg-red-50/50 hover:shadow-md",
      },
      size: {
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
      hover: {
        none: "",
        lift: "hover:-translate-y-1",
        scale: "hover:scale-105",
        glow: "hover:shadow-[0_0_20px_rgba(44,95,124,0.15)]",
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      hover: 'lift',
    },
  },
)

const cardHeaderVariants = cva(
  "flex flex-col space-y-1.5",
  {
    variants: {
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      spacing: {
        sm: "pb-2",
        default: "pb-4",
        lg: "pb-6",
      },
    },
    defaultVariants: {
      align: 'left',
      spacing: 'default',
    },
  },
)

const cardContentVariants = cva(
  "pt-0",
  {
    variants: {
      spacing: {
        sm: "space-y-2",
        default: "space-y-4",
        lg: "space-y-6",
      },
    },
    defaultVariants: {
      spacing: 'default',
    },
  },
)

const cardFooterVariants = cva(
  "flex items-center pt-4",
  {
    variants: {
      align: {
        left: "justify-start",
        center: "justify-center",
        right: "justify-end",
        between: "justify-between",
      },
      spacing: {
        sm: "gap-2",
        default: "gap-4",
        lg: "gap-6",
      },
    },
    defaultVariants: {
      align: 'left',
      spacing: 'default',
    },
  },
)

// Card Root Component
interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, hover, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'div'
    
    return (
      <Comp
        ref={ref}
        className={cn(cardVariants({ variant, size, hover }), className)}
        {...props}
      />
    )
  }
)
Card.displayName = 'Card'

// Card Header Component
interface CardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardHeaderVariants> {}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, align, spacing, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardHeaderVariants({ align, spacing }), className)}
      {...props}
    />
  )
)
CardHeader.displayName = 'CardHeader'

// Card Title Component
interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, as: Component = 'h3', ...props }, ref) => (
    <Component
      ref={ref}
      className={cn(
        "text-xl font-semibold leading-none tracking-tight text-gray-900 dark:text-scc-dark-text",
        className
      )}
      {...props}
    />
  )
)
CardTitle.displayName = 'CardTitle'

// Card Description Component
interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-gray-600 dark:text-scc-dark-text-secondary", className)}
      {...props}
    />
  )
)
CardDescription.displayName = 'CardDescription'

// Card Content Component
interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardContentVariants> {}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, spacing, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardContentVariants({ spacing }), className)}
      {...props}
    />
  )
)
CardContent.displayName = 'CardContent'

// Card Footer Component
interface CardFooterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardFooterVariants> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, align, spacing, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardFooterVariants({ align, spacing }), className)}
      {...props}
    />
  )
)
CardFooter.displayName = 'CardFooter'

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  cardVariants,
  cardHeaderVariants,
  cardContentVariants,
  cardFooterVariants,
}