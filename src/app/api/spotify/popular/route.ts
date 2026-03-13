import { NextResponse } from 'next/server'
import { getPopularSongs } from '@/lib/spotify'

export async function GET() {
  try {
    const songs = await getPopularSongs()
    return NextResponse.json(songs)
  } catch (error) {
    console.error('Error fetching popular songs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch popular songs' },
      { status: 500 }
    )
  }
}
