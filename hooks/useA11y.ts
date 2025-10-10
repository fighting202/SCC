import { useEffect, useRef, useCallback } from 'react'

/**
 * Focus Management Hook
 * 포커스 트랩, 자동 포커스 등 접근성 관련 포커스 관리
 */
export function useFocusTrap(isActive: boolean = true) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const container = containerRef.current
    const focusableElements = container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

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

    container.addEventListener('keydown', handleTabKey)
    firstElement?.focus()

    return () => {
      container.removeEventListener('keydown', handleTabKey)
    }
  }, [isActive])

  return containerRef
}

/**
 * Auto Focus Hook
 * 컴포넌트 마운트 시 자동으로 포커스
 */
export function useAutoFocus<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    ref.current?.focus()
  }, [])

  return ref
}

/**
 * Keyboard Navigation Hook
 * 방향키로 리스트 네비게이션
 */
export function useKeyboardNav<T extends HTMLElement>(itemCount: number) {
  const containerRef = useRef<T>(null)
  const activeIndexRef = useRef(0)

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const { key } = e

    switch (key) {
      case 'ArrowDown':
        e.preventDefault()
        activeIndexRef.current = Math.min(activeIndexRef.current + 1, itemCount - 1)
        break
      case 'ArrowUp':
        e.preventDefault()
        activeIndexRef.current = Math.max(activeIndexRef.current - 1, 0)
        break
      case 'Home':
        e.preventDefault()
        activeIndexRef.current = 0
        break
      case 'End':
        e.preventDefault()
        activeIndexRef.current = itemCount - 1
        break
    }

    // 활성 요소에 포커스
    const items = containerRef.current?.querySelectorAll('[role="option"], [role="menuitem"]')
    const activeItem = items?.[activeIndexRef.current] as HTMLElement
    activeItem?.focus()
  }, [itemCount])

  return { containerRef, handleKeyDown, activeIndex: activeIndexRef.current }
}

/**
 * Screen Reader Announcement Hook
 * 스크린 리더에 메시지 알림
 */
export function useScreenReader() {
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div')
    announcement.setAttribute('role', 'status')
    announcement.setAttribute('aria-live', priority)
    announcement.setAttribute('aria-atomic', 'true')
    announcement.className = 'sr-only'
    announcement.textContent = message

    document.body.appendChild(announcement)

    setTimeout(() => {
      document.body.removeChild(announcement)
    }, 1000)
  }, [])

  return { announce }
}

/**
 * Skip to Content Hook
 * 메인 콘텐츠로 건너뛰기 기능
 */
export function useSkipToContent() {
  const skipToMain = useCallback(() => {
    const mainContent = document.querySelector('main')
    if (mainContent) {
      mainContent.setAttribute('tabindex', '-1')
      mainContent.focus()
      mainContent.removeAttribute('tabindex')
    }
  }, [])

  return { skipToMain }
}

/**
 * ARIA Expanded Hook
 * 확장/축소 상태 관리
 */
export function useAriaExpanded(initialState: boolean = false) {
  const [isExpanded, setIsExpanded] = React.useState(initialState)

  const toggle = useCallback(() => {
    setIsExpanded(prev => !prev)
  }, [])

  const ariaProps = {
    'aria-expanded': isExpanded,
    'aria-controls': undefined as string | undefined
  }

  return { isExpanded, toggle, ariaProps, setIsExpanded }
}

/**
 * Focus Visible Hook
 * 키보드 포커스만 표시
 */
export function useFocusVisible() {
  const [isFocusVisible, setIsFocusVisible] = React.useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        setIsFocusVisible(true)
      }
    }

    const handleMouseDown = () => {
      setIsFocusVisible(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleMouseDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])

  return isFocusVisible
}

import React from 'react'
