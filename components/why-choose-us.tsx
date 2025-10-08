"use client"

import { Plane, Building2, MessageCircle, UserCheck } from "lucide-react"
import { useSCCStore } from "@/lib/store/sccStore"

export function WhyChooseUs() {
  const { language } = useSCCStore()

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
        ? "我们为您对接韩国经过认证的医疗机构和美容中心"
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
        ? "一位专属协调员全程陪伴您在韩国的整个旅程"
        : "One dedicated coordinator guides you through your entire journey",
    },
  ]

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-4">
            {language === 'zh' ? '为什么选择我们' : 'Why Choose Us'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'zh' ? '您的舒适与安全是我们的首要任务' : 'Your comfort and safety are our top priorities'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow border border-[#e5e7eb]"
            >
              <div className="w-14 h-14 rounded-full bg-scc-primary/10 flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-scc-primary" />
              </div>
              <h3 className="text-2xl font-serif font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
