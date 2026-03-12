'use client'

import { FC } from 'react'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { SongForDisplay } from '@/lib/types'

interface SongListProps {
  isLoading: boolean
  songs: SongForDisplay[]
}

export const SongList: FC<SongListProps> = ({ isLoading, songs }) => {
  if (isLoading) {
    return (
      <div className="inset-0 flex justify-center items-center">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
      {songs.map((song) => (
        <a
          key={song.id}
          href={song.spotifyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-none cursor-pointer"
        >
          <Image
            alt={song.name}
            src={song.imageUrl || '/no_image.png'}
            width={200}
            height={200}
            className="mb-2 rounded w-full h-auto"
            unoptimized={!song.imageUrl}
          />
          <h3 className="text-lg font-semibold">{song.name}</h3>
          <p className="text-gray-400">{song.artistName}</p>
        </a>
      ))}
    </div>
  )
}
