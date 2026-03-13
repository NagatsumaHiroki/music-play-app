import { NextResponse } from 'next/server'
import { getPopularSongs } from '@/lib/spotify'

export async function GET() {
  try {
    const songs = await getPopularSongs()
    return NextResponse.json(songs)
  } catch (error) {
    console.error('Error fetching popular songs:', error)
    return NextResponse.json(
      { error: '曲の取得に失敗しました。しばらくしてから再度お試しください。' },
      { status: 500 }
    )
  }
}
