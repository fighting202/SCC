import { NextRequest, NextResponse } from 'next/server'
import { getPages } from '@/app/actions/notion-pages'

export async function GET(request: NextRequest) {
  try {
    const result = await getPages()
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }
    
    return NextResponse.json(result.data)
  } catch (error) {
    console.error('Error fetching pages:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
