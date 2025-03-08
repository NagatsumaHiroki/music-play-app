import axios from 'axios';
import fetchToken from '../lib/fetchToken';

  interface  SearchProps {
    keyword: string;
  };

  export async function searchSongInfo(props: SearchProps) {
    const token = await fetchToken();
    const response = await axios.get("https://api.spotify.com/v1/search",
        {headers: { Authorization: 'Bearer ' + token}, params: {q: props.keyword, type: 'track'}},
    )
    return response.data.tracks
}