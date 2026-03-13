import {
  PopularSongsResponse,
  SearchResponse,
  SongForDisplay,
  PopularSongItem,
  SearchSongItem,
} from './types'

const SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token'
const SPOTIFY_API_BASE = 'https://api.spotify.com/v1'
const POPULAR_PLAYLIST_ID = '5SLPaOxQyJ8Ne9zpmTOvSe'

let cachedToken: string | null = null
let tokenExpiry: number = 0

function normalizeCredential(value: string | undefined): string | undefined {
  if (!value) {
    return undefined
  }

  const trimmed = value.trim()
  if (!trimmed) {
    return undefined
  }

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }

  return trimmed
}

function getSpotifyCredentials() {
  const clientId = normalizeCredential(process.env.SPOTIFY_CLIENT_ID)
  const clientSecret = normalizeCredential(process.env.SPOTIFY_CLIENT_SECRET)

  return { clientId, clientSecret }
}

async function buildSpotifyApiError(
  response: Response,
  contextMessage: string
): Promise<Error> {
  const body = await response.text()
  return new Error(
    `${contextMessage} (status: ${response.status}) body: ${body.slice(0, 300)}`
  )
}

async function fetchTracksByQuery(
  token: string,
  query: string,
  limit: number
): Promise<SongForDisplay[]> {
  const params = new URLSearchParams({
    q: query,
    type: 'track',
    limit: String(limit),
  })

  const response = await fetch(`${SPOTIFY_API_BASE}/search?${params}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw await buildSpotifyApiError(response, 'Failed to search songs')
  }

  const data: SearchResponse = await response.json()
  return data.tracks.items.map((item: SearchSongItem) => ({
    id: item.id,
    name: item.name,
    artistName: item.artists[0]?.name ?? 'Unknown Artist',
    imageUrl: item.album.images[0]?.url ?? null,
    spotifyUrl: item.external_urls.spotify,
  }))
}

async function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiry) {
    return cachedToken
  }

  const { clientId, clientSecret } = getSpotifyCredentials()

  if (!clientId || !clientSecret) {
    throw new Error(
      'Spotify credentials not configured: set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET'
    )
  }

  const response = await fetch(SPOTIFY_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }),
  })

  if (!response.ok) {
    throw await buildSpotifyApiError(
      response,
      'Failed to get Spotify access token'
    )
  }

  const data = await response.json()
  const token: string = data.access_token
  cachedToken = token
  tokenExpiry = Date.now() + (data.expires_in - 60) * 1000

  return token
}

export async function getPopularSongs(): Promise<SongForDisplay[]> {
  const token = await getAccessToken()

  const response = await fetch(`${SPOTIFY_API_BASE}/playlists/${POPULAR_PLAYLIST_ID}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw await buildSpotifyApiError(response, 'Failed to fetch popular songs')
  }

  const data = await response.json()
  const tracks: PopularSongsResponse = data.tracks

  return tracks.items
    .filter((item: PopularSongItem) => item.track?.id && item.track?.external_urls)
    .map((item: PopularSongItem) => ({
      id: item.track.id,
      name: item.track.name,
      artistName: item.track.artists[0]?.name ?? 'Unknown Artist',
      imageUrl: item.track.album.images[0]?.url ?? null,
      spotifyUrl: item.track.external_urls.spotify,
    }))
}

export async function searchSongs(keyword: string): Promise<SongForDisplay[]> {
  const token = await getAccessToken()
  return fetchTracksByQuery(token, keyword, 50)
}
