import { Client } from '@notionhq/client'
import { getNotionApiKey } from '@/app/actions/auth'

/**
 * Notion 서버 클라이언트
 * Server Actions와 서버 컴포넌트에서 사용
 */
export async function getNotionClient() {
  const apiKey = await getNotionApiKey()
  
  if (!apiKey) {
    throw new Error('Notion API 키가 설정되지 않았습니다. /setup 페이지에서 API 키를 설정해주세요.')
  }

  return new Client({ auth: apiKey })
}

/**
 * Notion 클라이언트 인스턴스 (캐시된 버전)
 */
let notionClient: Client | null = null

export async function getCachedNotionClient() {
  if (!notionClient) {
    notionClient = await getNotionClient()
  }
  return notionClient
}

/**
 * Notion API 키 유효성 검사
 */
export async function validateNotionApiKey(apiKey: string): Promise<boolean> {
  try {
    const client = new Client({ auth: apiKey })
    await client.users.me({})
    return true
  } catch (error) {
    console.error('Notion API 키 검증 실패:', error)
    return false
  }
}

/**
 * Notion 데이터베이스 검색
 */
export async function searchDatabases() {
  const client = await getNotionClient()
  return await client.search({
    filter: { property: 'object', value: 'database' }
  })
}

/**
 * Notion 페이지 검색
 */
export async function searchPages() {
  const client = await getNotionClient()
  return await client.search({
    filter: { property: 'object', value: 'page' }
  })
}

/**
 * 특정 데이터베이스 조회
 */
export async function getDatabase(databaseId: string) {
  const client = await getNotionClient()
  return await client.databases.retrieve({ database_id: databaseId })
}

/**
 * 데이터베이스의 페이지들 조회
 */
export async function getDatabasePages(databaseId: string, pageSize = 100) {
  const client = await getNotionClient()
  return await client.databases.query({
    database_id: databaseId,
    page_size: pageSize
  })
}

/**
 * 특정 페이지 조회
 */
export async function getPage(pageId: string) {
  const client = await getNotionClient()
  return await client.pages.retrieve({ page_id: pageId })
}

/**
 * 페이지 블록들 조회
 */
export async function getPageBlocks(pageId: string) {
  const client = await getNotionClient()
  return await client.blocks.children.list({ block_id: pageId })
}
