# Seoul Care Concierge - 프로젝트 특징 및 구현 기법

## 📋 프로젝트 개요

- **프로젝트명**: Seoul Care Concierge (SCC)
- **기술 스택**: Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion
- **배포**: Vercel
- **도메인**: scc-kr.vercel.app

## 🎨 주요 디자인 시스템

### 1. SCC 브랜드 컬러 팔레트

```css
/* 신뢰성 중심 색상 팔레트 */
--scc-primary: #2c5f7c; /* 의료 신뢰성 (진한 파란색) */
--scc-accent: #d4af37; /* 프리미엄 서비스 (골드) */
--scc-success: #10b981; /* 안전/성공 (초록색) */
--scc-wechat: #07c160; /* WeChat 브랜드 */
--scc-whatsapp: #25d366; /* WhatsApp 브랜드 */
```

### 2. 타이포그래피 전략

```css
/* 제목: 신뢰성과 전문성 */
.font-serif {
  font-family: 'Playfair Display', serif;
}

/* 본문: 가독성과 접근성 */
.font-sans {
  font-family: 'Inter', sans-serif;
}

/* 중국어 폰트 최적화 */
.zh-text {
  font-family: 'Noto Sans SC', 'PingFang SC', sans-serif;
}
```

## 🚀 고급 애니메이션 구현

### 1. Character-by-Character Typing Animation

