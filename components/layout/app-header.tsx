"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { 
  Database, 
  Settings, 
  LogOut, 
  User, 
  Menu,
  X
} from 'lucide-react'
import { clearNotionApiKey } from '@/app/actions/auth'
import Link from 'next/link'

export function AppHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await clearNotionApiKey()
      router.push('/setup')
    } catch (error) {
      console.error('로그아웃 실패:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* 로고 및 브랜드 */}
          <div className="flex items-center space-x-4">
            <Link href="/databases" className="flex items-center space-x-2">
              <Database className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">
                Seoul Care Concierge
              </span>
            </Link>
          </div>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/databases" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              데이터베이스
            </Link>
            <Link 
              href="/pages" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              페이지
            </Link>
            <Link 
              href="/settings" 
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              설정
            </Link>
          </nav>

          {/* 사용자 메뉴 */}
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <User className="h-4 w-4" />
                  <span className="ml-2 hidden sm:inline">계정</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>설정</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="text-destructive focus:text-destructive flex items-center"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{isLoggingOut ? '로그아웃 중...' : '로그아웃'}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* 모바일 메뉴 버튼 */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/databases" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                데이터베이스
              </Link>
              <Link 
                href="/pages" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                페이지
              </Link>
              <Link 
                href="/settings" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                설정
              </Link>
              <Button 
                variant="ghost" 
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="justify-start text-destructive hover:text-destructive flex items-center"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>{isLoggingOut ? '로그아웃 중...' : '로그아웃'}</span>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
