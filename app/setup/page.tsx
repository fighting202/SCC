"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CheckCircle2, ExternalLink, Loader2, AlertCircle } from 'lucide-react'
import { saveNotionApiKey } from '@/app/actions/auth'

export default function SetupPage() {
  const [apiKey, setApiKey] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setSuccess(false)

    try {
      const result = await saveNotionApiKey(apiKey)
      
      if (result.success) {
        setSuccess(true)
        // 성공 시 잠시 후 리다이렉트
        setTimeout(() => {
          router.push('/databases')
        }, 2000)
      } else {
        setError(result.error || 'API 키 저장에 실패했습니다.')
      }
    } catch (err) {
      setError('예상치 못한 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-success mx-auto" />
              <h2 className="text-2xl font-bold text-foreground">
                API 키가 성공적으로 설정되었습니다!
              </h2>
              <p className="text-muted-foreground">
                데이터베이스 페이지로 이동합니다...
              </p>
              <div className="flex justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground">
            Notion API 설정
          </CardTitle>
          <CardDescription>
            Notion 데이터베이스에 연결하기 위해 API 키를 입력해주세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="apiKey" className="text-sm font-medium">
                Notion Integration Token
              </Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="secret_xxxxxxxxxxxxx"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                required
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                API 키는 안전하게 암호화되어 저장됩니다.
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading || !apiKey.trim()}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    연결 중...
                  </>
                ) : (
                  'API 키 저장'
                )}
              </Button>

              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  API 키를 어떻게 가져오나요?
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('https://www.notion.so/my-integrations', '_blank')}
                  className="text-primary hover:text-primary/80"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Notion 통합 페이지로 이동
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
