import axios from 'axios';

class getToken {
  static async initialize(){
    const decodedId =  atob(import.meta.env.VITE__APP_SPOTIFY_CLIENT_ID)
    const decodedSecret = atob(import.meta.env.VITE__APP_SPOTIFY_CLIENT_SECRET)
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      {
        grant_type: "client_credentials",
        client_id: decodedId.slice(10),
        client_secret: decodedSecret.slice(10),
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    let token = new getToken();
    token = response.data.access_token;
    return token;
  }
}

const token = await getToken.initialize();
export default token
