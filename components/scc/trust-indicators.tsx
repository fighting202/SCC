'use client'

import { Shield, Clock, Globe, CheckCircle } from 'lucide-react'
import { BilingualText } from './bilingualtext'
import { cn } from '@/lib/scc-utils'
import { motion } from 'framer-motion'

interface TrustBadgeProps {
  icon: 'verified' | 'insurance' | '24-7' | 'multilingual'
  text: string
  className?: string
}

function TrustBadge({ icon, text, className }: TrustBadgeProps) {
  const iconMap = {
    verified: CheckCircle,
    insurance: Shield,
    '24-7': Clock,
    multilingual: Globe
  }

  const Icon = iconMap[icon]

  return (
    <motion.div
      className={cn(
        "flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium relative",
        className
      )}
      whileHover={{
        scale: 1.05,
        boxShadow: '0 0 20px rgba(34, 197, 94, 0.4)'
      }}
      animate={{
        scale: [1, 1.02, 1],
      }}
      transition={{
        scale: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <Icon className="w-5 h-5 text-green-600" />
      </motion.div>
      <span>{text}</span>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-green-400 opacity-0 blur-md"
        whileHover={{
          opacity: 0.3,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

export function TrustIndicators({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-6 flex-wrap justify-center", className)}>
      <TrustBadge 
        icon="verified" 
        text="Licensed Business" 
      />
      <TrustBadge 
        icon="insurance" 
        text="Insured Services" 
      />
      <TrustBadge 
        icon="24-7" 
        text="24/7 Support" 
      />
      <TrustBadge 
        icon="multilingual" 
        text="English & 中文" 
      />
    </div>
  )
}

// 확장된 신뢰 지표 (더 많은 정보)
export function ExtendedTrustIndicators({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-6", className)}>
      {/* 기본 신뢰 배지 */}
      <TrustIndicators />
      
      {/* 추가 신뢰 정보 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div className="space-y-2">
          <div className="text-3xl font-bold text-scc-primary">500+</div>
          <BilingualText 
            en="Happy Clients" 
            zh="满意客户" 
            className="text-sm text-gray-600"
          />
        </div>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-scc-primary">5+</div>
          <BilingualText 
            en="Years Experience" 
            zh="年经验" 
            className="text-sm text-gray-600"
          />
        </div>
        <div className="space-y-2">
          <div className="text-3xl font-bold text-scc-primary">100%</div>
          <BilingualText 
            en="Success Rate" 
            zh="成功率" 
            className="text-sm text-gray-600"
          />
        </div>
      </div>
    </div>
  )
}
