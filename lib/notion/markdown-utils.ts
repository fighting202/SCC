/**
 * Markdown 유틸리티 함수들
 * 서버 의존성 없이 순수 함수로 제공
 */

/**
 * 마크다운에서 링크 추출
 */
export function extractLinks(markdown: string): Array<{ text: string; url: string }> {
  // 입력 길이 검증 (1MB 제한)
  if (markdown.length > 1000000) {
    console.warn('Markdown content too large for link extraction')
    return []
  }

  // (?<!) negative lookbehind를 사용하여 !로 시작하지 않는 패턴만 매칭
  const linkRegex = /(?<!!)\[([^\]]+)\]\(([^)]+)\)/g
  const links: Array<{ text: string; url: string }> = []
  let match

  while ((match = linkRegex.exec(markdown)) !== null) {
    // 명시적 검증: 두 캡처 그룹이 모두 존재할 때만 추가
    if (match[1] && match[2]) {
      links.push({
        text: match[1],
        url: match[2]
      })
    }
  }

  return links
}

/**
 * 마크다운에서 이미지 추출
 */
export function extractImages(markdown: string): Array<{ alt: string; src: string }> {
  // 입력 길이 검증 (1MB 제한)
  if (markdown.length > 1000000) {
    console.warn('Markdown content too large for image extraction')
    return []
  }

  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g
  const images: Array<{ alt: string; src: string }> = []
  let match

  while ((match = imageRegex.exec(markdown)) !== null) {
    // 명시적 검증: src는 필수, alt는 빈 문자열 허용
    if (match[2]) {
      images.push({
        alt: match[1] || '',
        src: match[2]
      })
    }
  }

  return images
}
