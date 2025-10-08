"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSCCStore } from "@/lib/store/sccStore"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { language, setLanguage } = useSCCStore()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-36">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button onClick={() => scrollToSection("hero")} className="flex items-center space-x-8">
              <img 
                src="/scc-logo-header.png" 
                alt="SCC Logo" 
                className="h-24 w-auto drop-shadow-2xl"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-serif font-bold text-white hover:text-scc-gold transition-colors drop-shadow-lg">Seoul Care Concierge</span>
                <span className="text-xs text-white/80 hover:text-scc-gold transition-colors mt-0.5 drop-shadow-md">
                  {language === 'zh' ? '韩国医疗美容护理' : 'Medical & Beauty Care in Korea'}
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-sm font-medium text-white hover:text-scc-gold transition-colors drop-shadow-md"
            >
              {language === 'zh' ? '首页' : 'Home'}
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-sm font-medium text-white hover:text-scc-gold transition-colors drop-shadow-md"
            >
              {language === 'zh' ? '服务' : 'Services'}
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-sm font-medium text-white hover:text-scc-gold transition-colors drop-shadow-md"
            >
              {language === 'zh' ? '服务流程' : 'How It Works'}
            </button>
            <button
              onClick={() => scrollToSection("pricing")}
              className="text-sm font-medium text-white hover:text-scc-gold transition-colors drop-shadow-md"
            >
              {language === 'zh' ? '价格' : 'Pricing'}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-sm font-medium text-white hover:text-scc-gold transition-colors drop-shadow-md"
            >
              {language === 'zh' ? '联系我们' : 'Contact'}
            </button>
          </nav>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded transition-colors drop-shadow-md ${
                  language === 'en' 
                    ? 'bg-scc-gold text-white font-semibold shadow-lg' 
                    : 'text-white/80 hover:text-scc-gold hover:bg-white/10'
                }`}
              >
                EN
              </button>
              <span className="text-white/60">|</span>
              <button
                onClick={() => setLanguage('zh')}
                className={`px-3 py-1 rounded transition-colors drop-shadow-md ${
                  language === 'zh' 
                    ? 'bg-scc-gold text-white font-semibold shadow-lg' 
                    : 'text-white/80 hover:text-scc-gold hover:bg-white/10'
                }`}
              >
                中文
              </button>
            </div>
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-scc-gold hover:bg-scc-accent text-white font-semibold shadow-lg drop-shadow-md"
            >
              {language === 'zh' ? '立即联系' : 'Contact Us Now'}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden p-2 text-white hover:text-scc-gold transition-colors drop-shadow-md"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black/90 backdrop-blur-sm z-40 flex flex-col">
            {/* Close button */}
            <div className="flex justify-end p-6">
              <button
                onClick={toggleMobileMenu}
                className="w-12 h-12 flex items-center justify-center text-white hover:text-scc-gold transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            
            {/* Menu items */}
            <div className="flex-1 flex flex-col justify-center px-6 space-y-2">
              <button
                onClick={() => scrollToSection("hero")}
                className="mobile-menu-item text-white hover:text-scc-gold hover:bg-white/10 transition-colors rounded-lg"
              >
                {language === 'zh' ? '首页' : 'Home'}
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="mobile-menu-item text-white hover:text-scc-gold hover:bg-white/10 transition-colors rounded-lg"
              >
                {language === 'zh' ? '服务' : 'Services'}
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="mobile-menu-item text-white hover:text-scc-gold hover:bg-white/10 transition-colors rounded-lg"
              >
                {language === 'zh' ? '流程' : 'How It Works'}
              </button>
              <button
                onClick={() => scrollToSection("pricing")}
                className="mobile-menu-item text-white hover:text-scc-gold hover:bg-white/10 transition-colors rounded-lg"
              >
                {language === 'zh' ? '套餐' : 'Pricing'}
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="mobile-menu-item text-white hover:text-scc-gold hover:bg-white/10 transition-colors rounded-lg"
              >
                {language === 'zh' ? '联系我们' : 'Contact'}
              </button>
            </div>
            
            {/* Language switcher */}
            <div className="p-6 border-t border-white/20">
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => setLanguage('en')}
                  className={cn(
                    "px-6 py-3 rounded-lg text-lg font-semibold transition-colors min-h-[56px] min-w-[80px]",
                    language === 'en' ? "bg-scc-gold text-white" : "text-white/80 hover:text-scc-gold hover:bg-white/10"
                  )}
                >
                  EN
                </button>
                <span className="text-white/60 text-xl">|</span>
                <button
                  onClick={() => setLanguage('zh')}
                  className={cn(
                    "px-6 py-3 rounded-lg text-lg font-semibold transition-colors min-h-[56px] min-w-[80px]",
                    language === 'zh' ? "bg-scc-gold text-white" : "text-white/80 hover:text-scc-gold hover:bg-white/10"
                  )}
                >
                  中文
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
