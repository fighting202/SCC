# Server Actions 기반 데이터 페칭 가이드

## 🚀 **구현 완료된 기능들**

### 1. **Notion 서버 클라이언트** (`lib/notion/server.ts`)
- JWT 암호화된 API 키 관리
- 서버 컴포넌트와 Server Actions에서 사용
- 캐시된 클라이언트 인스턴스 제공
- API 키 유효성 검사

### 2. **데이터베이스 Server Actions** (`app/actions/notion-database.ts`)
```typescript
// 주요 함수들
- getDatabases()                    // 모든 데이터베이스 조회
- getDatabaseById(id)              // 특정 데이터베이스 조회
- createDatabase(data)             // 데이터베이스 생성
- updateDatabaseProperties(id, props) // 속성 업데이트
- deleteDatabase(id)               // 데이터베이스 삭제
- getDatabasePagesById(id)         // 데이터베이스의 페이지들 조회
- searchDatabasesByQuery(query)    // 데이터베이스 검색
- duplicateDatabase(id, title)     // 데이터베이스 복제
```

### 3. **페이지 Server Actions** (`app/actions/notion-pages.ts`)
```typescript
// 주요 함수들
- getPages()                       // 모든 페이지 조회
- getPageById(id)                  // 특정 페이지 조회
- createPage(data)                 // 페이지 생성
- updatePageProperties(id, props)  // 속성 업데이트
- deletePage(id)                   // 페이지 삭제
- getPageBlocksById(id)            // 페이지 블록들 조회
- searchPagesByQuery(query)        // 페이지 검색
- duplicatePage(id, title)         // 페이지 복제
- movePageToDatabase(pageId, dbId) // 페이지 이동
- updatePageSharing(id, public)    // 공유 설정
```

### 4. **React Query 훅들** (`lib/hooks/useNotion.ts`)
```typescript
// 데이터베이스 훅들
- useDatabases()                   // 데이터베이스 목록
- useDatabase(id)                  // 특정 데이터베이스
- useDatabasePages(id)             // 데이터베이스의 페이지들
- useSearchDatabases(query)        // 데이터베이스 검색

// 데이터베이스 뮤테이션 훅들
- useCreateDatabase()              // 데이터베이스 생성
- useUpdateDatabase()              // 데이터베이스 업데이트
- useDeleteDatabase()              // 데이터베이스 삭제
- useDuplicateDatabase()           // 데이터베이스 복제

// 페이지 훅들
- usePages()                       // 페이지 목록
- usePage(id)                      // 특정 페이지
- usePageBlocks(id)                // 페이지 블록들
- useSearchPages(query)            // 페이지 검색

// 페이지 뮤테이션 훅들
- useCreatePage()                  // 페이지 생성
- useUpdatePage()                  // 페이지 업데이트
- useDeletePage()                  // 페이지 삭제
- useDuplicatePage()               // 페이지 복제
- useMovePage()                    // 페이지 이동
- useUpdatePageSharing()           // 공유 설정

// 유틸리티 훅들
- useNotionData()                  // 전체 데이터
- useRefreshNotionData()           // 데이터 새로고침
```

### 5. **타입 정의** (`lib/scc_types.ts`)
```typescript
// Notion 관련 타입들
- NotionDatabase                   // 데이터베이스 타입
- NotionPage                       // 페이지 타입
- NotionBlock                      // 블록 타입
- ServerActionResponse<T>          // Server Actions 응답
- DatabaseInput                    // 데이터베이스 입력
- PageInput                        // 페이지 입력
- DatabasePropertiesUpdate         // 속성 업데이트
- PagePropertiesUpdate             // 페이지 속성 업데이트
- SearchResult<T>                  // 검색 결과
- PaginationParams                 // 페이지네이션
- NotionFilter                     // 필터
- NotionSort                       // 정렬
- NotionQuery                      // 쿼리
- NotionError                      // 에러
- NotionClientConfig               // 클라이언트 설정
- NotionIntegrationConfig          // 통합 설정
```

