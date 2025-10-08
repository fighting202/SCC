"use client"

import { CONTACT } from "@/lib/scc-constants"
import { useSCCStore } from "@/lib/store/sccStore"

export default function Footer() {
  const { language } = useSCCStore()

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-[#1A1A1A] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-6 mb-6">
        <img 
          src="/scc-logo-footer.png" 
          alt="SCC Logo" 
          className="h-16 w-auto drop-shadow-2xl"
        />
            </div>
            <p className="text-white/70 mb-4">
              {language === 'zh' ? '让韩国之旅变得简单，一次一个旅程' : 'Making Korea accessible, one journey at a time'}
            </p>
            <p className="text-sm text-white/50">
              © 2025 Seoul Care Concierge. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">
              {language === 'zh' ? '快速链接' : 'Quick Links'}
            </h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection("services")} 
                  className="text-white/70 hover:text-white transition-colors text-left"
                >
                  {language === 'zh' ? '服务' : 'Services'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("pricing")} 
                  className="text-white/70 hover:text-white transition-colors text-left"
                >
                  {language === 'zh' ? '价格' : 'Pricing'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("contact")} 
                  className="text-white/70 hover:text-white transition-colors text-left"
                >
                  {language === 'zh' ? '联系我们' : 'Contact'}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("faq")} 
                  className="text-white/70 hover:text-white transition-colors text-left"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">
              {language === 'zh' ? '联系信息' : 'Contact Information'}
            </h4>
            <ul className="space-y-2 text-white/70">
              <li>
                <span className="text-white/50">Email: </span>
                <a 
                  href={`mailto:${CONTACT.email}`}
                  className="hover:text-white transition-colors"
                >
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <span className="text-white/50">WhatsApp: </span>
                <a 
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <span className="text-white/50">WeChat: </span>
                <span className="hover:text-white transition-colors cursor-pointer" 
                      onClick={() => navigator.clipboard.writeText(CONTACT.wechatId)}>
                  {CONTACT.wechatId}
                </span>
              </li>
              <li className="pt-2 text-sm">
                {language === 'zh' ? '营业时间: 周一至周五 上午9点-下午6点 KST' : 'Business hours: Mon-Fri 9AM-6PM KST'}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-sm text-white/50">
            {language === 'zh' ? '我们尊重您的隐私。请阅读我们的隐私政策。' : 'We respect your privacy. Read our Privacy Policy.'}
          </p>
        </div>
      </div>
    </footer>
  )
}
