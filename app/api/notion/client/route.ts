import { NextRequest, NextResponse } from 'next/server'
import { getNotionApiKey } from '@/app/actions/auth'

export async function GET(request: NextRequest) {
  try {
    const apiKey = await getNotionApiKey()
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Notion API key not found' },
        { status: 401 }
      )
    }
    
    return NextResponse.json({ apiKey })
  } catch (error) {
    console.error('Error getting Notion API key:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
