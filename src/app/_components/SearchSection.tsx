'use client'

import { useState } from 'react'
import { SearchInput } from './SearchInput'
import { SongList } from './SongList'
import { ScrollToTopButton } from './ScrollToTopButton'
import { SongForDisplay } from '@/lib/types'

interface SearchSectionProps {
  initialSongs: SongForDisplay[]
}

export const SearchSection = ({ initialSongs }: SearchSectionProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [songs, setSongs] = useState<SongForDisplay[]>(initialSongs)
  const [keyword, setKeyword] = useState('')
  const [isSearchResult, setIsSearchResult] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const fetchPopularSongs = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/spotify/popular')
      if (!response.ok) throw new Error('Failed to fetch popular songs')
      const data = await response.json()
      setSongs(data)
      setIsSearchResult(false)
    } catch (error) {
      console.error('Error fetching popular songs:', error)
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
      if (!response.ok) throw new Error('Failed to search songs')
      const data = await response.json()
      setSongs(data)
      setIsSearchResult(true)
    } catch (error) {
      console.error('Error searching songs:', error)
    } finally {
      setIsLoading(false)
    }
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
    </>
  )
}
