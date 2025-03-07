import axios from 'axios';
import token from '../lib/getToken';

export async function getPopularSongs(){
    const response = await axios.get(
      "https://api.spotify.com/v1/playlists/5SLPaOxQyJ8Ne9zpmTOvSe",{
      headers: { Authorization: 'Bearer ' + token},
      },
    )
    return response.data.tracks
  }