```typescript
// Hero 섹션 타이핑 효과
{
  language === 'zh'
    ? '您在韩国的安全无忧之旅'.split('').map((char, index) => (
        <motion.span
          key={`zh-title-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.08,
            delay: 0.3 + index * 0.08,
            ease: 'easeOut',
          }}
        >
          {char}
        </motion.span>
      ))
    : 'Your Safe & Seamless Journey in Korea'.split('').map((char, index) => (
        <motion.span
          key={`en-title-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.08,
            delay: 0.3 + index * 0.08,
            ease: 'easeOut',
          }}
        >
          {char}
        </motion.span>
      ));
}
```

### 2. Parallax Background Effect

```typescript
// Hero 배경 이미지 패럴랙스 효과
const { scrollY } = useScroll();
const y = useTransform(scrollY, [0, 1000], [0, -300]);

<motion.div style={{ y }} className="absolute inset-0 z-0">
  <Image
    src="/modern-seoul-skyline-at-sunset-with-luxury-medical.jpg"
    alt="Seoul medical tourism"
    fill
    className="object-cover"
    priority
  />
</motion.div>;
```

### 3. 3D Hover Effects

```typescript
// 카드 호버 시 3D 효과
<motion.div
  whileHover={{
    rotateY: 15,
    rotateX: 5,
    scale: 1.05,
    transition: { duration: 0.3 },
  }}
  style={{
    transformStyle: 'preserve-3d',
    perspective: 1000,
  }}
>
  {/* 카드 내용 */}
</motion.div>
```

### 4. Sequential Animation

```typescript
// 순차적 애니메이션 (Hero 섹션)
<motion.h1
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
>
  {/* 제목 */}
</motion.h1>

<motion.p
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
>
  {/* 부제목 */}
</motion.p>
```

## 📱 모바일 최적화 기법

### 1. Touch Feedback

```typescript
// 모바일 터치 피드백
<motion.button
  whileTap={{ scale: 0.95 }}
  onTouchStart={() => {
    if (navigator.vibrate) {
      navigator.vibrate(50); // 햅틱 피드백
    }
  }}
  className="active:scale-95 touch-manipulation"
>
  {/* 버튼 내용 */}
</motion.button>
```

### 2. Responsive Typography

```css
/* 반응형 타이포그래피 */
.text-responsive {
  @apply text-4xl md:text-5xl lg:text-6xl xl:text-7xl;
}
```

### 3. Mobile-First Design

```css
/* 모바일 우선 접근법 */
.container {
  @apply px-4 sm:px-6 lg:px-8;
}

.grid-responsive {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8;
}
```

## 🌐 다국어 지원 시스템

### 1. Zustand 상태 관리

```typescript
// lib/scc_store.ts
interface SCCStore {
  language: 'en' | 'zh';
  setLanguage: (lang: 'en' | 'zh') => void;
}

export const useSCCStore = create<SCCStore>(set => ({
  language: 'en',
  setLanguage: lang => set({ language: lang }),
}));
```

### 2. BilingualText 컴포넌트

```typescript
// components/scc/bilingualtext.tsx
interface BilingualTextProps {
  en: string;
  zh: string;
  className?: string;
}

export function BilingualText({ en, zh, className }: BilingualTextProps) {
  const { language } = useSCCStore();

  return <span className={className}>{language === 'zh' ? zh : en}</span>;
}
```

### 3. 언어별 애니메이션 재시작

```typescript
// 언어 변경 시 애니메이션 재시작
<motion.h1
  key={`title-${language}`} // 언어 변경 시 재렌더링
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  {/* 내용 */}
</motion.h1>
```

## 🎯 고급 UI/UX 패턴

### 1. CTA 버튼 Pulse Effect

```css
/* app/globals.css */
@keyframes pulseGlow {
  0%,
  100% {
    box-shadow: 0 0 5px rgba(212, 175, 55, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.8), 0 0 30px rgba(212, 175, 55, 0.6);
  }
}

.animate-pulse-glow {
  animation: pulseGlow 2s ease-in-out infinite;
}
```

### 2. Gradient Animation

```css
/* 그라데이션 애니메이션 */
.gradient-animate {
  background: linear-gradient(-45deg, #2c5f7c, #d4af37, #2c5f7c, #d4af37);
  background-size: 400% 400%;
  animation: gradientShift 3s ease infinite;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
```

### 3. Scroll Reveal Animation

```typescript
// hooks/use-scroll-reveal.ts
export function useScrollReveal() {
  const [visibleElements, setVisibleElements] = useState<Set<number>>(
    new Set()
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute('data-index') || '0'
            );
            setVisibleElements(prev => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.1 }
    );

    // 관찰 대상 요소들 등록
    return () => observer.disconnect();
  }, []);

  return visibleElements;
}
```

## 🔧 성능 최적화

### 1. Image Optimization

```typescript
// Next.js Image 컴포넌트 사용
import Image from 'next/image';

<Image
  src="/optimized-image.webp"
  alt="Description"
  width={800}
  height={600}
  priority={isAboveFold}
  className="rounded-lg"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>;
```

### 2. Dynamic Imports

```typescript
// 동적 import로 번들 크기 최적화
const ContactForm = dynamic(() => import('./contact-form'), {
  loading: () => <div>Loading...</div>,
});
```

### 3. CSS-in-JS 최적화

```typescript
// Tailwind CSS 클래스 최적화
import { cn } from '@/lib/utils';

const buttonClass = cn(
  'px-6 py-3 rounded-lg font-medium transition-all duration-300',
  'hover:bg-[#D4AF37] hover:text-white',
  'active:scale-95 touch-manipulation',
  className
);
```

## 🎨 커스텀 애니메이션

### 1. Tally Modal Animation

```css
/* Tally 모달 커스텀 애니메이션 */
.tally-modal-center {
  animation: tallyCenterExpand 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important;
}

@keyframes tallyCenterExpand {
  0% {
    opacity: 0;
    transform: scale(0.8) translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
```

### 2. Page Transition

```typescript
// 페이지 전환 애니메이션
<motion.main
  initial={{ opacity: 0, y: 100 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.8,
    ease: [0.25, 0.46, 0.45, 0.94],
  }}
>
  {/* 페이지 내용 */}
</motion.main>
```

## 📊 Analytics & Tracking

### 1. Vercel Analytics

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 2. Custom Event Tracking

```typescript
// lib/analytics.ts
export const trackContactMethod = (
  method: 'whatsapp' | 'wechat' | 'email' | 'tally'
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'contact_method_click', {
      method: method,
    });
  }
};
```

## 🚀 배포 및 CI/CD

### 1. Vercel 자동 배포

- GitHub 연동으로 자동 배포
- 환경 변수 관리
- 도메인 설정 (scc-kr.vercel.app)

### 2. 환경 변수 설정

```bash
# Vercel Environment Variables
NEXT_PUBLIC_TALLY_FORM_ID=nWxl8Q
NEXT_PUBLIC_EMAIL=seoulcareconcierge@gmail.com
NEXT_PUBLIC_WHATSAPP=+82-10-2981-6653
NEXT_PUBLIC_WECHAT_ID=SeoulCareConcierge
```

## 📝 코드 품질 관리

### 1. TypeScript 설정

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### 2. ESLint & Prettier

```json
// .eslintrc.json
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "prefer-const": "error",
    "no-unused-vars": "warn"
  }
}
```

## 🎯 접근성 (A11y)

### 1. 키보드 네비게이션

```typescript
// 키보드 접근성
<button
  className="focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2"
  onKeyDown={e => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  {/* 버튼 내용 */}
</button>
```

### 2. 스크린 리더 지원

```typescript
// ARIA 라벨
<button
  aria-label="Get free consultation"
  aria-describedby="consultation-description"
>
  Get Free Consultation
</button>
```

## 🔄 상태 관리 패턴

### 1. Zustand Store

```typescript
// 전역 상태 관리
interface AppState {
  language: 'en' | 'zh';
  theme: 'light' | 'dark';
  isMenuOpen: boolean;
  setLanguage: (lang: 'en' | 'zh') => void;
  setTheme: (theme: 'light' | 'dark') => void;
  toggleMenu: () => void;
}
```

### 2. Local Storage 연동

```typescript
// 상태 지속성
const useSCCStore = create<SCCStore>()(
  persist(
    set => ({
      language: 'en',
      setLanguage: lang => set({ language: lang }),
    }),
    {
      name: 'scc-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
```

## 📱 PWA 기능

### 1. Service Worker

```javascript
// public/sw.js
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('scc-cache-v1').then(cache => {
      return cache.addAll([
        '/',
        '/static/js/bundle.js',
        '/static/css/main.css',
      ]);
    })
  );
});
```

### 2. Manifest 파일

```json
// public/manifest.json
{
  "name": "Seoul Care Concierge",
  "short_name": "SCC",
  "description": "Professional Medical & Beauty Concierge",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#2C5F7C",
  "background_color": "#ffffff"
}
```

## 🎨 디자인 토큰

### 1. CSS 변수

```css
:root {
  --scc-primary: #2c5f7c;
  --scc-accent: #d4af37;
  --scc-success: #10b981;
  --scc-text: #1f2937;
  --scc-text-light: #6b7280;
  --scc-bg: #ffffff;
  --scc-bg-dark: #111827;
}
```

### 2. Spacing System

```css
.scc-spacing {
  --space-xs: 0.25rem; /* 4px */
  --space-sm: 0.5rem; /* 8px */
  --space-md: 1rem; /* 16px */
  --space-lg: 1.5rem; /* 24px */
  --space-xl: 2rem; /* 32px */
  --space-2xl: 3rem; /* 48px */
}
```

## 🔧 유틸리티 함수

### 1. 클래스 병합

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 2. 스크롤 유틸리티

```typescript
// lib/client-utils.ts
export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
    const elementPosition = element.offsetTop - headerHeight - 20;

    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth',
    });
  }
}
```

## 📊 성능 메트릭

### 1. Core Web Vitals

- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

### 2. 번들 크기 최적화

- **JavaScript**: ~170KB (First Load)
- **CSS**: ~87KB (Shared)
- **Images**: WebP/AVIF 포맷 사용

## 🚀 확장 가능성

### 1. 컴포넌트 아키텍처

```
components/
├── scc/                 # SCC 전용 컴포넌트
├── ui/                  # 재사용 가능한 UI 컴포넌트
├── layout/              # 레이아웃 컴포넌트
└── sections/            # 페이지 섹션 컴포넌트
```

### 2. 폴더 구조

```
app/
├── globals.css          # 전역 스타일
├── layout.tsx           # 루트 레이아웃
├── page.tsx             # 홈페이지
└── privacy-policy/      # 정책 페이지
```

## 📝 마이그레이션 가이드

### 1. 다른 프로젝트에 적용 시

1. **의존성 설치**

   ```bash
   npm install framer-motion zustand @vercel/analytics
   ```

2. **타입 정의 복사**

   - `lib/scc_types.ts` → `lib/types.ts`

3. **스토어 설정**

   - `store/scc_store.ts` → `store/app-store.ts`

4. **유틸리티 함수**
   - `lib/utils.ts` 복사

### 2. 커스터마이징

- 브랜드 컬러 변경
- 폰트 설정 수정
- 애니메이션 타이밍 조정
- 다국어 지원 언어 추가

---

## 📞 문의 및 지원

이 문서에 대한 질문이나 추가 구현이 필요한 경우, 프로젝트 저장소의 이슈를 통해 문의해주세요.

**프로젝트 저장소**: https://github.com/fighting202/SCC
**라이브 사이트**: https://scc-kr.vercel.app

---

_이 문서는 Seoul Care Concierge 프로젝트의 구현 기법과 특징을 정리한 것입니다. 다른 프로젝트에서 참고하여 사용하실 수 있습니다._
