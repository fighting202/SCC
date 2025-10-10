'use client'

import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { AlertCircle, CheckCircle2 } from 'lucide-react'

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  success?: boolean
  helperText?: string
}

export function FormField({
  label,
  error,
  success,
  helperText,
  className,
  ...props
}: FormFieldProps) {
  const [showError, setShowError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    if (error) {
      setShowError(true)
      const timer = setTimeout(() => setShowError(false), 300)
      return () => clearTimeout(timer)
    }
  }, [error])

  useEffect(() => {
    if (success) {
      setShowSuccess(true)
    }
  }, [success])

  return (
    <div className="space-y-2">
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-foreground"
      >
        {label}
        {props.required && <span className="text-destructive ml-1">*</span>}
      </label>

      <div className="relative">
        <input
          {...props}
          className={cn(
            'w-full px-4 py-2 rounded-lg border transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary/50',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-destructive focus:ring-destructive/50 animate-shake',
            success && 'border-success focus:ring-success/50',
            !error && !success && 'border-border',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
        />

        {/* Success Icon */}
        {success && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 animate-scale-in">
            <CheckCircle2 className="h-5 w-5 text-success" />
          </div>
        )}

        {/* Error Icon */}
        {error && (
          <div className={cn(
            'absolute right-3 top-1/2 -translate-y-1/2',
            showError && 'animate-bounce'
          )}>
            <AlertCircle className="h-5 w-5 text-destructive" />
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p
          id={`${props.id}-error`}
          role="alert"
          className={cn(
            'text-sm text-destructive flex items-center gap-1',
            'animate-slide-down'
          )}
        >
          {error}
        </p>
      )}

      {/* Helper Text */}
      {!error && helperText && (
        <p
          id={`${props.id}-helper`}
          className="text-sm text-muted-foreground"
        >
          {helperText}
        </p>
      )}
    </div>
  )
}

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
  success?: boolean
  helperText?: string
}

export function TextareaField({
  label,
  error,
  success,
  helperText,
  className,
  ...props
}: TextareaFieldProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-foreground"
      >
        {label}
        {props.required && <span className="text-destructive ml-1">*</span>}
      </label>

      <div className="relative">
        <textarea
          {...props}
          className={cn(
            'w-full px-4 py-2 rounded-lg border transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary/50',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'resize-vertical min-h-[100px]',
            error && 'border-destructive focus:ring-destructive/50 animate-shake',
            success && 'border-success focus:ring-success/50',
            !error && !success && 'border-border',
            className
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
        />

        {/* Success Icon */}
        {success && (
          <div className="absolute right-3 top-3 animate-scale-in">
            <CheckCircle2 className="h-5 w-5 text-success" />
          </div>
        )}

        {/* Error Icon */}
        {error && (
          <div className="absolute right-3 top-3 animate-bounce">
            <AlertCircle className="h-5 w-5 text-destructive" />
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p
          id={`${props.id}-error`}
          role="alert"
          className="text-sm text-destructive flex items-center gap-1 animate-slide-down"
        >
          {error}
        </p>
      )}

      {/* Helper Text */}
      {!error && helperText && (
        <p
          id={`${props.id}-helper`}
          className="text-sm text-muted-foreground"
        >
          {helperText}
        </p>
      )}
    </div>
  )
}
