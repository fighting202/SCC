'use client'

import { useState, useMemo, useCallback } from 'react'
import { FixedSizeList as List } from 'react-window'
import { Virtuoso } from 'react-virtuoso'
import { cn } from '@/lib/scc-utils'
import { NotionBlock } from '@/lib/scc_types'
import { BlockRenderer } from '../blocks/BlockRenderer'
import { DraggableBlock } from '../interactions/DraggableBlock'

interface VirtualizedBlockListProps {
  blocks: NotionBlock[]
  height?: number
  itemHeight?: number
  className?: string
  showDragHandles?: boolean
  onEdit?: (block: NotionBlock) => void
  onDelete?: (blockId: string) => void
  onDuplicate?: (block: NotionBlock) => void
  onAddChild?: (parentId: string) => void
  onReorder?: (blocks: NotionBlock[]) => void
}

// 가상화된 블록 아이템 컴포넌트
interface VirtualBlockItemProps {
  index: number
  style: React.CSSProperties
  data: {
    blocks: NotionBlock[]
    onEdit?: (block: NotionBlock) => void
    onDelete?: (blockId: string) => void
    onDuplicate?: (block: NotionBlock) => void
    onAddChild?: (parentId: string) => void
    showDragHandles?: boolean
  }
}

function VirtualBlockItem({ index, style, data }: VirtualBlockItemProps) {
  const { blocks, onEdit, onDelete, onDuplicate, onAddChild, showDragHandles } = data
  const block = blocks[index]

  if (!block) return null

  return (
    <div style={style} className="px-2">
      <DraggableBlock
        block={block}
        index={index}
        onEdit={onEdit}
        onDelete={onDelete}
        onDuplicate={onDuplicate}
        onAddChild={onAddChild}
        showActions={showDragHandles}
      />
    </div>
  )
}

// React Window 기반 가상화
export function VirtualizedBlockList({
  blocks,
  height = 600,
  itemHeight = 120,
  className,
  showDragHandles = true,
  onEdit,
  onDelete,
  onDuplicate,
  onAddChild,
  onReorder
}: VirtualizedBlockListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'created' | 'modified' | 'type'>('created')

  // 필터링 및 정렬된 블록 목록
  const filteredBlocks = useMemo(() => {
    let filtered = [...blocks]

    // 검색 필터
    if (searchQuery) {
      filtered = filtered.filter(block => {
        const searchableContent = extractSearchableContent(block)
        return searchableContent.toLowerCase().includes(searchQuery.toLowerCase())
      })
    }

    // 정렬
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'created':
          return new Date(a.created_time).getTime() - new Date(b.created_time).getTime()
        case 'modified':
          return new Date(b.last_edited_time).getTime() - new Date(a.last_edited_time).getTime()
        case 'type':
          return a.type.localeCompare(b.type)
        default:
          return 0
      }
    })

    return filtered
  }, [blocks, searchQuery, sortBy])

  // 검색 가능한 콘텐츠 추출
  const extractSearchableContent = (block: NotionBlock): string => {
    const content = block.content || {}
    return Object.values(content)
      .map((value: any) => {
        if (typeof value === 'string') return value
        if (Array.isArray(value)) {
          return value.map((item: any) => 
            typeof item === 'string' ? item : item?.plain_text || ''
          ).join(' ')
        }
        return ''
      })
      .join(' ')
  }

  // 아이템 데이터
  const itemData = useMemo(() => ({
    blocks: filteredBlocks,
    onEdit,
    onDelete,
    onDuplicate,
    onAddChild,
    showDragHandles
  }), [filteredBlocks, onEdit, onDelete, onDuplicate, onAddChild, showDragHandles])

  return (
    <div className={cn("space-y-4", className)}>
      {/* 검색 및 정렬 컨트롤 */}
      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <input
          type="text"
          placeholder="블록 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="created">생성일순</option>
          <option value="modified">수정일순</option>
          <option value="type">타입순</option>
        </select>
        <div className="text-sm text-muted-foreground">
          {filteredBlocks.length}개 블록
        </div>
      </div>

      {/* 가상화된 리스트 */}
      <div className="border rounded-lg overflow-hidden">
        <List
          height={height}
          itemCount={filteredBlocks.length}
          itemSize={itemHeight}
          itemData={itemData}
          overscanCount={5}
        >
          {VirtualBlockItem}
        </List>
      </div>
    </div>
  )
}

