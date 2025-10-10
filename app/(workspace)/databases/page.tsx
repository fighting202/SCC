import { createNotionService } from '@/lib/notion/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Database, Calendar, User, FileText } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function DatabasesPage() {
  const notionService = await createNotionService()
  
  try {
    const response = await notionService.getDatabases()
    const databases = response.results

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">데이터베이스</h1>
          <p className="text-muted-foreground mt-2">
            연결된 Notion 데이터베이스들을 관리하세요.
          </p>
        </div>

        {databases.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Database className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                데이터베이스가 없습니다
              </h3>
              <p className="text-muted-foreground text-center max-w-md">
                Notion에서 데이터베이스를 생성하고 통합을 활성화해주세요.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {databases.map((db: any) => (
              <Card key={db.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <Database className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">
                        {db.title?.[0]?.plain_text || '제목 없음'}
                      </CardTitle>
                    </div>
                    <Badge variant="secondary">
                      {db.object}
                    </Badge>
                  </div>
                  <CardDescription>
                    {db.description?.[0]?.plain_text || '설명이 없습니다.'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      생성일: {new Date(db.created_time).toLocaleDateString('ko-KR')}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="h-4 w-4 mr-2" />
                      생성자: {db.created_by?.name || '알 수 없음'}
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <Link 
                      href={`/pages?database=${db.id}`}
                      className="inline-flex items-center text-sm text-primary hover:text-primary/80 font-medium"
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      페이지 보기
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    )
  } catch (error) {
    console.error('데이터베이스 로드 실패:', error)
    
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">데이터베이스</h1>
          <p className="text-muted-foreground mt-2">
            연결된 Notion 데이터베이스들을 관리하세요.
          </p>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Database className="h-12 w-12 text-destructive mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              데이터베이스를 불러올 수 없습니다
            </h3>
            <p className="text-muted-foreground text-center max-w-md mb-4">
              Notion API 연결에 문제가 있습니다. API 키를 확인해주세요.
            </p>
            <Link 
              href="/setup"
              className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              API 키 재설정
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }
}
