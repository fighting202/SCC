'use client'

import { useOptimistic, useTransition, useState, useCallback } from 'react'
import { updateBlockContent } from '@/app/actions/notion-optimistic'
import { useToast } from '@/lib/store/uiStore'
import { cn } from '@/lib/scc-utils'
import { Check, X, Edit3, Loader2, Code } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { NotionBlock } from '@/lib/scc_types'

interface CodeBlockProps {
  block: NotionBlock
  showEditButton?: boolean
  autoSave?: boolean
  onUpdate?: (blockId: string, content: any) => void
}

const languageOptions = [
  'plain text', 'javascript', 'typescript', 'python', 'java', 'cpp', 'c', 'csharp',
  'php', 'ruby', 'go', 'rust', 'swift', 'kotlin', 'scala', 'r', 'sql', 'html',
  'css', 'scss', 'sass', 'less', 'json', 'xml', 'yaml', 'toml', 'markdown',
  'bash', 'shell', 'powershell', 'dockerfile', 'nginx', 'apache', 'nginx'
]

export function CodeBlock({ 
  block, 
  showEditButton = true,
  autoSave = true,
  onUpdate
}: CodeBlockProps) {
  const [optimisticContent, setOptimisticContent] = useOptimistic(block.content?.rich_text?.[0]?.plain_text || '')
  const [optimisticLanguage, setOptimisticLanguage] = useOptimistic(block.content?.language || 'plain text')
  const [isEditing, setIsEditing] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [tempContent, setTempContent] = useState(block.content?.rich_text?.[0]?.plain_text || '')
  const [tempLanguage, setTempLanguage] = useState(block.content?.language || 'plain text')
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout | null>(null)
  const { showToast } = useToast()

  // 자동 저장 처리
  const handleAutoSave = useCallback(async (newContent: string, newLanguage: string) => {
    if (newContent === (block.content?.rich_text?.[0]?.plain_text || '') && 
        newLanguage === (block.content?.language || 'plain text')) return

    startTransition(async () => {
      try {
        setOptimisticContent(newContent)
        setOptimisticLanguage(newLanguage)
        
        const blockUpdate = {
          code: {
            rich_text: [{ text: { content: newContent } }],
            language: newLanguage
          }
        }

        const result = await updateBlockContent(block.id, blockUpdate)
        
        if (!result.success) {
          setOptimisticContent(block.content?.rich_text?.[0]?.plain_text || '')
          setOptimisticLanguage(block.content?.language || 'plain text')
          showToast(result.error || '코드 블록 업데이트에 실패했습니다.', 'error')
        } else {
          showToast('코드 블록이 업데이트되었습니다.', 'success')
          onUpdate?.(block.id, blockUpdate)
        }
      } catch (error) {
        setOptimisticContent(block.content?.rich_text?.[0]?.plain_text || '')
        setOptimisticLanguage(block.content?.language || 'plain text')
        showToast('코드 블록 업데이트 중 오류가 발생했습니다.', 'error')
      }
    })
  }, [block.id, block.content, setOptimisticContent, setOptimisticLanguage, showToast, onUpdate])

  // 입력 변경 처리
  const handleInputChange = (value: string) => {
    setTempContent(value)
    setOptimisticContent(value)

    if (autoSave && (value !== (block.content?.rich_text?.[0]?.plain_text || '') || 
        tempLanguage !== (block.content?.language || 'plain text'))) {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout)
      }

      const timeout = setTimeout(() => {
        handleAutoSave(value, tempLanguage)
      }, 1000)

      setAutoSaveTimeout(timeout)
    }
  }

  // 언어 변경 처리
  const handleLanguageChange = (language: string) => {
    setTempLanguage(language)
    setOptimisticLanguage(language)

    if (autoSave && (language !== (block.content?.language || 'plain text') || 
        tempContent !== (block.content?.rich_text?.[0]?.plain_text || ''))) {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout)
      }

      const timeout = setTimeout(() => {
        handleAutoSave(tempContent, language)
      }, 1000)

      setAutoSaveTimeout(timeout)
    }
  }

  // 수동 저장
  const handleSave = async () => {
    if (tempContent === (block.content?.rich_text?.[0]?.plain_text || '') && 
        tempLanguage === (block.content?.language || 'plain text')) {
      setIsEditing(false)
      return
    }

    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout)
    }

    await handleAutoSave(tempContent, tempLanguage)
    setIsEditing(false)
  }

  // 취소
  const handleCancel = () => {
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout)
    }
    
    setTempContent(block.content?.rich_text?.[0]?.plain_text || '')
    setTempLanguage(block.content?.language || 'plain text')
    setOptimisticContent(block.content?.rich_text?.[0]?.plain_text || '')
    setOptimisticLanguage(block.content?.language || 'plain text')
    setIsEditing(false)
  }

  // 편집 모드 토글
  const handleEditToggle = () => {
    if (isEditing) {
      handleCancel()
    } else {
      setTempContent(optimisticContent)
      setTempLanguage(optimisticLanguage)
      setIsEditing(true)
    }
  }

  // Escape 키 처리
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      handleCancel()
    }
  }

  return (
    <div className="group relative">
      {isEditing ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Code className="h-4 w-4 text-muted-foreground" />
            <Select value={tempLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-start gap-2">
            <Textarea
              value={tempContent}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="코드를 입력하세요..."
              className="min-h-[200px] font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              autoFocus
            />
            <div className="flex items-start gap-1">
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
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Code className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground bg-gray-100 px-2 py-1 rounded">
              {optimisticLanguage}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <pre 
              className={cn(
                "flex-1 cursor-pointer hover:bg-gray-50 rounded px-3 py-2 -mx-3 -my-2 transition-colors font-mono text-sm bg-gray-50 p-3 rounded-md overflow-x-auto",
                "min-h-[100px] flex items-center"
              )}
              onClick={handleEditToggle}
            >
              <code>
                {optimisticContent || (
                  <span className="text-muted-foreground italic">코드를 입력하세요...</span>
                )}
              </code>
            </pre>
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
        </div>
      )}
    </div>
  )
}
