// import { listMusicsFromPlaylist } from "node-youtube-music";
import ytpl from "ytpl";
async function getPlaylistDetails(query) {
  // const ps = await listMusicsFromPlaylist(query, { pages: Infinity });
  const t = await ytpl(`https://www.youtube.com/playlist?list=${query}`);

  return [
    {
      playlistId: t.id,
      title: t.title,
      thumbnailUrl: t.bestThumbnail.url,
    },
  ];
}

export { getPlaylistDetails };
