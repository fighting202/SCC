'use client'

import { useOptimistic, useTransition, useState, useCallback } from 'react'
import { updateBlockContent } from '@/app/actions/notion-optimistic'
import { useToast } from '@/lib/store/uiStore'
import { cn } from '@/lib/scc-utils'
import { Check, X, Edit3, Loader2, Type, List, Hash, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'

interface BlockContentProps {
  blockId: string
  blockType: 'paragraph' | 'heading_1' | 'heading_2' | 'heading_3' | 'bulleted_list_item' | 'numbered_list_item' | 'quote' | 'code'
  initialContent: string
  className?: string
  placeholder?: string
  maxLength?: number
  autoSave?: boolean
  autoSaveDelay?: number
  showTypeIcon?: boolean
}

const blockTypeIcons = {
  paragraph: Type,
  heading_1: Hash,
  heading_2: Hash,
  heading_3: Hash,
  bulleted_list_item: List,
  numbered_list_item: List,
  quote: Quote,
  code: Type
}

const blockTypeStyles = {
  paragraph: "text-base",
  heading_1: "text-3xl font-bold",
  heading_2: "text-2xl font-semibold",
  heading_3: "text-xl font-medium",
  bulleted_list_item: "text-base list-disc list-inside",
  numbered_list_item: "text-base list-decimal list-inside",
  quote: "text-base italic border-l-4 border-gray-300 pl-4",
  code: "text-sm font-mono bg-gray-100 px-2 py-1 rounded"
}

export function BlockContent({
  blockId,
  blockType,
  initialContent,
  className,
  placeholder,
  maxLength,
  autoSave = true,
  autoSaveDelay = 1000,
  showTypeIcon = true
}: BlockContentProps) {
  const [optimisticContent, setOptimisticContent] = useOptimistic(initialContent)
  const [isEditing, setIsEditing] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [tempContent, setTempContent] = useState(initialContent)
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout | null>(null)
  const { showToast } = useToast()

  const Icon = blockTypeIcons[blockType]
  const styleClass = blockTypeStyles[blockType]

  // 자동 저장 처리
  const handleAutoSave = useCallback(async (newContent: string) => {
    if (newContent === initialContent) return

    startTransition(async () => {
      try {
        setOptimisticContent(newContent)
        
        // 블록 타입에 따른 Notion API 형식
        let blockUpdate: any = {}
        
        switch (blockType) {
          case 'paragraph':
            blockUpdate = {
              paragraph: {
                rich_text: [{ text: { content: newContent } }]
              }
            }
            break
          case 'heading_1':
            blockUpdate = {
              heading_1: {
                rich_text: [{ text: { content: newContent } }]
              }
            }
            break
          case 'heading_2':
            blockUpdate = {
              heading_2: {
                rich_text: [{ text: { content: newContent } }]
              }
            }
            break
          case 'heading_3':
            blockUpdate = {
              heading_3: {
                rich_text: [{ text: { content: newContent } }]
              }
            }
            break
          case 'bulleted_list_item':
            blockUpdate = {
              bulleted_list_item: {
                rich_text: [{ text: { content: newContent } }]
              }
            }
            break
          case 'numbered_list_item':
            blockUpdate = {
              numbered_list_item: {
                rich_text: [{ text: { content: newContent } }]
              }
            }
            break
          case 'quote':
            blockUpdate = {
              quote: {
                rich_text: [{ text: { content: newContent } }]
              }
            }
            break
          case 'code':
            blockUpdate = {
              code: {
                rich_text: [{ text: { content: newContent } }],
                language: 'plain text'
              }
            }
            break
        }

        const result = await updateBlockContent(blockId, blockUpdate)
        
        if (!result.success) {
          setOptimisticContent(initialContent)
          showToast(result.error || '블록 내용 업데이트에 실패했습니다.', 'error')
        } else {
          showToast('블록 내용이 업데이트되었습니다.', 'success')
        }
      } catch (error) {
        setOptimisticContent(initialContent)
        showToast('블록 내용 업데이트 중 오류가 발생했습니다.', 'error')
      }
    })
  }, [blockId, blockType, initialContent, setOptimisticContent, showToast])

  // 입력 변경 처리
  const handleInputChange = (value: string) => {
    setTempContent(value)
    setOptimisticContent(value)

    if (autoSave && value !== initialContent) {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout)
      }

      const timeout = setTimeout(() => {
        handleAutoSave(value)
      }, autoSaveDelay)

      setAutoSaveTimeout(timeout)
    }
  }

  // 수동 저장
  const handleSave = async () => {
    if (tempContent === initialContent) {
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
    
    setTempContent(initialContent)
    setOptimisticContent(initialContent)
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
    if (e.key === 'Enter' && !e.shiftKey && blockType !== 'code') {
      e.preventDefault()
      handleSave()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      handleCancel()
    }
  }

  // 렌더링할 입력 컴포넌트
  const renderInput = () => {
    if (!isEditing) {
      return (
        <div 
          className={cn(
            "cursor-pointer hover:bg-gray-50 rounded px-2 py-1 -mx-2 -my-1 transition-colors min-h-[2rem] flex items-start",
            styleClass
          )}
          onClick={handleEditToggle}
        >
          {optimisticContent || (
            <span className="text-muted-foreground italic">{placeholder}</span>
          )}
        </div>
      )
    }

    // 코드 블록은 Textarea, 나머지는 Input
    const InputComponent = blockType === 'code' ? Textarea : Input

    return (
      <InputComponent
        value={tempContent}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        maxLength={maxLength}
        className={cn(
          "focus:outline-none focus:ring-2 focus:ring-primary/20",
          blockType === 'code' ? "min-h-[100px] font-mono" : ""
        )}
        autoFocus
      />
    )
  }

  return (
    <div className={cn("group relative", className)}>
      <div className="flex items-start gap-2">
        {showTypeIcon && (
          <Icon className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
        )}
        
        <div className="flex-1">
          {renderInput()}
        </div>
        
        {isEditing && (
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
        )}
        
        {!isEditing && (
          <Button
            size="sm"
            variant="ghost"
            onClick={handleEditToggle}
            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
        )}
        
        {isPending && !isEditing && (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        )}
      </div>
      
      {maxLength && (
        <div className="text-xs text-muted-foreground mt-1">
          {optimisticContent.length}/{maxLength}
        </div>
      )}
    </div>
  )
}
