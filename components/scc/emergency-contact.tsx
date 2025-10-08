'use client'

import { Phone, MessageCircle, Clock, AlertTriangle } from 'lucide-react'
import { BilingualText } from './bilingualtext'
import { ContactButton } from './contactbutton'
import { cn } from '@/lib/scc-utils'

interface EmergencyContactProps {
  className?: string
  variant?: 'default' | 'compact' | 'minimal'
  showTitle?: boolean
}

export function EmergencyContact({ 
  className, 
  variant = 'default',
  showTitle = true 
}: EmergencyContactProps) {
  if (variant === 'minimal') {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <AlertTriangle className="w-4 h-4 text-red-500" />
        <span className="text-sm font-medium text-red-600">
          <BilingualText en="Emergency?" zh="紧急情况？" />
        </span>
        <ContactButton method="whatsapp" variant="ghost" size="sm" />
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={cn("bg-red-50 border border-red-200 rounded-lg p-4", className)}>
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="font-semibold text-red-900 text-sm">
              <BilingualText en="Emergency Support" zh="紧急支持" />
            </h4>
            <p className="text-red-800 text-xs">
              <BilingualText en="Available 24/7" zh="24小时可用" />
            </p>
          </div>
          <ContactButton method="whatsapp" variant="outline" size="sm" />
        </div>
      </div>
    )
  }

  return (
    <div className={cn("bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg", className)}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        
        <div className="flex-1 space-y-4">
          {showTitle && (
            <div>
              <h4 className="text-xl font-bold text-red-900 mb-2">
                <BilingualText 
                  en="Emergency Support" 
                  zh="紧急支持" 
                />
              </h4>
              <p className="text-red-800">
                <BilingualText 
                  en="Available 24/7 via WhatsApp" 
                  zh="通过WhatsApp 24小时可用" 
                />
              </p>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5 text-red-600" />
              <div>
                <p className="font-semibold text-red-900">
                  <BilingualText en="WhatsApp" zh="WhatsApp" />
                </p>
                <p className="text-red-800 text-sm">
                  <BilingualText en="Instant response" zh="即时回复" />
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-red-600" />
              <div>
                <p className="font-semibold text-red-900">+82-10-2981-6653</p>
                <p className="text-red-800 text-sm">
                  <BilingualText en="Direct call" zh="直接通话" />
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-red-600" />
              <div>
                <p className="font-semibold text-red-900">
                  <BilingualText en="24/7 Availability" zh="24小时可用" />
                </p>
                <p className="text-red-800 text-sm">
                  <BilingualText en="Any time, any day" zh="任何时间，任何日期" />
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <ContactButton 
              method="whatsapp" 
              variant="default"
              className="flex-1"
            />
            <ContactButton 
              method="wechat" 
              variant="outline"
              className="flex-1"
            />
          </div>

          <div className="text-xs text-red-700 bg-red-100 p-3 rounded">
            <p className="font-semibold mb-1">
              <BilingualText 
                en="What constitutes an emergency?" 
                zh="什么情况算紧急情况？" 
              />
            </p>
            <ul className="space-y-1">
              <li>• <BilingualText en="Medical complications" zh="医疗并发症" /></li>
              <li>• <BilingualText en="Lost or stolen documents" zh="丢失或被盗文件" /></li>
              <li>• <BilingualText en="Accommodation issues" zh="住宿问题" /></li>
              <li>• <BilingualText en="Transportation problems" zh="交通问题" /></li>
              <li>• <BilingualText en="Language barriers in critical situations" zh="关键情况下的语言障碍" /></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// 플로팅 긴급 연락 버튼
export function FloatingEmergencyButton({ className }: { className?: string }) {
  return (
    <div className={cn(
      "fixed bottom-6 right-6 z-50",
      className
    )}>
      <div className="relative group">
        <button className="w-16 h-16 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8" />
        </button>
        
        {/* 툴팁 */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
            <BilingualText en="Emergency Support" zh="紧急支持" />
          </div>
        </div>

        {/* 확장된 메뉴 (호버 시) */}
        <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
          <div className="bg-white rounded-lg shadow-xl p-4 space-y-3 min-w-64">
            <h4 className="font-semibold text-gray-900 text-center">
              <BilingualText en="Need Help?" zh="需要帮助？" />
            </h4>
            
            <div className="space-y-2">
              <ContactButton 
                method="whatsapp" 
                variant="outline" 
                size="sm"
                className="w-full"
              />
              <ContactButton 
                method="wechat" 
                variant="outline" 
                size="sm"
                className="w-full"
              />
            </div>

            <div className="text-center text-xs text-gray-500">
              <BilingualText en="24/7 Available" zh="24小时可用" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
