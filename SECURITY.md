# 🔒 Seoul Care Concierge - 보안 가이드

## 환경 변수 설정

프로젝트를 실행하기 전에 `.env.local` 파일에 다음 환경 변수들을 설정해야 합니다:

```bash
# Resend Email Service
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Notion CRM Integration  
NOTION_API_KEY=secret_xxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# JWT Secret (강력한 랜덤 키 사용)
JWT_SECRET=your_super_secure_jwt_secret_key_here

# Next.js Environment
NODE_ENV=development
```

## API 키 획득 방법

### 1. Resend API 키
1. [Resend.com](https://resend.com) 가입
2. Dashboard → API Keys → Create API Key
3. 생성된 키를 `RESEND_API_KEY`에 설정

### 2. Notion API 키
1. [Notion Developers](https://developers.notion.com) 접속
2. New integration 생성
3. Internal integration 선택
4. 생성된 Secret을 `NOTION_API_KEY`에 설정
5. CRM 데이터베이스에 Integration 추가
6. 데이터베이스 ID를 `NOTION_DATABASE_ID`에 설정

### 3. JWT Secret
강력한 랜덤 키 생성:
```bash
# Node.js로 생성
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# 또는 온라인 생성기 사용
# https://generate-secret.vercel.app/64
```

## 보안 체크리스트

- [x] `.env.local` 파일이 `.gitignore`에 포함됨
- [x] Git 저장소 초기화 완료
- [x] 하드코딩된 API 키 제거
- [x] 환경 변수 검증 강화
- [ ] 실제 API 키 설정 완료
- [ ] 프로덕션 환경에서 HTTPS 사용
- [ ] 정기적인 API 키 로테이션

## 주의사항

⚠️ **절대 하지 말 것:**
- API 키를 코드에 하드코딩
- `.env.local` 파일을 Git에 커밋
- API 키를 공개 저장소에 업로드
- 프로덕션에서 기본값 사용

✅ **반드시 할 것:**
- 모든 민감한 정보는 환경 변수로 관리
- 정기적인 보안 업데이트
- API 키 로그 모니터링
- 접근 권한 최소화 원칙

## 문제 해결

### 환경 변수가 인식되지 않는 경우
1. `.env.local` 파일이 프로젝트 루트에 있는지 확인
2. 파일명이 정확한지 확인 (`.env.local`)
3. 서버 재시작
4. `process.env` 로그로 확인

### API 연결 실패 시
1. API 키 유효성 확인
2. 권한 설정 확인 (Notion의 경우)
3. 네트워크 연결 확인
4. 서비스 상태 확인
