'use client'

import { ContactButton } from './contactbutton'
import { BilingualText } from './bilingualtext'
import { cn } from '@/lib/scc-utils'

interface ContactButtonGroupProps {
  className?: string
  variant?: 'default' | 'compact' | 'minimal'
  layout?: 'vertical' | 'horizontal' | 'grid'
  showLabels?: boolean
  priority?: 'wechat' | 'whatsapp' | 'email'
}

export function ContactButtonGroup({ 
  className, 
  variant = 'default',
  layout = 'vertical',
  showLabels = true,
  priority = 'wechat'
}: ContactButtonGroupProps) {
  const getButtonSize = (): 'sm' | 'md' | 'lg' => {
    switch (variant) {
      case 'minimal': return 'sm'
      case 'compact': return 'md'
      default: return 'lg'
    }
  }

  const getButtonVariant = (method: 'wechat' | 'whatsapp' | 'email') => {
    if (method === priority) return 'default'
    return variant === 'minimal' ? 'ghost' : 'outline'
  }

  const getLayoutClasses = () => {
    switch (layout) {
      case 'horizontal':
        return 'flex flex-col sm:flex-row gap-3'
      case 'grid':
        return 'grid grid-cols-1 sm:grid-cols-3 gap-3'
      default:
        return 'flex flex-col gap-4'
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      {showLabels && (
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            <BilingualText 
              en="Get in Touch" 
              zh="联系我们" 
            />
          </h3>
          <p className="text-gray-600 text-sm">
            <BilingualText 
              en="Choose your preferred way to contact us" 
              zh="选择您喜欢的联系方式" 
            />
          </p>
        </div>
      )}

      <div className={getLayoutClasses()}>
        {/* WeChat 우선 (중국 고객) */}
        <ContactButton
          type="wechat"
          size={getButtonSize()}
          className="flex-1"
        />

        {/* WhatsApp (기타 국제 고객) */}
        <ContactButton
          type="whatsapp"
          size={getButtonSize()}
          className="flex-1"
        />

        {/* 이메일 (보조) */}
        <ContactButton
          type="email"
          size={getButtonSize()}
          className="flex-1"
        />
      </div>

      {variant !== 'minimal' && (
        <div className="text-center text-sm text-gray-500">
          <p>
            <BilingualText 
              en="We respond within 2 hours during business hours" 
              zh="我们在营业时间内2小时内回复" 
            />
          </p>
          <p>
            <BilingualText 
              en="Emergency? Call +82-10-2981-6653" 
              zh="紧急情况？致电 +82-10-2981-6653" 
            />
          </p>
        </div>
      )}
    </div>
  )
}

// 특화된 연락 버튼 그룹들
export function QuickContactButtons({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-3 justify-center", className)}>
      <ContactButton
        type="whatsapp"
        size="sm"
        className="flex-1 min-w-0 sm:flex-none"
      />
      <ContactButton
        type="wechat"
        size="sm"
        className="flex-1 min-w-0 sm:flex-none"
      />
    </div>
  )
}

export function PriorityContactButtons({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="text-center">
        <h4 className="font-semibold text-gray-900 mb-1">
          <BilingualText
            en="Recommended for Chinese customers"
            zh="推荐给中国客户"
          />
        </h4>
      </div>

      <ContactButton
        type="wechat"
        size="lg"
        className="w-full"
      />

      <div className="text-center text-sm text-gray-500">
        <BilingualText
          en="or"
          zh="或"
        />
      </div>

      <ContactButton
        type="whatsapp"
        size="lg"
        className="w-full"
      />
    </div>
  )
}

export function EmergencyContactButtons({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="text-center">
        <h4 className="font-semibold text-red-900 mb-1">
          <BilingualText
            en="Emergency Contact"
            zh="紧急联系"
          />
        </h4>
        <p className="text-sm text-red-700">
          <BilingualText
            en="Available 24/7"
            zh="24小时可用"
          />
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <ContactButton
          type="whatsapp"
          size="lg"
          className="bg-red-500 hover:bg-red-600"
        />
        <ContactButton
          type="email"
          size="lg"
          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
        />
      </div>

      <div className="text-center text-sm text-gray-600">
        <p>
          <BilingualText
            en="Direct call: +82-10-2981-6653"
            zh="直接致电：+82-10-2981-6653"
          />
        </p>
      </div>
    </div>
  )
}
