import { useState, useEffect, useCallback } from 'react'
import { toast } from 'sonner'

interface TallyOptions {
  layout?: 'modal' | 'default'
  width?: number
  autoClose?: number
  hideTitle?: boolean
  overlay?: boolean
}

interface UseTallyReturn {
  openTally: (formId: string, options?: TallyOptions) => void
  isTallyLoaded: boolean
  tallyError: boolean
}

/**
 * Custom hook for managing Tally form integration
 * Eliminates code duplication across hero-section, contact-section, and footer
 *
 * @returns {UseTallyReturn} Object containing openTally function and loading states
 *
 * @example
 * ```tsx
 * const { openTally, isTallyLoaded } = useTally()
 *
 * <button
 *   onClick={() => openTally('your-form-id')}
 *   disabled={!isTallyLoaded}
 * >
 *   Open Form
 * </button>
 * ```
 */
export function useTally(): UseTallyReturn {
  const [isTallyLoaded, setIsTallyLoaded] = useState(false)
  const [tallyError, setTallyError] = useState(false)

  useEffect(() => {
    // Check if Tally is available in the window object
    const checkTally = setInterval(() => {
      if (window?.Tally) {
        setIsTallyLoaded(true)
        clearInterval(checkTally)
      }
    }, 100)

    // Set timeout for error handling (10 seconds)
    const timeout = setTimeout(() => {
      if (!isTallyLoaded) {
        setTallyError(true)
        clearInterval(checkTally)
        console.error('Tally failed to load within 10 seconds')
      }
    }, 10000)

    // Cleanup
    return () => {
      clearInterval(checkTally)
      clearTimeout(timeout)
    }
  }, [isTallyLoaded])

  const openTally = useCallback((formId: string, options?: TallyOptions) => {
    if (!isTallyLoaded) {
      console.warn('Tally not loaded yet')
      toast.error('Form is still loading. Please wait a moment.')
      return
    }

    if (tallyError) {
      toast.error('Form failed to load. Please refresh the page.')
      return
    }

    try {
      const defaultOptions: TallyOptions = {
        layout: 'modal',
        width: 700,
        autoClose: 3000,
        hideTitle: false,
        overlay: true,
      }

      window.Tally?.openPopup(formId, {
        ...defaultOptions,
        ...options,
      })
    } catch (error) {
      console.error('Tally open error:', error)
      toast.error('Failed to open form. Please try again.')
    }
  }, [isTallyLoaded, tallyError])

  return { openTally, isTallyLoaded, tallyError }
}

// Type declaration for window.Tally
declare global {
  interface Window {
    Tally?: {
      openPopup: (formId: string, options: TallyOptions) => void
    }
  }
}
