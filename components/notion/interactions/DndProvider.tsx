'use client'

import { ReactNode, useState, useCallback } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay as DndDragOverlay,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'
import { NotionBlock } from '@/lib/scc_types'
import { DraggableBlock } from './DraggableBlock'

interface DndProviderProps {
  children: ReactNode
  blocks: NotionBlock[]
  onReorder?: (blocks: NotionBlock[]) => void
  onMove?: (blockId: string, newParentId: string | null) => void
  className?: string
}

export function DndProvider({
  children,
  blocks,
  onReorder,
  onMove,
  className
}: DndProviderProps) {
  const [activeBlock, setActiveBlock] = useState<NotionBlock | null>(null)
  const [draggedOverId, setDraggedOverId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  // 드래그 시작
  const handleDragStart = useCallback((event: DragStartEvent) => {
    const { active } = event
    const block = blocks.find(b => b.id === active.id)
    if (block) {
      setActiveBlock(block)
    }
  }, [blocks])

  // 드래그 오버
  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { over } = event
    setDraggedOverId(over?.id as string || null)
  }, [])

  // 드래그 종료
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event
    
    setActiveBlock(null)
    setDraggedOverId(null)

    if (!over) return

    const activeId = active.id as string
    const overId = over.id as string

    if (activeId === overId) return

    // 같은 레벨에서의 재정렬
    if (activeId !== overId) {
      const oldIndex = blocks.findIndex(block => block.id === activeId)
      const newIndex = blocks.findIndex(block => block.id === overId)

      if (oldIndex !== -1 && newIndex !== -1) {
        const newBlocks = arrayMove(blocks, oldIndex, newIndex)
        onReorder?.(newBlocks)
      }
    }

    // 다른 부모로 이동
    if (overId.startsWith('drop-')) {
      const parentId = overId.replace('drop-', '')
      onMove?.(activeId, parentId)
    }
  }, [blocks, onReorder, onMove])

  // 드래그 취소
  const handleDragCancel = useCallback(() => {
    setActiveBlock(null)
    setDraggedOverId(null)
  }, [])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className={className}>
        <SortableContext
          items={blocks.map(block => block.id)}
          strategy={verticalListSortingStrategy}
        >
          {children}
        </SortableContext>
      </div>

      {/* 드래그 오버레이 */}
      {createPortal(
        <DragOverlay>
          {activeBlock ? (
            <div className="opacity-50">
              <DraggableBlock
                block={activeBlock}
                index={0}
                isDragDisabled={true}
                showActions={false}
              />
            </div>
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  )
}

// 드롭 영역 컴포넌트
interface DropZoneProps {
  id: string
  children: ReactNode
  className?: string
  isActive?: boolean
}

export function DropZone({ id, children, className, isActive }: DropZoneProps) {
  return (
    <div
      id={id}
      className={cn(
        "min-h-[50px] border-2 border-dashed border-gray-300 rounded-lg p-4 transition-colors",
        isActive && "border-primary bg-primary/5",
        className
      )}
    >
      {children}
    </div>
  )
}

// 드래그 가능한 블록 래퍼
interface DraggableBlockWrapperProps {
  block: NotionBlock
  index: number
  children: ReactNode
  onEdit?: (block: NotionBlock) => void
  onDelete?: (blockId: string) => void
  onDuplicate?: (block: NotionBlock) => void
  onAddChild?: (parentId: string) => void
  showActions?: boolean
  isDragDisabled?: boolean
}

export function DraggableBlockWrapper({
  block,
  index,
  children,
  onEdit,
  onDelete,
  onDuplicate,
  onAddChild,
  showActions = true,
  isDragDisabled = false
}: DraggableBlockWrapperProps) {
  return (
    <DraggableBlock
      block={block}
      index={index}
      onEdit={onEdit}
      onDelete={onDelete}
      onDuplicate={onDuplicate}
      onAddChild={onAddChild}
      showActions={showActions}
      isDragDisabled={isDragDisabled}
    >
      {children}
    </DraggableBlock>
  )
}
