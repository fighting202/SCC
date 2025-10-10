'use server'

import { getNotionClient, searchDatabases, getDatabase, getDatabasePages } from '@/lib/notion/server'
import { revalidatePath } from 'next/cache'
import type { DatabaseObjectResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'

/**
 * 데이터베이스 입력 타입
 */
export interface DatabaseInput {
  parent: { type: 'page_id'; page_id: string } | { type: 'workspace'; workspace: true }
  title: Array<{ text: { content: string } }>
  properties: Record<string, any>
  description?: Array<{ text: { content: string } }>
  icon?: { emoji: string } | { external: { url: string } }
  cover?: { external: { url: string } }
}

/**
 * 데이터베이스 속성 업데이트 타입
 */
export interface DatabasePropertiesUpdate {
  [key: string]: any
}

/**
 * 모든 데이터베이스 조회
 */
export async function getDatabases() {
  try {
    const response = await searchDatabases()
    // DatabaseObjectResponse만 필터링
    const databases = (response.results as any[]).filter(
      (item) => item.object === 'database'
    ) as DatabaseObjectResponse[]
    return {
      success: true,
      data: databases,
      error: null
    }
  } catch (error) {
    console.error('데이터베이스 조회 실패:', error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : '데이터베이스 조회에 실패했습니다.'
    }
  }
}

/**
 * 특정 데이터베이스 조회
 */
export async function getDatabaseById(databaseId: string) {
  try {
    const database = await getDatabase(databaseId)
    return {
      success: true,
      data: database as DatabaseObjectResponse,
      error: null
    }
  } catch (error) {
    console.error('데이터베이스 조회 실패:', error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : '데이터베이스 조회에 실패했습니다.'
    }
  }
}

/**
 * 데이터베이스 생성
 */
export async function createDatabase(data: DatabaseInput) {
  try {
    const client = await getNotionClient()
    const database = await client.databases.create(data as any)
    
    // 캐시 무효화
    revalidatePath('/databases')
    revalidatePath('/')
    
    return {
      success: true,
      data: database as DatabaseObjectResponse,
      error: null
    }
  } catch (error) {
    console.error('데이터베이스 생성 실패:', error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : '데이터베이스 생성에 실패했습니다.'
    }
  }
}

/**
 * 데이터베이스 속성 업데이트
 */
export async function updateDatabaseProperties(
  databaseId: string, 
  properties: DatabasePropertiesUpdate
) {
  try {
    const client = await getNotionClient()
    const updated = await client.databases.update({
      database_id: databaseId,
      properties
    } as any)
    
    // 캐시 무효화
    revalidatePath('/databases')
    revalidatePath(`/databases/${databaseId}`)
    
    return {
      success: true,
      data: updated as DatabaseObjectResponse,
      error: null
    }
  } catch (error) {
    console.error('데이터베이스 업데이트 실패:', error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : '데이터베이스 업데이트에 실패했습니다.'
    }
  }
}

/**
 * 데이터베이스 삭제 (페이지로 변환)
 */
export async function deleteDatabase(databaseId: string) {
  try {
    const client = await getNotionClient()
    const updated = await client.databases.update({
      database_id: databaseId,
      archived: true
    } as any)
    
    // 캐시 무효화
    revalidatePath('/databases')
    revalidatePath(`/databases/${databaseId}`)
    
    return {
      success: true,
      data: updated as DatabaseObjectResponse,
      error: null
    }
  } catch (error) {
    console.error('데이터베이스 삭제 실패:', error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : '데이터베이스 삭제에 실패했습니다.'
    }
  }
}

/**
 * 데이터베이스의 페이지들 조회
 */
export async function getDatabasePagesById(databaseId: string, pageSize = 100) {
  try {
    const response = await getDatabasePages(databaseId, pageSize)
    return {
      success: true,
      data: [response] as unknown as PageObjectResponse[],
      hasMore: false,
      nextCursor: null,
      error: null
    }
  } catch (error) {
    console.error('데이터베이스 페이지 조회 실패:', error)
    return {
      success: false,
      data: null,
      hasMore: false,
      nextCursor: null,
      error: error instanceof Error ? error.message : '데이터베이스 페이지 조회에 실패했습니다.'
    }
  }
}

/**
 * 데이터베이스 검색
 */
export async function searchDatabasesByQuery(query: string) {
  try {
    const client = await getNotionClient()
    const response = await client.search({
      query,
      filter: { property: 'object', value: 'database' } as any
    })
    
    // DatabaseObjectResponse만 필터링
    const databases = (response.results as any[]).filter(
      (item) => item.object === 'database'
    ) as DatabaseObjectResponse[]
    return {
      success: true,
      data: databases,
      error: null
    }
  } catch (error) {
    console.error('데이터베이스 검색 실패:', error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : '데이터베이스 검색에 실패했습니다.'
    }
  }
}

/**
 * 데이터베이스 복제
 */
export async function duplicateDatabase(databaseId: string, newTitle?: string) {
  try {
    const client = await getNotionClient()
    
    // 원본 데이터베이스 정보 가져오기
    const originalDatabase = await getDatabase(databaseId) as any
    
    // 새 데이터베이스 생성
    const newDatabase = await client.databases.create({
      parent: { page_id: originalDatabase.parent.page_id },
      title: newTitle ? [{ text: { content: newTitle } }] : originalDatabase.title,
      properties: originalDatabase.properties,
      description: originalDatabase.description,
      icon: originalDatabase.icon,
      cover: originalDatabase.cover
    } as any)
    
    // 캐시 무효화
    revalidatePath('/databases')
    
    return {
      success: true,
      data: newDatabase as DatabaseObjectResponse,
      error: null
    }
  } catch (error) {
    console.error('데이터베이스 복제 실패:', error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : '데이터베이스 복제에 실패했습니다.'
    }
  }
}
