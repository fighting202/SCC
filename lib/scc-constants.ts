/**
 * Seoul Care Concierge (SCC) 상수 정의
 * 모든 상수는 여기에 중앙 집중식으로 관리됩니다.
 */

// 연락처 정보
export const CONTACT = {
  email: 'seoulcareconcierge@gmail.com',
  phone: '+82-10-2981-6653',
  whatsapp: 'https://wa.me/821029816653',
  wechatId: 'SeoulCareConcierge',
  address: {
    en: 'Seoul, South Korea',
    zh: '韩国首尔'
  }
} as const;

// SCC 브랜드 색상 팔레트 - 신뢰감 + 프리미엄 느낌
export const COLORS = {
  // 신뢰감 + 프리미엄 느낌
  primary: '#2C5F7C',        // 차분한 청록색 (신뢰)
  primaryHover: '#1e4a5f',
  accent: '#D4AF37',         // 엘레강트 골드 (프리미엄)
  accentHover: '#b8941f',
  success: '#10B981',        // 밝은 그린 (성공/CTA)
  background: '#F8F9FA',     // 밝은 회색 (배경)
  text: '#2C3E50',           // 진한 회색 (가독성)
  
  // WeChat/WhatsApp 브랜드 컬러
  wechat: '#07C160',
  whatsapp: '#25D366',
  
  // 중국 문화 배려 색상
  luckyRed: '#DC2626',       // 행운의 빨강 (빨간색 회피하되 필요시 사용)
  fortuneGold: '#D4AF37',    // 부의 금색
  healthGreen: '#10B981',    // 건강의 녹색
  
  // 기존 색상 유지
  warning: '#F59E0B',
  error: '#EF4444',
  foreground: '#0f172a',
  muted: '#f8fafc',
  mutedForeground: '#64748b',
  border: '#e2e8f0'
} as const;

// 서비스 카테고리
export const SERVICES = {
  medical: {
    en: 'Medical Services',
    zh: '医疗服务',
    description: {
      en: 'We guide you to Korea\'s leading medical facilities tailored to your needs',
      zh: '我们为您推荐适合您需求的韩国顶级医疗机构'
    },
    items: [
      { en: 'Plastic Surgery', zh: '整形手术' },
      { en: 'Dermatology', zh: '皮肤科' },
      { en: 'Dental Care', zh: '口腔护理' },
      { en: 'Traditional Korean Medicine', zh: '韩医' }
    ]
  },
  beauty: {
    en: 'Beauty Services',
    zh: '美容服务',
    description: {
      en: 'Experience authentic Korean beauty treatments with professional guidance',
      zh: '在专业指导下体验正宗的韩国美容护理'
    },
    items: [
      { en: 'K-Beauty Skincare', zh: 'K-Beauty护肤' },
      { en: 'Hair & Makeup', zh: '美发造型' },
      { en: 'Spa & Wellness', zh: '水疗养生' }
    ]
  },
  support: {
    en: 'Complete Support',
    zh: '全程支持',
    description: {
      en: 'From the moment you land to the day you leave, we\'re with you',
      zh: '从您抵达的那一刻到离开的那一天，我们始终陪伴您'
    },
    items: [
      { en: 'Airport Transfer', zh: '机场接送' },
      { en: 'Accommodation Booking', zh: '住宿预订' },
      { en: 'Interpreter Service', zh: '翻译服务' },
      { en: 'Restaurant Recommendations', zh: '餐厅推荐' },
      { en: 'Emergency Assistance', zh: '紧急援助' }
    ]
  }
} as const;

// 패키지 옵션
export const PACKAGES = {
  basic: {
    name: { en: 'Basic Package', zh: '基础套餐' },
    duration: 3,
    price: { from: 1200, to: 1800 },
    currency: 'USD',
    features: [
      { en: 'Airport pickup & drop-off', zh: '机场接送' },
      { en: 'Basic consultation', zh: '基础咨询' },
      { en: 'Hotel booking assistance', zh: '酒店预订协助' }
    ]
  },
  premium: {
    name: { en: 'Premium Package', zh: '高级套餐' },
    duration: 7,
    price: { from: 3500, to: 5000 },
    currency: 'USD',
    features: [
      { en: 'Full concierge service', zh: '全程礼宾服务' },
      { en: 'Personal interpreter', zh: '私人翻译' },
      { en: 'Luxury accommodation', zh: '豪华住宿' },
      { en: '24/7 support', zh: '24/7支持' }
    ]
  }
} as const;

// 언어 설정
export const LANGUAGES = {
  en: {
    code: 'en',
    name: 'English',
    flag: '🇺🇸'
  },
  zh: {
    code: 'zh',
    name: '中文',
    flag: '🇨🇳'
  }
} as const;

// 연락 방법
export const CONTACT_METHODS = {
  wechat: {
    name: 'WeChat',
    icon: 'wechat',
    color: COLORS.wechat,
    url: `https://wa.me/821029816653`
  },
  whatsapp: {
    name: 'WhatsApp',
    icon: 'whatsapp',
    color: COLORS.whatsapp,
    url: 'https://wa.me/821029816653'
  },
  email: {
    name: 'Email',
    icon: 'mail',
    color: COLORS.primary,
    url: `mailto:${CONTACT.email}`
  }
} as const;

// 신뢰 배지
export const TRUST_BADGES = {
  support24: {
    en: '24/7 Support',
    zh: '24/7支持',
    icon: 'clock'
  },
  multilingual: {
    en: 'English & 中文 Support',
    zh: '英语和中文支持',
    icon: 'globe'
  },
  licensed: {
    en: 'Licensed Partners',
    zh: '持牌合作伙伴',
    icon: 'check-circle'
  }
} as const;

// 소셜 미디어
export const SOCIAL_MEDIA = {
  instagram: 'https://instagram.com/seoulcareconcierge',
  facebook: 'https://facebook.com/seoulcareconcierge',
  youtube: 'https://youtube.com/@seoulcareconcierge'
} as const;