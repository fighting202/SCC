# Seoul Care Concierge (SCC) - 상세 가이드라인

## 📋 프로젝트 개요

Seoul Care Concierge는 한국의 의료 및 뷰티 서비스를 위한 프리미엄 컨시어지 웹사이트입니다. 외국인 고객들이 한국에서 안전하고 원활한 의료/뷰티 서비스를 받을 수 있도록 종합적인 지원을 제공합니다.

## 🎯 서비스 목표

### 주요 목표
- **안전성**: 의료 서비스의 안전성과 신뢰성 보장
- **편의성**: 원스톱 컨시어지 서비스 제공
- **접근성**: 다국어 지원으로 글로벌 고객 접근성 향상
- **전문성**: 의료/뷰티 분야 전문 지식 기반 서비스

### 타겟 고객
- 한국 의료/뷰티 서비스를 찾는 외국인
- 주로 중국어권 및 영어권 고객
- 프리미엄 서비스를 원하는 고객
- 안전하고 신뢰할 수 있는 서비스를 중시하는 고객

## 🏗️ 아키텍처 가이드라인

### 1. 폴더 구조
```
seoul-care-concierge/
├── .cursorrules                    # Cursor AI 프로젝트 규칙
├── docs/                          # 프로젝트 문서
│   └── SCC_GUIDELINES.md          # 이 파일
├── app/                           # Next.js App Router
│   ├── page.tsx                   # 홈페이지
│   ├── layout.tsx                 # 루트 레이아웃
│   └── globals.css                # 전역 스타일
├── components/                    # React 컴포넌트
│   ├── scc/                       # SCC 전용 컴포넌트
│   │   ├── bilingualtext.tsx      # 이중 언어 텍스트
│   │   ├── contactbutton.tsx      # 연락처 버튼
│   │   └── ...                    # 기타 SCC 컴포넌트
│   ├── ui/                        # 재사용 가능한 UI 컴포넌트
│   └── ...                        # 페이지별 컴포넌트
├── lib/                           # 유틸리티 및 설정
│   ├── scc-constants.ts           # SCC 상수
│   ├── scc-types.ts               # 타입 정의
│   ├── scc-utils.ts               # SCC 유틸리티
│   └── utils.ts                   # 일반 유틸리티
├── store/                         # 상태 관리
│   └── scc_store.ts               # Zustand 스토어
└── public/                        # 정적 파일
    └── ...                        # 이미지, 아이콘 등
```

### 2. 컴포넌트 분류

#### SCC 전용 컴포넌트 (`components/scc/`)
- 비즈니스 로직이 포함된 컴포넌트
- SCC 서비스에 특화된 기능
- 예: `BilingualText`, `ContactButton`, `ServiceCard`

#### UI 컴포넌트 (`components/ui/`)
- 재사용 가능한 범용 컴포넌트
- Radix UI 기반
- 예: `Button`, `Card`, `Dialog`

#### 페이지 컴포넌트
- 특정 페이지에만 사용되는 컴포넌트
- 페이지와 같은 레벨에 위치
- 예: `HeroSection`, `ServicesSection`

## 🎨 디자인 시스템

### 색상 팔레트
```css
:root {
  /* Primary Colors */
  --color-primary: #2C5F7C;           /* 진한 파란색 - 신뢰성 */
  --color-primary-hover: #1e4a5f;     /* Primary 호버 */
  
  /* Accent Colors */
  --color-accent: #D4AF37;            /* 골드 - 프리미엄 */
  --color-accent-hover: #b8941f;      /* Accent 호버 */
  
  /* Status Colors */
  --color-success: #10B981;           /* 성공 */
  --color-warning: #F59E0B;           /* 경고 */
  --color-error: #EF4444;             /* 오류 */
  
  /* Brand Colors */
  --color-wechat: #07C160;            /* WeChat */
  --color-whatsapp: #25D366;          /* WhatsApp */
  
  /* Neutral Colors */
  --color-foreground: #0f172a;        /* 텍스트 */
  --color-muted: #f8fafc;             /* 배경 */
  --color-muted-foreground: #64748b;  /* 보조 텍스트 */
  --color-border: #e2e8f0;            /* 테두리 */
}
```

