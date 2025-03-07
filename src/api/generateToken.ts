import axios from 'axios';

export async function generateToken(decodedId : string, decodedSecret: string){
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
  return response.data.access_token
}