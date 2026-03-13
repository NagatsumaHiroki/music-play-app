import Link from 'next/link'
import { getPopularSongs } from '@/lib/spotify'
import { SearchSection } from './_components/SearchSection'
import { SongForDisplay } from '@/lib/types'

export default async function Home() {
  let initialSongs: SongForDisplay[] = []
  let initialError: string | null = null
  try {
    initialSongs = await getPopularSongs()
  } catch (error) {
    console.error('Failed to fetch initial songs:', error)
    initialError = '曲の取得に失敗しました。しばらくしてから再度お試しください。'
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <main className="flex-1 p-8 mb-20">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">
            <Link href="/">Music App</Link>
          </h1>
        </header>
        <SearchSection initialSongs={initialSongs} initialError={initialError} />
      </main>
    </div>
  )
}
