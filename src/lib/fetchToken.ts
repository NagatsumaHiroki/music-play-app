import { generateToken } from '../api/generateToken';

async function initialize() {
  const decodedId = atob(import.meta.env.VITE__APP_SPOTIFY_CLIENT_ID);
  const decodedSecret = atob(import.meta.env.VITE__APP_SPOTIFY_CLIENT_SECRET);
  return await generateToken(decodedId, decodedSecret);
}

export async function fetchToken() {
  return initialize(); // Promise を返す
}

export default fetchToken;
