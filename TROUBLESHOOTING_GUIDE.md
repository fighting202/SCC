# Seoul Care Concierge - 문제 해결 가이드

**마지막 업데이트**: 2025-10-11
**작성자**: Cursor

## 🚨 **자주 발생하는 오류와 해결법**

### 1. **CSS 적용 안되는 문제**

**증상**: 스타일이 반영되지 않음, 레이아웃 깨짐

**해결법**:

```bash
# 1. Node.js 프로세스 종료
taskkill /f /im node.exe

# 2. Next.js 캐시 삭제
Remove-Item -Path ".next" -Recurse -Force

# 3. 개발 서버 재시작
npm run dev
```

**자동화 스크립트**: `fix-css.ps1` 실행

---

### 2. **연결 거부 문제 (localhost refused to connect)**

**증상**: "이 페이지에 연결할 수 없습니다. localhost 연결을 거부했습니다."

**해결법**:

```bash
# 1. 모든 Node.js 프로세스 강제 종료
taskkill /f /im node.exe

# 2. 포트 3000 사용 상태 확인
netstat -ano | findstr :3000

# 3. .next 폴더 완전 삭제
Remove-Item -Path ".next" -Recurse -Force

# 4. 개발 서버 재시작
npm run dev
```

**자동화 스크립트**: `start-server.ps1` 실행

---

### 3. **이미지 로딩 문제**

**증상**: 헤더 로고, 히어로 이미지, 카드 이미지가 안 보임

**해결법**:

1. 이미지 파일 존재 확인
2. 경로를 원본 파일로 변경
3. Next.js Image 컴포넌트 사용 확인
4. `onError` fallback 추가

**예시**:

```tsx
<Image
  src="/scc-logo-header.png"
  alt="SCC Logo"
  width={80}
  height={80}
  onError={e => {
    e.currentTarget.src = '/scc-logo-header.png';
  }}
/>
```

---

### 4. **빌드 오류**

**증상**: `npm run build` 실패

**해결법**:

```bash
# 1. TypeScript 설정 확인
tsc --noEmit

# 2. ESLint 설정 간소화
# .eslintrc.json에서 복잡한 규칙 제거

# 3. undefined 체크 추가
# 옵셔널 체이닝 (?.) 사용

# 4. 캐시 삭제 후 재빌드
Remove-Item -Path ".next" -Recurse -Force
npm run build
```

---

### 5. **PWA 설치 프롬프트 문제**

**증상**: "사용 가능한 앱이 있습니다" 팝업, 작업표시줄에 앱 아이콘

**해결법**:

1. `manifest.json` 파일 이름 변경 (.disabled)
2. `layout.tsx`에서 manifest 링크 제거
3. PWA 관련 메타 태그 제거
4. workbox 파일 삭제
5. 브라우저 캐시 완전 삭제 (Ctrl+Shift+Delete)

**자동화 스크립트**: `prevent-pwa.js` 사용

---

### 6. **환경 변수 오류**

**증상**: `undefined` 값, 환경 변수 인식 안됨

**해결법**:

1. `.env.local` 파일 확인
2. `NEXT_PUBLIC_` 접두사 확인
3. 서버 재시작
4. `lib/env.ts`에서 Zod 검증 확인

---

### 7. **터미널 종료 문제**

**증상**: 터미널이 응답하지 않음, 명령어 입력 불가

**해결법**:

```bash
# 1. 안전한 서버 종료
.\stop-server.ps1

# 2. 모든 프로세스 확인
tasklist | findstr node

# 3. 강제 종료 (필요시)
taskkill /f /im node.exe

# 4. 안정적인 서버 시작
.\start-server.ps1
```

---

## 🔄 **문제 해결 체크리스트**

### CSS/스타일 문제 시:

- [ ] Node.js 프로세스 종료
- [ ] .next 폴더 삭제
- [ ] 개발 서버 재시작
- [ ] 포트 사용 상태 확인 (netstat -ano | findstr :3000)
- [ ] 브라우저 강제 새로고침 (Ctrl+F5)

### 연결 거부 문제 시:

- [ ] 모든 Node.js 프로세스 강제 종료
- [ ] 포트 3000 사용 상태 확인
- [ ] .next 폴더 완전 삭제
- [ ] 개발 서버 재시작
- [ ] 포트 LISTENING 상태 확인

### 이미지 문제 시:

- [ ] 이미지 파일 존재 확인
- [ ] 경로를 원본 파일로 변경
- [ ] Next.js Image 컴포넌트 사용 확인

### 빌드 문제 시:

- [ ] TypeScript 설정 확인
- [ ] ESLint 설정 간소화
- [ ] undefined 체크 추가

### PWA 문제 시:

