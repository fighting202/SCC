"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { CONTACT } from "@/lib/scc-constants"
import { useSCCStore } from "@/lib/store/sccStore"
import { Button } from "@/components/ui/button"

// Tally global object type - moved to global types

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
      window.open(`https://tally.so/r/${process.env.NEXT_PUBLIC_TALLY_FORM_ID}`, '_blank')
      return
    }

    // 데스크톱: 팝업 모달
    if (isTallyLoaded && (window as any).Tally) {
      (window as any).Tally.openPopup(process.env.NEXT_PUBLIC_TALLY_FORM_ID, {
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
      window.open(`https://tally.so/r/${process.env.NEXT_PUBLIC_TALLY_FORM_ID}`, '_blank')
    }
  }

  const [showWeChatQR, setShowWeChatQR] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleWeChatClick = () => {
    // 모바일에서는 새 탭으로 열기, 데스크톱에서는 모달
    if (window.innerWidth < 768) {
      window.open('/wechat-qr', '_blank')
    } else {
      setShowWeChatQR(true)
    }
  }

  const closeWeChatQR = () => {
    setShowWeChatQR(false)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      // Copy failed silently
    }
  }

  return (
    <section id="get-started" className="section-padding bg-gray-50 dark:bg-scc-dark-bg">
      <div className="container-responsive text-center">
        {/* 섹션 제목 */}
        <h2 className={`text-3xl sm:text-4xl md:text-5xl text-gray-900 dark:text-scc-dark-text mb-4 ${language === 'zh' ? 'font-chinese' : 'font-sans'}`} style={{ fontWeight: 700 }}>
          {language === 'en' ? 'Get Started Today' : '立即开始'}
          </h2>
        
        {/* 설명 */}
        <p className="body-text text-gray-600 dark:text-scc-dark-text-secondary mb-12">
          {language === 'en' 
            ? 'Complete our quick form and receive a personalized consultation within 24 hours' 
            : '填写快速表格，24小时内收到个性化咨询'
          }
        </p>
        
        {/* 메인 CTA 버튼 */}
        <div className="mb-8">
          <Button
            onClick={handleTallyClick}
            variant="primary"
            size="xl"
            language={language}
            className="w-full md:w-auto min-w-[280px] h-20 px-16 text-2xl
              bg-[#2C5F7C] border-2 border-[#D4AF37]
              hover:border-[#E5C158] hover:bg-[#2C5F7C] hover:text-scc-gold
              hover:scale-105 transition-all duration-500
              shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)]
              inline-flex items-center justify-center gap-3"
          >
            <span 
              className="text-xl md:text-2xl"
              style={{ filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.6))' }}
            >
              📋
            </span>
            <span className={language === 'zh' ? 'font-chinese' : ''}>
              {language === 'en' ? 'Get Free Consultation' : '免费咨询'}
            </span>
          </Button>
          <p className={`small-text mt-3 text-gray-600 dark:text-scc-dark-text-secondary ${language === 'zh' ? 'font-chinese' : ''}`}>
            ⏱️ {language === 'en' ? 'Takes only 2 minutes' : '仅需2分钟'}
          </p>
        </div>

        {/* 대안 연락 방법 */}
        <div className="mt-16">
          <p className={`text-gray-600 mb-6 body-text ${language === 'zh' ? 'font-chinese' : ''}`}>
            {language === 'en' ? 'Or contact us directly:' : '或直接联系我们：'}
          </p>
          <div className="flex flex-col sm:flex-row card-gap justify-center max-w-2xl mx-auto">
            {language === 'zh' ? (
              <>
                {/* WeChat - 중국 고객 우선 */}
                <Button
                  onClick={handleWeChatClick}
                  variant="success"
                  size="lg"
                  language={language}
                  className="w-full sm:w-auto bg-[#07C160] hover:bg-[#059B4A] text-white 
                             shadow-lg hover:shadow-2xl hover:scale-105
                             inline-flex items-center justify-center gap-3 px-6 py-4 text-base font-semibold rounded-lg transition-all duration-300
                             h-12 min-h-[48px]"
                >
                  <span className="text-xl">🔲</span>
                  <span className="text-base font-chinese">微信</span>
              </Button>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${CONTACT.phone.replace(/[^0-9]/g, '')}?text=Hi%20Seoul%20Care%20Concierge!%0A%0AName:%20%0AService:%20%0ATravel%20dates:%20`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1DA851] text-white 
                           shadow-lg hover:shadow-2xl hover:scale-105
                           inline-flex items-center justify-center gap-3 px-6 py-4 text-base font-semibold rounded-lg transition-all duration-300
                           h-12 min-h-[48px]"
              >
                <span className="text-xl">💬</span>
                <span className="text-base">WhatsApp</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${CONTACT.email}`}
                className="w-full sm:w-auto bg-[#2C5F7C] hover:bg-[#1F4A5F] text-white 
                           shadow-lg hover:shadow-2xl hover:scale-105
                           inline-flex items-center justify-center gap-3 px-6 py-4 text-base font-semibold rounded-lg transition-all duration-300
                           h-12 min-h-[48px]"
              >
                <span className="text-xl">✉️</span>
                <span className="text-base font-chinese">邮箱</span>
              </a>
              </>
            ) : (
              <>
                {/* WhatsApp - 영문 고객 우선 */}
                <Button
                  asChild
                  variant="success"
                  size="lg"
                  language={language}
                  className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1DA851] text-white
                           shadow-lg hover:shadow-2xl hover:scale-105"
                >
                  <a
                    href={`https://wa.me/${CONTACT.phone.replace(/[^0-9]/g, '')}?text=Hi%20Seoul%20Care%20Concierge!%0A%0AName:%20%0AService:%20%0ATravel%20dates:%20`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="text-xl">💬</span>
                    <span className="text-base">WhatsApp</span>
                  </a>
                </Button>

              {/* WeChat */}
                <Button
                  onClick={handleWeChatClick}
                  variant="success"
                  size="lg"
                  language={language}
                  className="w-full sm:w-auto bg-[#07C160] hover:bg-[#059B4A] text-white 
                             shadow-lg hover:shadow-2xl hover:scale-105
                             inline-flex items-center justify-center gap-3 px-6 py-4 text-base font-semibold rounded-lg transition-all duration-300"
                >
                  <span className="text-xl">🔲</span>
                  <span className="text-base">WeChat</span>
                </Button>

                {/* Email */}
                <Button
                  asChild
                  variant="primary"
                  size="lg"
                  language={language}
                  className="w-full sm:w-auto bg-[#2C5F7C] hover:bg-[#1F4A5F] text-white
                           shadow-lg hover:shadow-2xl hover:scale-105"
                >
                  <a href={`mailto:${CONTACT.email}`}>
                    <span className="text-xl">✉️</span>
                    <span className="text-base">Email</span>
                  </a>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* WeChat QR Code Modal */}
      {showWeChatQR && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full text-center">
            <h3 className="text-xl font-bold mb-4 text-gray-900">
              {language === 'zh' ? 'WeChat 二维码' : 'WeChat QR Code'}
            </h3>
            <div className="bg-gray-100 p-6 rounded-lg mb-4">
              <div className="flex flex-col items-center">
                <div className="w-48 h-48 bg-white rounded-lg shadow-md mb-4 flex items-center justify-center relative">
                  <Image
                    src="/scc-wechat-qr.jpg"
                    alt="WeChat QR Code"
                    width={192}
                    height={192}
                    className="object-contain rounded-lg"
                    onError={(e) => {
                      console.error('QR code image load failed:', e);
                    }}
                  />
                  <div className="text-center text-gray-500 p-4 hidden" id="qr-fallback">
                    <div className="text-4xl mb-2">📱</div>
                    <div className="text-sm">QR Code</div>
                    <div className="text-xs mt-1">WeChat ID: SeoulCareConcierge</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {language === 'zh' ? 'WeChat ID: ' : 'WeChat ID: '}
                  <span className="font-mono font-bold">{CONTACT.wechatId}</span>
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              {language === 'zh' 
                ? '请使用 WeChat 扫描二维码或搜索 ID 添加好友' 
                : 'Scan QR code with WeChat or search by ID to add friend'
              }
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => copyToClipboard(CONTACT.wechatId)}
                className="no-gold-hover flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                {language === 'zh' ? '复制 ID' : 'Copy ID'}
              </button>
              <button
                onClick={closeWeChatQR}
                className="no-gold-hover flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
              >
                {language === 'zh' ? '关闭' : 'Close'}
              </button>
            </div>
            {copied && (
              <p className="text-xs text-green-600 mt-2">
                {language === 'zh' ? '已复制!' : 'Copied!'}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  )
}