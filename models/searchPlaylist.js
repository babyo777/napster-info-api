import { searchPlaylists } from "node-youtube-music";

async function searchPlaylist(query) {
  const p = await searchPlaylists(query);

  return p;
}

export { searchPlaylist };
