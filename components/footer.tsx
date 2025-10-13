'use client';

import { scrollToSection } from '@/lib/client-utils';
import { CONTACT } from '@/lib/scc-constants';
import { useSCCStore } from '@/store/scc_store';
import Image from 'next/image';
import { useState } from 'react';

export default function Footer() {
  const { language } = useSCCStore();
  const [showWeChatQR, setShowWeChatQR] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Copy failed silently
    }
  };

  const openWeChatQR = () => {
    // 모바일에서는 새 탭으로 열기, 데스크톱에서는 모달
    if (window.innerWidth < 768) {
      window.open('/wechat-qr', '_blank');
    } else {
      setShowWeChatQR(true);
    }
  };

  const closeWeChatQR = () => {
    setShowWeChatQR(false);
  };

  return (
    <footer className="bg-[#1A1A1A] text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 mb-8">
          {/* Brand */}
          <div className="text-center md:text-left flex flex-col justify-between">
            <div>
              <div className="text-center md:text-left">
                <button
                  onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    });
                  }}
                  className="hover:opacity-80 transition-opacity duration-200 cursor-pointer flex-shrink-0 mb-2 active:scale-95 touch-manipulation"
                  title={language === 'zh' ? '返回顶部' : 'Back to top'}
                >
                  <Image
                    src="/optimized/scc-logo-footer.webp"
                    alt="SCC Logo"
                    width={80}
                    height={80}
                    className="h-16 md:h-20 w-auto drop-shadow-2xl"
                    onError={e => {
                      // Fallback to original PNG if WebP fails
                      e.currentTarget.src = '/scc-logo-footer.png';
                    }}
                  />
                </button>
                <p
                  className={`text-white/90 text-sm md:text-base leading-relaxed ${
                    language === 'zh' ? 'font-chinese' : 'font-sans'
                  }`}
                  style={{ whiteSpace: 'pre-line' }}
                >
                  {language === 'zh'
                    ? '让您的韩国之旅安心无忧'
                    : 'Making Korea accessible\none journey at a time'}
                </p>
              </div>
            </div>
            <div className="mt-auto">
              <p
                className={`text-xs md:text-sm text-white/80 ${
                  language === 'zh' ? 'font-chinese' : 'font-sans'
                }`}
              >
                © {new Date().getFullYear()} Seoul Care Concierge.{' '}
                {language === 'zh' ? '保留所有权利。' : 'All rights reserved.'}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left flex flex-col justify-between">
            <div>
              <h4
                className={`text-lg font-bold mb-4 ${
                  language === 'zh' ? 'font-chinese' : 'font-sans'
                }`}
              >
                {language === 'zh' ? '快速链接' : 'Quick Links'}
              </h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                <button
                  onClick={() => scrollToSection('services')}
                  className={`text-white/90 hover:text-[#D4AF37] transition-all duration-300 hover:scale-105 hover:drop-shadow-lg rounded-md px-1 py-2 hover:bg-white/10 text-sm md:text-base min-h-[44px] inline-block text-center active:scale-95 touch-manipulation ${
                    language === 'zh' ? 'font-chinese' : 'font-sans'
                  }`}
                  style={{
                    textShadow: '0 0 0 transparent',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.textShadow =
                      '0 0 10px rgba(212, 175, 55, 0.8), 0 0 20px rgba(212, 175, 55, 0.6)';
                    e.currentTarget.style.transform =
                      'scale(1.05) rotate(1deg)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.textShadow = '0 0 0 transparent';
                    e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                  }}
                >
                  {language === 'zh' ? '服务' : 'Services'}
                </button>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className={`text-white/90 hover:text-[#D4AF37] transition-all duration-300 hover:scale-105 hover:drop-shadow-lg rounded-md px-1 py-2 hover:bg-white/10 text-sm md:text-base min-h-[44px] inline-block text-center active:scale-95 touch-manipulation ${
                    language === 'zh' ? 'font-chinese' : 'font-sans'
                  }`}
                  style={{
                    textShadow: '0 0 0 transparent',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.textShadow =
                      '0 0 10px rgba(212, 175, 55, 0.8), 0 0 20px rgba(212, 175, 55, 0.6)';
                    e.currentTarget.style.transform =
                      'scale(1.05) rotate(-1deg)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.textShadow = '0 0 0 transparent';
                    e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                  }}
                >
                  {language === 'zh' ? '工作流程' : 'How It Works'}
                </button>
                <button
                  onClick={() => scrollToSection('packages')}
                  className={`text-white/90 hover:text-[#D4AF37] transition-all duration-300 hover:scale-105 hover:drop-shadow-lg rounded-md px-1 py-2 hover:bg-white/10 text-sm md:text-base min-h-[44px] inline-block text-center active:scale-95 touch-manipulation ${
                    language === 'zh' ? 'font-chinese' : 'font-sans'
                  }`}
                  style={{
                    textShadow: '0 0 0 transparent',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.textShadow =
                      '0 0 10px rgba(212, 175, 55, 0.8), 0 0 20px rgba(212, 175, 55, 0.6)';
                    e.currentTarget.style.transform =
                      'scale(1.05) rotate(1deg)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.textShadow = '0 0 0 transparent';
                    e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                  }}
                >
                  {language === 'zh' ? '套餐' : 'Packages'}
                </button>
                <button
                  onClick={() => scrollToSection('faq')}
                  className={`text-white/90 hover:text-[#D4AF37] transition-all duration-300 hover:scale-105 hover:drop-shadow-lg rounded-md px-1 py-2 hover:bg-white/10 text-sm md:text-base min-h-[44px] inline-block text-center active:scale-95 touch-manipulation ${
                    language === 'zh' ? 'font-chinese' : 'font-sans'
                  }`}
                  style={{
                    textShadow: '0 0 0 transparent',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.textShadow =
                      '0 0 10px rgba(212, 175, 55, 0.8), 0 0 20px rgba(212, 175, 55, 0.6)';
                    e.currentTarget.style.transform =
                      'scale(1.05) rotate(-1deg)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.textShadow = '0 0 0 transparent';
                    e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                  }}
                >
                  FAQ
                </button>
                <button
                  onClick={() => scrollToSection('get-started')}
                  className={`text-white/90 hover:text-[#D4AF37] transition-all duration-300 hover:scale-105 hover:drop-shadow-lg rounded-md px-1 py-2 hover:bg-white/10 text-sm md:text-base min-h-[44px] inline-block text-center active:scale-95 touch-manipulation ${
                    language === 'zh' ? 'font-chinese' : 'font-sans'
                  }`}
                  style={{
                    textShadow: '0 0 0 transparent',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.textShadow =
                      '0 0 10px rgba(212, 175, 55, 0.8), 0 0 20px rgba(212, 175, 55, 0.6)';
                    e.currentTarget.style.transform =
                      'scale(1.05) rotate(1deg)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.textShadow = '0 0 0 transparent';
                    e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                  }}
                >
                  {language === 'zh' ? '联系我们' : 'Contact'}
                </button>
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-white/90 hover:text-[#D4AF37] transition-all duration-300 hover:scale-105 hover:drop-shadow-lg rounded-md px-1 py-2 hover:bg-white/10 text-sm md:text-base min-h-[44px] inline-block text-center active:scale-95 touch-manipulation ${
                    language === 'zh' ? 'font-chinese' : 'font-sans'
                  }`}
                  style={{
                    textShadow: '0 0 0 transparent',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.textShadow =
                      '0 0 10px rgba(212, 175, 55, 0.8), 0 0 20px rgba(212, 175, 55, 0.6)';
                    e.currentTarget.style.transform =
                      'scale(1.05) rotate(-1deg)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.textShadow = '0 0 0 transparent';
                    e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                  }}
                >
                  {language === 'zh' ? '隐私' : 'Privacy'}
                </a>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left flex flex-col justify-between">
            <div>
              <h4
                className={`text-lg font-bold mb-4 ${
                  language === 'zh' ? 'font-chinese' : 'font-sans'
                }`}
              >
                {language === 'zh' ? '联系信息' : 'Contact Information'}
              </h4>
              <div className="space-y-3 text-sm md:text-base">
                <div
                  className={`flex items-center justify-center md:justify-start gap-2 ${
                    language === 'zh' ? 'font-chinese' : 'font-sans'
                  }`}
                >
                  <span className="text-xl">📧</span>
                  <span className="text-white/80">
                    {language === 'zh' ? '邮箱: ' : 'Email: '}
                  </span>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="text-white/90 hover:text-[#D4AF37] transition-all duration-300 hover:scale-110 hover:drop-shadow-lg hover:animate-pulse inline-block break-all active:scale-95 touch-manipulation"
                    style={{
                      textShadow: '0 0 0 transparent',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.textShadow =
                        '0 0 10px rgba(212, 175, 55, 0.8), 0 0 20px rgba(212, 175, 55, 0.6)';
                      e.currentTarget.style.transform =
                        'scale(1.1) rotate(1deg)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.textShadow = '0 0 0 transparent';
                      e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                    }}
                  >
                    {CONTACT.email}
                  </a>
                </div>

                <div
                  className={`flex items-center justify-center md:justify-start gap-2 ${
                    language === 'zh' ? 'font-chinese' : 'font-sans'
                  }`}
                >
                  <span className="text-xl">📱</span>
                  <span className="text-white/80">
                    {language === 'zh' ? 'WhatsApp: ' : 'WhatsApp: '}
                  </span>
                  <a
                    href={CONTACT.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/90 hover:text-[#25D366] transition-all duration-300 hover:scale-110 hover:drop-shadow-lg hover:animate-pulse inline-block active:scale-95 touch-manipulation"
                    style={{
                      textShadow: '0 0 0 transparent',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.textShadow =
                        '0 0 10px rgba(37, 211, 102, 0.8), 0 0 20px rgba(37, 211, 102, 0.6)';
                      e.currentTarget.style.transform =
                        'scale(1.1) rotate(-1deg)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.textShadow = '0 0 0 transparent';
                      e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                    }}
                  >
                    {CONTACT.phone}
                  </a>
                </div>

                <div
                  className={`flex items-center justify-center md:justify-start gap-2 ${
                    language === 'zh' ? 'font-chinese' : 'font-sans'
                  }`}
                >
                  <span className="text-xl">💬</span>
                  <span className="text-white/80">
                    {language === 'zh' ? '微信: ' : 'WeChat: '}
                  </span>
                  <button
                    onClick={openWeChatQR}
                    className="no-gold-hover text-white/90 hover:text-[#D4AF37] transition-all duration-300 hover:scale-110 hover:drop-shadow-lg hover:animate-pulse inline-block cursor-pointer active:scale-95 touch-manipulation"
                    style={{
                      textShadow: '0 0 0 transparent',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.textShadow =
                        '0 0 10px rgba(7, 193, 96, 0.8), 0 0 20px rgba(7, 193, 96, 0.6)';
                      e.currentTarget.style.transform =
                        'scale(1.1) rotate(1deg)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.textShadow = '0 0 0 transparent';
                      e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                    }}
                  >
                    {CONTACT.wechatId}
                  </button>
                  {copied && (
                    <span className="text-xs text-green-400">
                      {language === 'zh' ? '已复制!' : 'Copied!'}
                    </span>
                  )}
                </div>

                <div
                  className={`flex items-center justify-center md:justify-start gap-2 text-white/80 ${
                    language === 'zh' ? 'font-chinese' : 'font-sans'
                  }`}
                >
                  <span className="text-xl">⏰</span>
                  <span className="whitespace-nowrap">
                    {language === 'zh'
                      ? '营业时间: 周一至周五 09:00-18:00 (韩国时间)'
                      : 'Business hours: Mon-Fri 9AM-6PM KST'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-white/10"></div>
      </div>

      {/* WeChat QR Code Modal */}
      {showWeChatQR && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full text-center">
            <h3
              className={`text-xl font-bold mb-4 text-gray-900 ${
                language === 'zh' ? 'font-chinese' : 'font-sans'
              }`}
            >
              {language === 'zh' ? 'WeChat 二维码' : 'WeChat QR Code'}
            </h3>
            <div className="bg-gray-100 p-6 rounded-lg mb-4">
              <div className="flex flex-col items-center">
                <div className="w-48 h-48 bg-white rounded-lg shadow-md mb-4 flex items-center justify-center">
                  <Image
                    src="/optimized/scc-wechat-qr.webp"
                    alt="WeChat QR Code"
                    width={200}
                    height={200}
                    className="max-w-full max-h-full object-contain rounded-lg"
                    onError={e => {
                      // Fallback to original JPG if WebP fails
                      e.currentTarget.src = '/scc-wechat-qr.jpg';
                    }}
                  />
                  <div
                    className="text-center text-gray-500 p-4 hidden"
                    id="qr-fallback-footer"
                  >
                    <div className="text-4xl mb-2">📱</div>
                    <div className="text-sm">QR Code</div>
                    <div className="text-xs mt-1">
                      WeChat ID: SeoulCareConcierge
                    </div>
                  </div>
                </div>
                <p
                  className={`text-sm text-gray-600 ${
                    language === 'zh' ? 'font-chinese' : 'font-sans'
                  }`}
                >
                  {language === 'zh' ? 'WeChat ID: ' : 'WeChat ID: '}
                  <span className="font-mono font-bold">
                    {CONTACT.wechatId}
                  </span>
                </p>
              </div>
            </div>
            <p
              className={`text-sm text-gray-600 mb-6 ${
                language === 'zh' ? 'font-chinese' : 'font-sans'
              }`}
            >
              {language === 'zh'
                ? '请使用 WeChat 扫描二维码或搜索 ID 添加好友'
                : 'Scan QR code with WeChat or search by ID to add friend'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => copyToClipboard(CONTACT.wechatId)}
                className={`no-gold-hover flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors active:scale-95 touch-manipulation ${
                  language === 'zh' ? 'font-chinese' : 'font-sans'
                }`}
              >
                {language === 'zh' ? '复制 ID' : 'Copy ID'}
              </button>
              <button
                onClick={closeWeChatQR}
                className={`no-gold-hover flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors active:scale-95 touch-manipulation ${
                  language === 'zh' ? 'font-chinese' : 'font-sans'
                }`}
              >
                {language === 'zh' ? '关闭' : 'Close'}
              </button>
            </div>
            {copied && (
              <p
                className={`text-xs text-green-600 mt-2 ${
                  language === 'zh' ? 'font-chinese' : 'font-sans'
                }`}
              >
                {language === 'zh' ? '已复制!' : 'Copied!'}
              </p>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}
