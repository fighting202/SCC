"use client"

import { Shield, DollarSign, Clock, Star } from "lucide-react"
import { useSCCStore } from "@/lib/store/sccStore"

export function CommitmentSection() {
  const { language } = useSCCStore()

  const commitments = [
    {
      icon: Shield,
      title: language === 'zh' ? '仅与认证合作伙伴合作' : 'Verified Partners Only',
      description: language === 'zh' 
        ? '我们只与获得国际认证的医疗机构和知名美容中心合作。'
        : 'We only work with licensed, internationally accredited medical facilities and established beauty centers.'
    },
    {
      icon: DollarSign,
      title: language === 'zh' ? '无隐藏费用' : 'No Hidden Costs',
      description: language === 'zh'
        ? '所有费用都提前说明。在确认任何服务之前，您将收到详细的报价。'
        : 'Every expense is explained upfront. You\'ll receive a detailed quote before confirming any services.'
    },
    {
      icon: Clock,
      title: language === 'zh' ? '24/7紧急热线' : '24/7 Emergency Line',
      description: language === 'zh'
        ? '您的专属护理经理通过WhatsApp全天候为您服务，无论白天还是夜晚。'
        : 'Your dedicated care manager is available via WhatsApp any time, day or night, throughout your stay.'
    }
  ]

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-scc-primary/5 to-scc-accent/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-4">
            {language === 'zh' ? '我们对您的承诺' : 'Our Commitment to You'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'zh' ? '通过透明度和关怀建立信任' : 'Building trust through transparency and care'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {commitments.map((commitment, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="w-16 h-16 rounded-full bg-scc-primary/10 flex items-center justify-center mb-6">
                <commitment.icon className="w-8 h-8 text-scc-primary" />
              </div>
              <h3 className="text-xl font-serif font-semibold mb-4 text-gray-900">
                {commitment.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {commitment.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button 
            onClick={() => {
              const contactSection = document.getElementById('contact')
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            className="inline-flex items-center justify-center px-8 py-4 bg-scc-primary hover:bg-scc-primary/90 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
          >
            {language === 'zh' ? '开始使用' : 'Get Started'}
          </button>
        </div>
      </div>
    </section>
  )
}
