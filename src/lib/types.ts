export interface SpotifyImage {
  url: string
  height: number
  width: number
}

export interface SpotifyArtist {
  id: string
  name: string
  external_urls: {
    spotify: string
  }
}

export interface SpotifyAlbum {
  id: string
  name: string
  images: SpotifyImage[]
  release_date: string
  artists: SpotifyArtist[]
  external_urls: {
    spotify: string
  }
}

export interface SpotifyTrack {
  id: string
  name: string
  album: SpotifyAlbum
  artists: SpotifyArtist[]
  external_urls: {
    spotify: string
  }
  preview_url: string | null
}

export interface PopularSongItem {
  track: SpotifyTrack
}

export type SearchSongItem = SpotifyTrack

export interface PopularSongsResponse {
  items: PopularSongItem[]
}

export interface SearchResponse {
  tracks: {
    items: SearchSongItem[]
  }
}

export interface SongForDisplay {
  id: string
  name: string
  artistName: string
  imageUrl: string | null
  spotifyUrl: string
}
