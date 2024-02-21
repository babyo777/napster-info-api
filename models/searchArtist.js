import { getSuggestions, searchArtists } from "node-youtube-music";

async function searchArtist(query) {
  const a = await searchArtists(query);
  return a;
}

export { searchArtist };
