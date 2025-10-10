"use client"

import React from "react"
import { Plane, Building2, MessageCircle, UserCheck } from "lucide-react"
import { useSCCStore } from "@/lib/store/sccStore"
import { useEffect, useRef, useState } from "react"

export function WhyChooseUs() {
  const { language } = useSCCStore()
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = cardsRef.current.map((card, index) => {
      if (!card) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards(prev => [...prev, index])
            }, index * 100) // Stagger animation
            observer.unobserve(card)
          }
        },
        { threshold: 0.1 }
      )

      observer.observe(card)
      return observer
    })

    return () => {
      observers.forEach(observer => observer?.disconnect())
    }
  }, [])

  const features = [
    {
      icon: Plane,
      title: language === 'zh' ? '一站式服务' : 'All-in-One Service',
      description: language === 'zh' 
        ? "从机场接机、住宿安排、餐饮推荐到翻译陪同，一切为您安排妥当"
        : "Airport pickup, accommodation, meals, and translation — everything arranged for you",
    },
    {
      icon: Building2,
      title: language === 'zh' ? '可信赖的网络' : 'Trusted Network',
      description: language === 'zh'
        ? "对接韩国认证医美机构，安全可靠"
        : "We connect you with verified clinics and beauty centers throughout Korea",
    },
    {
      icon: MessageCircle,
      title: language === 'zh' ? '母语沟通，安心无忧' : 'Your Language, Your Comfort',
      description: language === 'zh' 
        ? "全程中文服务支持，让您在韩国感受如家般的便利"
        : "English and Chinese language support available throughout your stay",
    },
    {
      icon: UserCheck,
      title: language === 'zh' ? '专属客户经理' : 'Personal Care Manager',
      description: language === 'zh'
        ? <React.Fragment>专属协调员全程陪伴<br/>为您在韩国的旅程<br/>提供贴心服务</React.Fragment>
        : "One dedicated coordinator guides you through your entire journey",
    },
  ]

  return (
    <section className="py-20 lg:py-32 bg-white dark:bg-scc-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl text-gray-900 dark:text-scc-dark-text mb-4 ${language === 'zh' ? 'font-chinese' : 'font-sans'}`} style={{ fontWeight: 700 }}>
            {language === 'zh' ? '选择我们的理由' : 'Why Choose Us'}
          </h2>
          <p className="text-lg text-gray-600 dark:text-scc-dark-text-secondary max-w-2xl mx-auto">
            {language === 'zh' ? '您的舒适与安全是我们的首要任务' : 'Your comfort and safety are our top priorities'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => { cardsRef.current[index] = el }}
              className={`bg-white dark:bg-scc-dark-card rounded-xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 min-h-[320px] flex flex-col cursor-pointer hover-glow hover:shadow-[0_0_20px_rgba(44,95,124,0.6)] hover:shadow-[0_0_40px_rgba(44,95,124,0.3)]
                ${visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* 아이콘 영역 */}
              <div className="flex-shrink-0 flex justify-center mb-6">
                <div className="w-16 h-16 md:w-18 md:h-18 rounded-full bg-[#2C5F7C] flex items-center justify-center">
                  <feature.icon className="w-8 h-8 md:w-9 md:h-9 text-white" />
                </div>
              </div>
              
              {/* 카드 내용 */}
              <div className="flex flex-col flex-1 text-center">
                <h3 className={`text-lg md:text-xl lg:text-2xl font-bold text-gray-900 dark:text-scc-dark-text mb-4 ${language === 'zh' ? 'font-chinese' : 'font-sans'}`}>
                  {feature.title}
                </h3>
                <p className={`text-gray-600 dark:text-scc-dark-text-secondary leading-relaxed flex-1 text-sm md:text-base ${language === 'zh' ? 'font-chinese' : 'font-sans'}`} style={{
                  wordBreak: language === 'zh' ? 'keep-all' : 'normal',
                  overflowWrap: language === 'zh' ? 'break-word' : 'normal',
                  whiteSpace: language === 'zh' ? 'normal' : 'normal'
                }}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
