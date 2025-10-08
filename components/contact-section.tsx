"use client"

import { useState, useEffect } from "react"
import { CONTACT } from "@/lib/scc-constants"
import { useSCCStore } from "@/lib/store/sccStore"

// Tally global object type
declare global {
  interface Window {
    Tally: {
      openPopup: (id: string, options?: { 
        layout?: string; 
        width?: number; 
        autoClose?: number; 
        emoji?: { text: string; animation: string } 
      }) => void;
    };
  }
}

export default function ContactSection() {
  const { language } = useSCCStore()
  const [isTallyLoaded, setIsTallyLoaded] = useState(false)

  useEffect(() => {
    // Tally 스크립트 로딩 확인
    const checkTally = setInterval(() => {
      if (typeof window !== 'undefined' && (window as any).Tally) {
        setIsTallyLoaded(true)
        clearInterval(checkTally)
      }
    }, 100)

    return () => clearInterval(checkTally)
  }, [])

  const handleTallyClick = () => {
    if (typeof window === 'undefined') return

    // 모바일: 새 탭에서 열기 (더 나은 UX)
    if (window.innerWidth < 768) {
      window.open('https://tally.so/r/nWxl8Q', '_blank')
      return
    }

    // 데스크톱: 팝업 모달
    if (isTallyLoaded && (window as any).Tally) {
      (window as any).Tally.openPopup('nWxl8Q', {
        layout: 'modal',
        width: 700,
        autoClose: 3000,
        emoji: {
          text: '✈️',
          animation: 'wave'
        }
      })
    } else {
      // Fallback: 새 탭
      window.open('https://tally.so/r/nWxl8Q', '_blank')
    }
  }

  const handleWeChatClick = () => {
    alert(language === 'zh' ? `微信ID '${CONTACT.wechatId}' 已复制！` : `WeChat ID '${CONTACT.wechatId}' copied!`)
    navigator.clipboard.writeText(CONTACT.wechatId)
  }

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        {/* 섹션 제목 */}
        <h2 className="text-4xl font-bold mb-4">
          {language === 'en' ? 'Get Started Today' : '立即开始'}
        </h2>
        
        {/* 설명 */}
        <p className="text-xl text-gray-600 mb-12">
          {language === 'en' 
            ? 'Complete our quick form and receive a personalized consultation within 24 hours' 
            : '填写快速表格，24小时内收到个性化咨询'
          }
        </p>
        
        {/* 메인 CTA 버튼 */}
        <div className="mb-8">
          <button
            onClick={handleTallyClick}
            className="w-full sm:w-auto inline-flex flex-col items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 
                       text-white px-8 sm:px-16 py-6 sm:py-8 rounded-2xl text-xl sm:text-2xl font-bold
                       hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-3xl
                       hover:from-blue-700 hover:to-blue-800 min-h-[64px] min-w-[280px]"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl">📋</span>
              <span>{language === 'en' ? 'Get Free Consultation' : '免费咨询'}</span>
            </div>
            <div className="text-base sm:text-lg font-normal opacity-90">
              ⏱️ {language === 'en' ? 'Takes only 2 minutes' : '仅需2分钟'}
            </div>
          </button>
        </div>
        
        {/* 대안 연락 방법 */}
        <div className="mt-16">
          <p className="text-gray-600 mb-6 text-lg">
            {language === 'en' ? 'Or contact us directly:' : '或直接联系我们：'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            {/* WhatsApp */}
            <a
              href={`https://wa.me/${CONTACT.phone.replace(/[^0-9]/g, '')}?text=Hi%20Seoul%20Care%20Concierge!%0A%0AName:%20%0AService:%20%0ATravel%20dates:%20`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1DA851] text-white 
                         px-6 py-4 rounded-lg font-semibold transition-all duration-200 
                         shadow-md hover:shadow-lg hover:scale-105 min-h-[56px]"
            >
              <span className="text-xl">💬</span>
              <span className="text-base">WhatsApp</span>
            </a>

            {/* WeChat */}
            <button
              onClick={handleWeChatClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#07C160] hover:bg-[#059B4A] text-white 
                         px-6 py-4 rounded-lg font-semibold transition-all duration-200 
                         shadow-md hover:shadow-lg hover:scale-105 min-h-[56px]"
            >
              <span className="text-xl">💚</span>
              <span className="text-base">{language === 'en' ? 'WeChat' : '微信'}</span>
            </button>

            {/* Email */}
            <a
              href={`mailto:${CONTACT.email}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#2C5F7C] hover:bg-[#1F4A5F] text-white 
                         px-6 py-4 rounded-lg font-semibold transition-all duration-200 
                         shadow-md hover:shadow-lg hover:scale-105 min-h-[56px]"
            >
              <span className="text-xl">✉️</span>
              <span className="text-base">Email</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}