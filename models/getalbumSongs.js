import { listMusicsFromAlbum } from "node-youtube-music";

async function getAlbumSongs(query) {
  const a = await listMusicsFromAlbum(query);
  return a;
}

export { getAlbumSongs };
