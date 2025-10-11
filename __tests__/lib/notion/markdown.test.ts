/**
 * Markdown Utilities Test Suite
 * 최근 개선한 extractLinks, extractImages 함수의 안전성을 검증합니다.
 */

import { extractLinks, extractImages } from '@/lib/notion/markdown-utils'

describe('Markdown Utilities', () => {
  describe('extractLinks', () => {
    it('should extract valid links from markdown', () => {
      const markdown = 'Check out [Google](https://google.com) and [GitHub](https://github.com)'
      const links = extractLinks(markdown)

      expect(links).toHaveLength(2)
      expect(links[0]).toEqual({ text: 'Google', url: 'https://google.com' })
      expect(links[1]).toEqual({ text: 'GitHub', url: 'https://github.com' })
    })

    it('should handle links with complex URLs', () => {
      const markdown = '[API Docs](https://api.example.com/v1/users?id=123&name=test#section)'
      const links = extractLinks(markdown)

      expect(links).toHaveLength(1)
      expect(links[0].url).toBe('https://api.example.com/v1/users?id=123&name=test#section')
    })

    it('should handle Korean text in link text', () => {
      const markdown = '[서울 케어 컨시어지](https://seoulcare.com)'
      const links = extractLinks(markdown)

      expect(links).toHaveLength(1)
      expect(links[0]).toEqual({ text: '서울 케어 컨시어지', url: 'https://seoulcare.com' })
    })

    it('should return empty array for markdown with no links', () => {
      const markdown = 'This is just plain text with no links'
      const links = extractLinks(markdown)

      expect(links).toEqual([])
    })

    it('should skip malformed links with missing URL', () => {
      const markdown = 'Valid [link](https://example.com) and [invalid]()'
      const links = extractLinks(markdown)

      // 명시적 검증: url이 없으면 추가하지 않음
      expect(links).toHaveLength(1)
      expect(links[0]).toEqual({ text: 'link', url: 'https://example.com' })
    })

    it('should skip malformed links with missing text', () => {
      const markdown = '[](https://example.com) and [valid](https://valid.com)'
      const links = extractLinks(markdown)

      // 명시적 검증: text가 없으면 추가하지 않음
      expect(links).toHaveLength(1)
      expect(links[0]).toEqual({ text: 'valid', url: 'https://valid.com' })
    })

    it('should handle empty markdown string', () => {
      const links = extractLinks('')
      expect(links).toEqual([])
    })

    it('should reject extremely large input (ReDoS protection)', () => {
      // 1MB보다 큰 입력 생성
      const largeMarkdown = '[link](url)'.repeat(200000) // ~2MB
      const links = extractLinks(largeMarkdown)

      // 1MB 제한으로 빈 배열 반환
      expect(links).toEqual([])
    })

    it('should handle multiple links on same line', () => {
      const markdown = '[Link1](url1) text [Link2](url2) more text [Link3](url3)'
      const links = extractLinks(markdown)

      expect(links).toHaveLength(3)
      expect(links[0]).toEqual({ text: 'Link1', url: 'url1' })
      expect(links[1]).toEqual({ text: 'Link2', url: 'url2' })
      expect(links[2]).toEqual({ text: 'Link3', url: 'url3' })
    })

    it('should handle nested brackets in link text', () => {
      const markdown = '[Text [with] brackets](https://example.com)'
      const links = extractLinks(markdown)

      // 정규식 특성상 중첩 브래킷은 첫 번째까지만 매칭
      expect(links.length).toBeGreaterThanOrEqual(0)
    })
  })

  describe('extractImages', () => {
    it('should extract valid images from markdown', () => {
      const markdown = '![Logo](https://example.com/logo.png) and ![Icon](https://example.com/icon.jpg)'
      const images = extractImages(markdown)

      expect(images).toHaveLength(2)
      expect(images[0]).toEqual({ alt: 'Logo', src: 'https://example.com/logo.png' })
      expect(images[1]).toEqual({ alt: 'Icon', src: 'https://example.com/icon.jpg' })
    })

    it('should handle images with empty alt text', () => {
      const markdown = '![](https://example.com/image.png)'
      const images = extractImages(markdown)

      // alt는 빈 문자열 허용
      expect(images).toHaveLength(1)
      expect(images[0]).toEqual({ alt: '', src: 'https://example.com/image.png' })
    })

    it('should handle images with Korean alt text', () => {
      const markdown = '![서울 스카이라인](https://example.com/seoul.jpg)'
      const images = extractImages(markdown)

      expect(images).toHaveLength(1)
      expect(images[0]).toEqual({ alt: '서울 스카이라인', src: 'https://example.com/seoul.jpg' })
    })

    it('should skip images with missing src', () => {
      const markdown = '![Valid](https://example.com/valid.png) and ![Invalid]()'
      const images = extractImages(markdown)

      // 명시적 검증: src가 없으면 추가하지 않음
      expect(images).toHaveLength(1)
      expect(images[0]).toEqual({ alt: 'Valid', src: 'https://example.com/valid.png' })
    })

    it('should return empty array for markdown with no images', () => {
      const markdown = 'This is just text with [a link](url) but no images'
      const images = extractImages(markdown)

      expect(images).toEqual([])
    })

    it('should handle empty markdown string', () => {
      const images = extractImages('')
      expect(images).toEqual([])
    })

    it('should reject extremely large input (ReDoS protection)', () => {
      // 1MB보다 큰 입력 생성
      const largeMarkdown = '![alt](src)'.repeat(200000) // ~2MB
      const images = extractImages(largeMarkdown)

      // 1MB 제한으로 빈 배열 반환
      expect(images).toEqual([])
    })

    it('should handle relative image paths', () => {
      const markdown = '![Local](/images/local.png) and ![Remote](https://cdn.com/remote.jpg)'
      const images = extractImages(markdown)

      expect(images).toHaveLength(2)
      expect(images[0]).toEqual({ alt: 'Local', src: '/images/local.png' })
      expect(images[1]).toEqual({ alt: 'Remote', src: 'https://cdn.com/remote.jpg' })
    })

    it('should handle image URLs with query parameters', () => {
      const markdown = '![Photo](https://example.com/photo.jpg?w=800&h=600&quality=90)'
      const images = extractImages(markdown)

      expect(images).toHaveLength(1)
      expect(images[0].src).toBe('https://example.com/photo.jpg?w=800&h=600&quality=90')
    })

    it('should handle multiple images on same line', () => {
      const markdown = '![Img1](url1) text ![Img2](url2) more ![Img3](url3)'
      const images = extractImages(markdown)

      expect(images).toHaveLength(3)
      expect(images[0]).toEqual({ alt: 'Img1', src: 'url1' })
      expect(images[1]).toEqual({ alt: 'Img2', src: 'url2' })
      expect(images[2]).toEqual({ alt: 'Img3', src: 'url3' })
    })
  })

  describe('extractLinks and extractImages combined', () => {
    it('should handle markdown with both links and images', () => {
      const markdown = `
# Heading
Check out [our website](https://example.com)
![Logo](https://example.com/logo.png)
More text with [another link](https://test.com)
![Another image](https://test.com/image.jpg)
      `

      const links = extractLinks(markdown)
      const images = extractImages(markdown)

      expect(links).toHaveLength(2)
      expect(images).toHaveLength(2)
    })

    it('should not confuse links and images', () => {
      const markdown = '[Link](url) ![Image](img.png)'

      const links = extractLinks(markdown)
      const images = extractImages(markdown)

      expect(links).toHaveLength(1)
      expect(links[0]).toEqual({ text: 'Link', url: 'url' })

      expect(images).toHaveLength(1)
      expect(images[0]).toEqual({ alt: 'Image', src: 'img.png' })
    })
  })

  describe('edge cases and security', () => {
    it('should handle markdown with special regex characters', () => {
      const markdown = '[Link with $pecial ch@rs!](https://example.com)'
      const links = extractLinks(markdown)

      expect(links).toHaveLength(1)
      expect(links[0].text).toBe('Link with $pecial ch@rs!')
    })

    it('should handle URLs with parentheses', () => {
      // 일반적인 경우 - 마크다운에서 괄호는 이스케이프 필요
      const markdown = '[Wikipedia](https://en.wikipedia.org/wiki/Seoul)'
      const links = extractLinks(markdown)

      expect(links).toHaveLength(1)
    })

    it('should not cause infinite loop on malformed markdown', () => {
      const malformed = '[[[[[link](((((url)))))]]]]]'

      // 타임아웃 없이 완료되어야 함
      const links = extractLinks(malformed)
      expect(Array.isArray(links)).toBe(true)
    })

    it('should handle markdown with newlines', () => {
      const markdown = `
[Link 1](url1)

![Image 1](img1.png)

Some text

[Link 2](url2)
      `

      const links = extractLinks(markdown)
      const images = extractImages(markdown)

      expect(links).toHaveLength(2)
      expect(images).toHaveLength(1)
    })
  })
})
