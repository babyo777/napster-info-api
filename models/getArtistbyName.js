import { searchArtists, getArtist } from "node-youtube-music";

async function getArtistsDetailsByName(query) {
  const a = await searchArtists(query);
  const ga = await getArtist(a[0].artistId);
  return ga;
}

export { getArtistsDetailsByName };
