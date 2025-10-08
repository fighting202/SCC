'use server'

import { getNotionClient, searchPages, getPage, getPageBlocks } from '@/lib/notion/server'
import { revalidatePath } from 'next/cache'
import type { PageObjectResponse, BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

/**
 * 페이지 입력 타입
 */
export interface PageInput {
  parent: { database_id: string } | { page_id: string }
  properties: Record<string, any>
  children?: BlockObjectResponse[]
  icon?: { emoji: string } | { external: { url: string } }
  cover?: { external: { url: string } }
}

/**
 * 페이지 속성 업데이트 타입
 */
export interface PagePropertiesUpdate {
  [key: string]: any
}

/**
 * 모든 페이지 조회
 */
export async function getPages() {
  try {
    const response = await searchPages()
    return {
      success: true,
      data: response.results as PageObjectResponse[],
      error: null
    }
  } catch (error) {
    console.error('페이지 조회 실패:', error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : '페이지 조회에 실패했습니다.'
    }
  }
}

/**
 * 특정 페이지 조회
 */
export async function getPageById(pageId: string) {
  try {
    const page = await getPage(pageId)
    return {
      success: true,
      data: page as PageObjectResponse,
      error: null
    }
  } catch (error) {
    console.error('페이지 조회 실패:', error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : '페이지 조회에 실패했습니다.'
    }
  }
}

/**
 * 페이지 생성
 */
export async function createPage(data: PageInput) {
  try {
    const client = await getNotionClient()
    const page = await client.pages.create(data)
    
    // 캐시 무효화
    revalidatePath('/pages')
    revalidatePath('/')
    
    return {
      success: true,
      data: page as PageObjectResponse,
      error: null
    }
  } catch (error) {
    console.error('페이지 생성 실패:', error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : '페이지 생성에 실패했습니다.'
    }
  }
}

/**
 * 페이지 속성 업데이트
 */
export async function updatePageProperties(
  pageId: string, 
  properties: PagePropertiesUpdate
) {
  try {
    const client = await getNotionClient()
    const updated = await client.pages.update({
      page_id: pageId,
      properties
    })
    
    // 캐시 무효화
    revalidatePath('/pages')
    revalidatePath(`/pages/${pageId}`)
    
    return {
      success: true,
      data: updated as PageObjectResponse,
      error: null
    }
  } catch (error) {
    console.error('페이지 업데이트 실패:', error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : '페이지 업데이트에 실패했습니다.'
    }
  }
}

/**
 * 페이지 삭제 (아카이브)
 */
export async function deletePage(pageId: string) {
  try {
    const client = await getNotionClient()
    const updated = await client.pages.update({
      page_id: pageId,
      archived: true
    })
    
    // 캐시 무효화
    revalidatePath('/pages')
    revalidatePath(`/pages/${pageId}`)
    
    return {
      success: true,
      data: updated as PageObjectResponse,
      error: null
    }
  } catch (error) {
    console.error('페이지 삭제 실패:', error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : '페이지 삭제에 실패했습니다.'
    }
  }
}

/**
 * 페이지의 블록들 조회
 */
export async function getPageBlocksById(pageId: string) {
  try {
    const response = await getPageBlocks(pageId)
    return {
      success: true,
      data: response.results as BlockObjectResponse[],
      hasMore: response.has_more,
      nextCursor: response.next_cursor,
      error: null
    }
  } catch (error) {
    console.error('페이지 블록 조회 실패:', error)
    return {
      success: false,
      data: null,
      hasMore: false,
      nextCursor: null,
      error: error instanceof Error ? error.message : '페이지 블록 조회에 실패했습니다.'
    }
  }
}

/**
 * 페이지 검색
 */
export async function searchPagesByQuery(query: string) {
  try {
    const client = await getNotionClient()
    const response = await client.search({
      query,
      filter: { property: 'object', value: 'page' }
    })
    
    return {
      success: true,
      data: response.results as PageObjectResponse[],
      error: null
    }
  } catch (error) {
    console.error('페이지 검색 실패:', error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : '페이지 검색에 실패했습니다.'
    }
  }
}

/**
 * 페이지 복제
 */
export async function duplicatePage(pageId: string, newTitle?: string) {
  try {
    const client = await getNotionClient()
    
    // 원본 페이지 정보 가져오기
    const originalPage = await getPage(pageId)
    const originalBlocks = await getPageBlocks(pageId)
    
    // 새 페이지 생성
    const newPage = await client.pages.create({
      parent: originalPage.parent,
      properties: {
        ...originalPage.properties,
        ...(newTitle && originalPage.properties.title ? {
          title: [{ text: { content: newTitle } }]
        } : {})
      },
      children: originalBlocks.results as BlockObjectResponse[],
      icon: originalPage.icon,
      cover: originalPage.cover
    })
    
    // 캐시 무효화
    revalidatePath('/pages')
    
    return {
      success: true,
      data: newPage as PageObjectResponse,
      error: null
    }
  } catch (error) {
    console.error('페이지 복제 실패:', error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : '페이지 복제에 실패했습니다.'
    }
  }
}

/**
 * 페이지 이동 (다른 데이터베이스로)
 */
export async function movePageToDatabase(pageId: string, databaseId: string) {
  try {
    const client = await getNotionClient()
    
    // 페이지의 현재 속성 가져오기
    const page = await getPage(pageId)
    
    // 새 데이터베이스로 이동
    const updated = await client.pages.update({
      page_id: pageId,
      parent: { database_id: databaseId },
      properties: page.properties
    })
    
    // 캐시 무효화
    revalidatePath('/pages')
    revalidatePath(`/pages/${pageId}`)
    revalidatePath(`/databases/${databaseId}`)
    
    return {
      success: true,
      data: updated as PageObjectResponse,
      error: null
    }
  } catch (error) {
    console.error('페이지 이동 실패:', error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : '페이지 이동에 실패했습니다.'
    }
  }
}

/**
 * 페이지 공유 설정
 */
export async function updatePageSharing(pageId: string, publicAccess: boolean) {
  try {
    const client = await getNotionClient()
    
    if (publicAccess) {
      // 페이지를 공개로 설정
      await client.pages.update({
        page_id: pageId,
        properties: {}
      })
    }
    
    // 캐시 무효화
    revalidatePath('/pages')
    revalidatePath(`/pages/${pageId}`)
    
    return {
      success: true,
      data: { publicAccess },
      error: null
    }
  } catch (error) {
    console.error('페이지 공유 설정 실패:', error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : '페이지 공유 설정에 실패했습니다.'
    }
  }
}
