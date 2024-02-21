import { getArtist } from "node-youtube-music";

async function getArtistsDetails(query) {
  const a = await getArtist(query);
  return a;
}

export { getArtistsDetails };
