'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

/**
 * Theme toggle button component
 * Provides a clean UI for switching between light and dark modes
 *
 * @example
 * ```tsx
 * <ThemeToggle />
 * ```
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9"
        disabled
        aria-label="Loading theme toggle"
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="h-9 w-9 transition-colors hover:bg-scc-primary/10 dark:hover:bg-scc-dark-primary/10 bg-white/90 dark:bg-scc-dark-card/90 border border-gray-200 dark:border-scc-dark-border shadow-sm hover:shadow-md backdrop-blur-sm"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-scc-accent dark:text-scc-dark-accent transition-transform hover:rotate-180 drop-shadow-sm" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-scc-primary dark:text-scc-dark-primary transition-transform hover:-rotate-12 drop-shadow-sm" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