### 타이포그래피
```css
/* 제목 폰트 */
.font-serif {
  font-family: 'Playfair Display', serif;
}

/* 본문 폰트 */
.font-sans {
  font-family: 'Inter', sans-serif;
}

/* 폰트 크기 스케일 */
.text-xs    /* 12px */
.text-sm    /* 14px */
.text-base  /* 16px */
.text-lg    /* 18px */
.text-xl    /* 20px */
.text-2xl   /* 24px */
.text-3xl   /* 30px */
.text-4xl   /* 36px */
.text-5xl   /* 48px */
.text-6xl   /* 60px */
.text-7xl   /* 72px */
```

### 간격 시스템
```css
/* Tailwind CSS 간격 스케일 사용 */
space-1     /* 4px */
space-2     /* 8px */
space-3     /* 12px */
space-4     /* 16px */
space-6     /* 24px */
space-8     /* 32px */
space-12    /* 48px */
space-16    /* 64px */
space-20    /* 80px */
space-24    /* 96px */
```

## 🌐 다국어 지원

### 언어 설정
- **영어 (en)**: 기본 언어
- **중국어 (zh)**: 주요 타겟 언어

### 다국어 구현 방법
```tsx
// BilingualText 컴포넌트 사용
<BilingualText 
  en="Medical Services" 
  zh="医疗服务" 
/>

// 상수에서 다국어 텍스트 정의
export const SERVICES = {
  medical: {
    en: 'Medical Services',
    zh: '医疗服务',
    items: [
      { en: 'Plastic Surgery', zh: '整形手术' },
      { en: 'Dermatology', zh: '皮肤科' }
    ]
  }
} as const;
```

### 언어 전환
- Zustand 스토어를 통한 전역 언어 상태 관리
- URL 파라미터 또는 쿠키를 통한 언어 설정 유지
- 브라우저 언어 설정 자동 감지

## 📱 반응형 디자인

### 브레이크포인트
```css
/* Mobile First 접근법 */
sm: 640px   /* 태블릿 */
md: 768px   /* 작은 데스크톱 */
lg: 1024px  /* 데스크톱 */
xl: 1280px  /* 큰 데스크톱 */
2xl: 1536px /* 초대형 화면 */
```

### 반응형 컴포넌트 예시
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 모바일: 1열, 태블릿: 2열, 데스크톱: 3열 */}
</div>

<h1 className="text-3xl md:text-4xl lg:text-5xl">
  {/* 화면 크기에 따른 폰트 크기 조정 */}
</h1>
```

## 🔧 개발 가이드라인

### 1. 컴포넌트 개발
```tsx
"use client" // 클라이언트 컴포넌트인 경우에만

import { ComponentProps } from "@/lib/scc-types"
import { cn } from "@/lib/utils"

interface ServiceCardProps {
  title: BilingualText
  description: BilingualText
  icon: LucideIcon
  className?: string
}

export default function ServiceCard({ 
  title, 
  description, 
  icon: Icon, 
  className 
}: ServiceCardProps) {
  return (
    <div className={cn("bg-white rounded-lg p-6", className)}>
      <Icon className="w-8 h-8 text-primary mb-4" />
      <h3 className="text-xl font-semibold mb-2">
        <BilingualText {...title} />
      </h3>
      <p className="text-muted-foreground">
        <BilingualText {...description} />
      </p>
    </div>
  )
}
```

### 2. 타입 정의
```tsx
// lib/scc-types.ts
export type Language = 'en' | 'zh'

export interface BilingualText {
  en: string
  zh: string
}

export interface ServiceItem {
  id: string
  title: BilingualText
  description: BilingualText
  icon: string
  category: 'medical' | 'beauty' | 'support'
}

export interface ContactInfo {
  email: string
  phone: string
  whatsapp: string
  wechatId: string
}
```

### 3. 상수 정의
```tsx
// lib/scc-constants.ts
export const CONTACT = {
  email: 'seoulcareconcierge@gmail.com',
  phone: '+82-10-2981-6653',
  whatsapp: 'https://wa.me/821029816653',
  wechatId: 'SeoulCareConcierge'
} as const

