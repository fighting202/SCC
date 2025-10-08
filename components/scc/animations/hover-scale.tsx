"use client"

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface HoverScaleProps {
  children: ReactNode
  scale?: number
  duration?: number
  className?: string
  whileTap?: boolean
}

export function HoverScale({ 
  children, 
  scale = 1.02, 
  duration = 0.2,
  className,
  whileTap = true
}: HoverScaleProps) {
  return (
    <motion.div
      whileHover={{ 
        scale,
        transition: { duration }
      }}
      whileTap={whileTap ? { 
        scale: 0.98,
        transition: { duration: 0.1 }
      } : undefined}
      className={className}
    >
      {children}
    </motion.div>
  )
}
