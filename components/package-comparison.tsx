"use client"

import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"
import { useSCCStore } from "@/lib/store/sccStore"

const comparisonFeatures = [
  {
    feature: { en: "Duration", zh: "持续时间" },
    basic: { en: "3 days", zh: "3天" },
    premium: { en: "7 days", zh: "7天" }
  },
  {
    feature: { en: "Airport Pickup", zh: "机场接送" },
    basic: true,
    premium: true
  },
  {
    feature: { en: "Accommodation", zh: "住宿" },
    basic: { en: "2 nights hotel", zh: "2晚酒店" },
    premium: { en: "6 nights 4-star hotel", zh: "6晚四星级酒店" }
  },
  {
    feature: { en: "Interpreter Service", zh: "翻译服务" },
    basic: { en: "Basic support", zh: "基础支持" },
    premium: { en: "Full-time personal interpreter", zh: "全职私人翻译" }
  },
  {
    feature: { en: "Meal Management", zh: "餐饮管理" },
    basic: false,
    premium: { en: "Daily meal arrangements", zh: "每日餐饮安排" }
  },
  {
    feature: { en: "Medical Coordination", zh: "医疗协调" },
    basic: { en: "Basic consultation", zh: "基础咨询" },
    premium: { en: "Full medical coordination", zh: "全程医疗协调" }
  },
  {
    feature: { en: "Tours & Activities", zh: "旅游活动" },
    basic: false,
    premium: { en: "Curated experiences", zh: "精选体验" }
  },
  {
    feature: { en: "24/7 Support", zh: "24/7支持" },
    basic: true,
    premium: true
  },
  {
    feature: { en: "Shopping Guide", zh: "购物指南" },
    basic: false,
    premium: true
  },
  {
    feature: { en: "Visa Support", zh: "签证支持" },
    basic: false,
    premium: true
  },
  {
    feature: { en: "Post-Care Follow-up", zh: "术后跟进" },
    basic: { en: "Basic follow-up", zh: "基础跟进" },
    premium: { en: "Comprehensive follow-up", zh: "全面跟进" }
  },
  {
    feature: { en: "Medical Travel Insurance", zh: "医疗旅行保险" },
    basic: false,
    premium: true
  }
]

export default function PackageComparison() {
  const { language } = useSCCStore()

  const scrollToContact = () => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 mb-4">
            {language === 'zh' ? '套餐比较' : 'Package Comparison'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'zh' ? '找到最适合您需求的套餐' : 'Find the perfect fit for your needs'}
          </p>
        </div>

            <div className="max-w-6xl mx-auto">
              {/* Package Comparison Cards - Mobile Stacked */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-12">
            {/* Basic Package */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  {language === 'zh' ? '基础套餐' : 'Basic Package'}
                </h3>
                <div className="text-2xl sm:text-3xl font-bold text-scc-primary mb-2">
                  $1,200 - $1,800
                </div>
                <p className="text-sm sm:text-base text-gray-600">
                  {language === 'zh' ? '3天基础服务' : '3 days basic service'}
                </p>
              </div>
              
              <div className="space-y-4">
                {comparisonFeatures.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-sm font-medium text-gray-700">
                      {language === 'zh' ? item.feature.zh : item.feature.en}
                    </span>
                    <div className="flex items-center">
                      {typeof item.basic === 'boolean' ? (
                        item.basic ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <X className="w-5 h-5 text-red-500" />
                        )
                      ) : (
                        <span className="text-sm text-gray-600">
                          {language === 'zh' ? item.basic.zh : item.basic.en}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Package */}
            <div className="bg-white rounded-xl shadow-lg border-2 border-scc-primary p-6 sm:p-8 relative">
              <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-scc-primary text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  {language === 'zh' ? '推荐' : 'Recommended'}
                </span>
              </div>
              
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  {language === 'zh' ? '高级套餐' : 'Premium Package'}
                </h3>
                <div className="text-2xl sm:text-3xl font-bold text-scc-primary mb-2">
                  $3,500 - $5,000
                </div>
                <p className="text-sm sm:text-base text-gray-600">
                  {language === 'zh' ? '7天全面服务' : '7 days comprehensive service'}
                </p>
              </div>
              
              <div className="space-y-4">
                {comparisonFeatures.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-sm font-medium text-gray-700">
                      {language === 'zh' ? item.feature.zh : item.feature.en}
                    </span>
                    <div className="flex items-center">
                      {typeof item.premium === 'boolean' ? (
                        item.premium ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <X className="w-5 h-5 text-red-500" />
                        )
                      ) : (
                        <span className="text-sm text-gray-600">
                          {language === 'zh' ? item.premium.zh : item.premium.en}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

              {/* CTA Button */}
              <div className="text-center">
                <Button
                  onClick={scrollToContact}
                  className="w-full sm:w-auto bg-scc-primary hover:bg-scc-primary/90 text-white px-6 sm:px-8 py-4 text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all min-h-[56px]"
                >
                  {language === 'zh' ? '定制您的套餐' : 'Customize Your Package'}
                </Button>
              </div>
        </div>
      </div>
    </section>
  )
}