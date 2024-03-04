import { searchMusics, getSuggestions } from "node-youtube-music";

async function searchWithSuggestion(query) {
  const sq = await getSuggestions(query);
  const modified = sq.map((m) => {
    return {
      youtubeId: m.youtubeId,
      title: m.title,
      artists: m.artists,
      thumbnailUrl: m.thumbnailUrl.replace("w120-h120", "w2160-h3840"),
    };
  });
  return modified;
}

export { searchWithSuggestion };