- [ ] manifest.json 파일 이름 변경 (.disabled)
- [ ] layout.tsx에서 manifest 링크 제거
- [ ] PWA 관련 메타 태그 제거
- [ ] workbox 파일 삭제
- [ ] 브라우저 캐시 완전 삭제 (Ctrl+Shift+Delete)

---

## 📋 **자동화 스크립트**

### 서버 관리 스크립트:

```bash
# 안정적인 서버 시작
.\start-server.ps1

# 안전한 서버 종료
.\stop-server.ps1

# CSS 문제 해결
.\fix-css.ps1
```

### 터미널 종료 문제 해결:

- [ ] `.\stop-server.ps1` 실행하여 모든 프로세스 정리
- [ ] `.\start-server.ps1` 실행하여 안정적으로 서버 시작
- [ ] 포트 충돌 확인 및 해결

### 이미지 문제 해결 스크립트:

```bash
# fix-images.ps1
# 이미지 경로를 원본으로 변경하는 자동 스크립트
```

---

## 🛠️ **개발 환경 복구**

### VS Code 설정 복구:

```bash
# Java 확장 프로그램 제거
.\remove-java-extensions.ps1

# VS Code 설정 복구
.\fix-vscode-settings.ps1
```

### 패키지 관리자 통일:

```bash
# pnpm으로 통일
npm install -g pnpm
pnpm install
```

---

## 📞 **긴급 상황 대응**

### 완전 초기화:

1. 모든 Node.js 프로세스 종료
2. `.next` 폴더 삭제
3. `node_modules` 삭제 (필요시)
4. `pnpm install` 실행
5. `pnpm dev` 실행

### 백업 복원:

1. Git에서 마지막 정상 커밋으로 복원
2. `git reset --hard HEAD~1`
3. `git pull origin main`

---

## 📚 **추가 리소스**

