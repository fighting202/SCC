import { z } from 'zod';

// 환경 변수 스키마 정의
const envSchema = z.object({
  // Next.js 환경
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  // 애플리케이션 URL
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),

  // Tally Form
  NEXT_PUBLIC_TALLY_FORM_ID: z.string().min(1, 'Tally form ID is required'),

  // 연락처 정보
  NEXT_PUBLIC_EMAIL: z.string().email('Valid email is required'),
  NEXT_PUBLIC_WHATSAPP: z.string().min(1, 'WhatsApp number is required'),
  NEXT_PUBLIC_WECHAT_ID: z.string().min(1, 'WeChat ID is required'),

  // Notion CRM (서버 전용)
  NOTION_API_KEY: z.string().min(1, 'Notion API key is required').optional(),
  NOTION_DATABASE_ID: z
    .string()
    .min(1, 'Notion database ID is required')
    .optional(),

  // JWT Secret
  JWT_SECRET: z
    .string()
    .min(32, 'JWT secret must be at least 32 characters')
    .optional(),

  // Google Analytics (선택사항)
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_GTM_ID: z.string().optional(),

  // Vercel Analytics (선택사항)
  VERCEL_ANALYTICS_ID: z.string().optional(),
});

// 환경 변수 검증 및 파싱
function validateEnv() {
  try {
    const env = envSchema.parse(process.env);
    return { success: true, data: env, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors
        .map(err => `${err.path.join('.')}: ${err.message}`)
        .join('\n');

      console.error('❌ Environment validation failed:');
      console.error(errorMessages);

      return {
        success: false,
        data: null,
        error: `Environment validation failed:\n${errorMessages}`,
      };
    }

    return {
      success: false,
      data: null,
      error: `Unknown validation error: ${error}`,
    };
  }
}

// 환경 변수 검증 실행
const envValidation = validateEnv();

if (!envValidation.success) {
  throw new Error(envValidation.error || 'Environment validation failed');
}

// 타입 안전한 환경 변수 export
export const env = envValidation.data!;

// 환경 변수 타입 정의
export type Env = z.infer<typeof envSchema>;

// 개발 환경에서만 환경 변수 로그 출력
if (process.env.NODE_ENV === 'development') {
  console.log('✅ Environment variables validated successfully');
  console.log('📋 Loaded environment variables:');
  console.log(`   - NODE_ENV: ${env.NODE_ENV}`);
  console.log(`   - APP_URL: ${env.NEXT_PUBLIC_APP_URL}`);
  console.log(`   - TALLY_FORM_ID: ${env.NEXT_PUBLIC_TALLY_FORM_ID}`);
  console.log(`   - EMAIL: ${env.NEXT_PUBLIC_EMAIL}`);
  console.log(`   - WHATSAPP: ${env.NEXT_PUBLIC_WHATSAPP}`);
  console.log(`   - WECHAT_ID: ${env.NEXT_PUBLIC_WECHAT_ID}`);
  console.log(`   - GA_ID: ${env.NEXT_PUBLIC_GA_ID || 'Not set'}`);
  console.log(`   - GTM_ID: ${env.NEXT_PUBLIC_GTM_ID || 'Not set'}`);
}
