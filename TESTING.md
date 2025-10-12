# Testing Guide

korea-care-concierge 프로젝트의 테스트 가이드입니다.

## 테스트 구조

```
korea-care-concierge/
├── __tests__/                 # 유닛/통합 테스트
│   ├── components/           # 컴포넌트 테스트
│   │   ├── contact-section.test.tsx
│   │   ├── hero-section.test.tsx
│   │   └── inquiry-form.test.tsx
│   ├── api/                 # API 라우트 테스트
│   │   └── submit-inquiry.test.ts
│   └── lib/                 # 라이브러리 함수 테스트
│       ├── scc-utils.test.ts
│       └── notion/
│           ├── markdown.test.ts
│           └── crm.test.ts
├── e2e/                      # E2E 테스트 (Playwright)
│   ├── home-page.spec.ts
│   ├── inquiry-flow.spec.ts
│   ├── language-switcher.spec.ts
│   └── accessibility.spec.ts
├── jest.config.js            # Jest 설정
├── jest.setup.js             # Jest 초기화
└── playwright.config.ts      # Playwright 설정
```

## 필수 패키지 설치

```bash
# 테스트 의존성 설치
npm install

# Playwright 브라우저 설치 (E2E 테스트용)
npx playwright install
```

## 테스트 실행

### 1. 유닛/통합 테스트 (Jest)

```bash
# 모든 유닛 테스트 실행
npm test

# 특정 파일 테스트
npm test contact-section

# Watch 모드로 실행
npm run test:watch

# 커버리지 리포트 생성
npm run test:coverage
```

### 2. E2E 테스트 (Playwright)

```bash
# 모든 E2E 테스트 실행
npm run test:e2e

# UI 모드로 실행 (테스트 디버깅)
npm run test:e2e:ui

# Headed 모드로 실행 (브라우저 표시)
npm run test:e2e:headed

# 특정 브라우저만 테스트
npx playwright test --project=chromium
```

### 3. 전체 테스트

```bash
# 유닛 테스트 + E2E 테스트 모두 실행
npm run test:all
```

## 작성된 테스트

### 컴포넌트 테스트

#### ContactSection (`__tests__/components/contact-section.test.tsx`)
- ✅ 영어/중국어 콘텐츠 렌더링
- ✅ Tally 폼 통합 (데스크톱/모바일)
- ✅ WeChat QR 모달 기능
- ✅ 클립보드 복사 기능
- ✅ 언어별 버튼 순서
- ✅ 접근성 검증

#### HeroSection (`__tests__/components/hero-section.test.tsx`)
- ✅ 영어/중국어 콘텐츠 렌더링
- ✅ Tally 폼 통합
- ✅ 섹션 스크롤 네비게이션
- ✅ 언어 지원
- ✅ 반응형 동작
- ✅ 접근성 검증

#### InquiryForm (`__tests__/components/inquiry-form.test.tsx`)
- ✅ 폼 필드 렌더링
- ✅ 폼 검증 (이메일, 전화번호, 날짜 등)
- ✅ 폼 제출 플로우
- ✅ 로딩 상태 표시
- ✅ 성공 메시지 표시
- ✅ Zustand 스토어 통합
- ✅ 언어 지원
- ✅ 접근성 검증

### API 테스트

#### submit-inquiry API (`__tests__/api/submit-inquiry.test.ts`)
- ✅ 문의 데이터 성공적 저장
- ✅ Notion CRM 통합
- ✅ 에러 핸들링
- ✅ 데이터 검증
- ✅ 통합 플로우

#### Notion CRM (`__tests__/lib/notion/crm.test.ts`)
- ✅ 고객 문의 저장
- ✅ 문의 상태 업데이트
- ✅ 문의 목록 조회
- ✅ 문의 상세 조회
- ✅ CRM 통계 조회
- ✅ 에러 핸들링

### E2E 테스트

#### 홈페이지 (`e2e/home-page.spec.ts`)
- ✅ 히어로 섹션 표시
- ✅ 네비게이션 접근성
- ✅ 섹션 스크롤
- ✅ 연락처 섹션
- ✅ 외부 링크 동작

