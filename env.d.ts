/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
// see https://nextjs.org/docs/app/building-your-application/configuring/typescript for more information.

declare namespace NodeJS {
  interface ProcessEnv {
    // ===== Seoul Care Concierge 환경 변수 타입 정의 =====

    // JWT Secret (필수)
    JWT_SECRET: string

    // Notion CRM Integration (필수)
    NOTION_API_KEY: string
    NOTION_DATABASE_ID: string

    // Public 환경 변수 (클라이언트에서 사용)
    NEXT_PUBLIC_TALLY_FORM_ID: string
    NEXT_PUBLIC_EMAIL: string
    NEXT_PUBLIC_WHATSAPP: string
    NEXT_PUBLIC_WECHAT_ID: string

    // Google Analytics (선택사항)
    NEXT_PUBLIC_GA_ID?: string
    NEXT_PUBLIC_GTM_ID?: string

    // Node 환경
    NODE_ENV: 'development' | 'production' | 'test'
  }
}
