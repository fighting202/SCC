'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import { useDebounce } from 'use-debounce'
import Fuse from 'fuse.js'
import { cn } from '@/lib/scc-utils'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc, 
  Grid, 
  List, 
  Calendar,
  User,
  FileText,
  Database,
  X,
  Loader2
} from 'lucide-react'
import { NotionPage, NotionDatabase } from '@/lib/scc_types'
import { format } from 'date-fns'

interface NotionSearchProps {
  pages: NotionPage[]
  databases: NotionDatabase[]
  onPageSelect?: (page: NotionPage) => void
  onDatabaseSelect?: (database: NotionDatabase) => void
  className?: string
  placeholder?: string
  showFilters?: boolean
  showSortOptions?: boolean
  maxResults?: number
}

type SearchResult = {
  item: NotionPage | NotionDatabase
  type: 'page' | 'database'
  score: number
}

type SortOption = 'relevance' | 'title' | 'created' | 'modified'
type ViewMode = 'grid' | 'list'

export function NotionSearch({
  pages,
  databases,
  onPageSelect,
  onDatabaseSelect,
  className,
  placeholder = "Notion에서 검색...",
  showFilters = true,
  showSortOptions = true,
  maxResults = 50
}: NotionSearchProps) {
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounce(query, 300)
  const [sortBy, setSortBy] = useState<SortOption>('relevance')
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedTypes, setSelectedTypes] = useState<Set<'page' | 'database'>>(new Set(['page', 'database']))
  const [isLoading, setIsLoading] = useState(false)

  // Fuse.js 설정
  const fuseOptions = {
    keys: [
      { name: 'title', weight: 0.7 },
      { name: 'properties', weight: 0.3 }
    ],
    threshold: 0.3,
    includeScore: true,
    minMatchCharLength: 2
  }

  // 페이지 검색 인덱스
  const pageFuse = useMemo(() => {
    const searchablePages = pages.map(page => ({
      ...page,
      title: extractPageTitle(page),
      searchableContent: extractSearchableContent(page)
    }))
    return new Fuse(searchablePages, fuseOptions)
  }, [pages])

  // 데이터베이스 검색 인덱스
  const databaseFuse = useMemo(() => {
    const searchableDatabases = databases.map(db => ({
      ...db,
      title: db.title,
      searchableContent: db.description || ''
    }))
    return new Fuse(searchableDatabases, fuseOptions)
  }, [databases])

  // 페이지 제목 추출
  const extractPageTitle = (page: NotionPage): string => {
    const titleProperty = Object.values(page.properties).find(
      (prop: any) => prop.type === 'title'
    ) as any
    return titleProperty?.title?.[0]?.plain_text || '제목 없음'
  }

  // 검색 가능한 콘텐츠 추출
  const extractSearchableContent = (page: NotionPage): string => {
    return Object.values(page.properties)
      .map((prop: any) => {
        if (prop.type === 'title' || prop.type === 'rich_text') {
          return prop.title || prop.rich_text?.map((text: any) => text.plain_text).join(' ') || ''
        }
        return ''
      })
      .join(' ')
  }

  // 검색 실행
  const searchResults = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return []
    }

    setIsLoading(true)
    
    const results: SearchResult[] = []

    // 페이지 검색
    if (selectedTypes.has('page')) {
      const pageResults = pageFuse.search(debouncedQuery)
      results.push(...pageResults.map(result => ({
        item: result.item as NotionPage,
        type: 'page' as const,
        score: result.score || 0
      })))
    }

    // 데이터베이스 검색
    if (selectedTypes.has('database')) {
      const databaseResults = databaseFuse.search(debouncedQuery)
      results.push(...databaseResults.map(result => ({
        item: result.item as NotionDatabase,
        type: 'database' as const,
        score: result.score || 0
      })))
    }

    // 정렬
    const sortedResults = results.sort((a, b) => {
      switch (sortBy) {
        case 'relevance':
          return a.score - b.score
        case 'title':
          const titleA = a.type === 'page' ? extractPageTitle(a.item as NotionPage) : (a.item as NotionDatabase).title
          const titleB = b.type === 'page' ? extractPageTitle(b.item as NotionPage) : (b.item as NotionDatabase).title
          return titleA.localeCompare(titleB)
        case 'created':
          return new Date(a.item.created_time).getTime() - new Date(b.item.created_time).getTime()
        case 'modified':
          return new Date(a.item.last_edited_time).getTime() - new Date(b.item.last_edited_time).getTime()
        default:
          return 0
      }
    })

    setIsLoading(false)
    return sortedResults.slice(0, maxResults)
  }, [debouncedQuery, pageFuse, databaseFuse, selectedTypes, sortBy, maxResults])

  // 타입 필터 토글
  const toggleTypeFilter = useCallback((type: 'page' | 'database') => {
    setSelectedTypes(prev => {
      const newSet = new Set(prev)
      if (newSet.has(type)) {
        newSet.delete(type)
      } else {
        newSet.add(type)
      }
      return newSet
    })
  }, [])

  // 결과 아이템 클릭 핸들러
  const handleItemClick = useCallback((result: SearchResult) => {
    if (result.type === 'page') {
      onPageSelect?.(result.item as NotionPage)
    } else {
      onDatabaseSelect?.(result.item as NotionDatabase)
    }
  }, [onPageSelect, onDatabaseSelect])

  // 검색어 클리어
  const clearQuery = useCallback(() => {
    setQuery('')
  }, [])

  return (
    <div className={cn("space-y-4", className)}>
      {/* 검색 입력 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearQuery}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* 필터 및 정렬 옵션 */}
      {(showFilters || showSortOptions) && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {showFilters && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  필터
                </Button>
                
                {showFilters && (
                  <div className="flex items-center gap-2">
                    <Button
                      variant={selectedTypes.has('page') ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => toggleTypeFilter('page')}
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      페이지
                    </Button>
                    <Button
                      variant={selectedTypes.has('database') ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => toggleTypeFilter('database')}
                    >
                      <Database className="h-4 w-4 mr-1" />
                      데이터베이스
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            {showSortOptions && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">정렬:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="text-sm border rounded px-2 py-1"
                >
                  <option value="relevance">관련성</option>
                  <option value="title">제목</option>
                  <option value="created">생성일</option>
                  <option value="modified">수정일</option>
                </select>
              </div>
            )}

            <div className="flex items-center gap-1">
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 검색 결과 */}
      <div className="space-y-2">
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span className="text-muted-foreground">검색 중...</span>
          </div>
        )}

        {!isLoading && debouncedQuery && searchResults.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>검색 결과가 없습니다.</p>
            <p className="text-sm">다른 검색어를 시도해보세요.</p>
          </div>
        )}

        {!isLoading && searchResults.length > 0 && (
          <div className={cn(
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" 
              : "space-y-2"
          )}>
            {searchResults.map((result, index) => (
              <SearchResultItem
                key={`${result.type}-${result.item.id}`}
                result={result}
                viewMode={viewMode}
                onClick={() => handleItemClick(result)}
              />
            ))}
          </div>
        )}

        {!debouncedQuery && (
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>검색어를 입력하여 Notion 콘텐츠를 찾아보세요.</p>
          </div>
        )}
      </div>
    </div>
  )
}