- [Next.js 공식 문서](https://nextjs.org/docs)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)
- [Vercel 배포 가이드](https://vercel.com/docs)

---

### 13. **웹상단 탭 파비콘 크기/가독성 문제**

**증상**: 웹상단 탭의 파비콘이 너무 작거나 가독성이 떨어짐

**해결법**:

```bash
# app/layout.tsx에서 SVG favicon 설정 개선:
# 1. viewBox를 300x300으로 확대 (기존 200x200)
# 2. font-size를 90으로 증가 (기존 60)
# 3. font-weight를 900으로 설정
# 4. text-shadow 강화 (3px 3px 6px)
# 5. sizes="256x256" 속성 추가
# 6. glow 효과 추가 (SVG filter)
# 7. stroke-width 증가 (8px)
# 8. 원 반지름 증가 (135px)
```

**완전한 SVG favicon 코드**:

```html
<link
  rel="icon"
  href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 300'><defs><linearGradient id='grad' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%232C5F7C'/><stop offset='100%' stop-color='%231F4A5F'/></linearGradient><filter id='glow'><feGaussianBlur stdDeviation='3' result='coloredBlur'/><feMerge><feMergeNode in='coloredBlur'/><feMergeNode in='SourceGraphic'/></feMerge></filter></defs><circle cx='150' cy='150' r='135' fill='url(%23grad)' stroke='white' stroke-width='8' filter='url(%23glow)'/><text x='150' y='175' text-anchor='middle' fill='white' font-size='90' font-weight='900' font-family='Arial,sans-serif' text-shadow='3px 3px 6px rgba(0,0,0,0.7)' filter='url(%23glow)'>SCC</text></svg>"
  sizes="256x256"
/>
```

---

### 14. **헤더 로고 파비콘 문제 (반복 발생)**

**증상**: 헤더 로고가 파비콘으로 표시되거나 보이지 않음

**해결법**:

```bash
# 1. 파비콘 파일 완전 제거
cd public && Remove-Item favicon* -Force

# 2. Next.js 설정으로 favicon 요청 차단
# next.config.mjs에 추가:
# async rewrites() {
#   return [{ source: '/favicon.ico', destination: '/api/block-favicon' }]
# }

# 3. API 엔드포인트 생성 (app/api/block-favicon/route.ts)
# 4. SVG로 헤더 로고 구현 (components/header.tsx)
# 5. CSS로 강제 표시 (app/globals.css)
```

**중요**: 이 문제는 브라우저 캐시 때문에 자주 재발하므로, 완전히 다른 포트(4000)로 테스트하거나 시크릿 모드 사용 권장

---

### 15. **메뉴 네비게이션 문제**

**증상**: 메뉴 항목이 잘못된 섹션으로 이동하거나 존재하지 않는 섹션 참조

**해결법**:

```bash
# 1. components/navigation/DesktopNavigation.tsx 수정
# 2. components/navigation/MobileMenu.tsx 수정
# 3. navigationItems 배열에서 올바른 섹션 ID 사용:
#    - 'about' 제거
#    - 'packages' 추가 (Package Comparison 섹션)
#    - 'contact'를 'get-started'로 변경
# 4. lib/client-utils.ts의 scrollToSection 함수 확인
```

---

### 16. **스크롤 오프셋 문제**

**증상**: 메뉴 클릭 시 해당 섹션의 첫 부분이 아닌 이전 섹션의 아랫부분이 보임

**해결법**:

```bash
# lib/client-utils.ts의 scrollToSection 함수 개선:
# 1. 헤더의 실제 높이를 동적으로 계산
# 2. 섹션의 실제 콘텐츠 시작 위치 찾기
# 3. 더 큰 여백(80px) 적용
# 4. 음수 오프셋 방지

export function scrollToSection(id: string): void {
  const element = document.getElementById(id);
  if (!element) return;

  // 헤더의 실제 높이를 동적으로 계산
  const header = document.querySelector('header');
  const headerHeight = header ? header.offsetHeight : 80;

  // 섹션의 실제 콘텐츠 시작 위치를 찾기 위해 첫 번째 자식 요소 확인
  const firstChild = element.querySelector('h1, h2, h3, .section-title, .container > *:first-child');
  const targetElement = firstChild || element;

  // 더 큰 여백 적용 (헤더 + 섹션 패딩 고려)
  const extraOffset = 80;
  const totalOffset = headerHeight + extraOffset;

  const elementPosition = targetElement.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - totalOffset;

  window.scrollTo({
    top: Math.max(0, offsetPosition), // 음수 방지
    behavior: 'smooth',
  });
}
```

---

### 17. **다크모드에서 헤더 로고 가시성 문제**

**증상**: 다크모드에서 헤더 로고가 청록색이라 잘 안 보임

**해결법**:

```bash
# 1. components/header.tsx에서 로고 이미지에 다크모드 클래스 추가:
<img
  src="/scc-logo/scc-letter logo_배경다크.png"
  alt="SCC Logo"
  className="dark:brightness-150 dark:contrast-125 dark:drop-shadow-lg"
  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
/>

# 2. app/globals.css에서 다크모드 로고 스타일 추가:
.dark .scc-logo-image img {
  filter: brightness(1.5) contrast(1.25) drop-shadow(0 0 8px rgba(255, 255, 255, 0.3));
  transition: filter 0.3s ease;
}

.scc-logo-image img {
  transition: filter 0.3s ease;
}
```

**효과**:

- 다크모드에서 로고가 1.5배 밝아짐
- 대비가 1.25배 증가
- 흰색 글로우 효과로 가시성 향상
- 부드러운 전환 효과

---

### 18. **Get Free Consultation 버튼 애니메이션 적용**

**증상**: "Get Free Consultation" 버튼에 hover 애니메이션이 없거나 일부만 적용됨

**해결법**:

```bash
# 1. 히어로 섹션 (이미 적용됨):
<button
  onClick={handleTallyClick}
  className="bg-[#2C5F7C] hover:bg-[#1F4A5F] text-white hover:text-[#D4AF37]
             hover:scale-105 transition-all duration-300"
>

# 2. Contact 섹션 (이미 적용됨):
<Button
  onClick={handleTallyClick}
  className="hover:scale-105 transition-all duration-500"
>

# 3. Inquiry 폼 제출 버튼 (추가 적용):
<Button
  type="submit"
  className="w-full hover:scale-105 transition-all duration-300"
>

# 4. Optimized Inquiry 폼 제출 버튼 (추가 적용):
<Button
  type="submit"
  className="w-full bg-primary hover:bg-primary/90 text-white
             hover:scale-105 transition-all duration-300"
>
```

**효과**:

- 모든 "Get Free Consultation" 관련 버튼에 hover 시 1.05배 확대 애니메이션 적용
- 부드러운 전환 효과 (300ms 또는 500ms)
- 사용자 인터랙션 피드백 향상

---

### 19. **헤더 메뉴 노란색 hover 효과 사라짐**

**증상**: 헤더 메뉴를 마우스로 올렸을 때 노란색으로 바뀌는 효과가 사라짐

**해결법**:

```bash
# components/navigation/DesktopNavigation.tsx에서 hover 효과 추가:
<motion.button
  className={`relative transition-colors duration-200 font-medium text-sm lg:text-base
             drop-shadow-md hover:text-[#D4AF37] ${
               isScrolled ? 'text-[#2C5F7C] dark:text-white' : 'text-white'
             }`}
  whileHover={{ y: -2 }}
  whileTap={{ scale: 0.95 }}
>
  <span className="relative z-10">
    {language === 'zh' ? item.zh : item.en}
  </span>
  <motion.span
    className="absolute left-0 bottom-0 h-0.5 bg-[#D4AF37]"
    initial={{ width: 0 }}
    whileHover={{ width: '100%' }}
    transition={{ duration: 0.3, ease: 'easeInOut' }}
  />
</motion.button>
```

**효과**:

- 메뉴 항목에 마우스 hover 시 텍스트가 노란색(#D4AF37)으로 변경
- 하단에 노란색 밑줄 애니메이션 효과
- 부드러운 전환 효과 (200ms)
- 위로 살짝 이동하는 애니메이션 (y: -2)

---

### 20. **히어로 섹션에서 헤더 텍스트가 청록색으로 표시됨**

**증상**: 히어로 섹션에서도 "Seoul Care Concierge" 텍스트가 청록색으로 표시됨 (흰색이어야 함)

**해결법**:

```bash
# components/header.tsx에서 스크롤 임계값을 뷰포트 높이 기준으로 변경:

useEffect(() => {
  const handleScroll = () => {
    // 히어로 섹션은 min-h-screen이므로 뷰포트 높이의 80% 이상 스크롤해야 색상 변경
    const viewportHeight = window.innerHeight;
    setIsScrolled(window.scrollY > viewportHeight * 0.8);
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

# components/navigation/LogoSection.tsx에서 단순한 색상 로직 사용:
<motion.h1
  className={cn(
    'text-lg md:text-xl lg:text-2xl font-bold drop-shadow-lg transition-colors duration-300',
    isScrolled ? 'text-[#2C5F7C] dark:text-white' : 'text-white'
  )}
>
  Seoul Care Concierge
</motion.h1>
```

**효과**:

- 히어로 섹션 내에서는 항상 흰색 텍스트 표시 (뷰포트 높이의 80% 이내)
- 히어로 섹션을 벗어나면 청록색으로 변경 (라이트모드) / 흰색 유지 (다크모드)
- 부드러운 색상 전환 효과
- 성능 최적화된 스크롤 이벤트 처리 (requestAnimationFrame 사용)

---

## 21. 빈 흰색 화면 문제 (자주 발생)

### 증상

- 브라우저에서 빈 흰색 화면만 표시됨
- 콘솔에 에러 메시지가 없거나 일반적인 에러 메시지만 표시
- 개발 서버는 정상적으로 실행됨

### 원인

1. **JSX 구문 오류**: `motion.section` 같은 잘못된 JSX 구문 사용
2. **컴포넌트 렌더링 오류**: 컴포넌트 내부에서 undefined 반환
3. **Import 오류**: 존재하지 않는 컴포넌트나 함수 import
4. **TypeScript 타입 오류**: 타입 불일치로 인한 컴파일 실패

### 해결 방법

#### 1단계: 터미널 에러 확인

```bash
# 개발 서버 재시작하여 에러 메시지 확인
pnpm dev
```

#### 2단계: JSX 구문 수정

```tsx
// ❌ 잘못된 사용법
<motion.section>
  <div>content</div>
</motion.section>

// ✅ 올바른 사용법
<section>
  <motion.div>
    content
  </motion.div>
</section>
```

#### 3단계: 컴포넌트 구조 확인

```tsx
// ❌ 잘못된 구조
export default function Component() {
  // 조건부 렌더링에서 undefined 반환 가능
  if (someCondition) {
    return; // undefined 반환
  }
}

// ✅ 올바른 구조
export default function Component() {
  if (someCondition) {
    return <div>Loading...</div>; // 항상 JSX 반환
  }

  return <div>{/* 정상적인 JSX */}</div>;
}
```

#### 4단계: Import 오류 확인

```tsx
// ❌ 잘못된 import
import { NonExistentComponent } from '@/components/ui/button';

// ✅ 올바른 import
import { Button } from '@/components/ui/button';
```

#### 5단계: 캐시 클리어 및 재시작

```bash
# Next.js 캐시 삭제
rm -rf .next

# node_modules 재설치 (필요시)
rm -rf node_modules
pnpm install

# 개발 서버 재시작
pnpm dev
```

### 예방 방법

1. **TypeScript 엄격 모드**: 타입 오류를 컴파일 시점에 발견
2. **ESLint 설정**: 구문 오류를 미리 감지
3. **컴포넌트 테스트**: 각 컴포넌트를 독립적으로 테스트
4. **점진적 개발**: 한 번에 많은 변경사항을 적용하지 말고 단계적으로 적용

### 자주 발생하는 패턴

- `motion.section` → `<section>` + `<motion.div>` 사용
- 조건부 렌더링에서 `undefined` 반환 → 항상 JSX 반환
- 잘못된 import 경로 → 정확한 경로 확인
- TypeScript 타입 오류 → 타입 정의 확인

---

**이 가이드를 통해 대부분의 문제를 해결할 수 있습니다. 추가 문제가 발생하면 이 문서를 업데이트해주세요.**

**⚠️ 반복 작업 방지**: 이 가이드의 해결법을 먼저 확인하고 적용하세요.
