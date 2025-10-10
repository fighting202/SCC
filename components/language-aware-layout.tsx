'use client'

import { useEffect } from 'react'
import { useSCCStore } from '@/lib/store/sccStore'

/**
 * Client component to handle dynamic HTML lang attribute
 * Must be used within RootLayout
 */
export function LanguageAwareLayout() {
  const { language } = useSCCStore()

  useEffect(() => {
    // Update HTML lang attribute when language changes
    const htmlElement = document.documentElement
    htmlElement.lang = language === 'zh' ? 'zh-CN' : 'en'
  }, [language])

  return null // This component doesn't render anything
}
