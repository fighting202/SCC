'use client'

import { useOptimistic, useTransition, useState, useCallback } from 'react'
import { updateDatabaseTitle } from '@/app/actions/notion-optimistic'
import { useToast } from '@/lib/store/uiStore'
import { cn } from '@/lib/scc-utils'
import { Check, X, Edit3, Loader2, Database } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface DatabaseTitleProps {
  databaseId: string
  initialTitle: string
  className?: string
  placeholder?: string
  maxLength?: number
  showIcon?: boolean
  autoSave?: boolean
  autoSaveDelay?: number
}

export function DatabaseTitle({ 
  databaseId, 
  initialTitle, 
  className,
  placeholder = "데이터베이스 제목을 입력하세요...",
  maxLength = 100,
  showIcon = true,
  autoSave = true,
  autoSaveDelay = 1000
}: DatabaseTitleProps) {
  const [optimisticTitle, setOptimisticTitle] = useOptimistic(initialTitle)
  const [isEditing, setIsEditing] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [tempTitle, setTempTitle] = useState(initialTitle)
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout | null>(null)
  const { showToast } = useToast()

  // 자동 저장 처리
  const handleAutoSave = useCallback(async (newTitle: string) => {
    if (newTitle === initialTitle) return

    startTransition(async () => {
      try {
        setOptimisticTitle(newTitle)
        const result = await updateDatabaseTitle(databaseId, newTitle)
        
        if (!result.success) {
          setOptimisticTitle(initialTitle)
          showToast(result.error || '데이터베이스 제목 업데이트에 실패했습니다.', 'error')
        } else {
          showToast('데이터베이스 제목이 업데이트되었습니다.', 'success')
        }
      } catch (error) {
        setOptimisticTitle(initialTitle)
        showToast('데이터베이스 제목 업데이트 중 오류가 발생했습니다.', 'error')
      }
    })
  }, [databaseId, initialTitle, setOptimisticTitle, showToast])

  // 입력 변경 처리
  const handleInputChange = (value: string) => {
    setTempTitle(value)
    setOptimisticTitle(value)

    if (autoSave && value !== initialTitle) {
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
    if (tempTitle === initialTitle) {
      setIsEditing(false)
      return
    }

    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout)
    }

    await handleAutoSave(tempTitle)
    setIsEditing(false)
  }

  // 취소
  const handleCancel = () => {
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout)
    }
    
    setTempTitle(initialTitle)
    setOptimisticTitle(initialTitle)
    setIsEditing(false)
  }

  // 편집 모드 토글
  const handleEditToggle = () => {
    if (isEditing) {
      handleCancel()
    } else {
      setTempTitle(optimisticTitle)
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
    <div className={cn("group relative", className)}>
      {isEditing ? (
        <div className="flex items-center gap-2">
          {showIcon && <Database className="h-5 w-5 text-primary" />}
          <Input
            value={tempTitle}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            maxLength={maxLength}
            className="text-2xl font-semibold border-none focus:outline-none focus:ring-2 focus:ring-primary/20 px-0"
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
          {showIcon && <Database className="h-5 w-5 text-primary" />}
          <h2 
            className="text-2xl font-semibold cursor-pointer hover:bg-gray-50 rounded px-2 py-1 -mx-2 -my-1 transition-colors"
            onClick={handleEditToggle}
          >
            {optimisticTitle || placeholder}
          </h2>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleEditToggle}
            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
          {isPending && (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          )}
        </div>
      )}
      
      {maxLength && (
        <div className="text-xs text-muted-foreground mt-1">
          {optimisticTitle.length}/{maxLength}
        </div>
      )}
    </div>
  )
}
