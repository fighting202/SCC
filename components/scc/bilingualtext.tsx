"use client"

import { useSCCStore } from "@/lib/store"
import type { BilingualTextProps } from "@/lib/scc-types"
import { cn } from "@/lib/scc-utils"

export function BilingualText({ 
  en, 
  zh, 
  className,
  as: Component = 'span'
}: BilingualTextProps) {
  const { language } = useSCCStore()
  
  const text = language === 'zh' ? (zh || en) : (en || zh)
  
  return (
    <Component className={cn(className)}>
      {text || ''}
    </Component>
  )
}