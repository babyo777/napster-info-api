import { listMusicsFromPlaylist } from "node-youtube-music";

async function GetPlaylistSongsLessThenHundred(query) {
  const ps = await listMusicsFromPlaylist(query);

  const modified = ps.map((s) => {
    const youtubeIdMatch = s.thumbnailUrl.match(/\/vi\/([^\/\?]+)/);
    const youtubeId = youtubeIdMatch && youtubeIdMatch[1];
    return {
      youtubeId: s.youtubeId || youtubeId,
      title: s.title,
      artists: s.artists,
      thumbnailUrl: s.thumbnailUrl,
    };
  });
  return modified;
}

export { GetPlaylistSongsLessThenHundred };
