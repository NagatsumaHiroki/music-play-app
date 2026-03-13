'use client'

import { useState } from 'react'
import { SearchInput } from './SearchInput'
import { SongList } from './SongList'
import { ScrollToTopButton } from './ScrollToTopButton'
import { ErrorModal } from './ErrorModal'
import { SongForDisplay } from '@/lib/types'

interface SearchSectionProps {
  initialSongs: SongForDisplay[]
  initialError?: string | null
}

export const SearchSection = ({
  initialSongs,
  initialError = null,
}: SearchSectionProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [songs, setSongs] = useState<SongForDisplay[]>(initialSongs)
  const [keyword, setKeyword] = useState('')
  const [isSearchResult, setIsSearchResult] = useState(false)
  const [error, setError] = useState<string | null>(initialError)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const fetchPopularSongs = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/spotify/popular')
      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(
          data?.error ??
            '曲の取得に失敗しました。しばらくしてから再度お試しください。'
        )
      }
      const data = await response.json()
      setSongs(data)
      setIsSearchResult(false)
    } catch (err) {
      console.error('Error fetching popular songs:', err)
      setError(
        err instanceof Error
          ? err.message
          : '曲の取得に失敗しました。しばらくしてから再度お試しください。'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const searchSongs = async () => {
    if (keyword === '') {
      await fetchPopularSongs()
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/spotify/search?q=${encodeURIComponent(keyword)}`
      )
      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null
        throw new Error(
          data?.error ?? '検索に失敗しました。しばらくしてから再度お試しください。'
        )
      }
      const data = await response.json()
      setSongs(data)
      setIsSearchResult(true)
    } catch (err) {
      console.error('Error searching songs:', err)
      setError(
        err instanceof Error
          ? err.message
          : '検索に失敗しました。しばらくしてから再度お試しください。'
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseError = () => {
    setError(null)
  }

  return (
    <>
      <SearchInput onInputChange={handleInputChange} onSubmit={searchSongs} />
      <section>
        <h2 className="text-2xl font-semibold mb-5">
          {isSearchResult ? 'Search Results' : 'Popular Songs'}
        </h2>
        <ScrollToTopButton />
        <SongList isLoading={isLoading} songs={songs} />
      </section>

      {error && (
        <ErrorModal
          message={error}
          onClose={handleCloseError}
        />
      )}
    </>
  )
}
