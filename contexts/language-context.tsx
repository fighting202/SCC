"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "zh"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Load saved language preference from localStorage
    const savedLanguage = localStorage.getItem("scc-language") as Language
    if (savedLanguage === "en" || savedLanguage === "zh") {
      setLanguageState(savedLanguage)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (isClient) {
      localStorage.setItem("scc-language", lang)
    }
  }

  const t = (key: string) => {
    return translations[language]?.[key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className={`transition-opacity duration-300 ${isClient ? "opacity-100" : "opacity-0"}`}>{children}</div>
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    "header.brand": "Seoul Care Concierge",
    "header.tagline": "Your Personal Care Companion in Korea",
    "header.home": "Home",
    "header.services": "Services",
    "header.howItWorks": "How It Works",
    "header.payment": "Payment",
    "header.pricing": "Pricing",
    "header.contact": "Contact",
    "header.getStarted": "Get Started",

    // Hero
    "hero.headline": "Your Safe & Seamless Journey in Korea",
    "hero.subheadline": "Medical & Beauty care with full support — from airport to departure",
    "hero.ctaPrimary": "Get Free Consultation",
    "hero.ctaSecondary": "Request Quote",
    "hero.badge1": "24/7 WhatsApp Support",
    "hero.badge2": "English & 中文 Available",
    "hero.badge3": "Verified Medical Partners",
    "hero.scrollText": "Scroll to explore",

    // Why Choose Us
    "why.title": "Why Choose Us",
    "why.subtitle": "Your comfort and safety are our top priorities",
    "why.card1.title": "All-in-One Service",
    "why.card1.desc":
      "From airport pickup, accommodation, dining recommendations to translation support — we handle everything",
    "why.card2.title": "Trusted Network",
    "why.card2.desc": "We connect you with certified medical facilities and beauty centers in Korea",
    "why.card3.title": "Speak Your Language, Feel at Home",
    "why.card3.desc": "Full Chinese language support throughout your journey in Korea",
    "why.card4.title": "Dedicated Account Manager",
    "why.card4.desc": "One dedicated coordinator accompanies you throughout your entire stay in Korea",

    // Services
    "services.title": "Our Services",
    "services.subtitle": "Comprehensive care tailored to your needs",
    "services.medical.title": "Medical Services",
    "services.medical.item1": "Plastic Surgery",
    "services.medical.item2": "Dermatology",
    "services.medical.item3": "Dental Care",
    "services.medical.item4": "Korean Medicine",
    "services.medical.desc": "We connect you with top medical facilities in Korea for personalized medical care",
    "services.beauty.title": "Beauty Services",
    "services.beauty.item1": "K-Beauty Skincare",
    "services.beauty.item2": "Hair & Styling",
    "services.beauty.item3": "Spa & Wellness",
    "services.beauty.desc": "Experience authentic Korean beauty treatments with professional guidance",
    "services.support.title": "Complete Support",
    "services.support.item1": "Airport Transfer",
    "services.support.item2": "Accommodation Booking",
    "services.support.item3": "Translation & Escort",
    "services.support.item4": "Restaurant Recommendations",
    "services.support.item5": "Emergency Assistance",
    "services.support.desc": "From the moment you arrive until you depart, we're with you every step",

    // How It Works
    "howItWorks.title": "Booking Process",
    "howItWorks.subtitle": "Simple, transparent, and secure in four steps",
    "howItWorks.step1.title": "Contact Us",
    "howItWorks.step1.item1": "Fill out inquiry form or contact us directly",
    "howItWorks.step1.item2": "Discuss your needs and preferences",
    "howItWorks.step1.item3": "Receive personalized itinerary",
    "howItWorks.step2.title": "Custom Quote",
    "howItWorks.step2.item1": "Detailed cost breakdown",
    "howItWorks.step2.item2": "Transparent pricing, no hidden fees",
    "howItWorks.step2.item3": "Review and adjust as needed",
    "howItWorks.step3.title": "Confirm Booking",
    "howItWorks.step3.item1": "Approve final quote",
    "howItWorks.step3.item2": "Simple booking agreement",
    "howItWorks.step3.item3": "Pay deposit to secure dates",
    "howItWorks.step4.title": "Flexible Payment",
    "howItWorks.step4.intro": "We accept multiple payment methods:",
    "howItWorks.step4.item1": "WeChat Pay (for Chinese clients)",
    "howItWorks.step4.item2": "Alipay",
    "howItWorks.step4.item3": "PayPal (international)",
    "howItWorks.step4.item4": "Bank Transfer",

    // Payment & Booking
    "payment.title": "Booking & Payment Process",
    "payment.subtitle": "Simple, transparent, and secure",
    "payment.step1": "Free Consultation",
    "payment.step2": "Custom Quote",
    "payment.step3": "Confirm Booking",
    "payment.step4": "Flexible Payment",
    "payment.terms.title": "Payment Terms",
    "payment.terms.item1": "Deposit: 30% upon booking confirmation",
    "payment.terms.item2": "Balance: Before service begins",
    "payment.terms.item3": "Payment link sent after quote approval",
    "payment.terms.item4": "Refund policy outlined in agreement",
    "payment.security": "🔒 Security Note",
    "payment.securityText":
      "All transactions are documented with receipts and agreements. We never auto-charge — everything requires your confirmation.",

    // Pricing
    "pricing.title": "Sample Packages",
    "pricing.subtitle": "Flexible pricing based on your needs",
    "pricing.note": "💡 Sample Packages - All services are fully customizable",
    "pricing.basic.badge": "Great Value",
    "pricing.basic.title": "3-Day Basic Package",
    "pricing.basic.price": "From $1,200",
    "pricing.basic.item1": "✓ Airport transfer (round-trip)",
    "pricing.basic.item2": "✓ 2 nights hotel accommodation",
    "pricing.basic.item3": "✓ Basic translation support",
    "pricing.basic.item4": "✓ Restaurant recommendations",
    "pricing.basic.item5": "✓ 24/7 emergency contact",
    "pricing.basic.cta": "Request Quote",
    "pricing.premium.badge": "Most Popular",
    "pricing.premium.title": "7-Day Premium Package",
    "pricing.premium.price": "From $3,500",
    "pricing.premium.item1": "✓ Airport transfer (round-trip)",
    "pricing.premium.item2": "✓ 6 nights 4-star hotel",
    "pricing.premium.item3": "✓ Full-time personal translator",
    "pricing.premium.item4": "✓ Daily meal arrangements",
    "pricing.premium.item5": "✓ Post-procedure follow-up support",
    "pricing.premium.item6": "✓ 24/7 emergency contact",
    "pricing.premium.cta": "Request Quote",
    "pricing.disclaimer":
      "⚠️ Important: Medical and beauty procedure costs are separate and paid directly to medical facilities. Our fees cover only concierge services (transport, accommodation, translation, coordination, etc.).",

    // Contact
    "contact.title": "Get Started | Contact Us",
    "contact.subtitle": "Your journey begins with a simple consultation",
    "contact.form.heading": "Submit Details for Personalized Quote",
    "contact.form.subheading": "Fill this form for the most accurate consultation",
    "contact.form.name": "Full Name",
    "contact.form.namePlaceholder": "Your full name",
    "contact.form.email": "Email Address",
    "contact.form.emailPlaceholder": "your.email@example.com",
    "contact.form.phone": "Phone/WhatsApp Number",
    "contact.form.phonePlaceholder": "+1 234 567 8900",
    "contact.form.nationality": "Nationality",
    "contact.form.nationalityPlaceholder": "e.g., USA, China, Singapore",
    "contact.form.contactMethod": "Preferred Contact Method",
    "contact.form.contactMethodOption1": "WeChat (recommended for Chinese clients)",
    "contact.form.contactMethodOption2": "WhatsApp (international clients)",
    "contact.form.contactMethodOption3": "Email",
    "contact.form.contactMethodOption4": "Any method works",
    "contact.form.serviceInterest": "Service Interest",
    "contact.form.serviceInterestOption1": "Medical Services",
    "contact.form.serviceInterestOption2": "Beauty Services",
    "contact.form.serviceInterestOption3": "Both Medical & Beauty",
    "contact.form.serviceInterestOption4": "Just exploring options",
    "contact.form.travelDate": "Expected Travel Date",
    "contact.form.travelDatePlaceholder": "Select your arrival date",
    "contact.form.budget": "Approximate Budget",
    "contact.form.budgetOption1": "Under $2,000",
    "contact.form.budgetOption2": "$2,000 - $5,000",
    "contact.form.budgetOption3": "$5,000 - $10,000",
    "contact.form.budgetOption4": "Over $10,000",
    "contact.form.budgetOption5": "Prefer to discuss",
    "contact.form.message": "Additional Details",
    "contact.form.messagePlaceholder": "Tell us about your specific needs, medical concerns, or any questions...",
    "contact.form.submit": "Submit Inquiry",
    "contact.form.success": "✓ Thank you! We'll respond within 24 hours via your preferred method.",
    "contact.form.required": "Required",
    "contact.form.optional": "Optional",
    "contact.direct.heading": "Or Contact Us Directly",
    "contact.direct.subheading": "For quick questions or follow-up after submitting form",
    "contact.direct.notice":
      "⚠️ For detailed quotes, please fill out the inquiry form first. Direct messages without form submission may experience delayed responses.",
    "contact.wechat.button": "Add on WeChat",
    "contact.wechat.id": "WeChat ID: SeoulCareConcierge",
    "contact.wechat.instruction": "Search ID in WeChat",
    "contact.wechat.badge": "For Chinese clients",
    "contact.wechat.note": "Please introduce yourself briefly when adding",
    "contact.whatsapp.button": "Message on WhatsApp",
    "contact.whatsapp.number": "+82-10-2981-6653",
    "contact.whatsapp.badge": "For international clients",
    "contact.email.button": "Send Email",
    "contact.email.address": "seoulcareconcierge@gmail.com",

    // Our Commitment
    "commitment.title": "Our Commitment to You",
    "commitment.subtitle": "Building trust through transparency and care",
    "commitment.card1.title": "🏥 Certified Partners Only",
    "commitment.card1.desc":
      "We only connect you with licensed, internationally accredited medical facilities and reputable beauty centers in Korea.",
    "commitment.card2.title": "💰 No Hidden Fees",
    "commitment.card2.desc":
      "All costs are outlined upfront in your detailed quote. You'll know exactly what you're paying for before confirming any service.",
    "commitment.card3.title": "🆘 24/7 Emergency Support",
    "commitment.card3.desc":
      "Your dedicated account manager is available around the clock via WhatsApp and WeChat throughout your entire stay in Korea.",
    "commitment.bottom": "Your success story could be here. Be one of our first satisfied clients.",
    "commitment.cta": "Get Started",

    // FAQ
    "faq.title": "Frequently Asked Questions",
    "faq.subtitle": "Everything you might want to know",
    "faq.q1": "Do you work with specific hospitals and clinics?",
    "faq.a1":
      "We connect you with licensed, accredited medical facilities in Korea based on your specific needs. We can recommend and arrange appointments at top hospitals and clinics in Korea.",
    "faq.q2": "What languages do you support?",
    "faq.a2":
      "We provide full support in Chinese and English throughout your journey. We can also arrange translation for other languages if needed.",
    "faq.q3": "How do I pay for your services?",
    "faq.a3":
      "We accept multiple international payment methods including WeChat Pay, Alipay, PayPal, bank transfer, or credit card. Payment terms will be clearly outlined in your personalized quote.",
    "faq.q4": "Can I change my itinerary after booking?",
    "faq.a4":
      "Yes, we understand plans can change. We offer flexible itinerary adjustments. Depending on timing and availability, changes may affect pricing.",
    "faq.q5": "What if I need emergency help while in Korea?",
    "faq.a5":
      "We provide 24/7 emergency contact support. Your dedicated account manager will be available by phone and WeChat throughout your entire trip.",
    "faq.q6": "How far in advance should I book?",
    "faq.a6":
      "We recommend booking at least 2-4 weeks in advance to ensure availability for accommodation and medical appointments. However, we can accommodate shorter notice when possible.",
    "faq.q7": "Why do I need to fill out a form? Can't I just message directly?",
    "faq.a7":
      "The inquiry form helps us prepare accurate, personalized advice for you. It saves time and ensures we understand your specific needs. After submitting, you can contact us directly for quick follow-ups.",
    "faq.q8": "Will I get spam if I share my contact information?",
    "faq.a8":
      "Absolutely not. Your information is used solely for consultation and service delivery. We never share your details with third parties or send marketing messages without permission.",
    "faq.q9": "Is there a fee for consultation?",
    "faq.a9":
      "No, initial consultation and quote preparation are completely free. You only pay if you decide to book our services.",
    "faq.q10": "Do I need to pay online immediately?",
    "faq.a10":
      "No. Payment is arranged after you approve the detailed quote through consultation. We provide secure payment links (WeChat Pay, Alipay, PayPal, or bank transfer) with clear documentation. No auto-charges.",

    // Footer
    "footer.brand": "Seoul Care Concierge",
    "footer.tagline": "Making Korea accessible, one client at a time",
    "footer.description": "Your Personal Care Companion in Korea",
    "footer.quickLinks": "Quick Links",
    "footer.services": "Services",
    "footer.howItWorks": "How It Works",
    "footer.pricing": "Pricing",
    "footer.payment": "Payment Process",
    "footer.contact": "Contact Us",
    "footer.faq": "FAQ",
    "footer.contactInfo": "Contact Information",
    "footer.email": "Email: seoulcareconcierge@gmail.com",
    "footer.whatsapp": "WhatsApp: +82-10-2981-6653",
    "footer.wechat": "WeChat ID: SeoulCareConcierge",
    "footer.hours": "Business Hours: Mon-Fri 9AM-6PM KST | Sat 10AM-4PM KST",
    "footer.emergency": "Emergency Support: 24/7 via WhatsApp & WeChat",
    "footer.social": "Follow Us on Social Media (Coming Soon)",
    "footer.copyright": "© 2025 Seoul Care Concierge. All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
  },
  zh: {
    // Header
    "header.brand": "Seoul Care Concierge",
    "header.tagline": "您的韩国医疗美容贴心管家",
    "header.home": "首页",
    "header.services": "服务",
    "header.howItWorks": "流程",
    "header.payment": "支付",
    "header.pricing": "价格",
    "header.contact": "联系我们",
    "header.getStarted": "立即开始",

    // Hero
    "hero.headline": "您在韩国的安全无忧之旅",
    "hero.subheadline": "从机场接机到全程陪护，医疗美容一站式服务",
    "hero.ctaPrimary": "免费咨询",
    "hero.ctaSecondary": "了解服务",
    "hero.badge1": "24/7 WhatsApp支持",
    "hero.badge2": "中英文服务",
    "hero.badge3": "认证医疗合作伙伴",
    "hero.scrollText": "向下滚动探索",

    // Why Choose Us
    "why.title": "为什么选择我们",
    "why.subtitle": "您的舒适与安全是我们的首要任务",
    "why.card1.title": "一站式服务",
    "why.card1.desc": "从机场接机、住宿安排、餐饮推荐到翻译陪同，一切为您安排妥当",
    "why.card2.title": "可信赖的网络",
    "why.card2.desc": "我们为您对接韩国经过认证的医疗机构和美容中心",
    "why.card3.title": "母语沟通，安心无忧",
    "why.card3.desc": "全程中文服务支持，让您在韩国感受如家般的便利",
    "why.card4.title": "专属客户经理",
    "why.card4.desc": "一位专属协调员全程陪伴您在韩国的整个旅程",

    // Services
    "services.title": "我们的服务",
    "services.subtitle": "为您量身定制的全方位护理",
    "services.medical.title": "医疗服务",
    "services.medical.item1": "整形手术",
    "services.medical.item2": "皮肤科",
    "services.medical.item3": "口腔护理",
    "services.medical.item4": "韩方医学",
    "services.medical.desc": "我们为您推荐韩国顶尖医疗机构，量身定制医疗方案",
    "services.beauty.title": "美容服务",
    "services.beauty.item1": "K-Beauty护肤",
    "services.beauty.item2": "美发造型",
    "services.beauty.item3": "SPA养生",
    "services.beauty.desc": "在专业指导下体验正宗的韩国美容护理",
    "services.support.title": "全程支持",
    "services.support.item1": "机场接送",
    "services.support.item2": "住宿预订",
    "services.support.item3": "翻译陪同",
    "services.support.item4": "餐厅推荐",
    "services.support.item5": "紧急协助",
    "services.support.desc": "从您抵达的那一刻到离开，我们始终陪伴左右",

    // How It Works
    "howItWorks.title": "预订流程",
    "howItWorks.subtitle": "简单、透明、安全的四步流程",
    "howItWorks.step1.title": "联系我们",
    "howItWorks.step1.item1": "填写咨询表或直接联系我们",
    "howItWorks.step1.item2": "讨论您的需求和偏好",
    "howItWorks.step1.item3": "获得个性化行程安排",
    "howItWorks.step2.title": "定制报价",
    "howItWorks.step2.item1": "详细的费用明细",
    "howItWorks.step2.item2": "透明定价，无隐藏费用",
    "howItWorks.step2.item3": "根据需要审核和调整",
    "howItWorks.step3.title": "确认预订",
    "howItWorks.step3.item1": "批准最终报价",
    "howItWorks.step3.item2": "简单的预订协议",
    "howItWorks.step3.item3": "支付定金以确保日期",
    "howItWorks.step4.title": "灵活支付",
    "howItWorks.step4.intro": "我们接受多种支付方式：",
    "howItWorks.step4.item1": "微信支付（中国客户）",
    "howItWorks.step4.item2": "支付宝",
    "howItWorks.step4.item3": "PayPal（国际）",
    "howItWorks.step4.item4": "银行转账",

    // Payment & Booking
    "payment.title": "预订与支付流程",
    "payment.subtitle": "简单、透明、安全",
    "payment.step1": "免费咨询",
    "payment.step2": "定制报价",
    "payment.step3": "确认预订",
    "payment.step4": "灵活支付",
    "payment.terms.title": "付款条款",
    "payment.terms.item1": "定金：预订确认时支付30%",
    "payment.terms.item2": "余款：服务开始前支付",
    "payment.terms.item3": "报价批准后发送付款链接",
    "payment.terms.item4": "协议中明确退款政策",
    "payment.security": "🔒 安全提示",
    "payment.securityText": "所有交易均有收据和协议记录。我们从不自动扣费 - 一切都需要您的确认。",

    // Pricing
    "pricing.title": "套餐示例",
    "pricing.subtitle": "根据您的需求灵活定价",
    "pricing.note": "💡 示例套餐 - 所有服务均可完全定制",
    "pricing.basic.badge": "超值选择",
    "pricing.basic.title": "3天基础套餐",
    "pricing.basic.price": "起价 $1,200 (约 ¥8,500)",
    "pricing.basic.item1": "✓ 机场接送（往返）",
    "pricing.basic.item2": "✓ 2晚酒店住宿",
    "pricing.basic.item3": "✓ 基础翻译支持",
    "pricing.basic.item4": "✓ 餐厅推荐",
    "pricing.basic.item5": "✓ 24/7紧急联系",
    "pricing.basic.cta": "申请报价",
    "pricing.premium.badge": "最受欢迎",
    "pricing.premium.title": "7天高级套餐",
    "pricing.premium.price": "起价 $3,500 (约 ¥25,000)",
    "pricing.premium.item1": "✓ 机场接送（往返）",
    "pricing.premium.item2": "✓ 6晚四星级酒店",
    "pricing.premium.item3": "✓ 全职私人翻译",
    "pricing.premium.item4": "✓ 每日餐饮安排",
    "pricing.premium.item5": "✓ 术后跟进支持",
    "pricing.premium.item6": "✓ 24/7紧急联系",
    "pricing.premium.cta": "申请报价",
    "pricing.disclaimer":
      "⚠️ 重要提示：医疗和美容项目费用需另付，直接支付给医疗机构。我们的费用仅包含管家服务（接送、住宿、翻译、协调等）。",

    // Contact
    "contact.title": "立即开始 | 联系我们",
    "contact.subtitle": "您的旅程从简单的咨询开始",
    "contact.form.heading": "提交详细信息获取个性化报价",
    "contact.form.subheading": "填写此表格以获得最准确的咨询",
    "contact.form.name": "姓名",
    "contact.form.namePlaceholder": "您的全名",
    "contact.form.email": "电子邮箱",
    "contact.form.emailPlaceholder": "your.email@example.com",
    "contact.form.phone": "电话/WhatsApp号码",
    "contact.form.phonePlaceholder": "+86 138 0000 0000",
    "contact.form.nationality": "国籍",
    "contact.form.nationalityPlaceholder": "例如：中国、美国、新加坡",
    "contact.form.contactMethod": "首选联系方式",
    "contact.form.contactMethodOption1": "微信（推荐中文客户）",
    "contact.form.contactMethodOption2": "WhatsApp（国际客户）",
    "contact.form.contactMethodOption3": "电子邮件",
    "contact.form.contactMethodOption4": "任何方式都可以",
    "contact.form.serviceInterest": "服务需求",
    "contact.form.serviceInterestOption1": "医疗服务",
    "contact.form.serviceInterestOption2": "美容服务",
    "contact.form.serviceInterestOption3": "医疗与美容",
    "contact.form.serviceInterestOption4": "仅了解咨询",
    "contact.form.travelDate": "预计到访日期",
    "contact.form.travelDatePlaceholder": "选择您的抵达日期",
    "contact.form.budget": "大致预算",
    "contact.form.budgetOption1": "2,000美元以下",
    "contact.form.budgetOption2": "2,000-5,000美元",
    "contact.form.budgetOption3": "5,000-10,000美元",
    "contact.form.budgetOption4": "10,000美元以上",
    "contact.form.budgetOption5": "希望讨论",
    "contact.form.message": "其他详情",
    "contact.form.messagePlaceholder": "告诉我们您的具体需求、医疗顾虑或任何问题...",
    "contact.form.submit": "提交咨询",
    "contact.form.success": "✓ 感谢您！我们将在24小时内通过您首选的方式回复。",
    "contact.form.required": "必填",
    "contact.form.optional": "可选",
    "contact.direct.heading": "或直接联系我们",
    "contact.direct.subheading": "快速提问或提交表格后跟进",
    "contact.direct.notice": "⚠️ 详细报价请先填写咨询表格。未填写表格的直接消息可能会延迟回复。",
    "contact.wechat.button": "添加微信",
    "contact.wechat.id": "微信ID：SeoulCareConcierge",
    "contact.wechat.instruction": "在微信中搜索ID",
    "contact.wechat.badge": "中文客户优先",
    "contact.wechat.note": "添加时请简单介绍自己",
    "contact.whatsapp.button": "WhatsApp联系",
    "contact.whatsapp.number": "+82-10-2981-6653",
    "contact.whatsapp.badge": "国际客户",
    "contact.email.button": "发送邮件",
    "contact.email.address": "seoulcareconcierge@gmail.com",

    // Our Commitment
    "commitment.title": "我们的承诺",
    "commitment.subtitle": "通过透明和关怀建立信任",
    "commitment.card1.title": "🏥 仅认证合作伙伴",
    "commitment.card1.desc": "我们只为您对接韩国持牌、国际认证的医疗机构和知名美容中心。",
    "commitment.card2.title": "💰 无隐藏费用",
    "commitment.card2.desc": "所有费用在详细报价中提前说明。您将在确认任何服务前清楚了解所有付费项目。",
    "commitment.card3.title": "🆘 24/7紧急支持",
    "commitment.card3.desc": "您的专属客户经理全天候通过WhatsApp和微信为您服务，贯穿您在韩国的整个行程。",
    "commitment.bottom": "您的成功故事可能就在这里。成为我们首批满意客户之一。",
    "commitment.cta": "立即开始",

    // FAQ
    "faq.title": "常见问题",
    "faq.subtitle": "您可能想了解的问题",
    "faq.q1": "你们与特定医院和诊所合作吗？",
    "faq.a1":
      "我们根据您的具体需求，为您对接韩国持牌、经过认证的医疗机构。我们可以推荐并安排在韩国顶级医院和诊所的预约。",
    "faq.q2": "你们支持哪些语言？",
    "faq.a2": "我们提供全程中文和英文支持。如有需要，我们也可以安排其他语言的翻译。",
    "faq.q3": "如何支付你们的服务费用？",
    "faq.a3":
      "我们接受微信支付、支付宝、PayPal、银行转账或信用卡等多种国际支付方式。付款条款将在您的个性化报价中明确说明。",
    "faq.q4": "预订后可以更改行程吗？",
    "faq.a4": "可以，我们理解计划可能会变化。我们提供灵活的行程调整。根据时间和可用性，变更可能会影响价格。",
    "faq.q5": "在韩国期间如果需要紧急帮助怎么办？",
    "faq.a5": "我们提供24/7紧急联系支持。您的专属客户经理将在您整个行程期间通过电话和微信随时为您服务。",
    "faq.q6": "应该提前多久预订？",
    "faq.a6":
      "我们建议至少提前2-4周预订，以确保住宿和医疗预约的可用性。但在可能的情况下，我们也可以接受较短时间的通知。",
    "faq.q7": "为什么需要填写表格？不能直接发消息吗？",
    "faq.a7":
      "咨询表格帮助我们为您准备准确、个性化的建议。这样可以节省时间并确保我们了解您的具体需求。提交后，您可以直接联系我们进行快速跟进。",
    "faq.q8": "分享联系信息会收到垃圾邮件吗？",
    "faq.a8":
      "绝对不会。您的信息仅用于咨询和服务提供。我们绝不会与第三方分享您的详细信息，也不会在未经许可的情况下发送营销信息。",
    "faq.q9": "咨询需要收费吗？",
    "faq.a9": "不需要，初步咨询和报价准备完全免费。只有在您决定预订我们的服务时才需要付费。",
    "faq.q10": "需要立即在线支付吗？",
    "faq.a10":
      "不需要。付款是在您通过咨询批准详细报价后安排的。我们会提供安全的支付链接（微信支付、支付宝、PayPal或银行转账），并附有清晰的文档记录。没有自动扣费。",

    // Footer
    "footer.brand": "Seoul Care Concierge",
    "footer.tagline": "让韩国触手可及，一次只服务一位客人",
    "footer.description": "您的韩国医疗美容贴心管家",
    "footer.quickLinks": "快速链接",
    "footer.services": "服务",
    "footer.howItWorks": "流程",
    "footer.pricing": "价格",
    "footer.payment": "支付流程",
    "footer.contact": "联系我们",
    "footer.faq": "常见问题",
    "footer.contactInfo": "联系方式",
    "footer.email": "电子邮箱：seoulcareconcierge@gmail.com",
    "footer.whatsapp": "WhatsApp: +82-10-2981-6653",
    "footer.wechat": "微信ID：SeoulCareConcierge",
    "footer.hours": "营业时间：周一至周五 9AM-6PM KST | 周六 10AM-4PM KST",
    "footer.emergency": "紧急支持：全天候WhatsApp和微信",
    "footer.social": "关注我们的社交媒体（即将推出）",
    "footer.copyright": "© 2025 Seoul Care Concierge. 保留所有权利。",
    "footer.privacy": "隐私政策",
    "footer.terms": "服务条款",
  },
}
