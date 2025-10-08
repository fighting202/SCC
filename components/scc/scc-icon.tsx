"use client"

import React from 'react'
import { 
  Stethoscope, 
  Sparkles, 
  HeartHandshake, 
  Plane, 
  Languages, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  Clock,
  Shield,
  Star,
  Users,
  MapPin,
  Calendar,
  CreditCard,
  Globe,
  Zap,
  Award,
  Lock,
  Eye,
  Camera,
  Scissors,
  Pill,
  Syringe,
  Activity,
  Heart,
  Smile,
  UserCheck,
  AlertCircle,
  Info,
  HelpCircle
} from 'lucide-react'
import { cn } from '@/lib/scc-utils'

// SCC 전용 아이콘 타입 정의
export type SCCIconName = 
  | 'medical' | 'beauty' | 'airport' | 'interpreter' | 'emergency'
  | 'wechat' | 'whatsapp' | 'verified' | '24-7' | 'support'
  | 'accommodation' | 'restaurant' | 'transport' | 'insurance'
  | 'consultation' | 'booking' | 'payment' | 'security'
  | 'quality' | 'experience' | 'trust' | 'professional'
  | 'dental' | 'dermatology' | 'surgery' | 'wellness'
  | 'skincare' | 'hair' | 'makeup' | 'spa'
  | 'pickup' | 'dropoff' | 'guide' | 'assistant'

interface SCCIconProps {
  name: SCCIconName
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  color?: 'primary' | 'accent' | 'success' | 'wechat' | 'whatsapp' | 'text' | 'muted'
}

// 아이콘 매핑
const iconMap: Record<SCCIconName, React.ComponentType<any>> = {
  // 의료/뷰티 관광 특화 아이콘
  medical: Stethoscope,
  beauty: Sparkles,
  airport: Plane,
  interpreter: Languages,
  emergency: Phone,
  wechat: MessageCircle,
  whatsapp: MessageCircle,
  verified: CheckCircle2,
  '24-7': Clock,
  support: HeartHandshake,
  
  // 서비스 아이콘
  accommodation: MapPin,
  restaurant: Users,
  transport: Plane,
  insurance: Shield,
  consultation: Users,
  booking: Calendar,
  payment: CreditCard,
  security: Lock,
  
  // 품질/신뢰 아이콘
  quality: Award,
  experience: Star,
  trust: Shield,
  professional: UserCheck,
  
  // 의료 서비스 세부 아이콘
  dental: Activity,
  dermatology: Eye,
  surgery: Scissors,
  wellness: Heart,
  
  // 뷰티 서비스 세부 아이콘
  skincare: Sparkles,
  hair: Scissors,
  makeup: Camera,
  spa: Heart,
  
  // 지원 서비스 아이콘
  pickup: Plane,
  dropoff: Plane,
  guide: Globe,
  assistant: Users,
}

// 크기 매핑
const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
}

// 색상 매핑
const colorMap = {
  primary: 'text-primary',
  accent: 'text-accent',
  success: 'text-success',
  wechat: 'text-wechat',
  whatsapp: 'text-whatsapp',
  text: 'text-text',
  muted: 'text-muted-foreground',
}

export default function SCCIcon({ 
  name, 
  size = 'md', 
  className,
  color = 'primary'
}: SCCIconProps) {
  const IconComponent = iconMap[name]
  
  if (!IconComponent) {
    console.warn(`SCCIcon: Icon "${name}" not found`)
    return <HelpCircle className={cn(sizeMap[size], colorMap[color], className)} />
  }

  return (
    <IconComponent 
      className={cn(
        sizeMap[size],
        colorMap[color],
        className
      )}
    />
  )
}

// 아이콘 그룹 컴포넌트
interface SCCIconGroupProps {
  icons: Array<{
    name: SCCIconName
    label: string
    description?: string
  }>
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function SCCIconGroup({ 
  icons, 
  size = 'md', 
  className 
}: SCCIconGroupProps) {
  return (
    <div className={cn("flex flex-wrap gap-4", className)}>
      {icons.map((icon, index) => (
        <div key={index} className="flex items-center gap-2">
          <SCCIcon name={icon.name} size={size} />
          <div>
            <div className="font-medium text-sm">{icon.label}</div>
            {icon.description && (
              <div className="text-xs text-muted-foreground">
                {icon.description}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

// 아이콘 버튼 컴포넌트
interface SCCIconButtonProps {
  name: SCCIconName
  label: string
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'outline' | 'ghost'
  color?: 'primary' | 'accent' | 'success' | 'wechat' | 'whatsapp'
  className?: string
}

export function SCCIconButton({
  name,
  label,
  onClick,
  size = 'md',
  variant = 'default',
  color = 'primary',
  className
}: SCCIconButtonProps) {
  const baseClasses = "inline-flex items-center gap-2 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95"
  
  const variantClasses = {
    default: "bg-primary text-white hover:bg-primary/90",
    outline: "border border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "text-primary hover:bg-primary/10"
  }
  
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl"
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      <SCCIcon name={name} size={size} color={color} />
      {label}
    </button>
  )
}
