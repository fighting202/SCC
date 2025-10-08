'use server'

import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Client } from '@notionhq/client'

// JWT 시크릿 키 (환경 변수에서 가져옴)
const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || (() => {
    throw new Error('JWT_SECRET 환경 변수가 설정되지 않았습니다. .env.local 파일을 확인해주세요.')
  })()
)

// 쿠키 설정
const COOKIE_NAME = 'notion-auth-token'
const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 60 * 60 * 24 * 7, // 7일
}

/**
 * Notion API 키를 암호화하여 쿠키에 저장
 */
export async function saveNotionApiKey(apiKey: string) {
  try {
    // 1. Notion API 연결 테스트
    const notion = new Client({ auth: apiKey })
    
    // 간단한 API 호출로 연결 테스트
    await notion.users.me()
    
    // 2. JWT 토큰 생성
    const token = await new SignJWT({ apiKey })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(JWT_SECRET)
    
    // 3. 쿠키에 저장
    const cookieStore = await cookies()
    cookieStore.set(COOKIE_NAME, token, COOKIE_OPTIONS)
    
    return { success: true }
  } catch (error) {
    console.error('Notion API 연결 실패:', error)
    return { 
      success: false, 
      error: 'Invalid Notion API key. Please check your integration token.' 
    }
  }
}

/**
 * 쿠키에서 Notion API 키를 복호화하여 반환
 */
export async function getNotionApiKey(): Promise<string | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(COOKIE_NAME)?.value
    
    if (!token) return null
    
    // JWT 토큰 검증 및 복호화
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload.apiKey as string
  } catch (error) {
    console.error('API 키 복호화 실패:', error)
    return null
  }
}

/**
 * Notion 클라이언트 인스턴스 생성
 */
export async function getNotionClient(): Promise<Client | null> {
  const apiKey = await getNotionApiKey()
  if (!apiKey) return null
  
  return new Client({ auth: apiKey })
}

/**
 * API 키 유효성 검사
 */
export async function validateNotionApiKey(): Promise<boolean> {
  try {
    const client = await getNotionClient()
    if (!client) return false
    
    await client.users.me()
    return true
  } catch (error) {
    console.error('API 키 유효성 검사 실패:', error)
    return false
  }
}

/**
 * 로그아웃: 쿠키 삭제
 */
export async function clearNotionApiKey() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

/**
 * 인증 상태 확인 및 리다이렉트
 */
export async function checkAuthAndRedirect() {
  const isValid = await validateNotionApiKey()
  if (!isValid) {
    redirect('/setup')
  }
}

/**
 * API 키 재설정
 */
export async function resetNotionApiKey() {
  await clearNotionApiKey()
  redirect('/setup')
}
