"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Check, Lightbulb, AlertTriangle, Clock, Building, MessageSquare, Stethoscope, ShoppingBag, HeartHandshake } from "lucide-react"
import { useSCCStore } from "@/lib/store/sccStore"
import { useEffect, useRef, useState } from "react"

export default function PackageComparison() {
  const { language } = useSCCStore()
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

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

  useEffect(() => {
    const observers = cardsRef.current.map((card, index) => {
      if (!card) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleCards(prev => [...prev, index])
            }, index * 150)
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

  const packages = [
    {
      badge: language === 'zh' ? '基础套餐' : 'Basic Package',
      title: language === 'zh' ? '3-5天基础套餐' : '3-5 Day Basic Package',
      price: language === 'zh' ? '从 ¥8,400 起' : 'From $1,200',
      originalPrice: language === 'zh' ? '原价 ¥12,600' : 'Was $1,800',
      features: language === 'zh' ? [
        '3-5天停留时间',
        '标准住宿',
        '兼职翻译 (8小时/天)',
        '基础医疗协调',
        '邮件售后跟进',
        '基础机场接送',
        '24/7紧急热线'
      ] : [
        '3-5 days duration',
        'Standard accommodation',
        'Part-time interpreter (8hrs/day)',
        'Basic medical coordination',
        'Email post-care',
        'Basic airport transfer',
        '24/7 emergency hotline'
      ],
      icon: Clock,
      color: 'gray',
      popular: false
    },
    {
      badge: language === 'zh' ? '推荐套餐' : 'RECOMMENDED',
      title: language === 'zh' ? '7-14天高级套餐' : '7-14 Day Premium Package',
      price: language === 'zh' ? '从 ¥24,500 起' : 'From $3,500',
      originalPrice: language === 'zh' ? '原价 ¥35,000' : 'Was $5,000',
      features: language === 'zh' ? [
        '7-14天停留时间',
        '高级住宿',
        '全职翻译 (14小时/天)',
        '高级医疗协调',
        '面对面售后跟进',
        '✓ 餐饮安排',
        '✓ 购物陪同',
        '✓ 文化观光'
      ] : [
        '7-14 days duration',
        'Premium accommodation',
        'Full-time interpreter (14hrs/day)',
        'Premium medical coordination',
        'In-person post-care',
        '✓ Meals included',
        '✓ Shopping assistance',
        '✓ Cultural tours'
      ],
      icon: Building,
      color: 'primary',
      popular: true
    }
  ]

  const commonFeatures = language === 'zh' ? [
    '机场接送 (往返)',
    '24/7紧急支持热线',
    '基础医疗协调',
    '专业翻译服务'
  ] : [
    'Airport transfer',
    '24/7 emergency hotline',
    'Basic medical coordination',
    'Professional translation service'
  ]

  return (
    <section id="packages" className="py-20 bg-gray-50 dark:bg-scc-dark-bg">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl sm:text-5xl font-bold text-gray-900 dark:text-scc-dark-text mb-6 ${language === 'zh' ? 'font-chinese' : 'font-sans'}`}>
            {language === 'zh' ? '套餐对比' : 'Package Comparison'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-scc-dark-text-secondary max-w-3xl mx-auto">
            {language === 'zh' ? '找到最适合您需求的套餐' : 'Find the perfect fit for your needs'}
          </p>
        </div>

        {/* Package Cards and Side Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Basic Package */}
          <div className="lg:col-span-4">
            <Card
              ref={el => { cardsRef.current[0] = el }}
              className={`relative flex flex-col h-[600px] transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[0_0_20px_rgba(44,95,124,0.6)] hover:shadow-[0_0_40px_rgba(44,95,124,0.3)] ${
                visibleCards.includes(0) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } border border-gray-200 shadow-lg`}
              style={{ transitionDelay: '0ms' }}
            >
            <CardHeader className="text-center pb-4">
              <div className="text-sm font-semibold text-gray-600 dark:text-scc-dark-text-secondary mb-2">
                {packages[0].badge}
              </div>
              <CardTitle className={`text-2xl font-bold mb-2 ${language === 'zh' ? 'font-chinese' : 'font-sans'}`}>
                {packages[0].title}
              </CardTitle>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-[#2C5F7C]">
                  {packages[0].price}
                </div>
                <div className="text-sm text-gray-500 dark:text-scc-dark-text-secondary line-through">
                  {packages[0].originalPrice}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4 flex-1">
              {packages[0].features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                    feature.startsWith('✓') 
                      ? 'bg-green-100 text-green-600' 
                      : feature.startsWith('无') || feature.startsWith('No')
                      ? 'bg-red-100 text-red-600'
                      : 'bg-[#2C5F7C] text-white'
                  }`}>
                    {feature.startsWith('✓') ? (
                      <Check className="w-3 h-3" />
                    ) : feature.startsWith('无') || feature.startsWith('No') ? (
                      <span className="text-xs">✗</span>
                    ) : (
                      <Check className="w-3 h-3" />
                    )}
                  </div>
                  <span className={`text-gray-700 dark:text-scc-dark-text hover:text-[#2C5F7C] transition-colors duration-200 cursor-pointer ${language === 'zh' ? 'font-chinese' : 'font-sans'}`}>
                    {feature}
                  </span>
                </div>
              ))}
            </CardContent>
            
            <CardFooter className="pt-6 mt-auto flex justify-center">
              <Button 
                onClick={() => scrollToSection('get-started')}
                className="px-6 py-4 text-base font-semibold transition-all duration-300 bg-[#2C5F7C] hover:bg-[#1F4A5F] text-white shadow-lg hover:shadow-xl border-2 border-[#D4AF37]"
              >
                {language === 'zh' ? '获取报价' : 'Get Quote'}
              </Button>
            </CardFooter>
            </Card>
          </div>

          {/* Premium Package */}
          <div className="lg:col-span-4">
            <Card
              ref={el => { cardsRef.current[1] = el }}
              className={`relative flex flex-col h-[600px] transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[0_0_20px_rgba(44,95,124,0.6)] hover:shadow-[0_0_40px_rgba(44,95,124,0.3)] ${
                visibleCards.includes(1) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } border-2 border-[#D4AF37] shadow-2xl bg-gradient-to-br from-[#2C5F7C]/5 to-[#D4AF37]/5`}
              style={{ transitionDelay: '150ms' }}
            >
            {/* Popular Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
              {packages[1].badge}
            </div>

            <CardHeader className="text-center pb-4">
              <CardTitle className={`text-2xl font-bold mb-2 ${language === 'zh' ? 'font-chinese' : 'font-sans'}`}>
                {packages[1].title}
              </CardTitle>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-[#2C5F7C]">
                  {packages[1].price}
                </div>
                <div className="text-sm text-gray-500 dark:text-scc-dark-text-secondary line-through">
                  {packages[1].originalPrice}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4 flex-1">
              {packages[1].features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                    feature.startsWith('✓') 
                      ? 'bg-green-100 text-green-600' 
                      : feature.startsWith('无') || feature.startsWith('No')
                      ? 'bg-red-100 text-red-600'
                      : 'bg-[#2C5F7C] text-white'
                  }`}>
                    {feature.startsWith('✓') ? (
                      <Check className="w-3 h-3" />
                    ) : feature.startsWith('无') || feature.startsWith('No') ? (
                      <span className="text-xs">✗</span>
                    ) : (
                      <Check className="w-3 h-3" />
                    )}
                  </div>
                    <span className={`text-gray-700 dark:text-scc-dark-text hover:text-[#2C5F7C] transition-colors duration-300 ${language === 'zh' ? 'font-chinese' : 'font-sans'}`}>
                      {feature}
                    </span>
                </div>
              ))}
            </CardContent>
            
            <CardFooter className="pt-6 mt-auto flex justify-center">
              <Button 
                onClick={() => scrollToSection('get-started')}
                className="px-6 py-4 text-base font-semibold transition-all duration-300 bg-[#2C5F7C] hover:bg-[#1F4A5F] text-white shadow-lg hover:shadow-xl border-2 border-[#D4AF37]"
              >
                {language === 'zh' ? '获取报价' : 'Get Quote'}
              </Button>
            </CardFooter>
            </Card>
          </div>

          {/* Side Content - Common Features + Custom Package */}
          <div className="lg:col-span-4">
          <div className="flex flex-col h-[600px]">
            {/* Common Features */}
            <div className="bg-white dark:bg-scc-dark-card rounded-xl p-6 shadow-lg h-[290px] flex flex-col transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[0_0_20px_rgba(44,95,124,0.6)] hover:shadow-[0_0_40px_rgba(44,95,124,0.3)]">
              <h3 className={`text-xl font-bold text-center mb-3 text-gray-900 dark:text-scc-dark-text ${language === 'zh' ? 'font-chinese' : 'font-sans'}`}>
                ✨ {language === 'zh' ? '两个套餐均包含' : 'Both packages include'}
              </h3>
              <div className="space-y-3 flex-1 flex flex-col justify-center">
                {commonFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                    <span className={`text-gray-600 dark:text-scc-dark-text-secondary text-sm leading-relaxed ${language === 'zh' ? 'font-chinese' : 'font-sans'}`}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Spacer */}
            <div className="h-6"></div>

            {/* Custom Package CTA */}
            <div className="bg-gradient-to-br from-[#2C5F7C]/5 to-[#D4AF37]/5 dark:from-scc-dark-card dark:to-scc-dark-card rounded-xl p-6 shadow-lg h-[290px] flex flex-col text-center transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[0_0_20px_rgba(44,95,124,0.6)] hover:shadow-[0_0_40px_rgba(44,95,124,0.3)]">
              <div className="flex-1 flex flex-col justify-center">
                <h3 className={`text-xl font-bold mb-3 text-gray-900 dark:text-scc-dark-text ${language === 'zh' ? 'font-chinese' : 'font-sans'}`}>
                  {language === 'zh' ? '需要定制套餐？' : 'Need a Custom Package?'}
                </h3>
                <p className="text-gray-600 dark:text-scc-dark-text-secondary mb-4 text-sm leading-relaxed">
                  {language === 'zh' 
                    ? '我们有专门的团队为您量身定制最适合的医疗美容套餐' 
                    : 'Our dedicated team will create a personalized medical & beauty package just for you'
                  }
                </p>
              </div>
              <div className="mt-auto">
                <Button 
                  onClick={() => scrollToSection('get-started')}
                  className="px-6 py-4 text-base font-semibold bg-[#2C5F7C] hover:bg-[#1F4A5F] text-white shadow-lg hover:shadow-xl inline-flex items-center justify-center transition-all duration-300 border-2 border-[#D4AF37]"
                >
                  {language === 'zh' ? '定制套餐' : 'Customize It'}
                </Button>
              </div>
            </div>
          </div>
          </div>
        </div>

      </div>
    </section>
  )
}