export const SERVICES = {
  medical: {
    en: 'Medical Services',
    zh: '医疗服务',
    items: [
      { en: 'Plastic Surgery', zh: '整形手术' },
      { en: 'Dermatology', zh: '皮肤科' }
    ]
  }
} as const
```

### 4. 상태 관리
```tsx
// store/scc_store.ts
import { create } from 'zustand'
import type { Language, InquiryForm } from '@/lib/scc-types'

interface SCCStore {
  language: Language
  setLanguage: (lang: Language) => void
  inquiryForm: Partial<InquiryForm>
  setInquiryForm: (data: Partial<InquiryForm>) => void
}

export const useSCCStore = create<SCCStore>((set) => ({
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
  inquiryForm: {},
  setInquiryForm: (data) => set((state) => ({ 
    inquiryForm: { ...state.inquiryForm, ...data } 
  }))
}))
```

## 🚀 성능 최적화

### 1. 이미지 최적화
```tsx
import Image from 'next/image'

<Image
  src="/hero-image.jpg"
  alt="Seoul skyline"
  width={1920}
  height={1080}
  priority // 중요한 이미지에만 사용
  className="w-full h-full object-cover"
/>
```

### 2. 코드 스플리팅
```tsx
import dynamic from 'next/dynamic'

const ContactForm = dynamic(() => import('@/components/contact-form'), {
  loading: () => <div>Loading...</div>
})
```

### 3. 번들 최적화
- 불필요한 라이브러리 제거
- Tree shaking 활용
- 동적 import 사용

## 🔒 보안 가이드라인

### 1. 개인정보 보호
- GDPR 및 개인정보보호법 준수
- 민감한 정보 암호화
- 쿠키 정책 명시

### 2. 의료 정보 보안
- 의료 서비스 관련 정보의 정확성 보장
- 의료진 라이선스 정보 검증
- 환자 정보 보호

### 3. 입력 검증
```tsx
import { z } from 'zod'

const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  serviceInterest: z.enum(['medical', 'beauty', 'both'])
})
```

## 🧪 테스트 가이드라인

### 1. 단위 테스트
- 컴포넌트별 테스트 작성
- 유틸리티 함수 테스트
- 타입 검증

### 2. 통합 테스트
- 페이지별 기능 테스트
- 다국어 전환 테스트
- 반응형 디자인 테스트

### 3. 접근성 테스트
- 스크린 리더 호환성
- 키보드 네비게이션
- 색상 대비 검증

## 📊 분석 및 모니터링

### 1. 사용자 분석
- Google Analytics 4 설정
- 사용자 행동 추적
- 전환율 분석

### 2. 성능 모니터링
- Core Web Vitals 측정
- 페이지 로딩 속도
- 번들 크기 모니터링

### 3. 오류 추적
- Sentry 또는 유사한 도구 사용
- 실시간 오류 알림
- 사용자 피드백 수집

## 🚀 배포 가이드라인

### 1. 환경 설정
- 개발 (Development)
- 스테이징 (Staging)
- 프로덕션 (Production)

### 2. CI/CD 파이프라인
- 코드 품질 검사
- 자동 테스트 실행
- 자동 배포

### 3. 모니터링
- 배포 후 헬스 체크
- 성능 모니터링
- 오류 추적

## 📚 추가 리소스

### 개발 도구
- [Next.js 문서](https://nextjs.org/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [Radix UI 문서](https://www.radix-ui.com/)
- [Zustand 문서](https://zustand-demo.pmnd.rs/)

### 디자인 리소스
- [Figma 디자인 시스템](링크)
- [아이콘 라이브러리](https://lucide.dev/)
- [이미지 리소스](링크)

### 의료/뷰티 관련 리소스
- 한국 의료법 관련 정보
- 의료진 라이선스 검증 방법
- 의료 관광 가이드라인

---

이 가이드라인은 Seoul Care Concierge 프로젝트의 일관성과 품질을 보장하기 위한 것입니다. 모든 개발자는 이 가이드라인을 준수하여 개발해야 합니다.