// 검색 결과 아이템 컴포넌트
interface SearchResultItemProps {
  result: SearchResult
  viewMode: ViewMode
  onClick: () => void
}

function SearchResultItem({ result, viewMode, onClick }: SearchResultItemProps) {
  const isPage = result.type === 'page'
  const page = isPage ? result.item as NotionPage : null
  const database = !isPage ? result.item as NotionDatabase : null

  const title = isPage 
    ? extractPageTitle(page!) 
    : database!.title

  const description = isPage
    ? extractPageDescription(page!)
    : database!.description

  const icon = isPage ? FileText : Database
  const Icon = icon

  return (
    <Card 
      className={cn(
        "cursor-pointer hover:shadow-md transition-shadow",
        viewMode === 'grid' ? "h-full" : ""
      )}
      onClick={onClick}
    >
      <CardHeader className={cn("pb-2", viewMode === 'grid' ? "pb-4" : "pb-2")}>
        <div className="flex items-start gap-2">
          <Icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <CardTitle className="text-sm font-medium truncate">
              {title}
            </CardTitle>
            {description && (
              <CardDescription className="text-xs mt-1 line-clamp-2">
                {description}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className={cn("pt-0", viewMode === 'grid' ? "pt-0" : "pt-0")}>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {isPage ? '페이지' : '데이터베이스'}
            </Badge>
            <span>
              {format(new Date(result.item.last_edited_time), 'MMM d, yyyy')}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span className="truncate max-w-20">
              {result.item.created_by?.name || 'Unknown'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// 페이지 설명 추출
function extractPageDescription(page: NotionPage): string {
  const descriptionProperty = Object.values(page.properties).find(
    (prop: any) => prop.type === 'rich_text' && prop.rich_text?.length > 0
  ) as any

  if (descriptionProperty?.rich_text?.[0]?.plain_text) {
    return descriptionProperty.rich_text[0].plain_text
  }

  return ''
}

// 페이지 제목 추출 (중복 함수)
function extractPageTitle(page: NotionPage): string {
  const titleProperty = Object.values(page.properties).find(
    (prop: any) => prop.type === 'title'
  ) as any
  return titleProperty?.title?.[0]?.plain_text || '제목 없음'
}
