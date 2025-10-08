'use client'

import { useOptimistic, useTransition, useState, useCallback } from 'react'
import { updatePageProperty } from '@/app/actions/notion-optimistic'
import { useToast } from '@/lib/store/uiStore'
import { cn } from '@/lib/scc-utils'
import { Check, X, Edit3, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

interface PagePropertyProps {
  pageId: string
  propertyName: string
  propertyType: 'title' | 'rich_text' | 'number' | 'select' | 'multi_select' | 'date' | 'checkbox' | 'url' | 'email' | 'phone_number'
  initialValue: any
  label?: string
  className?: string
  placeholder?: string
  options?: Array<{ value: string; label: string; color?: string }>
  maxLength?: number
  autoSave?: boolean
  autoSaveDelay?: number
  required?: boolean
}

export function PageProperty({
  pageId,
  propertyName,
  propertyType,
  initialValue,
  label,
  className,
  placeholder,
  options = [],
  maxLength,
  autoSave = true,
  autoSaveDelay = 1000,
  required = false
}: PagePropertyProps) {
  const [optimisticValue, setOptimisticValue] = useOptimistic(initialValue)
  const [isEditing, setIsEditing] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [tempValue, setTempValue] = useState(initialValue)
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout | null>(null)
  const { showToast } = useToast()

  // 값 포맷팅
  const formatValue = (value: any, type: string) => {
    if (!value) return ''
    
    switch (type) {
      case 'title':
      case 'rich_text':
        return Array.isArray(value) ? value[0]?.plain_text || '' : value
      case 'number':
        return value.toString()
      case 'select':
        return value?.name || ''
      case 'multi_select':
        return Array.isArray(value) ? value.map((v: any) => v.name).join(', ') : ''
      case 'date':
        return value?.start ? new Date(value.start).toLocaleDateString() : ''
      case 'checkbox':
        return value ? 'Yes' : 'No'
      case 'url':
      case 'email':
      case 'phone_number':
        return value || ''
      default:
        return value?.toString() || ''
    }
  }

  // Notion API 형식으로 변환
  const formatForNotion = (value: any, type: string) => {
    switch (type) {
      case 'title':
      case 'rich_text':
        return {
          [type]: [{ text: { content: value } }]
        }
      case 'number':
        return {
          number: parseFloat(value) || 0
        }
      case 'select':
        return {
          select: { name: value }
        }
      case 'multi_select':
        return {
          multi_select: value.map((v: string) => ({ name: v }))
        }
      case 'date':
        return {
          date: { start: value }
        }
      case 'checkbox':
        return {
          checkbox: Boolean(value)
        }
      case 'url':
      case 'email':
      case 'phone_number':
        return {
          [type]: value
        }
      default:
        return value
    }
  }

  // 자동 저장 처리
  const handleAutoSave = useCallback(async (newValue: any) => {
    if (JSON.stringify(newValue) === JSON.stringify(initialValue)) return

    startTransition(async () => {
      try {
        setOptimisticValue(newValue)
        const formattedValue = formatForNotion(newValue, propertyType)
        const result = await updatePageProperty(pageId, propertyName, formattedValue)
        
        if (!result.success) {
          setOptimisticValue(initialValue)
          showToast(result.error || '속성 업데이트에 실패했습니다.', 'error')
        } else {
          showToast('속성이 업데이트되었습니다.', 'success')
        }
      } catch (error) {
        setOptimisticValue(initialValue)
        showToast('속성 업데이트 중 오류가 발생했습니다.', 'error')
      }
    })
  }, [pageId, propertyName, propertyType, initialValue, setOptimisticValue, showToast])

  // 입력 변경 처리
  const handleInputChange = (value: any) => {
    setTempValue(value)
    setOptimisticValue(value)

    if (autoSave && JSON.stringify(value) !== JSON.stringify(initialValue)) {
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
    if (JSON.stringify(tempValue) === JSON.stringify(initialValue)) {
      setIsEditing(false)
      return
    }

    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout)
    }

    await handleAutoSave(tempValue)
    setIsEditing(false)
  }

  // 취소
  const handleCancel = () => {
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout)
    }
    
    setTempValue(initialValue)
    setOptimisticValue(initialValue)
    setIsEditing(false)
  }

  // 편집 모드 토글
  const handleEditToggle = () => {
    if (isEditing) {
      handleCancel()
    } else {
      setTempValue(optimisticValue)
      setIsEditing(true)
    }
  }

  // Enter 키 처리
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && propertyType !== 'rich_text') {
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
          className="cursor-pointer hover:bg-gray-50 rounded px-2 py-1 -mx-2 -my-1 transition-colors min-h-[2rem] flex items-center"
          onClick={handleEditToggle}
        >
          {formatValue(optimisticValue, propertyType) || (
            <span className="text-muted-foreground italic">{placeholder}</span>
          )}
        </div>
      )
    }

    switch (propertyType) {
      case 'title':
      case 'rich_text':
        return propertyType === 'rich_text' ? (
          <Textarea
            value={tempValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            maxLength={maxLength}
            className="min-h-[100px]"
            autoFocus
          />
        ) : (
          <Input
            value={tempValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            maxLength={maxLength}
            autoFocus
          />
        )
      
      case 'number':
        return (
          <Input
            type="number"
            value={tempValue}
            onChange={(e) => handleInputChange(parseFloat(e.target.value) || 0)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoFocus
          />
        )
      
      case 'select':
        return (
          <Select value={tempValue} onValueChange={handleInputChange}>
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      
      case 'multi_select':
        return (
          <div className="space-y-2">
            <Select 
              value="" 
              onValueChange={(value) => {
                if (value && !tempValue.includes(value)) {
                  handleInputChange([...tempValue, value])
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="옵션 추가..." />
              </SelectTrigger>
              <SelectContent>
                {options
                  .filter(option => !tempValue.includes(option.value))
                  .map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-1">
              {tempValue.map((value: string) => (
                <span
                  key={value}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-sm"
                >
                  {options.find(opt => opt.value === value)?.label || value}
                  <button
                    onClick={() => handleInputChange(tempValue.filter((v: string) => v !== value))}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )
      
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Switch
              checked={tempValue}
              onCheckedChange={handleInputChange}
            />
            <span className="text-sm text-muted-foreground">
              {tempValue ? 'Yes' : 'No'}
            </span>
          </div>
        )
      
      case 'date':
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {tempValue ? format(new Date(tempValue), 'PPP') : placeholder}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={tempValue ? new Date(tempValue) : undefined}
                onSelect={(date) => handleInputChange(date?.toISOString().split('T')[0])}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )
      
      case 'url':
      case 'email':
      case 'phone_number':
        return (
          <Input
            type={propertyType === 'email' ? 'email' : propertyType === 'phone_number' ? 'tel' : 'url'}
            value={tempValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoFocus
          />
        )
      
      default:
        return (
          <Input
            value={tempValue}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            autoFocus
          />
        )
    }
  }

  return (
    <div className={cn("group relative", className)}>
      {label && (
        <label className="text-sm font-medium text-muted-foreground mb-1 block">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}
      
      <div className="flex items-start gap-2">
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
      
      {maxLength && propertyType === 'rich_text' && (
        <div className="text-xs text-muted-foreground mt-1">
          {String(optimisticValue || '').length}/{maxLength}
        </div>
      )}
    </div>
  )
}
