"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useSCCStore } from "@/lib/store/sccStore"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [logoLoaded, setLogoLoaded] = useState(false)
  const { language, setLanguage } = useSCCStore()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // 모바일 메뉴가 열릴 때 배경 스크롤 방지
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`
    } else {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }

    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }
  }, [isMobileMenuOpen])

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
      setIsMobileMenuOpen(false)
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header
      className={`header-fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm dark:bg-scc-dark-bg/95" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 lg:h-28">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => {
                // Hero 섹션으로 이동하거나, 없으면 페이지 맨 위로
                const heroElement = document.getElementById("hero")
                if (heroElement) {
                  scrollToSection("hero")
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  const heroElement = document.getElementById("hero")
                  if (heroElement) {
                    scrollToSection("hero")
                  } else {
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }
                }
              }}
              aria-label={language === 'zh' ? '返回首页' : 'Return to home'}
              className="flex items-center space-x-2 md:space-x-4 lg:space-x-8">
              <div className="relative">
                {!logoLoaded && (
                  <div className="h-12 w-12 md:h-16 md:w-16 lg:h-20 lg:w-20 bg-gray-700 animate-pulse rounded-full" />
                )}
                <Image
                  src="/scc-logo-header.webp" 
                  alt="SCC Logo" 
                  width={80}
                  height={80}
                  className={`h-12 w-auto md:h-16 lg:h-20 drop-shadow-2xl transition-opacity duration-300 ${
                    logoLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  priority
                  onLoad={() => setLogoLoaded(true)}
                  onError={(e) => {
                    // Fallback to original PNG if WebP fails
                    e.currentTarget.src = '/scc-logo-header.png'
                    setLogoLoaded(true)
                  }}
                />
              </div>
              <div className="block" style={{display: 'flex', flexDirection: 'column'}}>
                <div className="text-2xl md:text-lg lg:text-2xl font-bold text-white hover:text-scc-gold transition-colors drop-shadow-lg">Seoul Care Concierge</div>
                <div className={`text-base md:text-xs lg:text-sm text-white/95 hover:text-scc-gold transition-colors mt-0.5 drop-shadow-md ${language === 'zh' ? 'font-chinese' : 'font-sans'}`}>
                  {language === 'zh' ? '韩国医疗美容护理' : 'Medical & Beauty Care in Korea'}
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
            <button
              onClick={() => scrollToSection("services")}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  scrollToSection("services")
                }
              }}
              aria-label={language === 'zh' ? '服务部分导航' : 'Navigate to Services section'}
              className={`text-sm font-medium transition-all duration-300 drop-shadow-md px-2 py-1 rounded ${
                isScrolled 
                  ? 'text-gray-900 dark:text-scc-dark-text hover:text-scc-primary dark:hover:text-scc-dark-primary' 
                  : 'text-white hover:text-scc-gold'
              } hover:scale-105 active:scale-95 ${language === 'zh' ? 'font-chinese' : 'font-sans'}`}
            >
              {language === 'zh' ? '服务' : 'Services'}
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  scrollToSection("how-it-works")
                }
              }}
              aria-label={language === 'zh' ? '使用指南部分导航' : 'Navigate to How It Works section'}
              className={`text-sm font-medium transition-all duration-300 drop-shadow-md px-2 py-1 rounded ${
                isScrolled 
                  ? 'text-gray-900 dark:text-scc-dark-text hover:text-scc-primary dark:hover:text-scc-dark-primary' 
                  : 'text-white hover:text-scc-gold'
              } hover:scale-105 active:scale-95 ${language === 'zh' ? 'font-chinese' : 'font-sans'}`}
            >
              {language === 'zh' ? '使用指南' : 'How It Works'}
            </button>
            <button
              onClick={() => scrollToSection("packages")}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  scrollToSection("packages")
                }
              }}
              aria-label={language === 'zh' ? '套餐部分导航' : 'Navigate to Packages section'}
              className={`text-sm font-medium transition-all duration-300 drop-shadow-md px-2 py-1 rounded ${
                isScrolled 
                  ? 'text-gray-900 dark:text-scc-dark-text hover:text-scc-primary dark:hover:text-scc-dark-primary' 
                  : 'text-white hover:text-scc-gold'
              } hover:scale-105 active:scale-95 ${language === 'zh' ? 'font-chinese' : 'font-sans'}`}
            >
              {language === 'zh' ? '套餐' : 'Packages'}
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  scrollToSection("faq")
                }
              }}
              aria-label={language === 'zh' ? 'FAQ部分导航' : 'Navigate to FAQ section'}
              className={`text-sm font-medium transition-all duration-300 drop-shadow-md px-2 py-1 rounded ${
                isScrolled 
                  ? 'text-gray-900 dark:text-scc-dark-text hover:text-scc-primary dark:hover:text-scc-dark-primary' 
                  : 'text-white hover:text-scc-gold'
              } hover:scale-105 active:scale-95 ${language === 'zh' ? 'font-chinese' : 'font-sans'}`}
            >
              FAQ
            </button>
          </nav>

          {/* Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            <div className={cn(
              "transition-all duration-300",
              !isScrolled && "bg-white/10 backdrop-blur-sm rounded-lg p-1"
            )}>
              <ThemeToggle />
            </div>
            <div className="flex items-center space-x-2 text-sm" role="group" aria-label="Language selection">
              <button
                onClick={() => setLanguage('en')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setLanguage('en')
                  }
                }}
                aria-label="Switch to English"
                aria-pressed={language === 'en'}
                className={`px-3 py-1 rounded transition-all duration-300 drop-shadow-md hover:scale-105 active:scale-95 font-sans ${
                  language === 'en'
                    ? isScrolled 
                      ? 'bg-[#2C5F7C] text-white font-semibold shadow-lg hover:bg-[#1F4A5F] hover:text-scc-gold active:bg-[#1A4A5A]'
                      : 'bg-[#2C5F7C] text-white font-semibold shadow-lg hover:bg-[#1F4A5F] hover:text-scc-gold active:bg-[#1A4A5A]'
                    : isScrolled
                      ? 'text-gray-900 dark:text-scc-dark-text hover:text-scc-primary dark:hover:text-scc-dark-primary hover:bg-[#2C5F7C]/10 dark:hover:bg-scc-dark-primary/10 active:bg-[#2C5F7C]/20 dark:active:bg-scc-dark-primary/20'
                      : 'text-white/95 hover:text-scc-gold hover:bg-[#2C5F7C]/20 active:bg-[#2C5F7C]/30'
                }`}
              >
                EN
              </button>
              <span className={`transition-colors duration-300 ${
                isScrolled ? 'text-gray-400 dark:text-scc-dark-text-secondary' : 'text-white/85'
              }`} aria-hidden="true">|</span>
              <button
                onClick={() => setLanguage('zh')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setLanguage('zh')
                  }
                }}
                aria-label="切换到中文"
                aria-pressed={language === 'zh'}
                className={`px-3 py-1 rounded transition-all duration-300 drop-shadow-md hover:scale-105 active:scale-95 font-chinese ${
                  language === 'zh'
                    ? isScrolled 
                      ? 'bg-[#2C5F7C] text-white font-semibold shadow-lg hover:bg-[#1F4A5F] hover:text-scc-gold active:bg-[#1A4A5A]'
                      : 'bg-[#2C5F7C] text-white font-semibold shadow-lg hover:bg-[#1F4A5F] hover:text-scc-gold active:bg-[#1A4A5A]'
                    : isScrolled
                      ? 'text-gray-900 dark:text-scc-dark-text hover:text-scc-primary dark:hover:text-scc-dark-primary hover:bg-[#2C5F7C]/10 dark:hover:bg-scc-dark-primary/10 active:bg-[#2C5F7C]/20 dark:active:bg-scc-dark-primary/20'
                      : 'text-white/95 hover:text-scc-gold hover:bg-[#2C5F7C]/20 active:bg-[#2C5F7C]/30'
                }`}
              >
                中文
              </button>
            </div>
            <button
              onClick={() => scrollToSection("get-started")}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  scrollToSection("get-started")
                }
              }}
              aria-label={language === 'zh' ? '立即联系我们' : 'Contact us now'}
              className={`px-3 py-1 rounded bg-[#2C5F7C] hover:bg-[#1F4A5F] active:bg-[#1A4A5A] text-white hover:text-scc-gold font-semibold shadow-lg drop-shadow-md hover:scale-105 active:scale-95 hover:shadow-xl active:shadow-lg transition-all duration-300 text-sm ${language === 'zh' ? 'font-chinese' : 'font-sans'}`}
            >
              {language === 'zh' ? '立即联系' : 'Contact Us Now'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setIsMobileMenuOpen(!isMobileMenuOpen)
              }
            }}
            aria-label={isMobileMenuOpen ? (language === 'zh' ? '关闭菜单' : 'Close menu') : (language === 'zh' ? '打开菜单' : 'Open menu')}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            className="md:hidden p-3 text-white hover:text-scc-gold transition-colors drop-shadow-md min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="md:hidden fixed inset-0 bg-black/90 backdrop-blur-sm z-40 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label={language === 'zh' ? '移动菜单' : 'Mobile menu'}
          >
            {/* Close button */}
            <div className="flex justify-end p-6">
              <button
                onClick={toggleMobileMenu}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    toggleMobileMenu()
                  }
                }}
                aria-label={language === 'zh' ? '关闭菜单' : 'Close menu'}
                className="w-12 h-12 flex items-center justify-center text-white hover:text-scc-gold transition-colors"
              >
                <X className="w-8 h-8" aria-hidden="true" />
              </button>
            </div>
            
            {/* Menu items */}
            <nav className="flex-1 flex flex-col justify-center px-6 space-y-3" role="navigation" aria-label={language === 'zh' ? '移动导航' : 'Mobile navigation'}>
              <button
                onClick={() => scrollToSection("services")}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    scrollToSection("services")
                  }
                }}
                aria-label={language === 'zh' ? '服务部分导航' : 'Navigate to Services section'}
                className={`text-white hover:text-scc-gold hover:bg-white/10 active:bg-white/20 active:scale-95 transition-all duration-300 rounded-lg py-4 px-6 text-lg font-medium min-h-[56px] flex items-center ${language === 'zh' ? 'font-chinese' : 'font-sans'}`}
              >
                {language === 'zh' ? '服务' : 'Services'}
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    scrollToSection("how-it-works")
                  }
                }}
                aria-label={language === 'zh' ? '使用指南部分导航' : 'Navigate to How It Works section'}
                className={`text-white hover:text-scc-gold hover:bg-white/10 active:bg-white/20 active:scale-95 transition-all duration-300 rounded-lg py-4 px-6 text-lg font-medium min-h-[56px] flex items-center ${language === 'zh' ? 'font-chinese' : 'font-sans'}`}
              >
                {language === 'zh' ? '使用指南' : 'How It Works'}
              </button>
              <button
                onClick={() => scrollToSection("packages")}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    scrollToSection("packages")
                  }
                }}
                aria-label={language === 'zh' ? '套餐部分导航' : 'Navigate to Packages section'}
                className={`text-white hover:text-scc-gold hover:bg-white/10 active:bg-white/20 active:scale-95 transition-all duration-300 rounded-lg py-4 px-6 text-lg font-medium min-h-[56px] flex items-center ${language === 'zh' ? 'font-chinese' : 'font-sans'}`}
              >
                {language === 'zh' ? '套餐' : 'Packages'}
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    scrollToSection("faq")
                  }
                }}
                aria-label={language === 'zh' ? 'FAQ部分导航' : 'Navigate to FAQ section'}
                className={`text-white hover:text-scc-gold hover:bg-white/10 active:bg-white/20 active:scale-95 transition-all duration-300 rounded-lg py-4 px-6 text-lg font-medium min-h-[56px] flex items-center ${language === 'zh' ? 'font-chinese' : 'font-sans'}`}
              >
                FAQ
              </button>
              <button
                onClick={() => scrollToSection("get-started")}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    scrollToSection("get-started")
                  }
                }}
                aria-label={language === 'zh' ? '立即联系我们' : 'Contact us now'}
                className={`bg-[#2C5F7C] hover:bg-[#1F4A5F] active:bg-[#1A4A5A] text-white hover:text-scc-gold hover:scale-105 active:scale-95 transition-all duration-300 rounded-lg font-semibold mt-4 py-4 px-6 text-lg min-h-[56px] flex items-center ${language === 'zh' ? 'font-chinese' : 'font-sans'}`}
              >
                {language === 'zh' ? '立即联系' : 'Contact Us Now'}
              </button>
            </nav>
            
            {/* Language switcher and theme toggle */}
            <div className="p-6 border-t border-white/20">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1">
                  <ThemeToggle />
                </div>
              </div>
              <div className="flex items-center justify-center space-x-4" role="group" aria-label={language === 'zh' ? '语言选择' : 'Language selection'}>
                <button
                  onClick={() => setLanguage('en')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setLanguage('en')
                    }
                  }}
                  aria-label="Switch to English"
                  aria-pressed={language === 'en'}
                  className={cn(
                    "px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300 min-h-[56px] min-w-[80px] hover:scale-105 active:scale-95 font-sans",
                    language === 'en' ? "bg-[#2C5F7C] text-white hover:bg-[#1F4A5F] hover:text-scc-gold active:bg-[#1A4A5A]" : "text-white/95 hover:text-scc-gold hover:bg-[#2C5F7C]/20 active:bg-[#2C5F7C]/30"
                  )}
                >
                  EN
                </button>
                <span className="text-white/85 text-xl" aria-hidden="true">|</span>
                <button
                  onClick={() => setLanguage('zh')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setLanguage('zh')
                    }
                  }}
                  aria-label="切换到中文"
                  aria-pressed={language === 'zh'}
                  className={cn(
                    "px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300 min-h-[56px] min-w-[80px] hover:scale-105 active:scale-95 font-chinese",
                    language === 'zh' ? "bg-[#2C5F7C] text-white hover:bg-[#1F4A5F] hover:text-scc-gold active:bg-[#1A4A5A]" : "text-white/95 hover:text-scc-gold hover:bg-[#2C5F7C]/20 active:bg-[#2C5F7C]/30"
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
