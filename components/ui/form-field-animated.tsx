'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, HTMLMotionProps } from 'framer-motion'
import { Check, AlertCircle, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AnimatedFormFieldProps {
  children: React.ReactNode
  error?: string
  success?: boolean
  loading?: boolean
  touched?: boolean
  label?: string
  required?: boolean
  helperText?: string
  className?: string
}

/**
 * Animated Form Field with validation feedback
 */
export function AnimatedFormField({
  children,
  error,
  success,
  loading,
  touched,
  label,
  required,
  helperText,
  className,
}: AnimatedFormFieldProps) {
  const [shake, setShake] = useState(false)

  useEffect(() => {
    if (error && touched) {
      setShake(true)
      const timeout = setTimeout(() => setShake(false), 500)
      return () => clearTimeout(timeout)
    }
    return undefined
  }, [error, touched])

  const hasError = !!error && touched
  const hasSuccess = success && touched && !error

  return (
    <motion.div
      className={cn('relative space-y-2', className)}
      animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
      transition={{ duration: 0.5 }}
    >
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
          {required && <span className="text-destructive ml-1" aria-label="required">*</span>}
        </label>
      )}

      <div className="relative">
        {children}

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
            </motion.div>
          )}
          {hasError && !loading && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <AlertCircle className="h-5 w-5 text-destructive" aria-hidden="true" />
            </motion.div>
          )}
          {hasSuccess && !loading && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <Check className="h-5 w-5 text-success" aria-hidden="true" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {hasError ? (
          <motion.p
            key="error-text"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-destructive flex items-center gap-1"
            role="alert"
            aria-live="polite"
          >
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            {error}
          </motion.p>
        ) : helperText ? (
          <motion.p
            key="helper-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-muted-foreground"
          >
            {helperText}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </motion.div>
  )
}

interface AnimatedSubmitButtonProps {
  children: React.ReactNode
  loading?: boolean
  success?: boolean
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export function AnimatedSubmitButton({
  children,
  loading,
  success,
  disabled,
  className,
  ...props
}: AnimatedSubmitButtonProps) {
  return (
    <motion.button
      className={cn(
        'relative inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-semibold transition-colors',
        'bg-primary text-primary-foreground hover:bg-primary/90',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
      disabled={disabled || loading}
      whileTap={!disabled && !loading ? { scale: 0.98 } : undefined}
      whileHover={!disabled && !loading ? { scale: 1.02 } : undefined}
      {...props}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Processing...</span>
          </motion.div>
        ) : success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2"
          >
            <Check className="h-5 w-5" />
            <span>Success!</span>
          </motion.div>
        ) : (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

export function FormSuccessMessage({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="rounded-lg bg-success/10 border border-success p-4 flex items-start gap-3"
      role="status"
      aria-live="polite"
    >
      <Check className="h-5 w-5 text-success flex-shrink-0 mt-0.5" aria-hidden="true" />
      <p className="text-sm text-success font-medium">{message}</p>
    </motion.div>
  )
}

export function FormErrorMessage({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="rounded-lg bg-destructive/10 border border-destructive p-4 flex items-start gap-3"
      role="alert"
      aria-live="assertive"
    >
      <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" aria-hidden="true" />
      <p className="text-sm text-destructive font-medium">{message}</p>
    </motion.div>
  )
}