// Virtuoso 기반 가상화 (더 고급 기능)
interface VirtuosoBlockListProps {
  blocks: NotionBlock[]
  height?: number
  className?: string
  showDragHandles?: boolean
  onEdit?: (block: NotionBlock) => void
  onDelete?: (blockId: string) => void
  onDuplicate?: (block: NotionBlock) => void
  onAddChild?: (parentId: string) => void
  onReorder?: (blocks: NotionBlock[]) => void
}

export function VirtuosoBlockList({
  blocks,
  height = 600,
  className,
  showDragHandles = true,
  onEdit,
  onDelete,
  onDuplicate,
  onAddChild,
  onReorder
}: VirtuosoBlockListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'created' | 'modified' | 'type'>('created')

  // 필터링 및 정렬된 블록 목록
  const filteredBlocks = useMemo(() => {
    let filtered = [...blocks]

    if (searchQuery) {
      filtered = filtered.filter(block => {
        const searchableContent = extractSearchableContent(block)
        return searchableContent.toLowerCase().includes(searchQuery.toLowerCase())
      })
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'created':
          return new Date(a.created_time).getTime() - new Date(b.created_time).getTime()
        case 'modified':
          return new Date(b.last_edited_time).getTime() - new Date(a.last_edited_time).getTime()
        case 'type':
          return a.type.localeCompare(b.type)
        default:
          return 0
      }
    })

    return filtered
  }, [blocks, searchQuery, sortBy])

  const extractSearchableContent = (block: NotionBlock): string => {
    const content = block.content || {}
    return Object.values(content)
      .map((value: any) => {
        if (typeof value === 'string') return value
        if (Array.isArray(value)) {
          return value.map((item: any) => 
            typeof item === 'string' ? item : item?.plain_text || ''
          ).join(' ')
        }
        return ''
      })
      .join(' ')
  }

  // 아이템 렌더러
  const itemContent = useCallback((index: number) => {
    const block = filteredBlocks[index]
    if (!block) return null

    return (
      <div className="p-2">
        <DraggableBlock
          block={block}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
          onAddChild={onAddChild}
          showActions={showDragHandles}
        />
      </div>
    )
  }, [filteredBlocks, onEdit, onDelete, onDuplicate, onAddChild, showDragHandles])

  return (
    <div className={cn("space-y-4", className)}>
      {/* 검색 및 정렬 컨트롤 */}
      <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
        <input
          type="text"
          placeholder="블록 검색..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="created">생성일순</option>
          <option value="modified">수정일순</option>
          <option value="type">타입순</option>
        </select>
        <div className="text-sm text-muted-foreground">
          {filteredBlocks.length}개 블록
        </div>
      </div>

      {/* Virtuoso 가상화 리스트 */}
      <div className="border rounded-lg overflow-hidden">
        <Virtuoso
          style={{ height: `${height}px` }}
          data={filteredBlocks}
          itemContent={itemContent}
          overscan={5}
          increaseViewportBy={200}
          components={{
            Footer: () => (
              <div className="p-4 text-center text-muted-foreground">
                모든 블록을 로드했습니다.
              </div>
            )
          }}
        />
      </div>
    </div>
  )
}

// 무한 스크롤 가상화
interface InfiniteVirtualizedListProps {
  blocks: NotionBlock[]
  hasMore: boolean
  loadMore: () => void
  height?: number
  className?: string
  onEdit?: (block: NotionBlock) => void
  onDelete?: (blockId: string) => void
  onDuplicate?: (block: NotionBlock) => void
  onAddChild?: (parentId: string) => void
}

export function InfiniteVirtualizedList({
  blocks,
  hasMore,
  loadMore,
  height = 600,
  className,
  onEdit,
  onDelete,
  onDuplicate,
  onAddChild
}: InfiniteVirtualizedListProps) {
  const itemContent = useCallback((index: number) => {
    const block = blocks[index]
    if (!block) return null

    return (
      <div className="p-2">
        <DraggableBlock
          block={block}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
          onAddChild={onAddChild}
        />
      </div>
    )
  }, [blocks, onEdit, onDelete, onDuplicate, onAddChild])

  return (
    <div className={cn("border rounded-lg overflow-hidden", className)}>
      <Virtuoso
        style={{ height: `${height}px` }}
        data={blocks}
        itemContent={itemContent}
        endReached={hasMore ? loadMore : undefined}
        overscan={5}
        components={{
          Footer: () => (
            <div className="p-4 text-center">
              {hasMore ? (
                <div className="text-muted-foreground">더 많은 블록을 로드하는 중...</div>
              ) : (
                <div className="text-muted-foreground">모든 블록을 로드했습니다.</div>
              )}
            </div>
          )
        }}
      />
    </div>
  )
}
