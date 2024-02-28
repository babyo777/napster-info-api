import { listMusicsFromPlaylist } from "node-youtube-music";

async function getPlaylistSongs(query) {
  const ps = await listMusicsFromPlaylist(query);
  const modified = ps.map((m) => {
    const parts = m.thumbnailUrl.split("/");
    const videoID = parts[parts.length - 2];
    return {
      youtubeId: m.youtubeId || videoID,
      title: m.title,
      artists: m.artists,
      thumbnailUrl: m.thumbnailUrl,
    };
  });
  return modified;
}

export { getPlaylistSongs };
