'use client'

import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useState, useCallback } from 'react'
import { cn } from '@/lib/scc-utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Filter, 
  Plus, 
  X, 
  Search, 
  Calendar as CalendarIcon, 
  CheckSquare,
  Hash,
  Type,
  Mail,
  Phone,
  Link,
  ToggleLeft,
  List,
  Trash2,
  Save,
  RotateCcw
} from 'lucide-react'
import { format } from 'date-fns'
import { NotionDatabase, NotionFilter } from '@/lib/scc_types'

// 필터 스키마 정의
const filterConditionSchema = z.object({
  property: z.string().min(1, '속성을 선택해주세요'),
  condition: z.enum([
    'equals', 'does_not_equal', 'contains', 'does_not_contain',
    'starts_with', 'ends_with', 'is_empty', 'is_not_empty',
    'greater_than', 'less_than', 'greater_than_or_equal_to', 'less_than_or_equal_to',
    'before', 'after', 'on_or_before', 'on_or_after',
    'past_week', 'past_month', 'past_year', 'next_week', 'next_month', 'next_year'
  ]),
  value: z.string().optional(),
  values: z.array(z.string()).optional(),
  date: z.string().optional(),
  checkbox: z.boolean().optional()
})

const filterGroupSchema = z.object({
  operator: z.enum(['and', 'or']),
  conditions: z.array(filterConditionSchema)
})

const filterSchema = z.object({
  groups: z.array(filterGroupSchema).min(1, '최소 하나의 필터 그룹이 필요합니다')
})

type FilterFormData = z.infer<typeof filterSchema>
type FilterCondition = z.infer<typeof filterConditionSchema>

interface FilterPanelProps {
  database: NotionDatabase
  onApply: (filters: NotionFilter[]) => void
  onClear: () => void
  onSave?: (name: string, filters: NotionFilter[]) => void
  savedFilters?: Array<{ name: string; filters: NotionFilter[] }>
  className?: string
  showAdvanced?: boolean
  showSavedFilters?: boolean
}

// 속성 타입별 조건 옵션
const getConditionOptions = (propertyType: string) => {
  switch (propertyType) {
    case 'title':
    case 'rich_text':
      return [
        { value: 'contains', label: '포함' },
        { value: 'does_not_contain', label: '포함하지 않음' },
        { value: 'starts_with', label: '시작' },
        { value: 'ends_with', label: '끝' },
        { value: 'is_empty', label: '비어있음' },
        { value: 'is_not_empty', label: '비어있지 않음' }
      ]
    case 'number':
      return [
        { value: 'equals', label: '같음' },
        { value: 'does_not_equal', label: '다름' },
        { value: 'greater_than', label: '보다 큼' },
        { value: 'less_than', label: '보다 작음' },
        { value: 'greater_than_or_equal_to', label: '보다 크거나 같음' },
        { value: 'less_than_or_equal_to', label: '보다 작거나 같음' },
        { value: 'is_empty', label: '비어있음' },
        { value: 'is_not_empty', label: '비어있지 않음' }
      ]
    case 'select':
    case 'multi_select':
      return [
        { value: 'equals', label: '같음' },
        { value: 'does_not_equal', label: '다름' },
        { value: 'is_empty', label: '비어있음' },
        { value: 'is_not_empty', label: '비어있지 않음' }
      ]
    case 'date':
      return [
        { value: 'equals', label: '같음' },
        { value: 'before', label: '이전' },
        { value: 'after', label: '이후' },
        { value: 'on_or_before', label: '이전 또는 같음' },
        { value: 'on_or_after', label: '이후 또는 같음' },
        { value: 'past_week', label: '지난 주' },
        { value: 'past_month', label: '지난 달' },
        { value: 'past_year', label: '지난 해' },
        { value: 'next_week', label: '다음 주' },
        { value: 'next_month', label: '다음 달' },
        { value: 'next_year', label: '다음 해' },
        { value: 'is_empty', label: '비어있음' },
        { value: 'is_not_empty', label: '비어있지 않음' }
      ]
    case 'checkbox':
      return [
        { value: 'equals', label: '체크됨' },
        { value: 'does_not_equal', label: '체크되지 않음' }
      ]
    case 'url':
    case 'email':
    case 'phone_number':
      return [
        { value: 'contains', label: '포함' },
        { value: 'does_not_contain', label: '포함하지 않음' },
        { value: 'is_empty', label: '비어있음' },
        { value: 'is_not_empty', label: '비어있지 않음' }
      ]
    default:
      return [
        { value: 'contains', label: '포함' },
        { value: 'does_not_contain', label: '포함하지 않음' },
        { value: 'is_empty', label: '비어있음' },
        { value: 'is_not_empty', label: '비어있지 않음' }
      ]
  }
}

