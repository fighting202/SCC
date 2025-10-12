# PWA 감지 방지 가이드

## 🔧 **브라우저 설정 변경**

### Chrome/Edge:
1. 주소창에 `chrome://flags/` 입력
2. "PWA" 검색
3. 다음 항목들을 비활성화:
   - "Desktop PWA install prompt"
   - "PWA install prompt"
   - "Web App Manifest"
4. 브라우저 재시작

### Firefox:
1. 주소창에 `about:config` 입력
2. `dom.serviceWorkers.enabled` → false
3. `dom.manifest.enabled` → false

## 🚫 **개발 중 PWA 방지**

### 1. 개발자 도구 설정:
- F12 → Application 탭 → Manifest 삭제
- Service Workers 탭 → 모든 SW 제거

### 2. 브라우저 확장 프로그램:
- PWA 관련 확장 프로그램 비활성화

## ⚠️ **주의사항**
- 이 설정은 개발 환경에서만 사용
- 프로덕션에서는 PWA 기능이 필요할 수 있음
