import { searchMusics, getSuggestions } from "node-youtube-music";

async function searchWithSuggestion(query) {
  const q = await searchMusics(query);
  const sq = await getSuggestions(q[1].youtubeId);

  return sq;
}

export { searchWithSuggestion };
