"use client"

import type { PackageCardProps } from "@/lib/scc-types"
import { cn, languageUtils } from "@/lib/scc-utils"
import BilingualText from "./bilingualtext"
import { Check, Star } from "lucide-react"

export default function PackageCard({ 
  packageInfo, 
  type,
  className,
  onSelect 
}: PackageCardProps) {
  const isPremium = type === 'premium'

  return (
    <div 
      className={cn(
        "relative bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-200",
        "border-2 hover:border-primary/30",
        isPremium && "border-accent ring-2 ring-accent/20",
        "cursor-pointer group"
      )}
      onClick={() => onSelect?.(type)}
    >
      {/* 프리미엄 배지 */}
      {isPremium && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-accent text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <Star className="w-4 h-4" />
            <BilingualText en="Premium" zh="高级" />
          </div>
        </div>
      )}

      {/* 패키지 이름 */}
      <h3 className={cn(
        "text-2xl font-serif font-bold mb-2",
        isPremium ? "text-accent" : "text-primary"
      )}>
        <BilingualText {...packageInfo.name} />
      </h3>

      {/* 기간 */}
      <p className="text-muted-foreground mb-6">
        <BilingualText 
          en={`${packageInfo.duration} days`}
          zh={`${packageInfo.duration}天`}
        />
      </p>

      {/* 가격 */}
      <div className="mb-8">
        <div className="text-4xl font-bold text-primary mb-2">
          ${packageInfo.price.from.toLocaleString()}
          {packageInfo.price.from !== packageInfo.price.to && (
            <span className="text-lg text-muted-foreground">
              -${packageInfo.price.to.toLocaleString()}
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          <BilingualText 
            en="per person"
            zh="每人"
          />
        </p>
      </div>

      {/* 기능 목록 */}
      <ul className="space-y-4 mb-8">
        {packageInfo.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="w-5 h-5 text-success mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground">
              <BilingualText {...feature} />
            </span>
          </li>
        ))}
      </ul>

      {/* 선택 버튼 */}
      <button
        className={cn(
          "w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200",
          "hover:scale-105 active:scale-95",
          isPremium 
            ? "bg-accent hover:bg-accent/90 text-white" 
            : "bg-primary hover:bg-primary/90 text-white"
        )}
        onClick={(e) => {
          e.stopPropagation()
          onSelect?.(type)
        }}
      >
        <BilingualText 
          en="Select Package"
          zh="选择套餐"
        />
      </button>

      {/* 호버 효과 */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
    </div>
  )
}
