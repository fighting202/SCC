'use client'

import { useEffect, useRef, useCallback } from 'react'

interface FocusManagementOptions {
  trap?: boolean
  restoreFocus?: boolean
  initialFocus?: string
}

export function useFocusManagement(options: FocusManagementOptions = {}) {
  const { trap = false, restoreFocus = false, initialFocus } = options
  const containerRef = useRef<HTMLElement>(null)
  const previousActiveElement = useRef<Element | null>(null)

  // Focus trap for modals/dialogs
  const trapFocus = useCallback((e: KeyboardEvent) => {
    if (!containerRef.current || !trap) return

    const focusableElements = containerRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus()
          e.preventDefault()
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus()
          e.preventDefault()
        }
      }
    }

    if (e.key === 'Escape') {
      // Close modal or return focus
      const closeButton = containerRef.current.querySelector('[data-close]') as HTMLElement
      closeButton?.focus()
    }
  }, [trap])

  // Restore focus when component unmounts
  const restorePreviousFocus = useCallback(() => {
    if (restoreFocus && previousActiveElement.current) {
      (previousActiveElement.current as HTMLElement)?.focus()
    }
  }, [restoreFocus])

  useEffect(() => {
    if (trap) {
      document.addEventListener('keydown', trapFocus)
      return () => document.removeEventListener('keydown', trapFocus)
    }
    return undefined
  }, [trap, trapFocus])

  useEffect(() => {
    if (restoreFocus) {
      previousActiveElement.current = document.activeElement
      return restorePreviousFocus
    }
    return undefined
  }, [restoreFocus, restorePreviousFocus])

  // Set initial focus
  useEffect(() => {
    if (initialFocus && containerRef.current) {
      const element = containerRef.current.querySelector(initialFocus) as HTMLElement
      element?.focus()
    }
  }, [initialFocus])

  return { containerRef }
}

// Focus management for mobile menu
export function useMobileMenuFocus() {
  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const focusFirstMenuItem = useCallback(() => {
    const firstMenuItem = menuRef.current?.querySelector('a, button') as HTMLElement
    firstMenuItem?.focus()
  }, [])

  const focusTrigger = useCallback(() => {
    triggerRef.current?.focus()
  }, [])

  return {
    menuRef,
    triggerRef,
    focusFirstMenuItem,
    focusTrigger
  }
}
