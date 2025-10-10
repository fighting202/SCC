'use client'

import { useState, useRef, useEffect } from 'react'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/lib/scc-utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  GripVertical, 
  Plus, 
  Trash2, 
  Copy, 
  Edit3,
  ChevronDown,
  ChevronRight
} from 'lucide-react'
import { NotionBlock } from '@/lib/scc_types'
import { BlockRenderer } from '../blocks/BlockRenderer'

interface DraggableBlockProps {
  block: NotionBlock
  index: number
  isExpanded?: boolean
  onToggleExpand?: () => void
  onEdit?: (block: NotionBlock) => void
  onDelete?: (blockId: string) => void
  onDuplicate?: (block: NotionBlock) => void
  onAddChild?: (parentId: string) => void
  children?: NotionBlock[]
  className?: string
  showActions?: boolean
  isDragDisabled?: boolean
}

export function DraggableBlock({
  block,
  index,
  isExpanded = true,
  onToggleExpand,
  onEdit,
  onDelete,
  onDuplicate,
  onAddChild,
  children = [],
  className,
  showActions = true,
  isDragDisabled = false
}: DraggableBlockProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showChildren, setShowChildren] = useState(isExpanded)
  const hasChildren = children.length > 0

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: block.id,
    disabled: isDragDisabled,
  })

  const {
    setNodeRef: setDroppableRef,
    isOver,
  } = useDroppable({
    id: `drop-${block.id}`,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  // 자식 블록 토글
  const handleToggleChildren = () => {
    setShowChildren(!showChildren)
    onToggleExpand?.()
  }

  // 액션 핸들러들
  const handleEdit = () => onEdit?.(block)
  const handleDelete = () => onDelete?.(block.id)
  const handleDuplicate = () => onDuplicate?.(block)
  const handleAddChild = () => onAddChild?.(block.id)

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative",
        isDragging && "opacity-50 z-50",
        isOver && "ring-2 ring-primary/20",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className={cn(
        "transition-all duration-200",
        isHovered && "shadow-md",
        isDragging && "shadow-lg"
      )}>
        <CardContent className="p-0">
          {/* 드래그 핸들 및 액션 버튼들 */}
          <div className="flex items-center gap-2 p-2 border-b bg-gray-50/50">
            <div className="flex items-center gap-1">
              {/* 드래그 핸들 */}
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 cursor-grab active:cursor-grabbing"
                {...attributes}
                {...listeners}
                disabled={isDragDisabled}
              >
                <GripVertical className="h-4 w-4 text-muted-foreground" />
              </Button>

              {/* 자식 블록 토글 */}
              {hasChildren && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={handleToggleChildren}
                >
                  {showChildren ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>

            {/* 블록 타입 표시 */}
            <div className="flex-1">
              <span className="text-xs text-muted-foreground font-mono">
                {block.type}
              </span>
            </div>

            {/* 액션 버튼들 */}
            {showActions && (isHovered || isDragging) && (
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={handleEdit}
                >
                  <Edit3 className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={handleDuplicate}
                >
                  <Copy className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={handleAddChild}
                >
                  <Plus className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>

          {/* 블록 콘텐츠 */}
          <div className="p-4">
            <BlockRenderer
              block={block}
              showEditButton={false}
              autoSave={false}
            />
          </div>
        </CardContent>
      </Card>

      {/* 자식 블록들 */}
      {hasChildren && showChildren && (
        <div className="ml-6 mt-2 space-y-2 border-l-2 border-[#e5e7eb] pl-4">
          {children.map((childBlock, childIndex) => (
            <DraggableBlock
              key={childBlock.id}
              block={childBlock}
              index={childIndex}
              isExpanded={isExpanded}
              onToggleExpand={onToggleExpand || (() => {})}
              onEdit={onEdit}
              onDelete={onDelete}
              onDuplicate={onDuplicate}
              onAddChild={onAddChild}
              showActions={showActions}
              isDragDisabled={isDragDisabled}
            />
          ))}
        </div>
      )}

      {/* 드롭 영역 */}
      <div
        ref={setDroppableRef}
        className={cn(
          "absolute inset-0 pointer-events-none",
          isOver && "bg-primary/5 border-2 border-dashed border-primary/30 rounded-lg"
        )}
      />
    </div>
  )
}

// 드래그 가능한 블록 리스트
interface DraggableBlockListProps {
  blocks: NotionBlock[]
  onReorder?: (blocks: NotionBlock[]) => void
  onEdit?: (block: NotionBlock) => void
  onDelete?: (blockId: string) => void
  onDuplicate?: (block: NotionBlock) => void
  onAddChild?: (parentId: string) => void
  className?: string
  showActions?: boolean
  isDragDisabled?: boolean
}

export function DraggableBlockList({
  blocks,
  onReorder,
  onEdit,
  onDelete,
  onDuplicate,
  onAddChild,
  className,
  showActions = true,
  isDragDisabled = false
}: DraggableBlockListProps) {
  const [expandedBlocks, setExpandedBlocks] = useState<Set<string>>(new Set())

  // 블록 계층 구조 생성
  const buildBlockHierarchy = (blocks: NotionBlock[]): Array<{ block: NotionBlock; children: NotionBlock[] }> => {
    const blockMap = new Map<string, NotionBlock>()
    const childrenMap = new Map<string, NotionBlock[]>()
    const rootBlocks: NotionBlock[] = []

    // 모든 블록을 맵에 저장
    blocks.forEach(block => {
      blockMap.set(block.id, block)
    })

    // 부모-자식 관계 구성
    blocks.forEach(block => {
      if ((block as any).parent?.page_id) {
        const parentId = (block as any).parent.page_id
        if (!childrenMap.has(parentId)) {
          childrenMap.set(parentId, [])
        }
        childrenMap.get(parentId)!.push(block)
      } else {
        rootBlocks.push(block)
      }
    })

    // 계층 구조 반환
    return rootBlocks.map(block => ({
      block,
      children: childrenMap.get(block.id) || []
    }))
  }

  const blockHierarchy = buildBlockHierarchy(blocks)

  // 블록 확장/축소 토글
  const toggleBlockExpansion = (blockId: string) => {
    setExpandedBlocks(prev => {
      const newSet = new Set(prev)
      if (newSet.has(blockId)) {
        newSet.delete(blockId)
      } else {
        newSet.add(blockId)
      }
      return newSet
    })
  }

  return (
    <div className={cn("space-y-2", className)}>
      {blockHierarchy.map(({ block, children }, index) => (
        <DraggableBlock
          key={block.id}
          block={block}
          index={index}
          isExpanded={expandedBlocks.has(block.id)}
          onToggleExpand={() => toggleBlockExpansion(block.id)}
          onEdit={onEdit}
          onDelete={onDelete}
          onDuplicate={onDuplicate}
          onAddChild={onAddChild}
          showActions={showActions}
          isDragDisabled={isDragDisabled}
        >
          {children}
        </DraggableBlock>
      ))}
    </div>
  )
}
