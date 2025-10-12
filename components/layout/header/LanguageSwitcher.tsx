"use client"

import { useSCCStore } from "@/store/scc_store"
import { cn } from "@/lib/utils"
import { handleKeyboardEvent } from "@/lib/client-utils"

interface LanguageSwitcherProps {
  isScrolled: boolean
}

export function LanguageSwitcher({ isScrolled }: LanguageSwitcherProps) {
  const { language, setLanguage } = useSCCStore()

  const handleSetLanguage = (lang: "en" | "zh") => () => setLanguage(lang)

  return (
    <div
      className="flex items-center space-x-2 text-sm"
      role="group"
      aria-label="Language selection"
    >
      <button
        onClick={handleSetLanguage("en")}
        onKeyDown={(e) => handleKeyboardEvent(e, { onEnter: handleSetLanguage("en") })}
        aria-label="Switch to English"
        aria-pressed={language === "en"}
        className={cn(
          "px-3 py-1 rounded transition-all duration-300 drop-shadow-md hover:scale-105 active:scale-95 font-sans",
          language === "en"
            ? "bg-primary text-primary-foreground font-semibold shadow-lg hover:bg-primary/90 active:bg-primary/80"
            : isScrolled
            ? "text-foreground hover:text-primary hover:bg-primary/10 active:bg-primary/20"
            : "text-white/95 hover:text-primary-foreground/80 hover:bg-black/10 active:bg-black/20"
        )}
      >
        EN
      </button>
      <span
        className={cn(
          "transition-colors duration-300",
          isScrolled ? "text-muted-foreground" : "text-white/85"
        )}
        aria-hidden="true"
      >
        |
      </span>
      <button
        onClick={handleSetLanguage("zh")}
        onKeyDown={(e) => handleKeyboardEvent(e, { onEnter: handleSetLanguage("zh") })}
        aria-label="切换到中文"
        aria-pressed={language === "zh"}
        className={cn(
          "px-3 py-1 rounded transition-all duration-300 drop-shadow-md hover:scale-105 active:scale-95 font-chinese",
          language === "zh"
            ? "bg-primary text-primary-foreground font-semibold shadow-lg hover:bg-primary/90 active:bg-primary/80"
            : isScrolled
            ? "text-foreground hover:text-primary hover:bg-primary/10 active:bg-primary/20"
            : "text-white/95 hover:text-primary-foreground/80 hover:bg-black/10 active:bg-black/20"
        )}
      >
        中文
      </button>
    </div>
  )
}