## 🎯 **사용 방법**

### 1. **서버 컴포넌트에서 사용**
```typescript
// app/(workspace)/databases/page.tsx
import { getDatabases } from '@/app/actions/notion-database'

export default async function DatabasesPage() {
  const result = await getDatabases()
  
  if (!result.success) {
    return <ErrorComponent error={result.error} />
  }
  
  return <DatabaseList databases={result.data} />
}
```

### 2. **클라이언트 컴포넌트에서 사용**
```typescript
// components/notion/DatabaseList.tsx
'use client'
import { useDatabases, useCreateDatabase } from '@/lib/hooks/useNotion'

export function DatabaseList() {
  const { data: databases, isLoading, error } = useDatabases()
  const createDatabase = useCreateDatabase()
  
  const handleCreate = async (data: DatabaseInput) => {
    await createDatabase.mutateAsync(data)
  }
  
  if (isLoading) return <LoadingSpinner />
  if (error) return <ErrorMessage error={error} />
  
  return (
    <div>
      {databases?.map(db => (
        <DatabaseCard key={db.id} database={db} />
      ))}
    </div>
  )
}
```

### 3. **API 라우트에서 사용**
```typescript
// app/api/notion/databases/route.ts
import { getDatabases } from '@/app/actions/notion-database'

export async function GET() {
  const result = await getDatabases()
  
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }
  
  return NextResponse.json(result.data)
}
```

## 🔧 **주요 특징**

### 1. **타입 안전성**
- 모든 Server Actions와 훅들이 TypeScript로 완전히 타입화됨
- Notion API 응답 타입과 일치하는 타입 정의
- 컴파일 타임 에러 검출

### 2. **에러 처리**
- 일관된 에러 응답 형식 (`{ success: boolean, data?: T, error?: string }`)
- 서버와 클라이언트에서 동일한 에러 처리 패턴
- 사용자 친화적인 에러 메시지

### 3. **캐싱 및 성능**
- React Query를 통한 자동 캐싱
- `staleTime` 설정으로 불필요한 요청 방지
- `revalidatePath`로 Next.js 캐시 무효화

### 4. **보안**
- JWT 암호화된 API 키 저장
- 서버 사이드에서만 API 키 접근
- 클라이언트에 민감한 정보 노출 방지

### 5. **확장성**
- 모듈화된 구조로 새로운 기능 추가 용이
- 일관된 패턴으로 유지보수성 향상
- 재사용 가능한 훅들

## 📊 **성능 최적화**

### 1. **캐싱 전략**
```typescript
// 데이터베이스: 5분 캐시
staleTime: 5 * 60 * 1000

// 페이지: 5분 캐시
staleTime: 5 * 60 * 1000

// 페이지 블록: 2분 캐시
staleTime: 2 * 60 * 1000

// 검색 결과: 2분 캐시
staleTime: 2 * 60 * 1000
```

### 2. **자동 무효화**
- 뮤테이션 성공 시 관련 쿼리 자동 무효화
- `revalidatePath`로 Next.js 캐시 무효화
- 실시간 데이터 동기화

### 3. **조건부 쿼리**
```typescript
// ID가 있을 때만 쿼리 실행
enabled: !!databaseId

// 검색어가 2글자 이상일 때만 실행
enabled: !!query && query.length > 2
```

## 🚀 **다음 단계**

1. **실시간 업데이트**: WebSocket 또는 Server-Sent Events 추가
2. **배치 작업**: 여러 작업을 한 번에 처리하는 기능
3. **오프라인 지원**: Service Worker를 통한 오프라인 캐싱
4. **고급 필터링**: 복잡한 쿼리 조건 지원
5. **대용량 데이터**: 가상화를 통한 대용량 데이터 처리

---

**Server Actions 기반 데이터 페칭 시스템이 완성되었습니다!** 🎉

이제 타입 안전하고 성능이 최적화된 Notion 통합 시스템을 사용할 수 있습니다.
