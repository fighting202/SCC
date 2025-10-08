"use client"

import { CONTACT, CONTACT_METHODS } from '@/lib/scc-constants'
import type { ContactButtonProps } from '@/lib/scc-types'
import { cn, languageUtils } from '@/lib/scc-utils'
import { HoverScale, FadeIn } from './animations'
import { MessageCircle, Mail, Smartphone } from 'lucide-react'

const icons = {
  whatsapp: MessageCircle,
  wechat: MessageCircle,
  email: Mail
}

export function ContactButton({ 
  type, 
  size = 'md', 
  className,
  children 
}: ContactButtonProps) {
  if (!type) return null
  
  const method = CONTACT_METHODS[type]
  const Icon = icons[type]
  
  const sizeClasses = {
    sm: 'h-10 px-4 text-sm',
    md: 'h-12 px-6 text-base',
    lg: 'h-14 px-8 text-lg',
    xl: 'h-16 px-10 text-xl'
  }

  const labels = {
    whatsapp: {
      en: 'Message on WhatsApp',
      zh: 'WhatsApp 联系'
    },
    wechat: {
      en: 'Connect on WeChat',
      zh: '添加微信'
    },
    email: {
      en: 'Send us an Email',
      zh: '发送邮件'
    }
  }

  const label = labels[type]
  const displayText = children || languageUtils.getText(label, 'en') || (type ? type.toUpperCase() : 'CONTACT')

  const getHref = () => {
    switch (type) {
      case 'whatsapp':
        return CONTACT.whatsapp
      case 'wechat':
        return `weixin://dl/chat?${CONTACT.wechatId}`
      case 'email':
        return `mailto:${CONTACT.email}`
      default:
        return '#'
    }
  }

  const handleClick = () => {
    if (type === 'wechat') {
      // WeChat ID 복사 기능
      navigator.clipboard.writeText(CONTACT.wechatId)
      // 토스트 메시지 표시 (구현 필요)
      alert(`WeChat ID copied: ${CONTACT.wechatId}`)
    }
  }

  return (
    <FadeIn>
      <HoverScale scale={1.05}>
        <a
          href={getHref()}
          target={type !== 'email' ? '_blank' : undefined}
          rel={type !== 'email' ? 'noopener noreferrer' : undefined}
          onClick={type === 'wechat' ? handleClick : undefined}
          className={cn(
            'inline-flex items-center justify-center gap-3 rounded-lg font-semibold text-white transition-all duration-200',
            'hover:shadow-lg active:scale-95',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            sizeClasses[size],
            className
          )}
          style={{ 
            backgroundColor: method?.color || '#6B7280',
            '--tw-ring-color': method?.color || '#6B7280'
          } as React.CSSProperties}
        >
          <Icon className="w-5 h-5" />
          <span>{displayText}</span>
          {type === 'wechat' && (
            <span className="text-xs opacity-75">
              ID: {CONTACT.wechatId}
            </span>
          )}
        </a>
      </HoverScale>
    </FadeIn>
  )
}