#### 문의 플로우 (`e2e/inquiry-flow.spec.ts`)
- ✅ Tally 폼 열기
- ✅ 모바일 반응형
- ✅ 스크롤 동작

#### 언어 전환 (`e2e/language-switcher.spec.ts`)
- ✅ 기본 영어 콘텐츠
- ✅ 중국어 전환
- ✅ 언어 설정 유지
- ✅ 언어별 버튼 순서

#### 접근성 (`e2e/accessibility.spec.ts`)
- ✅ 제목 계층 구조
- ✅ 이미지 대체 텍스트
- ✅ 키보드 접근성
- ✅ 폼 라벨
- ✅ 네비게이션 랜드마크
- ✅ 색상 대비
- ✅ 포커스 인디케이터
- ✅ 반응형 디자인

## 커버리지 목표

Jest 설정에 다음과 같은 커버리지 목표가 설정되어 있습니다:

```javascript
coverageThreshold: {
  global: {
    branches: 70,
    functions: 70,
    lines: 70,
    statements: 70,
  },
}
```

현재 커버리지를 확인하려면:

```bash
npm run test:coverage
```

커버리지 리포트는 `coverage/` 디렉토리에 HTML 형식으로 생성됩니다.

## 테스트 작성 가이드

### 컴포넌트 테스트 작성 시

1. **렌더링 테스트**: 컴포넌트가 올바르게 렌더링되는지 확인
2. **상호작용 테스트**: 버튼 클릭, 폼 입력 등 사용자 상호작용 검증
3. **상태 관리 테스트**: Zustand 스토어와의 통합 확인
4. **언어 지원 테스트**: 영어/중국어 콘텐츠 검증
5. **접근성 테스트**: ARIA 속성, 키보드 네비게이션 등 확인

### API 테스트 작성 시

1. **성공 케이스**: 정상적인 요청/응답 검증
2. **에러 케이스**: 잘못된 데이터, 네트워크 오류 등 처리 확인
3. **데이터 검증**: 입력 데이터 검증 로직 확인
4. **통합 테스트**: 외부 서비스(Notion) 통합 검증

### E2E 테스트 작성 시

1. **사용자 플로우**: 실제 사용자 시나리오 재현
2. **크로스 브라우저**: 여러 브라우저에서 동작 확인
3. **반응형**: 다양한 화면 크기에서 테스트
4. **접근성**: 실제 접근성 기준 준수 확인

## 지속적 통합 (CI)

### GitHub Actions 설정 예시

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - run: npm ci
      - run: npm run test:coverage
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
```

## 트러블슈팅

### Jest 테스트 실패

1. **모듈 import 에러**: `moduleNameMapper`가 jest.config.js에 올바르게 설정되어 있는지 확인
2. **타임아웃 에러**: 비동기 테스트의 경우 `waitFor` 사용
3. **Mock 문제**: `jest.clearAllMocks()` 를 beforeEach에서 호출

### Playwright 테스트 실패

1. **브라우저 미설치**: `npx playwright install` 실행
2. **타임아웃**: `test.setTimeout(30000)` 으로 타임아웃 증가
3. **Selector 에러**: 더 구체적인 selector 사용 (role, label 등)

## 다음 단계

### 추가 테스트 작성 권장사항

1. **서비스 섹션 테스트**: 서비스 카드 컴포넌트 테스트
2. **패키지 비교 테스트**: 패키지 비교 컴포넌트 테스트
3. **FAQ 섹션 테스트**: 아코디언 동작 테스트
4. **성능 테스트**: Lighthouse CI 통합
5. **시각적 회귀 테스트**: Percy 또는 Chromatic 통합

### 테스트 자동화

1. Pre-commit hook 설정 (Husky + lint-staged)
2. GitHub Actions CI/CD 파이프라인 구축
3. 커버리지 뱃지 추가
4. 자동 E2E 테스트 스케줄링

## 참고 자료

- [Jest 문서](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright 문서](https://playwright.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
