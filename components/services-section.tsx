"use client"

import { Stethoscope, Sparkles, HeartHandshake } from "lucide-react"
import { useSCCStore } from "@/lib/store/sccStore"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export function ServicesSection() {
  const { language } = useSCCStore()
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = cardsRef.current.map((card, index) => {
      if (!card) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setTimeout(() => {
              setVisibleCards(prev => [...prev, index])
            }, index * 100)
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

  const services = [
    {
      icon: Stethoscope,
      title: language === 'zh' ? '医疗服务' : 'Medical Services',
      items: language === 'zh' 
        ? ["整形手术", "皮肤科", "口腔护理", "韩方医学"]
        : ["Plastic Surgery", "Dermatology", "Dental Care", "Traditional Korean Medicine"],
      description: language === 'zh' 
        ? "我们为您推荐韩国顶尖医疗机构，量身定制医疗方案"
        : "We guide you to Korea's leading medical facilities tailored to your needs",
      fallbackIcon: "🏥",
      gradient: "from-blue-500 to-blue-700"
    },
    {
      icon: Sparkles,
      title: language === 'zh' ? '美容服务' : 'Beauty Services',
      items: language === 'zh' 
        ? ["K-Beauty护肤", "美发造型", "SPA养生", "专业指导"]
        : ["K-Beauty Skincare", "Hair & Makeup", "Spa & Wellness", "Professional Guidance"],
      description: language === 'zh' 
        ? "在专业指导下体验正宗的韩国美容护理，让您焕发自然光彩"
        : "Experience authentic Korean beauty treatments with professional guidance to enhance your natural beauty",
      fallbackIcon: "💄",
      gradient: "from-pink-500 to-purple-600"
    },
    {
      icon: HeartHandshake,
      title: language === 'zh' ? '全程支持' : 'Complete Support',
      items: language === 'zh' 
        ? ["机场接送", "住宿预订", "翻译陪同", "餐厅推荐", "紧急协助"]
        : ["Airport Transfer", "Accommodation Booking", "Interpreter Service", "Restaurant Recommendations", "Emergency Assistance"],
      description: language === 'zh' 
        ? "从您抵达的那一刻到离开，我们始终陪伴左右"
        : "From the moment you land to the day you leave, we're with you every step of the way",
      fallbackIcon: "🤝",
      gradient: "from-green-500 to-teal-600"
    },
  ]

  return (
    <section id="services" className="section-padding bg-gray-50 dark:bg-scc-dark-bg">
      <div className="container-responsive">
        <div className="text-center section-margin">
          <h2 className={`text-3xl sm:text-4xl md:text-5xl text-gray-900 dark:text-scc-dark-text mb-4 ${language === 'zh' ? 'font-chinese' : 'font-sans'}`} style={{ fontWeight: 700 }}>
            {language === 'zh' ? '服务项目' : 'Our Services'}
          </h2>
          <p className="body-text text-gray-600 dark:text-scc-dark-text-secondary max-w-2xl mx-auto">
            {language === 'zh' ? '为您量身定制的全方位护理' : 'Comprehensive care tailored to your needs'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={el => { cardsRef.current[index] = el }}
              className={`bg-white dark:bg-scc-dark-card rounded-xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 min-h-[480px] flex flex-col cursor-pointer hover-glow hover:shadow-[0_0_20px_rgba(44,95,124,0.6)] hover:shadow-[0_0_40px_rgba(44,95,124,0.3)]
                ${visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* 아이콘 영역 */}
              <div className="flex-shrink-0 relative w-full h-40 sm:h-48 md:h-52 rounded-lg mb-6 overflow-hidden bg-gradient-to-br from-[#2C5F7C] to-[#1F4A5F] flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">{service.fallbackIcon}</div>
                  <div className="text-lg font-semibold opacity-90 leading-tight px-2">
                    {service.title}
                  </div>
                </div>
              </div>
              
              {/* 카드 내용 */}
              <div className="flex flex-col flex-1">
                <h3 className={`text-xl md:text-2xl font-bold text-gray-900 dark:text-scc-dark-text mb-4 text-center ${language === 'zh' ? 'font-chinese' : 'font-sans'}`}>
                  {service.title}
                </h3>
                
                    <p className={`text-gray-600 dark:text-scc-dark-text-secondary text-center mb-6 leading-relaxed flex-1 ${language === 'zh' ? 'font-chinese' : 'font-sans'}`} style={{ 
                      wordBreak: language === 'zh' ? 'keep-all' : 'normal',
                      lineBreak: language === 'zh' ? 'auto' : 'auto'
                    }}>
                      {service.description}
                    </p>
                
                <ul className="space-y-3 text-center">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-center justify-center">
                      <button 
                        className={`text-gray-700 dark:text-scc-dark-text hover:text-scc-primary active:text-scc-primary transition-colors duration-200 text-sm md:text-base cursor-pointer ${language === 'zh' ? 'font-chinese' : 'font-sans'}`}
                        onClick={() => {
                          // 클릭 시 스크롤을 Contact 섹션으로 이동
                          const contactSection = document.getElementById('contact');
                          if (contactSection) {
                            contactSection.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
