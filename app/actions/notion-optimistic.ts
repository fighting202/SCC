'use server'

import { getNotionClient } from '@/lib/notion/server'
import { revalidatePath } from 'next/cache'

/**
 * 페이지 제목 업데이트 (낙관적 UI용)
 */
export async function updatePageTitle(pageId: string, title: string) {
  try {
    const client = await getNotionClient()
    
    const updated = await client.pages.update({
      page_id: pageId,
      properties: {
        title: {
          title: [{ text: { content: title } }]
        }
      }
    })
    
    // 캐시 무효화
    revalidatePath('/pages')
    revalidatePath(`/pages/${pageId}`)
    
    return {
      success: true,
      data: updated,
      error: null
    }
  } catch (error) {
    console.error('페이지 제목 업데이트 실패:', error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : '페이지 제목 업데이트에 실패했습니다.'
    }
  }
}

/**
 * 페이지 속성 업데이트 (낙관적 UI용)
 */
export async function updatePageProperty(
  pageId: string, 
  propertyName: string, 
  value: any
) {
  try {
    const client = await getNotionClient()
    
    const updated = await client.pages.update({
      page_id: pageId,
      properties: {
        [propertyName]: value
      }
    })
    
    // 캐시 무효화
    revalidatePath('/pages')
    revalidatePath(`/pages/${pageId}`)
    
    return {
      success: true,
      data: updated,
      error: null
    }
  } catch (error) {
    console.error('페이지 속성 업데이트 실패:', error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : '페이지 속성 업데이트에 실패했습니다.'
    }
  }
}

/**
 * 데이터베이스 제목 업데이트 (낙관적 UI용)
 */
export async function updateDatabaseTitle(databaseId: string, title: string) {
  try {
    const client = await getNotionClient()
    
    const updated = await client.databases.update({
      database_id: databaseId,
      title: [{ text: { content: title } }]
    })
    
    // 캐시 무효화
    revalidatePath('/databases')
    revalidatePath(`/databases/${databaseId}`)
    
    return {
      success: true,
      data: updated,
      error: null
    }
  } catch (error) {
    console.error('데이터베이스 제목 업데이트 실패:', error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : '데이터베이스 제목 업데이트에 실패했습니다.'
    }
  }
}

/**
 * 블록 내용 업데이트 (낙관적 UI용)
 */
export async function updateBlockContent(blockId: string, content: any) {
  try {
    const client = await getNotionClient()
    
    const updated = await client.blocks.update({
      block_id: blockId,
      ...content
    })
    
    // 캐시 무효화
    revalidatePath('/pages')
    
    return {
      success: true,
      data: updated,
      error: null
    }
  } catch (error) {
    console.error('블록 내용 업데이트 실패:', error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : '블록 내용 업데이트에 실패했습니다.'
    }
  }
}

/**
 * 페이지 아카이브/복원 (낙관적 UI용)
 */
export async function togglePageArchive(pageId: string, archived: boolean) {
  try {
    const client = await getNotionClient()
    
    const updated = await client.pages.update({
      page_id: pageId,
      archived
    })
    
    // 캐시 무효화
    revalidatePath('/pages')
    revalidatePath(`/pages/${pageId}`)
    
    return {
      success: true,
      data: updated,
      error: null
    }
  } catch (error) {
    console.error('페이지 아카이브 토글 실패:', error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : '페이지 아카이브 토글에 실패했습니다.'
    }
  }
}

/**
 * 데이터베이스 아카이브/복원 (낙관적 UI용)
 */
export async function toggleDatabaseArchive(databaseId: string, archived: boolean) {
  try {
    const client = await getNotionClient()
    
    const updated = await client.databases.update({
      database_id: databaseId,
      archived
    } as any)
    
    // 캐시 무효화
    revalidatePath('/databases')
    revalidatePath(`/databases/${databaseId}`)
    
    return {
      success: true,
      data: updated,
      error: null
    }
  } catch (error) {
    console.error('데이터베이스 아카이브 토글 실패:', error)
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : '데이터베이스 아카이브 토글에 실패했습니다.'
    }
  }
}
