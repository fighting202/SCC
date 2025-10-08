"use client"

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SlideInProps {
  children: ReactNode
  direction?: 'left' | 'right' | 'up' | 'down'
  delay?: number
  duration?: number
  distance?: number
  className?: string
}

export function SlideIn({ 
  children, 
  direction = 'left',
  delay = 0,
  duration = 0.5,
  distance = 50,
  className
}: SlideInProps) {
  const directionVariants = {
    left: { x: -distance },
    right: { x: distance },
    up: { y: -distance },
    down: { y: distance }
  }

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directionVariants[direction] 
      }}
      animate={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      transition={{ 
        duration, 
        delay,
        ease: "easeOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
