"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Settings, 
  Key, 
  AlertTriangle, 
  CheckCircle2,
  ExternalLink 
} from 'lucide-react'
import { resetNotionApiKey } from '@/app/actions/auth'

export default function SettingsPage() {
  const [isResetting, setIsResetting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const router = useRouter()

  const handleResetApiKey = async () => {
    setIsResetting(true)
    try {
      await resetNotionApiKey()
      // resetNotionApiKey에서 이미 리다이렉트하므로 여기까지 도달하지 않음
    } catch (error) {
      console.error('API 키 재설정 실패:', error)
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">설정</h1>
        <p className="text-muted-foreground mt-2">
          계정 및 API 설정을 관리하세요.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API 설정 */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Key className="h-5 w-5 text-primary" />
              <CardTitle>Notion API 설정</CardTitle>
            </div>
            <CardDescription>
              Notion 통합 토큰을 관리합니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <span>API 키가 설정되어 있습니다.</span>
            </div>
            
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                API 키를 변경하면 현재 세션이 종료되고 새로 로그인해야 합니다.
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Button
                variant="outline"
                onClick={() => setShowConfirm(true)}
                disabled={isResetting}
                className="w-full"
              >
                {isResetting ? '재설정 중...' : '새 API 키로 변경'}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open('https://www.notion.so/my-integrations', '_blank')}
                className="w-full"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Notion 통합 페이지
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 계정 정보 */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-primary" />
              <CardTitle>계정 정보</CardTitle>
            </div>
            <CardDescription>
              현재 연결된 Notion 계정 정보입니다.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-medium text-foreground">연결 상태:</span>
                <span className="ml-2 text-success">연결됨</span>
              </div>
              <div className="text-sm">
                <span className="font-medium text-foreground">인증 방식:</span>
                <span className="ml-2 text-muted-foreground">Notion Integration Token</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 확인 다이얼로그 */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <span>API 키 변경 확인</span>
              </CardTitle>
              <CardDescription>
                정말로 API 키를 변경하시겠습니까? 현재 세션이 종료됩니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowConfirm(false)}
                  className="flex-1"
                >
                  취소
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleResetApiKey}
                  disabled={isResetting}
                  className="flex-1"
                >
                  {isResetting ? '변경 중...' : '변경'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
