import { generateToken } from '../api/generateToken';

async function initialize(){
    const decodedId =  atob(import.meta.env.VITE__APP_SPOTIFY_CLIENT_ID)
    const decodedSecret = atob(import.meta.env.VITE__APP_SPOTIFY_CLIENT_SECRET)
    const token = generateToken(decodedId, decodedSecret)
    return token;
}

async function fetchToken() {
  return await initialize();
}

export default fetchToken()
