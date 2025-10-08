import { NextRequest, NextResponse } from 'next/server'
import { getDatabases } from '@/app/actions/notion-database'

export async function GET(request: NextRequest) {
  try {
    const result = await getDatabases()
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }
    
    return NextResponse.json(result.data)
  } catch (error) {
    console.error('Error fetching databases:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
