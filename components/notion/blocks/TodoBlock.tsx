'use client'

import { useOptimistic, useTransition, useState, useCallback } from 'react'
import { updateBlockContent } from '@/app/actions/notion-optimistic'
import { useToast } from '@/lib/store/uiStore'
import { cn } from '@/lib/scc-utils'
import { Check, X, Edit3, Loader2, Square, CheckSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { NotionBlock } from '@/lib/scc_types'

interface TodoBlockProps {
  block: NotionBlock
  showEditButton?: boolean
  autoSave?: boolean
  onUpdate?: (blockId: string, content: any) => void
}

export function TodoBlock({ 
  block, 
  showEditButton = true,
  autoSave = true,
  onUpdate
}: TodoBlockProps) {
  const [optimisticContent, setOptimisticContent] = useOptimistic(block.content?.rich_text?.[0]?.plain_text || '')
  const [optimisticChecked, setOptimisticChecked] = useOptimistic(block.content?.checked || false)
  const [isEditing, setIsEditing] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [tempContent, setTempContent] = useState(block.content?.rich_text?.[0]?.plain_text || '')
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout | null>(null)
  const { showToast } = useToast()

  // 체크박스 토글
  const handleCheckboxToggle = useCallback(async (checked: boolean) => {
    startTransition(async () => {
      try {
        setOptimisticChecked(checked)
        
        const blockUpdate = {
          to_do: {
            rich_text: block.content?.rich_text || [{ text: { content: '' } }],
            checked
          }
        }

        const result = await updateBlockContent(block.id, blockUpdate)
        
        if (!result.success) {
          setOptimisticChecked(block.content?.checked || false)
          showToast(result.error || '할 일 상태 업데이트에 실패했습니다.', 'error')
        } else {
          showToast(checked ? '완료되었습니다!' : '미완료로 변경되었습니다.', 'success')
          onUpdate?.(block.id, blockUpdate)
        }
      } catch (error) {
        setOptimisticChecked(block.content?.checked || false)
        showToast('할 일 상태 업데이트 중 오류가 발생했습니다.', 'error')
      }
    })
  }, [block.id, block.content, setOptimisticChecked, showToast, onUpdate])

  // 텍스트 자동 저장 처리
  const handleAutoSave = useCallback(async (newContent: string) => {
    if (newContent === (block.content?.rich_text?.[0]?.plain_text || '')) return

    startTransition(async () => {
      try {
        setOptimisticContent(newContent)
        
        const blockUpdate = {
          to_do: {
            rich_text: [{ text: { content: newContent } }],
            checked: block.content?.checked || false
          }
        }

        const result = await updateBlockContent(block.id, blockUpdate)
        
        if (!result.success) {
          setOptimisticContent(block.content?.rich_text?.[0]?.plain_text || '')
          showToast(result.error || '할 일 텍스트 업데이트에 실패했습니다.', 'error')
        } else {
          showToast('할 일이 업데이트되었습니다.', 'success')
          onUpdate?.(block.id, blockUpdate)
        }
      } catch (error) {
        setOptimisticContent(block.content?.rich_text?.[0]?.plain_text || '')
        showToast('할 일 업데이트 중 오류가 발생했습니다.', 'error')
      }
    })
  }, [block.id, block.content, setOptimisticContent, showToast, onUpdate])

  // 입력 변경 처리
  const handleInputChange = (value: string) => {
    setTempContent(value)
    setOptimisticContent(value)

    if (autoSave && value !== (block.content?.rich_text?.[0]?.plain_text || '')) {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout)
      }

      const timeout = setTimeout(() => {
        handleAutoSave(value)
      }, 1000)

      setAutoSaveTimeout(timeout)
    }
  }

  // 수동 저장
  const handleSave = async () => {
    if (tempContent === (block.content?.rich_text?.[0]?.plain_text || '')) {
      setIsEditing(false)
      return
    }

    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout)
    }

    await handleAutoSave(tempContent)
    setIsEditing(false)
  }

  // 취소
  const handleCancel = () => {
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout)
    }
    
    setTempContent(block.content?.rich_text?.[0]?.plain_text || '')
    setOptimisticContent(block.content?.rich_text?.[0]?.plain_text || '')
    setIsEditing(false)
  }

  // 편집 모드 토글
  const handleEditToggle = () => {
    if (isEditing) {
      handleCancel()
    } else {
      setTempContent(optimisticContent)
      setIsEditing(true)
    }
  }

  // Enter 키 처리
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSave()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      handleCancel()
    }
  }

  return (
    <div className="group relative">
      {isEditing ? (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleCheckboxToggle(!optimisticChecked)}
            disabled={isPending}
            className="h-6 w-6 p-0"
          >
            {optimisticChecked ? (
              <CheckSquare className="h-4 w-4 text-green-600" />
            ) : (
              <Square className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
          <Input
            value={tempContent}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="할 일을 입력하세요..."
            className="flex-1 focus:outline-none focus:ring-2 focus:ring-primary/20"
            autoFocus
          />
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleSave}
              disabled={isPending}
              className="h-8 w-8 p-0"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4 text-green-600" />
              )}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCancel}
              disabled={isPending}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4 text-red-600" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleCheckboxToggle(!optimisticChecked)}
            disabled={isPending}
            className="h-6 w-6 p-0"
          >
            {optimisticChecked ? (
              <CheckSquare className="h-4 w-4 text-green-600" />
            ) : (
              <Square className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
          <span 
            className={cn(
              "flex-1 cursor-pointer hover:bg-gray-50 rounded px-2 py-1 -mx-2 -my-1 transition-colors",
              optimisticChecked && "line-through text-muted-foreground"
            )}
            onClick={handleEditToggle}
          >
            {optimisticContent || (
              <span className="text-muted-foreground italic">할 일을 입력하세요...</span>
            )}
          </span>
          {showEditButton && (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleEditToggle}
              className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          )}
          {isPending && (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          )}
        </div>
      )}
    </div>
  )
}
