import { listMusicsFromPlaylist } from "node-youtube-music";

async function GetPlaylistSongsLessThenHundred(query) {
  const ps = await listMusicsFromPlaylist(query);

  const modified = ps.map((s) => {
    return {
      youtubeId: s.youtubeId || "",
      title: s.title,
      artists: s.artists,
      thumbnailUrl: s.thumbnailUrl,
    };
  });
  return modified;
}

export { GetPlaylistSongsLessThenHundred };
