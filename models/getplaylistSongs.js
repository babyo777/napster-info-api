// import { listMusicsFromPlaylist } from "node-youtube-music";
import ytpl from "ytpl";
async function getPlaylistSongs(query) {
  // const ps = await listMusicsFromPlaylist(query, { pages: Infinity });
  const t = await ytpl(query, { pages: Infinity });
  const modified = t.items.map((m) => {
    return {
      youtubeId: m.id,
      title: m.title,
      artists: {
        id: m.author.channelID,
        name: m.author.name,
      },
      thumbnailUrl: m.bestThumbnail.url,
    };
  });
  return modified;
}

export { getPlaylistSongs };
