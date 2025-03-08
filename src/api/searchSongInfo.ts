import axios from 'axios';
import token from '../lib/fetchToken';

  interface  SearchProps {
    keyword: string;
  };

  export async function searchSongInfo(props: SearchProps) {
    const response = await axios.get("https://api.spotify.com/v1/search",
        {headers: { Authorization: 'Bearer ' + token}, params: {q: props.keyword, type: 'track'}},
    )
    console.log(response.data.tracks)
    return response.data.tracks
}