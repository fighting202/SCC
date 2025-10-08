"use client"

import { MessageCircle, FileText, CheckCircle, CreditCard } from "lucide-react"
import { useSCCStore } from "@/lib/store/sccStore"

export default function PaymentBookingSection() {
  const { language } = useSCCStore()

  const steps = [
    {
      icon: MessageCircle,
      title: language === 'zh' ? '免费咨询' : 'FREE CONSULTATION',
      subtitle: language === 'zh' ? '💬 第一步' : '💬 Step 1',
      features: language === 'zh' 
        ? [
            "提交咨询表或直接联系我们",
            "讨论您的需求和偏好",
            "获得个性化行程安排",
            "无义务，完全免费",
          ]
        : [
            "Submit inquiry or contact us directly",
            "Discuss your needs and preferences",
            "Receive personalized itinerary",
            "No obligation, completely free",
          ],
    },
    {
      icon: FileText,
      title: language === 'zh' ? '定制报价' : 'CUSTOMIZED QUOTE',
      subtitle: language === 'zh' ? '📋 第二步' : '📋 Step 2',
      features: language === 'zh' 
        ? [
            "详细的费用明细",
            "透明定价，无隐藏费用",
            "根据需要审核和调整",
            "随时提问",
          ]
        : [
            "Detailed breakdown of all costs",
            "Transparent pricing, no hidden fees",
            "Review and adjust as needed",
            "Ask any questions",
          ],
    },
    {
      icon: CheckCircle,
      title: language === 'zh' ? '确认预订' : 'CONFIRM & RESERVE',
      subtitle: language === 'zh' ? '✓ 第三步' : '✓ Step 3',
      features: language === 'zh' 
        ? [
            "批准最终报价",
            "简单的预订协议",
            "支付定金以确保日期",
            "收到确认",
          ]
        : [
            "Approve final quote",
            "Simple booking agreement",
            "Deposit payment to secure dates",
            "Receive confirmation",
          ],
    },
    {
      icon: CreditCard,
      title: language === 'zh' ? '灵活支付' : 'FLEXIBLE PAYMENT',
      subtitle: language === 'zh' ? '💳 第四步' : '💳 Step 4',
      features: language === 'zh' 
        ? [
            "💚 微信支付（中国客户）",
            "💙 PayPal（国际）",
            "🏦 银行转账",
            "💛 支付宝",
          ]
        : [
            "💚 WeChat Pay | 微信支付 (Chinese clients)",
            "💙 PayPal (International)",
            "🏦 Bank Transfer",
            "💛 Alipay | 支付宝",
          ],
    },
  ]

  return (
    <section id="payment" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-[#2C3E50] mb-4">
            {language === 'zh' ? '预订与支付流程' : 'How Booking & Payment Works'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {language === 'zh' ? '简单、透明、安全' : 'Simple, transparent, and secure process'}
          </p>
        </div>

        {/* Four Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="bg-[#F8F9FA] rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-center w-16 h-16 bg-[#2C5F7C] rounded-full mb-4 mx-auto">
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-[#D4AF37] font-semibold text-center mb-2">{step.subtitle}</p>
              <h3 className="text-xl font-bold text-center mb-4">{step.title}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {step.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Payment Terms Box */}
        <div className="max-w-4xl mx-auto bg-[#F8F9FA] border-2 border-[#2C5F7C] rounded-xl p-8">
          <h3 className="text-2xl font-bold text-[#2C3E50] mb-6 text-center">
            {language === 'zh' ? '付款条款' : 'Payment Terms'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-gray-700">
                <strong>{language === 'zh' ? '定金：' : 'Deposit:'}</strong> {language === 'zh' ? '预订确认时支付30%' : '30% upon booking confirmation'}
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <strong>{language === 'zh' ? '余款：' : 'Balance:'}</strong> {language === 'zh' ? '服务开始前支付' : 'Before service begins'}
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <strong>{language === 'zh' ? '付款链接：' : 'Payment links:'}</strong> {language === 'zh' ? '报价批准后发送' : 'Sent after quote approval'}
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <strong>{language === 'zh' ? '退款政策：' : 'Refund policy:'}</strong> {language === 'zh' ? '协议中明确' : 'Outlined in agreement'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border-l-4 border-[#10B981]">
            <p className="text-sm text-gray-700">
              <strong className="text-[#2C5F7C]">🔒 {language === 'zh' ? '安全提示：' : 'Security Note:'}</strong> 
              {language === 'zh' 
                ? '所有交易均有收据和协议记录。我们从不自动扣费 - 一切都需要您的确认。'
                : 'All transactions are documented with receipts and agreements. We never process automatic charges - everything is confirmed with you first.'
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
