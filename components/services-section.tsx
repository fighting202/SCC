"use client"

import { Stethoscope, Sparkles, HeartHandshake } from "lucide-react"
import { useSCCStore } from "@/lib/store/sccStore"

export function ServicesSection() {
  const { language } = useSCCStore()

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
    },
    {
      icon: Sparkles,
      title: language === 'zh' ? '美容服务' : 'Beauty Services',
      items: language === 'zh' 
        ? ["K-Beauty护肤", "美发造型", "SPA养生"]
        : ["K-Beauty Skincare", "Hair & Makeup", "Spa & Wellness"],
      description: language === 'zh' 
        ? "在专业指导下体验正宗的韩国美容护理"
        : "Experience authentic Korean beauty treatments with professional guidance",
    },
    {
      icon: HeartHandshake,
      title: language === 'zh' ? '全程支持' : 'Complete Support',
      items: language === 'zh' 
        ? ["机场接送", "住宿预订", "翻译陪同", "餐厅推荐", "紧急协助"]
        : ["Airport Transfer", "Accommodation Booking", "Interpreter Service", "Restaurant Recommendations", "Emergency Assistance"],
      description: language === 'zh' 
        ? "从您抵达的那一刻到离开，我们始终陪伴左右"
        : "From the moment you land to the day you leave, we're with you",
    },
  ]

  return (
    <section id="services" className="py-20 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-4">
            {language === 'zh' ? '我们的服务' : 'Our Services'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'zh' ? '为您量身定制的全方位护理' : 'Comprehensive care tailored to your needs'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 rounded-full bg-scc-accent/10 flex items-center justify-center mb-6">
                <service.icon className="w-8 h-8 text-scc-accent" />
              </div>
              <h3 className="text-2xl font-serif font-semibold mb-4">{service.title}</h3>
              <ul className="space-y-2 mb-6">
                {service.items.map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-scc-primary mr-2">•</span>
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
