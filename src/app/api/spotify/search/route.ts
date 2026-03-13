import { NextRequest, NextResponse } from 'next/server'
import { searchSongs } from '@/lib/spotify'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const keyword = searchParams.get('q')

  if (!keyword) {
    return NextResponse.json(
      { error: 'Search keyword is required' },
      { status: 400 }
    )
  }

  try {
    const songs = await searchSongs(keyword)
    return NextResponse.json(songs)
  } catch (error) {
    console.error('Error searching songs:', error)
    return NextResponse.json(
      { error: 'Failed to search songs' },
      { status: 500 }
    )
  }
}
