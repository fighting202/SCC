'use client'

import { NotionBlock } from '@/lib/scc_types'
import { ParagraphBlock } from './ParagraphBlock'
import { HeadingBlock } from './HeadingBlock'
import { TodoBlock } from './TodoBlock'
import { CodeBlock } from './CodeBlock'
// import { QuoteBlock } from './QuoteBlock' // 파일이 없음
// import { ListBlock } from './ListBlock' // 파일이 없음
// import { ImageBlock } from './ImageBlock' // 파일이 없음
// import { VideoBlock } from './VideoBlock' // 파일이 없음
// import { FileBlock } from './FileBlock' // 파일이 없음
// import { DividerBlock } from './DividerBlock' // 파일이 없음
// import { CalloutBlock } from './CalloutBlock' // 파일이 없음
// import { ToggleBlock } from './ToggleBlock' // 파일이 없음
// import { TableBlock } from './TableBlock' // 파일이 없음
// import { ColumnBlock } from './ColumnBlock' // 파일이 없음
import { cn } from '@/lib/scc-utils'

interface BlockRendererProps {
  block: NotionBlock
  className?: string
  showEditButton?: boolean
  autoSave?: boolean
  onBlockUpdate?: (blockId: string, content: any) => void
}

export function BlockRenderer({ 
  block, 
  className,
  showEditButton = true,
  autoSave = true,
  onBlockUpdate
}: BlockRendererProps) {
  // 블록 타입에 따른 컴포넌트 렌더링
  const renderBlock = () => {
    switch (block.type) {
      case 'paragraph':
        return (
          <ParagraphBlock
            block={block}
            showEditButton={showEditButton}
            autoSave={autoSave}
            {...(onBlockUpdate && { onUpdate: onBlockUpdate })}
          />
        )
      
      case 'heading_1':
      case 'heading_2':
      case 'heading_3':
        return (
          <HeadingBlock
            block={block}
            showEditButton={showEditButton}
            autoSave={autoSave}
            {...(onBlockUpdate && { onUpdate: onBlockUpdate })}
          />
        )
      
      case 'to_do':
        return (
          <TodoBlock
            block={block}
            showEditButton={showEditButton}
            autoSave={autoSave}
            {...(onBlockUpdate && { onUpdate: onBlockUpdate })}
          />
        )
      
      case 'code':
        return (
          <CodeBlock
            block={block}
            showEditButton={showEditButton}
            autoSave={autoSave}
            {...(onBlockUpdate && { onUpdate: onBlockUpdate })}
          />
        )
      
      case 'quote':
        return (
          <ParagraphBlock
            block={block}
            showEditButton={showEditButton}
            autoSave={autoSave}
            {...(onBlockUpdate && { onUpdate: onBlockUpdate })}
          />
        )
      
      case 'bulleted_list_item':
      case 'numbered_list_item':
        return (
          <ParagraphBlock
            block={block}
            showEditButton={showEditButton}
            autoSave={autoSave}
            {...(onBlockUpdate && { onUpdate: onBlockUpdate })}
          />
        )
      
      case 'image':
        return (
          <ParagraphBlock
            block={block}
            showEditButton={showEditButton}
            autoSave={autoSave}
            {...(onBlockUpdate && { onUpdate: onBlockUpdate })}
          />
        )
      
      case 'video':
        return (
          <ParagraphBlock
            block={block}
            showEditButton={showEditButton}
            autoSave={autoSave}
            {...(onBlockUpdate && { onUpdate: onBlockUpdate })}
          />
        )
      
      case 'file':
        return (
          <ParagraphBlock
            block={block}
            showEditButton={showEditButton}
            autoSave={autoSave}
            {...(onBlockUpdate && { onUpdate: onBlockUpdate })}
          />
        )
      
      case 'divider':
        return (
          <ParagraphBlock
            block={block}
            showEditButton={showEditButton}
            autoSave={autoSave}
            {...(onBlockUpdate && { onUpdate: onBlockUpdate })}
          />
        )
      
      case 'callout':
        return (
          <ParagraphBlock
            block={block}
            showEditButton={showEditButton}
            autoSave={autoSave}
            {...(onBlockUpdate && { onUpdate: onBlockUpdate })}
          />
        )
      
      case 'toggle':
        return (
          <ParagraphBlock
            block={block}
            showEditButton={showEditButton}
            autoSave={autoSave}
            {...(onBlockUpdate && { onUpdate: onBlockUpdate })}
          />
        )
      
      case 'table':
        return (
          <ParagraphBlock
            block={block}
            showEditButton={showEditButton}
            autoSave={autoSave}
            {...(onBlockUpdate && { onUpdate: onBlockUpdate })}
          />
        )
      
      case 'column_list':
      case 'column':
        return (
          <ParagraphBlock
            block={block}
            showEditButton={showEditButton}
            autoSave={autoSave}
            {...(onBlockUpdate && { onUpdate: onBlockUpdate })}
          />
        )
      
      default:
        return (
          <div className="p-4 border border-dashed border-gray-300 rounded-lg bg-gray-50">
            <div className="text-sm text-gray-500 mb-2">
              지원되지 않는 블록 타입
            </div>
            <div className="text-xs text-gray-400">
              Type: {block.type}
            </div>
            <div className="text-xs text-gray-400">
              ID: {block.id}
            </div>
          </div>
        )
    }
  }

  return (
    <div className={cn("notion-block", className)}>
      {renderBlock()}
    </div>
  )
}

// 블록 목록 렌더러
interface BlockListRendererProps {
  blocks: NotionBlock[]
  className?: string
  showEditButton?: boolean
  autoSave?: boolean
  onBlockUpdate?: (blockId: string, content: any) => void
  groupByType?: boolean
}

export function BlockListRenderer({
  blocks,
  className,
  showEditButton = true,
  autoSave = true,
  onBlockUpdate,
  groupByType = false
}: BlockListRendererProps) {
  if (groupByType) {
    // 타입별로 그룹화
    const groupedBlocks = blocks.reduce((acc, block) => {
      const type = block.type
      if (!acc[type]) {
        acc[type] = []
      }
      acc[type].push(block)
      return acc
    }, {} as Record<string, NotionBlock[]>)

    return (
      <div className={cn("space-y-8", className)}>
        {Object.entries(groupedBlocks).map(([type, typeBlocks]) => (
          <div key={type} className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              {type.replace(/_/g, ' ')}
            </h3>
            <div className="space-y-2">
              {typeBlocks.map((block) => (
                <BlockRenderer
                  key={block.id}
                  block={block}
                  showEditButton={showEditButton}
                  autoSave={autoSave}
                  {...(onBlockUpdate && { onBlockUpdate })}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className={cn("space-y-2", className)}>
      {blocks.map((block) => (
        <BlockRenderer
          key={block.id}
          block={block}
          showEditButton={showEditButton}
          autoSave={autoSave}
          {...(onBlockUpdate && { onBlockUpdate })}
        />
      ))}
    </div>
  )
}
