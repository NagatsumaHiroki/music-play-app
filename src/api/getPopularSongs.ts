import axios from 'axios';
import fetchToken from '../lib/fetchToken';

export async function getPopularSongs(){
    const token = await fetchToken();
    const response = await axios.get(
      "https://api.spotify.com/v1/playlists/5SLPaOxQyJ8Ne9zpmTOvSe",{
      headers: { Authorization: 'Bearer ' + token},
      },
    )
    return response.data.tracks
  }