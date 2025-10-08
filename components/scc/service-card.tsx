"use client"

import type { ServiceCardProps } from "@/lib/scc-types"
import { cn } from "@/lib/scc-utils"
import BilingualText from "./bilingualtext"
import { HoverScale, FadeIn } from "./animations"
import { LucideIcon } from "lucide-react"

export default function ServiceCard({ 
  service, 
  className,
  onClick 
}: ServiceCardProps) {
  const Icon = service.icon as LucideIcon

  return (
    <FadeIn>
      <HoverScale>
        <div 
          className={cn(
            "group bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200",
            "border border-gray-100 hover:border-primary/20",
            "cursor-pointer relative overflow-hidden",
            className
          )}
          onClick={onClick}
        >
          {/* 아이콘 */}
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
            <Icon className="w-8 h-8 text-accent" />
          </div>

          {/* 제목 */}
          <h3 className="text-xl font-serif font-semibold mb-3 group-hover:text-primary transition-colors">
            <BilingualText {...service.title} />
          </h3>

          {/* 설명 */}
          <p className="text-muted-foreground mb-4 leading-relaxed">
            <BilingualText {...service.description} />
          </p>

          {/* 기능 목록 */}
          {service.features && service.features.length > 0 && (
            <ul className="space-y-2">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start text-sm text-muted-foreground">
                  <span className="text-primary mr-2 mt-1">•</span>
                  <BilingualText {...feature} />
                </li>
              ))}
            </ul>
          )}

          {/* 호버 효과를 위한 오버레이 */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
        </div>
      </HoverScale>
    </FadeIn>
  )
}
