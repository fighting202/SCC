/**
 * Page-specific SEO component
 * Provides easy-to-use SEO metadata for individual pages
 */

import { Metadata } from 'next'

export interface PageSEOProps {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  language?: 'en' | 'zh'
}

export function generatePageMetadata({
  title,
  description,
  keywords = [],
  image = '/modern-seoul-skyline-at-sunset-with-luxury-medical.jpg',
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Seoul Care Concierge',
  language = 'en',
}: PageSEOProps): Metadata {
  const fullTitle = `${title} | Seoul Care Concierge`
  const baseUrl = 'https://seoulcareconcierge.com'
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl
  const imageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`

  return {
    title: fullTitle,
    description,
    keywords: [...keywords, 'medical tourism Korea', 'Seoul concierge', 'K-beauty'],
    authors: [{ name: author }],
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: 'Seoul Care Concierge',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: language === 'zh' ? 'zh_CN' : 'en_US',
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: fullUrl,
      languages: {
        en: `${baseUrl}${url || '/'}`,
        zh: `${baseUrl}${url || '/'}?lang=zh`,
      },
    },
  }
}

/**
 * Pre-configured SEO metadata for common pages
 */
export const commonPageSEO = {
  home: {
    en: generatePageMetadata({
      title: 'Medical & Beauty Tourism in Seoul',
      description:
        'Professional medical and beauty care concierge service in Seoul, Korea. Safe, transparent, affordable services with full support for international clients.',
      keywords: ['medical tourism', 'Seoul', 'plastic surgery', 'K-beauty', 'concierge service'],
    }),
    zh: generatePageMetadata({
      title: '首尔医疗美容旅游',
      description: '首尔专业医疗和美容护理礼宾服务。为国际客户提供安全、透明、实惠的服务和全面支持。',
      keywords: ['医疗旅游', '首尔', '整形外科', 'K-Beauty', '礼宾服务'],
      language: 'zh',
    }),
  },
  services: {
    en: generatePageMetadata({
      title: 'Our Services',
      description:
        'Comprehensive medical and beauty services in Seoul: plastic surgery, dermatology, dental care, K-beauty treatments, and complete concierge support.',
      keywords: [
        'medical services Seoul',
        'plastic surgery',
        'K-beauty',
        'dental care',
        'dermatology',
      ],
      url: '/services',
    }),
    zh: generatePageMetadata({
      title: '我们的服务',
      description: '首尔全面的医疗和美容服务：整形外科、皮肤科、牙科、K-Beauty 护理和完整的礼宾支持。',
      keywords: ['首尔医疗服务', '整形外科', 'K-Beauty', '牙科', '皮肤科'],
      url: '/services',
      language: 'zh',
    }),
  },
  contact: {
    en: generatePageMetadata({
      title: 'Contact Us',
      description:
        'Get in touch with Seoul Care Concierge. WeChat, WhatsApp, email, or phone. 24/7 support for international clients.',
      keywords: ['contact', 'Seoul concierge', 'customer support', 'WeChat', 'WhatsApp'],
      url: '/contact',
    }),
    zh: generatePageMetadata({
      title: '联系我们',
      description: '联系首尔护理礼宾。微信、WhatsApp、电子邮件或电话。为国际客户提供 24/7 支持。',
      keywords: ['联系方式', '首尔礼宾', '客户支持', '微信', 'WhatsApp'],
      url: '/contact',
      language: 'zh',
    }),
  },
  about: {
    en: generatePageMetadata({
      title: 'About Us',
      description:
        'Learn about Seoul Care Concierge - your trusted partner for medical and beauty tourism in Korea. Professional, safe, and transparent services.',
      keywords: ['about', 'Seoul Care Concierge', 'medical tourism', 'company info'],
      url: '/about',
    }),
    zh: generatePageMetadata({
      title: '关于我们',
      description: '了解首尔护理礼宾 - 您在韩国医疗美容旅游的可信赖合作伙伴。专业、安全、透明的服务。',
      keywords: ['关于', '首尔护理礼宾', '医疗旅游', '公司信息'],
      url: '/about',
      language: 'zh',
    }),
  },
  privacyPolicy: {
    en: generatePageMetadata({
      title: 'Privacy Policy',
      description: 'Seoul Care Concierge privacy policy. How we collect, use, and protect your personal information.',
      keywords: ['privacy policy', 'data protection', 'GDPR', 'personal information'],
      url: '/privacy-policy',
      type: 'article',
    }),
    zh: generatePageMetadata({
      title: '隐私政策',
      description: '首尔护理礼宾隐私政策。我们如何收集、使用和保护您的个人信息。',
      keywords: ['隐私政策', '数据保护', 'GDPR', '个人信息'],
      url: '/privacy-policy',
      type: 'article',
      language: 'zh',
    }),
  },
}