// 속성 타입별 아이콘
const getPropertyIcon = (propertyType: string) => {
  switch (propertyType) {
    case 'title': return Type
    case 'rich_text': return Type
    case 'number': return Hash
    case 'select': return List
    case 'multi_select': return List
    case 'date': return CalendarIcon
    case 'checkbox': return CheckSquare
    case 'url': return Link
    case 'email': return Mail
    case 'phone_number': return Phone
    default: return Type
  }
}

export function FilterPanel({
  database,
  onApply,
  onClear,
  onSave,
  savedFilters = [],
  className,
  showAdvanced = true,
  showSavedFilters = true
}: FilterPanelProps) {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [savedFilterName, setSavedFilterName] = useState('')
  const [showSaveDialog, setShowSaveDialog] = useState(false)

  const form = useForm<FilterFormData>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      groups: [{
        operator: 'and',
        conditions: []
      }]
    }
  })

  const { fields: groupFields, append: appendGroup, remove: removeGroup } = useFieldArray({
    control: form.control,
    name: 'groups'
  })

  const { fields: conditionFields, append: appendCondition, remove: removeCondition } = useFieldArray({
    control: form.control,
    name: 'groups.0.conditions'
  })

  // 속성 옵션 생성
  const propertyOptions = Object.entries(database.properties).map(([key, prop]) => ({
    value: key,
    label: prop.name || key,
    type: prop.type
  }))

  // 필터 적용
  const handleApply = useCallback((data: FilterFormData) => {
    const filters: NotionFilter[] = data.groups.flatMap(group => 
      group.conditions.map(condition => ({
        property: condition.property,
        condition: condition.condition,
        value: condition.value || condition.date || condition.checkbox
      }))
    )
    onApply(filters)
  }, [onApply])

  // 필터 초기화
  const handleClear = useCallback(() => {
    form.reset({
      groups: [{
        operator: 'and',
        conditions: []
      }]
    })
    onClear()
  }, [form, onClear])

  // 저장된 필터 적용
  const handleLoadSavedFilter = useCallback((savedFilter: { name: string; filters: NotionFilter[] }) => {
    // 저장된 필터를 폼에 로드하는 로직
    // 실제 구현에서는 NotionFilter를 FilterFormData로 변환해야 함
    onApply(savedFilter.filters)
  }, [onApply])

  // 필터 저장
  const handleSaveFilter = useCallback(() => {
    if (!savedFilterName.trim()) return
    
    const formData = form.getValues()
    const filters: NotionFilter[] = formData.groups.flatMap(group => 
      group.conditions.map(condition => ({
        property: condition.property,
        condition: condition.condition,
        value: condition.value || condition.date || condition.checkbox
      }))
    )
    
    onSave?.(savedFilterName, filters)
    setSavedFilterName('')
    setShowSaveDialog(false)
  }, [savedFilterName, form, onSave])

  // 조건 추가
  const addCondition = useCallback(() => {
    appendCondition({
      property: '',
      condition: 'contains',
      value: ''
    })
  }, [appendCondition])

  // 그룹 추가
  const addGroup = useCallback(() => {
    appendGroup({
      operator: 'and',
      conditions: []
    })
  }, [appendGroup])

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-primary" />
            <CardTitle>데이터베이스 필터</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            >
              {showAdvancedFilters ? '간단히' : '고급'}
            </Button>
            {showSavedFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSaveDialog(true)}
              >
                <Save className="h-4 w-4 mr-2" />
                저장
              </Button>
            )}
          </div>
        </div>
        <CardDescription>
          데이터베이스의 페이지들을 필터링하여 원하는 결과를 찾아보세요.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={form.handleSubmit(handleApply)} className="space-y-4">
          {/* 저장된 필터 */}
          {showSavedFilters && savedFilters.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">저장된 필터</h4>
              <div className="flex flex-wrap gap-2">
                {savedFilters.map((savedFilter, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary/10"
                    onClick={() => handleLoadSavedFilter(savedFilter)}
                  >
                    {savedFilter.name}
                  </Badge>
                ))}
              </div>
              <Separator />
            </div>
          )}

          {/* 필터 그룹들 */}
          {groupFields.map((group, groupIndex) => (
            <div key={group.id} className="space-y-3 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">그룹 {groupIndex + 1}</span>
                  {groupIndex > 0 && (
                    <Select
                      value={form.watch(`groups.${groupIndex}.operator`)}
                      onValueChange={(value) => form.setValue(`groups.${groupIndex}.operator`, value as 'and' | 'or')}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="and">AND</SelectItem>
                        <SelectItem value="or">OR</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
                {groupIndex > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeGroup(groupIndex)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* 조건들 */}
              <div className="space-y-2">
                {form.watch(`groups.${groupIndex}.conditions`)?.map((_, conditionIndex) => (
                  <div key={conditionIndex} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <Controller
                      name={`groups.${groupIndex}.conditions.${conditionIndex}.property`}
                      control={form.control}
                      render={({ field }) => (
                        <Select value={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder="속성 선택" />
                          </SelectTrigger>
                          <SelectContent>
                            {propertyOptions.map((option) => {
                              const Icon = getPropertyIcon(option.type)
                              return (
                                <SelectItem key={option.value} value={option.value}>
                                  <div className="flex items-center gap-2">
                                    <Icon className="h-4 w-4" />
                                    {option.label}
                                  </div>
                                </SelectItem>
                              )
                            })}
                          </SelectContent>
                        </Select>
                      )}
                    />

                    <Controller
                      name={`groups.${groupIndex}.conditions.${conditionIndex}.condition`}
                      control={form.control}
                      render={({ field }) => {
                        const selectedProperty = form.watch(`groups.${groupIndex}.conditions.${conditionIndex}.property`)
                        const propertyType = propertyOptions.find(p => p.value === selectedProperty)?.type || 'rich_text'
                        const conditionOptions = getConditionOptions(propertyType)
                        
                        return (
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="w-32">
                              <SelectValue placeholder="조건" />
                            </SelectTrigger>
                            <SelectContent>
                              {conditionOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )
                      }}
                    />

                    {/* 값 입력 필드 */}
                    <Controller
                      name={`groups.${groupIndex}.conditions.${conditionIndex}.value`}
                      control={form.control}
                      render={({ field }) => {
                        const selectedProperty = form.watch(`groups.${groupIndex}.conditions.${conditionIndex}.property`)
                        const propertyType = propertyOptions.find(p => p.value === selectedProperty)?.type || 'rich_text'
                        const condition = form.watch(`groups.${groupIndex}.conditions.${conditionIndex}.condition`)
                        
                        // 값 입력이 필요하지 않은 조건들
                        const noValueConditions = ['is_empty', 'is_not_empty', 'past_week', 'past_month', 'past_year', 'next_week', 'next_month', 'next_year']
                        
                        if (noValueConditions.includes(condition)) {
                          return null
                        }

                        if (propertyType === 'checkbox') {
                          return (
                            <Controller
                              name={`groups.${groupIndex}.conditions.${conditionIndex}.checkbox`}
                              control={form.control}
                              render={({ field: checkboxField }) => (
                                <div className="flex items-center space-x-2">
                                  <Checkbox
                                    checked={checkboxField.value || false}
                                    onCheckedChange={checkboxField.onChange}
                                  />
                                  <span className="text-sm">체크됨</span>
                                </div>
                              )}
                            />
                          )
                        }

                        if (propertyType === 'date') {
                          return (
                            <Controller
                              name={`groups.${groupIndex}.conditions.${conditionIndex}.date`}
                              control={form.control}
                              render={({ field: dateField }) => (
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-40 justify-start text-left font-normal">
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {dateField.value ? format(new Date(dateField.value), 'PPP') : '날짜 선택'}
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent className="w-auto p-0">
                                    <Calendar
                                      mode="single"
                                      selected={dateField.value ? new Date(dateField.value) : undefined}
                                      onSelect={(date) => dateField.onChange(date?.toISOString().split('T')[0])}
                                      initialFocus
                                    />
                                  </PopoverContent>
                                </Popover>
                              )}
                            />
                          )
                        }

                        return (
                          <Input
                            {...field}
                            placeholder="값 입력"
                            className="w-40"
                          />
                        )
                      }}
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCondition(conditionIndex)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addCondition}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  조건 추가
                </Button>
              </div>
            </div>
          ))}

          {/* 그룹 추가 버튼 */}
          {showAdvancedFilters && (
            <Button
              type="button"
              variant="outline"
              onClick={addGroup}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              그룹 추가
            </Button>
          )}

          {/* 액션 버튼들 */}
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2">
              <Button type="submit" size="sm">
                <Search className="h-4 w-4 mr-2" />
                필터 적용
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleClear}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                초기화
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground">
              {form.watch('groups').reduce((total, group) => total + group.conditions.length, 0)}개 조건
            </div>
          </div>
        </form>

        {/* 저장 다이얼로그 */}
        {showSaveDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-96">
              <CardHeader>
                <CardTitle>필터 저장</CardTitle>
                <CardDescription>
                  현재 필터 설정을 이름과 함께 저장하세요.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  placeholder="필터 이름을 입력하세요"
                  value={savedFilterName}
                  onChange={(e) => setSavedFilterName(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowSaveDialog(false)}
                  >
                    취소
                  </Button>
                  <Button
                    onClick={handleSaveFilter}
                    disabled={!savedFilterName.trim()}
                  >
                    저장
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
