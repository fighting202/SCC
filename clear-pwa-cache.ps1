# PWA 캐시 완전 삭제 스크립트
Write-Host "🧹 PWA 캐시 완전 삭제 중..."

# 1. Node.js 프로세스 종료
Write-Host "1. Node.js 프로세스 종료 중..."
taskkill /f /im node.exe | Out-Null 2>&1

# 2. Next.js 캐시 삭제
Write-Host "2. Next.js 캐시 삭제 중..."
Remove-Item -Path ".next" -Recurse -Force -ErrorAction SilentlyContinue

# 3. node_modules 캐시 삭제
Write-Host "3. node_modules 캐시 삭제 중..."
Remove-Item -Path "node_modules/.cache" -Recurse -Force -ErrorAction SilentlyContinue

# 4. PWA 관련 파일 완전 삭제
Write-Host "4. PWA 관련 파일 삭제 중..."
Remove-Item -Path "public/manifest.json*" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "public/workbox-*" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "public/sw.js" -Force -ErrorAction SilentlyContinue
Remove-Item -Path "public/service-worker.js" -Force -ErrorAction SilentlyContinue

# 5. 브라우저 캐시 삭제 안내
Write-Host "5. 브라우저 캐시 삭제 안내..."
Write-Host "   Chrome/Edge: Ctrl + Shift + Delete"
Write-Host "   Firefox: Ctrl + Shift + Delete"
Write-Host "   Safari: Cmd + Option + E"

# 6. 개발 서버 재시작
Write-Host "6. 개발 서버 재시작 중..."
Start-Sleep -Seconds 2
npm run dev

Write-Host "✅ PWA 캐시 삭제 완료!"
Write-Host "   브라우저에서 Ctrl + Shift + Delete로 캐시를 완전 삭제하세요."
Write-Host "   그 후 http://localhost:3000에서 확인하세요."
