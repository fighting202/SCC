import { Client } from '@notionhq/client'
import { getNotionClient } from '@/app/actions/auth'

/**
 * Notion 클라이언트 인스턴스를 가져옵니다.
 * 쿠키에서 API 키를 읽어와서 클라이언트를 생성합니다.
 */
export async function getNotionClientInstance(): Promise<Client | null> {
  return await getNotionClient()
}

/**
 * 서버 컴포넌트에서 사용할 수 있는 Notion 클라이언트
 * 환경 변수 대신 쿠키에서 API 키를 가져옵니다.
 */
export async function createNotionClient(): Promise<Client> {
  const client = await getNotionClientInstance()
  
  if (!client) {
    throw new Error('Notion API 키가 설정되지 않았습니다. /setup 페이지에서 API 키를 설정해주세요.')
  }
  
  return client
}

/**
 * 클라이언트 컴포넌트에서 사용할 수 있는 Notion 클라이언트
 * fetch를 통해 서버 액션을 호출합니다.
 */
export async function createNotionClientForClient(): Promise<Client> {
  const response = await fetch('/api/notion/client', {
    method: 'GET',
    credentials: 'include',
  })
  
  if (!response.ok) {
    throw new Error('Notion 클라이언트를 가져올 수 없습니다.')
  }
  
  const { apiKey } = await response.json()
  
  if (!apiKey) {
    throw new Error('Notion API 키가 설정되지 않았습니다.')
  }
  
  return new Client({ auth: apiKey })
}

/**
 * Notion API 호출을 위한 헬퍼 함수들
 */
export class NotionService {
  private client: Client

  constructor(client: Client) {
    this.client = client
  }

  /**
   * 사용자 정보 가져오기
   */
  async getCurrentUser() {
    return await this.client.users.me()
  }

  /**
   * 데이터베이스 목록 가져오기
   */
  async getDatabases() {
    return await this.client.search({
      filter: {
        property: 'object',
        value: 'database'
      }
    })
  }

  /**
   * 특정 데이터베이스의 페이지들 가져오기
   */
  async getDatabasePages(databaseId: string) {
    return await this.client.databases.query({
      database_id: databaseId
    })
  }

  /**
   * 페이지 상세 정보 가져오기
   */
  async getPage(pageId: string) {
    return await this.client.pages.retrieve({ page_id: pageId })
  }

  /**
   * 페이지 블록들 가져오기
   */
  async getPageBlocks(pageId: string) {
    return await this.client.blocks.children.list({
      block_id: pageId
    })
  }

  /**
   * 새 페이지 생성
   */
  async createPage(databaseId: string, properties: any) {
    return await this.client.pages.create({
      parent: { database_id: databaseId },
      properties: properties
    })
  }

  /**
   * 페이지 업데이트
   */
  async updatePage(pageId: string, properties: any) {
    return await this.client.pages.update({
      page_id: pageId,
      properties: properties
    })
  }

  /**
   * 페이지 삭제
   */
  async deletePage(pageId: string) {
    return await this.client.pages.update({
      page_id: pageId,
      archived: true
    })
  }
}

/**
 * Notion 서비스 인스턴스 생성
 */
export async function createNotionService(): Promise<NotionService> {
  const client = await createNotionClient()
  return new NotionService(client)
}

/**
 * 클라이언트 컴포넌트용 Notion 서비스 생성
 */
export async function createNotionServiceForClient(): Promise<NotionService> {
  const client = await createNotionClientForClient()
  return new NotionService(client)
}
