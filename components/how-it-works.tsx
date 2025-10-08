"use client"

import { MessageSquare, Calendar, CheckCircle, CreditCard } from "lucide-react"
import { ArrowRight } from "lucide-react"
import { useSCCStore } from "@/lib/store/sccStore"

export function HowItWorks() {
  const { language } = useSCCStore()

  const steps = [
    {
      number: "1",
      icon: MessageSquare,
      title: language === 'zh' ? '联系我们' : 'Contact Us',
      items: [
        language === 'zh' ? '填写咨询表或直接联系我们' : 'Fill out inquiry form or contact us directly',
        language === 'zh' ? '讨论您的需求和偏好' : 'Discuss your needs and preferences',
        language === 'zh' ? '获得个性化行程安排' : 'Receive personalized itinerary',
      ],
    },
    {
      number: "2",
      icon: Calendar,
      title: language === 'zh' ? '定制报价' : 'Custom Quote',
      items: [
        language === 'zh' ? '详细的费用明细' : 'Detailed cost breakdown',
        language === 'zh' ? '透明定价，无隐藏费用' : 'Transparent pricing, no hidden fees',
        language === 'zh' ? '根据需要审核和调整' : 'Review and adjust as needed',
      ],
    },
    {
      number: "3",
      icon: CheckCircle,
      title: language === 'zh' ? '确认预订' : 'Confirm Booking',
      items: [
        language === 'zh' ? '批准最终报价' : 'Approve final quote',
        language === 'zh' ? '简单的预订协议' : 'Simple booking agreement',
        language === 'zh' ? '支付定金以确保日期' : 'Pay deposit to secure dates',
      ],
    },
    {
      number: "4",
      icon: CreditCard,
      title: language === 'zh' ? '灵活支付' : 'Flexible Payment',
      intro: language === 'zh' ? '我们接受多种支付方式：' : 'We accept multiple payment methods:',
      items: [
        language === 'zh' ? '微信支付（中国客户）' : 'WeChat Pay (for Chinese clients)',
        language === 'zh' ? '支付宝' : 'Alipay',
        language === 'zh' ? 'PayPal（国际）' : 'PayPal (international)',
        language === 'zh' ? '银行转账' : 'Bank Transfer',
      ],
    },
  ]

  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-4">
            {language === 'zh' ? '开始您的韩国之旅' : 'Start Your Korean Journey'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'zh' ? '只需四步，轻松开启您的专属韩国医疗美容之旅' : 'Just four simple steps to your personalized Korean medical & beauty experience'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center">
                {/* Number Badge */}
                <div className="w-16 h-16 rounded-full bg-scc-primary text-white flex items-center justify-center text-2xl font-bold mb-4">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-scc-accent/10 flex items-center justify-center mb-4">
                  <step.icon className="w-7 h-7 text-scc-accent" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-serif font-semibold mb-3">{step.title}</h3>
                <div className="text-gray-600 leading-relaxed text-sm space-y-1">
                  {step.intro && <p className="font-medium mb-2">{step.intro}</p>}
                  {step.items.map((item, idx) => (
                    <p key={idx}>{item}</p>
                  ))}
                </div>
              </div>

              {/* Arrow (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 -right-4 text-scc-primary/30">
                  <ArrowRight className="w-8 h-8" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
