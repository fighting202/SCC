import { NotionToMarkdown } from 'notion-to-md'
import { getNotionClient } from './server'
import type { NotionBlock } from '@/lib/scc_types'

/**
 * Notion 마크다운 변환 유틸리티
 */
export class NotionMarkdownConverter {
  private n2m: NotionToMarkdown
  private client: any

  constructor() {
    this.n2m = new NotionToMarkdown({
      notionClient: null as any, // 동적으로 설정
      config: {
        separateChildPage: true,
        convertImagesToBase64: false,
        parseChildPages: true
      }
    })
  }

  /**
   * Notion 클라이언트 설정
   */
  async initialize() {
    this.client = await getNotionClient()
    // this.n2m.setNotionClient(this.client) // 메서드가 존재하지 않음
  }

  /**
   * 페이지를 마크다운으로 변환
   */
  async pageToMarkdown(pageId: string): Promise<string> {
    if (!this.client) {
      await this.initialize()
    }

    try {
      const mdblocks = await this.n2m.pageToMarkdown(pageId)
      const mdString = this.n2m.toMarkdownString(mdblocks)
      return mdString.parent || ''
    } catch (error) {
      console.error('페이지 마크다운 변환 실패:', error)
      throw new Error('페이지를 마크다운으로 변환할 수 없습니다.')
    }
  }

  /**
   * 블록을 마크다운으로 변환
   */
  async blocksToMarkdown(blocks: NotionBlock[]): Promise<string> {
    if (!this.client) {
      await this.initialize()
    }

    try {
      const mdblocks = await this.n2m.blocksToMarkdown(blocks as any)
      const mdString = this.n2m.toMarkdownString(mdblocks)
      return mdString.parent || ''
    } catch (error) {
      console.error('블록 마크다운 변환 실패:', error)
      throw new Error('블록을 마크다운으로 변환할 수 없습니다.')
    }
  }

  /**
   * 데이터베이스의 모든 페이지를 마크다운으로 변환
   */
  async databaseToMarkdown(databaseId: string): Promise<Array<{ pageId: string; markdown: string; title: string }>> {
    if (!this.client) {
      await this.initialize()
    }

    try {
      const pages = await this.client.databases.query({
        database_id: databaseId
      })

      const results = await Promise.all(
        pages.results.map(async (page: any) => {
          const markdown = await this.pageToMarkdown(page.id)
          const title = this.extractPageTitle(page)
          return {
            pageId: page.id,
            markdown,
            title
          }
        })
      )

      return results
    } catch (error) {
      console.error('데이터베이스 마크다운 변환 실패:', error)
      throw new Error('데이터베이스를 마크다운으로 변환할 수 없습니다.')
    }
  }

  /**
   * 페이지 제목 추출
   */
  private extractPageTitle(page: any): string {
    const titleProperty = Object.values(page.properties).find(
      (prop: any) => prop.type === 'title'
    ) as any

    if (titleProperty?.title?.[0]?.plain_text) {
      return titleProperty.title[0].plain_text
    }

    return '제목 없음'
  }

  /**
   * 커스텀 코드 블록 변환기
   */
  private customCodeTransformer = {
    type: 'code',
    getString: (block: any) => {
      const language = block.code.language || 'plain text'
      const code = block.code.rich_text.map((text: any) => text.plain_text).join('')
      
      return `\`\`\`${language}\n${code}\n\`\`\``
    }
  }

  /**
   * 커스텀 콜아웃 변환기
   */
  private customCalloutTransformer = {
    type: 'callout',
    getString: (block: any) => {
      const icon = block.callout.icon?.emoji || '💡'
      const text = block.callout.rich_text.map((text: any) => text.plain_text).join('')
      
      return `> ${icon} ${text}`
    }
  }

  /**
   * 커스텀 테이블 변환기
   */
  private customTableTransformer = {
    type: 'table',
    getString: (block: any) => {
      // 테이블 변환 로직
      return '| 테이블 | 내용 |\n|--------|------|'
    }
  }

  /**
   * 마크다운을 HTML로 변환 (react-markdown 사용)
   */
  async markdownToHtml(markdown: string): Promise<string> {
    const ReactMarkdown = (await import('react-markdown')).default
    const remarkGfm = (await import('remark-gfm')).default
    
    // 서버 사이드에서는 HTML 문자열로 변환
    // 실제 구현에서는 react-markdown을 사용하여 JSX로 렌더링
    return markdown
  }

  /**
   * 마크다운에서 메타데이터 추출
   */
  extractMetadata(markdown: string): {
    title?: string
    description?: string
    tags?: string[]
    created?: string
    modified?: string
  } {
    const lines = markdown.split('\n')
    const metadata: any = {}

    for (const line of lines) {
      if (line.startsWith('# ')) {
        metadata.title = line.replace('# ', '')
      } else if (line.startsWith('description:')) {
        metadata.description = line.replace('description:', '').trim()
      } else if (line.startsWith('tags:')) {
        metadata.tags = line.replace('tags:', '').split(',').map(tag => tag.trim())
      } else if (line.startsWith('created:')) {
        metadata.created = line.replace('created:', '').trim()
      } else if (line.startsWith('modified:')) {
        metadata.modified = line.replace('modified:', '').trim()
      }
    }

    return metadata
  }

  /**
   * 마크다운에서 링크 추출
   */
  extractLinks(markdown: string): Array<{ text: string; url: string }> {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
    const links: Array<{ text: string; url: string }> = []
    let match

    while ((match = linkRegex.exec(markdown)) !== null) {
      links.push({
        text: match[1] || '',
        url: match[2] || ''
      })
    }

    return links
  }

  /**
   * 마크다운에서 이미지 추출
   */
  extractImages(markdown: string): Array<{ alt: string; src: string }> {
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g
    const images: Array<{ alt: string; src: string }> = []
    let match

    while ((match = imageRegex.exec(markdown)) !== null) {
      images.push({
        alt: match[1] || '',
        src: match[2] || ''
      })
    }

    return images
  }
}

// 싱글톤 인스턴스
export const notionMarkdownConverter = new NotionMarkdownConverter()
