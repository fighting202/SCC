"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, Globe } from "lucide-react"
import { TrustIndicators } from "@/components/scc/trust-indicators"
import { useSCCStore } from "@/lib/store/sccStore"
import Image from "next/image"

// Tally global object type - moved to global types

export default function HeroSection() {
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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      let headerHeight = 120 // 기본 오프셋
      
      // Contact 섹션의 경우 제목이 보이도록 적당한 오프셋 적용
      if (id === 'get-started') {
        headerHeight = 160 // 헤더(112px) + 여백(48px) = 160px
      }
      
      const elementRect = element.getBoundingClientRect()
      const elementPosition = elementRect.top + window.pageYOffset - headerHeight
      
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      })
    }
  }

  const handleTallyClick = () => {
    if (typeof window === 'undefined') return

    // 모바일
    if (window.innerWidth < 768) {
      window.open(`https://tally.so/r/${process.env.NEXT_PUBLIC_TALLY_FORM_ID}`, '_blank')
      return
    }

    // 데스크톱
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

  return (
        <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16 md:pt-20 lg:pt-28 section-padding" role="banner" aria-label="Hero section">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            {/* Main image */}
            <Image
              src="/modern-seoul-skyline-at-sunset-with-luxury-medical.jpg"
              alt="Seoul medical tourism skyline with luxury medical facilities"
              fill
              className="object-cover dark:brightness-75 dark:contrast-110"
              priority
              quality={90}
              sizes="100vw"
              onError={(e) => {
                // Fallback to original JPG if WebP fails
                e.currentTarget.src = '/modern-seoul-skyline-at-sunset-with-luxury-medical.jpg'
              }}
            />


            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 md:from-black/60 md:via-black/50 md:to-black/60 dark:from-black/80 dark:via-black/70 dark:to-black/80 dark:md:from-black/70 dark:md:via-black/60 dark:md:to-black/70" />
          </div>

          {/* Content */}
          <div className="relative z-10 container-responsive text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white dark:text-white text-balance leading-tight animate-fade-in">
              {language === 'zh' ? '您在韩国的安全无忧之旅' : 'Your Safe & Seamless Journey in Korea'}
            </h1>
            <p className="text-xl md:text-2xl text-white/95 dark:text-white/90 mb-6 md:mb-10 max-w-3xl mx-auto text-pretty leading-relaxed animate-slide-up">
              {language === 'zh' ? '专业医疗美容管家服务' : 'Professional Medical & Beauty Concierge'}
            </p>

        {/* Main CTA Button */}
        <div className="mb-8 animate-scale-in">
            <button
              onClick={handleTallyClick}
              className={`bg-[#2C5F7C] hover:bg-[#1F4A5F] text-white hover:text-scc-gold w-full md:w-auto btn-primary font-bold
                         rounded-xl shadow-2xl hover:scale-105 transition-all duration-300
                         inline-flex items-center justify-center gap-3 ${language === 'zh' ? 'font-chinese' : 'font-sans'}`}
              aria-label={language === 'zh' ? '免费咨询按钮' : 'Get Free Consultation Button'}
            >
              <span className="text-xl md:text-2xl">📋</span>
              <span className="font-semibold">
                {language === 'en' ? 'Get Free Consultation' : '免费咨询'}
              </span>
            </button>
          <p className={`small-text mt-3 text-white/80 dark:text-scc-dark-text-secondary ${language === 'zh' ? 'font-chinese' : 'font-sans'}`}>
            ⏱️ {language === 'en' ? 'Takes only 2 minutes' : '仅需2分钟'}
          </p>
        </div>

        {/* Small CTA Buttons */}
        <div className="grid grid-cols-2 md:flex items-center justify-center card-gap mb-16 animate-scale-in max-w-2xl mx-auto">
          <button
            onClick={() => scrollToSection("services")}
            className="bg-white/10 dark:bg-white/20 backdrop-blur-sm text-white dark:text-white hover:bg-white/20 dark:hover:bg-white/30 btn-touch rounded-full font-medium transition-all duration-300 flex items-center justify-center"
          >
            <span className={`small-text ${language === 'zh' ? 'font-chinese' : 'font-sans'}`}>
              {language === 'zh' ? '查看服务' : 'View Services'}
            </span>
          </button>
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="bg-white/10 dark:bg-white/20 backdrop-blur-sm text-white dark:text-white hover:bg-white/20 dark:hover:bg-white/30 btn-touch rounded-full font-medium transition-all duration-300 flex items-center justify-center"
          >
            <span className={`small-text ${language === 'zh' ? 'font-chinese' : 'font-sans'}`}>
              {language === 'zh' ? '使用指南' : 'How It Works'}
            </span>
          </button>
          <button
            onClick={() => scrollToSection("packages")}
            className="bg-white/10 dark:bg-white/20 backdrop-blur-sm text-white dark:text-white hover:bg-white/20 dark:hover:bg-white/30 btn-touch rounded-full font-medium transition-all duration-300 flex items-center justify-center"
          >
            <span className={`small-text ${language === 'zh' ? 'font-chinese' : 'font-sans'}`}>
              {language === 'zh' ? '查看套餐' : 'View Packages'}
            </span>
          </button>
          <button
            onClick={() => scrollToSection("faq")}
            className="bg-white/10 dark:bg-white/20 backdrop-blur-sm text-white dark:text-white hover:bg-white/20 dark:hover:bg-white/30 btn-touch rounded-full font-medium transition-all duration-300 flex items-center justify-center"
          >
            <span className={`small-text ${language === 'zh' ? 'font-chinese' : 'font-sans'}`}>
              {language === 'zh' ? '常见问题' : 'FAQ'}
            </span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="max-w-4xl mx-auto animate-fade-in">
          <TrustIndicators className="justify-center" />
        </div>
      </div>
    </section>
  )
}
