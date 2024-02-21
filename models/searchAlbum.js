import { searchAlbums } from "node-youtube-music";

async function searchAlbum(query) {
  const al = await searchAlbums(query);
  return al;
}

export { searchAlbum };
