import { checkAuthAndRedirect } from '@/app/actions/auth'
import { AppHeader } from '@/components/layout/app-header'

export const dynamic = 'force-dynamic'

export default async function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 인증 체크 및 리다이렉트
  await checkAuthAndRedirect()

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
