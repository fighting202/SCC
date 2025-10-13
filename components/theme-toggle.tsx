'use client';

import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';

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
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 bg-white/95 dark:bg-scc-dark-card/95 border border-gray-300 dark:border-scc-dark-border shadow-lg backdrop-blur-sm touch-manipulation"
        disabled
        aria-label="Loading theme toggle"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] text-[#2C5F7C] dark:text-[#D4AF37]" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="h-9 w-9 transition-colors hover:bg-[#2C5F7C]/20 dark:hover:bg-[#D4AF37]/20 bg-white/95 dark:bg-scc-dark-card/95 border border-gray-300 dark:border-scc-dark-border shadow-lg hover:shadow-xl backdrop-blur-sm active:scale-95 touch-manipulation"
      aria-label={
        theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'
      }
    >
      {theme === 'dark' ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-[#D4AF37] transition-transform hover:rotate-180 drop-shadow-md active:scale-110" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-[#2C5F7C] transition-transform hover:-rotate-12 drop-shadow-md active:scale-110" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
