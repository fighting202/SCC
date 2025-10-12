import { NextResponse } from 'next/server';

export async function GET() {
  // favicon 요청을 완전히 차단하고 빈 응답 반환
  return new NextResponse(null, {
    status: 204, // No Content
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    },
  });
}
